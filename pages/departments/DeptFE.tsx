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
          {activeId === 'faculty' && (() => {
            const faculty = [
              {
                slug: 'chandrakishori-sonarkar',
                name: 'Ms. Chandrakishori Sonarkar',
                post: 'Asst. Prof. – M.Sc. (Chemistry)',
                email: 'c.v.sonarkar@vcet.edu.in',
                photo: '/Images/departments/fe/faculty/chandrakishori-sonarkar.jpg',
                initials: 'CS',
                color: '#1a4b7c',
              },
              {
                slug: 'beauty-ansari',
                name: 'Ms. Beauty Ansari',
                post: 'Asst. Prof. – M.Sc. (Chemistry) SET',
                email: 'beauty.ansari@vcet.edu.in',
                photo: '/Images/departments/fe/faculty/beauty-ansari.jpg',
                initials: 'BA',
                color: '#2563a8',
              },
              {
                slug: 'dr-rhushirajeshwari-naik',
                name: 'Dr. Rhushirajeshwari Naik',
                post: 'Asst. Prof. – Ph.D. (Chemistry)',
                email: 'rhushirajeshwari.naik@vcet.edu.in',
                photo: '/Images/departments/fe/faculty/dr-rhushirajeshwari-naik.jpg',
                initials: 'RN',
                color: '#1a4b7c',
              },
              {
                slug: 'dipa-patel',
                name: 'Ms. Dipa Patel',
                post: 'Asst. Prof. – M.Sc. (Chemistry), Ph.D. Pursuing',
                email: 'dipa.patel@vcet.edu.in',
                photo: '/Images/departments/fe/faculty/dipa-patel.jpg',
                initials: 'DP',
                color: '#2563a8',
              },
              {
                slug: 'vaishnavi-gurav',
                name: 'Ms. Vaishnavi Gurav',
                post: 'Asst. Prof. – M.Sc. (Physics)',
                email: 'vaishnavi.gurav@vcet.edu.in',
                photo: '/Images/departments/fe/faculty/vaishnavi-gurav.jpg',
                initials: 'VG',
                color: '#1a4b7c',
              },
              {
                slug: 'vikas-bhagat',
                name: 'Mr. Vikas Bhagat',
                post: 'Asst. Prof. – M.Sc. (Physics)',
                email: 'vikas.bhagat@vcet.edu.in',
                photo: '/Images/departments/fe/faculty/vikas-bhagat.jpg',
                initials: 'VB',
                color: '#2563a8',
              },
              {
                slug: 'neha-shah',
                name: 'Ms. Neha Shah',
                post: 'Asst. Prof. – M.Sc. B.Ed (Physics)',
                email: 'neha.shah@vcet.edu.in',
                photo: '/Images/departments/fe/faculty/neha-shah.jpg',
                initials: 'NS',
                color: '#1a4b7c',
              },
              {
                slug: 'dr-kavita-churi',
                name: 'Dr. Kavita Churi',
                post: 'Asst. Prof. – Ph.D. (Physics)',
                email: 'kavita.churi@vcet.edu.in',
                photo: '/Images/departments/fe/faculty/dr-kavita-churi.jpg',
                initials: 'KC',
                color: '#2563a8',
              },
              {
                slug: 'ankita-mane',
                name: 'Ms. Ankita Mane',
                post: 'Asst. Prof. – M.Sc. (Maths), Ph.D. Pursuing',
                email: 'ankita.mane@vcet.edu.in',
                photo: '/Images/departments/fe/faculty/ankita-mane.jpg',
                initials: 'AM',
                color: '#1a4b7c',
              },
              {
                slug: 'praiza-gonsalves',
                name: 'Ms. Praiza Gonsalves',
                post: 'Asst. Prof. – M.Sc. (Maths)',
                email: 'praiza.gonsalves@vcet.edu.in',
                photo: '/Images/departments/fe/faculty/praiza-gonsalves.jpg',
                initials: 'PG',
                color: '#2563a8',
              },
              {
                slug: 'mayur-gohil',
                name: 'Mr. Mayur Gohil',
                post: 'Asst. Prof. – M.A. (Maths) SET',
                email: 'mayur.gohil@vcet.edu.in',
                photo: '/Images/departments/fe/faculty/mayur-gohil.jpg',
                initials: 'MG',
                color: '#1a4b7c',
              },
              {
                slug: 'ganesh-tilave',
                name: 'Mr. Ganesh Tilave',
                post: 'Asst. Prof. – M.Sc. (Maths) SET',
                email: 'ganesh.tilave@vcet.edu.in',
                photo: '/Images/departments/fe/faculty/ganesh-tilave.jpg',
                initials: 'GT',
                color: '#2563a8',
              },
              {
                slug: 'anahita-pereira',
                name: 'Ms. Anahita Pereira',
                post: 'Asst. Prof. – M.Sc. (Maths), Ph.D. Pursuing',
                email: 'anahita.pereira@vcet.edu.in',
                photo: '/Images/departments/fe/faculty/anahita-pereira.jpg',
                initials: 'AP',
                color: '#1a4b7c',
              },
              {
                slug: 'deepika-panchal',
                name: 'Ms. Deepika Panchal',
                post: 'Asst. Prof. – M.Sc. (Maths)',
                email: 'deepika.panchal@vcet.edu.in',
                photo: '/Images/departments/fe/faculty/deepika-panchal.jpg',
                initials: 'DP',
                color: '#2563a8',
              },
              {
                slug: 'sachin-gondke',
                name: 'Mr. Sachin Gondke',
                post: 'Asst. Prof. – M.Sc. (Maths) NET, SET',
                email: 'sachin.gondke@vcet.edu.in',
                photo: '/Images/departments/fe/faculty/sachin-gondke.jpg',
                initials: 'SG',
                color: '#1a4b7c',
              },
              {
                slug: 'dr-pradip-gulbhile',
                name: 'Dr. Pradip Gulbhile',
                post: 'Asst. Prof. – Ph.D. (English)',
                email: 'pradip.gulbhile@vcet.edu.in',
                photo: '/Images/departments/fe/faculty/dr-pradip-gulbhile.jpg',
                initials: 'PG',
                color: '#2563a8',
              },
              {
                slug: 'kamini-more',
                name: 'Ms. Kamini More',
                post: 'Asst. Prof. – M.A. (English) M.Phil',
                email: 'kamini.more@vcet.edu.in',
                photo: '/Images/departments/fe/faculty/kamini-more.jpg',
                initials: 'KM',
                color: '#1a4b7c',
              },
              {
                slug: 'gloria-collaco',
                name: 'Ms. Gloria Collaco',
                post: 'Asst. Prof. – M.A. (English) SET',
                email: 'gloria.collaco@vcet.edu.in',
                photo: '/Images/departments/fe/faculty/gloria-collaco.jpg',
                initials: 'GC',
                color: '#2563a8',
              },
              {
                slug: 'dr-tanya-dsouza',
                name: "Dr. Tanya D'souza",
                post: 'Asst. Prof. – Ph.D. (English) NET, SET',
                email: 'tanya.dsouza@vcet.edu.in',
                photo: '/Images/departments/fe/faculty/dr-tanya-dsouza.jpg',
                initials: 'TD',
                color: '#1a4b7c',
              },
              {
                slug: 'dr-aashi-cynth',
                name: 'Dr. Aashi Cynth',
                post: 'Asst. Prof. – Ph.D. (English)',
                email: 'aashi.cynth@vcet.edu.in',
                photo: '/Images/departments/fe/faculty/dr-aashi-cynth.jpg',
                initials: 'AC',
                color: '#2563a8',
              },
              {
                slug: 'jenisa-dsilva',
                name: "Ms. Jenisa D'silva",
                post: 'Asst. Prof. – M.A. (English)',
                email: 'jenisa.dsilva@vcet.edu.in',
                photo: '/Images/departments/fe/faculty/jenisa-dsilva.jpg',
                initials: 'JD',
                color: '#1a4b7c',
              },
              {
                slug: 'shraddha-gosavi',
                name: 'Ms. Shraddha Gosavi',
                post: 'Asst. Prof. – M.E. (EXTC)',
                email: 'shraddha.gosavi@vcet.edu.in',
                photo: '/Images/departments/fe/faculty/shraddha-gosavi.jpg',
                initials: 'SG',
                color: '#2563a8',
              },
              {
                slug: 'tarranum-khan',
                name: 'Ms. Tarranum Khan',
                post: 'Asst. Prof. – M.Tech (Civil)',
                email: 'tarranum.khan@vcet.edu.in',
                photo: '/Images/departments/fe/faculty/tarranum-khan.jpg',
                initials: 'TK',
                color: '#1a4b7c',
              },
              {
                slug: 'prachee-shah',
                name: 'Ms. Prachee Shah',
                post: 'Asst. Prof. – M.E. (Electronics)',
                email: 'prachee.shah@vcet.edu.in',
                photo: '/Images/departments/fe/faculty/prachee-shah.jpg',
                initials: 'PS',
                color: '#2563a8',
              },
              {
                slug: 'rojal-rodrigues',
                name: 'Ms. Rojal Rodrigues',
                post: 'Asst. Prof. – M.E. (EXTC)',
                email: 'rojal.rodrigues@vcet.edu.in',
                photo: '/Images/departments/fe/faculty/rojal-rodrigues.jpg',
                initials: 'RR',
                color: '#1a4b7c',
              },
            ];
            return (
              <div className="space-y-10">
                {/* Section header — compact bar */}
                <div className="reveal flex items-center justify-between flex-wrap gap-4 pb-5 border-b-2 border-brand-gold/30">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-navy/60 flex items-center gap-2 mb-1">
                      <i className="ph-fill ph-chalkboard-teacher text-sm text-brand-navy/50" /> First Year Engineering
                    </span>
                    <h2 className="text-2xl font-display font-bold text-brand-navy">Our Faculty</h2>
                  </div>
                  <div className="flex items-center divide-x divide-slate-200">
                    {[
                      { icon: 'ph-users-three',    value: `${faculty.length}`, label: 'Members' },
                      { icon: 'ph-graduation-cap', value: '6',                 label: 'PhD' },
                      { icon: 'ph-trophy',         value: '150+',              label: 'Yrs Exp.' },
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
                      to={`/first-year-engineering/faculty/${f.slug}`}
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
                            if (fallback) fallback.style.display = 'flex';
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
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); globalThis.location.href = `mailto:${f.email}`; }}
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

          {/* ════ INFRASTRUCTURE ═════════════════════════════════ */}
          {activeId === 'infrastructure' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-4"><span className="w-8 h-px bg-brand-gold" /><span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">First Year Engineering</span></div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Infrastructure<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
              <p className="text-slate-600 leading-8">
                Recognized for its pivotal role, the department is equipped with state-of-the-art laboratories and continues to spearhead various curricular and extracurricular initiatives.
              </p>
            </section>
          )}

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
          {activeId !== 'about' && activeId !== 'vision' && activeId !== 'dab' && activeId !== 'mou' && activeId !== 'patent' && activeId !== 'peo' && activeId !== 'faculty' && activeId !== 'infrastructure' && activeId !== 'time-table' && activeId !== 'teaching-learning' && activeId !== 'induction' && activeId !== 'annual-reports' && activeId !== 'toppers' && activeId !== 'syllabus' && (
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
