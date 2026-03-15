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

const skills = [
  { icon: 'ph-circuit-board',  label: 'Analog & Digital Electronics' },
  { icon: 'ph-broadcast',      label: 'Communication Systems' },
  { icon: 'ph-cpu',            label: 'Embedded Systems & VLSI' },
  { icon: 'ph-wifi-high',      label: 'IoT & Wireless Technologies' },
  { icon: 'ph-wave-sine',      label: 'Signal & Image Processing' },
  { icon: 'ph-robot',          label: 'Automation & Control Systems' },
  { icon: 'ph-network',        label: 'Microprocessors & Microcontrollers' },
];

const roles = [
  {
    icon: 'ph-circuit-board', accent: 'gold', title: 'VLSI / Chip Design Engineer',
    description: 'VLSI and Chip Design Engineers design integrated circuits and semiconductor devices using EDA tools. They work on digital, analog, and mixed-signal designs for processors, memory chips, and application-specific integrated circuits (ASICs) used in mobile, computing, and consumer electronics.',
  },
  {
    icon: 'ph-broadcast', accent: 'navy', title: 'RF & Telecommunications Engineer',
    description: 'RF and Telecom Engineers design and optimize wireless communication systems including antennas, RF circuits, and network infrastructure. They work on 4G/5G networks, satellite communication, and IoT connectivity solutions for telecom operators and technology companies.',
  },
  {
    icon: 'ph-cpu', accent: 'gold', title: 'Embedded Systems Engineer',
    description: 'Embedded Systems Engineers develop software and hardware for dedicated computing devices — from microcontrollers in consumer appliances to complex SoCs in automotive and industrial systems. They program in C/C++, work with RTOS, and interface with sensors and actuators.',
  },
  {
    icon: 'ph-wifi-high', accent: 'navy', title: 'IoT Solutions Architect',
    description: 'IoT Solutions Architects design and deploy connected device ecosystems, integrating hardware sensors, communication protocols (MQTT, Zigbee, LoRa), and cloud platforms. They build smart home, industrial monitoring, and healthcare IoT systems from end to end.',
  },
  {
    icon: 'ph-wave-sine', accent: 'gold', title: 'Signal Processing Engineer',
    description: 'Signal Processing Engineers develop algorithms and systems for analyzing and interpreting analog and digital signals — from audio and image processing to radar and biomedical signal analysis. They use DSP processors, FPGA platforms, and tools like MATLAB to implement real-time processing solutions.',
  },
];

const delayClass = (idx: number) =>
  idx % 3 === 0 ? 'delay-100' : idx % 3 === 1 ? 'delay-200' : 'delay-300';

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
          <div className="sticky top-24 bg-white rounded-xl shadow-md overflow-hidden border border-slate-200 max-h-[calc(100vh-7rem)] overflow-y-auto">
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
            <>
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="space-y-6 text-slate-600 leading-8 text-left">
                  <p>
                    The Department of Electronics and Telecommunication Engineering was established in 1994 as one of the founding
                    departments of VCET. With an intake of 60 seats, the department has been consistently producing competent engineers
                    who excel in electronics design, wireless communication, and embedded systems across diverse industries.
                  </p>
                  <p>
                    The department has well-equipped laboratories covering Analog Electronics, Digital Electronics, Microprocessors,
                    Communication Systems, VLSI Design, Signal Processing, IoT, and Embedded Systems. Students gain practical
                    experience with industry-standard tools and platforms including MATLAB, Cadence, Xilinx, and Arduino.
                  </p>
                  <p>
                    The department maintains strong industry interactions through guest lectures, workshops, seminars, and MoUs with
                    various organizations. Students are encouraged to participate in technical events, hackathons, and internship
                    programs that bridge the gap between classroom learning and industry practice.
                  </p>
                  <div className="bg-gradient-to-r from-brand-navylight to-white p-6 rounded-2xl border-l-4 border-brand-gold shadow-inner">
                    <p className="text-brand-navy font-semibold m-0 flex items-start gap-3">
                      <i className="ph-fill ph-lightbulb text-brand-gold text-2xl mt-1 flex-shrink-0" />
                      The department's three-decade legacy, state-of-the-art labs, and strong industry connections position EXTC
                      graduates for impactful careers in telecommunications, semiconductors, IoT, and beyond.
                    </p>
                  </div>
                </div>
              </section>

              <section className="reveal">
                <h2 className="text-3xl font-bold text-brand-navy relative inline-block mb-10">
                  Core Skills in Electronics &amp; Telecomm.:
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
                  Prominent Career Roles in EXTC:
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
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Electronics &amp; Telecommunication Engineering</span>
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
                      "To develop skilled Electronics and Telecommunication Engineers who drive the advancement of technology and contribute meaningfully to society."
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
                  <div className="hidden md:flex items-center gap-2 text-slate-400 text-sm">
                    <i className="ph ph-arrow-down text-brand-gold" />
                    <span className="text-xs tracking-wide">4 Pillars</span>
                  </div>
                </div>
                <div className="h-px bg-gradient-to-r from-brand-gold via-brand-navylight to-transparent" />
                <div className="grid md:grid-cols-2 gap-5 pt-2">
                  {[
                    { id: '01', delay: 'delay-100', icon: 'ph-graduation-cap', title: 'Comprehensive EXTC Education', body: 'Provide comprehensive education in Electronics and Telecommunication Engineering covering analog/digital circuits, communication systems, VLSI, embedded systems, and signal processing.' },
                    { id: '02', delay: 'delay-200', icon: 'ph-buildings', title: 'Research & Industry Interaction', body: 'Promote research, innovation, and strong industry interaction through MoUs, internship programs, guest lectures from industry experts, and live project opportunities.' },
                    { id: '03', delay: 'delay-300', icon: 'ph-cpu', title: 'Technical Competence & Ethics', body: 'Develop technical competence and professional ethics in graduates, ensuring they uphold the highest standards of integrity in electronics design, telecommunications, and embedded systems.' },
                    { id: '04', delay: 'delay-100', icon: 'ph-compass', title: 'Lifelong Learning & Social Responsibility', body: 'Encourage lifelong learning and social responsibility, equipping engineers to continuously adapt to emerging technologies while contributing positively to society.' },
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
              { sr: 1, name: 'Dr. Rakesh Himte', designation: 'Principal',                  org: 'VCET, Vasai',        role: 'Chairman',                tag: 'internal' },
              { sr: 2, name: 'HOD, EXTC',        designation: 'Professor & HOD, EXTC',      org: 'VCET, Vasai',        role: 'Head of Department',      tag: 'internal' },
              { sr: 3, name: 'TBD',              designation: 'Academic Representative',    org: 'External Institute', role: 'Academic Representative', tag: 'academic' },
              { sr: 4, name: 'TBD',              designation: 'Academic Representative',    org: 'External Institute', role: 'Academic Representative', tag: 'academic' },
              { sr: 5, name: 'TBD',              designation: 'Industry Expert',            org: 'Industry Partner',   role: 'Industry Representative', tag: 'industry' },
              { sr: 6, name: 'TBD',              designation: 'Industry Expert',            org: 'Industry Partner',   role: 'Industry Representative', tag: 'industry' },
              { sr: 7, name: 'TBD',              designation: 'Senior Faculty, EXTC Dept.', org: 'VCET, Vasai',        role: 'Secretary',               tag: 'internal' },
              { sr: 8, name: 'TBD',              designation: 'BE Student',                 org: 'VCET, Vasai',        role: 'Student Representative',  tag: 'student'  },
              { sr: 9, name: 'TBD',              designation: 'TE Student',                 org: 'VCET, Vasai',        role: 'Student Representative',  tag: 'student'  },
            ];
            const tagStyle: Record<string, string> = { internal: 'bg-brand-navylight text-brand-navy', academic: 'bg-blue-50 text-blue-700', industry: 'bg-amber-50 text-amber-700', student: 'bg-emerald-50 text-emerald-700', parent: 'bg-purple-50 text-purple-700' };
            return (
              <div className="space-y-10">
                <div className="reveal">
                  <div className="flex items-center gap-3 mb-4"><span className="w-8 h-px bg-brand-gold" /><span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Electronics &amp; Telecomm. Engineering</span></div>
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
              { n: 'PSO1', text: 'To apply knowledge of electronics and telecommunications to analyze, design, and implement circuits, communication systems, and embedded solutions for real-world engineering challenges.' },
              { n: 'PSO2', text: 'To develop applications leveraging VLSI, IoT, signal processing, and wireless communication technologies to build efficient and innovative electronic systems.' },
            ];
            return (
              <div className="space-y-16">
                <div className="reveal">
                  <div className="flex items-center gap-3 mb-4"><span className="w-8 h-px bg-brand-gold" /><span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Electronics &amp; Telecomm. Engg.</span></div>
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
                    <div><p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">EXTC Specific</p><h3 className="text-2xl font-display font-bold text-brand-navy leading-tight">Program Specific Outcomes (PSOs)</h3></div>
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
                slug: 'dr-amrita-ruperee',
                name: 'Dr. Amrita Ruperee',
                post: 'Professor & Head of Department',
                email: 'amrita.ruperee@vcet.edu.in',
                photo: '/Images/departments/extc/faculty/dr-amrita-ruperee.jpg',
                initials: 'AR',
                color: '#1a4b7c',
              },
              {
                slug: 'dr-vikas-gupta',
                name: 'Dr. Vikas Gupta',
                post: 'Professor & Dean Academics',
                email: 'vikas.gupta@vcet.edu.in',
                photo: '/Images/departments/extc/faculty/dr-vikas-gupta.jpg',
                initials: 'VG',
                color: '#2563a8',
              },
              {
                slug: 'dr-ashish-vanmali',
                name: 'Dr. Ashish Vanmali',
                post: 'Associate Professor',
                email: 'ashish.vanmali@vcet.edu.in',
                photo: '/Images/departments/extc/faculty/dr-ashish-vanmali.jpg',
                initials: 'AV',
                color: '#1a4b7c',
              },
              {
                slug: 'dr-sunayana-jadhav',
                name: 'Dr. Sunayana Jadhav',
                post: 'Associate Professor & FY Engg. Co-ordinator',
                email: 'sunayana.jadhav@vcet.edu.in',
                photo: '/Images/departments/extc/faculty/dr-sunayana-jadhav.jpg',
                initials: 'SJ',
                color: '#2563a8',
              },
              {
                slug: 'shaista-khan',
                name: 'Ms. Shaista Khan',
                post: 'Asst. Prof. (Ph.D. Pursuing)',
                email: 'shaista.khan@vcet.edu.in',
                photo: '/Images/departments/extc/faculty/shaista-khan.jpg',
                initials: 'SK',
                color: '#1a4b7c',
              },
              {
                slug: 'sandhya-supalkar',
                name: 'Ms. Sandhya Supalkar',
                post: 'Asst. Prof.',
                email: 'sandhya.supalkar@vcet.edu.in',
                photo: '/Images/departments/extc/faculty/sandhya-supalkar.jpg',
                initials: 'SS',
                color: '#2563a8',
              },
              {
                slug: 'ashwini-katkar',
                name: 'Ms. Ashwini Katkar',
                post: 'Asst. Prof. (Ph.D. Pursuing)',
                email: 'ashwini.katkar@vcet.edu.in',
                photo: '/Images/departments/extc/faculty/ashwini-katkar.jpg',
                initials: 'AK',
                color: '#1a4b7c',
              },
              {
                slug: 'neha-gharat',
                name: 'Ms. Neha Gharat',
                post: 'Asst. Prof. (Ph.D. Pursuing)',
                email: 'neha.gharat@vcet.edu.in',
                photo: '/Images/departments/extc/faculty/neha-gharat.jpg',
                initials: 'NG',
                color: '#2563a8',
              },
              {
                slug: 'trupti-shah',
                name: 'Ms. Trupti Shah',
                post: 'Asst. Prof.',
                email: 'trupti.shah@vcet.edu.in',
                photo: '/Images/departments/extc/faculty/trupti-shah.jpg',
                initials: 'TS',
                color: '#1a4b7c',
              },
              {
                slug: 'kanchan-sarmalkar',
                name: 'Ms. Kanchan Sarmalkar',
                post: 'Asst. Prof.',
                email: 'kanchan.sarmalkar@vcet.edu.in',
                photo: '/Images/departments/extc/faculty/kanchan-sarmalkar.jpg',
                initials: 'KS',
                color: '#2563a8',
              },
              {
                slug: 'bharati-gondhalekar',
                name: 'Ms. Bharati Gondhalekar',
                post: 'Asst. Prof.',
                email: 'bharati.gondhalekar@vcet.edu.in',
                photo: '/Images/departments/extc/faculty/bharati-gondhalekar.jpg',
                initials: 'BG',
                color: '#1a4b7c',
              },
              {
                slug: 'sandeep-pawar',
                name: 'Mr. Sandeep Pawar',
                post: 'Asst. Prof.',
                email: 'sandeep.pawar@vcet.edu.in',
                photo: '/Images/departments/extc/faculty/sandeep-pawar.jpg',
                initials: 'SP',
                color: '#2563a8',
              },
              {
                slug: 'sampada-pimpale',
                name: 'Ms. Sampada Pimpale',
                post: 'Asst. Prof.',
                email: 'sampada.pimpale@vcet.edu.in',
                photo: '/Images/departments/extc/faculty/sampada-pimpale.jpg',
                initials: 'SP',
                color: '#1a4b7c',
              },
            ];
            return (
              <div className="space-y-10">
                {/* Section header — compact bar */}
                <div className="reveal flex items-center justify-between flex-wrap gap-4 pb-5 border-b-2 border-brand-gold/30">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-navy/60 flex items-center gap-2 mb-1">
                      <i className="ph-fill ph-chalkboard-teacher text-sm text-brand-navy/50" /> Electronics &amp; Telecomm. Engineering
                    </span>
                    <h2 className="text-2xl font-display font-bold text-brand-navy">Our Faculty</h2>
                  </div>
                  <div className="flex items-center divide-x divide-slate-200">
                    {[
                      { icon: 'ph-users-three',    value: `${faculty.length}`, label: 'Members' },
                      { icon: 'ph-graduation-cap', value: '4',                 label: 'PhD' },
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
                      to={`/electronics-telecommunication/faculty/${f.slug}`}
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
              <p className="text-slate-500">The content will be published soon!</p>
            </section>
          )}

        </main>
      </div>
    </PageLayout>
  );
};

export default DeptENTC;
