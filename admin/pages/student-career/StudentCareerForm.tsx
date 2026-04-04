import React, { useEffect, useRef, useState } from 'react';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';
<<<<<<< HEAD
import { SortableListContext } from '../../components/SortableList';
import AdminFormSection from '../../components/AdminFormSection';
=======
import { pagesApi } from '../../api/pagesApi';
import { resolveApiUrl } from '../../api/client';
>>>>>>> a10712dd9bfe52065269a0c041e8a0d058872467

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
  <div className="bg-white rounded-4xl shadow-lg shadow-slate-200/40 border border-slate-100 overflow-hidden">
    <div className="px-8 py-5 border-b border-slate-100 flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">{icon}</div>
      <h3 className="text-sm font-extrabold text-[#111827] uppercase tracking-wider">{title}</h3>
    </div>
    <div className="p-8 space-y-6">{children}</div>
  </div>
);

const inputBase = 'w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#2563EB] rounded-2xl px-5 py-4 text-sm font-bold transition-all outline-none placeholder:text-slate-300';
const labelBase = 'block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2.5 ml-1';

/* ── Media Upload Button (with preview) ────────────────────────────────────── */
const MediaUploadButton: React.FC<{
  value?: File | string;
  previewUrl?: string;
  onChange: (fileValue: File | string, previewUrl: string) => void;
  label?: string;
  accept?: string;
}> = ({ value, previewUrl, onChange, label = 'Upload File', accept = 'image/*,.pdf' }) => {
  const ref = useRef<HTMLInputElement>(null);
  const fileName = value instanceof File ? value.name : (typeof value === 'string' ? value : '');
  const resolvedPreview = previewUrl || (typeof value === 'string' ? (resolveApiUrl(value) || value) : '');
  const isPdf = fileName ? /\.pdf$/i.test(fileName) : false;
  const isImage = resolvedPreview && !isPdf;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    onChange(f, url);
  };

  const handleClear = () => {
    if (previewUrl?.startsWith('blob:')) URL.revokeObjectURL(previewUrl);
    onChange('', '');
    if (ref.current) ref.current.value = '';
  };

  return (
    <div className="space-y-3">
      <input id="studentcareerform-1" name="studentcareerform-1" aria-label="studentcareerform field" ref={ref} type="file" accept={accept} className="hidden" onChange={handleChange} />
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
            <span className="text-xs font-bold text-emerald-700 max-w-[180px] truncate">{fileName}</span>
            <button type="button" onClick={handleClear} className="text-emerald-500 hover:text-red-500 transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        )}
        {!value && <span className="text-xs text-slate-400 font-semibold italic">No file chosen</span>}
      </div>
      {isImage && resolvedPreview && (
        <div className="relative group w-36 h-24 rounded-2xl overflow-hidden border-2 border-slate-200 hover:border-blue-400 transition-all shadow-sm">
          <img src={resolvedPreview} alt="preview" className="w-full h-full object-cover" />
          <span className="absolute bottom-1.5 right-2 text-[9px] text-white font-black bg-black/50 px-1.5 py-0.5 rounded-md uppercase">Preview</span>
        </div>
      )}
      {isPdf && resolvedPreview && (
        <a href={resolvedPreview} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-xl text-[10px] font-bold text-red-600 hover:bg-red-100 transition-all">
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
      <SortableListContext
        items={items}
        onChange={onChange}
        renderItem={(item, idx, id, dragHandleProps, setNodeRef, style, isDragging, actions) => (
          <div ref={setNodeRef} style={style} className="flex gap-4 p-6 bg-slate-50 border border-slate-100 rounded-3xl transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/40 group">
            <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-300 hover:text-[#2563EB] transition-colors p-2 self-start mt-4" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 8h16M4 16h16"/></svg>
            </div>
            <div className="flex-grow space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {textFields.map(f => (
                  <div key={f.key} className={f.isTextarea ? 'col-span-1 md:col-span-2 lg:col-span-3' : ''}>
                    <label className={labelBase}>{f.label}</label>
                    {f.isTextarea
                      ? <textarea id={`sc-ta-${idx}-${f.key}`} name={`sc-ta-${idx}-${f.key}`} aria-label="studentcareerform textarea field" maxLength={f.maxLength} value={item[f.key] || ''} onChange={e => upd(idx, { [f.key]: e.target.value })} className={`${inputBase} py-3! px-4! rounded-xl! text-xs! h-20 resize-none`} placeholder={f.placeholder} />
                      : <input id={`sc-input-${idx}-${f.key}`} name={`sc-input-${idx}-${f.key}`} aria-label="studentcareerform field" maxLength={f.maxLength} value={item[f.key] || ''} onChange={e => upd(idx, { [f.key]: e.target.value })} className={`${inputBase} py-3! px-4! rounded-xl! text-xs!`} placeholder={f.placeholder} />
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
              className="mt-6 p-2 h-max bg-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        )}
      />
      <button 
        onClick={add} 
        disabled={!!maxItems && items.length >= maxItems} 
        className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-sm font-bold text-slate-400 hover:border-blue-500 hover:text-blue-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
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
  'training': 'Training',
  'placement': 'Placement',
  'career-at-vcet': 'Career @ VCET',
};

const StudentCareerForm: React.FC<StudentCareerFormProps> = ({ slug, onBack }) => {
  const [payload, setPayload] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeClub, setActiveClub] = useState<'centurion' | 'airnova' | 'emechto' | 'ethan'>('centurion');
  const [activeAccordionSection, setActiveAccordionSection] = useState<string | null>('1');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const isFileLike = (value: unknown): value is File | Blob =>
    typeof File !== 'undefined' && value instanceof File
      ? true
      : typeof Blob !== 'undefined' && value instanceof Blob;

  const mapPreviewPaths = (value: unknown): unknown => {
    if (isFileLike(value)) return value;
    if (Array.isArray(value)) {
      return value.map((item) => mapPreviewPaths(item));
    }
    if (value && typeof value === 'object') {
      const input = value as Record<string, unknown>;
      const output: Record<string, unknown> = {};
      Object.entries(input).forEach(([key, child]) => {
        const mappedChild = mapPreviewPaths(child);
        output[key] = mappedChild;
        if (
          typeof mappedChild === 'string' &&
          (/^\/?(images|pdfs)\//i.test(mappedChild) || /^https?:\/\//i.test(mappedChild))
        ) {
            output[`${key}_preview`] = resolveApiUrl(mappedChild) || mappedChild;
        }
      });
      return output;
    }
    return value;
  };

  const toSubmitPayload = (value: unknown): unknown => {
    if (isFileLike(value)) return value;
    if (Array.isArray(value)) {
      return value.map((item) => toSubmitPayload(item));
    }
    if (value && typeof value === 'object') {
      const input = value as Record<string, unknown>;
      const output: Record<string, unknown> = {};
      Object.entries(input).forEach(([key, child]) => {
        if (key.endsWith('_preview')) return;
        if (
          (key === 'fileName' || key === 'updatedAt' || key === 'slug') &&
          (child === '' || child === null || child === undefined)
        ) {
          return;
        }
        output[key] = toSubmitPayload(child);
      });
      return output;
    }
    return value;
  };

  useEffect(() => {
    if (slug === 'centurion') setActiveClub('centurion');
    else if (slug === 'airnova') setActiveClub('airnova');
    else if (slug === 'emechto') setActiveClub('emechto');
    else if (slug === 'external-projects') setActiveClub('ethan');
<<<<<<< HEAD
    setActiveAccordionSection('1'); // Reset accordion on slug change
    setTimeout(() => setLoading(false), 300);
=======
    pagesApi.studentCareer.get(slug)
      .then((res) => {
        const data = (res?.data as Record<string, unknown>) ?? {};
        setPayload(mapPreviewPaths(data) as Record<string, unknown>);
      })
      .catch(() => {
        setPayload({});
      })
      .finally(() => setLoading(false));
>>>>>>> a10712dd9bfe52065269a0c041e8a0d058872467
  }, [slug]);

  const save = async () => {
    setSaving(true);
    try {
      const response = await pagesApi.studentCareer.update(slug, toSubmitPayload(payload) as Record<string, unknown>);
      const data = (response?.data as Record<string, unknown>) ?? payload;
      setPayload(mapPreviewPaths(data) as Record<string, unknown>);
      setToast({ message: 'Configuration saved successfully', type: 'success' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save configuration';
      setToast({ message, type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-12 text-center text-slate-400 font-bold animate-pulse">PREPARING FORM...</div>;

  const renderFormContent = () => {
    switch (slug) {
      case 'cultural-committee':
        return (
          <div className="space-y-4">
            <AdminFormSection 
              title="1. Hero / Overview" 
              icon="🎭"
              isOpen={activeAccordionSection === '1'}
              onToggle={() => setActiveAccordionSection(activeAccordionSection === '1' ? null : '1')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={labelBase}>Instagram Link</label><input id="studentcareerform-3" name="studentcareerform-3" aria-label="studentcareerform field" value={payload.hInsta || ''} onChange={e => setPayload({...payload, hInsta: e.target.value})} className={inputBase} placeholder="URL" /></div>
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
            </AdminFormSection>

            <AdminFormSection 
              title="2. Best Outgoing Student (BOS)" 
              icon="🌟"
              isOpen={activeAccordionSection === '2'}
              onToggle={() => setActiveAccordionSection(activeAccordionSection === '2' ? null : '2')}
            >
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
            </AdminFormSection>

            <AdminFormSection 
              title="3. Cultural Events" 
              icon="🎨"
              isOpen={activeAccordionSection === '3'}
              onToggle={() => setActiveAccordionSection(activeAccordionSection === '3' ? null : '3')}
            >
              <TableManager 
                items={payload.events || []} maxItems={12} addLabel="Add Event Card"
                onChange={v => setPayload({...payload, events: v})}
                textFields={[
                  { key: 'title', label: 'Event Title', placeholder: 'Max 50 chars', maxLength: 50 },
                  { key: 'desc', label: 'Event Description', placeholder: 'Max 400 chars', maxLength: 400, isTextarea: true },
                ]}
              />
            </AdminFormSection>

            <AdminFormSection 
              title="4. Cultural Gallery" 
              icon="📸"
              isOpen={activeAccordionSection === '4'}
              onToggle={() => setActiveAccordionSection(activeAccordionSection === '4' ? null : '4')}
            >
              <TableManager 
                items={payload.gallery || []} maxItems={24} addLabel="Add Gallery Image"
                onChange={v => setPayload({...payload, gallery: v})}
                textFields={[]}
                mediaField={{ key: 'img', label: 'Photograph', accept: 'image/*' }}
              />
            </AdminFormSection>

            <AdminFormSection 
              title="5. Cultural Team" 
              icon="👥"
              isOpen={activeAccordionSection === '5'}
              onToggle={() => setActiveAccordionSection(activeAccordionSection === '5' ? null : '5')}
            >
              <div className="mb-6">
                <label className={labelBase}>Academic Year</label>
                <input id="studentcareerform-4" name="studentcareerform-4" aria-label="studentcareerform field"
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
            </AdminFormSection>
          </div>
        );

      case 'sports-committee':
        return (
          <div className="space-y-4">
            <AdminFormSection 
              title="1. Hero / Overview" 
              icon="🏆"
              isOpen={activeAccordionSection === '1'}
              onToggle={() => setActiveAccordionSection(activeAccordionSection === '1' ? null : '1')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={labelBase}>Instagram Link</label><input id="studentcareerform-5" name="studentcareerform-5" aria-label="studentcareerform field" value={payload.hInsta || ''} onChange={e => setPayload({...payload, hInsta: e.target.value})} className={inputBase} placeholder="URL" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div><label className={labelBase}>Hero Background Image</label><MediaUploadButton value={payload.hImg} previewUrl={payload.hImg_preview} onChange={(v,p) => setPayload({...payload, hImg: v, hImg_preview: p})} accept="image/*" /></div>
                <div><label className={labelBase}>Committee PDF</label><MediaUploadButton value={payload.hPdf} previewUrl={payload.hPdf_preview} onChange={(v,p) => setPayload({...payload, hPdf: v, hPdf_preview: p})} accept=".pdf" label="Upload Committee PDF" /></div>
              </div>
            </AdminFormSection>

            <AdminFormSection 
              title="2. Events" 
              icon="⚽"
              isOpen={activeAccordionSection === '2'}
              onToggle={() => setActiveAccordionSection(activeAccordionSection === '2' ? null : '2')}
            >
              <TableManager 
                items={payload.events || []} maxItems={12} addLabel="Add Sports Event"
                onChange={v => setPayload({...payload, events: v})}
                textFields={[
                  { key: 'title', label: 'Event Title', placeholder: 'e.g. AVAHAN', maxLength: 50 },
                  { key: 'desc', label: 'Event Description', placeholder: 'Max 400 chars', maxLength: 400, isTextarea: true },
                ]}
              />
            </AdminFormSection>

            <AdminFormSection 
              title="3. Gallery" 
              icon="📸"
              isOpen={activeAccordionSection === '3'}
              onToggle={() => setActiveAccordionSection(activeAccordionSection === '3' ? null : '3')}
            >
              <TableManager 
                items={payload.gallery || []} maxItems={24} addLabel="Add Action Shot"
                onChange={v => setPayload({...payload, gallery: v})}
                textFields={[]}
                mediaField={{ key: 'img', label: 'Photograph', accept: 'image/*' }}
              />
            </AdminFormSection>

            <AdminFormSection 
              title="4. Team (Committee Members)" 
              icon="👥"
              isOpen={activeAccordionSection === '4'}
              onToggle={() => setActiveAccordionSection(activeAccordionSection === '4' ? null : '4')}
            >
              <div className="mb-6 pb-6 border-b border-slate-100">
                <label className={labelBase}>Sports Student PDF Card Title</label>
                <input id="studentcareerform-6" name="studentcareerform-6" aria-label="studentcareerform field" value={payload.pdfTitle || ''} onChange={e => setPayload({...payload, pdfTitle: e.target.value})} className={inputBase} placeholder="e.g. Sports Student Committee" />
                <div className="mt-4"><MediaUploadButton value={payload.pdfFile} previewUrl={payload.pdfFile_preview} onChange={(v,p) => setPayload({...payload, pdfFile: v, pdfFile_preview: p})} accept=".pdf" label="Upload Special PDF" /></div>
              </div>
              <div className="mb-6">
                <label className={labelBase}>Academic Year</label>
                <input id="studentcareerform-7" name="studentcareerform-7" aria-label="studentcareerform field"
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
            </AdminFormSection>
          </div>
        );

      case 'literati':
        return (
          <div className="space-y-4">
            <AdminFormSection 
              title="1. Intro Links" 
              icon="✍️"
              isOpen={activeAccordionSection === '1'}
              onToggle={() => setActiveAccordionSection(activeAccordionSection === '1' ? null : '1')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={labelBase}>Instagram Link</label><input id="studentcareerform-8" name="studentcareerform-8" aria-label="studentcareerform field" value={payload.hInsta || ''} onChange={e => setPayload({...payload, hInsta: e.target.value})} className={inputBase} /></div>
              </div>
            </AdminFormSection>

            <AdminFormSection 
              title="2. Literary Events" 
              icon="📖"
              isOpen={activeAccordionSection === '2'}
              onToggle={() => setActiveAccordionSection(activeAccordionSection === '2' ? null : '2')}
            >
               <TableManager items={payload.events || []} maxItems={12} addLabel="Add Event Card" onChange={v => setPayload({...payload, events: v})} textFields={[{ key: 'title', label: 'Title', placeholder: 'e.g. Debate', maxLength: 50 }, { key: 'desc', label: 'Description', placeholder: 'Max 400', isTextarea: true }]} />
            </AdminFormSection>

            <AdminFormSection 
              title="3. Gallery" 
              icon="📸"
              isOpen={activeAccordionSection === '3'}
              onToggle={() => setActiveAccordionSection(activeAccordionSection === '3' ? null : '3')}
            >
               <TableManager items={payload.gallery || []} maxItems={24} addLabel="Add Photo" onChange={v => setPayload({...payload, gallery: v})} textFields={[]} mediaField={{ key: 'img', label: 'Photo' }} />
            </AdminFormSection>

            <AdminFormSection 
              title="4. Team" 
              icon="👥"
              isOpen={activeAccordionSection === '4'}
              onToggle={() => setActiveAccordionSection(activeAccordionSection === '4' ? null : '4')}
            >
              <div className="mb-6 pb-6 border-b border-slate-100">
                <h4 className={labelBase + " text-slate-500! mb-4!"}>Staff Incharge</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div><MediaUploadButton value={payload.cImg} previewUrl={payload.cImg_preview} onChange={(v,p) => setPayload({...payload, cImg: v, cImg_preview: p})} label="Upload Staff Photo" /></div>
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                   <input id="studentcareerform-9" name="studentcareerform-9" aria-label="studentcareerform field" maxLength={60} value={payload.cName || ''} onChange={e => setPayload({...payload, cName: e.target.value})} className={inputBase} placeholder="Staff Name" />
                   <input id="studentcareerform-10" name="studentcareerform-10" aria-label="studentcareerform field" maxLength={80} value={payload.cDept || ''} onChange={e => setPayload({...payload, cDept: e.target.value})} className={inputBase} placeholder="Department" />
                   <input id="studentcareerform-11" name="studentcareerform-11" aria-label="studentcareerform field" value={payload.cMail || ''} onChange={e => setPayload({...payload, cMail: e.target.value})} className={inputBase} placeholder="Email" />
                  </div>
                </div>
              </div>
               <div className="mb-6">
                 <label className={labelBase}>Academic Year</label>
                 <input id="studentcareerform-12" name="studentcareerform-12" aria-label="studentcareerform field"
                   maxLength={20}
                   value={payload.teamYear || ''}
                   onChange={e => setPayload({...payload, teamYear: e.target.value})}
                   className={inputBase}
                   placeholder="e.g. 2025-26"
                 />
               </div>
               <TableManager items={payload.team || []} maxItems={25} addLabel="Add Member" onChange={v => setPayload({...payload, team: v})} textFields={[{ key: 'name', label: 'Name', maxLength: 60 }, { key: 'pos', label: 'Position', maxLength: 50 }, { key: 'dept', label: 'Department', maxLength: 60 }]} />
            </AdminFormSection>

            <AdminFormSection 
              title="5. Vista Magazine" 
              icon="📚"
              isOpen={activeAccordionSection === '5'}
              onToggle={() => setActiveAccordionSection(activeAccordionSection === '5' ? null : '5')}
            >
              <TableManager
                items={payload.magazines || []}
                maxItems={10}
                addLabel="Add Magazine"
                onChange={v => setPayload({...payload, magazines: v})}
                textFields={[{ key: 'title', label: 'Magazine Title', maxLength: 80 }]}
                mediaField={{ key: 'pdf', label: 'Magazine PDF', accept: '.pdf' }}
              />
            </AdminFormSection>
          </div>
        );

      case 'nss':
        return (
          <div className="space-y-4">
            <AdminFormSection 
              title="1. NSS Events & Social" 
              icon="❤️"
              isOpen={activeAccordionSection === '1'}
              onToggle={() => setActiveAccordionSection(activeAccordionSection === '1' ? null : '1')}
            >
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div><label className={labelBase}>Instagram Link Label</label><input id="studentcareerform-13" name="studentcareerform-13" aria-label="studentcareerform field" maxLength={100} value={payload.instaLab || ''} onChange={e => setPayload({...payload, instaLab: e.target.value})} className={inputBase} /></div>
                <div><label className={labelBase}>Instagram URL</label><input id="studentcareerform-14" name="studentcareerform-14" aria-label="studentcareerform field" value={payload.instaUrl || ''} onChange={e => setPayload({...payload, instaUrl: e.target.value})} className={inputBase} /></div>
              </div>
              <TableManager items={payload.events || []} maxItems={24} addLabel="Add Service Event" onChange={v => setPayload({...payload, events: v})} textFields={[{ key: 'title', label: 'Title', maxLength: 50 }, { key: 'desc', label: 'Description', maxLength: 400, isTextarea: true }]} />
            </AdminFormSection>

            <AdminFormSection 
              title="2. NSS Gallery" 
              icon="📸"
              isOpen={activeAccordionSection === '2'}
              onToggle={() => setActiveAccordionSection(activeAccordionSection === '2' ? null : '2')}
            >
               <TableManager items={payload.gallery || []} maxItems={24} addLabel="Add Photo" onChange={v => setPayload({...payload, gallery: v})} textFields={[]} mediaField={{ key: 'img', label: 'Photo' }} />
            </AdminFormSection>

            <AdminFormSection 
              title="3. NSS Team Sections" 
              icon="👥"
              isOpen={activeAccordionSection === '3'}
              onToggle={() => setActiveAccordionSection(activeAccordionSection === '3' ? null : '3')}
            >
               <div className="space-y-8">
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                     <h4 className={labelBase + " text-slate-500! mb-6!"}>A. Featured Co-ordinator</h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="lg:col-span-1"><MediaUploadButton value={payload.cImg} previewUrl={payload.cImg_preview} onChange={(v,p) => setPayload({...payload, cImg: v, cImg_preview: p})} label="Coord. Photo" /></div>
                        <div className="lg:col-span-2 space-y-4">
                           <input id="studentcareerform-15" name="studentcareerform-15" aria-label="studentcareerform field" maxLength={60} value={payload.cName || ''} onChange={e => setPayload({...payload, cName: e.target.value})} className={inputBase} placeholder="Coordinator Name" />
                          <input id="studentcareerform-16" name="studentcareerform-16" aria-label="studentcareerform field" maxLength={80} value={payload.cDept || ''} onChange={e => setPayload({...payload, cDept: e.target.value})} className={inputBase} placeholder="Department" />
                           <div className="grid grid-cols-2 gap-4">
                              <input id="studentcareerform-17" name="studentcareerform-17" aria-label="studentcareerform field" value={payload.cMail || ''} onChange={e => setPayload({...payload, cMail: e.target.value})} className={inputBase} placeholder="Email" />
                              <input id="studentcareerform-18" name="studentcareerform-18" aria-label="studentcareerform field" value={payload.cPhone || ''} onChange={e => setPayload({...payload, cPhone: e.target.value})} className={inputBase} placeholder="Phone" />
                           </div>
                        </div>
                     </div>
                  </div>
                  <div>
                     <h4 className={labelBase + " text-slate-500! mb-4! ml-1!"}>B. Staff Committee (3-Column Table)</h4>
                     <TableManager items={payload.staff || []} maxItems={12} addLabel="Add Staff Member" onChange={v => setPayload({...payload, staff: v})} textFields={[{key:'pos', label:'Post', maxLength:50}, {key:'name', label:'Name', maxLength:60}, {key:'dept', label:'Department', maxLength:60}]} />
                  </div>
                  <div>
                     <h4 className={labelBase + " text-slate-500! mb-4! ml-1!"}>C. Student Core Committee (2-Column Table)</h4>
                    <div className="mb-4">
                      <label className={labelBase}>Academic Year</label>
                      <input id="studentcareerform-19" name="studentcareerform-19" aria-label="studentcareerform field"
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
            </AdminFormSection>
          </div>
        );

      case 'ebsb':
        return (
          <div className="space-y-4 animate-in fade-in duration-500">
            <AdminFormSection 
              title="1. Events & Activities" 
              icon="🎉"
              isOpen={activeAccordionSection === '1'}
              onToggle={() => setActiveAccordionSection(activeAccordionSection === '1' ? null : '1')}
            >
              <div className="mb-4">
                <h4 className={labelBase + " text-slate-400! mb-4! ml-1!"}>Glimpse of EBSB activities</h4>
                <TableManager 
                   items={payload.events || []} maxItems={12} addLabel="Add Activity Card" 
                   onChange={v => setPayload({...payload, events: v})} 
                   textFields={[{key:'title', label:'TITLE', maxLength:100}, {key:'desc', label:'DESCRIPTION', maxLength:800, isTextarea: true}]} 
                />
              </div>
            </AdminFormSection>

            <AdminFormSection 
              title="2. EBSB Gallery" 
              icon="📸"
              isOpen={activeAccordionSection === '2'}
              onToggle={() => setActiveAccordionSection(activeAccordionSection === '2' ? null : '2')}
            >
              <TableManager items={payload.gallery || []} maxItems={24} addLabel="Add Photograph" onChange={v => setPayload({...payload, gallery: v})} textFields={[]} mediaField={{key:'img', label:'Photograph'}} />
            </AdminFormSection>

            <AdminFormSection 
              title="3. Committee Team" 
              icon="👥"
              isOpen={activeAccordionSection === '3'}
              onToggle={() => setActiveAccordionSection(activeAccordionSection === '3' ? null : '3')}
            >
               <div className="space-y-10">
                  <div className="bg-slate-50 p-7 rounded-4xl border border-slate-100">
                     <h4 className={labelBase + " text-slate-400! mb-6! border-b border-slate-200 pb-2"}>A. In-Charge & Advisory</h4>
                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1"><MediaUploadButton value={payload.cImg} previewUrl={payload.cImg_preview} onChange={(v,p) => setPayload({...payload, cImg: v, cImg_preview: p})} label="Upload Photo" /></div>
                        <div className="lg:col-span-2 space-y-4">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div><label className={labelBase}>Member Name</label><input id="studentcareerform-20" name="studentcareerform-20" aria-label="studentcareerform field" maxLength={60} value={payload.cName || ''} onChange={e => setPayload({...payload, cName: e.target.value})} className={inputBase} /></div>
                      <div><label className={labelBase}>Department</label><input id="studentcareerform-21" name="studentcareerform-21" aria-label="studentcareerform field" maxLength={60} value={payload.cDept || ''} onChange={e => setPayload({...payload, cDept: e.target.value})} className={inputBase} /></div>
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div><label className={labelBase}>Email ID</label><input id="studentcareerform-22" name="studentcareerform-22" aria-label="studentcareerform field" value={payload.cMail || ''} onChange={e => setPayload({...payload, cMail: e.target.value})} className={inputBase} /></div>
                           </div>
                        </div>
                     </div>
                  </div>
                  
                  <div>
                    <h4 className={labelBase + " text-slate-400! mb-4! ml-1!"}>B. Staff Committee Table</h4>
                    <TableManager 
                       items={payload.staff || []} maxItems={12} addLabel="Add Staff Member" 
                       onChange={v => setPayload({...payload, staff: v})} 
                       textFields={[{key:'role', label:'ROLE', maxLength:50}, {key:'name', label:'NAME', maxLength:60}, {key:'dept', label:'DEPARTMENT', maxLength:60}]} 
                    />
                  </div>

                  <div>
                    <h4 className={labelBase + " text-slate-400! mb-4! ml-1!"}>C. Student Committee Table</h4>
                    <TableManager 
                       items={payload.studs || []} maxItems={15} addLabel="Add Student Member" 
                       onChange={v => setPayload({...payload, studs: v})} 
                       textFields={[{key:'role', label:'ROLE', maxLength:50}, {key:'name', label:'NAME', maxLength:60}, {key:'dept', label:'DEPARTMENT', maxLength:60}]} 
                    />
                  </div>
               </div>
            </AdminFormSection>
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
          <div className="space-y-4">
            <AdminFormSection 
              title="1. Hero / Metrics" 
              icon="⚡"
              isOpen={activeAccordionSection === '1'}
              onToggle={() => setActiveAccordionSection(activeAccordionSection === '1' ? null : '1')}
            >
               <h4 className={labelBase + " text-slate-400! mb-4! ml-1!"}>Impact Metrics (Max 4)</h4>
               <TableManager items={payload.metrics || []} maxItems={4} addLabel="Add Metric Card" onChange={v => setPayload({...payload, metrics: v})} textFields={[{key:'lab', label:'Label (e.g. Members)', maxLength:40}, {key:'val', label:'Value (e.g. 100+)', maxLength:30}]} />
            </AdminFormSection>

            {slug !== 'nsdc' && (
              <AdminFormSection 
                title="1B. Sidebar Highlights" 
                icon="✨"
                isOpen={activeAccordionSection === '1b'}
                onToggle={() => setActiveAccordionSection(activeAccordionSection === '1b' ? null : '1b')}
              >
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
              </AdminFormSection>
            )}

            {slug !== 'hackathon-events' && slug !== 'nsdc' && slug !== 'csi' && (
              <AdminFormSection 
                title="2. Events & Activities" 
                icon="⚙️"
                isOpen={activeAccordionSection === '2'}
                onToggle={() => setActiveAccordionSection(activeAccordionSection === '2' ? null : '2')}
              >
                {['ieee', 'iete', 'ishrae', 'vmea', 'igbc'].includes(slug) && (
                  <div className="mb-8 p-6 bg-blue-50/50 rounded-4xl border border-blue-100">
                    <label className={labelBase + " text-blue-600! mb-4!"}>Featured Event Photos (Max 2)</label>
                    <TableManager items={payload.featured || []} maxItems={2} addLabel="Add Featured Banner" onChange={v => setPayload({...payload, featured: v})} textFields={[]} mediaField={{key:'img', label:'Featured Banner'}} />
                  </div>
                )}
                
                <div className="mb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Archive of Club Activities</div>
                <TableManager items={payload.events || []} maxItems={15} addLabel="Add Activity Card" onChange={v => setPayload({...payload, events: v})} textFields={[{key:'title', label:'Title', maxLength:60}, {key:'desc', label:'Summary', maxLength:400, isTextarea: true}]} />
              </AdminFormSection>
            )}

            {slug === 'nsdc' && null}

            {slug === 'hackathon-events' && (
               <div className="space-y-4">
                 <AdminFormSection 
                    title="2. Faculty Coordinators" 
                    icon="👩‍🏫"
                    isOpen={activeAccordionSection === '2'}
                    onToggle={() => setActiveAccordionSection(activeAccordionSection === '2' ? null : '2')}
                  >
                   <h4 className={labelBase + " text-slate-400! mb-4! ml-1!"}>Staff Coordinators Table</h4>
                   <TableManager items={payload.staff || []} maxItems={20} addLabel="Add Faculty" onChange={v => setPayload({...payload, staff: v})} textFields={[{key:'sr', label:'SR. NO.', maxLength:6}, {key:'name', label:'NAME', maxLength:80}]} />
                 </AdminFormSection>

                 <AdminFormSection 
                    title="3. Committee Roles" 
                    icon="👥"
                    isOpen={activeAccordionSection === '3'}
                    onToggle={() => setActiveAccordionSection(activeAccordionSection === '3' ? null : '3')}
                  >
                   <h4 className={labelBase + " text-slate-400! mb-4! ml-1!"}>Committee Roles Table</h4>
                   <TableManager items={payload.team || []} maxItems={25} addLabel="Add Committee Post" onChange={v => setPayload({...payload, team: v})} textFields={[{key:'pos', label:'POST / ROLE', maxLength:60}, {key:'names', label:'NAME(S)', maxLength:200, isTextarea: true}]} />
                 </AdminFormSection>

                 <AdminFormSection 
                    title="4. Hackathon Image Gallery" 
                    icon="📸"
                    isOpen={activeAccordionSection === '4'}
                    onToggle={() => setActiveAccordionSection(activeAccordionSection === '4' ? null : '4')}
                  >
                    <TableManager items={payload.gallery || []} maxItems={30} addLabel="Add Gallery Photograph" onChange={v => setPayload({...payload, gallery: v})} textFields={[{key:'cap', label:'Caption (if show on hover)', maxLength:100}]} mediaField={{key:'img', label:'Photograph'}} />
                 </AdminFormSection>
               </div>
            )}

            {slug === 'csi' && (
              <div className="space-y-4">
                <AdminFormSection 
                  title="2. Faculty Team" 
                  icon="👩‍🏫"
                  isOpen={activeAccordionSection === '2'}
                  onToggle={() => setActiveAccordionSection(activeAccordionSection === '2' ? null : '2')}
                >
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
                </AdminFormSection>
                <AdminFormSection 
                  title="3. Student Committee" 
                  icon="👥"
                  isOpen={activeAccordionSection === '3'}
                  onToggle={() => setActiveAccordionSection(activeAccordionSection === '3' ? null : '3')}
                >
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
                </AdminFormSection>
              </div>
            )}

            {slug !== 'nsdc' && slug !== 'hackathon-events' && (
              <AdminFormSection 
                title="3. Photo Gallery" 
                icon="📸"
                isOpen={activeAccordionSection === '3'}
                onToggle={() => setActiveAccordionSection(activeAccordionSection === '3' ? null : '3')}
              >
                 <TableManager items={payload.gallery || []} maxItems={30} addLabel="Add Gallery Photograph" onChange={v => setPayload({...payload, gallery: v})} textFields={[{key:'cap', label:'Caption (if show on hover)', maxLength:100}]} mediaField={{key:'img', label:'Photograph'}} />
               </AdminFormSection>
            )}

            {slug !== 'hackathon-events' && slug !== 'nsdc' && slug !== 'csi' && (
              <AdminFormSection 
                title="4. Technical Team leadership" 
                icon="👥"
                isOpen={activeAccordionSection === '4'}
                onToggle={() => setActiveAccordionSection(activeAccordionSection === '4' ? null : '4')}
              >
                <div className="bg-white border-2 border-slate-50 rounded-4xl p-6 space-y-8 shadow-inner shadow-slate-100/50">
                   <div>
                    <h4 className={labelBase + " text-slate-400! mb-4!"}>Faculty In-Charge / Counselor Profile</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-1"><MediaUploadButton value={payload.cImg} previewUrl={payload.cImg_preview} onChange={(v,p) => setPayload({...payload, cImg: v, cImg_preview: p})} label="Profile Photo" /></div>
                      <div className="lg:col-span-2 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                           <input id="studentcareerform-23" name="studentcareerform-23" aria-label="studentcareerform field" maxLength={60} value={payload.cName || ''} onChange={e => setPayload({...payload, cName: e.target.value})} className={inputBase} placeholder="Full Name" />
                           <input id="studentcareerform-24" name="studentcareerform-24" aria-label="studentcareerform field" maxLength={50} value={payload.cPos || ''} onChange={e => setPayload({...payload, cPos: e.target.value})} className={inputBase} placeholder="Post (e.g. Branch Counselor)" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <input id="studentcareerform-25" name="studentcareerform-25" aria-label="studentcareerform field" value={payload.cMail || ''} onChange={e => setPayload({...payload, cMail: e.target.value})} className={inputBase} placeholder="Email" />
                           <input id="studentcareerform-26" name="studentcareerform-26" aria-label="studentcareerform field" value={payload.cPhone || ''} onChange={e => setPayload({...payload, cPhone: e.target.value})} className={inputBase} placeholder="Contact No" />
                        </div>
                        {slug === 'igbc' && (
                          <div className="grid grid-cols-2 gap-4">
                            <input id="studentcareerform-27" name="studentcareerform-27" aria-label="studentcareerform field" maxLength={30} value={payload.cTitle || ''} onChange={e => setPayload({...payload, cTitle: e.target.value})} className={inputBase} placeholder="Title (e.g. Faculty Incharge)" />
                            <input id="studentcareerform-28" name="studentcareerform-28" aria-label="studentcareerform field" maxLength={4} value={payload.cInitials || ''} onChange={e => setPayload({...payload, cInitials: e.target.value})} className={inputBase} placeholder="Initials" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {slug === 'ieee' && (
                    <div>
                      <h4 className={labelBase + " text-slate-400! mb-4!"}>Student Core Committee Table</h4>
                      <TableManager items={payload.team || []} maxItems={25} addLabel="Add Committee Member" onChange={v => setPayload({...payload, team: v})} textFields={[{key:'pos', label:'POSITION', maxLength:60}, {key:'cls', label:'CLASS', maxLength:30}, {key:'name', label:'NAME', maxLength:60}]} />
                    </div>
                  )}

                  {slug === 'vmea' && (
                    <div>
                      <h4 className={labelBase + " text-slate-400! mb-4!"}>Core Committee Table</h4>
                      <TableManager items={payload.team || []} maxItems={25} addLabel="Add Committee Member" onChange={v => setPayload({...payload, team: v})} textFields={[{key:'pos', label:'POST', maxLength:60}, {key:'name', label:'NAME', maxLength:60}]} />
                    </div>
                  )}

                  {slug === 'igbc' && (
                    <div>
                      <h4 className={labelBase + " text-slate-400! mb-4!"}>Student Committee Table</h4>
                      <TableManager items={payload.team || []} maxItems={25} addLabel="Add Committee Member" onChange={v => setPayload({...payload, team: v})} textFields={[{key:'pos', label:'POSITION', maxLength:60}, {key:'cls', label:'CLASS', maxLength:30}, {key:'name', label:'NAME', maxLength:60}]} />
                    </div>
                  )}

                  {slug === 'iete' && (
                    <div className="space-y-8">
                      <div>
                        <h4 className={labelBase + " text-slate-400! mb-4!"}>Co-Ordinators Final Year</h4>
                        <TableManager items={payload.teamFinal || []} maxItems={20} addLabel="Add Final Year Member" onChange={v => setPayload({...payload, teamFinal: v})} textFields={[{key:'pos', label:'POST', maxLength:60}, {key:'name', label:'NAME', maxLength:80}]} />
                      </div>
                      <div>
                        <h4 className={labelBase + " text-slate-400! mb-4!"}>Third Year Members</h4>
                        <TableManager items={payload.teamThird || []} maxItems={20} addLabel="Add Third Year Member" onChange={v => setPayload({...payload, teamThird: v})} textFields={[{key:'pos', label:'POST', maxLength:60}, {key:'name', label:'NAME', maxLength:80}]} />
                      </div>
                    </div>
                  )}

                  {slug === 'ishrae' && (
                    <div className="space-y-8">
                      <div>
                        <h4 className={labelBase + " text-slate-400! mb-4!"}>Committee Year Labels</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <input id="studentcareerform-29" name="studentcareerform-29" aria-label="studentcareerform field"
                            maxLength={20}
                            value={payload.teamCoreYear || ''}
                            onChange={e => setPayload({...payload, teamCoreYear: e.target.value})}
                            className={inputBase}
                            placeholder="Core Committee Year (e.g. 2024-25)"
                          />
                          <input id="studentcareerform-30" name="studentcareerform-30" aria-label="studentcareerform field"
                            maxLength={20}
                            value={payload.team2024Year || ''}
                            onChange={e => setPayload({...payload, team2024Year: e.target.value})}
                            className={inputBase}
                            placeholder="Members Group 1 Year"
                          />
                          <input id="studentcareerform-31" name="studentcareerform-31" aria-label="studentcareerform field"
                            maxLength={20}
                            value={payload.team2021Year || ''}
                            onChange={e => setPayload({...payload, team2021Year: e.target.value})}
                            className={inputBase}
                            placeholder="Members Group 2 Year"
                          />
                        </div>
                      </div>

                      <div>
                        <h4 className={labelBase + " text-slate-400! mb-4!"}>Core Committee</h4>
                        <TableManager items={payload.teamCore || []} maxItems={25} addLabel="Add Core Committee Member" onChange={v => setPayload({...payload, teamCore: v})} textFields={[{key:'pos', label:'POSITION', maxLength:60}, {key:'cls', label:'CLASS', maxLength:30}, {key:'name', label:'NAME', maxLength:80}]} />
                      </div>
                      <div>
                        <h4 className={labelBase + " text-slate-400! mb-4!"}>Member Group 1</h4>
                        <TableManager items={payload.team2024 || []} maxItems={30} addLabel="Add Member Group 1" onChange={v => setPayload({...payload, team2024: v})} textFields={[{key:'pos', label:'POSITION', maxLength:60}, {key:'cls', label:'CLASS', maxLength:30}, {key:'name', label:'NAME', maxLength:80}]} />
                      </div>
                      <div>
                        <h4 className={labelBase + " text-slate-400! mb-4!"}>Member Group 2</h4>
                        <TableManager items={payload.team2021 || []} maxItems={40} addLabel="Add Member Group 2" onChange={v => setPayload({...payload, team2021: v})} textFields={[{key:'pos', label:'POSITION', maxLength:60}, {key:'cls', label:'CLASS', maxLength:30}, {key:'name', label:'NAME', maxLength:80}]} />
                      </div>
                    </div>
                  )}
                </div>
              </AdminFormSection>
            )}
          </div>
        );

      case 'student-clubs':
      case 'centurion':
      case 'airnova':
      case 'emechto':
      case 'external-projects':
        return (
          <div className="space-y-4 animate-in fade-in duration-500">
             {slug === 'external-projects' && (
                <AdminFormSection 
                  title="Standalone Project Links" 
                  icon="🔗"
                  isOpen={activeAccordionSection === '1'}
                  onToggle={() => setActiveAccordionSection(activeAccordionSection === '1' ? null : '1')}
                >
                  <p className="text-xs text-slate-500 font-semibold mb-4">Provide the external website link for Project Ethan / Solecthon.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div><label className={labelBase}>Ethan Website URL</label><input id="studentcareerform-32" name="studentcareerform-32" aria-label="studentcareerform field" value={payload.ethanUrl || ''} onChange={e => setPayload({...payload, ethanUrl: e.target.value})} className={inputBase} placeholder="https://..." /></div>
                     <div><label className={labelBase}>Solecthon Website URL</label><input id="studentcareerform-33" name="studentcareerform-33" aria-label="studentcareerform field" value={payload.solecthonUrl || ''} onChange={e => setPayload({...payload, solecthonUrl: e.target.value})} className={inputBase} placeholder="https://..." /></div>
                  </div>
                </AdminFormSection>
             )}

             {slug !== 'external-projects' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                   <AdminFormSection 
                      title="1. Impact Metrics (By the Numbers)" 
                      icon="📊"
                      isOpen={activeAccordionSection === '1'}
                      onToggle={() => setActiveAccordionSection(activeAccordionSection === '1' ? null : '1')}
                    >
                      <p className="text-xs text-slate-500 font-semibold mb-6">These appear in the prominent highlights bar (e.g., "120+ Team Members").</p>
                      <TableManager items={payload.metrics || []} maxItems={4} addLabel="Add Metric Card" onChange={v => setPayload({...payload, metrics: v})} textFields={[{key:'val', label:'VALUE (e.g. 5+)', maxLength:20}, {key:'lab', label:'LABEL (e.g. VEHICLES)', maxLength:40}]} />
                   </AdminFormSection>

                   <AdminFormSection 
                      title="2. Competition Achievements" 
                      icon="🏁"
                      isOpen={activeAccordionSection === '2'}
                      onToggle={() => setActiveAccordionSection(activeAccordionSection === '2' ? null : '2')}
                    >
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
                   </AdminFormSection>

                   <AdminFormSection 
                      title="3. Sponsors & Gallery" 
                      icon="🖼️"
                      isOpen={activeAccordionSection === '3'}
                      onToggle={() => setActiveAccordionSection(activeAccordionSection === '3' ? null : '3')}
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                         <div className="space-y-4">
                            <h4 className={labelBase + " text-slate-500! ml-1!"}>Sponsor Content</h4>
                            {slug === 'centurion' && (
                              <div className="space-y-4">
                                <TableManager items={payload.logos || []} maxItems={30} addLabel="Add Sponsor Logo" onChange={v => setPayload({...payload, logos: v})} textFields={[]} mediaField={{key:'img', label:'Logo'}} />
                                <div>
                                  <label className={labelBase}>Sponsors Description</label>
                                  <textarea id="studentcareerform-textarea-2" name="studentcareerform-textarea-2" aria-label="studentcareerform textarea field"
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
                                  <textarea id="studentcareerform-textarea-3" name="studentcareerform-textarea-3" aria-label="studentcareerform textarea field"
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
                                  <textarea id="studentcareerform-textarea-4" name="studentcareerform-textarea-4" aria-label="studentcareerform textarea field"
                                    value={payload.sponsorText || ''}
                                    onChange={e => setPayload({...payload, sponsorText: e.target.value})}
                                    className={`${inputBase} h-28 resize-none`}
                                    placeholder="Sponsors section text"
                                    maxLength={400}
                                  />
                                </div>
                                <div>
                                  <label className={labelBase}>Sponsorship Amount</label>
                                  <input id="studentcareerform-34" name="studentcareerform-34" aria-label="studentcareerform field"
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
                   </AdminFormSection>

                   {slug === 'centurion' && (
                     <AdminFormSection 
                        title="4. Event Videos" 
                        icon="🎬"
                        isOpen={activeAccordionSection === '4'}
                        onToggle={() => setActiveAccordionSection(activeAccordionSection === '4' ? null : '4')}
                      >
                        <TableManager
                          items={payload.videos || []}
                          maxItems={20}
                          addLabel="Add Event Video"
                          onChange={v => setPayload({...payload, videos: v})}
                          textFields={[{key:'title', label:'Video Title', maxLength:100}]}
                          mediaField={{key:'vid', label:'Video File', accept:'video/*'}}
                        />
                     </AdminFormSection>
                   )}

                   <AdminFormSection 
                      title={slug === 'centurion' ? '5. Professional Team' : '4. Professional Team'} 
                      icon="👥"
                      isOpen={activeAccordionSection === (slug === 'centurion' ? '5' : '4')}
                      onToggle={() => setActiveAccordionSection(activeAccordionSection === (slug === 'centurion' ? '5' : '4') ? null : (slug === 'centurion' ? '5' : '4'))}
                    >
                      <div className="space-y-8">
                        <div className="bg-slate-50/50 p-7 rounded-4xl border border-slate-100 flex flex-col md:flex-row gap-8">
                           <div className="w-40 shrink-0"><MediaUploadButton value={payload.fImg} previewUrl={payload.fImg_p} onChange={(v,p) => setPayload({...payload, fImg: v, fImg_p: p})} label="Upload Advisor" /></div>
                           <div className="grow space-y-4">
                              <h4 className={labelBase + " text-slate-400! mb-4!"}>Faculty Advisor / In-Charge Profile</h4>
                              <div className="grid grid-cols-2 gap-4">
                                 <input id="studentcareerform-35" name="studentcareerform-35" aria-label="studentcareerform field" maxLength={60} value={payload.fName || ''} onChange={e => setPayload({...payload, fName: e.target.value})} className={inputBase} placeholder="Full Name" />
                                 <input id="studentcareerform-36" name="studentcareerform-36" aria-label="studentcareerform field" maxLength={80} value={payload.fDesig || ''} onChange={e => setPayload({...payload, fDesig: e.target.value})} className={inputBase} placeholder="Official Designation" />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                 <input id="studentcareerform-37" name="studentcareerform-37" aria-label="studentcareerform field" value={payload.fMail || ''} onChange={e => setPayload({...payload, fMail: e.target.value})} className={inputBase} placeholder="Official Email ID" />
                                 <input id="studentcareerform-38" name="studentcareerform-38" aria-label="studentcareerform field" value={payload.fPhone || ''} onChange={e => setPayload({...payload, fPhone: e.target.value})} className={inputBase} placeholder="Phone Contact" />
                              </div>
                           </div>
                        </div>
                        {slug === 'centurion' && (
                          <div>
                            <h4 className={labelBase + " text-slate-400! mb-4! ml-1!"}>Team Members</h4>
                            <TableManager items={payload.team || []} maxItems={60} addLabel="Add Team Member" onChange={v => setPayload({...payload, team: v})} textFields={[{key:'name', label:'NAME', maxLength:60}, {key:'pos', label:'POSITION', maxLength:60}, {key:'sub', label:'SUBSYSTEM', maxLength:60}]} />
                          </div>
                        )}
                        {slug === 'airnova' && (
                          <div>
                            <h4 className={labelBase + " text-slate-400! mb-4! ml-1!"}>Team Members</h4>
                            <TableManager items={payload.team || []} maxItems={80} addLabel="Add Team Member" onChange={v => setPayload({...payload, team: v})} textFields={[{key:'name', label:'NAME', maxLength:60}, {key:'contact', label:'CONTACT', maxLength:25}, {key:'pos', label:'POSITION', maxLength:80}]} />
                          </div>
                        )}
                        {slug === 'emechto' && (
                          <div className="space-y-8">
                            <div>
                              <label className={labelBase}>Team Group 1 Academic Year</label>
                              <input id="studentcareerform-39" name="studentcareerform-39" aria-label="studentcareerform field" maxLength={20} value={payload.teamYear1 || ''} onChange={e => setPayload({...payload, teamYear1: e.target.value})} className={inputBase} placeholder="e.g. 2023-24" />
                              <div className="mt-4">
                                <TableManager items={payload.team1 || []} maxItems={60} addLabel="Add Team 1 Member" onChange={v => setPayload({...payload, team1: v})} textFields={[{key:'name', label:'NAME', maxLength:60}, {key:'branch', label:'BRANCH-YEAR', maxLength:60}, {key:'post', label:'POST', maxLength:80}]} />
                              </div>
                            </div>
                            <div>
                              <label className={labelBase}>Team Group 2 Academic Year</label>
                              <input id="studentcareerform-40" name="studentcareerform-40" aria-label="studentcareerform field" maxLength={20} value={payload.teamYear2 || ''} onChange={e => setPayload({...payload, teamYear2: e.target.value})} className={inputBase} placeholder="e.g. 2019-20" />
                              <div className="mt-4">
                                <TableManager items={payload.team2 || []} maxItems={60} addLabel="Add Team 2 Member" onChange={v => setPayload({...payload, team2: v})} textFields={[{key:'name', label:'NAME', maxLength:60}, {key:'branch', label:'BRANCH', maxLength:60}, {key:'post', label:'POST', maxLength:80}]} />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                   </AdminFormSection>

                   <AdminFormSection 
                      title={slug === 'centurion' ? '6. Contact & Social Presence' : '5. Contact & Social Presence'} 
                      icon="📞"
                      isOpen={activeAccordionSection === (slug === 'centurion' ? '6' : '5')}
                      onToggle={() => setActiveAccordionSection(activeAccordionSection === (slug === 'centurion' ? '6' : '5') ? null : (slug === 'centurion' ? '6' : '5'))}
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                         <div className="space-y-6">
                            <h4 className={labelBase + " text-slate-400! ml-1!"}>Phone Contacts (Team Leads)</h4>
                            <TableManager items={payload.contacts || []} maxItems={8} addLabel="Add Contact Row" onChange={v => setPayload({...payload, contacts: v})} textFields={[{key:'name', label:'NAME', maxLength:60}, {key:'phone', label:'PHONE / MOBILE', maxLength:25}]} />
                         </div>
                         <div className="bg-slate-50/50 p-7 rounded-4xl border border-slate-100 space-y-4">
                            <h4 className={labelBase + " text-slate-400! mb-4!"}>Official Engagement Links</h4>
                            <div className="space-y-4">
                               <div><label className="text-[9px] text-slate-500 font-bold block mb-1">EMAIL</label><input id="studentcareerform-41" name="studentcareerform-41" aria-label="studentcareerform field" value={payload.email || ''} onChange={e => setPayload({...payload, email: e.target.value})} className={inputBase} placeholder="team@vcet.edu.in" /></div>
                               <div><label className="text-[9px] text-slate-500 font-bold block mb-1">INSTAGRAM URL</label><input id="studentcareerform-42" name="studentcareerform-42" aria-label="studentcareerform field" value={payload.insta || ''} onChange={e => setPayload({...payload, insta: e.target.value})} className={inputBase} placeholder="https://instagram.com/..." /></div>
                               {slug === 'airnova' && <div><label className="text-[9px] text-slate-500 font-bold block mb-1">LINKEDIN URL</label><input id="studentcareerform-43" name="studentcareerform-43" aria-label="studentcareerform field" value={payload.linkedin || ''} onChange={e => setPayload({...payload, linkedin: e.target.value})} className={inputBase} placeholder="https://linkedin.com/..." /></div>}
                               {slug === 'centurion' && <div><label className="text-[9px] text-slate-500 font-bold block mb-1">FACEBOOK</label><input id="studentcareerform-44" name="studentcareerform-44" aria-label="studentcareerform field" value={payload.facebook || ''} onChange={e => setPayload({...payload, facebook: e.target.value})} className={inputBase} placeholder="Facebook page/link" /></div>}
                               {slug === 'emechto' && <div><label className="text-[9px] text-slate-500 font-bold block mb-1">YOUTUBE URL</label><input id="studentcareerform-45" name="studentcareerform-45" aria-label="studentcareerform field" value={payload.youtube || ''} onChange={e => setPayload({...payload, youtube: e.target.value})} className={inputBase} placeholder="https://youtube.com/..." /></div>}
                            </div>
                         </div>
                      </div>
                   </AdminFormSection>
                </div>
             )}
          </div>
        );




      case 'career-at-vcet':
        return (
          <div className="space-y-8">
            <SectionCard title="Recruitment PDF" icon="📄">
              <p className="text-xs text-slate-500 font-semibold">
                This is the direct PDF used for the "Career @ VCET" dropdown item.
              </p>
              <div>
                <label className={labelBase}>Recruitment PDF URL</label>
                <input
                  id="studentcareerform-career-pdf"
                  name="studentcareerform-career-pdf"
                  aria-label="career recruitment pdf url"
                  value={payload.recruitmentPdf || ''}
                  onChange={e => setPayload({...payload, recruitmentPdf: e.target.value})}
                  className={inputBase}
                  maxLength={600}
                  placeholder="https://vcet.edu.in/wp-content/uploads/...pdf"
                />
              </div>
              <div>
                <label className={labelBase}>Upload PDF (optional)</label>
                <MediaUploadButton
                  value={payload.recruitmentPdf}
                  previewUrl={payload.recruitmentPdf_preview}
                  onChange={(v,p) => setPayload({...payload, recruitmentPdf: v, recruitmentPdf_preview: p})}
                  accept=".pdf,application/pdf"
                  label="Upload Recruitment PDF"
                />
              </div>
            </SectionCard>
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
