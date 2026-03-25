import { client } from './client';
import type { ListResponse, ItemResponse, DeleteResponse, Faculty, FacultyPayload } from '../types';
import { createMockCrud, MOCK_FACULTY } from './mockStore';

const USE_MOCK = import.meta.env.DEV && import.meta.env.VITE_MOCK_AUTH === 'true';
const mock = USE_MOCK ? createMockCrud<Faculty>(MOCK_FACULTY, 'vcet_mock_faculty') : null;

export const facultyApi = {
  list: USE_MOCK
    ? () => mock!.list()
    : () => client.request<ListResponse<Faculty>>('/faculty/all'),

  get: USE_MOCK
    ? (id: number) => mock!.get(id)
    : (id: number) => client.request<ItemResponse<Faculty>>(`/faculty/${id}`),

  create: USE_MOCK
    ? (payload: FacultyPayload) => mock!.create(payload as unknown as Partial<Faculty>)
    : (payload: FacultyPayload) =>
        client.request<ItemResponse<Faculty>>('/faculty', {
          method: 'POST',
          body: JSON.stringify(payload),
        }),

  update: USE_MOCK
    ? (id: number, payload: FacultyPayload) => mock!.update(id, payload as unknown as Partial<Faculty>)
    : (id: number, payload: FacultyPayload) =>
        client.request<ItemResponse<Faculty>>(`/faculty/${id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        }),

  delete: USE_MOCK
    ? (id: number) => mock!.delete(id)
    : (id: number) => client.request<DeleteResponse>(`/faculty/${id}`, { method: 'DELETE' }),
};
