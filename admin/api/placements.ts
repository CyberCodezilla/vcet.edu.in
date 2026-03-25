import { client } from './client';
import type { ListResponse, ItemResponse, DeleteResponse, Placement, PlacementPayload } from '../types';
import { createMockCrud, MOCK_PLACEMENTS } from './mockStore';
import { resolveUploadedAssetUrl } from '../../utils/uploadedAssets';

const USE_MOCK = import.meta.env.DEV && import.meta.env.VITE_MOCK_AUTH === 'true';
const mock = USE_MOCK ? createMockCrud<Placement>(MOCK_PLACEMENTS, 'vcet_mock_placements') : null;

interface PlacementPaginatorResponse {
  data: Placement[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

function normalizePlacement(p: Placement): Placement {
  return {
    ...p,
    logo: resolveUploadedAssetUrl(p.logo),
  };
}

function asListResponse(payload: PlacementPaginatorResponse): ListResponse<Placement> {
  return {
    success: true,
    data: payload.data.map(normalizePlacement),
    meta: {
      current_page: payload.current_page,
      last_page: payload.last_page,
      total: payload.total,
      per_page: payload.per_page,
    },
  };
}

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

async function fetchPlacementById(id: number): Promise<Placement> {
  let page = 1;
  let lastPage = 1;

  do {
    const payload = await client.request<PlacementPaginatorResponse>(`/placements/all?page=${page}`);
    const found = payload.data.find((item) => item.id === id);
    if (found) return found;

    page += 1;
    lastPage = payload.last_page;
  } while (page <= lastPage);

  throw new Error(`Placement ${id} not found`);
}

export const placementsApi = {
  list: USE_MOCK
    ? async () => {
        const response = await mock!.list();
        return {
          ...response,
          data: response.data.map(normalizePlacement),
        } as ListResponse<Placement>;
      }
    : async (page = 1) => {
        const payload = await client.request<PlacementPaginatorResponse>(`/placements/all?page=${page}`);
        return asListResponse(payload);
      },

  get: USE_MOCK
    ? (id: number) => mock!.get(id)
    : async (id: number) => {
        const p = await fetchPlacementById(id);
        return { success: true, data: normalizePlacement(p) } as ItemResponse<Placement>;
      },

  create: USE_MOCK
    ? async (payload: PlacementPayload) => {
        const response = await mock!.create(payload as unknown as Partial<Placement>);
        return {
          ...response,
          data: normalizePlacement(response.data),
        } as ItemResponse<Placement>;
      }
    : (payload: PlacementPayload) =>
        client.requestForm<ItemResponse<Placement>>('/placements', toFormData(payload)).then((response) => ({
          ...response,
          data: normalizePlacement(response.data),
        })),

  update: USE_MOCK
    ? async (id: number, payload: PlacementPayload) => {
        const response = await mock!.update(id, payload as unknown as Partial<Placement>);
        return {
          ...response,
          data: normalizePlacement(response.data),
        } as ItemResponse<Placement>;
      }
    : (id: number, payload: PlacementPayload) => {
        const form = toFormData(payload);
        form.append('_method', 'PUT');
        return client.requestForm<ItemResponse<Placement>>(`/placements/${id}`, form).then((response) => ({
          ...response,
          data: normalizePlacement(response.data),
        }));
      },

  delete: USE_MOCK
    ? (id: number) => mock!.delete(id)
    : (id: number) => client.request<DeleteResponse>(`/placements/${id}`, { method: 'DELETE' }),
};
