// ── Mock in-memory data store for local development ──────────────────────────
// Activated when VITE_MOCK_AUTH=true in .env.local
// Provides seed data + generic CRUD helpers so the admin panel is fully usable
// without a running backend.

import type {
  Notice, Event, Placement, HeroSlide, NewsTicker,
  Achievement, Testimonial, GalleryImage, PlacementPartner, Enquiry,
  ListResponse, ItemResponse, DeleteResponse,
} from '../types';

// ── Helpers ──────────────────────────────────────────────────────────────────
const delay = (ms = 250) => new Promise<void>((r) => setTimeout(r, ms));
const now = () => new Date().toISOString();
let _nextId = 1000;
const nextId = () => ++_nextId;

// ── Generic CRUD factory ─────────────────────────────────────────────────────
export function createMockCrud<T extends { id: number }>(seed: T[]) {
  let store = [...seed];

  return {
    list: async (): Promise<ListResponse<T>> => {
      await delay();
      return { success: true, data: [...store] };
    },

    get: async (id: number): Promise<ItemResponse<T>> => {
      await delay();
      const item = store.find((i) => i.id === id);
      if (!item) throw new Error(`Item ${id} not found`);
      return { success: true, data: { ...item } };
    },

    create: async (payload: Partial<T>): Promise<ItemResponse<T>> => {
      await delay(300);
      const item = {
        id: nextId(),
        created_at: now(),
        updated_at: now(),
        ...payload,
      } as unknown as T;
      store.unshift(item);
      return { success: true, data: item, message: 'Created successfully' };
    },

    update: async (id: number, payload: Partial<T>): Promise<ItemResponse<T>> => {
      await delay(300);
      const idx = store.findIndex((i) => i.id === id);
      if (idx === -1) throw new Error(`Item ${id} not found`);
      store[idx] = { ...store[idx], ...payload, updated_at: now() };
      return { success: true, data: { ...store[idx] }, message: 'Updated successfully' };
    },

    delete: async (id: number): Promise<DeleteResponse> => {
      await delay(200);
      store = store.filter((i) => i.id !== id);
      return { success: true, message: 'Deleted successfully' };
    },
  };
}

// ── Seed Data ────────────────────────────────────────────────────────────────

export const MOCK_NOTICES: Notice[] = [
  {
    id: 8821, title: 'End Semester Examination Timetable - Nov 2024',
    category: 'Academic',
    description: 'The timetable for the End Semester Examination for all programs has been released.',
    attachment: null, external_link: null,
    is_new: true, is_active: true, sort_order: 1,
    created_at: '2024-10-12T10:00:00Z', updated_at: '2024-10-12T10:00:00Z',
  },
  {
    id: 8825, title: 'Annual Cultural Fest \'Kshitij\' Registrations',
    category: 'Cultural',
    description: 'Registrations are open for all cultural events.',
    attachment: null, external_link: null,
    is_new: true, is_active: true, sort_order: 2,
    created_at: '2024-10-14T09:00:00Z', updated_at: '2024-10-14T09:00:00Z',
  },
  {
    id: 8828, title: 'Placement Drive: Google Cloud Off-campus',
    category: 'Placement',
    description: 'Register now for the off-campus placement drive by Google Cloud.',
    attachment: null, external_link: null,
    is_new: false, is_active: false, sort_order: 3,
    created_at: '2024-10-15T14:00:00Z', updated_at: '2024-10-15T14:00:00Z',
  },
  {
    id: 8830, title: 'Hostel Re-allocation Notice',
    category: 'Administrative',
    description: 'Information regarding the re-allocation of hostel rooms for the upcoming semester.',
    attachment: null, external_link: null,
    is_new: false, is_active: true, sort_order: 4,
    created_at: '2024-10-01T11:00:00Z', updated_at: '2024-10-01T11:00:00Z',
  },
];

export const MOCK_EVENTS: Event[] = [
  {
    id: 1, title: 'Annual Tech Symposium 2024',
    organizer: 'Organized by CSI-VCET',
    description: 'Annual technical festival featuring 20+ events across all departments.',
    date: '2024-10-24', time: '09:00 AM - 05:00 PM', venue: 'Main Auditorium, Block A',
    image: null, category: 'Seminar', status: 'Upcoming', is_featured: true, is_active: true,
    created_at: '2024-03-01T10:00:00Z', updated_at: '2024-03-01T10:00:00Z',
  },
  {
    id: 2, title: 'React Native Workshop',
    organizer: 'Organized by Google Developer Groups',
    description: 'Hands-on workshop on building mobile apps with React Native.',
    date: '2024-10-15', time: '10:00 AM - 01:00 PM', venue: 'IoT Lab, 3rd Floor',
    image: null, category: 'Workshop', status: 'Completed', is_featured: true, is_active: true,
    created_at: '2024-02-20T10:00:00Z', updated_at: '2024-02-20T10:00:00Z',
  },
  {
    id: 3, title: 'Cultural Fest - Zeal 2024',
    organizer: 'Student Council',
    description: 'Inter-departmental cultural competition.',
    date: '2024-12-12', time: 'All Day', venue: 'College Grounds',
    image: null, category: 'Fest', status: 'Upcoming', is_featured: false, is_active: true,
    created_at: '2024-02-15T10:00:00Z', updated_at: '2024-02-15T10:00:00Z',
  },
  {
    id: 4, title: 'AI/ML Orientation',
    organizer: 'IT Department',
    description: 'Orientation session for final year students.',
    date: '2024-09-28', time: '02:00 PM - 04:00 PM', venue: 'Conference Room 2',
    image: null, category: 'Seminar', status: 'Cancelled', is_featured: false, is_active: true,
    created_at: '2024-02-12T10:00:00Z', updated_at: '2024-02-12T10:00:00Z',
  },
];

export const MOCK_PLACEMENTS: Placement[] = [
  {
    id: 1, company: 'Tata Consultancy Services', logo: null,
    package_lpa: 7.5, student_count: 42, year: 2026, is_active: true,
    created_at: '2026-01-15T10:00:00Z', updated_at: '2026-01-15T10:00:00Z',
  },
  {
    id: 2, company: 'Infosys', logo: null,
    package_lpa: 6.25, student_count: 35, year: 2026, is_active: true,
    created_at: '2026-01-10T10:00:00Z', updated_at: '2026-01-10T10:00:00Z',
  },
  {
    id: 3, company: 'Wipro', logo: null,
    package_lpa: 5.0, student_count: 28, year: 2026, is_active: true,
    created_at: '2025-12-20T10:00:00Z', updated_at: '2025-12-20T10:00:00Z',
  },
  {
    id: 4, company: 'Accenture', logo: null,
    package_lpa: 8.0, student_count: 18, year: 2026, is_active: true,
    created_at: '2025-12-15T10:00:00Z', updated_at: '2025-12-15T10:00:00Z',
  },
  {
    id: 5, company: 'Capgemini', logo: null,
    package_lpa: 6.0, student_count: 22, year: 2025, is_active: true,
    created_at: '2025-06-10T10:00:00Z', updated_at: '2025-06-10T10:00:00Z',
  },
];

export const MOCK_HERO_SLIDES: HeroSlide[] = [
  {
    id: 1, title: 'Welcome to VCET',
    subtitle: 'Shaping Tomorrow\'s Engineers Since 1994',
    image: '/Images/hero/campus.jpg',
    button_text: 'Explore', button_link: '/about-us',
    sort_order: 1, is_active: true,
    created_at: '2026-01-01T10:00:00Z', updated_at: '2026-01-01T10:00:00Z',
  },
  {
    id: 2, title: 'Admissions 2026-27',
    subtitle: 'Apply now for B.E. / B.Tech programs',
    image: '/Images/hero/admissions.jpg',
    button_text: 'Apply Now', button_link: '/courses-and-intake',
    sort_order: 2, is_active: true,
    created_at: '2026-01-01T10:00:00Z', updated_at: '2026-01-01T10:00:00Z',
  },
  {
    id: 3, title: 'NAAC A+ Accredited',
    subtitle: 'Recognized for academic excellence and infrastructure',
    image: '/Images/hero/naac.jpg',
    button_text: 'Learn More', button_link: '/naac-score',
    sort_order: 3, is_active: true,
    created_at: '2026-01-01T10:00:00Z', updated_at: '2026-01-01T10:00:00Z',
  },
];

export const MOCK_NEWS_TICKER: NewsTicker[] = [
  {
    id: 1, text: '🎓 Admissions open for AY 2026-27 — Apply now!',
    link: '/courses-and-intake', is_active: true, sort_order: 1,
    created_at: '2026-03-01T10:00:00Z', updated_at: '2026-03-01T10:00:00Z',
  },
  {
    id: 2, text: '🏆 VCET students win Smart India Hackathon 2026',
    link: null, is_active: true, sort_order: 2,
    created_at: '2026-02-20T10:00:00Z', updated_at: '2026-02-20T10:00:00Z',
  },
  {
    id: 3, text: '📢 Semester exam schedule released — download from Exam Cell',
    link: '/downloads', is_active: true, sort_order: 3,
    created_at: '2026-02-15T10:00:00Z', updated_at: '2026-02-15T10:00:00Z',
  },
];

export const MOCK_ACHIEVEMENTS: Achievement[] = [
  {
    id: 1, title: 'Smart India Hackathon 2023 Winner', value: '1st Place',
    participant_name: 'Aditya Vardhan', participant_role: 'BE CSE - 3rd Year', participant_avatar: null,
    date: '2023-10-24', category: 'Academic', document_name: 'SIH_Cert.pdf', document_url: '#',
    description: 'Won the first prize in Smart India Hackathon 2023.',
    icon: '🏆', sort_order: 1, is_active: true,
    created_at: '2024-01-01T10:00:00Z', updated_at: '2024-01-01T10:00:00Z',
  },
  {
    id: 2, title: 'Anna University Zonal Champions', value: 'Champions',
    participant_name: 'VCET Cricket Team', participant_role: 'Department of PE', participant_avatar: null,
    date: '2023-11-12', category: 'Sports', document_name: 'Team_Victory.jpg', document_url: '#',
    description: 'Champions in Anna University Zonal Cricket Tournament.',
    icon: '🏏', sort_order: 2, is_active: true,
    created_at: '2024-01-01T10:00:00Z', updated_at: '2024-01-01T10:00:00Z',
  },
  {
    id: 3, title: 'IEEE Journal Publication (AI/ML)', value: 'Scientific Paper',
    participant_name: 'Dr. S. Meenakshi', participant_role: 'Associate Professor - IT', participant_avatar: null,
    date: '2024-01-05', category: 'Research', document_name: 'IEEE_Paper.pdf', document_url: '#',
    description: 'Published a research paper on AI/ML in IEEE journal.',
    icon: '🔬', sort_order: 3, is_active: true,
    created_at: '2024-01-01T10:00:00Z', updated_at: '2024-01-01T10:00:00Z',
  },
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 1, name: 'Rahul Deshmukh', role: 'B.E. Computer Engineering, 2024',
    text: 'VCET gave me the platform to grow both technically and personally. The faculty mentorship and placement support helped me land my dream job at TCS.',
    photo: null, rating: 5, is_active: true,
    created_at: '2026-01-01T10:00:00Z', updated_at: '2026-01-01T10:00:00Z',
  },
  {
    id: 2, name: 'Sneha Patil', role: 'B.E. IT, 2023',
    text: 'The hackathon culture and coding clubs at VCET prepared me well for the industry. I\'m grateful for the hands-on learning experience.',
    photo: null, rating: 5, is_active: true,
    created_at: '2026-01-01T10:00:00Z', updated_at: '2026-01-01T10:00:00Z',
  },
  {
    id: 3, name: 'Amit Joshi', role: 'B.E. Mechanical, 2024',
    text: 'Excellent infrastructure and lab facilities. The industry visits organized by the department were invaluable for understanding real-world applications.',
    photo: null, rating: 4, is_active: true,
    created_at: '2026-01-01T10:00:00Z', updated_at: '2026-01-01T10:00:00Z',
  },
];

export const MOCK_GALLERY: GalleryImage[] = [
  { id: 1, image: '/Images/gallery/campus-1.jpg', caption: 'VCET Main Building', created_at: '2026-03-01T10:00:00Z' },
  { id: 2, image: '/Images/gallery/fest-1.jpg', caption: 'TechFest 2025', created_at: '2026-02-15T10:00:00Z' },
  { id: 3, image: '/Images/gallery/lab-1.jpg', caption: 'Computer Lab', created_at: '2026-02-10T10:00:00Z' },
  { id: 4, image: '/Images/gallery/sports-1.jpg', caption: 'Annual Sports Day', created_at: '2026-01-20T10:00:00Z' },
];

export const MOCK_PLACEMENT_PARTNERS: PlacementPartner[] = [
  {
    id: 1, name: 'Tata Consultancy Services', logo: '/Images/recruiters/tcs.png',
    website: 'https://www.tcs.com', is_active: true, sort_order: 1,
    created_at: '2026-01-01T10:00:00Z', updated_at: '2026-01-01T10:00:00Z',
  },
  {
    id: 2, name: 'Infosys', logo: '/Images/recruiters/infosys.png',
    website: 'https://www.infosys.com', is_active: true, sort_order: 2,
    created_at: '2026-01-01T10:00:00Z', updated_at: '2026-01-01T10:00:00Z',
  },
  {
    id: 3, name: 'Wipro', logo: '/Images/recruiters/wipro.png',
    website: 'https://www.wipro.com', is_active: true, sort_order: 3,
    created_at: '2026-01-01T10:00:00Z', updated_at: '2026-01-01T10:00:00Z',
  },
  {
    id: 4, name: 'Accenture', logo: '/Images/recruiters/accenture.png',
    website: 'https://www.accenture.com', is_active: true, sort_order: 4,
    created_at: '2026-01-01T10:00:00Z', updated_at: '2026-01-01T10:00:00Z',
  },
];

export const MOCK_ENQUIRIES: Enquiry[] = [
  {
    id: 1, name: 'Priya Sharma', email: 'priya.sharma@gmail.com',
    phone: '9876543210', message: 'I want to know about the admission process for B.E. Computer Engineering.',
    course: 'Computer Engineering', created_at: '2026-03-12T14:30:00Z',
  },
  {
    id: 2, name: 'Rohan Mehta', email: 'rohan.m@yahoo.com',
    phone: '8765432109', message: 'What are the scholarship options available for SC/ST students?',
    course: 'Information Technology', created_at: '2026-03-11T10:15:00Z',
  },
  {
    id: 3, name: 'Anjali Desai', email: 'anjali.d@hotmail.com',
    phone: null, message: 'Can you share the hostel facilities details?',
    course: null, created_at: '2026-03-10T16:45:00Z',
  },
  {
    id: 4, name: 'Vikram Patel', email: 'vikram.p@gmail.com',
    phone: '7654321098', message: 'I am interested in the AI & Data Science course. What is the cutoff?',
    course: 'AI & Data Science', created_at: '2026-03-09T09:20:00Z',
  },
];

// ── Gallery-specific CRUD (no "get" or "update", only upload + delete) ───────
export function createGalleryCrud(seed: GalleryImage[]) {
  let store = [...seed];

  return {
    list: async (): Promise<ListResponse<GalleryImage>> => {
      await delay();
      return { success: true, data: [...store] };
    },
    upload: async (payload: { image: File; caption?: string }): Promise<{ data: GalleryImage; message: string }> => {
      await delay(400);
      const item: GalleryImage = {
        id: nextId(),
        image: URL.createObjectURL(payload.image),
        caption: payload.caption ?? null,
        created_at: now(),
      };
      store.unshift(item);
      return { data: item, message: 'Uploaded successfully' };
    },
    delete: async (id: number): Promise<DeleteResponse> => {
      await delay(200);
      store = store.filter((i) => i.id !== id);
      return { success: true, message: 'Deleted successfully' };
    },
  };
}

// ── Enquiries CRUD (read-only) ───────────────────────────────────────────────
export function createEnquiriesCrud(seed: Enquiry[]) {
  const store = [...seed];

  return {
    list: async (_page = 1): Promise<ListResponse<Enquiry>> => {
      await delay();
      return {
        success: true,
        data: [...store],
        meta: { current_page: 1, last_page: 1, total: store.length, per_page: 20 },
      };
    },
  };
}
