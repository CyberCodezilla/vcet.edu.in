import { useCallback } from 'react';
import type { Event } from '../admin/types';
import { eventsService } from '../services/events';
import { useFetch } from './useFetch';

const REFRESH_INTERVAL_MS = 60_000;

export function useEvents() {
  const fetchEvents = useCallback(() => eventsService.list(), []);

  const { data, loading, error } = useFetch<Event[]>(fetchEvents, {
    initialData: [],
    cacheKey: 'public:events:list',
    cacheTtlMs: 60_000,
    refreshIntervalMs: REFRESH_INTERVAL_MS,
    revalidateOnFocus: true,
    revalidateOnVisibility: true,
  });

  return { events: data, loading, error };
}
