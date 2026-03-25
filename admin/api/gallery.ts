import { client } from './client';
import type { ListResponse, DeleteResponse, GalleryImage, GalleryImagePayload } from '../types';
import { createGalleryCrud, MOCK_GALLERY } from './mockStore';
import { resolveUploadedAssetUrl } from '../../utils/uploadedAssets';

const USE_MOCK = import.meta.env.DEV && import.meta.env.VITE_MOCK_AUTH === 'true';
const mock = USE_MOCK ? createGalleryCrud(MOCK_GALLERY) : null;

function normalizeGalleryImage(image: GalleryImage): GalleryImage {
  return {
    ...image,
    image: resolveUploadedAssetUrl(image.image) ?? image.image,
  };
}

export const galleryApi = {
  list: USE_MOCK
    ? async () => {
        const response = await mock!.list();
        return {
          ...response,
          data: response.data.map(normalizeGalleryImage),
        } as ListResponse<GalleryImage>;
      }
    : async () => {
        const response = await client.request<ListResponse<GalleryImage>>('/gallery');
        return {
          ...response,
          data: response.data.map(normalizeGalleryImage),
        };
      },

  upload: USE_MOCK
    ? async (payload: GalleryImagePayload) => {
        const response = await mock!.upload(payload);
        return {
          ...response,
          data: normalizeGalleryImage(response.data),
        };
      }
    : (payload: GalleryImagePayload) => {
        const form = new FormData();
        form.append('image', payload.image);
        if (payload.caption) form.append('caption', payload.caption);
        return client.requestForm<{ data: GalleryImage; message: string }>('/gallery', form).then((response) => ({
          ...response,
          data: normalizeGalleryImage(response.data),
        }));
      },

  delete: USE_MOCK
    ? (id: number) => mock!.delete(id)
    : (id: number) => client.request<DeleteResponse>(`/gallery/${id}`, { method: 'DELETE' }),
};
