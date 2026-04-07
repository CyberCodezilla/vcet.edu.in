import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import DepartmentHodImage from '../../components/DepartmentHodImage';
import DepartmentFacultySection from '../../components/DepartmentFacultySection';
import { departmentApi } from '../../admin/api/departments';
import type { Department } from '../../admin/types';
import { resolveUploadedAssetUrl } from '../../utils/uploadedAssets';
import { newsletterApi } from '../../admin/api/newsletterApi';
import { resolveApiUrl } from '../../admin/api/client';

const resolveDepartmentAssetUrl = (value: unknown): string | null => {
  if (!value) return null;

  if (typeof value === 'string') {
    return resolveUploadedAssetUrl(value) ?? resolveApiUrl(value);
  }

  if (typeof value === 'object') {
    const candidate =
      (value as { url?: unknown; path?: unknown; fileUrl?: unknown; pdfUrl?: unknown }).url ??
      (value as { url?: unknown; path?: unknown; fileUrl?: unknown; pdfUrl?: unknown }).path ??
      (value as { url?: unknown; path?: unknown; fileUrl?: unknown; pdfUrl?: unknown }).fileUrl ??
      (value as { url?: unknown; path?: unknown; fileUrl?: unknown; pdfUrl?: unknown }).pdfUrl;

    return resolveDepartmentAssetUrl(candidate);
  }

  return null;
};

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
  { id: 'newsletter-magazine', label: 'Newsletter and Magazine', icon: 'ph-newspaper' },
];

const delayClass = (idx: number) => {
  if (idx % 3 === 0) return 'delay-100';
  if (idx % 3 === 1) return 'delay-200';
  return 'delay-300';
};

const itechIntroParagraphs = [
  'ITECH is the departmental committee which provides an opportunity to the budding engineers of VCET to enhance their knowledge about the advancement in technology. ITECH looks after the technical activities as well as academic interests of the entire student pursuing engineering degree in VCET. We aim at keeping the students updated with the latest enthralling technologies and advancements.',
  'The goal of education is not to increase the amount of knowledge but to create the possibilities for students to invent and discover new technical trends. And for good ideas and true innovation you need human interactions, conflicts, arguments, and debates. This results in a team of budding engineers who put in their efforts for ITECH magazine and newsletter.',
  "This year ITECH has taken a step forward by transforming its publication 'LOGIN: to explore' from a magazine to a digitalized platform. The articles of ITECH are published on the VCET website. This committee has also released the departmental newsletter which includes news articles related to advance technical scenario in the global markets.",
];

const newsletterPdfs = [
  { label: 'NEWSLETTER 2024-25', href: '/pdfs/Department/InformationTechnology/Newsletter/NEWSLETTER-2024-25.pdf' },
  { label: 'NEWSLETTER 2023-24', href: '/pdfs/Department/InformationTechnology/Newsletter/NEWSLETTER-2023-24.pdf' },
  { label: 'NEWSLETTER 2022-23', href: '/pdfs/Department/InformationTechnology/Newsletter/NEWSLETTER-2022-23.pdf' },
  { label: 'NEWSLETTER 2021-22', href: '/pdfs/Department/InformationTechnology/Newsletter/NEWSLETTER-2021-22.pdf' },
  { label: 'NEWSLETTER 2020-21', href: '/pdfs/Department/InformationTechnology/Newsletter/NEWSLETTER-2020-21.pdf' },
  { label: 'NEWSLETTER 2019-20', href: '/pdfs/Department/InformationTechnology/Newsletter/NEWSLETTER-2019-20.pdf' },
  { label: 'NEWSLETTER 2018-19', href: '/pdfs/Department/InformationTechnology/Newsletter/NEWSLETTER-2018-19.pdf' },
  { label: 'NEWSLETTER 2017-18', href: '/pdfs/Department/InformationTechnology/Newsletter/NEWSLETTER-2017-18.pdf' },
  { label: 'NEWSLETTER 2016-17', href: '/pdfs/Department/InformationTechnology/Newsletter/NEWSLETTER-2016-17.pdf' },
  { label: 'NEWSLETTER 2015-16', href: '/pdfs/Department/InformationTechnology/Newsletter/NEWSLETTER-2015-16.pdf' },
  { label: 'NEWSLETTER 2014-15', href: '/pdfs/Department/InformationTechnology/Newsletter/NEWSLETTER-2014-15.pdf' },
  { label: 'NEWSLETTER 2013-14', href: '/pdfs/Department/InformationTechnology/Newsletter/NEWSLETTER-2013-14.pdf' },
  { label: 'NEWSLETTER 2012-13', href: '/pdfs/Department/InformationTechnology/Newsletter/NEWSLETTER-2012-13.pdf' },
  { label: 'NEWSLETTER 2011-12', href: '/pdfs/Department/InformationTechnology/Newsletter/NEWSLETTER-2011-12.pdf' },
  { label: 'NEWSLETTER 2010-11', href: '/pdfs/Department/InformationTechnology/Newsletter/NEWSLETTER-2010-11.pdf' },
  { label: 'NEWSLETTER 2009-10', href: '/pdfs/Department/InformationTechnology/Newsletter/NEWSLETTER-2009-10.pdf' },
];

const magazinePdfs = [
  { label: 'MAGAZINE 2024-25', href: '/pdfs/Department/InformationTechnology/Magazine/MAGAZINE-2024-25.pdf' },
  { label: 'MAGAZINE 2023-24', href: '/pdfs/Department/InformationTechnology/Magazine/MAGAZINE-2023-24.pdf' },
  { label: 'MAGAZINE 2022-23', href: '/pdfs/Department/InformationTechnology/Magazine/MAGAZINE-2022-23.pdf' },
  { label: 'MAGAZINE 2021-22', href: '/pdfs/Department/InformationTechnology/Magazine/MAGAZINE-2021-22.pdf' },
  { label: 'MAGAZINE 2020-21', href: '/pdfs/Department/InformationTechnology/Magazine/MAGAZINE-2020-21.pdf' },
  { label: 'MAGAZINE 2019-20', href: '/pdfs/Department/InformationTechnology/Magazine/MAGAZINE-2019-20.pdf' },
  { label: 'MAGAZINE 2018-19', href: '/pdfs/Department/InformationTechnology/Magazine/MAGAZINE-2018-19.pdf' },
  { label: 'MAGAZINE 2017-18', href: '/pdfs/Department/InformationTechnology/Magazine/MAGAZINE-2017-18.pdf' },
  { label: 'MAGAZINE 2016-17', href: '/pdfs/Department/InformationTechnology/Magazine/MAGAZINE-2016-17.pdf' },
  { label: 'MAGAZINE 2015-16', href: '/pdfs/Department/InformationTechnology/Magazine/MAGAZINE-2015-16.pdf' },
  { label: 'MAGAZINE 2014-15', href: '/pdfs/Department/InformationTechnology/Magazine/MAGAZINE-2014-15.pdf' },
  { label: 'MAGAZINE 2013-14', href: '/pdfs/Department/InformationTechnology/Magazine/MAGAZINE-2013-14.pdf' },
  { label: 'MAGAZINE 2012-13', href: '/pdfs/Department/InformationTechnology/Magazine/MAGAZINE-2012-13.pdf' },
  { label: 'MAGAZINE 2011-12', href: '/pdfs/Department/InformationTechnology/Magazine/MAGAZINE-2011-12.pdf' },
  { label: 'MAGAZINE 2010-11', href: '/pdfs/Department/InformationTechnology/Magazine/MAGAZINE-2010-11.pdf' },
  { label: 'MAGAZINE 2009-10', href: '/pdfs/Department/InformationTechnology/Magazine/MAGAZINE-2009-10.pdf' },
];

const facultyAchievementLinks = [
  { label: 'Faculty Patents and Copyright (2024-25)', href: 'https://vcet.edu.in/wp-content/uploads/2025/03/2024-25-Patent-1.pdf' },
  { label: 'Faculty Awards', href: 'https://vcet.edu.in/wp-content/uploads/2024/07/Staff_achievements.pdf' },
  { label: 'Faculty Publications', href: 'https://vcet.edu.in/wp-content/uploads/2024/07/Staff_Publications_Stats.pdf' },
  { label: 'Research Grants Received', href: 'https://vcet.edu.in/wp-content/uploads/2024/07/Research-Grants-of-IT-Dept-1-1.pdf' },
];

const studentAchievementLinks = [
  { label: 'Student Achievements (Hackathon Achievers)', href: '/pdfs/Department/InformationTechnology/StudentsAchievements/Hackathon-Achivers.pdf' },
  { label: 'Sports/Cultural Activities at National/International Level', href: '/pdfs/Department/InformationTechnology/StudentsAchievements/Student-Cultural-Sports.pdf' },
];

const editorialRows = [
  { post: 'Chairman', names: ['Prathamesh Anil Karambe'] },
  { post: 'Chief editor', names: ['Smita Verma', 'Revathi Nair', 'Gaurav Gawde'] },
  { post: 'Newsletter Head', names: ['Khushboo Memon'] },
  { post: 'Graphics head', names: ['Tarun Parmar'] },
  { post: 'Treasurer', names: ['Ravikant Sharma', 'Shreyash Mhashilakar'] },
  { post: 'Graphics Team', names: ['Mohit Mathkar', 'Shraddha Pawar', 'Isha Vartak', 'Vedang Koli'] },
  { post: 'Editing Team', names: ['Kinjal Patel', 'Raj Kotadia', 'Krithika Suvarna', 'Yash Ajgaonkar', 'Kunal Bhoyar', 'Dishant Patil', 'Niketan Patil', 'Parshva Vora'] },
  { post: 'Website Team', names: ['Deepchand Dubey', 'Yash Meghani', 'Shashank Kamble', 'Kritesh Suthar', 'Rahul Gandhi', 'Shweta Sawant'] },
];

const DeptIT: React.FC = () => {
  const [activeId, setActiveId] = useState('about');
  const [department, setDepartment] = useState<Department | null>(null);
  const activeLink = sidebarLinks.find(l => l.id === activeId);
  const [dynamicApiItems, setDynamicApiItems] = useState<any[]>([]);

  useEffect(() => {
    departmentApi.getBySlug('information-technology')
      .then((res) => {
        if (res.success) {
          setDepartment(res.data);
          newsletterApi.list(res.data.id).then(n => setDynamicApiItems(n.data)).catch(console.error);
        }
      })
      .catch(() => setDepartment(null));
  }, []);

  const hodImageUrl = resolveDepartmentAssetUrl(department?.content?.hodImage);

  const sectionData = (department?.content as any)?.newsletterMagazineSection || null;
  
  const rawCommitteeDetails = String(sectionData?.committeeDetails || '');
  const committeeDetails = (rawCommitteeDetails ? rawCommitteeDetails.split(/\n{2,}/) : itechIntroParagraphs)
    .map((line: string) => line.trim())
    .filter((line: string) => line.length > 0);

  const newsletters = dynamicApiItems
    .filter(item => item.type === 'newsletter' && item.pdf)
    .map(item => ({ label: item.title, pdf: item.pdf }));
  const magazines = dynamicApiItems
    .filter(item => item.type === 'magazine' && item.pdf)
    .map(item => ({ label: item.title, pdf: item.pdf }));

  const staticNewsletters = newsletterPdfs.map((item) => ({
    label: item.label,
    pdf: item.href,
  }));
  const staticMagazines = magazinePdfs.map((item) => ({
    label: item.label,
    pdf: item.href,
  }));

  const newsletterItems = newsletters.length > 0 ? newsletters : staticNewsletters;
  const magazineItems = magazines.length > 0 ? magazines : staticMagazines;

  const publicationPanels = [
    { title: 'Newsletter', items: newsletterItems },
    { title: 'Magazine', items: magazineItems },
  ].filter((panel) => panel.items.length > 0);

  const staff = sectionData?.staffIncharge || {};
  const staffName = String(staff?.name || '').trim() || 'Prof. Bharati Gondhalekar';
  const staffEmail = String(staff?.email || '').trim() || 'bharati.gondhalekar@vcet.edu.in';
  const staffPhone = String(staff?.phone || '').trim() || '9423365470';
  const staffImage = resolveUploadedAssetUrl(staff?.image || null);
  
  // Show the staff section if there's any data, or if we fallback to empty placeholders
  const hasStaffSection = true;

  const tableTitle = String(sectionData?.tableTitle || '').trim() || 'ITECH Editorial Committee';
  const tableRows = Array.isArray(sectionData?.tableRows) && sectionData.tableRows.length > 0 
    && sectionData.tableRows.some((row: any) => String(row?.post || '').trim() || String(row?.name || '').trim())
      ? sectionData.tableRows.filter((row: any) => String(row?.post || '').trim() || String(row?.name || '').trim())
      : editorialRows.flatMap(row => row.names.map(name => ({ post: row.post, name })));

  const hasNewsletterMagazineSection =
    committeeDetails.length > 0 || publicationPanels.length > 0 || hasStaffSection || tableRows.length > 0;

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

      {/* â”€â”€ Hero Banner â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
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

      {/* â”€â”€ Page Body â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="container mx-auto px-4 sm:px-6 py-10 md:py-12 max-w-7xl flex flex-col lg:flex-row gap-8 lg:gap-10">

        {/* Sticky Sidebar */}
        <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0">
          <div className="lg:sticky lg:top-24 bg-white rounded-xl shadow-md overflow-hidden border border-slate-200 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
            <nav className="flex flex-col py-2">
              {sidebarLinks
                .filter((link) => link.id !== 'newsletter-magazine' || hasNewsletterMagazineSection)
                .map((link) => {
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

          {/* â•â•â•â• ABOUT â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
          {activeId === 'about' && (
            <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
              <div className="space-y-6 text-slate-600 leading-8 text-left">
                <div className="mx-auto max-w-md text-center space-y-4">
                  <DepartmentHodImage imageSrc={hodImageUrl} />
                  <div>
                    <p className="mt-4 text-2xl font-bold text-brand-navy">Dr. Thaksen Parvat</p>
                    <p className="mt-1 text-sm font-semibold text-brand-gold">Professor &amp; Head Of Department, Dean IT Infrastructure</p>
                  </div>
                </div>
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

          {/* â•â•â•â• VISION & MISSION â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
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
                      <span className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-semibold">VCET Â· Information Technology</span>
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

          {/* â•â•â•â• DAB â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
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

          {/* â•â•â•â• POs, PEOs & PSOs â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
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
              { n: '11', text: 'Project management and finance: Demonstrate knowledge and understanding of the engineering and management principles and apply these to oneâ€™s own work, as a member and leader in a team, to manage projects and in multidisciplinary environments.' },
              { n: '12', text: 'Life-long learning: Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change.' },
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

          {/* â•â•â•â• FACULTY â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
          {activeId === 'faculty' && <DepartmentFacultySection departmentName="Information Technology" />}

          {/* â•â•â•â• MoU â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
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

          {/* â•â•â•â• PAQIC â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
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

                    {/* ===================== FACULTY ACHIEVEMENTS ===================== */} 
          {activeId === 'faculty-achievements' && (() => {
            const dynamicAch = department?.content?.facultyAchievements || [];
            const validAch = dynamicAch.filter((item: any) =>
              [
                item?.title,
                item?.description,
                item?.image,
                item?.image_url,
                item?.photo,
                item?.url,
                item?.pdf,
                item?.pdf_url,
                item?.document_url,
                item?.fileUrl,
              ].some((value) => {
                if (typeof value === 'string') return value.trim().length > 0;
                return Boolean(value);
              }),
            );
            const dynamicLinks = validAch.map((item: any) => ({
              label: item.title?.trim() || 'Untitled Achievement',
              description: item.description?.trim() || '',
              href: resolveDepartmentAssetUrl(item.pdf ?? item.pdf_url ?? item.document_url ?? item.fileUrl ?? item.image ?? item.image_url ?? item.photo ?? item.url),
            }));
            const rows = [...facultyAchievementLinks, ...dynamicLinks];
            
            if (!rows.length) return null;
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Information Technology</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-brand-navy leading-tight mb-8">Faculty Achievements</h3>
                
                <div className="space-y-3">
                  {rows.map((item, idx) => {
                    const row = (
                      <>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold text-brand-navy">{item.label}</span>
                          {item.description && (
                            <span className="mt-1 block text-xs text-slate-500 leading-relaxed">{item.description}</span>
                          )}
                        </span>
                        <i className="ph ph-arrow-up-right text-brand-gold shrink-0" />
                      </>
                    );

                    if (item.href) {
                      return (
                        <a key={`${item.label}-${idx}`} href={item.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gold hover:bg-brand-navylight transition-colors">
                          {row}
                        </a>
                      );
                    }

                    return (
                      <div key={`${item.label}-${idx}`} className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy">
                        {row}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })()}

                    {/* ===================== STUDENT ACHIEVEMENTS ===================== */} 
          {activeId === 'student-achievements' && (() => {
            const dynamicAch = department?.content?.studentAchievements || [];
            const validAch = dynamicAch.filter((item: any) =>
              [
                item?.title,
                item?.description,
                item?.image,
                item?.image_url,
                item?.photo,
                item?.url,
                item?.pdf,
                item?.pdf_url,
                item?.document_url,
                item?.fileUrl,
              ].some((value) => {
                if (typeof value === 'string') return value.trim().length > 0;
                return Boolean(value);
              }),
            );
            const dynamicLinks = validAch.map((item: any) => ({
              label: item.title?.trim() || 'Untitled Achievement',
              description: item.description?.trim() || '',
              href: resolveDepartmentAssetUrl(item.pdf ?? item.pdf_url ?? item.document_url ?? item.fileUrl ?? item.image ?? item.image_url ?? item.photo ?? item.url),
            }));
            const rows = [...studentAchievementLinks, ...dynamicLinks];
            
            if (!rows.length) return null;
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Information Technology</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-brand-navy leading-tight mb-8">Students Achievements</h3>
                
                <div className="space-y-3">
                  {rows.map((item, idx) => {
                    const row = (
                      <>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold text-brand-navy">{item.label}</span>
                          {item.description && (
                            <span className="mt-1 block text-xs text-slate-500 leading-relaxed">{item.description}</span>
                          )}
                        </span>
                        <i className="ph ph-arrow-up-right text-brand-gold shrink-0" />
                      </>
                    );

                    if (item.href) {
                      return (
                        <a key={`${item.label}-${idx}`} href={item.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gold hover:bg-brand-navylight transition-colors">
                          {row}
                        </a>
                      );
                    }

                    return (
                      <div key={`${item.label}-${idx}`} className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy">
                        {row}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })()}

          {/* â•â•â•â• ACTIVITIES â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
          {activeId === 'activities' && (() => {
            const externalLinks = [
              { label: 'Code Craze', url: '/pdfs/Department/InformationTechnology/Activities/Code-Craze.pdf' },
              { label: 'Student Development Program', url: '/pdfs/Department/InformationTechnology/Activities/student-development-program-1.pdf' },
              { label: 'Faculty Development Program', url: '/pdfs/Department/InformationTechnology/Activities/faculty-development-program-1.pdf' },
            ];
            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Information Technology</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Activities<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
                <div className="space-y-3">
                  <Link to="/hackathon" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gold hover:bg-brand-navylight transition-colors">
                    <span>Hackathon</span>
                    <i className="ph ph-arrow-up-right text-brand-gold" />
                  </Link>
                  {externalLinks.map((item) => (
                    <a key={item.label} href={item.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gold hover:bg-brand-navylight transition-colors">
                      <span>{item.label}</span>
                      <i className="ph ph-arrow-up-right text-brand-gold" />
                    </a>
                  ))}
                </div>
              </section>
            );
          })()}

          {/* â•â•â•â• INFRASTRUCTURE â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
          {activeId === 'infrastructure' && (() => {
            const labs = [
              {
                title: 'Network Communication Laboratory',
                incharge: 'Mr. Chandan Kolvankar',
                software: 'License: Windows 11,Ubuntu 22.04, Node JS, Visual Studio 20-22 Pro, PYTHON , Android Studio',
                hardware: 'HP 280 PRO G6, I7 10th gen./ 8gb/256SSD/ 1TB HDD, 4 gb graphics Card (20 PC)',
                features: 'Dual boot configuration, UPS Backup, Internet connectivity to every computer.',
              },
              {
                title: 'Programming Laboratory',
                incharge: 'Ms. Anagha Patil',
                software: 'License: Windows 11,Ubuntu 22.04, Ms. Project, Java & Turbou C, TASM, R & R Studio',
                hardware: 'HP 280 PRO G6 , I5 10500, 3.1 GHZ/ 8 gb RAM/ 1 TB+256M2 SSD (20 PC)',
                features: 'Dual boot configuration, UPS Backup, Internet connectivity to every computer.',
              },
              {
                title: 'Data Science Laboratory',
                incharge: 'Ms. Vaishali Shirsath',
                software: 'License: Windows 11, ubuntu 22.04,Java , PYTHON , My SQL Workbench, Weka , Visual Studio 20-22 pro',
                hardware: 'HP 280 PRO G6 , I5 10500, 3.1 GHZ/ 8 gb RAM/ 1 TB+256M2 SSD (20 PC)',
                features: 'Dual boot configuration, UPS Backup, Internet connectivity to every computer.',
              },
              {
                title: 'IOT Laboratory',
                incharge: 'Ms. Bharti Gondhalekar',
                software: 'License: Windows 11,ubuntu 22.04, NS2, Wireshark, Cisco Packet Tracer',
                hardware: 'HP 280 PRO G6 , I5 10500, 3.1 GHZ/ 8 gb RAM/ 1 TB+256M2 SSD (20 PC)',
                features: 'Dual boot configuration, UPS Backup, Internet connectivity to every computer.',
              },
              {
                title: 'Devops Laboratoy',
                incharge: 'Ms. Pragati Patil',
                software: 'License: Windows 11,ubuntu 22.04,,AnyDesk, Android Studio, PYTHON, Java, SWI Prolog and Haskell',
                hardware: 'HP 280 PRO G6 , I5 10500, 3.1 GHZ/ 8 gb RAM/ 1 TB+256M2 SSD (20 PC)',
                features: 'Dual boot configuration, UPS Backup, Internet connectivity to every computer.',
              },
              {
                title: 'Project Laboratory',
                incharge: 'Mr. Sainath Patil',
                software: 'License: Windows 11,Ubuntu 22.04, Rational Rose, Visual Studio,.NET Open Source: Java, Python, Android Studio',
                hardware: 'HP 280 PRO G6 , I5 10500, 3.1 GHZ/ 8 gb RAM/ 1 TB+256M2 SSD (14 PC) | HP 280 PRO G6, I7 10th gen./ 8gb/256SSD/ 1TB HDD, 4 gb graphics Card (20 PC',
                features: 'Dual boot configuration, UPS Backup, Internet connectivity to every computer.',
              },
            ];

            return (
              <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 space-y-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-brand-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Information Technology</span>
                </div>
                <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">Infrastructure<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {labs.map((lab, idx) => (
                    <article key={lab.title} className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                      <div className="w-full aspect-[16/9] bg-slate-100 border-b border-slate-200 flex flex-col items-center justify-center text-slate-400">
                        <i className="ph ph-image text-4xl mb-2" />
                        <span className="text-sm font-medium">Image Holder {idx + 1}</span>
                      </div>

                      <div className="p-5 space-y-4">
                        <h4 className="text-lg font-bold text-brand-navy">{lab.title}</h4>

                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-widest text-brand-gold mb-1">Lab In-Charge</p>
                          <p className="text-slate-700">{lab.incharge}</p>
                        </div>

                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-widest text-brand-gold mb-1">Software Installed</p>
                          <p className="text-slate-600 leading-7">{lab.software}</p>
                        </div>

                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-widest text-brand-gold mb-1">Hardware</p>
                          <p className="text-slate-600 leading-7">{lab.hardware}</p>
                        </div>

                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-widest text-brand-gold mb-1">Features</p>
                          <p className="text-slate-600 leading-7">{lab.features}</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })()}

          {/* â•â•â•â• TOPPERS â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
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
                se: ['Dodiya Meet - 8.7 CGPI', 'Gharat Shruti - 8.6 CGPI', 'Maurya Akash - 8.48 CGPI', 'Shash Harshi - 8.47 CGPI', 'Gupta Sima - 8.41 CGPI'],
                te: ['Singh Shobit - 8.77 CGPI', 'Abhishek Jani - 8.64 CGPI, Zaid Khan - 8.64 CGPI', 'Malap Kedar - 8.53 CGPI', 'Jadhav Omkar - 8.52 CGPI', 'Vatsal Shah - 8.40 CGPI'],
                be: ['Kadam Aaditi - 9.37 CGPI', 'Kolwankar Tejas - 9.27 CGPI', 'Vedant Sankhe - 8.96 CGPI', 'Mulla Insha - 8.85 CGPI', 'Vartak Viditi - 8.76 CGPI'],
              },
              {
                year: '2021-22',
                se: ['Shah Vtsal - 9.3 CGPI', 'Malap Kedar - 9.20 CGPI', 'Jani Abhishek - 9.16 CGPI', 'Dalvi Ansh - 9.090 CGPI', 'Borase Dipak - 9.085 CGPI'],
                te: ['Kolwankar Tejas - 9.40 CGPI, Kadam Aaditi - 9.40 CGPI', 'Churihar Mohd Asim - 9.04 CGPI', 'Hegde Akhay - 8.80 CGPI', 'Jain Yogesh - 8.75 CGPI', 'Bhalala Vaibhav - 8.73 CGPI'],
                be: ['Madhavani Soham - 9.16 CGPI', 'Jadhav Granthali - 9.05 CGPI', 'Deorukhkar Jayesh - 8.96 CGPI', 'Pandya Harsh - 8.91 CGPI', 'Bari Ruchi - 8.81 CGPI'],
              },
              {
                year: '2020-21',
                se: ['Kolvankar Tejas - 9.83 CGPI', 'Sankhe Vedant - 9.70 CGPI', 'Kadam Aditi - 9.68 CGPI', 'Modak Isha - 9.52 CGPI, Vartak Viditi - 9.52 CGPI', 'Shah Devansh - 9.46 CGPI'],
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

          {/* â•â•â•â• SYLLABUS â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
          {activeId === 'syllabus' && (() => {
            const links = [
              { label: 'Syllabus R12', url: '/pdfs/Department/InformationTechnology/syllabus/SyllabusR1.pdf' },
              { label: 'Syllabus R16', url: '/pdfs/Department/InformationTechnology/syllabus/SyllabusR16.pdf' },
              { label: 'Syllabus R19', url: '/pdfs/Department/InformationTechnology/syllabus/SyllabusR19.pdf' },
              { label: 'Honours & Minor Degree Program (TE)', url: 'https://vcet.edu.in/wp-content/uploads/2023/07/Honours-Minor-Degree-Program-Data-Science.pdf' },
              { label: 'PO PSO CO R16', url: '/pdfs/Department/InformationTechnology/syllabus/2.6.1_R-2016_IT_syllabus.pdf' },
              { label: 'PO PSO CO R19', url: '/pdfs/Department/InformationTechnology/syllabus/2.6.1_IT_R-2019_syllabus.pdf' },
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

          {/* â•â•â•â• TIME TABLE â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
          {activeId === 'time-table' && (() => {
            const links = [
              { label: '2025-26 Odd Sem Time Table', url: '/pdfs/Department/InformationTechnology/TimeTable/2025-26OddSem.pdf' },
              { label: '2024-25 Even Sem Time Table', url: '/pdfs/Department/InformationTechnology/TimeTable/Eve-Sem-Time-Table-2024-25.pdf' },
              { label: '2024-25 Odd Sem Time Table', url: '/pdfs/Department/InformationTechnology/TimeTable/2024-25OddSem.pdf' },
              { label: '2023-24 Even Sem Time Table', url: '/pdfs/Department/InformationTechnology/TimeTable/2023-24OddSem.pdf' },
              { label: '2023-24 Odd Sem Time Table', url: '/pdfs/Department/InformationTechnology/TimeTable/2023-24EvenSem.pdf' },
              { label: '2022-23 Even Sem Time Table', url: '/pdfs/Department/InformationTechnology/TimeTable/2022-23EvenSem.pdf' },
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

          {/* â•â•â•â• NEWSLETTER & MAGAZINE â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
          {activeId === 'newsletter-magazine' && hasNewsletterMagazineSection && (
            <section className="reveal space-y-8">
              {committeeDetails.length > 0 && (
                <article className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-px bg-brand-gold" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Information Technology</span>
                  </div>
                  <h3 className="text-2xl font-bold text-brand-navy mb-6 relative inline-block">
                    Committee Details
                    <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" />
                  </h3>
                  <div className="space-y-4 text-[15px] leading-8 text-slate-600">
                    {committeeDetails.map((paragraph: string, idx: number) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              )}

              {publicationPanels.length > 0 && (
                <article className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
                  <div className="mt-0 grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {publicationPanels.map((panel) => (
                      <div key={panel.title} className="border border-[#D9E3EE] bg-white shadow-[0_10px_20px_rgba(15,23,42,0.06)]">
                        <div className="px-5 py-4 bg-gradient-to-r from-[#123E67] to-[#1E578B] border-b border-[#0F355B]">
                          <h4 className="text-white text-[22px] font-display font-bold tracking-tight">{panel.title}</h4>
                        </div>
                        <div className="p-4 md:p-5 grid gap-2">
                          {panel.items.map((item: any, idx: number) => (
                            <a
                              key={`${panel.title}-${item.label}-${idx}`}
                              href={resolveUploadedAssetUrl(item.pdf || '') || '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-between gap-3 px-4 py-2.5 border border-[#BCD2E8] bg-white text-[#1A4B7C] font-semibold text-[14px] hover:border-[#56A9D8] hover:bg-[#EDF6FD] transition-colors"
                              style={{ transitionDelay: `${idx * 0.02}s` }}
                            >
                              <span className="inline-flex items-center gap-2">
                                <span className="inline-flex items-center justify-center h-5 w-5 rounded-sm border border-[#56A9D8]/50 text-[#56A9D8] text-[10px] font-extrabold">PDF</span>
                                <span>{item.label}</span>
                              </span>
                              <i className="ph ph-arrow-up-right text-[#4F6B86]" />
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              )}

              {hasStaffSection && (
                <article className="border border-[#D9E3EE] bg-white shadow-[0_10px_20px_rgba(15,23,42,0.06)]">
                  <div className="px-5 py-4 bg-gradient-to-r from-[#123E67] to-[#1E578B] border-b border-[#0F355B]">
                    <h4 className="text-white text-[20px] md:text-[22px] font-display font-bold tracking-tight">Committee Details / Staff Incharge</h4>
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
                      <div className="w-full md:w-[170px] lg:w-[190px] flex-shrink-0">
                        <div className="aspect-[4/5] rounded-2xl border border-[#D8E6F3] bg-[#F4F8FC] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
                          {staffImage ? (
                            <img src={staffImage} alt={staffName || 'Staff Incharge'} className="w-full h-full object-cover" />
                          ) : (
                            <>
                              <i className="ph ph-user-circle text-[44px] text-[#56A9D8]" />
                              <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#4F6B86]">Faculty Image</p>
                              <p className="text-[10px] text-[#6B7F95]">Image unavailable</p>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="min-w-0">
                        {staffName && <h5 className="text-3xl font-display font-bold text-[#56A9D8]">{staffName}</h5>}
                        <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 text-[#4F6B86] font-medium">
                          {staffEmail && (
                            <a href={`mailto:${staffEmail}`} className="inline-flex items-center gap-2 hover:text-[#1A4B7C] transition-colors">
                              <i className="ph ph-envelope-simple text-[#56A9D8]" />
                              <span>{staffEmail}</span>
                            </a>
                          )}
                          {staffPhone && (
                            <a href={`tel:${staffPhone}`} className="inline-flex items-center gap-2 hover:text-[#1A4B7C] transition-colors">
                              <i className="ph ph-phone text-[#56A9D8]" />
                              <span>{staffPhone}</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              )}

              {(tableTitle || tableRows.length > 0) && (
                <article className="border border-[#D9E3EE] bg-white shadow-[0_10px_20px_rgba(15,23,42,0.06)]">
                  <div className="px-5 py-4 bg-gradient-to-r from-[#123E67] to-[#1E578B] border-b border-[#0F355B]">
                    <h4 className="text-white text-[20px] md:text-[22px] font-display font-bold tracking-tight">{tableTitle || 'Committee Table'}</h4>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[620px] border-collapse">
                      <thead>
                        <tr className="bg-[#F4F8FC] text-[#1A4B7C]">
                          <th className="w-[40%] px-4 py-3 text-left text-[12px] uppercase tracking-[0.1em] font-extrabold border-r border-[#D8E2EE]">Post</th>
                          <th className="px-4 py-3 text-left text-[12px] uppercase tracking-[0.1em] font-extrabold">Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableRows.map((row: any, index: number) => (
                          <tr key={`${row.post}-${row.name}-${index}`} className={`border-t border-[#E4EBF3] ${index % 2 === 0 ? 'bg-white' : 'bg-[#FBFDFF]'}`}>
                            <td className="px-4 py-3.5 align-top text-[14px] md:text-[15px] font-semibold text-[#1A4B7C] border-r border-[#E4EBF3]">
                              {row.post}
                            </td>
                            <td className="px-4 py-3.5 align-top text-[14px] md:text-[15px] text-[#374151] leading-[1.75]">
                              {row.name}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </article>
              )}
            </section>
          )}

          {/* â•â•â•â• YOUTUBE â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
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

          {/* â•â•â•â• FALLBACK â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
          {activeId !== 'about' && activeId !== 'vision' && activeId !== 'dab' && activeId !== 'peo' && activeId !== 'faculty' && activeId !== 'mou' && activeId !== 'paqic' && activeId !== 'faculty-achievements' && activeId !== 'student-achievements' && activeId !== 'activities' && activeId !== 'infrastructure' && activeId !== 'toppers' && activeId !== 'syllabus' && activeId !== 'time-table' && activeId !== 'newsletter-magazine' && activeId !== 'youtube' && (
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

