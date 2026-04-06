import React, { useEffect, useMemo, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { getStudentCareerSection } from '../../services/studentCareer';
import { resolveApiUrl } from '../../services/api';

const sidebarLinks = [
  { id: 'about', label: 'About Industry-Institute Interaction Cell', icon: 'ph-info' },
  { id: 'roles', label: 'Roles of Industry-Institute Interaction Cell', icon: 'ph-briefcase' },
  { id: 'events', label: 'Events', icon: 'ph-calendar-star' },
];

const IIIC: React.FC = () => {
  const [activeId, setActiveId] = useState('about');
  const activeLink = sidebarLinks.find((l) => l.id === activeId);
  const [data, setData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getStudentCareerSection<Record<string, any>>('iiic')
      .then((payload) => {
        if (!mounted) return;
        setData(payload || {});
        setLoading(false);
      })
      .catch(() => {
        if (!mounted) return;
        setData({});
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const about = useMemo(
    () => (Array.isArray(data.about) ? data.about.map((v: any) => String(v || '').trim()).filter(Boolean) : []),
    [data],
  );
  const objectives = useMemo(
    () => (Array.isArray(data.objectives) ? data.objectives.map((v: any) => String(v || '').trim()).filter(Boolean) : []),
    [data],
  );
  const roles = useMemo(
    () => (Array.isArray(data.roles) ? data.roles.map((v: any) => String(v || '').trim()).filter(Boolean) : []),
    [data],
  );
  const events = useMemo(() => (Array.isArray(data.events) ? data.events : []), [data]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );
    const t = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observer.observe(el));
    }, 50);
    return () => {
      clearTimeout(t);
      observer.disconnect();
    };
  }, [activeId]);

  if (loading) {
    return (
      <PageLayout>
        <PageBanner title="IIIC" breadcrumbs={[{ label: 'IIIC' }]} />
        <section className="py-10 md:py-14 bg-[#F7F9FC]">
          <div className="container mx-auto px-4 sm:px-6 text-center text-slate-500">Loading content...</div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageBanner title="IIIC" breadcrumbs={[{ label: 'IIIC' }]} />

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 px-6 lg:px-12 py-12 bg-[#F7F9FC]">
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
                      isActive ? 'bg-[#1a4b7c] text-[#fdb813] font-semibold' : 'text-[#1a4b7c] font-medium hover:bg-slate-50'
                    }`}
                  >
                    <span className="flex items-center gap-4">
                      <i className={`ph ${link.icon} text-xl ${isActive ? '' : 'opacity-70'}`} />
                      {link.label}
                    </span>
                    {isActive && <i className="ph ph-arrow-right text-sm transform group-hover:translate-x-1 transition-transform" />}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        <main className="flex-1 w-full min-w-0">
          {activeId === 'about' && (
            <section className="reveal bg-white p-8 lg:p-12 border border-[#E5E7EB] shadow-[4px_4px_0_#E5E7EB]">
              <div className="space-y-6 text-[#5b6574] leading-relaxed text-justify md:text-left text-[15px]">
                {about.map((line: string, index: number) => (
                  <p key={`${line}-${index}`}>{line}</p>
                ))}
                {objectives.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-bold text-[#1a4b7c] mb-4">Objectives</h3>
                    <ol className="list-decimal pl-5 space-y-3">
                      {objectives.map((item: string, index: number) => (
                        <li key={`${item}-${index}`}>{item}</li>
                      ))}
                    </ol>
                </div>
                )}
              </div>
            </section>
          )}

          {activeId === 'roles' && (
            <section className="reveal bg-white p-8 lg:p-12 border border-[#E5E7EB] shadow-[4px_4px_0_#E5E7EB]">
              <div className="space-y-6 text-[#5b6574] leading-relaxed text-[15px]">
                <h3 className="text-2xl font-bold text-[#1a4b7c] border-b border-slate-100 pb-3 mb-6">Roles of Industry-Institute Interaction Cell</h3>
                <ul className="list-disc pl-5 space-y-3">
                  {roles.map((item: string, index: number) => (
                    <li key={`${item}-${index}`}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {activeId === 'events' && (
            <section className="reveal bg-white p-8 lg:p-12 border border-[#E5E7EB] shadow-[4px_4px_0_#E5E7EB]">
              <div className="space-y-8 text-[#5b6574] leading-relaxed text-[15px]">
                <h3 className="text-2xl font-bold text-[#1a4b7c] border-b border-slate-100 pb-3 mb-6">Events</h3>
                {events.map((event: any, index: number) => (
                  <div key={`${event?.title || 'iiic-event'}-${index}`} className="space-y-3">
                    {event?.title && <h4 className="text-lg font-semibold text-[#1a4b7c]">{event.title}</h4>}
                    {event?.description && <p>{event.description}</p>}
                    {event?.image && (
                      <img
                        src={resolveApiUrl(event.image) || event.image}
                        alt={event?.title || `IIIC event ${index + 1}`}
                        className="w-full max-w-xl rounded-xl border border-slate-200"
                      />
                    )}
                  </div>
                ))}
                {!loading && events.length === 0 && <div className="text-slate-500">No events available.</div>}
              </div>
            </section>
          )}

          {activeId !== 'about' && activeId !== 'roles' && activeId !== 'events' && (
            <section className="reveal bg-white p-12 border border-[#E5E7EB] shadow-[4px_4px_0_#E5E7EB] flex flex-col items-center justify-center text-center min-h-[400px]">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6">
                <i className={`ph ${activeLink?.icon ?? 'ph-folder'} text-3xl text-[#1a4b7c]`} />
              </div>
              <h3 className="text-xl font-bold text-[#1a4b7c] mb-2">{activeLink?.label}</h3>
              <p className="text-slate-500">Content for this section is coming soon.</p>
            </section>
          )}
        </main>
      </div>
    </PageLayout>
  );
};

export default IIIC;
