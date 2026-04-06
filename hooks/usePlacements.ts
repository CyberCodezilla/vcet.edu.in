import { useCallback } from 'react';
import type { Placement } from '../admin/types';
import { placementsService } from '../services/placements';
import { useFetch } from './useFetch';

export function usePlacements() {
  const fetchPlacements = useCallback(() => placementsService.list(), []);

  const { data, loading, error } = useFetch<Placement[]>(fetchPlacements, {
    initialData: [],
    cacheKey: 'public:placements:list',
  });

  return { placements: data, loading, error };
}
