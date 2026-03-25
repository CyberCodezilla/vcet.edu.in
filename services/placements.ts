import { client } from '../admin/api/client';
import type { ListResponse, Placement } from '../admin/types';
import { resolveUploadedAssetUrl } from '../utils/uploadedAssets';
import { MOCK_PLACEMENTS, readMockCollection } from '../admin/api/mockStore';
import { USE_PUBLIC_MOCK, unwrapListResponse } from './publicData';

export const placementsService = {
  // Public endpoint (GET /api/placements)
  async list(): Promise<Placement[]> {
    try {
      const items = USE_PUBLIC_MOCK
        ? readMockCollection<Placement>('vcet_mock_placements', MOCK_PLACEMENTS)
        : unwrapListResponse<Placement>(await client.request<unknown>('/placements'));

      return items
        .filter((p) => p.is_active)
        .map((p) => ({
            ...p,
            logo: resolveUploadedAssetUrl(p.logo),
          }));
    } catch (error) {
      console.error('Error fetching public placements:', error);
      return [];
    }
  },
};
