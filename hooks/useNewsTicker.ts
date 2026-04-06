import { useCallback } from 'react';
import { newsTickerService } from '../services/newsTicker';
import type { NewsTicker } from '../admin/types';
import { useFetch } from './useFetch';

// Reduced from 60s to 5 minutes to minimize API load
const REFRESH_INTERVAL_MS = 5 * 60_000;

export function useNewsTicker(enabled = true) {
  const fetchNewsTicker = useCallback(() => newsTickerService.list(), []);

  const { data, loading, error } = useFetch<NewsTicker[]>(fetchNewsTicker, {
    enabled,
    initialData: [],
    cacheKey: 'public:news-ticker:list',
    cacheTtlMs: 5 * 60_000,
    refreshIntervalMs: REFRESH_INTERVAL_MS,
    // Disabled to prevent API flooding
    revalidateOnFocus: false,
    revalidateOnVisibility: false,
  });

  return { items: data, loading, error: error ? new Error(error) : null };
}
