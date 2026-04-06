import { get } from './api';

export interface PlacementReport {
  label: string;
  href: string;
  fileUrl?: string;
  year: string;
}

export interface PlacementCellMember {
  name: string;
  role: string;
  image?: string;
  email?: string;
  mobile?: string;
  phone?: string;
}

export interface PlacementStatisticSeries {
  title: string;
  yAxisLabel: string;
  maxValue: number;
  unit?: string;
  values: Array<{
    year: string;
    value: number;
    color?: string;
  }>;
}

export interface PlacementPageData {
  slug: string;
  reports: PlacementReport[];
  objectives: string[];
  placementCell: {
    members: PlacementCellMember[];
    committeePdf?: string;
  };
  gallery: Array<{
    image: string;
    title?: string;
  }>;
  statistics: PlacementStatisticSeries[];
  recruiters: {
    bannerImage?: string;
  };
}

/**
 * Fetch placement page data from API
 */
export async function getPlacementPage(): Promise<PlacementPageData> {
  try {
    const response = await get<{ data: PlacementPageData }>('/pages/student-career/placement');
    return response.data || {
      slug: 'placement',
      reports: [],
      objectives: [],
      placementCell: { members: [] },
      gallery: [],
      statistics: [],
      recruiters: {},
    };
  } catch (error) {
    console.error('Error fetching placement page:', error);
    return {
      slug: 'placement',
      reports: [],
      objectives: [],
      placementCell: { members: [] },
      gallery: [],
      statistics: [],
      recruiters: {},
    };
  }
}
