import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';

const sidebarLinks = [
  { id: 'objectives',  label: 'Objectives', icon: 'ph-target' },
  { id: 'placement-cell',    label: 'Placement Cell', icon: 'ph-users' },
  { id: 'gallery',    label: 'Gallery', icon: 'ph-image' },
  { id: 'placement-statistics',label: 'Placement Statistics', icon: 'ph-chart-bar' },
  { id: 'our-recruiters',   label: 'Our Recruiters', icon: 'ph-buildings' },
];

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

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 px-6 lg:px-12 py-12">
        {/* Sticky Sidebar */}
        <aside className="w-full lg:w-[320px] flex-shrink-0">
          <div className="lg:sticky lg:top-28 bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden border border-slate-200">
            <nav className="flex flex-col py-2">
              {sidebarLinks.map((link) => {
                const isActive = activeId === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => setActiveId(link.id)}
                    className={`px-6 py-4 text-[15px] text-left transition-all flex items-center justify-between group ${
                        isActive
                          ? 'bg-[#183a68] text-[#f2a900] font-semibold'
                          : 'text-[#183a68] font-medium hover:bg-slate-50'
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
            <section className="reveal bg-white rounded-2xl p-8 lg:p-12 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
              <div className="space-y-6 text-[#5b6574] leading-relaxed text-[15px]">
                <h3 className="text-2xl font-bold text-[#183a68] border-b border-slate-100 pb-3 mb-6">Objectives</h3>
                <ul className="list-disc pl-5 space-y-3">
                  <li>To provide necessary support for implementing the mandate of providing excellent career opportunities for the students.</li>
                  <li>To plan and execute tasks like student skills development, soft skills training and career guidance.</li>
                  <li>To plan and implement campus interview process.</li>
                  <li>To equip students with necessary technical and behavioral competencies by rigorous and meticulously designed skills and aptitude practical trainings.</li>
                  <li>To provide all necessary facilities essential for the conduct of campus recruitment.</li>
                  <li>To formulate the strategy for roll-out of campus recruitment and placement policy for the campus eligible students.</li>
                  <li>To develop and sustain a long term mutually beneficial relationship with the industry.</li>
                </ul>
              </div>
            </section>
          )}

          {/* Placement Cell Tab */}
          {activeId === 'placement-cell' && (
            <section className="reveal bg-white rounded-2xl p-8 lg:p-12 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
              <div className="space-y-6 text-[#5b6574] leading-relaxed text-[15px]">
                <h3 className="text-2xl font-bold text-[#183a68] border-b border-slate-100 pb-3 mb-6">Placement Cell</h3>
                
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
                        <i className="ph-fill ph-envelope text-[#183a68]"></i>
                        <a href="mailto:placements@vcet.edu.in" className="hover:text-[#183a68] transition-colors hover:underline">placements@vcet.edu.in</a>
                      </div>
                      <div className="flex items-center gap-3 justify-center md:justify-start">
                        <i className="ph-fill ph-device-mobile text-[#183a68]"></i>
                        <a href="tel:+917710070966" className="hover:text-[#183a68] transition-colors hover:underline">7710070966</a>
                      </div>
                      <div className="flex items-center gap-3 justify-center md:justify-start">
                        <i className="ph-fill ph-phone text-[#183a68]"></i>
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
                        <i className="ph-fill ph-envelope text-[#183a68]"></i>
                        <a href="mailto:placements@vcet.edu.in" className="hover:text-[#183a68] transition-colors hover:underline">placements@vcet.edu.in</a>
                      </div>
                      <div className="flex items-center gap-3 justify-center md:justify-start">
                        <i className="ph-fill ph-device-mobile text-[#183a68]"></i>
                        <span>7710070970 / 9987173606</span>
                      </div>
                      <div className="flex items-center gap-3 justify-center md:justify-start">
                        <i className="ph-fill ph-phone text-[#183a68]"></i>
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
                      className="flex items-center gap-2 text-slate-700 hover:text-[#183a68] transition-colors group"
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
            <section className="reveal bg-white rounded-2xl p-8 lg:p-12 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
              <div className="space-y-6 text-[#5b6574] leading-relaxed text-[15px]">
                <h3 className="text-2xl font-bold text-[#183a68] border-b border-slate-100 pb-3 mb-6">Gallery</h3>
                <p>Content for Gallery is coming soon.</p>
              </div>
            </section>
          )}

          {/* Placement Statistics Tab */}
          {activeId === 'placement-statistics' && (
            <section className="reveal bg-white rounded-2xl p-8 lg:p-12 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
              <div className="space-y-6 text-[#5b6574] leading-relaxed text-[15px]">
                <h3 className="text-2xl font-bold text-[#183a68] border-b border-slate-100 pb-3 mb-6">Placement Statistics</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8 mt-8">
                  <a href="https://vcet.edu.in/wp-content/uploads/2025/06/Placement-Summary-24-25-for-Website.pdf" target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-brand-blue hover:underline transition-colors block text-[15px]">
                    Placement 2024-25
                  </a>
                  <a href="https://vcet.edu.in/wp-content/uploads/2025/03/Website-Data_merged-1.pdf" target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-brand-blue hover:underline transition-colors block text-[15px]">
                    Placement 2023-24
                  </a>
                  <a href="https://vcet.edu.in/wp-content/uploads/2024/04/Placement-2022-23.pdf" target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-brand-blue hover:underline transition-colors block text-[15px]">
                    Placement 2022-23
                  </a>
                  <a href="https://vcet.edu.in/wp-content/uploads/2024/04/2021-22_Website.pdf" target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-brand-blue hover:underline transition-colors block text-[15px]">
                    Placement 2021-22
                  </a>
                  <a href="https://vcet.edu.in/wp-content/uploads/2024/04/2020-21_Website.pdf" target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-brand-blue hover:underline transition-colors block text-[15px]">
                    Placement 2020-21
                  </a>
                  <a href="https://vcet.edu.in/wp-content/uploads/2024/04/2019-20_Website.pdf" target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-brand-blue hover:underline transition-colors block text-[15px]">
                    Placement 2019-20
                  </a>
                  <a href="https://vcet.edu.in/wp-content/uploads/2024/04/2018-19_Website.pdf" target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-brand-blue hover:underline transition-colors block text-[15px]">
                    Placement 2018-19
                  </a>
                </div>

                <div className="mt-16 space-y-12">
                  {/* Higher Studies Graph */}
                  <div className="border rounded-2xl p-6 md:p-10 bg-white" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.05), inset 0 0 0 1px rgba(0,0,0,0.1)' }}>
                    <h4 className="text-center text-2xl md:text-3xl font-serif font-bold text-black mb-12 tracking-wide">Higher Studies</h4>
                    
                    <div className="flex flex-col md:flex-row items-center md:items-stretch">
                      <div className="hidden md:flex flex-col justify-center items-center mr-8">
                        <span className="-rotate-90 whitespace-nowrap text-[17px] font-serif tracking-wide text-black text-center" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                          No. of students admitted to higher<br/>studies
                        </span>
                      </div>
                      
                      <div className="flex-1 relative w-full mx-auto max-w-3xl">
                        {/* Grid Lines */}
                        <div className="absolute left-8 right-0 top-0 bottom-8 flex flex-col justify-between pointer-events-none z-0">
                          <div className="border-b border-slate-300 w-full relative"><span className="absolute -left-8 -top-3 text-xs md:text-sm font-serif text-slate-600">50</span></div>
                          <div className="border-b border-slate-300 w-full relative"><span className="absolute -left-8 -top-3 text-xs md:text-sm font-serif text-slate-600">40</span></div>
                          <div className="border-b border-slate-300 w-full relative"><span className="absolute -left-8 -top-3 text-xs md:text-sm font-serif text-slate-600">30</span></div>
                          <div className="border-b border-slate-300 w-full relative"><span className="absolute -left-8 -top-3 text-xs md:text-sm font-serif text-slate-600">20</span></div>
                          <div className="border-b border-slate-300 w-full relative"><span className="absolute -left-8 -top-3 text-xs md:text-sm font-serif text-slate-600">10</span></div>
                          <div className="border-b border-slate-400 w-full relative"><span className="absolute -left-6 -top-3 text-xs md:text-sm font-serif text-slate-600">0</span></div>
                        </div>

                        {/* Bars Container */}
                        <div className="ml-8 mr-0 h-64 md:h-80 relative z-10 flex items-end justify-around pb-0 border-l border-slate-400 pt-[2%]">
                          {[
                            { year: '2018-19', value: 34, color: 'bg-[#9800ff]' },
                            { year: '2019-20', value: 36, color: 'bg-[#00e9ec]' },
                            { year: '2020-21', value: 49, color: 'bg-[#1034d6]' },
                            { year: '2021-22', value: 41, color: 'bg-[#ea0b0b]' },
                            { year: '2022-23', value: 21, color: 'bg-[#f4e21a]' },
                            { year: '2023-24', value: 26, color: 'bg-[#3b84ea]' },
                          ].map((item) => (
                            <div key={item.year} className="flex flex-col items-center w-8 md:w-14 group h-full justify-end relative">
                              <div 
                                className={`w-full ${item.color} border border-slate-800 relative z-10 transition-all duration-300 hover:brightness-110 shadow-[-4px_4px_0px_rgba(0,0,0,0.15)]`} 
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
                          { year: '2018-19', color: 'bg-[#9800ff]' },
                          { year: '2019-20', color: 'bg-[#00e9ec]' },
                          { year: '2020-21', color: 'bg-[#1034d6]' },
                          { year: '2021-22', color: 'bg-[#ea0b0b]' },
                          { year: '2022-23', color: 'bg-[#f4e21a]' },
                          { year: '2023-24', color: 'bg-[#3b84ea]' },
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
                    
                    <div className="flex flex-col md:flex-row items-center md:items-stretch">
                      <div className="hidden md:flex flex-col justify-center items-center mr-8">
                        <span className="-rotate-90 whitespace-nowrap text-[17px] font-serif tracking-wide text-black text-center" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                          Package(LPA)
                        </span>
                      </div>
                      
                      <div className="flex-1 relative w-full mx-auto max-w-3xl">
                        {/* Grid Lines */}
                        <div className="absolute left-8 right-0 top-0 bottom-8 flex flex-col justify-between pointer-events-none z-0">
                          <div className="border-b border-slate-300 w-full relative"><span className="absolute -left-8 -top-3 text-xs md:text-sm font-serif text-slate-600">25</span></div>
                          <div className="border-b border-slate-300 w-full relative"><span className="absolute -left-8 -top-3 text-xs md:text-sm font-serif text-slate-600">20</span></div>
                          <div className="border-b border-slate-300 w-full relative"><span className="absolute -left-8 -top-3 text-xs md:text-sm font-serif text-slate-600">15</span></div>
                          <div className="border-b border-slate-300 w-full relative"><span className="absolute -left-8 -top-3 text-xs md:text-sm font-serif text-slate-600">10</span></div>
                          <div className="border-b border-slate-300 w-full relative"><span className="absolute -left-6 -top-3 text-xs md:text-sm font-serif text-slate-600">5</span></div>
                          <div className="border-b border-slate-400 w-full relative"><span className="absolute -left-6 -top-3 text-xs md:text-sm font-serif text-slate-600">0</span></div>
                        </div>

                        {/* Bars Container */}
                        <div className="ml-8 mr-0 h-64 md:h-80 relative z-10 flex items-end justify-around pb-0 border-l border-slate-400 pt-[2%]">
                          {[
                            { year: '2018-19', value: 21, color: 'bg-[#5e0926]' },
                            { year: '2019-20', value: 7, color: 'bg-[#ff6f00]' },
                            { year: '2020-21', value: 9, color: 'bg-[#299843]' },
                            { year: '2021-22', value: 18, color: 'bg-[#fba006]' },
                            { year: '2022-23', value: 11, color: 'bg-[#de2929]' },
                            { year: '2023-24', value: 10, color: 'bg-[#3b84ea]' },
                          ].map((item) => (
                            <div key={item.year} className="flex flex-col items-center w-8 md:w-14 group h-full justify-end relative">
                              <div 
                                className={`w-full ${item.color} border border-slate-800 relative z-10 transition-all duration-300 hover:brightness-110 shadow-[-4px_4px_0px_rgba(0,0,0,0.15)]`} 
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
                          { year: '2018-19', color: 'bg-[#5e0926]' },
                          { year: '2019-20', color: 'bg-[#ff6f00]' },
                          { year: '2020-21', color: 'bg-[#299843]' },
                          { year: '2021-22', color: 'bg-[#fba006]' },
                          { year: '2022-23', color: 'bg-[#de2929]' },
                          { year: '2023-24', color: 'bg-[#3b84ea]' },
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
            <section className="reveal bg-white rounded-2xl p-8 lg:p-12 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
              <div className="space-y-6 text-[#5b6574] leading-relaxed text-[15px]">
                <h3 className="text-2xl font-bold text-[#183a68] border-b border-slate-100 pb-3 mb-6">Our Recruiters</h3>
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
