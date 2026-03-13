import { client } from './client';
import type { ListResponse, ItemResponse, DeleteResponse, PlacementPartner, PlacementPartnerPayload } from '../types';
import { createMockCrud, MOCK_PLACEMENT_PARTNERS } from './mockStore';

const USE_MOCK = import.meta.env.DEV && import.meta.env.VITE_MOCK_AUTH === 'true';
const mock = USE_MOCK ? createMockCrud<PlacementPartner>(MOCK_PLACEMENT_PARTNERS) : null;

function toFormData(payload: PlacementPartnerPayload): FormData {
  const form = new FormData();
  (Object.entries(payload) as [string, unknown][]).forEach(([key, val]) => {
    if (val === undefined || val === null) return;
    if (val instanceof File) form.append(key, val);
    else if (typeof val === 'boolean') form.append(key, val ? '1' : '0');
    else form.append(key, String(val));
  });
  return form;
}

export const placementPartnersApi = {
  list: USE_MOCK
    ? () => mock!.list()
    : () => client.request<ListResponse<PlacementPartner>>('/placement-partners'),

  get: USE_MOCK
    ? (id: number) => mock!.get(id)
    : (id: number) => client.request<ItemResponse<PlacementPartner>>(`/placement-partners/${id}`),

  create: USE_MOCK
    ? (payload: PlacementPartnerPayload) => mock!.create(payload as unknown as Partial<PlacementPartner>)
    : (payload: PlacementPartnerPayload) => client.requestForm<ItemResponse<PlacementPartner>>('/placement-partners', toFormData(payload)),

  update: USE_MOCK
    ? (id: number, payload: PlacementPartnerPayload) => mock!.update(id, payload as unknown as Partial<PlacementPartner>)
    : (id: number, payload: PlacementPartnerPayload) => {
        const form = toFormData(payload);
        form.append('_method', 'PUT');
        return client.requestForm<ItemResponse<PlacementPartner>>(`/placement-partners/${id}`, form);
      },

  delete: USE_MOCK
    ? (id: number) => mock!.delete(id)
    : (id: number) => client.request<DeleteResponse>(`/placement-partners/${id}`, { method: 'DELETE' }),
};
