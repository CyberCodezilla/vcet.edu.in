import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { FileText, Download, Calendar, ShieldCheck } from 'lucide-react';

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
        breadcrumbs={[{ label: 'Fees Structure' }]}
      />

      <div className="bg-white min-h-screen">
        
        {/* ── Introduction Strip ── */}
        <section className="py-10 md:py-20 px-4 sm:px-6 border-b border-slate-100">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
            <div className="flex-1">
              <span className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.4em] text-[#fdb813] mb-3 md:mb-4 block">
                Academic Administration
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#1a4b7c] leading-tight tracking-tight">
                Fee Structure
              </h2>
              <div className="w-14 md:w-20 h-1 md:h-1.5 bg-[#1a4b7c] mt-4 md:mt-6" />
            </div>
            <p className="md:max-w-md text-[15px] md:text-[17px] text-[#6B7280] leading-[1.8] italic border-l-4 border-[#fdb813] pl-4 md:pl-6">
              Official fee schedules for the 2025-26 session, providing transparent 
              breakdowns for all undergraduate and postgraduate programs.
            </p>
          </div>
        </section>

        {/* ── Table Section ── */}
        <section className="py-10 md:py-20 px-4 sm:px-6 bg-[#FBFBFB]">
          <div className="max-w-[1200px] mx-auto">
            
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">

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
                      <th className="px-8 py-5 text-left text-[13px] font-bold uppercase tracking-[0.2em] border-r border-white/10">Program Documentation</th>
                      <th className="px-8 py-5 text-center text-[13px] font-bold uppercase tracking-[0.2em] border-r border-white/10 w-[180px]">Year</th>
                      <th className="px-8 py-5 text-right text-[13px] font-bold uppercase tracking-[0.2em] w-[200px]">Download Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feesData.map((item, idx) => (
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
                          <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#1a4b7c]/5 text-[#1a4b7c] text-[12px] font-bold uppercase tracking-widest border border-[#1a4b7c]/10">
                            <Calendar className="w-3.5 h-3.5" />
                            {item.year}
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

export default FeesStructure;
