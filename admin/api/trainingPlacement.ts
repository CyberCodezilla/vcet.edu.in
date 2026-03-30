import { client } from './client';
import { TrainingPlacementData, TrainingPlacementPayload, ItemResponse } from '../types';

export const trainingPlacementApi = {
  // Fetch the data
  get: () => client.request<ItemResponse<TrainingPlacementData>>('/pages/mms-training-placement'),

  // Update the data using FormData recursively or by passing it via standard JSON if possible.
  // We'll mimic the structure but actually pass it as JSON. If the backend later expects actual multipart
  // for nested files, we would serialize it. Since this is frontend only mockup per instructions,
  // we'll send it as JSON and assume base64 or FormData is handled by the `api` interceptor where needed.
  // For safety with files, we implement a simple FormData serialization.
  update: (payload: TrainingPlacementPayload) => {
    // If the payload has File objects inside deeply nested arrays (e.g. events[0].image),
    // we need to send it as FormData.
    const formData = new FormData();
    formData.append('_method', 'PUT');

    // Basic recursive append for nested objects and arrays
    const appendFormData = (data: any, parentKey: string) => {
      if (data && typeof data === 'object' && !(data instanceof File)) {
        if (Array.isArray(data)) {
          data.forEach((item, index) => {
            appendFormData(item, `${parentKey}[${index}]`);
          });
        } else {
          Object.keys(data).forEach((key) => {
            appendFormData(data[key], `${parentKey}[${key}]`);
          });
        }
      } else if (data instanceof File) {
        formData.append(parentKey, data);
      } else if (data !== undefined && data !== null) {
        formData.append(parentKey, data.toString());
      }
    };

    Object.keys(payload).forEach((key) => {
      // Need to cast to any since we are iterating dynamically
      appendFormData((payload as any)[key], key);
    });

    return client.requestForm<ItemResponse<TrainingPlacementData>>('/pages/mms-training-placement', formData, 'POST');
  },
};
