export type MmsFieldType = 'text' | 'image' | 'pdf-doc' | 'notice' | 'latest-notification' | 'admission-form';
import { MMS_HERO_IMAGES, MMS_IMAGES } from '../../services/mms/imagePool';

export interface MmsContentSection<TItem = Record<string, string>> {
  id: string;
  title: string;
  subtitle?: string;
  fieldType: MmsFieldType;
  items: TItem[];
}

export interface MmsHeroSlide {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
}

export interface MmsNoticeItem {
  id: string;
  label: string;
  content: string;
}

export interface MmsNotificationItem {
  id: string;
  title: string;
  link?: string;
}

export interface MmsTestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
}

export const mmsHomeContent = {
  heroSlides: [
    {
      id: 'hero-1',
      title: 'Master of Management Studies (MBA)',
      subtitle:
        'Approved by AICTE, DTE Maharashtra and affiliated to University of Mumbai. NAAC Accredited.',
      imageUrl: MMS_HERO_IMAGES[0],
    },
    {
      id: 'hero-2',
      title: 'Master of Management Studies (MBA)',
      subtitle:
        'Industry-ready management education with experiential and practical learning focus.',
      imageUrl: MMS_HERO_IMAGES[1],
    },
    {
      id: 'hero-3',
      title: 'Master of Management Studies (MBA)',
      subtitle: 'Leadership, analytics, communication, and career readiness in one ecosystem.',
      imageUrl: MMS_HERO_IMAGES[2],
    },
    {
      id: 'hero-4',
      title: 'Master of Management Studies (MBA)',
      subtitle: 'Strong mentoring and placement support with real business exposure.',
      imageUrl: MMS_HERO_IMAGES[3],
    },
    {
      id: 'hero-5',
      title: 'Master of Management Studies (MBA)',
      subtitle: 'A premium academic environment in the heart of Vasai.',
      imageUrl: MMS_HERO_IMAGES[4],
    },
    {
      id: 'hero-6',
      title: 'Master of Management Studies (MBA)',
      subtitle: 'Future-ready curriculum aligned with industry expectations.',
      imageUrl: MMS_HERO_IMAGES[5],
    },
    {
      id: 'hero-7',
      title: 'Master of Management Studies (MBA)',
      subtitle: 'Workshops, seminars, and practical sessions throughout the program.',
      imageUrl: MMS_HERO_IMAGES[6],
    },
  ] as MmsHeroSlide[],

  notices: {
    id: 'mms-notices',
    title: 'Notices',
    fieldType: 'notice',
    items: [
      { id: 'n1', label: 'Admissions', content: 'Admissions open for MMS 2026-27 batch.' },
      { id: 'n2', label: 'Internship', content: 'Summer internship orientation schedule will be published soon.' },
      { id: 'n3', label: 'Academic', content: 'Department activity calendar update in progress.' },
    ],
  } as MmsContentSection<MmsNoticeItem>,

  latestNotifications: {
    id: 'mms-latest-notifications',
    title: 'Latest Notifications',
    fieldType: 'latest-notification',
    items: [
      { id: 'ln1', title: 'MMS Orientation Program details will be updated here.' },
      { id: 'ln2', title: 'Workshop and seminar announcements will appear in this list.' },
      { id: 'ln3', title: 'Placement drive notifications will be managed from admin tabs.' },
    ],
  } as MmsContentSection<MmsNotificationItem>,

  sections: [
    {
      id: 'admission',
      title: 'Admission',
      subtitle: 'Simple text + image fields for admin management',
      fieldType: 'admission-form',
      items: [
        {
          heading: 'Admissions Open For MMS',
          body:
            'Start your management journey with VCET MMS and build future-ready skills through practical, industry-linked learning.',
          ctaText: 'Apply Now',
          ctaPath: '/mms/admission',
          imageUrl: MMS_IMAGES.banner,
        },
      ],
    },
    {
      id: 'first-year-syllabus',
      title: 'First Year Syllabus',
      subtitle: 'Official University of Mumbai curriculum',
      fieldType: 'pdf-doc',
      items: [
        { id: 'fy-pdf', label: 'First Year Syllabus', url: 'https://vcet.edu.in/mms/FY.pdf' }
      ],
    },
    {
      id: 'second-year-syllabus',
      title: 'Second Year Syllabus',
      subtitle: 'Official University of Mumbai curriculum',
      fieldType: 'pdf-doc',
      items: [
        { id: 'sy-pdf', label: 'Second Year Syllabus', url: 'https://vcet.edu.in/mms/SY_syllabus.pdf' }
      ],
    },
    {
      id: 'internships',
      title: "Summer Internship's",
      subtitle: 'Image tab data',
      fieldType: 'image',
      items: [
        { id: 'i1', imageUrl: '', alt: 'Internship Logo 1' },
        { id: 'i2', imageUrl: '', alt: 'Internship Logo 2' },
        { id: 'i3', imageUrl: '', alt: 'Internship Logo 3' },
      ],
    },
    {
      id: 'events',
      title: 'Our Events',
      subtitle: 'Image + text cards',
      fieldType: 'image',
      items: [
        { id: 'e1', imageUrl: MMS_IMAGES.event, title: 'MMS Event Showcase 1' },
        { id: 'e2', imageUrl: '', title: 'MMS Event Showcase 2' },
        { id: 'e3', imageUrl: '', title: 'MMS Event Showcase 3' },
      ],
    },
    {
      id: 'testimonials',
      title: 'Testimonials',
      subtitle: 'Text cards from admin text box fields',
      fieldType: 'text',
      items: [
        {
          id: 't1',
          name: 'Vinay Mayekar',
          role: 'Student',
          quote:
            'My journey at VCET MMS in Human Resources has been profoundly enriching. The curriculum, industry visits, and internship experience at Indian Oil built a strong foundation in strategic management and organizational behavior.',
        },
        {
          id: 't2',
          name: 'Mansi Sankhe',
          role: 'Student',
          quote:
            "Pursuing MMS in Marketing at VCET was truly enriching. Presentations, product campaigns, and financial literacy programs strengthened my professional growth, while internship exposure in IOCL's Marketing Division gave practical industry clarity.",
        },
        {
          id: 't3',
          name: 'Janavi Rao',
          role: 'Entrepreneur',
          quote:
            "The MMS department's support, strong faculty mentoring, and proactive placement guidance shaped my academic and professional journey. VCET's seminars, workshops, and practical ecosystem prepared me with confidence for my career.",
        },
      ],
    },
    {
      id: 'experiential-videos',
      title: 'Experiential Learning Videos',
      subtitle: 'Video poster holders until video links are managed in admin',
      fieldType: 'image',
      items: [
        { id: 'v1', title: 'Role Play Session', poster: '' },
        { id: 'v2', title: 'Industry Interaction', poster: '' },
        { id: 'v3', title: 'Financial Literacy Program', poster: '' },
      ],
    },
    {
      id: 'pdf-docs',
      title: 'PDF / Documents',
      subtitle: 'Document links for syllabus and circulars',
      fieldType: 'pdf-doc',
      items: [
        { id: 'd0', label: 'First Year Syllabus', description: 'Download the official First Year MMS syllabus (University of Mumbai curriculum).', url: 'https://vcet.edu.in/mms/FY.pdf' },
        { id: 'd1', label: 'Second Year Syllabus', description: 'Download the official First Year MMS syllabus (University of Mumbai curriculum).', url: 'https://vcet.edu.in/mms/SY_syllabus.pdf' },
      ],
    },
  ] as MmsContentSection[],
};
