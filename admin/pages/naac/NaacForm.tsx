import React, { useEffect, useRef, useState } from 'react';
import { sssReportUploadsApi } from '../../api/sssReportUploads';
import { bestPracticeUploadsApi } from '../../api/bestPracticeUploads';
import { naacScoreUploadsApi } from '../../api/naacScoreUploads';
import type { BestPracticeUpload, NaacScoreUpload, SssReportUpload } from '../../types';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';
import AdminFormSection from '../../components/AdminFormSection';
import { SortableListContext } from '../../components/SortableList';

/* ── Toast ─────────────────────────────────────────────────────────────────── */
const Toast: React.FC<{ message: string; type: 'success' | 'error'; onClose: () => void }> = ({ message, type, onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl text-sm font-bold ${type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
      {type === 'success'
        ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
        : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>}
      {message}
    </div>
  );
};

/* ── UI Primitives ──────────────────────────────────────────────────────────── */
const inputBase = 'w-full bg-slate-50 border-1 border-slate-200 focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 rounded-2xl px-5 py-4 text-sm font-bold transition-all outline-none text-slate-700';
const labelBase = 'block text-xs font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1';

/* ── PDF Upload Button ──────────────────────────────────────────────────────
   A real file-picker button. Shows filename once a file is selected.         */
const PdfUploadButton: React.FC<{
  value?: string;
  onChange: (fileName: string) => void;
  label?: string;
}> = ({ value, onChange, label = 'Upload PDF' }) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <input id="naacform-1" name="naacform-1" aria-label="naacform field"
        ref={ref}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={e => {
          const f = e.target.files?.[0];
          if (f) onChange(f.name);
        }}
      />
      <button
        type="button"
        onClick={() => ref.current?.click()}
        className="flex items-center gap-2 px-4 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-black rounded-xl transition-all shadow-md shadow-blue-200"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        {label}
      </button>
      {value && (
        <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-xl">
          <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-xs font-bold text-emerald-700 max-w-[200px] truncate">{value}</span>
          <button
            type="button"
            onClick={() => { onChange(''); if (ref.current) ref.current.value = ''; }}
            className="text-emerald-500 hover:text-red-500 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      {!value && (
        <span className="text-xs text-slate-400 font-semibold italic">No file chosen</span>
      )}
    </div>
  );
};

/* ── Nested Category Manager ──────────────────────────────────────
   One "category" row with MULTIPLE nested ID+PDF pairs.  */
const NestedCategoryManager: React.FC<{
  items: any[];
  onChange: (val: any[]) => void;
  addCategoryLabel?: string;
  addEntryLabel?: string;
  categoryTitle?: string;
  categoryPlaceholder?: string;
  idLabel?: string;
  descLabel?: string;
}> = ({ 
  items, 
  onChange, 
  addCategoryLabel = 'Add Category',
  addEntryLabel = '+ Add Entry',
  categoryTitle = 'Category Label',
  categoryPlaceholder = 'e.g. 1. Students',
  idLabel = 'ID',
  descLabel = 'Description'
}) => {

  const addCategory = () => onChange([...(items || []), { categoryLabel: '', entries: [] }]);
  const delCategory = (ci: number) => onChange(items.filter((_, i) => i !== ci));
  const updCategory = (ci: number, u: any) => {
    const n = [...items]; n[ci] = { ...n[ci], ...u }; onChange(n);
  };

  const addEntry = (ci: number) => {
    const n = [...items];
    n[ci] = { ...n[ci], entries: [...(n[ci].entries || []), { entryId: '', description: '', pdfFile: '' }] };
    onChange(n);
  };
  const delEntry = (ci: number, ei: number) => {
    const n = [...items];
    n[ci] = { ...n[ci], entries: n[ci].entries.filter((_: any, i: number) => i !== ei) };
    onChange(n);
  };
  const updEntry = (ci: number, ei: number, u: any) => {
    const n = [...items];
    const entries = [...n[ci].entries];
    entries[ei] = { ...entries[ei], ...u };
    n[ci] = { ...n[ci], entries };
    onChange(n);
  };

  return (
    <div className="space-y-5">
      <SortableListContext
        items={items}
        onChange={onChange}
        renderItem={(cat, ci, id, dragHandleProps, setNodeRef, style, isDragging, actions) => (
          <div ref={setNodeRef} style={style} className="border border-slate-200 rounded-3xl overflow-hidden bg-slate-50">
            {/* Category header */}
            <div className="flex items-center gap-3 p-5 bg-white border-b border-slate-100">
              <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-300 hover:text-[#2563EB] transition-colors p-2" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 8h16M4 16h16"/></svg>
              </div>
              <div className="grow">
                <label className={labelBase}>{categoryTitle}</label>
                <input id={`naacform-cat-${ci}`} name={`naacform-cat-${ci}`} aria-label="naacform field"
                  value={cat.categoryLabel}
                  onChange={e => updCategory(ci, { categoryLabel: e.target.value })}
                  className={inputBase}
                  placeholder={categoryPlaceholder}
                />
              </div>
              <button
                onClick={() => delCategory(ci)}
                className="mt-6 p-2 rounded-xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Nested entries inside category */}
            <div className="p-4 space-y-3">
              <SortableListContext
                items={cat.entries || []}
                onChange={val => updCategory(ci, { entries: val })}
                renderItem={(entry, ei, id2, dragHandleProps2, setNodeRef2, style2, isDragging2, actions2) => (
                  <div ref={setNodeRef2} style={style2} className="flex gap-3 p-4 bg-white border border-slate-100 rounded-2xl group shadow-sm">
                    <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-200 hover:text-blue-400 p-2 self-start mt-6" {...dragHandleProps2.attributes} {...dragHandleProps2.listeners}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 8h16M4 16h16"/></svg>
                    </div>
                    <div className="grow space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className={labelBase}>{idLabel}</label>
                          <input id={`naacform-entry-id-${ci}-${ei}`} name={`naacform-entry-id-${ci}-${ei}`} aria-label="naacform field"
                            value={entry.entryId || entry.extendedId || entry.subCriteria || ''}
                            onChange={e => updEntry(ci, ei, { entryId: e.target.value })}
                            maxLength={50}
                            className={`${inputBase} py-2.5! px-4! rounded-xl! text-xs!`}
                            placeholder="e.g. 1.1"
                          />
                        </div>
                        <div>
                          <label className={labelBase}>{descLabel}</label>
                          <input id={`naacform-entry-desc-${ci}-${ei}`} name={`naacform-entry-desc-${ci}-${ei}`} aria-label="naacform field"
                            value={entry.description || entry.criteriaHeading || ''}
                            onChange={e => updEntry(ci, ei, { description: e.target.value })}
                            maxLength={200}
                            className={`${inputBase} py-2.5! px-4! rounded-xl! text-xs!`}
                            placeholder="Description..."
                          />
                        </div>
                      </div>
                      <div>
                        <label className={labelBase}>Link — PDF Upload</label>
                        <PdfUploadButton
                          value={entry.pdfFile}
                          onChange={v => updEntry(ci, ei, { pdfFile: v })}
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => delEntry(ci, ei)}
                      className="self-center p-2 rounded-xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              />

              {/* Add entry inside category */}
              <button
                onClick={() => addEntry(ci)}
                className="w-full py-3 border border-dashed border-blue-300 rounded-2xl text-xs font-bold text-blue-400 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
                </svg>
                {addEntryLabel}
              </button>
            </div>
          </div>
        )}
      />

      {/* Add new category */}
      <button
        onClick={addCategory}
        className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-sm font-bold text-slate-400 hover:border-blue-500 hover:text-blue-500 transition-all flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
        </svg>
        {addCategoryLabel}
      </button>
    </div>
  );
};

/* ── QIF / DVV Row Manager (each row has its own PDF upload button) ─────────── */
const TableWithPdfManager: React.FC<{
  items: any[];
  textFields: { key: string; label: string; placeholder: string; maxLength?: number; isTextarea?: boolean }[];
  onChange: (val: any[]) => void;
  addLabel?: string;
}> = ({ items, textFields, onChange, addLabel = 'Add Row' }) => {
  const add = () => { const e: any = { pdfFile: '' }; textFields.forEach(f => e[f.key] = ''); onChange([...(items || []), e]); };
  const upd = (i: number, u: any) => { const n = [...items]; n[i] = { ...n[i], ...u }; onChange(n); };
  const del = (i: number) => onChange(items.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-4">
      <SortableListContext
        items={items}
        onChange={onChange}
        renderItem={(item, idx, id, dragHandleProps, setNodeRef, style, isDragging, actions) => (
          <div ref={setNodeRef} style={style} className="flex gap-4 p-6 bg-slate-50 border border-slate-100 rounded-3xl transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/40 group">
            <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-300 hover:text-[#2563EB] transition-colors p-2 self-start mt-4" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 8h16M4 16h16"/></svg>
            </div>
            <div className="grow space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-4">
                {textFields.map(f => (
                  <div key={f.key} className={f.isTextarea ? 'col-span-1 md:col-span-2 lg:col-span-3' : ''}>
                    <label className={labelBase}>{f.label}</label>
                    {f.isTextarea
                      ? <textarea id={`naacform-ta-${idx}-${f.key}`} name={`naacform-ta-${idx}-${f.key}`} aria-label="naacform textarea field" maxLength={f.maxLength} value={item[f.key]} onChange={e => upd(idx, { [f.key]: e.target.value })} className={`${inputBase} py-3! px-4! rounded-xl! text-xs! h-20 resize-none`} placeholder={f.placeholder} />
                      : <input id={`naacform-input-${idx}-${f.key}`} name={`naacform-input-${idx}-${f.key}`} aria-label="naacform field" maxLength={f.maxLength} value={item[f.key]} onChange={e => upd(idx, { [f.key]: e.target.value })} className={`${inputBase} py-3! px-4! rounded-xl! text-xs!`} placeholder={f.placeholder} />
                    }
                  </div>
                ))}
              </div>
              {/* PDF Upload */}
              <div>
                <label className={labelBase}>Link — PDF Upload</label>
                <PdfUploadButton
                  value={item.pdfFile}
                  onChange={v => upd(idx, { pdfFile: v })}
                />
              </div>
            </div>
            <button
              onClick={() => del(idx)}
              className="mt-6 p-2 h-max bg-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      />
      <button onClick={add} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-sm font-bold text-slate-400 hover:border-blue-500 hover:text-blue-500 transition-all flex items-center justify-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
        </svg>
        {addLabel}
      </button>
    </div>
  );
};

/* ── Simple PDF Manager (title + upload button) for Best Practices etc ───── */
const SimplePdfManager: React.FC<{
  items: any[];
  onChange: (val: any[]) => void;
  addLabel?: string;
  extraFields?: { key: string; label: string; placeholder: string; maxLength?: number }[];
}> = ({ items, onChange, addLabel = 'Add Document', extraFields = [] }) => {
  const add = () => { const e: any = { pdfFile: '' }; extraFields.forEach(f => e[f.key] = ''); onChange([...(items || []), e]); };
  const upd = (i: number, u: any) => { const n = [...items]; n[i] = { ...n[i], ...u }; onChange(n); };
  const del = (i: number) => onChange(items.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-4">
      <SortableListContext
        items={items}
        onChange={onChange}
        renderItem={(item, idx, id, dragHandleProps, setNodeRef, style, isDragging, actions) => (
          <div ref={setNodeRef} style={style} className="flex gap-4 p-5 bg-slate-50 border border-slate-100 rounded-3xl transition-all hover:border-slate-200 group">
            <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-300 hover:text-[#2563EB] transition-colors p-2 self-start mt-6" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 8h16M4 16h16"/></svg>
            </div>
            <div className="grow space-y-4">
              {extraFields.map(f => (
                <div key={f.key}>
                  <label className={labelBase}>{f.label}</label>
                  <input id={`naac-simple-${idx}-${f.key}`} name={`naac-simple-${idx}-${f.key}`} aria-label="naacform field" maxLength={f.maxLength} value={item[f.key]} onChange={e => upd(idx, { [f.key]: e.target.value })} className={inputBase} placeholder={f.placeholder} />
                </div>
              ))}
              <div>
                <label className={labelBase}>PDF Upload</label>
                <PdfUploadButton value={item.pdfFile} onChange={v => upd(idx, { pdfFile: v })} />
              </div>
            </div>
            <button onClick={() => del(idx)} className="mt-8 p-2 rounded-xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        )}
      />
      <button onClick={add} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-sm font-bold text-slate-400 hover:border-blue-500 hover:text-blue-500 transition-all flex items-center justify-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
        </svg>
        {addLabel}
      </button>
    </div>
  );
};

type SSSUploadFormItem = {
  id?: number;
  title: string;
  fileName: string | null;
  fileUrl: string | null;
  file?: File;
  isNew?: boolean;
};

const SSSPdfUploadManager: React.FC<{ items: SSSUploadFormItem[]; onChange: (val: SSSUploadFormItem[]) => void }> = ({ items, onChange }) => {
  const add = () =>
    onChange([
      ...(items || []),
      { title: 'SSS REPORT 2021-22', fileName: null, fileUrl: null, file: undefined },
    ]);

  const upd = (i: number, u: any) => {
    const n = [...(items || [])];
    n[i] = { ...n[i], ...u };
    onChange(n);
  };

  const del = (i: number) => onChange((items || []).filter((_: SSSUploadFormItem, idx: number) => idx !== i));

  const openPreview = (item: SSSUploadFormItem) => {
    const href = item?.file ? URL.createObjectURL(item.file) : item?.fileUrl;
    if (!href) return;
    window.open(href, '_blank', 'noopener,noreferrer');
    if (item?.file) setTimeout(() => URL.revokeObjectURL(href), 2000);
  };

  return (
    <div className="space-y-4">
      <SortableListContext
        items={items}
        onChange={onChange}
        renderItem={(item, idx, id, dragHandleProps, setNodeRef, style, isDragging, actions) => (
          <div ref={setNodeRef} style={style} className="p-5 bg-slate-50 border border-slate-100 rounded-3xl space-y-4 relative group">
            <div className="absolute top-8 -left-6 flex items-center gap-2 cursor-grab active:cursor-grabbing text-slate-300 hover:text-[#2563EB] transition-colors" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
              <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8 9h8m-8 6h8"/></svg>
              </div>
            </div>
  
            <div>
              <label className={labelBase}>Title</label>
              <input id={`naac-sss-title-${idx}`} name={`naac-sss-title-${idx}`} aria-label="naacform field"
                value={item.title || ''}
                onChange={e => upd(idx, { title: e.target.value })}
                className={inputBase}
                placeholder="SSS REPORT 2021-22"
              />
            </div>
  
            <div>
              <label className={labelBase}>Upload PDF</label>
              <input id={`naac-sss-file-${idx}`} name={`naac-sss-file-${idx}`} aria-label="naacform field"
                type="file"
                accept="application/pdf"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  upd(idx, { file, fileName: file.name });
                }}
                className={`${inputBase} file:mr-4 file:rounded-xl file:border-0 file:bg-slate-200 file:px-4 file:py-2 file:text-xs file:font-black file:text-slate-700`}
              />
            </div>
  
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => openPreview(item)}
                disabled={!item?.file && !item?.fileUrl}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-black uppercase tracking-wider disabled:opacity-50"
              >
                Preview PDF
              </button>
  
              {(item?.fileName || item?.fileUrl) && (
                <span className="text-xs font-bold text-slate-500 truncate max-w-full">
                  {item.fileName || item.fileUrl}
                </span>
              )}
  
              <button
                type="button"
                onClick={() => del(idx)}
                className="px-4 py-2 rounded-xl bg-red-50 text-red-600 text-xs font-black uppercase tracking-wider hover:bg-red-100"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      />

      <button
        type="button"
        onClick={add}
        className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-sm font-bold text-slate-400 hover:border-blue-500 hover:text-blue-500 transition-all flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
        Add New Item
      </button>
    </div>
  );
};

/* ── Main Form ── */
const SLUG_NAMES: Record<string, string> = {
  'sss-report': 'SSS Report Upload',
  'ssr-cycle-1': 'SSR Cycle 1 — Documents & Photos',
  'ssr-cycle-2': 'SSR Cycle 2 — Extended Profile, QIF & DVV',
  'best-practices': 'Best Practices & Institutional Distinctiveness',
  'naac-score': 'NAAC Accreditation Score',
};

interface NaacFormProps {
  slug: string;
  onBack: () => void;
}

const NaacForm: React.FC<NaacFormProps> = ({ slug, onBack }) => {
  const [payload, setPayload] = useState<any>({});
  const [sssOriginalIds, setSssOriginalIds] = useState<number[]>([]);
  const [bestPracticeOriginalIds, setBestPracticeOriginalIds] = useState<number[]>([]);
  const [naacScoreOriginalIds, setNaacScoreOriginalIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [activeAccordionSection, setActiveAccordionSection] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setLoading(true);
      if (slug !== 'sss-report' && slug !== 'best-practices' && slug !== 'naac-score') {
        if (isMounted) setLoading(false);
        return;
      }

      try {
        if (slug === 'sss-report') {
          const response = await sssReportUploadsApi.list();
          if (!isMounted) return;
          const items = response.data.map((item: SssReportUpload) => ({
            id: item.id,
            title: item.title,
            fileName: item.pdf_name,
            fileUrl: item.pdf_url,
            isNew: false,
          }));
          setPayload((prev: any) => ({ ...prev, sssUploads: items }));
          setSssOriginalIds(items.map((item) => item.id).filter((id): id is number => typeof id === 'number'));
        } else if (slug === 'best-practices') {
          const response = await bestPracticeUploadsApi.list();
          if (!isMounted) return;
          const items = response.data.map((item: BestPracticeUpload) => ({
            id: item.id,
            title: item.title,
            fileName: item.pdf_name,
            fileUrl: item.pdf_url,
            isNew: false,
          }));
          setPayload((prev: any) => ({ ...prev, bestPracticeUploads: items }));
          setBestPracticeOriginalIds(items.map((item) => item.id).filter((id): id is number => typeof id === 'number'));
        } else {
          const response = await naacScoreUploadsApi.list();
          if (!isMounted) return;
          const items = response.data.map((item: NaacScoreUpload) => ({
            id: item.id,
            title: item.title,
            fileName: item.pdf_name,
            fileUrl: item.pdf_url,
            isNew: false,
          }));
          setPayload((prev: any) => ({ ...prev, naacScoreUploads: items }));
          setNaacScoreOriginalIds(items.map((item) => item.id).filter((id): id is number => typeof id === 'number'));
        }
      } catch (error) {
        if (!isMounted) return;
        setToast({
          message: error instanceof Error
            ? error.message
            : slug === 'sss-report'
              ? 'Failed to load SSS reports'
              : slug === 'best-practices'
                ? 'Failed to load Best Practice uploads'
                : 'Failed to load NAAC Score uploads',
          type: 'error',
        });
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const handleSubmit = async () => {
    if (slug !== 'sss-report' && slug !== 'best-practices' && slug !== 'naac-score') {
      setSaving(true);
      setTimeout(() => {
        setSaving(false);
        setToast({ message: 'Saved successfully', type: 'success' });
      }, 800);
      return;
    }

    const mode: 'sss' | 'best-practices' | 'naac-score' =
      slug === 'sss-report' ? 'sss' : slug === 'best-practices' ? 'best-practices' : 'naac-score';
    const currentItems: SSSUploadFormItem[] =
      mode === 'sss'
        ? (payload.sssUploads || [])
        : mode === 'best-practices'
          ? (payload.bestPracticeUploads || [])
          : (payload.naacScoreUploads || []);

    for (const item of currentItems) {
      if (!item.title?.trim()) {
        setToast({
          message: `Each ${
            mode === 'sss' ? 'SSS' : mode === 'best-practices' ? 'Best Practice' : 'NAAC Score'
          } item must have a title.`,
          type: 'error',
        });
        return;
      }
      if (!item.id && !item.file) {
        setToast({ message: `Upload PDF required for "${item.title}".`, type: 'error' });
        return;
      }
    }

    setSaving(true);
    try {
      const currentIds = currentItems.map((item) => item.id).filter((id): id is number => typeof id === 'number');
      const originalIds =
        mode === 'sss' ? sssOriginalIds : mode === 'best-practices' ? bestPracticeOriginalIds : naacScoreOriginalIds;
      const removedIds = originalIds.filter((id) => !currentIds.includes(id));

      for (const id of removedIds) {
        if (mode === 'sss') {
          await sssReportUploadsApi.delete(id);
        } else if (mode === 'best-practices') {
          await bestPracticeUploadsApi.delete(id);
        } else {
          await naacScoreUploadsApi.delete(id);
        }
      }

      const savedItems: SSSUploadFormItem[] = [];

      for (const item of currentItems) {
        if (item.id) {
          const updated = mode === 'sss'
            ? await sssReportUploadsApi.update(item.id, {
                title: item.title.trim(),
                pdf: item.file ?? null,
              })
            : mode === 'best-practices'
              ? await bestPracticeUploadsApi.update(item.id, {
                  title: item.title.trim(),
                  pdf: item.file ?? null,
                })
              : await naacScoreUploadsApi.update(item.id, {
                  title: item.title.trim(),
                  pdf: item.file ?? null,
                });
          savedItems.push({
            id: updated.data.id,
            title: updated.data.title,
            fileName: updated.data.pdf_name,
            fileUrl: updated.data.pdf_url,
            isNew: false,
          });
        } else {
          const created = mode === 'sss'
            ? await sssReportUploadsApi.create({
                title: item.title.trim(),
                pdf: item.file ?? null,
              })
            : mode === 'best-practices'
              ? await bestPracticeUploadsApi.create({
                  title: item.title.trim(),
                  pdf: item.file ?? null,
                })
              : await naacScoreUploadsApi.create({
                  title: item.title.trim(),
                  pdf: item.file ?? null,
                });
          savedItems.push({
            id: created.data.id,
            title: created.data.title,
            fileName: created.data.pdf_name,
            fileUrl: created.data.pdf_url,
            isNew: false,
          });
        }
      }

      if (mode === 'sss') {
        setPayload((prev: any) => ({ ...prev, sssUploads: savedItems }));
        setSssOriginalIds(savedItems.map((item) => item.id).filter((id): id is number => typeof id === 'number'));
      } else if (mode === 'best-practices') {
        setPayload((prev: any) => ({ ...prev, bestPracticeUploads: savedItems }));
        setBestPracticeOriginalIds(savedItems.map((item) => item.id).filter((id): id is number => typeof id === 'number'));
      } else {
        setPayload((prev: any) => ({ ...prev, naacScoreUploads: savedItems }));
        setNaacScoreOriginalIds(savedItems.map((item) => item.id).filter((id): id is number => typeof id === 'number'));
      }
      setToast({
        message: `${
          mode === 'sss' ? 'SSS report' : mode === 'best-practices' ? 'Best Practice' : 'NAAC Score'
        } uploads saved successfully`,
        type: 'success',
      });
    } catch (error) {
      setToast({
        message: error instanceof Error
          ? error.message
          : mode === 'sss'
            ? 'Failed to save SSS uploads'
            : mode === 'best-practices'
              ? 'Failed to save Best Practice uploads'
              : 'Failed to save NAAC Score uploads',
        type: 'error',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-12 text-center text-slate-400 font-bold animate-pulse">LOADING...</div>;

  const renderContent = () => {
    switch (slug) {
      case 'sss-report':
        return (
          <div className="space-y-4">
            <AdminFormSection title="SSS Report Configuration" icon="📄" isOpen={activeAccordionSection === 'sss'} onToggle={() => setActiveAccordionSection(activeAccordionSection === 'sss' ? null : 'sss')}>
              <SSSPdfUploadManager
                items={payload.sssUploads || []}
                onChange={val => setPayload({ ...payload, sssUploads: val })}
              />
            </AdminFormSection>
          </div>
        );

      /* ─── SSR Cycle 1: Title + PDF per row ─── */
      case 'ssr-cycle-1':
        return (
          <AdminFormSection title="Cycle 1 Documentation" icon="🏆" isOpen={activeAccordionSection === 'ssr1'} onToggle={() => setActiveAccordionSection(activeAccordionSection === 'ssr1' ? null : 'ssr1')}>
            <TableWithPdfManager
              items={payload.metrics}
              addLabel="Add Document Label"
              textFields={[
                { key: 'title', label: 'Title / Photo Name', placeholder: 'e.g. Front View of College', maxLength: 150 },
              ]}
              onChange={val => setPayload({ ...payload, metrics: val })}
            />
          </AdminFormSection>
        );

      /* ─── SSR Cycle 2: Extended Profile (nested) + QIF + DVV ─── */
      case 'ssr-cycle-2':
        return (
          <div className="space-y-4">
            {/* 1. Extended Profile — category with multiple ID+PDF entries */}
            <AdminFormSection title="1. Extended Profile" icon="📊" isOpen={activeAccordionSection === 'ext-profile'} onToggle={() => setActiveAccordionSection(activeAccordionSection === 'ext-profile' ? null : 'ext-profile')}>
              <NestedCategoryManager
                items={payload.extendedProfile}
                addCategoryLabel="+ Add New Category"
                addEntryLabel="+ Add Extended Entry"
                categoryTitle="Profile Category"
                categoryPlaceholder="e.g. 1. Students / 2. Teachers"
                idLabel="Extended ID"
                descLabel="Profile Metric Description"
                onChange={val => setPayload({ ...payload, extendedProfile: val })}
              />
            </AdminFormSection>

            {/* 2. QIF */}
            <AdminFormSection title="2. Quality Indicator Framework (QIF)" icon="📈" isOpen={activeAccordionSection === 'qif'} onToggle={() => setActiveAccordionSection(activeAccordionSection === 'qif' ? null : 'qif')}>
              <NestedCategoryManager
                items={payload.qif}
                addCategoryLabel="+ Add Strategic Criteria"
                addEntryLabel="+ Add Sub-Criteria Item"
                categoryTitle="Criteria Designation"
                categoryPlaceholder="e.g. Criteria 1: Curricular Aspects"
                idLabel="Sub-Metric"
                descLabel="Framework Heading"
                onChange={val => setPayload({ ...payload, qif: val })}
              />
            </AdminFormSection>

            {/* 3. DVV Clarifications */}
            <AdminFormSection title="3. DVV Clarifications" icon="⚖️" isOpen={activeAccordionSection === 'dvv'} onToggle={() => setActiveAccordionSection(activeAccordionSection === 'dvv' ? null : 'dvv')}>
              <div className="space-y-10">
                <div>
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-6 px-1">
                    HEI Response to DVV Findings — Extended Profile
                  </p>
                  <NestedCategoryManager
                    items={payload.dvvExtended}
                    addCategoryLabel="+ Add Response Category"
                    addEntryLabel="+ Add Extended Row"
                    categoryTitle="Clarification Category"
                    idLabel="Extended ID"
                    descLabel="Profile Description"
                    onChange={val => setPayload({ ...payload, dvvExtended: val })}
                  />
                </div>

                <div className="pt-8 border-t border-slate-100">
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-6 px-1">
                    HEI Response to DVV Findings — Metric
                  </p>
                  <NestedCategoryManager
                    items={payload.dvvMetric}
                    addCategoryLabel="+ Add Metric Criteria"
                    addEntryLabel="+ Add Specific Metric Row"
                    categoryTitle="Metric Designation"
                    idLabel="Sub-Criteria"
                    descLabel="Criteria Sub-Heading"
                    onChange={val => setPayload({ ...payload, dvvMetric: val })}
                  />
                </div>
              </div>
            </AdminFormSection>
          </div>
        );

      /* ─── Best Practices ─── */
      case 'best-practices':
        return (
          <div className="space-y-4">
            <AdminFormSection title="Institutional Distinctiveness" icon="🏆" isOpen={activeAccordionSection === 'best'} onToggle={() => setActiveAccordionSection(activeAccordionSection === 'best' ? null : 'best')}>
              <SSSPdfUploadManager
                items={payload.bestPracticeUploads || []}
                onChange={val => setPayload({ ...payload, bestPracticeUploads: val })}
              />
            </AdminFormSection>
          </div>
        );

      /* ─── NAAC Accreditation Score: Single PDF upload ─── */
      case 'naac-score':
        return (
          <div className="space-y-4">
            <AdminFormSection title="NAAC Accreditation Score" icon="📊" isOpen={activeAccordionSection === 'score'} onToggle={() => setActiveAccordionSection(activeAccordionSection === 'score' ? null : 'score')}>
              <SSSPdfUploadManager
                items={payload.naacScoreUploads || []}
                onChange={val => setPayload({ ...payload, naacScoreUploads: val })}
              />
            </AdminFormSection>
          </div>
        );

      default:
        return <div className="p-8 text-center text-slate-400 font-bold uppercase tracking-widest bg-slate-50 border border-slate-100 rounded-3xl">Module being refined...</div>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 relative">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <PageEditorHeader
        title={SLUG_NAMES[slug] ?? slug.replace(/-/g, ' ').toUpperCase()}
        description="Manage NAAC reports, SSR cycles, and accreditation uploads."
        onSave={handleSubmit}
        isSaving={saving}
        showBackButton
        onBack={onBack}
      />

      <div className="space-y-6">{renderContent()}</div>
    </div>
  );
};

export default NaacForm;
