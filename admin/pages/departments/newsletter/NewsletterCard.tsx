import React from 'react';
import type { Newsletter, Department } from '../../../types';

interface NewsletterCardProps {
  newsletter: Newsletter;
  departments: Department[];
  onEdit: (n: Newsletter) => void;
  onDelete: (n: Newsletter) => void;
  onPreview: (n: Newsletter) => void;
  isDeleting: boolean;
}

const NewsletterCard: React.FC<NewsletterCardProps> = ({
  newsletter,
  departments,
  onEdit,
  onDelete,
  onPreview,
  isDeleting
}) => {
  const departmentName = departments.find(d => d.id.toString() === newsletter.departmentId.toString())?.name || 'Unknown Dept';

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center gap-5 hover:shadow-md transition-all group">
      {/* Thumbnail */}
      <div className="w-full sm:w-40 aspect-video rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 relative">
        {newsletter.image ? (
          <img src={newsletter.image} alt="Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
             <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16h16M4 12h16M4 8h16" /></svg>
             <span className="text-[10px] font-bold">NO IMAGE</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
            {departmentName}
          </span>
          <span className="text-slate-400 text-[10px] font-semibold flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {new Date(newsletter.createdAt).toLocaleDateString()}
          </span>
        </div>
        <h3 className="text-lg font-bold text-slate-800 truncate">{newsletter.title}</h3>
        <p className="text-sm text-slate-500 mt-1 line-clamp-2">{newsletter.description}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100">
        <button
          onClick={() => onPreview(newsletter)}
          className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
          title="Preview Detailed View"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
        </button>
        <button
          onClick={() => onEdit(newsletter)}
          className="p-2.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
          title="Edit"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
        </button>
        <button
          onClick={() => onDelete(newsletter)}
          disabled={isDeleting}
          className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all disabled:opacity-40"
          title="Delete"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </button>
      </div>
    </div>
  );
};

export default NewsletterCard;
