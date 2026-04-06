import { useCallback, useEffect, useRef, useState, type ReactNode, type RefObject } from 'react';

type Fetcher<T> = () => Promise<T>;

interface UseLazyFetchOptions<T> {
  /** Initial data before fetch completes */
  initialData: T;
  /** Cache key for in-memory request deduplication */
  cacheKey?: string;
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

// In-memory request deduplication
const inflightRequests = new Map<string, Promise<unknown>>();

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
    rootMargin = '200px',
    threshold = 0,
    immediate = false,
  } = options;

  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
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
      let result: T;

      // Dedupe concurrent requests for the same cacheKey
      if (cacheKey && inflightRequests.has(cacheKey)) {
        result = (await inflightRequests.get(cacheKey)) as T;
      } else {
        const promise = fetcher();
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
      setHasLoaded(true);
    } catch (err) {
      if (!mountedRef.current) return;
      if (err instanceof Error && err.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'Request failed');
    } finally {
      fetchingRef.current = false;
      if (mountedRef.current) setLoading(false);
    }
  }, [fetcher, cacheKey]);

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
