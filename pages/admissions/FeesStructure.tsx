import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { FileText, Download, Calendar } from 'lucide-react';

const feesData = [
  {
    title: 'FE Fee Structure',
    description: 'First Year Engineering fee details for 2025-26.',
    link: 'https://vcet.edu.in/wp-content/uploads/2025/08/Marthi-English-F.E-2025-26-1.pdf',
    year: '2025-26'
  },
  {
    title: 'FE Admission Fee Structure & Documents Required',
    description: 'CAP documents and fee structure for First Year Engineering admission.',
    link: 'https://vcet.edu.in/wp-content/uploads/2025/09/FIRST-YEAR-ENGINEERING-ADMISSION-2025-2026-CAP-DOCUMENTS-FEE-STRUCTURE.pdf',
    year: '2025-26'
  },
  {
    title: 'Direct SE Fee Structure',
    description: 'Direct Second Year Engineering fee structure and CAP documents.',
    link: 'https://vcet.edu.in/wp-content/uploads/2025/08/DIRECT-SECOND-YEAR-ENGINEERING-ADMISSION-2025-2026-CAP-DOCUMENTS-FEE-STRUCTURE.pdf',
    year: '2025-26'
  },
  {
    title: 'DSE Admission Fee Structure & Documents Required',
    description: 'Direct Second Year Engineering admission fee structure and required documents.',
    link: 'https://vcet.edu.in/wp-content/uploads/2025/09/DIRECT-SECOND-YEAR-ENGINEERING-ADMISSION-2025-2026-CAP-DOCUMENTS-FEE-STRUCTURE-1.pdf',
    year: '2025-26'
  },
  {
    title: 'M.E. Fee Structure',
    description: 'Masters of Engineering program fee details.',
    link: 'https://vcet.edu.in/wp-content/uploads/2025/08/FIRST-YEAR-M.-E.-ADMISSION-2025-2026-CAP-DOCUMENTS-FEE-STRUCTURE.pdf',
    year: '2025-26'
  },
  {
    title: 'MMS Fee Structure',
    description: 'Master of Management Studies program fee details.',
    link: 'https://vcet.edu.in/wp-content/uploads/2025/08/FIRST-YEAR-M.M.S-ADMISSION-2025-2026-CAP-DOCUMENTS-FEE-STRUCTURE.pdf',
    year: '2025-26'
  },
];

const FeesStructure: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Fees Structure 25-26"
        breadcrumbs={[
          { label: 'Admission', href: '/admission' },
          { label: 'Fees Structure' },
        ]}
      />

      <div className="bg-white min-h-screen font-sans">
        {/* Header Section */}
        <section className="pt-20 pb-16 px-4 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-0.5 w-12 bg-[#e6a315]"></div>
            <span className="text-[#e6a315] text-[10px] font-bold uppercase tracking-[0.3em]">Documents</span>
            <div className="h-0.5 w-12 bg-[#e6a315]"></div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1e4e85] mb-6">
            Fees Structure 2025-26
          </h1>
          
          <p className="max-w-2xl mx-auto text-slate-500 text-lg leading-relaxed">
            Download the fee structure documents for various programs offered at VCET. 
            Access official PDF outlines for academic excellence and administrative clarity.
          </p>
        </section>

        {/* Grid of Download Cards */}
        <section className="pb-24 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {feesData.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
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
                  <h3 className="text-[17px] font-serif font-bold text-[#1e4e85] truncate mb-1">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[#e6a315]">
                    <Calendar size={14} />
                    <span className="text-xs font-bold tracking-wide">
                      {item.year}
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
                <span className="font-bold text-[#1e4e85] uppercase tracking-tighter mr-2">Note:</span> 
                Fee structures are subject to revision as per directives from the Fee Regulating Authority and University of Mumbai. 
                Please contact the admission office for the latest details.
              </p>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default FeesStructure;
