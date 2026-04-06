import { client } from './client';
import type {
  ListResponse,
  ItemResponse,
  DeleteResponse,
  HomepageBanner,
  HomepageBannerPayload,
} from '../types';
import { createMockCrud, MOCK_HOMEPAGE_BANNERS } from './mockStore';
import { resolveUploadedAssetUrl } from '../../utils/uploadedAssets';

const USE_MOCK = import.meta.env.DEV && import.meta.env.VITE_MOCK_AUTH === 'true';
const mock = USE_MOCK
  ? createMockCrud<HomepageBanner>(MOCK_HOMEPAGE_BANNERS, 'vcet_mock_homepage_banners')
  : null;

function normalizeBanner(banner: HomepageBanner): HomepageBanner {
  return {
    ...banner,
    image_url: resolveUploadedAssetUrl(banner.image_url),
  };
}

function toFormData(payload: HomepageBannerPayload): FormData {
  const form = new FormData();
  (Object.entries(payload) as [string, unknown][]).forEach(([key, val]) => {
    if (val === undefined || val === null) return;
    if (val instanceof File) form.append(key, val);
    else if (typeof val === 'boolean') form.append(key, val ? '1' : '0');
    else form.append(key, String(val));
  });
  return form;
}

export const homepageBannersApi = {
  list: USE_MOCK
    ? async () => {
        const response = await mock!.list();
        return {
          ...response,
          data: response.data.map(normalizeBanner),
        } as ListResponse<HomepageBanner>;
      }
      : async () => {
        const response = await client.request<ListResponse<HomepageBanner>>('/homepage-banners');
        return {
          ...response,
          data: response.data.map(normalizeBanner),
        };
      },

  get: USE_MOCK
    ? async (id: number) => {
        const response = await mock!.get(id);
        return {
          ...response,
          data: normalizeBanner(response.data),
        } as ItemResponse<HomepageBanner>;
      }
    : (id: number) =>
        client.request<ItemResponse<HomepageBanner>>(`/homepage-banners/${id}`).then((response) => ({
          ...response,
          data: normalizeBanner(response.data),
        })),

  create: USE_MOCK
    ? async (payload: HomepageBannerPayload) => {
        const response = await mock!.create(payload as unknown as Partial<HomepageBanner>);
        return {
          ...response,
          data: normalizeBanner(response.data),
        } as ItemResponse<HomepageBanner>;
      }
    : (payload: HomepageBannerPayload) =>
        client.requestForm<ItemResponse<HomepageBanner>>('/homepage-banners', toFormData(payload)).then((response) => ({
          ...response,
          data: normalizeBanner(response.data),
        })),

  update: USE_MOCK
    ? async (id: number, payload: HomepageBannerPayload) => {
        const response = await mock!.update(id, payload as unknown as Partial<HomepageBanner>);
        return {
          ...response,
          data: normalizeBanner(response.data),
        } as ItemResponse<HomepageBanner>;
      }
    : (id: number, payload: HomepageBannerPayload) => {
        const form = toFormData(payload);
        form.append('_method', 'PUT');
        return client.requestForm<ItemResponse<HomepageBanner>>(`/homepage-banners/${id}`, form).then((response) => ({
          ...response,
          data: normalizeBanner(response.data),
        }));
      },

  delete: USE_MOCK
    ? (id: number) => mock!.delete(id)
    : (id: number) => client.request<DeleteResponse>(`/homepage-banners/${id}`, { method: 'DELETE' }),
};
