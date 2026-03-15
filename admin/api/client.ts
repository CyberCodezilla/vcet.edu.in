// Base URL from env — set VITE_API_URL=http://localhost:8000 in .env.local (no /api suffix)
// The /api prefix is appended here so all path arguments stay short (e.g. '/notices')
const API_BASE =
  (
    (import.meta.env.VITE_API_URL as string | undefined) ??
    "https://vcet.edu.in"
  ).replace(/\/$/, "") + "/api";

const API_ORIGIN = API_BASE.replace(/\/api$/, "");
const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
let csrfBootstrapPromise: Promise<void> | null = null;
let csrfToken: string | null = null;

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const prefixed = `${name}=`;
  const match = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefixed));

  if (!match) return null;

  return decodeURIComponent(match.slice(prefixed.length));
}

function buildHeaders(input?: HeadersInit): Headers {
  const headers = new Headers(input);
  headers.set("Accept", "application/json");
  headers.set("X-Requested-With", "XMLHttpRequest");
  return headers;
}

async function ensureCsrfCookie(forceRefresh = false): Promise<void> {
  if (!forceRefresh && (csrfToken || getCookie("XSRF-TOKEN"))) {
    return;
  }

  if (!csrfBootstrapPromise || forceRefresh) {
    csrfBootstrapPromise = fetch(`${API_BASE}/auth/csrf-token`, {
      method: "GET",
      credentials: "include",
      headers: buildHeaders(),
    }).then(async (res) => {
      const payload = (await res.json().catch(() => null)) as { token?: string } | null;

      if (!res.ok) {
        const message = payload && typeof payload === "object" && "message" in payload
          ? String(payload.message ?? "")
          : "";
        throw new Error(message || `Unable to initialize CSRF protection (HTTP ${res.status})`);
      }

      csrfToken = typeof payload?.token === "string" && payload.token.length > 0
        ? payload.token
        : getCookie("XSRF-TOKEN");
    }).finally(() => {
      csrfBootstrapPromise = null;
    });
  }

  await csrfBootstrapPromise;
}

function applyCsrfHeader(headers: Headers): void {
  const token = csrfToken ?? getCookie("XSRF-TOKEN");
  if (token) {
    headers.set("X-XSRF-TOKEN", token);
  }
}

function extractErrorMessage(status: number, json: unknown): string {
  const payload = json as { message?: string } | null;
  if (status === 419) {
    return "Your admin session expired or the CSRF token is missing. Refresh the page and sign in again if needed.";
  }

  return payload?.message ?? `HTTP ${status}`;
}

async function request<T>(path: string, options: RequestInit = {}, retryOnCsrf = true): Promise<T> {
  const method = (options.method ?? "GET").toUpperCase();
  const headers = buildHeaders(options.headers);
  headers.set("Content-Type", "application/json");

  if (!SAFE_METHODS.has(method)) {
    await ensureCsrfCookie();
    applyCsrfHeader(headers);
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    method,
    credentials: "include",
    headers,
  });

  const json = await res.json();
  if (!res.ok) {
    if (res.status === 419 && retryOnCsrf) {
      await ensureCsrfCookie(true);
      return request<T>(path, options, false);
    }

    throw new Error(extractErrorMessage(res.status, json));
  }
  return json as T;
}

// For multipart/form-data (file uploads) — do NOT set Content-Type manually
async function requestForm<T>(
  path: string,
  body: FormData,
  method = "POST",
  retryOnCsrf = true,
): Promise<T> {
  const normalizedMethod = method.toUpperCase();
  const headers = buildHeaders();

  if (!SAFE_METHODS.has(normalizedMethod)) {
    await ensureCsrfCookie();
    applyCsrfHeader(headers);
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method: normalizedMethod,
    credentials: "include",
    headers,
    body,
  });

  const json = await res.json();
  if (!res.ok) {
    if (res.status === 419 && retryOnCsrf) {
      await ensureCsrfCookie(true);
      return requestForm<T>(path, body, method, false);
    }

    throw new Error(extractErrorMessage(res.status, json));
  }
  return json as T;
}

export function resolveApiUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (/^https?:\/\//i.test(path) || path.startsWith("blob:")) return path;
  return `${API_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

export const client = { request, requestForm };
