import { useCallback } from 'react';
import type { Event } from '../admin/types';
import { eventsService } from '../services/events';
import { useFetch } from './useFetch';

// Reduced polling from 60s to 5 minutes
const REFRESH_INTERVAL_MS = 5 * 60_000;

export function useEvents(enabled = true) {
  const fetchEvents = useCallback(() => eventsService.list(), []);

  const { data, loading, error } = useFetch<Event[]>(fetchEvents, {
    enabled,
    initialData: [],
    cacheKey: 'public:events:list',
    refreshIntervalMs: REFRESH_INTERVAL_MS,
  });

  return { events: data, loading, error };
}
