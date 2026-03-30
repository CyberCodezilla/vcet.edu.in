import { client } from './client';
import { MMSStudentsLifeData, MMSStudentsLifePayload, ItemResponse } from '../types';

export const mmsStudentsLifeApi = {
  // Fetch the data
  get: () => client.request<ItemResponse<MMSStudentsLifeData>>('/mms-students-life'),

  // Update the data using FormData recursively to support nested file uploads (images/rankers)
  update: (payload: MMSStudentsLifePayload) => {
    const formData = new FormData();
    formData.append('_method', 'PUT');

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

    return client.requestForm<ItemResponse<MMSStudentsLifeData>>('/mms-students-life', formData, 'POST');
  },
};
