import { get } from './api';
import { resolveUploadedAssetUrl } from '../utils/uploadedAssets';
import { unwrapListResponse } from './publicData';

export interface DynamicBestPracticeReport {
  id: number;
  title: string;
  pdf_name: string;
  pdf_url: string | null;
  created_at: string;
}

function normalize(item: DynamicBestPracticeReport): DynamicBestPracticeReport {
  return {
    ...item,
    pdf_url: resolveUploadedAssetUrl(item.pdf_url),
  };
}

export const bestPracticeReportsService = {
  list: async (): Promise<DynamicBestPracticeReport[]> => {
    const response = await get<unknown>('/best-practice-uploads');
    const items = unwrapListResponse<DynamicBestPracticeReport>(response);
    return items.map(normalize);
  },
};

