import { get, resolveApiUrl } from './api';

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
    image_url: resolveApiUrl(slide.image_url),
  };
}

export const heroSlidesService = {
  list: async () => {
    const res = await get<{ data: HeroSlideRecord[] }>('/hero-slides?active=1');
    return (res.data || []).map(normalizeSlide);
  },
};

