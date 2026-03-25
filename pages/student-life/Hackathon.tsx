import React, { useState, useEffect, useRef } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import {
  Users,
  Award,
  Zap,
  ChevronRight,
  Info,
  Target,
  Image as ImageIcon,
  Users2,
  Lightbulb,
  CheckCircle,
  Clock,
  Trophy,
  Code,
  Globe,
  Monitor,
  Cpu,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   TYPES & DATA
───────────────────────────────────────────── */
type TabId = 'about' | 'objectives' | 'outcomes' | 'faculty' | 'team' | 'gallery';

const tabs: { id: TabId; label: string; icon: any; desc: string }[] = [
  { id: 'about', label: 'About', icon: Info, desc: 'Overview & details' },
  { id: 'objectives', label: 'Objectives', icon: Target, desc: 'Goals & aims' },
  { id: 'outcomes', label: 'Outcomes', icon: Lightbulb, desc: 'Learning outcomes' },
  { id: 'faculty', label: 'Faculty', icon: Users, desc: 'Staff coordinators' },
  { id: 'team', label: 'Team', icon: Users2, desc: 'Hackathon committee' },
  { id: 'gallery', label: 'Gallery', icon: ImageIcon, desc: 'Event highlights' },
];

/* 
ADMIN EDIT: FACULTY TABLE DATA
Modify this array to update the faculty coordinators list.
Add, remove, or edit objects below to change table content.
*/
const facultyData = [
  { srNo: 1, name: 'Dr. Thaksen Parvat (HOD)' },
  { srNo: 2, name: 'Dr. Archana Ekbote (Coordinator)' },
  { srNo: 3, name: 'Dr. Sainath Patil' },
  { srNo: 4, name: 'Mr. Chandan Kolvankar' },
  { srNo: 5, name: 'Dr. Madhavi Waghmare' },
  { srNo: 6, name: 'Dr. Vaishali Shirsath' },
  { srNo: 7, name: 'Dr. Anagha Patil' },
  { srNo: 8, name: 'Ms. Pragati Patil' },
  { srNo: 9, name: 'Ms. Snehal Mhatre' },
  { srNo: 10, name: 'Mr. Nitin Shingane' },
  { srNo: 11, name: 'Mr. Amol Patil' },
  { srNo: 12, name: 'Ms. Komal Shringarpure' },
  { srNo: 13, name: 'Mr. Nilesh Patil' },
  { srNo: 14, name: 'Mr. Kalpak Patil' },
  { srNo: 15, name: 'Mr. Vinit Ambat' },
];

/* 
ADMIN EDIT: TEAM TABLE DATA
Modify this array to update the Hackathon Team members.
For multiple members with same post, add all names in the names array.
*/
const teamData = [
  { post: 'Hackathon Head', names: ['Siddhi Kolwankar'] },
  { post: 'Joint Hackathon Head', names: ['Shreya Parchurkar'] },
  { post: 'Treasurer', names: ['Vatsal Shah'] },
  { post: 'Secretary', names: ['Vinish Nagzarkar'] },
  { post: 'Joint Secretary', names: ['Pallavi Thakur'] },
  { post: 'Organizing Head', names: ['Harsh Sawant', 'Abhishek Hatuii', 'Shlok Shetty', 'Devyani Bhakare', 'Ruchi Gharat', 'Aditi Khambe', 'Mayank Mahajan'] },
  { post: 'Technical Head', names: ['Abhishek Jani', 'Himadri Manna', 'Aditya Trivedi', 'Pratyush Lokhande', 'Tanishka Wani'] },
  { post: 'Web Consultant Head', names: ['Pradip Pall', 'Rishabh Naharl', 'Raj Srivastav'] },
  { post: 'Sponsorship Head', names: ['Harsh Churi', 'Rakesh Zore'] },
  { post: 'PR and Publicity Head', names: ['Tanmay Arsania', 'Anish Mohite', 'Aashlesha Rajput', 'Vedant Lad'] },
];

const objectivesList = [
  'To Orient Students Towards Building A Team.',
  'To Orient Students Towards Innovative Thinking.',
  'To Expose Students to Professional Business Applications.',
  'To Drive Students Towards Tireless Pursuit of Problem-Solution.',
];

const outcomesList = [
  'Analyze the functional requirements of the given problem statement',
  'Design a cost-effective solution and deploy the same',
  'Analyze the business value of the application',
  'Provide innovative and progressive solutions',
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
   ABOUT PANEL
───────────────────────────────────────────── */
const AboutPanel: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  return (
    <div ref={ref} className={`space-y-12 p-8 lg:p-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <SectionHeading title="About VCET Hackathon" subtitle="National Level Inter-Collegiate Coding Competition" />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
        <div className="lg:col-span-3 space-y-5 text-[#475569] leading-relaxed text-[15px]">
          <p>
            VCET-Hackathon is an inter-collegiate national level coding competition which involves
            <span className="font-bold text-[#0056b3]"> 30 hours</span> of incessant coding followed by the pitching round.
            Participants have to come up with working prototypes/solutions to address worthy and challenging problems
            within these 30 hours, after which the projects are judged by a panel of industry experts.
          </p>
          <p>
            There is continuous monitoring of the projects by jury members throughout the event. Several jury rounds
            are conducted during these 30 hours. Experts from top companies like
            <span className="font-semibold text-[#1a2b4b]"> Google, AWS, TCS</span>, etc. are invited to the judging panel
            who validate the projects and solutions of the participants. There has been a remarkable growth in the
            number of teams participating in the hackathon over the years.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {['30-Hour Coding', 'National Level', 'Industry Experts', 'Innovation', 'Problem Solving'].map((tag) => (
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
                <p className="text-[11px] font-black text-[#1a2b4b] tracking-[0.25em] uppercase">Code. Build. Innovate.</p>
                <p className="text-[11px] text-[#94a3b8] mt-0.5">30 Hours Non-Stop</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   OBJECTIVES PANEL
───────────────────────────────────────────── */
const ObjectivesPanel: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  return (
    <div ref={ref} className={`p-8 lg:p-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <SectionHeading title="Objectives" subtitle="Goals that drive the Hackathon spirit" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {objectivesList.map((objective, i) => (
          <div
            key={i}
            className="group bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-start gap-4"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div className="w-12 h-12 rounded-xl bg-[#0056b3]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0056b3] transition-colors duration-300">
              <Target className="w-5 h-5 text-[#0056b3] group-hover:text-white transition-colors" />
            </div>
            <p className="text-[#475569] text-sm leading-relaxed pt-2.5 font-medium">{objective}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   OUTCOMES PANEL
───────────────────────────────────────────── */
const OutcomesPanel: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  return (
    <div ref={ref} className={`p-8 lg:p-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <SectionHeading title="Outcomes" subtitle="Students will be able to" />

      <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {outcomesList.map((outcome, i) => (
            <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-full bg-[#ffb100]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle className="w-4 h-4 text-[#ffb100]" />
              </div>
              <p className="text-[#475569] text-sm leading-relaxed">{outcome}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 p-6 bg-[#1a2b4b] rounded-2xl text-white">
        <div className="flex items-center gap-3 mb-3">
          <Zap className="w-5 h-5 text-[#ffb100]" />
          <h4 className="font-bold text-lg">Key Takeaway</h4>
        </div>
        <p className="text-white/80 text-sm leading-relaxed">
          Participants emerge with enhanced problem-solving abilities, technical proficiency,
          business acumen, and the ability to work effectively under pressure in diverse teams.
        </p>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   FACULTY PANEL
───────────────────────────────────────────── */
const FacultyPanel: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);

  return (
    <div ref={ref} className={`p-8 lg:p-12 space-y-8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <SectionHeading title="Faculty Coordinators" subtitle="Staff members guiding the Hackathon" />

      <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          {/* 
            ADMIN EDIT: FACULTY TABLE STRUCTURE
            To modify content, edit the facultyData array at the top of this file.
            Do not modify the table structure below unless changing layout.
          */}
          <table className="w-full text-left border-collapse min-w-[400px]">
            <thead>
              <tr className="bg-[#1a2b4b]">
                <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-[#ffb100] w-24">Sr.No</th>
                <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-[#ffb100]">Name</th>
              </tr>
            </thead>
            <tbody>
              {facultyData.map((faculty, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-[#eff6ff]/60 transition-colors duration-200 bg-white">
                  <td className="px-6 py-3.5 text-sm font-bold text-[#94a3b8]">{faculty.srNo}</td>
                  <td className="px-6 py-3.5 text-sm font-semibold text-[#334155]">{faculty.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-[#94a3b8] text-center">
        * Faculty list can be updated by modifying the facultyData array in the source code
      </p>
    </div>
  );
};

/* ─────────────────────────────────────────────
   TEAM PANEL
───────────────────────────────────────────── */
const TeamPanel: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);

  return (
    <div ref={ref} className={`p-8 lg:p-12 space-y-8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <SectionHeading title="Team Hackathon'25" subtitle="B.E Recruit - Core Committee" />

      <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          {/* 
            ADMIN EDIT: TEAM TABLE STRUCTURE
            To modify content, edit the teamData array at the top of this file.
            The names array can hold multiple members for the same post.
          */}
          <table className="w-full text-left border-collapse min-w-[560px]">
            <thead>
              <tr className="bg-[#1a2b4b]">
                <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-[#ffb100] w-1/3">Post</th>
                <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-[#ffb100]">Name(s)</th>
              </tr>
            </thead>
            <tbody>
              {teamData.map((member, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-[#eff6ff]/60 transition-colors duration-200 bg-white">
                  <td className="px-6 py-3.5 text-sm font-bold text-[#1a2b4b] align-top">{member.post}</td>
                  <td className="px-6 py-3.5">
                    <div className="flex flex-wrap gap-2">
                      {member.names.map((name, idx) => (
                        <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-[#475569] text-xs font-semibold border border-slate-200">
                          {name}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-[#94a3b8] text-center">
        * Team list can be updated by modifying the teamData array in the source code
      </p>
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
  Currently set to 12 placeholders. To add actual images:
  1. Replace the placeholders array with image URLs
  2. Update the img src in the map function below
  3. Or replace placeholder divs with actual <img> tags
  */
  const placeholders = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    label: `Hackathon Moment ${i + 1}`,
    // Example: url: '/images/hackathon/pic1.jpg'
  }));

  return (
    <div ref={ref} className={`p-8 lg:p-12 space-y-8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <SectionHeading title="Gallery" subtitle="Glimpses from previous Hackathons" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {placeholders.map((item, i) => (
          <div
            key={item.id}
            className={`group relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br ${i % 2 === 0
                ? 'from-[#1a2b4b]/5 to-[#0056b3]/10 border-2 border-dashed border-[#0056b3]/20'
                : 'from-[#ffb100]/5 to-[#ffb100]/15 border-2 border-dashed border-[#ffb100]/30'
              } flex flex-col items-center justify-center gap-2 hover:border-solid hover:shadow-lg transition-all duration-300 cursor-pointer`}
            style={{ transitionDelay: `${i * 50}ms` }}
          >
            {/* 
              ADMIN EDIT: IMAGE PLACEHOLDER
              Replace this div with <img src="your-image-url" alt="..." className="w-full h-full object-cover" />
            */}
            <div className="w-12 h-12 bg-white/60 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <ImageIcon className="w-5 h-5 text-[#1a2b4b]/40" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#1a2b4b]/40 text-center px-2">{item.label}</p>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-[#94a3b8]">
        📸 Images can be added by replacing placeholders in the GalleryPanel component
      </p>
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
    { icon: Clock, value: 30, suffix: 'hrs', label: 'Non-Stop Coding', delay: 0 },
    { icon: Globe, value: 100, suffix: '+', label: 'Participating Teams', delay: 100 },
    { icon: Trophy, value: 50, suffix: '+', label: 'Projects Built', delay: 200 },
    { icon: Monitor, value: 20, suffix: '+', label: 'Industry Experts', delay: 300 },
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
        <p className="text-center text-xs font-black uppercase tracking-[0.3em] text-[#ffb100] mb-8">VCET Hackathon By The Numbers</p>
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
const Hackathon: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('about');

  const handleTabChange = (id: TabId) => {
    setActiveTab(id);
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        document.getElementById('hackathon-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  };

  return (
    <PageLayout>
      <PageBanner
        title="VCET Hackathon"
        subtitle="National Level Inter-Collegiate 30-Hour Coding Competition"
        breadcrumbs={[
          { label: 'Events', href: '#' },
          { label: 'Hackathon' },
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
                          className={`w-full text-left flex items-center gap-3.5 px-4 py-3.5 transition-all duration-250 group relative ${isActive
                              ? 'bg-[#1a2b4b] text-white shadow-md'
                              : 'text-[#475569] hover:bg-slate-50 hover:text-[#1a2b4b]'
                            }`}
                        >
                          {isActive && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-7 w-1 bg-[#ffb100]" />
                          )}

                          <div className={`w-9 h-9 flex items-center justify-center flex-shrink-0 transition-colors ${isActive ? 'bg-white/10' : 'bg-slate-100 group-hover:bg-[#1a2b4b]/8'
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

                          <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 transition-all ${isActive ? 'text-[#ffb100] translate-x-0.5' : 'text-slate-300 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                            }`} />
                        </button>
                      );
                    })}
                  </div>
                </nav>

                {/* Quick Facts card */}
                <div className="hidden lg:block bg-gradient-to-br from-[#1a2b4b] to-[#0056b3] p-6 text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -mr-10 -mt-10" />
                  <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-[#ffb100]/10 -ml-6 -mb-6" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-8 h-8 bg-[#ffb100] rounded-lg flex items-center justify-center">
                        <Cpu className="w-4 h-4 text-[#1a2b4b]" />
                      </div>
                      <h5 className="text-sm font-extrabold text-[#ffb100]">Hackathon Highlights</h5>
                    </div>

                    <div className="space-y-4">
                      {[
                        { icon: Clock, val: '30hrs', label: 'Coding' },
                        { icon: Users, val: '100+', label: 'Teams' },
                        { icon: Award, val: 'Top', label: 'Companies' },
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
                        Innovation through<br />intensive coding.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Content Panel */}
            <div
              id="hackathon-content"
              className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_30px_-8px_rgba(0,0,0,0.06)] overflow-hidden min-h-[700px]"
            >
              {activeTab === 'about' && <AboutPanel />}
              {activeTab === 'objectives' && <ObjectivesPanel />}
              {activeTab === 'outcomes' && <OutcomesPanel />}
              {activeTab === 'faculty' && <FacultyPanel />}
              {activeTab === 'team' && <TeamPanel />}
              {activeTab === 'gallery' && <GalleryPanel />}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Hackathon;