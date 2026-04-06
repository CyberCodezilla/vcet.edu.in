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
    cacheTtlMs: 5 * 60_000,
    refreshIntervalMs: REFRESH_INTERVAL_MS,
    // Disabled to prevent API flooding on focus/visibility changes
    revalidateOnFocus: false,
    revalidateOnVisibility: false,
  });

  return { slides: data, loading, error };
}
