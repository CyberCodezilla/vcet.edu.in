import { useCallback } from 'react';
import { getGalleries } from '../services/gallery';
import type { Gallery } from '../admin/types';
import { useFetch } from './useFetch';

export function useGallery() {
	const fetchGallery = useCallback(() => getGalleries(), []);

	const { data, loading, error } = useFetch<Gallery[]>(fetchGallery, {
		initialData: [],
		cacheKey: 'public:gallery:list',
	});

	return { images: data, loading, error };
}
