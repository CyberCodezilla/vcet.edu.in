import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import DepartmentFacultySection from '../../components/DepartmentFacultySection';

/* ── Sidebar navigation links ─────────────────────────────── */
const sidebarLinks = [
  { id: 'about',        label: 'About',                        icon: 'ph-info' },
  { id: 'vision',       label: 'Vision and Mission',           icon: 'ph-target' },
  { id: 'dab',          label: 'Departmental Advisory Board',  icon: 'ph-users-three' },
  { id: 'mou',          label: 'MoU',                          icon: 'ph-handshake' },
  { id: 'patent',       label: 'Patent',                       icon: 'ph-certificate' },
  { id: 'peo',          label: 'POs, PEOs, PSOs',              icon: 'ph-chart-bar' },
  { id: 'faculty',      label: 'Faculty',                      icon: 'ph-chalkboard-teacher' },
  { id: 'paqic',        label: 'PAQIC',                        icon: 'ph-clipboard-text' },
  { id: 'infrastructure', label: 'Infrastructure',             icon: 'ph-buildings' },
  { id: 'teaching-learning', label: 'Innovations in Teaching Learning', icon: 'ph-lightbulb' },
  { id: 'time-table',   label: 'Time Table',                   icon: 'ph-calendar' },
  { id: 'toppers',      label: 'Toppers',                      icon: 'ph-medal' },
  { id: 'syllabus',     label: 'Syllabus',                     icon: 'ph-book-open' },
  { id: 'newsletter',   label: 'Newsletter',                   icon: 'ph-newspaper' },
];

const delayClass = (idx: number) => {
  if (idx % 3 === 0) return 'delay-100';
  if (idx % 3 === 1) return 'delay-200';
  return 'delay-300';
};

/* ── Component ─────────────────────────────────────────────── */
const DeptComputerEngg: React.FC = () => {
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
      <header className="relative bg-gradient-to-r from-brand-navy to-slate-800 pt-24 md:pt-28 pb-12 md:pb-16 overflow-hidden shadow-lg border-b-4 border-brand-gold">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white opacity-5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-64 h-64 rounded-full bg-brand-gold opacity-10 blur-2xl pointer-events-none" />
        <nav className="absolute top-6 left-6 z-20 flex items-center space-x-2 text-sm font-medium text-white/70">
          <Link to="/" className="hover:text-brand-gold transition-colors duration-200 flex items-center"><i className="ph ph-house text-base" /></Link>
          <i className="ph ph-caret-right text-xs" />
          <span className="text-brand-gold font-semibold">Computer Engineering</span>
        </nav>
        <div className="container mx-auto px-6 max-w-7xl relative z-10">

          <h1 className="font-display font-bold text-white leading-tight tracking-tight text-center">
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Computer Engineering</span>
          </h1>
        </div>
      </header>

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

          {/* ════ ABOUT ═════════════════════════════════════════ */}
          {activeId === 'about' && (
            <>
              {/* dept info */}
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="space-y-6 text-slate-600 leading-8 text-left">
                  <p className="text-lg font-bold text-brand-navy">Dr. Megha Trivedi, Associate Professor &amp; Head Of Department</p>
                  <p>
                    The Department of Computer Engineering was established in the year 1999 to impart knowledge and develop practical
                    skills in various areas of computer engineering. The Department offers an undergraduate program in Computer Engineering
                    with a current intake of 180 seats. The Department was accredited by the National Board of Accreditation (NBA) from
                    2012–2015, reaccredited from July 2022 to June 2025, and is permanently affiliated with the University of Mumbai.
                  </p>
                  <p>
                    The Department has expert and well-trained human resources and state-of-the-art laboratories to impart domain-specific
                    knowledge in the areas of programming, database management, operating systems, web development, networking, artificial
                    intelligence, machine learning, deep learning, etc. The faculty uses various instructional pedagogies, innovative
                    techniques, and ICT tools to enhance the teaching-learning process.
                  </p>
                  <p>
                    The Department motivates its students to participate in co-curricular and extra-curricular activities essential for the
                    development and nurturing of team spirit and organizational skills. The Department is associated with the Computer
                    Society of India (CSI). The Department has a local Code-Chef chapter, Bit-Byte-Go, which provides a peer learning
                    platform to develop coding skills.
                  </p>
                  <p>
                    The Department also has a student-driven Android Application Development Club, a Meta-Club, and a Microsoft Learn
                    Students Club to foster peer learning and skill development. The Department publishes a newsletter, an e-magazine,
                    and a wall magazine designed by students, which encompasses articles contributed by students and faculty.
                  </p>
                  <p>
                    Various self-learning opportunities are provided to the students through platforms such as e-Yantra Robotics Laboratory
                    (in association with IIT Bombay), Virtual Laboratory, Infosys Springboard and Swayam. The Department encourages students
                    for IPR activities such as publications, copyrights and patents, and provides placement and higher studies support.
                  </p>
                  <p>
                    The Department provides opportunities for industrial exposure through internships, guest lectures, seminars, workshops,
                    industrial projects, product development, and MoU activities. The Department also has strong alumni connections through
                    social media and professional platforms.
                  </p>
                </div>
              </section>

            </>
          )}

          {/* ════ VISION & MISSION ══════════════════════════════ */}
          {activeId === 'vision' && (
            <div className="space-y-16">
              <div className="reveal flex items-center gap-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Computer Engineering</span>
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
                      "To evolve as a center of excellence in the field of Computer Engineering to cater the industrial and societal needs."
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div className="h-px flex-1 bg-white/10" />
                      <span className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-semibold">VCET · Computer Engineering</span>
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
                  <div className="hidden md:flex items-center gap-2 text-slate-400 text-sm">
                    <i className="ph ph-arrow-down text-brand-gold" />
                    <span className="text-xs tracking-wide">3 Pillars</span>
                  </div>
                </div>
                <div className="h-px bg-gradient-to-r from-brand-gold via-brand-navylight to-transparent" />

                <section className="reveal bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 rounded-xl border border-slate-200 bg-brand-navylight/35 px-4 py-3 text-slate-700 leading-7">
                      <span className="mt-2 h-2 w-2 rounded-full bg-brand-navy flex-shrink-0" />
                      <span>To provide quality technical education with the aid of modern resources.</span>
                    </li>
                    <li className="flex items-start gap-3 rounded-xl border border-slate-200 bg-brand-navylight/35 px-4 py-3 text-slate-700 leading-7">
                      <span className="mt-2 h-2 w-2 rounded-full bg-brand-navy flex-shrink-0" />
                      <span>To inculcate creative thinking through innovative ideas and project development.</span>
                    </li>
                    <li className="flex items-start gap-3 rounded-xl border border-slate-200 bg-brand-navylight/35 px-4 py-3 text-slate-700 leading-7">
                      <span className="mt-2 h-2 w-2 rounded-full bg-brand-navy flex-shrink-0" />
                      <span>To encourage life-long learning, leadership skills, entrepreneur skills with ethical and moral values.</span>
                    </li>
                  </ul>
                </section>
              </section>
            </div>
          )}

          {/* ════ DAB ════════════════════════════════════════════ */}
          {activeId === 'dab' && (() => {
            const members = [
              { sr: 1, name: 'Dr. Rakesh Himte', designation: 'Principal', org: 'VCET, Vasai', role: 'Chairman', tag: 'internal' },
              { sr: 2, name: 'Dr. Vikas Gupta', designation: 'Dean, Academics', org: 'VCET, Vasai', role: 'Dean', tag: 'internal' },
              { sr: 3, name: 'Dr. Megha Trivedi', designation: 'HOD, Comps', org: 'VCET, Vasai', role: 'HOD', tag: 'internal' },
              { sr: 4, name: 'Dr. Swapna Borde', designation: 'Asst. Professor', org: 'VCET, Vasai', role: 'Sr. Faculty', tag: 'internal' },
              { sr: 5, name: 'Dr. Subhash Shinde', designation: 'Vice-Principal LTCOE & Member BOS, Comp Engg, UoM', org: 'University Representative', role: 'Academic Representative', tag: 'academic' },
              { sr: 6, name: 'Mr. Gaurav Ghelani', designation: 'Academic Relationship Manager India West & Central', org: 'TCS, Mumbai', role: 'Industry Representative', tag: 'industry' },
              { sr: 7, name: 'Mr. Sachin Sadre', designation: 'Founder/Director', org: 'Digital Dojo OPC Pvt. Ltd.', role: 'Industry Representative', tag: 'industry' },
              { sr: 8, name: 'Mr. Rahul Mhatre', designation: 'Senior Engineering Manager', org: 'SAG Banglore Tech. Ltd.', role: 'Industry Representative', tag: 'industry' },
              { sr: 9, name: 'Mr. Shailesh Jain', designation: 'Software Engineer', org: 'Walmart Labs India', role: 'Alumni Representative', tag: 'academic' },
              { sr: 10, name: 'Mr. Ritesh Puthran', designation: 'Associate Director', org: 'Cloud Solutions', role: 'Alumni Representative', tag: 'academic' },
              { sr: 11, name: 'Mr. Ayub Patel', designation: 'Educator', org: 'Vartak College, Vasai', role: 'Parent Representative', tag: 'parent' },
              { sr: 12, name: 'Ms. Akhila Anilkumar', designation: 'B.E. Computer Engineering', org: 'VCET, Vasai', role: 'Student Representative', tag: 'student' },
              { sr: 13, name: 'Mr. Aditya Lawate', designation: 'T.E. Computer Engineering', org: 'VCET, Vasai', role: 'Student Representative', tag: 'student' },
              { sr: 14, name: 'Dr. Anil Hingmire', designation: 'Assistant Professor', org: 'VCET, Vasai', role: 'Convener', tag: 'internal' },
            ];
            const tagStyle: Record<string, string> = {
              internal: 'bg-brand-navylight text-brand-navy',
              academic: 'bg-blue-50 text-blue-700',
              industry: 'bg-amber-50 text-amber-700',
              student:  'bg-emerald-50 text-emerald-700',
              parent:   'bg-purple-50 text-purple-700',
            };
            return (
              <div className="space-y-10">
                <div className="reveal">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-px bg-brand-gold" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Computer Engineering</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy leading-tight">
                    Departmental Advisory Board<span className="text-brand-gold"> (DAB)</span>
                  </h2>
                  <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6 shadow-md">
                    <p className="text-slate-600 leading-7">
                      The Departmental Advisory Board (DAB) has been formed with the purpose of remaining up to date with the latest requirements of the industry, academics and incorporating necessary components in the curricular and extracurricular activities.
                    </p>
                    <p className="mt-3 text-slate-600 leading-7">
                      The DAB is composed of representative members from eminent institutions, industry, alumni, parents, students and faculty of the department.
                    </p>
                    <div className="mt-3 flex items-start gap-2 text-slate-600 leading-7">
                      <i className="ph-fill ph-check-circle text-brand-gold text-base mt-1" />
                      <span>Following are the members of the committee for three consecutive academic year starting from 2021&#8209;22.</span>
                    </div>
                  </div>
                  <div className="mt-5 h-px bg-gradient-to-r from-brand-gold via-brand-navylight to-transparent" />
                </div>
                <div className="reveal bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-brand-navy text-white">
                          {['Sr.', 'Name', 'Designation', 'Organisation', 'Role in DAB'].map(h => (
                            <th key={h} className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-widest">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {members.map((m, idx) => (
                          <tr key={m.sr} className={`border-t border-slate-100 hover:bg-brand-navylight/40 transition-colors duration-150 ${idx % 2 === 1 ? 'bg-slate-50/60' : 'bg-white'}`}>
                            <td className="px-4 py-4 font-bold text-brand-navy/40 text-xs">{String(m.sr).padStart(2, '0')}</td>
                            <td className="px-4 py-4 font-semibold text-brand-navy whitespace-nowrap">{m.name}</td>
                            <td className="px-4 py-4 text-slate-600">{m.designation}</td>
                            <td className="px-4 py-4 text-slate-600">{m.org}</td>
                            <td className="px-4 py-4">
                              <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap ${tagStyle[m.tag]}`}>{m.role}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ════ POs, PEOs & PSOs ══════════════════════════════ */}
          {activeId === 'peo' && (() => {
            const pos = [
              { n: '01', text: 'An ability to apply knowledge of mathematics, science, and engineering.' },
              { n: '02', text: 'An ability to design and conduct experiments, as well as to analyze and interpret data.' },
              { n: '03', text: 'An ability to design a system, component, or process to meet desired needs within realistic constraints.' },
              { n: '04', text: 'An ability to identify, formulate, and solve engineering problems.' },
              { n: '05', text: 'An ability to use the techniques, skills, and modern engineering tools necessary for engineering practice.' },
              { n: '06', text: 'Knowledge of contemporary issues.' },
              { n: '07', text: 'The broad education necessary to understand the impact of engineering solutions in a global, economic, environmental and societal context.' },
              { n: '08', text: 'An understanding of professional and ethical responsibility.' },
              { n: '09', text: 'An ability to function in multidisciplinary teams.' },
              { n: '10', text: 'An ability to communicate effectively.' },
              { n: '11', text: 'Recognition of the need for, and an ability to engage in life-long learning.' },
              { n: '12', text: 'An understanding of engineering and management principles and the ability to apply these to manage projects in multidisciplinary environments.' },
            ];
            const psos = [
              { n: 'PSO1', text: 'Analyze problems and design applications of database, networking, security, web technology, cloud computing and machine learning using mathematical skills and computational tools.' },
              { n: 'PSO2', text: 'Develop computer-based systems to provide solutions for organizational and societal problems by working in multidisciplinary teams and pursuing a career in the IT industry.' },
            ];
            const peos = [
              'To facilitate learners with a sound foundation in mathematical, scientific and engineering fundamentals to accomplish professional excellence and succeed in higher studies in the computer engineering domain.',
              'To enable learners to use modern tools effectively to solve real life problems in the field of computer engineering.',
              'To equip learners with extensive education necessary to understand the impact of computer technology in a global and social context.',
              'To inculcate professional and ethical attitude, leadership qualities, commitment to societal responsibilities and prepare learners for life-long learning to build a successful career in Computer Engineering.',
            ];
            return (
              <div className="space-y-16">
                <div className="reveal">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-px bg-brand-gold" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Computer Engineering</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy">POs, PEOs &amp; PSOs</h2>
                  <div className="mt-4 h-px bg-gradient-to-r from-brand-gold via-brand-navylight to-transparent" />
                </div>
                <section className="reveal space-y-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">12 Outcomes</p>
                    <h3 className="text-2xl font-display font-bold text-brand-navy leading-tight">Program Outcomes (POs)</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {pos.map((po, idx) => (
                      <div
                        key={po.n}
                        className={`reveal ${delayClass(idx)} flex gap-4 items-start rounded-xl border border-slate-200 bg-slate-50/70 px-5 py-4`}
                      >
                        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-brand-navylight text-[11px] font-bold text-brand-navy">
                          {po.n}
                        </span>
                        <p className="pt-1 text-sm leading-relaxed text-slate-700">{po.text}</p>
                      </div>
                    ))}
                  </div>
                </section>
                <section className="reveal">
                  <div className="relative rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg,#0d2d56 0%,#1a4b7c 100%)' }}>
                    <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
                    <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(253,184,19,0.12) 0%,transparent 70%)' }} />
                    <div className="relative z-10 p-8 md:p-10">
                      <div className="max-w-4xl">
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold/80 mb-1">Objectives</p>
                        <h3 className="text-2xl font-display font-bold text-white mb-2">Program Educational Objectives (PEOs)</h3>
                        <ul className="space-y-2 pl-5 text-sm leading-relaxed text-white/85 list-disc">
                          {peos.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="reveal space-y-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">Computer Engineering Specific</p>
                    <h3 className="text-2xl font-display font-bold text-brand-navy leading-tight">Program Specific Outcomes (PSOs)</h3>
                  </div>
                  <div className="space-y-3">
                    {psos.map((pso) => (
                      <div key={pso.n} className="rounded-xl border border-slate-200 bg-white px-5 py-4">
                        <p className="mb-1 text-sm font-bold text-brand-navy">{pso.n}</p>
                        <p className="text-sm leading-relaxed text-slate-700">{pso.text}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            );
          })()}

          {/* ════ FACULTY ════════════════════════════════════════ */}
          {activeId === 'faculty' && <DepartmentFacultySection departmentName="Computer Engineering" />}

          {/* ════ PAQIC ════════════════════════════════════════ */}
          {activeId === 'paqic' && (() => {
            const members = [
              'Dr. Megha Trivedi, Head, Department of Computer Engineering (Chairperson)',
              'Dr. Anil Hingmire, Department of Computer Engineering',
              'Dr. Uday Aswalekar, Head, Department of Mechanical Engineering',
              'Dr. Ashish Vanmali, Associate Professor, EXTC Department',
              'Ms. Sneha Mhatre, Department of Computer Engineering (Coordinator)',
            ];
            const roles = [
              'Devise Standard Operating Procedure for assessment and evaluation of Outcome Based Education (OBE) for the program.',
              'Confirm linkage of PO, PSO and CO with institute and department vision and mission.',
              'Review assessment data periodically and identify gaps/shortfalls in the program.',
              'Recommend action plans to bridge gaps and monitor implementation.',
              'Review quality and relevance of assessment processes and tools for attainment of COs, POs and PSOs.',
              'Prepare compliance reports as per accreditation requirements.',
              'Periodically revise Program Educational Objectives (PEOs), PSOs, etc.',
              'PAQIC Coordinator schedules meetings, records minutes, and compiles action taken reports.',
            ];
            return (
              <div className="space-y-8">
                <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-px bg-brand-gold" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Computer Engineering</span>
                  </div>
                  <h3 className="text-2xl font-bold text-brand-navy mb-4 relative inline-block">Program Assessment and Quality Improvement Committee (PAQIC)<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
                  <p className="text-slate-600 leading-7">Frequency of meeting: Minimum 2 per academic year.</p>
                </section>
                <section className="reveal bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
                  <h4 className="text-xl font-bold text-brand-navy mb-4">Members</h4>
                  <ul className="list-disc pl-6 text-slate-600 space-y-2">
                    {members.map((m) => (<li key={m}>{m}</li>))}
                  </ul>
                </section>
                <section className="reveal bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
                  <h4 className="text-xl font-bold text-brand-navy mb-4">Roles and Responsibilities</h4>
                  <ul className="list-disc pl-6 text-slate-600 space-y-2">
                    {roles.map((r) => (<li key={r}>{r}</li>))}
                  </ul>
                </section>
              </div>
            );
          })()}

          {/* ════ INFRASTRUCTURE ═══════════════════════════════ */}
          {activeId === 'infrastructure' && (() => {
            const labs = [
              { name: 'Programming Lab', incharge: 'Dr. Sneha Mhatre & Ms. Joyce D\'Souza', pcs: '20', software: 'Windows 11, Ubuntu Linux, TC, Java, Google Chrome' },
              { name: 'Project & Research Lab', incharge: 'Dr. Anil Hingmire & Ms. Brinal Colaco', pcs: '16 + 6 GPU systems', software: 'Windows 11, Ubuntu Linux, TC, Java, Google Chrome' },
              { name: 'AI & Advanced Technology Lab', incharge: 'Dr. Swapna Borde & Ms. Soniya Khatu', pcs: '19 GPU systems', software: 'Windows 11, Ubuntu Linux, TC, Java, Google Chrome' },
              { name: 'Database Lab', incharge: 'Ms. Smita Jawale & Ms. Bhakti Jadhav', pcs: '21 + HP Server 01', software: 'Windows 11, Ubuntu Linux, TC, Java, Google Chrome' },
              { name: 'Network & Security Lab', incharge: 'Dr. Dinesh Patil & Dr. Swati Varma', pcs: '20', software: 'Windows 11, Kali Linux, TC, Java, Google Chrome' },
              { name: 'Software Development Lab', incharge: 'Mr. Sunil Katkar & Ms. Vinal Waghela', pcs: '20', software: 'Windows 11, Ubuntu Linux, TC, Java, Google Chrome' },
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Computer Engineering</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Infrastructure<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
                <p className="text-slate-600 mb-6">All labs are equipped with internet-enabled systems, licensed software, LCD projector, printer, and network switch. Department conference room is also available.</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {labs.map((lab, idx) => (
                    <div key={lab.name} className={`reveal ${delayClass(idx)} border border-slate-200 rounded-2xl p-5 bg-slate-50/50`}>
                      <h4 className="text-lg font-bold text-brand-navy">LAB {String(idx + 1).padStart(2, '0')} - {lab.name}</h4>
                      <p className="text-sm text-slate-600 mt-2"><strong>Lab In-Charge:</strong> {lab.incharge}</p>
                      <p className="text-sm text-slate-600"><strong>Hardware:</strong> HP Core i5 systems ({lab.pcs})</p>
                      <p className="text-sm text-slate-600"><strong>Software:</strong> {lab.software}</p>
                    </div>
                  ))}
                </div>
              </section>
            );
          })()}

          {/* ════ TOPPERS ══════════════════════════════════════ */}
          {activeId === 'toppers' && (() => {
            const toppers = {
              SE: ['Yadav Rishiraj - 9.51', 'Barve Smit - 9.49', 'Yadav Visha - 9.48'],
              TE: ['Chavan Yash - 9.74', 'Bargude Vivek - 9.61', 'Borhade Shruti - 9.52'],
              BE: ['Bhandigare Nishant Tanaji - 9.51', 'Gharat Swara Narottam - 9.49', 'Patil Bramhati Shailesh - 9.32'],
            };
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Computer Engineering</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Toppers (2024-25)<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
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

          {/* ════ SYLLABUS ═════════════════════════════════════ */}
          {activeId === 'syllabus' && (() => {
            const links = [
              { label: 'SE - R16 Syllabus', url: 'https://vcet.edu.in/wp-content/uploads/2021/11/SE-Comps_CBCGS_Syllabus.pdf' },
              { label: 'TE / BE - R16 Syllabus', url: 'https://vcet.edu.in/wp-content/uploads/2021/11/TE_BE-Comp_Engg_CBCGS_Syllabus.pdf' },
              { label: 'BE - R12 Syllabus', url: 'https://vcet.edu.in/wp-content/uploads/2021/11/BE-Comps_VII_VIII_Syllabus-1.pdf' },
              { label: 'First Year - R19 Syllabus', url: 'https://vcet.edu.in/wp-content/uploads/2023/07/FE-Final-Syllabus-R19.pdf' },
              { label: 'SE - R19 Syllabus', url: 'https://vcet.edu.in/wp-content/uploads/2023/06/SE-C-scheme-syllabus-Computer-Engg.pdf' },
              { label: 'TE - R19 Syllabus', url: 'https://vcet.edu.in/wp-content/uploads/2023/06/T.E.-C-scheme-syllabus-Computer-Engg.pdf' },
              { label: 'BE - R19 Syllabus', url: 'https://vcet.edu.in/wp-content/uploads/2023/06/B.E.-C-scheme-syllabus-Computer-Engg.pdf' },
              { label: 'First Year (NEP) 2024-25', url: 'https://vcet.edu.in/wp-content/uploads/2025/01/First-Year-Engineering-All-Branches-Scheme-Syllabus-Sem-I-and-Sem-II-Final-1-July-2024-25-1.pdf' },
              { label: 'Honours & Minor Degree Program (Data Science)', url: 'https://vcet.edu.in/wp-content/uploads/2023/07/Honours-Minor-Degree-Program-Data-Science.pdf' },
              { label: 'PO PSO CO - R12', url: 'https://vcet.edu.in/wp-content/uploads/2021/11/NAAC-Comp_PO_PSO_CO_R-12.pdf' },
              { label: 'PO PSO CO - R16', url: 'https://vcet.edu.in/wp-content/uploads/2021/11/NAAC-Comp_PO_PSO_CO_R-16.pdf' },
              { label: 'PO PSO CO - R19', url: 'https://vcet.edu.in/wp-content/uploads/2023/10/NACC-COMP_PO_PSO_CO_R-19-updated.pdf' },
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Computer Engineering</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Syllabus<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
                <p className="text-slate-600 mb-5">NEP-2020 MU syllabus link is currently not available in the provided document.</p>
                <div className="grid md:grid-cols-2 gap-3">
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

          {/* ════ PUBLICATIONS & IPR ═══════════════════════════ */}
          {activeId === 'patent' && (() => {
            const links = [
              { label: 'Patents Published', url: 'https://vcet.edu.in/wp-content/uploads/2025/04/copyright.pdf' },
              { label: 'Copyrights Registered', url: 'https://vcet.edu.in/wp-content/uploads/2025/04/copyright.pdf' },
              { label: 'Books & Book Chapters', url: 'https://vcet.edu.in/wp-content/uploads/2025/05/Comp-Book_BookChapter-with-academic-Year.pdf' },
              { label: 'Faculty Publication Index 2024-25', url: 'https://vcet.edu.in/wp-content/uploads/2025/08/Faculty-Publication-Index-2024-25-up.pdf' },
              { label: 'Faculty Publication Index 2023-24', url: 'https://vcet.edu.in/wp-content/uploads/2025/04/Faculty-Publication-Index-2023-24.pdf' },
              { label: 'Faculty Publication Index 2022-23', url: 'https://vcet.edu.in/wp-content/uploads/2025/04/Faculty-Publication-Index-2022-23.pdf' },
              { label: 'Faculty Publication Index 2021-22', url: 'https://vcet.edu.in/wp-content/uploads/2025/04/Faculty-Publication-Index-2021-22.pdf' },
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Computer Engineering</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Publications &amp; IPR<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
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

          {/* ════ INNOVATION & TECHNIQUE ═══════════════════════ */}
          {activeId === 'teaching-learning' && (() => {
            const links = [
              { label: 'Innovation in Teaching Learning 2025-26', url: 'https://vcet.edu.in/wp-content/uploads/2025/11/Innovative-activities-in-Teaching-Learning_2025-26_Odd_Sem.pdf' },
              { label: 'Innovation in Teaching Learning 2024-25', url: 'https://vcet.edu.in/wp-content/uploads/2025/05/Innovative-activities-in-Teaching-Learning_2024-25_Odd_Even.pdf' },
              { label: 'Innovation in Teaching Learning 2023-24', url: 'https://vcet.edu.in/wp-content/uploads/2025/05/Innovative-activities-in-Teaching-Learning_2023-24_Odd_Even.pdf' },
              { label: 'Innovation in Teaching Learning 2022-23', url: 'https://vcet.edu.in/wp-content/uploads/2025/05/Innovative-activities-in-Teaching-Learning_2022-23_Odd-Even.pdf' },
              { label: 'Innovation in Teaching Learning 2021-22', url: 'https://vcet.edu.in/wp-content/uploads/2022/01/Innovative-activities-in-Teaching-Learning_2021-22_links.pdf' },
              { label: 'Innovation in Teaching Learning 2020-21', url: 'https://vcet.edu.in/wp-content/uploads/2022/01/Innovation_teaching_learning-2020-21.pdf' },
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Computer Engineering</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Innovation &amp; Technique<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
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

          {/* ════ MoU ══════════════════════════════════════════ */}
          {activeId === 'mou' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Computer Engineering</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">MoU<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
              <a href="https://vcet.edu.in/wp-content/uploads/2025/04/MOU-Computer-Summary.pdf" target="_blank" rel="noopener noreferrer" className="group mt-3 flex w-full sm:w-max items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gold hover:bg-brand-navylight transition-colors">
                <span>MoU List</span>
                <i className="ph ph-arrow-up-right text-brand-gold" />
              </a>
            </section>
          )}

          {/* ════ TIME TABLE ═══════════════════════════════════ */}
          {activeId === 'time-table' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Computer Engineering</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Time Table<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
              <div className="space-y-3">
                <a href="https://vcet.edu.in/wp-content/uploads/2025/08/TT_master_2025-26.pdf" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gold hover:bg-brand-navylight transition-colors"><span>Master TT 2025-26</span><i className="ph ph-arrow-up-right text-brand-gold" /></a>
                <a href="https://vcet.edu.in/wp-content/uploads/2025/05/Master_TT_Even_24-25.pdf" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gold hover:bg-brand-navylight transition-colors"><span>Master TT Even Sem 2024-25</span><i className="ph ph-arrow-up-right text-brand-gold" /></a>
              </div>
            </section>
          )}

          {/* ════ NEWSLETTER & MAGAZINE ═══════════════════════ */}
          {activeId === 'newsletter' && (() => {
            const newsletterLinks = [
              { label: 'BYTE Odd Sem 2025-26', url: 'https://vcet.edu.in/wp-content/uploads/2025/09/byte.pdf' },
              { label: 'BYTE Even Sem 2024-25', url: 'https://vcet.edu.in/wp-content/uploads/2025/05/final-Byte-2024-25-even-sem.pdf' },
              { label: 'BYTE Odd Sem 2024-25', url: 'https://vcet.edu.in/wp-content/uploads/2025/05/BYTE-odd-sem-24-25.pdf' },
              { label: 'BYTE Odd Sem 2023', url: 'https://vcet.edu.in/wp-content/uploads/2023/11/BYTE-ODD-SEM-2023-1.pdf' },
              { label: 'BYTE Even Sem 2023', url: 'https://vcet.edu.in/wp-content/uploads/2023/05/News-Letter-Even-Sem-2023.pdf' },
            ];
            const wallLinks = [
              { label: 'Wall Magazine Odd Sem 2025-26', url: 'https://vcet.edu.in/wp-content/uploads/2025/09/VIDYAVARDHINIS-COLLEGE-OF-ENGINEERING-AND-TECHNOLOGY.pdf' },
              { label: 'Wall Magazine Even Sem 2024-25', url: 'https://vcet.edu.in/wp-content/uploads/2025/05/Wall-2025-even-sem.pdf' },
              { label: 'Wall Magazine Odd Sem 2024-25', url: 'https://vcet.edu.in/wp-content/uploads/2025/05/Wall-1.pdf' },
            ];
            const emagLinks = [
              { label: 'BYTE E-Magazine Vol I & II', url: 'https://3xlhoob70lrkdyk1voigzw.on.drv.tw/www.bytemagvcet.com/' },
              { label: 'BYTE E-Magazine Vol III (2021)', url: 'https://3xlhoob70lrkdyk1voigzw.on.drv.tw/www.bytemag2021.com/#p=13' },
              { label: 'BYTE E-Magazine Vol IV (2022)', url: 'https://bnaunugymx9uazml2zwtvq.on.drv.tw/www.emagzine.com/mobile/' },
              { label: 'BYTE E-Magazine Vol V (2023)', url: 'https://byte-2023.vercel.app/' },
              { label: 'BYTE E-Magazine Vol VI (2024)', url: 'https://vcet.edu.in/wp-content/uploads/2025/05/E-Mgazine-2024.pdf' },
            ];
            const committeeRows = [
              { newsletter: 'Sahil Kulabkar', wall: 'Aditya Lawate', emag: 'Polomi Adak' },
              { newsletter: 'Bramheti Patil', wall: 'Vaishnavi Gaikwad', emag: 'Akhila Anilkumar' },
              { newsletter: 'Swara Gharat', wall: 'Aditya Bhandare', emag: 'Hrushikesh Shetty' },
              { newsletter: 'Dhruv Save', wall: 'Paarth Baradia', emag: 'Rohit Redekar' },
              { newsletter: 'Amey Chaudhari', wall: 'Prathmesh Ingawale', emag: '' },
              { newsletter: 'Srushti Gawande', wall: 'Mohit Raje', emag: '' },
              { newsletter: 'Karan Sankhe', wall: 'Vaishnavi Gaikwad', emag: '' },
              { newsletter: 'Vrusharth Nirmal', wall: 'Pratima Bombe', emag: '' },
              { newsletter: 'Kshitij Vyas', wall: 'Paarth Baradia', emag: '' },
              { newsletter: 'Arya Raul', wall: 'Aditya Bhandare', emag: '' },
              { newsletter: 'Atharva Chavan', wall: '', emag: '' },
              { newsletter: 'Kunj Vadhia', wall: '', emag: '' },
              { newsletter: 'Ankita Yadav', wall: '', emag: '' },
              { newsletter: 'Kartik Rathod', wall: '', emag: '' },
              { newsletter: 'Sanket Bauskar', wall: '', emag: '' },
              { newsletter: 'Aditya Shete', wall: '', emag: '' },
              { newsletter: 'Yash Mohadikar', wall: '', emag: '' },
              { newsletter: 'Aakansha Chaudhari', wall: '', emag: '' },
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 space-y-8">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Computer Engineering</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy relative inline-block">Newsletter &amp; Magazine<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
                <div>
                  <h4 className="text-lg font-bold text-brand-navy mb-3">Newsletter</h4>
                  <div className="space-y-2">{newsletterLinks.map((item) => <a key={item.label} href={item.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gold hover:bg-brand-navylight transition-colors"><span>{item.label}</span><i className="ph ph-arrow-up-right text-brand-gold" /></a>)}</div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-brand-navy mb-3">Wall Magazine</h4>
                  <div className="space-y-2">{wallLinks.map((item) => <a key={item.label} href={item.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gold hover:bg-brand-navylight transition-colors"><span>{item.label}</span><i className="ph ph-arrow-up-right text-brand-gold" /></a>)}</div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-brand-navy mb-3">E-Magazine</h4>
                  <div className="space-y-2">{emagLinks.map((item) => <a key={item.label} href={item.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gold hover:bg-brand-navylight transition-colors"><span>{item.label}</span><i className="ph ph-arrow-up-right text-brand-gold" /></a>)}</div>
                </div>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-100 bg-brand-navylight/40">
                    <h4 className="text-lg font-bold text-brand-navy">Committee Details</h4>
                    <p className="text-sm text-slate-600 mt-1">Staff Incharge: Mr. Vikrant Agaskar | vikrant.agaskar@vcet.edu.in | 9822836508</p>
                  </div>
                  <div className="px-4 pt-5 pb-2 flex justify-center">
                    <div className="w-full max-w-[340px] rounded-2xl border-2 border-dashed border-slate-300 bg-white px-4 py-12 text-center">
                      <i className="ph ph-image text-4xl text-slate-400" />
                      <p className="mt-3 text-sm font-semibold text-slate-500">Staff Image Placeholder</p>
                      <p className="mt-1 text-xs text-slate-400">Add image later in this area</p>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-brand-navy text-white">
                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest">Newsletter</th>
                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest">Wall-Magazine</th>
                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest">E-Magazine</th>
                        </tr>
                      </thead>
                      <tbody>
                        {committeeRows.map((row, idx) => (
                          <tr key={`${row.newsletter}-${idx}`} className={`border-t border-slate-100 ${idx % 2 === 1 ? 'bg-slate-50/60' : 'bg-white'}`}>
                            <td className="px-4 py-3 text-slate-600">{row.newsletter || '-'}</td>
                            <td className="px-4 py-3 text-slate-600">{row.wall || '-'}</td>
                            <td className="px-4 py-3 text-slate-600">{row.emag || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            );
          })()}

          {/* ════ FALLBACK ═════════════════════════════════════ */}
          {activeId !== 'about' && activeId !== 'vision' && activeId !== 'dab' && activeId !== 'peo' && activeId !== 'faculty' && activeId !== 'paqic' && activeId !== 'infrastructure' && activeId !== 'toppers' && activeId !== 'syllabus' && activeId !== 'patent' && activeId !== 'teaching-learning' && activeId !== 'mou' && activeId !== 'time-table' && activeId !== 'newsletter' && (
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

export default DeptComputerEngg;
