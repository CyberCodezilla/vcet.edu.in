import { homepageBannersService, type HomepageBannerRecord } from '../services/homepageBanners';
import { useFetch } from './useFetch';

// Reduced from 60s to 5 minutes
const REFRESH_INTERVAL_MS = 5 * 60_000;

export function useHomepageBanners(enabled = true) {
  const { data, loading, error } = useFetch<HomepageBannerRecord[]>(
    () => homepageBannersService.list(),
    {
      enabled,
      initialData: [],
      cacheKey: 'public:homepage-banners:list',
      cacheTtlMs: 5 * 60_000,
      refreshIntervalMs: REFRESH_INTERVAL_MS,
      // Disabled to prevent API flooding
      revalidateOnFocus: false,
      revalidateOnVisibility: false,
    },
  );

  return { banners: data, loading, error };
}
