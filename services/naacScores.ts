import { get } from './api';
import { resolveUploadedAssetUrl } from '../utils/uploadedAssets';
import { unwrapListResponse } from './publicData';

export interface DynamicNaacScoreUpload {
  id: number;
  title: string;
  pdf_name: string;
  pdf_url: string | null;
  created_at: string;
}

function normalize(item: DynamicNaacScoreUpload): DynamicNaacScoreUpload {
  return {
    ...item,
    pdf_url: resolveUploadedAssetUrl(item.pdf_url),
  };
}

export const naacScoresService = {
  list: async (): Promise<DynamicNaacScoreUpload[]> => {
    const response = await get<unknown>('/naac-score-uploads');
    const items = unwrapListResponse<DynamicNaacScoreUpload>(response);
    return items.map(normalize);
  },
};

