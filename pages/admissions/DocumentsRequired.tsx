import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { FileText, Download, ClipboardList } from 'lucide-react';

const documents = [
  {
    title: 'FE Admission Documents Required',
    description: 'List of documents and fee structure for First Year Engineering admission under CAP.',
    link: 'https://vcet.edu.in/wp-content/uploads/2025/08/FIRST-YEAR-ENGINEERING-ADMISSION-2025-2026-CAP-DOCUMENTS-FEE-STRUCTURE.pdf',
    tag: 'UG - First Year',
  },
  {
    title: 'DSE Admission Documents Required',
    description: 'Required documents and fee structure for Direct Second Year Engineering admission.',
    link: 'https://vcet.edu.in/wp-content/uploads/2025/08/DIRECT-SECOND-YEAR-ENGINEERING-ADMISSION-2025-2026-CAP-DOCUMENTS-FEE-STRUCTURE.pdf',
    tag: 'UG - Direct SE',
  },
  {
    title: 'M.E. Admission Documents Required',
    description: 'Documents and fee structure for First Year M.E. admission under CAP.',
    link: 'https://vcet.edu.in/wp-content/uploads/2025/08/FIRST-YEAR-M.-E.-ADMISSION-2025-2026-CAP-DOCUMENTS-FEE-STRUCTURE.pdf',
    tag: 'PG - M.E.',
  },
  {
    title: 'MMS Admission Documents Required',
    description: 'Documents and fee structure for First Year M.M.S admission under CAP.',
    link: 'https://vcet.edu.in/wp-content/uploads/2025/08/FIRST-YEAR-M.M.S-ADMISSION-2025-2026-CAP-DOCUMENTS-FEE-STRUCTURE.pdf',
    tag: 'Management - MMS',
  },
];

const DocumentsRequired: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Documents Required"
        breadcrumbs={[
          { label: 'Admission', href: '/admission' },
          { label: 'Documents Required' },
        ]}
      />

      <div className="bg-white min-h-screen font-sans">
        {/* Header Section */}
        <section className="pt-20 pb-16 px-4 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-0.5 w-12 bg-[#e6a315]"></div>
            <span className="text-[#e6a315] text-[10px] font-bold uppercase tracking-[0.3em]">Admission</span>
            <div className="h-0.5 w-12 bg-[#e6a315]"></div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1e4e85] mb-6">
            Documents Required for Admission
          </h1>
          
          <p className="max-w-2xl mx-auto text-slate-500 text-lg leading-relaxed">
            Download the complete list of documents required for admission to various programs.
            Please ensure all documents are ready before reporting for the admission process.
          </p>
        </section>

        {/* Grid of Download Cards */}
        <section className="pb-24 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {documents.map((doc, idx) => (
              <a
                key={idx}
                href={doc.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 p-6 bg-[#ebf1f7] hover:bg-[#dfe7f0] rounded-2xl transition-all duration-300 border border-transparent hover:border-slate-200"
              >
                {/* Left Side: Dark Icon Container */}
                <div className="shrink-0 w-16 h-16 bg-[#1e4e85] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <FileText className="w-8 h-8 text-white" />
                </div>

                {/* Middle Side: Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-[17px] font-serif font-bold text-[#1e4e85] mb-1">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-slate-400 mb-2 leading-relaxed">
                    {doc.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold tracking-wide text-[#e6a315] uppercase">
                      {doc.tag}
                    </span>
                  </div>
                </div>

                {/* Right Side: Download Button */}
                <div className="shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center text-slate-400 group-hover:text-[#1e4e85] group-hover:shadow-sm transition-all">
                  <Download size={20} />
                </div>
              </a>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-16 text-center">
            <p className="text-sm text-slate-400 font-medium italic">
              All documents are in PDF format. Click to download or open in a new tab.
            </p>
            <div className="mt-8 max-w-2xl mx-auto p-6 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-xs text-slate-500 leading-relaxed">
                <span className="font-bold text-[#1e4e85] uppercase tracking-tighter mr-2">Important:</span> 
                Original documents along with two sets of photocopies must be submitted at the time of
                admission. Incomplete documentation may result in delay of the admission process.
              </p>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default DocumentsRequired;
