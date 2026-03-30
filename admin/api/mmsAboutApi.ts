import { client } from './client';
import { MMSAboutData, MMSAboutPayload, ItemResponse } from '../types';

export const mmsAboutApi = {
  get: () => client.request<ItemResponse<MMSAboutData>>('/pages/mms-about'),

  update: (payload: MMSAboutPayload) => {
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
        formData.append(rootName, String(data));
      }
    };

    Object.keys(payload).forEach(key => {
      appendFormData((payload as any)[key], key);
    });

    return client.requestForm<ItemResponse<MMSAboutData>>('/pages/mms-about', formData, 'POST');
  },
};
