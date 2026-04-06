import { useCallback } from 'react';
import { noticesService, type NoticeRecord } from '../services/notices';
import { useFetch } from './useFetch';

// Reduced from 60s to 5 minutes
const REFRESH_INTERVAL_MS = 5 * 60_000;

export function useNotices(enabled = true) {
  const fetchNotices = useCallback(() => noticesService.list(), []);

  const { data, loading, error } = useFetch<NoticeRecord[]>(fetchNotices, {
    enabled,
    initialData: [],
    cacheKey: 'public:notices:list',
    cacheTtlMs: 5 * 60_000,
    refreshIntervalMs: REFRESH_INTERVAL_MS,
    // Disabled to prevent API flooding
    revalidateOnFocus: false,
    revalidateOnVisibility: false,
  });

  return { notices: data, loading, error };
}
