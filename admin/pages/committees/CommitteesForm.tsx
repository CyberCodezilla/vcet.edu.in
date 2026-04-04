import React, { useState, useEffect } from 'react';
import { pagesApi } from '../../api/pagesApi';
import { CommitteeData, CommitteePayload, CommitteeMember, CommitteeReport } from '../../types';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';
<<<<<<< HEAD
import AdminFormSection from '../../components/AdminFormSection';
import { SortableListContext } from '../../components/SortableList';

/* ── UI Components ─────────────────────────────────────────────────────────── */
const inputBase = "w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all text-slate-700";
const labelBase = "block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1";
=======
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
>>>>>>> a10712dd9bfe52065269a0c041e8a0d058872467

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
  return (
    <div className="space-y-4">
      <SortableListContext
        items={items}
        onChange={onChange}
        renderItem={(item, idx, id, dragHandleProps, setNodeRef, style, isDragging, actions) => (
          <div ref={setNodeRef} style={style} className="flex gap-4 group items-start p-2 bg-white rounded-2xl border border-transparent hover:border-slate-100 transition-all">
            <div className="flex flex-col gap-1 pt-3/5 opacity-50 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing text-slate-400 hover:text-[#2563EB]" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 8h16M4 16h16"/></svg>
            </div>
            <div className="grow">
               <label className={labelBase}>{title} {idx + 1}</label>
              <input id={`committeesform-list-${idx}`} name={`committeesform-list-${idx}`} aria-label="committeesform field" 
                value={item} 
                onChange={e => updateItem(idx, e.target.value)}
                className={inputBase}
                placeholder={`Enter ${title.toLowerCase()}...`}
              />
              {charLimit && (
                <p className={`text-[10px] mt-1.5 ml-1 font-bold uppercase tracking-wider ${item.length > charLimit[1] ? 'text-red-500' : 'text-slate-400'}`}>
                  {item.length} / {charLimit[1]} Characters
                </p>
              )}
            </div>
            <button 
              type="button" 
              onClick={() => removeItem(idx)}
              className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 mt-6"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        )}
      />
      {items.length < maxItems && (
        <button type="button" onClick={addItem} className="text-[#2563EB] text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-opacity ml-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
          Add {title} ({items.length}/{maxItems})
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
      <div className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100/50">
              <th className="w-10 px-4 py-4"></th>
              {columns.map(col => (
                <th key={col.key as string} className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">{col.label}</th>
              ))}
              <th className="w-16 px-6 py-4"></th>
            </tr>
          </thead>
          <SortableListContext
            items={items}
            onChange={onChange}
            renderItem={(item, idx, id, dragHandleProps, setNodeRef, style, isDragging, actions) => (
              <tr ref={setNodeRef} style={{...style, display: 'table-row'}} className="border-t border-slate-100 group bg-white hover:bg-slate-50/30 transition-colors">
                <td className="px-4 py-4 w-10">
                  <div className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-[#2563EB] opacity-50 group-hover:opacity-100 transition-opacity" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 8h16M4 16h16"/></svg>
                  </div>
                </td>
                {columns.map(col => (
                  <td key={col.key as string} className="px-6 py-4">
                    <input id={`committeesform-table-${idx}-${col.key as string}`} name={`committeesform-table-${idx}-${col.key as string}`} aria-label="committeesform field" 
                      value={item[col.key] || ''} 
                      onChange={e => updateItem(idx, col.key, e.target.value)}
                      className="w-full bg-transparent border-none text-sm font-bold text-slate-700 focus:ring-0 p-0 placeholder:text-slate-300 placeholder:font-medium"
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
            )}
          />
        </table>
      </div>
      {items.length < maxItems && (
        <button type="button" onClick={addItem} className="text-[#2563EB] text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-opacity ml-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
          Add Member ({items.length}/{maxItems})
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
      <SortableListContext
        items={items}
        onChange={onChange}
        renderItem={(item, idx, id, dragHandleProps, setNodeRef, style, isDragging, actions) => (
          <div ref={setNodeRef} style={style} className="flex gap-4 p-6 bg-slate-50 border border-slate-200 rounded-3xl group relative shadow-sm">
            <div className="flex flex-col justify-center items-center mr-2 cursor-grab active:cursor-grabbing text-slate-400 hover:text-[#2563EB] opacity-50 group-hover:opacity-100 transition-opacity" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
               <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 8h16M4 16h16"/></svg>
            </div>
            
            <button type="button" onClick={() => removeItem(idx)} className="absolute -top-3 -right-3 w-8 h-8 bg-white border border-red-100 shadow-sm text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            <div className="flex flex-col md:flex-row gap-6 grow w-full">
              <div className="w-full md:w-1/3">
                <label className={labelBase}>Academic Year</label>
                <select id={`committeesform-select-${idx}`} name={`committeesform-select-${idx}`} aria-label="committeesform select field" 
                  value={item.year} 
                  onChange={e => updateItem(idx, { year: e.target.value })}
                  className={inputBase}
                >
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>

<<<<<<< HEAD
              <div className="grow">
                <label className={labelBase}>PDF Report Document</label>
                <div className="relative h-[3.45rem] bg-white border border-slate-200 rounded-2xl px-5 flex items-center justify-between overflow-hidden ring-offset-2 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                   <input id={`committeesform-pdf-${idx}`} name={`committeesform-pdf-${idx}`} aria-label="committeesform field" 
                     type="file" 
                     accept=".pdf" 
                     onChange={e => updateItem(idx, { file: e.target.files?.[0] || null })}
                     className="absolute inset-0 opacity-0 cursor-pointer z-10"
                   />
                   <span className="text-sm font-bold text-slate-700 truncate">
                     {(item as any).file?.name || item.fileName || 'Select institutional PDF...'}
                   </span>
                   <div className="w-8 h-8 rounded-xl bg-[#2563EB]/5 flex items-center justify-center text-[#2563EB]">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}
      />
=======
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
>>>>>>> a10712dd9bfe52065269a0c041e8a0d058872467
      {items.length < maxItems && (
        <button type="button" onClick={addItem} className="text-[#2563EB] text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-opacity ml-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
          Add Yearly Report ({items.length}/{maxItems})
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
      <SortableListContext
        items={items}
        onChange={onChange}
        renderItem={(item, idx, id, dragHandleProps, setNodeRef, style, isDragging, actions) => (
          <div ref={setNodeRef} style={style} className="flex gap-4 p-6 bg-slate-50 border border-slate-200 rounded-3xl group relative space-y-4 shadow-sm">
            <div className="flex flex-col pt-12 justify-start items-center mr-2 cursor-grab active:cursor-grabbing text-slate-400 hover:text-[#2563EB] opacity-50 group-hover:opacity-100 transition-opacity" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
               <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 8h16M4 16h16"/></svg>
            </div>
<<<<<<< HEAD

             <button type="button" onClick={() => removeItem(idx)} className="absolute -top-3 -right-3 w-8 h-8 bg-white border border-red-100 shadow-md text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            <div className="grow space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelBase}>Document Label</label>
                  <input id={`committeesform-doctitle-${idx}`} name={`committeesform-doctitle-${idx}`} aria-label="committeesform field" 
                    value={item.title} 
                    onChange={e => updateItem(idx, { title: e.target.value })}
                    className={inputBase}
                    placeholder="e.g. Committee Guideline 2024"
                  />
                </div>
                <div>
                  <label className={labelBase}>PDF Document File</label>
                  <div className="relative h-[3.45rem] bg-white border border-slate-200 rounded-2xl px-5 flex items-center justify-between overflow-hidden ring-offset-2 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                     <input id={`committeesform-docpdf-${idx}`} name={`committeesform-docpdf-${idx}`} aria-label="committeesform field" 
                       type="file" 
                       accept=".pdf" 
                       onChange={e => updateItem(idx, { file: e.target.files?.[0] || null })}
                       className="absolute inset-0 opacity-0 cursor-pointer z-10"
                     />
                     <span className="text-sm font-bold text-slate-700 truncate">
                       {item.file?.name || item.fileName || 'Click to upload PDF...'}
                     </span>
                     <div className="w-8 h-8 rounded-xl bg-[#2563EB]/5 text-[#2563EB] flex items-center justify-center">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                     </div>
                  </div>
                </div>
=======
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
>>>>>>> a10712dd9bfe52065269a0c041e8a0d058872467
              </div>
              {showUrlField && (
                <div>
                  <label className={labelBase}>Legacy Redirect / External PDF URL (Optional)</label>
                  <input id={`committeesform-docurl-${idx}`} name={`committeesform-docurl-${idx}`} aria-label="committeesform field" 
                    value={item.pdfUrl} 
                    onChange={e => updateItem(idx, { pdfUrl: e.target.value })}
                    className={inputBase}
                    placeholder="https://example.com/document.pdf"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      />
      {items.length < maxItems && (
        <button type="button" onClick={addItem} className="text-[#2563EB] text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-opacity ml-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
          Add Document ({items.length}/{maxItems})
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
<<<<<<< HEAD
  const [activeAccordionSection, setActiveAccordionSection] = useState<string | null>(null);
=======
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
>>>>>>> a10712dd9bfe52065269a0c041e8a0d058872467

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
    <div className="flex items-center justify-center h-96 bg-white border border-slate-200/60 rounded-6xl animate-pulse">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gathering Committee Records...</p>
      </div>
    </div>
  );

  return (
<<<<<<< HEAD
    <form onSubmit={handleSave} className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <PageEditorHeader
        title={data?.name || 'Committee Editor'}
        description="Manage professional committee protocols, members, and historical reports."
        onSave={saveChanges}
        isSaving={saving}
        showBackButton
        onBack={onBack}
      />
=======
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
>>>>>>> a10712dd9bfe52065269a0c041e8a0d058872467

      <div className="space-y-4">
        {/* CDC Responsibilities */}
        {slug === 'cdc' && (
          <AdminFormSection title="Core Responsibilities" icon="📋" isOpen={activeAccordionSection === 'responsibilities'} onToggle={() => setActiveAccordionSection(activeAccordionSection === 'responsibilities' ? null : 'responsibilities')}>
            <ListManager 
              title="Responsibility" 
              items={payload.responsibilities || []} 
              onChange={items => setPayload({...payload, responsibilities: items})} 
<<<<<<< HEAD
              charLimit={[80, 250]}
=======
              maxItems={10}
              charLimit={[80, 120]}
>>>>>>> a10712dd9bfe52065269a0c041e8a0d058872467
            />
          </AdminFormSection>
        )}

        {/* IQAC/SCST/ICC/AntiRagging/Grievance Objectives */}
        {['iqac', 'anti-ragging', 'grievance', 'sc-st', 'icc'].includes(slug) && (
          <AdminFormSection title="Strategic Objectives" icon="🎯" isOpen={activeAccordionSection === 'objectives'} onToggle={() => setActiveAccordionSection(activeAccordionSection === 'objectives' ? null : 'objectives')}>
            <ListManager 
              title="Objective" 
              items={payload.objectives || []} 
              onChange={items => setPayload({...payload, objectives: items})} 
<<<<<<< HEAD
              charLimit={slug === 'sc-st' ? [50, 450] : [50, 600]}
=======
              maxItems={10}
              charLimit={slug === 'sc-st' ? [80, 100] : [80, 120]}
>>>>>>> a10712dd9bfe52065269a0c041e8a0d058872467
            />
          </AdminFormSection>
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
          <AdminFormSection title="Constitutional Guidelines" icon="📜" isOpen={activeAccordionSection === 'guidelines'} onToggle={() => setActiveAccordionSection(activeAccordionSection === 'guidelines' ? null : 'guidelines')}>
            <ListManager 
              title="Guideline" 
              items={payload.guidelines || []} 
              onChange={items => setPayload({...payload, guidelines: items})} 
              maxItems={12}
            />
          </AdminFormSection>
        )}

        {/* Member Table */}
        {!['equal-opportunity', 'sedg'].includes(slug) && (
          <AdminFormSection title="Committee Member Roster" icon="👥" isOpen={activeAccordionSection === 'members'} onToggle={() => setActiveAccordionSection(activeAccordionSection === 'members' ? null : 'members')}>
            <TableManager 
              items={payload.members || []} 
              onChange={members => setPayload({...payload, members})}
              columns={
                slug === 'cdc' ? [{ key: 'post', label: 'Committee Post', placeholder: 'e.g. Chairman' }, { key: 'name', label: 'Full Member Name', placeholder: 'e.g. Dr. John Doe' }] :
                slug === 'iqac' ? [{ key: 'name', label: 'Official Name', placeholder: 'Full Name' }, { key: 'designation', label: 'Academic Designation', placeholder: 'e.g. Professor & Head' }] :
                slug === 'anti-ragging' ? [{ key: 'name', label: 'Official Name', placeholder: 'Full Name' }, { key: 'designation', label: 'Designation', placeholder: 'e.g. HOD IT' }, { key: 'contact', label: 'Emergency Contact', placeholder: 'Mobile / Extension', limit: 40 }] :
                slug === 'grievance' ? [{ key: 'post', label: 'Post', placeholder: 'e.g. Member Secretary' }, { key: 'name', label: 'Full Name', placeholder: 'Official Name' }, { key: 'email', label: 'Institutional Email', placeholder: 'email@vcet.edu.in', limit: 40 }] :
                slug === 'icc' ? [{ key: 'post', label: 'Post', placeholder: 'e.g. Presiding Officer' }, { key: 'name', label: 'Official Name', placeholder: 'Full Name' }, { key: 'contact', label: 'Contact', placeholder: 'Phone Number', limit: 40 }] :
                [{ key: 'name', label: 'Full Name', placeholder: 'Official Name' }, { key: 'post', label: 'Committee Role', placeholder: 'e.g. Member Secretary' }]
              }
<<<<<<< HEAD
              maxItems={slug === 'cdc' ? 12 : 10}
=======
              maxItems={slug === 'cdc' ? 20 : 15}
>>>>>>> a10712dd9bfe52065269a0c041e8a0d058872467
            />
          </AdminFormSection>
        )}

        {/* IQAC Reports */}
        {slug === 'iqac' && (
          <AdminFormSection title="AQAR Archives (Annual Reports)" icon="📊" isOpen={activeAccordionSection === 'reports'} onToggle={() => setActiveAccordionSection(activeAccordionSection === 'reports' ? null : 'reports')}>
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
          </AdminFormSection>
        )}

        {/* Equal Opportunity / SEDG Cell PDF Uploads */}
        {['equal-opportunity', 'sedg'].includes(slug) && (
          <AdminFormSection title="Regulatory Documentation" icon="📁" isOpen={activeAccordionSection === 'docs'} onToggle={() => setActiveAccordionSection(activeAccordionSection === 'docs' ? null : 'docs')}>
            <PDFDocumentManager 
              items={payload.documents || []} 
              onChange={docs => setPayload({...payload, documents: docs})} 
<<<<<<< HEAD
              maxItems={slug === 'sedg' ? 2 : 4}
              showUrlField={slug === 'equal-opportunity'}
=======
              maxItems={10}
              showUrlField
>>>>>>> a10712dd9bfe52065269a0c041e8a0d058872467
            />
          </AdminFormSection>
        )}
        </div>
      </form>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
};

export default CommitteesForm;
