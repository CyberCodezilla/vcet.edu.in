import { useCallback } from 'react';
import { newsTickerService } from '../services/newsTicker';
import type { NewsTicker } from '../admin/types';
import { useFetch } from './useFetch';

export function useNewsTicker() {
  const fetchNewsTicker = useCallback(() => newsTickerService.list(), []);

  const { data, loading, error } = useFetch<NewsTicker[]>(fetchNewsTicker, {
    initialData: [],
    cacheKey: 'public:news-ticker:list',
    cacheTtlMs: 60_000,
    refreshIntervalMs: 60_000,
    revalidateOnFocus: true,
    revalidateOnVisibility: true,
  });

  return { items: data, loading, error: error ? new Error(error) : null };
}
