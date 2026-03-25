import { client } from './client';
import type { ListResponse, ItemResponse, DeleteResponse, HeroSlide, HeroSlidePayload } from '../types';
import { createMockCrud, MOCK_HERO_SLIDES } from './mockStore';
import { resolveUploadedAssetUrl } from '../../utils/uploadedAssets';

const USE_MOCK = import.meta.env.DEV && import.meta.env.VITE_MOCK_AUTH === 'true';
const mock = USE_MOCK ? createMockCrud<HeroSlide>(MOCK_HERO_SLIDES, 'vcet_mock_heroslides') : null;

function normalizeHeroSlide(slide: HeroSlide): HeroSlide {
  return {
    ...slide,
    image_url: resolveUploadedAssetUrl(slide.image_url),
  };
}

function toFormData(payload: HeroSlidePayload): FormData {
  const form = new FormData();
  (Object.entries(payload) as [string, unknown][]).forEach(([key, val]) => {
    if (val === undefined || val === null) return;
    if (val instanceof File) form.append(key, val);
    else if (typeof val === 'boolean') form.append(key, val ? '1' : '0');
    else form.append(key, String(val));
  });
  return form;
}

export const heroSlidesApi = {
  list: USE_MOCK
    ? async () => {
        const response = await mock!.list();
        return {
          ...response,
          data: response.data.map(normalizeHeroSlide),
        } as ListResponse<HeroSlide>;
      }
    : async () => {
        const response = await client.request<ListResponse<HeroSlide>>('/hero-slides');
        return {
          ...response,
          data: response.data.map(normalizeHeroSlide),
        };
      },

  get: USE_MOCK
    ? async (id: number) => {
        const response = await mock!.get(id);
        return {
          ...response,
          data: normalizeHeroSlide(response.data),
        } as ItemResponse<HeroSlide>;
      }
    : (id: number) =>
        client.request<ItemResponse<HeroSlide>>(`/hero-slides/${id}`).then((response) => ({
          ...response,
          data: normalizeHeroSlide(response.data),
        })),

  create: USE_MOCK
    ? async (payload: HeroSlidePayload) => {
        const response = await mock!.create(payload as unknown as Partial<HeroSlide>);
        return {
          ...response,
          data: normalizeHeroSlide(response.data),
        } as ItemResponse<HeroSlide>;
      }
    : (payload: HeroSlidePayload) =>
        client.requestForm<ItemResponse<HeroSlide>>('/hero-slides', toFormData(payload)).then((response) => ({
          ...response,
          data: normalizeHeroSlide(response.data),
        })),

  update: USE_MOCK
    ? async (id: number, payload: HeroSlidePayload) => {
        const response = await mock!.update(id, payload as unknown as Partial<HeroSlide>);
        return {
          ...response,
          data: normalizeHeroSlide(response.data),
        } as ItemResponse<HeroSlide>;
      }
    : (id: number, payload: HeroSlidePayload) => {
        const form = toFormData(payload);
        form.append('_method', 'PUT');
        return client.requestForm<ItemResponse<HeroSlide>>(`/hero-slides/${id}`, form).then((response) => ({
          ...response,
          data: normalizeHeroSlide(response.data),
        }));
      },

  delete: USE_MOCK
    ? (id: number) => mock!.delete(id)
    : (id: number) => client.request<DeleteResponse>(`/hero-slides/${id}`, { method: 'DELETE' }),
};
