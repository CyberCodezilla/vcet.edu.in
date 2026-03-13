import { client } from './client';
import type { ListResponse, ItemResponse, DeleteResponse, Notice, NoticePayload } from '../types';
import { createMockCrud, MOCK_NOTICES } from './mockStore';

const USE_MOCK = import.meta.env.DEV && import.meta.env.VITE_MOCK_AUTH === 'true';
const mock = USE_MOCK ? createMockCrud<Notice>(MOCK_NOTICES) : null;

function toFormData(payload: NoticePayload): FormData {
  const form = new FormData();
  (Object.entries(payload) as [string, unknown][]).forEach(([key, val]) => {
    if (val === undefined || val === null) return;
    if (val instanceof File) {
      form.append(key, val);
    } else if (typeof val === 'boolean') {
      form.append(key, val ? '1' : '0');
    } else {
      form.append(key, String(val));
    }
  });
  return form;
}

export const noticesApi = {
  list: USE_MOCK
    ? () => mock!.list()
    : () => client.request<ListResponse<Notice>>('/notices'),

  get: USE_MOCK
    ? (id: number) => mock!.get(id)
    : (id: number) => client.request<ItemResponse<Notice>>(`/notices/${id}`),

  create: USE_MOCK
    ? (payload: NoticePayload) => mock!.create(payload as unknown as Partial<Notice>)
    : (payload: NoticePayload) => client.requestForm<ItemResponse<Notice>>('/notices', toFormData(payload)),

  update: USE_MOCK
    ? (id: number, payload: NoticePayload) => mock!.update(id, payload as unknown as Partial<Notice>)
    : (id: number, payload: NoticePayload) => {
        const form = toFormData(payload);
        form.append('_method', 'PUT');
        return client.requestForm<ItemResponse<Notice>>(`/notices/${id}`, form);
      },

  delete: USE_MOCK
    ? (id: number) => mock!.delete(id)
    : (id: number) => client.request<DeleteResponse>(`/notices/${id}`, { method: 'DELETE' }),
};
