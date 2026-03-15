// Base URL from env — set VITE_API_URL=http://localhost:8000 in .env.local (no /api suffix)
// The /api prefix is appended here so all path arguments stay short (e.g. '/notices')
const API_BASE =
  (
    (import.meta.env.VITE_API_URL as string | undefined) ??
    "https://vcet.edu.in"
  ).replace(/\/$/, "") + "/api";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(options.headers as Record<string, string> | undefined),
    },
  });

  const json = await res.json();
  if (!res.ok)
    throw new Error(
      (json as { message?: string })?.message ?? `HTTP ${res.status}`,
    );
  return json as T;
}

// For multipart/form-data (file uploads) — do NOT set Content-Type manually
async function requestForm<T>(
  path: string,
  body: FormData,
  method = "POST",
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    credentials: "include",
    headers: { Accept: "application/json" },
    body,
  });

  const json = await res.json();
  if (!res.ok)
    throw new Error(
      (json as { message?: string })?.message ?? `HTTP ${res.status}`,
    );
  return json as T;
}

export const client = { request, requestForm };
