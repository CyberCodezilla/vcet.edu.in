const PROJECT_UPLOADS_BASE_PATH = '/uploads/';

// Frontend checked-in assets usually use `/Images/...` (capital I).
const STATIC_PUBLIC_ASSET_PATH_PATTERN = /^\/?Images\//;
// Backend upload paths from Laravel use lowercase `/images/...` and `/uploads/...`.
const BACKEND_IMAGE_PATH_PATTERN = /^\/?images\//;
const BACKEND_UPLOAD_PATH_PATTERN = /^\/?uploads\//;
const BACKEND_PDF_PATH_PATTERN = /^\/?pdfs\//;
const ABSOLUTE_URL_PATTERN = /^[a-z][a-z\d+\-.]*:/i;

const RAW_API_BASE =
  ((import.meta.env.VITE_API_BASE_URL as string | undefined) ??
    (import.meta.env.VITE_API_URL as string | undefined) ??
    '').trim();

function resolveApiOrigin(apiBase: string): string {
  if (!apiBase) return '';

  try {
    return new URL(apiBase).origin;
  } catch {
    return apiBase.replace(/\/api\/?$/i, '').replace(/\/$/, '');
  }
}

const API_ORIGIN = resolveApiOrigin(RAW_API_BASE);

function withApiOrigin(pathname: string): string {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return API_ORIGIN ? `${API_ORIGIN}${normalized}` : normalized;
}

function encodeFileName(fileName: string): string {
  try {
    return encodeURIComponent(decodeURIComponent(fileName));
  } catch {
    return encodeURIComponent(fileName);
  }
}

export function resolveUploadedAssetUrl(path: string | null | undefined): string | null {
  if (!path) return null;

  const trimmed = path.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('blob:') || trimmed.startsWith('data:')) return trimmed;
  if (ABSOLUTE_URL_PATTERN.test(trimmed)) return trimmed;

  const pathname = trimmed.replace(/\\/g, '/');

  // Keep checked-in frontend static files as frontend-relative URLs.
  if (STATIC_PUBLIC_ASSET_PATH_PATTERN.test(pathname)) {
    return pathname.startsWith('/') ? pathname : `/${pathname}`;
  }

  // Uploaded assets should be served from backend origin in split-host setups.
  if (
    BACKEND_IMAGE_PATH_PATTERN.test(pathname) ||
    BACKEND_UPLOAD_PATH_PATTERN.test(pathname) ||
    BACKEND_PDF_PATH_PATTERN.test(pathname)
  ) {
    return withApiOrigin(pathname);
  }

  const segments = pathname
    .split('/')
    .map((segment) => segment.trim())
    .filter(Boolean)
    .map((segment) => encodeFileName(segment));

  if (segments.length === 0) return null;

  const normalizedUploadPath =
    segments.length === 1
      ? `${PROJECT_UPLOADS_BASE_PATH}${segments[0]}`
      : `${PROJECT_UPLOADS_BASE_PATH}${segments.join('/')}`;

  return withApiOrigin(normalizedUploadPath);
}
