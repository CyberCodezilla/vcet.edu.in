import { get } from './api';

export interface StudentCareerSectionResponse<T = Record<string, unknown>> {
  status?: string;
  data?: T;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function unwrapStudentCareerPayload<T>(value: unknown): T | null {
  let current: unknown = value;

  // Handle nested wrappers like { success, data: { status, data: {...} } }.
  for (let depth = 0; depth < 4; depth += 1) {
    if (!isRecord(current)) {
      return null;
    }

    if ('data' in current) {
      const next = current.data;
      if (isRecord(next)) {
        current = next;
        continue;
      }

      if (Array.isArray(next)) {
        return null;
      }

      return null;
    }

    return current as T;
  }

  return isRecord(current) ? (current as T) : null;
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

function getStudentCareerSlugCandidates(slug: string): string[] {
  const token = normalizeSlugToken(slug);
  const aliases: Record<string, string[]> = {
    'sports-committee': ['sport-committee'],
    'cultural-committee': ['culture-committee'],
    training: ['training-placement'],
    placement: ['placements'],
  };
  return [slug, token, ...(aliases[token] ?? [])]
    .map((value) => value.trim())
    .filter(Boolean);
}

export async function getStudentCareerSection<T = Record<string, unknown>>(slug: string): Promise<T> {
  const candidates = getStudentCareerSlugCandidates(slug);
  let response: StudentCareerSectionResponse<T> | T | null = null;
  let lastError: unknown = null;

  for (const candidate of candidates) {
    try {
      response = await get<StudentCareerSectionResponse<T> | T>(`/pages/student-career/${candidate}`);
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

  const payload = unwrapStudentCareerPayload<T>(response);
  return (payload ?? ({} as T));
}
