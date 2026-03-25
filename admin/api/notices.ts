import { client } from './client';
import type { ListResponse, ItemResponse, DeleteResponse, Notice, NoticePayload } from '../types';
import { createMockCrud, MOCK_NOTICES } from './mockStore';
import { resolveUploadedAssetUrl } from '../../utils/uploadedAssets';

const USE_MOCK = import.meta.env.DEV && import.meta.env.VITE_MOCK_AUTH === 'true';
const mock = USE_MOCK ? createMockCrud<Notice>(MOCK_NOTICES, 'vcet_mock_notices') : null;

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
    data: payload.data.map(normalizeNotice),
    meta: {
      current_page: payload.current_page,
      last_page: payload.last_page,
      total: payload.total,
      per_page: payload.per_page,
    },
  };
}

function normalizeNotice(notice: Notice): Notice {
  return {
    ...notice,
    pdf_url: resolveUploadedAssetUrl(notice.pdf_url),
    admin_pdf_url: resolveUploadedAssetUrl(notice.admin_pdf_url),
  };
}

function appendNullable(formData: FormData, key: string, value: string | boolean | null | undefined): void {
  if (value === null || value === undefined || value === '') return;
  formData.append(key, typeof value === 'boolean' ? String(value) : value);
}

function toFormData(payload: NoticePayload, method?: 'PATCH'): FormData {
  const formData = new FormData();
  formData.append('title', payload.title.trim());
  formData.append('body', payload.body.trim());
  formData.append('type', payload.type ?? 'general');
  formData.append('is_active', (payload.is_active ?? true) ? '1' : '0');
  appendNullable(formData, 'link_url', payload.link_url?.trim() ? payload.link_url.trim() : null);
  appendNullable(formData, 'link_label', payload.link_label?.trim() ? payload.link_label.trim() : null);
  appendNullable(formData, 'deactivates_at', payload.deactivates_at ?? null);

  if (payload.remove_pdf) {
    formData.append('remove_pdf', '1');
  }

  if (payload.pdf) {
    formData.append('pdf', payload.pdf);
  }

  if (method) {
    formData.append('_method', method);
  }

  return formData;
}

function toMockPayload(payload: NoticePayload): Partial<Notice> {
  const base: Partial<Notice> = {
    title: payload.title.trim(),
    body: payload.body.trim(),
    type: payload.type ?? 'general',
    is_active: payload.is_active ?? true,
    link_url: payload.link_url?.trim() ? payload.link_url.trim() : null,
    link_label: payload.link_label?.trim() ? payload.link_label.trim() : null,
    deactivates_at: payload.deactivates_at ?? null,
  };

  if (payload.remove_pdf) {
    return {
      ...base,
      pdf_name: null,
      pdf_mime_type: null,
      pdf_size: null,
      has_pdf: false,
      pdf_url: null,
      admin_pdf_url: null,
    };
  }

  if (payload.pdf) {
    const pdfUrl = URL.createObjectURL(payload.pdf);
    return {
      ...base,
      pdf_name: payload.pdf.name,
      pdf_mime_type: payload.pdf.type || 'application/pdf',
      pdf_size: payload.pdf.size,
      has_pdf: true,
      pdf_url: pdfUrl,
      admin_pdf_url: pdfUrl,
    };
  }

  return base;
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
    ? async (_page = 1) => {
        const response = await mock!.list();
        return {
          ...response,
          data: response.data.map(normalizeNotice),
        } as ListResponse<Notice>;
      }
    : async (page = 1) => {
        const payload = await client.request<NoticePaginatorResponse>(`/notices/all?page=${page}`);
        return asListResponse(payload);
      },

  get: USE_MOCK
    ? async (id: number) => {
        const response = await mock!.get(id);
        return {
          ...response,
          data: normalizeNotice(response.data),
        } as ItemResponse<Notice>;
      }
    : async (id: number) => {
        const notice = await fetchNoticeById(id);
        return { success: true, data: normalizeNotice(notice) } as ItemResponse<Notice>;
      },

  create: USE_MOCK
    ? async (payload: NoticePayload) => {
        const response = await mock!.create(toMockPayload(payload));
        return {
          ...response,
          data: normalizeNotice(response.data),
        } as ItemResponse<Notice>;
      }
    : async (payload: NoticePayload) => {
        const response = await client.requestForm<NoticeActionResponse>('/notices', toFormData(payload));

        return {
          success: true,
          data: normalizeNotice(response.notice),
          message: response.message,
        } as ItemResponse<Notice>;
      },

  update: USE_MOCK
    ? async (id: number, payload: NoticePayload) => {
        const response = await mock!.update(id, toMockPayload(payload));
        return {
          ...response,
          data: normalizeNotice(response.data),
        } as ItemResponse<Notice>;
      }
    : async (id: number, payload: NoticePayload) => {
        const response = await client.requestForm<NoticeActionResponse>(
          `/notices/${id}`,
          toFormData(payload, 'PATCH'),
        );

        return {
          success: true,
          data: normalizeNotice(response.notice),
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

  activate: USE_MOCK
    ? async (id: number) => {
        const response = await mock!.update(id, { is_active: true });
        return {
          success: true,
          data: normalizeNotice(response.data),
          message: 'Notice activated.',
        } as ItemResponse<Notice>;
      }
    : async (id: number) => {
        const response = await client.request<NoticeActionResponse>(`/notices/${id}/activate`, {
          method: 'PATCH',
        });

        return {
          success: true,
          data: normalizeNotice(response.notice),
          message: response.message,
        } as ItemResponse<Notice>;
      },

  deactivate: USE_MOCK
    ? async (id: number) => {
        const response = await mock!.update(id, { is_active: false });
        return {
          success: true,
          data: normalizeNotice(response.data),
          message: 'Notice deactivated.',
        } as ItemResponse<Notice>;
      }
    : async (id: number) => {
        const response = await client.request<NoticeActionResponse>(`/notices/${id}/deactivate`, {
          method: 'PATCH',
        });

        return {
          success: true,
          data: normalizeNotice(response.notice),
          message: response.message,
        } as ItemResponse<Notice>;
      },
};
