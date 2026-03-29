// Base URL from env — keep WITHOUT '/api' suffix; '/api' is appended below.
// We also sanitize accidental '/api' endings to prevent '/api/api/*' 404s in deployments.
function resolveApiOrigin(): string {
  const envBase = (import.meta.env.VITE_API_URL as string | undefined)?.trim();
  const browserOrigin = typeof window !== "undefined" ? window.location.origin : "";
  const raw = envBase || browserOrigin || "https://vcet.edu.in";
  return raw.replace(/\/api\/?$/i, "").replace(/\/$/, "");
}

const API_BASE = `${resolveApiOrigin()}/api`;

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
  if (!forceRefresh && csrfToken) {
    return;
  }

  if (!csrfBootstrapPromise || forceRefresh) {
    csrfBootstrapPromise = fetch(`${API_BASE}/auth/csrf-token`, {
      method: "GET",
      credentials: "include",
      headers: buildHeaders(),
    })
      .then(async (res) => {
        const payload = (await res.json().catch(() => null)) as {
          token?: string;
        } | null;

        if (!res.ok) {
          const message =
            payload && typeof payload === "object" && "message" in payload
              ? String(payload.message ?? "")
              : "";
          throw new Error(
            message ||
              `Unable to initialize CSRF protection (HTTP ${res.status})`,
          );
        }

        csrfToken = payload?.token ?? "";
      })
      .finally(() => {
        csrfBootstrapPromise = null;
      });
  }

  await csrfBootstrapPromise;
}

function applyCsrfHeader(headers: Headers): void {
  if (csrfToken) {
    headers.set("X-CSRF-TOKEN", csrfToken);
  }
}

function extractErrorMessage(status: number, json: unknown): string {
  const payload = json as {
    message?: string;
    errors?: Record<string, string[] | string>;
  } | null;
  if (status === 419) {
    return "Your admin session expired or the CSRF token is missing. Refresh the page and sign in again if needed.";
  }

  const firstError = payload?.errors
    ? Object.values(payload.errors).flatMap((value) => Array.isArray(value) ? value : [value])[0]
    : null;

  if (firstError) {
    return String(firstError);
  }

  return payload?.message ?? `HTTP ${status}`;
}

function parseJsonSafely(text: string): unknown {
  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  retryOnCsrf = true,
): Promise<T> {
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

  const text = await res.text();
  const json = parseJsonSafely(text);

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
    if (csrfToken) {
      body.append("_token", csrfToken);
    }
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method: normalizedMethod,
    credentials: "include",
    headers,
    body,
  });

  const text = await res.text();
  const json = parseJsonSafely(text);

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
  if (/^https?:\/\//i.test(path) || path.startsWith("blob:") || path.startsWith("data:")) return path;      
  // Local frontend assets shouldn't be prefixed with API_ORIGIN
  if (/^\/?(images|Images|pdfs|Pdfs)\//.test(path)) {
    return path.startsWith("/") ? path : `/${path}`;
  }
  return `${API_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}
export const client = { request, requestForm };
