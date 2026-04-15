export interface MmsFacultyMember {
  id: string;
  name: string;
  designation: string;
  researchAreas: string[];
  image: string;
  publicationsLink: string;
}

export interface MmsEventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
  image: string;
}

export interface MmsRecruiter {
  name: string;
  logo: string;
}

export interface MmsPlacementStats {
  placementRate: string;
  averagePackage: string;
  highestPackage: string;
  topRecruiters: number;
}

export interface MmsPlacementsData {
  statistics: MmsPlacementStats;
  recruiters: MmsRecruiter[];
}

export interface MmsTestimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
}

export interface MmsFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface MmsHomeData {
  highlights: Array<{ label: string; value: string }>;
  testimonials: MmsTestimonial[];
}

export interface MmsEnquiryPayload {
  name: string;
  email: string;
  phone: string;
  state?: string;
  city?: string;
  department?: string;
  course: string;
  specialization?: string;
  message: string;
  website?: string;
  form_started_at?: number;
  consent?: boolean;
  source?: 'general' | 'mms-home-popup';
}
