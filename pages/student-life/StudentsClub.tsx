import React, { useState, useRef, useEffect } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { 
  Users, Rocket, Code, Lightbulb, Globe, Wrench, Camera, Music, Award, 
  Info, Image as ImageIcon, Users2, Mail, Phone, ChevronRight, Eye, Target, Zap, Cpu, Trophy 
} from 'lucide-react';
import { resolveUploadedAssetUrl } from '../../utils/uploadedAssets';

/* ─────────────────────────────────────────────
   TYPES & DATA
───────────────────────────────────────────── */
type TabId = 'about' | 'gallery' | 'team';

const tabs: { id: TabId; label: string; icon: any; desc: string }[] = [
  { id: 'about', label: 'About SAE', icon: Info, desc: 'Our story & mission' },
  { id: 'gallery', label: 'Gallery', icon: ImageIcon, desc: 'Moments captured' },
  { id: 'team', label: 'Team', icon: Users2, desc: 'Meet the committee' },
];

const teamMembers = [
  { position: 'Chairperson', dept: 'BE-EXTC', name: 'Mr. Shikhar Mehta', isLeader: true },
  { position: 'Vice Chairperson', dept: 'TE-AI&DS', name: 'Omkar Bhikle', isLeader: true },
  { position: 'Secretary', dept: 'BE-EXTC', name: 'Pinanshu Surve', isLeader: false },
  { position: 'Deputy Secretary', dept: 'TE-AI&DS', name: 'Aditya Biradar', isLeader: false },
  { position: 'Treasurer', dept: 'BE-EXTC', name: 'Nilesh Jangid', isLeader: false },
  { position: 'Deputy Treasurer', dept: 'TE-AI&DS', name: 'Yash Biranje', isLeader: false },
  { position: 'Managing Head', dept: 'BE-EXTC', name: 'Sarvesh Sant', isLeader: false },
  { position: 'Deputy Managing Head', dept: 'TE-EXTC', name: 'Dhruv Sharma', isLeader: false },
  { position: 'Committee Coordinator', dept: 'BE-EXTC', name: 'Achintya Nagar', isLeader: false },
  { position: 'Deputy Committee Coordinator', dept: 'TE-AI&DS', name: 'Aaditya Bobade', isLeader: false },
  { position: 'Technical Head', dept: 'BE-EXTC', name: 'Saurabh Chavan', isLeader: false },
  { position: 'Deputy Technical Head', dept: 'TE-EXTC', name: 'Sahil Gorivale', isLeader: false },
  { position: 'Technical Advisor', dept: 'TE-EXTC', name: 'Sachin Chaudhary', isLeader: false },
  { position: 'Publicity Head', dept: 'BE-EXTC', name: 'Aditi Bhat', isLeader: false },
  { position: 'Deputy Publicity Head', dept: 'TE-EXTC', name: 'Hemant Jena', isLeader: false },
  { position: 'Deputy Creative Head', dept: 'TE-EXTC', name: 'Sanket Das', isLeader: false },
];

const highlights = [
  {
    title: 'Individually Driven Society',
    description: 'SAEIndia membership is owned by individuals from industry, academia, and students, making the club truly student-centered.',
  },
  {
    title: 'Strategic SAE Partner',
    description: 'VCET is associated with SAE India and SAE International, advancing the mobility industry through a non-profit engineering society.',
  },
  {
    title: 'Active National Participation',
    description: 'Teams from VCET participate in national-level competitions, boosting institutional visibility and experiential engineering education.',
  },
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
    <h2 className="text-3xl md:text-4xl font-extrabold text-[#082b64] mb-3 tracking-tight">{title}</h2>
    {subtitle && <p className="text-[#475569] text-base mb-4">{subtitle}</p>}
    <div className="flex gap-1.5 items-center">
      <div className="h-1 w-10 bg-[#ffb100] rounded-full" />
      <div className="h-1 w-6 bg-[#082b64] rounded-full" />
      <div className="h-1 w-3 bg-[#082b64]/30 rounded-full" />
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
      <SectionHeading title="About SAE" subtitle="Society of Automotive Engineers" />

      {/* Hero text + QR */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
        <div className="lg:col-span-3 space-y-5 text-[#475569] leading-relaxed text-[15px]">
          <p>
            SAEINDIA – SAE International is the global leader in technical learning for the mobility industry, whereas SAEINDIA is India’s leading resource for mobility technology. As an individual member-driven society of mobility practitioners, the ownership of SAEINDIA rests with its members who are individuals from the mobility community, including Engineers, Executives from Industry, Academics and Students.
          </p>
          <p>
            The Mechanical Engineering Department of VCET is associated with SAEINDIA from long time. The department has renewed its registration once again in the year 2019-20. The committee of SAE INDIA COLLEGIATE CLUB OF VCET with registration no. SAEICC WIS234 in the month of Sept 2019. Various teams like Team ETHAN, Team SOLECTHON, Team CENTURION, Team AIRNOVA, and Team EMECHTO participate in national level events under the umbrella of SAE-VCET committee.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {['Team ETHAN', 'Team SOLECTHON', 'Team CENTURION', 'Team AIRNOVA', 'Team EMECHTO', 'Mobility', 'Design'].map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full bg-[#eaf3ff] text-[#082b64] text-xs font-bold border border-[#082b64]/20">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 flex justify-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#ffb100]/20 to-[#0056b3]/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
            <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-slate-100 flex flex-col items-center gap-4">
              <img
                src={resolveUploadedAssetUrl('https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://www.instagram.com/sae_vcet') ?? 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://www.instagram.com/sae_vcet'}
                alt="Scan to follow SAE VCET on Instagram"
                className="w-40 h-40 rounded-xl"
              />
              <div className="text-center">
                <p className="text-[11px] font-black text-[#1a2b4b] tracking-[0.25em] uppercase">Scan to Follow</p>
                <p className="text-[11px] text-[#94a3b8] mt-0.5">@sae_vcet</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vision & Mission cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            icon: Eye,
            title: 'Our Vision',
            text: 'To be the premier technical student branch, recognized for empowering students to create a better future through technological leadership and ethical innovation.',
            color: '#0056b3',
            bg: '#eff6ff',
          },
          {
            icon: Target,
            title: 'Our Mission',
            text: 'To provide a platform for students to develop professional and technical competencies, fostering a culture of continuous learning and social responsibility.',
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
  
    const placeholders = [
      { label: 'Anveshan 2024' },
      { label: 'VNPS 2024' },
      { label: 'Oscillations' },
      { label: 'Think Aloud' },
      { label: 'STEM Workshop' },
      { label: 'Industrial Visit' },
    ];
  
    return (
      <div ref={ref} className={`p-8 lg:p-12 space-y-8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <SectionHeading title="Gallery" subtitle="Moments from our events and activities" />
  
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {placeholders.map((item, i) => (
            <div
              key={i}
              className={`group relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${i % 2 === 0
                  ? 'from-[#1a2b4b]/5 to-[#0056b3]/10 border-2 border-dashed border-[#0056b3]/20'
                  : 'from-[#ffb100]/5 to-[#ffb100]/15 border-2 border-dashed border-[#ffb100]/30'
                } flex flex-col items-center justify-center gap-2 hover:border-solid hover:shadow-md transition-all duration-300 cursor-pointer`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
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
   TEAM PANEL
───────────────────────────────────────────── */
const TeamPanel: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);

  return (
    <div ref={ref} className={`p-8 lg:p-12 space-y-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

      {/* Incharge */}
      <div>
        <SectionHeading title="Incharge" />
        <div className="flex justify-center">
          <div className="group relative bg-white rounded-3xl border border-slate-100 shadow-lg p-8 text-center max-w-sm w-full hover:shadow-xl transition-all duration-400 overflow-hidden">
            {/* Background accent */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#082b64]/10 to-transparent" />

            {/* Avatar with stronger image holder */}
            <div className="relative mx-auto w-32 aspect-square mb-6 rounded-full bg-gradient-to-br from-[#eaf3ff] to-[#cde5ff] p-1 shadow-xl">
              <div className="relative w-full h-full rounded-full border-4 border-white bg-slate-100">
                <img
                  src={resolveUploadedAssetUrl('https://vcet.edu.in/public/images/Team/Dipak-Choudhari.jpg') ?? 'https://vcet.edu.in/public/images/Team/Dipak-Choudhari.jpg'}
                  alt="Mr. Dipak Choudhari"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#ffb100] rounded-full flex items-center justify-center border-2 border-white">
                <Award className="w-4 h-4 text-white" />
              </div>
            </div>

            <h4 className="text-xl font-extrabold text-[#082b64] mb-1">Mr. Dipak Choudhari</h4>
            <p className="text-xs font-bold text-[#ffb100] uppercase tracking-widest mb-4">SAE Incharge</p>

            <div className="space-y-2.5">
              <a
                href="mailto:dipak.choudhari@vcet.edu.in"
                className="flex items-center gap-3 text-sm text-[#475569] hover:text-[#082b64] justify-center"
              >
                <div className="w-7 h-7 rounded-full bg-[#eaf3ff] flex items-center justify-center flex-shrink-0 hover:bg-[#082b64] transition-colors">
                  <Mail className="w-3.5 h-3.5 text-[#082b64] hover:text-white" />
                </div>
                dipak.choudhari@vcet.edu.in
              </a>
              <div className="flex items-center gap-3 text-sm text-[#475569] justify-center">
                <div className="w-7 h-7 rounded-full bg-[#fff8e7] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-3.5 h-3.5 text-[#ffb100]" />
                </div>
                9960453845
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Faculty Team */}
      <div>
        <SectionHeading title="Faculty Advisors" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {/* List of faculty if needed */}
        </div>
      </div>

      {/* Student Committee */}
      <div>
        <SectionHeading title="Student Committee" subtitle="SAE India Collegiate Club of VCET 2024-25" />
        <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#1a2b4b] text-white">
              <tr>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px]">Position</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px]">Name</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px]">Department</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {teamMembers.map((m, i) => (
                <tr key={i} className={`hover:bg-slate-50 transition-colors ${m.isLeader ? 'bg-slate-50/50' : ''}`}>
                  <td className={`px-6 py-4 font-bold ${m.isLeader ? 'text-[#082b64]' : 'text-slate-600'}`}>
                    {m.position}
                    {m.isLeader && <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[9px] bg-[#ffb100]/20 text-[#b45309]">CORE</span>}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-800">{m.name}</td>
                  <td className="px-6 py-4 text-slate-500 font-medium">{m.dept}</td>
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
    { icon: Users, value: 150, suffix: '+', label: 'Student Members', delay: 0 },
    { icon: Award, value: 20, suffix: '+', label: 'Events Per Year', delay: 100 },
    { icon: Zap, value: 50, suffix: '+', label: 'Papers Presented', delay: 200 },
    { icon: Cpu, value: 10, suffix: '+', label: 'Years of Legacy', delay: 300 },
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
        <p className="text-center text-xs font-black uppercase tracking-[0.3em] text-[#ffb100] mb-8">SAE VCET By The Numbers</p>
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
const StudentsClub: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabId>('about');

    const handleTabChange = (id: TabId) => {
      setActiveTab(id);
      document.getElementById('sae-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

  return (
    <PageLayout>
      <PageBanner
        title="SAE India Collegiate Club"
        breadcrumbs={[
          { label: 'Students Club' },
          { label: 'SAE' },
        ]}
      />

      {/* Overview */}
      <section className="py-8 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-10">

            {/* Sidebar Nav */}
            <aside className="lg:col-span-1">
              <div className="sticky top-28 space-y-4">
                {/* Tab navigation */}
                <nav className="bg-white border border-slate-200 shadow-sm overflow-hidden rounded-2xl">
                  {/* Nav header */}
                  <div className="px-5 py-4 border-b border-slate-100 bg-[#1a2b4b]/5">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#1a2b4b]/50">Navigation</p>
                  </div>
                  {/* Nav items */}
                  <div className="p-2 space-y-1">
                    {tabs.map((tab) => {
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => handleTabChange(tab.id)}
                          className={`w-full text-left flex items-center gap-3.5 px-4 py-3.5 transition-all duration-250 group relative rounded-xl ${isActive
                              ? 'bg-[#1a2b4b] text-white shadow-md'
                              : 'text-[#475569] hover:bg-slate-50 hover:text-[#1a2b4b]'
                            }`}
                        >
                          {/* Active indicator */}
                          {isActive && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-7 w-1 bg-[#ffb100] rounded-full" />
                          )}

                          {/* Icon */}
                          <div className={`w-9 h-9 flex items-center justify-center flex-shrink-0 rounded-lg transition-colors ${isActive ? 'bg-white/10' : 'bg-slate-100 group-hover:bg-[#1a2b4b]/8'
                            }`}>
                            <tab.icon className={`w-4 h-4 ${isActive ? 'text-[#ffb100]' : 'text-[#64748b]'}`} />
                          </div>

                          {/* Label + description */}
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

                {/* SAE Highlights card */}
                <div className="hidden lg:block bg-gradient-to-br from-[#1a2b4b] to-[#0056b3] p-6 text-white overflow-hidden relative rounded-2xl shadow-lg border border-[#0056b3]/20">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -mr-10 -mt-10" />
                  <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-[#ffb100]/10 -ml-6 -mb-6" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-8 h-8 bg-[#ffb100] rounded-lg flex items-center justify-center">
                        <Zap className="w-4 h-4 text-[#1a2b4b]" />
                      </div>
                      <h5 className="text-sm font-extrabold text-[#ffb100]">SAE Highlights</h5>
                    </div>

                    <div className="space-y-4">
                      {[
                        { icon: Users, val: '150+', label: 'Members' },
                        { icon: Award, val: '20+', label: 'Events / Year' },
                        { icon: Trophy, val: '50+', label: 'Papers' },
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
                        Advancing mobility technology<br />for a better future.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Content Panel */}
            <div
              id="sae-content"
              className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_30px_-8px_rgba(0,0,0,0.06)] overflow-hidden min-h-[700px]"
            >
              {activeTab === 'about' && <AboutPanel />}
              {activeTab === 'gallery' && <GalleryPanel />}
              {activeTab === 'team' && <TeamPanel />}
            </div>
          </div>
        </div>
      </section>

      <StatsBanner />

      {/* Activities */}
      <section className="py-8 md:py-16 lg:py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#082b64] mb-4">
              Activities & Focus
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              SAE-VCET focuses on experiential learning and national-level mobility engineering competitions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
                {
                    icon: Code,
                    title: 'Mobility Technology Learning',
                    description: 'SAE India is the global leader in technical learning for mobility; VCET students learn vehicle systems, design, and advanced transport solutions.',
                },
                {
                    icon: Wrench,
                    title: 'Engineering Competitions',
                    description: 'Engineered vehicles compete under TEAM ETHAN, TEAM SOLECTHON, TEAM CENTURION, TEAM AIRNOVA, and TEAM EMECHTO in national events.',
                },
                {
                    icon: Lightbulb,
                    title: 'Student Leadership',
                    description: 'Students drive the SAE committee with faculty guidance, fostering collaboration among mobility practitioners and academics.',
                },
            ].map((activity, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg p-8 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#ffb100]/10 transition-colors duration-300">
                  <activity.icon className="w-6 h-6 text-[#082b64] group-hover:text-[#ffb100] transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-extrabold text-[#082b64] mb-2">
                  {activity.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-8 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <SectionHeading title="SAE-VCET Highlights" subtitle="Student-driven engineering excellence, strengthened by industry-academic alignment." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="group bg-gradient-to-br from-[#1a2b4b] to-[#082b64] rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-5 h-5 text-[#ffb100]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default StudentsClub;
