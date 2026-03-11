import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';

const sidebarLinks = [
  { id: 'about',      label: 'About',                        icon: 'ph-info' },
  { id: 'vision',     label: 'Vision and Mission',           icon: 'ph-target' },
  { id: 'dab',        label: 'Departmental Advisory Board',  icon: 'ph-users-three' },
  { id: 'mou',        label: 'MoU',                          icon: 'ph-handshake' },
  { id: 'patent',     label: 'Patent',                       icon: 'ph-certificate' },
  { id: 'peo',        label: 'POs, PEOs, PSOs',              icon: 'ph-chart-bar' },
  { id: 'faculty',    label: 'Faculty',                      icon: 'ph-chalkboard-teacher' },
  { id: 'toppers',    label: 'Toppers',                      icon: 'ph-medal' },
  { id: 'syllabus',   label: 'Syllabus',                     icon: 'ph-book-open' },
  { id: 'newsletter', label: 'Newsletter',                   icon: 'ph-newspaper' },
];

const skills = [
  { icon: 'ph-building',         label: 'Structural Analysis & Design' },
  { icon: 'ph-mountains',        label: 'Geotechnical Engineering' },
  { icon: 'ph-waves',            label: 'Fluid Mechanics & Hydraulics' },
  { icon: 'ph-map-trifold',      label: 'Surveying & GIS' },
  { icon: 'ph-leaf',             label: 'Environmental Engineering' },
  { icon: 'ph-monitor',          label: 'CAD & BIM Software' },
  { icon: 'ph-hard-hat',         label: 'Construction Management' },
];

const roles = [
  {
    icon: 'ph-building', accent: 'gold', title: 'Structural Engineer',
    description: 'Structural Engineers design and analyze load-bearing structures — from residential buildings and bridges to high-rises and dams. They apply principles of statics, mechanics of materials, and finite element analysis to ensure structures are safe, durable, and economically viable under all loading conditions.',
  },
  {
    icon: 'ph-mountains', accent: 'navy', title: 'Geotechnical Engineer',
    description: 'Geotechnical Engineers investigate subsurface conditions to design foundations, retaining walls, embankments, and tunnels. They analyze soil and rock properties, assess slope stability, and recommend solutions for infrastructure built on or within the earth.',
  },
  {
    icon: 'ph-leaf', accent: 'gold', title: 'Environmental Engineer',
    description: 'Environmental Engineers design systems for water treatment, sewage management, solid waste disposal, and pollution control. They ensure infrastructure development complies with environmental regulations and sustainability principles, protecting both public health and natural ecosystems.',
  },
  {
    icon: 'ph-hard-hat', accent: 'navy', title: 'Construction Project Manager',
    description: 'Construction Project Managers oversee the planning, execution, and completion of building and infrastructure projects. They manage budgets, timelines, contractor relationships, and site operations — ensuring that projects are delivered safely, on time, and within budget.',
  },
  {
    icon: 'ph-road-horizon', accent: 'gold', title: 'Transportation Engineer',
    description: 'Transportation Engineers plan and design road networks, highways, bridges, and transit systems. They analyze traffic flow, improve road safety, and develop sustainable mobility solutions for urban and rural environments, often using simulation and GIS tools.',
  },
];

const delayClass = (idx: number) =>
  idx % 3 === 0 ? 'delay-100' : idx % 3 === 1 ? 'delay-200' : 'delay-300';

const DeptCivil: React.FC = () => {
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
      <header className="relative bg-gradient-to-r from-brand-navy to-slate-800 pt-28 pb-16 overflow-hidden shadow-lg border-b-4 border-brand-gold">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white opacity-5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-64 h-64 rounded-full bg-brand-gold opacity-10 blur-2xl pointer-events-none" />
        <nav className="absolute top-[52px] left-6 z-20 flex items-center space-x-2 text-sm font-medium text-white/70">
          <a href="/" className="hover:text-brand-gold transition-colors duration-200 flex items-center"><i className="ph ph-house text-base" /></a>
          <i className="ph ph-caret-right text-xs" />
          <a href="/departments" className="hover:text-brand-gold transition-colors duration-200">Departments</a>
          <i className="ph ph-caret-right text-xs" />
          <span className="text-brand-gold font-semibold">Civil Engineering</span>
        </nav>
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex items-center justify-center gap-4 mb-5">
            <span className="flex-shrink-0 w-10 h-px bg-brand-gold/70" />
            <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold whitespace-nowrap">Department of Engineering</span>
            <span className="flex-shrink-0 w-10 h-px bg-brand-gold/70" />
          </div>
          <h1 className="font-display font-bold text-white leading-[1.08] tracking-tight text-center">
            <span className="block text-4xl md:text-5xl lg:text-6xl">Civil Engineering</span>
          </h1>
        </div>
      </header>

      {/* ── Page Body ───────────────────────────────────────────── */}
      <div className="container mx-auto px-6 py-12 max-w-7xl flex flex-col lg:flex-row gap-10">

        {/* Sticky Sidebar */}
        <aside className="w-full lg:w-1/4 flex-shrink-0">
          <div className="sticky top-28 bg-white rounded-xl shadow-md overflow-hidden border border-slate-200">
            <nav className="flex flex-col py-2">
              {sidebarLinks.map((link) => {
                const isActive = activeId === link.id;
                return (
                  <button key={link.id} onClick={() => setActiveId(link.id)}
                    className={`px-5 py-3 text-sm text-left transition-all flex items-center justify-between group border-l-[3px] ${isActive ? 'bg-brand-navy text-brand-gold font-semibold border-brand-gold' : 'text-brand-navy font-medium hover:bg-brand-navylight border-transparent hover:border-brand-gold'}`}
                  >
                    <span className="flex items-center gap-3">
                      <i className={`ph ${link.icon} text-lg ${isActive ? '' : 'opacity-70'}`} />
                      {link.label}
                    </span>
                    {isActive && <i className="ph ph-arrow-right text-xs transform group-hover:translate-x-1 transition-transform" />}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-full lg:w-3/4 space-y-16">

          {/* ════ ABOUT ════════════════════════════════════════════ */}
          {activeId === 'about' && (
            <>
              <section className="reveal bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="space-y-6 text-slate-600 leading-relaxed text-justify">
                  <p>
                    The Department of Civil Engineering was established in 1994 as one of the founding departments of VCET. With an
                    undergraduate intake of 60 seats, the department has been a cornerstone of quality engineering education, producing
                    graduates who excel across the construction, infrastructure, water resources, and environmental sectors.
                  </p>
                  <p>
                    The department also offers a prestigious postgraduate program — M.E. in Structural Engineering — with an intake of
                    24 seats. This program deepens expertise in advanced structural analysis, finite element methods, earthquake
                    engineering, and bridge design, preparing graduates for research and specialist professional roles.
                  </p>
                  <p>
                    Well-equipped laboratories in Surveying, Material Testing, Fluid Mechanics, Geotechnical Engineering, Environmental
                    Engineering, and Computer-Aided Design give students extensive hands-on experience. Field visits, industrial
                    training, and project-based learning bridge the gap between classroom theory and real-world civil engineering practice.
                  </p>
                  <div className="bg-gradient-to-r from-brand-navylight to-white p-6 rounded-2xl border-l-4 border-brand-gold shadow-inner">
                    <p className="text-brand-navy font-semibold m-0 flex items-start gap-3">
                      <i className="ph-fill ph-buildings text-brand-gold text-2xl mt-1 flex-shrink-0" />
                      With three decades of academic excellence, a dedicated PG program in Structural Engineering, and strong
                      industry-academia linkages, VCET Civil Engineering graduates contribute to building India's infrastructure future.
                    </p>
                  </div>
                </div>
              </section>

              <section className="reveal">
                <h2 className="text-3xl font-bold text-brand-navy relative inline-block mb-10">
                  Core Skills in Civil Engineering:
                  <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" />
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {skills.map((skill, idx) => (
                    <div key={skill.label} className={`reveal ${delayClass(idx)} bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:-translate-y-1 hover:shadow-md hover:border-brand-gold transition-all duration-300 flex items-center gap-4 group`}>
                      <div className="w-12 h-12 rounded-xl bg-brand-navylight flex items-center justify-center text-brand-navy group-hover:bg-brand-gold group-hover:text-white transition-colors flex-shrink-0">
                        <i className={`ph ${skill.icon} text-2xl`} />
                      </div>
                      <span className="font-semibold text-slate-700 leading-tight">{skill.label}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="reveal">
                <h2 className="text-3xl font-bold text-brand-navy relative inline-block mb-12">
                  Prominent Career Roles in Civil Engineering:
                  <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" />
                </h2>
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-brand-navy before:via-brand-navylight before:to-transparent">
                  {roles.map((role, idx) => (
                    <div key={role.title} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group reveal ${delayClass(idx)}`}>
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform group-hover:scale-110 ${role.accent === 'gold' ? 'bg-brand-gold' : 'bg-brand-navy'}`}>
                        <i className={`ph-fill ${role.icon} text-white text-lg`} />
                      </div>
                      <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow border-t-4 ${role.accent === 'gold' ? 'bg-[#deeaf7] border-t-brand-navy' : 'bg-[#e8f2fb] border-t-brand-gold'}`}>
                        <h3 className="text-xl font-bold text-brand-gold mb-3">{role.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed text-justify">{role.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {/* ════ VISION & MISSION ═════════════════════════════════ */}
          {activeId === 'vision' && (
            <div className="space-y-16">
              <div className="reveal flex items-center gap-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Civil Engineering Department</span>
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
                      "To be a center of excellence in Civil Engineering, contributing to the development of sustainable, resilient, and eco-friendly infrastructure."
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div className="h-px flex-1 bg-white/10" />
                      <span className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-semibold">VCET · Civil Engineering</span>
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
                    { id: '01', delay: 'delay-100', icon: 'ph-graduation-cap', title: 'Quality Technical Education', body: 'Provide quality technical education in Civil Engineering and allied fields, covering structural design, geotechnics, hydraulics, environmental engineering, and construction management.' },
                    { id: '02', delay: 'delay-200', icon: 'ph-flask', title: 'Research, Consultancy & Innovation', body: 'Promote research, consultancy, and innovation in civil engineering — solving real-world infrastructure challenges through applied research, industry partnerships, and student-led projects.' },
                    { id: '03', delay: 'delay-300', icon: 'ph-leaf', title: 'Environmental Responsibility & Ethics', body: 'Develop environmentally conscious and ethically responsible engineers who integrate sustainability into every design decision and uphold the highest standards of professional conduct.' },
                    { id: '04', delay: 'delay-100', icon: 'ph-buildings', title: 'Industry-Academia Collaboration', body: 'Foster strong industry-academia collaboration through internships, field visits, expert lectures, and joint projects to ensure graduates are industry-ready and globally competitive.' },
                  ].map((m, idx) => (
                    <div key={m.id} className={`reveal ${m.delay} group relative bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col`}>
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

          {/* ════ DAB ══════════════════════════════════════════════ */}
          {activeId === 'dab' && (() => {
            const members = [
              { sr: 1, name: 'Dr. Rakesh Himte',         designation: 'Principal',                    org: 'VCET, Vasai',        role: 'Chairman',                tag: 'internal' },
              { sr: 2, name: 'HOD, Civil Engineering',   designation: 'Professor & HOD, Civil Engg.',  org: 'VCET, Vasai',        role: 'Head of Department',      tag: 'internal' },
              { sr: 3, name: 'TBD',                      designation: 'Academic Representative',      org: 'External Institute', role: 'Academic Representative', tag: 'academic' },
              { sr: 4, name: 'TBD',                      designation: 'Academic Representative',      org: 'External Institute', role: 'Academic Representative', tag: 'academic' },
              { sr: 5, name: 'TBD',                      designation: 'Industry Expert',              org: 'Industry Partner',   role: 'Industry Representative', tag: 'industry' },
              { sr: 6, name: 'TBD',                      designation: 'Industry Expert',              org: 'Industry Partner',   role: 'Industry Representative', tag: 'industry' },
              { sr: 7, name: 'TBD',                      designation: 'Senior Faculty, Civil Dept.',  org: 'VCET, Vasai',        role: 'Secretary',               tag: 'internal' },
              { sr: 8, name: 'TBD',                      designation: 'BE Student',                   org: 'VCET, Vasai',        role: 'Student Representative',  tag: 'student'  },
              { sr: 9, name: 'TBD',                      designation: 'TE Student',                   org: 'VCET, Vasai',        role: 'Student Representative',  tag: 'student'  },
            ];
            const tagStyle: Record<string, string> = { internal: 'bg-brand-navylight text-brand-navy', academic: 'bg-blue-50 text-blue-700', industry: 'bg-amber-50 text-amber-700', student: 'bg-emerald-50 text-emerald-700' };
            return (
              <div className="space-y-10">
                <div className="reveal">
                  <div className="flex items-center gap-3 mb-4"><span className="w-8 h-px bg-brand-gold" /><span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Civil Engineering</span></div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy leading-tight">Departmental Advisory Board<span className="text-brand-gold"> (DAB)</span></h2>
                  <div className="mt-3 flex items-center gap-2 text-slate-500 text-sm"><i className="ph-fill ph-check-circle text-brand-gold text-base" />Following are the members of the committee starting from 2022&#8209;23.</div>
                  <div className="mt-5 h-px bg-gradient-to-r from-brand-gold via-brand-navylight to-transparent" />
                </div>
                <div className="reveal grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[{ count: '2', label: 'Industry Experts', icon: 'ph-buildings' }, { count: '2', label: 'Academic Reps', icon: 'ph-graduation-cap' }, { count: '2', label: 'Student Reps', icon: 'ph-student' }, { count: '3', label: 'Internal Members', icon: 'ph-users' }].map(s => (
                    <div key={s.label} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-navylight flex items-center justify-center flex-shrink-0"><i className={`ph-fill ${s.icon} text-xl text-brand-navy`} /></div>
                      <div><p className="text-2xl font-display font-bold text-brand-navy leading-none">{s.count}</p><p className="text-[11px] text-slate-500 mt-0.5">{s.label}</p></div>
                    </div>
                  ))}
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
              { n: 'PSO1', text: 'To apply principles of structural analysis, geotechnical engineering, and fluid mechanics to design safe, sustainable, and cost-effective civil infrastructure including buildings, bridges, dams, and transportation systems.' },
              { n: 'PSO2', text: 'To integrate CAD/BIM tools, GIS, environmental regulations, and construction management practices to plan, execute, and deliver civil engineering projects within ethical, environmental, and economic constraints.' },
            ];
            return (
              <div className="space-y-16">
                <div className="reveal">
                  <div className="flex items-center gap-3 mb-4"><span className="w-8 h-px bg-brand-gold" /><span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Civil Engineering</span></div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy">POs, PEOs &amp; PSOs</h2>
                  <div className="mt-4 h-px bg-gradient-to-r from-brand-gold via-brand-navylight to-transparent" />
                </div>
                <section className="reveal space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-navy flex items-center justify-center flex-shrink-0"><i className="ph-fill ph-chart-bar text-brand-gold text-lg" /></div>
                    <div><p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">12 Outcomes</p><h3 className="text-2xl font-display font-bold text-brand-navy leading-tight">Program Outcomes (POs)</h3></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {pos.map((po, idx) => (
                      <div key={po.n} className={`reveal ${idx % 3 === 0 ? 'delay-100' : idx % 3 === 1 ? 'delay-200' : 'delay-300'} group flex gap-4 items-start bg-white border border-slate-100 rounded-xl px-5 py-4 shadow-sm hover:shadow-md hover:border-brand-gold/40 hover:-translate-y-0.5 transition-all duration-200`}>
                        <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-brand-navylight group-hover:bg-brand-navy flex items-center justify-center text-[11px] font-bold text-brand-navy group-hover:text-brand-gold transition-colors duration-200">{po.n}</span>
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
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(253,184,19,0.15)', border: '1px solid rgba(253,184,19,0.3)' }}><i className="ph-fill ph-target text-2xl text-brand-gold" /></div>
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
                    <div className="w-10 h-10 rounded-xl bg-brand-gold flex items-center justify-center flex-shrink-0"><i className="ph-fill ph-star text-white text-lg" /></div>
                    <div><p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">Civil Engg. Specific</p><h3 className="text-2xl font-display font-bold text-brand-navy leading-tight">Program Specific Outcomes (PSOs)</h3></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    {psos.map((pso, idx) => (
                      <div key={pso.n} className={`reveal ${idx === 0 ? 'delay-100' : 'delay-200'} relative group bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden`}>
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

          {/* ════ FACULTY ══════════════════════════════════════════ */}
          {activeId === 'faculty' && (() => {
            const faculty = [
              {
                slug: 'dr-ajay-radke',
                name: 'Dr. Ajay Radke',
                post: 'Professor & Head of Department',
                email: 'ajay.radke@vcet.edu.in',
                photo: '/Images/departments/civil/faculty/dr-ajay-radke.jpg',
                initials: 'AR',
                color: '#1a4b7c',
              },
              {
                slug: 'dr-archanaa-dongre',
                name: 'Dr. Archanaa Dongre',
                post: 'Associate Professor',
                email: 'archanaa.dongre@vcet.edu.in',
                photo: '/Images/departments/civil/faculty/dr-archanaa-dongre.jpg',
                initials: 'AD',
                color: '#2563a8',
              },
              {
                slug: 'dr-jaydeep-chougale',
                name: 'Dr. Jaydeep Chougale',
                post: 'Asst. Prof.',
                email: 'jaydeep.chougale@vcet.edu.in',
                photo: '/Images/departments/civil/faculty/dr-jaydeep-chougale.jpg',
                initials: 'JC',
                color: '#1a4b7c',
              },
              {
                slug: 'puja-ghadi',
                name: 'Ms. Puja Ghadi',
                post: 'Asst. Prof.',
                email: 'puja.ghadi@vcet.edu.in',
                photo: '/Images/departments/civil/faculty/puja-ghadi.jpg',
                initials: 'PG',
                color: '#2563a8',
              },
              {
                slug: 'dr-viren-chandanshive',
                name: 'Dr. Viren Chandanshive',
                post: 'Asst. Prof.',
                email: 'viren.chandanshive@vcet.edu.in',
                photo: '/Images/departments/civil/faculty/dr-viren-chandanshive.jpg',
                initials: 'VC',
                color: '#1a4b7c',
              },
              {
                slug: 'vikrant-kothari',
                name: 'Mr. Vikrant Kothari',
                post: 'Asst. Prof. (Ph.D. Pursuing)',
                email: 'vikrant.kothari@vcet.edu.in',
                photo: '/Images/departments/civil/faculty/vikrant-kothari.jpg',
                initials: 'VK',
                color: '#2563a8',
              },
              {
                slug: 'arbaz-kazi',
                name: 'Mr. Arbaz Kazi',
                post: 'Asst. Prof.',
                email: 'arbaz.kazi@vcet.edu.in',
                photo: '/Images/departments/civil/faculty/arbaz-kazi.jpg',
                initials: 'AK',
                color: '#1a4b7c',
              },
              {
                slug: 'prakash-panda',
                name: 'Mr. Prakash Panda',
                post: 'Asst. Prof.',
                email: 'prakash.panda@vcet.edu.in',
                photo: '/Images/departments/civil/faculty/prakash-panda.jpg',
                initials: 'PP',
                color: '#2563a8',
              },
              {
                slug: 'aishwarya-anil',
                name: 'Ms. Aishwarya Anil',
                post: 'Asst. Prof.',
                email: 'aishwarya.anil@vcet.edu.in',
                photo: '/Images/departments/civil/faculty/aishwarya-anil.jpg',
                initials: 'AA',
                color: '#1a4b7c',
              },
            ];
            return (
              <div className="space-y-10">
                {/* Section header — compact bar */}
                <div className="reveal flex items-center justify-between flex-wrap gap-4 pb-5 border-b-2 border-brand-gold/30">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-navy/60 flex items-center gap-2 mb-1">
                      <i className="ph-fill ph-chalkboard-teacher text-sm text-brand-navy/50" /> Civil Engineering
                    </span>
                    <h2 className="text-2xl font-display font-bold text-brand-navy">Our Faculty</h2>
                  </div>
                  <div className="flex items-center divide-x divide-slate-200">
                    {[
                      { icon: 'ph-users-three',    value: `${faculty.length}`, label: 'Members' },
                      { icon: 'ph-graduation-cap', value: '4',                 label: 'PhD' },
                      { icon: 'ph-trophy',         value: '80+',               label: 'Yrs Exp.' },
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
                      to={`/civil-engineering/faculty/${f.slug}`}
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

          {/* ════ OTHER SECTIONS (placeholder) ════════════════════ */}
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

export default DeptCivil;
