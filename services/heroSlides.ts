import { get } from './api';
import { resolveUploadedAssetUrl } from '../utils/uploadedAssets';
import { MOCK_HERO_SLIDES, readMockCollection } from '../admin/api/mockStore';
import { USE_PUBLIC_MOCK, sortBySortOrder, unwrapListResponse } from './publicData';

export interface HeroSlideRecord {
  id: number;
  title: string | null;
  subtitle: string | null;
  image_name: string | null;
  image_mime_type: string | null;
  image_size: number | null;
  button_text: string | null;
  button_link: string | null;
  sort_order: number;
  is_active: boolean;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

function normalizeSlide(slide: HeroSlideRecord): HeroSlideRecord {
  return {
    ...slide,
    image_url: resolveUploadedAssetUrl(slide.image_url),
  };
}

export const heroSlidesService = {
  list: async () => {
    const slides = USE_PUBLIC_MOCK
      ? readMockCollection<HeroSlideRecord>('vcet_mock_heroslides', MOCK_HERO_SLIDES as HeroSlideRecord[])
      : unwrapListResponse<HeroSlideRecord>(await get<unknown>('/hero-slides?active=1'));

    return sortBySortOrder(slides.filter((slide) => slide.is_active).map(normalizeSlide));
  },
};

