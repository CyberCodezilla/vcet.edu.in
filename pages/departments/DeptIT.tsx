import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';

const sidebarLinks = [
  { id: 'about',      label: 'About',                        icon: 'ph-info' },
  { id: 'vision',     label: 'Vision and Mission',           icon: 'ph-target' },
  { id: 'dab',        label: 'Departmental Advisory Board',  icon: 'ph-users-three' },
  { id: 'mou',        label: 'MoU',                          icon: 'ph-handshake' },
  { id: 'peo',        label: 'POs, PEOs, PSOs',              icon: 'ph-chart-bar' },
  { id: 'faculty',    label: 'Faculty',                      icon: 'ph-chalkboard-teacher' },
  { id: 'paqic',      label: 'PAQIC',                        icon: 'ph-clipboard-text' },
  { id: 'faculty-achievements', label: 'Faculty Achievements', icon: 'ph-trophy' },
  { id: 'student-achievements', label: 'Students Achievements', icon: 'ph-medal' },
  { id: 'activities', label: 'Activities',                   icon: 'ph-flag' },
  { id: 'infrastructure', label: 'Infrastructure',           icon: 'ph-buildings' },
  { id: 'time-table', label: 'Time Table',                   icon: 'ph-calendar' },
  { id: 'youtube',    label: 'Department YouTube Channel',   icon: 'ph-youtube-logo' },
  { id: 'toppers',    label: 'Toppers',                      icon: 'ph-medal' },
  { id: 'syllabus',   label: 'Syllabus',                     icon: 'ph-book-open' },
  { id: 'newsletter', label: 'Newsletter',                   icon: 'ph-newspaper' },
];

const delayClass = (idx: number) => {
  if (idx % 3 === 0) return 'delay-100';
  if (idx % 3 === 1) return 'delay-200';
  return 'delay-300';
};

const DeptIT: React.FC = () => {
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
          <span className="text-brand-gold font-semibold">Information Technology</span>
        </nav>
        <div className="container mx-auto px-6 max-w-7xl relative z-10">

          <h1 className="font-display font-bold text-white leading-tight tracking-tight text-center">
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Information Technology</span>
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
                    {isActive && (
                      <i className="ph ph-arrow-right text-xs transform group-hover:translate-x-1 transition-transform" />
                    )}
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
                <p className="text-lg font-bold text-brand-navy">Dr. Thaksen Parvat, Professor &amp; Head Of Department, Dean IT Infrastructure</p>
                <p>
                  Established in 2000, the Department of Information Technology is amongst the premier Departments of VCET. Currently, it is running Under Graduate program, B.E in Information Technology with an intake of 60 seats. The Department is accredited by National Board of Accreditation (NBA) accredited from July 2022 to June 2025 and is affiliated to University of Mumbai.
                </p>
                <p>
                  The Department of Information Technology (IT) aims at developing technical and experimental skills in students along with logical thinking so as to prepare them for competent, responsible and rewarding careers in IT profession. We strive to achieve the aim with young, dynamic and highly qualified faculty members, state of art infrastructure and Industry-Institution Interaction.
                </p>
                <p>
                  The department has laboratories which are well equipped with latest configuration machines, high speed internet, Wi-Fi and legal licensed software. Modern aids such as LCD, Educational CDs make classroom teaching more interesting.
                </p>
                <p>
                  We encourage extra-curricular activities as they help in developing the student's personality which ultimately enhances her future. It is our constant endeavor to shape personalities who will contribute positively to the world around them.
                </p>
              </div>
            </section>
          )}

          {/* ════ VISION & MISSION ═════════════════════════════════ */}
          {activeId === 'vision' && (
            <div className="space-y-16">
              <div className="reveal flex items-center gap-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Information Technology</span>
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
                      "To foster and maintain excellence by orienting the captivating minds of the aspiring engineers towards IT-driven technological solutions for the benefits of the society."
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div className="h-px flex-1 bg-white/10" />
                      <span className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-semibold">VCET · Information Technology</span>
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
                      <span>To provide quality education, by employing best and diversified teaching practices and tools, and teaching beyond the confines of the university syllabus.</span>
                    </li>
                    <li className="flex items-start gap-3 rounded-xl border border-slate-200 bg-brand-navylight/35 px-4 py-3 text-slate-700 leading-7">
                      <span className="mt-2 h-2 w-2 rounded-full bg-brand-navy flex-shrink-0" />
                      <span>To keep students abreast with latest technological advancements in the market.</span>
                    </li>
                    <li className="flex items-start gap-3 rounded-xl border border-slate-200 bg-brand-navylight/35 px-4 py-3 text-slate-700 leading-7">
                      <span className="mt-2 h-2 w-2 rounded-full bg-brand-navy flex-shrink-0" />
                      <span>To prepare students to troubleshoot and solve IT system problems.</span>
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
              { sr: 2, name: 'Dr. Vikas Gupta', designation: 'Dean Academics', org: 'VCET, Vasai', role: 'Dean Academics', tag: 'internal' },
              { sr: 3, name: 'Dr. Thaksen Parvat', designation: 'HOD-IT', org: 'VCET, Vasai', role: 'Head of Department', tag: 'internal' },
              { sr: 4, name: 'Dr. Sunil B. Wankhade', designation: 'HOD IT, Member BoS Information Technology Mumbai University', org: 'RGIT', role: 'Academic Representative', tag: 'academic' },
              { sr: 5, name: 'Mr. Nilesh Jain', designation: 'Founder', org: 'Vervali Systems Pvt. Ltd.', role: 'Industry Representative', tag: 'industry' },
              { sr: 6, name: 'Mr. Amod Nerurkar', designation: 'Director', org: 'Raw Engineering, Virar', role: 'Industry Representative', tag: 'industry' },
              { sr: 7, name: 'Mr. Gajanan Palsule', designation: 'Chief Architect', org: 'Tata Consultancy Services', role: 'Industry Representative', tag: 'industry' },
              { sr: 8, name: 'Mr. Mihir Dave', designation: 'Business Head - Digital', org: 'Digital', role: 'Industry Representative', tag: 'industry' },
              { sr: 9, name: 'Mr. Chandan Kolvankar', designation: 'Assistant Professor', org: 'VCET, Vasai', role: 'Member', tag: 'internal' },
              { sr: 10, name: 'Dr. Archana Ekbote', designation: 'Assistant Professor', org: 'VCET, Vasai', role: 'Member', tag: 'internal' },
              { sr: 11, name: 'Dr. Madhavi Waghmare', designation: 'Assistant Professor', org: 'VCET, Vasai', role: 'Secretary', tag: 'internal' },
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
                    <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Information Technology</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy leading-tight">
                    Departmental Advisory Board<span className="text-brand-gold"> (DAB)</span>
                  </h2>
                  <div className="mt-4 rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 shadow-sm space-y-3 text-slate-600 leading-7">
                    <p>The composition of the DAB for the Department of Information Technology is as follows:</p>
                    <p className="font-semibold text-brand-navy">Roles and Expectations:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>To bring multi-dimensional thoughts together for improvement of the program.</li>
                      <li>Review the progress of the Department and revise/realign the objectives of the program.</li>
                      <li>Suggesting reforms in teaching-learning process to meet the current trends in the IT industry.</li>
                      <li>To identify curriculum gaps and advice actions to bridge these gaps.</li>
                      <li>Identify thrust areas to conduct different activities to improve employment of students.</li>
                    </ul>
                    <p className="text-sm text-slate-500">Frequency Of Meeting: Once per academic year</p>
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
              { n: 'PSO1', text: 'Apply and implement IT solutions in allied fields of engineering to solve real word problems.' },
              { n: 'PSO2', text: 'Identify social and industrial problems, provide creative solutions and become quality asset for society and industry.' },
              { n: 'PSO3', text: 'Deploy secured solution using Information Technology practices and strategies.' },
            ];
            const peos = [
              'To produce skilled IT Professional to cater social/industrial needs.',
              'To inculcate an ability to implement modern practices with ethical and professional responsibilities.',
              'To establish graduate as Business Analyst, System Analyst, Data Scientist, Project Leader.',
            ];
            return (
              <div className="space-y-16">
                <div className="reveal">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-px bg-brand-gold" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Information Technology</span>
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
                        className={`reveal ${delayClass(idx)} flex gap-4 items-start bg-white border border-slate-100 rounded-xl px-5 py-4 shadow-sm`}
                      >
                        <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-brand-navylight flex items-center justify-center text-[11px] font-bold text-brand-navy">
                          {po.n}
                        </span>
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
                        <ul className="text-white/80 text-sm leading-relaxed list-disc pl-5 space-y-1">
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
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">IT Specific</p>
                    <h3 className="text-2xl font-display font-bold text-brand-navy leading-tight">Program Specific Outcomes (PSOs)</h3>
                  </div>
                  <div className="space-y-3">
                    {psos.map((pso) => (
                      <div
                        key={pso.n}
                        className="reveal bg-white rounded-2xl p-5 border border-slate-100 shadow-sm"
                      >
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
          {activeId === 'faculty' && (() => {
            const faculty = [
              {
                slug: 'dr-thaksen-parvat',
                name: 'Dr. Thaksen Parvat',
                post: 'Professor & HOD, Dean IT Infrastructure',
                email: 'thaksen.parvat@vcet.edu.in',
                photo: '/Images/departments/it/faculty/dr-thaksen-parvat.jpg',
                initials: 'TP',
                color: '#1a4b7c',
              },
              {
                slug: 'chandan-kolvankar',
                name: 'Mr. Chandan Kolvankar',
                post: 'Asst. Prof. (Ph.D. Pursuing)',
                email: 'chandan.kolvankar@vcet.edu.in',
                photo: '/Images/departments/it/faculty/chandan-kolvankar.jpg',
                initials: 'CK',
                color: '#2563a8',
              },
              {
                slug: 'dr-archana-ekbote',
                name: 'Dr. Archana Ekbote',
                post: 'Asst. Prof.',
                email: 'archana.ekbote@vcet.edu.in',
                photo: '/Images/departments/it/faculty/dr-archana-ekbote.jpg',
                initials: 'AE',
                color: '#1a4b7c',
              },
              {
                slug: 'dr-madhavi-waghmare',
                name: 'Dr. Madhavi Waghmare',
                post: 'Asst. Prof.',
                email: 'madhavi.waghmare@vcet.edu.in',
                photo: '/Images/departments/it/faculty/dr-madhavi-waghmare.jpg',
                initials: 'MW',
                color: '#2563a8',
              },
              {
                slug: 'dr-vaishali-shirsath',
                name: 'Dr. Vaishali A. Shirsath',
                post: 'Asst. Prof.',
                email: 'vaishali.shirsath@vcet.edu.in',
                photo: '/Images/departments/it/faculty/dr-vaishali-shirsath.jpg',
                initials: 'VS',
                color: '#1a4b7c',
              },
              {
                slug: 'dr-sainath-patil',
                name: 'Dr. Sainath Patil',
                post: 'Asst. Prof.',
                email: 'sainath.patil@vcet.edu.in',
                photo: '/Images/departments/it/faculty/dr-sainath-patil.jpg',
                initials: 'SP',
                color: '#2563a8',
              },
              {
                slug: 'dr-anagha-patil',
                name: 'Dr. Anagha Patil',
                post: 'Asst. Prof.',
                email: 'anagha.patil@vcet.edu.in',
                photo: '/Images/departments/it/faculty/dr-anagha-patil.jpg',
                initials: 'AP',
                color: '#1a4b7c',
              },
              {
                slug: 'snehal-mhatre',
                name: 'Ms. Snehal Mhatre',
                post: 'Asst. Prof.',
                email: 'snehal.mhatre@vcet.edu.in',
                photo: '/Images/departments/it/faculty/snehal-mhatre.jpg',
                initials: 'SM',
                color: '#2563a8',
              },
              {
                slug: 'pragati-patil',
                name: 'Ms. Pragati Patil',
                post: 'Asst. Prof. (Ph.D. Pursuing)',
                email: 'pragati.patil@vcet.edu.in',
                photo: '/Images/departments/it/faculty/pragati-patil.jpg',
                initials: 'PP',
                color: '#1a4b7c',
              },
              {
                slug: 'jessica-falcao',
                name: 'Ms. Jessica Falcao',
                post: 'Asst. Prof.',
                email: 'jessica.falcao@vcet.edu.in',
                photo: '/Images/departments/it/faculty/jessica-falcao.jpg',
                initials: 'JF',
                color: '#2563a8',
              },
              {
                slug: 'dr-yogita-shelar',
                name: 'Dr. Yogita Shelar',
                post: 'Asst. Prof.',
                email: 'yogita.shelar@vcet.edu.in',
                photo: '/Images/departments/it/faculty/dr-yogita-shelar.jpg',
                initials: 'YS',
                color: '#1a4b7c',
              },
            ];
            return (
              <div className="space-y-10">
                {/* Section header — compact bar */}
                <div className="reveal flex items-center gap-3 pb-5 border-b-2 border-brand-gold/30">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-navy/60 flex items-center gap-2 mb-1">
                      <i className="ph-fill ph-chalkboard-teacher text-sm text-brand-navy/50" /> Information Technology
                    </span>
                    <h2 className="text-2xl font-display font-bold text-brand-navy">Our Faculty</h2>
                  </div>
                </div>

                {/* Faculty cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-4">
                  {faculty.map((f) => (
                    <Link
                      key={f.email}
                      to={`/information-technology/faculty/${f.slug}`}
                      className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 border-t-[3px] border-b-[3px] border-t-[#1a4b7c] border-b-[#fdb813] flex flex-col items-center px-6 pt-6 pb-5 no-underline"
                    >
                      {/* Photo with gold badge at bottom-right */}
                      <div className="relative w-32 h-36 mb-4 shrink-0">
                        <img
                          src={f.photo}
                          alt={f.name}
                          className="w-full h-full object-cover object-top"
                          onError={(e) => {
                            const t = e.currentTarget;
                            t.style.display = 'none';
                            const fallback = t.nextElementSibling as HTMLElement | null;
                            if (fallback) {
                              fallback.style.display = 'flex';
                            }
                          }}
                        />
                        {/* Fallback initials */}
                        <div
                          className="absolute inset-0 hidden items-center justify-center text-white font-bold text-2xl"
                          style={{ background: f.color }}
                        >
                          {f.initials}
                        </div>
                        {/* Gold accent square */}
                        <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#fdb813]" />
                      </div>

                      {/* Name */}
                      <h3 className="text-base font-bold text-[#1a4b7c] text-center leading-snug">
                        {f.name}
                      </h3>

                      {/* Designation pill */}
                      <span className="mt-2 px-3 py-0.5 bg-gray-100 text-gray-500 text-xs rounded font-medium text-center">
                        {f.post}
                      </span>

                      {/* Divider */}
                      <div className="w-10 h-0.5 bg-gray-300 my-3" />

                      {/* Email */}
                      <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = `mailto:${f.email}`; }} className="flex items-center gap-2 text-xs text-gray-500 hover:text-[#1a4b7c] transition-colors w-full cursor-pointer"><i className="ph-fill ph-envelope text-sm shrink-0 text-gray-400" /><span className="truncate">{f.email}</span></div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* ════ MoU ══════════════════════════════════════════════ */}
          {activeId === 'mou' && (() => {
            const links = [
              { label: 'MoU 2023-24', url: 'https://vcet.edu.in/wp-content/uploads/2024/07/List-of-ActiveMOUs.pdf' },
              { label: 'MoU 2022-23', url: 'https://vcet.edu.in/wp-content/uploads/2024/07/3.5.1_MOU-ACTIVITY-DETAILS-22-23.pdf' },
              { label: 'MoU 2021-22', url: 'https://vcet.edu.in/wp-content/uploads/2024/07/3.5.1_MOU-ACTIVITY-DETAILS-21-22.pdf' },
              { label: 'MoU 2020-21', url: 'https://vcet.edu.in/wp-content/uploads/2024/07/3.5.1_MOU-ACTIVITY-DETAILS-20-21.pdf' },
              { label: 'MoU 2019-20', url: 'https://vcet.edu.in/wp-content/uploads/2024/07/3.5.1_MOU-ACTIVITY-DETAILS-19-20.pdf' },
              { label: 'MoU 2018-19', url: 'https://vcet.edu.in/wp-content/uploads/2024/07/3.5.1_MOU-ACTIVITY-DETAILS-18-19.pdf' },
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Information Technology</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">MoU<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
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

          {/* ════ PAQIC ════════════════════════════════════════════ */}
          {activeId === 'paqic' && (() => {
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
            const members = [
              'Dr.Thaksen Parvat, HOD, Department of Information Technology (Chairperson)',
              'Dr. Ashish Vanmali, Associate Professor, Department of Electronics & Telecommunication Engineering',
              'Mr. Chandan Kolvankar, Department of Information Technology',
              'Dr. Archana Ekbote, Department of Information Technology',
              'Dr. Vikas Gupta, Professor, Dean academics VCET.',
              'Dr. Uday Aswalekar, HOD, Department of Mechanical Engineering',
              'Dr. Madhavi Waghmare, Department of Information Technology (Coordinator)',
            ];
            return (
              <div className="space-y-8">
                <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-px bg-brand-gold" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Information Technology</span>
                  </div>
                  <h3 className="text-2xl font-bold text-brand-navy mb-4 relative inline-block">Program Assessment and Quality Improvement Committee (PAQIC)<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
                  <p className="text-slate-600 leading-7">The composition of the PAQIC for the Department of Information Technology is as follows.</p>
                  <p className="text-slate-600 leading-7 mt-2">Frequency Of Meeting: Minimum 2 per academic year.</p>
                </section>
                <section className="reveal bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
                  <h4 className="text-xl font-bold text-brand-navy mb-4">Roles and Responsibilities</h4>
                  <ul className="list-disc pl-6 text-slate-600 space-y-2">
                    {roles.map((r) => (<li key={r}>{r}</li>))}
                  </ul>
                </section>
                <section className="reveal bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
                  <h4 className="text-xl font-bold text-brand-navy mb-4">Members</h4>
                  <ul className="list-disc pl-6 text-slate-600 space-y-2">
                    {members.map((m) => (<li key={m}>{m}</li>))}
                  </ul>
                </section>
              </div>
            );
          })()}

          {/* ════ FACULTY ACHIEVEMENTS ════════════════════════════ */}
          {activeId === 'faculty-achievements' && (() => {
            const links = [
              { label: 'Faculty Patents and Copyright (2024-25)', url: 'https://vcet.edu.in/wp-content/uploads/2025/03/2024-25-Patent-1.pdf' },
              { label: 'Faculty Awards', url: 'https://vcet.edu.in/wp-content/uploads/2024/07/Staff_achievements.pdf' },
              { label: 'Faculty Publications', url: 'https://vcet.edu.in/wp-content/uploads/2024/07/Staff_Publications_Stats.pdf' },
              { label: 'Research Grants Received', url: 'https://vcet.edu.in/wp-content/uploads/2024/07/Research-Grants-of-IT-Dept-1-1.pdf' },
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Information Technology</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Faculty Achievements<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
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

          {/* ════ STUDENT ACHIEVEMENTS ════════════════════════════ */}
          {activeId === 'student-achievements' && (() => {
            const links = [
              { label: 'Student Achievements (Hackathon Achievers)', url: 'https://vcet.edu.in/wp-content/uploads/2024/07/Hackathon-Achivers.pdf' },
              { label: 'Sports/Cultural Activities at National/International Level', url: 'https://vcet.edu.in/wp-content/uploads/2024/07/Student-Cultural-Sports.pdf' },
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Information Technology</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Students Achievements<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
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

          {/* ════ ACTIVITIES ═══════════════════════════════════════ */}
          {activeId === 'activities' && (() => {
            const links = [
              { label: 'Hackathon', url: 'https://vcet.edu.in/hackathon/' },
              { label: 'Code Craze', url: 'https://vcet.edu.in/wp-content/uploads/2024/07/Code-Craze.pdf' },
              { label: 'Student Development Program', url: 'https://vcet.edu.in/wp-content/uploads/2024/07/student-development-program-1.pdf' },
              { label: 'Faculty Development Program', url: 'https://vcet.edu.in/wp-content/uploads/2024/07/faculty-development-program-1.pdf' },
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Information Technology</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Activities<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
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

          {/* ════ INFRASTRUCTURE ═══════════════════════════════════ */}
          {activeId === 'infrastructure' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Information Technology</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Infrastructure<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
              <p className="text-slate-600 leading-7">The department has laboratories which are well equipped with latest configuration machines, high speed internet, Wi-Fi and legal licensed software. Modern aids such as LCD, Educational CDs make classroom teaching more interesting.</p>
            </section>
          )}

          {/* ════ TOPPERS ══════════════════════════════════════════ */}
          {activeId === 'toppers' && (() => {
            const topperYears = [
              {
                year: '2023-24',
                se: ['Sahil Shah - 9.17 CGPI', 'Yash Doke - 8.96 CGPI', 'Durvesh Roge - 8.78 CGPI', 'Shreyas Pathe - 8.74 CGPI', 'Sangini Shetty - 8.65 CGPI'],
                te: ['Meet Dodiya - 9.32 CGPI', 'Akash Mourya - 9.23 CGPI', 'Seema Gupta - 8.91 CGPI', 'Ramesh Yadav - 8.86 CGPI', 'Harshi Shah - 8.82 CGPI'],
                be: ['Vatsal Shah - 9.13 CGPI', 'Kedar Malap - 9.05 CGPI', 'Abhishek Jani - 9.00 CGPI', 'Shobhit Singh - 8.93 CGPI', 'Omkar Jadhav - 8.93 CGPI'],
              },
              {
                year: '2022-23',
                se: ['Dodiya Meet - 8.7 CGPI', 'Gharat Shruti - 8.66 CGPI', 'Abhishek Jani - 8.64 CGPI', 'Zaid Khan - 8.64 CGPI', 'Shash Harshi - 8.47 CGPI'],
                te: ['Singh Shobit - 8.77 CGPI', 'Kolwankar Tejas - 9.27 CGPI', 'Malap Kedar - 8.53 CGPI', 'Jadhav Omkar - 8.52 CGPI', 'Vatsal Shah - 8.40 CGPI'],
                be: ['Kadam Aaditi - 9.37 CGPI', 'Vedant Sankhe - 8.96 CGPI', 'Mulla Insha - 8.85 CGPI', 'Vartak Viditi - 8.76 CGPI'],
              },
              {
                year: '2021-22',
                se: ['Shah Vatsal - 9.3 CGPI', 'Madhavani Soham - 9.16 CGPI', 'Jani Abhishek - 9.16 CGPI', 'Dalvi Anish - 9.090 CGPI', 'Borase Dipak - 9.085 CGPI'],
                te: ['Kolwankar Tejas - 9.40 CGPI', 'Malap Kedar - 9.20 CGPI', 'Hegde Akshay - 8.80 CGPI', 'Jain Yogesh - 8.75 CGPI', 'Bhalala Vaibhav - 8.73 CGPI'],
                be: ['Kadam Aaditi - 9.40 CGPI', 'Churihar Mohd Asim - 9.04 CGPI', 'Jadhav Granthali - 9.05 CGPI', 'Deorukhkar Jayesh - 8.96 CGPI', 'Pandya Harsh - 8.91 CGPI'],
              },
              {
                year: '2020-21',
                se: ['Kolvankar Tejas - 9.83 CGPI', 'Sankhe Vedant - 9.70 CGPI', 'Kadam Aditi - 9.68 CGPI', 'Modak Isha - 9.52 CGPI', 'Vartak Viditi - 9.52 CGPI'],
                te: ['Jadhav Granthali - 9.67 CGPI', 'Gupta Sweta - 9.66 CGPI', 'Yewale Hardik - 9.64 CGPI', 'Singh Sweety - 9.60 CGPI', 'Shirke Shivani - 9.52 CGPI'],
                be: ['Bandgar Saloni - 9.58 CGPI', 'Singh Vivek - 9.18 CGPI', 'Suthar Kirtesh - 8.97 CGPI', 'Shenoy Ritika - 8.94 CGPI', 'Sawant Shweta - 8.93 CGPI'],
              },
            ];
            return (
              <div className="space-y-6">
                {topperYears.map((set) => (
                  <section key={set.year} className="reveal bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
                    <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Toppers {set.year}<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
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
                          {[0, 1, 2, 3, 4].map((i) => (
                            <tr key={`${set.year}-${i}`} className="border-t border-slate-100">
                              <td className="px-4 py-3 text-slate-600">{set.se[i] || '-'}</td>
                              <td className="px-4 py-3 text-slate-600">{set.te[i] || '-'}</td>
                              <td className="px-4 py-3 text-slate-600">{set.be[i] || '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                ))}
              </div>
            );
          })()}

          {/* ════ SYLLABUS ═════════════════════════════════════════ */}
          {activeId === 'syllabus' && (() => {
            const links = [
              { label: 'Syllabus R12', url: 'https://vcet.edu.in/wp-content/uploads/2021/11/4.78-S.E.-IT.pdf' },
              { label: 'Syllabus R16', url: 'https://vcet.edu.in/wp-content/uploads/2021/11/R16.pdf' },
              { label: 'Syllabus R19', url: 'https://vcet.edu.in/wp-content/uploads/2022/04/R19-IT-III-IV_merged.pdf' },
              { label: 'Honours & Minor Degree Program (TE)', url: 'https://vcet.edu.in/wp-content/uploads/2023/07/Honours-Minor-Degree-Program-Data-Science.pdf' },
              { label: 'PO PSO CO R16', url: 'https://vcet.edu.in/wp-content/uploads/2023/11/2.6.1_R-2016_IT_syllabus.pdf' },
              { label: 'PO PSO CO R19', url: 'https://vcet.edu.in/wp-content/uploads/2023/11/2.6.1_IT_R-2019_syllabus.pdf' },
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Information Technology</span>
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

          {/* ════ TIME TABLE ═══════════════════════════════════════ */}
          {activeId === 'time-table' && (() => {
            const links = [
              { label: '2025-26 Odd Sem Time Table', url: 'https://vcet.edu.in/wp-content/uploads/2025/09/Timetable-V6.pdf' },
              { label: '2024-25 Even Sem Time Table', url: 'https://vcet.edu.in/wp-content/uploads/2025/04/Eve-Sem-Time-Table-2024-25.pdf' },
              { label: '2024-25 Odd Sem Time Table', url: 'https://vcet.edu.in/wp-content/uploads/2024/07/Adobe-Scan-6-Jul-2024.pdf' },
              { label: '2023-24 Even Sem Time Table', url: 'https://vcet.edu.in/wp-content/uploads/2024/07/IT-timetable-18-03-2024.pdf' },
              { label: '2023-24 Odd Sem Time Table', url: 'https://vcet.edu.in/wp-content/uploads/2024/07/Adobe-Scan-08-Jul-2024.pdf' },
              { label: '2022-23 Even Sem Time Table', url: 'https://vcet.edu.in/wp-content/uploads/2024/07/TT-Jan-31-2023.pdf' },
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Information Technology</span>
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

          {/* ════ NEWSLETTER & MAGAZINE ═══════════════════════════ */}
          {activeId === 'newsletter' && (() => {
            const newsletterLinks = [
              { label: 'NEWSLETTER 2024-25', url: 'https://vcet.edu.in/wp-content/uploads/2025/04/newsletter-final.pdf' },
              { label: 'NEWSLETTER 2023-24', url: 'https://vcet.edu.in/wp-content/uploads/2024/04/NewsletterFinal23-24.pdf' },
              { label: 'NEWSLETTER 2022-23', url: 'https://vcet.edu.in/wp-content/uploads/2023/07/ITECH-22-23-NEWSLETTER.pdf' },
              { label: 'NEWSLETTER 2021-22', url: 'https://vcet.edu.in/wp-content/uploads/2023/07/ITECH-21-22-NEWSLETTER.pdf' },
              { label: 'NEWSLETTER 2020-21', url: 'https://vcet.edu.in/wp-content/uploads/2021/12/news-letter-2021-converted.pdf' },
              { label: 'NEWSLETTER 2019-20', url: 'https://vcet.edu.in/wp-content/uploads/2021/12/NewsLetter-2020.pdf' },
              { label: 'NEWSLETTER 2018-19', url: 'https://vcet.edu.in/wp-content/uploads/2021/12/NewsLetter2019.pdf' },
              { label: 'NEWSLETTER 2017-18', url: 'https://vcet.edu.in/wp-content/uploads/2022/01/NewsLetter2018.pdf' },
              { label: 'NEWSLETTER 2016-17', url: 'https://vcet.edu.in/wp-content/uploads/2022/01/NewsLetter2017.pdf' },
              { label: 'NEWSLETTER 2015-16', url: 'https://vcet.edu.in/wp-content/uploads/2022/01/NewsLetter2016.pdf' },
              { label: 'NEWSLETTER 2014-15', url: 'https://vcet.edu.in/wp-content/uploads/2022/01/NewsLetter2015.pdf' },
              { label: 'NEWSLETTER 2013-14', url: 'https://vcet.edu.in/wp-content/uploads/2022/01/NewsLetter2014.pdf' },
              { label: 'NEWSLETTER 2012-13', url: 'https://vcet.edu.in/wp-content/uploads/2022/01/NewsLetter2013.pdf' },
              { label: 'NEWSLETTER 2011-12', url: 'https://vcet.edu.in/wp-content/uploads/2022/01/NewsLetter2012.pdf' },
              { label: 'NEWSLETTER 2010-11', url: 'https://vcet.edu.in/wp-content/uploads/2022/01/NewsLetter2011.pdf' },
              { label: 'NEWSLETTER 2009-10', url: 'https://vcet.edu.in/wp-content/uploads/2022/01/NewsLetter2010.pdf' },
            ];
            const magazineLinks = [
              { label: 'MAGAZINE 2024-25', url: 'https://vcet.edu.in/wp-content/uploads/2025/04/ITECH-MAGAZINE-2025-Version-4.pdf' },
              { label: 'MAGAZINE 2023-24', url: 'https://vcet.edu.in/wp-content/uploads/2025/04/ITECH-MAGAZINE-2025-Version-4.pdf' },
              { label: 'MAGAZINE 2022-23', url: 'https://vcet.edu.in/wp-content/uploads/2023/07/ITECH-22-23-MAGAZINE-FINAL.pdf' },
              { label: 'MAGAZINE 2021-22', url: 'https://vcet.edu.in/wp-content/uploads/2023/07/ITECH-21-22-MAGAZINE-FINAL.pdf' },
              { label: 'MAGAZINE 2020-21', url: 'https://vcet.edu.in/wp-content/uploads/2021/12/LOGIN-2021-12th-Edition-1.pdf' },
              { label: 'MAGAZINE 2019-20', url: 'https://vcet.edu.in/wp-content/uploads/2021/12/login-2020.pdf' },
              { label: 'MAGAZINE 2018-19', url: 'https://vcet.edu.in/wp-content/uploads/2021/12/login2019.pdf' },
              { label: 'MAGAZINE 2017-18', url: 'https://vcet.edu.in/wp-content/uploads/2022/01/itech2018.pdf' },
              { label: 'MAGAZINE 2016-17', url: 'https://vcet.edu.in/wp-content/uploads/2022/01/itech2017.pdf' },
              { label: 'MAGAZINE 2015-16', url: 'https://vcet.edu.in/wp-content/uploads/2022/01/itech2016.pdf' },
              { label: 'MAGAZINE 2014-15', url: 'https://vcet.edu.in/wp-content/uploads/2022/01/itech2015.pdf' },
              { label: 'MAGAZINE 2013-14', url: 'https://vcet.edu.in/wp-content/uploads/2022/01/itech2014.pdf' },
              { label: 'MAGAZINE 2012-13', url: 'https://vcet.edu.in/wp-content/uploads/2022/01/itech2013.pdf' },
              { label: 'MAGAZINE 2011-12', url: 'https://vcet.edu.in/wp-content/uploads/2022/01/itech2012.pdf' },
              { label: 'MAGAZINE 2010-11', url: 'https://vcet.edu.in/wp-content/uploads/2022/01/2011.pdf' },
              { label: 'MAGAZINE 2009-10', url: 'https://vcet.edu.in/wp-content/uploads/2022/01/2010.pdf' },
            ];
            const committee = [
              { post: 'Chairman', name: 'Prathamesh Anil Karambe' },
              { post: 'Chief editor', name: 'Smita Verma, Revathi Nair, Gaurav Gawde' },
              { post: 'Newsletter Head', name: 'Khushboo Memon' },
              { post: 'Graphics head', name: 'Tarun Parmar' },
              { post: 'Treasurer', name: 'Ravikant Sharma, Shreyash Mhashilakar' },
              { post: 'Graphics Team', name: 'Mohit Mathkar, Shraddha Pawar, Isha Vartak, Vedang Koli' },
              { post: 'Editing Team', name: 'Kinjal Patel, Raj Kotadia, Krithika Suvarna, Yash Ajgaokar, Kunal Bhoyar, Dishant Patil, Niketan Patil, Parshva Vora' },
              { post: 'Website Team', name: 'Deepchand Dubey, Yash Meghani, Shashank Kamble, Kritesh Suthar, Rahul Gandhi, Shweta Sawant' },
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 space-y-8">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Information Technology</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy relative inline-block">Newsletter &amp; Magazine<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
                <div className="space-y-4 text-slate-600 leading-7">
                  <p>ITECH is the Departmental committee which provides an opportunity to the budding engineers of VCET to enhance their knowledge about the advancement in technology.</p>
                  <p>This committee has also released the departmental NEWSLETTER which includes news articles related to advance technical scenario in the global markets.</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-brand-navy mb-3">Newsletter</h4>
                  <div className="space-y-2">{newsletterLinks.map((item) => <a key={item.label} href={item.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gold hover:bg-brand-navylight transition-colors"><span>{item.label}</span><i className="ph ph-arrow-up-right text-brand-gold" /></a>)}</div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-brand-navy mb-3">Magazine</h4>
                  <div className="space-y-2">{magazineLinks.map((item) => <a key={item.label} href={item.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gold hover:bg-brand-navylight transition-colors"><span>{item.label}</span><i className="ph ph-arrow-up-right text-brand-gold" /></a>)}</div>
                </div>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-100 bg-brand-navylight/40">
                    <h4 className="text-lg font-bold text-brand-navy">Committee Details</h4>
                    <p className="text-sm text-slate-600 mt-1">Staff Incharge: Prof. Bharati Gondhalekar | bharati.gondhalekar@vcet.edu.in | 9423365470</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-brand-navy text-white">
                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest">Post</th>
                          <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest">Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {committee.map((row, idx) => (
                          <tr key={`${row.post}-${idx}`} className={`border-t border-slate-100 ${idx % 2 === 1 ? 'bg-slate-50/60' : 'bg-white'}`}>
                            <td className="px-4 py-3 text-slate-700 font-semibold">{row.post}</td>
                            <td className="px-4 py-3 text-slate-600">{row.name}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            );
          })()}

          {/* ════ YOUTUBE ══════════════════════════════════════════ */}
          {activeId === 'youtube' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Information Technology</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Department YouTube Channel<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
              <a href="https://www.youtube.com/watch?v=LXFYw7afkQQ&list=UUiXUwtsG0IsktJ69rjPZTgQ" target="_blank" rel="noopener noreferrer" className="group mt-3 flex w-full sm:w-max items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gold hover:bg-brand-navylight transition-colors">
                <span>IT Department YouTube Playlist</span>
                <i className="ph ph-arrow-up-right text-brand-gold" />
              </a>
            </section>
          )}

          {/* ════ FALLBACK ════════════════════════════════════════ */}
          {activeId !== 'about' && activeId !== 'vision' && activeId !== 'dab' && activeId !== 'peo' && activeId !== 'faculty' && activeId !== 'mou' && activeId !== 'paqic' && activeId !== 'faculty-achievements' && activeId !== 'student-achievements' && activeId !== 'activities' && activeId !== 'infrastructure' && activeId !== 'toppers' && activeId !== 'syllabus' && activeId !== 'time-table' && activeId !== 'newsletter' && activeId !== 'youtube' && (
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

export default DeptIT;
