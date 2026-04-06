import { get } from './api';

export interface CommitteeSectionResponse<T = Record<string, unknown>> {
  status?: string;
  success?: boolean;
  data?: T | CommitteeSectionResponse<T>;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function unwrapCommitteePayload<T>(value: unknown): T | null {
  let current: unknown = value;

  // Some deployments wrap API payloads multiple times (e.g. { success, data: { status, data } }).
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

      // scalar data is not a valid committee payload
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

function getCommitteeSlugCandidates(slug: string): string[] {
  const token = normalizeSlugToken(slug);
  const aliases: Record<string, string[]> = {
    cdc: ['college-development-committee', 'college-development', 'development-committee'],
    iqac: ['i-q-a-c'],
    sgrc: ['srgc', 'student-grievance', 'student-grievance-committee'],
    'sc-st': ['scst', 'sc-st-committee'],
    icc: ['internal-complaint', 'internal-complaint-committee'],
    sedg: ['s-e-d-g', 'socio-economically-disadvantaged-groups'],
  };
  return [slug, token, ...(aliases[token] ?? [])]
    .map((value) => value.trim())
    .filter(Boolean);
}

export async function getCommitteeSection<T = Record<string, unknown>>(slug: string): Promise<T> {
  const candidates = getCommitteeSlugCandidates(slug);
  let lastError: unknown = null;

  for (const candidate of candidates) {
    try {
      const response = await get<CommitteeSectionResponse<T> | T>(`/pages/committees/${candidate}`);
      const payload = unwrapCommitteePayload<T>(response);
      return (payload ?? ({} as T));
    } catch (error) {
      lastError = error;
      if (!isNotFoundLikeError(error)) {
        throw error;
      }
    }
  }

  if (lastError) {
    throw lastError;
  }

  return {} as T;
}
