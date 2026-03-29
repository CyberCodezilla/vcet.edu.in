import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { FileText, ExternalLink, Check } from 'lucide-react';

const sidebarLinks = [
  { id: 'objectives',  label: 'Objectives', icon: 'ph-target' },
  { id: 'placement-cell',    label: 'Placement Cell', icon: 'ph-users' },
  { id: 'gallery',    label: 'Gallery', icon: 'ph-image' },
  { id: 'placement-statistics',label: 'Placement Statistics', icon: 'ph-chart-bar' },
  { id: 'our-recruiters',   label: 'Our Recruiters', icon: 'ph-buildings' },
];

const placementReports = [
  { label: 'Placement 2024-25', href: 'https://vcet.edu.in/wp-content/uploads/2025/06/Placement-Summary-24-25-for-Website.pdf' },
  { label: 'Placement 2023-24', href: 'https://vcet.edu.in/wp-content/uploads/2025/03/Website-Data_merged-1.pdf' },
  { label: 'Placement 2022-23', href: 'https://vcet.edu.in/wp-content/uploads/2024/04/Placement-2022-23.pdf' },
  { label: 'Placement 2021-22', href: 'https://vcet.edu.in/wp-content/uploads/2024/04/2021-22_Website.pdf' },
  { label: 'Placement 2020-21', href: 'https://vcet.edu.in/wp-content/uploads/2024/04/2020-21_Website.pdf' },
  { label: 'Placement 2019-20', href: 'https://vcet.edu.in/wp-content/uploads/2024/04/2019-20_Website.pdf' },
  { label: 'Placement 2018-19', href: 'https://vcet.edu.in/wp-content/uploads/2024/04/2018-19_Website.pdf' },
];

const StyledPointList: React.FC<{ items: string[] }> = ({ items }) => (
  <div className="border-2 border-[#adb9c6] overflow-hidden bg-white shadow-none">
    <table className="w-full border-separate border-spacing-0">
      <tbody>
        {items.map((item, index) => (
          <tr
            key={index}
            className={`group transition-all duration-200 hover:bg-[#fff6dc] hover:shadow-[0_8px_18px_rgba(0,0,0,0.12)] ${
              index % 2 === 0 ? 'bg-white' : 'bg-[#d7e5f2]'
            }`}
          >
            <td className="px-4 md:px-5 py-4 border-b border-[#d4dbe3] transition-all duration-200 group-hover:py-[18px]">
              <div className="flex items-start gap-[14px] transition-transform duration-200 group-hover:translate-x-0.5">
                <span className="mt-0.5 inline-flex w-9 h-9 rounded-lg bg-[#fff7df] border border-[#ffe3a7] items-center justify-center text-[#1a4b7c] flex-shrink-0">
                  <Check className="w-4 h-4" strokeWidth={2.5} />
                </span>
                <p className="text-base md:text-lg leading-[1.7] text-[#333333]">{item}</p>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Placement: React.FC = () => {
  const [activeId, setActiveId] = React.useState('objectives');
  const activeLink = sidebarLinks.find(l => l.id === activeId);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    const t = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observer.observe(el));
    }, 50);
    return () => { clearTimeout(t); observer.disconnect(); };
  }, [activeId]);

  return (
    <PageLayout>
      <PageBanner
        title="Placement"
        breadcrumbs={[
          { label: 'Placement' },
        ]}
      />

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 px-6 lg:px-12 py-12 bg-[#F7F9FC]">
        {/* Sticky Sidebar */}
        <aside className="w-full lg:w-[320px] flex-shrink-0">
          <div className="lg:sticky lg:top-28 bg-white border border-[#E5E7EB] shadow-[4px_4px_0_#E5E7EB] overflow-hidden">
            <nav className="flex flex-col py-2">
              {sidebarLinks.map((link) => {
                const isActive = activeId === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => setActiveId(link.id)}
                    className={`px-6 py-4 text-[15px] text-left transition-all flex items-center justify-between group ${
                        isActive
                          ? 'bg-[#1a4b7c] text-[#fdb813] font-semibold'
                          : 'text-[#1a4b7c] font-medium hover:bg-slate-50'
                    }`}
                  >
                    <span className="flex items-center gap-4">
                      <i className={`ph ${link.icon} text-xl ${ isActive ? '' : 'opacity-70'}`} />
                      {link.label}
                    </span>
                    {isActive && (
                      <i className="ph ph-arrow-right text-sm transform group-hover:translate-x-1 transition-transform" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 w-full min-w-0">
          
          {/* Objectives Tab */}
          {activeId === 'objectives' && (
            <section className="reveal bg-white p-8 lg:p-12 border border-[#E5E7EB] shadow-[4px_4px_0_#E5E7EB]">
              <div className="space-y-6 text-[#5b6574] leading-relaxed text-[15px]">
                <h3 className="text-2xl font-bold text-[#1a4b7c] border-b border-slate-100 pb-3 mb-6">Objectives</h3>
                <StyledPointList
                  items={[
                    'To provide necessary support for implementing the mandate of providing excellent career opportunities for the students.',
                    'To plan and execute tasks like student skills development, soft skills training and career guidance.',
                    'To plan and implement campus interview process.',
                    'To equip students with necessary technical and behavioral competencies by rigorous and meticulously designed skills and aptitude practical trainings.',
                    'To provide all necessary facilities essential for the conduct of campus recruitment.',
                    'To formulate the strategy for roll-out of campus recruitment and placement policy for the campus eligible students.',
                    'To develop and sustain a long term mutually beneficial relationship with the industry.',
                  ]}
                />
              </div>
            </section>
          )}

          {/* Placement Cell Tab */}
          {activeId === 'placement-cell' && (
            <section className="reveal bg-white p-8 lg:p-12 border border-[#E5E7EB] shadow-[4px_4px_0_#E5E7EB]">
              <div className="space-y-6 text-[#5b6574] leading-relaxed text-[15px]">
                <h3 className="text-2xl font-bold text-[#1a4b7c] border-b border-slate-100 pb-3 mb-6">Placement Cell</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Manager Card */}
                  <div className="flex flex-col">
                    <div className="w-full aspect-[4/3] bg-slate-100 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-slate-400 mb-4 overflow-hidden">
                      <i className="ph ph-image text-4xl mb-2 opacity-50"></i>
                      <span className="text-sm font-medium">Image Placeholder</span>
                    </div>
                    <h4 className="text-[#64b5f6] text-2xl font-bold mb-1">Mr. Prafulla Patil</h4>
                    <p className="text-slate-600 mb-4">Placement Manager</p>
                    
                    <div className="space-y-2 text-slate-600">
                      <div className="flex items-center gap-3 justify-center md:justify-start">
                        <i className="ph-fill ph-envelope text-[#1a4b7c]"></i>
                        <a href="mailto:placements@vcet.edu.in" className="hover:text-[#1a4b7c] transition-colors hover:underline">placements@vcet.edu.in</a>
                      </div>
                      <div className="flex items-center gap-3 justify-center md:justify-start">
                        <i className="ph-fill ph-device-mobile text-[#1a4b7c]"></i>
                        <a href="tel:+917710070966" className="hover:text-[#1a4b7c] transition-colors hover:underline">7710070966</a>
                      </div>
                      <div className="flex items-center gap-3 justify-center md:justify-start">
                        <i className="ph-fill ph-phone text-[#1a4b7c]"></i>
                        <span>0250-2338234 (Extn:228)</span>
                      </div>
                    </div>
                  </div>

                  {/* TPO Card */}
                  <div className="flex flex-col">
                    <div className="w-full aspect-[4/3] bg-slate-100 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-slate-400 mb-4 overflow-hidden">
                      <i className="ph ph-image text-4xl mb-2 opacity-50"></i>
                      <span className="text-sm font-medium">Image Placeholder</span>
                    </div>
                    <h4 className="text-[#64b5f6] text-2xl font-bold mb-1">Mr. Sanket Patil</h4>
                    <p className="text-slate-600 mb-4">Training And Placement Officer</p>
                    
                    <div className="space-y-2 text-slate-600">
                      <div className="flex items-center gap-3 justify-center md:justify-start">
                        <i className="ph-fill ph-envelope text-[#1a4b7c]"></i>
                        <a href="mailto:placements@vcet.edu.in" className="hover:text-[#1a4b7c] transition-colors hover:underline">placements@vcet.edu.in</a>
                      </div>
                      <div className="flex items-center gap-3 justify-center md:justify-start">
                        <i className="ph-fill ph-device-mobile text-[#1a4b7c]"></i>
                        <span>7710070970 / 9987173606</span>
                      </div>
                      <div className="flex items-center gap-3 justify-center md:justify-start">
                        <i className="ph-fill ph-phone text-[#1a4b7c]"></i>
                        <span>0250-2338234 (Extn:228)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <h4 className="text-[#64b5f6] text-2xl font-bold mb-4">Training &amp; Placement</h4>
                  <div className="flex items-center justify-center md:justify-start">
                    <a 
                      href="https://vcet.edu.in/wp-content/uploads/2024/04/Training-and-Placement-Committee_1-2.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-slate-700 hover:text-[#1a4b7c] transition-colors group"
                    >
                      <i className="ph-fill ph-book-open text-lg"></i>
                      <span className="font-medium group-hover:underline">Committee</span>
                    </a>
                  </div>
                </div>

              </div>
            </section>
          )}

          {/* Gallery Tab */}
          {activeId === 'gallery' && (
            <section className="reveal bg-white p-8 lg:p-12 border border-[#E5E7EB] shadow-[4px_4px_0_#E5E7EB]">
              <div className="space-y-6 text-[#5b6574] leading-relaxed text-[15px]">
                <h3 className="text-2xl font-bold text-[#1a4b7c] border-b border-slate-100 pb-3 mb-6">Gallery</h3>
                <p>Content for Gallery is coming soon.</p>
              </div>
            </section>
          )}

          {/* Placement Statistics Tab */}
          {activeId === 'placement-statistics' && (
            <section className="reveal bg-white p-8 lg:p-12 border border-[#E5E7EB] shadow-[4px_4px_0_#E5E7EB]">
              <div className="space-y-6 text-[#5b6574] leading-relaxed text-[15px]">
                <h3 className="text-2xl font-bold text-[#1a4b7c] border-b border-slate-100 pb-3 mb-6">Placement Statistics</h3>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {placementReports.map((report) => (
                    <a
                      key={report.label}
                      href={report.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 border border-[#E5E7EB] bg-white px-4 py-4 group hover:bg-[#F7F9FC] transition-colors duration-200"
                    >
                      <div className="w-12 h-12 flex items-center justify-center bg-[#1a4b7c] text-white flex-shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[15px] md:text-[16px] font-display font-bold text-[#1a4b7c] group-hover:text-[#3a6fa8] transition-colors">
                          {report.label}
                        </h4>
                        <p className="text-[13px] text-[#374151] mt-0.5">Year-wise placement report</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 px-3 py-2 border border-[#1a4b7c] text-[#1a4b7c] group-hover:bg-[#1a4b7c] group-hover:text-white transition-colors duration-200 min-h-[40px]">
                        <span className="text-[12px] font-bold uppercase tracking-[0.12em]">View PDF</span>
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </a>
                  ))}
                </div>

                <div className="mt-16 space-y-12">
                  {/* Higher Studies Graph */}
                  <div className="border rounded-2xl p-6 md:p-10 bg-white" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05), inset 0 0 0 1px rgba(0,0,0,0.1)' }}>
                    <h4 className="text-center text-2xl md:text-3xl font-serif font-bold text-black mb-12 tracking-wide">Higher Studies</h4>
                    <p className="text-center md:hidden text-[15px] font-serif text-[#1a4b7c] mb-4">
                      No. of students admitted to higher studies
                    </p>
                    
                    <div className="flex flex-col md:flex-row items-center md:items-stretch">
                      <div className="hidden md:flex w-24 lg:w-28 shrink-0 items-center justify-end pr-3">
                        <p className="text-right text-[14px] lg:text-[15px] font-serif text-[#1a4b7c] leading-tight">
                          <span className="block">No. of students admitted to higher</span>
                          <span className="block">studies</span>
                        </p>
                      </div>
                      <div className="flex-1 relative w-full mx-auto max-w-3xl">
                        {/* Grid Lines */}
                        <div className="absolute left-8 right-0 top-0 bottom-0 flex flex-col justify-between pointer-events-none z-0">
                          <div className="border-b border-slate-300 w-full relative"><span className="absolute -left-8 -top-3 text-xs md:text-sm font-serif text-slate-600">50</span></div>
                          <div className="border-b border-slate-300 w-full relative"><span className="absolute -left-8 -top-3 text-xs md:text-sm font-serif text-slate-600">40</span></div>
                          <div className="border-b border-slate-300 w-full relative"><span className="absolute -left-8 -top-3 text-xs md:text-sm font-serif text-slate-600">30</span></div>
                          <div className="border-b border-slate-300 w-full relative"><span className="absolute -left-8 -top-3 text-xs md:text-sm font-serif text-slate-600">20</span></div>
                          <div className="border-b border-slate-300 w-full relative"><span className="absolute -left-8 -top-3 text-xs md:text-sm font-serif text-slate-600">10</span></div>
                          <div className="border-b border-slate-400 w-full relative"><span className="absolute -left-6 -top-3 text-xs md:text-sm font-serif text-slate-600">0</span></div>
                        </div>

                        {/* Bars Container */}
                        <div className="ml-8 mr-0 h-64 md:h-80 relative z-10 flex items-end justify-around pb-0 border-l border-slate-400">
                          {[
                            { year: '2018-19', value: 34, color: 'bg-[#1a4b7c]' },
                            { year: '2019-20', value: 36, color: 'bg-[#2f6298]' },
                            { year: '2020-21', value: 49, color: 'bg-[#3a6fa8]' },
                            { year: '2021-22', value: 41, color: 'bg-[#fdb813]' },
                            { year: '2022-23', value: 21, color: 'bg-[#d89c0f]' },
                            { year: '2023-24', value: 26, color: 'bg-[#214e7f]' },
                          ].map((item) => (
                            <div key={item.year} className="flex flex-col items-center w-8 md:w-14 group h-full justify-end relative">
                              <div 
                                className={`w-full ${item.color} border border-slate-800 border-b-0 rounded-t-[2px] relative z-10 transition-all duration-300 hover:brightness-110`} 
                                style={{ height: `${(item.value / 50) * 100}%` }}
                              >
                                 <div className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                 <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[11px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                                   {item.value}
                                 </span>
                              </div>
                              <span className="absolute -bottom-8 text-[11px] md:text-[13px] font-serif whitespace-nowrap text-slate-700">{item.year}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Legend */}
                      <div className="mt-16 md:mt-0 flex flex-row md:flex-col justify-center flex-wrap gap-4 md:gap-5 md:ml-10">
                        {[
                          { year: '2018-19', color: 'bg-[#1a4b7c]' },
                          { year: '2019-20', color: 'bg-[#2f6298]' },
                          { year: '2020-21', color: 'bg-[#3a6fa8]' },
                          { year: '2021-22', color: 'bg-[#fdb813]' },
                          { year: '2022-23', color: 'bg-[#d89c0f]' },
                          { year: '2023-24', color: 'bg-[#214e7f]' },
                        ].map((l) => (
                          <div key={l.year} className="flex items-center gap-2">
                            <div className={`w-3 h-3 md:w-4 md:h-4 border border-slate-800 ${l.color}`}></div>
                            <span className="text-[12px] md:text-[14px] font-serif text-slate-700">{l.year}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="text-center mt-12 text-lg md:text-[19px] font-serif tracking-wide text-black pb-2">Academic Year</div>
                  </div>

                  {/* Highest Package Graph */}
                  <div className="border rounded-2xl p-6 md:p-10 bg-white" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05), inset 0 0 0 1px rgba(0,0,0,0.1)' }}>
                    <h4 className="text-center text-2xl md:text-3xl font-serif font-bold text-black mb-12 tracking-wide">Highest Package</h4>
                    <p className="text-center md:hidden text-[15px] font-serif text-[#1a4b7c] mb-4">
                      Package (LPA)
                    </p>
                    
                    <div className="flex flex-col md:flex-row items-center md:items-stretch">
                      <div className="hidden md:flex w-24 lg:w-28 shrink-0 items-center justify-end pr-3">
                        <p className="text-right text-[14px] lg:text-[15px] font-serif text-[#1a4b7c] leading-tight">
                          <span className="block">Package</span>
                          <span className="block">(LPA)</span>
                        </p>
                      </div>
                      <div className="flex-1 relative w-full mx-auto max-w-3xl">
                        {/* Grid Lines */}
                        <div className="absolute left-8 right-0 top-0 bottom-0 flex flex-col justify-between pointer-events-none z-0">
                          <div className="border-b border-slate-300 w-full relative"><span className="absolute -left-8 -top-3 text-xs md:text-sm font-serif text-slate-600">25</span></div>
                          <div className="border-b border-slate-300 w-full relative"><span className="absolute -left-8 -top-3 text-xs md:text-sm font-serif text-slate-600">20</span></div>
                          <div className="border-b border-slate-300 w-full relative"><span className="absolute -left-8 -top-3 text-xs md:text-sm font-serif text-slate-600">15</span></div>
                          <div className="border-b border-slate-300 w-full relative"><span className="absolute -left-8 -top-3 text-xs md:text-sm font-serif text-slate-600">10</span></div>
                          <div className="border-b border-slate-300 w-full relative"><span className="absolute -left-6 -top-3 text-xs md:text-sm font-serif text-slate-600">5</span></div>
                          <div className="border-b border-slate-400 w-full relative"><span className="absolute -left-6 -top-3 text-xs md:text-sm font-serif text-slate-600">0</span></div>
                        </div>

                        {/* Bars Container */}
                        <div className="ml-8 mr-0 h-64 md:h-80 relative z-10 flex items-end justify-around pb-0 border-l border-slate-400">
                          {[
                            { year: '2018-19', value: 21, color: 'bg-[#1a4b7c]' },
                            { year: '2019-20', value: 7, color: 'bg-[#2f6298]' },
                            { year: '2020-21', value: 9, color: 'bg-[#3a6fa8]' },
                            { year: '2021-22', value: 18, color: 'bg-[#fdb813]' },
                            { year: '2022-23', value: 11, color: 'bg-[#d89c0f]' },
                            { year: '2023-24', value: 10, color: 'bg-[#214e7f]' },
                          ].map((item) => (
                            <div key={item.year} className="flex flex-col items-center w-8 md:w-14 group h-full justify-end relative">
                              <div 
                                className={`w-full ${item.color} border border-slate-800 border-b-0 rounded-t-[2px] relative z-10 transition-all duration-300 hover:brightness-110`} 
                                style={{ height: `${(item.value / 25) * 100}%` }}
                              >
                                 <div className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                 <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[11px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                                   {item.value} LPA
                                 </span>
                              </div>
                              <span className="absolute -bottom-8 text-[11px] md:text-[13px] font-serif whitespace-nowrap text-slate-700">{item.year}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Legend */}
                      <div className="mt-16 md:mt-0 flex flex-row md:flex-col justify-center flex-wrap gap-4 md:gap-5 md:ml-10">
                        {[
                          { year: '2018-19', color: 'bg-[#1a4b7c]' },
                          { year: '2019-20', color: 'bg-[#2f6298]' },
                          { year: '2020-21', color: 'bg-[#3a6fa8]' },
                          { year: '2021-22', color: 'bg-[#fdb813]' },
                          { year: '2022-23', color: 'bg-[#d89c0f]' },
                          { year: '2023-24', color: 'bg-[#214e7f]' },
                        ].map((l) => (
                          <div key={l.year} className="flex items-center gap-2">
                            <div className={`w-3 h-3 md:w-4 md:h-4 border border-slate-800 ${l.color}`}></div>
                            <span className="text-[12px] md:text-[14px] font-serif text-slate-700">{l.year}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="text-center mt-12 text-lg md:text-[19px] font-serif tracking-wide text-black pb-2">Academic Year</div>
                  </div>
                </div>

              </div>
            </section>
          )}

          {/* Our Recruiters Tab */}
          {activeId === 'our-recruiters' && (
            <section className="reveal bg-white p-8 lg:p-12 border border-[#E5E7EB] shadow-[4px_4px_0_#E5E7EB]">
              <div className="space-y-6 text-[#5b6574] leading-relaxed text-[15px]">
                <h3 className="text-2xl font-bold text-[#1a4b7c] border-b border-slate-100 pb-3 mb-6">Our Recruiters</h3>
                <p>Content for Our Recruiters is coming soon.</p>
              </div>
            </section>
          )}

        </main>
      </div>
    </PageLayout>
  );
};

export default Placement;

