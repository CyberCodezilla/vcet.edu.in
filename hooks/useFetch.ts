import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Fetcher<T> = () => Promise<T>;

interface UseFetchOptions<T> {
	deps?: ReadonlyArray<unknown>;
	enabled?: boolean;
	initialData: T;
	/** Key for in-memory request deduplication (no localStorage) */
	cacheKey?: string;
	refreshIntervalMs?: number;
}

// In-memory request deduplication: prevents duplicate concurrent requests for the same key
const inflightRequests = new Map<string, Promise<unknown>>();

export function useFetch<T>(fetcher: Fetcher<T>, options: UseFetchOptions<T>) {
	const {
		deps = [],
		enabled = true,
		initialData,
		cacheKey,
		refreshIntervalMs,
	} = options;

	const stableDeps = useMemo(() => deps, deps);
	const [data, setData] = useState<T>(initialData);
	const [loading, setLoading] = useState<boolean>(enabled);
	const [error, setError] = useState<string | null>(null);
	const mountedRef = useRef(true);
	const fetcherRef = useRef(fetcher);

	useEffect(() => {
		fetcherRef.current = fetcher;
	}, [fetcher]);

	const runFetch = useCallback(async (silent = false) => {
		if (!enabled) return;
		if (!silent) setLoading(true);

		try {
			let result: T;

			// Dedupe concurrent requests for the same cacheKey
			if (cacheKey && inflightRequests.has(cacheKey)) {
				result = (await inflightRequests.get(cacheKey)) as T;
			} else {
				const promise = fetcherRef.current();
				if (cacheKey) {
					inflightRequests.set(cacheKey, promise);
				}
				try {
					result = await promise;
				} finally {
					if (cacheKey) {
						inflightRequests.delete(cacheKey);
					}
				}
			}

			if (!mountedRef.current) return;
			setData(result);
			setError(null);
		} catch (err) {
			if (!mountedRef.current) return;
			setError(err instanceof Error ? err.message : 'Request failed');
		} finally {
			if (!mountedRef.current || silent) return;
			setLoading(false);
		}
	}, [enabled, cacheKey]);

	useEffect(() => {
		mountedRef.current = true;
		if (!enabled) {
			setLoading(false);
			return () => {
				mountedRef.current = false;
			};
		}

		void runFetch(false);

		let intervalId: number | null = null;
		if (refreshIntervalMs && refreshIntervalMs > 0) {
			intervalId = window.setInterval(() => {
				if (document.visibilityState !== 'hidden') {
					void runFetch(true);
				}
			}, refreshIntervalMs);
		}

		return () => {
			mountedRef.current = false;
			if (intervalId !== null) window.clearInterval(intervalId);
		};
	}, [
		enabled,
		cacheKey,
		refreshIntervalMs,
		runFetch,
		...stableDeps,
	]);

	const refetch = useCallback(async () => {
		await runFetch(false);
	}, [runFetch]);

	return { data, loading, error, refetch };
}
