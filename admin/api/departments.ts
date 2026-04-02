import { client } from './client';
import type { ListResponse, ItemResponse, DeleteResponse, Department, DepartmentPayload } from '../types';
import { createMockCrud, MOCK_DEPARTMENTS } from './mockStore';

const USE_MOCK = import.meta.env.DEV && import.meta.env.VITE_MOCK_AUTH === 'true';
const mock = USE_MOCK ? createMockCrud<Department>(MOCK_DEPARTMENTS, 'vcet_mock_departments') : null;

function buildFormData(formData: FormData, data: any, parentKey?: string) {
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
    if (Array.isArray(data)) {
      if (data.length === 0) return;
      data.forEach((value, index) => {
        buildFormData(formData, value, parentKey ? `${parentKey}[${index}]` : index.toString());
      });
    } else {
      Object.keys(data).forEach(key => {
        buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
      });
    }
  } else {
    if (data !== null && data !== undefined) {
      if (typeof data === 'boolean') {
        formData.append(parentKey!, data ? '1' : '0');
      } else {
        formData.append(parentKey!, data);
      }
    }
  }
}

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
    : (payload: DepartmentPayload) => {
        const formData = new FormData();
        buildFormData(formData, payload);
        return client.requestForm<ItemResponse<Department>>('/departments', formData, 'POST');
      },

  update: USE_MOCK
    ? (id: number, payload: DepartmentPayload) => mock!.update(id, payload as unknown as Partial<Department>)
    : (id: number, payload: DepartmentPayload) => {
        const formData = new FormData();
        buildFormData(formData, payload);
        formData.append('_method', 'PUT');
        return client.requestForm<ItemResponse<Department>>(`/departments/${id}`, formData, 'POST');
      },

  delete: USE_MOCK
    ? (id: number) => mock!.delete(id)
    : (id: number) => client.request<DeleteResponse>(`/departments/${id}`, { method: 'DELETE' }),
};
