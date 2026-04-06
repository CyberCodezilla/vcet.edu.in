import { get } from './api';
import { resolveUploadedAssetUrl } from '../utils/uploadedAssets';
import { MOCK_HOMEPAGE_BANNERS, readMockCollection } from '../admin/api/mockStore';
import { USE_PUBLIC_MOCK, sortBySortOrder, unwrapListResponse } from './publicData';

export interface HomepageBannerRecord {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
  is_fixed: boolean;
  created_at: string;
  updated_at: string;
}

function normalizeBanner(banner: HomepageBannerRecord): HomepageBannerRecord {
  return {
    ...banner,
    image_url: resolveUploadedAssetUrl(banner.image_url),
  };
}

export const homepageBannersService = {
  list: async () => {
    const banners = USE_PUBLIC_MOCK
      ? readMockCollection<HomepageBannerRecord>(
          'vcet_mock_homepage_banners',
          MOCK_HOMEPAGE_BANNERS as HomepageBannerRecord[],
        )
      : unwrapListResponse<HomepageBannerRecord>(await get<unknown>('/homepage-banners?active=1'));

    return sortBySortOrder(banners.filter((banner) => banner.is_active).map(normalizeBanner));
  },
};

