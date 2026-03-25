import { client } from './client';
import type { ListResponse, ItemResponse, DeleteResponse, PlacementPartner, PlacementPartnerPayload } from '../types';
import { createMockCrud, MOCK_PLACEMENT_PARTNERS } from './mockStore';
import { resolveUploadedAssetUrl } from '../../utils/uploadedAssets';

const USE_MOCK = import.meta.env.DEV && import.meta.env.VITE_MOCK_AUTH === 'true';
const mock = USE_MOCK ? createMockCrud<PlacementPartner>(MOCK_PLACEMENT_PARTNERS, 'vcet_mock_placement_partners') : null;

function normalizePlacementPartner(partner: PlacementPartner): PlacementPartner {
  return {
    ...partner,
    logo: resolveUploadedAssetUrl(partner.logo) ?? partner.logo,
  };
}

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
    ? async () => {
        const response = await mock!.list();
        return {
          ...response,
          data: response.data.map(normalizePlacementPartner),
        } as ListResponse<PlacementPartner>;
      }
    : async () => {
        const response = await client.request<ListResponse<PlacementPartner>>('/placement-partners');
        return {
          ...response,
          data: response.data.map(normalizePlacementPartner),
        };
      },

  get: USE_MOCK
    ? async (id: number) => {
        const response = await mock!.get(id);
        return {
          ...response,
          data: normalizePlacementPartner(response.data),
        } as ItemResponse<PlacementPartner>;
      }
    : (id: number) =>
        client.request<ItemResponse<PlacementPartner>>(`/placement-partners/${id}`).then((response) => ({
          ...response,
          data: normalizePlacementPartner(response.data),
        })),

  create: USE_MOCK
    ? async (payload: PlacementPartnerPayload) => {
        const response = await mock!.create(payload as unknown as Partial<PlacementPartner>);
        return {
          ...response,
          data: normalizePlacementPartner(response.data),
        } as ItemResponse<PlacementPartner>;
      }
    : (payload: PlacementPartnerPayload) =>
        client.requestForm<ItemResponse<PlacementPartner>>('/placement-partners', toFormData(payload)).then((response) => ({
          ...response,
          data: normalizePlacementPartner(response.data),
        })),

  update: USE_MOCK
    ? async (id: number, payload: PlacementPartnerPayload) => {
        const response = await mock!.update(id, payload as unknown as Partial<PlacementPartner>);
        return {
          ...response,
          data: normalizePlacementPartner(response.data),
        } as ItemResponse<PlacementPartner>;
      }
    : (id: number, payload: PlacementPartnerPayload) => {
        const form = toFormData(payload);
        form.append('_method', 'PUT');
        return client.requestForm<ItemResponse<PlacementPartner>>(`/placement-partners/${id}`, form).then((response) => ({
          ...response,
          data: normalizePlacementPartner(response.data),
        }));
      },

  delete: USE_MOCK
    ? (id: number) => mock!.delete(id)
    : (id: number) => client.request<DeleteResponse>(`/placement-partners/${id}`, { method: 'DELETE' }),
};
