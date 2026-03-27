import { client } from './client';
import type { ListResponse, Enquiry } from '../types';
import { createMockCrud, MOCK_ENQUIRIES } from './mockStore';

const USE_MOCK = import.meta.env.DEV && import.meta.env.VITE_MOCK_AUTH === 'true';
const mock = USE_MOCK ? createMockCrud<Enquiry>(MOCK_ENQUIRIES, 'enquiries_mock') : null;

export const enquiriesApi = {
  list: USE_MOCK
    ? (page = 1) => mock!.list()
    : (page = 1) => client.request<ListResponse<Enquiry>>(`/enquiries?page=${page}`),
};
