import React from 'react';

interface PdfPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string | null;
  title?: string;
}

const PdfPreviewModal: React.FC<PdfPreviewModalProps> = ({ isOpen, onClose, pdfUrl, title = 'PDF Preview' }) => {
  const safePdfUrl = pdfUrl?.trim() || null;
  if (!isOpen || !safePdfUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/50 backdrop-blur-sm">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight truncate max-w-lg">{title}</h3>
              <p className="text-xs text-slate-500 font-medium tracking-wide">Document Preview</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={safePdfUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white ring-1 ring-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Download
            </a>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-slate-100 p-2 sm:p-4 rounded-b-2xl overflow-hidden relative">
          {safePdfUrl.startsWith('data:') || safePdfUrl.startsWith('blob:') ? (
            <iframe
              src={safePdfUrl}
              className="w-full h-full rounded-xl bg-white shadow-sm border border-slate-200"
              title={title}
            />
          ) : (
            <iframe
              src={`https://docs.google.com/viewer?url=${encodeURIComponent(safePdfUrl)}&embedded=true`}
              className="w-full h-full rounded-xl bg-white shadow-sm border border-slate-200"
              title={title}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PdfPreviewModal;
