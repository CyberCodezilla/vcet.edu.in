import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { FileText, Download, Calendar, ShieldCheck } from 'lucide-react';

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
        breadcrumbs={[{ label: 'Documents Required' }]}
      />

      <div className="bg-white min-h-screen">
        
        {/* ── Introduction Strip ── */}


        {/* ── Table Section ── */}
        <section className="py-20 px-6 bg-[#FBFBFB]">
          <div className="max-w-[1200px] mx-auto">
            
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-display font-bold text-[#1a4b7c] uppercase tracking-wider">Required Documentation</h3>
              </div>
              <div className="hidden md:flex items-center gap-2 text-[11px] font-bold text-[#6B7280] uppercase tracking-[0.2em]">

              </div>
            </div>

            {/* Formal Ledger Table */}
            <div className="border-[6px] border-[#1a4b7c] bg-white overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] border-collapse">
                  <thead>
                    <tr className="bg-[#1a4b7c] text-white">
                      <th className="px-8 py-5 text-left text-[13px] font-bold uppercase tracking-[0.2em] border-r border-white/10 w-[80px]"></th>
                      <th className="px-8 py-5 text-left text-[13px] font-bold uppercase tracking-[0.2em] border-r border-white/10">Documentation Details</th>
                      <th className="px-8 py-5 text-center text-[13px] font-bold uppercase tracking-[0.2em] border-r border-white/10 w-[180px]">Category</th>
                      <th className="px-8 py-5 text-center text-[13px] font-bold uppercase tracking-[0.2em] w-[120px]">Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((item, idx) => (
                      <tr 
                        key={idx}
                        className={`group border-b border-[#E5E7EB] last:border-b-0 transition-colors duration-200 ${
                          idx % 2 === 0 ? 'bg-white' : 'bg-[#FAFBFC]'
                        } hover:bg-[#1a4b7c]/5`}
                      >
                        <td className="px-8 py-6 text-center border-r border-[#E5E7EB]">
                          <div className="w-10 h-10 border-2 border-[#1a4b7c] flex items-center justify-center font-bold text-[#1a4b7c] group-hover:bg-[#1a4b7c] group-hover:text-white transition-all">
                            {String(idx + 1).padStart(2, '0')}
                          </div>
                        </td>
                        <td className="px-8 py-6 border-r border-[#E5E7EB]">
                          <div className="flex items-start gap-4">
                            <FileText className="w-5 h-5 text-[#fdb813] mt-1 shrink-0" />
                            <div>
                              <h4 className="text-[17px] font-display font-bold text-[#1a4b7c] mb-1 group-hover:text-[#1a4b7c] transition-colors">
                                {item.title}
                              </h4>
                              <p className="text-[14px] text-[#6B7280] leading-relaxed">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-center border-r border-[#E5E7EB]">
                          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a4b7c]/5 text-[#1a4b7c] text-[13px] font-bold uppercase tracking-wide whitespace-nowrap border border-[#1a4b7c]/10">
                            {item.tag}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-center">
                          <a 
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center text-[#1a4b7c] hover:text-[#fdb813] transition-all duration-300"
                          >
                            <Download className="w-5 h-5" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </section>


      </div>
    </PageLayout>
  );
};

export default DocumentsRequired;
