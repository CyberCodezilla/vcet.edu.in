import { client } from './client';
import type { 
  AdmissionData, AdmissionPayload, 
  AcademicsData, AcademicsPayload,
  ExamData, ExamPayload,
  CommitteeData, CommitteePayload,
  ResearchData, ResearchPayload,
  FacilityData, FacilityPayload,
  AboutData, AboutPayload,
  ItemResponse 
} from '../types';
import { 
  createAdmissionCrud, 
  createAcademicsCrud,
  createExamCrud,
  createCommitteeCrud,
  createResearchCrud,
  createFacilityCrud,
  createAboutCrud,
  mockCommittees,
  mockResearch,
  mockFacilities,
  mockAbout
} from './mockStore';

const USE_MOCK = import.meta.env.VITE_MOCK_AUTH === 'true';

// Mock instances
const mockAdmission = createAdmissionCrud();
const mockAcademics = createAcademicsCrud();
const mockExam = createExamCrud();

function buildFormData(formData: FormData, data: any, parentKey?: string) {
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
    if (Array.isArray(data)) {
      if (data.length === 0 && parentKey) {
        formData.append(parentKey, '');
      } else {
        data.forEach((value, index) => {
          buildFormData(formData, value, parentKey ? `${parentKey}[${index}]` : index.toString());
        });
      }
    } else {
      Object.keys(data).forEach(key => {
        buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
      });
    }
  } else {
    if (data !== null && data !== undefined) {
      if (typeof data === 'boolean') {
        formData.append(parentKey!, data ? '1' : '0');
      } else {
        formData.append(parentKey!, data);
      }
    }
  }
}

/**
 * API for standalone pages (Admission, Academics)
 */
export const pagesApi = {
  admission: {
    get: () => USE_MOCK 
      ? mockAdmission.get() 
      : client.request<ItemResponse<AdmissionData>>('/pages/admission'),
    
    update: (payload: AdmissionPayload) => {
      if (USE_MOCK) return mockAdmission.update(payload);
      
      const formData = new FormData();
      buildFormData(formData, payload);
      
      return client.requestForm<ItemResponse<AdmissionData>>('/pages/admission', formData);
    }
  },

  academics: {
    get: () => USE_MOCK 
      ? mockAcademics.get() 
      : client.request<ItemResponse<AcademicsData>>('/pages/academics'),
    
    update: (payload: AcademicsPayload) => {
      if (USE_MOCK) return mockAcademics.update(payload);
      
      const formData = new FormData();
      
      if (payload.programBooklets) {
        formData.append('programBooklets', JSON.stringify(payload.programBooklets.map(f => ({ ...f, file: undefined }))));
      }
      if (payload.academicCalendars) {
        formData.append('academicCalendars', JSON.stringify(payload.academicCalendars.map(f => ({ ...f, file: undefined }))));
      }

      return client.requestForm<ItemResponse<AcademicsData>>('/pages/academics', formData);
    }
  },

  exam: {
    get: () => USE_MOCK 
      ? mockExam.get() 
      : client.request<ItemResponse<ExamData>>('/pages/exam'),
    
    update: (payload: ExamPayload) => {
      if (USE_MOCK) return mockExam.update(payload);
      
      const formData = new FormData();
      buildFormData(formData, payload);
      
      return client.requestForm<ItemResponse<ExamData>>('/pages/exam', formData);
    }
  },

  committees: {
    get: (slug: string) => USE_MOCK
      ? mockCommittees.get(slug)
      : client.request<ItemResponse<CommitteeData>>(`/pages/committees/${slug}`),
    
    update: (slug: string, payload: CommitteePayload) => {
      if (USE_MOCK) return mockCommittees.update(slug, payload);
      
      const formData = new FormData();
      buildFormData(formData, payload);
      
      return client.requestForm<ItemResponse<CommitteeData>>(`/pages/committees/${slug}`, formData);
    }
  },

  research: {
    get: (slug: string) => USE_MOCK
      ? mockResearch.get(slug)
      : client.request<ItemResponse<ResearchData>>(`/pages/research/${slug}`),
    
    update: (slug: string, payload: ResearchPayload) => {
      if (USE_MOCK) return mockResearch.update(slug, payload);
      
      const formData = new FormData();
      buildFormData(formData, payload);
      
      return client.requestForm<ItemResponse<ResearchData>>(`/pages/research/${slug}`, formData);
    }
  },

  facilities: {
    get: (slug: string) => USE_MOCK
      ? mockFacilities.get(slug)
      : client.request<ItemResponse<FacilityData>>(`/pages/facilities/${slug}`),
    
    update: (slug: string, payload: FacilityPayload) => {
      if (USE_MOCK) return mockFacilities.update(slug, payload);
      
      const formData = new FormData();
      buildFormData(formData, payload);
      
      return client.requestForm<ItemResponse<FacilityData>>(`/pages/facilities/${slug}`, formData);
    }
  },

  about: {
    get: (slug: string) => USE_MOCK
      ? mockAbout.get(slug)
      : client.request<ItemResponse<AboutData>>(`/pages/about/${slug}`),
    
    update: (slug: string, payload: AboutPayload) => {
      if (USE_MOCK) return mockAbout.update(slug, payload);
      
      const formData = new FormData();
      buildFormData(formData, payload);
      
      return client.requestForm<ItemResponse<AboutData>>(`/pages/about/${slug}`, formData);
    }
  }
};
