import React, { useEffect, useMemo, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { BookOpen, Users, Monitor, Briefcase, Target, Award, Lightbulb, Wrench, Check } from 'lucide-react';
import { getTrainingSection, TrainingData } from '../../services/training';

const iconMap: Record<string, React.ComponentType<any>> = {
  Users,
  Monitor,
  Wrench,
  Briefcase,
  BookOpen,
  Target,
  Award,
  Lightbulb,
};

const sidebarLinks = [
  { id: 'training', label: 'Training', icon: 'ph-chalkboard-teacher' },
  { id: 'events', label: 'Events', icon: 'ph-calendar-star' },
  { id: 'career', label: 'Career Guidance', icon: 'ph-compass' },
  { id: 'internship', label: 'Internship', icon: 'ph-briefcase' },
  { id: 'gallery', label: 'Gallery', icon: 'ph-image' },
];

const StyledPointList: React.FC<{ items: string[]; ordered?: boolean }> = ({ items, ordered = false }) => (
  <div className="border-2 border-[#adb9c6] overflow-hidden bg-white shadow-none">
    <table className="w-full border-separate border-spacing-0">
      <tbody>
        {items.map((item, index) => (
          <tr
            key={`${item}-${index}`}
            className={`group transition-all duration-200 hover:bg-[#fff6dc] hover:shadow-[0_8px_18px_rgba(0,0,0,0.12)] ${
              index % 2 === 0 ? 'bg-white' : 'bg-[#d7e5f2]'
            }`}
          >
            <td className="px-4 md:px-5 py-4 border-b border-[#d4dbe3] transition-all duration-200 group-hover:py-[18px]">
              <div className="flex items-start gap-[14px] transition-transform duration-200 group-hover:translate-x-0.5">
                <span className="mt-0.5 inline-flex w-9 h-9 rounded-lg bg-[#fff7df] border border-[#ffe3a7] items-center justify-center text-[#1a4b7c] flex-shrink-0">
                  {ordered ? <span className="text-sm font-extrabold">{index + 1}</span> : <Check className="w-4 h-4" strokeWidth={2.5} />}
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

const getStringArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.map((item) => String(item ?? '').trim()).filter(Boolean) : [];

const Training: React.FC = () => {
  const [activeId, setActiveId] = useState('training');
  const activeLink = sidebarLinks.find((l) => l.id === activeId);
  const [apiData, setApiData] = useState<TrainingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getTrainingSection()
      .then((data) => {
        if (!mounted) return;
        setApiData(data);
        setLoading(false);
      })
      .catch(() => {
        if (!mounted) return;
        setApiData(null);
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const trainingPrograms = useMemo(() => {
    if (!apiData?.programs || apiData.programs.length === 0) return [];
    return apiData.programs.map((prog) => ({
      ...prog,
      icon: iconMap[prog.icon] || Users,
    }));
  }, [apiData]);

  const stats = useMemo(() => {
    if (!apiData?.stats || apiData.stats.length === 0) return [];
    return apiData.stats.map((stat) => ({
      ...stat,
      icon: iconMap[stat.icon] || Users,
    }));
  }, [apiData]);

  const mainContent = useMemo(() => getStringArray(apiData?.mainContent), [apiData]);
  const trainingHighlights = useMemo(() => getStringArray(apiData?.highlights), [apiData]);
  const careerHighlights = useMemo(() => getStringArray((apiData as any)?.careerHighlights), [apiData]);

  const events = useMemo(() => (Array.isArray(apiData?.events) ? apiData?.events : []), [apiData]);
  const careerGuidance = useMemo(() => (Array.isArray(apiData?.careerGuidance) ? apiData?.careerGuidance : []), [apiData]);
  const internshipSteps = useMemo(() => {
    const rows = Array.isArray(apiData?.internship) ? apiData?.internship : [];
    return rows.map((row: any) => String(row?.step ?? row ?? '').trim()).filter(Boolean);
  }, [apiData]);
  const internshipDescription = String((apiData as any)?.internshipDescription ?? '').trim();
  const internshipImage = String((apiData as any)?.internshipImage ?? '').trim();
  const gallery = useMemo(() => (Array.isArray(apiData?.gallery) ? apiData?.gallery : []), [apiData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
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
        <PageBanner title="Training" breadcrumbs={[{ label: 'Training' }]} />
        <section className="py-10 md:py-12 bg-[#F7F9FC]">
          <div className="container mx-auto px-4 sm:px-6 text-center text-slate-500">Loading content...</div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageBanner title="Training" breadcrumbs={[{ label: 'Training' }]} />

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
          {activeId === 'training' && (
            <section className="reveal bg-white p-8 lg:p-12 border border-[#E5E7EB] shadow-[4px_4px_0_#E5E7EB]">
              <div className="space-y-10 text-[#5b6574] leading-relaxed text-[15px]">
                <div>
                  <h3 className="text-2xl font-bold text-[#1a4b7c] border-b border-slate-100 pb-3 mb-6">Training</h3>
                  {mainContent.length > 0 && <StyledPointList items={mainContent} />}
                </div>

                {trainingPrograms.length > 0 && (
                  <div>
                    <h4 className="text-xl font-bold text-[#1a4b7c] mb-4">Programs</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {trainingPrograms.map((program, index) => {
                        const Icon = program.icon;
                        return (
                          <div key={`${program.title}-${index}`} className="border border-slate-200 rounded-xl p-5 bg-slate-50/40">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="inline-flex w-10 h-10 rounded-lg bg-[#1a4b7c] text-white items-center justify-center">
                                <Icon className="w-5 h-5" />
                              </span>
                              <h5 className="font-bold text-[#1a4b7c]">{program.title}</h5>
                            </div>
                            <p className="text-sm text-slate-700">{program.description}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {stats.length > 0 && (
                  <div>
                      <h4 className="text-xl font-bold text-[#1a4b7c] mb-4">Training Snapshot</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map((stat, index) => {
                          const Icon = stat.icon;
                          return (
                            <div key={`${stat.label}-${index}`} className="border border-slate-200 rounded-xl p-5 text-center">
                              <span className="inline-flex w-10 h-10 rounded-full bg-[#fdb813] text-[#1a4b7c] items-center justify-center mb-3">
                                <Icon className="w-5 h-5" />
                              </span>
                              <div className="text-2xl font-extrabold text-[#1a4b7c]">{stat.value}</div>
                              <div className="text-sm text-slate-600">{stat.label}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {trainingHighlights.length > 0 && (
                    <div>
                      <h4 className="text-xl font-bold text-[#1a4b7c] mb-4">Highlights</h4>
                      <StyledPointList items={trainingHighlights} />
                    </div>
                  )}
                </div>
            </section>
          )}

          {activeId === 'events' && (
            <section className="reveal bg-white p-8 lg:p-12 border border-[#E5E7EB] shadow-[4px_4px_0_#E5E7EB]">
              <div className="space-y-6 text-[#5b6574] leading-relaxed text-[15px]">
                <h3 className="text-2xl font-bold text-[#1a4b7c] border-b border-slate-100 pb-3 mb-6">Events</h3>
                <div className="overflow-x-auto mt-6">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-slate-50 text-[#1a4b7c] border-b border-slate-200">
                        <th className="p-4 font-semibold w-16">SR.</th>
                        <th className="p-4 font-semibold w-1/4">Name of the Event</th>
                        <th className="p-4 font-semibold w-1/2">Company Name / Resource Person</th>
                        <th className="p-4 font-semibold w-32">Date of conduction</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {events.map((event: any, idx: number) => (
                        <tr key={`${event?.name || 'event'}-${idx}`} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 align-top font-medium text-slate-500">{idx + 1}</td>
                          <td className="p-4 align-top font-semibold text-brand-navy">
                            {event?.name || '-'}
                            {event?.image && (
                              <img
                                src={event.image}
                                alt={event?.name || `Training event ${idx + 1}`}
                                className="mt-4 w-32 h-24 object-cover rounded-lg border border-slate-200"
                              />
                            )}
                          </td>
                          <td className="p-4 align-top space-y-3">
                            <p>{event?.company || '-'}</p>
                          </td>
                          <td className="p-4 align-top whitespace-nowrap text-slate-500">{event?.date || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {activeId === 'career' && (
            <section className="reveal bg-white p-8 lg:p-12 border border-[#E5E7EB] shadow-[4px_4px_0_#E5E7EB]">
              <div className="space-y-6 text-[#5b6574] leading-relaxed text-[15px]">
                <h3 className="text-2xl font-bold text-[#1a4b7c] border-b border-slate-100 pb-3 mb-6">Career Guidance</h3>
                {careerHighlights.length > 0 && <StyledPointList items={careerHighlights} />}

                <div className="mt-12 overflow-x-auto">
                  <table className="w-full border-collapse min-w-[800px] border border-slate-200">
                    <thead>
                      <tr className="bg-[#0b1b3d]">
                        <th className="p-4 font-semibold w-16 text-center border border-slate-300 text-[#fdb813]">SR.</th>
                        <th className="p-4 font-semibold w-1/4 text-center border border-slate-300 text-[#fdb813]">Event</th>
                        <th className="p-4 font-semibold text-center border border-slate-300 text-[#fdb813]" colSpan={2}>Resource Person</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {careerGuidance.map((row: any, idx: number) => (
                        <tr key={`${row?.event || 'career'}-${idx}`} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 align-middle text-center font-medium text-slate-700 border border-slate-200">{idx + 1}</td>
                          <td className="p-4 align-middle text-[#1a4b7c] border border-slate-200">{row?.event || '-'}</td>
                          <td className="p-6 align-middle border-y border-slate-200 border-l border-slate-200 border-r-0">
                            <p className="text-sm mb-1 text-slate-600">{row?.resourcePerson || '-'}</p>
                          </td>
                          <td className="p-3 align-middle w-48 border-y border-slate-200 border-r border-slate-200 border-l-0">
                            {row?.image && <img src={row.image} alt={row?.event || `Career guidance ${idx + 1}`} className="w-full h-24 object-cover rounded-lg border border-slate-200" />}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {activeId === 'internship' && (
            <section className="reveal bg-white p-8 lg:p-12 border border-[#E5E7EB] shadow-[4px_4px_0_#E5E7EB]">
              <div className="space-y-6 text-[#5b6574] leading-relaxed text-[15px]">
                <h3 className="text-2xl font-bold text-[#1a4b7c] border-b border-slate-100 pb-3 mb-6">Internship</h3>
                {internshipDescription && <p>{internshipDescription}</p>}
                {internshipSteps.length > 0 && (
                  <div className="mt-8">
                    <h4 className="text-lg font-bold text-[#1a4b7c] mb-4">Procedure:</h4>
                    <StyledPointList ordered items={internshipSteps} />
                  </div>
                )}
                {internshipImage && (
                  <div className="mt-8">
                    <img src={internshipImage} alt="Industries for Internships" className="w-full max-w-4xl mx-auto rounded-xl border border-slate-200 shadow-lg" />
                  </div>
                )}
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
                        <img src={item.image} alt={item?.title || `Gallery ${idx + 1}`} className="w-full h-full object-cover" />
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

          {activeId !== 'training' && activeId !== 'events' && activeId !== 'career' && activeId !== 'internship' && activeId !== 'gallery' && (
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

export default Training;
