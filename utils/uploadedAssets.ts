const PROJECT_UPLOADS_BASE_PATH = '/uploads/';

// Backend asset paths from Laravel can be lowercase `/images/...` or legacy `/Images/...`.
const BACKEND_CAPITAL_IMAGE_PATH_PATTERN = /^\/?Images\//;
const BACKEND_IMAGE_PATH_PATTERN = /^\/?images\//;
const BACKEND_UPLOAD_PATH_PATTERN = /^\/?uploads\//;
const BACKEND_PDF_PATH_PATTERN = /^\/?pdfs\//;
const BACKEND_STORAGE_PATH_PATTERN = /^\/?(departments|storage)\//;
const BACKEND_API_PATH_PATTERN = /^\/?api\//;
const ABSOLUTE_URL_PATTERN = /^[a-z][a-z\d+\-.]*:/i;

const RAW_BACKEND_ORIGIN = ((import.meta.env.VITE_BACKEND_ORIGIN as string | undefined) ?? '').trim();

const RAW_API_BASE =
  ((import.meta.env.VITE_API_BASE_URL as string | undefined) ??
    (import.meta.env.VITE_API_URL as string | undefined) ??
    '').trim();

function resolveApiOrigin(): string {
  if (RAW_BACKEND_ORIGIN) {
    return RAW_BACKEND_ORIGIN.replace(/\/api\/?$/i, '').replace(/\/$/, '');
  }

  const browserOrigin = typeof window !== 'undefined' ? window.location.origin : '';
  const sanitizedEnv = RAW_API_BASE ? RAW_API_BASE.replace(/\/api\/?$/i, '').replace(/\/$/, '') : '';
  const currentHost = typeof window !== 'undefined' ? window.location.hostname : '';
  const envHost = (() => {
    if (!sanitizedEnv) return '';
    try {
      return new URL(sanitizedEnv).hostname;
    } catch {
      return '';
    }
  })();
  const isEnvLocal = envHost === 'localhost' || envHost === '127.0.0.1';
  const isCurrentLocal = currentHost === 'localhost' || currentHost === '127.0.0.1';
  const isStaticFrontendHost = /(?:^|\.)vercel\.app$/i.test(currentHost) || /(?:^|\.)netlify\.app$/i.test(currentHost);
  const shouldUseBrowserOrigin = !!browserOrigin && isEnvLocal && !isCurrentLocal;
  const fallbackOrigin = isStaticFrontendHost ? 'https://vcet.edu.in' : (browserOrigin || 'https://vcet.edu.in');
  const raw = shouldUseBrowserOrigin
    ? browserOrigin
    : (sanitizedEnv || fallbackOrigin);
  return raw.replace(/\/api\/?$/i, '').replace(/\/$/, '');
}

const API_ORIGIN = resolveApiOrigin();

function withApiOrigin(pathname: string): string {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return API_ORIGIN ? `${API_ORIGIN}${normalized}` : normalized;
}

function toUrlPath(value: string): string {
  const normalized = value.startsWith('/') ? value : `/${value}`;
  try {
    const parsed = new URL(normalized);
    return parsed.pathname || normalized;
  } catch {
    return normalized;
  }
}

function isBackendAssetPath(pathname: string): boolean {
  return (
    BACKEND_API_PATH_PATTERN.test(pathname) ||
    BACKEND_CAPITAL_IMAGE_PATH_PATTERN.test(pathname) ||
    BACKEND_IMAGE_PATH_PATTERN.test(pathname) ||
    BACKEND_UPLOAD_PATH_PATTERN.test(pathname) ||
    BACKEND_PDF_PATH_PATTERN.test(pathname) ||
    BACKEND_STORAGE_PATH_PATTERN.test(pathname)
  );
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

  const pathname = toUrlPath(trimmed.replace(/\\/g, '/'));

  // Uploaded/static assets should be served from backend origin in split-host setups.
  if (isBackendAssetPath(pathname)) {
    // If it's a departments path, it's served from Laravel's public storage disk
    if (pathname.startsWith('/departments/') || pathname.startsWith('departments/')) {
        const normalizedPath = pathname.replace(/^\/+/, '');
        return withApiOrigin(`storage/${normalizedPath}`);
    }
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

export function resolveBackendMediaUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  const trimmed = path.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('blob:') || trimmed.startsWith('data:')) return trimmed;
  if (ABSOLUTE_URL_PATTERN.test(trimmed)) return trimmed;

  const pathname = toUrlPath(trimmed.replace(/\\/g, '/'));
  if (!isBackendAssetPath(pathname)) return null;
  return withApiOrigin(pathname);
}

/**
 * Resolves a URL that points to a backend asset (like /pdfs/ or /images/)
 * for use in href attributes. If the path is not a backend asset, it's returned as is.
 */
export function resolveBackendHref(href: string | undefined | null): string {
  if (!href) return '#';
  const trimmed = href.trim();
  if (!trimmed) return '#';
  
  // Return absolute URLs, blobs, and data URIs as is
  if (ABSOLUTE_URL_PATTERN.test(trimmed) || trimmed.startsWith('blob:') || trimmed.startsWith('data:')) {
    return trimmed;
  }

  const pathname = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  
  // If it's a backend asset path, prefix with API origin
  if (isBackendAssetPath(pathname)) {
    return withApiOrigin(pathname);
  }
  
  return href;
}
