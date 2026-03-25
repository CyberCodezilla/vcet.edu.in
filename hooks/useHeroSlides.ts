import { useEffect, useState } from 'react';
import { heroSlidesService, type HeroSlideRecord } from '../services/heroSlides';

const REFRESH_INTERVAL_MS = 60_000;

export function useHeroSlides() {
  const [slides, setSlides] = useState<HeroSlideRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async (silent = false) => {
      if (!silent) setLoading(true);
      setError(null);

      try {
        const data = await heroSlidesService.list();
        if (!cancelled) setSlides(data);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Unable to load hero slides');
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

  return { slides, loading, error };
}
