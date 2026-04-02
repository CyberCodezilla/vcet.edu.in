import React, { useEffect, useRef, useState } from 'react';
import { sssReportUploadsApi } from '../../api/sssReportUploads';
import { bestPracticeUploadsApi } from '../../api/bestPracticeUploads';
import { naacScoreUploadsApi } from '../../api/naacScoreUploads';
import type { BestPracticeUpload, NaacScoreUpload, SssReportUpload } from '../../types';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';

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
const SectionCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-white rounded-[2rem] shadow-lg shadow-slate-200/40 border border-slate-100 overflow-hidden">
    <div className="px-8 py-5 border-b border-slate-100 flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">{icon}</div>
      <h3 className="text-sm font-extrabold text-[#111827] uppercase tracking-wider">{title}</h3>
    </div>
    <div className="p-8 space-y-6">{children}</div>
  </div>
);

const inputBase = 'w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#2563EB] rounded-2xl px-5 py-4 text-sm font-bold transition-all outline-none';
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
      <input
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
      {(items || []).map((cat, ci) => (
        <div key={ci} className="border border-slate-200 rounded-3xl overflow-hidden bg-slate-50">
          {/* Category header */}
          <div className="flex items-center gap-3 p-5 bg-white border-b border-slate-100">
            <div className="flex-grow">
              <label className={labelBase}>{categoryTitle}</label>
              <input
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
            {(cat.entries || []).map((entry: any, ei: number) => (
              <div key={ei} className="flex gap-3 p-4 bg-white border border-slate-100 rounded-2xl group">
                <div className="flex-grow space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelBase}>{idLabel}</label>
                      <input
                        value={entry.entryId || entry.extendedId || entry.subCriteria || ''}
                        onChange={e => updEntry(ci, ei, { entryId: e.target.value })}
                        maxLength={50}
                        className={`${inputBase} !py-2.5 !px-4 !rounded-xl !text-xs`}
                        placeholder="e.g. 1.1"
                      />
                    </div>
                    <div>
                      <label className={labelBase}>{descLabel}</label>
                      <input
                        value={entry.description || entry.criteriaHeading || ''}
                        onChange={e => updEntry(ci, ei, { description: e.target.value })}
                        maxLength={200}
                        className={`${inputBase} !py-2.5 !px-4 !rounded-xl !text-xs`}
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
            ))}

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
      ))}

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
      {(items || []).map((item, idx) => (
        <div key={idx} className="flex gap-4 p-6 bg-slate-50 border border-slate-100 rounded-3xl transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/40 group">
          <div className="flex-grow space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-4">
              {textFields.map(f => (
                <div key={f.key} className={f.isTextarea ? 'col-span-1 md:col-span-2 lg:col-span-3' : ''}>
                  <label className={labelBase}>{f.label}</label>
                  {f.isTextarea
                    ? <textarea maxLength={f.maxLength} value={item[f.key]} onChange={e => upd(idx, { [f.key]: e.target.value })} className={`${inputBase} !py-3 !px-4 !rounded-xl !text-xs h-20 resize-none`} placeholder={f.placeholder} />
                    : <input maxLength={f.maxLength} value={item[f.key]} onChange={e => upd(idx, { [f.key]: e.target.value })} className={`${inputBase} !py-3 !px-4 !rounded-xl !text-xs`} placeholder={f.placeholder} />
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
            className="self-center p-2 h-max bg-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
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
      {(items || []).map((item, idx) => (
        <div key={idx} className="flex gap-4 p-5 bg-slate-50 border border-slate-100 rounded-3xl transition-all hover:border-slate-200 group">
          <div className="flex-grow space-y-4">
            {extraFields.map(f => (
              <div key={f.key}>
                <label className={labelBase}>{f.label}</label>
                <input maxLength={f.maxLength} value={item[f.key]} onChange={e => upd(idx, { [f.key]: e.target.value })} className={inputBase} placeholder={f.placeholder} />
              </div>
            ))}
            <div>
              <label className={labelBase}>PDF Upload</label>
              <PdfUploadButton value={item.pdfFile} onChange={v => upd(idx, { pdfFile: v })} />
            </div>
          </div>
          <button onClick={() => del(idx)} className="self-center p-2 rounded-xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      ))}
      <button onClick={add} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-sm font-bold text-slate-400 hover:border-blue-500 hover:text-blue-500 transition-all flex items-center justify-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
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
      {(items || []).map((item, idx) => (
        <div key={idx} className="p-5 bg-slate-50 border border-slate-100 rounded-3xl space-y-4">
          <div>
            <label className={labelBase}>Title</label>
            <input
              value={item.title || ''}
              onChange={e => upd(idx, { title: e.target.value })}
              className={inputBase}
              placeholder="SSS REPORT 2021-22"
            />
          </div>

          <div>
            <label className={labelBase}>Upload PDF</label>
            <input
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
      ))}

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
          <div className="space-y-8">
            <SectionCard title="SSS Report Upload" icon="📄">
              <SSSPdfUploadManager
                items={payload.sssUploads || []}
                onChange={val => setPayload({ ...payload, sssUploads: val })}
              />
            </SectionCard>
          </div>
        );

      /* ─── SSR Cycle 1: Title + PDF per row ─── */
      case 'ssr-cycle-1':
        return (
          <SectionCard title="SSR Cycle 1 — Documents & Photos" icon="🏆">
            <TableWithPdfManager
              items={payload.metrics}
              addLabel="Add Entry"
              textFields={[
                { key: 'title', label: 'Title / Photo Name', placeholder: 'e.g. Front View of College', maxLength: 150 },
              ]}
              onChange={val => setPayload({ ...payload, metrics: val })}
            />
          </SectionCard>
        );

      /* ─── SSR Cycle 2: Extended Profile (nested) + QIF + DVV ─── */
      case 'ssr-cycle-2':
        return (
          <div className="space-y-8">

            {/* 1. Extended Profile — category with multiple ID+PDF entries */}
            <SectionCard title="1. Extended Profile" icon="📊">
              <NestedCategoryManager
                items={payload.extendedProfile}
                addCategoryLabel="+ Add Category (e.g. 1. Students)"
                addEntryLabel="+ Add Entry (Extended ID + PDF)"
                categoryTitle="Category Label (e.g. 1. Students)"
                categoryPlaceholder="e.g. 1. Students / 2. Teachers / 3. Institution"
                idLabel="Extended ID"
                descLabel="Extended Profile (Description)"
                onChange={val => setPayload({ ...payload, extendedProfile: val })}
              />
            </SectionCard>

            {/* 2. QIF */}
            <SectionCard title="2. QIF — Quality Indicator Framework" icon="📈">
              <NestedCategoryManager
                items={payload.qif}
                addCategoryLabel="+ Add Criteria (e.g. Criteria 1)"
                addEntryLabel="+ Add Sub-Criteria"
                categoryTitle="Criteria Label (e.g. Criteria 1: Curricular Aspects)"
                categoryPlaceholder="e.g. Criteria 1: Curriculum Aspect"
                idLabel="Sub-Criteria"
                descLabel="Criteria Heading"
                onChange={val => setPayload({ ...payload, qif: val })}
              />
            </SectionCard>

            {/* 3. DVV Clarifications */}
            <SectionCard title="3. DVV Clarifications" icon="⚖️">

              <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">
                HEI Response to DVV Findings — Extended Profile
              </p>
              <NestedCategoryManager
                items={payload.dvvExtended}
                addCategoryLabel="+ Add DVV Category"
                addEntryLabel="+ Add Extended Entry"
                categoryTitle="Category Label (e.g. 1. Students)"
                categoryPlaceholder="e.g. 1. Students"
                idLabel="Extended ID"
                descLabel="Extended Profile (Description)"
                onChange={val => setPayload({ ...payload, dvvExtended: val })}
              />

              <div className="border-t border-slate-100 my-8" />

              <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">
                HEI Response to DVV Findings — Metric
              </p>
              <NestedCategoryManager
                items={payload.dvvMetric}
                addCategoryLabel="+ Add DVV Metric Criteria"
                addEntryLabel="+ Add Metric Row"
                categoryTitle="Criteria Label (e.g. Criteria 1)"
                categoryPlaceholder="e.g. Criteria 1"
                idLabel="Sub-Criteria"
                descLabel="Criteria Heading"
                onChange={val => setPayload({ ...payload, dvvMetric: val })}
              />
            </SectionCard>
          </div>
        );

      /* ─── Best Practices ─── */
      case 'best-practices':
        return (
          <div className="space-y-8">
            <SectionCard title="Best Practices & Institutional Distinctiveness Upload" icon="📄">
              <SSSPdfUploadManager
                items={payload.bestPracticeUploads || []}
                onChange={val => setPayload({ ...payload, bestPracticeUploads: val })}
              />
            </SectionCard>
          </div>
        );

      /* ─── NAAC Accreditation Score: Single PDF upload ─── */
      case 'naac-score':
        return (
          <div className="space-y-8">
            <SectionCard title="NAAC Score Upload" icon="📄">
              <SSSPdfUploadManager
                items={payload.naacScoreUploads || []}
                onChange={val => setPayload({ ...payload, naacScoreUploads: val })}
              />
            </SectionCard>
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
