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
  { id: 'student-achievements', label: 'Student Achievements', icon: 'ph-medal' },
  { id: 'infrastructure', label: 'Infrastructure',           icon: 'ph-buildings' },
  { id: 'time-table', label: 'Time Table',                   icon: 'ph-calendar' },
  { id: 'teaching-learning', label: 'Innovations in Teaching Learning', icon: 'ph-lightbulb' },
  { id: 'distinguished-alumni', label: 'Distinguished Alumni', icon: 'ph-user-circle' },
  { id: 'toppers',    label: 'Toppers',                      icon: 'ph-medal' },
  { id: 'syllabus',   label: 'Syllabus',                     icon: 'ph-book-open' },
  { id: 'newsletter', label: 'Newsletter',                   icon: 'ph-newspaper' },
];

const delayClass = (idx: number) => {
  if (idx % 3 === 0) return 'delay-100';
  if (idx % 3 === 1) return 'delay-200';
  return 'delay-300';
};

const DeptENTC: React.FC = () => {
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

          <span className="text-brand-gold font-semibold">Electronics &amp; Telecomm. Engg.</span>
        </nav>
        <div className="container mx-auto px-6 max-w-7xl relative z-10">

          <h1 className="font-display font-bold text-white leading-tight tracking-tight text-center">
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Electronics &amp; Telecommunication</span>
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-3 text-brand-gold font-semibold italic">Engineering</span>
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
                  <p className="mt-3 text-sm font-semibold text-slate-500">HOD Image Placeholder</p>
                  <p className="mt-1 text-xs text-slate-400">Add image later in this area</p>
                </div>
                <p className="mt-4 text-2xl font-bold text-brand-navy">Dr. Amrita Ruperee</p>
                <p className="mt-1 text-sm font-semibold text-brand-gold">Professor &amp; Head of Department</p>
              </div>
              <div className="space-y-6 text-slate-600 leading-8 text-left">
                <p>
                  The Department of Electronics and Telecommunication Engineering (EXTC) was established in the year 1994 with the aim of providing state of the art education in the field of Electronics and Telecommunication Engineering. Since then, the department has evolved to match the ever-changing needs of the industry with highly qualified faculty members and staff.
                </p>
                <p>
                  We provide Undergraduate program with an intake of 60 seats. Ensuring the efforts for continuous development the Department is accredited by National Board of Accreditation (NBA) from 2012-2015, reaccredited from July 2022 to June 2025 and is permanently affiliated to University of Mumbai.
                </p>
                <p>
                  The department is equipped with the state-of-the-art laboratories with advance equipment and recent software for academic studies and research along with industry labs set up by Texas Instruments. Highly qualified and experienced faculty members (more than 15 years) are the greatest asset to the department. To make the teaching-learning process interesting and interactive the faculty uses various instructional pedagogies, innovative techniques, and ICT tools.
                </p>
                <p>
                  Department is also associated with international and national students&apos; chapters like IEEE and IETE. Department in association with student chapters, regularly conducts various activities on emerging technology trends. The department strives for all round development of the students by implementing Outcome Based Education systems with regular focus on extra-curricular activities like sports, cultural events, and technical events along with academic schedule.
                </p>
                <p>
                  Department has signed MOUs with 12 industries, enhancing placement support, and fostering career growth of students. The Department encourages industry projects, Internships and organizes industrial visits with the aim of providing practical learning opportunities essential for student development and allowing to experience the working environment and gain awareness of industry standards. The consistent placements in renowned national and international Companies have enabled the students to contribute their skills and knowledge globally.
                </p>
              </div>
            </section>
          )}

          {/* ════ VISION & MISSION ═════════════════════════════════ */}
          {activeId === 'vision' && (
            <div className="space-y-16">
              <div className="reveal flex items-center gap-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Electronics &amp; Telecommunication Engineering</span>
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
                      "To contrive educational and research environment to serve industry and society needs in the field of electronics and telecommunication engineering."
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div className="h-px flex-1 bg-white/10" />
                      <span className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-semibold">VCET · Electronics &amp; Telecomm. Engg.</span>
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
                      <span>To enrich soft skills, ethical values, environmental and societal awareness.</span>
                    </li>
                    <li className="flex items-start gap-3 rounded-xl border border-slate-200 bg-brand-navylight/35 px-4 py-3 text-slate-700 leading-7">
                      <span className="mt-2 h-2 w-2 rounded-full bg-brand-navy flex-shrink-0" />
                      <span>To develop technical proficiency through projects and laboratory work.</span>
                    </li>
                    <li className="flex items-start gap-3 rounded-xl border border-slate-200 bg-brand-navylight/35 px-4 py-3 text-slate-700 leading-7">
                      <span className="mt-2 h-2 w-2 rounded-full bg-brand-navy flex-shrink-0" />
                      <span>To encourage students for lifelong learning through interaction with outside world.</span>
                    </li>
                  </ul>
                </section>
              </section>
            </div>
          )}

          {/* ════ DAB ══════════════════════════════════════════════ */}
          {activeId === 'dab' && (() => {
            const members = [
              { sr: 1, name: 'Dr. Rakesh Himte', designation: 'Principal', org: 'VCET, Vasai', role: 'Principal', tag: 'internal' },
              { sr: 2, name: 'Dr. Vikas Gupta', designation: 'Dean Academics, VCET, Vasai', org: 'VCET, Vasai', role: 'Dean Academics', tag: 'internal' },
              { sr: 3, name: 'Dr. Amrita Ruperee', designation: 'HOD, EXTC, (VCET, Vasai)', org: 'HOD, EXTC, (VCET, Vasai)', role: 'HOD', tag: 'internal' },
              { sr: 4, name: 'Mr. Suhas Kulkarni', designation: 'General Manager Operations', org: 'Remi Elecrotehnik Ltd, Vasai', role: 'Industry Representative', tag: 'industry' },
              { sr: 5, name: 'Mr. Ramesh Titre', designation: 'Asst. Vice President HR & Admin', org: 'Parle Global Technologies Pvt. Ltd., Vasai (E)', role: 'Industry Representative', tag: 'industry' },
              { sr: 6, name: 'Ms. Swarupa Patankar', designation: 'Senior Manager', org: 'L & T Infotech, Mumbai', role: 'Industry Representative', tag: 'industry' },
              { sr: 7, name: 'Dr. Santoshi Pote', designation: 'Associate Professor', org: 'SNDT Women’s University, Mumbai', role: 'Academic Representative', tag: 'academic' },
              { sr: 8, name: 'Mr. Suyog Patil', designation: 'Parent Representative', org: '-', role: 'Parent Representative', tag: 'parent' },
              { sr: 9, name: 'Mr. Rajas Patil', designation: 'Embedded Software Engineer', org: 'Faurecia Clarion Electronics, Pune', role: 'Alumni Representative', tag: 'academic' },
              { sr: 10, name: 'Dr. Sunayana Jadhav', designation: 'Secretary (DAB), Asst. Professor, VCET, Vasai', org: 'VCET, Vasai', role: 'Secretary', tag: 'internal' },
              { sr: 11, name: 'Mr. Umesh Upadhyay', designation: 'TE Student', org: 'VCET, Vasai', role: 'Student Representative', tag: 'student' },
              { sr: 12, name: 'Mr. Aditya Pal', designation: 'Parent Representative, Plant Head', org: 'Sridevi Tools Pvt. Ltd., Vasai East', role: 'Parent Representative', tag: 'parent' },
            ];
            const tagStyle: Record<string, string> = { internal: 'bg-brand-navylight text-brand-navy', academic: 'bg-blue-50 text-blue-700', industry: 'bg-amber-50 text-amber-700', student: 'bg-emerald-50 text-emerald-700', parent: 'bg-purple-50 text-purple-700' };
            return (
              <div className="space-y-10">
                <div className="reveal">
                  <div className="flex items-center gap-3 mb-4"><span className="w-8 h-px bg-brand-gold" /><span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Electronics &amp; Telecomm. Engineering</span></div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy leading-tight">Departmental Advisory Board<span className="text-brand-gold"> (DAB)</span></h2>
                  <p className="mt-3 text-slate-600 leading-7">
                    The Departmental Advisory Board (DAB) has been formed with the purpose of remaining up to date with the latest requirements of the industry, academics and incorporating necessary components in the curricular and extracurricular activities.
                  </p>
                  <p className="mt-2 text-slate-600 leading-7">
                    The DAB is composed of representative members from eminent institutions, industry, alumni, parents, students and faculty of the department. Following are the members of the committee the three consecutive academic year starting from 2020-21.
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
              'The graduates will exhibit knowledge of mathematics, science, electronics, and communication, and will be able to apply the same in diversified field.',
              'The graduates will develop a habit of continuous learning while working in multidisciplinary environment.',
              'The graduates will grow as an individual with proficiency in technical skills, ethical values, communication skills, teamwork and professionalism.',
            ];
            const psos = [
              { n: 'PSO1', text: 'To apply the knowledge of Electronics and Communication to analyse, design and implement application specific problems with modern tools.' },
              { n: 'PSO2', text: 'Adapt emerging technologies with continuous learning in the field of electronics and telecommunication engineering with appropriate solutions to real life problems.' },
            ];
            return (
              <div className="space-y-16">
                <div className="reveal">
                  <div className="flex items-center gap-3 mb-4"><span className="w-8 h-px bg-brand-gold" /><span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Electronics &amp; Telecomm. Engg.</span></div>
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
                  <div><p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">EXTC Specific</p><h3 className="text-2xl font-display font-bold text-brand-navy leading-tight">Program Specific Outcomes (PSOs)</h3></div>
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
          {activeId === 'faculty' && <DepartmentFacultySection departmentName="Electronics & Telecommunication" />}

          {/* ════ PAQIC ═══════════════════════════════════════════ */}
          {activeId === 'paqic' && (() => {
            const members = [
              'Dr. Amrita Ruperee, Professor, HOD EXTC (Chairman)',
              'Dr. Vikas Gupta, Professor, Dean of Academics',
              'Dr. Sunayana Jadhav, Associate Professor, EXTC Department',
              'Dr. Megha Trivedi, HOD, Computer Engineering Department',
              'Dr. Ashish Vanmali, Associate Professor, EXTC Department',
              'Mrs. Trupti Shah, Assistant Professor, EXTC Department (Coordinator)',
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
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Electronics &amp; Telecommunication Engineering</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy relative inline-block">PAQIC<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
                <p className="text-slate-600 leading-7">The composition of the PAQIC Committee of Electronics &amp; Telecommunication Engineering department for the academic year 2022-23 is as follows:</p>
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
              { label: 'MoU with IIoTExpert', url: 'https://iiotexpert.com/' },
              { label: 'MoUs Document', url: 'https://vcet.edu.in/wp-content/uploads/2025/04/MoU_Final_4_Dec2024_website-2.pdf' },
              { label: 'Research Agreement with BITS Hyderabad', url: 'https://vcet.edu.in/wp-content/uploads/2024/05/CamScanner-05-30-2024-09.31.30.pdf' },
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Electronics &amp; Telecommunication Engineering</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">MoUs<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
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

          {/* ════ STUDENT ACHIEVEMENTS ═══════════════════════════ */}
          {activeId === 'student-achievements' && (() => {
            const links = [
              { label: 'Student Achievements 2024-25', url: 'https://vcet.edu.in/wp-content/uploads/2025/04/students-Achievement-24-25.pdf' },
              { label: 'Outreach Activity', url: 'https://vcet.edu.in/wp-content/uploads/2025/04/achievemnets-18_3_25-2.pdf' },
              { label: 'Best Outgoing', url: 'https://vcet.edu.in/wp-content/uploads/2024/04/best-outgoing.pdf' },
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Electronics &amp; Telecommunication Engineering</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Student Achievements<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
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

          {/* ════ INFRASTRUCTURE ═════════════════════════════════ */}
          {activeId === 'infrastructure' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Electronics &amp; Telecommunication Engineering</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Infrastructure<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Microwave And Antenna Laboratory',
                    details: [],
                  },
                  {
                    title: 'Signal Processing Laboratory',
                    details: [],
                  },
                  {
                    title: 'Project Laboratory',
                    details: [
                      'Basic Electrical Laboratory',
                      'Basic Electrical Laboratory',
                      'Basic Electrical Laboratory',
                      'Basic Electrical Laboratory',
                      'Basic',
                      'Basic Electrical Laboratory',
                    ],
                  },
                  {
                    title: 'Embedded System and VLSI Laboratory',
                    details: [],
                  },
                  {
                    title: 'Software Simulation Laboratory',
                    details: [],
                  },
                  {
                    title: 'Communication Laboratory',
                    details: [
                      'ecl',
                      'Signal Processing Laboratory',
                      'Electronics Circuit Laboratory',
                    ],
                  },
                ].map((lab, idx) => (
                  <article key={`${lab.title}-${idx}`} className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                    <div className="aspect-[16/10] w-full border-b border-slate-200 bg-slate-100 flex flex-col items-center justify-center text-slate-400">
                      <i className="ph ph-image text-4xl" />
                      <p className="mt-2 text-sm font-semibold">Image Holder {idx + 1}</p>
                    </div>
                    <div className="p-4">
                      <h4 className="text-base font-bold text-brand-navy leading-6">{lab.title}</h4>
                      {lab.details.length > 0 && (
                        <div className="mt-3 space-y-1 text-sm text-slate-600">
                          {lab.details.map((line, lineIdx) => (
                            <p key={`${lab.title}-line-${lineIdx}`}>{line}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* ════ TOPPERS ════════════════════════════════════════ */}
          {activeId === 'toppers' && (() => {
            const toppersList1 = {
              SE: ['Taru Sonal Arun (SGPI-9.40)', 'Chavan Pranav S. (SGPI-9.09)', 'Pal Aditya H. (SGPI-8.82)'],
              TE: ['Shimpi Harsh (SGPI-8.86)', 'Mote Rashmi Prakash (SGPI-8.72)', 'More Sakshi (SGPI-8.71)'],
              BE: ['Patil Vijay R. (CGPI-9.41)', 'Kargatia Nikhil P. (CGPI-9.25)', 'Parmar Hetsi (CGPI-8.96)', 'Tandel Dhanashree (CGPI-8.96)'],
            };
            const toppers2324 = {
              SE: ['Solanki Harsh (SGPI-9.09)', 'Mote Rashmi P. (SGPI-8.57)', 'Wadekar Kaushal P. (SGPI-8.32)'],
              TE: ['Patil Vijay R. (SGPI-9.25)', 'Kargatia Nikhil P. (SGPI-8.92)', 'Tandel Dhanashree A. (SGPI-8.77)'],
              BE: ['Raut Kushal Dipak (CGPI-9.38)', 'Riddhesh Vanjara (CGPI-9.35)', 'Dodiya Harsh (CGPI-9.34)'],
            };
            const toppers2122 = {
              SE: ['Solanki Harsh (SGPI-9.09)', 'Mote Rashmi P. (SGPI-8.57)', 'Wadekar Kaushal P. (SGPI-8.32)'],
              TE: ['Patil Vijay R. (SGPI-9.25)', 'Kargatia Nikhil P. (SGPI-8.92)', 'Tandel Dhanashree A. (SGPI-8.77)'],
              BE: ['Raut Kushal Dipak (CGPI-9.38)', 'Dodiya Harsh Nitesh (CGPI-9.34)', 'Nalanda Patil (CGPI-8.98)'],
            };
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 space-y-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Electronics &amp; Telecommunication Engineering</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy relative inline-block">Toppers<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>

                <div>
                  <h4 className="text-base font-bold text-brand-navy mb-3">Toppers (As Listed)</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead><tr className="bg-brand-navy text-white"><th className="px-4 py-3 text-left">SE</th><th className="px-4 py-3 text-left">TE</th><th className="px-4 py-3 text-left">BE</th></tr></thead>
                      <tbody>
                        {[0, 1, 2, 3].map((i) => (
                          <tr key={`t1-${i}`} className="border-t border-slate-100">
                            <td className="px-4 py-3 text-slate-600">{toppersList1.SE[i] ?? '-'}</td>
                            <td className="px-4 py-3 text-slate-600">{toppersList1.TE[i] ?? '-'}</td>
                            <td className="px-4 py-3 text-slate-600">{toppersList1.BE[i] ?? '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-bold text-brand-navy mb-3">Toppers: 23-24</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead><tr className="bg-brand-navy text-white"><th className="px-4 py-3 text-left">SE</th><th className="px-4 py-3 text-left">TE</th><th className="px-4 py-3 text-left">BE</th></tr></thead>
                      <tbody>
                        {[0, 1, 2].map((i) => (
                          <tr key={`t2324-${i}`} className="border-t border-slate-100">
                            <td className="px-4 py-3 text-slate-600">{toppers2324.SE[i]}</td>
                            <td className="px-4 py-3 text-slate-600">{toppers2324.TE[i]}</td>
                            <td className="px-4 py-3 text-slate-600">{toppers2324.BE[i]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-bold text-brand-navy mb-3">Toppers: 22-23</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead><tr className="bg-brand-navy text-white"><th className="px-4 py-3 text-left">SE</th><th className="px-4 py-3 text-left">TE</th><th className="px-4 py-3 text-left">BE</th></tr></thead>
                      <tbody>
                        {[0, 1, 2].map((i) => (
                          <tr key={`t2223-${i}`} className="border-t border-slate-100">
                            <td className="px-4 py-3 text-slate-600">{toppers2324.SE[i]}</td>
                            <td className="px-4 py-3 text-slate-600">{toppers2324.TE[i]}</td>
                            <td className="px-4 py-3 text-slate-600">{toppers2324.BE[i]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-bold text-brand-navy mb-3">Toppers: 21-22</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead><tr className="bg-brand-navy text-white"><th className="px-4 py-3 text-left">SE</th><th className="px-4 py-3 text-left">TE</th><th className="px-4 py-3 text-left">BE</th></tr></thead>
                      <tbody>
                        {[0, 1, 2].map((i) => (
                          <tr key={`t2122-${i}`} className="border-t border-slate-100">
                            <td className="px-4 py-3 text-slate-600">{toppers2122.SE[i]}</td>
                            <td className="px-4 py-3 text-slate-600">{toppers2122.TE[i]}</td>
                            <td className="px-4 py-3 text-slate-600">{toppers2122.BE[i]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            );
          })()}

          {/* ════ SYLLABUS ═══════════════════════════════════════ */}
          {activeId === 'syllabus' && (() => {
            const links = [
              { label: 'Syllabus R19 (SE)', url: 'https://vcet.edu.in/wp-content/uploads/2022/08/SE_EXTC_2019-20.pdf' },
              { label: 'Syllabus R19 (TE)', url: 'https://vcet.edu.in/wp-content/uploads/2022/01/TE_EXTC-1.pdf' },
              { label: 'Syllabus R19 (BE)', url: 'https://vcet.edu.in/wp-content/uploads/2022/07/Corrected-Final-BE-EXTC-R2019-Syllabus.pdf' },
              { label: 'PO PSO CO (R16)', url: 'https://vcet.edu.in/wp-content/uploads/2021/11/R16-EXTC-PO_PSO_CO_R16.pdf' },
              { label: 'PO PSO CO (R19)', url: 'https://vcet.edu.in/wp-content/uploads/2024/05/CO-PO-PSO_EXTC_REv-2019_final.pdf' },
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Electronics &amp; Telecommunication Engineering</span>
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

          {/* ════ TIME TABLE ═════════════════════════════════════ */}
          {activeId === 'time-table' && (() => {
            const links = [
              { label: 'Time Table 2024-25 Even Sem', url: 'https://vcet.edu.in/wp-content/uploads/2025/04/Master-timetable-Even-sem-24-25.jpg' },
              { label: 'Time Table 2024-25 Odd Sem', url: 'https://vcet.edu.in/wp-content/uploads/2025/04/Master-timetable-Odd-sem-24-25.jpg' },
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Electronics &amp; Telecommunication Engineering</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Time Table<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
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

          {/* ════ INNOVATIONS IN TEACHING LEARNING ══════════════ */}
          {activeId === 'teaching-learning' && (() => {
            const links = [
              { label: 'Innovation in Teaching Learning (2020-21)', url: 'https://vcet.edu.in/wp-content/uploads/2022/08/Innovation-in-teaching-learning_20-21.pdf' },
              { label: 'Innovation in Teaching Learning (2021-22)', url: 'https://vcet.edu.in/wp-content/uploads/2022/08/Innovation-in-teaching-learning_21-22.pdf' },
              { label: 'Innovation in Teaching Learning (2022-23)', url: 'https://vcet.edu.in/wp-content/uploads/2024/04/5.5-Innovation-in-Teaching-learning_final.pdf' },
              { label: 'Innovation in Teaching Learning (2024-25)', url: 'https://vcet.edu.in/wp-content/uploads/2025/05/Innovation-in-Teaching-learning_2024-25.pdf' },
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Electronics &amp; Telecommunication Engineering</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Innovations in Teaching Learning<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
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

          {/* ════ NEWSLETTER & MAGAZINE ══════════════════════════ */}
          {activeId === 'newsletter' && (
            <NewsletterSection departmentName="Electronics and Telecommunication Engineering" departmentId="7" />
          )}

          {/* ════ DISTINGUISHED ALUMNI ═══════════════════════════ */}
          {activeId === 'distinguished-alumni' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Electronics &amp; Telecommunication Engineering</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Distinguished Alumni<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
              <a href="https://vcet.edu.in/wp-content/uploads/2024/06/Distinguished-Alumni.pdf" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gold hover:bg-brand-navylight transition-colors">
                <span>Distinguished Alumni</span>
                <i className="ph ph-arrow-up-right text-brand-gold" />
              </a>
            </section>
          )}

          {/* ════ OTHER SECTIONS (placeholder) ════════════════════ */}
          {activeId !== 'about' && activeId !== 'vision' && activeId !== 'dab' && activeId !== 'peo' && activeId !== 'faculty' && activeId !== 'paqic' && activeId !== 'mou' && activeId !== 'student-achievements' && activeId !== 'infrastructure' && activeId !== 'toppers' && activeId !== 'syllabus' && activeId !== 'time-table' && activeId !== 'teaching-learning' && activeId !== 'newsletter' && activeId !== 'distinguished-alumni' && (
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

export default DeptENTC;
