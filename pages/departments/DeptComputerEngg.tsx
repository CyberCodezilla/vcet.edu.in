import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';

/* ── Sidebar navigation links ─────────────────────────────── */
const sidebarLinks = [
  { id: 'about',        label: 'About',                        icon: 'ph-info' },
  { id: 'vision',       label: 'Vision and Mission',           icon: 'ph-target' },
  { id: 'dab',          label: 'Departmental Advisory Board',  icon: 'ph-users-three' },
  { id: 'mou',          label: 'MoU',                          icon: 'ph-handshake' },
  { id: 'patent',       label: 'Patent',                       icon: 'ph-certificate' },
  { id: 'peo',          label: 'POs, PEOs, PSOs',              icon: 'ph-chart-bar' },
  { id: 'faculty',      label: 'Faculty',                      icon: 'ph-chalkboard-teacher' },
  { id: 'toppers',      label: 'Toppers',                      icon: 'ph-medal' },
  { id: 'syllabus',     label: 'Syllabus',                     icon: 'ph-book-open' },
  { id: 'publications', label: 'Publications',                 icon: 'ph-file-text' },
  { id: 'newsletter',   label: 'Newsletter',                   icon: 'ph-newspaper' },
];

/* ── Core skills ────────────────────────────────────────────── */
const skills = [
  { icon: 'ph-code',            label: 'Programming & Algorithms' },
  { icon: 'ph-database',        label: 'Database Management' },
  { icon: 'ph-brain',           label: 'Artificial Intelligence & ML' },
  { icon: 'ph-cloud',           label: 'Cloud Computing' },
  { icon: 'ph-shield-check',    label: 'Cyber Security' },
  { icon: 'ph-network',         label: 'Computer Networks' },
  { icon: 'ph-terminal-window', label: 'Operating Systems' },
];

/* ── Career roles ────────────────────────────────────────────── */
const roles = [
  {
    icon: 'ph-code-block', accent: 'gold', title: 'Software Engineer',
    description: "Software Engineers design, develop, and maintain software systems. They work across the full stack — from backend logic to frontend interfaces — applying engineering principles to create reliable, scalable, and maintainable software products for businesses and end users.",
  },
  {
    icon: 'ph-cloud-arrow-up', accent: 'navy', title: 'Cloud & DevOps Engineer',
    description: "Cloud & DevOps Engineers build and maintain the infrastructure that powers modern applications. They automate deployment pipelines, manage cloud platforms (AWS, Azure, GCP), and bridge the gap between development and operations to accelerate delivery cycles.",
  },
  {
    icon: 'ph-shield-check', accent: 'gold', title: 'Cybersecurity Analyst',
    description: "Cybersecurity Analysts protect organizational systems from digital threats. They monitor networks for breaches, conduct vulnerability assessments, implement security protocols, and respond to incidents — ensuring the confidentiality, integrity, and availability of data.",
  },
  {
    icon: 'ph-graph', accent: 'navy', title: 'Machine Learning Engineer',
    description: "ML Engineers build intelligent systems that learn from data. They design and deploy machine learning models for applications such as recommendation systems, image recognition, natural language processing, and predictive analytics.",
  },
  {
    icon: 'ph-device-mobile', accent: 'gold', title: 'Full Stack / App Developer',
    description: "Full Stack Developers craft end-to-end digital products — designing databases, writing server-side logic, and building responsive user interfaces. App Developers specialize in mobile platforms, creating feature-rich iOS and Android applications.",
  },
];

const delayClass = (idx: number) =>
  idx % 3 === 0 ? 'delay-100' : idx % 3 === 1 ? 'delay-200' : 'delay-300';

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
      <header className="relative bg-gradient-to-r from-brand-navy to-slate-800 pt-28 pb-16 overflow-hidden shadow-lg border-b-4 border-brand-gold">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white opacity-5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-64 h-64 rounded-full bg-brand-gold opacity-10 blur-2xl pointer-events-none" />
        <nav className="absolute top-[52px] left-6 z-20 flex items-center space-x-2 text-sm font-medium text-white/70">
          <a href="/" className="hover:text-brand-gold transition-colors duration-200 flex items-center"><i className="ph ph-house text-base" /></a>
          <i className="ph ph-caret-right text-xs" />
          <span className="text-brand-gold font-semibold">Computer Engineering</span>
        </nav>
        <div className="container mx-auto px-6 max-w-7xl relative z-10">

          <h1 className="font-display font-bold text-white leading-[1.08] tracking-tight text-center">
            <span className="block text-4xl md:text-5xl lg:text-6xl">Computer Engineering</span>
          </h1>
        </div>
      </header>

      {/* ── Page Body ────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 py-12 max-w-7xl flex flex-col lg:flex-row gap-10">

        {/* ── Sticky Sidebar ───────────────────────────────────── */}
        <aside className="w-full lg:w-1/4 flex-shrink-0">
          <div className="sticky top-28 bg-white rounded-xl shadow-md overflow-hidden border border-slate-200">
            <nav className="flex flex-col py-2">
              {sidebarLinks.map((link) => {
                const isActive = activeId === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => setActiveId(link.id)}
                    className={`px-5 py-3 text-sm text-left transition-all flex items-center justify-between group border-l-[3px] ${
                      isActive
                        ? 'bg-brand-navy text-brand-gold font-semibold border-brand-gold'
                        : 'text-brand-navy font-medium hover:bg-brand-navylight border-transparent hover:border-brand-gold'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <i className={`ph ${link.icon} text-lg ${isActive ? '' : 'opacity-70'}`} />
                      {link.label}
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
        <main className="w-full lg:w-3/4 space-y-16">

          {/* ════ ABOUT ═════════════════════════════════════════ */}
          {activeId === 'about' && (
            <>
              {/* dept info */}
              <section className="reveal bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="space-y-6 text-slate-600 leading-relaxed text-justify">
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
                    and a wall magazine designed by students.
                  </p>
                  <p>
                    The Department encourages students for various IPR activities such as publications, copyrights, and patents. The
                    Department provides placement and higher studies support through various guidance sessions.
                  </p>
                  <div className="bg-gradient-to-r from-brand-navylight to-white p-6 rounded-2xl border-l-4 border-brand-gold shadow-inner">
                    <p className="text-brand-navy font-semibold m-0 flex items-start gap-3">
                      <i className="ph-fill ph-lightbulb text-brand-gold text-2xl mt-1 flex-shrink-0" />
                      The Department's strong industry connect and placement track record make it one of the most sought-after programs at VCET.
                    </p>
                  </div>
                </div>
              </section>

              {/* Skills */}
              <section className="reveal">
                <h2 className="text-3xl font-bold text-brand-navy relative inline-block mb-10">
                  Core Skills in Computer Engineering:
                  <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" />
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {skills.map((skill, idx) => (
                    <div
                      key={skill.label}
                      className={`reveal ${delayClass(idx)} bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:-translate-y-1 hover:shadow-md hover:border-brand-gold transition-all duration-300 flex items-center gap-4 group`}
                    >
                      <div className="w-12 h-12 rounded-xl bg-brand-navylight flex items-center justify-center text-brand-navy group-hover:bg-brand-gold group-hover:text-white transition-colors flex-shrink-0">
                        <i className={`ph ${skill.icon} text-2xl`} />
                      </div>
                      <span className="font-semibold text-slate-700 leading-tight">{skill.label}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Career Roles */}
              <section className="reveal">
                <h2 className="text-3xl font-bold text-brand-navy relative inline-block mb-12">
                  Prominent Career Roles in Computer Engineering:
                  <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" />
                </h2>
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-brand-navy before:via-brand-navylight before:to-transparent">
                  {roles.map((role, idx) => (
                    <div
                      key={role.title}
                      className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group reveal ${delayClass(idx)}`}
                    >
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform group-hover:scale-110 ${
                          role.accent === 'gold' ? 'bg-brand-gold' : 'bg-brand-navy'
                        }`}
                      >
                        <i className={`ph-fill ${role.icon} text-white text-lg`} />
                      </div>
                      <div
                        className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow border-t-4 ${
                          role.accent === 'gold' ? 'bg-[#deeaf7] border-t-brand-navy' : 'bg-[#e8f2fb] border-t-brand-gold'
                        }`}
                      >
                        <h3 className="text-xl font-bold text-brand-gold mb-3">{role.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed text-justify">{role.description}</p>
                      </div>
                    </div>
                  ))}
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
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(253,184,19,0.15)', border: '1px solid rgba(253,184,19,0.3)' }}>
                        <i className="ph-fill ph-eye text-xl text-brand-gold" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold/70">Department</p>
                        <p className="text-sm font-bold text-white/90 uppercase tracking-widest">Vision</p>
                      </div>
                    </div>
                    <blockquote className="text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-white leading-[1.3] italic mb-10 max-w-4xl">
                      "To develop competent Computer Engineers empowered with knowledge, skills, and ethical values to serve industry and society."
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
                    <span className="text-xs tracking-wide">4 Pillars</span>
                  </div>
                </div>
                <div className="h-px bg-gradient-to-r from-brand-gold via-brand-navylight to-transparent" />

                <div className="grid md:grid-cols-2 gap-5 pt-2">
                  {[
                    {
                      id: '01', delay: 'delay-100', icon: 'ph-graduation-cap',
                      title: 'Quality Education',
                      body: 'Provide quality education in Computer Engineering with strong fundamentals, preparing graduates who can engineer solutions across software, hardware, and networking domains.',
                    },
                    {
                      id: '02', delay: 'delay-200', icon: 'ph-lightbulb',
                      title: 'Innovation & Research',
                      body: 'Foster innovation, research aptitude, and entrepreneurial skills by encouraging students to publish, patent, and participate in national and international competitions.',
                    },
                    {
                      id: '03', delay: 'delay-300', icon: 'ph-compass',
                      title: 'Ethics & Social Responsibility',
                      body: 'Inculcate professional ethics, leadership qualities, and social responsibility, enabling graduates to be conscientious contributors to their organizations and communities.',
                    },
                    {
                      id: '04', delay: 'delay-100', icon: 'ph-buildings',
                      title: 'Industry–Institute Interaction',
                      body: 'Establish strong industry-institute interaction for holistic student development through MoUs, internships, guest lectures, and industry-sponsored projects.',
                    },
                  ].map((m, idx) => (
                    <div
                      key={m.id}
                      className={`reveal ${m.delay} group relative bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col`}
                    >
                      <div className="absolute inset-0 bg-brand-navy opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                      <span className="absolute top-4 right-5 text-6xl font-display font-bold text-slate-100 group-hover:text-white/10 transition-colors duration-300 leading-none select-none">{m.id}</span>
                      <div className="relative z-10 flex flex-col flex-1">
                        <div className="w-11 h-11 rounded-xl bg-brand-navylight group-hover:bg-brand-gold/20 flex items-center justify-center mb-5 transition-colors duration-300">
                          <i className={`ph-fill ${m.icon} text-xl text-brand-navy group-hover:text-brand-gold transition-colors duration-300`} />
                        </div>
                        <h3 className="text-base font-bold text-brand-navy group-hover:text-white transition-colors duration-300 mb-3 leading-snug">{m.title}</h3>
                        <p className="text-sm text-slate-500 group-hover:text-white/70 leading-relaxed transition-colors duration-300 flex-1">{m.body}</p>
                        <div className="mt-6 flex items-center gap-2">
                          <div className="h-px flex-1 bg-slate-100 group-hover:bg-white/20 transition-colors duration-300" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">M{idx + 1}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* ════ DAB ════════════════════════════════════════════ */}
          {activeId === 'dab' && (() => {
            const members = [
              { sr: 1, name: 'Dr. Rakesh Himte',   designation: 'Principal',                    org: 'VCET, Vasai',       role: 'Chairman',                tag: 'internal' },
              { sr: 2, name: 'Dr. Megha Trivedi',   designation: 'HOD, Computer Engineering',   org: 'VCET, Vasai',       role: 'Head of Department',      tag: 'internal' },
              { sr: 3, name: 'TBD',                 designation: 'Academic Representative',      org: 'External Institute', role: 'Academic Representative', tag: 'academic' },
              { sr: 4, name: 'TBD',                 designation: 'Academic Representative',      org: 'External Institute', role: 'Academic Representative', tag: 'academic' },
              { sr: 5, name: 'TBD',                 designation: 'Industry Expert',              org: 'Industry Partner',   role: 'Industry Representative', tag: 'industry' },
              { sr: 6, name: 'TBD',                 designation: 'Industry Expert',              org: 'Industry Partner',   role: 'Industry Representative', tag: 'industry' },
              { sr: 7, name: 'TBD',                 designation: 'Senior Faculty, Comp. Engg',   org: 'VCET, Vasai',       role: 'Secretary',               tag: 'internal' },
              { sr: 8, name: 'TBD',                 designation: 'BE Student',                   org: 'VCET, Vasai',       role: 'Student Representative',  tag: 'student'  },
              { sr: 9, name: 'TBD',                 designation: 'TE Student',                   org: 'VCET, Vasai',       role: 'Student Representative',  tag: 'student'  },
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
                  <div className="mt-3 flex items-center gap-2 text-slate-500 text-sm">
                    <i className="ph-fill ph-check-circle text-brand-gold text-base" />
                    Following are the members of the committee starting from 2022&#8209;23.
                  </div>
                  <div className="mt-5 h-px bg-gradient-to-r from-brand-gold via-brand-navylight to-transparent" />
                </div>
                <div className="reveal grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { count: '2', label: 'Industry Experts', icon: 'ph-buildings' },
                    { count: '2', label: 'Academic Reps',    icon: 'ph-graduation-cap' },
                    { count: '2', label: 'Student Reps',     icon: 'ph-student' },
                    { count: '3', label: 'Internal Members', icon: 'ph-users' },
                  ].map(s => (
                    <div key={s.label} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-navylight flex items-center justify-center flex-shrink-0">
                        <i className={`ph-fill ${s.icon} text-xl text-brand-navy`} />
                      </div>
                      <div>
                        <p className="text-2xl font-display font-bold text-brand-navy leading-none">{s.count}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{s.label}</p>
                      </div>
                    </div>
                  ))}
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
              { n: 'PSO1', text: 'To apply the knowledge of Computer Engineering to analyze, design, and implement solutions for complex computational problems using modern software tools.' },
              { n: 'PSO2', text: 'To develop applications leveraging AI, cloud computing, cybersecurity, and networking technologies to address real-world industry challenges.' },
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
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-navy flex items-center justify-center flex-shrink-0">
                      <i className="ph-fill ph-chart-bar text-brand-gold text-lg" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">12 Outcomes</p>
                      <h3 className="text-2xl font-display font-bold text-brand-navy leading-tight">Program Outcomes (POs)</h3>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {pos.map((po, idx) => (
                      <div
                        key={po.n}
                        className={`reveal ${idx % 3 === 0 ? 'delay-100' : idx % 3 === 1 ? 'delay-200' : 'delay-300'} group flex gap-4 items-start bg-white border border-slate-100 rounded-xl px-5 py-4 shadow-sm hover:shadow-md hover:border-brand-gold/40 hover:-translate-y-0.5 transition-all duration-200`}
                      >
                        <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-brand-navylight group-hover:bg-brand-navy flex items-center justify-center text-[11px] font-bold text-brand-navy group-hover:text-brand-gold transition-colors duration-200">
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
                    <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(253,184,19,0.15)', border: '1px solid rgba(253,184,19,0.3)' }}>
                        <i className="ph-fill ph-target text-2xl text-brand-gold" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold/80 mb-1">Objectives</p>
                        <h3 className="text-2xl font-display font-bold text-white mb-2">Program Educational Objectives (PEOs)</h3>
                        <p className="text-white/60 text-sm leading-relaxed">PEO details will be published by the department. Please check back or contact the department office for the latest information.</p>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="reveal space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-gold flex items-center justify-center flex-shrink-0">
                      <i className="ph-fill ph-star text-white text-lg" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">Computer Engineering Specific</p>
                      <h3 className="text-2xl font-display font-bold text-brand-navy leading-tight">Program Specific Outcomes (PSOs)</h3>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    {psos.map((pso, idx) => (
                      <div
                        key={pso.n}
                        className={`reveal ${idx === 0 ? 'delay-100' : 'delay-200'} relative group bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
                      >
                        <div className="absolute inset-0 bg-brand-navy opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                        <span className="absolute bottom-3 right-5 text-7xl font-display font-bold text-slate-100 group-hover:text-white/10 transition-colors duration-300 leading-none select-none">{idx + 1}</span>
                        <div className="relative z-10">
                          <span className="inline-block px-3 py-1 rounded-full bg-brand-navylight group-hover:bg-brand-gold/20 text-brand-navy group-hover:text-brand-gold text-[11px] font-bold uppercase tracking-widest mb-4 transition-colors duration-300">{pso.n}</span>
                          <p className="text-slate-600 group-hover:text-white/80 text-sm leading-relaxed transition-colors duration-300">{pso.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            );
          })()}

          {/* ════ FACULTY ════════════════════════════════════════ */}
          {activeId === 'faculty' && (() => {
            const faculty = [
              {
                slug: 'dr-megha-trivedi',
                name: 'Dr. Megha Trivedi',
                post: 'Associate Professor & Head Of Department',
                email: 'megha.trivedi@vcet.edu.in',
                photo: '/Images/departments/comp/faculty/dr-megha-trivedi.jpg',
                initials: 'MT',
                color: '#1a4b7c',
              },
              {
                slug: 'dr-dinesh-patil',
                name: 'Dr. Dinesh Patil',
                post: 'Associate Professor',
                email: 'dinesh.patil@vcet.edu.in',
                photo: '/Images/departments/comp/faculty/dr-dinesh-patil.jpg',
                initials: 'DP',
                color: '#2563a8',
              },
              {
                slug: 'dr-swapna-borde',
                name: 'Dr. Swapna Borde',
                post: 'Asst. Prof.',
                email: 'swapna.borde@vcet.edu.in',
                photo: '/Images/departments/comp/faculty/dr-swapna-borde.jpg',
                initials: 'SB',
                color: '#1a4b7c',
              },
              {
                slug: 'anil-hingmire',
                name: 'Anil Hingmire',
                post: 'Asst. Prof. & Deputy HOD',
                email: 'anil.hingmire@vcet.edu.in',
                photo: '/Images/departments/comp/faculty/anil-hingmire.jpg',
                initials: 'AH',
                color: '#2563a8',
              },
              {
                slug: 'smita-jawale',
                name: 'Smita Jawale',
                post: 'Asst. Prof. & Deputy HOD',
                email: 'smita.jawale@vcet.edu.in',
                photo: '/Images/departments/comp/faculty/smita-jawale.jpg',
                initials: 'SJ',
                color: '#1a4b7c',
              },
              {
                slug: 'sunil-katkar',
                name: 'Sunil Katkar',
                post: 'Asst. Prof.',
                email: 'sunil.katkar@vcet.edu.in',
                photo: '/Images/departments/comp/faculty/sunil-katkar.jpg',
                initials: 'SK',
                color: '#2563a8',
              },
              {
                slug: 'dr-swati-varma',
                name: 'Dr. Swati Varma',
                post: 'Asst. Prof.',
                email: 'swati.varma@vcet.edu.in',
                photo: '/Images/departments/comp/faculty/dr-swati-varma.jpg',
                initials: 'SV',
                color: '#1a4b7c',
              },
              {
                slug: 'sanket-patil',
                name: 'Mr. Sanket Patil',
                post: 'Asst. Prof. (Ph.D. Pursuing)',
                email: 'sanket.patil@vcet.edu.in',
                photo: '/Images/departments/comp/faculty/sanket-patil.jpg',
                initials: 'SP',
                color: '#2563a8',
              },
              {
                slug: 'dr-sneha-mhatre',
                name: 'Dr. Sneha Mhatre',
                post: 'Asst. Prof.',
                email: 'sneha.mhatre@vcet.edu.in',
                photo: '/Images/departments/comp/faculty/dr-sneha-mhatre.jpg',
                initials: 'SM',
                color: '#1a4b7c',
              },
              {
                slug: 'vishal-pande',
                name: 'Mr. Vishal Pande',
                post: 'Asst. Prof.',
                email: 'vishal.pande@vcet.edu.in',
                photo: '/Images/departments/comp/faculty/vishal-pande.jpg',
                initials: 'VP',
                color: '#2563a8',
              },
              {
                slug: 'neha-surti',
                name: 'Ms. Neha Surti',
                post: 'Asst. Prof.',
                email: 'neha.surti@vcet.edu.in',
                photo: '/Images/departments/comp/faculty/neha-surti.jpg',
                initials: 'NS',
                color: '#1a4b7c',
              },
              {
                slug: 'brinal-colaco',
                name: 'Ms. Brinal Colaco',
                post: 'Asst. Prof. (Ph.D. Pursuing)',
                email: 'brinal.colaco@vcet.edu.in',
                photo: '/Images/departments/comp/faculty/brinal-colaco.jpg',
                initials: 'BC',
                color: '#2563a8',
              },
              {
                slug: 'sweety-patil',
                name: 'Ms. Sweety Patil',
                post: 'Asst. Prof.',
                email: 'sweety.patil@vcet.edu.in',
                photo: '/Images/departments/comp/faculty/sweety-patil.jpg',
                initials: 'SP',
                color: '#1a4b7c',
              },
              {
                slug: 'soniya-khatu',
                name: 'Ms. Soniya Khatu',
                post: 'Asst. Prof.',
                email: 'soniya.khatu@vcet.edu.in',
                photo: '/Images/departments/comp/faculty/soniya-khatu.jpg',
                initials: 'SK',
                color: '#2563a8',
              },
              {
                slug: 'bhakti-jadhav',
                name: 'Ms. Bhakti Jadhav',
                post: 'Asst. Prof.',
                email: 'bhakti.jadhav@vcet.edu.in',
                photo: '/Images/departments/comp/faculty/bhakti-jadhav.jpg',
                initials: 'BJ',
                color: '#1a4b7c',
              },
              {
                slug: 'manali-payghan',
                name: 'Ms. Manali Payghan',
                post: 'Asst. Prof.',
                email: 'manali.payghan@vcet.edu.in',
                photo: '/Images/departments/comp/faculty/manali-payghan.jpg',
                initials: 'MP',
                color: '#2563a8',
              },
              {
                slug: 'vinal-waghela',
                name: 'Ms. Vinal Waghela',
                post: 'Asst. Prof.',
                email: 'vinal.waghela@vcet.edu.in',
                photo: '/Images/departments/comp/faculty/vinal-waghela.jpg',
                initials: 'VW',
                color: '#1a4b7c',
              },
              {
                slug: 'joyce-lemos',
                name: 'Ms. Joyce Lemos',
                post: 'Asst. Prof.',
                email: 'joyce.dsouza@vcet.edu.in',
                photo: '/Images/departments/comp/faculty/joyce-lemos.jpg',
                initials: 'JL',
                color: '#2563a8',
              },
              {
                slug: 'sridhar-subramanian',
                name: 'Mr. Sridhar Subramanian',
                post: 'Asst. Prof.',
                email: 'sridhar.s@vcet.edu.in',
                photo: '/Images/departments/comp/faculty/sridhar-subramanian.jpg',
                initials: 'SS',
                color: '#1a4b7c',
              },
              {
                slug: 'atharva-desai',
                name: 'Mr. Atharva Desai',
                post: 'Asst. Prof.',
                email: 'atharva.desai@vcet.edu.in',
                photo: '/Images/departments/comp/faculty/atharva-desai.jpg',
                initials: 'AD',
                color: '#2563a8',
              },
              {
                slug: 'awantika-sharma',
                name: 'Ms. Awantika Sharma',
                post: 'Asst. Prof.',
                email: 'awantika.sharma@vcet.edu.in',
                photo: '/Images/departments/comp/faculty/awantika-sharma.jpg',
                initials: 'AS',
                color: '#1a4b7c',
              },
              {
                slug: 'shilpa-jaiswal',
                name: 'Ms. Shilpa Jaiswal',
                post: 'Asst. Prof.',
                email: 'shilpa.jaiswal@vcet.edu.in',
                photo: '/Images/departments/comp/faculty/shilpa-jaiswal.jpg',
                initials: 'SJ',
                color: '#2563a8',
              },
              {
                slug: 'vanashree-gaikwad',
                name: 'Ms. Vanashree Gaikwad',
                post: 'Asst. Prof.',
                email: 'vanashree.gaikwad@vcet.edu.in',
                photo: '/Images/departments/comp/faculty/vanashree-gaikwad.jpg',
                initials: 'VG',
                color: '#1a4b7c',
              },
            ];
            return (
              <div className="space-y-10">
                {/* Section header — compact bar */}
                <div className="reveal flex items-center justify-between flex-wrap gap-4 pb-5 border-b-2 border-brand-gold/30">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-navy/60 flex items-center gap-2 mb-1">
                      <i className="ph-fill ph-chalkboard-teacher text-sm text-brand-navy/50" /> Computer Engineering
                    </span>
                    <h2 className="text-2xl font-display font-bold text-brand-navy">Our Faculty</h2>
                  </div>
                  <div className="flex items-center divide-x divide-slate-200">
                    {[
                      { icon: 'ph-users-three',    value: `${faculty.length}`, label: 'Members' },
                      { icon: 'ph-graduation-cap', value: '5',                 label: 'PhD' },
                      { icon: 'ph-trophy',         value: '100+',              label: 'Yrs Exp.' },
                    ].map(stat => (
                      <div key={stat.label} className="flex items-center gap-2.5 px-5">
                        <i className={`ph-fill ${stat.icon} text-lg text-brand-navy`} />
                        <div>
                          <span className="text-lg font-bold text-brand-navy leading-none">{stat.value}</span>
                          <span className="block text-[11px] text-slate-500 mt-0.5">{stat.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Faculty cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-4">
                  {faculty.map((f) => (
                    <Link
                      key={f.email}
                      to={`/computer-engineering/faculty/${f.slug}`}
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
                            (t.nextElementSibling as HTMLElement)!.style.display = 'flex';
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
                      <a
                        href={`mailto:${f.email}`}
                        className="flex items-center gap-2 text-xs text-gray-500 hover:text-[#1a4b7c] transition-colors w-full"
                      >
                        <i className="ph-fill ph-envelope text-sm shrink-0 text-gray-400" />
                        <span className="truncate">{f.email}</span>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* ════ OTHER SECTIONS (placeholder) ═════════════════ */}
          {activeId !== 'about' && activeId !== 'vision' && activeId !== 'dab' && activeId !== 'peo' && activeId !== 'faculty' && (
            <section className="reveal bg-white rounded-3xl p-12 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center min-h-[300px]">
              <div className="w-16 h-16 rounded-2xl bg-brand-navylight flex items-center justify-center mb-4">
                <i className={`ph ${activeLink?.icon ?? 'ph-folder'} text-3xl text-brand-navy`} />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-2">{activeLink?.label}</h3>
              <p className="text-slate-500">Content for this section is coming soon.</p>
            </section>
          )}

        </main>
      </div>
    </PageLayout>
  );
};

export default DeptComputerEngg;
