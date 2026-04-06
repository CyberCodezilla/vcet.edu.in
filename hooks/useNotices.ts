import { useCallback } from 'react';
import { noticesService, type NoticeRecord } from '../services/notices';
import { useFetch } from './useFetch';

const REFRESH_INTERVAL_MS = 60_000;

export function useNotices() {
  const fetchNotices = useCallback(() => noticesService.list(), []);

  const { data, loading, error } = useFetch<NoticeRecord[]>(fetchNotices, {
    initialData: [],
    cacheKey: 'public:notices:list',
    cacheTtlMs: 60_000,
    refreshIntervalMs: REFRESH_INTERVAL_MS,
    revalidateOnFocus: true,
    revalidateOnVisibility: true,
  });

  return { notices: data, loading, error };
}
