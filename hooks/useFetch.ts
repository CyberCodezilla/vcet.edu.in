import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Fetcher<T> = () => Promise<T>;

interface CacheEntry<T> {
	data: T;
	ts: number;
}

interface UseFetchOptions<T> {
	deps?: ReadonlyArray<unknown>;
	enabled?: boolean;
	initialData: T;
	cacheKey?: string;
	cacheTtlMs?: number;
	refreshIntervalMs?: number;
	/** Revalidate when window regains focus. Default: false (changed from true to prevent flooding) */
	revalidateOnFocus?: boolean;
	/** Revalidate when page becomes visible. Default: false (changed from true to prevent flooding) */
	revalidateOnVisibility?: boolean;
}

const DEFAULT_CACHE_TTL_MS = 5 * 60_000;
const CACHE_PREFIX = 'vcet:hook-cache:';
const memoryCache = new Map<string, CacheEntry<unknown>>();
const PUBLIC_CACHE_ENABLED = (import.meta.env.VITE_ENABLE_PUBLIC_CACHE as string | undefined) !== 'false';

function readCache<T>(key: string, ttlMs: number): T | null {
	const inMemory = memoryCache.get(key) as CacheEntry<T> | undefined;
	if (inMemory && Date.now() - inMemory.ts <= ttlMs) {
		return inMemory.data;
	}

	if (typeof window === 'undefined') return null;

	try {
		const raw = window.localStorage.getItem(`${CACHE_PREFIX}${key}`);
		if (!raw) return null;
		const parsed = JSON.parse(raw) as CacheEntry<T>;
		if (!parsed || Date.now() - parsed.ts > ttlMs) return null;
		memoryCache.set(key, parsed as CacheEntry<unknown>);
		return parsed.data;
	} catch {
		return null;
	}
}

function writeCache<T>(key: string, data: T): void {
	const payload: CacheEntry<T> = { data, ts: Date.now() };
	memoryCache.set(key, payload as CacheEntry<unknown>);

	if (typeof window === 'undefined') return;
	try {
		window.localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(payload));
	} catch {
		// Ignore quota/security storage errors.
	}
}

export function useFetch<T>(fetcher: Fetcher<T>, options: UseFetchOptions<T>) {
	const {
		deps = [],
		enabled = true,
		initialData,
		cacheKey,
		cacheTtlMs = DEFAULT_CACHE_TTL_MS,
		refreshIntervalMs,
		// Changed defaults to false to prevent API flooding
		revalidateOnFocus = false,
		revalidateOnVisibility = false,
	} = options;

	const shouldUseCache = PUBLIC_CACHE_ENABLED && !!cacheKey;
	const cachedInitial = shouldUseCache ? readCache<T>(cacheKey!, cacheTtlMs) : null;

	const stableDeps = useMemo(() => deps, deps);
	const [data, setData] = useState<T>(() => {
		return cachedInitial ?? initialData;
	});
	const [loading, setLoading] = useState<boolean>(() => enabled && !(shouldUseCache && cachedInitial !== null));
	const [error, setError] = useState<string | null>(null);
	const mountedRef = useRef(true);

	const runFetch = useCallback(async (silent = false) => {
		if (!enabled) return;
		if (!silent) setLoading(true);

		try {
			const result = await fetcher();
			if (!mountedRef.current) return;
			setData(result);
			setError(null);
			if (shouldUseCache) writeCache(cacheKey!, result);
		} catch (err) {
			if (!mountedRef.current) return;
			setError(err instanceof Error ? err.message : 'Request failed');
		} finally {
			if (!mountedRef.current || silent) return;
			setLoading(false);
		}
	}, [enabled, fetcher, shouldUseCache, cacheKey]);

	useEffect(() => {
		mountedRef.current = true;
		if (!enabled) {
			setLoading(false);
			return () => {
				mountedRef.current = false;
			};
		}

		const hasCache = Boolean(shouldUseCache && readCache<T>(cacheKey!, cacheTtlMs) !== null);
		void runFetch(hasCache);

		const onFocus = () => {
			if (revalidateOnFocus) {
				void runFetch(true);
			}
		};

		const onVisibilityChange = () => {
			if (revalidateOnVisibility && document.visibilityState === 'visible') {
				void runFetch(true);
			}
		};

		let intervalId: number | null = null;
		if (refreshIntervalMs && refreshIntervalMs > 0) {
			intervalId = window.setInterval(() => {
				if (document.visibilityState !== 'hidden') {
					void runFetch(true);
				}
			}, refreshIntervalMs);
		}

		if (revalidateOnFocus) window.addEventListener('focus', onFocus);
		if (revalidateOnVisibility) document.addEventListener('visibilitychange', onVisibilityChange);

		return () => {
			mountedRef.current = false;
			if (intervalId !== null) window.clearInterval(intervalId);
			if (revalidateOnFocus) window.removeEventListener('focus', onFocus);
			if (revalidateOnVisibility) document.removeEventListener('visibilitychange', onVisibilityChange);
		};
	}, [
		enabled,
		cacheKey,
		shouldUseCache,
		cacheTtlMs,
		refreshIntervalMs,
		revalidateOnFocus,
		revalidateOnVisibility,
		runFetch,
		...stableDeps,
	]);

	const refetch = useCallback(async () => {
		await runFetch(false);
	}, [runFetch]);

	return { data, loading, error, refetch };
}
