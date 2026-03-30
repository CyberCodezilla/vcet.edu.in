import { client } from './client';
import { MMSFacilitiesData, MMSFacilitiesPayload, ItemResponse } from '../types';

export const mmsFacilitiesApi = {
  // Fetch the data
  get: () => client.request<ItemResponse<MMSFacilitiesData>>('/mms-facilities'),

  // Update using FormData for nested structure and image uploads
  update: (payload: MMSFacilitiesPayload) => {
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

    return client.requestForm<ItemResponse<MMSFacilitiesData>>('/mms-facilities', formData, 'POST');
  },
};
