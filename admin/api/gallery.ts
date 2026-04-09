import { client } from './client';
import type {
  ListResponse,
  ItemResponse,
  DeleteResponse,
  Gallery,
  GalleryImage,
  GalleryImagePayload,
} from '../types';
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

function normalizeGalleryRecord(gallery: Gallery): GalleryImage {
  return {
    id: gallery.id,
    image: resolveUploadedAssetUrl(gallery.image_url) ?? gallery.image_url ?? '',
    caption: gallery.title ?? gallery.subtitle ?? null,
    created_at: gallery.created_at,
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
        const response = await client.request<ListResponse<Gallery>>('/galleries?paginate=false');
        return {
          ...response,
          data: response.data.map(normalizeGalleryRecord),
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
        if (payload.caption) form.append('title', payload.caption);
        return client.requestForm<ItemResponse<Gallery>>('/galleries', form).then((response) => ({
          ...response,
          data: normalizeGalleryRecord(response.data),
        }));
      },

  delete: USE_MOCK
    ? (id: number) => mock!.delete(id)
    : (id: number) => client.request<DeleteResponse>(`/galleries/${id}`, { method: 'DELETE' }),
};
