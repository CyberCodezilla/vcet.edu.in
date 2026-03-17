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
  { id: 'faculty-list', label: 'Faculty List',               icon: 'ph-users-three' },
  { id: 'student-list', label: 'Student List',               icon: 'ph-student' },
  { id: 'placement-record', label: 'Placement Record',       icon: 'ph-briefcase' },
  { id: 'infrastructure', label: 'Infrastructure',           icon: 'ph-buildings' },
  { id: 'teaching-learning', label: 'Innovations in Teaching Learning', icon: 'ph-lightbulb' },
  { id: 'vcet-adt-cell', label: 'VCET-ADT CELL',              icon: 'ph-buildings' },
  { id: 'toppers',    label: 'Toppers',                      icon: 'ph-medal' },
  { id: 'syllabus',   label: 'Syllabus',                     icon: 'ph-book-open' },
  { id: 'newsletter', label: 'Newsletter',                   icon: 'ph-newspaper' },
];

const delayClass = (idx: number) => {
  if (idx % 3 === 0) return 'delay-100';
  if (idx % 3 === 1) return 'delay-200';
  return 'delay-300';
};

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
      <header className="relative bg-gradient-to-r from-brand-navy to-slate-800 pt-24 md:pt-28 pb-12 md:pb-16 overflow-hidden shadow-lg border-b-4 border-brand-gold">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white opacity-5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-64 h-64 rounded-full bg-brand-gold opacity-10 blur-2xl pointer-events-none" />
        <nav className="absolute top-6 left-6 z-20 flex items-center space-x-2 text-sm font-medium text-white/70">
          <Link to="/" className="hover:text-brand-gold transition-colors duration-200 flex items-center"><i className="ph ph-house text-base" /></Link>
          <i className="ph ph-caret-right text-xs" />
          <span className="text-brand-gold font-semibold">Civil Engineering</span>
        </nav>
        <div className="container mx-auto px-6 max-w-7xl relative z-10">

          <h1 className="font-display font-bold text-white leading-tight tracking-tight text-center">
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Civil Engineering</span>
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
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
              <div className="mb-8 flex flex-col items-center text-center">
                <div className="w-full max-w-[340px] rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-12">
                  <i className="ph ph-image text-4xl text-slate-400" />
                  <p className="mt-3 text-sm font-semibold text-slate-500">HOD Image Placeholder</p>
                  <p className="mt-1 text-xs text-slate-400">Add image later in this area</p>
                </div>
                <p className="mt-4 text-2xl font-bold text-brand-navy">Dr. Ajay Sudhir Radke</p>
              </div>
              <div className="space-y-6 text-slate-600 leading-8 text-left">
                <p>
                  A warm welcome to the Civil Engineering department. The department of the Civil engineering is established in the 2013 in the Vidyavardhini&apos;s College of Engineering and Technology. The Civil Engineering department aims a topmost Institution by generating professional with higher degree of technical knowledge, proficient skills and principled values.
                </p>
                <p>
                  The Department of Civil Engineering along with its multi-layered faculty sustains its robust relations with the industry and other institutes by organizing various events such as Product Showcase and Vidyavardhini&apos;s National Project Showcase (VNPS).
                </p>
                <p>
                  The students are always invigorated to participate extra-curricular and co-curricular events which are essential for the building a team spirit and development of administrative skills results in their personality development.
                </p>
                <p>
                  I believe that the students of the department would rationalize the reliability of the department by presenting a extraordinary level of proficient ability in their corresponding job areas.
                </p>
              </div>
            </section>
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
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold/70">Department</p>
                        <p className="text-sm font-bold text-white/90 uppercase tracking-widest">Vision</p>
                      </div>
                    </div>
                    <blockquote className="text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-white leading-[1.3] italic mb-10 max-w-4xl">
                      "To transform students into creative and technically proficient Civil Engineers to serve the nation"
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
                </div>
                <div className="h-px bg-gradient-to-r from-brand-gold via-brand-navylight to-transparent" />
                <section className="reveal bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 rounded-xl border border-slate-200 bg-brand-navylight/35 px-4 py-3 text-slate-700 leading-7">
                      <span className="mt-2 h-2 w-2 rounded-full bg-brand-navy flex-shrink-0" />
                      <span>To adapt to collaborative teaching learning practices for efficient learning.</span>
                    </li>
                    <li className="flex items-start gap-3 rounded-xl border border-slate-200 bg-brand-navylight/35 px-4 py-3 text-slate-700 leading-7">
                      <span className="mt-2 h-2 w-2 rounded-full bg-brand-navy flex-shrink-0" />
                      <span>To become a centre of excellence for providing knowledge base and consultancy services to the community.</span>
                    </li>
                    <li className="flex items-start gap-3 rounded-xl border border-slate-200 bg-brand-navylight/35 px-4 py-3 text-slate-700 leading-7">
                      <span className="mt-2 h-2 w-2 rounded-full bg-brand-navy flex-shrink-0" />
                      <span>To follow ethical and moral practices and educate students for professionalism and sustainability.</span>
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
              { sr: 2, name: 'Dr. Vikas Gupta', designation: 'Dean, Academic', org: 'VCET, Vasai', role: 'Vice-Chairman', tag: 'internal' },
              { sr: 3, name: 'Dr. Ajay Radke', designation: 'HOD, Civil', org: 'VCET, Vasai', role: 'Convener', tag: 'internal' },
              { sr: 4, name: 'Mr. Sanjeev R. Raje', designation: 'Vice President', org: 'Navdeep Construction Company, Mumbai', role: 'Industry Member', tag: 'industry' },
              { sr: 5, name: 'Mr. Pramod Mishra', designation: 'Director', org: 'Detailed Steel Solution India, Vasai', role: 'Industry Member', tag: 'industry' },
              { sr: 6, name: 'Dr. Seema Jagtap', designation: 'Professor and HOD Civil Dept.', org: 'Thakur College of Engineering and Technology, Kandivali, Mumbai', role: 'Academic Member', tag: 'academic' },
              { sr: 7, name: 'Mr. Vaibhav Patel', designation: 'Sr. Project Engineer', org: 'Tulip Consultant Pvt. Ltd., Mumbai', role: 'Alumni Member', tag: 'academic' },
              { sr: 8, name: 'Ms. Darpita Gharat', designation: 'Student', org: 'VCET, Vasai', role: 'Student Member', tag: 'student' },
              { sr: 9, name: 'Dr. Viren Chandanshive', designation: 'Assistant Professor', org: 'Civil Dept., VCET', role: 'Faculty Member', tag: 'internal' },
            ];
            const tagStyle: Record<string, string> = { internal: 'bg-brand-navylight text-brand-navy', academic: 'bg-blue-50 text-blue-700', industry: 'bg-amber-50 text-amber-700', student: 'bg-emerald-50 text-emerald-700' };
            return (
              <div className="space-y-10">
                <div className="reveal">
                  <div className="flex items-center gap-3 mb-4"><span className="w-8 h-px bg-brand-gold" /><span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Civil Engineering</span></div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy leading-tight">Departmental Advisory Board<span className="text-brand-gold"> (DAB)</span></h2>
                  <p className="mt-3 text-slate-600 leading-7">The Departmental Advisory Board (DAB) has been formed with the purpose of remaining up to date with the latest requirements of the industry, academics and incorporating necessary components in the curricular and extracurricular activities.</p>
                  <p className="mt-2 text-slate-600 leading-7">The DAB is composed of representative members from eminent institutions, industry, alumni, parents, students and faculty of the department. Following are the members of the committee for three consecutive academic year starting from 2022-23.</p>
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
              'To develop the ability among the students to implement innovative and creative ideas as a Civil Engineering professional.',
              'To prepare students capable of providing efficient design and development services in the core and allied fields of Civil Engineering.',
              'To inculcate professional and ethical values for providing sustainable solutions to Civil Engineering problems.',
            ];
            const psos = [
              { n: 'PSO1', text: 'Employ various approaches, ideologies, code of practice and soft tools for computing and designing real world problems related to Civil Engineering.' },
              { n: 'PSO2', text: 'Demonstrate technical aspects, teamwork, managerial and professional skills necessary for efficient solution.' },
            ];
            return (
              <div className="space-y-16">
                <div className="reveal">
                  <div className="flex items-center gap-3 mb-4"><span className="w-8 h-px bg-brand-gold" /><span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Civil Engineering</span></div>
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
                  <div><p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">Civil Engg. Specific</p><h3 className="text-2xl font-display font-bold text-brand-navy leading-tight">Program Specific Outcomes (PSOs)</h3></div>
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
                            const fallback = t.nextElementSibling;
                            if (fallback instanceof HTMLElement) {
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
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          globalThis.location.href = `mailto:${f.email}`;
                        }}
                        className="flex items-center gap-2 text-xs text-gray-500 hover:text-[#1a4b7c] transition-colors w-full cursor-pointer"
                      >
                        <i className="ph-fill ph-envelope text-sm shrink-0 text-gray-400" />
                        <span className="truncate">{f.email}</span>
                      </button>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* ════ PAQIC ═══════════════════════════════════════════ */}
          {activeId === 'paqic' && (() => {
            const members = [
              'Dr. Ajay Radke, HOD, Civil Engineering (Chairman)',
              'Mr Jaydeep Chougle, Civil Engineering Department',
              'Mr. Arbaz Kazi, Civil Engineering Department',
              'Dr. Uday Aswalekar, HOD Mechanical Engineering',
              'Dr. Ashish Vanmali, Associate Professor EXTC Department',
              'Mrs. Puja Kadam, Civil Engineering Department (Coordinator)',
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
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Civil Engineering</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy relative inline-block">PAQIC<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
                <p className="text-slate-600 leading-7">The composition of the PAQIC for the Department of Civil Engineering is as follows:</p>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h4 className="text-base font-bold text-brand-navy mb-3">Members</h4>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {members.map((m) => <li key={m}>{m}</li>)}
                  </ul>
                </div>
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
                <p className="text-slate-600"><span className="font-semibold text-brand-navy">Frequency Of Meeting:</span> Minimum 2 per academic year</p>
              </section>
            );
          })()}

          {/* ════ FACULTY LIST ═══════════════════════════════════ */}
          {activeId === 'faculty-list' && (() => {
            const links = [
              { label: 'Faculty List 2023-24', url: 'https://vcet.edu.in/wp-content/uploads/2024/04/Faculty-List-2023-24.pdf' },
              { label: 'Faculty List 2022-23', url: 'https://vcet.edu.in/wp-content/uploads/2024/04/Faculty-List-2022-23.pdf' },
              { label: 'Faculty List 2021-22', url: 'https://vcet.edu.in/wp-content/uploads/2024/04/Faculty-List-2021-22.pdf' },
              { label: 'Faculty List 2020-21', url: 'https://vcet.edu.in/wp-content/uploads/2024/04/Faculty-List-2020-21.pdf' },
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4"><span className="w-8 h-px bg-brand-gold" /><span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Civil Engineering</span></div>
                <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Faculty List<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
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

          {/* ════ STUDENT LIST ═══════════════════════════════════ */}
          {activeId === 'student-list' && (() => {
            const links = [
              { label: 'Student List 2023-24', url: 'https://vcet.edu.in/wp-content/uploads/2024/04/Student-List-23-24.pdf' },
              { label: 'Student List 2022-23', url: 'https://vcet.edu.in/wp-content/uploads/2024/04/Student-List-2022-23.pdf' },
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4"><span className="w-8 h-px bg-brand-gold" /><span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Civil Engineering</span></div>
                <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Student List<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
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

          {/* ════ PLACEMENT RECORD ═══════════════════════════════ */}
          {activeId === 'placement-record' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-4"><span className="w-8 h-px bg-brand-gold" /><span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Civil Engineering</span></div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Placement Record<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
              <a href="https://vcet.edu.in/wp-content/uploads/2024/04/Placement-Record.pdf" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gold hover:bg-brand-navylight transition-colors">
                <span>Placement Record - Civil</span><i className="ph ph-arrow-up-right text-brand-gold" />
              </a>
            </section>
          )}

          {/* ════ INFRASTRUCTURE ═════════════════════════════════ */}
          {activeId === 'infrastructure' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-4"><span className="w-8 h-px bg-brand-gold" /><span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Civil Engineering</span></div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Infrastructure<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
              <p className="text-slate-600 leading-8">The department supports teaching-learning with civil engineering laboratories, practical project exposure, and collaborative activities aligned with academic and professional development.</p>
            </section>
          )}

          {/* ════ TOPPERS ════════════════════════════════════════ */}
          {activeId === 'toppers' && (() => {
            const toppers = {
              SE: ['Ghule Amey : 9.44 SGPI', 'Solanki Pratham : 9.13 SGPI', 'Jagtap Apurva : 8.77 SGPI'],
              TE: ['Medge Jeevan : 9.39 CGPI', 'Shetty Deeksha : 8.74 CGPI', 'Ghelani Jeet : 8.52 CGPI'],
              BE: ['Dhanawade Pooja : 9.84 CGPI', 'Sankhe Manali : 9.53 CGPI', 'Nazreen Khatoon : 9.21 CGPI'],
            };
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4"><span className="w-8 h-px bg-brand-gold" /><span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Civil Engineering</span></div>
                <h3 className="text-2xl font-bold text-brand-navy mb-3 relative inline-block">Toppers<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
                <p className="text-sm font-bold text-brand-navy mb-4">Year: 2022-23</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="bg-brand-navy text-white"><th className="px-4 py-3 text-left">SE</th><th className="px-4 py-3 text-left">TE</th><th className="px-4 py-3 text-left">BE</th></tr></thead>
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
              { label: 'Syllabus UG SE R-16', url: 'https://vcet.edu.in/wp-content/uploads/2021/11/SE-Civil-CBCGS-Syllabus.pdf' },
              { label: 'Syllabus UG TE R-16', url: 'https://vcet.edu.in/wp-content/uploads/2023/12/TE-Civil_Syllabus_R16.pdf' },
              { label: 'Syllabus UG BE R-16', url: 'https://vcet.edu.in/wp-content/uploads/2023/12/BE-Civil_Syllabus_R16.pdf' },
              { label: 'Syllabus 2019-20 SE R-19 C Scheme', url: 'https://vcet.edu.in/wp-content/uploads/2023/02/S.E.-Civil-Engg-Sem-III-IV.pdf' },
              { label: 'Syllabus 2019-20 TE R-19 C Scheme', url: 'https://vcet.edu.in/wp-content/uploads/2023/02/T.E.-Civil-Engg-Sem-V-VI.pdf' },
              { label: 'Syllabus 2019-20 BE R-19 C Scheme', url: 'https://vcet.edu.in/wp-content/uploads/2023/02/B.E.-Civil-Engg.-Sem.-VII-VIII.pdf' },
              { label: 'PO PSO CO (R16)', url: 'https://vcet.edu.in/wp-content/uploads/2023/11/Civil_R16-COs.pdf' },
              { label: 'PO PSO CO (R19)', url: 'https://vcet.edu.in/wp-content/uploads/2023/11/Civil_R-19-COs.pdf' },
              { label: 'Syllabus PG ME Rev 2022', url: 'https://vcet.edu.in/wp-content/uploads/2023/02/ME-Str-Syllabus-R22_Final-1.pdf' },
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4"><span className="w-8 h-px bg-brand-gold" /><span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Civil Engineering</span></div>
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

          {/* ════ INNOVATIONS IN TEACHING LEARNING ══════════════ */}
          {activeId === 'teaching-learning' && (() => {
            const innovationLinks = [
              { label: 'Innovation in Teaching Learning (2022-23)', url: 'https://vcet.edu.in/wp-content/uploads/2023/12/2.3.1_Innovation-Index_Civil_2022-23-1.pdf' },
              { label: 'Innovation in Teaching Learning (2021-22)', url: '' },
              { label: 'Innovation in Teaching Learning (2020-21)', url: 'https://vcet.edu.in/wp-content/uploads/2023/12/2.3.1_Innovation-Index_Civil_2020-21-1.pdf' },
            ];
            const ictLinks = [
              { label: 'ICT Tools in Teaching Learning (2022-23)', url: 'https://vcet.edu.in/wp-content/uploads/2024/03/2.3.1_ICT-Index_Civil_22-23-2.pdf' },
              { label: 'ICT Tools in Teaching Learning (2021-22)', url: 'https://vcet.edu.in/wp-content/uploads/2024/03/2.3.1_ICT-Index_Civil_21-22-2.pdf' },
              { label: 'ICT Tools in Teaching Learning (2020-21)', url: 'https://vcet.edu.in/wp-content/uploads/2024/03/2.3.1_ICT-Index_Civil_20-21-2.pdf' },
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 space-y-6">
                <div className="flex items-center gap-3"><span className="w-8 h-px bg-brand-gold" /><span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Civil Engineering</span></div>
                <h3 className="text-2xl font-bold text-brand-navy relative inline-block">Innovations in Teaching Learning<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
                <div>
                  <h4 className="text-lg font-bold text-brand-navy mb-3">Innovation in Teaching Learning</h4>
                  <div className="space-y-3">
                    {innovationLinks.map((item) => item.url ? (
                      <a key={item.label} href={item.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gold hover:bg-brand-navylight transition-colors">
                        <span>{item.label}</span><i className="ph ph-arrow-up-right text-brand-gold" />
                      </a>
                    ) : (
                      <div key={item.label} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600">
                        {item.label} (not found)
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-brand-navy mb-3">ICT Tools in Teaching Learning</h4>
                  <div className="space-y-3">
                    {ictLinks.map((item) => (
                      <a key={item.label} href={item.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gold hover:bg-brand-navylight transition-colors">
                        <span>{item.label}</span><i className="ph ph-arrow-up-right text-brand-gold" />
                      </a>
                    ))}
                  </div>
                </div>
              </section>
            );
          })()}

          {/* ════ MoU ═════════════════════════════════════════════ */}
          {activeId === 'mou' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-4"><span className="w-8 h-px bg-brand-gold" /><span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Civil Engineering</span></div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">MoU<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
              <a href="https://vcet.edu.in/wp-content/uploads/2024/03/MOU-Activity-Summary-Website-1.pdf" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gold hover:bg-brand-navylight transition-colors">
                <span>MoU List</span><i className="ph ph-arrow-up-right text-brand-gold" />
              </a>
            </section>
          )}

          {/* ════ NEWSLETTER & MAGAZINE ══════════════════════════ */}
          {activeId === 'newsletter' && (() => {
            const newsletters = [
              { label: 'NEWS LETTER ODD SEM 2023-24', url: 'https://vcet.edu.in/wp-content/uploads/2023/12/CIVIL-TODAY-Dec-23.pdf' },
              { label: 'NEWS LETTER EVEN SEM 2022-23', url: 'https://vcet.edu.in/wp-content/uploads/2023/12/Civil_Vikrant-May-2022_.pdf' },
              { label: 'NEWS LETTER ODD SEM 2022-23', url: 'https://vcet.edu.in/wp-content/uploads/2023/12/DEC-22-CIVIL-Today.pdf' },
              { label: 'NEWS LETTER EVEN SEM 2021-22', url: 'https://vcet.edu.in/wp-content/uploads/2023/12/Civil_Viren_May-2021.pdf' },
              { label: 'NEWS LETTER ODD SEM 2021-22', url: 'https://vcet.edu.in/wp-content/uploads/2023/12/Civil_dec2021_PUJA-KADAM-1.pdf' },
              { label: 'NEWS LETTER EVEN SEM 2020-21', url: 'https://vcet.edu.in/wp-content/uploads/2023/12/Newsletter-Civil_May-20_Aishwarya.pdf' },
              { label: 'NEWS LETTER ODD SEM 2020-21', url: 'https://vcet.edu.in/wp-content/uploads/2023/12/Civil_Dec-2020_jaydeep.pdf' },
              { label: 'NEWS LETTER EVEN SEM 2019-20', url: 'https://vcet.edu.in/wp-content/uploads/2023/07/Newsletter-Civil_AY-2019-20-Even-sem.pdf' },
              { label: 'NEWS LETTER ODD SEM 2019-20', url: 'https://vcet.edu.in/wp-content/uploads/2023/12/CivilToday_Dec-2019_Nikhil.pdf' },
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 space-y-6">
                <div className="flex items-center gap-3"><span className="w-8 h-px bg-brand-gold" /><span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Civil Engineering</span></div>
                <h3 className="text-2xl font-bold text-brand-navy relative inline-block">News Letter &amp; Magazine<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
                <div>
                  <h4 className="text-lg font-bold text-brand-navy mb-3">Newsletter</h4>
                  <div className="space-y-2">
                    {newsletters.map((item) => (
                      <a key={item.label} href={item.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gold hover:bg-brand-navylight transition-colors">
                        <span>{item.label}</span><i className="ph ph-arrow-up-right text-brand-gold" />
                      </a>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6">
                  <h4 className="text-lg font-bold text-brand-navy relative inline-block">
                    Committee Details
                    {' '}
                    <span className="absolute -bottom-2 left-0 h-1 w-10 rounded-full bg-brand-gold" />
                  </h4>
                  <p className="mt-5 text-base font-semibold text-brand-navy">Staff Incharge</p>

                  <div className="mt-6 flex justify-center">
                    <div className="w-full max-w-[340px] rounded-2xl border-2 border-dashed border-slate-300 bg-white px-4 py-12 text-center">
                      <i className="ph ph-image text-4xl text-slate-400" />
                      <p className="mt-3 text-sm font-semibold text-slate-500">Staff Image Placeholder</p>
                      <p className="mt-1 text-xs text-slate-400">Add image later in this area</p>
                    </div>
                  </div>

                  <div className="mt-5 text-center">
                    <p className="text-2xl font-bold text-brand-navy">Dr. Viren Chandanshive</p>
                    <p className="mt-2 text-sm text-slate-600">Civil Engineering</p>
                    <p className="mt-3 text-sm text-slate-700">
                      <i className="ph ph-envelope mr-2 text-brand-gold align-middle" />
                      <span className="align-middle">viren.chandanshive@vcet.edu.in</span>
                    </p>
                  </div>
                </div>
              </section>
            );
          })()}

          {/* ════ VCET-ADT CELL ══════════════════════════════════ */}
          {activeId === 'vcet-adt-cell' && (() => {
            const consultLinks = [
              { label: 'Consultancy 23-24', url: 'https://vcet.edu.in/wp-content/uploads/2024/03/Consultancy-Data_final_11-march-2024-23-24.pdf' },
              { label: 'Consultancy 22-23', url: 'https://vcet.edu.in/wp-content/uploads/2024/03/Consultancy-Data_final_11-march-2024-22-23.pdf' },
              { label: 'Consultancy 21-22', url: 'https://vcet.edu.in/wp-content/uploads/2024/03/Consultancy-Data_final_11-march-2024-21-22.pdf' },
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 space-y-6">
                <div className="flex items-center gap-3"><span className="w-8 h-px bg-brand-gold" /><span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Civil Engineering</span></div>
                <h3 className="text-2xl font-bold text-brand-navy relative inline-block">VCET-ADT CELL<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
                <div className="space-y-4 text-slate-600 leading-8">
                  <p>Vidyavardhini was established as a registered society in 1970 by late Padmashri H. G. alias Bhausaheb Vartak for the noble cause of education in rural areas.</p>
                  <p>Vidyavardhini&apos;s College of Engineering and Technology (VCET), Vasai is affiliated to University of Mumbai and approved by DTE and AICTE. The institute is accredited by NAAC and National Board of Accreditation (NBA).</p>
                  <p>VCET&apos;s Civil Engineering Department has an Audit, Design and Testing (ADT) Cell to provide audit, design and testing services in Civil Engineering. The department has a technical work force of 11 Civil Engineers with at least Master&apos;s degree in Civil engineering&apos;s diverse fields and 4 assisting staff.</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-slate-700 leading-7">
                  <p><span className="font-semibold text-brand-navy">Vision:</span> To be an eminent institute providing credible, reasonable and sustainable solutions in civil industry.</p>
                  <p className="mt-2"><span className="font-semibold text-brand-navy">Mission M1:</span> To provide Audit services, such as Third-party audit to Government, Semi government and Private organizations; conduct structural audit and provide retrofitting or repair solutions.</p>
                  <p className="mt-2"><span className="font-semibold text-brand-navy">Mission M2:</span> To provide Design services for stable, durable, elegant, and cost-effective building design for structures, green building solutions and other sustainability solutions.</p>
                  <p className="mt-2"><span className="font-semibold text-brand-navy">Mission M3:</span> To conduct Geotechnical investigation and land survey; material testing of concrete, bricks, tiles, steel, timber, chemicals and provide mix-design.</p>
                  <p className="mt-2"><span className="font-semibold text-brand-navy">Values:</span> Honesty with the profession. Fairness in work, tests, investigation, transactions. Thoughtful solutions ensuring safety and efficacy.</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-brand-navy mb-3">Consultancy Record</h4>
                  <div className="space-y-3">
                    {consultLinks.map((item) => (
                      <a key={item.label} href={item.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gold hover:bg-brand-navylight transition-colors">
                        <span>{item.label}</span><i className="ph ph-arrow-up-right text-brand-gold" />
                      </a>
                    ))}
                  </div>
                </div>
              </section>
            );
          })()}

          {/* ════ OTHER SECTIONS (placeholder) ════════════════════ */}
          {activeId !== 'about' && activeId !== 'vision' && activeId !== 'dab' && activeId !== 'peo' && activeId !== 'faculty' && activeId !== 'paqic' && activeId !== 'faculty-list' && activeId !== 'student-list' && activeId !== 'placement-record' && activeId !== 'infrastructure' && activeId !== 'toppers' && activeId !== 'syllabus' && activeId !== 'teaching-learning' && activeId !== 'mou' && activeId !== 'newsletter' && activeId !== 'vcet-adt-cell' && (
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

export default DeptCivil;
