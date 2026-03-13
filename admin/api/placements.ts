import { client } from './client';
import type { ListResponse, ItemResponse, DeleteResponse, Placement, PlacementPayload } from '../types';
import { createMockCrud, MOCK_PLACEMENTS } from './mockStore';

const USE_MOCK = import.meta.env.DEV && import.meta.env.VITE_MOCK_AUTH === 'true';
const mock = USE_MOCK ? createMockCrud<Placement>(MOCK_PLACEMENTS) : null;

function toFormData(payload: PlacementPayload): FormData {
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

export const placementsApi = {
  list: USE_MOCK
    ? () => mock!.list()
    : () => client.request<ListResponse<Placement>>('/placements'),

  get: USE_MOCK
    ? (id: number) => mock!.get(id)
    : (id: number) => client.request<ItemResponse<Placement>>(`/placements/${id}`),

  create: USE_MOCK
    ? (payload: PlacementPayload) => mock!.create(payload as unknown as Partial<Placement>)
    : (payload: PlacementPayload) => client.requestForm<ItemResponse<Placement>>('/placements', toFormData(payload)),

  update: USE_MOCK
    ? (id: number, payload: PlacementPayload) => mock!.update(id, payload as unknown as Partial<Placement>)
    : (id: number, payload: PlacementPayload) => {
        const form = toFormData(payload);
        form.append('_method', 'PUT');
        return client.requestForm<ItemResponse<Placement>>(`/placements/${id}`, form);
      },

  delete: USE_MOCK
    ? (id: number) => mock!.delete(id)
    : (id: number) => client.request<DeleteResponse>(`/placements/${id}`, { method: 'DELETE' }),
};
