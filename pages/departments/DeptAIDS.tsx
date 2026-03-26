import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import DepartmentFacultySection from '../../components/DepartmentFacultySection';

const sidebarLinks = [
  { id: 'about',      label: 'About',                        icon: 'ph-info' },
  { id: 'vision',     label: 'Vision and Mission',           icon: 'ph-target' },
  { id: 'dab',        label: 'Departmental Advisory Board',  icon: 'ph-users-three' },
  { id: 'mou',        label: 'MoU',                          icon: 'ph-handshake' },
  { id: 'patent',     label: 'Patent',                       icon: 'ph-certificate' },
  { id: 'peo',        label: 'POs, PEOs, PSOs',              icon: 'ph-chart-bar' },
  { id: 'faculty',    label: 'Faculty',                      icon: 'ph-chalkboard-teacher' },
  { id: 'student-achievements', label: 'Student Achievements', icon: 'ph-medal' },
  { id: 'teaching-learning',    label: 'Innovations in Teaching Learning', icon: 'ph-lightbulb' },
  { id: 'toppers',    label: 'Toppers',                      icon: 'ph-medal' },
  { id: 'syllabus',   label: 'Syllabus',                     icon: 'ph-book-open' },
  { id: 'newsletter', label: 'Newsletter',                   icon: 'ph-newspaper' },
];

const delayClass = (idx: number) => {
  if (idx % 3 === 0) return 'delay-100';
  if (idx % 3 === 1) return 'delay-200';
  return 'delay-300';
};

const DeptAIDS: React.FC = () => {
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
          <span className="text-brand-gold font-semibold">AI &amp; Data Science</span>
        </nav>
        <div className="container mx-auto px-6 max-w-7xl relative z-10">

          <h1 className="font-display font-bold text-white leading-tight tracking-tight text-center">
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Artificial Intelligence</span>
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-3 text-brand-gold font-semibold italic">&amp; Data Science</span>
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
                <p className="text-lg font-bold text-brand-navy">Dr. Tatwadarshi Nagarhalli, Associate Professor &amp; Head Of Department</p>
                <p>
                  The Department of Artificial Intelligence and Data Science was established in 2020 to provide quality education in the emerging fields of Artificial Intelligence and Data Science. Initially, the Department offered 30 seats in the first academic year for the Undergraduate Program (B.E.). However, in the following year (2021-22), the intake was doubled, and currently there are 120 seats.
                </p>
                <p>
                  The department aims to create an environment for the development and fostering of proficient artificial intelligence and data science engineers who embody professionalism and civic responsibility. The department has young, dynamic, highly qualified, and experienced faculty members, is equipped with the most modern software, and has state-of-the-art facilities for facilitating a coherent teaching-learning process.
                </p>
                <p>
                  The Department routinely organizes a variety of activities on new technological developments in collaboration with student chapters. The Department encourages students to participate in diverse IPR activities, including writing research papers, copyrighting, and patenting.
                </p>
                <p>
                  The Department works to ensure that students are developed holistically by establishing outcome-based education methods and placing a regular emphasis on extracurricular and co-curricular activities like sports, cultural events, technical events, and student development programs in addition to the academic schedule.
                </p>
              </div>
            </section>
          )}

          {/* ════ VISION & MISSION ═════════════════════════════════ */}
          {activeId === 'vision' && (
            <div className="space-y-16">
              <div className="reveal flex items-center gap-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Artificial Intelligence &amp; Data Science</span>
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
                      "To foster proficient artificial intelligence and data science professionals, making remarkable contributions to industry and society."
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div className="h-px flex-1 bg-white/10" />
                      <span className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-semibold">VCET · AI &amp; Data Science</span>
                      <div className="h-px w-12 bg-brand-gold/40" />
                    </div>
                  </div>
                </div>
              </section>
              <section className="reveal space-y-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-1">Guiding Principles</p>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy leading-tight">Our Mission</h2>
                </div>
                <div className="h-px bg-gradient-to-r from-brand-gold via-brand-navylight to-transparent" />
                <section className="reveal bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 rounded-xl border border-slate-200 bg-brand-navylight/35 px-4 py-3 text-slate-700 leading-7">
                      <span className="mt-2 h-2 w-2 rounded-full bg-brand-navy flex-shrink-0" />
                      <span>To encourage innovation and creativity with rational thinking for solving the challenges in emerging areas.</span>
                    </li>
                    <li className="flex items-start gap-3 rounded-xl border border-slate-200 bg-brand-navylight/35 px-4 py-3 text-slate-700 leading-7">
                      <span className="mt-2 h-2 w-2 rounded-full bg-brand-navy flex-shrink-0" />
                      <span>To inculcate standard industrial practices and security norms while dealing with Data.</span>
                    </li>
                    <li className="flex items-start gap-3 rounded-xl border border-slate-200 bg-brand-navylight/35 px-4 py-3 text-slate-700 leading-7">
                      <span className="mt-2 h-2 w-2 rounded-full bg-brand-navy flex-shrink-0" />
                      <span>To develop sustainable Artificial Intelligence systems for the benefit of various sectors.</span>
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
              { sr: 2, name: 'Dr. Vikas Gupta', designation: 'Dean Academics', org: 'VCET, Vasai', role: 'Dean', tag: 'internal' },
              { sr: 3, name: 'Dr. Tattwadarshi P. N.', designation: 'HOD, AI-DS', org: 'VCET, Vasai', role: 'HOD', tag: 'internal' },
              { sr: 4, name: 'Mrs. Sejal D\'mello', designation: 'Deputy HOD', org: 'VCET, Vasai', role: 'Secretary', tag: 'internal' },
              { sr: 5, name: 'Mrs. Sneha Yadav', designation: 'Assistant Professor', org: 'VCET, Vasai', role: 'Faculty Representative', tag: 'internal' },
              { sr: 6, name: 'Ms. Neha Raut', designation: 'Assistant Professor', org: 'VCET, Vasai', role: 'Faculty Representative', tag: 'internal' },
              { sr: 7, name: 'Ms. Vibhavari Nagarhalli', designation: 'Director & Head Sales for insurance in India Geography', org: 'TCS', role: 'Industry Representative', tag: 'industry' },
              { sr: 8, name: 'Mr. Roshan Shetty', designation: 'CEO', org: 'CitiusCloud Services LLP', role: 'Industry Representative', tag: 'industry' },
              { sr: 9, name: 'Ms. Payal Doshi', designation: 'Director', org: 'Prime Softech Solutions Pvt. Ltd', role: 'Industry Representative', tag: 'industry' },
              { sr: 10, name: 'Mr. Akshay Bharambe', designation: 'CEO, Founder', org: 'ParkingPal', role: 'Industry Representative', tag: 'industry' },
              { sr: 11, name: 'Mr. Narendra Shekokar', designation: 'Professor, HOD, IOT & Cyber Security Department', org: 'Dwarkadas J. Sangavi College of Engineering', role: 'Academic Representative', tag: 'academic' },
              { sr: 12, name: 'Mrs. Alka Arora', designation: 'Parent', org: 'VCET, Vasai', role: 'Parent Representative', tag: 'parent' },
            ];
            const tagStyle: Record<string, string> = { internal: 'bg-brand-navylight text-brand-navy', academic: 'bg-blue-50 text-blue-700', industry: 'bg-amber-50 text-amber-700', student: 'bg-emerald-50 text-emerald-700', parent: 'bg-purple-50 text-purple-700' };
            return (
              <div className="space-y-10">
                <div className="reveal">
                  <div className="flex items-center gap-3 mb-4"><span className="w-8 h-px bg-brand-gold" /><span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">AI &amp; Data Science</span></div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy leading-tight">Departmental Advisory Board<span className="text-brand-gold"> (DAB)</span></h2>
                  <div className="mt-3 flex items-center gap-2 text-slate-500 text-sm"><i className="ph-fill ph-check-circle text-brand-gold text-base" />Following are the members of the committee starting from 2022&#8209;23.</div>
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
              { n: 'PSO1', text: 'Analyze the current trends in the field of Artificial Intelligence & Data Science and contribute to the technological advancements by presenting/publishing at national/international forums.' },
              { n: 'PSO2', text: 'Design and develop Artificial Intelligence & Data Science applications and solutions in various domains to cater to the needs of industry and society.' },
            ];
            return (
              <div className="space-y-16">
                <div className="reveal">
                  <div className="flex items-center gap-3 mb-4"><span className="w-8 h-px bg-brand-gold" /><span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">AI &amp; Data Science</span></div>
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
                    <div className="relative z-10 p-8 md:p-10">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold/80 mb-1">Objectives</p>
                        <h3 className="text-2xl font-display font-bold text-white mb-2">Program Educational Objectives (PEOs)</h3>
                        <p className="text-white/80 text-sm leading-relaxed">Program Educational Objectives (PEOs):</p>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="reveal space-y-6">
                  <div><p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">AI &amp; Data Science Specific</p><h3 className="text-2xl font-display font-bold text-brand-navy leading-tight">Program Specific Outcomes (PSOs)</h3></div>
                  <div className="space-y-3">
                    {psos.map((pso) => (
                      <div key={pso.n} className="reveal bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                        <p className="text-sm font-bold text-brand-navy mb-2">{pso.n}</p>
                        <p className="text-slate-600 text-sm leading-relaxed">{pso.text}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            );
          })()}

          {/* ════ FACULTY ══════════════════════════════════════════ */}
          {activeId === 'faculty' && <DepartmentFacultySection departmentName="AI & Data Science" />}

          {/* ════ STUDENT ACHIEVEMENTS ════════════════════════════ */}
          {activeId === 'student-achievements' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">AI &amp; Data Science</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Student Achievements<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
              <a href="https://vcet.edu.in/wp-content/uploads/2025/08/AIDS-students-Achievement-24-25.pdf" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gold hover:bg-brand-navylight transition-colors">
                <span>Student Achievements 2024-25</span>
                <i className="ph ph-arrow-up-right text-brand-gold" />
              </a>
            </section>
          )}

          {/* ════ TOPPERS ══════════════════════════════════════════ */}
          {activeId === 'toppers' && (() => {
            const poSectionToppers = {
              SE: ['Pranjal Patil (10)', 'Upadhyay Shagun (9.78)', 'Devendra Gurav (9.92)', 'Shravani Raut (9.75)'],
              TE: ['Nagar Pratham (9.78)', 'Panchal Dhyanesh (9.61)', 'Bari AnkitBARI (9.48)'],
              BE: ['Jha Devharsh (9.56)', 'Shetty Amulya (9.45)', 'Maurya Hemani (9.34)'],
            };
            const toppers2425SetA = {
              SE: ['Dnyanesh panchal - 10 SGPI', 'Priyanka bhandari - 9.87 SGPI', 'Mohammed Ali Jaffari - 9.3 SGPI'],
              TE: ['JHA DEVHARSH JAGDANAND - 9.64 SGPI', 'MAURYA HEMANI RAMAKANT - 9.45 SGPI', 'SINGH NEHA VINOD - 9.45 SGPI', 'SHETTY AMULYA CHANDAYYA - 9.36 SGPI'],
            };
            const toppers2425SetB = {
              SE: ['Devharsh Jha - 9.74 SGPI', 'Amulya Shetty - 8.96 SGPI', 'Hemani Maurya - 8.7 SGPI', 'Ryan Chulliyil - 8.7 SGPI'],
              TE: ['JHA DEVHARSH JAGDANAND - 9.64 SGPI', 'MAURYA HEMANI RAMAKANT - 9.45 SGPI', 'SINGH NEHA VINOD - 9.45 SGPI', 'SHETTY AMULYA CHANDAYYA - 9.36 SGPI'],
            };
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 space-y-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">AI &amp; Data Science</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy relative inline-block">Toppers<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>

                <div>
                  <h4 className="text-base font-bold text-brand-navy mb-3">Entries Listed Before Topper&apos;s Section</h4>
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
                        {[0, 1, 2, 3].map((i) => (
                          <tr key={`po-${i}`} className="border-t border-slate-100">
                            <td className="px-4 py-3 text-slate-600">{poSectionToppers.SE[i] ?? '-'}</td>
                            <td className="px-4 py-3 text-slate-600">{poSectionToppers.TE[i] ?? '-'}</td>
                            <td className="px-4 py-3 text-slate-600">{poSectionToppers.BE[i] ?? '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-bold text-brand-navy mb-3">Toppers: 24-25</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-brand-navy text-white">
                          <th className="px-4 py-3 text-left">SE</th>
                          <th className="px-4 py-3 text-left">TE</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[0, 1, 2, 3].map((i) => (
                          <tr key={`2425a-${i}`} className="border-t border-slate-100">
                            <td className="px-4 py-3 text-slate-600">{toppers2425SetA.SE[i] ?? '-'}</td>
                            <td className="px-4 py-3 text-slate-600">{toppers2425SetA.TE[i] ?? '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-bold text-brand-navy mb-3">Toppers: 24-25</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-brand-navy text-white">
                          <th className="px-4 py-3 text-left">SE</th>
                          <th className="px-4 py-3 text-left">TE</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[0, 1, 2, 3].map((i) => (
                          <tr key={`2425b-${i}`} className="border-t border-slate-100">
                            <td className="px-4 py-3 text-slate-600">{toppers2425SetB.SE[i] ?? '-'}</td>
                            <td className="px-4 py-3 text-slate-600">{toppers2425SetB.TE[i] ?? '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </section>
            );
          })()}

          {/* ════ SYLLABUS ═════════════════════════════════════════ */}
          {activeId === 'syllabus' && (() => {
            const links = [
              { label: 'SYLLABUS Revised 2019-20 (SE)', url: 'https://vcet.edu.in/wp-content/uploads/2021/11/Computer_SE_New_8_Branch_R2019_1.7.2021-1.pdf' },
              { label: 'SYLLABUS Revised 2019-20 (TE)', url: 'https://vcet.edu.in/wp-content/uploads/2022/08/T.E._AI_ML_DS_DE_R2019.pdf' },
              { label: 'SYLLABUS Revised 2019-20 (BE)', url: 'https://vcet.edu.in/wp-content/uploads/2023/07/BE_CSE_AIML__CSE_DS__AI_DS_AI_ML_DE.pdf' },
              { label: 'Honours & Minor Degree Program', url: 'https://vcet.edu.in/wp-content/uploads/2023/07/BE_CSE_AIML__CSE_DS__AI_DS_AI_ML_DE.pdf' },
              { label: 'PO PSO CO', url: 'https://vcet.edu.in/wp-content/uploads/2023/11/2.6.1_Rev-2019_AIDS_Syllabus-.pdf' },
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">AI &amp; Data Science</span>
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

          {/* ════ PATENT / COPYRIGHTS ═════════════════════════════ */}
          {activeId === 'patent' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">AI &amp; Data Science</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Patent / Copyrights<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
              <a href="https://vcet.edu.in/wp-content/uploads/2025/08/AIDS-Copyright-2024-25.pdf" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gold hover:bg-brand-navylight transition-colors">
                <span>Copyrights 2024-25</span>
                <i className="ph ph-arrow-up-right text-brand-gold" />
              </a>
            </section>
          )}

          {/* ════ INNOVATIONS IN TEACHING LEARNING ═══════════════ */}
          {activeId === 'teaching-learning' && (() => {
            const links = [
              { label: 'Innovation in Teaching Learning 2024-25 (Even)', url: 'https://vcet.edu.in/wp-content/uploads/2025/08/EVEN-SEM-Innovation-in-Teaching-learning-2024-25-.pdf' },
              { label: 'Innovation in Teaching Learning 2024-25 (Odd)', url: 'https://vcet.edu.in/wp-content/uploads/2025/04/ODD-SEM-Innovation-in-Teaching-learning-2024-25-.docx.pdf' },
              { label: 'Innovation in Teaching Learning 2023-24 (Odd)', url: 'https://vcet.edu.in/wp-content/uploads/2024/04/Innovation-in-teaching-learning-2023-24-Odd-Sem.pdf' },
              { label: 'Innovation in Teaching Learning 2022-23 (Odd)', url: 'https://vcet.edu.in/wp-content/uploads/2024/04/Innovation-in-Teaching-Learning-2022-23-ODD-Sem.pdf' },
              { label: 'Innovation in Teaching Learning 2022-23 (Even)', url: 'https://vcet.edu.in/wp-content/uploads/2024/04/Innovation-in-Teaching-Learning-2022-23-Even-Sem.pdf' },
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">AI &amp; Data Science</span>
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

          {/* ════ MoU ══════════════════════════════════════════════ */}
          {activeId === 'mou' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">AI &amp; Data Science</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">MoU<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
              <a href="https://vcet.edu.in/wp-content/uploads/2025/08/AIDS-MoU-2024-25.pdf" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gold hover:bg-brand-navylight transition-colors">
                <span>MoU 2024-25</span>
                <i className="ph ph-arrow-up-right text-brand-gold" />
              </a>
            </section>
          )}

          {/* ════ MAGAZINE / NEWSLETTER ═══════════════════════════ */}
          {activeId === 'newsletter' && (() => {
            const newsletterLinks = [
              { label: 'NEWSLETTER (EVEN SEM 2025)', url: 'https://vcet.edu.in/wp-content/uploads/2025/08/Newsletter-Even-2025.pdf' },
              { label: 'NEWSLETTER (ODD SEM 2024)', url: 'https://vcet.edu.in/wp-content/uploads/2025/08/Newsletter-Odd-2024.pdf' },
              { label: 'NEWSLETTER (EVEN SEM 2024)', url: 'https://vcet.edu.in/wp-content/uploads/2024/06/Add-a-subheading_20240403_153124_0000.pdf' },
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">AI &amp; Data Science</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy relative inline-block">Magazine / Newsletter<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
                <div>
                  <h4 className="text-lg font-bold text-brand-navy mb-3">Newsletter</h4>
                  <div className="space-y-2">
                    {newsletterLinks.map((item) => (
                      <a key={item.label} href={item.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gold hover:bg-brand-navylight transition-colors">
                        <span>{item.label}</span>
                        <i className="ph ph-arrow-up-right text-brand-gold" />
                      </a>
                    ))}
                  </div>
                </div>
              </section>
            );
          })()}

          {/* ════ FALLBACK ════════════════════════════════════════ */}
          {activeId !== 'about' && activeId !== 'vision' && activeId !== 'dab' && activeId !== 'peo' && activeId !== 'faculty' && activeId !== 'student-achievements' && activeId !== 'toppers' && activeId !== 'syllabus' && activeId !== 'patent' && activeId !== 'teaching-learning' && activeId !== 'mou' && activeId !== 'newsletter' && (
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

export default DeptAIDS;
