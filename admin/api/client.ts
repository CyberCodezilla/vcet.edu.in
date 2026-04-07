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

type PublicCacheEntry = {
  ts: number;
  data: unknown;
};

const PUBLIC_DEPT_CACHE_PREFIX = 'vcet:dept-cache:v1:';
const PUBLIC_DEPT_CACHE_TTL_MS = Number(import.meta.env.VITE_PAGE_CACHE_TTL_MS ?? 10 * 60_000);
const publicDeptMemoryCache = new Map<string, PublicCacheEntry>();

function isPublicDeptRequest(path: string, method: string): boolean {
  if (method !== 'GET') return false;
  if (!path.startsWith('/departments/slug/')) return false;
  if (typeof window === 'undefined') return false;
  return !window.location.pathname.startsWith('/admin');
}

function getPublicDeptCacheKey(path: string): string {
  return `${PUBLIC_DEPT_CACHE_PREFIX}${path}`;
}

function readPublicDeptCache(path: string): PublicCacheEntry | null {
  if (import.meta.env.DEV || PUBLIC_DEPT_CACHE_TTL_MS <= 0) return null;

  const key = getPublicDeptCacheKey(path);
  const mem = publicDeptMemoryCache.get(key);
  if (mem) return mem;

  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PublicCacheEntry;
    if (!parsed || typeof parsed.ts !== 'number') return null;
    publicDeptMemoryCache.set(key, parsed);
    return parsed;
  } catch {
    return null;
  }
}

function writePublicDeptCache(path: string, data: unknown): void {
  const key = getPublicDeptCacheKey(path);
  const entry: PublicCacheEntry = { ts: Date.now(), data };
  publicDeptMemoryCache.set(key, entry);

  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(entry));
  } catch {
    // Ignore storage failures.
  }
}
export function clearPublicDeptCache(): void {
  publicDeptMemoryCache.clear();
  if (typeof window === 'undefined') return;
  try {
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key && key.startsWith(PUBLIC_DEPT_CACHE_PREFIX)) {
        window.localStorage.removeItem(key);
        i--;
      }
    }
  } catch {
    // Ignore storage failures.
  }
}
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
  if (status === 419 || status === 401) {
    return "Your admin session has expired or you are unauthenticated. Please log in again.";
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
  if (method !== "GET") clearPublicDeptCache();
  const publicDeptCacheEnabled = (import.meta.env.VITE_ENABLE_PUBLIC_CACHE as string | undefined) !== 'false';
  const shouldUsePublicDeptCache = publicDeptCacheEnabled && isPublicDeptRequest(path, method);

  if (shouldUsePublicDeptCache) {
    const cached = readPublicDeptCache(path);
    if (cached && Date.now() - cached.ts <= PUBLIC_DEPT_CACHE_TTL_MS) {
      return cached.data as T;
    }
  }

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

  if (shouldUsePublicDeptCache) {
    writePublicDeptCache(path, json);
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
  if (normalizedMethod !== "GET") clearPublicDeptCache();
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

export function resolveApiUrl(path: any): string | null {
  if (!path) return null;
  
  let resolvedPath = path;
  if (typeof path === 'object' && path !== null && 'url' in path) {
    resolvedPath = path.url;
  }

  if (typeof resolvedPath !== 'string') return null;
  if (/^https?:\/\//i.test(resolvedPath) || resolvedPath.startsWith("blob:") || resolvedPath.startsWith("data:")) return resolvedPath;
  // Uploaded backend assets should be resolved against backend origin
  if (/^\/?(images|Images|pdfs|Pdfs)\//.test(resolvedPath)) {
    return `${API_ORIGIN}${resolvedPath.startsWith('/') ? '' : '/'}${resolvedPath}`;
  }
  return `${API_ORIGIN}${resolvedPath.startsWith("/") ? resolvedPath : `/${resolvedPath}`}`;
}
export const client = { request, requestForm };
