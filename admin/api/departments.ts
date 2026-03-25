import { client } from './client';
import type { ListResponse, ItemResponse, DeleteResponse, Department, DepartmentPayload } from '../types';
import { createMockCrud, MOCK_DEPARTMENTS } from './mockStore';

const USE_MOCK = import.meta.env.DEV && import.meta.env.VITE_MOCK_AUTH === 'true';
const mock = USE_MOCK ? createMockCrud<Department>(MOCK_DEPARTMENTS, 'vcet_mock_departments') : null;

export const departmentApi = {
  list: USE_MOCK
    ? () => mock!.list()
    : () => client.request<ListResponse<Department>>('/departments/all'),

  get: USE_MOCK
    ? (id: number) => mock!.get(id)
    : (id: number) => client.request<ItemResponse<Department>>(`/departments/${id}`),

  getBySlug: USE_MOCK
    ? async (slug: string) => {
        const res = await mock!.list();
        const item = res.data.find(d => d.slug === slug);
        if (!item) throw new Error('Department not found');
        return { success: true, data: item };
      }
    : (slug: string) => client.request<ItemResponse<Department>>(`/departments/slug/${slug}`),

  create: USE_MOCK
    ? (payload: DepartmentPayload) => mock!.create(payload as unknown as Partial<Department>)
    : (payload: DepartmentPayload) =>
        client.request<ItemResponse<Department>>('/departments', {
          method: 'POST',
          body: JSON.stringify(payload),
        }),

  update: USE_MOCK
    ? (id: number, payload: DepartmentPayload) => mock!.update(id, payload as unknown as Partial<Department>)
    : (id: number, payload: DepartmentPayload) =>
        client.request<ItemResponse<Department>>(`/departments/${id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        }),

  delete: USE_MOCK
    ? (id: number) => mock!.delete(id)
    : (id: number) => client.request<DeleteResponse>(`/departments/${id}`, { method: 'DELETE' }),
};
