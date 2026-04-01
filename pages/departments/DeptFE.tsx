import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import DepartmentFacultySection from '../../components/DepartmentFacultySection';
import NewsletterSection from '../../components/NewsletterSection';

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
];

const DeptFE: React.FC = () => {
  const [activeId, setActiveId] = useState('about');
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
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    const t = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observer.observe(el));
    }, 50);
    return () => { clearTimeout(t); observer.disconnect(); };
  }, [activeId]);

  return (
    <PageLayout>

      {/* ── Hero Banner ─────────────────────────────────────────── */}
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
            <span className="block text-xl md:text-2xl mt-4 text-brand-gold/80 font-normal italic">Gateway to all Engineering Branches · 720 Students</span>
          </h1>
        </div>
      </header>

      {/* ── Page Body ───────────────────────────────────────────── */}
      <div className="container mx-auto px-4 sm:px-6 py-10 md:py-12 max-w-7xl flex flex-col lg:flex-row gap-8 lg:gap-10">

        {/* Sticky Sidebar */}
        <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0">
          <div className="lg:sticky lg:top-24 bg-white rounded-xl shadow-md overflow-hidden border border-slate-200 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
            <nav className="flex flex-col py-2">
              {sidebarLinks.map((link) => {
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

          {/* ════ ABOUT ════════════════════════════════════════════ */}
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
                  Established in June 1994 alongside the inception of the college, the First Year Engineering department offers an array of subjects including Engineering Physics, Engineering Chemistry, Engineering Mathematics, and Business Communication &amp; Ethics, and they collectively form the foundational pillars.
                </p>
                <p>
                  The Undergraduate Program (UG) offers various specializations including Computer Engineering with an approved intake of 180 students, Computer Science and Engineering (Data Science) with 180 students, Information Technology with 60 students, and Artificial Intelligence and Data Science with 120 students. Additionally, there are programs in Mechanical Engineering, Electronics and Telecommunication Engineering, and Civil Engineering, each with an approved intake of 60 students.
                </p>
                <p>
                  Bolstered by dedicated faculty members, the department serves as a cornerstone for all engineering disciplines within the college. Faculty members actively engage in professional development through participation in refresher and orientation courses whenever feasible, and the department has hosted several seminars on diverse topics for both students and staff.
                </p>
                <p>
                  Recognized for its pivotal role, the department is equipped with state-of-the-art laboratories and continues to spearhead various curricular and extracurricular initiatives. By nurturing a culture of innovation and collaboration, the department cultivates a strong foundation essential for the success of all engineering branches.
                </p>
              </div>
            </section>
          )}

          {/* ════ VISION & MISSION ═════════════════════════════════ */}
          {activeId === 'vision' && (
            <section className="reveal bg-white rounded-3xl p-12 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center min-h-[300px]">
              <div className="w-16 h-16 rounded-2xl bg-brand-navylight flex items-center justify-center mb-4">
                <i className="ph ph-target text-3xl text-brand-navy" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-2">Vision and Mission</h3>
              <p className="text-slate-500">The content will be published soon.</p>
            </section>
          )}

          {/* ════ DAB ══════════════════════════════════════════════ */}
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

          {/* ════ POs, PEOs & PSOs ═════════════════════════════════ */}
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

          {/* ════ MoU ═════════════════════════════════════════════ */}
          {activeId === 'mou' && (
            <section className="reveal bg-white rounded-3xl p-12 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center min-h-[300px]">
              <div className="w-16 h-16 rounded-2xl bg-brand-navylight flex items-center justify-center mb-4">
                <i className="ph ph-handshake text-3xl text-brand-navy" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-2">MoU</h3>
              <p className="text-slate-500">The content will be published soon.</p>
            </section>
          )}

          {/* ════ PATENT ══════════════════════════════════════════ */}
          {activeId === 'patent' && (
            <section className="reveal bg-white rounded-3xl p-12 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center min-h-[300px]">
              <div className="w-16 h-16 rounded-2xl bg-brand-navylight flex items-center justify-center mb-4">
                <i className="ph ph-certificate text-3xl text-brand-navy" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-2">Patent</h3>
              <p className="text-slate-500">The content will be published soon.</p>
            </section>
          )}

          {/* ════ FACULTY ══════════════════════════════════════════ */}
          {activeId === 'faculty' && <DepartmentFacultySection departmentName="First Year Engineering" />}

          {/* ════ INFRASTRUCTURE ═════════════════════════════════ */}
          {activeId === 'infrastructure' && (() => {
            const labs = [
              {
                title: 'Chemistry Lab',
                inCharge: 'Ms. c.v.Sonarkar',
                majorEquipments: 'Contech Electronic Balance, Portable DM Plant, Hot Air Oven, Redwood Viscometer, Pensky Martin’s Apparatus, Vicat’s Apparatus.',
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
                software: 'OS – Windows 11. SW – TC, JAVA, MS Office. Browser – IE 8, Google Chrome, Mozilla.',
                hardware: 'PC – HP Corei3 – No.25. Printer – HP laser Jet.',
              },
              {
                title: 'Language Lab',
                inCharge: 'Dr. Pradip Gulbhile',
                software: 'Orell Talk Smart Version , 1 Teacher,50 student Consoles ,OS – Windows 10. SW – TC, JAVA, MS Office. Browser – IE 8, Google Chrome, Mozilla.',
                hardware: 'PC – HP Core i3 – No.25. Printer – HP Laser Jet.',
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

          {/* ════ SYLLABUS ═══════════════════════════════════════ */}
          {activeId === 'syllabus' && (() => {
            const links = [
              { label: 'All Branches Scheme Syllabus (Sem I & Sem II)', url: 'https://vcet.edu.in/wp-content/uploads/2024/08/First-Year-Engineering-All-Branches-Scheme-Syllabus-Sem-I-and-Sem-II-Final-1-July-2024-25.pdf' },
              { label: 'Course Outcomes for First Year Engineering', url: 'https://vcet.edu.in/wp-content/uploads/2025/02/Course-Outcomes-for-First-Year-Engineering.pdf' },
              { label: 'NEP 2020 Theory CO (All Subjects)', url: 'https://vcet.edu.in/wp-content/uploads/2025/05/FE-COsNEP-2020-All-Subjects-Theory.pdf' },
              { label: 'Lab COs', url: 'https://vcet.edu.in/wp-content/uploads/2025/02/LAB-COs.pdf' },
              { label: 'NEP 2020 Lab CO (All Subjects)', url: 'https://vcet.edu.in/wp-content/uploads/2025/05/FE-COsNEP-2020-All-Subjects-LAB.pdf' },
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

          {/* ════ TIME TABLE ═════════════════════════════════════ */}
          {activeId === 'time-table' && (() => {
            const sem2Links = [
              { label: 'Sem II - FE A (Comp 1)', url: 'https://vcet.edu.in/wp-content/uploads/2025/05/DivAComps1_Sem2_TT.pdf' },
              { label: 'Sem II - FE B (Comp 2)', url: 'https://vcet.edu.in/wp-content/uploads/2025/05/DivBComps2_Sem2_TT-.pdf' },
              { label: 'Sem II - FE C (Comp 3)', url: 'https://vcet.edu.in/wp-content/uploads/2025/05/DivCComps3_Sem2_TT.pdf' },
              { label: 'Sem II - FE D (Civil)', url: 'https://vcet.edu.in/wp-content/uploads/2025/05/DivDCivil_Sem2_TT.pdf' },
              { label: 'Sem II - FE E (CSEDS 1)', url: 'https://vcet.edu.in/wp-content/uploads/2025/05/DivECSEDS1_Sem2_TT.pdf' },
              { label: 'Sem II - FE F (CSEDS 2)', url: 'https://vcet.edu.in/wp-content/uploads/2025/05/DivFCSEDS2_Sem2_TT.pdf' },
              { label: 'Sem II - FE G (INFT)', url: 'https://vcet.edu.in/wp-content/uploads/2025/05/Div-G-INFT-Engg.-_-SemII-_-2024-25.pdf' },
              { label: 'Sem II - FE H (AI & DS)', url: 'https://vcet.edu.in/wp-content/uploads/2025/05/DivHAIDS_Sem2_TT.pdf' },
              { label: 'Sem II - FE I (EXTC)', url: 'https://vcet.edu.in/wp-content/uploads/2025/05/Div-I-EXTC-Engg._-semII_-2024-25.pdf' },
              { label: 'Sem II - FE J (Mech)', url: 'https://vcet.edu.in/wp-content/uploads/2025/05/V.2_SEM-II_DIV.-TT_2024-25.xlsx-DIV-J_MECH.pdf' },
              { label: 'Sem II - FE K (Civil & VLSI)', url: 'https://vcet.edu.in/wp-content/uploads/2025/05/V.2_SEM-II_DIV.-TT_2024-25.xlsx-DIV-K_-VLSI.pdf' },
              { label: 'Sem II - FE L (CSEDS 3)', url: 'https://vcet.edu.in/wp-content/uploads/2025/05/V.2_SEM-II_DIV.-TT_2024-25.xlsx-DIV-L_-CSEDS-3.pdf' },
            ];
            const sem1Links = [
              { label: 'Sem I - FE A (Comp 1)', url: 'https://vcet.edu.in/wp-content/uploads/2025/04/Div-A-Comp1-_-TT.pdf' },
              { label: 'Sem I - FE B (Comp 2)', url: 'https://vcet.edu.in/wp-content/uploads/2025/04/Div-B-Comp2-_-TT.pdf' },
              { label: 'Sem I - FE C (Comp 3)', url: 'https://vcet.edu.in/wp-content/uploads/2025/05/Div-C-Comp3-_-TT.pdf' },
              { label: 'Sem I - FE D (Civil)', url: 'https://vcet.edu.in/wp-content/uploads/2025/05/Div-D-Civil-engg.-_-TT.pdf' },
              { label: 'Sem I - FE E (CSEDS 1)', url: 'https://vcet.edu.in/wp-content/uploads/2025/05/Div-E-CSE-DS-1-_-TT.pdf' },
              { label: 'Sem I - FE F (CSEDS 2)', url: 'https://vcet.edu.in/wp-content/uploads/2025/05/Div-F-CSE-DS-2-_-TT.pdf' },
              { label: 'Sem I - FE G (INFT)', url: 'https://vcet.edu.in/wp-content/uploads/2025/05/Div-G-INFT-engg-_-TT.pdf' },
              { label: 'Sem I - FE H (AI-DS)', url: 'https://vcet.edu.in/wp-content/uploads/2025/05/Div-H-AI-DS-engg.-_-TT.pdf' },
              { label: 'Sem I - FE I (EXTC)', url: 'https://vcet.edu.in/wp-content/uploads/2025/05/Div-I-EXTC-engg.-_-TT.pdf' },
              { label: 'Sem I - FE J (Mech)', url: 'https://vcet.edu.in/wp-content/uploads/2025/05/Div-J-Mech-engg.-_-TT.pdf' },
              { label: 'Sem I - FE K (VLSI)', url: 'https://vcet.edu.in/wp-content/uploads/2025/05/Div-K-VLSI-engg.-_-TT.pdf' },
              { label: 'Sem I - FE L (CSE-DS 3)', url: 'https://vcet.edu.in/wp-content/uploads/2025/05/L-Div-_-CSE-DS-3_-TT.pdf' },
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

          {/* ════ INNOVATIONS IN TEACHING LEARNING ══════════════ */}
          {activeId === 'teaching-learning' && (() => {
            const links = [
              { label: 'Innovation in Teaching Report 2024-25', url: 'https://vcet.edu.in/wp-content/uploads/2025/05/Innovation-in-Teaching-report-2024-25.pdf' },
              { label: 'Innovation in Teaching Report 2023-24', url: 'https://vcet.edu.in/wp-content/uploads/2024/04/Innovation-in-Teaching-report-2023-24.pdf' },
              { label: 'Innovation in Teaching Report 2022-23', url: 'https://vcet.edu.in/wp-content/uploads/2024/03/Innovation-in-Teaching-report-2022-23-Copy.pdf' },
              { label: 'Innovation in Teaching Report 2021-22', url: 'https://vcet.edu.in/wp-content/uploads/2022/09/Innovation-in-Teaching-report-2021-22-1.pdf' },
              { label: 'Innovation in Teaching Report 2020-21', url: 'https://vcet.edu.in/wp-content/uploads/2022/09/Innovation-in-Teaching-report-2020-21-2.pdf' },
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

          {/* ════ INDUCTION PROGRAM ═════════════════════════════ */}
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

          {/* ════ TOPPERS ════════════════════════════════════════ */}
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

          {/* ════ ANNUAL REPORTS ═════════════════════════════════ */}
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

          {/* ════ OTHER SECTIONS (placeholder) ════════════════════ */}
          {activeId === 'newsletter' && (
            <NewsletterSection departmentName="First Year Engineering" departmentId="6" />
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

        </main>
      </div>
    </PageLayout>
  );
};

export default DeptFE;

