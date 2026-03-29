import type { AdmissionItem, AdmissionSection } from '../admin/types';
import { MOCK_ADMISSION_SECTIONS, readMockCollection } from '../admin/api/mockStore';
import { get } from './api';
import { USE_PUBLIC_MOCK } from './publicData';
import { resolveUploadedAssetUrl } from '../utils/uploadedAssets';

function normalizeItem(item: AdmissionItem): AdmissionItem {
  return {
    ...item,
    image_url: resolveUploadedAssetUrl(item.image_url),
    admin_image_url: resolveUploadedAssetUrl(item.admin_image_url),
    pdf_url: resolveUploadedAssetUrl(item.pdf_url),
    admin_pdf_url: resolveUploadedAssetUrl(item.admin_pdf_url),
    document_url: resolveUploadedAssetUrl(item.document_url) ?? item.external_url ?? null,
  };
}

function normalizeSection(section: AdmissionSection): AdmissionSection {
  return {
    ...section,
    items: (section.items ?? [])
      .filter((item) => item.is_active)
      .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
      .map(normalizeItem),
  };
}

function sortSections(sections: AdmissionSection[]): AdmissionSection[] {
  return [...sections].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
}

function toSlugToken(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function toCompactToken(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
}

function getSlugCandidates(slug: string): string[] {
  const explicitAliases: Record<string, string[]> = {
    'fees-structure': ['fees', 'fee-structure', 'fees-structures'],
    'documents-required': ['documents', 'required-documents', 'document-required'],
    'cut-off': ['cutoff', 'cut-offs', 'cutoffs'],
    'courses-and-intake': ['courses-intake', 'intake'],
  };

  return [slug, ...(explicitAliases[slug] ?? [])].filter(Boolean);
}

function findSectionBySlug(
  sections: AdmissionSection[],
  slug: string,
): AdmissionSection | undefined {
  const candidates = getSlugCandidates(slug);
  const slugTokens = new Set(candidates.map(toSlugToken));
  const compactTokens = new Set(candidates.map(toCompactToken));

  return sections.find((section) => {
    const sectionSlug = section.slug ?? '';
    const sectionToken = toSlugToken(sectionSlug);
    const sectionCompact = toCompactToken(sectionSlug);
    return slugTokens.has(sectionToken) || compactTokens.has(sectionCompact);
  });
}

function isNotFoundError(error: unknown): boolean {
  return typeof error === 'object'
    && error !== null
    && 'status' in error
    && (error as { status?: number }).status === 404;
}

export const admissionsService = {
  list: async (): Promise<AdmissionSection[]> => {
    const sections = USE_PUBLIC_MOCK
      ? readMockCollection<AdmissionSection>('vcet_mock_admission_sections', MOCK_ADMISSION_SECTIONS)
      : await get<AdmissionSection[]>('/admissions');

    return sortSections(sections)
      .filter((section) => section.is_active)
      .map(normalizeSection);
  },

  getBySlug: async (slug: string): Promise<AdmissionSection> => {
    if (USE_PUBLIC_MOCK) {
      const section = findSectionBySlug(
        readMockCollection<AdmissionSection>('vcet_mock_admission_sections', MOCK_ADMISSION_SECTIONS),
        slug,
      );

      if (!section) {
        throw new Error(`Admission section "${slug}" not found`);
      }

      return normalizeSection(section);
    }

    try {
      return normalizeSection(await get<AdmissionSection>(`/admissions/${slug}`));
    } catch (error) {
      if (!isNotFoundError(error)) {
        throw error;
      }

      const sections = await admissionsService.list();
      const fallbackSection = findSectionBySlug(sections, slug);

      if (!fallbackSection) {
        throw new Error(`Admission section "${slug}" not found`);
      }

      return fallbackSection;
    }
  },
};
