import { client } from './client';
import type { ListResponse, ItemResponse, DeleteResponse, Event, EventPayload } from '../types';
import { createMockCrud, MOCK_EVENTS } from './mockStore';

const USE_MOCK = import.meta.env.DEV && import.meta.env.VITE_MOCK_AUTH === 'true';
const mock = USE_MOCK ? createMockCrud<Event>(MOCK_EVENTS) : null;

function toFormData(payload: EventPayload): FormData {
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

export const eventsApi = {
  list: USE_MOCK
    ? () => mock!.list()
    : () => client.request<ListResponse<Event>>('/events'),

  get: USE_MOCK
    ? (id: number) => mock!.get(id)
    : (id: number) => client.request<ItemResponse<Event>>(`/events/${id}`),

  create: USE_MOCK
    ? (payload: EventPayload) => mock!.create(payload as unknown as Partial<Event>)
    : (payload: EventPayload) => client.requestForm<ItemResponse<Event>>('/events', toFormData(payload)),

  update: USE_MOCK
    ? (id: number, payload: EventPayload) => mock!.update(id, payload as unknown as Partial<Event>)
    : (id: number, payload: EventPayload) => {
        const form = toFormData(payload);
        form.append('_method', 'PUT');
        return client.requestForm<ItemResponse<Event>>(`/events/${id}`, form);
      },

  delete: USE_MOCK
    ? (id: number) => mock!.delete(id)
    : (id: number) => client.request<DeleteResponse>(`/events/${id}`, { method: 'DELETE' }),
};
