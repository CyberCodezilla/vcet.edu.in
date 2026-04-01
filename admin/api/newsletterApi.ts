import { client } from './client';
import type { ListResponse, ItemResponse, DeleteResponse, Newsletter, NewsletterPayload } from '../types';

const USE_MOCK = import.meta.env.DEV && import.meta.env.VITE_MOCK_AUTH === 'true';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export const newsletterApi = {
  list: async (departmentId?: string | number): Promise<ListResponse<Newsletter>> => {
    if (USE_MOCK) {
      const res = await fetch('/dev-api/newsletters');
      const data = await res.json();
      let list = data.data || [];
      if (departmentId) {
        list = list.filter((n: Newsletter) => n.departmentId == departmentId);
      }
      return { success: true, data: list };
    }
    const query = departmentId ? `?departmentId=${departmentId}` : '';
    return client.request<ListResponse<Newsletter>>(`/newsletters${query}`);
  },

  get: async (id: number): Promise<ItemResponse<Newsletter>> => {
    if (USE_MOCK) {
      const res = await fetch('/dev-api/newsletters');
      const data = await res.json();
      const item = data.data.find((n: Newsletter) => n.id === id);
      if (!item) throw new Error('Newsletter not found');
      return { success: true, data: item };
    }
    return client.request<ItemResponse<Newsletter>>(`/newsletters/${id}`);
  },

  create: async (payload: NewsletterPayload): Promise<ItemResponse<Newsletter>> => {
    if (USE_MOCK) {
      const jsonPayload: any = {
        title: payload.title,
        description: payload.description,
        departmentId: payload.departmentId,
      };
      if (payload.image) {
        jsonPayload.imageBase64 = await fileToBase64(payload.image);
        jsonPayload.imageName = payload.image.name;
      }
      if (payload.pdf) {
        jsonPayload.pdfBase64 = await fileToBase64(payload.pdf);
        jsonPayload.pdfName = payload.pdf.name;
      }
      const res = await fetch('/dev-api/newsletters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonPayload)
      });
      return await res.json();
    }
    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('description', payload.description);
    formData.append('departmentId', payload.departmentId.toString());
    if (payload.image) formData.append('image', payload.image);
    if (payload.pdf) formData.append('pdf', payload.pdf);
    
    return client.requestForm<ItemResponse<Newsletter>>('/newsletters', formData, 'POST');
  },

  update: async (id: number, payload: NewsletterPayload & { existingImage?: string | null, existingPdf?: string | null }): Promise<ItemResponse<Newsletter>> => {
    if (USE_MOCK) {
      const jsonPayload: any = {
        id,
        _method: 'PUT',
        title: payload.title,
        description: payload.description,
        departmentId: payload.departmentId,
        existingImage: payload.existingImage,
        existingPdf: payload.existingPdf,
      };
      if (payload.image) {
        jsonPayload.imageBase64 = await fileToBase64(payload.image);
        jsonPayload.imageName = payload.image.name;
      }
      if (payload.pdf) {
        jsonPayload.pdfBase64 = await fileToBase64(payload.pdf);
        jsonPayload.pdfName = payload.pdf.name;
      }
      const res = await fetch('/dev-api/newsletters', {
        method: 'POST', // mock server handles PUT context via _method
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonPayload)
      });
      return await res.json();
    }
    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('description', payload.description);
    formData.append('departmentId', payload.departmentId.toString());
    if (payload.image) formData.append('image', payload.image);
    if (payload.pdf) formData.append('pdf', payload.pdf);
    formData.append('_method', 'PUT'); // Note: For standard Laravel APIs handling files via PUT
    
    return client.requestForm<ItemResponse<Newsletter>>(`/newsletters/${id}`, formData, 'POST');
  },

  delete: async (id: number): Promise<DeleteResponse> => {
    if (USE_MOCK) {
      const res = await fetch(`/dev-api/newsletters/${id}`, { method: 'DELETE' });
      return await res.json();
    }
    return client.request<DeleteResponse>(`/newsletters/${id}`, { method: 'DELETE' });
  }
};
