import React, { useEffect, useMemo, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { getStudentCareerSection } from '../../services/studentCareer';
import { resolveApiUrl } from '../../services/api';

const sidebarLinks = [
  { id: 'about', label: 'Entrepreneurship Cell', icon: 'ph-info' },
  { id: 'events', label: 'Events', icon: 'ph-calendar-star' },
  { id: 'coordinator', label: 'Co-ordinator', icon: 'ph-user' },
  { id: 'gallery', label: 'Gallery', icon: 'ph-image' },
];

const ECell: React.FC = () => {
  const [activeId, setActiveId] = useState('about');
  const activeLink = sidebarLinks.find((l) => l.id === activeId);
  const [data, setData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getStudentCareerSection<Record<string, any>>('e-cell')
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
  const ecellEvents = useMemo(() => (Array.isArray(data.ecellEvents) ? data.ecellEvents : []), [data]);
  const members = useMemo(() => (Array.isArray(data.members) ? data.members : []), [data]);
  const gallery = useMemo(() => (Array.isArray(data.gallery) ? data.gallery : []), [data]);

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
        <PageBanner title="E-Cell" breadcrumbs={[{ label: 'E-Cell' }]} />
        <section className="py-10 md:py-14 bg-[#F7F9FC]">
          <div className="container mx-auto px-4 sm:px-6 text-center text-slate-500">Loading content...</div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageBanner title="E-Cell" breadcrumbs={[{ label: 'E-Cell' }]} />

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

          {activeId === 'events' && (
            <section className="reveal bg-white p-8 lg:p-12 border border-[#E5E7EB] shadow-[4px_4px_0_#E5E7EB]">
              <div className="space-y-10 text-[#5b6574] leading-relaxed text-[15px]">
                {ecellEvents.map((yearGroup: any, yearIdx: number) => (
                  <div key={`${yearGroup?.year || 'year'}-${yearIdx}`} className="space-y-5">
                    <h3 className="text-2xl font-bold text-[#1a4b7c] border-b border-slate-100 pb-3">
                      {yearGroup?.year || `Year ${yearIdx + 1}`}
                    </h3>
                    {(yearGroup?.events || []).map((event: any, eventIdx: number) => (
                      <div key={`${event?.title || 'event'}-${eventIdx}`}>
                        <h4 className="text-lg font-semibold text-[#1a4b7c] mb-2">{event?.title || '-'}</h4>
                        {event?.desc && <p className="text-justify">{event.desc}</p>}
                        {(event?.speakers || event?.participants || event?.companies) && (
                          <ul className="mt-3 list-disc pl-5 space-y-1 text-sm">
                            {event?.speakers && <li><span className="font-semibold">Speakers:</span> {event.speakers}</li>}
                            {event?.participants && <li><span className="font-semibold">Participants:</span> {event.participants}</li>}
                            {event?.companies && <li><span className="font-semibold">Companies:</span> {event.companies}</li>}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
                {!loading && ecellEvents.length === 0 && <div className="text-slate-500">No events available.</div>}
              </div>
            </section>
          )}

          {activeId === 'coordinator' && (
            <section className="reveal bg-white p-8 lg:p-12 border border-[#E5E7EB] shadow-[4px_4px_0_#E5E7EB]">
              <div className="space-y-10 text-[#5b6574] leading-relaxed text-[15px]">
                <div>
                  <h3 className="text-2xl font-bold text-[#1a4b7c] border-b border-slate-100 pb-3 mb-6">Faculty In Charge</h3>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-slate-50 p-6 rounded-xl border border-slate-100">
                    <div>
                      <h4 className="text-xl font-bold text-[#1a4b7c] mb-1">{data.inchargeName || 'Coordinator'}</h4>
                      {data.inchargeEmail && (
                        <p className="flex items-center gap-2 mb-1">
                          <i className="ph ph-envelope-simple text-[#1a4b7c]" />
                          <a href={`mailto:${data.inchargeEmail}`} className="hover:text-brand-gold transition-colors">{data.inchargeEmail}</a>
                        </p>
                      )}
                      {data.inchargePhone && (
                        <p className="flex items-center gap-2">
                          <i className="ph ph-phone text-[#1a4b7c]" />
                          <a href={`tel:${data.inchargePhone}`} className="hover:text-brand-gold transition-colors">{data.inchargePhone}</a>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#1a4b7c] mb-6">Faculty Members</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {members.map((member: any, idx: number) => (
                      <div key={`${member?.name || 'member'}-${idx}`} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#1a4b7c]">
                          <i className="ph ph-identification-card text-xl" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#1a4b7c]">{member?.name || '-'}</p>
                          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Member</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeId === 'gallery' && (
            <section className="reveal bg-white p-8 lg:p-12 border border-[#E5E7EB] shadow-[4px_4px_0_#E5E7EB]">
              <div className="space-y-6 text-[#5b6574] leading-relaxed text-[15px]">
                <h3 className="text-2xl font-bold text-[#1a4b7c] border-b border-slate-100 pb-3 mb-6">Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                  {gallery.map((item: any, idx: number) => (
                    <div key={`${item?.image || 'gallery'}-${idx}`} className="aspect-[4/3] bg-slate-100 rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                      {item?.image ? (
                        <img src={resolveApiUrl(item.image) || item.image} alt={item?.title || `E-Cell gallery ${idx + 1}`} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                          <i className="ph ph-image text-4xl mb-3" />
                          <span className="text-sm font-medium">Image {idx + 1}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {activeId !== 'about' && activeId !== 'events' && activeId !== 'coordinator' && activeId !== 'gallery' && (
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

export default ECell;
