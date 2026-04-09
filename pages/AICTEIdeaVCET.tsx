import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import PageBanner from '../components/PageBanner';
import aicteIdeaLabLogoFallback from '../assets/aicte-idea-lab-logo.png';
import pidiliteLogoFallback from '../assets/pidilite-industries-logo.png';

const sidebarLinks = [
  { id: 'about',             label: 'About',             icon: 'ph-info' },
  { id: 'team',              label: 'Team',              icon: 'ph-users-three' },
  { id: 'industry-partners', label: 'Industry Partners', icon: 'ph-handshake' },
  { id: 'tender',            label: 'Tender',            icon: 'ph-file-text' },
];

const withBaseUrl = (relativePath: string): string => {
  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const normalizedPath = relativePath.replace(/^\/+/, '');
  return `${normalizedBase}${normalizedPath}`;
};

const AICTE_IDEA_LOGO_URL = withBaseUrl('uploads/images/aicte-idea-lab-logo.png');
const PIDILITE_LOGO_URL = withBaseUrl('uploads/images/pidilite-industries-logo.png');

const AICTEIdeaVCET: React.FC = () => {
  const [activeId, setActiveId] = useState('about');
  const [ideaLabLogoSrc, setIdeaLabLogoSrc] = useState(AICTE_IDEA_LOGO_URL);
  const [pidiliteLogoSrc, setPidiliteLogoSrc] = useState(PIDILITE_LOGO_URL);
  const activeLink = sidebarLinks.find(l => l.id === activeId);

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
  }, [activeId]);

  return (
    <PageLayout>
      {/* ── Hero Banner ─────────────────────────────────────────── */}
      <PageBanner 
        title="AICTE Idea Lab" 
        breadcrumbs={[{ label: 'AICTE Idea Lab' }]} 
      />

      {/* ── Page Body ────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 sm:px-6 py-10 md:py-12 max-w-7xl flex flex-col lg:flex-row gap-8 lg:gap-10">

        {/* ── Sticky Sidebar ───────────────────────────────────── */}
        <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0">
          <div className="lg:sticky lg:top-24 bg-white rounded-xl shadow-md overflow-hidden border border-slate-200 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
            <nav className="flex flex-col py-2">
              {sidebarLinks.map((link) => {
                const isActive = activeId === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => setActiveId(link.id)}
                    className={`px-4 py-3 text-sm text-left transition-all flex items-center justify-between gap-3 group border-l-[3px] ${
                      isActive
                        ? 'bg-brand-navy text-brand-gold font-semibold border-brand-gold'
                        : 'text-brand-navy font-medium hover:bg-brand-navylight border-transparent hover:border-brand-gold'
                    }`}
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <i className={`ph ${link.icon} text-lg ${isActive ? '' : 'opacity-70'}`} />
                      <span className="truncate">{link.label}</span>
                    </span>
                    {isActive && (
                      <i className="ph ph-arrow-right text-xs transform group-hover:translate-x-1 transition-transform" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* ── Main Content ─────────────────────────────────────── */}
        <main className="w-full flex-1 space-y-14 md:space-y-16 min-w-0">

          {activeId === 'about' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 min-h-[300px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">AICTE Idea VCET</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">About<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
              <div className="mb-6 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-3 sm:p-4 shadow-sm">
                <div className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
                  <img
                    src={ideaLabLogoSrc}
                    alt="AICTE and AICTE IDEA Lab logos"
                    className="mx-auto h-auto w-full max-w-sm object-contain"
                    loading="lazy"
                    onError={() => {
                      if (ideaLabLogoSrc !== aicteIdeaLabLogoFallback) {
                        setIdeaLabLogoSrc(aicteIdeaLabLogoFallback);
                      }
                    }}
                  />
                </div>
              </div>
              <p className="text-slate-600 leading-8">
                About AICTE IDEA Lab:

Vidyavardhini’s College of Engineering & Technology (VCET) is proud to be selected for establishing the AICTE IDEA (Idea Development, Evaluation & Application) Lab, under the prestigious initiative of the All India Council for Technical Education (AICTE), Ministry of Education, Government of India.

The IDEA Lab aims to encourage students to apply the fundamentals of Science, Technology, Engineering, and Mathematics (STEM) to real-world challenges, thereby enhancing hands-on experience, learning-by-doing, and product visualization. This facility aligns with the National Education Policy (NEP) 2020 by promoting interdisciplinary education, creativity, and innovation. The IDEA Lab aims to nurture engineering graduates who are not only imaginative and creative, but also well-equipped with essential 21st-century skills such as critical thinking, problem-solving, design thinking, collaboration, communication, and lifelong learning.

Vision:

To establish a hub of innovative, multidisciplinary learning and technology transfer that addresses socio-economic challenges through a self-sustainable environment, thereby complementing the institute’s vision of becoming a valuable resource for industry and society.

Mission:

To produce skilled manpower through best practices in problem-solving, design thinking, and critical thinking, enabled via workshops, internships, and hands-on training.
To foster prototype-centric and experiential learning aligned with the National Education Policy (NEP) 2020, balancing the innovation ecosystem while upholding ethical and societal values.
To provide consultancy services to external stakeholders and generate revenue for self-sustainability, supporting the institute’s goal of catering to personal, professional, and societal needs.
Objectives:

Provide all necessary facilities under one roof to transform ideas into working prototypes.
Build strong networks between institutes to promote cooperative and project-based learning.
Organize workshops, training sessions, hackathons, and internships to strengthen 21st-century skills — critical thinking, problem-solving, design thinking, collaboration, and communication.
              </p>
            </section>
          )}

          {activeId === 'team' && (() => {
            const team = [
              { name: 'Dr. Rakesh Himte', designation: 'Chief Mentor' },
              { name: 'Dr. Vikas Gupta', designation: 'Faculty Coordinator' },
              { name: 'Mr. Prafulla Patil', designation: 'Faculty Co-coordinator' },
              { name: 'Dr. Uday Asolekar', designation: 'Faculty Member' },
              { name: 'Dr. Amruta Ruperee', designation: 'Faculty Member' },
              { name: 'Dr. Sunayana Jadhav', designation: 'Faculty Member' },
              { name: 'Mr. Deepak Choudhari', designation: 'Faculty Member' },
              { name: 'Dr. Yogesh Pingle', designation: 'Faculty Member' },
              { name: 'Ms. Shaista Khanam', designation: 'Faculty Member' },
              { name: 'Ms. Trupti Shah', designation: 'Faculty Member' },
              { name: 'Mr. Tushar Raut', designation: 'Faculty Member' },
              { name: 'Mr. Kamlesh Bachkar', designation: 'Faculty Member' },
              { name: 'Ms. Sejal D\'mello', designation: 'Faculty Member' },
              { name: 'Mr. Prakash Panda', designation: 'Faculty Member' },
              { name: 'Ms. Brinal Colaco', designation: 'Faculty Member' },
              { name: 'Mr. Ichhanshu Jaiswal', designation: 'Faculty Member' },
              { name: 'Dr. Yogita Shelar', designation: 'Faculty Member' },
              { name: 'Mr. Vipul Raut', designation: 'Lab Technician' },
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 space-y-8">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">AICTE Idea VCET</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy relative inline-block">Team<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
                
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-brand-navy text-white text-left">
                          <th className="px-6 py-4 font-bold uppercase tracking-widest text-[11px]">Name</th>
                          <th className="px-6 py-4 font-bold uppercase tracking-widest text-[11px]">Designation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {team.map((m, idx) => (
                          <tr 
                            key={m.name} 
                            className={`border-t border-slate-100 hover:bg-brand-navylight/40 transition-colors duration-150 ${idx % 2 === 1 ? 'bg-slate-50/60' : 'bg-white'}`}
                          >
                            <td className="px-6 py-4 font-semibold text-brand-navy">{m.name}</td>
                            <td className="px-6 py-4 text-slate-600">{m.designation}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            );
          })()}

          {activeId === 'industry-partners' && (() => {
            const partners = [
              { name: 'Pidilite Industries', amount: '30 Lakhs' }
            ];
            
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 space-y-8">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">AICTE Idea VCET</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy relative inline-block">Industry Partners<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>

                <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-3 sm:p-4 shadow-sm">
                  <div className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
                    <img
                      src={pidiliteLogoSrc}
                      alt="Pidilite Industries logo"
                      className="mx-auto h-auto w-full max-w-xs object-contain"
                      loading="lazy"
                      onError={() => {
                        if (pidiliteLogoSrc !== pidiliteLogoFallback) {
                          setPidiliteLogoSrc(pidiliteLogoFallback);
                        }
                      }}
                    />
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-brand-navy text-white text-left">
                          <th className="px-6 py-4 font-bold uppercase tracking-widest text-[11px]">Partner Name</th>
                          <th className="px-6 py-4 font-bold uppercase tracking-widest text-[11px]">Contribution Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {partners.map((p, idx) => (
                          <tr 
                            key={p.name} 
                            className={`border-t border-slate-100 hover:bg-brand-navylight/40 transition-colors duration-150 ${idx % 2 === 1 ? 'bg-slate-50/60' : 'bg-white'}`}
                          >
                            <td className="px-6 py-4 font-semibold text-brand-navy">{p.name}</td>
                            <td className="px-6 py-4 text-slate-600">{p.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            );
          })()}

          {activeId === 'tender' && (() => {
            const tenderLinks = [
              { label: 'Idea Lab Tender Notice 1', url: '/pdfs/homepage/Aicte-Idea-VCET/Tender/Tender-Notice.pdf' },
              { label: 'Idea Lab Tender Notice 2', url: '/pdfs/homepage/Aicte-Idea-VCET/Tender/Idea-Lab-Tender.pdf' }
            ];

            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 min-h-[300px]">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">AICTE Idea VCET</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Tender<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
                
                <div className="space-y-3 mt-6">
                  {tenderLinks.map((item) => (
                    <a 
                      key={item.label} 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gold hover:bg-brand-navylight transition-colors"
                    >
                      <span>{item.label}</span>
                      <i className="ph ph-arrow-up-right text-brand-gold" />
                    </a>
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

export default AICTEIdeaVCET;
