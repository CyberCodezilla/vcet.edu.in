import { client } from './client';
import { MMSAdmissionData, MMSAdmissionPayload, ItemResponse } from '../types';

export const mmsAdmissionApi = {
  // Fetch the data
  get: () => client.request<ItemResponse<MMSAdmissionData>>('/pages/mms-admission'),

  // Update the data using FormData recursively or by passing it via standard JSON if possible.
  update: (payload: MMSAdmissionPayload) => {
    const formData = new FormData();

    // Helper to append arbitrary nested structures to FormData
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

    // Iterate over payload and append all top level keys
    Object.keys(payload).forEach(key => {
      appendFormData((payload as any)[key], key);
    });

    return client.requestForm<ItemResponse<MMSAdmissionData>>('/pages/mms-admission', formData, 'POST');
  },
};
