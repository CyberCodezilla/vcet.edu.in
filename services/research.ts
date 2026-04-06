import { get } from './api';

export interface ResearchSectionResponse<T = Record<string, unknown>> {
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

function getResearchSlugCandidates(slug: string): string[] {
  const token = normalizeSlugToken(slug);
  const aliases: Record<string, string[]> = {
    consultancy: ['consultancy-projects'],
    downloads: ['research-downloads'],
    'research-facility': ['facility'],
    'research-intro': ['research-introduction', 'introduction'],
  };
  return [slug, token, ...(aliases[token] ?? [])]
    .map((value) => value.trim())
    .filter(Boolean);
}

export async function getResearchSection<T = Record<string, unknown>>(slug: string): Promise<T> {
  const candidates = getResearchSlugCandidates(slug);
  let response: ResearchSectionResponse<T> | T | null = null;
  let lastError: unknown = null;

  for (const candidate of candidates) {
    try {
      response = await get<ResearchSectionResponse<T> | T>(`/pages/research/${candidate}`);
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

  const payload = (response as ResearchSectionResponse<T>)?.data ?? response;

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return {} as T;
  }

  const maybeContent = (payload as Record<string, unknown>).content;
  if (maybeContent && typeof maybeContent === 'object' && !Array.isArray(maybeContent)) {
    return { ...(payload as Record<string, unknown>), ...(maybeContent as Record<string, unknown>) } as T;
  }

  return payload as T;
}
