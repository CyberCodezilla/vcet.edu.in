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
  category: string | null;
  description: string | null;
  attachment: string | null;
  external_link: string | null;
  is_new: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface NoticePayload {
  title: string;
  category?: string;
  description?: string;
  external_link?: string;
  is_new?: boolean;
  is_active?: boolean;
  sort_order?: number;
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
  image?: File;
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
  image: string;
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

export interface GalleryImage {
  id: number;
  image: string;
  caption: string | null;
  created_at: string;
}

export interface GalleryPayload {
  caption?: string;
  image: File;
}

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
