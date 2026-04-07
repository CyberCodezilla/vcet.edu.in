import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import DepartmentFacultySection from '../../components/DepartmentFacultySection';
import DepartmentHodImage from '../../components/DepartmentHodImage';
import { departmentApi } from '../../admin/api/departments';
import type { Department } from '../../admin/types';
import { resolveUploadedAssetUrl } from '../../utils/uploadedAssets';
import { newsletterApi } from '../../admin/api/newsletterApi';
import DepartmentNewsletterPanel from '../../components/DepartmentNewsletterPanel';

const sidebarLinks = [
  { id: 'about',      label: 'About',                        icon: 'ph-info' },
  { id: 'vision',     label: 'Vision and Mission',           icon: 'ph-target' },
  { id: 'dab',        label: 'Departmental Advisory Board',  icon: 'ph-users-three' },
  { id: 'mou',        label: 'MoU',                          icon: 'ph-handshake' },
  { id: 'patent',     label: 'Patent',                       icon: 'ph-certificate' },
  { id: 'peo',        label: 'POs, PEOs, PSOs',              icon: 'ph-chart-bar' },
  { id: 'faculty',    label: 'Faculty',                      icon: 'ph-chalkboard-teacher' },
  { id: 'toppers',    label: 'Toppers: 21-22',               icon: 'ph-medal' },
  { id: 'syllabus',   label: 'Syllabus',                     icon: 'ph-book-open' },
  { id: 'newsletter', label: 'Newsletter',                   icon: 'ph-newspaper' },
  { id: 'faculty-achievements', label: 'Faculty Achievements', icon: 'ph-trophy' },
  { id: 'student-achievements', label: 'Students Achievements', icon: 'ph-medal' },
];

const newsletterPdfs = [
  { label: 'NEWSLETTER 2024-25', href: '/pdfs/Department/ComputerScienceandEngineering(DataScience)/Newsletter/NEWSLETTER-2024-25.pdf' },
  { label: 'NEWSLETTER 2023-24', href: '/pdfs/Department/ComputerScienceandEngineering(DataScience)/Newsletter/NEWSLETTER-2023-24.pdf' },
  { label: 'NEWSLETTER 2022-23', href: '/pdfs/Department/ComputerScienceandEngineering(DataScience)/Newsletter/NEWSLETTER-2022-23.pdf' },
  { label: 'NEWSLETTER 2021-22', href: '/pdfs/Department/ComputerScienceandEngineering(DataScience)/Newsletter/NEWSLETTER-2021-22.pdf' },
];

const magazinePdfs = [
  { label: 'MAGAZINE 2024-25', href: '/pdfs/Department/ComputerScienceandEngineering(DataScience)/Magazine/MAGAZINE-2024-25.pdf' },
  { label: 'MAGAZINE 2023-24', href: '/pdfs/Department/ComputerScienceandEngineering(DataScience)/Magazine/MAGAZINE-2023-24.pdf' },
  { label: 'MAGAZINE 2022-23', href: '/pdfs/Department/ComputerScienceandEngineering(DataScience)/Magazine/MAGAZINE-2022-23.pdf' },
  { label: 'MAGAZINE 2021-22', href: '/pdfs/Department/ComputerScienceandEngineering(DataScience)/Magazine/MAGAZINE-2021-22.pdf' },
];

const DeptCSDS: React.FC = () => {
  const [activeId, setActiveId] = useState('about');
  const activeLink = sidebarLinks.find(l => l.id === activeId);
  const [department, setDepartment] = useState<Department | null>(null);
  const [dynamicApiItems, setDynamicApiItems] = useState<any[]>([]);

  useEffect(() => {
    departmentApi.getBySlug('computer-science-and-engineering-data-science')
      .then((res) => {
        if (res.success) {
          setDepartment(res.data);
          newsletterApi.list(res.data.id).then(n => setDynamicApiItems(n.data)).catch(console.error);
        }
      })
      .catch(() => setDepartment(null));
  }, []);

  const hodImageUrl = resolveUploadedAssetUrl(department?.content?.hodImage as string | null);

  const newsletters = dynamicApiItems
    .filter(item => item.type === 'newsletter' && item.pdf)
    .map(item => ({ label: item.title, href: item.pdf }));
  const magazines = dynamicApiItems
    .filter(item => item.type === 'magazine' && item.pdf)
    .map(item => ({ label: item.title, href: item.pdf }));


  // Re-observe .reveal elements every time the active tab changes
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
    // Small delay lets React finish rendering the new tab's DOM
    const t = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observer.observe(el));
    }, 50);
    return () => { clearTimeout(t); observer.disconnect(); };
  }, [activeId]);

  return (
    <PageLayout>
      {/* â”€â”€ Hero Banner â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <header className="relative bg-gradient-to-r from-brand-navy to-slate-800 pt-28 pb-16 overflow-hidden shadow-lg border-b-4 border-brand-gold">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white opacity-5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-64 h-64 rounded-full bg-brand-gold opacity-10 blur-2xl pointer-events-none" />
        {/* Breadcrumb â€” absolute top-left */}
        <nav className="absolute top-[52px] left-6 z-20 flex items-center space-x-2 text-sm font-medium text-white/70">
          <a href="/" className="hover:text-brand-gold transition-colors duration-200 flex items-center"><i className="ph ph-house text-base" /></a>
          <i className="ph ph-caret-right text-xs" />

          <span className="text-brand-gold font-semibold">Computer Science and Engineering (Data Science)</span>
        </nav>
        <div className="container mx-auto px-6 max-w-7xl relative z-10">

          <h1 className="font-display font-bold text-white leading-[1.08] tracking-tight">
            <span className="block text-4xl md:text-5xl lg:text-6xl">Computer Science and Engineering</span>
            <span className="block text-3xl md:text-4xl lg:text-5xl mt-3 text-brand-gold font-semibold italic">(Data Science)</span>
          </h1>
        </div>
      </header>

      {/* â”€â”€ Page Body â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="container mx-auto px-6 py-12 max-w-7xl flex flex-col lg:flex-row gap-10">

        {/* Sticky Sidebar */}
        <aside className="w-full lg:w-1/4 flex-shrink-0">
          <div className="lg:sticky lg:top-28 bg-white rounded-xl shadow-md overflow-hidden border border-slate-200">
            <nav className="flex flex-col py-2">
              {sidebarLinks.filter((link) => {
  const fa = department?.content?.facultyAchievements?.length > 0;
  const sa = department?.content?.studentAchievements?.length > 0;
  if (link.id === 'faculty-achievements' && !fa) return false;
  if (link.id === 'student-achievements' && !sa) return false;
  return true;
}).map((link) => {
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

        {/* Main Content */}
        <main className="w-full lg:w-3/4 space-y-16">

          {/* â”€â”€ ABOUT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          {activeId === 'about' && (
            <section className="reveal bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100">
              <div className="space-y-6 text-slate-600 leading-relaxed text-justify">
                <DepartmentHodImage imageSrc={hodImageUrl} />
                <p>
                  The Computer Science &amp; Engineering ( Data Science)Department is established in the year 2019.
                  Having started with a four-year undergraduate program, B. E. (CSE -DS), the department is willing
                  to start the Post Graduate Program, M. E. CSE-DS with specializations, shortly in coming days.
                  Data Science is a field of Scientific theories where Unstructured, Raw data is taken and moulded
                  into meaningful information by means of Programming, Business skills, and Analytics.
                </p>
                <p>
                  Many Multinational Companies across the globe are using Digital methods to Rationalize their work
                  and Maintaining their Inventory. This Technological advancement helps in various factors like Cost
                  Saving, Resource Saving, and Time-Saving. The concept of Data science consists of various
                  components or sub building units that help to segregate or segment data using calculus and
                  algorithms, it's a time-saving process.
                </p>
                <p>
                  The data can be either in structured form or unstructured form, the structured form data can be
                  in form of a tabular form or Excel sheets, etc whereas the unstructured form of data can be
                  Images, audios, videos, pdf files, etc DML Data Manipulation Language is used to Manipulate and
                  Extract meaningful data out of junk. Until and unless the Data Scientists don't have a good
                  knowledge about statistics and Probability, they are not capable of segmenting data, it may lead
                  to the high possibility of misinterpreting data and reaching to the incorrect conclusions.
                </p>
                <p>
                  The Data Scientists have to work over the algorithms of Machine Learning in day-to-day life. The
                  regression and Classification concepts help the Data scientists to predict the valuable insights
                  from all the Unstructured or structured form of Data available. The concept of Big Data helps to
                  extract the main information out of all the possible raw data available. Like we can separate oil
                  from water. The Data Scientist uses various concepts and skills to extract data like JAVA, R,
                  Apache Spark, Hadoop Etc.
                </p>
                <p>
                  Thus, there are many more components of data science available and every component works on
                  different algorithms.
                </p>

                <div>
                  <p className="font-semibold text-brand-navy mb-2">Skills Required for Data Science career:</p>
                  <ul className="list-disc pl-6 space-y-1 text-slate-600">
                    <li>Programming Skills</li>
                    <li>Statistics</li>
                    <li>Machine Learning</li>
                    <li>Multivariable Calculus &amp; Linear Algebra</li>
                    <li>Data Wrangling</li>
                    <li>Data Visualization &amp; Communication</li>
                    <li>Software Engineering</li>
                    <li>Data Intuition</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-brand-navy mb-2">Some of the prominent data science roles are listed below :</p>

                  <p className="font-semibold text-brand-navy mt-3">Data Scientist</p>
                  <p>
                    A Data Scientist's primary job role is to extract consumable information from structured and
                    unstructured data with computer programming tools and processes. Their job also includes creating
                    methodology and blueprint to present information to stakeholders. They are also supposed to
                    maintain databases.
                  </p>

                  <p className="font-semibold text-brand-navy mt-3">Data Analyst</p>
                  <p>
                    A Data Analyst has the responsibility of analyzing the data, identifying trends, and creating a
                    predictive model based on data studied. Another critical responsibility of a Data Analyst is to
                    translate findings into reports, which can be understood by the management, and help them
                    accurately visualize the possible outcome. They are also supposed to maintain databases and data
                    systems.
                  </p>

                  <p className="font-semibold text-brand-navy mt-3">Data Engineer</p>
                  <p>
                    Data Engineers are required to study data, develop data set processes, prepare the predictive
                    model, and build algorithms through which stakeholders can easily consume raw data. It may include
                    developing dashboards and reports that can be accessed and used by all stakeholders. Data Engineers
                    need to have strong communication skills to be able to understand client's requirements and
                    objectives. Analysts predict that the country will have more than 11 million job openings by 2026.
                    In fact, since 2019, hiring in the data science industry has increased by 46%. Yet, around 93,000
                    jobs in Data Science were vacant at the end of August 2020 in India.
                  </p>

                  <p className="font-semibold text-brand-navy mt-3">Data Mining Engineer</p>
                  <p>
                    The job of a Data Mining Engineer is mainly extracting data from an extensive database and
                    analyzing them. They are also responsible for building and maintaining software and digital
                    infrastructure to study big chunks of data.
                  </p>

                  <p className="font-semibold text-brand-navy mt-3">Data Architect</p>
                  <p>
                    Data Architect's role is to ensure that data used in creating a blueprint of a project is stable,
                    secure, and available to all stakeholders at all times. The job role includes collating,
                    organizing, centralizing, maintaining, and protecting a company or client's data.
                  </p>

                  <p className="font-semibold text-brand-navy mt-3">Data Statistician</p>
                  <p>
                    This job role includes critical responsibilities such as extraction of data using statistical
                    methodologies and analyzing, organizing, and contextualizing data and its subsets. A Data
                    Statistician is supposed to conduct tests to determine the reliability and accuracy of data.
                  </p>

                  <p className="font-semibold text-brand-navy mt-3">Project Manager</p>
                  <p>
                    Data mining, extraction, testing, analysis, and application for creating a blueprint is a wide
                    field of work that requires management to optimize the resources being used on a project. A
                    Project Manager's role is to oversee and guide the execution of the project. They act as a medium
                    between the team and clients to communicate requirements and changes in the project.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* â”€â”€ VISION & MISSION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          {activeId === 'vision' && (
            <div className="space-y-16">

              {/* â”€â”€ Section header â”€â”€ */}
              <div className="reveal flex items-center gap-4">
                <span className="w-8 h-px bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">CS &amp; Engineering Â· Data Science</span>
              </div>

              {/* â”€â”€ VISION â”€â”€ full-bleed cinematic card â”€â”€ */}
              <section className="reveal">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(135deg, #0d2d56 0%, #1a4b7c 50%, #0f3460 100%)' }}>
                  {/* large faint quote mark */}
                  <span className="absolute -top-6 -left-2 text-[200px] font-display font-bold text-white/[0.04] leading-none select-none pointer-events-none">"</span>
                  {/* gold glow */}
                  <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(253,184,19,0.12) 0%, transparent 70%)' }} />
                  {/* fine grid */}
                  <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)', backgroundSize: '32px 32px' }} />

                  <div className="relative z-10 p-8 md:p-14">
                    {/* label row */}
                    <div className="flex items-center gap-3 mb-8">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold/70">Department</p>
                        <p className="text-sm font-bold text-white/90 uppercase tracking-widest">Vision</p>
                      </div>
                    </div>

                    {/* quote */}
                    <blockquote className="text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-white leading-[1.3] italic mb-10 max-w-4xl">
                      "To be a front-runner in future tech and data-driven innovation through an interdisciplinary excellence in Computer Science and Engineering with a focus on Data science."
                    </blockquote>

                    {/* decorative bottom rule */}
                    <div className="flex items-center gap-4">
                      <div className="h-px flex-1 bg-white/10" />
                      <span className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-semibold">VCET Â· CSE(Data Science)</span>
                      <div className="h-px w-12 bg-brand-gold/40" />
                    </div>
                  </div>
                </div>
              </section>

              {/* â”€â”€ MISSION â”€â”€ */}
              <section className="reveal space-y-6">
                {/* heading */}
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
                      <span>To provide an environment for learning data science, fostering expertise and innovation.</span>
                    </li>
                    <li className="flex items-start gap-3 rounded-xl border border-slate-200 bg-brand-navylight/35 px-4 py-3 text-slate-700 leading-7">
                      <span className="mt-2 h-2 w-2 rounded-full bg-brand-navy flex-shrink-0" />
                      <span>To promote interdisciplinary innovations in emerging data technologies.</span>
                    </li>
                    <li className="flex items-start gap-3 rounded-xl border border-slate-200 bg-brand-navylight/35 px-4 py-3 text-slate-700 leading-7">
                      <span className="mt-2 h-2 w-2 rounded-full bg-brand-navy flex-shrink-0" />
                      <span>To foster quality education, ethical values, meeting personal, professional, and societal needs on a holistic level.</span>
                    </li>
                  </ul>
                </section>
              </section>

            </div>
          )}

          {/* â”€â”€ DEPARTMENTAL ADVISORY BOARD â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          {activeId === 'dab' && (() => {
            const members = [
              { sr: 1,  name: 'Dr. Rakesh Himte',          designation: 'Principal',                          org: 'VCET, Vasai',                                              role: 'Chairman',                tag: 'internal' },
              { sr: 2,  name: 'Dr. Vikas Gupta',           designation: 'Dean Academics and HOD-CSEDS',       org: 'VCET, Vasai',                                              role: 'Dean',                    tag: 'internal' },
              { sr: 3,  name: 'Dr. Bhushan Jadhav',        designation: 'Associate Professor, AIDS Dept.',    org: 'Thadomal Sahani College of Engineering',                   role: 'Academic Representative', tag: 'academic' },
              { sr: 4,  name: 'Dr. Anjali Yeole',          designation: 'Deputy Head, AIDS Dept.',            org: "Vivekanand Education Society's Institute of Technology",   role: 'Academic Representative', tag: 'academic' },
              { sr: 5,  name: 'Mr. Jeetendra Shenoy',      designation: 'Architect',                          org: 'L&T Infotech',                                             role: 'Industry Representative', tag: 'industry' },
              { sr: 6,  name: 'Mr. Sachin Sadare',         designation: 'Director',                           org: 'Digital Dojo Pvt. Ltd.',                                   role: 'Industry Representative', tag: 'industry' },
              { sr: 7,  name: 'Dr. Yogesh Pingle',         designation: 'Deputy HOD-CSEDS',                   org: 'VCET, Vasai',                                              role: 'Secretary',               tag: 'internal' },
              { sr: 8,  name: 'Mrs. Krunali Vartak',       designation: 'Assistant Professor, CSEDS',         org: 'VCET, Vasai',                                              role: 'Sr. Faculty',             tag: 'internal' },
              { sr: 9,  name: 'Mr. Sahil Gujral',          designation: 'BE Student',                         org: 'VCET, Vasai',                                              role: 'Student Representative', tag: 'student' },
              { sr: 10, name: 'Ms. Puja Chafekar',         designation: 'TE Student',                         org: 'VCET, Vasai',                                              role: 'Student Representative', tag: 'student' },
              { sr: 11, name: 'Adv. Sunil V. Varavdekar',  designation: 'BAR Council',                        org: 'Bombay High Court',                                        role: 'Parent Representative',  tag: 'parent'  },
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
                {/* Section header */}
                <div className="reveal">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-px bg-brand-gold" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">CS &amp; Engineering Â· Data Science</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy leading-tight">
                    Departmental Advisory Board
                    {' '}
                    <span className="text-brand-gold">(DAB)</span>
                  </h2>
                  <div className="mt-3 flex items-center gap-2 text-slate-500 text-sm">
                    <i className="ph-fill ph-check-circle text-brand-gold text-base" />
                    {' '}
                    Following are the members of the committee starting from 2022&#8209;23.
                  </div>
                  <div className="mt-5 h-px bg-gradient-to-r from-brand-gold via-brand-navylight to-transparent" />
                </div>

                {/* Table */}
                <div className="reveal bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-brand-navy text-white">
                          <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-widest w-12">Sr.</th>
                          <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-widest">Name</th>
                          <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-widest">Designation</th>
                          <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-widest">Organisation</th>
                          <th className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-widest">Role in DAB</th>
                        </tr>
                      </thead>
                      <tbody>
                        {members.map((m, idx) => (
                          <tr
                            key={m.sr}
                            className={`border-t border-slate-100 hover:bg-brand-navylight/40 transition-colors duration-150 ${idx % 2 === 1 ? 'bg-slate-50/60' : 'bg-white'}`}
                          >
                            <td className="px-4 py-4 font-bold text-brand-navy/40 text-xs">{String(m.sr).padStart(2, '0')}</td>
                            <td className="px-4 py-4 font-semibold text-brand-navy whitespace-nowrap">{m.name}</td>
                            <td className="px-4 py-4 text-slate-600">{m.designation}</td>
                            <td className="px-4 py-4 text-slate-600">{m.org}</td>
                            <td className="px-4 py-4">
                              <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap ${tagStyle[m.tag]}`}>
                                {m.role}
                              </span>
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

          {/* â”€â”€ POs, PEOs, PSOs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          {activeId === 'peo' && (() => {
            const pos = [
              { n: '01', text: 'An ability to apply knowledge of mathematics, science, and Engineering.' },
              { n: '02', text: 'An ability to design and conduct experiments, as well as to analyze and interpret data.' },
              { n: '03', text: 'An ability to design a system, component, or process to meet desired needs within realistic constraints.' },
              { n: '04', text: 'An ability to use the techniques, skills, and modern engineering tools necessary for civil engineering practice.' },
              { n: '05', text: 'Knowledge of contemporary issues.' },
              { n: '06', text: 'The broad education necessary to understand the impact of engineering solutions in a global, economic, environmental and societal context.' },
              { n: '07', text: 'An understanding of professional and ethical responsibility.' },
              { n: '08', text: 'An ability to function in multidisciplinary teams.' },
              { n: '09', text: 'An ability to communicate effectively.' },
              { n: '10', text: 'Recognition of the need for, and an ability to engage in life-long learning.' },
              { n: '11', text: "An understanding of engineering and management principles and apply these to one's own work, as a member and leader in a team, to manage projects." },
            ];
            const psos = [
              { n: 'PSO1', text: 'To apply the knowledge of Data Science to analyze, design and implement application specific problems with modern AI tools.' },
              { n: 'PSO2', text: 'To analyze problems and design applications to forecast, predict and decision-making using IoT, Big Data Analytics, Artificial Intelligence, and Machine Learning technologies.' },
            ];

            return (
              <div className="space-y-16">

                {/* Page header */}
                <div className="reveal">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-px bg-brand-gold" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">CS &amp; Engineering Â· Data Science</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy">POs, PEOs &amp; PSOs</h2>
                  <div className="mt-4 h-px bg-gradient-to-r from-brand-gold via-brand-navylight to-transparent" />
                </div>

                {/* â”€â”€ PROGRAM OUTCOMES â”€â”€ */}
                <section className="reveal space-y-6">
                  {/* heading */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">11 Outcomes</p>
                    <h3 className="text-2xl font-display font-bold text-brand-navy leading-tight">Program Outcomes (POs)</h3>
                  </div>

                  {/* 2-col grid on md+ */}
                  <div className="grid md:grid-cols-2 gap-3">
                    {pos.map((po, idx) => {
                      let delay = 'delay-300';
                      if (idx % 3 === 0) delay = 'delay-100';
                      else if (idx % 3 === 1) delay = 'delay-200';
                      return (
                        <div
                          key={po.n}
                          className={`reveal ${delay} flex gap-4 items-start bg-white border border-slate-100 rounded-xl px-5 py-4 shadow-sm`}
                        >
                          <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-brand-navylight flex items-center justify-center text-[11px] font-bold text-brand-navy">
                            {po.n}
                          </span>
                          <p className="text-sm text-slate-600 leading-relaxed pt-1">{po.text}</p>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* â”€â”€ PROGRAM EDUCATIONAL OBJECTIVES â”€â”€ */}
                <section className="reveal">
                  <div className="relative rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg,#0d2d56 0%,#1a4b7c 100%)' }}>
                    <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
                    <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(253,184,19,0.12) 0%,transparent 70%)' }} />
                    <div className="relative z-10 p-8 md:p-10">
                      <div className="max-w-4xl">
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold/80 mb-1">Objectives</p>
                        <h3 className="text-2xl font-display font-bold text-white mb-2">Program Educational Objectives (PEOs)</h3>
                        <p className="text-white/85 text-sm leading-relaxed">Program Educational Objectives (PEOs):</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* â”€â”€ PROGRAM SPECIFIC OUTCOMES â”€â”€ */}
                <section className="reveal space-y-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">Data Science Specific</p>
                    <h3 className="text-2xl font-display font-bold text-brand-navy leading-tight">Program Specific Outcomes (PSOs)</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    {psos.map((pso, idx) => {
                      let delay = 'delay-300';
                      if (idx % 3 === 0) delay = 'delay-100';
                      else if (idx % 3 === 1) delay = 'delay-200';
                      return (
                        <div
                          key={pso.n}
                          className={`reveal ${delay} bg-white rounded-2xl p-6 border border-slate-100 shadow-sm`}
                        >
                          <p className="text-sm font-bold text-brand-navy mb-2">{pso.n}</p>
                          <p className="text-slate-600 text-sm leading-relaxed">{pso.text}</p>
                        </div>
                      );
                    })}
                  </div>
                </section>

              </div>
            );
          })()}

          {/* â”€â”€ MoU â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          {activeId === 'mou' && (
            <section className="reveal bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-4"><span className="w-8 h-px bg-brand-gold" /><span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">CS &amp; Engineering Â· Data Science</span></div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">MoUs &amp; Collaborations<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
                <div className="space-y-4">
                  {department?.content?.mous?.length ? department.content.mous.map((m, idx) => (
                    <div key={idx} className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-brand-gold hover:bg-brand-navylight transition-colors shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-base font-bold text-brand-navy">{m.organization || `MoU ${idx + 1}`}</h4>
                        {m.description && <p className="text-sm text-slate-600 mt-1.5">{m.description}</p>}
                      </div>
                      {m.pdf && (
                        <a href={resolveUploadedAssetUrl(m.pdf as string) || '#'} target="_blank" rel="noopener noreferrer" className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-brand-gold/10 text-brand-gold hover:bg-brand-gold hover:text-white transition-colors" title="View Document">
                          <i className="ph ph-arrow-up-right text-lg" />
                        </a>
                      )}
                    </div>
                  )) : (
                    <div className="text-sm text-slate-500 italic px-4 py-3">No MoUs or Collaborations available at this time.</div>
                  )}
                </div>
              
              </section>
          )}

          {/* â”€â”€ PATENT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          {activeId === 'patent' && (
            <section className="reveal bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-4"><span className="w-8 h-px bg-brand-gold" /><span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">CS &amp; Engineering Â· Data Science</span></div>
              <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Patents &amp; Copyrights<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
                <div className="space-y-4">
                  {department?.content?.patents?.length ? department.content.patents.map((p, idx) => (
                    <div key={idx} className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-brand-gold hover:bg-brand-navylight transition-colors shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-base font-bold text-brand-navy">{p.title || `Patent ${idx + 1}`}</h4>
                        {p.description && <p className="text-sm text-slate-600 mt-1.5">{p.description}</p>}
                      </div>
                      {p.pdf && (
                        <a href={resolveUploadedAssetUrl(p.pdf as string) || '#'} target="_blank" rel="noopener noreferrer" className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-brand-gold/10 text-brand-gold hover:bg-brand-gold hover:text-white transition-colors" title="View Document">
                          <i className="ph ph-arrow-up-right text-lg" />
                        </a>
                      )}
                    </div>
                  )) : (
                    <div className="text-sm text-slate-500 italic px-4 py-3">No Patents or Copyrights available at this time.</div>
                  )}
                </div>
              
              </section>
          )}

          {/* â”€â”€ FACULTY â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          {activeId === 'faculty' && <DepartmentFacultySection departmentName="Computer Science & Data Science" />}

          {/* â”€â”€ TOPPERS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          {activeId === 'toppers' && (() => {
            const toppers = [
              { rank: 1, name: 'Shukla Abhay Devnath', score: '9.79 SGPI' },
              { rank: 2, name: 'Kalathiya Deven Gunvanthbhai', score: '9.08 SGPI' },
              { rank: 3, name: 'Berde Jayesh Sunil', score: '9 SGPI' },
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4"><span className="w-8 h-px bg-brand-gold" /><span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">CS &amp; Engineering Â· Data Science</span></div>
                <h3 className="text-2xl font-bold text-brand-navy mb-1 relative inline-block">Toppers{' '}<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
                <p className="mt-4 text-sm font-semibold text-brand-navy">Academic Year: 2021-22 (SE)</p>
                <div className="mt-5 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-brand-navy text-white">
                        <th className="px-4 py-3 text-left">Rank</th>
                        <th className="px-4 py-3 text-left">Student Name</th>
                        <th className="px-4 py-3 text-left">SGPI</th>
                      </tr>
                    </thead>
                    <tbody>
                      {toppers.map((item, idx) => (
                        <tr key={item.rank} className="border-t border-slate-100">
                          <td className="px-4 py-3 font-semibold text-brand-navy">{item.rank}</td>
                          <td className="px-4 py-3 text-slate-700">{item.name}</td>
                          <td className="px-4 py-3 text-slate-700">{item.score}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            );
          })()}

          {/* â”€â”€ SYLLABUS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          {activeId === 'syllabus' && (() => {
            const links = [
              { label: 'Syllabus Revised 2019-20 (Computer SE New 8 Branch)', url: 'pdfs/Department/ComputerScienceandEngineering(DataScience)/Syllabus/Computer_SE_New_8_Branch_R2019_1.7.2021.pdf' },
              { label: 'Syllabus Revised 2019-20 (Final Syllabus)', url: 'pdfs/Department/ComputerScienceandEngineering(DataScience)/Syllabus/Final-Syllabus-1.pdf' },
              { label: 'Syllabus Revised 2019-20 (BE CSE AIML / CSE DS)', url: 'pdfs/Department/ComputerScienceandEngineering(DataScience)/Syllabus/BE_CSE_AIML__CSE_DS__AI_DS_AI_ML_DE.pdf' },
              { label: 'Honours & Minor Degree Program (Data Science)', url: 'pdfs/Department/ComputerScienceandEngineering(DataScience)/Syllabus/Honours-Minor-Degree-Program-Data-Science(1).pdf' },
              { label: 'PO PSO CO (Rev-2019 CSEDS Syllabus)', url: 'pdfs/Department/ComputerScienceandEngineering(DataScience)/Syllabus/2.6.1_Rev-2019_CSEDS_Syllabus.pdf' },
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4"><span className="w-8 h-px bg-brand-gold" /><span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">CS &amp; Engineering Â· Data Science</span></div>
                <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Syllabus{' '}<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
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

          {/* â”€â”€ NEWSLETTER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          {activeId === 'newsletter' && (
            <DepartmentNewsletterPanel
              departmentLabel="CS & Engineering · Data Science"
              newsletterItems={newsletters.length > 0 ? newsletters : newsletterPdfs}
              magazineItems={magazines.length > 0 ? magazines : magazinePdfs}
            />
          )}

          {/* â”€â”€ OTHER SECTIONS (placeholder) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          {activeId !== 'about' && activeId !== 'vision' && activeId !== 'dab' && activeId !== 'mou' && activeId !== 'patent' && activeId !== 'peo' && activeId !== 'faculty' && activeId !== 'toppers' && activeId !== 'syllabus' && activeId !== 'newsletter' && (
            <section className="reveal bg-white rounded-3xl p-12 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center min-h-[300px]">
              <div className="w-16 h-16 rounded-2xl bg-brand-navylight flex items-center justify-center mb-4">
                <i className={`ph ${activeLink?.icon ?? 'ph-folder'} text-3xl text-brand-navy`} />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-2">{activeLink?.label}</h3>
              <p className="text-slate-500">Content for this section is coming soon.</p>
            </section>
          )}

        ﻿          {/* ════ FACULTY ACHIEVEMENTS ════════════════════════════════ */}
          {activeId === 'faculty-achievements' && (() => {
            const hasStaticFa = false;
            const dynamicAch = department?.content?.facultyAchievements || [];
            if (!dynamicAch.length && !hasStaticFa) return null;
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Excellence &amp; Recognition</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-brand-navy leading-tight mb-8">Faculty Achievements</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {dynamicAch.map((item, idx) => (
                    <div key={idx} className="group relative bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      {item.image && (
                        <div className="mb-5 overflow-hidden rounded-xl h-48 w-full">
                          <img src={resolveUploadedAssetUrl(item.image)} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                      )}
                      <h4 className="text-xl font-bold text-brand-navy mb-2">{item.title}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">{item.description}</p>
                      {item.pdf && (
                        <a href={resolveUploadedAssetUrl(item.pdf)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-brand-gold hover:text-brand-navy transition-colors">
                          <i className="ph ph-file-pdf text-lg" />
                          View Document
                          <i className="ph ph-arrow-right" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            );
          })()}

          {/* ════ STUDENT ACHIEVEMENTS ════════════════════════════════ */}
          {activeId === 'student-achievements' && (() => {
            const hasStaticSa = false;
            const dynamicAch = department?.content?.studentAchievements || [];
            if (!dynamicAch.length && !hasStaticSa) return null;
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Student Laurels</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-brand-navy leading-tight mb-8">Students Achievements</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {dynamicAch.map((item, idx) => (
                    <div key={idx} className="group relative bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      {item.image && (
                        <div className="mb-5 overflow-hidden rounded-xl h-48 w-full">
                          <img src={resolveUploadedAssetUrl(item.image)} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                      )}
                      <h4 className="text-xl font-bold text-brand-navy mb-2">{item.title}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">{item.description}</p>
                      {item.pdf && (
                        <a href={resolveUploadedAssetUrl(item.pdf)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-brand-gold hover:text-brand-navy transition-colors">
                          <i className="ph ph-file-pdf text-lg" />
                          View Document
                          <i className="ph ph-arrow-right" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            );
          })()}

        </main>
      </div>
    </PageLayout>
  );
};

export default DeptCSDS;

