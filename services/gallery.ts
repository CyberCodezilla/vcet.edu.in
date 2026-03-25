import { get } from './api';
import { Gallery } from '../admin/types';
import { resolveUploadedAssetUrl } from '../utils/uploadedAssets';

interface GalleryResponse {
  success: boolean;
  data: Gallery[];
}

export const getGalleries = async (): Promise<Gallery[]> => {
  const result = await get<GalleryResponse>('/galleries?active=true');
  return (result.data || []).map((gallery) => ({
    ...gallery,
    image_url: resolveUploadedAssetUrl(gallery.image_url),
  }));
};
