import { client, resolveApiUrl } from '../admin/api/client';
import type { Event, ListResponse } from '../admin/types';
import { MOCK_EVENTS } from '../admin/api/mockStore';

const USE_MOCK = import.meta.env.DEV && import.meta.env.VITE_MOCK_AUTH === 'true';

type EventApiShape = Event & {
  image_url?: string | null;
  admin_image_url?: string | null;
  attachment_url?: string | null;
  pdf_url?: string | null;
  admin_pdf_url?: string | null;
};

function normalizeEvent(event: Event): Event {
  const raw = event as EventApiShape;

  return {
    ...event,
    image: resolveApiUrl(raw.image ?? raw.admin_image_url ?? raw.image_url),
    attachment: resolveApiUrl(raw.attachment ?? raw.admin_pdf_url ?? raw.pdf_url ?? raw.attachment_url),
  };
}

export const eventsService = {
  async list(): Promise<Event[]> {
    if (USE_MOCK) {
      return MOCK_EVENTS.filter(e => e.is_active).map(normalizeEvent);
    }
    
    // /api/events returns { success: true, data: Event[] } 
    // This is the public unpaginated route returning active events
    const res = await client.request<{ success: boolean; data: Event[] }>('/events').catch(e => {
      console.error("Failed fetching public events:", e);
      return { success: false, data: [] };
    });
    
    const items = Array.isArray(res?.data) ? res.data : [];
    return items.map(e => ({
      ...normalizeEvent(e),
      external_link: e.external_link || null,
      external_link_label: e.external_link_label || null,
    }));
  }
};
