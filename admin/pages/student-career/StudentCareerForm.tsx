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
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        )}
        {!value && <span className="text-xs text-slate-400 font-semibold italic">No file chosen</span>}
      </div>
      {isImage && previewUrl && (
        <div className="relative group w-36 h-24 rounded-2xl overflow-hidden border-2 border-slate-200 hover:border-blue-400 transition-all shadow-sm">
          <img src={previewUrl} alt="preview" className="w-full h-full object-cover" />
          <span className="absolute bottom-1.5 right-2 text-[9px] text-white font-black bg-black/50 px-1.5 py-0.5 rounded-md uppercase">Preview</span>
        </div>
      )}
      {isPdf && previewUrl && (
        <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-xl text-[10px] font-bold text-red-600 hover:bg-red-100 transition-all">
          Preview PDF
        </a>
      )}
    </div>
  );
};

/* ── Generic Row Manager ─────────────────────────────────────────── */
const TableManager: React.FC<{
  items: any[];
  textFields: { key: string; label: string; placeholder?: string; maxLength?: number; isTextarea?: boolean }[];
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          <button onClick={() => del(idx)} className="self-center p-2 bg-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      ))}
      <button onClick={add} disabled={!!maxItems && items.length >= maxItems} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-sm font-bold text-slate-400 hover:border-blue-500 hover:text-blue-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
        {addLabel} {maxItems ? `(${items.length}/${maxItems})` : ''}
      </button>
    </div>
  );
};

/* ── Main Form Component ─────────────────────────────────────────────────────── */
interface StudentCareerFormProps { slug: string; onBack: () => void; }

const SLUG_NAMES: Record<string, string> = {
  'cultural-committee': 'Cultural Committee',
  'sports-committee': 'Sports Committee',
  'literati': 'Literati',
  'nss': 'NSS (National Service Scheme)',
  'ebsb': 'EBSB (Ek Bharat Shreshtha Bharat)',
  'ieee': 'IEEE',
  'csi': 'CSI',
  'iete': 'IETE',
  'ishrae': 'ISHRAE',
  'vmea': 'VMEA',
  'hackathon-events': 'Hackathon',
  'nsdc': 'NSDC',
  'igbc': 'IGBC',
  'student-clubs': 'Student Clubs (Overall)',
  'centurion': 'Club Centurion',
  'airnova': 'Club Airnova',
  'emechto': 'Club Emechto',
  'external-projects': 'Ethan / Solecthon',
};

const StudentCareerForm: React.FC<StudentCareerFormProps> = ({ slug, onBack }) => {
  const [payload, setPayload] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeClub, setActiveClub] = useState<'centurion' | 'airnova' | 'emechto' | 'ethan'>('centurion');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (slug === 'centurion') setActiveClub('centurion');
    else if (slug === 'airnova') setActiveClub('airnova');
    else if (slug === 'emechto') setActiveClub('emechto');
    else if (slug === 'external-projects') setActiveClub('ethan');
    setTimeout(() => setLoading(false), 300);
  }, [slug]);

  const save = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setToast({ message: 'Configuration saved successfully', type: 'success' });
    }, 800);
  };

  if (loading) return <div className="p-12 text-center text-slate-400 font-bold animate-pulse">PREPARING FORM...</div>;

  const renderFormContent = () => {
    switch (slug) {
      case 'cultural-committee':
        return (
          <div className="space-y-8">
            <SectionCard title="1. Hero / Overview" icon="🎭">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={labelBase}>Instagram Link</label><input value={payload.hInsta || ''} onChange={e => setPayload({...payload, hInsta: e.target.value})} className={inputBase} placeholder="URL" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className={labelBase}>Highlight Video</label>
                  <MediaUploadButton
                    value={payload.hVid}
                    previewUrl={payload.hVid_preview}
                    onChange={(v,p) => setPayload({...payload, hVid: v, hVid_preview: p})}
                    accept="video/*"
                    label="Upload Highlight Video"
                  />
                </div>
              </div>
              <div className="mt-4"><label className={labelBase}>Hero Banner Image</label><MediaUploadButton value={payload.hImg} previewUrl={payload.hImg_preview} onChange={(v,p) => setPayload({...payload, hImg: v, hImg_preview: p})} /></div>
            </SectionCard>
            <SectionCard title="2. Best Outgoing Student (BOS)" icon="🌟">
              <TableManager 
                items={payload.bos || []} maxItems={1} addLabel="Set Featured Student"
                onChange={v => setPayload({...payload, bos: v})}
                textFields={[
                  { key: 'name', label: 'Student Name', placeholder: 'Max 50 chars', maxLength: 50 },
                  { key: 'dept', label: 'Department', placeholder: 'Max 60 chars', maxLength: 60 },
                  { key: 'batch', label: 'Batch', placeholder: 'e.g. 2020-2024', maxLength: 20 },
                ]}
                mediaField={{ key: 'img', label: 'Student Photo', accept: 'image/*' }}
              />
            </SectionCard>
            <SectionCard title="3. Cultural Events" icon="🎨">
              <TableManager 
                items={payload.events || []} maxItems={12} addLabel="Add Event Card"
                onChange={v => setPayload({...payload, events: v})}
                textFields={[
                  { key: 'title', label: 'Event Title', placeholder: 'Max 50 chars', maxLength: 50 },
                  { key: 'desc', label: 'Event Description', placeholder: 'Max 400 chars', maxLength: 400, isTextarea: true },
                ]}
              />
            </SectionCard>
            <SectionCard title="4. Cultural Gallery" icon="📸">
              <TableManager 
                items={payload.gallery || []} maxItems={24} addLabel="Add Gallery Image"
                onChange={v => setPayload({...payload, gallery: v})}
                textFields={[]}
                mediaField={{ key: 'img', label: 'Photograph', accept: 'image/*' }}
              />
            </SectionCard>
            <SectionCard title="5. Cultural Team" icon="👥">
              <div>
                <label className={labelBase}>Academic Year</label>
                <input
                  maxLength={20}
                  value={payload.teamYear || ''}
                  onChange={e => setPayload({...payload, teamYear: e.target.value})}
                  className={inputBase}
                  placeholder="e.g. 2025-26"
                />
              </div>
              <TableManager 
                items={payload.team || []} maxItems={25} addLabel="Add Team Member"
                onChange={v => setPayload({...payload, team: v})}
                textFields={[
                  { key: 'pos', label: 'Position', placeholder: 'e.g. Secretary', maxLength: 50 },
                  { key: 'name', label: 'Member Name', placeholder: 'Max 60 chars', maxLength: 60 },
                  { key: 'dept', label: 'Department', placeholder: 'e.g. Computer Engg', maxLength: 60 },
                ]}
              />
            </SectionCard>
          </div>
        );

      case 'sports-committee':
        return (
          <div className="space-y-8">
            <SectionCard title="1. Hero / Overview" icon="🏆">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={labelBase}>Instagram Link</label><input value={payload.hInsta || ''} onChange={e => setPayload({...payload, hInsta: e.target.value})} className={inputBase} placeholder="URL" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={labelBase}>Hero Background Image</label><MediaUploadButton value={payload.hImg} previewUrl={payload.hImg_preview} onChange={(v,p) => setPayload({...payload, hImg: v, hImg_preview: p})} accept="image/*" /></div>
                <div><label className={labelBase}>Committee PDF</label><MediaUploadButton value={payload.hPdf} previewUrl={payload.hPdf_preview} onChange={(v,p) => setPayload({...payload, hPdf: v, hPdf_preview: p})} accept=".pdf" label="Upload Committee PDF" /></div>
              </div>
            </SectionCard>

            <SectionCard title="2. Events" icon="⚽">
              <TableManager 
                items={payload.events || []} maxItems={12} addLabel="Add Sports Event"
                onChange={v => setPayload({...payload, events: v})}
                textFields={[
                  { key: 'title', label: 'Event Title', placeholder: 'e.g. AVAHAN', maxLength: 50 },
                  { key: 'desc', label: 'Event Description', placeholder: 'Max 400 chars', maxLength: 400, isTextarea: true },
                ]}
              />
            </SectionCard>
            <SectionCard title="3. Gallery" icon="📸">
              <TableManager 
                items={payload.gallery || []} maxItems={24} addLabel="Add Action Shot"
                onChange={v => setPayload({...payload, gallery: v})}
                textFields={[]}
                mediaField={{ key: 'img', label: 'Photograph', accept: 'image/*' }}
              />
            </SectionCard>
            <SectionCard title="4. Team (Committee Members)" icon="👥">
              <div className="mb-6 pb-6 border-b border-slate-100">
                <label className={labelBase}>Sports Student PDF Card Title</label>
                <input value={payload.pdfTitle || ''} onChange={e => setPayload({...payload, pdfTitle: e.target.value})} className={inputBase} placeholder="e.g. Sports Student Committee" />
                <div className="mt-4"><MediaUploadButton value={payload.pdfFile} previewUrl={payload.pdfFile_preview} onChange={(v,p) => setPayload({...payload, pdfFile: v, pdfFile_preview: p})} accept=".pdf" label="Upload Special PDF" /></div>
              </div>
              <div className="mb-4">
                <label className={labelBase}>Academic Year</label>
                <input
                  maxLength={20}
                  value={payload.teamYear || ''}
                  onChange={e => setPayload({...payload, teamYear: e.target.value})}
                  className={inputBase}
                  placeholder="e.g. 2025-26"
                />
              </div>
              <TableManager 
                items={payload.team || []} maxItems={20} addLabel="Add Member Row"
                onChange={v => setPayload({...payload, team: v})}
                textFields={[
                  { key: 'pos', label: 'Designation', placeholder: 'e.g. Sports Secretary', maxLength: 50 },
                  { key: 'name', label: 'Name', placeholder: 'Max 60 chars', maxLength: 60 },
                ]}
              />
            </SectionCard>
          </div>
        );

      case 'literati':
        return (
          <div className="space-y-8">
          <SectionCard title="1. Intro Links" icon="✍️">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className={labelBase}>Instagram Link</label><input value={payload.hInsta || ''} onChange={e => setPayload({...payload, hInsta: e.target.value})} className={inputBase} /></div>
            </div>
            </SectionCard>
            <SectionCard title="2. Literary Events" icon="📖">
               <TableManager items={payload.events || []} maxItems={12} addLabel="Add Event Card" onChange={v => setPayload({...payload, events: v})} textFields={[{ key: 'title', label: 'Title', placeholder: 'e.g. Debate', maxLength: 50 }, { key: 'desc', label: 'Description', placeholder: 'Max 400', isTextarea: true }]} />
            </SectionCard>
            <SectionCard title="3. Gallery" icon="📸">
               <TableManager items={payload.gallery || []} maxItems={24} addLabel="Add Photo" onChange={v => setPayload({...payload, gallery: v})} textFields={[]} mediaField={{ key: 'img', label: 'Photo' }} />
            </SectionCard>
          <SectionCard title="4. Team" icon="👥">
            <div className="mb-6 pb-6 border-b border-slate-100">
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Staff Incharge</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><MediaUploadButton value={payload.cImg} previewUrl={payload.cImg_preview} onChange={(v,p) => setPayload({...payload, cImg: v, cImg_preview: p})} label="Upload Staff Photo" /></div>
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                 <input maxLength={60} value={payload.cName || ''} onChange={e => setPayload({...payload, cName: e.target.value})} className={inputBase} placeholder="Staff Name" />
                 <input maxLength={80} value={payload.cDept || ''} onChange={e => setPayload({...payload, cDept: e.target.value})} className={inputBase} placeholder="Department" />
                 <input value={payload.cMail || ''} onChange={e => setPayload({...payload, cMail: e.target.value})} className={inputBase} placeholder="Email" />
                </div>
              </div>
            </div>
               <div>
                 <label className={labelBase}>Academic Year</label>
                 <input
                   maxLength={20}
                   value={payload.teamYear || ''}
                   onChange={e => setPayload({...payload, teamYear: e.target.value})}
                   className={inputBase}
                   placeholder="e.g. 2025-26"
                 />
               </div>
               <TableManager items={payload.team || []} maxItems={25} addLabel="Add Member" onChange={v => setPayload({...payload, team: v})} textFields={[{ key: 'name', label: 'Name', maxLength: 60 }, { key: 'pos', label: 'Position', maxLength: 50 }, { key: 'dept', label: 'Department', maxLength: 60 }]} />
            </SectionCard>
            <SectionCard title="5. Vista Magazine" icon="📚">
              <TableManager
                items={payload.magazines || []}
                maxItems={10}
                addLabel="Add Magazine"
                onChange={v => setPayload({...payload, magazines: v})}
                textFields={[{ key: 'title', label: 'Magazine Title', maxLength: 80 }]}
                mediaField={{ key: 'pdf', label: 'Magazine PDF', accept: '.pdf' }}
              />
            </SectionCard>
          </div>
        );

      case 'nss':
        return (
          <div className="space-y-8">
            <SectionCard title="1. NSS Events & Social" icon="❤️">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div><label className={labelBase}>Instagram Link Label</label><input maxLength={100} value={payload.instaLab || ''} onChange={e => setPayload({...payload, instaLab: e.target.value})} className={inputBase} /></div>
                <div><label className={labelBase}>Instagram URL</label><input value={payload.instaUrl || ''} onChange={e => setPayload({...payload, instaUrl: e.target.value})} className={inputBase} /></div>
              </div>
              <TableManager items={payload.events || []} maxItems={24} addLabel="Add Service Event" onChange={v => setPayload({...payload, events: v})} textFields={[{ key: 'title', label: 'Title', maxLength: 50 }, { key: 'desc', label: 'Description', maxLength: 400, isTextarea: true }]} />
            </SectionCard>
            <SectionCard title="2. NSS Gallery" icon="📸">
               <TableManager items={payload.gallery || []} maxItems={24} addLabel="Add Photo" onChange={v => setPayload({...payload, gallery: v})} textFields={[]} mediaField={{ key: 'img', label: 'Photo' }} />
            </SectionCard>
            <SectionCard title="3. NSS Team Sections" icon="👥">
               <div className="space-y-10">
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                     <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">A. Featured Co-ordinator</h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="lg:col-span-1"><MediaUploadButton value={payload.cImg} previewUrl={payload.cImg_preview} onChange={(v,p) => setPayload({...payload, cImg: v, cImg_preview: p})} label="Coord. Photo" /></div>
                        <div className="lg:col-span-2 space-y-4">
                           <input maxLength={60} value={payload.cName || ''} onChange={e => setPayload({...payload, cName: e.target.value})} className={inputBase} placeholder="Coordinator Name" />
                          <input maxLength={80} value={payload.cDept || ''} onChange={e => setPayload({...payload, cDept: e.target.value})} className={inputBase} placeholder="Department" />
                           <div className="grid grid-cols-2 gap-4">
                              <input value={payload.cMail || ''} onChange={e => setPayload({...payload, cMail: e.target.value})} className={inputBase} placeholder="Email" />
                              <input value={payload.cPhone || ''} onChange={e => setPayload({...payload, cPhone: e.target.value})} className={inputBase} placeholder="Phone" />
                           </div>
                        </div>
                     </div>
                  </div>
                  <div>
                     <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4 ml-1">B. Staff Committee (3-Column Table)</h4>
                     <TableManager items={payload.staff || []} maxItems={12} addLabel="Add Staff Member" onChange={v => setPayload({...payload, staff: v})} textFields={[{key:'pos', label:'Post', maxLength:50}, {key:'name', label:'Name', maxLength:60}, {key:'dept', label:'Department', maxLength:60}]} />
                  </div>
                  <div>
                     <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4 ml-1">C. Student Core Committee (2-Column Table)</h4>
                    <div className="mb-4">
                      <label className={labelBase}>Academic Year</label>
                      <input
                       maxLength={20}
                       value={payload.teamYear || ''}
                       onChange={e => setPayload({...payload, teamYear: e.target.value})}
                       className={inputBase}
                       placeholder="e.g. 2024-25"
                      />
                    </div>
                     <TableManager items={payload.studs || []} maxItems={20} addLabel="Add Student Coord" onChange={v => setPayload({...payload, studs: v})} textFields={[{key:'pos', label:'Post', maxLength:50}, {key:'name', label:'Name', maxLength:60}]} />
                  </div>
               </div>
            </SectionCard>
          </div>
        );

      case 'ebsb':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
          <SectionCard title="1. Events & Activities" icon="🎉">
              <div className="mb-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">Glimpse of EBSB activities</h4>
                <TableManager 
                   items={payload.events || []} maxItems={12} addLabel="Add Activity Card" 
                   onChange={v => setPayload({...payload, events: v})} 
                   textFields={[{key:'title', label:'TITLE', maxLength:100}, {key:'desc', label:'DESCRIPTION', maxLength:800, isTextarea: true}]} 
                />
              </div>
            </SectionCard>

          <SectionCard title="2. EBSB Gallery" icon="📸">
              <TableManager items={payload.gallery || []} maxItems={24} addLabel="Add Photograph" onChange={v => setPayload({...payload, gallery: v})} textFields={[]} mediaField={{key:'img', label:'Photograph'}} />
            </SectionCard>

          <SectionCard title="3. Committee Team" icon="👥">
               <div className="space-y-10">
                  <div className="bg-slate-50 p-7 rounded-[2rem] border border-slate-100">
                     <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-200 pb-2">A. In-Charge & Advisory</h4>
                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1"><MediaUploadButton value={payload.cImg} previewUrl={payload.cImg_preview} onChange={(v,p) => setPayload({...payload, cImg: v, cImg_preview: p})} label="Upload Photo" /></div>
                        <div className="lg:col-span-2 space-y-4">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div><label className={labelBase}>Member Name</label><input maxLength={60} value={payload.cName || ''} onChange={e => setPayload({...payload, cName: e.target.value})} className={inputBase} /></div>
                      <div><label className={labelBase}>Department</label><input maxLength={60} value={payload.cDept || ''} onChange={e => setPayload({...payload, cDept: e.target.value})} className={inputBase} /></div>
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div><label className={labelBase}>Email ID</label><input value={payload.cMail || ''} onChange={e => setPayload({...payload, cMail: e.target.value})} className={inputBase} /></div>
                           </div>
                        </div>
                     </div>
                  </div>
                  
                  <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">B. Staff Committee Table</h4>
                    <TableManager 
                       items={payload.staff || []} maxItems={12} addLabel="Add Staff Member" 
                       onChange={v => setPayload({...payload, staff: v})} 
                       textFields={[{key:'role', label:'ROLE', maxLength:50}, {key:'name', label:'NAME', maxLength:60}, {key:'dept', label:'DEPARTMENT', maxLength:60}]} 
                    />
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">C. Student Committee Table</h4>
                    <TableManager 
                       items={payload.studs || []} maxItems={15} addLabel="Add Student Member" 
                       onChange={v => setPayload({...payload, studs: v})} 
                       textFields={[{key:'role', label:'ROLE', maxLength:50}, {key:'name', label:'NAME', maxLength:60}, {key:'dept', label:'DEPARTMENT', maxLength:60}]} 
                    />
                  </div>
               </div>
            </SectionCard>
          </div>
        );

      case 'ieee':
      case 'csi':
      case 'iete':
      case 'ishrae':
      case 'vmea':
      case 'hackathon-events':
      case 'nsdc':
      case 'igbc':
        return (
          <div className="space-y-8">
            <SectionCard title="1. Hero / Metrics" icon="⚡">
               <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">Impact Metrics (Max 4)</h4>
               <TableManager items={payload.metrics || []} maxItems={4} addLabel="Add Metric Card" onChange={v => setPayload({...payload, metrics: v})} textFields={[{key:'lab', label:'Label (e.g. Members)', maxLength:40}, {key:'val', label:'Value (e.g. 100+)', maxLength:30}]} />
            </SectionCard>

            {slug !== 'nsdc' && (
              <SectionCard title="1B. Sidebar Highlights" icon="✨">
                <TableManager
                  items={payload.highlights || []}
                  maxItems={3}
                  addLabel="Add Highlight"
                  onChange={v => setPayload({...payload, highlights: v})}
                  textFields={[
                    { key: 'val', label: 'Value (e.g. 150+)', maxLength: 30 },
                    { key: 'label', label: 'Label (e.g. Members)', maxLength: 40 },
                  ]}
                />
              </SectionCard>
            )}

            {slug !== 'hackathon-events' && slug !== 'nsdc' && slug !== 'csi' && (
              <SectionCard title="2. Events & Activities" icon="⚙️">
                {['ieee', 'iete', 'ishrae', 'vmea', 'igbc'].includes(slug) && (
                  <div className="mb-8 p-6 bg-blue-50/50 rounded-[2rem] border border-blue-100">
                    <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-4">Featured Event Photos (Max 2)</label>
                    <TableManager items={payload.featured || []} maxItems={2} addLabel="Add Featured Banner" onChange={v => setPayload({...payload, featured: v})} textFields={[]} mediaField={{key:'img', label:'Featured Banner'}} />
                  </div>
                )}
                
                <div className="mb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Archive of Club Activities</div>
                <TableManager items={payload.events || []} maxItems={15} addLabel="Add Activity Card" onChange={v => setPayload({...payload, events: v})} textFields={[{key:'title', label:'Title', maxLength:60}, {key:'desc', label:'Summary', maxLength:400, isTextarea: true}]} />
              </SectionCard>
            )}

            {slug === 'nsdc' && null}

            {slug === 'hackathon-events' && (
               <div className="space-y-8">
                 <SectionCard title="2. Faculty Coordinators" icon="👩‍🏫">
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">Staff Coordinators Table</h4>
                   <TableManager items={payload.staff || []} maxItems={20} addLabel="Add Faculty" onChange={v => setPayload({...payload, staff: v})} textFields={[{key:'sr', label:'SR. NO.', maxLength:6}, {key:'name', label:'NAME', maxLength:80}]} />
                 </SectionCard>

                 <SectionCard title="3. Committee Roles" icon="👥">
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">Committee Roles Table</h4>
                   <TableManager items={payload.team || []} maxItems={25} addLabel="Add Committee Post" onChange={v => setPayload({...payload, team: v})} textFields={[{key:'pos', label:'POST / ROLE', maxLength:60}, {key:'names', label:'NAME(S)', maxLength:200, isTextarea: true}]} />
                 </SectionCard>

                 <SectionCard title="4. Hackathon Image Gallery" icon="📸">
                    <TableManager items={payload.gallery || []} maxItems={30} addLabel="Add Gallery Photograph" onChange={v => setPayload({...payload, gallery: v})} textFields={[{key:'cap', label:'Caption (if show on hover)', maxLength:100}]} mediaField={{key:'img', label:'Photograph'}} />
                 </SectionCard>
               </div>
            )}

            {slug === 'csi' && (
              <div className="space-y-8">
                <SectionCard title="2. Faculty Team" icon="👩‍🏫">
                  <TableManager
                    items={payload.faculty || []}
                    maxItems={6}
                    addLabel="Add Faculty Card"
                    onChange={v => setPayload({...payload, faculty: v})}
                    textFields={[
                      { key: 'name', label: 'Faculty Name', maxLength: 60 },
                      { key: 'dept', label: 'Department', maxLength: 60 },
                      { key: 'email', label: 'Email', maxLength: 100 },
                      { key: 'phone', label: 'Phone', maxLength: 20 },
                    ]}
                    mediaField={{ key: 'img', label: 'Faculty Photo', accept: 'image/*' }}
                  />
                </SectionCard>
                <SectionCard title="3. Student Committee" icon="👥">
                  <TableManager
                    items={payload.team || []}
                    maxItems={30}
                    addLabel="Add Committee Member"
                    onChange={v => setPayload({...payload, team: v})}
                    textFields={[
                      { key: 'pos', label: 'Position', maxLength: 60 },
                      { key: 'name', label: 'Name', maxLength: 60 },
                      { key: 'dept', label: 'Department', maxLength: 40 },
                    ]}
                  />
                </SectionCard>
              </div>
            )}

            {slug !== 'nsdc' && slug !== 'hackathon-events' && (
              <SectionCard title="3. Photo Gallery" icon="📸">
                 <TableManager items={payload.gallery || []} maxItems={30} addLabel="Add Gallery Photograph" onChange={v => setPayload({...payload, gallery: v})} textFields={[{key:'cap', label:'Caption (if show on hover)', maxLength:100}]} mediaField={{key:'img', label:'Photograph'}} />
               </SectionCard>
            )}

            {slug !== 'hackathon-events' && slug !== 'nsdc' && slug !== 'csi' && (
              <SectionCard title="4. Technical Team leadership" icon="👥">
                <div className="bg-white border-2 border-slate-50 rounded-[2rem] p-6 space-y-8 shadow-inner shadow-slate-100/50">
                   <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Faculty In-Charge / Counselor Profile</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-1"><MediaUploadButton value={payload.cImg} previewUrl={payload.cImg_preview} onChange={(v,p) => setPayload({...payload, cImg: v, cImg_preview: p})} label="Profile Photo" /></div>
                      <div className="lg:col-span-2 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                           <input maxLength={60} value={payload.cName || ''} onChange={e => setPayload({...payload, cName: e.target.value})} className={inputBase} placeholder="Full Name" />
                           <input maxLength={50} value={payload.cPos || ''} onChange={e => setPayload({...payload, cPos: e.target.value})} className={inputBase} placeholder="Post (e.g. Branch Counselor)" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <input value={payload.cMail || ''} onChange={e => setPayload({...payload, cMail: e.target.value})} className={inputBase} placeholder="Email" />
                           <input value={payload.cPhone || ''} onChange={e => setPayload({...payload, cPhone: e.target.value})} className={inputBase} placeholder="Contact No" />
                        </div>
                        {slug === 'igbc' && (
                          <div className="grid grid-cols-2 gap-4">
                            <input maxLength={30} value={payload.cTitle || ''} onChange={e => setPayload({...payload, cTitle: e.target.value})} className={inputBase} placeholder="Title (e.g. Faculty Incharge)" />
                            <input maxLength={4} value={payload.cInitials || ''} onChange={e => setPayload({...payload, cInitials: e.target.value})} className={inputBase} placeholder="Initials" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {slug === 'ieee' && (
                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Student Core Committee Table</h4>
                      <TableManager items={payload.team || []} maxItems={25} addLabel="Add Committee Member" onChange={v => setPayload({...payload, team: v})} textFields={[{key:'pos', label:'POSITION', maxLength:60}, {key:'cls', label:'CLASS', maxLength:30}, {key:'name', label:'NAME', maxLength:60}]} />
                    </div>
                  )}

                  {slug === 'vmea' && (
                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Core Committee Table</h4>
                      <TableManager items={payload.team || []} maxItems={25} addLabel="Add Committee Member" onChange={v => setPayload({...payload, team: v})} textFields={[{key:'pos', label:'POST', maxLength:60}, {key:'name', label:'NAME', maxLength:60}]} />
                    </div>
                  )}

                  {slug === 'igbc' && (
                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Student Committee Table</h4>
                      <TableManager items={payload.team || []} maxItems={25} addLabel="Add Committee Member" onChange={v => setPayload({...payload, team: v})} textFields={[{key:'pos', label:'POSITION', maxLength:60}, {key:'cls', label:'CLASS', maxLength:30}, {key:'name', label:'NAME', maxLength:60}]} />
                    </div>
                  )}

                  {slug === 'iete' && (
                    <div className="space-y-8">
                      <div>
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Co-Ordinators Final Year</h4>
                        <TableManager items={payload.teamFinal || []} maxItems={20} addLabel="Add Final Year Member" onChange={v => setPayload({...payload, teamFinal: v})} textFields={[{key:'pos', label:'POST', maxLength:60}, {key:'name', label:'NAME', maxLength:80}]} />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Third Year Members</h4>
                        <TableManager items={payload.teamThird || []} maxItems={20} addLabel="Add Third Year Member" onChange={v => setPayload({...payload, teamThird: v})} textFields={[{key:'pos', label:'POST', maxLength:60}, {key:'name', label:'NAME', maxLength:80}]} />
                      </div>
                    </div>
                  )}

                  {slug === 'ishrae' && (
                    <div className="space-y-8">
                      <div>
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Committee Year Labels</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <input
                            maxLength={20}
                            value={payload.teamCoreYear || ''}
                            onChange={e => setPayload({...payload, teamCoreYear: e.target.value})}
                            className={inputBase}
                            placeholder="Core Committee Year (e.g. 2024-25)"
                          />
                          <input
                            maxLength={20}
                            value={payload.team2024Year || ''}
                            onChange={e => setPayload({...payload, team2024Year: e.target.value})}
                            className={inputBase}
                            placeholder="Members Group 1 Year"
                          />
                          <input
                            maxLength={20}
                            value={payload.team2021Year || ''}
                            onChange={e => setPayload({...payload, team2021Year: e.target.value})}
                            className={inputBase}
                            placeholder="Members Group 2 Year"
                          />
                        </div>
                      </div>

                      <div>
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Core Committee</h4>
                        <TableManager items={payload.teamCore || []} maxItems={25} addLabel="Add Core Committee Member" onChange={v => setPayload({...payload, teamCore: v})} textFields={[{key:'pos', label:'POSITION', maxLength:60}, {key:'cls', label:'CLASS', maxLength:30}, {key:'name', label:'NAME', maxLength:80}]} />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Member Group 1</h4>
                        <TableManager items={payload.team2024 || []} maxItems={30} addLabel="Add Member Group 1" onChange={v => setPayload({...payload, team2024: v})} textFields={[{key:'pos', label:'POSITION', maxLength:60}, {key:'cls', label:'CLASS', maxLength:30}, {key:'name', label:'NAME', maxLength:80}]} />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Member Group 2</h4>
                        <TableManager items={payload.team2021 || []} maxItems={40} addLabel="Add Member Group 2" onChange={v => setPayload({...payload, team2021: v})} textFields={[{key:'pos', label:'POSITION', maxLength:60}, {key:'cls', label:'CLASS', maxLength:30}, {key:'name', label:'NAME', maxLength:80}]} />
                      </div>
                    </div>
                  )}
                </div>
              </SectionCard>
            )}
          </div>
        );

      case 'student-clubs':
      case 'centurion':
      case 'airnova':
      case 'emechto':
      case 'external-projects':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
             {slug === 'external-projects' && (
                <SectionCard title="Standalone Project Links" icon="🔗">
                  <p className="text-xs text-slate-500 font-semibold mb-4">Provide the external website link for Project Ethan / Solecthon.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div><label className={labelBase}>Ethan Website URL</label><input value={payload.ethanUrl || ''} onChange={e => setPayload({...payload, ethanUrl: e.target.value})} className={inputBase} placeholder="https://..." /></div>
                     <div><label className={labelBase}>Solecthon Website URL</label><input value={payload.solecthonUrl || ''} onChange={e => setPayload({...payload, solecthonUrl: e.target.value})} className={inputBase} placeholder="https://..." /></div>
                  </div>
                </SectionCard>
             )}

             {slug !== 'external-projects' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                   <SectionCard title="1. Impact Metrics (By the Numbers)" icon="📊">
                      <p className="text-xs text-slate-500 font-semibold mb-6">These appear in the prominent highlights bar (e.g., "120+ Team Members").</p>
                      <TableManager items={payload.metrics || []} maxItems={4} addLabel="Add Metric Card" onChange={v => setPayload({...payload, metrics: v})} textFields={[{key:'val', label:'VALUE (e.g. 5+)', maxLength:20}, {key:'lab', label:'LABEL (e.g. VEHICLES)', maxLength:40}]} />
                   </SectionCard>

                   <SectionCard title="2. Competition Achievements" icon="🏁">
                      <div className="mb-4 text-xs text-slate-500 font-semibold uppercase tracking-widest ml-1">Historical Performance & Results</div>
                      {slug === 'centurion' && (
                        <TableManager
                          items={payload.results || []}
                          maxItems={25}
                          addLabel="Add Achievement Row"
                          onChange={v => setPayload({...payload, results: v})}
                          textFields={[
                            {key:'team', label:'TEAM', maxLength:80},
                            {key:'event', label:'EVENT', maxLength:120},
                            {key:'result', label:'RESULT', maxLength:120},
                          ]}
                        />
                      )}
                      {slug === 'airnova' && (
                        <TableManager
                          items={payload.results || []}
                          maxItems={20}
                          addLabel="Add Competition Entry"
                          onChange={v => setPayload({...payload, results: v})}
                          textFields={[
                            {key:'event', label:'EVENT', maxLength:120},
                            {key:'result', label:'RESULT', maxLength:120},
                            {key:'project', label:'PROJECT / NOTES', maxLength:120},
                          ]}
                          mediaField={{ key:'img', label:'Competition Image', accept:'image/*' }}
                        />
                      )}
                      {slug === 'emechto' && (
                        <TableManager
                          items={payload.results || []}
                          maxItems={12}
                          addLabel="Add Competition Entry"
                          onChange={v => setPayload({...payload, results: v})}
                          textFields={[
                            {key:'title', label:'COMPETITION / EDITION', maxLength:120},
                            {key:'desc', label:'DESCRIPTION', maxLength:350, isTextarea:true},
                            {key:'result', label:'RESULT / RANK', maxLength:120},
                          ]}
                        />
                      )}
                   </SectionCard>

                   <SectionCard title="3. Sponsors & Gallery" icon="🖼️">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                         <div className="space-y-4">
                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Sponsor Content</h4>
                            {slug === 'centurion' && (
                              <div className="space-y-4">
                                <TableManager items={payload.logos || []} maxItems={30} addLabel="Add Sponsor Logo" onChange={v => setPayload({...payload, logos: v})} textFields={[]} mediaField={{key:'img', label:'Logo'}} />
                                <div>
                                  <label className={labelBase}>Sponsors Description</label>
                                  <textarea
                                    value={payload.sponsorText || ''}
                                    onChange={e => setPayload({...payload, sponsorText: e.target.value})}
                                    className={`${inputBase} h-28 resize-none`}
                                    placeholder="Sponsors section text"
                                    maxLength={400}
                                  />
                                </div>
                              </div>
                            )}
                            {slug === 'airnova' && (
                              <div className="space-y-4">
                                <TableManager items={payload.logos || []} maxItems={30} addLabel="Add Sponsor Logo" onChange={v => setPayload({...payload, logos: v})} textFields={[]} mediaField={{key:'img', label:'Logo'}} />
                                <div>
                                  <label className={labelBase}>Sponsors Description</label>
                                  <textarea
                                    value={payload.sponsorText || ''}
                                    onChange={e => setPayload({...payload, sponsorText: e.target.value})}
                                    className={`${inputBase} h-28 resize-none`}
                                    placeholder="Sponsors section text"
                                    maxLength={400}
                                  />
                                </div>
                              </div>
                            )}
                            {slug === 'emechto' && (
                              <div className="space-y-4">
                                <TableManager items={payload.logos || []} maxItems={30} addLabel="Add Sponsor Logo" onChange={v => setPayload({...payload, logos: v})} textFields={[]} mediaField={{key:'img', label:'Logo'}} />
                                <div>
                                  <label className={labelBase}>Sponsors Description</label>
                                  <textarea
                                    value={payload.sponsorText || ''}
                                    onChange={e => setPayload({...payload, sponsorText: e.target.value})}
                                    className={`${inputBase} h-28 resize-none`}
                                    placeholder="Sponsors section text"
                                    maxLength={400}
                                  />
                                </div>
                                <div>
                                  <label className={labelBase}>Sponsorship Amount</label>
                                  <input
                                    value={payload.sponsorAmount || ''}
                                    onChange={e => setPayload({...payload, sponsorAmount: e.target.value})}
                                    className={inputBase}
                                    placeholder="e.g. Rs. 26,500"
                                    maxLength={60}
                                  />
                                </div>
                              </div>
                            )}
                         </div>
                         <div className="space-y-4 font-black uppercase text-slate-500 text-[10px]">
                            <h4 className="ml-1 tracking-widest">Gallery</h4>
                            <TableManager items={payload.gallery || []} maxItems={60} addLabel="Add Photograph" onChange={v => setPayload({...payload, gallery: v})} textFields={[]} mediaField={{key:'img', label:'Photo', accept:'image/*'}} />
                         </div>
                      </div>
                   </SectionCard>

                   {slug === 'centurion' && (
                     <SectionCard title="4. Event Videos" icon="🎬">
                        <TableManager
                          items={payload.videos || []}
                          maxItems={20}
                          addLabel="Add Event Video"
                          onChange={v => setPayload({...payload, videos: v})}
                          textFields={[{key:'title', label:'Video Title', maxLength:100}]}
                          mediaField={{key:'vid', label:'Video File', accept:'video/*'}}
                        />
                     </SectionCard>
                   )}

                   <SectionCard title={slug === 'centurion' ? '5. Professional Team' : '4. Professional Team'} icon="👥">
                      <div className="space-y-8">
                        <div className="bg-slate-50/50 p-7 rounded-[2rem] border border-slate-100 flex flex-col md:flex-row gap-8">
                           <div className="w-40 shrink-0"><MediaUploadButton value={payload.fImg} previewUrl={payload.fImg_p} onChange={(v,p) => setPayload({...payload, fImg: v, fImg_p: p})} label="Upload Advisor" /></div>
                           <div className="grow space-y-4">
                              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Faculty Advisor / In-Charge</h4>
                              <div className="grid grid-cols-2 gap-4">
                                 <input maxLength={60} value={payload.fName || ''} onChange={e => setPayload({...payload, fName: e.target.value})} className={inputBase} placeholder="Full Name" />
                                 <input maxLength={80} value={payload.fDesig || ''} onChange={e => setPayload({...payload, fDesig: e.target.value})} className={inputBase} placeholder="Official Designation" />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                 <input value={payload.fMail || ''} onChange={e => setPayload({...payload, fMail: e.target.value})} className={inputBase} placeholder="Official Email ID" />
                                 <input value={payload.fPhone || ''} onChange={e => setPayload({...payload, fPhone: e.target.value})} className={inputBase} placeholder="Phone Contact" />
                              </div>
                           </div>
                        </div>
                        {slug === 'centurion' && (
                          <div>
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">Team Members</h4>
                            <TableManager items={payload.team || []} maxItems={60} addLabel="Add Team Member" onChange={v => setPayload({...payload, team: v})} textFields={[{key:'name', label:'NAME', maxLength:60}, {key:'pos', label:'POSITION', maxLength:60}, {key:'sub', label:'SUBSYSTEM', maxLength:60}]} />
                          </div>
                        )}
                        {slug === 'airnova' && (
                          <div>
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">Team Members</h4>
                            <TableManager items={payload.team || []} maxItems={80} addLabel="Add Team Member" onChange={v => setPayload({...payload, team: v})} textFields={[{key:'name', label:'NAME', maxLength:60}, {key:'contact', label:'CONTACT', maxLength:25}, {key:'pos', label:'POSITION', maxLength:80}]} />
                          </div>
                        )}
                        {slug === 'emechto' && (
                          <div className="space-y-8">
                            <div>
                              <label className={labelBase}>Team Group 1 Academic Year</label>
                              <input maxLength={20} value={payload.teamYear1 || ''} onChange={e => setPayload({...payload, teamYear1: e.target.value})} className={inputBase} placeholder="e.g. 2023-24" />
                              <div className="mt-4">
                                <TableManager items={payload.team1 || []} maxItems={60} addLabel="Add Team 1 Member" onChange={v => setPayload({...payload, team1: v})} textFields={[{key:'name', label:'NAME', maxLength:60}, {key:'branch', label:'BRANCH-YEAR', maxLength:60}, {key:'post', label:'POST', maxLength:80}]} />
                              </div>
                            </div>
                            <div>
                              <label className={labelBase}>Team Group 2 Academic Year</label>
                              <input maxLength={20} value={payload.teamYear2 || ''} onChange={e => setPayload({...payload, teamYear2: e.target.value})} className={inputBase} placeholder="e.g. 2019-20" />
                              <div className="mt-4">
                                <TableManager items={payload.team2 || []} maxItems={60} addLabel="Add Team 2 Member" onChange={v => setPayload({...payload, team2: v})} textFields={[{key:'name', label:'NAME', maxLength:60}, {key:'branch', label:'BRANCH', maxLength:60}, {key:'post', label:'POST', maxLength:80}]} />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                   </SectionCard>

                   <SectionCard title={slug === 'centurion' ? '6. Contact & Social Presence' : '5. Contact & Social Presence'} icon="📞">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                         <div className="space-y-6">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Contacts (Team Leads)</h4>
                            <TableManager items={payload.contacts || []} maxItems={8} addLabel="Add Contact Row" onChange={v => setPayload({...payload, contacts: v})} textFields={[{key:'name', label:'NAME', maxLength:60}, {key:'phone', label:'PHONE / MOBILE', maxLength:25}]} />
                         </div>
                         <div className="bg-slate-50/50 p-7 rounded-[2rem] border border-slate-100 space-y-4">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Official Engagement Links</h4>
                            <div className="space-y-4">
                               <div><label className="text-[9px] text-slate-500 font-bold block mb-1">EMAIL</label><input value={payload.email || ''} onChange={e => setPayload({...payload, email: e.target.value})} className={inputBase} placeholder="team@vcet.edu.in" /></div>
                               <div><label className="text-[9px] text-slate-500 font-bold block mb-1">INSTAGRAM URL</label><input value={payload.insta || ''} onChange={e => setPayload({...payload, insta: e.target.value})} className={inputBase} placeholder="https://instagram.com/..." /></div>
                               {slug === 'airnova' && <div><label className="text-[9px] text-slate-500 font-bold block mb-1">LINKEDIN URL</label><input value={payload.linkedin || ''} onChange={e => setPayload({...payload, linkedin: e.target.value})} className={inputBase} placeholder="https://linkedin.com/..." /></div>}
                               {slug === 'centurion' && <div><label className="text-[9px] text-slate-500 font-bold block mb-1">FACEBOOK</label><input value={payload.facebook || ''} onChange={e => setPayload({...payload, facebook: e.target.value})} className={inputBase} placeholder="Facebook page/link" /></div>}
                               {slug === 'emechto' && <div><label className="text-[9px] text-slate-500 font-bold block mb-1">YOUTUBE URL</label><input value={payload.youtube || ''} onChange={e => setPayload({...payload, youtube: e.target.value})} className={inputBase} placeholder="https://youtube.com/..." /></div>}
                            </div>
                         </div>
                      </div>
                   </SectionCard>
                </div>
             )}
          </div>
        );




      default:
        return <div className="p-20 text-center font-black text-slate-300 uppercase tracking-[0.4em] text-sm">Selection Data Loading...</div>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-24 relative selection:bg-blue-100 selection:text-blue-900">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <PageEditorHeader
        title={SLUG_NAMES[slug] || slug.replace(/-/g, ' ')}
        description="Manage student clubs, activities, teams, and career-related content."
        onSave={save}
        isSaving={saving}
        showBackButton
        onBack={onBack}
      />

      <div className="space-y-12 pt-6">
        {renderFormContent()}
      </div>

      <p className="text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mt-12 pb-12">Authorized Content Management Interface — VCET ADMIN</p>
    </div>
  );
};

export default StudentCareerForm;
