// ── Mock in-memory data store for local development ──────────────────────────
// Activated when VITE_MOCK_AUTH=true in .env.local
// Provides seed data + generic CRUD helpers so the admin panel is fully usable
// without a running backend.

import type {
  Notice, Event, Placement, HeroSlide, NewsTicker,
  Achievement, Testimonial, GalleryImage, PlacementPartner, Enquiry, Faculty, Department,
  ListResponse, ItemResponse, DeleteResponse,
} from '../types';

// ── Helpers ──────────────────────────────────────────────────────────────────
const delay = (ms = 250) => new Promise<void>((r) => setTimeout(r, ms));
const now = () => new Date().toISOString();
let _nextId = 1000;
const nextId = () => ++_nextId;

const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const hydrateDataUrl = (dataUrl: string | null): string | null => {
  if (!dataUrl || typeof dataUrl !== 'string' || !dataUrl.startsWith('data:')) return dataUrl;
  try {
    const [header, base64] = dataUrl.split(',');
    const mime = header.match(/:(.*?);/)?.[1] || '';
    const bstr = atob(base64);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    const blob = new Blob([u8arr], { type: mime });
    return URL.createObjectURL(blob);
  } catch (e) {
    console.error('Failed to parse base64 back to Blob URL', e);
    return dataUrl;
  }
};

const processFiles = async (data: any): Promise<any> => {
  if (typeof File !== 'undefined' && data instanceof File) {
    return await fileToDataUrl(data);
  }
  if (Array.isArray(data)) {
    return await Promise.all(data.map(processFiles));
  }
  if (data && typeof data === 'object' && !(data instanceof Date)) {
    const result: any = {};
    for (const [key, value] of Object.entries(data)) {
      result[key] = await processFiles(value);
    }
    return result;
  }
  return data;
};

function hydrateStoredValue<T>(value: T): T {
  if (typeof value === 'string') {
    return hydrateDataUrl(value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((entry) => hydrateStoredValue(entry)) as T;
  }

  if (value && typeof value === 'object' && !(value instanceof Date)) {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, entry]) => [
        key,
        hydrateStoredValue(entry),
      ]),
    ) as T;
  }

  return value;
}

export function readMockCollection<T>(storageKey: string, seed: T[]): T[] {
  if (typeof localStorage === 'undefined') {
    return seed.map((item) => hydrateStoredValue(item));
  }

  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const parsed = JSON.parse(stored) as T[];
      return Array.isArray(parsed)
        ? parsed.map((item) => hydrateStoredValue(item))
        : seed.map((item) => hydrateStoredValue(item));
    }
  } catch (e) {
    console.error(`Failed to parse ${storageKey} from localStorage`, e);
  }

  return seed.map((item) => hydrateStoredValue(item));
}

// ── Generic CRUD factory ─────────────────────────────────────────────────────
export function createMockCrud<T extends { id: number }>(seed: T[], storageKey: string) {
  let store = readMockCollection(storageKey, seed);

  const syncFromStorage = () => {
    store = readMockCollection(storageKey, seed);
  };

  const persist = () => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(store));
    } catch (e) {
      console.error(`Failed to save ${storageKey} to localStorage`, e);
    }
  };

  return {
    list: async (): Promise<ListResponse<T>> => {
      await delay();
      syncFromStorage();
      return { success: true, data: [...store] };
    },

    get: async (id: number): Promise<ItemResponse<T>> => {
      await delay();
      syncFromStorage();
      const item = store.find((i) => i.id === id);
      if (!item) throw new Error(`Item ${id} not found`);
      return { success: true, data: { ...item } };
    },

    create: async (payload: Partial<T>): Promise<ItemResponse<T>> => {
      await delay(300);
      syncFromStorage();
      
      const processedPayload = await processFiles(payload);

      const item = {
        id: nextId(),
        created_at: now(),
        updated_at: now(),
        ...processedPayload,
      } as unknown as T;
      store.unshift(item);
      persist();

      return { success: true, data: hydrateStoredValue(item), message: 'Created successfully' };
    },

    update: async (id: number, payload: Partial<T>): Promise<ItemResponse<T>> => {
      await delay(300);
      syncFromStorage();
      const idx = store.findIndex((i) => i.id === id);
      if (idx === -1) throw new Error(`Item ${id} not found`);

      const processedPayload = await processFiles(payload);

      store[idx] = { ...store[idx], ...processedPayload, updated_at: now() };
      persist();

      return { success: true, data: hydrateStoredValue(store[idx]), message: 'Updated successfully' };
    },

    delete: async (id: number): Promise<DeleteResponse> => {
      await delay(200);
      syncFromStorage();
      store = store.filter((i) => i.id !== id);
      persist();
      return { success: true, message: 'Deleted successfully' };
    },
  };
}

// ── Seed Data ────────────────────────────────────────────────────────────────

export const MOCK_NOTICES: Notice[] = [
  {
    id: 8821, title: 'End Semester Examination Timetable - Nov 2024',
    body: 'The timetable for the End Semester Examination for all programs has been released.',
    type: 'info',
    link_url: null,
    link_label: null,
    pdf_name: null,
    pdf_mime_type: null,
    pdf_size: null,
    has_pdf: false,
    deactivates_at: null,
    deleted_at: null,
    pdf_url: null,
    admin_pdf_url: null,
    is_active: true,
    sort_order: 1,
    expiry_date: null,
    expiry_time: null,
    created_at: '2024-10-12T10:00:00Z', updated_at: '2024-10-12T10:00:00Z',
  },
  {
    id: 8825, title: 'Annual Cultural Fest \'Kshitij\' Registrations',
    body: 'Registrations are open for all cultural events.',
    type: 'general',
    link_url: null,
    link_label: null,
    pdf_name: null,
    pdf_mime_type: null,
    pdf_size: null,
    has_pdf: false,
    deactivates_at: null,
    deleted_at: null,
    pdf_url: null,
    admin_pdf_url: null,
    is_active: true,
    sort_order: 2,
    expiry_date: null,
    expiry_time: null,
    created_at: '2024-10-14T09:00:00Z', updated_at: '2024-10-14T09:00:00Z',
  },
  {
    id: 8828, title: 'Placement Drive: Google Cloud Off-campus',
    body: 'Register now for the off-campus placement drive by Google Cloud.',
    type: 'warning',
    link_url: null,
    link_label: null,
    pdf_name: null,
    pdf_mime_type: null,
    pdf_size: null,
    has_pdf: false,
    deactivates_at: null,
    deleted_at: null,
    pdf_url: null,
    admin_pdf_url: null,
    is_active: false,
    sort_order: 3,
    expiry_date: null,
    expiry_time: null,
    created_at: '2024-10-15T14:00:00Z', updated_at: '2024-10-15T14:00:00Z',
  },
  {
    id: 8830, title: 'Hostel Re-allocation Notice',
    body: 'Information regarding the re-allocation of hostel rooms for the upcoming semester.',
    type: 'urgent',
    link_url: null,
    link_label: null,
    pdf_name: null,
    pdf_mime_type: null,
    pdf_size: null,
    has_pdf: false,
    deactivates_at: null,
    deleted_at: null,
    pdf_url: null,
    admin_pdf_url: null,
    is_active: true,
    sort_order: 4,
    expiry_date: null,
    expiry_time: null,
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
    expiry_date: '2027-10-24', expiry_time: '17:00',
    attachment: null, external_link: null, external_link_label: null,
    created_at: '2024-03-01T10:00:00Z', updated_at: '2024-03-01T10:00:00Z',
  },
  {
    id: 2, title: 'React Native Workshop',
    organizer: 'Organized by Google Developer Groups',
    description: 'Hands-on workshop on building mobile apps with React Native.',
    date: '2024-10-15', time: '10:00 AM - 01:00 PM', venue: 'IoT Lab, 3rd Floor',
    image: null, category: 'Workshop', status: 'Completed', is_featured: true, is_active: true,
    expiry_date: '2024-10-15', expiry_time: '13:00', // Intentionally past expiry
    attachment: null, external_link: null, external_link_label: null,
    created_at: '2024-02-20T10:00:00Z', updated_at: '2024-02-20T10:00:00Z',
  },
  {
    id: 3, title: 'Cultural Fest - Zeal 2024',
    organizer: 'Student Council',
    description: 'Inter-departmental cultural competition.',
    date: '2024-12-12', time: 'All Day', venue: 'College Grounds',
    image: null, category: 'Fest', status: 'Upcoming', is_featured: false, is_active: true,
    expiry_date: '2027-12-12', expiry_time: '23:59',
    attachment: null, external_link: null, external_link_label: null,
    created_at: '2024-02-15T10:00:00Z', updated_at: '2024-02-15T10:00:00Z',
  },
  {
    id: 4, title: 'AI/ML Orientation',
    organizer: 'IT Department',
    description: 'Orientation session for final year students.',
    date: '2024-09-28', time: '02:00 PM - 04:00 PM', venue: 'Conference Room 2',
    image: null, category: 'Seminar', status: 'Cancelled', is_featured: false, is_active: true,
    expiry_date: '2027-09-28', expiry_time: '16:00',
    attachment: null, external_link: null, external_link_label: null,
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
    image_url: '/Images/hero/campus.jpg',
    button_text: 'Explore', button_link: '/about-us',
    sort_order: 1, is_active: true,
    created_at: '2026-01-01T10:00:00Z', updated_at: '2026-01-01T10:00:00Z',
  },
  {
    id: 2, title: 'Admissions 2026-27',
    subtitle: 'Apply now for B.E. / B.Tech programs',
    image_url: '/Images/hero/admissions.jpg',
    button_text: 'Apply Now', button_link: '/courses-and-intake',
    sort_order: 2, is_active: true,
    created_at: '2026-01-01T10:00:00Z', updated_at: '2026-01-01T10:00:00Z',
  },
  {
    id: 3, title: 'NAAC A+ Accredited',
    subtitle: 'Recognized for academic excellence and infrastructure',
    image_url: '/Images/hero/naac.jpg',
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

export const MOCK_FACULTY: Faculty[] = [
  {
    _id: 'mock-1',
    basicInfo: {
      fullName: 'Dr. Sunita Mehta',
      designation: 'Professor & HOD',
      department: 'Computer Engineering',
      email: 'sunita.mehta@vcet.edu.in',
      dob: '1978-06-15',
      joinDate: '2006-07-01',
      isActive: true,
    },
    profileImage: { url: '/Images/departments/computer/faculty/sunita-mehta.jpg', public_id: 'mock-img-1' },
    qualifications: {
      degrees: ['Ph.D. Computer Science', 'M.Tech CSE', 'B.E. IT'],
      specialization: 'Machine Learning & AI',
    },
    experience: {
      teachingYears: 18,
      industryYears: 4,
      totalPapers: 32,
      totalBooks: 3,
      totalPatents: 2,
    },
    academic: {
      pgProjects: '12 M.Tech projects guided',
      researchDomains: ['Artificial Intelligence', 'Deep Learning', 'Computer Vision'],
      consultancyProjects: ['Smart City Analytics for Mumbai Municipal Corp'],
    },
    publications: {
      books: [{ title: 'Machine Learning Fundamentals (Springer, 2022)', isbn: '978-3-030-12345-6' }],
      patents: [{ title: 'AI-based Traffic Management System (IN202100345)', date: '2021-05-12' }],
      researchPapers: ['32 papers in IEEE, Elsevier, Springer'],
    },
    rolesAndAwards: {
      roles: ['Head of Department - Computer Engineering', 'Member - Board of Studies'],
      awards: ['Best Researcher Award 2023 - University of Mumbai'],
    },
    onlineLinks: {
      website: 'https://scholar.google.com/sunita-mehta',
      youtube: '',
      github: 'https://github.com/sunita-mehta',
    },
    memberships: {
      organizations: ['IEEE Senior Member', 'ACM Professional Member', 'CSI Life Member'],
    },
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z',
  },
  {
    _id: 'mock-2',
    basicInfo: {
      fullName: 'Prof. Rajesh Kulkarni',
      designation: 'Associate Professor',
      department: 'Information Technology',
      email: 'rajesh.kulkarni@vcet.edu.in',
      dob: '1984-03-22',
      joinDate: '2012-08-15',
      isActive: true,
    },
    profileImage: { url: '/Images/departments/it/faculty/rajesh-kulkarni.jpg', public_id: 'mock-img-2' },
    qualifications: {
      degrees: ['M.Tech Information Technology', 'B.E. IT'],
      specialization: 'Cybersecurity & Network Systems',
    },
    experience: {
      teachingYears: 12,
      industryYears: 6,
      totalPapers: 18,
      totalBooks: 1,
      totalPatents: 0,
    },
    academic: {
      pgProjects: '8 M.Tech projects guided',
      researchDomains: ['Network Security', 'Blockchain'],
      consultancyProjects: ['Cybersecurity Audit for State Bank of India'],
    },
    publications: {
      books: [{ title: 'Network Security Essentials (Pearson, 2023)', isbn: '978-0-13-456789-0' }],
      patents: [],
      researchPapers: ['18 papers in IEEE, ACM conferences'],
    },
    rolesAndAwards: {
      roles: ['Cybersecurity Lab In-charge', 'NBA Coordinator'],
      awards: ['Best Paper Award - IEEE ICCCNT 2022'],
    },
    onlineLinks: {
      website: 'https://rajeshk.dev',
      youtube: 'https://youtube.com/@rajeshk-cybersec',
      github: '',
    },
    memberships: {
      organizations: ['IEEE Member', 'ISCA Member'],
    },
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-02-15T10:00:00Z',
  },
];

// Special CRUD handler for Faculty to support _id instead of id
export function createFacultyMockCrud(seed: Faculty[], storageKey: string = 'vcet_mock_faculty_v3') {
  let store = readMockCollection(storageKey, seed);

  const persist = () => localStorage.setItem(storageKey, JSON.stringify(store));

  return {
    list: async () => ({ success: true, data: [...store] }),
    get: async (id: string) => {
      const item = store.find(f => f._id === id);
      if (!item) throw new Error('Faculty not found');
      return { success: true, data: { ...item } };
    },
    create: async (payload: any) => {
      const newItem = { 
        ...payload, 
        _id: `mock-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      store.unshift(newItem);
      persist();
      return { success: true, data: newItem };
    },
    update: async (id: string, payload: any) => {
      const idx = store.findIndex(f => f._id === id);
      if (idx === -1) throw new Error('Faculty not found');
      store[idx] = { ...store[idx], ...payload, updatedAt: new Date().toISOString() };
      persist();
      return { success: true, data: store[idx] };
    },
    delete: async (id: string) => {
      store = store.filter(f => f._id !== id);
      persist();
      return { success: true };
    }
  };
}

export const mockFacultyApi = createFacultyMockCrud(MOCK_FACULTY);

// ── Gallery-specific CRUD (no "get" or "update", only upload + delete) ───────
export function createGalleryCrud(seed: GalleryImage[], storageKey: string = 'vcet_mock_gallery') {
  let store = readMockCollection(storageKey, seed);

  const syncFromStorage = () => {
    store = readMockCollection(storageKey, seed);
  };

  const persist = () => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(store));
    } catch (e) {
      console.error(`Failed to save ${storageKey} to localStorage`, e);
    }
  };

  return {
    list: async (): Promise<ListResponse<GalleryImage>> => {
      await delay();
      syncFromStorage();
      return { success: true, data: [...store] };
    },
    upload: async (payload: { image: File; caption?: string }): Promise<{ data: GalleryImage; message: string }> => {
      await delay(400);
      syncFromStorage();
      const base64Image = await fileToDataUrl(payload.image);
      const item: GalleryImage = {
        id: nextId(),
        image: base64Image,
        caption: payload.caption ?? null,
        created_at: now(),
      };
      store.unshift(item);
      persist();
      
      const returnItem = { ...item, image: hydrateDataUrl(base64Image) || base64Image };
      return { data: returnItem, message: 'Uploaded successfully' };
    },
    delete: async (id: number): Promise<DeleteResponse> => {
      await delay(200);
      syncFromStorage();
      store = store.filter((i) => i.id !== id);
      persist();
      return { success: true, message: 'Deleted successfully' };
    },
  };
}

export const MOCK_DEPARTMENTS: Department[] = [
  {
    id: 1,
    name: 'Information Technology',
    slug: 'information-technology',
    is_active: true,
    created_at: now(),
    updated_at: now(),
    content: {
      dabMembers: [
        { name: 'Dr. John Doe', designation: 'Professor', organization: 'IIT Bombay' },
        { name: 'Mr. Jane Smith', designation: 'Senior Engineer', organization: 'TCS' }
      ],
      faculty: [1, 2],
      toppers: [
        { name: 'Aarav Patel', year: '2023-24', cgpa: '9.8' },
        { name: 'Riya Gupta', year: '2022-23', cgpa: '9.7' }
      ],
      newsletter: [
        { title: 'Jan 2024 Edition', link: 'https://vcet.edu.in/newsletter-2024.pdf' }
      ],
      patents: [
        { title: 'AI-based Traffic Management System', description: 'Smart traffic light control using computer vision.', pdf: '' }
      ],
      mous: [
        { organization: 'Microsoft', description: 'Collaboration for student training in Azure Cloud services.', pdf: '' }
      ],
      syllabus: [
        { title: 'Semester 3 - C-Scheme', pdf: '' }
      ],
      timetable: [
        { class: 'SE', pdf: '' }
      ],
      facultyAchievements: [],
      studentAchievements: [],
      activities: []
    }
  }
];
