import React, { useEffect, useRef, useState } from 'react';
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

/* ── Media Upload Button (with preview) ────────────────────────────────────── */
const MediaUploadButton: React.FC<{
  value?: string;
  previewUrl?: string;
  onChange: (fileName: string, previewUrl: string) => void;
  label?: string;
  accept?: string;
}> = ({ value, previewUrl, onChange, label = 'Upload File', accept = 'image/*,.pdf' }) => {
  const ref = useRef<HTMLInputElement>(null);
  const isPdf = value ? /\.pdf$/i.test(value) : false;
  const isImage = previewUrl && !isPdf;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    onChange(f.name, url);
  };

  const handleClear = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    onChange('', '');
    if (ref.current) ref.current.value = '';
  };

  return (
    <div className="space-y-3">
      <input ref={ref} type="file" accept={accept} className="hidden" onChange={handleChange} />

      <div className="flex items-center gap-3 flex-wrap">
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
            <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-xs font-bold text-emerald-700 max-w-[180px] truncate">{value}</span>
            <button type="button" onClick={handleClear} className="text-emerald-500 hover:text-red-500 transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        {!value && <span className="text-xs text-slate-400 font-semibold italic">No file chosen</span>}
      </div>

      {/* ── Image Preview ── */}
      {isImage && previewUrl && (
        <a href={previewUrl} target="_blank" rel="noopener noreferrer" title="Click to view full size">
          <div className="relative group w-36 h-24 rounded-2xl overflow-hidden border-2 border-slate-200 hover:border-blue-400 transition-all shadow-sm cursor-pointer">
            <img src={previewUrl} alt="preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
              <svg className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-all drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <span className="absolute bottom-1.5 right-2 text-[9px] text-white font-black bg-black/50 px-1.5 py-0.5 rounded-md">PREVIEW</span>
          </div>
        </a>
      )}

      {/* ── PDF Preview Link ── */}
      {isPdf && previewUrl && (
        <a
          href={previewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-50 border border-red-200 rounded-xl text-xs font-bold text-red-600 hover:bg-red-100 hover:border-red-400 transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Click to Preview PDF
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      )}
    </div>
  );
};

/* ── Generic Row Manager ─────────────────────────────────────────── */
const TableManager: React.FC<{
  items: any[];
  textFields: { key: string; label: string; placeholder: string; maxLength?: number; isTextarea?: boolean }[];
  mediaField?: { key: string; label: string; accept?: string };
  onChange: (val: any[]) => void;
  addLabel?: string;
  maxItems?: number;
}> = ({ items = [], textFields, mediaField, onChange, addLabel = 'Add Row', maxItems }) => {
  const add = () => { 
    if (maxItems && items.length >= maxItems) return;
    const e: any = {}; 
    if (mediaField) e[mediaField.key] = ''; 
    textFields.forEach(f => e[f.key] = ''); 
    onChange([...items, e]); 
  };
  const upd = (i: number, u: any) => { const n = [...items]; n[i] = { ...n[i], ...u }; onChange(n); };
  const del = (i: number) => onChange(items.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-4 p-6 bg-slate-50 border border-slate-100 rounded-3xl transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/40 group">
          <div className="flex-grow space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-4">
              {textFields.map(f => (
                <div key={f.key} className={f.isTextarea ? 'col-span-1 md:col-span-2 lg:col-span-3' : ''}>
                  <label className={labelBase}>{f.label}</label>
                  {f.isTextarea
                    ? <textarea maxLength={f.maxLength} value={item[f.key] || ''} onChange={e => upd(idx, { [f.key]: e.target.value })} className={`${inputBase} !py-3 !px-4 !rounded-xl !text-xs h-20 resize-none`} placeholder={f.placeholder} />
                    : <input maxLength={f.maxLength} value={item[f.key] || ''} onChange={e => upd(idx, { [f.key]: e.target.value })} className={`${inputBase} !py-3 !px-4 !rounded-xl !text-xs`} placeholder={f.placeholder} />
                  }
                </div>
              ))}
            </div>
            {mediaField && (
              <div>
                <label className={labelBase}>{mediaField.label}</label>
                <MediaUploadButton
                  value={item[mediaField.key]}
                  previewUrl={item[mediaField.key + '_preview']}
                  accept={mediaField.accept}
                  onChange={(v, url) => upd(idx, { [mediaField.key]: v, [mediaField.key + '_preview']: url })}
                />
              </div>
            )}
          </div>
          <button
            onClick={() => del(idx)}
            className="self-center p-2 h-max bg-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      ))}
      <button 
        onClick={add} 
        disabled={!!maxItems && items.length >= maxItems}
        className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-sm font-bold text-slate-400 hover:border-blue-500 hover:text-blue-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
        {addLabel} {maxItems ? `(${items.length}/${maxItems})` : ''}
      </button>
    </div>
  );
};


/* ── Complex Nested Manager (For E-Cell Events) ───────────────────────── */
const NestedEventManager: React.FC<{ items: any[]; onChange: (val: any[]) => void; }> = ({ items = [], onChange }) => {
  const addYear = () => onChange([...items, { year: '', events: [] }]);
  const delYear = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const updYear = (i: number, u: any) => { const n = [...items]; n[i] = { ...n[i], ...u }; onChange(n); };

  const addEvent = (yi: number) => {
    const n = [...items];
    if (n[yi].events.length >= 5) return; // Max 5 events per year
    n[yi] = { ...n[yi], events: [...(n[yi].events || []), { title: '', desc: '', speakers: '', participants: '', companies: '' }] };
    onChange(n);
  };
  const delEvent = (yi: number, ei: number) => {
    const n = [...items];
    n[yi] = { ...n[yi], events: n[yi].events.filter((_: any, idx: number) => idx !== ei) };
    onChange(n);
  };
  const updEvent = (yi: number, ei: number, u: any) => {
    const n = [...items];
    const events = [...n[yi].events];
    events[ei] = { ...events[ei], ...u };
    n[yi] = { ...n[yi], events };
    onChange(n);
  };

  return (
    <div className="space-y-6">
      {items.map((yr, yi) => (
        <div key={yi} className="border border-slate-200 rounded-3xl overflow-hidden bg-slate-50">
          <div className="flex items-center gap-3 p-5 bg-white border-b border-slate-100">
            <div className="flex-grow">
              <label className={labelBase}>Academic Year</label>
              <input value={yr.year || ''} onChange={e => updYear(yi, { year: e.target.value })} className={inputBase} placeholder="e.g. 2023-24" />
            </div>
            <button onClick={() => delYear(yi)} className="mt-6 p-2 rounded-xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
          </div>
          <div className="p-4 space-y-3">
            {(yr.events || []).map((ev: any, ei: number) => (
              <div key={ei} className="flex gap-4 p-5 bg-white border border-slate-100 rounded-2xl group relative shadow-sm">
                 <button onClick={() => delEvent(yi, ei)} className="absolute top-4 right-4 p-2 bg-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg></button>
                <div className="flex-grow space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className={labelBase}>Event Title</label><input maxLength={80} value={ev.title || ''} onChange={e => updEvent(yi, ei, { title: e.target.value })} className={`${inputBase} !py-2.5 !px-4 !rounded-xl !text-xs`} placeholder="e.g. E-Summit" /></div>
                    <div><label className={labelBase}>Companies details</label><input value={ev.companies || ''} onChange={e => updEvent(yi, ei, { companies: e.target.value })} className={`${inputBase} !py-2.5 !px-4 !rounded-xl !text-xs`} placeholder="If any..." /></div>
                  </div>
                  <div><label className={labelBase}>Description</label><textarea maxLength={200} value={ev.desc || ''} onChange={e => updEvent(yi, ei, { desc: e.target.value })} className={`${inputBase} !py-2.5 !px-4 !rounded-xl !text-xs resize-none h-16`} placeholder="Short brief..." /></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className={labelBase}>Speakers/Guests</label><input value={ev.speakers || ''} onChange={e => updEvent(yi, ei, { speakers: e.target.value })} className={`${inputBase} !py-2.5 !px-4 !rounded-xl !text-xs`} placeholder="Names..." /></div>
                    <div><label className={labelBase}>Participants count</label><input value={ev.participants || ''} onChange={e => updEvent(yi, ei, { participants: e.target.value })} className={`${inputBase} !py-2.5 !px-4 !rounded-xl !text-xs`} placeholder="e.g. 150+" /></div>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={() => addEvent(yi)} disabled={yr.events.length >= 5} className="w-full py-3 border border-dashed border-blue-300 rounded-2xl text-xs font-bold text-blue-400 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
              + Add Event ({yr.events?.length || 0}/5)
            </button>
          </div>
        </div>
      ))}
      <button onClick={addYear} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-sm font-bold text-slate-400 hover:border-blue-500 hover:text-blue-500 transition-all flex items-center justify-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
        Add Academic Year
      </button>
    </div>
  );
};


/* ── Main Form ──────────────────────────────────────────────────────────────── */
interface TrainingPlacementFormProps { slug: string; onBack: () => void; }

const SLUG_NAMES: Record<string, string> = {
  'placement': 'Placement Cell & Statistics',
  'training':  'Training Events & Guidance',
  'e-cell':    'Entrepreneurship Cell (E-Cell)',
  'iiic':      'Industry Institute Interaction Cell (IIIC)',
};

const TrainingPlacementForm: React.FC<TrainingPlacementFormProps> = ({ slug, onBack }) => {
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

      /* ─── PLACEMENT ─── */
      case 'placement':
        return (
          <div className="space-y-8">
            <SectionCard title="1. Placement Cell Members" icon="👥">
              <p className="text-xs text-slate-500 font-semibold mb-2">Max 2 profiles. Keeps layout clean.</p>
              <TableManager
                items={payload.cellMembers} maxItems={2} addLabel="Add Cell Member"
                onChange={v => setPayload({ ...payload, cellMembers: v })}
                textFields={[
                  { key: 'name', label: 'Name', placeholder: 'Max 50 chars', maxLength: 50 },
                  { key: 'role', label: 'Designation / Role', placeholder: 'Max 50 chars', maxLength: 50 },
                  { key: 'email', label: 'Email', placeholder: 'Max 100 chars', maxLength: 100 },
                  { key: 'mobile', label: 'Mobile Number', placeholder: 'e.g. +91 99670 41168' },
                  { key: 'landline', label: 'Landline / Extension', placeholder: 'e.g. 0250-2338234 (Extn: 219)' },
                ]}
                mediaField={{ key: 'image', label: 'Profile Photo', accept: 'image/*' }}
              />

              {/* ── Training & Placement Committee ── */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Training &amp; Placement Committee</h4>
                <MediaUploadButton
                  value={payload.committeePdf}
                  previewUrl={payload.committeePdfPreview}
                  accept="application/pdf"
                  label="Upload Committee PDF"
                  onChange={(v, url) => setPayload({ ...payload, committeePdf: v, committeePdfPreview: url })}
                />
              </div>
            </SectionCard>

             <SectionCard title="2. Placement Gallery" icon="📸">
              <TableManager
                items={payload.gallery} maxItems={6} addLabel="Add Gallery Image"
                onChange={v => setPayload({ ...payload, gallery: v })}
                textFields={[]}
                mediaField={{ key: 'image', label: 'Upload Image', accept: 'image/*' }}
              />
            </SectionCard>

            <SectionCard title="3. PLACEMENT STATISTICS" icon="📊">
              <div className="space-y-10 mt-4">
                {/* ── 3a. Higher Studies Chart Data ── */}
                <div className="bg-slate-50 rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
                  <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100">
                    <div>
                      <h3 className="text-sm font-extrabold text-[#111827] uppercase tracking-wider">3a. Higher Studies — Chart Data</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Year-wise count of students admitted to higher studies.</p>
                    </div>
                    <div className="flex items-center gap-2 bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-blue-100">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                      Chart Data
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-white/50 border-b border-slate-100">
                          <th className="text-left px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Academic Year</th>
                          <th className="text-left px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">No. of Students</th>
                          <th className="text-right px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {(payload.higherStudies || []).map((row: any, i: number) => (
                          <tr key={i} className="group hover:bg-white transition-all">
                            <td className="px-8 py-4 text-sm font-bold text-slate-900">{row.year}</td>
                            <td className="px-8 py-4 text-sm font-black text-blue-700">{row.count}</td>
                            <td className="px-8 py-4">
                              <div className="flex items-center justify-end gap-2">
                                <button onClick={() => {
                                  const updated = (payload.higherStudies || []).filter((_: any, idx: number) => idx !== i);
                                  setPayload({ ...payload, higherStudies: updated });
                                }} className="w-8 h-8 rounded-xl bg-white text-red-500 border border-slate-100 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-sm">
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {!(payload.higherStudies?.length) && (
                          <tr><td colSpan={3} className="px-8 py-6 text-center text-xs text-slate-400 font-semibold italic">No entries yet. Add a year below.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  {/* Inline add form */}
                  <div className="px-8 py-5 bg-white border-t border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Add Year Entry</p>
                    <div className="flex flex-wrap gap-3 items-end">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Academic Year</label>
                        <input type="text" placeholder="e.g. 2023-24"
                          value={payload._hsYear || ''}
                          onChange={e => setPayload({ ...payload, _hsYear: e.target.value })}
                          className="bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm outline-none w-36"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">No. of Students</label>
                        <input type="number" min="0" placeholder="e.g. 48"
                          value={payload._hsCount || ''}
                          onChange={e => setPayload({ ...payload, _hsCount: e.target.value })}
                          className="bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm outline-none w-32"
                        />
                      </div>
                      <button
                        onClick={() => {
                          if (!payload._hsYear || !payload._hsCount) return;
                          const entry = { year: payload._hsYear, count: payload._hsCount };
                          setPayload({ ...payload, higherStudies: [...(payload.higherStudies || []), entry], _hsYear: '', _hsCount: '' });
                        }}
                        className="flex items-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white font-bold px-5 py-3 rounded-xl text-xs transition-all shadow-sm"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        Add Year
                      </button>
                    </div>
                  </div>
                </div>

                {/* ── 3b. Highest Package Chart Data ── */}
                <div className="bg-slate-50 rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
                  <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100">
                    <div>
                      <h3 className="text-sm font-extrabold text-[#111827] uppercase tracking-wider">3b. Highest Package — Chart Data</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Year-wise highest package offered (in LPA).</p>
                    </div>
                    <div className="flex items-center gap-2 bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-amber-200">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                      Chart Data
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-white/50 border-b border-slate-100">
                          <th className="text-left px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Academic Year</th>
                          <th className="text-left px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Package (LPA)</th>
                          <th className="text-right px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {(payload.highestPackage || []).map((row: any, i: number) => (
                          <tr key={i} className="group hover:bg-white transition-all">
                            <td className="px-8 py-4 text-sm font-bold text-slate-900">{row.year}</td>
                            <td className="px-8 py-4 text-sm font-black text-amber-700">{row.lpa} LPA</td>
                            <td className="px-8 py-4">
                              <div className="flex items-center justify-end gap-2">
                                <button onClick={() => {
                                  const updated = (payload.highestPackage || []).filter((_: any, idx: number) => idx !== i);
                                  setPayload({ ...payload, highestPackage: updated });
                                }} className="w-8 h-8 rounded-xl bg-white text-red-500 border border-slate-100 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-sm">
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {!(payload.highestPackage?.length) && (
                          <tr><td colSpan={3} className="px-8 py-6 text-center text-xs text-slate-400 font-semibold italic">No entries yet. Add a year below.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  {/* Inline add form */}
                  <div className="px-8 py-5 bg-white border-t border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Add Year Entry</p>
                    <div className="flex flex-wrap gap-3 items-end">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Academic Year</label>
                        <input type="text" placeholder="e.g. 2023-24"
                          value={payload._hpYear || ''}
                          onChange={e => setPayload({ ...payload, _hpYear: e.target.value })}
                          className="bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-amber-500 rounded-xl px-4 py-3 text-sm outline-none w-36"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Package (LPA)</label>
                        <input type="number" min="0" step="0.1" placeholder="e.g. 21"
                          value={payload._hpLpa || ''}
                          onChange={e => setPayload({ ...payload, _hpLpa: e.target.value })}
                          className="bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-amber-500 rounded-xl px-4 py-3 text-sm outline-none w-32"
                        />
                      </div>
                      <button
                        onClick={() => {
                          if (!payload._hpYear || !payload._hpLpa) return;
                          const entry = { year: payload._hpYear, lpa: payload._hpLpa };
                          setPayload({ ...payload, highestPackage: [...(payload.highestPackage || []), entry], _hpYear: '', _hpLpa: '' });
                        }}
                        className="flex items-center gap-2 bg-[#1e293b] hover:bg-[#334155] text-white font-bold px-5 py-3 rounded-xl text-xs transition-all shadow-sm"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        Add Year
                      </button>
                    </div>
                  </div>
                </div>

                {/* ── 3c. Yearly Placement Reports (PDF Uploads) ── */}
                <div className="pt-6 border-t border-slate-100">
                  <h4 className="text-sm font-extrabold text-[#111827] uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-lg">📄</span>
                    3c. Yearly Placement Reports (PDFs)
                  </h4>
                  <p className="text-xs text-slate-500 font-semibold mb-6">Upload year-wise placement reports (Max 10 reports). Clicking on the title on the live site will open these PDFs.</p>
                  <TableManager
                    items={payload.stats || []} maxItems={10} addLabel="Add Yearly Report PDF"
                    onChange={v => setPayload({ ...payload, stats: v })}
                    textFields={[
                      { key: 'title', label: 'Report Title', placeholder: 'e.g. Placement 2024-25', maxLength: 50 },
                      { key: 'year', label: 'Academic Year', placeholder: 'e.g. 2024-25' },
                      { key: 'description', label: 'Description', placeholder: 'e.g. Year-wise placement report' },
                    ]}
                    mediaField={{ key: 'pdf', label: 'Upload Placement Report PDF', accept: 'application/pdf' }}
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard title="4. Our Recruiters" icon="🏢">
              <p className="text-xs text-slate-500 font-semibold mb-2">Max 1 consolidated image of logos to maintain grid alignment.</p>
               <TableManager
                items={payload.recruiters} maxItems={1} addLabel="Add Recruiter Logo Layout"
                onChange={v => setPayload({ ...payload, recruiters: v })}
                textFields={[]}
                mediaField={{ key: 'image', label: 'Upload Collage/Logo Grid', accept: 'image/*' }}
              />
            </SectionCard>
          </div>
        );

      /* ─── TRAINING ─── */
      case 'training':
        return (
          <div className="space-y-8">
            <SectionCard title="1. Training Events" icon="📅">
               <p className="text-xs text-slate-500 font-semibold mb-2">Max 10 rows. Keeps table readable.</p>
               <TableManager
                items={payload.events} maxItems={10} addLabel="Add Training Event"
                onChange={v => setPayload({ ...payload, events: v })}
                textFields={[
                  { key: 'name', label: 'Event Name', placeholder: 'Max 80 chars', maxLength: 80 },
                  { key: 'company', label: 'Company / Resource Person', placeholder: 'Max 80 chars', maxLength: 80 },
                  { key: 'date', label: 'Date', placeholder: 'e.g. 12 Oct 2023' },
                ]}
                mediaField={{ key: 'image', label: 'Event Photo / Flyer', accept: 'image/*,.pdf' }}
              />
            </SectionCard>

            <SectionCard title="2. Career Guidance Seminars" icon="🎓">
               <p className="text-xs text-slate-500 font-semibold mb-2">Max 10 seminars. Prevents overcrowding.</p>
               <TableManager
                items={payload.seminars} maxItems={10} addLabel="Add Seminar"
                onChange={v => setPayload({ ...payload, seminars: v })}
                textFields={[
                  { key: 'title', label: 'Seminar Title', placeholder: 'Max 80 chars', maxLength: 80 },
                  { key: 'speaker', label: 'Speaker Details', placeholder: 'Max 100 chars', maxLength: 100, isTextarea: true },
                ]}
                mediaField={{ key: 'image', label: 'Seminar Photo', accept: 'image/*' }}
              />
            </SectionCard>

             <SectionCard title="3. Training Gallery" icon="📸">
              <p className="text-xs text-slate-500 font-semibold mb-2">Max 6 images. Better performance.</p>
              <TableManager
                items={payload.gallery} maxItems={6} addLabel="Add Gallery Image"
                onChange={v => setPayload({ ...payload, gallery: v })}
                textFields={[]}
                mediaField={{ key: 'image', label: 'Upload Image', accept: 'image/*' }}
              />
            </SectionCard>

            <SectionCard title="4. Internship – Industry Logos" icon="🏭">
              <p className="text-xs text-slate-500 font-semibold mb-4">
                Upload the image shown under the heading <em>"Some of the industries where students regularly go for Internships are:"</em>
              </p>
              <div>
                <label className={labelBase}>Internship Industry Logos Image</label>
                <MediaUploadButton
                  value={payload.internshipLogos}
                  previewUrl={payload.internshipLogosPreview}
                  accept="image/*"
                  label="Upload Logos Image"
                  onChange={(v, url) => setPayload({ ...payload, internshipLogos: v, internshipLogosPreview: url })}
                />
              </div>
            </SectionCard>
          </div>
        );

      /* ─── E-CELL ─── */
      case 'e-cell':
        return (
          <div className="space-y-8">
            <SectionCard title="1. E-Cell Events" icon="🚀">
              <p className="text-xs text-slate-500 font-semibold mb-4">Max 5 events per academic year. Add years and manage events inside them.</p>
              <NestedEventManager
                items={payload.ecellEvents}
                onChange={v => setPayload({ ...payload, ecellEvents: v })}
              />
            </SectionCard>

            <SectionCard title="2. Co-ordinators & Members" icon="👔">
              <p className="text-xs text-slate-500 font-semibold mb-4">Max 1 In-charge and 6 Members for a clean grid layout.</p>
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
                <h4 className="text-sm font-bold text-slate-700">Faculty In-charge</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={labelBase}>Name</label>
                    <input maxLength={50} value={payload.inchargeName || ''} onChange={e => setPayload({...payload, inchargeName: e.target.value})} className={inputBase} placeholder="Max 50 chars" />
                  </div>
                   <div>
                    <label className={labelBase}>Email</label>
                    <input value={payload.inchargeEmail || ''} onChange={e => setPayload({...payload, inchargeEmail: e.target.value})} className={inputBase} placeholder="email" />
                  </div>
                   <div>
                    <label className={labelBase}>Phone</label>
                    <input value={payload.inchargePhone || ''} onChange={e => setPayload({...payload, inchargePhone: e.target.value})} className={inputBase} placeholder="phone" />
                  </div>
                </div>

                <div className="border-t border-slate-200 my-6"></div>
                <h4 className="text-sm font-bold text-slate-700">Faculty Members</h4>
                <TableManager
                  items={payload.members} maxItems={6} addLabel="Add Member Name"
                  onChange={v => setPayload({ ...payload, members: v })}
                  textFields={[
                    { key: 'name', label: 'Member Name', placeholder: 'Max 50 chars', maxLength: 50 },
                  ]}
                />
              </div>
            </SectionCard>

             <SectionCard title="3. E-Cell Gallery" icon="📸">
              <p className="text-xs text-slate-500 font-semibold mb-2">Max 6 images. Avoids clutter.</p>
              <TableManager
                items={payload.gallery} maxItems={6} addLabel="Add Gallery Image"
                onChange={v => setPayload({ ...payload, gallery: v })}
                textFields={[]}
                mediaField={{ key: 'image', label: 'Upload Image', accept: 'image/*' }}
              />
            </SectionCard>
          </div>
        );

      /* ─── IIIC ─── */
      case 'iiic':
        return (
          <div className="space-y-8">
            <SectionCard title="IIIC Events" icon="🤝">
              <p className="text-xs text-slate-500 font-semibold mb-4">
                Each event has a short description and a set of images.
              </p>
              <TableManager
                items={payload.iiicEvents} addLabel="Add Event"
                onChange={v => setPayload({ ...payload, iiicEvents: v })}
                textFields={[
                  { key: 'description', label: 'Event Description', placeholder: 'e.g. Successfully completed Internship Program organized by IIIC...', maxLength: 300, isTextarea: true },
                ]}
                mediaField={{ key: 'image', label: 'Event Image', accept: 'image/*' }}
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
        description="Manage placements, training events, E-Cell activities, and IIIC content."
        onSave={handleSubmit}
        isSaving={saving}
        showBackButton
        onBack={onBack}
      />

      <div className="space-y-6 pt-4">{renderContent()}</div>
    </div>
  );
};

export default TrainingPlacementForm;
