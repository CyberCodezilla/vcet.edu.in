import { get } from './api';

export interface NoticeRecord {
  id: number;
  title: string;
  body: string;
  type: 'general' | 'info' | 'warning' | 'urgent';
  link_url: string | null;
  link_label: string | null;
  is_active: boolean;
  deactivates_at: string | null;
  created_at: string;
  updated_at: string;
}

export const noticesService = {
  list: () => get<NoticeRecord[]>('/notices'),
};
