import { client } from './client';
import { MMSDocumentsData, MMSDocumentsPayload, ItemResponse } from '../types';

export const mmsDocumentsApi = {
  get: () => client.request<ItemResponse<MMSDocumentsData>>('/mms-documents'),
  update: (payload: MMSDocumentsPayload) => {
    const formData = new FormData();
    const appendFormData = (data: any, rootName: string) => {
      if (data === null || data === undefined) return;
      if (data instanceof File) {
        formData.append(rootName, data);
      } else if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
          appendFormData(data[i], `${rootName}[${i}]`);
        }
      } else if (typeof data === 'object') {
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
             appendFormData(data[key], `${rootName}[${key}]`);
          }
        }
      } else {
        formData.append(rootName, data.toString());
      }
    };
    for (const key in payload) {
      if (Object.prototype.hasOwnProperty.call(payload, key)) {
        appendFormData((payload as any)[key], key);
      }
    }
    return client.requestForm<ItemResponse<MMSDocumentsData>>('/mms-documents', formData, 'POST');
  }
};
