import { get, post } from '../api';
import { MMS_ENDPOINTS, type MmsEndpointKey } from './endpoints';
import {
  fallbackEvents,
  fallbackFaqs,
  fallbackFaculty,
  fallbackHomeData,
  fallbackPlacements,
} from './fallbackData';
import type {
  MmsEnquiryPayload,
  MmsEventItem,
  MmsFaqItem,
  MmsFacultyMember,
  MmsHomeData,
  MmsPlacementsData,
} from './types';

export interface MmsImageHolderItem {
  id?: string;
  key?: string;
  label?: string;
  imageUrl?: string | null;
  image_url?: string | null;
  alt?: string | null;
}

async function getWithFallback<T>(endpoint: MmsEndpointKey, fallback: T): Promise<T> {
  try {
    return await get<T>(MMS_ENDPOINTS[endpoint]);
  } catch {
    return fallback;
  }
}

export function getMmsHomeData(): Promise<MmsHomeData> {
  return getWithFallback('home', fallbackHomeData);
}

export function getMmsFaculty(): Promise<MmsFacultyMember[]> {
  return getWithFallback('faculty', fallbackFaculty);
}

export function getMmsEvents(): Promise<MmsEventItem[]> {
  return getWithFallback('training', fallbackEvents);
}

export function getMmsPlacements(): Promise<MmsPlacementsData> {
  return getWithFallback('placement', fallbackPlacements);
}

export function getMmsFaqs(): Promise<MmsFaqItem[]> {
  return getWithFallback('faqs', fallbackFaqs);
}

type MmsImageEndpointKey =
  | 'homeImages'
  | 'aboutImages'
  | 'facilitiesImages'
  | 'experientialImages'
  | 'trainingImages'
  | 'placementImages'
  | 'studentsLifeImages';

function normalizeImageHolderPayload(payload: unknown): MmsImageHolderItem[] {
  if (Array.isArray(payload)) {
    return payload as MmsImageHolderItem[];
  }

  if (payload && typeof payload === 'object') {
    const maybeItems = (payload as { items?: unknown }).items;
    if (Array.isArray(maybeItems)) {
      return maybeItems as MmsImageHolderItem[];
    }
  }

  return [];
}

export async function getMmsImageHolders(endpoint: MmsImageEndpointKey): Promise<MmsImageHolderItem[]> {
  try {
    const response = await get<unknown>(MMS_ENDPOINTS[endpoint]);
    return normalizeImageHolderPayload(response);
  } catch {
    return [];
  }
}

export async function submitMmsEnquiry(payload: MmsEnquiryPayload): Promise<{ message: string }> {
  return post<{ message: string }>(MMS_ENDPOINTS.enquiries, payload);
}
