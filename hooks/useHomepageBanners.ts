import { homepageBannersService, type HomepageBannerRecord } from '../services/homepageBanners';
import { useFetch } from './useFetch';

const REFRESH_INTERVAL_MS = 30_000;

export function useHomepageBanners(enabled = true) {
  const { data, loading, error } = useFetch<HomepageBannerRecord[]>(
    () => homepageBannersService.list(),
    {
      enabled,
      initialData: [],
      cacheKey: 'public:homepage-banners:list',
      cacheTtlMs: 30_000,
      refreshIntervalMs: REFRESH_INTERVAL_MS,
      revalidateOnFocus: true,
      revalidateOnVisibility: true,
    },
  );

  return { banners: data, loading, error };
}
