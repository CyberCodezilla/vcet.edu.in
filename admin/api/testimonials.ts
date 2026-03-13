import { client } from './client';
import type { ListResponse, ItemResponse, DeleteResponse, Testimonial, TestimonialPayload } from '../types';
import { createMockCrud, MOCK_TESTIMONIALS } from './mockStore';

const USE_MOCK = import.meta.env.DEV && import.meta.env.VITE_MOCK_AUTH === 'true';
const mock = USE_MOCK ? createMockCrud<Testimonial>(MOCK_TESTIMONIALS) : null;

function toFormData(payload: TestimonialPayload): FormData {
  const form = new FormData();
  (Object.entries(payload) as [string, unknown][]).forEach(([key, val]) => {
    if (val === undefined || val === null) return;
    if (val instanceof File) form.append(key, val);
    else if (typeof val === 'boolean') form.append(key, val ? '1' : '0');
    else form.append(key, String(val));
  });
  return form;
}

export const testimonialsApi = {
  list: USE_MOCK
    ? () => mock!.list()
    : () => client.request<ListResponse<Testimonial>>('/testimonials'),

  get: USE_MOCK
    ? (id: number) => mock!.get(id)
    : (id: number) => client.request<ItemResponse<Testimonial>>(`/testimonials/${id}`),

  create: USE_MOCK
    ? (payload: TestimonialPayload) => mock!.create(payload as unknown as Partial<Testimonial>)
    : (payload: TestimonialPayload) => client.requestForm<ItemResponse<Testimonial>>('/testimonials', toFormData(payload)),

  update: USE_MOCK
    ? (id: number, payload: TestimonialPayload) => mock!.update(id, payload as unknown as Partial<Testimonial>)
    : (id: number, payload: TestimonialPayload) => {
        const form = toFormData(payload);
        form.append('_method', 'PUT');
        return client.requestForm<ItemResponse<Testimonial>>(`/testimonials/${id}`, form);
      },

  delete: USE_MOCK
    ? (id: number) => mock!.delete(id)
    : (id: number) => client.request<DeleteResponse>(`/testimonials/${id}`, { method: 'DELETE' }),
};
