import { get } from './api';

export interface FacilitiesSectionResponse<T = Record<string, unknown>> {
  success?: boolean;
  status?: string;
  data?: T;
}

export async function getFacilitiesSection<T = Record<string, unknown>>(slug: string): Promise<T> {
  const response = await get<FacilitiesSectionResponse<T> | T>(`/pages/facilities/${slug}`);
  const payload = (response as FacilitiesSectionResponse<T>)?.data ?? response;

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return {} as T;
  }

  const maybeContent = (payload as Record<string, unknown>).content;
  if (maybeContent && typeof maybeContent === 'object' && !Array.isArray(maybeContent)) {
    return { ...(payload as Record<string, unknown>), ...(maybeContent as Record<string, unknown>) } as T;
  }

  return payload as T;
}

