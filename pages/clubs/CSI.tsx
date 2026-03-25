import React, { useState, useEffect, useRef } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import {
  Users,
  Award,
  Zap,
  ChevronRight,
  Target,
  Image as ImageIcon,
  Users2,
  Mail,
  Phone,
  Code,
  Cpu,
  Trophy,
  Monitor,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   TYPES & DATA
───────────────────────────────────────────── */
type TabId = 'objective' | 'gallery' | 'team' | 'studentdetails';

const tabs: { id: TabId; label: string; icon: any; desc: string }[] = [
  { id: 'objective',      label: 'Objective',       icon: Target,      desc: 'Our mission & goals' },
  { id: 'gallery',        label: 'Gallery',         icon: ImageIcon,   desc: 'Moments captured' },
  { id: 'team',           label: 'Team',            icon: Users2,      desc: 'Faculty coordinators' },
  { id: 'studentdetails', label: 'Student Details', icon: Users,       desc: 'Committee 2025-26' },
];

/* 
ADMIN EDIT: FACULTY TEAM DATA
Modify this array to update faculty team members
Add imageUrl field when images are available
*/
const facultyTeam = [
  {
    id: 1,
    name: 'Dr. Swati Varma',
    department: 'Computer Engg.',
    email: 'swati.varma@vcet.edu.in',
    phone: '9869775463',
    initials: 'SV',
    // imageUrl: '/images/csi/swati-varma.jpg' // ADMIN: Add image path here
  },
  {
    id: 2,
    name: 'Ms. Maya Varghese',
    department: 'CSE-DS',
    email: 'maya.varghese@vcet.edu.in',
    phone: '9699547709',
    initials: 'MV',
    // imageUrl: '/images/csi/maya-varghese.jpg' // ADMIN: Add image path here
  },
  {
    id: 3,
    name: 'Ms. Pragati Patil',
    department: 'InfoTech.',
    email: 'pragati.patil@vcet.edu.in',
    phone: '9769990253',
    initials: 'PP',
    // imageUrl: '/images/csi/pragati-patil.jpg' // ADMIN: Add image path here
  },
];

/* 
ADMIN EDIT: STUDENT COMMITTEE TABLE DATA
Modify this array to update the CSI Committee 2025-26
For multiple students in same position, add multiple entries with same position
*/
const studentCommittee = [
  { position: 'Chairperson',       dept: 'CSE(DS)',  name: 'Siddharth Chakravarty', isLeader: true  },
  { position: 'Treasurer',         dept: 'IT',       name: 'Aditya Bawane',         isLeader: true  },
  { position: 'Secretary',         dept: 'IT',       name: 'Pranay Ippakayal',      isLeader: false },
  { position: 'Secretary',         dept: 'IT',       name: 'Sangini Shetty',        isLeader: false },
  { position: 'Joint Secretary',   dept: 'COMPS',    name: 'Vatsal Makadiya',       isLeader: false },
  { position: 'Joint Secretary',   dept: 'COMPS',    name: 'Sumit Mali',            isLeader: false },
  { position: 'Technical Head',    dept: 'COMPS',    name: 'Wajiha Kulsum',         isLeader: false },
  { position: 'Technical Head',    dept: 'IT',       name: 'Shubham Singh',         isLeader: false },
  { position: 'Technical Head',    dept: 'CSE(DS)',  name: 'Parth Vasave',          isLeader: false },
  { position: 'Organizing Head',   dept: 'IT',       name: 'Shreya Kathe',          isLeader: false },
  { position: 'Organizing Head',   dept: 'IT',       name: 'Kunal Patil',           isLeader: false },
  { position: 'Organizing Head',   dept: 'IT',       name: 'Aditi Gupta',           isLeader: false },
  { position: 'Organizing Head',   dept: 'IT',       name: 'Bhumi Kamble',          isLeader: false },
  { position: 'Organizing Head',   dept: 'CSE(DS)',  name: 'Aditi Rasal',           isLeader: false },
  { position: 'PR Head',           dept: 'IT',       name: 'Meenakshi Kshirsagar',  isLeader: false },
  { position: 'PR Head',           dept: 'IT',       name: 'Khushi Machhi',         isLeader: false },
  { position: 'PR Head',           dept: 'CSE(DS)',  name: 'Shardul Brid',          isLeader: false },
  { position: 'Admin Head',        dept: 'COMPS',    name: 'Gargi Betawadkar',      isLeader: false },
  { position: 'Admin Head',        dept: 'CSE(DS)',  name: 'Shreya Dadhekar',       isLeader: false },
  { position: 'Admin Head',        dept: 'COMPS',    name: 'Saivamshi Jilla',       isLeader: false },
];

/* ─────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────── */
function useInView(ref: React.RefObject<Element>, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

function useCountUp(target: number, inView: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

/* ─────────────────────────────────────────────
   STAT COUNTER CARD
───────────────────────────────────────────── */
const StatCard: React.FC<{ icon: any; value: number; suffix: string; label: string; delay: number; inView: boolean }> = 
  ({ icon: Icon, value, suffix, label, delay, inView }) => {
  const count = useCountUp(value, inView, 1500);
  return (
    <div
      className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 rounded-xl bg-[#ffb100]/20 flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-[#ffb100]" />
      </div>
      <p className="text-3xl font-extrabold text-white tabular-nums">
        {count}{suffix}
      </p>
      <p className="text-xs font-bold uppercase tracking-widest text-white/50 mt-1">{label}</p>
    </div>
  );
};

/* ─────────────────────────────────────────────
   SECTION HEADING
───────────────────────────────────────────── */
const SectionHeading: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-10">
    <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a2b4b] mb-3 tracking-tight">{title}</h2>
    {subtitle && <p className="text-[#64748b] text-base mb-4">{subtitle}</p>}
    <div className="flex gap-1.5 items-center">
      <div className="h-1 w-10 bg-[#ffb100] rounded-full" />
      <div className="h-1 w-6 bg-[#0056b3] rounded-full" />
      <div className="h-1 w-3 bg-[#1a2b4b]/30 rounded-full" />
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   OBJECTIVE PANEL
───────────────────────────────────────────── */
const ObjectivePanel: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  return (
    <div ref={ref} className={`space-y-12 p-8 lg:p-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <SectionHeading title="Objective" subtitle="Computer Society of India - VCET Student Chapter" />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
        <div className="lg:col-span-3 space-y-5 text-[#475569] leading-relaxed text-[15px]">
          <p>
            Computer Society of India is the <span className="font-bold text-[#0056b3]">first and largest</span> body of computer professionals in India. 
            The CSI students chapter of VCET was established in the year <span className="font-bold text-[#0056b3]">2003</span>.
          </p>
          <p>
            Amidst all its other responsibilities, the CSI students chapter understands that the primary objective 
            of its existence is to promote the development of a <span className="font-semibold text-[#1a2b4b]">coding culture</span> and to help students 
            ameliorate their technical skills.
          </p>
          <p>
            To achieve this, CSI-VCET organizes various technical seminars, workshops, coding competitions, 
            and project showcases every year. The chapter serves as a platform for students to enhance their 
            programming abilities and stay updated with the latest technological trends.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {['Coding Culture', 'Technical Seminars', 'Workshops', 'Competitions', 'Project Showcases'].map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full bg-[#eff6ff] text-[#0056b3] text-xs font-bold border border-[#0056b3]/20">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 flex justify-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#ffb100]/20 to-[#0056b3]/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
            <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-slate-100 flex flex-col items-center gap-4">
              <div className="w-40 h-40 rounded-xl bg-gradient-to-br from-[#1a2b4b] to-[#0056b3] flex items-center justify-center text-white">
                <Code className="w-16 h-16" />
              </div>
              <div className="text-center">
                <p className="text-[11px] font-black text-[#1a2b4b] tracking-[0.25em] uppercase">Coding Excellence</p>
                <p className="text-[11px] text-[#94a3b8] mt-0.5">Since 2003</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vision & Mission cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            icon: Code,
            title: 'Our Vision',
            text: 'To be the premier student chapter fostering a vibrant coding culture and producing technically proficient computer professionals who contribute to the advancement of technology.',
            color: '#0056b3',
            bg: '#eff6ff',
          },
          {
            icon: Cpu,
            title: 'Our Mission',
            text: 'To promote technical excellence through coding competitions, workshops, and seminars while providing students with opportunities to develop their programming and problem-solving skills.',
            color: '#b45309',
            bg: '#fffbeb',
          },
        ].map((card, i) => (
          <div key={i} className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-400 hover:-translate-y-1">
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ background: `linear-gradient(90deg, ${card.color}, ${card.color}80)` }}
            />
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
              style={{ background: card.bg }}
            >
              <card.icon className="w-5 h-5" style={{ color: card.color }} />
            </div>
            <h4 className="text-lg font-extrabold text-[#1a2b4b] mb-3">{card.title}</h4>
            <p className="text-[#64748b] text-sm leading-relaxed">{card.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   GALLERY PANEL
───────────────────────────────────────────── */
const GalleryPanel: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);

  /* 
  ADMIN EDIT: GALLERY IMAGES
  Replace placeholders with actual image URLs from admin panel
  Format: { label: 'Event Name', imageUrl: '/path/to/image.jpg' }
  */
  const placeholders = [
    { label: 'Coding Competition 2024', imageUrl: null },
    { label: 'Technical Workshop', imageUrl: null },
    { label: 'Project Showcase', imageUrl: null },
    { label: 'Seminar Session', imageUrl: null },
    { label: 'Hackathon Event', imageUrl: null },
    { label: 'Award Ceremony', imageUrl: null },
  ];

  return (
    <div ref={ref} className={`p-8 lg:p-12 space-y-8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <SectionHeading title="Gallery" subtitle="Moments from our events and activities" />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {placeholders.map((item, i) => (
          <div
            key={i}
            className={`group relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${
              i % 2 === 0
                ? 'from-[#1a2b4b]/5 to-[#0056b3]/10 border-2 border-dashed border-[#0056b3]/20'
                : 'from-[#ffb100]/5 to-[#ffb100]/15 border-2 border-dashed border-[#ffb100]/30'
            } flex flex-col items-center justify-center gap-2 hover:border-solid hover:shadow-md transition-all duration-300 cursor-pointer`}
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            {/* 
              ADMIN EDIT: IMAGE DISPLAY
              When imageUrl is available, replace the div below with:
              <img src={item.imageUrl} alt={item.label} className="w-full h-full object-cover" />
            */}
            <div className="w-10 h-10 bg-white/60 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <ImageIcon className="w-4 h-4 text-[#1a2b4b]/40" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#1a2b4b]/40 text-center px-2">{item.label}</p>
          </div>
        ))}
      </div>

      
    </div>
  );
};

/* ─────────────────────────────────────────────
   TEAM PANEL (FACULTY)
───────────────────────────────────────────── */
const TeamPanel: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);

  return (
    <div ref={ref} className={`p-8 lg:p-12 space-y-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <SectionHeading title="Faculty Team" subtitle="Meet our dedicated faculty coordinators" />

      {/* Three Faculty Cards - Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {facultyTeam.map((faculty, i) => (
          <div 
            key={faculty.id}
            className="group relative bg-white rounded-3xl border border-slate-100 shadow-lg p-8 text-center hover:shadow-xl transition-all duration-400 overflow-hidden"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            {/* Background accent */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#1a2b4b]/5 to-transparent" />

            {/* 
              ADMIN EDIT: FACULTY IMAGE
              When image is available, replace the initials div below with:
              <img src={faculty.imageUrl} alt={faculty.name} className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg" />
            */}
            <div className="relative mx-auto w-28 h-28 mb-5">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#1a2b4b] to-[#0056b3] flex items-center justify-center text-white font-black text-2xl border-4 border-white shadow-lg">
                {faculty.initials}
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#ffb100] rounded-full flex items-center justify-center">
                <Trophy className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <h4 className="text-lg font-extrabold text-[#1a2b4b] mb-1">{faculty.name}</h4>
            <p className="text-xs font-bold text-[#ffb100] uppercase tracking-widest mb-4">{faculty.department}</p>

            <div className="space-y-2.5">
              <a
                href={`mailto:${faculty.email}`}
                className="flex items-center gap-3 text-sm text-[#64748b] hover:text-[#1a2b4b] justify-center group/link"
              >
                <div className="w-7 h-7 rounded-full bg-[#eff6ff] flex items-center justify-center flex-shrink-0 group-hover/link:bg-[#0056b3] transition-colors">
                  <Mail className="w-3.5 h-3.5 text-[#0056b3] group-hover/link:text-white transition-colors" />
                </div>
                <span className="truncate max-w-[180px]">{faculty.email}</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-[#64748b] justify-center">
                <div className="w-7 h-7 rounded-full bg-[#fffbeb] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-3.5 h-3.5 text-[#ffb100]" />
                </div>
                {faculty.phone}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   STUDENT DETAILS PANEL
───────────────────────────────────────────── */
const StudentDetailsPanel: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);

  return (
    <div ref={ref} className={`p-8 lg:p-12 space-y-8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <SectionHeading title="CSI Committee (2025-26)" subtitle="Student body leading the chapter" />

      <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          {/* 
            ADMIN EDIT: STUDENT COMMITTEE TABLE
            To modify content, edit the studentCommittee array at the top of this file.
            Table displays: Position, Name, Department
          */}
          <table className="w-full text-left border-collapse min-w-[560px]">
            <thead>
              <tr className="bg-[#1a2b4b]">
                <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-[#ffb100]">Position</th>
                <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-[#ffb100]">Name</th>
                <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-[#ffb100]">Department</th>
              </tr>
            </thead>
            <tbody>
              {studentCommittee.map((m, i) => (
                <tr
                  key={i}
                  className={`border-b border-slate-100 hover:bg-[#eff6ff]/60 transition-colors duration-200 ${
                    m.isLeader ? 'bg-[#fffbeb]/60' : 'bg-white'
                  }`}
                >
                  <td className="px-6 py-3.5">
                    <span className={`text-sm font-bold ${m.isLeader ? 'text-[#b45309]' : 'text-[#1a2b4b]'}`}>
                      {m.position}
                    </span>
                    {m.isLeader && (
                      <span className="ml-2 inline-block px-1.5 py-0.5 rounded bg-[#ffb100]/20 text-[#b45309] text-[9px] font-black uppercase tracking-wider">
                        Lead
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-3.5 text-sm font-semibold text-[#334155]">{m.name}</td>
                  <td className="px-6 py-3.5">
                    <span className="text-xs font-bold text-[#64748b] bg-slate-100 px-2.5 py-1 rounded-full">{m.dept}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    
    </div>
  );
};

/* ─────────────────────────────────────────────
   STATS BANNER
───────────────────────────────────────────── */
const StatsBanner: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, 0.2);

  const stats = [
    { icon: Users,    value: 200, suffix: '+', label: 'Student Members', delay: 0   },
    { icon: Award,    value: 20,  suffix: '+', label: 'Events Per Year', delay: 100 },
    { icon: Code,     value: 50,  suffix: '+', label: 'Coding Competitions', delay: 200 },
    { icon: Monitor,  value: 20,  suffix: '+', label: 'Years of Legacy',   delay: 300 },
  ];

  return (
    <div
      ref={ref}
      className="relative bg-[#1a2b4b] py-16 px-6 overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)',
        backgroundSize: '32px 32px',
      }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ffb100]/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ffb100]/30 to-transparent" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <p className="text-center text-xs font-black uppercase tracking-[0.3em] text-[#ffb100] mb-8">CSI VCET By The Numbers</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <StatCard key={i} {...s} inView={inView} />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const CSI: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('objective');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabChange = (id: TabId) => {
    setActiveTab(id);
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        document.getElementById('csi-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  };

  return (
    <PageLayout>
      <PageBanner
        title="CSI Student Chapter"
        subtitle="Computer Society of India - Promoting coding culture and technical excellence since 2003"
        breadcrumbs={[
          { label: 'Student & Career', href: '#' },
          { label: 'CSI' },
        ]}
      />

      {/* Stats Banner */}
      <StatsBanner />

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-[#f8fafc]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-10">

            {/* Sidebar Nav */}
            <aside className="lg:col-span-1">
              <div className="sticky top-28 space-y-4">
                {/* Tab navigation */}
                <nav className="bg-white border border-slate-200 shadow-sm overflow-hidden">
                  <div className="px-5 py-4 border-b border-slate-100 bg-[#1a2b4b]/3">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#1a2b4b]/50">Navigation</p>
                  </div>
                  <div className="p-2 space-y-1">
                    {tabs.map((tab) => {
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => handleTabChange(tab.id)}
                          className={`w-full text-left flex items-center gap-3.5 px-4 py-3.5 transition-all duration-250 group relative ${
                            isActive
                              ? 'bg-[#1a2b4b] text-white shadow-md'
                              : 'text-[#475569] hover:bg-slate-50 hover:text-[#1a2b4b]'
                          }`}
                        >
                          {isActive && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-7 w-1 bg-[#ffb100]" />
                          )}

                          <div className={`w-9 h-9 flex items-center justify-center flex-shrink-0 transition-colors ${
                            isActive ? 'bg-white/10' : 'bg-slate-100 group-hover:bg-[#1a2b4b]/8'
                          }`}>
                            <tab.icon className={`w-4 h-4 ${isActive ? 'text-[#ffb100]' : 'text-[#64748b]'}`} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className={`text-[13px] font-bold leading-tight ${isActive ? 'text-white' : 'text-[#1a2b4b]'}`}>
                              {tab.label}
                            </p>
                            <p className={`text-[10px] mt-0.5 ${isActive ? 'text-white/50' : 'text-[#94a3b8]'}`}>
                              {tab.desc}
                            </p>
                          </div>

                          <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 transition-all ${
                            isActive ? 'text-[#ffb100] translate-x-0.5' : 'text-slate-300 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                          }`} />
                        </button>
                      );
                    })}
                  </div>
                </nav>

                {/* CSI Quick Facts card */}
                <div className="hidden lg:block bg-gradient-to-br from-[#1a2b4b] to-[#0056b3] p-6 text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -mr-10 -mt-10" />
                  <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-[#ffb100]/10 -ml-6 -mb-6" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-8 h-8 bg-[#ffb100] rounded-lg flex items-center justify-center">
                        <Code className="w-4 h-4 text-[#1a2b4b]" />
                      </div>
                      <h5 className="text-sm font-extrabold text-[#ffb100]">CSI Highlights</h5>
                    </div>

                    <div className="space-y-4">
                      {[
                        { icon: Users,  val: '200+', label: 'Members' },
                        { icon: Award,  val: '20+',  label: 'Events / Year' },
                        { icon: Code,   val: '2003', label: 'Established' },
                      ].map(({ icon: Icon, val, label }) => (
                        <div key={label} className="flex items-center gap-3">
                          <Icon className="w-3.5 h-3.5 text-[#ffb100]/80 flex-shrink-0" />
                          <div>
                            <p className="text-base font-extrabold leading-none">{val}</p>
                            <p className="text-[9px] uppercase font-black tracking-widest text-white/40">{label}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 pt-5 border-t border-white/10">
                      <p className="text-[10px] text-white/40 leading-relaxed">
                        First & largest body of<br />computer professionals.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Content Panel */}
            <div
              id="csi-content"
              className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_30px_-8px_rgba(0,0,0,0.06)] overflow-hidden min-h-[700px]"
            >
              {activeTab === 'objective'      && <ObjectivePanel />}
              {activeTab === 'gallery'        && <GalleryPanel />}
              {activeTab === 'team'           && <TeamPanel />}
              {activeTab === 'studentdetails' && <StudentDetailsPanel />}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CSI;