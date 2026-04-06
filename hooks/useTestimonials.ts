import { useCallback } from 'react';
import { getTestimonials, TestimonialDTO } from '../services/testimonials';
import { useFetch } from './useFetch';

export const useTestimonials = (enabled = true) => {
  const fetchTestimonials = useCallback(() => getTestimonials(), []);

  const { data, loading, error } = useFetch<TestimonialDTO[]>(fetchTestimonials, {
    enabled,
    initialData: [],
    cacheKey: 'public:testimonials:list',
  });

  return { testimonials: data, loading, error: error ? new Error(error) : null };
};
