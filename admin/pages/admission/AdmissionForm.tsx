import React, { useEffect, useRef, useState } from 'react';
import { admissionsApi } from '../../api/admissions';
import type { AdmissionItem, AdmissionItemPayload, AdmissionSection, AdmissionSectionPayload } from '../../types';
import { GripVertical } from 'lucide-react';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';

type SectionKey = 'intake' | 'fees' | 'documents' | 'cutoffs' | 'brochure';

interface AdmissionFormProps {
  activeSection?: string;
  onBack?: () => void;
}

interface SectionConfig {
  slug: string;
  label: string;
  sectionType: 'course_list' | 'document_list';
  helperText: string;
}

interface EditableItem {
  client_id: string;
  id?: number;
  item_type: 'course' | 'document';
  title: string;
  description: string;
  category: string;
  academic_year: string;
  badge: string;
  tag: string;
  group_key: string;
  group_label: string;
  intake: string;
  external_url: string;
  existingExternalUrl: string;
  currentDocumentUrl: string;
  currentDocumentName: string;
  pdfFile: File | null;
  is_active: boolean;
  sort_order: number;
}

interface SectionFormState {
  slug: string;
  navigation_title: string;
  title: string;
  summary: string;
  description: string;
  section_type: 'course_list' | 'document_list';
  has_dropdown: boolean;
  dropdown_key: string;
  sort_order: string;
  is_active: boolean;
  content: Record<string, unknown>;
}

const SECTION_CONFIGS: Record<SectionKey, SectionConfig> = {
  intake: {
    slug: 'courses-intake',
    label: 'Courses & Intake',
    sectionType: 'course_list',
    helperText: 'Manage the academic programs and seat intake shown on the admission course page.',
  },
  fees: {
    slug: 'fees-structure',
    label: 'Fees Structure',
    sectionType: 'document_list',
    helperText: 'Manage the fee-structure records and the supporting copy shown on the fees page.',
  },
  documents: {
    slug: 'documents-required',
    label: 'Documents Required',
    sectionType: 'document_list',
    helperText: 'Manage the downloadable checklists required during admission.',
  },
  cutoffs: {
    slug: 'cut-off',
    label: 'Cut Off Details',
    sectionType: 'document_list',
    helperText: 'Manage CAP cut-off documents, years, and badges shown on the archive page.',
  },
  brochure: {
    slug: 'brochure',
    label: 'Brochure',
    sectionType: 'document_list',
    helperText: 'Manage the brochure page copy and the brochure document itself.',
  },
};

const COURSE_GROUPS = [
  { key: 'UG', label: 'Under Graduate Program' },
  { key: 'PG', label: 'Post Graduate Program' },
  { key: 'Management', label: 'Management Program' },
];



const inputBase = 'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/10';
const labelBase = 'mb-2 block text-[11px] font-black uppercase tracking-[0.22em] text-slate-400';
const dragCardBase = 'transition-transform duration-150 ease-out';
const AUTO_SCROLL_EDGE_PX = 120;
const AUTO_SCROLL_MAX_SPEED = 22;

interface DragState {
  itemId: string;
  listId: string;
  currentClientY: number;
  grabOffsetY: number;
}

let editableItemCounter = 0;

function createEditableItemId(): string {
  editableItemCounter += 1;
  return `admission-item-${editableItemCounter}`;
}

const Toast: React.FC<{ message: string; type: 'success' | 'error'; onClose: () => void }> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timeoutId = window.setTimeout(onClose, 3500);
    return () => window.clearTimeout(timeoutId);
  }, [onClose]);

  return (
    <div className={`fixed bottom-6 right-6 z-50 rounded-2xl px-5 py-4 text-sm font-bold text-white shadow-2xl ${type === 'success' ? 'bg-emerald-600' : 'bg-red-600'}`}>
      {message}
    </div>
  );
};

const SectionCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-lg shadow-slate-200/40">
    <div className="border-b border-slate-100 px-8 py-5">
      <h2 className="text-sm font-extrabold uppercase tracking-[0.22em] text-slate-700">{title}</h2>
    </div>
    <div className="space-y-6 p-8">{children}</div>
  </div>
);

function isSectionKey(value?: string): value is SectionKey {
  return Boolean(value && value in SECTION_CONFIGS);
}

function toEditableItem(item: AdmissionItem): EditableItem {
  return {
    client_id: createEditableItemId(),
    id: item.id,
    item_type: item.item_type === 'course' ? 'course' : 'document',
    title: item.title ?? '',
    description: item.description ?? '',
    category: item.category ?? '',
    academic_year: item.academic_year ?? '',
    badge: item.badge ?? '',
    tag: item.tag ?? '',
    group_key: item.group_key ?? '',
    group_label: item.group_label ?? '',
    intake: item.intake ? String(item.intake) : '',
    external_url: item.external_url ?? '',
    existingExternalUrl: item.external_url ?? '',
    currentDocumentUrl: item.document_url ?? '',
    currentDocumentName: item.pdf_name ?? '',
    pdfFile: null,
    is_active: item.is_active,
    sort_order: item.sort_order ?? 0,
  };
}

function createEmptyCourseItem(category: string): EditableItem {
  return {
    client_id: createEditableItemId(),
    item_type: 'course',
    title: '',
    description: '',
    category,
    academic_year: '',
    badge: '',
    tag: '',
    group_key: '',
    group_label: '',
    intake: '',
    external_url: '',
    existingExternalUrl: '',
    currentDocumentUrl: '',
    currentDocumentName: '',
    pdfFile: null,
    is_active: true,
    sort_order: 0,
  };
}

function createEmptyDocumentItem(sectionKey: SectionKey): EditableItem {
  return {
    client_id: createEditableItemId(),
    item_type: 'document',
    title: '',
    description: '',
    category: '',
    academic_year: '',
    badge: '',
    tag: '',
    group_key: '',
    group_label: '',
    intake: '',
    external_url: '',
    existingExternalUrl: '',
    currentDocumentUrl: '',
    currentDocumentName: '',
    pdfFile: null,
    is_active: true,
    sort_order: 0,
  };
}

function toSectionFormState(section: AdmissionSection, config: SectionConfig): SectionFormState {
  return {
    slug: section.slug,
    navigation_title: section.navigation_title ?? '',
    title: section.title ?? '',
    summary: section.summary ?? '',
    description: section.description ?? '',
    section_type: section.section_type === 'course_list' ? 'course_list' : config.sectionType,
    has_dropdown: section.has_dropdown,
    dropdown_key: section.dropdown_key ?? '',
    sort_order: String(section.sort_order ?? 0),
    is_active: section.is_active,
    content: section.content ?? {},
  };
}

function buildSectionPayload(state: SectionFormState): AdmissionSectionPayload {
  return {
    slug: state.slug,
    navigation_title: state.navigation_title.trim() || state.title.trim(),
    title: state.title.trim(),
    summary: state.summary.trim() || null,
    description: state.description.trim() || null,
    section_type: state.section_type,
    has_dropdown: state.has_dropdown,
    dropdown_key: state.has_dropdown ? state.dropdown_key.trim() || null : null,
    content: state.content,
    is_active: state.is_active,
    sort_order: Number.parseInt(state.sort_order, 10) || 0,
  };
}

function buildItemPayload(item: EditableItem, index: number): AdmissionItemPayload {
  return {
    item_type: item.item_type,
    title: item.title.trim(),
    description: item.description.trim() || null,
    category: item.category.trim() || null,
    academic_year: item.academic_year.trim() || null,
    badge: item.badge.trim() || null,
    tag: item.tag.trim() || null,
    group_key: item.group_key.trim() || null,
    group_label: item.group_label.trim() || null,
    intake: item.item_type === 'course' ? Number.parseInt(item.intake, 10) || null : null,
    external_url: item.external_url.trim() || null,
    pdf: item.pdfFile,
    is_active: item.is_active,
    sort_order: index,
  };
}

function getContentValue(content: Record<string, unknown>, key: string, fallback = ''): string {
  const value = content[key];
  return typeof value === 'string' ? value : fallback;
}

function getSectionHeading(content: Record<string, unknown>, key: string, fallback: string): string {
  const sectionHeadings = content.section_headings;
  if (sectionHeadings && typeof sectionHeadings === 'object' && !Array.isArray(sectionHeadings)) {
    const value = (sectionHeadings as Record<string, unknown>)[key];
    if (typeof value === 'string') {
      return value;
    }
  }

  return fallback;
}

function getAutoScrollVelocity(pointerY: number): number {
  if (pointerY < AUTO_SCROLL_EDGE_PX) {
    return -Math.ceil(((AUTO_SCROLL_EDGE_PX - pointerY) / AUTO_SCROLL_EDGE_PX) * AUTO_SCROLL_MAX_SPEED);
  }

  const distanceFromBottom = window.innerHeight - pointerY;
  if (distanceFromBottom < AUTO_SCROLL_EDGE_PX) {
    return Math.ceil(((AUTO_SCROLL_EDGE_PX - distanceFromBottom) / AUTO_SCROLL_EDGE_PX) * AUTO_SCROLL_MAX_SPEED);
  }

  return 0;
}

const AdmissionForm: React.FC<AdmissionFormProps> = ({ activeSection, onBack }) => {
  const sectionKey: SectionKey = isSectionKey(activeSection) ? activeSection : 'intake';
  const config = SECTION_CONFIGS[sectionKey];

  const [section, setSection] = useState<AdmissionSection | null>(null);
  const [form, setForm] = useState<SectionFormState | null>(null);
  const [items, setItems] = useState<EditableItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [collapsedItems, setCollapsedItems] = useState<Set<string>>(new Set());
  const itemsRef = useRef(items);
  const dragStateRef = useRef<DragState | null>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const pointerClientYRef = useRef(0);
  const autoScrollVelocityRef = useRef(0);
  const autoScrollFrameRef = useRef<number | null>(null);

  const loadSection = async () => {
    setLoading(true);

    try {
      const response = await admissionsApi.getSection(config.slug);
      setSection(response.data);
      setForm(toSectionFormState(response.data, config));
      setItems((response.data.items ?? []).map(toEditableItem));
    } catch (error) {
      setToast({ message: error instanceof Error ? error.message : 'Unable to load admission section', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadSection();
  }, [config.slug]);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    if (items.length > 0) {
      const allItemIds = new Set(items.map((item) => item.client_id));
      setCollapsedItems(allItemIds);
    }
  }, [items]);

  useEffect(() => {
    dragStateRef.current = dragState;
  }, [dragState]);

  useEffect(() => {
    if (!dragState) {
      document.body.style.removeProperty('user-select');
      document.body.style.removeProperty('cursor');
      return undefined;
    }

    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'grabbing';

    const handlePointerMove = (event: PointerEvent) => {
      pointerClientYRef.current = event.clientY;
      syncDraggedItem(event.clientY);
      updateAutoScroll(event.clientY);
    };

    const handlePointerUp = () => {
      endDrag();
    };

    const handleWindowBlur = () => {
      endDrag();
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      stopAutoScroll();
      document.body.style.removeProperty('user-select');
      document.body.style.removeProperty('cursor');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [dragState]);

  const updateFormField = <K extends keyof SectionFormState>(key: K, value: SectionFormState[K]) => {
    setForm((current) => (current ? { ...current, [key]: value } : current));
  };

  const updateContentField = (key: string, value: string) => {
    setForm((current) => {
      if (!current) return current;
      return {
        ...current,
        content: {
          ...current.content,
          [key]: value,
        },
      };
    });
  };

  const updateSectionHeading = (key: string, value: string) => {
    setForm((current) => {
      if (!current) return current;
      const sectionHeadings = current.content.section_headings;
      const nextHeadings =
        sectionHeadings && typeof sectionHeadings === 'object' && !Array.isArray(sectionHeadings)
          ? { ...(sectionHeadings as Record<string, unknown>), [key]: value }
          : { [key]: value };

      return {
        ...current,
        content: {
          ...current.content,
          section_headings: nextHeadings,
        },
      };
    });
  };

  const updateItem = (index: number, updates: Partial<EditableItem>) => {
    setItems((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, ...updates } : item)));
  };

  const removeItem = (index: number) => {
    setItems((current) => current.filter((_, itemIndex) => itemIndex !== index));
  };

  const toggleItemCollapse = (clientId: string) => {
    setCollapsedItems((current) => {
      const next = new Set(current);
      if (next.has(clientId)) {
        next.delete(clientId);
      } else {
        next.add(clientId);
      }
      return next;
    });
  };

  const getListIndices = (listId: string, sourceItems: EditableItem[]) => {
    if (sectionKey === 'intake') {
      return sourceItems.reduce<number[]>((indices, item, index) => {
        if (item.category === listId) {
          indices.push(index);
        }

        return indices;
      }, []);
    }

    return sourceItems.map((_, index) => index);
  };

  const reorderWithinList = (sourceItems: EditableItem[], listId: string, itemId: string, insertPosition: number) => {
    const listIndices = getListIndices(listId, sourceItems);
    const fromPosition = listIndices.findIndex((index) => sourceItems[index]?.client_id === itemId);

    if (fromPosition === -1) {
      return sourceItems;
    }

    const clampedPosition = Math.max(0, Math.min(insertPosition, listIndices.length - 1));
    if (fromPosition === clampedPosition) {
      return sourceItems;
    }

    const subset = listIndices.map((index) => sourceItems[index]);
    const [movedItem] = subset.splice(fromPosition, 1);
    subset.splice(clampedPosition, 0, movedItem);

    return sourceItems.map((item, index) => {
      const listPosition = listIndices.indexOf(index);
      return listPosition === -1 ? item : subset[listPosition];
    });
  };

  const moveDraggedItem = (itemId: string, listId: string, pointerY: number) => {
    setItems((current) => {
      const listIndices = getListIndices(listId, current);
      if (listIndices.length < 2) {
        return current;
      }

      const activeIndex = listIndices.findIndex((index) => current[index]?.client_id === itemId);
      if (activeIndex === -1) {
        return current;
      }

      const otherIndices = listIndices.filter((index) => current[index]?.client_id !== itemId);
      let insertPosition = listIndices.length - 1;

      for (let position = 0; position < otherIndices.length; position += 1) {
        const comparedItem = current[otherIndices[position]];
        const cardElement = itemRefs.current[comparedItem.client_id];
        if (!cardElement) {
          continue;
        }

        const bounds = cardElement.getBoundingClientRect();
        const midpoint = bounds.top + bounds.height / 2;
        if (pointerY < midpoint) {
          insertPosition = position;
          break;
        }
      }

      return reorderWithinList(current, listId, itemId, insertPosition);
    });
  };

  const stopAutoScroll = () => {
    autoScrollVelocityRef.current = 0;
    if (autoScrollFrameRef.current !== null) {
      window.cancelAnimationFrame(autoScrollFrameRef.current);
      autoScrollFrameRef.current = null;
    }
  };

  const endDrag = () => {
    stopAutoScroll();
    setDragState(null);
  };

  const syncDraggedItem = (pointerY: number) => {
    const currentDragState = dragStateRef.current;
    if (!currentDragState) {
      return;
    }

    moveDraggedItem(currentDragState.itemId, currentDragState.listId, pointerY);
    setDragState((current) =>
      current
        ? {
            ...current,
            currentClientY: pointerY,
          }
        : current,
    );
  };

  const startAutoScroll = () => {
    if (autoScrollFrameRef.current !== null) {
      return;
    }

    const step = () => {
      const velocity = autoScrollVelocityRef.current;
      const currentDragState = dragStateRef.current;

      if (!currentDragState || velocity === 0) {
        autoScrollFrameRef.current = null;
        return;
      }

      const maxScrollTop = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const nextScrollTop = Math.max(0, Math.min(window.scrollY + velocity, maxScrollTop));

      if (nextScrollTop !== window.scrollY) {
        window.scrollTo({ top: nextScrollTop });
        syncDraggedItem(pointerClientYRef.current);
      }

      autoScrollFrameRef.current = window.requestAnimationFrame(step);
    };

    autoScrollFrameRef.current = window.requestAnimationFrame(step);
  };

  const updateAutoScroll = (pointerY: number) => {
    autoScrollVelocityRef.current = getAutoScrollVelocity(pointerY);
    if (autoScrollVelocityRef.current === 0) {
      stopAutoScroll();
      return;
    }

    startAutoScroll();
  };

  const beginDrag = (itemId: string, listId: string, event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) {
      return;
    }

    event.preventDefault();
    const itemElement = itemRefs.current[itemId];
    if (!itemElement) {
      return;
    }

    const itemBounds = itemElement.getBoundingClientRect();
    pointerClientYRef.current = event.clientY;
    setDragState({
      itemId,
      listId,
      currentClientY: event.clientY,
      grabOffsetY: event.clientY - itemBounds.top,
    });
  };

  const registerItemRef = (itemId: string) => (node: HTMLDivElement | null) => {
    if (node) {
      itemRefs.current[itemId] = node;
      return;
    }

    delete itemRefs.current[itemId];
  };

  const addCourseItem = (category: string) => {
    setItems((current) => [...current, createEmptyCourseItem(category)]);
  };

  const addDocumentItem = () => {
    setItems((current) => [...current, createEmptyDocumentItem(sectionKey)]);
  };

  const validateBeforeSave = (): string | null => {
    if (!form) return 'Admission form is not ready yet.';
    if (!form.title.trim()) return 'Section title is required.';
    if (!form.navigation_title.trim()) return 'Navigation title is required.';

    for (const item of items) {
      if (!item.title.trim()) {
        return 'Every admission row needs a title before saving.';
      }

      if (item.item_type === 'course' && !item.intake.trim()) {
        return `Intake is required for "${item.title || 'course'}".`;
      }

      if (item.item_type === 'document' && !item.external_url.trim() && !item.currentDocumentUrl && !item.pdfFile) {
        return `Add a document URL or upload a PDF for "${item.title || 'document'}".`;
      }
    }

    return null;
  };

  const getDragCardStyle = (itemId: string): React.CSSProperties | undefined => {
    if (!dragState || dragState.itemId !== itemId) {
      return undefined;
    }

    const itemBounds = itemRefs.current[itemId]?.getBoundingClientRect();
    const itemTop = itemBounds?.top ?? 0;

    return {
      position: 'relative',
      zIndex: 30,
      transform: `translateY(${dragState.currentClientY - dragState.grabOffsetY - itemTop}px) scale(1.01)`,
      boxShadow: '0 28px 65px rgba(15, 23, 42, 0.18)',
    };
  };

  const renderDragHandle = (itemId: string, listId: string, label: string) => (
    <button
      type="button"
      onPointerDown={(event) => beginDrag(itemId, listId, event)}
      className="cursor-grab rounded-xl border border-slate-200 bg-white p-3 text-slate-500 transition hover:border-slate-300 hover:text-slate-700 active:cursor-grabbing"
      aria-label={label}
    >
      <GripVertical className="h-4 w-4" />
    </button>
  );

  const saveChanges = async () => {
    if (!section || !form) {
      setToast({ message: 'Section data is still loading.', type: 'error' });
      return;
    }

    const validationError = validateBeforeSave();
    if (validationError) {
      setToast({ message: validationError, type: 'error' });
      return;
    }

    setSaving(true);

    try {
      await admissionsApi.updateSection(section.slug, buildSectionPayload(form));

      const draftItems = items.filter((item) => item.title.trim());
      const keptItemIds = new Set<number>();

      for (const [index, item] of draftItems.entries()) {
        const payload = buildItemPayload(item, index);

        if (item.id) {
          keptItemIds.add(item.id);
          await admissionsApi.updateItem(item.id, payload);
        } else {
          const created = await admissionsApi.createItem(section.slug, payload);
          keptItemIds.add(created.data.id);
        }
      }

      for (const existingItem of section.items ?? []) {
        if (!keptItemIds.has(existingItem.id)) {
          await admissionsApi.deleteItem(existingItem.id);
        }
      }

      await loadSection();
      setToast({ message: `${config.label} updated successfully.`, type: 'success' });
    } catch (error) {
      setToast({ message: error instanceof Error ? error.message : 'Failed to update admission content', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await saveChanges();
  };

  const renderSectionMeta = () => {
    if (!form) return null;

    return (
      <SectionCard title="Section Settings">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelBase}>Navigation Title</label>
            <input className={inputBase} value={form.navigation_title} onChange={(event) => updateFormField('navigation_title', event.target.value)} />
          </div>
          <div>
            <label className={labelBase}>Page Title</label>
            <input className={inputBase} value={form.title} onChange={(event) => updateFormField('title', event.target.value)} />
          </div>
          <div>
            <label className={labelBase}>Summary</label>
            <input className={inputBase} value={form.summary} onChange={(event) => updateFormField('summary', event.target.value)} />
          </div>
          <div>
            <label className={labelBase}>Dropdown Key</label>
            <input
              className={inputBase}
              value={form.dropdown_key}
              onChange={(event) => updateFormField('dropdown_key', event.target.value)}
              placeholder={form.has_dropdown ? 'e.g. academic_year' : 'Disabled for this section'}
              disabled={!form.has_dropdown}
            />
          </div>
          <div className="md:col-span-2">
            <label className={labelBase}>Description</label>
            <textarea className={`${inputBase} min-h-[120px] resize-y`} value={form.description} onChange={(event) => updateFormField('description', event.target.value)} />
          </div>
          <div>
            <label className={labelBase}>Sort Order</label>
            <input className={inputBase} type="number" min="0" value={form.sort_order} onChange={(event) => updateFormField('sort_order', event.target.value)} />
          </div>
          <div className="flex flex-wrap items-center gap-6 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
            <label className="inline-flex items-center gap-3 text-sm font-semibold text-slate-700">
              <input type="checkbox" checked={form.is_active} onChange={(event) => updateFormField('is_active', event.target.checked)} />
              Section Active
            </label>
            <label className="inline-flex items-center gap-3 text-sm font-semibold text-slate-700">
              <input type="checkbox" checked={form.has_dropdown} onChange={(event) => updateFormField('has_dropdown', event.target.checked)} />
              Enable Dropdown Filter
            </label>
          </div>
        </div>
      </SectionCard>
    );
  };

  const renderSectionContent = () => {
    if (!form) return null;

    if (sectionKey === 'intake') {
      return (
        <SectionCard title="Page Copy">
          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <label className={labelBase}>UG Heading</label>
              <input className={inputBase} value={getSectionHeading(form.content, 'ug', 'Under Graduate Program')} onChange={(event) => updateSectionHeading('ug', event.target.value)} />
            </div>
            <div>
              <label className={labelBase}>PG Heading</label>
              <input className={inputBase} value={getSectionHeading(form.content, 'pg', 'Post Graduate Program')} onChange={(event) => updateSectionHeading('pg', event.target.value)} />
            </div>
            <div>
              <label className={labelBase}>Management Heading</label>
              <input className={inputBase} value={getSectionHeading(form.content, 'mgmt', 'Management Program')} onChange={(event) => updateSectionHeading('mgmt', event.target.value)} />
            </div>
          </div>
        </SectionCard>
      );
    }

    if (sectionKey === 'fees') {
      return (
        <SectionCard title="Page Copy">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className={labelBase}>Badge</label>
              <input className={inputBase} value={getContentValue(form.content, 'badge', 'Academic Administration')} onChange={(event) => updateContentField('badge', event.target.value)} />
            </div>
            <div>
              <label className={labelBase}>Heading</label>
              <input className={inputBase} value={getContentValue(form.content, 'heading', 'Fee Structure')} onChange={(event) => updateContentField('heading', event.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label className={labelBase}>Intro</label>
              <textarea className={`${inputBase} min-h-[110px] resize-y`} value={getContentValue(form.content, 'intro')} onChange={(event) => updateContentField('intro', event.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label className={labelBase}>Table Heading</label>
              <input className={inputBase} value={getContentValue(form.content, 'table_heading', 'Program Documentation')} onChange={(event) => updateContentField('table_heading', event.target.value)} />
            </div>
          </div>
        </SectionCard>
      );
    }

    if (sectionKey === 'brochure') {
      return (
        <SectionCard title="Page Copy">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className={labelBase}>Heading</label>
              <input className={inputBase} value={getContentValue(form.content, 'heading', 'College Brochure')} onChange={(event) => updateContentField('heading', event.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label className={labelBase}>Intro</label>
              <textarea className={`${inputBase} min-h-[110px] resize-y`} value={getContentValue(form.content, 'intro')} onChange={(event) => updateContentField('intro', event.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label className={labelBase}>Description</label>
              <textarea className={`${inputBase} min-h-[110px] resize-y`} value={getContentValue(form.content, 'description')} onChange={(event) => updateContentField('description', event.target.value)} />
            </div>
          </div>
        </SectionCard>
      );
    }

    if (sectionKey === 'cutoffs') {
      return (
        <SectionCard title="Page Copy">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className={labelBase}>Heading</label>
              <input className={inputBase} value={getContentValue(form.content, 'heading', 'Centralized Admission Process')} onChange={(event) => updateContentField('heading', event.target.value)} />
            </div>
            <div>
              <label className={labelBase}>Subheading</label>
              <input className={inputBase} value={getContentValue(form.content, 'subheading')} onChange={(event) => updateContentField('subheading', event.target.value)} />
            </div>
          </div>
        </SectionCard>
      );
    }

    if (sectionKey === 'documents') {
      return (
        <SectionCard title="Page Copy">
          <div>
            <label className={labelBase}>Heading</label>
            <input className={inputBase} value={getContentValue(form.content, 'heading', 'Required Documentation')} onChange={(event) => updateContentField('heading', event.target.value)} />
          </div>
        </SectionCard>
      );
    }

    return null;
  };

  const renderCourseItems = () => (
    <SectionCard title="Courses">
      <div className="space-y-8">
        {COURSE_GROUPS.map((group) => {
          const groupItems = items
            .map((item, index) => ({ item, index }))
            .filter(({ item }) => item.category === group.key);

          return (
            <div key={group.key} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-slate-800">{group.label}</h3>
                <button type="button" onClick={() => addCourseItem(group.key)} className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-slate-800">
                  Add Course
                </button>
              </div>

              {groupItems.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 px-5 py-8 text-center text-sm font-semibold text-slate-400">
                  No courses added yet for this group.
                </div>
              ) : (
                groupItems.map(({ item, index }) => {
                  const isCollapsed = collapsedItems.has(item.client_id);
                  
                  return (
                  <div
                    key={item.client_id}
                    ref={registerItemRef(item.client_id)}
                    className="relative"
                  >
                    <div
                      style={getDragCardStyle(item.client_id)}
                      className={`rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 ${dragCardBase} ${
                        dragState?.itemId === item.client_id ? 'ring-2 ring-[#2563EB]/25 transition-none' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4 border-b border-slate-200/80 pb-4 mb-5">
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex-1">
                              <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">
                                Course Item
                              </p>
                              {item.title && (
                                <p className="mt-1 text-sm font-semibold text-slate-700">{item.title}</p>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => toggleItemCollapse(item.client_id)}
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-200 hover:text-slate-700"
                              aria-label={isCollapsed ? 'Expand item' : 'Collapse item'}
                            >
                              <svg
                                className={`h-5 w-5 transition-transform duration-200 ${isCollapsed ? '' : 'rotate-180'}`}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        {renderDragHandle(item.client_id, group.key, `Drag to reorder ${item.title || 'course item'}`)}
                      </div>
                      
                      {!isCollapsed && (
                        <div className="grid gap-4 md:grid-cols-[1fr_180px_auto]">
                          <div>
                            <label className={labelBase}>Course Name</label>
                            <input className={inputBase} value={item.title} onChange={(event) => updateItem(index, { title: event.target.value })} placeholder="e.g. Computer Engineering" />
                          </div>
                          <div>
                            <label className={labelBase}>Intake</label>
                            <input className={inputBase} type="number" min="1" value={item.intake} onChange={(event) => updateItem(index, { intake: event.target.value })} placeholder="60" />
                          </div>
                          <div className="flex items-end justify-end">
                            <button type="button" onClick={() => removeItem(index)} className="rounded-xl border border-red-200 px-4 py-3 text-xs font-black uppercase tracking-[0.18em] text-red-600 transition hover:bg-red-50">
                              Remove
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
                })
              )}
            </div>
          );
        })}
      </div>
    </SectionCard>
  );

  const renderDocumentItems = () => {
    const showAcademicYear = sectionKey === 'fees' || sectionKey === 'cutoffs';
    const showTag = sectionKey === 'documents';
    const showBadge = sectionKey === 'cutoffs';

    return (
      <SectionCard title={sectionKey === 'brochure' ? 'Brochure File' : 'Documents'}>
        <div className="space-y-5">
          {(sectionKey !== 'brochure' || items.length === 0) && (
            <div className="flex justify-end">
              <button type="button" onClick={addDocumentItem} className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-slate-800">
                {sectionKey === 'brochure' ? 'Add Brochure' : 'Add Document'}
              </button>
            </div>
          )}

          {items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 px-5 py-8 text-center text-sm font-semibold text-slate-400">
              {sectionKey === 'brochure' ? 'No brochure file has been added yet.' : 'No documents added yet.'}
            </div>
          ) : (
            items.map((item, index) => {
              const isCollapsed = collapsedItems.has(item.client_id);
              
              return (
              <div
                key={item.client_id}
                ref={registerItemRef(item.client_id)}
                className="relative"
              >
                <div
                  style={getDragCardStyle(item.client_id)}
                  className={`space-y-5 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 ${dragCardBase} ${
                    dragState?.itemId === item.client_id ? 'ring-2 ring-[#2563EB]/25 transition-none' : ''
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex-1">
                          <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">
                            {sectionKey === 'brochure' ? 'Brochure Asset' : `Item ${index + 1}`}
                          </p>
                          {item.title && (
                            <p className="mt-1 text-sm font-semibold text-slate-700">{item.title}</p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleItemCollapse(item.client_id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-200 hover:text-slate-700"
                          aria-label={isCollapsed ? 'Expand item' : 'Collapse item'}
                        >
                          <svg
                            className={`h-5 w-5 transition-transform duration-200 ${isCollapsed ? '' : 'rotate-180'}`}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                      {!isCollapsed && (
                        <p className="mt-2 text-sm font-semibold text-slate-600">
                          Drag to change how this appears on the website.
                        </p>
                      )}
                    </div>
                    {renderDragHandle(item.client_id, 'documents', `Drag to reorder ${item.title || 'document item'}`)}
                  </div>
                  
                  {!isCollapsed && (
                    <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className={labelBase}>Title</label>
                      <input className={inputBase} value={item.title} onChange={(event) => updateItem(index, { title: event.target.value })} />
                    </div>
                    <div>
                      <label className={labelBase}>Category</label>
                      <input className={inputBase} value={item.category} onChange={(event) => updateItem(index, { category: event.target.value })} placeholder="e.g. Engineering" />
                    </div>

                    {showAcademicYear && (
                      <div>
                        <label className={labelBase}>Academic Year</label>
                        <input className={inputBase} value={item.academic_year} onChange={(event) => updateItem(index, { academic_year: event.target.value })} placeholder="2025-26" />
                      </div>
                    )}

                    {showTag && (
                      <div>
                        <label className={labelBase}>Tag</label>
                        <input className={inputBase} value={item.tag} onChange={(event) => updateItem(index, { tag: event.target.value })} placeholder="UG - First Year" />
                      </div>
                    )}

                    {showBadge && (
                      <div>
                        <label className={labelBase}>Badge</label>
                        <input className={inputBase} value={item.badge} onChange={(event) => updateItem(index, { badge: event.target.value })} placeholder="New" />
                      </div>
                    )}

                    <div className="md:col-span-2">
                      <label className={labelBase}>Description</label>
                      <textarea className={`${inputBase} min-h-[110px] resize-y`} value={item.description} onChange={(event) => updateItem(index, { description: event.target.value })} />
                    </div>

                    <div className="md:col-span-2">
                      <label className={labelBase}>Document URL</label>
                      <input className={inputBase} value={item.external_url} onChange={(event) => updateItem(index, { external_url: event.target.value })} placeholder="https://..." />
                    </div>

                    <div className="md:col-span-2">
                      <label className={labelBase}>Upload PDF</label>
                      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-4">
                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={(event) => updateItem(index, { pdfFile: event.target.files?.[0] ?? null })}
                          className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-xl file:border-0 file:bg-slate-900 file:px-4 file:py-2.5 file:text-sm file:font-bold file:text-white hover:file:bg-slate-800"
                        />
                        <p className="mt-3 text-xs font-semibold text-slate-400">
                          {item.pdfFile?.name || item.currentDocumentName || item.currentDocumentUrl || 'No document selected yet.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {sectionKey !== 'brochure' && (
                    <div className="flex justify-end">
                      <button type="button" onClick={() => removeItem(index)} className="rounded-xl border border-red-200 px-4 py-3 text-xs font-black uppercase tracking-[0.18em] text-red-600 transition hover:bg-red-50">
                        Remove
                      </button>
                    </div>
                  )}
                  </>
                  )}
                </div>
              </div>
            );
            })
          )}
        </div>
      </SectionCard>
    );
  };

  if (loading || !form) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-100 border-t-[#2563EB]" />
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Loading Admission Section...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-12">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <PageEditorHeader
        title={config.label}
        description={config.helperText}
        onSave={saveChanges}
        isSaving={saving}
        showBackButton={!!onBack}
        onBack={onBack}
      />
      <div className="rounded-2xl border border-slate-200/70 bg-white px-4 py-3 text-right text-xs font-bold uppercase tracking-[0.2em] text-slate-400 shadow-sm">
        <div>Slug: {config.slug}</div>
        <div className="mt-1">Records: {items.length}</div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {renderSectionMeta()}
        {renderSectionContent()}
        {sectionKey === 'intake' ? renderCourseItems() : renderDocumentItems()}

        <div className="flex flex-col items-center justify-between gap-4 rounded-[2rem] border border-slate-100 bg-white px-8 py-6 shadow-lg shadow-slate-200/40 sm:flex-row">
          <p className="text-sm text-slate-500">
            Saving updates the section record first, then syncs the individual admission items against the Laravel API.
          </p>
          <button type="submit" disabled={saving} className="inline-flex min-w-[180px] items-center justify-center rounded-2xl bg-[#2563EB] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-white shadow-xl transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdmissionForm;
