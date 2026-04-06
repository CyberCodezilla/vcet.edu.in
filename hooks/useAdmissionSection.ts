import { useCallback } from 'react';
import type { AdmissionSection } from '../admin/types';
import { admissionsService } from '../services/admissions';
import { useFetch } from './useFetch';

export function useAdmissionSection(slug: string) {
  const fetchAdmissionSection = useCallback(
    async () => admissionsService.getBySlug(slug),
    [slug],
  );

  const { data, loading, error } = useFetch<AdmissionSection | null>(
    fetchAdmissionSection,
    {
      initialData: null,
      deps: [slug],
      cacheKey: `public:admission-section:${slug}`,
    },
  );

  return { section: data, loading, error };
}
