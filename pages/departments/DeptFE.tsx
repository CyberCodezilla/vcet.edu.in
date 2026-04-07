import React, { useState, useEffect } from 'react';
import { departmentApi } from '../../admin/api/departments';
import type { Department } from '../../admin/types';
import { resolveUploadedAssetUrl } from '../../utils/uploadedAssets';


import { Link } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import DepartmentFacultySection from '../../components/DepartmentFacultySection';
import DepartmentHodImage from '../../components/DepartmentHodImage';
import { departmentApi } from '../../admin/api/departments';
import type { Department } from '../../admin/types';
import { newsletterApi } from '../../admin/api/newsletterApi';
import DepartmentNewsletterPanel from '../../components/DepartmentNewsletterPanel';

const sidebarLinks = [
  { id: 'about',      label: 'About',                        icon: 'ph-info' },
  { id: 'vision',     label: 'Vision and Mission',           icon: 'ph-target' },
  { id: 'dab',        label: 'Departmental Advisory Board',  icon: 'ph-users-three' },
  { id: 'mou',        label: 'MoU',                          icon: 'ph-handshake' },
  { id: 'patent',     label: 'Patent',                       icon: 'ph-certificate' },
  { id: 'peo',        label: 'POs, PEOs, PSOs',              icon: 'ph-chart-bar' },
  { id: 'faculty',    label: 'Faculty',                      icon: 'ph-chalkboard-teacher' },
  { id: 'infrastructure', label: 'Infrastructure',           icon: 'ph-buildings' },
  { id: 'time-table', label: 'Time Table',                   icon: 'ph-calendar' },
  { id: 'teaching-learning', label: 'Innovations in Teaching Learning', icon: 'ph-lightbulb' },
  { id: 'induction',  label: 'Induction Program',            icon: 'ph-graduation-cap' },
  { id: 'annual-reports', label: 'Annual Reports',           icon: 'ph-file-text' },
  { id: 'toppers',    label: 'Toppers',                      icon: 'ph-medal' },
  { id: 'syllabus',   label: 'Syllabus',                     icon: 'ph-book-open' },
  { id: 'newsletter', label: 'Newsletter',                   icon: 'ph-newspaper' },
  { id: 'faculty-achievements', label: 'Faculty Achievements', icon: 'ph-trophy' },
  { id: 'student-achievements', label: 'Students Achievements', icon: 'ph-medal' },
];

const newsletterPdfs = [
  { label: 'Newsletter 2024-25', href: '/pdfs/Department/FirstYearEngineering/Newsletter/FE-Newsletter-2024-25.pdf' },
  { label: 'Newsletter 2023-24', href: '/pdfs/Department/FirstYearEngineering/Newsletter/FE-Newsletter-2023-24.pdf' },
  { label: 'Newsletter 2022-23', href: '/pdfs/Department/FirstYearEngineering/Newsletter/FE-Newsletter-2022-23.pdf' },
  { label: 'Newsletter 2021-22', href: '/pdfs/Department/FirstYearEngineering/Newsletter/FE-Newsletter-2021-22.pdf' },
];

const magazinePdfs = [
  { label: 'Magazine 2024-25', href: '/pdfs/Department/FirstYearEngineering/Magazine/FE-Magazine-2024-25.pdf' },
  { label: 'Magazine 2023-24', href: '/pdfs/Department/FirstYearEngineering/Magazine/FE-Magazine-2023-24.pdf' },
  { label: 'Magazine 2022-23', href: '/pdfs/Department/FirstYearEngineering/Magazine/FE-Magazine-2022-23.pdf' },
  { label: 'Magazine 2021-22', href: '/pdfs/Department/FirstYearEngineering/Magazine/FE-Magazine-2021-22.pdf' },
];

const DeptFE: React.FC = () => {
  const [activeId, setActiveId] = useState('about');
  const activeLink = sidebarLinks.find(l => l.id === activeId);
  const [department, setDepartment] = useState<Department | null>(null);
  const [dynamicApiItems, setDynamicApiItems] = useState<any[]>([]);

  useEffect(() => {
    departmentApi.getBySlug('first-year-engineering')
      .then((res) => {
        if (res.success) {
          setDepartment(res.data);
          newsletterApi.list(res.data.id).then(n => setDynamicApiItems(n.data)).catch(console.error);
        }
      })
      .catch(() => setDepartment(null));
  }, []);

  const hodImageUrl = resolveUploadedAssetUrl(department?.content?.hodImage as string | null);

  const newsletters = dynamicApiItems
    .filter(item => item.type === 'newsletter' && item.pdf)
    .map(item => ({ label: item.title, href: item.pdf }));
  const magazines = dynamicApiItems
    .filter(item => item.type === 'magazine' && item.pdf)
    .map(item => ({ label: item.title, href: item.pdf }));


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
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    const t = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observer.observe(el));
    }, 50);
    return () => { clearTimeout(t); observer.disconnect(); };
  }, [activeId]);

  return (
    <PageLayout>

      {/* â”€â”€ Hero Banner â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <header className="relative bg-gradient-to-r from-brand-navy to-slate-800 pt-24 md:pt-28 pb-12 md:pb-16 overflow-hidden shadow-lg border-b-4 border-brand-gold">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white opacity-5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-64 h-64 rounded-full bg-brand-gold opacity-10 blur-2xl pointer-events-none" />
        <nav className="absolute top-6 left-6 z-20 flex items-center space-x-2 text-sm font-medium text-white/70">
          <Link to="/" className="hover:text-brand-gold transition-colors duration-200 flex items-center"><i className="ph ph-house text-base" /></Link>
          <i className="ph ph-caret-right text-xs" />
          <span className="text-brand-gold font-semibold">First Year Engineering</span>
        </nav>
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex items-center justify-center gap-4 mb-5">
            <span className="flex-shrink-0 w-10 h-px bg-brand-gold/70" />
            <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold whitespace-nowrap">Foundation Department</span>
            <span className="flex-shrink-0 w-10 h-px bg-brand-gold/70" />
          </div>
          <h1 className="font-display font-bold text-white leading-tight tracking-tight text-center">
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl">First Year Engineering</span>
            <span className="block text-xl md:text-2xl mt-4 text-brand-gold/80 font-normal italic">Gateway to all Engineering Branches Â· 720 Students</span>
          </h1>
        </div>
      </header>

      {/* â”€â”€ Page Body â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="container mx-auto px-4 sm:px-6 py-10 md:py-12 max-w-7xl flex flex-col lg:flex-row gap-8 lg:gap-10">

        {/* Sticky Sidebar */}
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
                  <button key={link.id} onClick={() => setActiveId(link.id)}
                    className={`px-4 py-3 text-sm text-left transition-all flex items-center justify-between gap-3 group border-l-[3px] ${isActive ? 'bg-brand-navy text-brand-gold font-semibold border-brand-gold' : 'text-brand-navy font-medium hover:bg-brand-navylight border-transparent hover:border-brand-gold'}`}
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <i className={`ph ${link.icon} text-lg ${isActive ? '' : 'opacity-70'}`} />
                      <span className="truncate">{link.label}</span>
                    </span>
                    {isActive && <i className="ph ph-arrow-right text-xs transform group-hover:translate-x-1 transition-transform" />}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-full flex-1 space-y-14 md:space-y-16 min-w-0">

          {/* â•â•â•â• ABOUT â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
          {activeId === 'about' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
              <div className="mb-8 flex flex-col items-center text-center">
                <div className="w-full max-w-[340px] rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-12">
                  <i className="ph ph-image text-4xl text-slate-400" />
                  <p className="mt-3 text-sm font-semibold text-slate-500">Coordinator Image Placeholder</p>
                  <p className="mt-1 text-xs text-slate-400">Add image later in this area</p>
                </div>
                <p className="mt-4 text-2xl font-bold text-brand-navy">Dr. Sunayana Jadhav</p>
                <p className="mt-1 text-sm font-semibold text-brand-gold">FE Coordinator</p>
              </div>

              <div className="space-y-6 text-slate-600 leading-8 text-left">
                <p>
                  Established in June 1994 alongside the inception of the college, the department, First Year Engineering offers an array of subjects including Engineering Physics, Engineering Chemistry, Engineering Mathematics, and Business Communication &amp; Ethics, and they collectively formed the foundational pillars.
                </p>
                <p>
                  The Undergraduate Program (UG) offers various specializations including Computer Engineering with an approved intake of 180 students, Computer Science and Engineering (Data Science) with 180 students, Information Technology with 60 students, and Artificial Intelligence and Data Science with 120 students. Additionally, there are programs in Mechanical Engineering, Electronics and Telecommunication Engineering, Civil Engineering, each with an approved intake of 60 students. This diverse array of courses caters to a broad spectrum of interests and career paths within the field of engineering, ensuring students have ample opportunities to pursue their academic and professional aspirations.
                </p>
                <p>
                  Bolstered by dedicated faculty members, the department serves as a cornerstone for all engineering disciplines within the college. Faculty members actively engage in professional development through participation in refresher/orientation courses whenever feasible. Moreover, the department has hosted several seminars on diverse topics, catering to both students and staff.
                </p>
                <p>
                  Recognized for its pivotal role, the department is equipped with state-of-the-art laboratories and continues to spearhead various curricular and extracurricular initiatives. By nurturing a culture of innovation and collaboration, the department cultivates a strong foundation essential for the success of all engineering branches.
                </p>
                <div>
                  <p className="font-bold text-brand-navy">OBJECTIVES</p>
                  <p className="mt-2">
                    The First Year department is dedicated to the holistic development of incoming engineering students, providing comprehensive guidance and support to ensure a smooth transition into college life. Our primary objective is to nurture students&apos; academic potential while instilling them with the confidence needed for a successful career in engineering. Through personalized counseling sessions and a supportive learning environment, we aim to enhance students&apos; cognitive abilities and problem-solving skills, empowering them to excel in their academic pursuits and professional endeavors. Our department is committed to fostering personal growth and professional development, ensuring that students emerge as well-rounded individuals equipped to tackle the challenges of the engineering profession.
                  </p>
                </div>
                <div>
                  <p className="font-bold text-brand-navy">INDUCTION PROGRAM</p>
                  <p className="mt-2">
                    VCET has been conducting the induction program for newcomers, aiming to assist new students in adjusting and feeling comfortable in their new academic environment. This initiative also serves to foster relationships among students and faculty, as well as to introduce newcomers to a broader sense of purpose and self-discovery. The event is meticulously organized by the First Year department in collaboration with senior students. It is designed to familiarize new entrants with the institution&apos;s environment and facilitate connections with its members. The student induction program engages with new students during their first week of college, ensuring that regular classes commence only after its completion. Participants are briefed on institutional policies, processes, practices, culture, and values, and are assigned mentor groups consisting of senior students and faculty members. Various activities are incorporated into the Induction Program, including sessions on universal human values, familiarization with the college and department, lectures and workshops by eminent individuals, creative practices, literary activities, language proficiency modules, feedback sessions, language and mathematics proficiency tests, introductions to professional chapters and clubs, and interactions with alumni.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* â•â•â•â• VISION & MISSION â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
          {activeId === 'vision' && (
            <section className="reveal bg-white rounded-3xl p-12 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center min-h-[300px]">
              <div className="w-16 h-16 rounded-2xl bg-brand-navylight flex items-center justify-center mb-4">
                <i className="ph ph-target text-3xl text-brand-navy" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-2">Vision and Mission</h3>
              <p className="text-slate-500">The content will be published soon.</p>
            </section>
          )}

          {/* â•â•â•â• DAB â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
          {activeId === 'dab' && (() => {
            return (
              <section className="reveal bg-white rounded-3xl p-12 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center min-h-[300px]">
                <div className="w-16 h-16 rounded-2xl bg-brand-navylight flex items-center justify-center mb-4">
                  <i className="ph ph-users-three text-3xl text-brand-navy" />
                </div>
                <h3 className="text-xl font-bold text-brand-navy mb-2">Departmental Advisory Board</h3>
                <p className="text-slate-500">The content will be published soon.</p>
              </section>
            );
          })()}

          {/* â•â•â•â• POs, PEOs & PSOs â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
          {activeId === 'peo' && (() => {
            return (
              <section className="reveal bg-white rounded-3xl p-12 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center min-h-[300px]">
                <div className="w-16 h-16 rounded-2xl bg-brand-navylight flex items-center justify-center mb-4">
                  <i className="ph ph-chart-bar text-3xl text-brand-navy" />
                </div>
                <h3 className="text-xl font-bold text-brand-navy mb-2">POs, PEOs, PSOs</h3>
                <p className="text-slate-500">The content will be published soon.</p>
              </section>
            );
          })()}

          {/* â•â•â•â• MoU â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
          {activeId === 'mou' && (
            <section className="reveal bg-white rounded-3xl p-12 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center min-h-[300px]">
              <div className="w-16 h-16 rounded-2xl bg-brand-navylight flex items-center justify-center mb-4">
                <i className="ph ph-handshake text-3xl text-brand-navy" />
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">MoUs &amp; Collaborations<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
                <div className="space-y-4">
                  {department?.content?.mous?.length ? department.content.mous.map((m, idx) => (
                    <div key={idx} className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-brand-gold hover:bg-brand-navylight transition-colors shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-base font-bold text-brand-navy">{m.organization || `MoU ${idx + 1}`}</h4>
                        {m.description && <p className="text-sm text-slate-600 mt-1.5">{m.description}</p>}
                      </div>
                      {m.pdf && (
                        <a href={resolveUploadedAssetUrl(m.pdf as string) || '#'} target="_blank" rel="noopener noreferrer" className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-brand-gold/10 text-brand-gold hover:bg-brand-gold hover:text-white transition-colors" title="View Document">
                          <i className="ph ph-arrow-up-right text-lg" />
                        </a>
                      )}
                    </div>
                  )) : (
                    <div className="text-sm text-slate-500 italic px-4 py-3">No MoUs or Collaborations available at this time.</div>
                  )}
                </div>
              
              </section>
          )}

          {/* â•â•â•â• PATENT â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
          {activeId === 'patent' && (
            <section className="reveal bg-white rounded-3xl p-12 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center min-h-[300px]">
              <div className="w-16 h-16 rounded-2xl bg-brand-navylight flex items-center justify-center mb-4">
                <i className="ph ph-certificate text-3xl text-brand-gold" />
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-6">Patents &amp; Copyrights</h3>
              <div className="space-y-4 w-full">
                {department?.content?.patents?.length ? department.content.patents.map((p, idx) => (
                  <div key={idx} className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-brand-gold hover:bg-brand-navylight transition-colors shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
                    <div>
                      <h4 className="text-base font-bold text-brand-navy">{p.title || `Patent ${idx + 1}`}</h4>
                      {p.description && <p className="text-sm text-slate-600 mt-1.5">{p.description}</p>}
                    </div>
                    {p.pdf && (
                      <a href={resolveUploadedAssetUrl(p.pdf as string) || '#'} target="_blank" rel="noopener noreferrer" className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-brand-gold/10 text-brand-gold hover:bg-brand-gold hover:text-white transition-colors" title="View Document">
                        <i className="ph ph-arrow-up-right text-lg" />
                      </a>
                    )}
                  </div>
                )) : (
                  <div className="text-sm text-slate-500 italic px-4 py-3">No Patents or Copyrights available at this time.</div>
                )}
              </div>
            </section>
          )}

          {/* â•â•â•â• FACULTY â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
          {activeId === 'faculty' && <DepartmentFacultySection departmentName="First Year Engineering" />}

          {/* â•â•â•â• INFRASTRUCTURE â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
          {activeId === 'infrastructure' && (() => {
            const labs = [
              {
                title: 'Chemistry Lab',
                inCharge: 'Ms. c.v.Sonarkar',
                majorEquipments: 'Contech Electronic Balance, Portable DM Plant, Hot Air Oven, Redwood Viscometer, Pensky Martinâ€™s Apparatus, Vicatâ€™s Apparatus.',
              },
              {
                title: 'Physics Lab',
                inCharge: 'Dr. Suraj Vishwakarma',
                majorEquipments: 'Cathode Ray Oscilloscope, Laser Apparatus, RF Oscillator Spectrometer Travelling Microscope, Hall Effect Apparatus, Hysteresis Apparatus',
              },
              {
                title: 'Basic Electrical & Electronics',
                inCharge: 'Ms.Shraddha Gosavi',
              },
              {
                title: 'Basic Workshop',
                inCharge: 'Mr. Dipak Chaudhari',
                hardware: 'Carpentry. Fitting. Plumbing. Welding. Smithy',
              },
              {
                title: 'Machine Shop',
                inCharge: 'Mr. Dipak Chaudhari',
                hardware: 'Carpentry Lathe Machine. Universal Milling Machine Shaping Machine Radial drilling Machine.',
              },
              {
                title: 'Computer Lab',
                inCharge: 'Ms. Shraddha Gosavi',
                software: 'OS â€“ Windows 11. SW â€“ TC, JAVA, MS Office. Browser â€“ IE 8, Google Chrome, Mozilla.',
                hardware: 'PC â€“ HP Corei3 â€“ No.25. Printer â€“ HP laser Jet.',
              },
              {
                title: 'Language Lab',
                inCharge: 'Dr. Pradip Gulbhile',
                software: 'Orell Talk Smart Version , 1 Teacher,50 student Consoles ,OS â€“ Windows 10. SW â€“ TC, JAVA, MS Office. Browser â€“ IE 8, Google Chrome, Mozilla.',
                hardware: 'PC â€“ HP Core i3 â€“ No.25. Printer â€“ HP Laser Jet.',
              },
              {
                title: 'Engineering Mechanics',
                inCharge: 'Mr. Vikrant Kothari',
                hardware: 'Bell Crank Lever, Force Table & Simple Beam.',
              },
            ];

            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 space-y-6">
                <div className="flex items-center gap-3"><span className="w-8 h-px bg-brand-gold" /><span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">First Year Engineering</span></div>
                <h3 className="text-2xl font-bold text-brand-navy relative inline-block">Infrastructure<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {labs.map((lab, idx) => (
                    <article key={lab.title} className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                      <div className="w-full h-52 bg-slate-100 border-b border-slate-200 flex flex-col items-center justify-center text-slate-400">
                        <i className="ph ph-image text-4xl mb-2" />
                        <p className="text-sm font-semibold">Image Holder {idx + 1}</p>
                      </div>
                      <div className="p-5 space-y-3">
                        <h4 className="text-lg font-bold text-brand-navy">{lab.title}</h4>
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-widest text-brand-gold">Lab In-Charge</p>
                          <p className="text-slate-700 mt-1">{lab.inCharge}</p>
                        </div>

                        {lab.majorEquipments && (
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-widest text-brand-gold">Major Equipments</p>
                            <p className="text-slate-600 leading-7 mt-1">{lab.majorEquipments}</p>
                          </div>
                        )}

                        {lab.software && (
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-widest text-brand-gold">Software Installed</p>
                            <p className="text-slate-600 leading-7 mt-1">{lab.software}</p>
                          </div>
                        )}

                        {lab.hardware && (
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-widest text-brand-gold">Hardware</p>
                            <p className="text-slate-600 leading-7 mt-1">{lab.hardware}</p>
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })()}

          {/* â•â•â•â• SYLLABUS â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
          {activeId === 'syllabus' && (() => {
            const links = [
              { label: 'All Branches Scheme Syllabus (Sem I & Sem II)', url: '/pdfs/Department/FirstYearEngineering/Syllabus/First-Year-Engineering-All-Branches-Scheme-Syllabus-Sem-I-and-Sem-II-Final-1-July-2024-25.pdf' },
              { label: 'Course Outcomes for First Year Engineering', url: '/pdfs/Department/FirstYearEngineering/Syllabus/Course-Outcomes-for-First-Year-Engineering.pdf' },
              { label: 'NEP 2020 Theory CO (All Subjects)', url: '/pdfs/Department/FirstYearEngineering/Syllabus/FE-COsNEP-2020-All-Subjects-Theory.pdf' },
              { label: 'Lab COs', url: '/pdfs/Department/FirstYearEngineering/Syllabus/LAB-COs.pdf' },
              { label: 'NEP 2020 Lab CO (All Subjects)', url: '/pdfs/Department/FirstYearEngineering/Syllabus/FE-COsNEP-2020-All-Subjects-LAB.pdf' },
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4"><span className="w-8 h-px bg-brand-gold" /><span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">First Year Engineering</span></div>
                <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Syllabus<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
                <div className="space-y-3">
                  {links.map((item) => (
                    <a key={item.label} href={item.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gold hover:bg-brand-navylight transition-colors">
                      <span>{item.label}</span><i className="ph ph-arrow-up-right text-brand-gold" />
                    </a>
                  ))}
                </div>
              </section>
            );
          })()}

          {/* â•â•â•â• TIME TABLE â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
          {activeId === 'time-table' && (() => {
            const sem2Links = [
              { label: 'Sem II - FE A (Comp 1)', url: '/pdfs/Department/FirstYearEngineering/TimeTable/SEM2/DivAComps1_Sem2_TT.pdf' },
              { label: 'Sem II - FE B (Comp 2)', url: '/pdfs/Department/FirstYearEngineering/TimeTable/SEM2/DivBComps2_Sem2_TT-.pdf' },
              { label: 'Sem II - FE C (Comp 3)', url: '/pdfs/Department/FirstYearEngineering/TimeTable/SEM2/DivCComps3_Sem2_TT.pdf' },
              { label: 'Sem II - FE D (Civil)', url: '/pdfs/Department/FirstYearEngineering/TimeTable/SEM2/DivDCivil_Sem2_TT.pdf' },
              { label: 'Sem II - FE E (CSEDS 1)', url: '/pdfs/Department/FirstYearEngineering/TimeTable/SEM2/DivECSEDS1_Sem2_TT.pdf' },
              { label: 'Sem II - FE F (CSEDS 2)', url: '/pdfs/Department/FirstYearEngineering/TimeTable/SEM2/DivFCSEDS2_Sem2_TT.pdf' },
              { label: 'Sem II - FE G (INFT)', url: '/pdfs/Department/FirstYearEngineering/TimeTable/SEM2/Div-G-INFT-Engg.-_-SemII-_-2024-25.pdf' },
              { label: 'Sem II - FE H (AI & DS)', url: '/pdfs/Department/FirstYearEngineering/TimeTable/SEM2/DivHAIDS_Sem2_TT.pdf' },
              { label: 'Sem II - FE I (EXTC)', url: '/pdfs/Department/FirstYearEngineering/TimeTable/SEM2/Div-I-EXTC-Engg._-semII_-2024-25.pdf' },
              { label: 'Sem II - FE J (Mech)', url: '/pdfs/Department/FirstYearEngineering/TimeTable/SEM2/V.2_SEM-II_DIV.-TT_2024-25.xlsx-DIV-J_MECH.pdf' },
              { label: 'Sem II - FE K (Civil & VLSI)', url: '/pdfs/Department/FirstYearEngineering/TimeTable/SEM2/V.2_SEM-II_DIV.-TT_2024-25.xlsx-DIV-K_-VLSI.pdf' },
              { label: 'Sem II - FE L (CSEDS 3)', url: '/pdfs/Department/FirstYearEngineering/TimeTable/SEM2/V.2_SEM-II_DIV.-TT_2024-25.xlsx-DIV-L_-CSEDS-3.pdf' },
            ];
            const sem1Links = [
              { label: 'Sem I - FE A (Comp 1)', url: '/pdfs/Department/FirstYearEngineering/TimeTable/SEM1/Div-A-Comp1-_-TT.pdf' },
              { label: 'Sem I - FE B (Comp 2)', url: '/pdfs/Department/FirstYearEngineering/TimeTable/SEM1/Div-B-Comp2-_-TT.pdf' },
              { label: 'Sem I - FE C (Comp 3)', url: '/pdfs/Department/FirstYearEngineering/TimeTable/SEM1/Div-C-Comp3-_-TT.pdf' },
              { label: 'Sem I - FE D (Civil)', url: '/pdfs/Department/FirstYearEngineering/TimeTable/SEM1/Div-D-Civil-engg.-_-TT.pdf' },
              { label: 'Sem I - FE E (CSEDS 1)', url: '/pdfs/Department/FirstYearEngineering/TimeTable/SEM1/Div-E-CSE-DS-1-_-TT.pdf' },
              { label: 'Sem I - FE F (CSEDS 2)', url: '/pdfs/Department/FirstYearEngineering/TimeTable/SEM1/Div-F-CSE-DS-2-_-TT.pdf' },
              { label: 'Sem I - FE G (INFT)', url: '/pdfs/Department/FirstYearEngineering/TimeTable/SEM1/Div-G-INFT-engg-_-TT.pdf' },
              { label: 'Sem I - FE H (AI-DS)', url: '/pdfs/Department/FirstYearEngineering/TimeTable/SEM1/Div-H-AI-DS-engg.-_-TT.pdf' },
              { label: 'Sem I - FE I (EXTC)', url: '/pdfs/Department/FirstYearEngineering/TimeTable/SEM1/Div-I-EXTC-engg.-_-TT.pdf' },
              { label: 'Sem I - FE J (Mech)', url: '/pdfs/Department/FirstYearEngineering/TimeTable/SEM1/Div-J-Mech-engg.-_-TT.pdf' },
              { label: 'Sem I - FE K (VLSI)', url: '/pdfs/Department/FirstYearEngineering/TimeTable/SEM1/Div-K-VLSI-engg.-_-TT.pdf' },
              { label: 'Sem I - FE L (CSE-DS 3)', url: '/pdfs/Department/FirstYearEngineering/TimeTable/SEM1/L-Div-_-CSE-DS-3_-TT.pdf' },
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 space-y-8">
                <div className="flex items-center gap-3"><span className="w-8 h-px bg-brand-gold" /><span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">First Year Engineering</span></div>
                <h3 className="text-2xl font-bold text-brand-navy relative inline-block">Time Table<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
                <div>
                  <h4 className="text-lg font-bold text-brand-navy mb-3">Time Table Sem II</h4>
                  <div className="space-y-3">
                    {sem2Links.map((item) => (
                      <a key={item.label} href={item.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gold hover:bg-brand-navylight transition-colors">
                        <span>{item.label}</span><i className="ph ph-arrow-up-right text-brand-gold" />
                      </a>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-brand-navy mb-3">Time Table Sem I</h4>
                  <div className="space-y-3">
                    {sem1Links.map((item) => (
                      <a key={item.label} href={item.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gold hover:bg-brand-navylight transition-colors">
                        <span>{item.label}</span><i className="ph ph-arrow-up-right text-brand-gold" />
                      </a>
                    ))}
                  </div>
                </div>
              </section>
            );
          })()}

          {/* â•â•â•â• INNOVATIONS IN TEACHING LEARNING â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
          {activeId === 'teaching-learning' && (() => {
            const links = [
              { label: 'Innovation in Teaching Report 2024-25', url: '/pdfs/Department/FirstYearEngineering/InnovationsinTeachingLearning/Innovation-in-Teaching-report-2024-25.pdf' },
              { label: 'Innovation in Teaching Report 2023-24', url: '/pdfs/Department/FirstYearEngineering/InnovationsinTeachingLearning/Innovation-in-Teaching-report-2023-24.pdf' },
              { label: 'Innovation in Teaching Report 2022-23', url: '/pdfs/Department/FirstYearEngineering/InnovationsinTeachingLearning/Innovation-in-Teaching-report-2022-23-Copy.pdf' },
              { label: 'Innovation in Teaching Report 2021-22', url: '/pdfs/Department/FirstYearEngineering/InnovationsinTeachingLearning/Innovation-in-Teaching-report-2021-22-1.pdf' },
              { label: 'Innovation in Teaching Report 2020-21', url: '/pdfs/Department/FirstYearEngineering/InnovationsinTeachingLearning/Innovation-in-Teaching-report-2020-21-2.pdf' },
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4"><span className="w-8 h-px bg-brand-gold" /><span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">First Year Engineering</span></div>
                <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Innovations in Teaching Learning<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
                <div className="space-y-3">
                  {links.map((item) => (
                    <a key={item.label} href={item.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gold hover:bg-brand-navylight transition-colors">
                      <span>{item.label}</span><i className="ph ph-arrow-up-right text-brand-gold" />
                    </a>
                  ))}
                </div>
              </section>
            );
          })()}

          {/* â•â•â•â• INDUCTION PROGRAM â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
          {activeId === 'induction' && (() => {
            const links = [
              { label: 'SIP Report 2024-25', url: 'https://vcet.edu.in/wp-content/uploads/2025/05/SIP-Report_24-25.pdf' },
              { label: 'SIP Report 2023-24', url: 'https://vcet.edu.in/wp-content/uploads/2024/03/SIP-Report_23-24.pdf' },
              { label: 'SIP Report 2022-23', url: 'https://vcet.edu.in/wp-content/uploads/2024/03/SIP-Report_22-23.pdf' },
              { label: 'SIP Report 2021-22', url: 'https://vcet.edu.in/wp-content/uploads/2024/03/SIP-Report_21-22.pdf' },
              { label: 'SIP Report 2020-21', url: 'https://vcet.edu.in/wp-content/uploads/2024/03/SIP-REPORT_20-21.pdf' },
              { label: 'SIP Report 2019-20', url: 'https://vcet.edu.in/wp-content/uploads/2024/03/SIP-REPORT_19-20.pdf' },
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 space-y-6">
                <div className="flex items-center gap-3"><span className="w-8 h-px bg-brand-gold" /><span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">First Year Engineering</span></div>
                <h3 className="text-2xl font-bold text-brand-navy relative inline-block">Induction Programme<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
                <p className="text-slate-600 leading-8">
                  VCET conducts the induction program for newcomers to help students adjust to the academic environment, connect with faculty and seniors, understand institutional practices and values, and begin regular classes after completion of the induction activities.
                </p>
                <div className="space-y-3">
                  {links.map((item) => (
                    <a key={item.label} href={item.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gold hover:bg-brand-navylight transition-colors">
                      <span>{item.label}</span><i className="ph ph-arrow-up-right text-brand-gold" />
                    </a>
                  ))}
                </div>
              </section>
            );
          })()}

          {/* â•â•â•â• TOPPERS â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
          {activeId === 'toppers' && (() => {
            const toppers = [
              { term: '2020-21 SEM-I', topper: 'Thakur Mihir Ashish', score: '9.26 SGPI' },
              { term: '2020-21 SEM-II', topper: 'Singh Mohit', score: '9.83 SGPI' },
              { term: '2021-22 SEM-I', topper: 'Vanjara Riddhesh', score: '10 SGPI' },
              { term: '2021-22 SEM-II', topper: '24 STUDENTS HAVE 10 POINTER', score: '10 SGPI' },
              { term: '2022-23 SEM-I', topper: 'Gharat Parth', score: '10 SGPI' },
              { term: '2022-23 SEM-II', topper: 'Kashish Bhanushali, Nishant Bhandigare, Bharti Kiran', score: '10 SGPI' },
              { term: '2023-24 SEM-I', topper: 'Rishiraj Yadav, Saish Sutar', score: '10 SGPI' },
              { term: '2023-24 SEM-II', topper: 'Kalyani Rane', score: '9.8 SGPI' },
              { term: '2024-25 SEM-I', topper: 'Avadh Mehta', score: '9.52 SGPI' },
            ];

            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4"><span className="w-8 h-px bg-brand-gold" /><span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">First Year Engineering</span></div>
                <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Toppers<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-brand-navy text-white">
                        <th className="px-4 py-3 text-left">Term</th>
                        <th className="px-4 py-3 text-left">Topper</th>
                        <th className="px-4 py-3 text-left">SGPI</th>
                      </tr>
                    </thead>
                    <tbody>
                      {toppers.map((item) => (
                        <tr key={item.term} className="border-t border-slate-100">
                          <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{item.term}</td>
                          <td className="px-4 py-3 text-slate-700">{item.topper}</td>
                          <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{item.score}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            );
          })()}

          {/* â•â•â•â• ANNUAL REPORTS â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
          {activeId === 'annual-reports' && (() => {
            const links = [
              { label: 'Annual Report 2023-24', url: 'https://vcet.edu.in/wp-content/uploads/2025/05/First_Year_Engg._Annual_Report_23-24.pdf' },
              { label: 'Annual Report 2022-23', url: 'https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fvcet.edu.in%2Fwp-content%2Fuploads%2F2024%2F04%2FAnnual_Report_22-23.docx&wdOrigin=BROWSELINK' },
              { label: 'Annual Report 2021-22', url: 'https://vcet.edu.in/wp-content/uploads/2025/02/Annual_Report_21-22.pdf' },
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4"><span className="w-8 h-px bg-brand-gold" /><span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">First Year Engineering</span></div>
                <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Annual Reports<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
                <div className="space-y-3">
                  {links.map((item) => (
                    <a key={item.label} href={item.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gold hover:bg-brand-navylight transition-colors">
                      <span>{item.label}</span><i className="ph ph-arrow-up-right text-brand-gold" />
                    </a>
                  ))}
                </div>
              </section>
            );
          })()}

          {/* â•â•â•â• NEWSLETTER & MAGAZINE â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
          {activeId === 'newsletter' && (
            <DepartmentNewsletterPanel
              departmentLabel="First Year Engineering"
              newsletterItems={newsletters.length > 0 ? newsletters : newsletterPdfs}
              magazineItems={magazines.length > 0 ? magazines : magazinePdfs}
            />
          )}

          {activeId !== 'about' && activeId !== 'vision' && activeId !== 'dab' && activeId !== 'mou' && activeId !== 'patent' && activeId !== 'peo' && activeId !== 'faculty' && activeId !== 'infrastructure' && activeId !== 'time-table' && activeId !== 'teaching-learning' && activeId !== 'induction' && activeId !== 'annual-reports' && activeId !== 'toppers' && activeId !== 'syllabus' && activeId !== 'newsletter' && (
            <section className="reveal bg-white rounded-3xl p-12 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center min-h-[300px]">
              <div className="w-16 h-16 rounded-2xl bg-brand-navylight flex items-center justify-center mb-4">
                <i className={`ph ${activeLink?.icon ?? 'ph-folder'} text-3xl text-brand-navy`} />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-2">{activeLink?.label}</h3>
              <p className="text-slate-500">The content will be published soon!</p>
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

export default DeptFE;


