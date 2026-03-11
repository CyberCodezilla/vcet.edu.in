import React, { useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { Award, FileText, ExternalLink, BookOpen, Download } from 'lucide-react';

const governmentScholarships = [
  {
    title: 'Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna - EBC',
    link: 'https://vcet.edu.in/wp-content/uploads/2022/11/Rajarshi-Chhatrapati-Shahu-Maharaj-Shikshan-Shulkh-Shishyavrutti-Yojna-EBC..pdf',
  },
  {
    title: 'Post Matric Scholarship to OBC Students - OBC Scholarship',
    link: 'https://vcet.edu.in/wp-content/uploads/2022/11/Post-Matric-Scholarship-to-OBC-Students-OBC-Scholarship.pdf',
  },
  {
    title: 'Tuition Fees and Examination Fees to OBC Students - OBC Freeship',
    link: 'https://vcet.edu.in/wp-content/uploads/2022/11/Tuition-Fees-and-Examination-Fees-to-OBC-Students-OBC-Freeship.pdf',
  },
  {
    title: 'Scholarship Scheme for State Minority Communities Pursuing Higher Professional Education - Technical Course DTE',
    link: 'https://vcet.edu.in/wp-content/uploads/2022/11/Scholarship-Scheme-for-State-Minority-Communities-Pursuing-Higher-Professional-Education-Technical-Course-DTE..pdf',
  },
  {
    title: 'Post Matric Scholarship to SBC Students - SBC Scholarship',
    link: 'https://vcet.edu.in/wp-content/uploads/2022/11/Post-Matric-Scholarship-to-SBC-Students-SBC-Scholarship.pdf',
  },
  {
    title: 'Tuition Fees and Examination Fees to SBC Students - SBC Freeship',
    link: 'https://vcet.edu.in/wp-content/uploads/2022/11/Tuition-Fees-and-Examination-Fees-to-SBC-Students-SBC-Freeship.pdf',
  },
  {
    title: 'Post Matric Scholarship Scheme - Government of India - ST Scholarship',
    link: 'https://vcet.edu.in/wp-content/uploads/2022/11/Post-Matric-Scholarship-Scheme-Government-of-India-ST-Scholarship.pdf',
  },
  {
    title: 'Government of India Post-Matric Scholarship for SC Category',
    link: 'https://vcet.edu.in/wp-content/uploads/2022/11/Government-of-India-Post-Matric-Scholarship-for-SC-Category.pdf',
  },
  {
    title: 'Post-Matric Tuition Fee and Examination Fee SC Category Freeship',
    link: 'https://vcet.edu.in/wp-content/uploads/2022/11/Post-Matric-Tuition-Fee-and-Examination-Fee-SC-Category-Freeship.pdf',
  },
  {
    title: 'Post Matric Scholarship to VJNT Students VJ-DT-NT Scholarship',
    link: 'https://vcet.edu.in/wp-content/uploads/2022/11/Post-Matric-Scholarship-to-VJNT-Students-VJ-DT-NT-Scholarship.pdf',
  },
  {
    title: 'Tuition Fees and Examination Fees to VJNT Students - VJ-DT-NT Freeship',
    link: 'https://vcet.edu.in/wp-content/uploads/2022/11/Tuition-Fees-and-Examination-Fees-to-VJNT-Students-VJ-DT-NT-Freeship.pdf',
  },
  {
    title: 'Vocational Education Fee Reimbursement ST Category Freeship',
    link: 'https://vcet.edu.in/wp-content/uploads/2022/11/Vocational-Education-Fee-Reimbursement-ST-Category-Freeship.pdf',
  },
];

const aicteSchemes = [
  { 
    title: 'AICTE Swanath Scheme Document_Sept 2021', 
    link: 'https://vcet.edu.in/wp-content/uploads/2021/12/AICTE-Swanath-Scheme-Document_Sept-2021-1.pdf' 
  },
  { 
    title: 'Brief Summary_Swanath', 
    link: 'https://vcet.edu.in/wp-content/uploads/2021/12/Brief-Summary_Swanath-1.pdf' 
  },
  { 
    title: 'AICTE SCHOLARSHIP Schemes 2021-22', 
    link: 'https://vcet.edu.in/wp-content/uploads/2021/12/AICTE-SCHOLARSHIP-Schemes-2021-22-2.pdf' 
  },
  { 
    title: 'Scholarship/Freeship Notice 2023-24', 
    link: 'https://vcet.edu.in/wp-content/uploads/2023/08/NOTICE-WEBSITE.pdf' 
  },
];

const Scholarships: React.FC = () => {
  const [activeSection, setActiveSection] = useState('govt');

  const scrollTo = (id: string, section: string) => {
    setActiveSection(section);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <PageLayout>
      <PageBanner
        title="Scholarships"
        breadcrumbs={[
          { label: 'Admission', href: '/admission' },
          { label: 'Scholarships' },
        ]}
      />

      <section className="py-12 md:py-20 bg-[#f8fafc]">
        <div className="container mx-auto px-4 max-w-[1400px]">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            
            {/* STICKY SIDEBAR NAVIGATION */}
            <aside className="w-full lg:w-80 lg:sticky lg:top-32 shrink-0">
              <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-200">
             
                
                <nav className="flex flex-col">
                  <button 
                    onClick={() => scrollTo('govt-section', 'govt')}
                    className={`flex items-center gap-4 px-6 py-5 transition-all border-l-4 ${activeSection === 'govt' ? 'bg-[#1e4e85] border-[#e6a315] text-white' : 'bg-white border-transparent text-slate-600 hover:bg-slate-50'}`}
                  >
                    <Award size={18} className={activeSection === 'govt' ? 'text-[#e6a315]' : 'text-slate-400'} />
                    <div className="flex flex-col items-start gap-0.5">
                      <span className="text-[10px] font-bold tracking-widest text-[#e6a315] uppercase">State Funded</span>
                      <span className="text-sm font-bold">Government Schemes</span>
                    </div>
                  </button>
                  
                  <button 
                    onClick={() => scrollTo('aicte-section', 'aicte')}
                    className={`flex items-center gap-4 px-6 py-5 transition-all border-l-4 ${activeSection === 'aicte' ? 'bg-[#1e4e85] border-[#e6a315] text-white' : 'bg-white border-transparent text-slate-600 hover:bg-slate-50'}`}
                  >
                    <BookOpen size={18} className={activeSection === 'aicte' ? 'text-[#e6a315]' : 'text-slate-400'} />
                    <div className="flex flex-col items-start gap-0.5">
                      <span className="text-[10px] font-bold tracking-widest text-[#e6a315] uppercase">Technical Education</span>
                      <span className="text-sm font-bold">AICTE & Institutional</span>
                    </div>
                  </button>
                </nav>
              </div>

              {/* QUICK STAT/NOTE CARD */}
              <div className="mt-6 bg-[#e6a315] p-6 rounded-2xl shadow-lg shadow-yellow-600/20 text-white">
                <h4 className="text-lg font-bold mb-2">Notice</h4>
                <p className="text-xs opacity-90 leading-relaxed font-medium">
                  Please ensure all scholarship applications are submitted before the official state deadlines to avoid rejection.
                </p>
              </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 w-full">
              
              {/* SECTION: GOVERNMENT */}
              <div id="govt-section" className="mb-12 scroll-mt-10">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-bold text-[#1e4e85] whitespace-nowrap">Government Scholarships</h2>
                  <div className="h-px bg-slate-200 w-full"></div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-16">Sr.</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Scholarship Name</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {governmentScholarships.map((item, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/30 transition-colors group">
                          <td className="px-6 py-4 text-sm font-bold text-slate-300">
                            {(idx + 1).toString().padStart(2, '0')}
                          </td>
                          <td className="px-6 py-4">
                            <h4 className="text-[13.5px] font-bold text-[#1e4e85] group-hover:text-blue-700 leading-snug">
                              {item.title}
                            </h4>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <a 
                              href={item.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 text-slate-400 hover:bg-[#1e4e85] hover:text-white transition-all shadow-sm"
                            >
                              <Download size={18} />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SECTION: AICTE */}
              <div id="aicte-section" className="scroll-mt-10">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-bold text-[#1e4e85] whitespace-nowrap">AICTE & Notices</h2>
                  <div className="h-px bg-slate-200 w-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aicteSchemes.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-yellow-50 rounded-lg text-[#e6a315] group-hover:bg-[#1e4e85] group-hover:text-white transition-colors">
                          <FileText size={20} />
                        </div>
                        <span className="text-sm font-bold text-[#1e4e85]">{item.title}</span>
                      </div>
                      <ExternalLink size={16} className="text-slate-300 group-hover:text-[#e6a315]" />
                    </a>
                  ))}
                </div>
              </div>

            </main>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Scholarships;
