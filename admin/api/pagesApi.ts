import { client } from './client';
import type { 
  AdmissionData, AdmissionPayload, 
  AcademicsData, AcademicsPayload,
  ExamData, ExamPayload,
  ItemResponse 
} from '../types';
import { 
  createAdmissionCrud, 
  createAcademicsCrud,
  createExamCrud
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
  }
};
