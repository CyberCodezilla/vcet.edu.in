// ── Mock in-memory data store for local development ──────────────────────────
// Activated when VITE_MOCK_AUTH=true in .env.local
// Provides seed data + generic CRUD helpers so the admin panel is fully usable
// without a running backend.

import type {
  Notice, Event, Placement, HeroSlide, NewsTicker,
  Achievement, Testimonial, GalleryImage, PlacementPartner, Enquiry, Faculty, Department,
  AdmissionData, AdmissionDocument,
  AcademicsData, AcademicsPayload,
  ExamData, ExamPayload,
  CommitteeData, CommitteePayload,
  ResearchData, ResearchPayload,
  FacilityData, FacilityPayload,
  AboutData, AboutPayload,
  AdmissionData, AcademicsData, AdmissionDocument,
  AdmissionSection, AdmissionItem, ExamData,
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

export const createMockSingleton = <T>(initialData: T, storageKey: string) => {
  const hydrate = (): T => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return initialData;
      }
    }
    return initialData;
  };

  return {
    get: async () => ({ data: hydrate() }),
    update: async (payload: any) => {
      const current = hydrate();
      const updatedData = await processFiles(payload);
      
      const newData = { ...current, ...updatedData, updatedAt: new Date().toISOString() };
      localStorage.setItem(storageKey, JSON.stringify(newData));
      return { data: newData as unknown as T };
    }
  };
};

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
    expiry_date: '2024-10-15', expiry_time: '13:00',
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
    id: 2, title: 'IEEE Journal Publication (AI/ML)', value: 'Scientific Paper',
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
    id: 1,
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
    id: 2,
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
      const item = store.find(f => f.id === Number(id));
      if (!item) throw new Error('Faculty not found');
      return { success: true, data: { ...item } };
    },
    create: async (payload: any) => {
      const newItem = { 
        ...payload, 
        id: `mock-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      store.unshift(newItem);
      persist();
      return { success: true, data: newItem };
    },
    update: async (id: string, payload: any) => {
      const idx = store.findIndex(f => f.id === Number(id));
      if (idx === -1) throw new Error('Faculty not found');
      store[idx] = { ...store[idx], ...payload, updatedAt: new Date().toISOString() };
      persist();
      return { success: true, data: store[idx] };
    },
    delete: async (id: string) => {
      store = store.filter(f => f.id !== Number(id));
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

/* ── Admission & Academics Singletons ───────────────────────────────────────── */

const MOCK_ADMISSION: AdmissionData = {
  id: 'admission-1',
  courses: {
    ug: [
      { name: 'Computer Engineering', intake: '180' },
      { name: 'Computer Science and Engineering (Data Science)', intake: '180' },
      { name: 'Information Technology', intake: '60' },
      { name: 'Artificial Intelligence and Data Science', intake: '120' },
      { name: 'Mechanical Engineering', intake: '60' },
      { name: 'Electronics and Telecommunication Engineering', intake: '60' },
    ],
    pg: [
      { name: 'M.E. Computer Engineering', intake: '18' },
    ],
    management: [
      { name: 'Master of Management Studies (MMS)', intake: '120' },
    ],
  },
  feesStructure: [
    { title: 'F.E. Fee Structure', description: 'Regular First Year Admission', year: '2025-26', fileUrl: 'https://vcet.edu.in/wp-content/uploads/2024/09/FE-Fee-2024-25.pdf', fileName: 'FE-Fee.pdf' },
    { title: 'Direct S.E. Fee', description: 'Lateral Entry Admission', year: '2025-26', fileUrl: 'https://vcet.edu.in/wp-content/uploads/2024/09/DSE-Fee-2024-25.pdf', fileName: 'DSE-Fee.pdf' },
  ],
  brochure: { fileName: "VCET_Brochure_2025.pdf", fileUrl: "https://vcet.edu.in/wp-content/uploads/2024/05/VCET-Brochure.pdf" },
  documentsRequired: [
    { title: 'Mandatory Documents', description: 'For all engineering programs', category: 'UG - FIRST YEAR', fileUrl: 'https://vcet.edu.in/wp-content/uploads/2024/08/Document-Required-2024-25.pdf', fileName: 'Docs-Required.pdf' },
  ],
  cutOffs: [
    { title: 'F.E. (First Year Engineering) 2024-25', description: 'Engineering Department', year: '2024-25', fileUrl: 'https://vcet.edu.in/wp-content/uploads/2024/09/FE-CAP-1-2024-25.pdf', fileName: 'FE-CAP-1.pdf' },
    { title: 'DSE (Direct Second Year) 2024-25', description: 'Engineering Department', year: '2024-25', fileUrl: 'https://vcet.edu.in/wp-content/uploads/2024/09/DSE-CAP-1-2024-25.pdf', fileName: 'DSE-CAP-1.pdf' },
  ],
  scholarships: [
    { title: 'Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna - EBC', description: 'Government Scholarship', year: '2025-26', fileUrl: 'https://vcet.edu.in/ebc-scholarship.pdf', fileName: 'EBC-Scholarship.pdf' },
    { title: 'Post Matric Scholarship to OBC Students - OBC Scholarship', description: 'Government Scholarship', year: '2025-26', fileUrl: 'https://vcet.edu.in/obc-scholarship.pdf', fileName: 'OBC-Scholarship.pdf' },
  ],
  updatedAt: new Date().toISOString(),
};

const MOCK_ACADEMICS: AcademicsData = {
  programBooklets: [
    { title: 'Honours / Minor Degree Program - Booklet Part 1', description: 'Access the official institutional booklets for program structure and syllabus details.', fileUrl: 'https://vcet.edu.in/wp-content/uploads/2024/05/Honours-Syllabus-1.pdf', fileName: 'Booklet-Part1.pdf' },
    { title: 'Honours / Minor Degree Program - Booklet Part 2', description: 'Access the official institutional booklets for program structure and syllabus details.', fileUrl: 'https://vcet.edu.in/wp-content/uploads/2024/05/Honours-Syllabus-2.pdf', fileName: 'Booklet-Part2.pdf' },
  ],
  academicCalendars: [
    { title: 'EVEN SEM 2025-26 SE TE BE', description: 'TENTATIVE', year: '2025-26', fileUrl: 'https://vcet.edu.in/wp-content/uploads/2024/05/Acad-Calendar-Even.pdf', fileName: 'Even-Sem-25-26.pdf' },
    { title: 'ODD SEM 2025-26 SE TE BE', description: 'Confirmed', year: '2025-26', fileUrl: 'https://vcet.edu.in/wp-content/uploads/2024/05/Acad-Calendar-Odd.pdf', fileName: 'Odd-Sem-25-26.pdf' },
  ],
  updatedAt: new Date().toISOString(),
};

export const MOCK_EXAM: ExamData = {
  syllabus: [
    {
      department: 'Artificial Intelligence and Data Science',
      documents: [
        { title: 'AI & DS_SE_Revised 2019-20', description: 'Syllabus for Second Year', year: '2024-25', fileUrl: 'https://vcet.edu.in/syllabus/ai-ds-se.pdf', fileName: 'ai-ds-se.pdf' },
        { title: 'AI & DS_TE_Revised 2019-20', description: 'Syllabus for Third Year', year: '2024-25', fileUrl: null, fileName: null },
        { title: 'AI & DS_BE_Revised 2019-20', description: 'Syllabus for Final Year', year: '2024-25', fileUrl: null, fileName: null },
      ]
    },
    {
      department: 'Civil Engineering',
      documents: [
        { title: 'CIVIL_BE_2016', description: 'Syllabus for Final Year', year: '2024-25', fileUrl: 'https://vcet.edu.in/syllabus/civil-te.pdf', fileName: 'civil-te.pdf' },
        { title: 'CIVIL_SE_2019C', description: 'Syllabus for Second Year', year: '2024-25', fileUrl: null, fileName: null },
      ]
    }
  ],
  timetable: [
    { title: 'FE Semester I FH2024', description: 'First Year Engineering', year: '2023-24', fileUrl: 'https://vcet.edu.in/exams/fe-sem1-fh2024.pdf', fileName: 'fe-sem1-fh2024.pdf' },
  ],
  questionPapers: [
    { title: 'Computer Engineering - Sem III Dec 2023', description: 'Computer Engineering', year: '2023-24', fileUrl: 'https://vcet.edu.in/exams/comp-sem3-dec2023.pdf', fileName: 'comp-sem3-dec2023.pdf' },
  ],
  samplePapers: [
    { title: 'Sample Paper - Discrete Structures', description: 'Common for all branches', year: '2024-25', fileUrl: 'https://vcet.edu.in/exams/sample-ds.pdf', fileName: 'sample-ds.pdf' },
  ],
  results: [
    {
      title: 'December 2021',
      department: 'Artificial Intelligence and Data Science',
      documents: [
        { title: 'SEM-III_Rev-2019_AIDSC-Scheme', description: 'Standard Semester III', year: '2023-24', fileUrl: 'https://vcet.edu.in/exams/be-sem8-may2024.pdf', fileName: 'be-sem8-may2024.pdf' },
        { title: 'SEM III_Rev 2019_AIDS_DSE(C-Scheme)', description: 'Direct Second Year', year: '2023-24', fileUrl: null, fileName: null },
      ]
    },
    {
      title: 'December 2021',
      department: 'Computer Science and Engineering (Data Science)',
      documents: [
        { title: 'SEM III_Rev 2019_CSEDS(C-Scheme)', description: 'Standard Semester III', year: '2023-24', fileUrl: null, fileName: null },
        { title: 'SEM III DSE_(C-Scheme) _FEB 2022', description: 'Direct Second Year', year: '2023-24', fileUrl: null, fileName: null },
      ]
    }
  ],
  notices: [
    { title: 'KT Form Notice - Sem III to VI May 2024', description: 'Exam Cell Notice', year: '2023-24', fileUrl: 'https://vcet.edu.in/notices/kt-form-may2024.pdf', fileName: 'kt-form-may2024.pdf' },
  ],
  updatedAt: new Date().toISOString(),
};

/* ── Committees Module ─────────────────────────────────────────────────────── */
let MOCK_COMMITTEES: CommitteeData[] = [
  { id: '1', slug: 'cdc', name: 'College Development Committee', description: 'Institutional planning and development governance.', responsibilities: [], members: [] },
  { id: '2', slug: 'iqac', name: 'IQAC', description: 'Quality assurance and academic excellence monitoring.', objectives: [], members: [], reports: [] },
  { id: '3', slug: 'anti-ragging', name: 'Anti-Ragging Committee', description: 'Ensuring a safe and ragging-free campus environment.', objectives: [], members: [] },
  { id: '4', slug: 'grievance', name: 'Grievance Redressal Committee', description: 'Addressing institutional and staff grievances.', objectives: [], members: [] },
  { id: '5', slug: 'sgrc', name: 'Student Grievance Redressal Committee (SGRC)', description: 'Handling student-specific concerns and complaints.', guidelines: [], members: [] },
  { id: '6', slug: 'sc-st', name: 'SC-ST Committee', description: 'Promoting welfare and equal opportunities for SC/ST students.', objectives: [], members: [] },
  { id: '7', slug: 'icc', name: 'Internal Complaint Committee', description: 'Prevention and redressal of sexual harassment.', objectives: [], members: [] },
  { id: '8', slug: 'equal-opportunity', name: 'Equal Opportunity Cell', description: 'Ensuring non-discrimination and inclusivity.', documents: [] },
  { id: '9', slug: 'sedg', name: 'SEDG Cell', description: 'Socio-Economically Disadvantaged Groups welfare.', documents: [] },
];

export const createCommitteeCrud = () => ({
  get: async (slug: string) => {
    const committee = MOCK_COMMITTEES.find(c => c.slug === slug);
    return { data: committee || null, success: true };
  },
  update: async (slug: string, payload: CommitteePayload) => {
    const idx = MOCK_COMMITTEES.findIndex(c => c.slug === slug);
    if (idx !== -1) {
      MOCK_COMMITTEES[idx] = { ...MOCK_COMMITTEES[idx], ...payload };
    }
    return { data: MOCK_COMMITTEES[idx], success: true };
  }
});

export const mockCommittees = createCommitteeCrud();

/* ── Research Module ───────────────────────────────────────────────────────── */
let MOCK_RESEARCH: ResearchData[] = [
  { id: '1', slug: 'research-intro', name: 'Research Introduction', description: 'Institutional R&D Hub and PhD datasets.', hubCards: [], objectives: [], phdPursuing: [], phdHolders: [], dean: { name: '', designation: '', researchInterest: '' }, quickLinks: [] },
  { id: '2', slug: 'funded-research', name: 'Funded Research', description: 'External funding records and reports.', funding: [], fundingReport: { fileUrl: null, fileName: null } },
  { id: '3', slug: 'publications', name: 'Publications', description: 'Books, Journals, and Conference papers.', books: [], journals: [], publicationReport: { fileUrl: null, fileName: null } },
  { id: '4', slug: 'patents', name: 'Patents', description: 'Intellectual property and patent records.', patents: [], patentStats: {} },
  { id: '5', slug: 'consultancy', name: 'Consultancy Projects', description: 'Industry projects and revenue datasets.', consultancyRevenue: [], consultancyReport: { fileUrl: null, fileName: null }, industryPartners: [], consultancyStats: {} },
  { id: '6', slug: 'research-facility', name: 'Research Facility', description: 'Infrastructure and specialized R&D labs.', facilities: [], fallbackFacility: { title: '', description: '', imageUrl: null } },
  { id: '7', slug: 'conventions', name: 'Research Conventions', description: 'PDF-based convention records.', documents: [] },
  { id: '8', slug: 'research-policy', name: 'Research Policy', description: 'Institutional policy documents.', documents: [] },
  { id: '9', slug: 'iic', name: 'IIC', description: 'Innovation cell achievements and reports.', iicAchievements: [], iicGallery: [], iicCommittee: [], iicReports: [] },
  { id: '10', slug: 'nirf', name: 'NIRF', description: 'NIRF ranking documents.', documents: [] },
  { id: '11', slug: 'downloads', name: 'Downloads', description: 'Research-related downloadable forms.', documents: [] },
];

export const createResearchCrud = () => ({
  get: async (slug: string) => {
    const section = MOCK_RESEARCH.find(s => s.slug === slug);
    return { data: section || null, success: true };
  },
  update: async (slug: string, payload: ResearchPayload) => {
    const idx = MOCK_RESEARCH.findIndex(s => s.slug === slug);
    if (idx !== -1) {
      MOCK_RESEARCH[idx] = { ...MOCK_RESEARCH[idx], ...payload };
    }
    return { data: MOCK_RESEARCH[idx], success: true };
  }
});

export const mockResearch = createResearchCrud();

/* ── Legacy Hub Creators ───────────────────────────────────────────────────── */
export const createExamCrud = () => createMockSingleton(MOCK_EXAM, 'vcet_mock_exam');
export const mockExam = createExamCrud();

export const createAdmissionCrud = () => createMockSingleton(MOCK_ADMISSION, 'vcet_mock_admission_v4');
export const mockAdmission = createAdmissionCrud();

export const createAcademicsCrud = () => createMockSingleton(MOCK_ACADEMICS, 'vcet_mock_academics');
export const mockAcademics = createAcademicsCrud();

export const createEnquiriesCrud = (seed: Enquiry[]) => createMockCrud(seed, 'vcet_mock_enquiries');

/* ── Facilities Module ─────────────────────────────────────────────────────── */
let MOCK_FACILITIES: any[] = [
  { id: '1', slug: 'central-computing', name: 'Central Computing', description: 'Institutional computing infrastructure records.', stats: [], staff: [], labs: [] },
  { id: '2', slug: 'counselling-cell', name: 'Counselling Cell', description: 'Student counselling and mentoring records.', general: { title: '', description: '' }, staff: [], mentors: [] },
  { id: '3', slug: 'differently-abled', name: 'Differently Abled Facilities', description: 'Facilities for differently abled individuals.', items: [] },
  { id: '4', slug: 'health-facilities', name: 'Health Facilities', description: 'Campus health and medical facilities.', items: [] },
  { id: '5', slug: 'ladies-common-room', name: 'Ladies Common Room', description: 'Rest and recreation for female students.', general: { title: '', description: '' }, activities: [] },
  { id: '6', slug: 'library', name: 'VCET Library', description: 'Library rules, memberships, and statistics.', librarySections: [], facilitiesList: [], rules: [], memberships: [], tabs: [], contact: { phone: '', email: '', address: '' }, stats: [], staff: [], gallery: [] },
  { id: '7', slug: 'sports-gymkhana', name: 'Sports & Gymkhana', description: 'Sports facilities, records, and rules.', sports: [], achievements: [], results: [], rules: [], gallery: [], tabs: [] },
];

export const createFacilityCrud = () => ({
  get: async (slug: string) => {
    const section = MOCK_FACILITIES.find(s => s.slug === slug);
    return { data: section || null, success: true };
  },
  update: async (slug: string, payload: any) => {
    const idx = MOCK_FACILITIES.findIndex(s => s.slug === slug);
    if (idx !== -1) {
      MOCK_FACILITIES[idx] = { ...MOCK_FACILITIES[idx], ...payload };
    }
    return { data: MOCK_FACILITIES[idx], success: true };
  }
});

export const mockFacilities = createFacilityCrud();

/* ── About Us Module ──────────────────────────────────────────────────────── */
let MOCK_ABOUT: AboutData[] = [
  { id: '1', slug: 'overview', name: 'Institute Overview', description: 'About VCET, accreditation, and quick facts.', paragraphs: ['', '', ''], accreditation: [], facts: [], updatedAt: new Date().toISOString() },
  { id: '2', slug: 'president-desk', name: 'President\'s Desk', description: 'Leadership message from the President.', intro: { name: '', role: '', highlightQuote: '', closingQuote: '', image: null }, messageParagraphs: [], updatedAt: new Date().toISOString() },
  { id: '3', slug: 'principal-desk', name: 'Principal\'s Desk', description: 'Leadership message from the Principal.', intro: { name: '', role: '', highlightQuote: '', closingQuote: '', image: null }, messageParagraphs: [], profileDetails: [], highlightsCards: [], updatedAt: new Date().toISOString() },
  { id: '4', slug: 'governing-council', name: 'Governing Council', description: 'Institutional governance and board members.', chairman: { role: '', name: '', description: '' }, councilMembers: [], updatedAt: new Date().toISOString() },
  { id: '5', slug: 'org-structure', name: 'Organizational Structure', description: 'Institutional hierarchy and reporting lines.', orgIntro: '', orgChartImage: null, orgNodes: [], updatedAt: new Date().toISOString() },
  { id: '6', slug: 'administration', name: 'Administration', description: 'Key administrative officers and contacts.', adminCards: [], updatedAt: new Date().toISOString() },
  { id: '7', slug: 'strategic-plan', name: 'Strategic Plan', description: 'Institutional strategic planning documents.', documents: [], updatedAt: new Date().toISOString() },
  { id: '8', slug: 'code-of-conduct', name: 'Code of Conduct', description: 'Rules and professional ethics for stakeholders.', conductSections: [], updatedAt: new Date().toISOString() },
];

export const createAboutCrud = () => ({
  get: async (slug: string) => {
    const section = MOCK_ABOUT.find(s => s.slug === slug);
    return { data: section || null, success: true };
  },
  update: async (slug: string, payload: AboutPayload) => {
    const idx = MOCK_ABOUT.findIndex(s => s.slug === slug);
    if (idx !== -1) {
      MOCK_ABOUT[idx] = { ...MOCK_ABOUT[idx], ...payload, updatedAt: new Date().toISOString() };
    }
    return { data: MOCK_ABOUT[idx], success: true };
  }
});

export const mockAbout = createAboutCrud();
/* ── Admission Sections (new structured system) ───────────────────────────────── */

export const MOCK_ADMISSION_SECTIONS: AdmissionSection[] = [
  {
    id: 1,
    slug: 'courses-intake',
    navigation_title: 'Courses & Intake',
    title: 'Courses & Intake',
    summary: 'Undergraduate and Postgraduate programs offered',
    description: 'Comprehensive list of all engineering and management programs with seat intake.',
    section_type: 'courses',
    has_dropdown: false,
    dropdown_key: null,
    content: null,
    is_active: true,
    sort_order: 1,
    items: [
      {
        id: 1,
        admission_section_id: 1,
        item_type: 'course',
        title: 'Computer Engineering',
        subtitle: 'B.E. - 4 Years',
        description: 'Bachelor of Engineering in Computer Engineering',
        category: 'Engineering',
        academic_year: '2025-26',
        badge: 'UG',
        tag: 'B.E.',
        group_key: 'ug',
        group_label: 'Undergraduate',
        intake: 180,
        metadata: null,
        external_url: null,
        image_name: null,
        image_mime_type: null,
        image_size: null,
        has_image: false,
        image_url: null,
        admin_image_url: null,
        has_pdf: false,
        pdf_name: null,
        pdf_mime_type: null,
        pdf_size: null,
        pdf_url: null,
        admin_pdf_url: null,
        has_document: false,
        document_url: null,
        is_active: true,
        sort_order: 1,
      },
      {
        id: 2,
        admission_section_id: 1,
        item_type: 'course',
        title: 'Computer Science & Engineering (Data Science)',
        subtitle: 'B.E. - 4 Years',
        description: 'Bachelor of Engineering in CS with specialization in Data Science',
        category: 'Engineering',
        academic_year: '2025-26',
        badge: 'UG',
        tag: 'B.E.',
        group_key: 'ug',
        group_label: 'Undergraduate',
        intake: 180,
        metadata: null,
        external_url: null,
        image_name: null,
        image_mime_type: null,
        image_size: null,
        has_image: false,
        image_url: null,
        admin_image_url: null,
        has_pdf: false,
        pdf_name: null,
        pdf_mime_type: null,
        pdf_size: null,
        pdf_url: null,
        admin_pdf_url: null,
        has_document: false,
        document_url: null,
        is_active: true,
        sort_order: 2,
      },
      {
        id: 3,
        admission_section_id: 1,
        item_type: 'course',
        title: 'Information Technology',
        subtitle: 'B.E. - 4 Years',
        description: 'Bachelor of Engineering in Information Technology',
        category: 'Engineering',
        academic_year: '2025-26',
        badge: 'UG',
        tag: 'B.E.',
        group_key: 'ug',
        group_label: 'Undergraduate',
        intake: 60,
        metadata: null,
        external_url: null,
        image_name: null,
        image_mime_type: null,
        image_size: null,
        has_image: false,
        image_url: null,
        admin_image_url: null,
        has_pdf: false,
        pdf_name: null,
        pdf_mime_type: null,
        pdf_size: null,
        pdf_url: null,
        admin_pdf_url: null,
        has_document: false,
        document_url: null,
        is_active: true,
        sort_order: 3,
      },
      {
        id: 4,
        admission_section_id: 1,
        item_type: 'course',
        title: 'Master of Management Studies',
        subtitle: 'M.M.S. - 2 Years',
        description: 'Postgraduate management degree program',
        category: 'Management',
        academic_year: '2025-26',
        badge: 'PG',
        tag: 'MMS',
        group_key: 'pg',
        group_label: 'Postgraduate',
        intake: 120,
        metadata: null,
        external_url: null,
        image_name: null,
        image_mime_type: null,
        image_size: null,
        has_image: false,
        image_url: null,
        admin_image_url: null,
        has_pdf: false,
        pdf_name: null,
        pdf_mime_type: null,
        pdf_size: null,
        pdf_url: null,
        admin_pdf_url: null,
        has_document: false,
        document_url: null,
        is_active: true,
        sort_order: 4,
      },
    ],
  },
  {
    id: 2,
    slug: 'fees-structure',
    navigation_title: 'Fees Structure',
    title: 'Fees Structure',
    summary: 'Detailed fee structure for all programs',
    description: 'Official fee structure for undergraduate and postgraduate admissions.',
    section_type: 'fees',
    has_dropdown: false,
    dropdown_key: null,
    content: null,
    is_active: true,
    sort_order: 2,
    items: [
      {
        id: 5,
        admission_section_id: 2,
        item_type: 'document',
        title: 'First Year (F.E.) Fee Structure 2025-26',
        subtitle: null,
        description: 'CAP fee structure for First Year Engineering admission',
        category: 'Engineering',
        academic_year: '2025-26',
        badge: 'UG',
        tag: 'F.E.',
        group_key: 'fees',
        group_label: 'Fee Structure',
        intake: null,
        metadata: null,
        external_url: null,
        image_name: null,
        image_mime_type: null,
        image_size: null,
        has_image: false,
        image_url: null,
        admin_image_url: null,
        has_pdf: true,
        pdf_name: 'FE-Fee-2024-25.pdf',
        pdf_mime_type: 'application/pdf',
        pdf_size: 150000,
        pdf_url: 'https://vcet.edu.in/wp-content/uploads/2024/09/FE-Fee-2024-25.pdf',
        admin_pdf_url: 'https://vcet.edu.in/wp-content/uploads/2024/09/FE-Fee-2024-25.pdf',
        has_document: true,
        document_url: 'https://vcet.edu.in/wp-content/uploads/2024/09/FE-Fee-2024-25.pdf',
        is_active: true,
        sort_order: 1,
      },
      {
        id: 6,
        admission_section_id: 2,
        item_type: 'document',
        title: 'Direct Second Year (D.S.E.) Fee Structure 2025-26',
        subtitle: null,
        description: 'Lateral entry fee structure for Direct Second Year admission',
        category: 'Engineering',
        academic_year: '2025-26',
        badge: 'UG',
        tag: 'DSE',
        group_key: 'fees',
        group_label: 'Fee Structure',
        intake: null,
        metadata: null,
        external_url: null,
        image_name: null,
        image_mime_type: null,
        image_size: null,
        has_image: false,
        image_url: null,
        admin_image_url: null,
        has_pdf: true,
        pdf_name: 'DSE-Fee-2024-25.pdf',
        pdf_mime_type: 'application/pdf',
        pdf_size: 120000,
        pdf_url: 'https://vcet.edu.in/wp-content/uploads/2024/09/DSE-Fee-2024-25.pdf',
        admin_pdf_url: 'https://vcet.edu.in/wp-content/uploads/2024/09/DSE-Fee-2024-25.pdf',
        has_document: true,
        document_url: 'https://vcet.edu.in/wp-content/uploads/2024/09/DSE-Fee-2024-25.pdf',
        is_active: true,
        sort_order: 2,
      },
    ],
  },
  {
    id: 3,
    slug: 'documents-required',
    navigation_title: 'Documents Required',
    title: 'Documents Required',
    summary: 'List of documents needed for admission',
    description: 'Essential documents required for the admission process.',
    section_type: 'documents',
    has_dropdown: false,
    dropdown_key: null,
    content: null,
    is_active: true,
    sort_order: 3,
    items: [
      {
        id: 7,
        admission_section_id: 3,
        item_type: 'document',
        title: 'First Year Engineering Documents',
        subtitle: null,
        description: 'List of mandatory documents for CAP round admission',
        category: 'Engineering',
        academic_year: '2025-26',
        badge: 'UG',
        tag: 'F.E.',
        group_key: 'documents',
        group_label: 'Required Documents',
        intake: null,
        metadata: null,
        external_url: 'https://vcet.edu.in/wp-content/uploads/2024/08/Document-Required-2024-25.pdf',
        image_name: null,
        image_mime_type: null,
        image_size: null,
        has_image: false,
        image_url: null,
        admin_image_url: null,
        has_pdf: false,
        pdf_name: null,
        pdf_mime_type: null,
        pdf_size: null,
        pdf_url: null,
        admin_pdf_url: null,
        has_document: true,
        document_url: 'https://vcet.edu.in/wp-content/uploads/2024/08/Document-Required-2024-25.pdf',
        is_active: true,
        sort_order: 1,
      },
    ],
  },
  {
    id: 4,
    slug: 'scholarships',
    navigation_title: 'Scholarships',
    title: 'Scholarships',
    summary: 'Government and institutional scholarship programs',
    description: 'Information about scholarships available for students including government and institutional schemes.',
    section_type: 'scholarships',
    has_dropdown: false,
    dropdown_key: null,
    content: null,
    is_active: true,
    sort_order: 4,
    items: [
      {
        id: 8,
        admission_section_id: 4,
        item_type: 'document',
        title: 'Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna - EBC',
        subtitle: null,
        description: 'Government Scholarship for Economically Backward Class students',
        category: 'Government',
        academic_year: '2025-26',
        badge: 'GOV',
        tag: 'EBC',
        group_key: 'scholarships',
        group_label: 'Scholarships',
        intake: null,
        metadata: null,
        external_url: null,
        image_name: null,
        image_mime_type: null,
        image_size: null,
        has_image: false,
        image_url: null,
        admin_image_url: null,
        has_pdf: true,
        pdf_name: 'EBC-Scholarship.pdf',
        pdf_mime_type: 'application/pdf',
        pdf_size: 120000,
        pdf_url: 'https://vcet.edu.in/ebc-scholarship.pdf',
        admin_pdf_url: 'https://vcet.edu.in/ebc-scholarship.pdf',
        has_document: true,
        document_url: 'https://vcet.edu.in/ebc-scholarship.pdf',
        is_active: true,
        sort_order: 1,
      },
      {
        id: 9,
        admission_section_id: 4,
        item_type: 'document',
        title: 'Post Matric Scholarship to OBC Students - OBC Scholarship',
        subtitle: null,
        description: 'Government Scholarship for Other Backward Class students',
        category: 'Government',
        academic_year: '2025-26',
        badge: 'GOV',
        tag: 'OBC',
        group_key: 'scholarships',
        group_label: 'Scholarships',
        intake: null,
        metadata: null,
        external_url: null,
        image_name: null,
        image_mime_type: null,
        image_size: null,
        has_image: false,
        image_url: null,
        admin_image_url: null,
        has_pdf: true,
        pdf_name: 'OBC-Scholarship.pdf',
        pdf_mime_type: 'application/pdf',
        pdf_size: 135000,
        pdf_url: 'https://vcet.edu.in/obc-scholarship.pdf',
        admin_pdf_url: 'https://vcet.edu.in/obc-scholarship.pdf',
        has_document: true,
        document_url: 'https://vcet.edu.in/obc-scholarship.pdf',
        is_active: true,
        sort_order: 2,
      },
    ],
  },
];
