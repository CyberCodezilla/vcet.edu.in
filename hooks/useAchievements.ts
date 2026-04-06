import { useCallback } from 'react';
import { achievementsService } from '../services/achievements';
import type { Achievement } from '../admin/types';
import { useFetch } from './useFetch';

export function useAchievements() {
  const fetchAchievements = useCallback(() => achievementsService.list(), []);

  const { data, loading, error } = useFetch<Achievement[]>(fetchAchievements, {
    initialData: [],
    cacheKey: 'public:achievements:list',
    cacheTtlMs: 5 * 60_000,
    revalidateOnFocus: true,
    revalidateOnVisibility: true,
  });

  return { achievements: data, loading, error: error ? new Error(error) : null };
}
