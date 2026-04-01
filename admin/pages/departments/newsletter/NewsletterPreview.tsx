import React from 'react';
import type { Department } from '../../../types';

interface NewsletterPreviewProps {
  title: string;
  description: string;
  departmentId: string | number;
  imagePreview: string | null;
  pdfPreview: string | null;
  departments: Department[];
  onPreviewPdf: () => void;
}

const NewsletterPreview: React.FC<NewsletterPreviewProps> = ({
  title,
  description,
  departmentId,
  imagePreview,
  pdfPreview,
  departments,
  onPreviewPdf,
}) => {
  const departmentName = departments.find(d => d.id.toString() === departmentId.toString())?.name || 'Select a Department';

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 sticky top-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#0F172A]">Live Preview</h2>
          <p className="text-slate-400 text-xs font-semibold">How it looks on public website</p>
        </div>
      </div>

      <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100 flex flex-col gap-6 transition-all min-h-[400px]">
        {/* Mock Department Header */}
        <div>
          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
            {departmentName}
          </span>
          <h3 className="text-2xl font-black text-slate-800 mt-3 break-words">
            {title || 'Newsletter Title Goes Here'}
          </h3>
        </div>

        {/* Thumbnail Image */}
        <div className="w-full aspect-video rounded-xl bg-slate-200 overflow-hidden flex items-center justify-center border border-slate-200">
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="text-slate-400 flex flex-col items-center">
              <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <span className="text-xs font-semibold">No Image Uploaded</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-slate-500 text-sm leading-relaxed whitespace-pre-wrap flex-1 break-words">
          {description || 'Add a description to see how it looks here. This text will wrap dynamically and adjust to the bounding container constraints.'}
        </p>

        {/* Action Button */}
        <button
          onClick={onPreviewPdf}
          disabled={!pdfPreview}
          className={`w-full py-4 text-sm font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 ${pdfPreview ? 'bg-[#1e293b] hover:bg-[#0f172a] text-white hover:shadow-lg hover:-translate-y-0.5' : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          {pdfPreview ? 'Read Newsletter' : 'PDF Missing'}
        </button>
      </div>
    </div>
  );
};

export default NewsletterPreview;
