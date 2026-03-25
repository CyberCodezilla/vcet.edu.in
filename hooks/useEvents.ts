import { useState, useEffect } from 'react';
import type { Event } from '../admin/types';
import { eventsService } from '../services/events';

const REFRESH_INTERVAL_MS = 60_000;

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const load = async (silent = false) => {
      if (!silent) setLoading(true);

      try {
        const data = await eventsService.list();
        if (mounted) {
          setEvents(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) setError(err instanceof Error ? err.message : 'Failed to fetch events');
      } finally {
        if (mounted && !silent) setLoading(false);
      }
    };

    void load();

    const onFocus = () => {
      void load(true);
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        void load(true);
      }
    };

    const intervalId = window.setInterval(() => {
      if (document.visibilityState !== 'hidden') {
        void load(true);
      }
    }, REFRESH_INTERVAL_MS);

    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      mounted = false;
      window.clearInterval(intervalId);
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return { events, loading, error };
}
