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

export async function getCommitteeSection<T = Record<string, unknown>>(slug: string): Promise<T> {
  const response = await get<CommitteeSectionResponse<T> | T>(`/pages/committees/${slug}`);
  const payload = unwrapCommitteePayload<T>(response);
  return (payload ?? ({} as T));
}
