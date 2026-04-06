import { useCallback, useEffect, useRef, useState, type ReactNode, type RefObject } from 'react';

type Fetcher<T> = () => Promise<T>;

interface CacheEntry<T> {
  data: T;
  ts: number;
}

interface UseLazyFetchOptions<T> {
  /** Initial data before fetch completes */
  initialData: T;
  /** Cache key for localStorage persistence */
  cacheKey?: string;
  /** Cache TTL in milliseconds. Default: 5 minutes */
  cacheTtlMs?: number;
  /** IntersectionObserver root margin. Default: "200px" (load when 200px from viewport) */
  rootMargin?: string;
  /** Threshold for intersection. Default: 0 (any visibility triggers) */
  threshold?: number;
  /** Skip lazy loading and fetch immediately */
  immediate?: boolean;
}

interface UseLazyFetchResult<T> {
  /** Current data */
  data: T;
  /** Loading state */
  loading: boolean;
  /** Error message if any */
  error: string | null;
  /** Whether data has been fetched at least once */
  hasLoaded: boolean;
  /** Manually trigger fetch */
  refetch: () => Promise<void>;
  /** Ref to attach to the container element for visibility detection */
  containerRef: RefObject<HTMLDivElement | null>;
}

const DEFAULT_CACHE_TTL_MS = 5 * 60_000;
const CACHE_PREFIX = 'vcet:lazy-cache:';
const memoryCache = new Map<string, CacheEntry<unknown>>();

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
    // Ignore quota/security storage errors
  }
}

/**
 * Lazy fetch hook that only loads data when the component becomes visible.
 * Uses IntersectionObserver to detect visibility and fetch data only when needed.
 * Prevents unnecessary API calls for below-the-fold content.
 */
export function useLazyFetch<T>(
  fetcher: Fetcher<T>,
  options: UseLazyFetchOptions<T>
): UseLazyFetchResult<T> {
  const {
    initialData,
    cacheKey,
    cacheTtlMs = DEFAULT_CACHE_TTL_MS,
    rootMargin = '200px',
    threshold = 0,
    immediate = false,
  } = options;

  const shouldUseCache = !!cacheKey;
  const cachedInitial = shouldUseCache ? readCache<T>(cacheKey!, cacheTtlMs) : null;

  const [data, setData] = useState<T>(() => cachedInitial ?? initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(!!cachedInitial);
  const [isVisible, setIsVisible] = useState(immediate);

  const containerRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(true);
  const fetchingRef = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const runFetch = useCallback(async () => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    setLoading(true);
    setError(null);

    // Cancel any previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      const result = await fetcher();
      if (!mountedRef.current) return;

      setData(result);
      setHasLoaded(true);
      if (shouldUseCache) writeCache(cacheKey!, result);
    } catch (err) {
      if (!mountedRef.current) return;
      if (err instanceof Error && err.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'Request failed');
    } finally {
      fetchingRef.current = false;
      if (mountedRef.current) setLoading(false);
    }
  }, [fetcher, shouldUseCache, cacheKey]);

  // IntersectionObserver for visibility detection
  useEffect(() => {
    if (immediate || hasLoaded) return;
    if (typeof IntersectionObserver === 'undefined') {
      // Fallback: fetch immediately if IntersectionObserver not supported
      setIsVisible(true);
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [immediate, hasLoaded, rootMargin, threshold]);

  // Fetch when visible
  useEffect(() => {
    mountedRef.current = true;

    if (isVisible && !hasLoaded) {
      void runFetch();
    }

    return () => {
      mountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [isVisible, hasLoaded, runFetch]);

  const refetch = useCallback(async () => {
    fetchingRef.current = false; // Reset to allow refetch
    await runFetch();
  }, [runFetch]);

  return {
    data,
    loading,
    error,
    hasLoaded,
    refetch,
    containerRef,
  };
}

/**
 * Wrapper component for lazy loading sections.
 * Renders a placeholder until the section becomes visible.
 */
interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  minHeight?: string;
}

export function LazySection({
  children,
  fallback,
  rootMargin = '200px',
  minHeight = '200px',
}: LazySectionProps): ReactNode {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={containerRef} style={{ minHeight: isVisible ? undefined : minHeight }}>
      {isVisible ? children : (fallback || null)}
    </div>
  );
}

export default useLazyFetch;
