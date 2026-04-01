import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, ChevronDown, ChevronRight } from 'lucide-react';
import { academicsService, type AcademicDocument } from '../services/academics';
import { naacScoresService, type DynamicNaacScoreUpload } from '../services/naacScores';

const CAREER_AT_VCET_PDF_URL =
  'https://drive.google.com/file/d/1grwZ4_QIjC23c4HHFCM4xPJuFywsWtgw/view?usp=sharing';
const SSS_GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeR3qTw2AO0xsDYkuzJ8dnrJyi4EGuYJAupBqLqlS2cQPLlYg/viewform';

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   TYPE DEFINITIONS
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
interface SubItem {
  label: string;
  href?: string;
  subItems?: SubItem[];
}

interface DropdownItem {
  label: string;
  href?: string;
  subItems?: SubItem[];
  isGroupLabel?: boolean;
}

interface MenuGroup {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   NAVIGATION DATA
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const menuGroups: MenuGroup[] = [
  // 1. ABOUT US
  {
    label: 'About Us',
    dropdown: [
      { label: 'About VCET', href: '/about-us' },
      { label: "President's Desk", href: '/presidents-desk' },
      { label: "Principal's Desk", href: '/principals-desk' },
      { label: 'Governing Council', href: '/governing-council' },
      { label: 'Organizational Structure', href: '/organizational-structure' },
      { label: 'Administration', href: '/administration' },
      { label: 'Strategic Plan', href: '/strategic-plan' },
      { label: 'Code of Conduct', href: '/code-of-conduct' },
      { label: 'Contact Us', href: '/contact-us' },
    ],
  },

  // 2. ADMISSION
  {
    label: 'Admission',
    dropdown: [
      { label: 'Courses and Intake', href: '/courses-and-intake' },
      { label: 'Fees Structure 25-26', href: '/fees-structure' },
      { label: 'Scholarships', href: '/scholarships' },
      { label: 'Brochure', href: '/brochure' },
      { label: 'Documents Required', href: '/documents-required' },
      {
        label: 'Cut Off 25-26',
        href: '/cut-off',
        subItems: [
          { label: 'F.E. (First Year Engineering) 2025-26', href: 'https://vcet.edu.in/wp-content/uploads/2026/02/F.E-CUT-OFF-25-26-New.pdf' },
          { label: 'M.E. (Masters of Engineering) 2025-26', href: 'https://vcet.edu.in/wp-content/uploads/2026/02/ME-CUT-OFF-25-26-New.pdf' },
          { label: 'DSE (Direct Second Year) 2025-26', href: 'https://vcet.edu.in/wp-content/uploads/2026/02/DSE-CUT-OFF-25-26-New.pdf' },
          { label: 'MMS (Master of Management Studies) 2025-26', href: 'https://vcet.edu.in/wp-content/uploads/2026/02/MMS-CUT-OFF-25-26-New.pdf' },
          { label: 'First Year Engineering 2022-23', href: 'https://vcet.edu.in/wp-content/uploads/2023/05/FIRST-YEAR-ENGINEERING-CUT-OFF-22-23.pdf' },
        ],
      },
    ],
  },

  // 3. DEPARTMENTS
  {
    label: 'Departments',
    dropdown: [
      { label: 'Computer Engineering', href: '/computer-engineering' },
      { label: 'Computer Science & Engineering (Data Science)', href: '/cs-data-science' },
      { label: 'Information Technology', href: '/information-technology' },
      { label: 'Artificial Intelligence & Data Science', href: '/ai-data-science' },
      { label: 'Mechanical Engineering', href: '/mechanical-engineering' },
      { label: 'Electronics & Telecommunication Engineering', href: '/electronics-telecomm' },
      { label: 'Civil Engineering', href: '/civil-engineering' },
      { label: 'First Year Engineering', href: '/first-year-engineering' },
      { label: 'Master of Management Studies (MBA)', href: '/mms' },
    ],
  },

  // MMS (MBA)
  {
    label: 'MMS (MBA)',
    href: '/mms',
  },

  // 4. ACADEMICS
  {
    label: 'Academics',
    dropdown: [
      { label: "Dean Academics Desk", href: '/dean-academics' },
      {
        label: 'Academic Calendar',
        href: '/academic-calendar',
        subItems: [
          { label: 'EVEN SEM 2025-26 SE TE BE (Tentative)', href: 'https://vcet.edu.in/wp-content/uploads/2026/01/Academic_Calendar_Even_2025-26.pdf' },
          { label: 'ODD SEM 2025-26 SE TE BE', href: 'https://vcet.edu.in/wp-content/uploads/2025/08/acad-calen-odd-25-26.pdf' },
          { label: 'EVEN SEM 2024-25', href: 'https://vcet.edu.in/wp-content/uploads/2024/12/Academic_Calender_2024_25_Even_2025-1.pdf' },
          { label: 'ODD SEM 2024-25 FE ME', href: 'https://vcet.edu.in/wp-content/uploads/2024/09/Adobe-Scan-13-Sep-2024.pdf' },
          { label: 'ODD SEM 2024-25 SE TE BE', href: 'https://vcet.edu.in/wp-content/uploads/2024/07/Adobe-Scan-05-Jul-2024-3.pdf' },
          { label: 'EVEN SEM 2023-24 SE TE BE', href: 'https://vcet.edu.in/wp-content/uploads/2024/06/Academic-Calendar_Even-Sem_-2023-2024.pdf' },
          { label: 'EVEN SEM 2022-23 SE TE BE', href: 'https://vcet.edu.in/wp-content/uploads/2023/01/Academic-Calendar-Even-Semester-2022-23-SE-TE-BE.pdf' },
          { label: 'FE & ME EVEN SEM 2022-23', href: 'https://vcet.edu.in/wp-content/uploads/2023/03/FE_SemII_Academic_Calendar2022-23.pdf' },
          { label: 'FE ODD SEM 2022-23', href: 'https://vcet.edu.in/wp-content/uploads/2023/01/Academic-Calendar-Odd-Semester-2022-23-F.E.pdf' },
        ],
      },
      { label: 'Teaching Learning Process', href: '/teaching-learning' },
      { label: 'Swayam - NPTEL', href: 'https://nptel.ac.in/' },
      {
        label: 'Honours / Minor Degree Program',
        subItems: [
          { label: 'Booklet Part 1', href: 'https://vcet.edu.in/wp-content/uploads/2022/08/Honours-Minor-Degree-Program-_Booklet_Part-1-Final.pdf' },
          { label: 'Booklet Part 2', href: 'https://vcet.edu.in/wp-content/uploads/2022/08/Honours-Minor-Degree-Program-Booklet-_Part-2_Detailed-Syllabus-Final.pdf' },
        ],
      },
    ],
  },

  // 5. RESEARCH
  {
    label: 'Research',
    dropdown: [
      { label: 'Introduction', href: '/research' },
      { label: 'Funded Research', href: '/funded-research' },
      { label: 'Publications (Journals / Conf. / Books)', href: '/publications' },
      { label: 'Patents', href: '/patents' },
      { label: 'Consultancy Projects', href: '/consultancy-projects' },
      { label: 'Research Facility', href: '/research-facility' },
      { label: 'Research Conventions', href: 'https://vcet.edu.in/wp-content/uploads/2024/06/RESEARCH-CONVENTION.pdf' },
      { label: 'Research Policy', href: 'https://drive.google.com/file/d/160Om5AFj-iAl3W6KObFGCwWHgs7nAWzh/view' },
      { label: 'IIC', href: '/iic' },
      { label: 'NIRF', href: '/nirf' },
      { label: 'Downloads', href: '/downloads' },
    ],
  },

  // 6. FACILITIES
  {
    label: 'Facilities',
    dropdown: [
      { label: 'Central Computing Facility', href: '/central-computing' },
      { label: 'Library', href: '/library' },
      { label: 'Counseling Cell', href: '/counseling-cell' },
      { label: 'Ladies Common Room', href: '/ladies-common-room' },
      { label: 'Sports & Gymkhana', href: '/sports-gymkhana' },
      { label: 'Health Facilities', href: '/health-facilities' },
      { label: 'Differently-Abled Facilities', href: '/differently-abled' },
    ],
  },


  // 7. STUDENT & CAREER
  {
    label: 'Student & Career',
    dropdown: [
      { label: 'Career @ VCET', href: '/career-at-vcet' },
      {
        label: 'Extra curricular Activities',
        subItems: [
          {
            label: "Student's Council",
            subItems: [
              { label: 'Cultural Committee', href: '/cultural-committee' },
              { label: 'Sports Committee', href: '/sports-committee' },
              { label: 'Literati', href: '/literati' },
              { label: 'NSS', href: '/nss' },
              { label: 'EBSB', href: '/ebsb' },
            ],
          },
        ],
      },
      {
        label: 'Co Curricular',
        subItems: [
          { label: 'IEEE', href: '/ieee' },
          {
            label: 'Students Club',
            href: '/students-club',
            subItems: [
              { label: 'ETHAN', href: 'https://vcet.edu.in/ethanracing24/Team_Ethan_Racing_Website-main/index.html' },
              { label: 'SOLECTHON', href: 'https://vcet.edu.in/VcetSolecthon/' },
              { label: 'CENTURION', href: '/centurion' },
              { label: 'AIRNOVA', href: '/airnova' },
              { label: 'EMECHTO', href: '/emechto' },
            ],
          },
          { label: 'CSI', href: '/csi' },
          { label: 'IETE', href: '/iete' },
          { label: 'ISHRAE', href: '/ishrae' },
          { label: 'VMEA', href: '/vmea' },
          { label: 'Hackathon', href: '/hackathon' },
          { label: 'NSDC', href: 'https://vcet-nsdc.vercel.app/' },
          { label: 'IGBC', href: '/igbc' },
        ],
      },
    ],
  },


  // 8. COMMITTEES
  {
    label: 'Committees',
    dropdown: [
      { label: 'College Development Committee', href: '/college-development-committee' },
      { label: 'IQAC', href: '/iqac' },
      {
        label: 'Statutory Committees',
        subItems: [
          { label: 'Grievance Redressal Committee', href: '/grievance-redressal' },
          { label: 'SGRC Committee', href: '/srgc-committee' },
          { label: 'Anti Ragging Committee', href: '/anti-ragging' },
          { label: 'SC - ST Committee', href: '/sc-st-committee' },
        ],
      },
      { label: 'Internal Complaint Committee', href: '/internal-complaint' },
      { label: 'Equal Opportunity Cell', href: 'https://vcet.edu.in/wp-content/uploads/2025/03/EOC-Committee.pdf' },
      { label: 'Socio-Economically Disadvantaged Groups Cell', href: 'https://vcet.edu.in/wp-content/uploads/2025/03/SEDG.pdf' },
    ],
  },

  // 9. ALUMNI
  {
    label: 'Alumni',
    href: 'https://alumni.vcet.edu.in/',
  },

  // 10. EXAM
  {
    label: 'Exam',
    href: '/exam',
  },

  // 11. NAAC ACCREDITATION
  {
    label: 'NAAC',
    dropdown: [
      { label: 'SSS', href: SSS_GOOGLE_FORM_URL },
      { label: 'SSS Report', href: '/sss-report' },
      { label: 'SSR Cycle 1', href: '/ssr-cycle-1' },
      {
        label: 'SSR Cycle 2',
        subItems: [
          { label: 'Research Convention', href: '/ssr-cycle-2' },
        ],
      },
      { label: 'Best Practices & Institutional Distinctiveness', href: '/best-practices' },
      {
        label: 'NAAC Accreditation Score',
        href: '/naac-score',
        subItems: [
          { label: 'NAAC Score Update (Test)', href: 'https://vcet.edu.in/wp-content/uploads/2025/03/Naac-Certificate.pdf' },
        ],
      },
    ],
  },

  // 12. TRAINING & PLACEMENT
  {
    label: 'Training & Placement',
    dropdown: [
      { label: 'Placement', href: '/placement' },
      { label: 'Training', href: '/training' },
      { label: 'E-CELL', href: '/e-cell' },
      { label: 'IIIC', href: '/iiic' },
    ],
  },
];

function toAcademicsSubItems(items: AcademicDocument[]): SubItem[] {
  return items
    .filter((item) => !!item.fileUrl && !!item.title)
    .map((item) => ({
      label: item.title,
      href: item.fileUrl || undefined,
    }));
}

function withLiveAcademicsDropdown(
  groups: MenuGroup[],
  calendars: AcademicDocument[],
  booklets: AcademicDocument[],
): MenuGroup[] {
  return groups.map((group) => {
    if (group.label !== 'Academics' || !group.dropdown) return group;

    const liveCalendarItems = toAcademicsSubItems(calendars);
    const liveBookletItems = toAcademicsSubItems(booklets);

    return {
      ...group,
      dropdown: group.dropdown.map((item) => {
        if (item.label === 'Academic Calendar') {
          return {
            ...item,
            subItems: liveCalendarItems.length > 0 ? liveCalendarItems : item.subItems,
          };
        }
        if (item.label === 'Honours / Minor Degree Program') {
          return {
            ...item,
            subItems: liveBookletItems.length > 0 ? liveBookletItems : item.subItems,
          };
        }
        return item;
      }),
    };
  });
}

function toNaacScoreSubItems(items: DynamicNaacScoreUpload[]): SubItem[] {
  return items
    .filter((item) => !!item.title && !!item.pdf_url)
    .map((item) => ({
      label: item.title,
      href: item.pdf_url || undefined,
    }));
}

function withLiveNaacScoreDropdown(groups: MenuGroup[], naacScoreDocs: DynamicNaacScoreUpload[]): MenuGroup[] {
  const dynamicItems = toNaacScoreSubItems(naacScoreDocs);
  if (dynamicItems.length === 0) return groups;

  return groups.map((group) => {
    if (group.label !== 'NAAC' || !group.dropdown) return group;

    return {
      ...group,
      dropdown: group.dropdown.map((item) => {
        if (item.label !== 'NAAC Accreditation Score') return item;
        return {
          ...item,
          subItems: dynamicItems,
        };
      }),
    };
  });
}

/* ─────────────────────────────────────────────────────
   SEARCH INDEX — built from navigation + extras
───────────────────────────────────────────────────── */
interface SearchEntry {
  label: string;
  href: string;
  category: string;
  keywords: string[];    // extra terms for matching
  external?: boolean;
}

/** Additional keyword aliases so users find pages with natural queries */
const keywordMap: Record<string, string[]> = {
  '/about-us': ['vcet', 'vidyavardhini', 'history', 'vision', 'mission', 'about college', 'info'],
  '/presidents-desk': ['president message', 'chairman', 'trust'],
  '/principals-desk': ['principal message', 'head', 'director'],
  '/governing-council': ['board', 'management', 'trustees'],
  '/administration': ['admin', 'office', 'staff'],
  '/strategic-plan': ['plan', 'roadmap', 'goals'],
  '/code-of-conduct': ['rules', 'discipline', 'policy', 'conduct'],
  '/courses-and-intake': ['courses', 'intake', 'branches', 'seats', 'ug', 'pg', 'btech', 'mtech', 'engineering'],
  '/fees-structure': ['fees', 'tuition', 'payment', 'cost', 'fee structure'],
  '/scholarships': ['scholarship', 'financial aid', 'freeship', 'merit'],
  '/brochure': ['brochure', 'prospectus', 'download'],
  '/documents-required': ['documents', 'admission documents', 'required docs'],
  '/cut-off': ['cutoff', 'merit list', 'admission cutoff', 'rank'],
  '/computer-engineering': ['comps', 'ce', 'computer', 'comp engg', 'cse'],
  '/cs-data-science': ['csds', 'data science', 'cs ds'],
  '/information-technology': ['it', 'info tech'],
  '/ai-data-science': ['aids', 'artificial intelligence', 'ai', 'ml', 'machine learning'],
  '/mechanical-engineering': ['mech', 'mechanical', 'me'],
  '/electronics-telecomm': ['entc', 'electronics', 'telecomm', 'ece', 'extc'],
  '/civil-engineering': ['civil', 'ce civil', 'construction'],
  '/first-year-engineering': ['fe', 'first year', 'fy'],
  '/dean-academics': ['dean', 'academic dean'],
  '/academic-calendar': ['calendar', 'semester dates', 'schedule'],
  '/teaching-learning': ['teaching', 'pedagogy', 'learning'],
  '/swayam-nptel': ['swayam', 'nptel', 'mooc', 'online courses'],
  '/honours-minor': ['honours', 'minor degree', 'honour'],
  '/research': ['research', 'r&d', 'innovation'],
  '/funded-research': ['funded', 'grants', 'sponsored research'],
  '/publications': ['publications', 'journals', 'papers', 'conferences'],
  '/patents': ['patents', 'ipr', 'intellectual property'],
  '/parents': ['parents'],
  '/consultancy-projects': ['consultancy', 'industry projects'],
  '/research-facility': ['research lab', 'equipment', 'facility'],
  'https://vcet.edu.in/wp-content/uploads/2024/06/RESEARCH-CONVENTION.pdf': ['conventions', 'conferences'],
  'https://drive.google.com/file/d/160Om5AFj-iAl3W6KObFGCwWHgs7nAWzh/view': ['research policy', 'guidelines'],
  '/iic': ['iic', 'institution innovation council'],
  '/nirf': ['nirf', 'ranking', 'national ranking'],
  '/downloads': ['downloads', 'forms', 'documents'],
  '/central-computing': ['computer lab', 'computing', 'it infrastructure', 'lab'],
  '/library': ['library', 'books', 'digital library', 'e-library'],
  '/counseling-cell': ['counseling', 'mental health', 'guidance', 'counselling'],
  '/ladies-common-room': ['lcr', 'ladies room', 'women'],
  '/sports-gymkhana': ['sports', 'gym', 'gymkhana', 'playground', 'athletics'],
  '/health-facilities': ['health', 'medical', 'doctor', 'first aid'],
  '/differently-abled': ['differently abled', 'disability', 'accessible', 'divyang'],
  '/career-at-vcet': ['career', 'jobs', 'recruitment', 'vacancies', 'work at vcet'],
  [CAREER_AT_VCET_PDF_URL]: ['career', 'jobs', 'recruitment', 'vacancies', 'work at vcet'],
  '/cultural-committee': ['cultural', 'fest', 'events', 'annual day'],
  '/sports-committee': ['sports committee', 'games'],
  '/literati': ['literati', 'magazine', 'literary'],
  '/nss': ['nss', 'national service scheme', 'social service'],
  '/ebsb': ['ebsb', 'ek bharat shreshtha bharat'],
  '/ieee': ['ieee', 'technical society'],
  '/students-club': ['clubs', 'student clubs', 'technical clubs'],
  '/csi': ['csi', 'computer society'],
  '/iete': ['iete', 'electronics society'],
  '/ishrae': ['ishrae', 'hvac', 'refrigeration'],
  '/vmea': ['vmea', 'mechanical association'],
  '/hackathon': ['hackathon', 'coding competition', 'smart india'],
  '/nsdc': ['nsdc', 'skill development'],
  '/igbc': ['igbc', 'green building'],
  '/college-development-committee': ['cdc', 'college development'],
  '/iqac': ['iqac', 'quality assurance', 'quality'],
  '/grievance-redressal': ['grievance', 'complaint', 'redressal'],
  '/srgc-committee': ['sgrc', 'student redressal'],
  '/anti-ragging': ['ragging', 'anti ragging', 'safety'],
  '/sc-st-committee': ['sc st', 'reservation', 'caste'],
  '/internal-complaint': ['icc', 'internal complaint', 'harassment'],
  '/equal-opportunity': ['equal opportunity', 'obc', 'minority'],
  '/sedg-cell': ['sedg', 'disadvantaged', 'economically weaker'],
  [SSS_GOOGLE_FORM_URL]: ['sss', 'student satisfaction survey', 'google form'],
  '/sss-report': ['sss report', 'satisfaction report'],
  '/ssr-cycle-1': ['ssr', 'self study report', 'cycle 1', 'naac ssr'],
  '/ssr-cycle-2': ['ssr cycle 2', 'naac cycle 2'],
  '/best-practices': ['best practices', 'institutional distinctiveness'],
  '/naac-score': ['naac score', 'accreditation score', 'naac grade', 'naac rating'],
  '/contact-us': ['contact', 'phone', 'email', 'address', 'location', 'map', 'reach us'],
  '/training': ['training', 'placement training', 'tpo'],
  '/e-cell': ['ecell', 'entrepreneurship', 'startup'],
  '/iiic': ['iiic', 'industry interaction', 'mou'],
  '/exam': ['exam', 'examination', 'results', 'hall ticket', 'exam cell'],
  '/exam-cell': ['exam', 'examination', 'results', 'hall ticket', 'exam cell'],
  '/centurion': ['centurion', 'atv', 'quad bike', 'student club'],
  '/airnova': ['airnova', 'aeronautics', 'aerospace', 'uav', 'student club'],
  '/emechto': ['emechto', 'e-bike', 'electric bike', 'sustainable mobility', 'student club'],
};

/** Homepage section entries */
const homepageSections: SearchEntry[] = [
  { label: 'Exam', href: '/exam', category: 'Academics', keywords: ['exam', 'results'] },
  { label: 'Placements Overview', href: '/#placements', category: 'Homepage', keywords: ['placement graph', 'placement stats', 'highest package'] },
  { label: 'Recruiters', href: '/#recruiters', category: 'Homepage', keywords: ['recruiters', 'companies', 'hiring partners'] },
  { label: 'Gallery', href: '/#gallery', category: 'Homepage', keywords: ['gallery', 'photos', 'campus photos'] },
  { label: 'Testimonials', href: '/#testimonials', category: 'Homepage', keywords: ['testimonials', 'alumni', 'reviews'] },
  { label: 'Facilities', href: '/#facilities', category: 'Homepage', keywords: ['facilities', 'infrastructure', 'amenities'] },
  { label: 'Achievements', href: '/#achievements', category: 'Homepage', keywords: ['achievements', 'awards', 'remarkable'] },
  { label: 'Admissions Enquiry', href: '/#admissions', category: 'Homepage', keywords: ['admission form', 'enquiry', 'apply'] },
];

function buildSearchIndex(groups: MenuGroup[]): SearchEntry[] {
  const entries: SearchEntry[] = [];

  for (const group of groups) {
    // Top-level items with direct href
    if (group.href && !group.dropdown) {
      entries.push({
        label: group.label,
        href: group.href,
        category: group.label,
        keywords: keywordMap[group.href] || [],
        external: group.href.startsWith('http'),
      });
    }
    // Dropdown items
    if (group.dropdown) {
      for (const item of group.dropdown) {
        if (item.isGroupLabel) continue;
        if (item.href) {
          entries.push({
            label: item.label,
            href: item.href,
            category: group.label,
            keywords: keywordMap[item.href] || [],
            external: item.href.startsWith('http'),
          });
        }
        // Sub-items
        if (item.subItems) {
          for (const sub of item.subItems) {
            if (sub.href && !entries.some(e => e.href === sub.href && e.label === sub.label)) {
              entries.push({
                label: sub.label,
                href: sub.href,
                category: group.label,
                keywords: keywordMap[sub.href] || [],
                external: sub.href.startsWith('http'),
              });
            }
            if (sub.subItems) {
              for (const deepSub of sub.subItems) {
                if (deepSub.href && !entries.some(e => e.href === deepSub.href && e.label === deepSub.label)) {
                  entries.push({
                    label: deepSub.label,
                    href: deepSub.href,
                    category: group.label,
                    keywords: keywordMap[deepSub.href] || [],
                    external: deepSub.href.startsWith('http'),
                  });
                }
              }
            }
          }
        }
      }
    }
  }

  // Add homepage sections
  entries.push(...homepageSections);

  return entries;
}

function searchPages(query: string, index: SearchEntry[]): SearchEntry[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const terms = q.split(/\s+/);

  type Scored = { entry: SearchEntry; score: number };
  const scored: Scored[] = [];

  for (const entry of index) {
    const labelLower = entry.label.toLowerCase();
    const catLower = entry.category.toLowerCase();
    const kwJoined = entry.keywords.join(' ').toLowerCase();
    const all = `${labelLower} ${catLower} ${kwJoined}`;

    // Every term must match somewhere
    const allMatch = terms.every(t => all.includes(t));
    if (!allMatch) continue;

    // Scoring: prefer label match > keyword match > category match
    let score = 0;
    if (labelLower === q) score += 100; // exact match
    if (labelLower.startsWith(q)) score += 50;
    for (const t of terms) {
      if (labelLower.includes(t)) score += 20;
      if (kwJoined.includes(t)) score += 10;
      if (catLower.includes(t)) score += 5;
    }
    scored.push({ entry, score });
  }

  // Sort by score descending, then alphabetically
  scored.sort((a, b) => b.score - a.score || a.entry.label.localeCompare(b.entry.label));

  // Deduplicate by href (keep highest scored)
  const seen = new Set<string>();
  const results: SearchEntry[] = [];
  for (const s of scored) {
    if (seen.has(s.entry.href)) continue;
    seen.add(s.entry.href);
    results.push(s.entry);
  }

  return results.slice(0, 15); // limit to 15 results
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   DESKTOP DROPDOWN ITEM
   Supports accordion for sub-items
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const NestedFlyout: React.FC<{ sub: SubItem }> = ({ sub }) => {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openSub = () => { if (timer.current) clearTimeout(timer.current); setOpen(true); };
  const closeSub = () => { timer.current = setTimeout(() => setOpen(false), 200); };
  const keepSub = () => { if (timer.current) clearTimeout(timer.current); };

  const itemHasLink = Boolean(sub.href);
  const linkContent = (
    <div className="flex items-center gap-2.5 whitespace-nowrap">
      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/40 flex-shrink-0" />
      {sub.label}
    </div>
  );

  return (
    <div className="relative group/nested" onMouseEnter={openSub} onMouseLeave={closeSub}>
      <div className="flex items-center justify-between px-4 py-2.5 text-[11.5px] text-slate-600 hover:text-brand-blue hover:bg-brand-blue/5 transition-all duration-150 border-l-2 border-transparent hover:border-brand-gold cursor-pointer select-none">
        {itemHasLink ? (
          sub.href!.startsWith('/') ? (
            <Link to={sub.href!} className="flex-1">{linkContent}</Link>
          ) : (
            <a href={sub.href!} className="flex-1" target="_blank" rel="noopener noreferrer">{linkContent}</a>
          )
        ) : (
          <div className="flex-1">{linkContent}</div>
        )}
        <ChevronRight className={`w-3.5 h-3.5 transition-transform ${open ? 'text-brand-blue translate-x-1' : 'text-brand-gold/50'}`} />
      </div>

      <div
        onMouseEnter={keepSub} onMouseLeave={closeSub}
        className={`absolute top-0 left-full ml-1 z-[410] transition-all duration-250 ${open ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 -translate-x-2 pointer-events-none'}`}
      >
        <div className="bg-white rounded-xl shadow-2xl border border-gray-100 min-w-[200px] py-2 ring-1 ring-black/5">
          {sub.subItems!.map(child => {
            const isInternal = child.href?.startsWith('/');
            const cls = "flex items-center gap-2.5 px-4 py-2.5 text-[11.5px] text-slate-600 hover:text-brand-blue hover:bg-brand-blue/5 transition-all duration-150 border-l-2 border-transparent hover:border-brand-gold group whitespace-nowrap";
            const dot = <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/40 flex-shrink-0 group-hover:bg-brand-blue transition-colors duration-150" />;
            return isInternal ? (
              <Link key={child.label} to={child.href!} className={cls}>{dot}{child.label}</Link>
            ) : (
              <a key={child.label} href={child.href!} className={cls} target="_blank" rel="noopener noreferrer">{dot}{child.label}</a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface DesktopDropdownItemProps {
  item: DropdownItem;
  /** flip sub-panel to left when parent dropdown is near right edge */
  flipSub?: boolean;
}
const DesktopDropdownItem: React.FC<DesktopDropdownItemProps> = ({ item, flipSub }) => {
  const [subOpen, setSubOpen] = useState(false);
  const subTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openSub = () => { if (subTimer.current) clearTimeout(subTimer.current); setSubOpen(true); };
  const closeSub = () => { subTimer.current = setTimeout(() => setSubOpen(false), 200); };
  const keepSub = () => { if (subTimer.current) clearTimeout(subTimer.current); };

  /* ── Section divider label (e.g. "Extra-Curricular") ── */
  if (item.isGroupLabel) {
    return (
      <div className="px-4 pt-3 pb-1.5">
        <span className="text-[8.5px] font-black uppercase tracking-[0.2em] text-brand-gold select-none">
          {item.label}
        </span>
        <div className="mt-1 h-px bg-brand-gold/20" />
      </div>
    );
  }

  /* ── Item with sub-items → hover flyout panel to the right ── */
  if (item.subItems && item.subItems.length > 0) {
    const subSide = flipSub ? 'right-full mr-1' : 'left-full ml-1';
    const isInternal = item.href?.startsWith('/');

    const triggerContent = (
      <>
        <span className="text-[11.5px] font-semibold">{item.label}</span>
        <ChevronRight
          className={`w-3.5 h-3.5 flex-shrink-0 ml-3 transition-all duration-250 ${subOpen ? 'text-brand-blue translate-x-1' : 'text-brand-gold/50'
            }`}
        />
      </>
    );

    const triggerClassName = `flex items-center justify-between px-4 py-2.5 cursor-pointer select-none transition-all duration-150 border-l-2 ${subOpen
      ? 'bg-brand-blue/8 text-brand-blue border-brand-blue'
      : 'text-slate-700 hover:text-brand-blue hover:bg-brand-blue/5 border-transparent hover:border-brand-gold'
      }`;

    return (
      <div
        className="relative"
        onMouseEnter={openSub}
        onMouseLeave={closeSub}
      >
        {/* Trigger row — clickable link to navigate */}
        {isInternal ? (
          <Link to={item.href!} className={triggerClassName}>
            {triggerContent}
          </Link>
        ) : (
          <a href={item.href} target="_blank" rel="noopener noreferrer" className={triggerClassName}>
            {triggerContent}
          </a>
        )}

        {/* Sub-flyout panel */}
        <div
          onMouseEnter={keepSub}
          onMouseLeave={closeSub}
          className={`absolute top-0 ${subSide} z-[400] transition-all duration-250 ease-[cubic-bezier(0.34,1.18,0.64,1)] origin-left ${subOpen
            ? 'opacity-100 translate-x-0 pointer-events-auto'
            : 'opacity-0 -translate-x-2 pointer-events-none'
            }`}
        >
          <div className="bg-white rounded-xl shadow-2xl border border-gray-100 min-w-fit w-full py-2 ring-1 ring-black/5">
            {/* Sub-panel header */}
            <div className="px-4 pb-1.5 pt-1">
              <span className="block text-[8.5px] font-black uppercase tracking-[0.2em] text-brand-blue/50 whitespace-nowrap">
                {item.label}
              </span>
            </div>
            <div className="h-px bg-gray-100 mx-3 mb-1" />
            {item.subItems.map((sub) => {
              if (sub.subItems && sub.subItems.length > 0) {
                return <NestedFlyout key={sub.label} sub={sub} />;
              }
              const isInternal = sub.href?.startsWith('/');
              const cls = "flex items-center gap-2.5 px-4 py-2.5 text-[11.5px] text-slate-600 hover:text-brand-blue hover:bg-brand-blue/5 transition-all duration-150 border-l-2 border-transparent hover:border-brand-gold group whitespace-nowrap";
              const dot = <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/40 flex-shrink-0 group-hover:bg-brand-blue transition-colors duration-150" />;
              return isInternal ? (
                <Link key={sub.label} to={sub.href!} className={cls}>
                  {dot}
                  {sub.label}
                </Link>
              ) : (
                <a key={sub.label} href={sub.href!} target="_blank" rel="noopener noreferrer" className={cls}>
                  {dot}
                  {sub.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  /* ── Plain link ── */
  if (item.href?.startsWith('/')) {
    return (
      <Link
        to={item.href}
        className="block px-4 py-2.5 text-[11.5px] font-semibold text-slate-700 hover:text-brand-blue hover:bg-brand-blue/5 transition-all duration-150 border-l-2 border-transparent hover:border-brand-gold"
      >
        {item.label}
      </Link>
    );
  }
  return (
    <a
      href={item.href}
      target={item.href?.startsWith('http') ? '_blank' : '_self'}
      rel="noopener noreferrer"
      className="block px-4 py-2.5 text-[11.5px] font-semibold text-slate-700 hover:text-brand-blue hover:bg-brand-blue/5 transition-all duration-150 border-l-2 border-transparent hover:border-brand-gold"
    >
      {item.label}
    </a>
  );
};

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   MOBILE ACCORDION ITEM
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const MobileNestedAccordionItem: React.FC<{ sub: SubItem, onClose: () => void }> = ({ sub, onClose }) => {
  const [open, setOpen] = useState(false);
  const hasLink = Boolean(sub.href);

  return (
    <div>
      <div className="flex items-center justify-between py-2">
        {hasLink ? (
          sub.href!.startsWith('/') ? (
            <Link to={sub.href!} onClick={onClose} className="text-[12px] font-medium text-white/70 hover:text-brand-gold transition-colors">
              {sub.label}
            </Link>
          ) : (
            <a href={sub.href!} onClick={onClose} target="_blank" rel="noopener noreferrer" className="text-[12px] font-medium text-white/70 hover:text-brand-gold transition-colors">
              {sub.label}
            </a>
          )
        ) : (
          <span className="text-[12px] font-medium text-white/70">{sub.label}</span>
        )}

        <button onClick={() => setOpen(!open)} className="p-1 text-white/50 hover:text-brand-gold transition-colors">
          <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open ? '1000px' : '0px' }}>
        <div className="pl-3 border-l border-brand-gold/20 ml-1 space-y-0.5 mt-1">
          {sub.subItems!.map(child => {
            const isInternal = child.href?.startsWith('/');
            const cls = "block py-1.5 text-[11px] text-white/40 hover:text-brand-gold transition-colors";
            return isInternal ? (
              <Link key={child.label} to={child.href!} onClick={onClose} className={cls}>{child.label}</Link>
            ) : (
              <a key={child.label} href={child.href!} onClick={onClose} target="_blank" rel="noopener noreferrer" className={cls}>{child.label}</a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface MobileAccordionItemProps {
  item: DropdownItem;
  onClose: () => void;
}
const MobileAccordionItem: React.FC<MobileAccordionItemProps> = ({ item, onClose }) => {
  const [open, setOpen] = useState(false);

  if (item.isGroupLabel) {
    return (
      <div className="px-2 pt-3 pb-1">
        <span className="text-[9px] font-black uppercase tracking-[0.18em] text-brand-gold/70 select-none">
          {item.label}
        </span>
      </div>
    );
  }

  if (item.subItems && item.subItems.length > 0) {
    const hasHref = item.href && item.href.length > 0;
    const title = hasHref ? (
      item.href!.startsWith('/') ? (
        <Link
          to={item.href!}
          onClick={onClose}
          className="text-sm font-medium text-white/90 hover:text-brand-gold"
        >
          {item.label}
        </Link>
      ) : (
        <a
          href={item.href!}
          onClick={onClose}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-white/90 hover:text-brand-gold"
        >
          {item.label}
        </a>
      )
    ) : (
      <span className="text-sm font-medium text-white/90">{item.label}</span>
    );

    return (
      <div>
        <div className="flex items-center justify-between py-2.5">
          {title}
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center justify-center w-8 h-8 text-white/70 hover:text-white transition-colors"
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
        <div
          className="overflow-hidden transition-all duration-300"
          style={{ maxHeight: open ? '1000px' : '0px' }}
        >
          <div className="pl-4 border-l border-brand-gold/30 ml-2 space-y-0.5">
            {item.subItems.map((sub) => {
              if (sub.subItems && sub.subItems.length > 0) {
                return <MobileNestedAccordionItem key={sub.label} sub={sub} onClose={onClose} />;
              }
              const isInternal = sub.href?.startsWith('/');
              return isInternal ? (
                <Link
                  key={sub.label}
                  to={sub.href!}
                  onClick={onClose}
                  className="block py-2 text-[12px] text-white/50 hover:text-brand-gold transition-colors"
                >
                  {sub.label}
                </Link>
              ) : (
                <a
                  key={sub.label}
                  href={sub.href!}
                  onClick={onClose}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-2 text-[12px] text-white/50 hover:text-brand-gold transition-colors"
                >
                  {sub.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (item.href?.startsWith('/')) {
    return (
      <Link
        to={item.href}
        onClick={onClose}
        className="block py-2.5 text-sm text-white/70 hover:text-brand-gold transition-colors"
      >
        {item.label}
      </Link>
    );
  }
  return (
    <a
      href={item.href}
      onClick={onClose}
      target={item.href?.startsWith('http') ? '_blank' : '_self'}
      rel="noopener noreferrer"
      className="block py-2.5 text-sm text-white/70 hover:text-brand-gold transition-colors"
    >
      {item.label}
    </a>
  );
};

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   MAIN HEADER COMPONENT
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const Header: React.FC = () => {
  const navigate = useNavigate();
  const [liveCalendars, setLiveCalendars] = useState<AcademicDocument[]>([]);
  const [liveBooklets, setLiveBooklets] = useState<AcademicDocument[]>([]);
  const [liveNaacScoreDocs, setLiveNaacScoreDocs] = useState<DynamicNaacScoreUpload[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [selectedResult, setSelectedResult] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number; right: number; alignRight: boolean }>({ top: 0, left: 0, right: 0, alignRight: false });

  useEffect(() => {
    academicsService
      .get()
      .then((data) => {
        setLiveCalendars(Array.isArray(data.academicCalendars) ? data.academicCalendars : []);
        setLiveBooklets(Array.isArray(data.programBooklets) ? data.programBooklets : []);
      })
      .catch(() => {
        setLiveCalendars([]);
        setLiveBooklets([]);
      });
  }, []);

  useEffect(() => {
    naacScoresService
      .list()
      .then((items) => setLiveNaacScoreDocs(Array.isArray(items) ? items : []))
      .catch(() => setLiveNaacScoreDocs([]));
  }, []);

  const navMenuGroups = useMemo(
    () => withLiveNaacScoreDropdown(
      withLiveAcademicsDropdown(menuGroups, liveCalendars, liveBooklets),
      liveNaacScoreDocs,
    ),
    [liveCalendars, liveBooklets, liveNaacScoreDocs],
  );

  const searchIndex = useMemo(() => buildSearchIndex(navMenuGroups), [navMenuGroups]);

  /* Compute search results reactively */
  const searchResults = useMemo(() => searchPages(searchQuery, searchIndex), [searchQuery, searchIndex]);

  /* Reset selection when results change */
  useEffect(() => { setSelectedResult(-1); }, [searchResults]);

  /* Navigate to a search result */
  const goToResult = useCallback((entry: SearchEntry) => {
    setSearchOpen(false);
    setSearchQuery('');
    setSelectedResult(-1);

    if (entry.external) {
      window.open(entry.href, '_blank', 'noopener,noreferrer');
      return;
    }

    // Handle homepage hash links like /#placements
    if (entry.href.startsWith('/#')) {
      const hash = entry.href.slice(1); // e.g. "#placements"
      if (window.location.pathname === '/') {
        // Already on homepage — just scroll
        const el = document.querySelector(hash);
        if (el) { el.scrollIntoView({ behavior: 'smooth' }); return; }
      }
      navigate('/');
      // Wait for homepage to render, then scroll
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 600);
      return;
    }

    // Handle anchor-only links like #placements (no slash prefix)
    if (entry.href.startsWith('#')) {
      if (window.location.pathname === '/') {
        const el = document.querySelector(entry.href);
        if (el) { el.scrollIntoView({ behavior: 'smooth' }); return; }
      }
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector(entry.href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 600);
      return;
    }

    // Normal internal route
    navigate(entry.href);
  }, [navigate]);

  /* body scroll lock */
  useEffect(() => {
    document.body.style.overflow = mobileOpen || searchOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen, searchOpen]);

  /* focus search on open */
  useEffect(() => {
    if (searchOpen) setTimeout(() => searchInputRef.current?.focus(), 150);
    if (!searchOpen) setSearchQuery('');
  }, [searchOpen]);

  /* ESC key closes search, arrow keys navigate results, Enter selects */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setSearchOpen(false); return; }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedResult(prev =>
          prev < searchResults.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedResult(prev =>
          prev > 0 ? prev - 1 : searchResults.length - 1
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (selectedResult >= 0 && selectedResult < searchResults.length) {
          goToResult(searchResults[selectedResult]);
        } else if (searchResults.length > 0) {
          goToResult(searchResults[0]); // Enter with no selection → go to first result
        }
      }
    };
    if (searchOpen) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [searchOpen, searchResults, selectedResult, goToResult]);

  const openMenu = useCallback((label: string, el?: HTMLElement) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(label);
    if (el) {
      const rect = el.getBoundingClientRect();
      const idx = navMenuGroups.findIndex(g => g.label === label);
      const alignRight = idx >= navMenuGroups.length - 5;
      setDropdownPos({ top: rect.bottom, left: rect.left, right: window.innerWidth - rect.right, alignRight });
    }
  }, [navMenuGroups]);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 220);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  /* Last 5 items right-align their dropdown so it stays inside viewport */
  const getDropdownAlign = (idx: number) =>
    idx >= navMenuGroups.length - 5 ? 'right-0' : 'left-0';

  /* Sub-flyout flips left when the parent dropdown is near the right edge */
  const shouldFlipSub = (idx: number) =>
    idx >= navMenuGroups.length - 5;

  /* Estimate max-height for smooth dropdown animation */
  const getDropdownMaxH = (items: DropdownItem[]) => {
    const h = items.reduce((acc, it) => {
      if (it.isGroupLabel) return acc + 34;
      if (it.subItems) return acc + 44;
      return acc + 40;
    }, 16);
    return Math.min(h, 520);
  };

  return (
    <>
      {/* â”€â”€â”€â”€â”€â”€â”€â”€ STICKY HEADER â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <header className="sticky top-0 w-full z-50 bg-white shadow-[0_2px_16px_rgba(0,0,0,0.08)] border-b border-gray-100">
        <div className="max-w-full mx-auto px-1 sm:px-2 h-14 md:h-16 flex items-center gap-1">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 mr-0.5">
            <img
              src="/Images/VCET logo.jpeg"
              alt="VCET Logo"
              className="h-12 md:h-14 w-auto rounded-sm"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </Link>

          {/* â”€â”€â”€â”€ Desktop Nav â”€â”€â”€â”€ */}
          <nav className="hidden lg:flex items-center flex-1 min-w-0 overflow-x-auto no-scrollbar" aria-label="Main navigation">
            <ul className="flex items-center gap-0.5 lg:gap-1 xl:gap-1.5">
              {navMenuGroups.map((group, idx) => (
                <li key={group.label} className="relative flex-shrink-0">
                  {group.dropdown ? (
                    <button
                      onMouseEnter={(e) => openMenu(group.label, e.currentTarget)}
                      onMouseLeave={scheduleClose}
                      onFocus={(e) => openMenu(group.label, e.currentTarget)}
                      onBlur={scheduleClose}
                      aria-haspopup="true"
                      aria-expanded={activeMenu === group.label}
                      className={`flex items-center gap-0.5 px-1 lg:px-2 xl:px-2.5 py-1.5 lg:py-2 text-[8.5px] md:text-[9px] lg:text-[10px] xl:text-[11px] 2xl:text-[12px] font-bold uppercase tracking-wide rounded-md transition-all duration-200 whitespace-nowrap select-none ${activeMenu === group.label
                        ? 'bg-brand-blue text-white'
                        : 'text-slate-700 hover:bg-brand-blue/8 hover:text-brand-blue'
                        }`}
                    >
                      {group.label}
                    </button>

                  ) : group.href?.startsWith('/') ? (
                    <Link
                      to={group.href}
                      className="block px-1 lg:px-2 xl:px-2.5 py-1.5 lg:py-2 text-[8.5px] md:text-[9px] lg:text-[10px] xl:text-[11px] 2xl:text-[12px] font-bold uppercase tracking-wide rounded-md transition-all duration-200 whitespace-nowrap text-slate-700 hover:bg-brand-blue/8 hover:text-brand-blue"
                    >
                      {group.label}
                    </Link>
                  ) : (
                    <a
                      href={group.href}
                      target={group.href?.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="block px-1 lg:px-2 xl:px-2.5 py-1.5 lg:py-2 text-[8.5px] md:text-[9px] lg:text-[10px] xl:text-[11px] 2xl:text-[12px] font-bold uppercase tracking-wide rounded-md transition-all duration-200 whitespace-nowrap text-slate-700 hover:bg-brand-blue/8 hover:text-brand-blue"
                    >
                      {group.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Right actions â€” search */}
          <div className="hidden lg:flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg bg-brand-gold text-blue hover:bg-brand-gold-light transition-all duration-200"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile controls */}
          <div className="lg:hidden flex items-center gap-1 ml-auto text-slate-700">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg bg-brand-gold text-blue hover:bg-brand-gold-light transition-all"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              className="p-2 rounded-lg hover:bg-brand-blue/8 hover:text-brand-blue transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fixed dropdown overlay — rendered outside nav so overflow:hidden doesn't clip it */}
      {activeMenu && (() => {
        const group = navMenuGroups.find(g => g.label === activeMenu);
        if (!group?.dropdown) return null;
        const idx = navMenuGroups.findIndex(g => g.label === activeMenu);
        return (
          <div
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            style={{
              position: 'fixed',
              top: dropdownPos.top + 4,
              ...(dropdownPos.alignRight ? { right: dropdownPos.right } : { left: dropdownPos.left }),
              zIndex: 9999,
            }}
          >
            <div
              className="bg-white rounded-xl shadow-2xl border border-gray-100/90 min-w-[230px] max-w-[295px] overflow-visible py-2 ring-1 ring-black/5"
            >
              {group.dropdown.map((item) => (
                <DesktopDropdownItem key={item.label} item={item} flipSub={shouldFlipSub(idx)} />
              ))}
            </div>
          </div>
        );
      })()}

      {/* â”€â”€â”€â”€â”€â”€â”€â”€ MOBILE FULL-SCREEN MENU â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div
        className={`fixed inset-0 bg-brand-dark/98 backdrop-blur-lg text-white z-[9999] flex flex-col transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] lg:hidden ${mobileOpen
          ? 'opacity-100 visible translate-x-0'
          : 'opacity-0 invisible translate-x-full pointer-events-none'
          }`}
      >
        {/* Mobile top bar */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-white/10 flex-shrink-0">
          <span className="text-base font-bold tracking-tight">VCET Menu</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 hover:text-brand-gold transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable list */}
        <nav className="flex-1 overflow-y-auto px-5 py-5" aria-label="Mobile navigation">
          <div className="space-y-0.5">
            {navMenuGroups.map((group) => (
              <div key={group.label}>
                {group.dropdown ? (
                  <>
                    <button
                      onClick={() =>
                        setMobileExpanded(mobileExpanded === group.label ? null : group.label)
                      }
                      className="w-full flex items-center justify-between py-3.5 text-[15px] font-semibold border-b border-white/8 hover:text-brand-gold transition-colors duration-200"
                    >
                      <span>{group.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 flex-shrink-0 transition-transform duration-350 ${mobileExpanded === group.label ? 'rotate-180 text-brand-gold' : 'opacity-50'
                          }`}
                      />
                    </button>
                    {mobileExpanded === group.label ? (
                      <div className="pl-3 pr-1 pt-1 pb-3 rounded-b-lg space-y-0.5 mb-1 bg-white/3">
                        {group.dropdown.map((item) => (
                          <MobileAccordionItem
                            key={item.label}
                            item={item}
                            onClose={() => setMobileOpen(false)}
                          />
                        ))}
                      </div>
                    ) : null}
                  </>
                ) : group.href?.startsWith('/') ? (
                  <Link
                    to={group.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3.5 text-[15px] font-semibold border-b border-white/8 hover:text-brand-gold transition-colors duration-200"
                  >
                    {group.label}
                  </Link>
                ) : (
                  <a
                    href={group.href}
                    onClick={() => setMobileOpen(false)}
                    target={group.href?.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="block py-3.5 text-[15px] font-semibold border-b border-white/8 hover:text-brand-gold transition-colors duration-200"
                  >
                    {group.label}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Mobile footer actions */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="mt-6 text-sm text-white/40 space-y-1">
              <p>vcet_inbox@vcet.edu.in</p>
              <p>+91 0250-2338234</p>
            </div>
          </div>
        </nav>
      </div>

      {/* â”€â”€â”€â”€â”€â”€â”€â”€ SEARCH OVERLAY â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div
        className={`fixed inset-0 z-[100] bg-brand-dark/97 backdrop-blur-xl transition-all duration-500 ${searchOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
      >
        <button
          onClick={() => setSearchOpen(false)}
          className="absolute top-6 right-6 p-3 text-white/40 hover:text-white rounded-full hover:bg-white/10 transition-all duration-300"
          aria-label="Close Search"
        >
          <X className="w-8 h-8" />
        </button>

        <div className="container mx-auto px-6 h-full flex flex-col justify-start items-center pt-[12vh] sm:pt-[15vh]">
          <div className="w-full max-w-3xl">
            <label
              htmlFor="site-search"
              className="block text-brand-gold text-xs font-bold uppercase tracking-[0.2em] mb-6"
            >
              What are you looking for?
            </label>
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                id="site-search"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b-2 border-white/20 text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white py-3 md:py-4 pr-16 md:pr-20 focus:outline-none focus:border-brand-gold transition-colors placeholder:text-white/10"
                placeholder="Search..."
                autoComplete="off"
              />
              {searchQuery ? (
                <button
                  onClick={() => { setSearchQuery(''); searchInputRef.current?.focus(); }}
                  className="absolute right-10 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
                  aria-label="Clear search"
                >
                  <X className="w-5 h-5 text-white/70" />
                </button>
              ) : null}
              <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-7 h-7 text-white/20" />
            </div>

            {/* Cancel / close row */}
            <div className="flex items-center justify-between mt-5">
              <p className="text-white/20 text-xs tracking-widest">
                {searchQuery.trim() ? (
                  <>
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/40 font-mono text-[10px]">↑↓</kbd>{' '}navigate{' '}
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/40 font-mono text-[10px]">Enter</kbd>{' '}select{' '}
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/40 font-mono text-[10px]">ESC</kbd>{' '}close
                  </>
                ) : (
                  <>Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/40 font-mono text-[10px]">ESC</kbd> to close</>
                )}
              </p>
              <button
                onClick={() => setSearchOpen(false)}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/15 text-white/45 text-xs font-semibold uppercase tracking-widest hover:border-white/40 hover:text-white transition-all duration-200"
              >
                <X className="w-3.5 h-3.5" /> Cancel
              </button>
            </div>

            {/* ── Search Results ── */}
            {searchQuery.trim() && (
              <div ref={resultsRef} className="mt-8 max-h-[45vh] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
                {searchResults.length > 0 ? (
                  <>
                    <p className="text-white/30 text-xs font-semibold uppercase tracking-widest mb-3">
                      {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                    </p>
                    <div className="space-y-1">
                      {searchResults.map((entry, i) => {
                        const isSelected = i === selectedResult;
                        return (
                          <button
                            key={`${entry.href}-${entry.label}`}
                            onClick={() => goToResult(entry)}
                            onMouseEnter={() => setSelectedResult(i)}
                            className={`w-full text-left flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${isSelected
                              ? 'bg-brand-gold/15 border border-brand-gold/30'
                              : 'bg-white/[0.03] border border-transparent hover:bg-white/[0.06]'
                              }`}
                          >
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 ${isSelected ? 'bg-brand-gold/20' : 'bg-white/5 group-hover:bg-white/10'
                              }`}>
                              <Search className={`w-4 h-4 ${isSelected ? 'text-brand-gold' : 'text-white/30'}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-semibold truncate ${isSelected ? 'text-brand-gold' : 'text-white/80 group-hover:text-white'}`}>
                                {entry.label}
                              </p>
                              <p className="text-[11px] text-white/30 truncate mt-0.5">
                                {entry.category}{entry.external ? ' · Opens in new tab' : ''}
                              </p>
                            </div>
                            <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-all duration-200 ${isSelected ? 'text-brand-gold translate-x-0.5' : 'text-white/10 group-hover:text-white/30'
                              }`} />
                          </button>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-10">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                      <Search className="w-6 h-6 text-white/20" />
                    </div>
                    <p className="text-white/40 text-sm font-medium">No results found for "{searchQuery}"</p>
                    <p className="text-white/20 text-xs mt-2">Try different keywords or browse from the menu</p>
                  </div>
                )}
              </div>
            )}

            {/* ── Popular Tags (shown only when no query) ── */}
            {!searchQuery.trim() && (
              <div className="mt-10">
                <p className="text-white/30 text-xs font-semibold uppercase tracking-widest mb-4">
                  Popular
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Computer Engineering', href: '/computer-engineering' },
                    { label: 'Admissions', href: '/#admissions' },
                    { label: 'Placements', href: '/#placements' },
                    { label: 'Exam Cell', href: '/exam-cell' },
                    { label: 'Fees Structure', href: '/fees-structure' },
                    { label: 'Contact Us', href: '/contact-us' },
                    { label: 'Cut Off', href: '/cut-off' },
                    { label: 'Library', href: '/library' },
                  ].map((tag) => (
                    <button
                      key={tag.label}
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery('');
                        if (tag.href.startsWith('/#')) {
                          const hash = tag.href.slice(1);
                          if (window.location.pathname === '/') {
                            const el = document.querySelector(hash);
                            if (el) { el.scrollIntoView({ behavior: 'smooth' }); return; }
                          }
                          navigate('/');
                          setTimeout(() => {
                            const el = document.querySelector(hash);
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }, 600);
                        } else {
                          navigate(tag.href);
                        }
                      }}
                      className="px-4 py-2 rounded-full border border-white/10 text-white/50 text-sm hover:bg-white hover:text-brand-dark hover:border-white transition-all duration-300"
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

