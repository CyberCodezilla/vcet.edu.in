import { post } from './api';

export interface AdmissionEnquiryPayload {
  name: string;
  email: string;
  phone: string;
  state?: string;
  city?: string;
  department: string;
  course: string;
  specialization?: string;
  consent: boolean;
}

export interface ContactEnquiryPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function submitAdmissionEnquiry(payload: AdmissionEnquiryPayload): Promise<{ message: string; id: number }> {
  return post<{ message: string; id: number }>('/enquiries', payload);
}
