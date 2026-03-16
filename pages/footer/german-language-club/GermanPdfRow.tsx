import React from 'react';
import { ExternalLink, FileText } from 'lucide-react';

interface GermanPdfRowProps {
  title: string;
  description?: string;
  href: string;
}

const GermanPdfRow: React.FC<GermanPdfRowProps> = ({ title, description, href }) => {
  return (
    <div className="border border-brand-blue/20 bg-slate-50 p-4 md:p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center bg-brand-blue text-white">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-display font-bold text-brand-navy">{title}</h3>
            {description && <p className="mt-1 text-sm leading-relaxed text-slate-600">{description}</p>}
          </div>
        </div>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-2 bg-brand-blue px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-gold hover:text-brand-dark hover:shadow-md"
        >
          View PDF
          <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </div>
  );
};

export default GermanPdfRow;