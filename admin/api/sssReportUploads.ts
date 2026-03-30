import { client } from './client';
import type { DeleteResponse, ItemResponse, ListResponse, SssReportUpload, SssReportUploadPayload } from '../types';
import { resolveUploadedAssetUrl } from '../../utils/uploadedAssets';

interface SssReportUploadApiResponse {
  data: SssReportUpload[];
}

interface SssReportUploadItemApiResponse {
  message: string;
  data: SssReportUpload;
}

interface SssReportUploadDeleteApiResponse {
  message: string;
}

function normalize(item: SssReportUpload): SssReportUpload {
  return {
    ...item,
    pdf_url: resolveUploadedAssetUrl(item.pdf_url),
  };
}

function toFormData(payload: SssReportUploadPayload, method?: 'PATCH'): FormData {
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

export const sssReportUploadsApi = {
  list: async (): Promise<ListResponse<SssReportUpload>> => {
    const response = await client.request<SssReportUploadApiResponse>('/sss-report-uploads');
    return {
      success: true,
      data: response.data.map(normalize),
    };
  },

  create: async (payload: SssReportUploadPayload): Promise<ItemResponse<SssReportUpload>> => {
    const response = await client.requestForm<SssReportUploadItemApiResponse>(
      '/sss-report-uploads',
      toFormData(payload),
    );
    return {
      success: true,
      message: response.message,
      data: normalize(response.data),
    };
  },

  update: async (id: number, payload: SssReportUploadPayload): Promise<ItemResponse<SssReportUpload>> => {
    const response = await client.requestForm<SssReportUploadItemApiResponse>(
      `/sss-report-uploads/${id}`,
      toFormData(payload, 'PATCH'),
    );
    return {
      success: true,
      message: response.message,
      data: normalize(response.data),
    };
  },

  delete: async (id: number): Promise<DeleteResponse> => {
    const response = await client.request<SssReportUploadDeleteApiResponse>(`/sss-report-uploads/${id}`, {
      method: 'DELETE',
    });
    return {
      success: true,
      message: response.message,
    };
  },
};

