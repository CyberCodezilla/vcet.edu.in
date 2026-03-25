import { client } from '../admin/api/client';
import type { ListResponse, Achievement } from '../admin/types';
import { MOCK_ACHIEVEMENTS, readMockCollection } from '../admin/api/mockStore';
import { USE_PUBLIC_MOCK, sortBySortOrder, unwrapListResponse } from './publicData';

export const achievementsService = {
  async list(): Promise<Achievement[]> {
    try {
      if (USE_PUBLIC_MOCK) {
        return sortBySortOrder(
          readMockCollection<Achievement>('vcet_mock_achievements', MOCK_ACHIEVEMENTS).filter(
            (item) => item.is_active,
          ),
        );
      }

      const response = await client.request<unknown>('/achievements');
      return sortBySortOrder(
        unwrapListResponse<Achievement>(response).filter((item) => item.is_active),
      );
    } catch (error) {
      console.error('Error fetching public achievements:', error);
      return [];
    }
  },
};
