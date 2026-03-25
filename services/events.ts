import { client } from '../admin/api/client';
import type { Event, ListResponse } from '../admin/types';
import { MOCK_EVENTS, readMockCollection } from '../admin/api/mockStore';
import { resolveUploadedAssetUrl } from '../utils/uploadedAssets';
import { USE_PUBLIC_MOCK, unwrapListResponse } from './publicData';

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
    image: resolveUploadedAssetUrl(raw.image ?? raw.admin_image_url ?? raw.image_url),
    attachment: resolveUploadedAssetUrl(raw.attachment ?? raw.admin_pdf_url ?? raw.pdf_url ?? raw.attachment_url),
  };
}

function isEventVisible(event: Event): boolean {
  if (!event.is_active) return false;
  if (event.status === 'Completed' || event.status === 'Cancelled') return false;

  if (!event.expiry_date) {
    return true;
  }

  const expiry = new Date(
    event.expiry_time
      ? `${event.expiry_date}T${event.expiry_time}`
      : `${event.expiry_date}T23:59:59`,
  );

  if (Number.isNaN(expiry.getTime())) {
    return true;
  }

  return expiry.getTime() > Date.now();
}

function sortUpcomingEvents(events: Event[]): Event[] {
  return [...events].sort((a, b) => {
    const aTime = a.date ? new Date(`${a.date}T00:00:00`).getTime() : Number.MAX_SAFE_INTEGER;
    const bTime = b.date ? new Date(`${b.date}T00:00:00`).getTime() : Number.MAX_SAFE_INTEGER;
    return aTime - bTime;
  });
}

export const eventsService = {
  async list(): Promise<Event[]> {
    if (USE_PUBLIC_MOCK) {
      return sortUpcomingEvents(
        readMockCollection<Event>('vcet_mock_events', MOCK_EVENTS)
          .map(normalizeEvent)
          .filter(isEventVisible),
      );
    }
    
    const res = await client.request<unknown>('/events').catch(e => {
      console.error("Failed fetching public events:", e);
      return [];
    });
    
    const items = unwrapListResponse<Event>(res);
    return sortUpcomingEvents(
      items
        .map(e => ({
          ...normalizeEvent(e),
          external_link: e.external_link || null,
          external_link_label: e.external_link_label || null,
        }))
        .filter(isEventVisible),
    );
  }
};
