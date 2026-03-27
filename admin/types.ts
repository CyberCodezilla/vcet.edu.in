// ─── Shared admin TypeScript interfaces ───────────────────────────────────────
// Response shapes match the Laravel backend at https://github.com/ivory-26/vcet

// ── Auth ──────────────────────────────────────────────────────────────────────

export interface User {
  id: number;
  username: string;
  full_name: string;
  role: 'super' | 'editor';
}

// ── Standard Laravel response envelopes ───────────────────────────────────────

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
}

/** List response: GET /api/notices, /api/events, etc. */
export interface ListResponse<T> {
  success: boolean;
  data: T[];
  meta?: PaginationMeta;  // present when backend paginates
}

/** Single item: GET /api/notices/:id  |  POST/PUT (create/update) */
export interface ItemResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/** Delete / action response */
export interface DeleteResponse {
  success: boolean;
  message: string;
}

// ── Notices ───────────────────────────────────────────────────────────────────

export interface Notice {
  id: number;
  title: string;
  body: string;
  type: 'general' | 'info' | 'warning' | 'urgent';
  link_url: string | null;
  link_label: string | null;
  pdf_name: string | null;
  pdf_mime_type: string | null;
  pdf_size: number | null;
  has_pdf: boolean;
  deactivates_at: string | null;
  deleted_at: string | null;
  pdf_url: string | null;
  admin_pdf_url: string | null;
  is_active: boolean;
  sort_order: number;
  expiry_date: string | null;
  expiry_time: string | null;
  created_at: string;
  updated_at: string;
  author?: {
    id: number;
    name: string;
    email: string;
  };
}

export interface NoticePayload {
  title: string;
  body: string;
  type?: 'general' | 'info' | 'warning' | 'urgent';
  link_url?: string | null;
  link_label?: string | null;
  pdf?: File | null;
  deactivates_at?: string | null;
  remove_pdf?: boolean;
  is_active?: boolean;
  sort_order?: number;
  expiry_date?: string;
  expiry_time?: string;
  attachment?: File;
}

// ── Events ────────────────────────────────────────────────────────────────────

export interface Event {
  id: number;
  title: string;
  organizer: string | null;
  description: string | null;
  date: string;
  time: string | null;
  venue: string | null;
  image: string | null;
  category: string | null;
  status: 'Upcoming' | 'Completed' | 'Cancelled' | null;
  is_featured: boolean;
  is_active: boolean;
  expiry_date: string | null;
  expiry_time: string | null;
  attachment: string | null;
  external_link: string | null;
  external_link_label: string | null;
  created_at: string;
  updated_at: string;
}

export interface EventPayload {
  title?: string;
  organizer?: string;
  description?: string;
  date?: string;
  time?: string;
  venue?: string;
  category?: string;
  status?: 'Upcoming' | 'Completed' | 'Cancelled';
  is_featured?: boolean;
  is_active?: boolean;
  expiry_date?: string;
  expiry_time?: string;
  image?: File;
  attachment?: File;
  external_link?: string;
  external_link_label?: string;
}

// ── Placements ────────────────────────────────────────────────────────────────

export interface Placement {
  id: number;
  company: string;
  logo: string | null;
  package_lpa: number;
  student_count: number;
  year: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PlacementPayload {
  company: string;
  package_lpa: number;
  student_count: number;
  year: number;
  is_active?: boolean;
  logo?: File;
}

// ── Hero Slides ───────────────────────────────────────────────────────────────

export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string | null;
  image_url: string | null; // Renamed from image to match backend Append attribute
  button_text: string | null;
  button_link: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface HeroSlidePayload {
  title?: string;
  subtitle?: string;
  button_text?: string;
  button_link?: string;
  sort_order?: number;
  is_active?: boolean;
  image?: File;
}

// ── Gallery ───────────────────────────────────────────────────────────────

export interface Gallery {
  id: number;
  title: string | null;
  subtitle: string | null;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GalleryPayload {
  title?: string;
  subtitle?: string;
  sort_order?: number;
  is_active?: boolean;
  image?: File;
}

// ── News Ticker ───────────────────────────────────────────────────────────────

export interface NewsTicker {
  id: number;
  text: string;
  link: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface NewsTickerPayload {
  text: string;
  link?: string;
  is_active?: boolean;
  sort_order?: number;
}

// ── Achievements ──────────────────────────────────────────────────────────────

export interface Achievement {
  id: number;
  title: string;
  value: string;
  participant_name: string | null;
  participant_avatar: string | null;
  participant_role: string | null;
  date: string | null;
  category: string | null;
  document_name: string | null;
  document_url: string | null;
  description: string | null;
  icon: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AchievementPayload {
  title?: string;
  value?: string;
  participant_name?: string;
  participant_role?: string;
  date?: string;
  category?: string;
  document_name?: string;
  document_url?: string;
  description?: string;
  icon?: string;
  sort_order?: number;
  is_active?: boolean;
}

// ── Testimonials ──────────────────────────────────────────────────────────────

export interface Testimonial {
  id: number;
  name: string;
  role: string | null;
  text: string;
  photo: string | null;
  rating: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TestimonialPayload {
  name?: string;
  role?: string;
  text?: string;
  rating?: number;
  is_active?: boolean;
  photo?: File;
}

// ── Gallery ───────────────────────────────────────────────────────────────────



// ── Placement Partners ────────────────────────────────────────────────────────

export interface PlacementPartner {
  id: number;
  name: string;
  logo: string;
  website: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface PlacementPartnerPayload {
  name: string;
  website?: string;
  is_active?: boolean;
  sort_order?: number;
  logo?: File;
}

// ── Enquiries (read-only from admin) ──────────────────────────────────────────

export interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  course: string | null;
  created_at: string;
}

export interface GalleryImage {
  id: number;
  image: string;
  caption: string | null;
  created_at: string;
}

export interface GalleryImagePayload {
  caption?: string;
  image: File;
}

// ── Faculty ───────────────────────────────────────────────────────────────────

export interface Faculty {
  id: number;
  slug?: string;
  basicInfo: {
    fullName: string;
    designation: string;
    department: string;
    email: string;
    dob: string | null;
    joinDate: string | null;
    isActive: boolean;
  };
  profileImage?: {
    url: string;
    public_id: string;
  };
  qualifications: {
    degrees: string[];
    specialization: string;
  };
  experience: {
    teachingYears: number;
    industryYears: number;
    totalPapers: number;
    totalBooks: number;
    totalPatents: number;
  };
  academic: {
    pgProjects: string;
    researchDomains: string[];
    consultancyProjects: string[];
  };
  publications: {
    books: { title: string; isbn: string }[];
    patents: { title: string; date: string }[];
    researchPapers: string[];
  };
  rolesAndAwards: {
    roles: string[];
    awards: string[];
  };
  onlineLinks: {
    website: string;
    youtube: string;
    github: string;
  };
  memberships: {
    organizations: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface FacultyPayload {
  basicInfo: {
    fullName: string;
    designation: string;
    department: string;
    email: string;
    dob?: string;
    joinDate?: string;
    isActive?: boolean;
  };
  qualifications?: {
    degrees?: string[];
    specialization?: string;
  };
  experience?: {
    teachingYears?: number;
    industryYears?: number;
    totalPapers?: number;
    totalBooks?: number;
    totalPatents?: number;
  };
  academic?: {
    pgProjects?: string;
    researchDomains?: string[];
    consultancyProjects?: string[];
  };
  publications?: {
    books?: { title: string; isbn: string }[];
    patents?: { title: string; date: string }[];
    researchPapers?: string[];
  };
  rolesAndAwards?: {
    roles?: string[];
    awards?: string[];
  };
  onlineLinks?: {
    website?: string;
    youtube?: string;
    github?: string;
  };
  memberships?: {
    organizations?: string[];
  };
  profileImage?: File;
}

// ── Department ────────────────────────────────────────────────────────────────

export interface Department {
  id: number;
  name: string;
  slug: string;
  content: {
    // Legacy / Keepers
    dabMembers: { name: string; designation: string; organization: string }[];
    faculty: number[];
    toppers: { name: string; year: string; cgpa: string }[];
    newsletter: { title: string; link: string }[];

    // New / Updated
    patents: { title: string; description: string; pdf?: string | File }[];
    mous: { organization: string; description: string; pdf?: string | File }[];
    syllabus: { title: string; pdf?: string | File }[];
    timetable: { class: string; pdf?: string | File }[];
    facultyAchievements: { title: string; description: string; image?: string | File; pdf?: string | File }[];
    studentAchievements: { title: string; description: string; image?: string | File; pdf?: string | File }[];
    activities: { title: string; description: string; image?: string | File; pdf?: string | File }[];
  };
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DepartmentPayload {
  name?: string;
  slug?: string;
  content?: {
    dabMembers?: { name: string; designation: string; organization: string }[];
    faculty?: number[];
    toppers?: { name: string; year: string; cgpa: string }[];
    newsletter?: { title: string; link: string }[];

    patents?: { title: string; description: string; pdf?: string | File }[];
    mous?: { organization: string; description: string; pdf?: string | File }[];
    syllabus?: { title: string; pdf?: string | File }[];
    timetable?: { class: string; pdf?: string | File }[];
    facultyAchievements?: { title: string; description: string; image?: string | File; pdf?: string | File }[];
    studentAchievements?: { title: string; description: string; image?: string | File; pdf?: string | File }[];
    activities?: { title: string; description: string; image?: string | File; pdf?: string | File }[];
  };
  is_active?: boolean;
}
