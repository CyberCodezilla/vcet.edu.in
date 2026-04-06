import { client, resolveApiUrl as resolveUploadedAssetUrl } from '../admin/api/client';
import type { PlacementPartner } from '../admin/types';
import { MOCK_PLACEMENT_PARTNERS, readMockCollection } from '../admin/api/mockStore';

import { USE_PUBLIC_MOCK, sortBySortOrder, unwrapListResponse } from './publicData';

export const placementPartnersService = {
  async list(): Promise<PlacementPartner[]> {
    try {
      const items = USE_PUBLIC_MOCK
        ? readMockCollection<PlacementPartner>(
            'vcet_mock_placement_partners',
            MOCK_PLACEMENT_PARTNERS,
          )
        : unwrapListResponse<PlacementPartner>(await client.request<unknown>('/placement-partners'));

      return sortBySortOrder(
        items
          .filter((item) => item.is_active)
          .map((item) => ({
            ...item,
            logo: resolveUploadedAssetUrl(item.logo) ?? item.logo,
          })),
      );
    } catch (error) {
      console.error('Error fetching placement partners:', error);
      return [];
    }
  },
};
