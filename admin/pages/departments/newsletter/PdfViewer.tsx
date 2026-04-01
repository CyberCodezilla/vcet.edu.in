import React from 'react';

interface PdfViewerProps {
  url: string;
  onClose: () => void;
  title?: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ url, onClose, title = 'PDF Preview' }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 p-4 sm:p-6 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-5xl h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <h3 className="text-[#0F172A] font-bold text-lg">{title}</h3>
              <p className="text-slate-400 text-xs font-medium">Document Preview</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Viewer */}
        <div className="flex-1 bg-slate-100 p-2 sm:p-4">
          <iframe 
            src={url} 
            className="w-full h-full rounded-2xl border border-slate-200 shadow-inner bg-white"
            title={title}
          />
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
