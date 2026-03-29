import React, { useEffect, useRef, useState } from 'react';

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

/* ── Main Form ──────────────────────────────────────────────────────────────── */
interface NaacFormProps { slug: string; onBack: () => void; }

const SLUG_NAMES: Record<string, string> = {
  'sss':            'Student Satisfaction Survey (SSS)',
  'sss-report':     'SSS Report',
  'ssr-cycle-1':    'SSR Cycle 1',
  'ssr-cycle-2':    'SSR Cycle 2',
  'best-practices': 'Best Practices & Institutional Distinctiveness',
  'naac-score':     'NAAC Accreditation Score',
};

const NaacForm: React.FC<NaacFormProps> = ({ slug, onBack }) => {
  const [payload, setPayload] = useState<any>({});
  const [loading, setLoading]  = useState(true);
  const [saving, setSaving]    = useState(false);
  const [toast, setToast]      = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => { setTimeout(() => setLoading(false), 400); }, [slug]);

  const handleSubmit = async () => {
    setSaving(true);
    setTimeout(() => { setSaving(false); setToast({ message: 'Saved successfully', type: 'success' }); }, 800);
  };

  if (loading) return <div className="p-12 text-center text-slate-400 font-bold animate-pulse">LOADING...</div>;

  const renderContent = () => {
    switch (slug) {

      /* ─── SSS: Only Google Form link ─── */
      case 'sss':
        return (
          <SectionCard title="Google Form Link" icon="🔗">
            <p className="text-xs text-slate-500 font-semibold mb-2">When the SSS Google Form link changes, update it here. Maximum 1 link.</p>
            <label className={labelBase}>Google Form URL (Max 250 chars)</label>
            <input maxLength={250} value={payload.formUrl || ''} onChange={e => setPayload({ ...payload, formUrl: e.target.value })} className={inputBase} placeholder="https://docs.google.com/forms/..." />
          </SectionCard>
        );

      /* ─── SSS Report: Year + PDF upload per row ─── */
      case 'sss-report':
        return (
          <SectionCard title="Year-wise SSS Reports" icon="📑">
            <p className="text-xs text-slate-500 font-semibold mb-2">Add one report per academic year. Maximum 10 reports.</p>
            <TableWithPdfManager
              items={payload.reports}
              addLabel="Add Report"
              textFields={[
                { key: 'year', label: 'Academic Year', placeholder: 'e.g. 2022-23', maxLength: 20 },
              ]}
              onChange={val => setPayload({ ...payload, reports: val })}
            />
          </SectionCard>
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
            <SectionCard title="Best Practices & Institutional Distinctiveness" icon="✨">
              <SimplePdfManager
                items={payload.practices}
                addLabel="Add Document"
                extraFields={[
                  { key: 'title', label: 'Title', placeholder: 'Enter Title...', maxLength: 100 },
                ]}
                onChange={val => setPayload({ ...payload, practices: val })}
              />
            </SectionCard>
          </div>
        );

      /* ─── NAAC Accreditation Score: Single PDF upload ─── */
      case 'naac-score':
        return (
          <SectionCard title="NAAC Accreditation Score — PDF" icon="💯">
            <p className="text-xs text-slate-500 font-semibold mb-4">
              Upload the official NAAC accreditation certificate PDF. Maximum 1 PDF file.
            </p>
            <label className={labelBase}>Accreditation Certificate PDF (Max 250 chars)</label>
            <PdfUploadButton
              value={payload.certPdfFile}
              onChange={v => setPayload({ ...payload, certPdfFile: v })}
              label="Upload Accreditation Certificate PDF"
            />
          </SectionCard>
        );

      default:
        return <div className="p-8 text-center text-slate-400 font-bold uppercase tracking-widest bg-slate-50 border border-slate-100 rounded-3xl">Module being refined...</div>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 relative">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div>
            <h1 className="text-3xl font-extrabold text-[#111827]">{SLUG_NAMES[slug] ?? slug.replace(/-/g, ' ').toUpperCase()}</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">NAAC EDITOR</p>
          </div>
        </div>
        <button onClick={handleSubmit} disabled={saving} className="px-8 py-3.5 bg-[#2563EB] text-white rounded-2xl font-black text-sm uppercase tracking-wider shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center gap-2">
          {saving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-6">{renderContent()}</div>
    </div>
  );
};

export default NaacForm;
