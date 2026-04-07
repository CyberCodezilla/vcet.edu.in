import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import { resolveUploadedAssetUrl } from '../../utils/uploadedAssets';
import DepartmentHodImage from '../../components/DepartmentHodImage';
import DepartmentFacultySection from '../../components/DepartmentFacultySection';
import NewsletterSection from '../../components/NewsletterSection';
import { departmentApi } from '../../admin/api/departments';
import { Department } from '../../admin/types';

const sidebarLinks = [
  { id: 'about', label: 'About', icon: 'ph-info' },
  { id: 'vision', label: 'Vision and Mission', icon: 'ph-target' },
  { id: 'dab', label: 'Departmental Advisory Board', icon: 'ph-users-three' },
  { id: 'mou', label: 'MoU', icon: 'ph-handshake' },
  { id: 'patent', label: 'Patent', icon: 'ph-certificate' },
  { id: 'peo', label: 'POs, PEOs, PSOs', icon: 'ph-chart-bar' },
  { id: 'faculty', label: 'Faculty', icon: 'ph-chalkboard-teacher' },
  { id: 'paqic', label: 'PAQIC', icon: 'ph-clipboard-text' },
  { id: 'infrastructure', label: 'Infrastructure', icon: 'ph-buildings' },
  { id: 'teaching-learning', label: 'Innovations in Teaching Learning', icon: 'ph-lightbulb' },
  { id: 'time-table', label: 'Time Table', icon: 'ph-calendar' },
  { id: 'toppers', label: 'Toppers', icon: 'ph-medal' },
  { id: 'syllabus', label: 'Syllabus', icon: 'ph-book-open' },
  { id: 'newsletter', label: 'Newsletter', icon: 'ph-newspaper' },
  { id: 'faculty-achievements', label: 'Faculty Achievements', icon: 'ph-trophy' },
  { id: 'student-achievements', label: 'Students Achievements', icon: 'ph-medal' },
];

const DynamicDepartment: React.FC<{ slugProp?: string }> = ({ slugProp }) => {
  const params = useParams<{ slug: string }>();
  const slug = slugProp || params.slug;
  const [activeId, setActiveId] = useState('about');
  const activeLink = sidebarLinks.find(l => l.id === activeId);

  const [department, setDepartment] = useState<Department | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    departmentApi.getBySlug(slug)
      .then((res) => {
        if (res.data) setDepartment(res.data);
        else setError("Department not found");
      })
      .catch((e) => setError(e?.message || "Failed to load department"))
      .finally(() => setLoading(false));
  }, [slug]);

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
    return () => { clearTimeout(t); observer.disconnect(); };
  }, [activeId, loading]);

  if (loading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
        </div>
      </PageLayout>
    );
  }

  if (error || !department) {
    return (
      <PageLayout>
        <div className="flex flex-col justify-center items-center h-[60vh] text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Department Not Found</h2>
          <p className="text-slate-500 mb-6">The department you are looking for does not exist or is currently unavailable.</p>
          <Link to="/" className="px-6 py-3 bg-brand-navy text-white rounded-xl font-medium hover:bg-opacity-90">Return Home</Link>
        </div>
      </PageLayout>
    );
  }

  const content = department.content || {};
  const name = department.name;
  const hodImageUrl = resolveUploadedAssetUrl(content.hodImage as string | null);

  const fallbackText = "This section is currently under construction for " + name + ". Content will be updated soon from the backend.";

  return (
    <PageLayout>
      {/* HEADER */}
      <header className="relative bg-gradient-to-r from-brand-navy to-slate-800 pt-24 md:pt-28 pb-12 md:pb-16 overflow-hidden shadow-lg border-b-4 border-brand-gold">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white opacity-5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-64 h-64 rounded-full bg-brand-gold opacity-10 blur-2xl pointer-events-none" />
        <nav className="absolute top-6 left-6 z-20 flex items-center space-x-2 text-sm font-medium text-white/70">
          <Link to="/" className="hover:text-brand-gold transition-colors duration-200 flex items-center"><i className="ph ph-house text-base" /></Link>
          <i className="ph ph-caret-right text-xs" />
          <span className="text-brand-gold font-semibold">{name}</span>
        </nav>
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <h1 className="font-display font-bold text-white leading-tight tracking-tight text-center">
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl">{name}</span>
          </h1>
        </div>
      </header>

      {/* BODY */}
      <div className="container mx-auto px-4 sm:px-6 py-10 md:py-12 max-w-7xl flex flex-col lg:flex-row gap-8 lg:gap-10">
        {/* SIDEBAR */}
        <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0">
          <div className="lg:sticky lg:top-24 bg-white rounded-xl shadow-md overflow-hidden border border-slate-200 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
            <nav className="flex flex-col py-2">
              {sidebarLinks.filter((link) => {
  const fa = department?.content?.facultyAchievements?.length > 0;
  const sa = department?.content?.studentAchievements?.length > 0;
  if (link.id === 'faculty-achievements' && !fa) return false;
  if (link.id === 'student-achievements' && !sa) return false;
  return true;
}).map((link) => {
                const isActive = activeId === link.id;
                return (
                  <button key={link.id} onClick={() => setActiveId(link.id)} className={`px-4 py-3 text-sm text-left transition-all flex items-center justify-between gap-3 group border-l-[3px] ${isActive ? 'bg-brand-navylight/30 border-brand-gold text-brand-navy font-bold' : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-brand-navy'}`}>
                    <span className="flex min-w-0 items-center gap-3">
                      <i className={`ph ${link.icon} text-lg ${isActive ? 'text-brand-gold' : 'text-slate-400 group-hover:text-brand-gold'}`} />
                      <span className="truncate">{link.label}</span>
                    </span>
                    {isActive && <i className="ph ph-arrow-right text-xs transform group-hover:translate-x-1 transition-transform" />}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* CONTENT */}
        <main className="w-full flex-1 space-y-14 md:space-y-16 min-w-0">

          {/* FACULTY SECTION uses existing component hooked into department name */}
          {activeId === 'faculty' && <DepartmentFacultySection departmentName={name} selectedFacultyIds={department?.content?.faculty} />}
          {activeId === 'newsletter' && <NewsletterSection departmentName={name} departmentId={department.id.toString()} />}

          {/* DAB */}
          {activeId === 'dab' && (
            <div className="reveal">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">{name}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy leading-tight mb-8">
                Departmental Advisory Board<span className="text-brand-gold"> (DAB)</span>
              </h2>
              {content?.dabMembers && content.dabMembers.length > 0 ? (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-brand-navy text-white">
                          {['Sr.', 'Name', 'Designation', 'Organisation'].map(h => (
                            <th key={h} className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-widest">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {content.dabMembers.map((m, idx) => (
                          <tr key={idx} className="border-t border-slate-100 hover:bg-brand-navylight/40 transition-colors duration-150">
                            <td className="px-4 py-4 font-bold text-brand-navy/40 text-xs">{String(idx + 1).padStart(2, '0')}</td>
                            <td className="px-4 py-4 font-semibold text-brand-navy whitespace-nowrap">{m.name}</td>
                            <td className="px-4 py-4 text-slate-600">{m.designation}</td>
                            <td className="px-4 py-4 text-slate-600">{m.organization}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <p className="text-slate-500 italic">No advisory board members added yet.</p>
              )}
            </div>
          )}

          {/* TOPPERS */}
          {activeId === 'toppers' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">{name}</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Toppers<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
              {content?.toppers && content.toppers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {content.toppers.map((t, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex flex-col items-center text-center hover:bg-slate-100/80 transition-colors">
                      <div className="w-16 h-16 bg-brand-navy/5 text-brand-gold rounded-full flex items-center justify-center mb-3">
                        <i className="ph-fill ph-medal text-3xl" />
                      </div>
                      <h4 className="font-bold text-brand-navy text-lg mb-1">{t.name}</h4>
                      <p className="text-slate-500 text-sm font-medium mb-3">{t.year}</p>
                      <div className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-sm font-bold border border-emerald-100">
                        CGPA: {t.cgpa}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 italic">No toppers listed yet.</p>
              )}
            </section>
          )}

          {/* SYLLABUS */}
          {activeId === 'syllabus' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">{name}</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Syllabus<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
              {content?.syllabus && content.syllabus.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {content.syllabus.map((s, idx) => (
                    <a key={idx} href={resolveUploadedAssetUrl(s.pdf as string) || '#'} target="_blank" rel="noreferrer" className="group flex items-center justify-between p-4 rounded-2xl border border-slate-200 hover:border-brand-gold hover:shadow-md transition-all bg-slate-50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-colors">
                          <i className="ph-fill ph-file-pdf text-xl" />
                        </div>
                        <span className="font-semibold text-slate-700 group-hover:text-brand-navy transition-colors line-clamp-2">{s.title}</span>
                      </div>
                      <i className="ph ph-download-simple text-slate-400 group-hover:text-brand-gold transition-colors" />
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 italic">No syllabus documents available.</p>
              )}
            </section>
          )}
          
          {/* MOUS & COLLABORATIONS */}
          {activeId === 'mou' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">{name}</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">MoUs & Collaborations<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
              {content?.mous && content.mous.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {content.mous.map((m, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:shadow-md transition-shadow relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 rounded-bl-[100px] -z-10 group-hover:bg-brand-gold/10 transition-colors" />
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-brand-gold mb-4 border border-slate-100 group-hover:scale-110 transition-transform">
                        <i className="ph-fill ph-handshake text-2xl" />
                      </div>
                      <h4 className="font-bold text-brand-navy text-lg mb-2">{m.organization}</h4>
                      {m.description && <p className="text-slate-600 text-sm leading-relaxed mb-4">{m.description}</p>}
                      {m.pdf && (
                        <a href={resolveUploadedAssetUrl(m.pdf as string) || '#'} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-brand-gold font-bold text-xs uppercase tracking-wider hover:text-brand-navy transition-colors">
                          <i className="ph-fill ph-file-pdf" /> View Document
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 italic">No MoUs or collaborations listed yet.</p>
              )}
            </section>
          )}

          {/* TIMETABLE */}
          {activeId === 'time-table' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">{name}</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Timetable<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
              {content?.timetable && content.timetable.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {content.timetable.map((s, idx) => (
                    <a key={idx} href={resolveUploadedAssetUrl(s.pdf as string) || '#'} target="_blank" rel="noreferrer" className="group flex items-center justify-between p-4 rounded-2xl border border-slate-200 hover:border-brand-gold hover:shadow-md transition-all bg-slate-50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
                          <i className="ph-fill ph-calendar text-xl" />
                        </div>
                        <span className="font-semibold text-slate-700 group-hover:text-brand-navy transition-colors line-clamp-2">{s.class}</span>
                      </div>
                      <i className="ph ph-download-simple text-slate-400 group-hover:text-brand-gold transition-colors" />
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 italic">No timetables uploaded yet.</p>
              )}
            </section>
          )}

          {/* PATENTS */}
          {activeId === 'patent' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">{name}</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Patents<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
              {content?.patents && content.patents.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {content.patents.map((p, idx) => (
                    <div key={idx} className="bg-white border hover:border-brand-gold border-slate-200 rounded-3xl p-6 md:p-8 flex gap-6 hover:shadow-lg transition-all group">
                      <div className="hidden sm:flex flex-shrink-0 w-16 h-16 bg-blue-50/50 rounded-2xl items-center justify-center text-blue-500 border border-blue-100/50">
                        <i className="ph-fill ph-certificate text-3xl" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-brand-navy mb-3 leading-tight group-hover:text-blue-600 transition-colors">{p.title}</h4>
                        {p.description && <p className="text-slate-600 leading-relaxed mb-4">{p.description}</p>}
                        {p.pdf && (
                          <a href={resolveUploadedAssetUrl(p.pdf as string) || '#'} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-700 rounded-xl text-sm font-semibold hover:bg-brand-navy hover:text-white transition-colors border border-slate-200">
                            <i className="ph-bold ph-arrow-square-out" /> Read More
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 italic">No patents have been filed or listed yet.</p>
              )}
            </section>
          )}

          {/* DEPARTMENT ACTIVITIES */}
          {activeId === 'teaching-learning' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">{name}</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Department Activities<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
              {content?.activities && content.activities.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {content.activities.map((a, idx) => (
                    <div key={idx} className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col group">
                      {a.image ? (
                        <div className="h-48 overflow-hidden bg-slate-100">
                          <img src={a.image as string} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      ) : (
                        <div className="h-24 bg-gradient-to-r from-brand-navy to-slate-800 flex items-center justify-center text-white/20">
                          <i className="ph-fill ph-image text-3xl" />
                        </div>
                      )}
                      <div className="p-6 flex-1 flex flex-col">
                        <h4 className="font-bold text-brand-navy text-[17px] leading-snug mb-3">{a.title}</h4>
                        <p className="text-slate-600 text-sm leading-relaxed mb-5 flex-1">{a.description}</p>
                        {a.pdf && (
                          <a href={resolveUploadedAssetUrl(a.pdf as string) || '#'} target="_blank" rel="noreferrer" className="mt-auto inline-flex items-center justify-center w-full gap-2 px-4 py-2.5 bg-slate-50 text-slate-700 rounded-xl text-sm font-semibold hover:bg-brand-gold hover:text-white transition-colors border border-slate-200">
                            <i className="ph-bold ph-download-simple" /> View Details
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 italic">No activities have been recorded yet.</p>
              )}
            </section>
          )}

          {/* ABOUT */}
          {activeId === 'about' && (
            <section className="reveal bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100">
              <div className="space-y-6 text-slate-600 leading-relaxed text-justify">
                <DepartmentHodImage imageSrc={hodImageUrl} />
                <p>{fallbackText}</p>
              </div>
            </section>
          )}

          {/* FALLBACK */}
          {activeId !== 'dab' && activeId !== 'toppers' && activeId !== 'syllabus' && activeId !== 'faculty' && activeId !== 'faculty-achievements' && activeId !== 'student-achievements' && activeId !== 'newsletter' && activeId !== 'mou' && activeId !== 'patent' && activeId !== 'time-table' && activeId !== 'teaching-learning' && (
            <section className="reveal bg-white rounded-3xl p-12 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center min-h-[300px]">
              <div className="w-16 h-16 rounded-2xl bg-brand-navylight flex items-center justify-center mb-4">
                <i className={`ph ${activeLink?.icon} text-3xl text-brand-navy`} />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-2">{activeLink?.label}</h3>
              <p className="text-slate-500">{fallbackText}</p>
            </section>
          )}

        ﻿          {/* ════ FACULTY ACHIEVEMENTS ════════════════════════════════ */}
          {activeId === 'faculty-achievements' && (() => {
            const hasStaticFa = false;
            const dynamicAch = department?.content?.facultyAchievements || [];
            if (!dynamicAch.length && !hasStaticFa) return null;
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Excellence &amp; Recognition</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-brand-navy leading-tight mb-8">Faculty Achievements</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {dynamicAch.map((item, idx) => (
                    <div key={idx} className="group relative bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      {item.image && (
                        <div className="mb-5 overflow-hidden rounded-xl h-48 w-full">
                          <img src={resolveUploadedAssetUrl(item.image)} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                      )}
                      <h4 className="text-xl font-bold text-brand-navy mb-2">{item.title}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">{item.description}</p>
                      {item.pdf && (
                        <a href={resolveUploadedAssetUrl(item.pdf)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-brand-gold hover:text-brand-navy transition-colors">
                          <i className="ph ph-file-pdf text-lg" />
                          View Document
                          <i className="ph ph-arrow-right" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            );
          })()}

          {/* ════ STUDENT ACHIEVEMENTS ════════════════════════════════ */}
          {activeId === 'student-achievements' && (() => {
            const hasStaticSa = false;
            const dynamicAch = department?.content?.studentAchievements || [];
            if (!dynamicAch.length && !hasStaticSa) return null;
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Student Laurels</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-brand-navy leading-tight mb-8">Students Achievements</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {dynamicAch.map((item, idx) => (
                    <div key={idx} className="group relative bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      {item.image && (
                        <div className="mb-5 overflow-hidden rounded-xl h-48 w-full">
                          <img src={resolveUploadedAssetUrl(item.image)} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                      )}
                      <h4 className="text-xl font-bold text-brand-navy mb-2">{item.title}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">{item.description}</p>
                      {item.pdf && (
                        <a href={resolveUploadedAssetUrl(item.pdf)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-brand-gold hover:text-brand-navy transition-colors">
                          <i className="ph ph-file-pdf text-lg" />
                          View Document
                          <i className="ph ph-arrow-right" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            );
          })()}

        </main>
      </div>
    </PageLayout>
  );
};

export default DynamicDepartment;

