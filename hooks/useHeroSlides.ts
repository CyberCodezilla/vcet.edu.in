import { useEffect, useState } from 'react';
import { heroSlidesService, type HeroSlideRecord } from '../services/heroSlides';

export function useHeroSlides() {
  const [slides, setSlides] = useState<HeroSlideRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await heroSlidesService.list();
        if (!cancelled) setSlides(data);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Unable to load hero slides');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { slides, loading, error };
}
