import { client } from './client';
import type { ListResponse, ItemResponse, DeleteResponse, Event, EventPayload } from '../types';
import { createMockCrud, MOCK_EVENTS } from './mockStore';
import { resolveUploadedAssetUrl } from '../../utils/uploadedAssets';

const USE_MOCK = import.meta.env.DEV && import.meta.env.VITE_MOCK_AUTH === 'true';
const mock = USE_MOCK ? createMockCrud<Event>(MOCK_EVENTS, 'vcet_mock_events') : null;

interface EventPaginatorResponse {
  data: Event[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

type EventApiShape = Event & {
  image_url?: string | null;
  admin_image_url?: string | null;
  poster?: string | null;
  poster_url?: string | null;
  attachment_url?: string | null;
  pdf_url?: string | null;
  admin_pdf_url?: string | null;
  document_url?: string | null;
};

function normalizeEvent(event: Event): Event {
  const raw = event as EventApiShape;

  return {
    ...event,
    image: resolveUploadedAssetUrl(raw.image ?? raw.admin_image_url ?? raw.image_url ?? raw.poster ?? raw.poster_url),
    attachment: resolveUploadedAssetUrl(
      raw.attachment ??
      raw.attachment_url ??
      raw.pdf_url ??
      raw.admin_pdf_url ??
      raw.document_url
    ),
  };
}

function asListResponse(payload: EventPaginatorResponse): ListResponse<Event> {
  return {
    success: true,
    data: payload.data.map(normalizeEvent),
    meta: {
      current_page: payload.current_page,
      last_page: payload.last_page,
      total: payload.total,
      per_page: payload.per_page,
    },
  };
}

function toFormData(payload: EventPayload): FormData {
  const form = new FormData();
  (Object.entries(payload) as [string, unknown][]).forEach(([key, val]) => {
    if (val === undefined || val === null) return;
    if (val instanceof File) {
      form.append(key, val);
      if (key === 'attachment') form.append('pdf', val);
    } else if (typeof val === 'boolean') {
      form.append(key, val ? '1' : '0');
    } else {
      form.append(key, String(val));
    }
  });
  return form;
}

async function fetchEventById(id: number): Promise<Event> {
  let page = 1;
  let lastPage = 1;

  do {
    const payload = await client.request<EventPaginatorResponse>(`/events/all?page=${page}`);
    const found = payload.data.find((item) => item.id === id);
    if (found) return found;

    page += 1;
    lastPage = payload.last_page;
  } while (page <= lastPage);

  throw new Error(`Event ${id} not found`);
}

export const eventsApi = {
  list: USE_MOCK
    ? async () => {
        const response = await mock!.list();
        return {
          ...response,
          data: response.data.map(normalizeEvent),
        } as ListResponse<Event>;
      }
    : async (page = 1) => {
        const payload = await client.request<EventPaginatorResponse>(`/events/all?page=${page}`);
        return asListResponse(payload);
      },

  get: USE_MOCK
    ? (id: number) => mock!.get(id)
    : async (id: number) => {
        const evt = await fetchEventById(id);
        return { success: true, data: normalizeEvent(evt) } as ItemResponse<Event>;
      },

  create: USE_MOCK
    ? (payload: EventPayload) => mock!.create(payload as unknown as Partial<Event>)
    : (payload: EventPayload) =>
        client
          .requestForm<ItemResponse<Event>>('/events', toFormData(payload))
          .then((response) => ({ ...response, data: normalizeEvent(response.data) })),

  update: USE_MOCK
    ? (id: number, payload: EventPayload) => mock!.update(id, payload as unknown as Partial<Event>)
    : (id: number, payload: EventPayload) => {
        const form = toFormData(payload);
        form.append('_method', 'PUT');
        return client
          .requestForm<ItemResponse<Event>>(`/events/${id}`, form)
          .then((response) => ({ ...response, data: normalizeEvent(response.data) }));
      },

  delete: USE_MOCK
    ? (id: number) => mock!.delete(id)
    : (id: number) => client.request<DeleteResponse>(`/events/${id}`, { method: 'DELETE' }),
};
