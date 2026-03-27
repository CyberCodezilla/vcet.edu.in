import { client } from './client';
import type { ListResponse, ItemResponse, DeleteResponse, Faculty, FacultyPayload } from '../types';

export const facultyApi = {
  list: () => client.request<ListResponse<Faculty>>('/faculty/all'),

  get: (id: number | string) => client.request<ItemResponse<Faculty>>(`/faculty/${id}`),

  create: (payload: FacultyPayload) => {
    // If there is an image file, use FormData
    if (payload.profileImage instanceof File) {
      const formData = new FormData();
      formData.append('profileImage', payload.profileImage);
      
      // Append all nested JSON objects as stringified strings
      formData.append('basicInfo', JSON.stringify(payload.basicInfo || {}));
      if (payload.qualifications) formData.append('qualifications', JSON.stringify(payload.qualifications));
      if (payload.experience) formData.append('experience', JSON.stringify(payload.experience));
      if (payload.academic) formData.append('academic', JSON.stringify(payload.academic));
      if (payload.publications) formData.append('publications', JSON.stringify(payload.publications));
      if (payload.rolesAndAwards) formData.append('rolesAndAwards', JSON.stringify(payload.rolesAndAwards));
      if (payload.onlineLinks) formData.append('onlineLinks', JSON.stringify(payload.onlineLinks));
      if (payload.memberships) formData.append('memberships', JSON.stringify(payload.memberships));

      return client.requestForm<ItemResponse<Faculty>>('/faculty', formData, 'POST');
    }

    // Fallback to strict JSON if no image
    return client.request<ItemResponse<Faculty>>('/faculty', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  update: (id: number | string, payload: FacultyPayload) => {
    // If there is an image file, use FormData (Laravel form spoofing for PUT)
    if (payload.profileImage instanceof File) {
      const formData = new FormData();
      formData.append('_method', 'PUT'); // Laravel requirement for multipart PUT requests
      formData.append('profileImage', payload.profileImage);
      
      formData.append('basicInfo', JSON.stringify(payload.basicInfo || {}));
      if (payload.qualifications) formData.append('qualifications', JSON.stringify(payload.qualifications));
      if (payload.experience) formData.append('experience', JSON.stringify(payload.experience));
      if (payload.academic) formData.append('academic', JSON.stringify(payload.academic));
      if (payload.publications) formData.append('publications', JSON.stringify(payload.publications));
      if (payload.rolesAndAwards) formData.append('rolesAndAwards', JSON.stringify(payload.rolesAndAwards));
      if (payload.onlineLinks) formData.append('onlineLinks', JSON.stringify(payload.onlineLinks));
      if (payload.memberships) formData.append('memberships', JSON.stringify(payload.memberships));

      return client.requestForm<ItemResponse<Faculty>>(`/faculty/${id}`, formData, 'POST');
    }

    // Fallback to strict JSON if no image
    return client.request<ItemResponse<Faculty>>(`/faculty/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  delete: (id: number | string) => client.request<DeleteResponse>(`/faculty/${id}`, { method: 'DELETE' }),
};
