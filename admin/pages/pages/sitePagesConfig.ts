export interface SitePageTab {
  key: string;
  label: string;
  path: string;
}

export const SITE_PAGE_TABS: SitePageTab[] = [
  { key: 'home', label: 'Home', path: '/admin/pages/home' },
  { key: 'about-us', label: 'About Us', path: '/admin/pages/about-us' },
  { key: 'admission', label: 'Admission', path: '/admin/pages/admission' },
  { key: 'departments', label: 'Departments', path: '/admin/pages/departments' },
  { key: 'academics', label: 'Academics', path: '/admin/pages/academics' },
  { key: 'research', label: 'Research', path: '/admin/pages/research' },
  { key: 'facilities', label: 'Facilities', path: '/admin/pages/facilities' },
  { key: 'mms', label: 'MMS', path: '/admin/pages/mms' },
  { key: 'student-career', label: 'Student & Career', path: '/admin/pages/student-career' },
  { key: 'committees', label: 'Committees', path: '/admin/pages/committees' },
  { key: 'exam', label: 'Exams', path: '/admin/pages/exam' },
  { key: 'naac', label: 'NAAC', path: '/admin/pages/naac' },
  { key: 'training-placement', label: 'Training & Placement', path: '/admin/pages/training-placement' },
];
