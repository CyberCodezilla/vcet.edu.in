import React, { useState, useEffect } from 'react';
import { pagesApi } from '../../api/pagesApi';
import { CommitteeData, CommitteePayload, CommitteeMember, CommitteeReport } from '../../types';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';
import { resolveUploadedAssetUrl } from '../../../utils/uploadedAssets';

/* ── UI Components ────────────────────────────────────────────────────────── */
const Toast: React.FC<{ message: string; type: 'success' | 'error'; onClose: () => void }> = ({ message, type, onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl text-sm font-bold ${type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
      {message}
    </div>
  );
};

const SectionCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-white border border-slate-200/60 rounded-[2.5rem] overflow-hidden shadow-sm transition-all hover:shadow-md">
    <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-4">
      <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#2563EB]">
        {icon}
      </div>
      <h2 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h2>
    </div>
    <div className="p-8">
      {children}
    </div>
  </div>
);

const inputBase = "w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all";
const labelBase = "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 ml-1";

const filePreviewCache = new WeakMap<File, string>();
const getFilePreviewUrl = (file: File): string => {
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

const truncate = (value: unknown, max: number): string =>
  String(value ?? '').trim().slice(0, max);

const sanitizeStringList = (items: unknown, maxItems: number, maxLen: number): string[] => {
  if (!Array.isArray(items)) return [];
  return items
    .map((item) => truncate(item, maxLen))
    .filter(Boolean)
    .slice(0, maxItems);
};

const sanitizeMembers = (items: unknown, slug: string): CommitteeMember[] => {
  if (!Array.isArray(items)) return [];
  const maxMembers = slug === 'cdc' ? 20 : 15;
  return items.slice(0, maxMembers).map((row: any) => ({
    post: truncate(row?.post, 80),
    name: truncate(row?.name, 80),
    designation: truncate(row?.designation, 80),
    contact: truncate(row?.contact, 40),
    email: truncate(row?.email, 40),
    caste: truncate(row?.caste, 40),
    address: truncate(row?.address, 180),
    contactNo: truncate(row?.contactNo, 40),
  }));
};

const sanitizeReports = (items: unknown, maxItems: number): CommitteeReport[] => {
  if (!Array.isArray(items)) return [];
  return items.slice(0, maxItems).map((row: any) => ({
    year: truncate(row?.year, 20),
    fileName: row?.fileName ? truncate(row.fileName, 150) : null,
    fileUrl: row?.fileUrl ? truncate(row.fileUrl, 300) : null,
    url: row?.url ? truncate(row.url, 300) : '',
    file: row?.file ?? null,
  }));
};

const sanitizeDocuments = (items: unknown, slug: string): any[] => {
  if (!Array.isArray(items)) return [];
  const maxDocs = 10;
  return items.slice(0, maxDocs).map((row: any) => ({
    title: truncate(row?.title, 120),
    fileName: row?.fileName ? truncate(row.fileName, 150) : null,
    fileUrl: row?.fileUrl ? truncate(row.fileUrl, 300) : null,
    pdfUrl: row?.pdfUrl ? truncate(row.pdfUrl, 300) : '',
    imageUrl: row?.imageUrl ? truncate(row.imageUrl, 300) : '',
    file: row?.file ?? null,
    image: row?.image ?? null,
  }));
};

const sanitizeCommitteePayload = (slug: string, payload: CommitteePayload): CommitteePayload => ({
  ...payload,
  responsibilities: sanitizeStringList(payload.responsibilities, 10, 120),
  objectives: sanitizeStringList(
    payload.objectives,
    10,
    slug === 'sc-st' ? 100 : (slug === 'equal-opportunity' ? 150 : 120),
  ),
  activities: sanitizeStringList(payload.activities, 15, 200),
  aboutPoints: sanitizeStringList(payload.aboutPoints, 10, 150),
  initiatives: sanitizeStringList(payload.initiatives, 15, 200),
  guidelines: sanitizeStringList(payload.guidelines, 12, 220),
  members: sanitizeMembers(payload.members, slug),
  reports: sanitizeReports(payload.reports, 5),
  momReports: sanitizeReports((payload as any).momReports, 12),
  documents: sanitizeDocuments(payload.documents, slug),
});

/* ── List Manager (Dynamic Strings) ────────────────────────────────────────── */
const ListManager: React.FC<{
  title: string;
  items: string[];
  onChange: (items: string[]) => void;
  maxItems?: number;
  charLimit?: [number, number];
}> = ({ title, items, onChange, maxItems = 10, charLimit }) => {
  const addItem = () => {
    if (items.length < maxItems) onChange([...items, '']);
  };
  const removeItem = (idx: number) => onChange(items.filter((_, i) => i !== idx));
  const updateItem = (idx: number, val: string) => {
    const next = [...items];
    next[idx] = val;
    onChange(next);
  };
  const moveItem = (idx: number, direction: 'up' | 'down') => {
    const next = [...items];
    const target = direction === 'up' ? idx - 1 : idx + 1;
    if (target >= 0 && target < next.length) {
      [next[idx], next[target]] = [next[target], next[idx]];
      onChange(next);
    }
  };

  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-4 group items-start">
          <div className="flex flex-col gap-1 pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button type="button" onClick={() => moveItem(idx, 'up')} disabled={idx === 0} className="text-slate-400 hover:text-[#2563EB] disabled:opacity-20 flex items-center justify-center p-0.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7" /></svg>
            </button>
            <button type="button" onClick={() => moveItem(idx, 'down')} disabled={idx === items.length - 1} className="text-slate-400 hover:text-[#2563EB] disabled:opacity-20 flex items-center justify-center p-0.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
            </button>
          </div>
          <div className="flex-grow">
            <input id="committeesform-1" name="committeesform-1" aria-label="committeesform field" 
              value={item} 
              onChange={e => updateItem(idx, e.target.value)}
              className={inputBase}
              placeholder={`Enter ${title.toLowerCase()}...`}
            />
            {charLimit && (
              <p className={`text-[10px] mt-1 ml-1 font-bold uppercase tracking-wider ${item.length > charLimit[1] ? 'text-red-500' : 'text-slate-400'}`}>
                {item.length} / {charLimit[1]} Characters
              </p>
            )}
          </div>
          <button 
            type="button" 
            onClick={() => removeItem(idx)}
            className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 mt-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      ))}
      {items.length < maxItems && (
        <button type="button" onClick={addItem} className="text-[#2563EB] text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-opacity">
          + Add {title}
        </button>
      )}
    </div>
  );
};

/* ── Table Manager (Members) ─────────────────────────────────────────────── */
const TableManager: React.FC<{
  items: CommitteeMember[];
  onChange: (items: CommitteeMember[]) => void;
  columns: { key: keyof CommitteeMember; label: string; placeholder: string; limit?: number }[];
  maxItems?: number;
}> = ({ items, onChange, columns, maxItems = 10 }) => {
  const addItem = () => {
    if (items.length < maxItems) {
      const newItem: any = {};
      columns.forEach(c => newItem[c.key] = '');
      onChange([...items, newItem]);
    }
  };
  const removeItem = (idx: number) => onChange(items.filter((_, i) => i !== idx));
  const updateItem = (idx: number, key: keyof CommitteeMember, val: string) => {
    const next = [...items];
    next[idx] = { ...next[idx], [key]: val };
    onChange(next);
  };

  return (
    <div className="space-y-4">
      <div className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100/50">
              {columns.map(col => (
                <th key={col.key as string} className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">{col.label}</th>
              ))}
              <th className="w-16 px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx} className="border-t border-slate-100 group">
                {columns.map(col => (
                  <td key={col.key as string} className="px-6 py-4">
                    <input id="committeesform-2" name="committeesform-2" aria-label="committeesform field" 
                      value={item[col.key] || ''} 
                      onChange={e => updateItem(idx, col.key, e.target.value)}
                      className="w-full bg-transparent border-none text-sm font-semibold text-slate-700 focus:ring-0 p-0"
                      placeholder={col.placeholder}
                      maxLength={col.limit}
                    />
                  </td>
                ))}
                <td className="px-6 py-4 text-right">
                  <button type="button" onClick={() => removeItem(idx)} className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {items.length < maxItems && (
        <button type="button" onClick={addItem} className="text-[#2563EB] text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-opacity">
          + Add Member
        </button>
      )}
    </div>
  );
};

/* ── Report Manager (Files) ─────────────────────────────────────────────── */
const ReportManager: React.FC<{
  items: CommitteeReport[];
  onChange: (items: CommitteeReport[]) => void;
  maxItems?: number;
}> = ({ items, onChange, maxItems = 5 }) => {
  const currentYear = new Date().getFullYear();
  const defaultAcademicYear = `${currentYear}-${String((currentYear + 1) % 100).padStart(2, '0')}`;
  const yearOptions = Array.from({ length: 12 }, (_, idx) => {
    const start = currentYear + 1 - idx;
    return `${start}-${String((start + 1) % 100).padStart(2, '0')}`;
  });
  const existingYears = (items || [])
    .map((item) => String(item?.year || '').trim())
    .filter(Boolean);
  const years = Array.from(new Set([...existingYears, ...yearOptions])).sort((a, b) => b.localeCompare(a));

  const addItem = () => {
    if (items.length < maxItems) {
      onChange([...items, { year: defaultAcademicYear, fileName: null, fileUrl: null }]);
    }
  };
  const removeItem = (idx: number) => onChange(items.filter((_, i) => i !== idx));
  const updateItem = (idx: number, updates: Partial<CommitteeReport & { file?: File | null }>) => {
    const next = [...items];
    next[idx] = { ...next[idx], ...updates };
    onChange(next);
  };

  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div key={idx} className="flex flex-col md:flex-row gap-4 p-6 bg-slate-50 border border-slate-200 rounded-[2rem] group relative">
          <button type="button" onClick={() => removeItem(idx)} className="absolute -top-3 -right-3 w-8 h-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          
          <div className="w-full md:w-1/3">
            <label className={labelBase}>Academic Year</label>
            <select id="committeesform-select-1" name="committeesform-select-1" aria-label="committeesform select field" 
              value={item.year} 
              onChange={e => updateItem(idx, { year: e.target.value })}
              className={inputBase}
            >
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          <div className="flex-grow">
            <label className={labelBase}>PDF Report</label>
            <div className="relative h-[2.85rem] bg-white border border-slate-200 rounded-xl px-4 flex items-center justify-between overflow-hidden">
               <input id="committeesform-3" name="committeesform-3" aria-label="committeesform field" 
                 type="file" 
                 accept=".pdf" 
                  onChange={e => updateItem(idx, { file: e.target.files?.[0] || null })}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <span className="text-sm font-medium text-slate-500 truncate">
                  {(item as any).file?.name || item.fileName || 'Select PDF file...'}
                </span>
               <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center text-[#2563EB]">
                 <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                </div>
             </div>
             {((item as any).file || item.fileUrl || item.url) && (
               <div className="mt-3 flex gap-2">
                 <a
                   href={(item as any).file instanceof File ? getFilePreviewUrl((item as any).file) : (resolveUploadedAssetUrl(item.fileUrl || item.url || '') || item.fileUrl || item.url || '#')}
                   target="_blank"
                   rel="noreferrer"
                   className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-black uppercase tracking-wider hover:bg-blue-100"
                 >
                   Preview PDF
                 </a>
                 <button
                   type="button"
                   onClick={() => updateItem(idx, { file: null, fileName: null, fileUrl: '', url: '' })}
                   className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 text-xs font-black uppercase tracking-wider hover:bg-red-100"
                 >
                   Remove
                 </button>
               </div>
             )}
           </div>
         </div>
      ))}
      {items.length < maxItems && (
        <button type="button" onClick={addItem} className="text-[#2563EB] text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-opacity">
          + Add Report
        </button>
      )}
    </div>
  );
};

/* ── PDF Document Manager (Generic) ─────────────────────────────────────── */
const PDFDocumentManager: React.FC<{
  items: any[];
  onChange: (items: any[]) => void;
  maxItems?: number;
  showUrlField?: boolean;
}> = ({ items, onChange, maxItems = 3, showUrlField }) => {
  const addItem = () => {
    if (items.length < maxItems) {
      onChange([...items, { title: '', fileName: null, fileUrl: null, pdfUrl: '', imageUrl: null }]);
    }
  };
  const removeItem = (idx: number) => onChange(items.filter((_, i) => i !== idx));
  const updateItem = (idx: number, updates: any) => {
    const next = [...items];
    next[idx] = { ...next[idx], ...updates };
    onChange(next);
  };

  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div key={idx} className="p-6 bg-slate-50 border border-slate-200 rounded-[2rem] group relative space-y-4">
           <button type="button" onClick={() => removeItem(idx)} className="absolute -top-3 -right-3 w-8 h-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelBase}>Document Title</label>
              <input id="committeesform-4" name="committeesform-4" aria-label="committeesform field" 
                value={item.title} 
                onChange={e => updateItem(idx, { title: e.target.value })}
                className={inputBase}
                placeholder="e.g. Committee Guideline 2024"
              />
            </div>
            <div>
              <label className={labelBase}>File Upload</label>
              <div className="relative h-[2.85rem] bg-white border border-slate-200 rounded-xl px-4 flex items-center justify-between overflow-hidden">
                 <input id="committeesform-5" name="committeesform-5" aria-label="committeesform field" 
                   type="file" 
                   accept=".pdf" 
                   onChange={e => updateItem(idx, { file: e.target.files?.[0] || null })}
                   className="absolute inset-0 opacity-0 cursor-pointer z-10"
                 />
                 <span className="text-sm font-medium text-slate-500 truncate">
                    {item.file?.name || item.fileName || 'Upload PDF...'}
                  </span>
                 <div className="w-6 h-6 rounded-lg bg-[#2563EB]/5 text-[#2563EB] flex items-center justify-center">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                  </div>
              </div>
              {(item.file || item.fileUrl || item.pdfUrl) && (
                <div className="mt-3 flex gap-2">
                  <a
                    href={item.file instanceof File ? getFilePreviewUrl(item.file) : (resolveUploadedAssetUrl(item.fileUrl || item.pdfUrl || '') || item.fileUrl || item.pdfUrl || '#')}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-black uppercase tracking-wider hover:bg-blue-100"
                  >
                    Preview PDF
                  </a>
                  <button
                    type="button"
                    onClick={() => updateItem(idx, { file: null, fileName: null, fileUrl: '', pdfUrl: '' })}
                    className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 text-xs font-black uppercase tracking-wider hover:bg-red-100"
                  >
                    Remove PDF
                  </button>
                </div>
              )}
            </div>
            <div>
              <label className={labelBase}>Image Upload (Optional)</label>
              <div className="rounded-2xl border border-slate-200 bg-white p-3 space-y-3">
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                  <input id="committeesform-image-1" name="committeesform-image-1" aria-label="committeesform image field"
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={e => {
                      const file = e.target.files?.[0] || null;
                      if (file) updateItem(idx, { image: file, imageUrl: file.name });
                    }}
                  />
                  {resolveMediaUrl(item.image) || resolveMediaUrl(item.imageUrl) ? (
                    <img
                      src={resolveMediaUrl(item.image) || resolveMediaUrl(item.imageUrl) || ''}
                      alt="Document preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-black uppercase tracking-wider text-slate-400">
                      Click to upload image
                    </div>
                  )}
                </div>
                <div className="text-xs text-slate-500 break-all">
                  {item.image instanceof File ? item.image.name : (item.imageUrl || 'No image selected')}
                </div>
                {(item.image || item.imageUrl) && (
                  <button
                    type="button"
                    onClick={() => updateItem(idx, { image: null, imageUrl: '' })}
                    className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 text-xs font-black uppercase tracking-wider hover:bg-red-100"
                  >
                    Remove Image
                  </button>
                )}
              </div>
            </div>
          </div>
          {showUrlField && (
            <div>
              <label className={labelBase}>External PDF URL (Optional)</label>
              <input id="committeesform-6" name="committeesform-6" aria-label="committeesform field" 
                value={item.pdfUrl} 
                onChange={e => updateItem(idx, { pdfUrl: e.target.value })}
                className={inputBase}
                placeholder="https://example.com/document.pdf"
              />
            </div>
          )}
        </div>
      ))}
      {items.length < maxItems && (
        <button type="button" onClick={addItem} className="text-[#2563EB] text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-opacity">
          + Add Document
        </button>
      )}
    </div>
  );
};

/* ── Main Form Component ──────────────────────────────────────────────────── */
interface CommitteesFormProps {
  slug: string;
  onBack: () => void;
}

const CommitteesForm: React.FC<CommitteesFormProps> = ({ slug, onBack }) => {
  const [data, setData] = useState<CommitteeData | null>(null);
  const [payload, setPayload] = useState<CommitteePayload>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    pagesApi.committees.get(slug)
      .then(res => {
        setData(res.data);
        setPayload({
          ...res.data,
          responsibilities: res.data?.responsibilities || [],
          objectives: res.data?.objectives || [],
          activities: res.data?.activities || [],
          aboutPoints: res.data?.aboutPoints || [],
          initiatives: res.data?.initiatives || [],
          guidelines: res.data?.guidelines || [],
          members: res.data?.members || [],
          reports: res.data?.reports || [],
          momReports: (res.data as any)?.momReports || [],
          documents: res.data?.documents || [],
        });
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const saveChanges = async () => {
    setSaving(true);
    try {
      const sanitizedPayload = sanitizeCommitteePayload(slug, payload);
      setPayload(sanitizedPayload);
      await pagesApi.committees.update(slug, sanitizedPayload);
      setToast({ message: `${data?.name || 'Committee'} updated successfully`, type: 'success' });
    } catch (err) {
      console.error(err);
      setToast({ message: 'Failed to update committee.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveChanges();
  };

  if (loading) return (
    <div className="flex items-center justify-center h-96 bg-white border border-slate-200/60 rounded-[3rem] animate-pulse">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Fetching Committee Details...</p>
      </div>
    </div>
  );

  return (
    <>
      <form onSubmit={handleSave} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <PageEditorHeader
          title={data?.name || 'Committee Editor'}
          description="Manage professional committee data and records."
          onSave={saveChanges}
          isSaving={saving}
          showBackButton
          onBack={onBack}
        />

      <div className="space-y-10 pb-20">
        {/* CDC Responsibilities */}
        {slug === 'cdc' && (
          <SectionCard title="Key Responsibilities" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>}>
            <ListManager 
              title="Responsibility" 
              items={payload.responsibilities || []} 
              onChange={items => setPayload({...payload, responsibilities: items})} 
              maxItems={10}
              charLimit={[80, 120]}
            />
          </SectionCard>
        )}

        {/* IQAC/SCST/ICC/AntiRagging/Grievance Objectives */}
        {['iqac', 'anti-ragging', 'grievance', 'sc-st', 'icc'].includes(slug) && (
          <SectionCard title="Committee Objectives" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}>
            <ListManager 
              title="Objective" 
              items={payload.objectives || []} 
              onChange={items => setPayload({...payload, objectives: items})} 
              maxItems={10}
              charLimit={slug === 'sc-st' ? [80, 100] : [80, 120]}
            />
          </SectionCard>
        )}

        {slug === 'equal-opportunity' && (
          <>
            <SectionCard title="Committee Objectives" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}>
              <ListManager
                title="Objective"
                items={payload.objectives || []}
                onChange={items => setPayload({ ...payload, objectives: items })}
                maxItems={10}
                charLimit={[50, 150]}
              />
            </SectionCard>
            <SectionCard title="Activities & Initiatives" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>}>
              <ListManager
                title="Activity"
                items={payload.activities || []}
                onChange={items => setPayload({ ...payload, activities: items })}
                maxItems={15}
                charLimit={[30, 200]}
              />
            </SectionCard>
          </>
        )}

        {slug === 'sedg' && (
          <>
            <SectionCard title="Focus Areas" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5l7 7-7 7M4 5l7 7-7 7" /></svg>}>
              <ListManager
                title="Focus Area"
                items={payload.aboutPoints || []}
                onChange={items => setPayload({ ...payload, aboutPoints: items })}
                maxItems={10}
                charLimit={[50, 150]}
              />
            </SectionCard>
            <SectionCard title="Initiatives" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}>
              <ListManager
                title="Initiative"
                items={payload.initiatives || []}
                onChange={items => setPayload({ ...payload, initiatives: items })}
                maxItems={15}
                charLimit={[30, 200]}
              />
            </SectionCard>
          </>
        )}

        {/* SGRC Guidelines */}
        {slug === 'sgrc' && (
          <SectionCard title="Institutional Guidelines" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.253 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}>
            <ListManager 
              title="Guideline" 
              items={payload.guidelines || []} 
              onChange={items => setPayload({...payload, guidelines: items})} 
              maxItems={12}
            />
          </SectionCard>
        )}

        {/* Member Table */}
        {!['equal-opportunity', 'sedg'].includes(slug) && (
          <SectionCard title="Committee Members" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}>
            <TableManager 
              items={payload.members || []} 
              onChange={members => setPayload({...payload, members})}
              columns={
                slug === 'cdc' ? [{ key: 'post', label: 'Post', placeholder: 'e.g. Chairman' }, { key: 'name', label: 'FullName', placeholder: 'e.g. Dr. John Doe' }] :
                slug === 'iqac' ? [{ key: 'name', label: 'Name', placeholder: 'Full Name' }, { key: 'designation', label: 'Designation', placeholder: 'e.g. Principal' }] :
                slug === 'anti-ragging' ? [{ key: 'name', label: 'Name', placeholder: 'Full Name' }, { key: 'designation', label: 'Designation', placeholder: 'e.g. HOD' }, { key: 'contact', label: 'Contact', placeholder: 'Phone Number', limit: 40 }] :
                slug === 'grievance' ? [{ key: 'post', label: 'Post', placeholder: 'e.g. Member Secretary' }, { key: 'name', label: 'Name', placeholder: 'Full Name' }, { key: 'email', label: 'Email', placeholder: 'Official Email', limit: 40 }] :
                slug === 'icc' ? [{ key: 'post', label: 'Post', placeholder: 'e.g. Presiding Officer' }, { key: 'name', label: 'Name', placeholder: 'Full Name' }, { key: 'contact', label: 'Contact', placeholder: 'Phone Number', limit: 40 }] :
                [{ key: 'name', label: 'Name', placeholder: 'Full Name' }, { key: 'post', label: 'Post / Designation', placeholder: 'e.g. Member Secretary' }]
              }
              maxItems={slug === 'cdc' ? 20 : 15}
            />
          </SectionCard>
        )}

        {/* IQAC Reports */}
        {slug === 'iqac' && (
          <SectionCard title="Annual Quality Assurance Reports (AQAR)" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}>
            <ReportManager 
              items={payload.reports || []} 
              onChange={reports => setPayload({...payload, reports})} 
              maxItems={12}
            />
          </SectionCard>
        )}

        {slug === 'iqac' && (
          <SectionCard title="IQAC Minutes of Meeting (MoM)" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}>
            <ReportManager
              items={(payload as any).momReports || []}
              onChange={momReports => setPayload({ ...payload, momReports } as CommitteePayload)}
              maxItems={12}
            />
          </SectionCard>
        )}

        {/* Equal Opportunity / SEDG Cell PDF Uploads */}
        {['equal-opportunity', 'sedg'].includes(slug) && (
          <SectionCard title="Institutional Documents" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}>
            <PDFDocumentManager 
              items={payload.documents || []} 
              onChange={docs => setPayload({...payload, documents: docs})} 
              maxItems={10}
              showUrlField
            />
          </SectionCard>
        )}
        </div>
      </form>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
};

export default CommitteesForm;
