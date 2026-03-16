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
          <div className="sticky top-28 bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] overflow-hidden border border-slate-200">
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
                <p>Content for Objectives is coming soon.</p>
              </div>
            </section>
          )}

          {/* Placement Cell Tab */}
          {activeId === 'placement-cell' && (
            <section className="reveal bg-white rounded-2xl p-8 lg:p-12 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
              <div className="space-y-6 text-[#5b6574] leading-relaxed text-[15px]">
                <h3 className="text-2xl font-bold text-[#183a68] border-b border-slate-100 pb-3 mb-6">Placement Cell</h3>
                <p>Content for Placement Cell is coming soon.</p>
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
                <p>Content for Placement Statistics is coming soon.</p>
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
