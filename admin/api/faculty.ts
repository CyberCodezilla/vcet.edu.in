import { client, resolveApiUrl } from './client';
import type { ListResponse, ItemResponse, DeleteResponse, Faculty, FacultyPayload } from '../types';
import { mockFacultyApi } from './mockStore';

const USE_MOCK = import.meta.env.DEV && import.meta.env.VITE_MOCK_AUTH === 'true';

type LooseFaculty = Faculty & {
  name?: string | null;
  department?: string | null;
  designation?: string | null;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  profile_image?: string | { url?: string | null } | null;
  basicInfo?: Partial<Faculty['basicInfo']>;
  qualifications?: {
    degrees?: string[] | null;
    highestQualification?: string | null;
    qualification?: string | null;
    specialization?: string | null;
  };
  experience?: {
    teachingYears?: number | null;
    industryYears?: number | null;
    totalPapers?: number | null;
    totalBooks?: number | null;
    totalPatents?: number | null;
    teachingExperience?: number | null;
    industryExperience?: number | null;
  };
  academic?: {
    pgProjects?: string | null;
    researchDomains?: string[] | null;
    researchDomain?: string | string[] | null;
    consultancyProjects?: string | string[] | null;
  };
  publications?: {
    books?: Array<{ title?: string | null; isbn?: string | null }> | string | null;
    patents?: Array<{ title?: string | null; date?: string | null }> | string | null;
    researchPapers?: string[] | null;
    papers?: string | string[] | null;
    isbn?: string | null;
  };
  rolesAndAwards?: {
    roles?: string[] | string | null;
    awards?: string[] | string | null;
  };
  onlineLinks?: {
    website?: string | null;
    youtube?: string | null;
    github?: string | null;
    resources?: string | string[] | null;
  };
  memberships?: {
    organizations?: string[] | null;
    details?: string | string[] | null;
  };
};

const normalizeStringArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value
      .map((item) => (typeof item === 'string' ? item.trim() : ''))
      .filter(Boolean);
  }

  if (typeof value === 'string') {
    return value
      .split(/\r?\n|;/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const normalizeImageUrl = (value: unknown): string | null => {
  const raw = typeof value === 'string'
    ? value
    : (value && typeof value === 'object' && 'url' in value && typeof value.url === 'string'
      ? value.url
      : null);

  if (!raw) {
    return null;
  }

  try {
    const parsed = new URL(raw);
    if (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1') {
      return resolveApiUrl(parsed.pathname + parsed.search);
    }
  } catch {
    // Non-absolute URLs are handled by resolveApiUrl below.
  }

  return resolveApiUrl(raw);
};

const normalizeFaculty = (faculty: LooseFaculty): Faculty => {
  const basicInfo = (faculty.basicInfo ?? {}) as LooseFaculty['basicInfo'];
  const qualifications = (faculty.qualifications ?? {}) as LooseFaculty['qualifications'];
  const experience = (faculty.experience ?? {}) as LooseFaculty['experience'];
  const academic = (faculty.academic ?? {}) as LooseFaculty['academic'];
  const publications = (faculty.publications ?? {}) as LooseFaculty['publications'];
  const rolesAndAwards = (faculty.rolesAndAwards ?? {}) as LooseFaculty['rolesAndAwards'];
  const onlineLinks = (faculty.onlineLinks ?? {}) as LooseFaculty['onlineLinks'];
  const memberships = (faculty.memberships ?? {}) as LooseFaculty['memberships'];
  const normalizedUrl = normalizeImageUrl(faculty.profileImage?.url || faculty.profile_image || null);

  const degrees = normalizeStringArray(
    qualifications.degrees?.length
      ? qualifications.degrees
      : qualifications.highestQualification || qualifications.qualification || null,
  );

  const rawBooks = Array.isArray(publications.books) ? publications.books : [];
  const books = rawBooks
    .map((book) => ({
      title: typeof book?.title === 'string' ? book.title : '',
      isbn: typeof book?.isbn === 'string' ? book.isbn : '',
    }))
    .filter((book) => book.title || book.isbn);

  if (books.length === 0 && typeof publications.books === 'string' && publications.books.trim()) {
    books.push({ title: publications.books.trim(), isbn: typeof publications.isbn === 'string' ? publications.isbn : '' });
  }

  const rawPatents = Array.isArray(publications.patents) ? publications.patents : [];
  const patents = rawPatents
    .map((patent) => ({
      title: typeof patent?.title === 'string' ? patent.title : '',
      date: typeof patent?.date === 'string' ? patent.date : '',
    }))
    .filter((patent) => patent.title || patent.date);

  if (patents.length === 0 && typeof publications.patents === 'string' && publications.patents.trim()) {
    patents.push({ title: publications.patents.trim(), date: '' });
  }

  return {
    ...faculty,
    basicInfo: {
      fullName: basicInfo.fullName || faculty.name || '',
      designation: basicInfo.designation || faculty.designation || '',
      department: basicInfo.department || faculty.department || '',
      email: basicInfo.email || '',
      dob: basicInfo.dob || null,
      joinDate: basicInfo.joinDate || null,
      isActive:
        typeof basicInfo.isActive === 'boolean'
          ? basicInfo.isActive
          : typeof faculty.is_active === 'boolean'
            ? faculty.is_active
            : true,
    },
    qualifications: {
      degrees,
      specialization: qualifications.specialization || '',
    },
    experience: {
      teachingYears: experience.teachingYears ?? experience.teachingExperience ?? 0,
      industryYears: experience.industryYears ?? experience.industryExperience ?? 0,
      totalPapers: experience.totalPapers ?? 0,
      totalBooks: experience.totalBooks ?? books.length,
      totalPatents: experience.totalPatents ?? patents.length,
    },
    academic: {
      pgProjects: academic.pgProjects || '',
      researchDomains: normalizeStringArray(academic.researchDomains?.length ? academic.researchDomains : academic.researchDomain),
      consultancyProjects: normalizeStringArray(academic.consultancyProjects),
    },
    publications: {
      books,
      patents,
      researchPapers: normalizeStringArray(
        publications.researchPapers?.length ? publications.researchPapers : publications.papers,
      ),
    },
    rolesAndAwards: {
      roles: normalizeStringArray(rolesAndAwards.roles),
      awards: normalizeStringArray(rolesAndAwards.awards),
    },
    onlineLinks: {
      website: onlineLinks.website || '',
      youtube: onlineLinks.youtube || '',
      github: onlineLinks.github || '',
    },
    memberships: {
      organizations: normalizeStringArray(
        memberships.organizations?.length ? memberships.organizations : memberships.details,
      ),
    },
    createdAt: faculty.createdAt || faculty.created_at || '',
    updatedAt: faculty.updatedAt || faculty.updated_at || '',
    profileImage: {
      url: normalizedUrl || '',
      public_id: faculty.profileImage?.public_id || '',
    },
  };
};

const normalizeListResponse = (response: ListResponse<Faculty>): ListResponse<Faculty> => ({
  ...response,
  data: Array.isArray(response.data) ? response.data.map(normalizeFaculty) : [],
});

const normalizeItemResponse = (response: ItemResponse<Faculty>): ItemResponse<Faculty> => ({
  ...response,
  data: response.data ? normalizeFaculty(response.data) : response.data,
});

export const facultyApi = {
  list: USE_MOCK
    ? () => mockFacultyApi.list()
    : () => client.request<ListResponse<Faculty>>('/faculty/all').then(normalizeListResponse),

  get: USE_MOCK
    ? (id: number | string) => mockFacultyApi.get(String(id))
    : (id: number | string) => client.request<ItemResponse<Faculty>>(`/faculty/${id}`).then(normalizeItemResponse),

  create: async (payload: FacultyPayload) => {
    if (USE_MOCK) {
      return mockFacultyApi.create(payload);
    }

    // If there is an image file, use FormData
    if (payload.profileImage instanceof File) {
      const formData = new FormData();
      formData.append('profileImage', payload.profileImage);
      
      // Append all nested JSON objects as stringified strings
      formData.append('basicInfo', JSON.stringify(payload.basicInfo || {}));
      if (payload.qualifications) formData.append('qualifications', JSON.stringify(payload.qualifications));
      if (payload.experience) formData.append('experience', JSON.stringify(payload.experience));
      if (payload.academic) formData.append('academic', JSON.stringify(payload.academic));
      if (payload.publications) formData.append('publications', JSON.stringify(payload.publications));
      if (payload.rolesAndAwards) formData.append('rolesAndAwards', JSON.stringify(payload.rolesAndAwards));
      if (payload.onlineLinks) formData.append('onlineLinks', JSON.stringify(payload.onlineLinks));
      if (payload.memberships) formData.append('memberships', JSON.stringify(payload.memberships));

      return client.requestForm<ItemResponse<Faculty>>('/faculty', formData, 'POST').then(normalizeItemResponse);
    }

    // Fallback to strict JSON if no image
    return client.request<ItemResponse<Faculty>>('/faculty', {
      method: 'POST',
      body: JSON.stringify(payload),
    }).then(normalizeItemResponse);
  },

  update: async (id: number | string, payload: FacultyPayload) => {
    if (USE_MOCK) {
      return mockFacultyApi.update(String(id), payload);
    }

    // If there is an image file, use FormData (Laravel form spoofing for PUT)
    if (payload.profileImage instanceof File) {
      const formData = new FormData();
      formData.append('_method', 'PUT'); // Laravel requirement for multipart PUT requests
      formData.append('profileImage', payload.profileImage);
      
      formData.append('basicInfo', JSON.stringify(payload.basicInfo || {}));
      if (payload.qualifications) formData.append('qualifications', JSON.stringify(payload.qualifications));
      if (payload.experience) formData.append('experience', JSON.stringify(payload.experience));
      if (payload.academic) formData.append('academic', JSON.stringify(payload.academic));
      if (payload.publications) formData.append('publications', JSON.stringify(payload.publications));
      if (payload.rolesAndAwards) formData.append('rolesAndAwards', JSON.stringify(payload.rolesAndAwards));
      if (payload.onlineLinks) formData.append('onlineLinks', JSON.stringify(payload.onlineLinks));
      if (payload.memberships) formData.append('memberships', JSON.stringify(payload.memberships));

      return client.requestForm<ItemResponse<Faculty>>(`/faculty/${id}`, formData, 'POST').then(normalizeItemResponse);
    }

    // Fallback to strict JSON if no image
    return client.request<ItemResponse<Faculty>>(`/faculty/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }).then(normalizeItemResponse);
  },

  delete: USE_MOCK
    ? (id: number | string) => mockFacultyApi.delete(String(id))
    : (id: number | string) => client.request<DeleteResponse>(`/faculty/${id}`, { method: 'DELETE' }),

  publicList: USE_MOCK
    ? () => mockFacultyApi.list()
    : () => client.request<ListResponse<Faculty>>('/faculty').then(normalizeListResponse),
};
