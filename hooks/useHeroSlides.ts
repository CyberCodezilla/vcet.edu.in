import { useCallback } from 'react';
import { heroSlidesService, type HeroSlideRecord } from '../services/heroSlides';
import { useFetch } from './useFetch';

// Changed from 60s to 5 minutes to reduce API load
const REFRESH_INTERVAL_MS = 5 * 60_000;

export function useHeroSlides(enabled = true) {
  const fetchHeroSlides = useCallback(() => heroSlidesService.list(), []);

  const { data, loading, error } = useFetch<HeroSlideRecord[]>(fetchHeroSlides, {
    enabled,
    initialData: [],
    cacheKey: 'public:hero-slides:list',
    refreshIntervalMs: REFRESH_INTERVAL_MS,
  });

  return { slides: data, loading, error };
}
