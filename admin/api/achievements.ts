import { client } from './client';
import type { ListResponse, ItemResponse, DeleteResponse, Achievement, AchievementPayload } from '../types';
import { createMockCrud, MOCK_ACHIEVEMENTS } from './mockStore';

const USE_MOCK = import.meta.env.DEV && import.meta.env.VITE_MOCK_AUTH === 'true';
const mock = USE_MOCK ? createMockCrud<Achievement>(MOCK_ACHIEVEMENTS) : null;

export const achievementsApi = {
  list: USE_MOCK
    ? () => mock!.list()
    : () => client.request<ListResponse<Achievement>>('/achievements'),

  get: USE_MOCK
    ? (id: number) => mock!.get(id)
    : (id: number) => client.request<ItemResponse<Achievement>>(`/achievements/${id}`),

  create: USE_MOCK
    ? (payload: AchievementPayload) => mock!.create(payload as unknown as Partial<Achievement>)
    : (payload: AchievementPayload) =>
        client.request<ItemResponse<Achievement>>('/achievements', {
          method: 'POST',
          body: JSON.stringify(payload),
        }),

  update: USE_MOCK
    ? (id: number, payload: AchievementPayload) => mock!.update(id, payload as unknown as Partial<Achievement>)
    : (id: number, payload: AchievementPayload) =>
        client.request<ItemResponse<Achievement>>(`/achievements/${id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        }),

  delete: USE_MOCK
    ? (id: number) => mock!.delete(id)
    : (id: number) => client.request<DeleteResponse>(`/achievements/${id}`, { method: 'DELETE' }),
};
