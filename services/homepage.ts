import type { PlacementStat } from '../admin/api/placementStats';
import type { Event, Gallery, NewsTicker, Placement } from '../admin/types';
import { get, resolveApiUrl } from './api';
import type { AcademicsData, AcademicDocument, DeanData, ObeData } from './academics';
import type { DynamicNaacScoreUpload } from './naacScores';
import type { HeroSlideRecord } from './heroSlides';
import type { HomepageBannerRecord } from './homepageBanners';
import type { NoticeRecord } from './notices';
import type { TestimonialDTO } from './testimonials';
import { resolveUploadedAssetUrl } from '../utils/uploadedAssets';

export interface ExploreUsItemRecord {
  id: number;
  identifier: string | null;
  title: string;
  icon: string | null;
  url: string | null;
  is_active: boolean;
}

export interface HomepageData {
  newsTicker: NewsTicker[];
  notices: NoticeRecord[];
  events: Event[];
  heroSlides: HeroSlideRecord[];
  homepageBanners: HomepageBannerRecord[];
  placementYearStats: PlacementStat[];
  placements: Placement[];
  exploreUs: ExploreUsItemRecord[];
  galleries: Gallery[];
  testimonials: TestimonialDTO[];
  academics: AcademicsData;
  naacScoreUploads: DynamicNaacScoreUpload[];
  research: {
    conventions: Record<string, unknown>;
    policy: Record<string, unknown>;
  };
}

interface HomepageResponse {
  success?: boolean;
  data?: Partial<HomepageDataApi>;
}

type AcademicDocumentApi = Partial<AcademicDocument> & {
  file_url?: string | null;
  file_name?: string | null;
};

type DeanDataApi = Partial<DeanData> & {
  image_url?: string | null;
  imageFileName?: string | null;
};

type ObeDataApi = Partial<ObeData> & {
  image_url?: string | null;
  imageFileName?: string | null;
};

interface HomepageDataApi {
  newsTicker?: NewsTicker[];
  notices?: NoticeRecord[];
  events?: Event[];
  heroSlides?: Array<Partial<HeroSlideRecord> & { is_fixed?: boolean | null }>;
  homepageBanners?: Array<Partial<HomepageBannerRecord> & { subtitle?: string | null }>;
  placementYearStats?: PlacementStat[];
  placements?: Placement[];
  exploreUs?: ExploreUsItemRecord[];
  galleries?: Gallery[];
  testimonials?: TestimonialDTO[];
  academics?: Partial<AcademicsData> & {
    program_booklets?: AcademicDocumentApi[];
    academic_calendars?: AcademicDocumentApi[];
    updated_at?: string;
    dean?: DeanDataApi | null;
    obe?: ObeDataApi | null;
  };
  naacScoreUploads?: DynamicNaacScoreUpload[];
  research?: {
    conventions?: Record<string, unknown>;
    policy?: Record<string, unknown>;
  };
}

export const EMPTY_HOMEPAGE_DATA: HomepageData = {
  newsTicker: [],
  notices: [],
  events: [],
  heroSlides: [],
  homepageBanners: [],
  placementYearStats: [],
  placements: [],
  exploreUs: [],
  galleries: [],
  testimonials: [],
  academics: {
    programBooklets: [],
    academicCalendars: [],
    dean: null,
    obe: null,
    updatedAt: '',
  },
  naacScoreUploads: [],
  research: {
    conventions: {},
    policy: {},
  },
};

function normalizeNotice(notice: NoticeRecord): NoticeRecord {
  return {
    ...notice,
    pdf_url: resolveUploadedAssetUrl(notice.pdf_url),
  };
}

function normalizeEvent(event: Event): Event {
  const raw = event as Event & {
    image_url?: string | null;
    admin_image_url?: string | null;
    attachment_url?: string | null;
    pdf_url?: string | null;
    admin_pdf_url?: string | null;
  };

  return {
    ...event,
    image: resolveUploadedAssetUrl(raw.image ?? raw.admin_image_url ?? raw.image_url),
    attachment: resolveUploadedAssetUrl(raw.attachment ?? raw.admin_pdf_url ?? raw.pdf_url ?? raw.attachment_url),
  };
}

function normalizeHeroSlide(slide: Partial<HeroSlideRecord> & { is_fixed?: boolean | null }): HeroSlideRecord {
  return {
    id: Number(slide.id ?? 0),
    title: slide.title ?? null,
    subtitle: slide.subtitle ?? null,
    image_name: slide.image_name ?? null,
    image_mime_type: slide.image_mime_type ?? null,
    image_size: slide.image_size ?? null,
    button_text: slide.button_text ?? null,
    button_link: slide.button_link ?? null,
    sort_order: Number(slide.sort_order ?? 0),
    is_active: Boolean(slide.is_active),
    image_url: resolveUploadedAssetUrl(slide.image_url ?? null),
    created_at: slide.created_at ?? '',
    updated_at: slide.updated_at ?? '',
  };
}

function normalizeHomepageBanner(
  banner: Partial<HomepageBannerRecord> & { subtitle?: string | null },
): HomepageBannerRecord {
  return {
    id: Number(banner.id ?? 0),
    title: banner.title ?? '',
    description: banner.description ?? banner.subtitle ?? banner.title ?? '',
    image_url: resolveUploadedAssetUrl(banner.image_url ?? null),
    sort_order: Number(banner.sort_order ?? 0),
    is_active: Boolean(banner.is_active),
    is_fixed: Boolean(banner.is_fixed),
    created_at: banner.created_at ?? '',
    updated_at: banner.updated_at ?? '',
  };
}

function normalizeGallery(gallery: Gallery): Gallery {
  return {
    ...gallery,
    image_url: resolveUploadedAssetUrl(gallery.image_url),
  };
}

function normalizeTestimonial(testimonial: TestimonialDTO): TestimonialDTO {
  return {
    ...testimonial,
    photo: resolveUploadedAssetUrl(testimonial.photo),
  };
}

function normalizePlacement(placement: Placement): Placement {
  return {
    ...placement,
    logo: resolveUploadedAssetUrl(placement.logo),
  };
}

function normalizeNaacScoreUpload(item: DynamicNaacScoreUpload): DynamicNaacScoreUpload {
  return {
    ...item,
    pdf_url: resolveUploadedAssetUrl(item.pdf_url),
  };
}

function normalizeDocument(doc: AcademicDocumentApi): AcademicDocument {
  return {
    title: doc.title ?? '',
    description: doc.description ?? '',
    year: doc.year ?? '',
    fileName: doc.fileName ?? doc.file_name ?? null,
    fileUrl: resolveApiUrl(doc.fileUrl ?? doc.file_url ?? null),
  };
}

function normalizeDean(raw: DeanDataApi | null | undefined): DeanData | null {
  if (!raw) return null;

  return {
    name: raw.name ?? '',
    qualification: raw.qualification ?? '',
    designation: raw.designation ?? '',
    institution: raw.institution ?? '',
    message: raw.message ?? '',
    imageUrl: resolveApiUrl(raw.imageUrl ?? raw.image_url ?? null),
  };
}

function normalizeObe(raw: ObeDataApi | null | undefined): ObeData | null {
  if (!raw) return null;

  return {
    title: raw.title ?? '',
    description: raw.description ?? '',
    imageUrl: resolveApiUrl(raw.imageUrl ?? raw.image_url ?? null),
  };
}

function normalizeAcademics(raw: HomepageDataApi['academics']): AcademicsData {
  const source = raw ?? {};
  const programBooklets = Array.isArray(source.programBooklets)
    ? source.programBooklets
    : Array.isArray(source.program_booklets)
      ? source.program_booklets
      : [];
  const academicCalendars = Array.isArray(source.academicCalendars)
    ? source.academicCalendars
    : Array.isArray(source.academic_calendars)
      ? source.academic_calendars
      : [];

  return {
    programBooklets: programBooklets.map(normalizeDocument),
    academicCalendars: academicCalendars.map(normalizeDocument),
    dean: normalizeDean(source.dean),
    obe: normalizeObe(source.obe),
    updatedAt: source.updatedAt ?? source.updated_at ?? '',
  };
}

function normalizeResearchSection(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {};
  }

  const payload = value as Record<string, unknown>;
  const content = payload.content;
  if (content && typeof content === 'object' && !Array.isArray(content)) {
    return { ...payload, ...(content as Record<string, unknown>) };
  }

  return payload;
}

function normalizeHomepageData(raw: HomepageResponse | HomepageDataApi): HomepageData {
  const payload = (raw && typeof raw === 'object' ? raw : {}) as HomepageResponse;
  const data = (payload.data && typeof payload.data === 'object' ? payload.data : payload) as HomepageDataApi;

  return {
    newsTicker: Array.isArray(data.newsTicker) ? data.newsTicker : [],
    notices: Array.isArray(data.notices) ? data.notices.map(normalizeNotice) : [],
    events: Array.isArray(data.events) ? data.events.map(normalizeEvent) : [],
    heroSlides: Array.isArray(data.heroSlides) ? data.heroSlides.map(normalizeHeroSlide) : [],
    homepageBanners: Array.isArray(data.homepageBanners)
      ? data.homepageBanners.map(normalizeHomepageBanner)
      : [],
    placementYearStats: Array.isArray(data.placementYearStats) ? data.placementYearStats : [],
    placements: Array.isArray(data.placements) ? data.placements.map(normalizePlacement) : [],
    exploreUs: Array.isArray(data.exploreUs) ? data.exploreUs : [],
    galleries: Array.isArray(data.galleries) ? data.galleries.map(normalizeGallery) : [],
    testimonials: Array.isArray(data.testimonials) ? data.testimonials.map(normalizeTestimonial) : [],
    academics: normalizeAcademics(data.academics),
    naacScoreUploads: Array.isArray(data.naacScoreUploads)
      ? data.naacScoreUploads.map(normalizeNaacScoreUpload)
      : [],
    research: {
      conventions: normalizeResearchSection(data.research?.conventions),
      policy: normalizeResearchSection(data.research?.policy),
    },
  };
}

export const homepageService = {
  get: async (): Promise<HomepageData> => {
    const response = await get<HomepageResponse>('/homepage');
    return normalizeHomepageData(response);
  },
};
