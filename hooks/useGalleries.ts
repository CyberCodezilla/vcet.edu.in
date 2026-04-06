import { useCallback } from 'react';
import { getGalleries } from '../services/gallery';
import { Gallery } from '../admin/types';
import { useFetch } from './useFetch';

export function useGalleries(enabled = true) {
  const fetchGalleries = useCallback(() => getGalleries(), []);

  const { data, loading, error } = useFetch<Gallery[]>(fetchGalleries, {
    enabled,
    initialData: [],
    cacheKey: 'public:galleries:list',
    cacheTtlMs: 5 * 60_000,
    // Disabled to prevent API flooding
    revalidateOnFocus: false,
    revalidateOnVisibility: false,
  });

  return { galleries: data, loading, error };
}
