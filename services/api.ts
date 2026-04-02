function resolveApiOrigin(): string {
    const envBase = (import.meta.env.VITE_API_URL as string | undefined)?.trim()
        || (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim();
    const browserOrigin = typeof window !== 'undefined' ? window.location.origin : '';
    const sanitizedEnv = envBase ? envBase.replace(/\/api\/?$/i, '').replace(/\/$/, '') : '';
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
    const shouldUseBrowserOrigin = !!browserOrigin && isEnvLocal && !isCurrentLocal;
    const raw = shouldUseBrowserOrigin
        ? browserOrigin
        : (sanitizedEnv || browserOrigin || 'https://vcet.edu.in');
    return raw.replace(/\/api\/?$/i, '').replace(/\/$/, '');
}

const API_ORIGIN = resolveApiOrigin();
const API_BASE = API_ORIGIN;

interface ApiError {
    status: number;
    data: Record<string, unknown>;
}

export async function post<T>(path: string, body: unknown): Promise<T> {
    const response = await fetch(`${API_BASE}/api${path}`, {
        method: 'POST',
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
    const response = await fetch(`${API_BASE}/api${path}`, {
        cache: 'no-store',
        headers: { Accept: 'application/json' },
    });

    const data: unknown = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw { status: response.status, data } as ApiError;
    }

    return data as T;
}

export function resolveApiUrl(path: any): string | null {
    if (!path) return null;
    
    let resolvedPath = path;
    if (typeof path === 'object' && path !== null && 'url' in path) {
        resolvedPath = path.url;
    }

    if (typeof resolvedPath !== 'string') return null;
    if (/^https?:\/\//i.test(resolvedPath) || resolvedPath.startsWith('blob:') || resolvedPath.startsWith('data:')) return resolvedPath;
    // Local frontend assets shouldn't be prefixed with API_ORIGIN
    if (/^\/?(images|Images|pdfs|Pdfs)\//.test(resolvedPath)) {
        return resolvedPath.startsWith("/") ? resolvedPath : `/${resolvedPath}`;
    }
    return `${API_BASE}${resolvedPath.startsWith('/') ? '' : '/'}${resolvedPath}`;
}
