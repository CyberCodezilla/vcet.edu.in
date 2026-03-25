import { client } from './client';
import type { ListResponse, ItemResponse, DeleteResponse, Testimonial, TestimonialPayload } from '../types';
import { createMockCrud, MOCK_TESTIMONIALS } from './mockStore';
import { resolveUploadedAssetUrl } from '../../utils/uploadedAssets';

const USE_MOCK = import.meta.env.DEV && import.meta.env.VITE_MOCK_AUTH === 'true';
const mock = USE_MOCK ? createMockCrud<Testimonial>(MOCK_TESTIMONIALS, 'vcet_mock_testimonials') : null;

function normalizeTestimonial(testimonial: Testimonial): Testimonial {
  return {
    ...testimonial,
    photo: resolveUploadedAssetUrl(testimonial.photo),
  };
}

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
    ? async () => {
        const response = await mock!.list();
        return {
          ...response,
          data: response.data.map(normalizeTestimonial),
        } as ListResponse<Testimonial>;
      }
    : async () => {
        const response = await client.request<ListResponse<Testimonial>>('/testimonials');
        return {
          ...response,
          data: response.data.map(normalizeTestimonial),
        };
      },

  get: USE_MOCK
    ? async (id: number) => {
        const response = await mock!.get(id);
        return {
          ...response,
          data: normalizeTestimonial(response.data),
        } as ItemResponse<Testimonial>;
      }
    : (id: number) =>
        client.request<ItemResponse<Testimonial>>(`/testimonials/${id}`).then((response) => ({
          ...response,
          data: normalizeTestimonial(response.data),
        })),

  create: USE_MOCK
    ? async (payload: TestimonialPayload) => {
        const response = await mock!.create(payload as unknown as Partial<Testimonial>);
        return {
          ...response,
          data: normalizeTestimonial(response.data),
        } as ItemResponse<Testimonial>;
      }
    : (payload: TestimonialPayload) =>
        client.requestForm<ItemResponse<Testimonial>>('/testimonials', toFormData(payload)).then((response) => ({
          ...response,
          data: normalizeTestimonial(response.data),
        })),

  update: USE_MOCK
    ? async (id: number, payload: TestimonialPayload) => {
        const response = await mock!.update(id, payload as unknown as Partial<Testimonial>);
        return {
          ...response,
          data: normalizeTestimonial(response.data),
        } as ItemResponse<Testimonial>;
      }
    : (id: number, payload: TestimonialPayload) => {
        const form = toFormData(payload);
        form.append('_method', 'PUT');
        return client.requestForm<ItemResponse<Testimonial>>(`/testimonials/${id}`, form).then((response) => ({
          ...response,
          data: normalizeTestimonial(response.data),
        }));
      },

  delete: USE_MOCK
    ? (id: number) => mock!.delete(id)
    : (id: number) => client.request<DeleteResponse>(`/testimonials/${id}`, { method: 'DELETE' }),
};
