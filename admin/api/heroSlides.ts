import { client } from './client';
import type { ListResponse, ItemResponse, DeleteResponse, HeroSlide, HeroSlidePayload } from '../types';
import { createMockCrud, MOCK_HERO_SLIDES } from './mockStore';

const USE_MOCK = import.meta.env.DEV && import.meta.env.VITE_MOCK_AUTH === 'true';
const mock = USE_MOCK ? createMockCrud<HeroSlide>(MOCK_HERO_SLIDES) : null;

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
    ? () => mock!.list()
    : () => client.request<ListResponse<HeroSlide>>('/hero-slides'),

  get: USE_MOCK
    ? (id: number) => mock!.get(id)
    : (id: number) => client.request<ItemResponse<HeroSlide>>(`/hero-slides/${id}`),

  create: USE_MOCK
    ? (payload: HeroSlidePayload) => mock!.create(payload as unknown as Partial<HeroSlide>)
    : (payload: HeroSlidePayload) => client.requestForm<ItemResponse<HeroSlide>>('/hero-slides', toFormData(payload)),

  update: USE_MOCK
    ? (id: number, payload: HeroSlidePayload) => mock!.update(id, payload as unknown as Partial<HeroSlide>)
    : (id: number, payload: HeroSlidePayload) => {
        const form = toFormData(payload);
        form.append('_method', 'PUT');
        return client.requestForm<ItemResponse<HeroSlide>>(`/hero-slides/${id}`, form);
      },

  delete: USE_MOCK
    ? (id: number) => mock!.delete(id)
    : (id: number) => client.request<DeleteResponse>(`/hero-slides/${id}`, { method: 'DELETE' }),
};
