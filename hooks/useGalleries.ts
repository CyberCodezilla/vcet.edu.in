import { useCallback } from 'react';
import { getGalleries } from '../services/gallery';
import { Gallery } from '../admin/types';
import { useFetch } from './useFetch';

export function useGalleries() {
  const fetchGalleries = useCallback(() => getGalleries(), []);

  const { data, loading, error } = useFetch<Gallery[]>(fetchGalleries, {
    initialData: [],
    cacheKey: 'public:galleries:list',
    cacheTtlMs: 5 * 60_000,
    revalidateOnFocus: true,
    revalidateOnVisibility: true,
  });

  return { galleries: data, loading, error };
}
