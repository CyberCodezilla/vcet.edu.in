import React, { useRef } from 'react';
import type { Department } from '../../../types';

interface NewsletterFormProps {
  title: string;
  setTitle: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  departmentId: string | number;
  setDepartmentId: (val: string | number) => void;
  departments: Department[];
  setImageFile: (f: File | null) => void;
  setPdfFile: (f: File | null) => void;
  imageName: string | null;
  pdfName: string | null;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  isEditing: boolean;
  onCancelEdit: () => void;
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({
  title, setTitle,
  description, setDescription,
  departmentId, setDepartmentId,
  departments,
  setImageFile, setPdfFile,
  imageName, pdfName,
  onSubmit,
  isSubmitting,
  isEditing,
  onCancelEdit
}) => {
  const imgInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        alert('Notice: Only JPG and PNG allowed for Images.');
        return;
      }
      setImageFile(file);
    }
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf') {
        alert('Notice: Only PDF allowed.');
        return;
      }
      setPdfFile(file);
    }
  };

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#0F172A]">{isEditing ? 'Editing Newsletter' : 'Create Newsletter'}</h2>
          <p className="text-slate-400 text-xs font-semibold">Fill details to publish</p>
        </div>
      </div>

      <div className="space-y-5 flex-1">
        {/* Department */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Select Department *</label>
          <div className="relative">
            <select
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#1e293b] focus:border-transparent font-semibold shadow-inner text-sm transition-all"
              required
            >
              <option value="" disabled>Choose a department...</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., February 2026 Edition"
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e293b] focus:border-transparent font-semibold shadow-inner text-sm transition-all"
            required
            maxLength={120}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Description *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A short summary of this newsletter edition..."
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e293b] focus:border-transparent font-semibold shadow-inner text-sm transition-all resize-none h-28"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Image Upload */}
          <div 
            onClick={() => imgInputRef.current?.click()}
            className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 hover:border-slate-300 transition-colors group"
          >
            <input type="file" ref={imgInputRef} accept=".jpg,.jpeg,.png" className="hidden" onChange={handleImageChange} />
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${imageName ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400 group-hover:text-slate-600 group-hover:bg-slate-200'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <p className={`text-xs font-bold text-center truncate w-full px-2 ${imageName ? 'text-emerald-700' : 'text-slate-500'}`}>
              {imageName || 'Upload Thumbnail'}
            </p>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5 uppercase">JPG, PNG {isEditing && !imageName && '(Keep Existing)'}</p>
          </div>

          {/* PDF Upload */}
          <div 
             onClick={() => pdfInputRef.current?.click()}
             className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 hover:border-slate-300 transition-colors group"
          >
            <input type="file" ref={pdfInputRef} accept=".pdf" className="hidden" onChange={handlePdfChange} />
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${pdfName ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400 group-hover:text-slate-600 group-hover:bg-slate-200'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            </div>
            <p className={`text-xs font-bold text-center truncate w-full px-2 ${pdfName ? 'text-indigo-700' : 'text-slate-500'}`}>
              {pdfName || 'Upload Document'}
            </p>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5 uppercase">PDF ONLY {isEditing && !pdfName && '(Keep Existing)'}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        {isEditing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="flex-1 px-4 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-sm transition-colors uppercase tracking-wider"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting || (!isEditing && (!imageName || !pdfName))}
          className="flex-1 px-4 py-3.5 bg-[#1e293b] hover:bg-[#0f172a] text-white font-bold rounded-xl text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:shadow-none uppercase tracking-wider disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
             <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          ) : (
            <span>{isEditing ? 'Save Changes' : 'Publish Newsletter'}</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default NewsletterForm;
