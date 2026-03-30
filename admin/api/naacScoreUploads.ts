import { client } from './client';
import type { DeleteResponse, ItemResponse, ListResponse, NaacScoreUpload, NaacScoreUploadPayload } from '../types';
import { resolveUploadedAssetUrl } from '../../utils/uploadedAssets';

interface NaacScoreUploadApiResponse {
  data: NaacScoreUpload[];
}

interface NaacScoreUploadItemApiResponse {
  message: string;
  data: NaacScoreUpload;
}

interface NaacScoreUploadDeleteApiResponse {
  message: string;
}

function normalize(item: NaacScoreUpload): NaacScoreUpload {
  return {
    ...item,
    pdf_url: resolveUploadedAssetUrl(item.pdf_url),
  };
}

function toFormData(payload: NaacScoreUploadPayload, method?: 'PATCH'): FormData {
  const formData = new FormData();
  formData.append('title', payload.title.trim());
  if (payload.pdf) {
    formData.append('pdf', payload.pdf);
  }
  if (method) {
    formData.append('_method', method);
  }
  return formData;
}

export const naacScoreUploadsApi = {
  list: async (): Promise<ListResponse<NaacScoreUpload>> => {
    const response = await client.request<NaacScoreUploadApiResponse>('/naac-score-uploads');
    return {
      success: true,
      data: response.data.map(normalize),
    };
  },

  create: async (payload: NaacScoreUploadPayload): Promise<ItemResponse<NaacScoreUpload>> => {
    const response = await client.requestForm<NaacScoreUploadItemApiResponse>(
      '/naac-score-uploads',
      toFormData(payload),
    );
    return {
      success: true,
      message: response.message,
      data: normalize(response.data),
    };
  },

  update: async (id: number, payload: NaacScoreUploadPayload): Promise<ItemResponse<NaacScoreUpload>> => {
    const response = await client.requestForm<NaacScoreUploadItemApiResponse>(
      `/naac-score-uploads/${id}`,
      toFormData(payload, 'PATCH'),
    );
    return {
      success: true,
      message: response.message,
      data: normalize(response.data),
    };
  },

  delete: async (id: number): Promise<DeleteResponse> => {
    const response = await client.request<NaacScoreUploadDeleteApiResponse>(`/naac-score-uploads/${id}`, {
      method: 'DELETE',
    });
    return {
      success: true,
      message: response.message,
    };
  },
};

