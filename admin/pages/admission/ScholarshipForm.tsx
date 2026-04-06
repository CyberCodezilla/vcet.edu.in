import React, { useEffect, useRef, useState } from 'react';
import { GripVertical, Settings, List } from 'lucide-react';
import { admissionsApi } from '../../api/admissions';
import type { AdmissionItem, AdmissionItemPayload, AdmissionSection, AdmissionSectionPayload } from '../../types';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';
import AdminFormSection from '../../components/AdminFormSection';

interface ScholarshipFormProps {
  onBack?: () => void;
}

interface EditableScholarshipItem {
  client_id: string;
  id?: number;
  title: string;
  description: string;
  category: string;
  academic_year: string;
  badge: string;
  tag: string;
  external_url: string;
  currentDocumentUrl: string;
  currentDocumentName: string;
  pdfFile: File | null;
  is_active: boolean;
}

interface ScholarshipSectionForm {
  navigation_title: string;
  title: string;
  summary: string;
  description: string;
  sort_order: string;
  is_active: boolean;
}

interface DragState {
  itemId: string;
  listId: string;
  currentClientY: number;
  grabOffsetY: number;
}

const inputBase =
  'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-[#2563EB]/10';
const labelBase = 'mb-2 block text-[11px] font-black uppercase tracking-[0.22em] text-slate-400';
const dragCardBase = 'transition-transform duration-150 ease-out';
const AUTO_SCROLL_EDGE_PX = 120;
const AUTO_SCROLL_MAX_SPEED = 22;

let scholarshipItemCounter = 0;

function createEditableItemId(): string {
  scholarshipItemCounter += 1;
  return `scholarship-item-${scholarshipItemCounter}`;
}

function toEditableItem(item: AdmissionItem): EditableScholarshipItem {
  return {
    client_id: createEditableItemId(),
    id: item.id,
    title: item.title ?? '',
    description: item.description ?? '',
    category: item.category ?? '',
    academic_year: item.academic_year ?? '',
    badge: item.badge ?? '',
    tag: item.tag ?? '',
    external_url: item.external_url ?? '',
    currentDocumentUrl: item.document_url ?? '',
    currentDocumentName: item.pdf_name ?? '',
    pdfFile: null,
    is_active: item.is_active,
  };
}

function createEmptyScholarshipItem(): EditableScholarshipItem {
  return {
    client_id: createEditableItemId(),
    title: '',
    description: '',
    category: '',
    academic_year: '',
    badge: '',
    tag: '',
    external_url: '',
    currentDocumentUrl: '',
    currentDocumentName: '',
    pdfFile: null,
    is_active: true,
  };
}

function buildSectionPayload(section: AdmissionSection, form: ScholarshipSectionForm): AdmissionSectionPayload {
  return {
    slug: section.slug,
    navigation_title: form.navigation_title.trim() || form.title.trim(),
    title: form.title.trim(),
    summary: form.summary.trim() || null,
    description: form.description.trim() || null,
    section_type: section.section_type,
    has_dropdown: section.has_dropdown,
    dropdown_key: section.dropdown_key,
    content: section.content,
    is_active: form.is_active,
    sort_order: Number.parseInt(form.sort_order, 10) || 0,
  };
}

function buildItemPayload(item: EditableScholarshipItem, index: number): AdmissionItemPayload {
  return {
    item_type: 'document',
    title: item.title.trim(),
    description: item.description.trim() || null,
    category: item.category.trim() || null,
    academic_year: item.academic_year.trim() || null,
    badge: item.badge.trim() || null,
    tag: item.tag.trim() || null,
    group_key: 'scholarships',
    group_label: 'Scholarships',
    external_url: item.external_url.trim() || null,
    pdf: item.pdfFile,
    is_active: item.is_active,
    sort_order: index,
  };
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

const ScholarshipForm: React.FC<ScholarshipFormProps> = ({ onBack }) => {
  const [section, setSection] = useState<AdmissionSection | null>(null);
  const [form, setForm] = useState<ScholarshipSectionForm | null>(null);
  const [items, setItems] = useState<EditableScholarshipItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [collapsedItems, setCollapsedItems] = useState<Set<string>>(new Set());

  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const dragStateRef = useRef<DragState | null>(null);
  const pointerClientYRef = useRef(0);
  const autoScrollVelocityRef = useRef(0);
  const autoScrollFrameRef = useRef<number | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>('settings');

  const toggleSection = (id: string) => setActiveSection(prev => prev === id ? null : id);

  const loadScholarships = async () => {
    setLoading(true);
    try {
      const response = await admissionsApi.getSection('scholarships');
      const sectionData = response.data;
      setSection(sectionData);
      setForm({
        navigation_title: sectionData.navigation_title ?? '',
        title: sectionData.title ?? 'Scholarships',
        summary: sectionData.summary ?? '',
        description: sectionData.description ?? '',
        sort_order: String(sectionData.sort_order ?? 0),
        is_active: sectionData.is_active,
      });
      setItems((sectionData.items ?? []).map(toEditableItem));
    } catch (error) {
      setToast({ message: error instanceof Error ? error.message : 'Unable to load scholarship section', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadScholarships();
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      setCollapsedItems(new Set(items.map((item) => item.client_id)));
    } else {
      setCollapsedItems(new Set());
    }
  }, [items]);

  useEffect(() => {
    dragStateRef.current = dragState;
  }, [dragState]);

  const stopAutoScroll = () => {
    autoScrollVelocityRef.current = 0;
    if (autoScrollFrameRef.current !== null) {
      window.cancelAnimationFrame(autoScrollFrameRef.current);
      autoScrollFrameRef.current = null;
    }
  };

  const reorderWithinList = (sourceItems: EditableScholarshipItem[], itemId: string, insertPosition: number) => {
    const listIndices = sourceItems.map((_, index) => index);
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

    return sourceItems.map((item, index) => subset[index] ?? item);
  };

  const moveDraggedItem = (itemId: string, pointerY: number) => {
    setItems((current) => {
      if (current.length < 2) {
        return current;
      }

      const activeIndex = current.findIndex((item) => item.client_id === itemId);
      if (activeIndex === -1) {
        return current;
      }

      const otherIndices = current
        .map((_, index) => index)
        .filter((index) => current[index]?.client_id !== itemId);

      let insertPosition = current.length - 1;
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

      return reorderWithinList(current, itemId, insertPosition);
    });
  };

  const syncDraggedItem = (pointerY: number) => {
    const currentDragState = dragStateRef.current;
    if (!currentDragState) {
      return;
    }

    moveDraggedItem(currentDragState.itemId, pointerY);
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

  const endDrag = () => {
    stopAutoScroll();
    setDragState(null);
  };

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

  const registerItemRef = (itemId: string) => (node: HTMLDivElement | null) => {
    if (node) {
      itemRefs.current[itemId] = node;
      return;
    }
    delete itemRefs.current[itemId];
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

  const renderDragHandle = (itemId: string, label: string) => (
    <button
      type="button"
      onPointerDown={(event) => beginDrag(itemId, 'scholarships', event)}
      className="cursor-grab rounded-xl border border-slate-200 bg-white p-3 text-slate-500 transition hover:border-slate-300 hover:text-slate-700 active:cursor-grabbing"
      aria-label={label}
    >
      <GripVertical className="h-4 w-4" />
    </button>
  );

  const updateItem = (index: number, updates: Partial<EditableScholarshipItem>) => {
    setItems((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, ...updates } : item)));
  };

  const removeItem = (index: number) => {
    setItems((current) => current.filter((_, itemIndex) => itemIndex !== index));
  };

  const addItem = () => {
    setItems((current) => [...current, createEmptyScholarshipItem()]);
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

  const validateBeforeSave = (): string | null => {
    if (!section || !form) return 'Scholarship section is still loading.';
    if (!form.title.trim()) return 'Section title is required.';
    if (!form.navigation_title.trim()) return 'Navigation title is required.';

    for (const item of items) {
      if (!item.title.trim()) {
        return 'Each scholarship item must have a title.';
      }
      if (!item.external_url.trim() && !item.currentDocumentUrl && !item.pdfFile) {
        return `Provide an external URL or upload a PDF for "${item.title}".`;
      }
    }

    return null;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!section || !form) return;

    const validationError = validateBeforeSave();
    if (validationError) {
      setToast({ message: validationError, type: 'error' });
      return;
    }

    setSaving(true);
    try {
      await admissionsApi.updateSection(section.slug, buildSectionPayload(section, form));

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

      await loadScholarships();
      setToast({ message: 'Scholarships updated successfully.', type: 'success' });
    } catch (error) {
      setToast({ message: error instanceof Error ? error.message : 'Failed to save scholarships section.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !form) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-100 border-t-[#2563EB]" />
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Loading Scholarships...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-12">
      {toast && (
        <div
          className={`rounded-2xl px-5 py-4 text-sm font-bold text-white shadow-lg ${
            toast.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
          }`}
        >
          {toast.message}
        </div>
      )}

      <PageEditorHeader
        title="Scholarships"
        description="Manage scholarship page copy, categories, tags, and linked/uploaded scholarship documents."
        onSave={handleSubmit as unknown as () => void}
        isSaving={saving}
        showBackButton={!!onBack}
        onBack={onBack}
      />

      <div className="rounded-2xl border border-slate-200/70 bg-white px-4 py-3 text-right text-xs font-bold uppercase tracking-[0.2em] text-slate-400 shadow-sm">
        <div>Slug: {section?.slug ?? 'scholarships'}</div>
        <div className="mt-1">Records: {items.length}</div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <AdminFormSection
          title="Section Settings"
          icon={<Settings className="w-5 h-5" />}
          isOpen={activeSection === 'settings'}
          onToggle={() => toggleSection('settings')}
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className={labelBase}>Navigation Title</label>
              <input id="scholarshipform-1" name="scholarshipform-1" aria-label="scholarshipform field"
                className={inputBase}
                value={form.navigation_title}
                onChange={(event) => setForm((current) => (current ? { ...current, navigation_title: event.target.value } : current))}
              />
            </div>
            <div>
              <label className={labelBase}>Page Title</label>
              <input id="scholarshipform-2" name="scholarshipform-2" aria-label="scholarshipform field"
                className={inputBase}
                value={form.title}
                onChange={(event) => setForm((current) => (current ? { ...current, title: event.target.value } : current))}
              />
            </div>
            <div>
              <label className={labelBase}>Summary</label>
              <input id="scholarshipform-3" name="scholarshipform-3" aria-label="scholarshipform field"
                className={inputBase}
                value={form.summary}
                onChange={(event) => setForm((current) => (current ? { ...current, summary: event.target.value } : current))}
              />
            </div>
            <div>
              <label className={labelBase}>Sort Order</label>
              <input id="scholarshipform-4" name="scholarshipform-4" aria-label="scholarshipform field"
                className={inputBase}
                type="number"
                min="0"
                value={form.sort_order}
                onChange={(event) => setForm((current) => (current ? { ...current, sort_order: event.target.value } : current))}
              />
            </div>
            <div className="md:col-span-2">
              <label className={labelBase}>Description</label>
              <textarea id="scholarshipform-textarea-1" name="scholarshipform-textarea-1" aria-label="scholarshipform textarea field"
                className={`${inputBase} min-h-[110px] resize-y`}
                value={form.description}
                onChange={(event) => setForm((current) => (current ? { ...current, description: event.target.value } : current))}
              />
            </div>
            <div className="md:col-span-2">
              <div className="flex flex-wrap items-center gap-6 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                <label className="inline-flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <input id="scholarshipform-5" name="scholarshipform-5" aria-label="scholarshipform field"
                    type="checkbox"
                    checked={form.is_active}
                    onChange={(event) => setForm((current) => (current ? { ...current, is_active: event.target.checked } : current))}
                  />
                  Section Active
                </label>
              </div>
            </div>
          </div>
        </AdminFormSection>

        <AdminFormSection
          title="Scholarship Items"
          icon={<List className="w-5 h-5" />}
          isOpen={activeSection === 'items'}
          onToggle={() => toggleSection('items')}
        >
          <div className="space-y-5">
            <div className="flex justify-end mb-4">
              <button
                type="button"
                onClick={addItem}
                className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-slate-800"
              >
                Add Scholarship
              </button>
            </div>

            {items.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 px-5 py-8 text-center text-sm font-semibold text-slate-400">
                No scholarships added yet.
              </div>
            ) : (
              items.map((item, index) => {
                const isCollapsed = collapsedItems.has(item.client_id);
                return (
                  <div key={item.client_id} ref={registerItemRef(item.client_id)} className="relative">
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
                              <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">Scholarship Item {index + 1}</p>
                              {item.title && <p className="mt-1 text-sm font-semibold text-slate-700">{item.title}</p>}
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
                          {!isCollapsed && <p className="mt-2 text-sm font-semibold text-slate-600">Drag to reorder scholarship display order.</p>}
                        </div>
                        {renderDragHandle(item.client_id, `Drag to reorder ${item.title || 'scholarship item'}`)}
                      </div>

                      {!isCollapsed && (
                        <>
                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <label className={labelBase}>Title</label>
                              <input id="scholarshipform-6" name="scholarshipform-6" aria-label="scholarshipform field" className={inputBase} value={item.title} onChange={(event) => updateItem(index, { title: event.target.value })} placeholder="Scholarship title" />
                            </div>
                            <div>
                              <label className={labelBase}>Category</label>
                              <input id="scholarshipform-7" name="scholarshipform-7" aria-label="scholarshipform field" className={inputBase} value={item.category} onChange={(event) => updateItem(index, { category: event.target.value })} placeholder="e.g. Government / Institutional" />
                            </div>
                            <div>
                              <label className={labelBase}>Academic Year</label>
                              <input id="scholarshipform-8" name="scholarshipform-8" aria-label="scholarshipform field" className={inputBase} value={item.academic_year} onChange={(event) => updateItem(index, { academic_year: event.target.value })} placeholder="2025-26" />
                            </div>
                            <div>
                              <label className={labelBase}>Tag</label>
                              <input id="scholarshipform-9" name="scholarshipform-9" aria-label="scholarshipform field" className={inputBase} value={item.tag} onChange={(event) => updateItem(index, { tag: event.target.value })} placeholder="e.g. EBC, OBC, SC, ST" />
                            </div>
                            <div>
                              <label className={labelBase}>Badge</label>
                              <input id="scholarshipform-10" name="scholarshipform-10" aria-label="scholarshipform field" className={inputBase} value={item.badge} onChange={(event) => updateItem(index, { badge: event.target.value })} placeholder="e.g. GOV / INST" />
                            </div>
                            <div>
                              <label className={labelBase}>Document URL</label>
                              <input id="scholarshipform-11" name="scholarshipform-11" aria-label="scholarshipform field" className={inputBase} value={item.external_url} onChange={(event) => updateItem(index, { external_url: event.target.value })} placeholder="https://..." />
                            </div>
                            <div className="md:col-span-2">
                              <label className={labelBase}>Description</label>
                              <textarea id="scholarshipform-textarea-2" name="scholarshipform-textarea-2" aria-label="scholarshipform textarea field" className={`${inputBase} min-h-[110px] resize-y`} value={item.description} onChange={(event) => updateItem(index, { description: event.target.value })} />
                            </div>
                            <div className="md:col-span-2">
                              <label className={labelBase}>Upload PDF</label>
                              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-4">
                                <input id="scholarshipform-12" name="scholarshipform-12" aria-label="scholarshipform field"
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
                            <div className="md:col-span-2">
                              <label className="inline-flex items-center gap-3 text-sm font-semibold text-slate-700">
                                <input id="scholarshipform-13" name="scholarshipform-13" aria-label="scholarshipform field" type="checkbox" checked={item.is_active} onChange={(event) => updateItem(index, { is_active: event.target.checked })} />
                                Item Active
                              </label>
                            </div>
                          </div>

                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={() => removeItem(index)}
                              className="rounded-xl border border-red-200 px-4 py-3 text-xs font-black uppercase tracking-[0.18em] text-red-600 transition hover:bg-red-50"
                            >
                              Remove
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </AdminFormSection>


      </form>
    </div>
  );
};

export default ScholarshipForm;
