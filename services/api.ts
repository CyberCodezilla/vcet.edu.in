function resolveApiOrigin(): string {
    const envBase = (import.meta.env.VITE_API_URL as string | undefined)?.trim()
        || (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim();
    const browserOrigin = typeof window !== 'undefined' ? window.location.origin : '';
    const sanitizedEnv = envBase ? envBase.replace(/\/api\/?$/i, '').replace(/\/$/, '') : '';
    const currentHost = typeof window !== 'undefined' ? window.location.hostname : '';
    const currentPort = typeof window !== 'undefined' ? window.location.port : '';
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
    const shouldUseBrowserOrigin = !!browserOrigin && isEnvLocal && !isCurrentLocal;
    const localLaravelOrigin = 'http://127.0.0.1:8000';
    const shouldUseLocalLaravelFallback = !sanitizedEnv && isCurrentLocal && currentPort !== '8000';
    const raw = shouldUseBrowserOrigin
        ? browserOrigin
        : (sanitizedEnv || (shouldUseLocalLaravelFallback ? localLaravelOrigin : browserOrigin) || 'https://vcet.edu.in');
    return raw.replace(/\/api\/?$/i, '').replace(/\/$/, '');
}

const API_ORIGIN = resolveApiOrigin();
const API_BASE = API_ORIGIN;

type CacheEntry = {
    ts: number;
    data: unknown;
};

const PAGE_CACHE_PREFIX = 'vcet:page-cache:v1:';
const pageMemoryCache = new Map<string, CacheEntry>();
const inflightPageFetches = new Map<string, Promise<unknown>>();
const PAGE_CACHE_ENABLED = (import.meta.env.VITE_ENABLE_PUBLIC_CACHE as string | undefined) !== 'false';
const PAGE_CACHE_TTL_MS = Number(import.meta.env.VITE_PAGE_CACHE_TTL_MS ?? 10 * 60_000);
const PAGE_CACHE_REVALIDATE_MS = Number(import.meta.env.VITE_PAGE_CACHE_REVALIDATE_MS ?? 60_000);

function isPublicPageRequest(path: string): boolean {
    return path.startsWith('/pages/');
}

function isAdminRoute(): boolean {
    if (typeof window === 'undefined') return false;
    return window.location.pathname.startsWith('/admin');
}

function getPageCacheKey(path: string): string {
    return `${PAGE_CACHE_PREFIX}${path}`;
}

function readPageCache(path: string): CacheEntry | null {
    const key = getPageCacheKey(path);
    const mem = pageMemoryCache.get(key);
    if (mem) return mem;

    if (typeof window === 'undefined') return null;
    try {
        const raw = window.localStorage.getItem(key);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as CacheEntry;
        if (!parsed || typeof parsed.ts !== 'number') return null;
        pageMemoryCache.set(key, parsed);
        return parsed;
    } catch {
        return null;
    }
}

function writePageCache(path: string, data: unknown): void {
    const key = getPageCacheKey(path);
    const entry: CacheEntry = { ts: Date.now(), data };
    pageMemoryCache.set(key, entry);

    if (typeof window === 'undefined') return;
    try {
        window.localStorage.setItem(key, JSON.stringify(entry));
    } catch {
        // Ignore quota/security errors.
    }
}

function clearPageCachePath(path: string): void {
    const key = getPageCacheKey(path);
    pageMemoryCache.delete(key);
    inflightPageFetches.delete(key);
    if (typeof window !== 'undefined') {
        try {
            window.localStorage.removeItem(key);
        } catch {
            // Ignore storage failures.
        }
    }
}

export function invalidatePublicPageCache(paths?: string[]): void {
    if (paths && paths.length > 0) {
        paths
            .filter((path) => path.startsWith('/pages/'))
            .forEach((path) => clearPageCachePath(path));
        return;
    }

    pageMemoryCache.clear();
    inflightPageFetches.clear();

    if (typeof window === 'undefined') return;

    try {
        for (let index = window.localStorage.length - 1; index >= 0; index -= 1) {
            const key = window.localStorage.key(index);
            if (key && key.startsWith(PAGE_CACHE_PREFIX)) {
                window.localStorage.removeItem(key);
            }
        }
    } catch {
        // Ignore storage failures.
    }
}

let cachedBackendVersion: string | null = null;
let lastCacheClearTime = 0;
const CACHE_CLEAR_COOLDOWN_MS = 5_000; // Prevent clearing cache more than once per 5 seconds

function getBackendCacheVersion(): string | null {
    return cachedBackendVersion;
}

export function clearCacheIfVersionChanged(newVersion: string | null): boolean {
    if (!newVersion) return false;
    
    // Prevent infinite loops: don't clear if we just cleared recently
    const now = Date.now();
    if (lastCacheClearTime && (now - lastCacheClearTime) < CACHE_CLEAR_COOLDOWN_MS) {
        // Update version silently without clearing
        cachedBackendVersion = newVersion;
        return false;
    }
    
    const oldVersion = cachedBackendVersion;
    
    // First time seeing a version - store it but don't clear
    if (!oldVersion) {
        cachedBackendVersion = newVersion;
        console.log(`[Cache] Initial backend version: ${newVersion}`);
        return false;
    }
    
    // Version hasn't changed - no action needed
    if (oldVersion === newVersion) {
        return false;
    }
    
    // Version changed - clear page cache
    console.log(`[Cache] Backend version changed: ${oldVersion} -> ${newVersion}. Clearing page cache.`);
    cachedBackendVersion = newVersion;
    lastCacheClearTime = now;
    
    invalidatePublicPageCache();
    
    return true;
}

async function fetchJson<T>(path: string): Promise<T> {
    const response = await fetch(`${API_BASE}/api${path}`, {
        cache: 'no-store',
        headers: {
            Accept: 'application/json',
        },
    });

    const data: unknown = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw { status: response.status, data } as ApiError;
    }

    // Check cache version from response header
    const cacheVersion = response.headers.get('X-Cache-Version');
    if (cacheVersion) {
        clearCacheIfVersionChanged(cacheVersion);
    }

    return data as T;
}

function fetchAndCachePage<T>(path: string): Promise<T> {
    const key = getPageCacheKey(path);
    const existing = inflightPageFetches.get(key) as Promise<T> | undefined;
    if (existing) return existing;

    const run = fetchJson<T>(path)
        .then((data) => {
            writePageCache(path, data);
            return data;
        })
        .finally(() => {
            inflightPageFetches.delete(key);
        });

    inflightPageFetches.set(key, run as Promise<unknown>);
    return run;
}

export function prefetchPageData(paths: string[]): void {
    if (!PAGE_CACHE_ENABLED) return;
    const unique = Array.from(new Set(paths)).filter((path) => path.startsWith('/pages/'));
    for (const path of unique) {
        void fetchAndCachePage(path).catch(() => undefined);
    }
}

interface ApiError {
    status: number;
    data: Record<string, unknown>;
}

export async function post<T>(path: string, body: unknown): Promise<T> {
    const response = await fetch(`${API_BASE}/api${path}`, {
        method: 'POST',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(body),
    });

    const data: unknown = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw { status: response.status, data } as ApiError;
    }

    return data as T;
}

export async function put<T>(path: string, body: unknown): Promise<T> {
    const response = await fetch(`${API_BASE}/api${path}`, {
        method: 'PUT',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(body),
    });

    const data: unknown = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw { status: response.status, data } as ApiError;
    }

    return data as T;
}

export async function get<T>(path: string): Promise<T> {
    const shouldUsePageCache = PAGE_CACHE_ENABLED && isPublicPageRequest(path) && !isAdminRoute();

    if (!shouldUsePageCache) {
        return fetchJson<T>(path);
    }

    const cached = readPageCache(path);
    if (cached) {
        const age = Date.now() - cached.ts;
        const isFresh = age <= PAGE_CACHE_TTL_MS;
        const shouldRevalidate = age >= PAGE_CACHE_REVALIDATE_MS;

        if (isFresh) {
            if (shouldRevalidate) {
                void fetchAndCachePage<T>(path);
            }
            return cached.data as T;
        }

        try {
            return await fetchAndCachePage<T>(path);
        } catch {
            return cached.data as T;
        }
    }

    return fetchAndCachePage<T>(path);
}

export function resolveApiUrl(path: any): string | null {
    if (!path) return null;
    
    let resolvedPath = path;
    if (typeof path === 'object' && path !== null && 'url' in path) {
        resolvedPath = path.url;
    }

    if (typeof resolvedPath !== 'string') return null;
    if (/^https?:\/\//i.test(resolvedPath) || resolvedPath.startsWith('blob:') || resolvedPath.startsWith('data:')) return resolvedPath;
    // Uploaded backend assets should be resolved against backend origin
    if (/^\/?(images|Images|pdfs|Pdfs)\//.test(resolvedPath)) {
        return `${API_BASE}${resolvedPath.startsWith('/') ? '' : '/'}${resolvedPath}`;
    }
    return `${API_BASE}${resolvedPath.startsWith('/') ? '' : '/'}${resolvedPath}`;
}

export { getBackendCacheVersion };
