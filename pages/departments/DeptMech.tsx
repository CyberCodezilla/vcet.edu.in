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
  { id: 'peo',        label: 'POs, PEOs, PSOs',              icon: 'ph-chart-bar' },
  { id: 'faculty',    label: 'Faculty',                      icon: 'ph-chalkboard-teacher' },
  { id: 'paqic',      label: 'PAQIC',                        icon: 'ph-clipboard-text' },
  { id: 'aicte-funding', label: 'AICTE & University Funding', icon: 'ph-bank' },
  { id: 'teaching-learning', label: 'Innovative in Teaching learning', icon: 'ph-lightbulb' },
  { id: 'journal-publication', label: 'Journal Publication', icon: 'ph-file-text' },
  { id: 'student-achievement', label: 'Student Achievement', icon: 'ph-medal' },
  { id: 'infrastructure', label: 'Infrastructure',           icon: 'ph-buildings' },
  { id: 'toppers',    label: 'Toppers',                      icon: 'ph-medal' },
  { id: 'syllabus',   label: 'Syllabus',                     icon: 'ph-book-open' },
  { id: 'newsletter', label: 'Newsletter',                   icon: 'ph-newspaper' },
];

const delayClass = (idx: number) => {
  if (idx % 3 === 0) return 'delay-100';
  if (idx % 3 === 1) return 'delay-200';
  return 'delay-300';
};

const DeptMech: React.FC = () => {
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
          <span className="text-brand-gold font-semibold">Mechanical Engineering</span>
        </nav>
        <div className="container mx-auto px-6 max-w-7xl relative z-10">

          <h1 className="font-display font-bold text-white leading-tight tracking-tight text-center">
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Mechanical Engineering</span>
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
              <div className="space-y-6 text-slate-600 leading-8 text-left">
                <p className="text-lg font-bold text-brand-navy">Dr. Uday Aswalekar, Head Of Department</p>
                <p>
                  Established in 1994, the Department of Mechanical Engineering is amongst the premier Departments of VCET. Currently,
                  it is running Under Graduate program, B.E in Mechanical Engineering with an intake of 60 seats. The Department is
                  accredited by National Board of Accreditation (NBA) from 2012-2015, reaccredited from July 2022 to June 2025 and is
                  permanently affiliated to University of Mumbai.
                </p>
                <p>
                  The Department has highly qualified and experienced faculty members. The Department features the state-of-the-art
                  infrastructure including well developed laboratories, and is armed with the recent software&apos;s. The Department imparts
                  the skills and expertise in the areas of Design, Thermal sciences, Manufacturing and Renewable energy that are the
                  backbone of Industries.
                </p>
                <p>
                  The Department continuously strives to develop the technical as well as professional skills of students by exposing
                  them to industry environment through Industrial Visits, Expert Lectures, Seminars Hands on Training, and Internship.
                  The Department is associated with SAE, ISHRAE, VMEA student chapters.
                </p>
                <p>
                  The Department encourages students to understand real life challenges through activities like Formula Car, Quad bike,
                  Solar Car, Electric bike manufacturing and Aero-designing. These provide a platform for students to develop their
                  technical, managerial, organizational, and Communication skills by organizing workshops and by participating in various
                  National and International competitions.
                </p>
                <p>
                  The Department also offers consultancy in the field of Material testing, Energy Audit, ISO certification to the
                  Industries.
                </p>
              </div>
            </section>
          )}

          {/* ════ VISION & MISSION ═════════════════════════════════ */}
          {activeId === 'vision' && (
            <div className="space-y-16">
              <div className="reveal flex items-center gap-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Mechanical Engineering</span>
              </div>
              <section className="reveal">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(135deg, #0d2d56 0%, #1a4b7c 50%, #0f3460 100%)' }}>
                  <span className="absolute -top-6 -left-2 text-[200px] font-display font-bold text-white/[0.04] leading-none select-none pointer-events-none">"</span>
                  <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(253,184,19,0.12) 0%, transparent 70%)' }} />
                  <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
                  <div className="relative z-10 p-8 md:p-14">
                    <div className="flex items-center gap-3 mb-8">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold/70">Department</p>
                        <p className="text-sm font-bold text-white/90 uppercase tracking-widest">Vision</p>
                      </div>
                    </div>
                    <blockquote className="text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-white leading-[1.3] italic mb-10 max-w-4xl">
                      "To be a pre-eminent department for transformation of students in mechanical engineering into technically and ethically sound professionals."
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div className="h-px flex-1 bg-white/10" />
                      <span className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-semibold">VCET · Mechanical Engineering</span>
                      <div className="h-px w-12 bg-brand-gold/40" />
                    </div>
                  </div>
                </div>
              </section>
              <section className="reveal space-y-6">
                <div className="flex items-end justify-between mb-2">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-1">Guiding Principles</p>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy leading-tight">Our Mission</h2>
                  </div>
                </div>
                <div className="h-px bg-gradient-to-r from-brand-gold via-brand-navylight to-transparent" />
                <section className="reveal bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 rounded-xl border border-slate-200 bg-brand-navylight/35 px-4 py-3 text-slate-700 leading-7">
                      <span className="mt-2 h-2 w-2 rounded-full bg-brand-navy flex-shrink-0" />
                      <span>To impart quality education through practical oriented initiatives.</span>
                    </li>
                    <li className="flex items-start gap-3 rounded-xl border border-slate-200 bg-brand-navylight/35 px-4 py-3 text-slate-700 leading-7">
                      <span className="mt-2 h-2 w-2 rounded-full bg-brand-navy flex-shrink-0" />
                      <span>To prepare industry ready professionals with ethical and moral values.</span>
                    </li>
                    <li className="flex items-start gap-3 rounded-xl border border-slate-200 bg-brand-navylight/35 px-4 py-3 text-slate-700 leading-7">
                      <span className="mt-2 h-2 w-2 rounded-full bg-brand-navy flex-shrink-0" />
                      <span>To promote entrepreneurship by creating various opportunities.</span>
                    </li>
                  </ul>
                </section>
              </section>
            </div>
          )}

          {/* ════ DAB ══════════════════════════════════════════════ */}
          {activeId === 'dab' && (() => {
            const members = [
              { sr: 1, name: 'Dr. Rakesh Himte', designation: 'Principal', org: 'VCET, Vasai', role: 'Chairman', tag: 'internal' },
              { sr: 2, name: 'Dr. Vikas Gupta', designation: 'Dean (Academic)', org: 'VCET, Vasai', role: 'Dean', tag: 'internal' },
              { sr: 3, name: 'Dr. Uday Aswalekar', designation: 'HOD, Mech', org: 'VCET, Vasai', role: 'HOD', tag: 'internal' },
              { sr: 4, name: 'Dr. B. E. Narkhede', designation: 'Asso. Professor', org: 'NITIE, Mumbai', role: 'Academic Expert', tag: 'academic' },
              { sr: 5, name: 'Mr. Noorul Haque', designation: 'Director', org: 'Synergy Water Slide PVT Ltd., Vasai (E)', role: 'Industry Expert', tag: 'industry' },
              { sr: 6, name: 'Mr. Yash Shah', designation: 'CEO', org: 'Apollo Heat Exchanger PVT LTD', role: 'Industry Expert', tag: 'industry' },
              { sr: 7, name: 'Mr. Avadhoot Belose', designation: 'Senior Advisor', org: 'Dell Technology, Texas, USA', role: 'Alumni Representative', tag: 'academic' },
              { sr: 8, name: 'Dr. R. S. Maurya', designation: 'Asso. Professor', org: 'Sardar Patel College of Engg and Tech, Andheri', role: 'Parent Representative', tag: 'parent' },
              { sr: 9, name: 'Student Representative', designation: 'Student', org: 'VCET, Vasai', role: 'Student Representative', tag: 'student' },
              { sr: 10, name: 'Dr. Ashish Choudhari', designation: 'Asso. Professor', org: 'VCET, Vasai', role: 'Sr. Faculty', tag: 'internal' },
              { sr: 11, name: 'Mr. D. J. Choudhari', designation: 'Asst. Professor', org: 'VCET, Vasai', role: 'Convener', tag: 'internal' },
            ];
            const tagStyle: Record<string, string> = { internal: 'bg-brand-navylight text-brand-navy', academic: 'bg-blue-50 text-blue-700', industry: 'bg-amber-50 text-amber-700', student: 'bg-emerald-50 text-emerald-700', parent: 'bg-purple-50 text-purple-700' };
            return (
              <div className="space-y-10">
                <div className="reveal">
                  <div className="flex items-center gap-3 mb-4"><span className="w-8 h-px bg-brand-gold" /><span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Mechanical Engineering</span></div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy leading-tight">Departmental Advisory Board<span className="text-brand-gold"> (DAB)</span></h2>
                  <p className="mt-3 text-slate-600 leading-7">
                    The Departmental Advisory Board (DAB) has been formed with the purpose of remaining up to date with the latest requirements of the industry, academics and incorporating necessary components in the curricular and extracurricular activities.
                  </p>
                  <p className="mt-2 text-slate-600 leading-7">
                    The DAB is composed of representative members from eminent institutions, industry, alumni, parents, students and faculty of the department. Following are the members of the committee for three consecutive academic year starting from 2020-21.
                  </p>
                  <div className="mt-5 h-px bg-gradient-to-r from-brand-gold via-brand-navylight to-transparent" />
                </div>
                <div className="reveal bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead><tr className="bg-brand-navy text-white">{['Sr.', 'Name', 'Designation', 'Organisation', 'Role in DAB'].map(h => <th key={h} className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-widest">{h}</th>)}</tr></thead>
                      <tbody>
                        {members.map((m, idx) => (
                          <tr key={m.sr} className={`border-t border-slate-100 hover:bg-brand-navylight/40 transition-colors duration-150 ${idx % 2 === 1 ? 'bg-slate-50/60' : 'bg-white'}`}>
                            <td className="px-4 py-4 font-bold text-brand-navy/40 text-xs">{String(m.sr).padStart(2, '0')}</td>
                            <td className="px-4 py-4 font-semibold text-brand-navy whitespace-nowrap">{m.name}</td>
                            <td className="px-4 py-4 text-slate-600">{m.designation}</td>
                            <td className="px-4 py-4 text-slate-600">{m.org}</td>
                            <td className="px-4 py-4"><span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap ${tagStyle[m.tag]}`}>{m.role}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ════ POs, PEOs & PSOs ═════════════════════════════════ */}
          {activeId === 'peo' && (() => {
            const pos = [
              { n: '01', text: 'Engineering knowledge: Apply the knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to the solution of complex engineering problems.' },
              { n: '02', text: 'Problem analysis: Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions using first principles of mathematics, natural sciences, and engineering sciences.' },
              { n: '03', text: 'Design/development of solutions: Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for the public health and safety, and the cultural, societal, and environmental considerations.' },
              { n: '04', text: 'Conduct investigations of complex problems: Use research-based knowledge and research methods including design of experiments, analysis and interpretation of data, and synthesis of the information to provide valid conclusions.' },
              { n: '05', text: 'Modern tool usage: Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools including prediction and modeling to complex engineering activities with an understanding of the limitations.' },
              { n: '06', text: 'The engineer and society: Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to the professional engineering practice.' },
              { n: '07', text: 'Environment and sustainability: Understand the impact of the professional engineering solutions in societal and environmental contexts, and demonstrate the knowledge of, and need for sustainable development.' },
              { n: '08', text: 'Ethics: Apply ethical principles and commit to professional ethics and responsibilities and norms of the engineering practice.' },
              { n: '09', text: 'Individual and team work: Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings.' },
              { n: '10', text: 'Communication: Communicate effectively on complex engineering activities with the engineering community and with society at large, such as, being able to comprehend and write effective reports and design documentation, make effective presentations, and give and receive clear instructions.' },
              { n: '11', text: 'Project management and finance: Demonstrate knowledge and understanding of the engineering and management principles and apply these to one’s own work, as a member and leader in a team, to manage projects and in multidisciplinary environments.' },
              { n: '12', text: 'Life-long learning: Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change.' },
            ];
            const peos = [
              'To facilitate students with modern tools and techniques and make them compatible to solve real Life problems.',
              'To impart students with good scientific and technical knowledge to enable them to analyse, design, and create peculiar products to fulfill societal needs.',
              'To infuse ethical and moral values effective leadership skills, and entrepreneurship skills to make students professionally competent.',
              'To encourage the students, to interact with industry, professional bodies by participating in co-curricular activities.',
            ];
            const psos = [
              { n: 'PSO1', text: 'Graduates will exhibit the ability to analyze and solve problems in Design, Thermal, Manufacturing and Renewable energy domains.' },
              { n: 'PSO2', text: 'Graduates will incorporate technical and professional skills in their career.' },
            ];
            return (
              <div className="space-y-16">
                <div className="reveal">
                  <div className="flex items-center gap-3 mb-4"><span className="w-8 h-px bg-brand-gold" /><span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Mechanical Engineering</span></div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy">POs, PEOs &amp; PSOs</h2>
                  <div className="mt-4 h-px bg-gradient-to-r from-brand-gold via-brand-navylight to-transparent" />
                </div>
                <section className="reveal space-y-6">
                  <div><p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">12 Outcomes</p><h3 className="text-2xl font-display font-bold text-brand-navy leading-tight">Program Outcomes (POs)</h3></div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {pos.map((po, idx) => (
                      <div key={po.n} className={`reveal ${delayClass(idx)} flex gap-4 items-start bg-white border border-slate-100 rounded-xl px-5 py-4 shadow-sm`}>
                        <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-brand-navylight flex items-center justify-center text-[11px] font-bold text-brand-navy">{po.n}</span>
                        <p className="text-sm text-slate-600 leading-relaxed pt-1">{po.text}</p>
                      </div>
                    ))}
                  </div>
                </section>
                <section className="reveal">
                  <div className="relative rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg,#0d2d56 0%,#1a4b7c 100%)' }}>
                    <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
                    <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(253,184,19,0.12) 0%,transparent 70%)' }} />
                    <div className="relative z-10 p-6 sm:p-8">
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold/80 mb-1">Objectives</p>
                      <h3 className="text-2xl font-display font-bold text-white mb-4">Program Educational Objectives (PEOs)</h3>
                      <ul className="space-y-2">
                        {peos.map((item, idx) => (
                          <li key={item} className="text-white/90 text-sm leading-7">{idx + 1}. {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
                <section className="reveal space-y-6">
                  <div><p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">Mechanical Engineering Specific</p><h3 className="text-2xl font-display font-bold text-brand-navy leading-tight">Program Specific Outcomes (PSOs)</h3></div>
                  <div className="grid md:grid-cols-2 gap-5">
                    {psos.map((pso, idx) => (
                      <div key={pso.n} className={`reveal ${idx === 0 ? 'delay-100' : 'delay-200'} bg-white rounded-2xl p-7 border border-slate-100 shadow-sm`}>
                        <span className="inline-block px-3 py-1 rounded-full bg-brand-navylight text-brand-navy text-[11px] font-bold uppercase tracking-widest mb-4">{pso.n}</span>
                        <p className="text-slate-600 text-sm leading-relaxed">{pso.text}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            );
          })()}

          {/* ════ FACULTY ══════════════════════════════════════════ */}
          {activeId === 'faculty' && <DepartmentFacultySection departmentName="Mechanical Engineering" />}

          {/* ════ PAQIC ═══════════════════════════════════════════ */}
          {activeId === 'paqic' && (() => {
            const members = [
              'Dr. Uday Aswalekar, HOD, Mechanical Engineering (Chairman)',
              'Dr. Ashish Choudhary, member MED',
              'Mr. Raahul Krishna, member MED',
              'Dr. Vikas Gupta, Professor & Dean Academics EXTC engineering',
              'Dr. Ashish Vanmali, Associate Professor, EXTC Engineering',
              'Mr. Vinay Patel, MED (Coordinator)',
            ];
            const roles = [
              'Devise Standard Operating Procedure for assessment and evaluation of Outcome Based Education (OBE) for the program.',
              'Confirming the linkage of PO, PSO and CO with of institute and department vision, mission.',
              'Periodic review of assessment data & identification of gaps/shortfalls in program.',
              'Recommend plan of action to bridge the gap and monitor its implementation.',
              'Review of quality/relevance of assessment processes and tools for attainment of COs, POs and PSOs.',
              'Preparing the compliance report as per requirement of accreditation activities.',
              'Periodic revision of Program Educational Objectives (PEOs), PSO etc.',
              'The PAQIC Coordinator will hold the responsibility of scheduling of meeting, recording of Minutes and compiling the action taken report.',
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Mechanical Engineering</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy relative inline-block">PAQIC<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
                <p className="text-slate-600 leading-7">The composition of the PAQIC for the Department of Mechanical Engineering is as follows:</p>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h4 className="text-base font-bold text-brand-navy mb-3">Members</h4>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {members.map((m) => <li key={m}>{m}</li>)}
                  </ul>
                </div>
                <p className="text-slate-600"><span className="font-semibold text-brand-navy">Frequency Of Meeting:</span> Minimum 2 per academic year</p>
                <div>
                  <h4 className="text-base font-bold text-brand-navy mb-3">Roles and responsibilities</h4>
                  <ul className="space-y-2">
                    {roles.map((role) => (
                      <li key={role} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-brand-navylight/35 px-4 py-3 text-slate-700 leading-7">
                        <span className="mt-2 h-2 w-2 rounded-full bg-brand-navy flex-shrink-0" />
                        <span>{role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            );
          })()}

          {/* ════ MoU ═════════════════════════════════════════════ */}
          {activeId === 'mou' && (() => {
            const links = [
              { label: 'MoU 2022-23', url: 'https://vcet.edu.in/wp-content/uploads/2024/04/Mech_MOUs-2022-23.pdf' },
              { label: 'MoU 2021-22', url: 'https://vcet.edu.in/wp-content/uploads/2024/04/Mech_MOUs-2021-22.pdf' },
              { label: 'MoU 2020-21', url: 'https://vcet.edu.in/wp-content/uploads/2024/04/Mech_MOUs-2020-21.pdf' },
              { label: 'MoU 2019-20', url: 'https://vcet.edu.in/wp-content/uploads/2024/04/Mech_MOUs-2019-20.pdf' },
              { label: 'MoU 2018-19', url: 'https://vcet.edu.in/wp-content/uploads/2024/04/Mech_MOUs-2018-19.pdf' },
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Mechanical Engineering</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">MoU&apos;s<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
                <div className="space-y-3">
                  {links.map((item) => (
                    <a key={item.label} href={item.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gold hover:bg-brand-navylight transition-colors">
                      <span>{item.label}</span>
                      <i className="ph ph-arrow-up-right text-brand-gold" />
                    </a>
                  ))}
                </div>
              </section>
            );
          })()}

          {/* ════ AICTE & UNIVERSITY FUNDING ═════════════════════ */}
          {activeId === 'aicte-funding' && (() => {
            const links = [
              { label: 'Mumbai University Minor Research Grant', url: 'https://vcet.edu.in/wp-content/uploads/2024/04/Mumbai-University-Minor-Research-Grant.pdf' },
              { label: 'AICTE-SPICES', url: 'https://vcet.edu.in/wp-content/uploads/2022/08/AICTE-SPICES.pdf' },
              { label: 'AICTE-MODROB', url: 'https://vcet.edu.in/wp-content/uploads/2024/04/MODROB-Funding.pdf' },
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Mechanical Engineering</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">AICTE &amp; University Funding<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
                <div className="space-y-3">
                  {links.map((item) => (
                    <a key={item.label} href={item.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gold hover:bg-brand-navylight transition-colors">
                      <span>{item.label}</span>
                      <i className="ph ph-arrow-up-right text-brand-gold" />
                    </a>
                  ))}
                </div>
              </section>
            );
          })()}

          {/* ════ INNOVATIVE IN TEACHING LEARNING ════════════════ */}
          {activeId === 'teaching-learning' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Mechanical Engineering</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Innovative in Teaching learning<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
              <a href="https://vcet.edu.in/wp-content/uploads/2025/01/innovation-in-Teaching-learning-1.pdf" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gold hover:bg-brand-navylight transition-colors">
                <span>Innovation in Teaching Learning</span>
                <i className="ph ph-arrow-up-right text-brand-gold" />
              </a>
            </section>
          )}

          {/* ════ JOURNAL PUBLICATION ════════════════════════════ */}
          {activeId === 'journal-publication' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Mechanical Engineering</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Journal Publication<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
              <a href="https://vcet.edu.in/wp-content/uploads/2024/04/Journal_Publication.pdf.pdf" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gold hover:bg-brand-navylight transition-colors">
                <span>Journal Publication</span>
                <i className="ph ph-arrow-up-right text-brand-gold" />
              </a>
            </section>
          )}

          {/* ════ STUDENT ACHIEVEMENT ════════════════════════════ */}
          {activeId === 'student-achievement' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Mechanical Engineering</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Student Achievements<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
              <a href="https://vcet.edu.in/wp-content/uploads/2022/02/Student-Achievements-1.pdf" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gold hover:bg-brand-navylight transition-colors">
                <span>Student Achievements</span>
                <i className="ph ph-arrow-up-right text-brand-gold" />
              </a>
            </section>
          )}

          {/* ════ INFRASTRUCTURE ═════════════════════════════════ */}
          {activeId === 'infrastructure' && (() => {
            const infrastructureLabs = [
              {
                title: 'BASIC WORKSHOP',
                incharge: 'Mr.Dipak Chaudhari.',
                hardware: 'Hardware. Carpentry. Fitting. Plumbing. Welding. Smithy.',
              },
              {
                title: 'MACHINE SHOP',
                incharge: 'Mr.Dipak Chaudhari.',
                hardware: 'Carpentry Lathe Machine. Universal Milling Machine Shaping Machine Radial drilling Machine.',
              },
              {
                title: 'ENGINEERING DRAWING',
                incharge: 'Mr. Swapnil Mane',
                software: 'AUTOCAD',
                hardware: 'Models of Projection of Solids, Prisms – Triangular, Square, Prisms-Pentagonal, Pyramids- Triangular, Square, Pentagonal, Hexagonal, Cylinder, Frustum of Pyramid, Models of Section of Solids & Intersection of solids Prisms – Triangular, Square, Pentagonal, Hexagonal Pyramids- Triangular, Square, Pentagonal, Hexagonal, Cylinder, Frustum Of pyramid',
              },
              {
                title: 'STRENGTH OF MATERIAL',
                incharge: 'Mr. Dipak Chaudhari',
                hardware: 'Universal Testing Machine, Torsion Testing Machine, Vickers Hardness Testing Machine, Impact Testing Machine, Rockwell cum Brinell Hardness Testing Machine',
                features: 'Material Testing Facility',
              },
              {
                title: 'FLUID MECHANICS',
                incharge: 'Dr.Ashish Chaudhari',
                hardware: 'mpact of jet on vanes, Buoyance & Metacentric height apparatus Bernoulli’s theorem apparatus Close circuit calibration rig for measuring discharge through venturi meter and orifice meter Close circuit apparatus for determination of co efficient of discharge of orifice and mouthpiece Flow through nozzles Calibration of rotameter Pipe friction apparatus Pipes in series and parallel Vortex flow apparatus Reynolds Apparatus.',
              },
              {
                title: 'COMPUTER CENTER',
                incharge: 'Mr. VishwasPalve',
                software: 'Solidworks 23, AutoCad-24, Ansys 15',
                hardware: 'Computers-51. A3 Printer& Scanner -01 A4 Printer-03',
                features: 'Modelling & Simulation. Drafting',
              },
              {
                title: 'HEAT TRANFER',
                incharge: 'Mr. Vinay Patel',
                hardware: 'Thermal conductivity of metal rod Heat transfer by natural convection apparatus Thermal conductivity of liquids Thermal conductivity of insulating powder apparatus Thermal conductivity of two slab guarded hot plate apparatus Heat transfer by forced convection apparatus Heat transfer in pin fin apparatus Heat transfer through lagged pipe apparatus Stefan- Boltzmann apparatus Emissivity measurement apparatus Parallel flow Counter flow apparatus',
              },
              {
                title: 'INTERNAL COMBUSTION ENGINES',
                incharge: 'Mr.Sanjay Lohar',
                hardware: 'Twin cylinder 4-stroke vertical Diesel Engine Four-cylinder four-stroke vertical petrol engine Sectional working Model of 2 Stroke Petrol engine Sectional working Model of 4 Stroke Petrol engine Sectional working Model of 2 Stroke Diesel engine Sectional working Model of 4 Stroke Diesel engine',
              },
              {
                title: 'MECHANICAL MEASUREMENTS AND CONTROL',
                incharge: 'Mr. Vinay D. Patel',
                hardware: 'Optical flats, Gear tooth Vernier Gear tooth comparator, Sine bar, Snap gauge and stand, Sleeve mt-3&4,',
              },
              {
                title: 'METROLOGY AND QUALITY ENGINEERING',
                incharge: 'Mr. Mukund Kavekar',
                hardware: 'Comparators ElectronicsComparators Screw thread micrometre Use of Profile Projector Gear Tooth Measurement Micrometre',
              },
              {
                title: 'KINAMATICS/DYNAMICS OF MACHINERY',
                incharge: 'Dr.Uday Aswaleker',
                hardware: 'Bar Link Watt Mechanism Pantograph Mechanism Model of Belt Pulley Shafting General Bearing Ball Bearing, Claw Clutch Kinematics Pair (All Types) Cam & Followers Gear Models Joint & Coupling Motorized Gyroscope Whirling of shaft Apparatus Static & Dynamic Balancing Machine Cam Analysis Machine Universal Governor App',
              },
              {
                title: 'AUTOMOBILE ENGINEERING',
                incharge: 'Mr. Mukund Kavekar',
                hardware: 'Mechanical Comparators Constant Mesh Gear Box Sliding Mesh Gear Box Epicyclic industrial gear box Pneumatic Braking system Disc Braking system Worm & Recirculating Ball steering gear',
              },
              {
                title: 'REFRIGERATION AND AIR CONDITIONING',
                incharge: 'Mr. Rishabh Melwanki',
                hardware: 'Experimental refrigeration Trainer Kit, Air conditioning Trainer Kit, Cooling Tower, Domestic refrigerator test setup, Water cooler test setup, Window AC test setup.',
              },
              {
                title: 'MECHATRONICS LAB',
                incharge: 'Mr.Parag Sarode.',
                hardware: 'Electro Pneumatic Trainer Package &Robo Software X- Y position Table Sensor Technology kit LMS Controller Package P Simulator H Simulator',
              },
              {
                title: 'THERMAL AND FLUID POWER',
                incharge: 'Mr. Vinay D. Patel',
                hardware: 'Model of Babcock & Wilcox Boiler Model of Cochran Boiler Model of Benson Boiler Model of Gas Turbine plant Model of Lever Safety Valve Model of Water Gauge Model of Feed Check Valve Model of Fusion Plugs Model of Green Economizer Model of Super Heater',
              },
              {
                title: 'MATERIAL TECHNOLOGY',
                incharge: 'Mr. Vishwas Palve',
                hardware: 'Inverted Metallurgical Microscope with Eyepiece WF-10 X118 and CCTV camera 700TVL, Metallurgical microscopes, Inverted metallurgical microscope, Double disc polishing machine',
                features: 'Metallurgical Micro-structure',
              },
              {
                title: 'MECHANICAL UTILITY SYSTEM',
                incharge: 'Mr. V.D. Patel',
                hardware: 'Single Stage Reciprocating Air Compressor Test Rig with Constant speed. Two stroke reciprocating air compressor test rig with constant speed. Centrifugal type blower test rig.',
                features: 'Modelling & Simulation. Drafting',
              },
              {
                title: 'MAINTENANCE ENGINEERING',
                incharge: 'Mr. Sanjay Lohar',
                hardware: 'Multi-function Rotor Bench, 6 Channel data acquisition system, Proximity probe, rpm sensor, Accelerometer, Motor controller, Analysis software, Sliding Mesh Gear Box, Constant Mesh Gear Box, Epicyclic gear box.',
                features: 'Sliding Mesh Gear Box, Constant Mesh Gear Box, Epicyclic gear box.',
              },
            ];

            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Mechanical Engineering</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Infrastructure<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
                <div className="space-y-4 text-slate-600 leading-8">
                  <p>
                    The Department features the state-of-the-art infrastructure including well developed laboratories, and is armed with the recent software&apos;s.
                  </p>
                  <p>
                    The Department imparts the skills and expertise in the areas of Design, Thermal sciences, Manufacturing and Renewable energy that are the backbone of Industries.
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {infrastructureLabs.map((lab, idx) => (
                    <article key={`${lab.title}-${idx}`} className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                      <div className="aspect-[16/10] bg-slate-100 border-b border-slate-200 flex flex-col items-center justify-center text-slate-400">
                        <i className="ph ph-image text-4xl mb-2" />
                        <p className="text-xs font-semibold uppercase tracking-wide">Image Holder {idx + 1}</p>
                      </div>
                      <div className="p-5 space-y-3">
                        <h4 className="text-base font-bold text-brand-navy leading-snug">{`Slide ${idx + 1} - ${lab.title}`}</h4>

                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-wide text-brand-gold">Lab In-Charge</p>
                          <p className="text-sm text-slate-700 mt-1">{lab.incharge}</p>
                        </div>

                        {lab.software && (
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-wide text-brand-gold">Software Installed</p>
                            <p className="text-sm text-slate-700 mt-1">{lab.software}</p>
                          </div>
                        )}

                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-wide text-brand-gold">Hardware</p>
                          <p className="text-sm text-slate-700 mt-1">{lab.hardware}</p>
                        </div>

                        {lab.features && (
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-wide text-brand-gold">Features</p>
                            <p className="text-sm text-slate-700 mt-1">{lab.features}</p>
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })()}

          {/* ════ TOPPERS ════════════════════════════════════════ */}
          {activeId === 'toppers' && (() => {
            const toppers = {
              SE: [
                'BHATKAR VED MAHESH VANDANA : 9',
                'PATIL NEHA PRAKASH MANISHA : 8.78',
                'Churi Yuta Prashant : 7.87',
              ],
              TE: [
                'MISHRA VINAYAK SURYANATH : 9.04',
                'Yadav Harsh Ashok : 8.48',
                'Pal Sachin Girijashankar : 8.30',
              ],
              BE: [
                'Tanavade Bhushan Rajesh : 10.0',
                'Damodar Vidhit Chandrashekhar : 9.85',
                'Kushwah Manisha Ramashankar : 9.70',
              ],
            };
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Mechanical Engineering</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Toppers<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
                <p className="text-sm font-bold text-brand-navy mb-4">Year: 2022-23</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-brand-navy text-white">
                        <th className="px-4 py-3 text-left">SE</th>
                        <th className="px-4 py-3 text-left">TE</th>
                        <th className="px-4 py-3 text-left">BE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[0, 1, 2].map((i) => (
                        <tr key={i} className="border-t border-slate-100">
                          <td className="px-4 py-3 text-slate-600">{toppers.SE[i]}</td>
                          <td className="px-4 py-3 text-slate-600">{toppers.TE[i]}</td>
                          <td className="px-4 py-3 text-slate-600">{toppers.BE[i]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            );
          })()}

          {/* ════ SYLLABUS ═══════════════════════════════════════ */}
          {activeId === 'syllabus' && (() => {
            const links = [
              { label: 'R-19 SE Syllabus', url: 'https://vcet.edu.in/wp-content/uploads/2021/11/R2019-SE_-Mechanical_BE-Sem-III-and-IV-Teaching-Scheme-and-Course-Content_Final_04072020.pdf' },
              { label: 'R-19 TE Syllabus', url: 'https://vcet.edu.in/wp-content/uploads/2021/11/R2019Third_Year_Mechanical_BE-Sem-V-and-VI-Teaching-Scheme-and-Course-Content_Draft_Copy.pdf' },
              { label: 'R-19 BE Syllabus', url: 'https://vcet.edu.in/wp-content/uploads/2024/04/BE-Mechanical-Syllabus.pdf' },
              { label: 'PO PSO CO (R16)', url: 'https://vcet.edu.in/wp-content/uploads/2024/03/R-2016.pdf' },
              { label: 'PO PSO CO (R19)', url: 'https://vcet.edu.in/wp-content/uploads/2024/03/R-2019.pdf' },
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Mechanical Engineering</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Syllabus<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
                <div className="space-y-3">
                  {links.map((item) => (
                    <a key={item.label} href={item.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gold hover:bg-brand-navylight transition-colors">
                      <span>{item.label}</span>
                      <i className="ph ph-arrow-up-right text-brand-gold" />
                    </a>
                  ))}
                </div>
              </section>
            );
          })()}

          {/* ════ NEWSLETTER ═══════════════════════════════════════ */}
          {activeId === 'newsletter' && (
            <NewsletterSection departmentName="Mechanical Engineering" departmentId="3" />
          )}

          {/* ════ OTHER SECTIONS (placeholder) ════════════════════ */}
          {activeId !== 'about' && activeId !== 'vision' && activeId !== 'dab' && activeId !== 'peo' && activeId !== 'faculty' && activeId !== 'paqic' && activeId !== 'mou' && activeId !== 'aicte-funding' && activeId !== 'teaching-learning' && activeId !== 'journal-publication' && activeId !== 'student-achievement' && activeId !== 'infrastructure' && activeId !== 'toppers' && activeId !== 'syllabus' && activeId !== 'newsletter' && (
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

export default DeptMech;
