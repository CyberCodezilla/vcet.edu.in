import { useCallback } from 'react';
import { getGalleries } from '../services/gallery';
import type { Gallery } from '../admin/types';
import { useFetch } from './useFetch';

export function useGallery() {
	const fetchGallery = useCallback(() => getGalleries(), []);

	const { data, loading, error } = useFetch<Gallery[]>(fetchGallery, {
		initialData: [],
		cacheKey: 'public:gallery:list',
		cacheTtlMs: 5 * 60_000,
		revalidateOnFocus: true,
		revalidateOnVisibility: true,
	});

	return { images: data, loading, error };
}
