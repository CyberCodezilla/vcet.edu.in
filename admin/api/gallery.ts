import { client } from './client';
import type { ListResponse, DeleteResponse, GalleryImage, GalleryPayload } from '../types';
import { createGalleryCrud, MOCK_GALLERY } from './mockStore';

const USE_MOCK = import.meta.env.DEV && import.meta.env.VITE_MOCK_AUTH === 'true';
const mock = USE_MOCK ? createGalleryCrud(MOCK_GALLERY) : null;

export const galleryApi = {
  list: USE_MOCK
    ? () => mock!.list()
    : () => client.request<ListResponse<GalleryImage>>('/gallery'),

  upload: USE_MOCK
    ? (payload: GalleryPayload) => mock!.upload(payload)
    : (payload: GalleryPayload) => {
        const form = new FormData();
        form.append('image', payload.image);
        if (payload.caption) form.append('caption', payload.caption);
        return client.requestForm<{ data: GalleryImage; message: string }>('/gallery', form);
      },

  delete: USE_MOCK
    ? (id: number) => mock!.delete(id)
    : (id: number) => client.request<DeleteResponse>(`/gallery/${id}`, { method: 'DELETE' }),
};
