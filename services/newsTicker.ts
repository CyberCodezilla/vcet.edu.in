import { client } from '../admin/api/client';
import type { ListResponse, NewsTicker } from '../admin/types';
import { MOCK_NEWS_TICKER, readMockCollection } from '../admin/api/mockStore';
import { USE_PUBLIC_MOCK, sortBySortOrder, unwrapListResponse } from './publicData';

export const newsTickerService = {
  async list(): Promise<NewsTicker[]> {
    try {
      if (USE_PUBLIC_MOCK) {
        return sortBySortOrder(
          readMockCollection<NewsTicker>('vcet_mock_newsticker', MOCK_NEWS_TICKER).filter(
            (item) => item.is_active,
          ),
        );
      }

      const response = await client.request<unknown>('/news-ticker');
      return sortBySortOrder(
        unwrapListResponse<NewsTicker>(response).filter((item) => item.is_active),
      );
    } catch (error) {
      console.error('Error fetching public news ticker:', error);
      return [];
    }
  },
};
