import { client } from './client';
import type { BestPracticeUpload, BestPracticeUploadPayload, DeleteResponse, ItemResponse, ListResponse } from '../types';
import { resolveUploadedAssetUrl } from '../../utils/uploadedAssets';

interface BestPracticeUploadApiResponse {
  data: BestPracticeUpload[];
}

interface BestPracticeUploadItemApiResponse {
  message: string;
  data: BestPracticeUpload;
}

interface BestPracticeUploadDeleteApiResponse {
  message: string;
}

function normalize(item: BestPracticeUpload): BestPracticeUpload {
  return {
    ...item,
    pdf_url: resolveUploadedAssetUrl(item.pdf_url),
  };
}

function toFormData(payload: BestPracticeUploadPayload, method?: 'PATCH'): FormData {
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

export const bestPracticeUploadsApi = {
  list: async (): Promise<ListResponse<BestPracticeUpload>> => {
    const response = await client.request<BestPracticeUploadApiResponse>('/best-practice-uploads');
    return {
      success: true,
      data: response.data.map(normalize),
    };
  },

  create: async (payload: BestPracticeUploadPayload): Promise<ItemResponse<BestPracticeUpload>> => {
    const response = await client.requestForm<BestPracticeUploadItemApiResponse>(
      '/best-practice-uploads',
      toFormData(payload),
    );
    return {
      success: true,
      message: response.message,
      data: normalize(response.data),
    };
  },

  update: async (id: number, payload: BestPracticeUploadPayload): Promise<ItemResponse<BestPracticeUpload>> => {
    const response = await client.requestForm<BestPracticeUploadItemApiResponse>(
      `/best-practice-uploads/${id}`,
      toFormData(payload, 'PATCH'),
    );
    return {
      success: true,
      message: response.message,
      data: normalize(response.data),
    };
  },

  delete: async (id: number): Promise<DeleteResponse> => {
    const response = await client.request<BestPracticeUploadDeleteApiResponse>(`/best-practice-uploads/${id}`, {
      method: 'DELETE',
    });
    return {
      success: true,
      message: response.message,
    };
  },
};

