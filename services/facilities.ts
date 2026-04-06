import { get } from './api';

export interface FacilitiesSectionResponse<T = Record<string, unknown>> {
  success?: boolean;
  status?: string;
  data?: T;
}

function isNotFoundLikeError(error: unknown): boolean {
  return typeof error === 'object'
    && error !== null
    && 'status' in error
    && ([404, 422] as number[]).includes((error as { status?: number }).status ?? -1);
}

function normalizeSlugToken(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function getFacilitiesSlugCandidates(slug: string): string[] {
  const token = normalizeSlugToken(slug);
  const aliases: Record<string, string[]> = {
    'counselling-cell': ['counseling-cell'],
    'sports-gymkhana': ['sports-gymkana', 'gymkhana'],
    'differently-abled': ['differentlyabled', 'divyangjan'],
  };
  return [slug, token, ...(aliases[token] ?? [])]
    .map((value) => value.trim())
    .filter(Boolean);
}

export async function getFacilitiesSection<T = Record<string, unknown>>(slug: string): Promise<T> {
  const candidates = getFacilitiesSlugCandidates(slug);
  let response: FacilitiesSectionResponse<T> | T | null = null;
  let lastError: unknown = null;

  for (const candidate of candidates) {
    try {
      response = await get<FacilitiesSectionResponse<T> | T>(`/pages/facilities/${candidate}`);
      break;
    } catch (error) {
      lastError = error;
      if (!isNotFoundLikeError(error)) {
        throw error;
      }
    }
  }

  if (!response) {
    if (lastError) throw lastError;
    return {} as T;
  }

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

