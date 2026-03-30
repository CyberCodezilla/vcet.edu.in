import { get } from './api';
import { resolveUploadedAssetUrl } from '../utils/uploadedAssets';
import { unwrapListResponse } from './publicData';

export interface DynamicSssReport {
  id: number;
  title: string;
  pdf_name: string;
  pdf_url: string | null;
  created_at: string;
}

function normalize(item: DynamicSssReport): DynamicSssReport {
  return {
    ...item,
    pdf_url: resolveUploadedAssetUrl(item.pdf_url),
  };
}

export const sssReportsService = {
  list: async (): Promise<DynamicSssReport[]> => {
    const response = await get<unknown>('/sss-report-uploads');
    const items = unwrapListResponse<DynamicSssReport>(response);
    return items.map(normalize);
  },
};

