import { client } from './client';
import type { ListResponse, Enquiry } from '../types';
import { createMockCrud, MOCK_ENQUIRIES } from './mockStore';

interface EnquiryListOptions {
  segment?: 'mms';
}

const USE_MOCK = import.meta.env.DEV && import.meta.env.VITE_MOCK_AUTH === 'true';
const mock = USE_MOCK ? createMockCrud<Enquiry>(MOCK_ENQUIRIES, 'enquiries_mock') : null;

export const enquiriesApi = {
  list: USE_MOCK
    ? (page = 1) => mock!.list()
    : (page = 1, options?: EnquiryListOptions) => {
      const params = new URLSearchParams({ page: String(page) });
      if (options?.segment) {
        params.set('segment', options.segment);
      }
      return client.request<ListResponse<Enquiry>>(`/enquiries?${params.toString()}`);
    },

  updateReadStatus: USE_MOCK
    ? (id: number, is_read: boolean) => mock!.update(id, { is_read } as Partial<Enquiry>)
    : (id: number, is_read: boolean) => client.request<{ message: string; data: Enquiry }>(`/enquiries/${id}/read-status`, {
      method: 'PATCH',
      body: JSON.stringify({ is_read }),
    }),

  remove: USE_MOCK
    ? (id: number) => mock!.delete(id)
    : (id: number) => client.request<{ message: string }>(`/enquiries/${id}`, {
      method: 'DELETE',
    }),
};
