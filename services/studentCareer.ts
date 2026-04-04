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

export async function getStudentCareerSection<T = Record<string, unknown>>(slug: string): Promise<T> {
  const response = await get<StudentCareerSectionResponse<T> | T>(`/pages/student-career/${slug}`);
  const payload = unwrapStudentCareerPayload<T>(response);
  return (payload ?? ({} as T));
}
