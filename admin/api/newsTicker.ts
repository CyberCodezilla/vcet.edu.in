import { client } from './client';
import type { ListResponse, ItemResponse, DeleteResponse, NewsTicker, NewsTickerPayload } from '../types';
import { createMockCrud, MOCK_NEWS_TICKER } from './mockStore';

const USE_MOCK = import.meta.env.DEV && import.meta.env.VITE_MOCK_AUTH === 'true';
const mock = USE_MOCK ? createMockCrud<NewsTicker>(MOCK_NEWS_TICKER) : null;

export const newsTickerApi = {
  list: USE_MOCK
    ? () => mock!.list()
    : () => client.request<ListResponse<NewsTicker>>('/news-ticker'),

  get: USE_MOCK
    ? (id: number) => mock!.get(id)
    : (id: number) => client.request<ItemResponse<NewsTicker>>(`/news-ticker/${id}`),

  create: USE_MOCK
    ? (payload: NewsTickerPayload) => mock!.create(payload as unknown as Partial<NewsTicker>)
    : (payload: NewsTickerPayload) =>
        client.request<ItemResponse<NewsTicker>>('/news-ticker', {
          method: 'POST',
          body: JSON.stringify(payload),
        }),

  update: USE_MOCK
    ? (id: number, payload: NewsTickerPayload) => mock!.update(id, payload as unknown as Partial<NewsTicker>)
    : (id: number, payload: NewsTickerPayload) =>
        client.request<ItemResponse<NewsTicker>>(`/news-ticker/${id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        }),

  delete: USE_MOCK
    ? (id: number) => mock!.delete(id)
    : (id: number) => client.request<DeleteResponse>(`/news-ticker/${id}`, { method: 'DELETE' }),
};
