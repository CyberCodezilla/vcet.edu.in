import { client } from './client';
import type { ListResponse, ItemResponse, DeleteResponse, Notice, NoticePayload } from '../types';
import { createMockCrud, MOCK_NOTICES } from './mockStore';

const USE_MOCK = import.meta.env.DEV && import.meta.env.VITE_MOCK_AUTH === 'true';
const mock = USE_MOCK ? createMockCrud<Notice>(MOCK_NOTICES) : null;

interface NoticePaginatorResponse {
  data: Notice[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface NoticeActionResponse {
  message: string;
  notice: Notice;
}

interface NoticeMessageResponse {
  message: string;
}

function asListResponse(payload: NoticePaginatorResponse): ListResponse<Notice> {
  return {
    success: true,
    data: payload.data,
    meta: {
      current_page: payload.current_page,
      last_page: payload.last_page,
      total: payload.total,
      per_page: payload.per_page,
    },
  };
}

function toBackendPayload(payload: NoticePayload): NoticePayload {
  return {
    title: payload.title.trim(),
    body: payload.body.trim(),
    type: payload.type ?? 'general',
    is_active: payload.is_active ?? true,
    link_url: payload.link_url?.trim() ? payload.link_url.trim() : null,
    link_label: payload.link_label?.trim() ? payload.link_label.trim() : null,
    deactivates_at: payload.deactivates_at ?? null,
  };
}

async function fetchNoticeById(id: number): Promise<Notice> {
  let page = 1;
  let lastPage = 1;

  do {
    const payload = await client.request<NoticePaginatorResponse>(`/notices/all?page=${page}`);
    const found = payload.data.find((item) => item.id === id);
    if (found) return found;

    page += 1;
    lastPage = payload.last_page;
  } while (page <= lastPage);

  throw new Error(`Notice ${id} not found`);
}

export const noticesApi = {
  list: USE_MOCK
    ? (_page = 1) => mock!.list()
    : async (page = 1) => {
        const payload = await client.request<NoticePaginatorResponse>(`/notices/all?page=${page}`);
        return asListResponse(payload);
      },

  get: USE_MOCK
    ? (id: number) => mock!.get(id)
    : async (id: number) => {
        const notice = await fetchNoticeById(id);
        return { success: true, data: notice } as ItemResponse<Notice>;
      },

  create: USE_MOCK
    ? (payload: NoticePayload) => mock!.create(payload as unknown as Partial<Notice>)
    : async (payload: NoticePayload) => {
        const response = await client.request<NoticeActionResponse>('/notices', {
          method: 'POST',
          body: JSON.stringify(toBackendPayload(payload)),
        });

        return {
          success: true,
          data: response.notice,
          message: response.message,
        } as ItemResponse<Notice>;
      },

  update: USE_MOCK
    ? (id: number, payload: NoticePayload) => mock!.update(id, payload as unknown as Partial<Notice>)
    : async (id: number, payload: NoticePayload) => {
        const response = await client.request<NoticeActionResponse>(`/notices/${id}`, {
          method: 'PATCH',
          body: JSON.stringify(toBackendPayload(payload)),
        });

        return {
          success: true,
          data: response.notice,
          message: response.message,
        } as ItemResponse<Notice>;
      },

  delete: USE_MOCK
    ? (id: number) => mock!.delete(id)
    : async (id: number) => {
        const response = await client.request<NoticeMessageResponse>(`/notices/${id}`, { method: 'DELETE' });
        return {
          success: true,
          message: response.message,
        } as DeleteResponse;
      },
};
