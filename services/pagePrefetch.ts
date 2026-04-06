import { prefetchPageData } from './api';

const PREFETCH_ENDPOINTS = [
  // About
  '/pages/about/overview',
  '/pages/about/administration',
  '/pages/about/code-of-conduct',
  '/pages/about/governing-council',
  '/pages/about/org-structure',
  '/pages/about/president-desk',
  '/pages/about/principal-desk',

  // Academics
  '/pages/academics',

  // Research
  '/pages/research/research-intro',
  '/pages/research/funded-research',
  '/pages/research/publications',
  '/pages/research/patents',
  '/pages/research/consultancy',
  '/pages/research/research-facility',
  '/pages/research/iic',
  '/pages/research/nirf',
  '/pages/research/downloads',

  // Facilities
  '/pages/facilities/central-computing',
  '/pages/facilities/library',
  '/pages/facilities/counselling-cell',
  '/pages/facilities/ladies-common-room',
  '/pages/facilities/sports-gymkhana',
  '/pages/facilities/health-facilities',
  '/pages/facilities/differently-abled',

  // Student Life / Career
  '/pages/student-career/airnova',
  '/pages/student-career/career-at-vcet',
  '/pages/student-career/centurion',
  '/pages/student-career/cultural-committee',
  '/pages/student-career/ebsb',
  '/pages/student-career/e-cell',
  '/pages/student-career/emechto',
  '/pages/student-career/iiic',
  '/pages/student-career/literati',
  '/pages/student-career/nss',
  '/pages/student-career/sports-committee',
  '/pages/student-career/training',
  '/pages/student-career/placement',

  // Committees
  '/pages/committees/anti-ragging',
  '/pages/committees/cdc',
  '/pages/committees/equal-opportunity',
  '/pages/committees/grievance',
  '/pages/committees/icc',
  '/pages/committees/iqac',
  '/pages/committees/sc-st',
  '/pages/committees/sedg',
  '/pages/committees/sgrc',

  // MMS pages
  '/pages/mms-about',
  '/pages/mms-principals-desk',
  '/pages/mms-hods-desk',
  '/pages/mms-faculty',
  '/pages/mms-vision-mission',
  '/pages/mms-dab',
  '/pages/mms-program-outcomes',
  '/pages/mms-admission',
  '/pages/mms-scholarship',
  '/pages/mms-documents',
  '/pages/mms-fees',
  '/pages/mms-experiential-learning',
  '/pages/mms-training-placement',
  '/pages/mms-placement',
  '/pages/mms-students-life',
  '/pages/mms-facilities',
  '/pages/mms-faqs',
];

let warmed = false;
const PREFETCH_ENABLED =
  (import.meta.env.VITE_ENABLE_PAGE_PREFETCH as string | undefined) === 'true';

export function warmPublicPageCache(): void {
  if (!PREFETCH_ENABLED || warmed || typeof window === 'undefined') return;
  warmed = true;

  const run = () => prefetchPageData(PREFETCH_ENDPOINTS);

  // Warm cache after initial render so route navigation feels instant afterward.
  if ('requestIdleCallback' in window) {
    (window as Window & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(run);
    return;
  }

  globalThis.setTimeout(run, 300);
}
