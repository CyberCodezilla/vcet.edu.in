import { get, resolveApiUrl } from './api';

export interface AcademicDocument {
  title: string;
  description: string;
  year: string;
  fileUrl: string | null;
  fileName: string | null;
}

export interface DeanData {
  name: string;
  qualification: string;
  designation: string;
  institution: string;
  message: string;
  imageUrl: string | null;
}

export interface ObeData {
  title: string;
  description: string;
  imageUrl: string | null;
}

export interface AcademicsData {
  programBooklets: AcademicDocument[];
  academicCalendars: AcademicDocument[];
  dean: DeanData | null;
  obe: ObeData | null;
  updatedAt: string;
}

interface AcademicsResponse {
  data: AcademicsData;
}

type AcademicDocumentApi = Partial<AcademicDocument> & {
  file_url?: string | null;
  file_name?: string | null;
};

type DeanDataApi = Partial<DeanData> & {
  image_url?: string | null;
  imageFileName?: string | null;
};

type ObeDataApi = Partial<ObeData> & {
  image_url?: string | null;
  imageFileName?: string | null;
};

type AcademicsDataApi = Partial<AcademicsData> & {
  program_booklets?: AcademicDocumentApi[];
  academic_calendars?: AcademicDocumentApi[];
  updated_at?: string;
  dean?: DeanDataApi | null;
  obe?: ObeDataApi | null;
};

function normalizeDocument(doc: AcademicDocumentApi): AcademicDocument {
  return {
    title: doc.title ?? '',
    description: doc.description ?? '',
    year: doc.year ?? '',
    fileName: doc.fileName ?? doc.file_name ?? null,
    fileUrl: resolveApiUrl(doc.fileUrl ?? doc.file_url ?? null),
  };
}

function normalizeDean(raw: DeanDataApi | null | undefined): DeanData | null {
  if (!raw) return null;
  return {
    name: raw.name ?? '',
    qualification: raw.qualification ?? '',
    designation: raw.designation ?? '',
    institution: raw.institution ?? '',
    message: raw.message ?? '',
    imageUrl: resolveApiUrl(raw.imageUrl ?? raw.image_url ?? null),
  };
}

function normalizeObe(raw: ObeDataApi | null | undefined): ObeData | null {
  if (!raw) return null;
  return {
    title: raw.title ?? '',
    description: raw.description ?? '',
    imageUrl: resolveApiUrl(raw.imageUrl ?? raw.image_url ?? null),
  };
}

function normalizeAcademicsData(raw: unknown): AcademicsData {
  const payload = (raw && typeof raw === 'object' ? raw : {}) as {
    data?: unknown;
  };

  const source = (payload.data && typeof payload.data === 'object'
    ? payload.data
    : payload) as AcademicsDataApi;

  const programBooklets = Array.isArray(source.programBooklets)
    ? source.programBooklets
    : Array.isArray(source.program_booklets)
      ? source.program_booklets
      : [];

  const academicCalendars = Array.isArray(source.academicCalendars)
    ? source.academicCalendars
    : Array.isArray(source.academic_calendars)
      ? source.academic_calendars
      : [];

  return {
    programBooklets: programBooklets.map(normalizeDocument),
    academicCalendars: academicCalendars.map(normalizeDocument),
    dean: normalizeDean(source.dean),
    obe: normalizeObe(source.obe),
    updatedAt: source.updatedAt ?? source.updated_at ?? '',
  };
}

export const academicsService = {
  get: async (): Promise<AcademicsData> => {
    const response = await get<AcademicsResponse | AcademicsDataApi>('/pages/academics');
    return normalizeAcademicsData(response);
  },
};
