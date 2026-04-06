import { prefetchPageData } from './api';

/**
 * Routes that can be prefetched on user interaction (hover/intent).
 * NOT prefetched on app mount to prevent API flooding.
 */
const PREFETCHABLE_ROUTES = [
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

const prefetchedRoutes = new Set<string>();

/**
 * DEPRECATED: This function is disabled to prevent API flooding.
 * The old implementation would prefetch 80+ pages on every homepage load.
 * Now data is fetched lazily only when the page is actually visited.
 */
export function warmPublicPageCache(): void {
  // Intentionally disabled - data is now fetched lazily on page visit
  // This prevents 80+ unnecessary API calls on every homepage load/refresh
  if (import.meta.env.DEV) {
    console.log('[PagePrefetch] warmPublicPageCache is disabled - using lazy loading instead');
  }
}

/**
 * Prefetch a single route on user intent (e.g., link hover).
 * Only prefetches if the route hasn't been fetched before.
 */
export function prefetchRouteOnIntent(route: string): void {
  if (typeof window === 'undefined') return;
  if (prefetchedRoutes.has(route)) return;
  
  // Only prefetch known prefetchable routes
  const normalizedRoute = route.startsWith('/') ? route : `/${route}`;
  const apiRoute = normalizedRoute.startsWith('/pages/') 
    ? normalizedRoute 
    : `/pages${normalizedRoute}`;
  
  if (!PREFETCHABLE_ROUTES.includes(apiRoute)) return;
  
  prefetchedRoutes.add(route);
  
  // Use requestIdleCallback for non-blocking prefetch
  const run = () => prefetchPageData([apiRoute]);
  
  if ('requestIdleCallback' in window) {
    (window as Window & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(run);
    return;
  }
  
  globalThis.setTimeout(run, 100);
}

/**
 * Check if a route is prefetchable.
 */
export function isPrefetchableRoute(route: string): boolean {
  const normalizedRoute = route.startsWith('/') ? route : `/${route}`;
  const apiRoute = normalizedRoute.startsWith('/pages/') 
    ? normalizedRoute 
    : `/pages${normalizedRoute}`;
  return PREFETCHABLE_ROUTES.includes(apiRoute);
}
