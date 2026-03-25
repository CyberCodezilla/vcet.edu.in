import { get } from './api';
import { resolveUploadedAssetUrl } from '../utils/uploadedAssets';
import { MOCK_TESTIMONIALS, readMockCollection } from '../admin/api/mockStore';
import { USE_PUBLIC_MOCK, sortByCreatedAtDesc, unwrapListResponse } from './publicData';

export interface TestimonialDTO {
  id: number;
  name: string;
  role: string | null;
  text: string;
  photo: string | null;
  rating: number | null;
  is_active: boolean;
  created_at: string;
}

interface TestimonialResponse {
  data: TestimonialDTO[];
  message: string;
}

export const getTestimonials = async (): Promise<TestimonialDTO[]> => {
  try {
    const items = USE_PUBLIC_MOCK
      ? readMockCollection<TestimonialDTO>('vcet_mock_testimonials', MOCK_TESTIMONIALS as TestimonialDTO[])
      : unwrapListResponse<TestimonialDTO>(await get<unknown>('/testimonials?active=true'));

    return sortByCreatedAtDesc(items.filter((testimonial) => testimonial.is_active)).map((testimonial) => ({
      ...testimonial,
      photo: resolveUploadedAssetUrl(testimonial.photo),
    }));
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
};
