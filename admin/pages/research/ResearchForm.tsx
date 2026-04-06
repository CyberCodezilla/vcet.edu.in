import React, { useEffect, useMemo, useState } from 'react';
import { pagesApi } from '../../api/pagesApi';
import type { ResearchData } from '../../types';
import { resolveUploadedAssetUrl } from '../../../utils/uploadedAssets';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useListSync } from '../../hooks/useListSync';
import AdminFormSection from '../../components/AdminFormSection';

const Toast: React.FC<{ message: string; type: 'success' | 'error'; onClose: () => void }> = ({ message, type, onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl text-sm font-bold animate-slide-up ${type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
      {type === 'success' ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
      )}
      {message}
    </div>
  );
};



const inputBase = 'w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#2563EB] rounded-2xl px-5 py-3.5 text-sm font-bold transition-all outline-none';
const labelBase = 'block text-xs font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1';

const filePreviewCache = new WeakMap<File, string>();
const getFilePreviewUrl = (file: File) => {
  const cached = filePreviewCache.get(file);
  if (cached) return cached;
  const url = URL.createObjectURL(file);
  filePreviewCache.set(file, url);
  return url;
};

const resolveMediaUrl = (value: any): string | null => {
  if (!value) return null;
  if (value instanceof File) return getFilePreviewUrl(value);
  if (typeof value === 'string') return resolveUploadedAssetUrl(value) || value;
  if (typeof value === 'object') {
    const raw = value.url || value.fileUrl || value.imageUrl || value.path;
    if (typeof raw === 'string') return resolveUploadedAssetUrl(raw) || raw;
  }
  return null;
};

const LimitedInput: React.FC<{
  label: string;
  value: string;
  max: number;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: 'text' | 'textarea';
  exactLength?: number;
}> = ({ label, value, max, onChange, placeholder, type = 'text', exactLength }) => {
  const invalidExact = exactLength ? value.length > 0 && value.length !== exactLength : false;

  return (
    <div className="relative">
      <label className={labelBase}>{label}</label>
      {type === 'text' ? (
        <input id="researchform-1" name="researchform-1" aria-label="researchform field"
          value={value || ''}
          maxLength={max}
          onChange={e => onChange(e.target.value)}
          className={inputBase}
          placeholder={placeholder}
        />
      ) : (
        <textarea id="researchform-textarea-2" name="researchform-textarea-2" aria-label="researchform textarea field"
          value={value || ''}
          maxLength={max}
          onChange={e => onChange(e.target.value)}
          className={`${inputBase} min-h-24 resize-y`}
          placeholder={placeholder}
        />
      )}
      <div className={`absolute bottom-3 right-4 text-[10px] font-bold ${invalidExact ? 'text-red-500' : 'text-slate-400'}`}>
        {value?.length || 0} / {max}{exactLength ? ` (exact ${exactLength})` : ''}
      </div>
    </div>
  );
};

const CountBadge: React.FC<{ used: number; max: number; exact?: boolean }> = ({ used, max, exact }) => {
  const valid = exact ? used === max : used <= max;
  return (
    <div className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-wider ${valid ? 'bg-slate-50 text-slate-600 border-slate-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
      {used}/{max} {exact ? 'Required' : 'Used'}
    </div>
  );
};

/* ── DnD Hook ─────────────────────────────────────────────────────────────── */
/* ── DnD Hook ─────────────────────────────────────────────────────────────── */

const SortableLinkItem = ({ id, item, idx, labelMax, urlLabel, allowFileUpload, exactCount, del, upd }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 1,
    position: 'relative' as const,
  };

  return (
    <div ref={setNodeRef} style={style} className="p-5 bg-slate-50 border border-slate-100 rounded-3xl flex gap-4 group shadow-sm transition-all">
      <div className="flex flex-col pt-8 pr-2 border-r border-slate-200 cursor-grab active:cursor-grabbing text-slate-400 hover:text-blue-500" {...attributes} {...listeners}>
        <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 8h16M4 16h16"/></svg>
      </div>
      <div className="grid md:grid-cols-2 gap-4 grow">
        <LimitedInput
          label="Label"
          value={item.label || item.title || ''}
          max={labelMax}
          placeholder="Button / Link label"
          onChange={v => upd(idx, { label: v, title: v })}
        />
        <LimitedInput
          label={urlLabel}
          value={item.url || item.fileUrl || ''}
          max={280}
          placeholder="https://..."
          onChange={v => upd(idx, { url: v, fileUrl: v })}
        />
        {allowFileUpload && (
          <div className="space-y-2">
            <label className={labelBase}>Upload PDF</label>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <input id={`researchform-pdf-${idx}`} name={`researchform-pdf-${idx}`} aria-label="researchform field"
                type="file"
                accept="application/pdf"
                className="text-sm font-semibold text-slate-600 file:mr-3 file:rounded-xl file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-blue-700"
                onChange={e => {
                  const file = e.target.files?.[0] || null;
                  if (file) {
                    upd(idx, { file, fileName: file.name, url: '', fileUrl: '' });
                  }
                }}
              />
              <div className="mt-2 text-xs text-slate-500 break-all">
                {item.file instanceof File
                  ? `Selected: ${item.file.name}`
                  : (item.fileName || item.fileUrl || item.url || 'No PDF selected')}
              </div>
              {(item.file || item.fileUrl || item.url) && (
                <div className="mt-3 flex gap-2">
                  <a
                    href={item.file instanceof File ? getFilePreviewUrl(item.file) : (resolveUploadedAssetUrl(item.fileUrl || item.url || '') || item.fileUrl || item.url || '#')}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-black uppercase tracking-wider hover:bg-blue-100"
                  >
                    Preview PDF
                  </a>
                  <button
                    type="button"
                    onClick={() => upd(idx, { file: null, fileName: null, url: '', fileUrl: '' })}
                    className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 text-xs font-black uppercase tracking-wider hover:bg-red-100"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {!exactCount && (
        <button onClick={() => del(idx)} className="self-start mt-8 p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      )}
    </div>
  );
};

const LinkListManager: React.FC<{
  title: string;
  items: any[];
  onChange: (v: any[]) => void;
  maxItems: number;
  exactCount?: boolean;
  labelMax: number;
  urlLabel?: string;
  allowFileUpload?: boolean;
}> = ({ title, items = [], onChange, maxItems, exactCount, labelMax, urlLabel = 'URL', allowFileUpload = false }) => {
  const add = () => {
    if (items.length < maxItems) onChange([...items, { label: '', url: '' }]);
  };
  const del = (idx: number) => {
    if (exactCount) return;
    onChange(items.filter((_: any, i: number) => i !== idx));
  };
  const upd = (idx: number, patch: any) => {
    const next = [...items];
    next[idx] = { ...next[idx], ...patch };
    onChange(next);
  };

  const { ids, handleMove, handleRemove } = useListSync(items);
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

  const wrappedDel = (idx: number) => {
    if (exactCount) return;
    handleRemove(idx);
    del(idx);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = ids.findIndex(id => id === active.id);
      const newIndex = ids.findIndex(id => id === over.id);
      handleMove(oldIndex, newIndex);
      onChange(arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-black uppercase tracking-wider text-slate-500">{title}</p>
        <CountBadge used={items.length} max={maxItems} exact={exactCount} />
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
          {items.map((item, idx) => (
            <SortableLinkItem key={ids[idx]} id={ids[idx]} item={item} idx={idx} labelMax={labelMax} urlLabel={urlLabel} allowFileUpload={allowFileUpload} exactCount={exactCount} del={wrappedDel} upd={upd} />
          ))}
        </SortableContext>
      </DndContext>

      {items.length < maxItems && (
        <button onClick={add} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-sm font-bold text-slate-400 hover:border-blue-500 hover:text-blue-500 transition-all">
          Add Item
        </button>
      )}
    </div>
  );
};

const SortablePhDItem = ({ id, item, idx, countRef, del, upd }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 1,
    position: 'relative' as const,
  };

  return (
    <div ref={setNodeRef} style={style} className="grid grid-cols-12 gap-4 items-center group p-4 bg-slate-50 border border-slate-100 rounded-2xl transition-all shadow-sm">
      <div className="col-span-1 flex items-center justify-center cursor-grab active:cursor-grabbing text-slate-400 hover:text-blue-500" {...attributes} {...listeners}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 8h16M4 16h16"/></svg>
      </div>
      <div className="col-span-7">
        <LimitedInput
          label="Department"
          value={item.department || ''}
          max={36}
          placeholder="Department name"
          onChange={v => upd(idx, { department: v })}
        />
      </div>
      <div className="col-span-3">
        <label className={labelBase}>Count</label>
        <input id={`researchform-phd-${idx}`} name={`researchform-phd-${idx}`} aria-label="researchform field"
          type="number"
          min={0}
          value={item.count ?? 0}
          onChange={e => upd(idx, { count: Number(e.target.value) || 0 })}
          className={`${inputBase} text-center`}
        />
      </div>
      <div className="col-span-1 pt-7">
        <button onClick={() => del(idx)} className="text-red-300 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
    </div>
  );
};

const PhDManager: React.FC<{ title: string; items: any[]; onChange: (v: any[]) => void; maxItems: number }> = ({ title, items = [], onChange, maxItems }) => {
  const add = () => { if (items.length < maxItems) onChange([...items, { department: '', count: 0 }]); };
  const del = (idx: number) => onChange(items.filter((_: any, i: number) => i !== idx));
  const upd = (idx: number, patch: any) => {
    const next = [...items];
    next[idx] = { ...next[idx], ...patch };
    onChange(next);
  };
  const total = items.reduce((acc: number, it: any) => acc + (Number(it.count) || 0), 0);

  const { ids, handleMove, handleRemove } = useListSync(items);
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

  const wrappedDel = (idx: number) => {
    handleRemove(idx);
    del(idx);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = ids.findIndex(id => id === active.id);
      const newIndex = ids.findIndex(id => id === over.id);
      handleMove(oldIndex, newIndex);
      onChange(arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-black uppercase tracking-wider text-slate-500">{title}</p>
        <div className="flex items-center gap-3">
          <CountBadge used={items.length} max={maxItems} />
          <div className="text-[10px] font-black uppercase text-slate-900 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">Total: <span className="text-[#2563EB] text-xs ml-1">{total}</span></div>
        </div>
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
          {items.map((item, idx) => (
            <SortablePhDItem key={ids[idx]} id={ids[idx]} item={item} idx={idx} del={wrappedDel} upd={upd} />
          ))}
        </SortableContext>
      </DndContext>
      {items.length < maxItems && (
        <button onClick={add} className="text-[10px] font-black uppercase text-[#2563EB] hover:underline">+ Add Department</button>
      )}
    </div>
  );
};

const SortableTableItem = ({ id, item, idx, fields, resolveMediaUrl, getFilePreviewUrl, resolveUploadedAssetUrl, del, upd }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 1,
    position: 'relative' as const,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex gap-4 p-6 bg-slate-50 border border-slate-100 rounded-3xl group shadow-sm transition-all">
      <div className="flex flex-col pt-8 pr-2 border-r border-slate-200 cursor-grab active:cursor-grabbing text-slate-400 hover:text-blue-500" {...attributes} {...listeners}>
        <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 8h16M4 16h16"/></svg>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 grow">
        {fields.map((f: any) => (
          <div key={f.key}>
            {f.type === 'select' ? (
              <div>
                <label className={labelBase}>{f.label}</label>
                <select id={`researchform-select-${idx}-${f.key}`} name={`researchform-select-${idx}-${f.key}`} aria-label="researchform select field" value={item[f.key] || ''} onChange={e => upd(idx, { [f.key]: e.target.value })} className={inputBase}>
                  {(f.options || []).map((opt: string) => <option key={opt} value={opt}>{opt || 'Blank'}</option>)}
                </select>
              </div>
            ) : f.type === 'file-image' ? (
              <div>
                <label className={labelBase}>{f.label}</label>
                <div className="rounded-2xl border border-slate-200 bg-white p-3 space-y-3">
                  <div className="relative aspect-16/10 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                    <input id={`researchform-img-${idx}`} name={`researchform-img-${idx}`} aria-label="researchform field"
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      onChange={e => {
                        const file = e.target.files?.[0] || null;
                        if (file) upd(idx, { [f.key]: file, imageUrl: file.name });
                      }}
                    />
                    {resolveMediaUrl(item[f.key]) || resolveMediaUrl(item.imageUrl) ? (
                      <img
                        src={resolveMediaUrl(item[f.key]) || resolveMediaUrl(item.imageUrl) || ''}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs font-black uppercase tracking-wider text-slate-400">
                        Click to upload
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 break-all">
                    {item[f.key] instanceof File ? item[f.key].name : (item.fileName || item.imageUrl || 'No image selected')}
                  </div>
                  {(item[f.key] || item.imageUrl) && (
                    <button
                      type="button"
                      onClick={() => upd(idx, { [f.key]: null, imageUrl: '' })}
                      className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 text-xs font-black uppercase tracking-wider hover:bg-red-100"
                    >
                      Remove Image
                    </button>
                  )}
                </div>
              </div>
            ) : f.type === 'file-pdf' ? (
              <div>
                <label className={labelBase}>{f.label}</label>
                <div className="rounded-2xl border border-slate-200 bg-white p-3 space-y-3">
                  <input id={`researchform-pdf-${idx}`} name={`researchform-pdf-${idx}`} aria-label="researchform field"
                    type="file"
                    accept="application/pdf"
                    className="text-sm font-semibold text-slate-600 file:mr-3 file:rounded-xl file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-blue-700"
                    onChange={e => {
                      const file = e.target.files?.[0] || null;
                      if (file) upd(idx, { [f.key]: file, fileName: file.name, fileUrl: '' });
                    }}
                  />
                  <div className="text-xs text-slate-500 break-all">
                    {item[f.key] instanceof File ? item[f.key].name : (item.fileName || item.fileUrl || item.url || 'No PDF selected')}
                  </div>
                  {(item[f.key] || item.fileUrl || item.url) && (
                    <div className="flex gap-2">
                      <a
                        href={item[f.key] instanceof File ? getFilePreviewUrl(item[f.key]) : (resolveUploadedAssetUrl(item.fileUrl || item.url || '') || item.fileUrl || item.url || '#')}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-black uppercase tracking-wider hover:bg-blue-100"
                      >
                        Preview PDF
                      </a>
                      <button
                        type="button"
                        onClick={() => upd(idx, { [f.key]: null, fileName: null, fileUrl: '', url: '' })}
                        className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 text-xs font-black uppercase tracking-wider hover:bg-red-100"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <LimitedInput
                label={f.label}
                value={item[f.key] || ''}
                max={f.max}
                type={f.type || 'text'}
                exactLength={f.exactLength}
                placeholder={f.placeholder}
                onChange={v => upd(idx, { [f.key]: v })}
              />
            )}
          </div>
        ))}
      </div>
      <button onClick={() => del(idx)} className="self-start mt-8 p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
  );
};

const TableManager: React.FC<{
  items: any[];
  onChange: (v: any[]) => void;
  maxItems: number;
  title: string;
  fields: Array<{ key: string; label: string; max: number; placeholder?: string; exactLength?: number; type?: 'text' | 'textarea' | 'select' | 'file-image' | 'file-pdf'; options?: string[] }>;
}> = ({ items = [], onChange, maxItems, title, fields }) => {
  const add = () => {
    if (items.length < maxItems) {
      const row: any = {};
      fields.forEach(f => {
        if (f.type === 'select') row[f.key] = f.options?.[0] || '';
        else if (f.type === 'file-image' || f.type === 'file-pdf') row[f.key] = null;
        else row[f.key] = '';
      });
      onChange([...items, row]);
    }
  };
  const del = (idx: number) => onChange(items.filter((_: any, i: number) => i !== idx));
  const upd = (idx: number, patch: any) => {
    const next = [...items];
    next[idx] = { ...next[idx], ...patch };
    onChange(next);
  };

  const { ids, handleMove, handleRemove } = useListSync(items);
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

  const wrappedDel = (idx: number) => {
    handleRemove(idx);
    del(idx);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = ids.findIndex(id => id === active.id);
      const newIndex = ids.findIndex(id => id === over.id);
      handleMove(oldIndex, newIndex);
      onChange(arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-black uppercase tracking-wider text-slate-500">{title}</p>
        <CountBadge used={items.length} max={maxItems} />
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
          {items.map((item, idx) => (
             <SortableTableItem key={ids[idx]} id={ids[idx]} item={item} idx={idx} fields={fields} resolveMediaUrl={resolveMediaUrl} getFilePreviewUrl={getFilePreviewUrl} resolveUploadedAssetUrl={resolveUploadedAssetUrl} del={wrappedDel} upd={upd} />
          ))}
        </SortableContext>
      </DndContext>
      {items.length < maxItems && (
        <button onClick={add} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-sm font-bold text-slate-400 hover:border-blue-500 hover:text-blue-500 transition-all">Add Row</button>
      )}
    </div>
  );
};

const ensureArray = <T,>(value: any, fallback: T[] = []): T[] => Array.isArray(value) ? value : fallback;

const normalizePayload = (slug: string, source: any) => {
  const s = source || {};
  if (slug === 'research-intro') {
    const hubCards = ensureArray(s.hubCards, []).slice(0, 4);
    while (hubCards.length < 4) hubCards.push({ title: '', description: '' });

    const quickLinks = ensureArray(s.quickLinks, []).slice(0, 6).map((l: any) => ({ label: l.label || l.title || '', url: l.url || '' }));
    while (quickLinks.length < 6) quickLinks.push({ label: '', url: '' });

    return {
      ...s,
      hubCards,
      objectives: ensureArray(s.objectives, []).slice(0, 6),
      phdPursuing: ensureArray(s.phdPursuing, []).slice(0, 10),
      phdHolders: ensureArray(s.phdHolders, []).slice(0, 10),
      dean: { name: s.dean?.name || '', designation: s.dean?.designation || '', researchInterest: s.dean?.researchInterest || '' },
      quickLinks,
    };
  }

  if (slug === 'funded-research') {
    return {
      ...s,
      funding: ensureArray(s.funding, []).slice(0, 10),
      fundingReport: { label: s.fundingReport?.label || s.fundingReport?.title || 'Funded Research Report', url: s.fundingReport?.url || s.fundingReport?.fileUrl || '' }
    };
  }

  if (slug === 'publications') {
    const publicationPdfs = ensureArray(s.publicationPdfs || s.documents, []).slice(0, 3).map((d: any) => ({ label: d.label || d.title || '', url: d.url || d.fileUrl || '' }));
    while (publicationPdfs.length < 3) publicationPdfs.push({ label: '', url: '' });

    return {
      ...s,
      books: ensureArray(s.books, []).slice(0, 8),
      journals: ensureArray(s.journals, []).slice(0, 6),
      publicationPdfs,
    };
  }

  if (slug === 'patents') {
    return {
      ...s,
      patents: ensureArray(s.patents, []).slice(0, 20),
      patentYears: ensureArray(s.patentYears, []).slice(0, 6),
    };
  }

  if (slug === 'consultancy') {
    return {
      ...s,
      consultancyRevenue: ensureArray(s.consultancyRevenue, []).slice(0, 10),
      consultancyReport: { label: s.consultancyReport?.label || s.consultancyReport?.title || 'Consultancy Report', url: s.consultancyReport?.url || s.consultancyReport?.fileUrl || '' },
      industryPartners: ensureArray(s.industryPartners, []).slice(0, 9).map((p: any) => ({
        name: p.name || p.organization || '',
        tagline: p.tagline || '',
        description: p.description || '',
        tags: ensureArray(p.tags, []).slice(0, 3),
        imageUrl: p.imageUrl || ''
      })),
    };
  }

  if (slug === 'research-facility') {
    return {
      ...s,
      facilities: ensureArray(s.facilities, []).slice(0, 6).map((f: any) => ({
        title: f.title || 'Facility',
        description: f.description || '',
        imageUrl: f.imageUrl || ''
      })),
    };
  }

  if (slug === 'iic') {
    return {
      ...s,
      iicAchievementsDetailed: ensureArray(s.iicAchievementsDetailed, []).slice(0, 4),
      iicGalleryDetailed: ensureArray(s.iicGalleryDetailed, []).slice(0, 12),
      iicCommitteeGroups: {
        staff: ensureArray(s.iicCommitteeGroups?.staff, []).slice(0, 12),
        expert: ensureArray(s.iicCommitteeGroups?.expert, []).slice(0, 8),
        support: ensureArray(s.iicCommitteeGroups?.support, []).slice(0, 6),
        student: ensureArray(s.iicCommitteeGroups?.student, []).slice(0, 12),
      },
      iicReportsDetailed: ensureArray(s.iicReportsDetailed || s.iicReports, []).slice(0, 4).map((r: any) => ({ label: r.label || r.year || '', url: r.url || r.fileUrl || '' })),
    };
  }

  if (slug === 'nirf') {
    return {
      ...s,
      nirfCards: ensureArray(s.nirfCards || s.documents, []).slice(0, 6).map((c: any) => ({ title: c.title || '', year: c.year || '', note: c.note || '', url: c.url || c.fileUrl || '' })),
    };
  }

  if (slug === 'downloads') {
    const topButtons = ensureArray(s.topButtons, []).slice(0, 4);
    const leftLinks = ensureArray(s.leftLinks, []).slice(0, 6);
    const rightLinks = ensureArray(s.rightLinks, []).slice(0, 6);
    return {
      ...s,
      topButtons,
      leftLinks,
      rightLinks,
    };
  }

  if (slug === 'research-conventions' || slug === 'research-policy') {
    return {
      ...s,
      documents: ensureArray(s.documents, []).map((d: any) => ({
        title: d.title || d.label || '',
        fileUrl: d.fileUrl || d.url || '',
        fileName: d.fileName || '',
      })),
    };
  }

  return s;
};

interface ResearchFormProps {
  slug: string;
  onBack: () => void;
}

const ResearchForm: React.FC<ResearchFormProps> = ({ slug, onBack }) => {
  const [data, setData] = useState<ResearchData | null>(null);
  const [payload, setPayload] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Initialize first section as open when data is loaded/slug changed
  useEffect(() => {
    setActiveSection(null); // Reset first
  }, [slug]);

  useEffect(() => {
    if (!loading && !activeSection) {
      // Set default open section based on slug
      if (slug === 'research-intro') setActiveSection('hub-cards');
      else if (slug === 'funded-research') setActiveSection('funding-rows');
      else if (slug === 'publications') setActiveSection('books');
      else if (slug === 'patents') setActiveSection('patents-list');
      else if (slug === 'consultancy') setActiveSection('revenue');
      else if (slug === 'research-facility') setActiveSection('facilities-list');
      else if (slug === 'iic') setActiveSection('achievements');
      else if (slug === 'nirf') setActiveSection('nirf-cards');
      else if (slug === 'downloads') setActiveSection('top-buttons');
      else if (slug === 'research-conventions' || slug === 'research-policy') setActiveSection('documents-list');
    }
  }, [loading, slug, activeSection]);

  const toggleSection = (id: string) => setActiveSection(prev => prev === id ? null : id);

  useEffect(() => {
    setLoading(true);
    pagesApi.research.get(slug).then(res => {
      setData(res.data);
      setPayload(normalizePayload(slug, res.data));
    }).finally(() => setLoading(false));
  }, [slug]);

  const exactErrors = useMemo(() => {
    const errors: string[] = [];
    if (slug === 'research-intro') {
      if ((payload.hubCards || []).length !== 4) errors.push('Research Intro requires exactly 4 hub cards.');
      if ((payload.quickLinks || []).length !== 6) errors.push('Research Intro requires exactly 6 quick links.');
    }
    if (slug === 'publications' && (payload.publicationPdfs || []).length !== 3) {
      errors.push('Publications requires exactly 3 publication PDF links.');
    }
    return errors;
  }, [payload, slug]);

  const handleSubmit = async () => {
    if (exactErrors.length > 0) {
      setToast({ message: exactErrors[0], type: 'error' });
      return;
    }

    setSaving(true);
    try {
      await pagesApi.research.update(slug, payload);
      setToast({ message: 'Saved successfully', type: 'success' });
    } catch {
      setToast({ message: 'Error saving data', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-12 text-center text-slate-400 font-bold animate-pulse">LOADING...</div>;

  const update = (key: string, value: any) => setPayload((prev: any) => ({ ...prev, [key]: value }));

  const renderContent = () => {
    switch (slug) {
      case 'research-intro':
        return (
          <div className="space-y-8">
            <AdminFormSection 
              title="R&D Hub Cards" 
              icon="🧭" 
              subtitle="Exactly 4 cards"
              isOpen={activeSection === 'hub-cards'}
              onToggle={() => toggleSection('hub-cards')}
            >
              <TableManager
                title="Hub Cards"
                items={payload.hubCards}
                maxItems={4}
                onChange={v => update('hubCards', v)}
                fields={[
                  { key: 'title', label: 'Card Title', max: 32, placeholder: 'Card title' },
                  { key: 'description', label: 'Card Description', max: 150, type: 'textarea', placeholder: 'Card description' },
                ]}
              />
            </AdminFormSection>

            <AdminFormSection 
              title="Objectives" 
              icon="🎯" 
              subtitle="Max 6 items"
              isOpen={activeSection === 'objectives'}
              onToggle={() => toggleSection('objectives')}
            >
              <TableManager
                title="Objective Items"
                items={(payload.objectives || []).map((text: string) => ({ text }))}
                maxItems={6}
                onChange={v => update('objectives', v.map((r: any) => r.text))}
                fields={[{ key: 'text', label: 'Objective Text', max: 150, type: 'textarea', placeholder: 'Objective statement' }]}
              />
            </AdminFormSection>

            <AdminFormSection 
              title="PhD Dataset - Pursuing" 
              icon="👨‍🎓" 
              subtitle="Max 10 rows"
              isOpen={activeSection === 'phd-pursuing'}
              onToggle={() => toggleSection('phd-pursuing')}
            >
              <PhDManager title="Pursuing" items={payload.phdPursuing} maxItems={10} onChange={v => update('phdPursuing', v)} />
            </AdminFormSection>

            <AdminFormSection 
              title="PhD Dataset - Holders" 
              icon="🎓" 
              subtitle="Max 10 rows"
              isOpen={activeSection === 'phd-holders'}
              onToggle={() => toggleSection('phd-holders')}
            >
              <PhDManager title="Holders" items={payload.phdHolders} maxItems={10} onChange={v => update('phdHolders', v)} />
            </AdminFormSection>

            <AdminFormSection 
              title="Dean of Research" 
              icon="🧑‍🏫" 
              subtitle="Exactly 1 card"
              isOpen={activeSection === 'dean'}
              onToggle={() => toggleSection('dean')}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <LimitedInput label="Dean Name" value={payload.dean?.name || ''} max={40} onChange={v => update('dean', { ...payload.dean, name: v })} />
                <LimitedInput label="Designation" value={payload.dean?.designation || ''} max={60} onChange={v => update('dean', { ...payload.dean, designation: v })} />
              </div>
              <LimitedInput label="Research Interest" value={payload.dean?.researchInterest || ''} max={140} type="textarea" onChange={v => update('dean', { ...payload.dean, researchInterest: v })} />
            </AdminFormSection>

            <AdminFormSection 
              title="Quick Links" 
              icon="🔗" 
              subtitle="Exactly 6 links"
              isOpen={activeSection === 'quick-links'}
              onToggle={() => toggleSection('quick-links')}
            >
              <LinkListManager title="Quick Link List" items={payload.quickLinks} onChange={v => update('quickLinks', v)} maxItems={6} exactCount labelMax={26} />
            </AdminFormSection>
          </div>
        );

      case 'funded-research':
        return (
          <div className="space-y-8">
            <AdminFormSection 
              title="Funding Rows" 
              icon="💰" 
              subtitle="Max 10 rows"
              isOpen={activeSection === 'funding-rows'}
              onToggle={() => toggleSection('funding-rows')}
            >
              <TableManager
                title="Year-wise Funding"
                items={payload.funding}
                maxItems={10}
                onChange={v => update('funding', v)}
                fields={[
                  { key: 'year', label: 'Year', max: 9, placeholder: 'e.g. 2023-24' },
                  { key: 'amount', label: 'Amount (Lakhs)', max: 6, placeholder: 'e.g. 13.84' },
                ]}
              />
            </AdminFormSection>

            <AdminFormSection 
              title="Funding Report PDF" 
              icon="📄" 
              subtitle="Exactly 1 link"
              isOpen={activeSection === 'funding-report'}
              onToggle={() => toggleSection('funding-report')}
            >
              <LinkListManager title="Funding Report" items={[payload.fundingReport]} onChange={v => update('fundingReport', v[0] || { label: '', url: '' })} maxItems={1} exactCount labelMax={40} urlLabel="PDF URL (optional)" allowFileUpload />
            </AdminFormSection>
          </div>
        );

      case 'publications':
        return (
          <div className="space-y-8">
            <AdminFormSection 
              title="Books by Year" 
              icon="📚" 
              subtitle="Max 8 rows"
              isOpen={activeSection === 'books'}
              onToggle={() => toggleSection('books')}
            >
              <TableManager
                title="Books Table"
                items={payload.books}
                maxItems={8}
                onChange={v => update('books', v)}
                fields={[
                  { key: 'year', label: 'Year', max: 9, placeholder: 'e.g. 2023-24' },
                  { key: 'count', label: 'Count', max: 3, placeholder: 'e.g. 24' },
                ]}
              />
            </AdminFormSection>

            <AdminFormSection 
              title="Journal / Conference by Year" 
              icon="📰" 
              subtitle="Max 6 rows"
              isOpen={activeSection === 'journals'}
              onToggle={() => toggleSection('journals')}
            >
              <TableManager
                title="Papers Table"
                items={payload.journals}
                maxItems={6}
                onChange={v => update('journals', v)}
                fields={[
                  { key: 'year', label: 'Year', max: 4, exactLength: 4, placeholder: '2023' },
                  { key: 'journalCount', label: 'Journal Count', max: 3, placeholder: '6' },
                  { key: 'conferenceCount', label: 'Conference Count', max: 3, placeholder: '47' },
                ]}
              />
            </AdminFormSection>

            <AdminFormSection 
              title="Publication PDFs" 
              icon="📁" 
              subtitle="Exactly 3 links"
              isOpen={activeSection === 'publication-pdfs'}
              onToggle={() => toggleSection('publication-pdfs')}
            >
              <LinkListManager title="Books / Conference / Journal PDFs" items={payload.publicationPdfs} onChange={v => update('publicationPdfs', v)} maxItems={3} exactCount labelMax={50} urlLabel="PDF URL (optional)" allowFileUpload />
            </AdminFormSection>
          </div>
        );

      case 'patents':
        return (
          <div className="space-y-8">
            <AdminFormSection 
              title="Patent Records" 
              icon="💡" 
              subtitle="Max 20 rows"
              isOpen={activeSection === 'patents-list'}
              onToggle={() => toggleSection('patents-list')}
            >
              <TableManager
                title="Patents Table"
                items={payload.patents}
                maxItems={20}
                onChange={v => update('patents', v)}
                fields={[
                  { key: 'sno', label: 'Sr No.', max: 5, placeholder: '1' },
                  { key: 'names', label: 'Faculty Name(s)', max: 90, placeholder: 'Inventor names' },
                  { key: 'department', label: 'Department', max: 60, placeholder: 'Department name' },
                  { key: 'title', label: 'Patent Title', max: 120, type: 'textarea', placeholder: 'Patent title' },
                  { key: 'office', label: 'Office', max: 45, placeholder: 'Patent office' },
                  { key: 'year', label: 'Year', max: 4, exactLength: 4, placeholder: '2023' },
                  { key: 'appNo', label: 'Application No.', max: 30, placeholder: 'Application number' },
                  { key: 'status', label: 'Status', max: 40, placeholder: 'Published / Granted' },
                ]}
              />
            </AdminFormSection>

            <AdminFormSection 
              title="Year Filter Values" 
              icon="🗂️" 
              subtitle="Max 6 values"
              isOpen={activeSection === 'patent-years'}
              onToggle={() => toggleSection('patent-years')}
            >
              <TableManager
                title="Year Filters"
                items={(payload.patentYears || []).map((y: string) => ({ year: y }))}
                maxItems={6}
                onChange={v => update('patentYears', v.map((r: any) => r.year))}
                fields={[{ key: 'year', label: 'Year', max: 4, exactLength: 4, placeholder: '2023' }]}
              />
            </AdminFormSection>
          </div>
        );

      case 'consultancy':
        return (
          <div className="space-y-8">
            <AdminFormSection 
              title="Revenue Rows" 
              icon="📈" 
              subtitle="Max 10 rows"
              isOpen={activeSection === 'revenue'}
              onToggle={() => toggleSection('revenue')}
            >
              <TableManager
                title="Consultancy Revenue"
                items={payload.consultancyRevenue}
                maxItems={10}
                onChange={v => update('consultancyRevenue', v)}
                fields={[
                  { key: 'year', label: 'Year', max: 7, placeholder: "'23-24" },
                  { key: 'value', label: 'Value', max: 5, placeholder: '2.72' },
                  { key: 'note', label: 'Note', max: 6, type: 'select', options: ['', 'Peak', 'Lowest'] },
                ]}
              />
            </AdminFormSection>

            <AdminFormSection 
              title="Consultancy PDF" 
              icon="📄" 
              subtitle="Exactly 1 link"
              isOpen={activeSection === 'consultancy-report'}
              onToggle={() => toggleSection('consultancy-report')}
            >
              <LinkListManager title="Consultancy Report" items={[payload.consultancyReport]} onChange={v => update('consultancyReport', v[0] || { label: '', url: '' })} maxItems={1} exactCount labelMax={40} urlLabel="PDF URL (optional)" allowFileUpload />
            </AdminFormSection>

            <AdminFormSection 
              title="Industry Partners" 
              icon="🤝" 
              subtitle="Max 9 partners"
              isOpen={activeSection === 'partners'}
              onToggle={() => toggleSection('partners')}
            >
              <div className="space-y-4">
                <div className="flex justify-end">
                  <CountBadge used={(payload.industryPartners || []).length} max={9} />
                </div>
                {(payload.industryPartners || []).map((partner: any, idx: number) => (
                  <div key={idx} className="p-6 bg-slate-50 border border-slate-100 rounded-3xl space-y-4 group">
                    <div className="grid md:grid-cols-2 gap-4">
                      <LimitedInput label="Partner Name" value={partner.name || ''} max={42} onChange={v => {
                        const next = [...payload.industryPartners];
                        next[idx] = { ...next[idx], name: v };
                        update('industryPartners', next);
                      }} />
                      <LimitedInput label="Tagline" value={partner.tagline || ''} max={70} onChange={v => {
                        const next = [...payload.industryPartners];
                        next[idx] = { ...next[idx], tagline: v };
                        update('industryPartners', next);
                      }} />
                    </div>
                    <LimitedInput label="Description" value={partner.description || ''} max={180} type="textarea" onChange={v => {
                      const next = [...payload.industryPartners];
                      next[idx] = { ...next[idx], description: v };
                      update('industryPartners', next);
                    }} />
                    <div className="space-y-2">
                      <label className={labelBase}>Partner Image</label>
                      <div className="rounded-2xl border border-slate-200 bg-white p-3 space-y-3">
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                          <input id="researchform-6" name="researchform-6" aria-label="researchform field"
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            onChange={e => {
                              const file = e.target.files?.[0] || null;
                              if (!file) return;
                              const next = [...payload.industryPartners];
                              next[idx] = { ...next[idx], file, imageUrl: file.name };
                              update('industryPartners', next);
                            }}
                          />
                          {resolveMediaUrl(partner.file) || resolveMediaUrl(partner.imageUrl) ? (
                            <img src={resolveMediaUrl(partner.file) || resolveMediaUrl(partner.imageUrl) || ''} alt="Partner preview" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs font-black uppercase tracking-wider text-slate-400">Click to upload</div>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 break-all">{partner.file instanceof File ? partner.file.name : (partner.imageUrl || 'No image selected')}</div>
                        {(partner.file || partner.imageUrl) && (
                          <button
                            type="button"
                            onClick={() => {
                              const next = [...payload.industryPartners];
                              next[idx] = { ...next[idx], file: null, imageUrl: '' };
                              update('industryPartners', next);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 text-xs font-black uppercase tracking-wider hover:bg-red-100"
                          >
                            Remove Image
                          </button>
                        )}
                      </div>
                    </div>
                    <TableManager
                      title="Partner Tags"
                      items={(partner.tags || []).map((t: string) => ({ tag: t }))}
                      maxItems={3}
                      onChange={rows => {
                        const next = [...payload.industryPartners];
                        next[idx] = { ...next[idx], tags: rows.map(r => r.tag) };
                        update('industryPartners', next);
                      }}
                      fields={[{ key: 'tag', label: 'Tag', max: 20, placeholder: 'Tag text' }]}
                    />
                    <button onClick={() => {
                      const next = payload.industryPartners.filter((_: any, i: number) => i !== idx);
                      update('industryPartners', next);
                    }} className="px-4 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-red-100 opacity-0 group-hover:opacity-100 transition-all">Remove Partner</button>
                  </div>
                ))}
                {(payload.industryPartners || []).length < 9 && (
                  <button onClick={() => update('industryPartners', [...(payload.industryPartners || []), { name: '', tagline: '', description: '', imageUrl: '', file: null, tags: [] }])} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-sm font-bold text-slate-400 hover:border-blue-500 hover:text-blue-500 transition-all">Add Partner</button>
                )}
              </div>
            </AdminFormSection>
          </div>
        );

      case 'research-facility':
        return (
          <AdminFormSection 
            title="Facility Images" 
            icon="🏢" 
            subtitle="Max 6 images, 16:10 recommended"
            isOpen={activeSection === 'facilities-list'}
            onToggle={() => toggleSection('facilities-list')}
          >
            <TableManager
              title="Facility Image Entries"
              items={payload.facilities}
              maxItems={6}
              onChange={v => update('facilities', v)}
                fields={[
                  { key: 'file', label: 'Facility Image Upload', max: 0, type: 'file-image' },
                ]}
              />
            </AdminFormSection>
        );

      case 'iic':
        return (
          <div className="space-y-8">
            <AdminFormSection 
              title="Achievement Images" 
              icon="🏆" 
              subtitle="Max 4"
              isOpen={activeSection === 'achievements'}
              onToggle={() => toggleSection('achievements')}
            >
              <TableManager
                title="Achievement Holders"
                items={payload.iicAchievementsDetailed}
                maxItems={4}
                onChange={v => update('iicAchievementsDetailed', v)}
                fields={[
                  { key: 'title', label: 'Achievement Title', max: 40, placeholder: 'Achievement label' },
                  { key: 'file', label: 'Achievement Image Upload', max: 0, type: 'file-image' },
                ]}
              />
            </AdminFormSection>

            <AdminFormSection 
              title="Gallery Holders" 
              icon="🖼️" 
              subtitle="Max 12"
              isOpen={activeSection === 'gallery'}
              onToggle={() => toggleSection('gallery')}
            >
              <TableManager
                title="Gallery"
                items={payload.iicGalleryDetailed}
                maxItems={12}
                onChange={v => update('iicGalleryDetailed', v)}
                fields={[
                  { key: 'label', label: 'Gallery Label', max: 24, placeholder: 'Label' },
                  { key: 'file', label: 'Gallery Image Upload', max: 0, type: 'file-image' },
                ]}
              />
            </AdminFormSection>

            <AdminFormSection 
              title="Committee Rows" 
              icon="👥" 
              subtitle="Left: 100 max, Right: 220 max"
              isOpen={activeSection === 'committee'}
              onToggle={() => toggleSection('committee')}
            >
              <TableManager
                title="Staff Committee"
                items={payload.iicCommitteeGroups?.staff || []}
                maxItems={12}
                onChange={v => update('iicCommitteeGroups', { ...payload.iicCommitteeGroups, staff: v })}
                fields={[{ key: 'left', label: 'Left Column', max: 100 }, { key: 'right', label: 'Right Column', max: 220, type: 'textarea' }]}
              />
              <TableManager
                title="Expert Representation"
                items={payload.iicCommitteeGroups?.expert || []}
                maxItems={8}
                onChange={v => update('iicCommitteeGroups', { ...payload.iicCommitteeGroups, expert: v })}
                fields={[{ key: 'left', label: 'Left Column', max: 100 }, { key: 'right', label: 'Right Column', max: 220, type: 'textarea' }]}
              />
              <TableManager
                title="Support Staff"
                items={payload.iicCommitteeGroups?.support || []}
                maxItems={6}
                onChange={v => update('iicCommitteeGroups', { ...payload.iicCommitteeGroups, support: v })}
                fields={[{ key: 'left', label: 'Left Column', max: 100 }, { key: 'right', label: 'Right Column', max: 220, type: 'textarea' }]}
              />
              <TableManager
                title="Student Representation"
                items={payload.iicCommitteeGroups?.student || []}
                maxItems={12}
                onChange={v => update('iicCommitteeGroups', { ...payload.iicCommitteeGroups, student: v })}
                fields={[{ key: 'left', label: 'Left Column', max: 100 }, { key: 'right', label: 'Right Column', max: 220, type: 'textarea' }]}
              />
            </AdminFormSection>

            <AdminFormSection 
              title="IIC Report PDFs" 
              icon="📄" 
              subtitle="Max 4 links"
              isOpen={activeSection === 'reports'}
              onToggle={() => toggleSection('reports')}
            >
              <LinkListManager title="IIC Report Links" items={payload.iicReportsDetailed} onChange={v => update('iicReportsDetailed', v)} maxItems={4} labelMax={20} urlLabel="PDF URL (optional)" allowFileUpload />
            </AdminFormSection>
          </div>
        );

      case 'nirf':
        return (
          <AdminFormSection 
            title="NIRF PDF Cards" 
            icon="📁" 
            subtitle="Max 6 cards"
            isOpen={activeSection === 'nirf-cards'}
            onToggle={() => toggleSection('nirf-cards')}
          >
            <TableManager
              title="NIRF Cards"
              items={payload.nirfCards}
              maxItems={6}
              onChange={v => update('nirfCards', v)}
                fields={[
                  { key: 'title', label: 'Card Title', max: 70, placeholder: 'NIRF card title' },
                  { key: 'year', label: 'Year', max: 4, exactLength: 4, placeholder: '2025' },
                  { key: 'note', label: 'Card Note', max: 45, placeholder: 'Short note' },
                  { key: 'file', label: 'NIRF PDF Upload', max: 0, type: 'file-pdf' },
                ]}
              />
            </AdminFormSection>
        );

      case 'downloads': {
        const totalLinks = (payload.leftLinks || []).length + (payload.rightLinks || []).length;
        return (
          <div className="space-y-8">
            <AdminFormSection 
              title="Top Document Buttons" 
              icon="⬇️" 
              subtitle="Max 4 buttons"
              isOpen={activeSection === 'top-buttons'}
              onToggle={() => toggleSection('top-buttons')}
            >
              <LinkListManager title="Top Buttons" items={payload.topButtons} onChange={v => update('topButtons', v)} maxItems={4} labelMax={60} />
            </AdminFormSection>
            <AdminFormSection 
              title="Resource Links" 
              icon="🔗" 
              subtitle={`Total ${totalLinks}/12, max 6 per column`}
              isOpen={activeSection === 'resource-links'}
              onToggle={() => toggleSection('resource-links')}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <LinkListManager title="Left Column" items={payload.leftLinks} onChange={v => update('leftLinks', v)} maxItems={6} labelMax={70} />
                <LinkListManager title="Right Column" items={payload.rightLinks} onChange={v => update('rightLinks', v)} maxItems={6} labelMax={70} />
              </div>
            </AdminFormSection>
          </div>
        );
      }

      case 'research-conventions':
      case 'research-policy':
        return (
          <AdminFormSection
            title={slug === 'research-conventions' ? 'Research Convention PDFs' : 'Research Policy PDFs'}
            icon="📄"
            subtitle="Manage and upload PDFs"
            isOpen={activeSection === 'documents-list'}
            onToggle={() => toggleSection('documents-list')}
          >
            <TableManager
              title="Documents"
              items={payload.documents || []}
              maxItems={12}
              onChange={v => update('documents', v)}
              fields={[
                { key: 'title', label: 'Document Title', max: 90, placeholder: 'Enter title' },
                { key: 'file', label: 'Upload PDF', max: 0, type: 'file-pdf' },
              ]}
            />
          </AdminFormSection>
        );

      default:
        return <div className="p-8 text-center text-slate-400 font-bold uppercase tracking-widest bg-slate-50 border border-slate-100 rounded-3xl">Module being refined...</div>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-fade-in relative">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <PageEditorHeader
        title={data?.name || 'Research Page Editor'}
        description="Manage institutional research, publications, patents, and innovation cell content."
        onSave={handleSubmit}
        isSaving={saving}
        showBackButton
        onBack={onBack}
      />

      {exactErrors.length > 0 && (
        <div className="p-4 rounded-2xl border border-red-200 bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider">
          {exactErrors[0]}
        </div>
      )}

      <div className="space-y-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default ResearchForm;
