import { useEffect, useState } from 'react';
import { noticesService, type NoticeRecord } from '../services/notices';

const REFRESH_INTERVAL_MS = 60_000;

export function useNotices() {
  const [notices, setNotices] = useState<NoticeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async (silent = false) => {
      if (!silent) setLoading(true);
      setError(null);

      try {
        const data = await noticesService.list();
        if (!cancelled) setNotices(data);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Unable to load notices');
      } finally {
        if (!cancelled && !silent) setLoading(false);
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
      cancelled = true;
      window.clearInterval(intervalId);
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return { notices, loading, error };
}
