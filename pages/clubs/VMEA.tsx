import React, { useState, useEffect, useRef } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import {
  Users,
  Award,
  Zap,
  ChevronRight,
  Info,
  Calendar,
  Image as ImageIcon,
  Users2,
  Mail,
  Phone,
  Eye,
  Target,
  Cog,
  Wrench,
  Trophy,
  HelpCircle,
  Presentation,
  Factory,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   TYPES & DATA
───────────────────────────────────────────── */
type TabId = 'about' | 'events' | 'gallery' | 'team';

const tabs: { id: TabId; label: string; icon: any; desc: string }[] = [
  { id: 'about', label: 'About VMEA', icon: Info, desc: 'Our story & mission' },
  { id: 'events', label: 'Events', icon: Calendar, desc: 'Activities & programs' },
  { id: 'gallery', label: 'Gallery', icon: ImageIcon, desc: 'Moments captured' },
  { id: 'team', label: 'Team', icon: Users2, desc: 'Meet the committee' },
];

const teamMembers = [
  { position: 'President', name: 'Tisha Paul (BE)', isLeader: true },
  { position: 'Vice President', name: 'Aftab Dafedar (TE)', isLeader: true },
  { position: 'Secretary', name: 'Suraj Patel (BE)', isLeader: false },
  { position: 'Deputy Secretary', name: 'Harsh Madhesiya (TE)', isLeader: false },
  { position: 'Treasurer', name: 'Abhigya Hazra (BE)', isLeader: false },
  { position: 'Deputy Treasurer', name: 'Abhishek Gharat (TE)', isLeader: false },
  { position: 'Organizing Head', name: 'Atharva Vartak (BE)', isLeader: false },
  { position: 'Sponsorship Head', name: 'Dipesh Bhatt (BE)', isLeader: false },
  { position: 'Creative Head', name: 'Mitali Salve (BE)', isLeader: false },
  { position: 'Deputy Creative Head', name: 'Paresh Patil (TE)', isLeader: false },
  { position: 'Event Management Head', name: 'Vivekkumar Gaud (BE)', isLeader: false },
  { position: 'Publicity Head', name: 'Dipesh Bhatt (BE)', isLeader: false },
  { position: 'Deputy Publicity Head', name: 'Ujjwal Upadhyay (TE)', isLeader: false },
  { position: 'Technical Head', name: 'Preet Mhatre (BE)', isLeader: false },
];

const events = [
  {
    title: 'MECHEXPO',
    icon: Factory,
    accent: '#0056b3',
    tag: 'Product Showcase',
    paragraphs: [
      'MECHEXPO is an industrial product showcase started by VMEA where our volunteers approach different industries to display their products in our showcase on Engineers Day. This event was a tribute to all engineers working for the technological progress of the nation.',
      'The products brought are presented and explained by the volunteers to all the students and professors. Some of the major industries participating every year are Gemsons, Pacific Tools, and Aggarwal Fasteners.',
    ],
  },
  {
    title: 'Quizmania',
    icon: HelpCircle,
    accent: '#ffb100',
    tag: 'Quiz Competition',
    paragraphs: [
      'Quizmania is a quiz competition for all the students of Mechanical Engineering. It is a portal where students get an opportunity to display their general as well as technical knowledge, challenging their intellect in every aspect.',
      'The brilliantly designed questions by the members of VMEA escalate overall understanding and make participants globally aware, testing both technical expertise and general awareness.',
    ],
  },
  {
    title: 'VNPS',
    icon: Presentation,
    accent: '#0056b3',
    tag: 'Project Showcase',
    paragraphs: [
      'Vidyavardhini\'s National Level Project Showcase is the opportunity for students to showcase their ideas and designs through working models. These projects are carefully evaluated by judges chosen from the respective technical field.',
      'It is an event eagerly awaited by students and teachers alike and is one of the prime events of VCET. VNPS 2018 had a record entry of external participants.',
    ],
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
      <SectionHeading title="About VMEA" subtitle="Vidyavardhini's Mechanical Engineers Association" />

      {/* Hero text + QR */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
        <div className="lg:col-span-3 space-y-5 text-[#475569] leading-relaxed text-[15px]">
          <p>
            VMEA stands for Vidyavardhini's Mechanical Engineers Association. It is a committee built
            entirely on the drive of its members. It traces back its origin to the year 2000 when it
            was formed, which makes it one of the oldest and highly active technical student bodies in
            Vidyavardhini's College of Engineering and Technology.
          </p>
          <p>
            VMEA involves organizing events and competitions such as Product Showcases, Quiz Competitions,
            Project Competitions and more. VMEA along with organizing such great events also primarily
            focuses upon building core technical knowledge of the students which enables them to develop
            a technical perspective.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {['Product Showcase', 'Quiz Competitions', 'Project Expo', 'Technical Training', 'Industry Connect'].map((tag) => (
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
              <div className="w-40 h-40 rounded-xl bg-gradient-to-br from-[#1a2b4b] to-[#0056b3] flex items-center justify-center">
                <Cog className="w-20 h-20 text-[#ffb100]" />
              </div>
              <div className="text-center">
                <p className="text-[11px] font-black text-[#1a2b4b] tracking-[0.25em] uppercase">Since 2000</p>
                <p className="text-[11px] text-[#94a3b8] mt-0.5">24+ Years of Excellence</p>
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
            text: 'To be a premier technical student body fostering innovation and engineering excellence, empowering students with core technical knowledge and a holistic perspective towards mechanical engineering.',
            color: '#0056b3',
            bg: '#eff6ff',
          },
          {
            icon: Target,
            title: 'Our Mission',
            text: 'To organize impactful events, competitions, and technical sessions that build core knowledge, develop technical perspectives, and prepare students for industrial challenges in the mechanical engineering domain.',
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
   EVENT CARD
───────────────────────────────────────────── */
const EventCard: React.FC<{ event: typeof events[0]; index: number }> = ({ event, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  return (
    <div
      ref={ref}
      className={`group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl overflow-hidden transition-all duration-500 hover:-translate-y-1 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Colored top bar */}
      <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${event.accent}, ${event.accent}60)` }} />

      <div className="p-7">
        <div className="flex items-start gap-4 mb-5">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
            style={{ background: `${event.accent}15` }}
          >
            <event.icon className="w-5 h-5" style={{ color: event.accent }} />
          </div>
          <div className="flex-1 min-w-0">
            <span
              className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-2"
              style={{ background: `${event.accent}15`, color: event.accent }}
            >
              {event.tag}
            </span>
            <h4 className="text-[17px] font-extrabold text-[#1a2b4b] leading-snug">{event.title}</h4>
          </div>
        </div>

        <div className="space-y-3">
          {event.paragraphs.map((p, i) => (
            <p key={i} className="text-[#64748b] text-sm leading-relaxed">{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   EVENTS PANEL
───────────────────────────────────────────── */
const EventsPanel: React.FC = () => (
  <div className="p-8 lg:p-12 space-y-8">
    <SectionHeading title="Events & Activities" subtitle="A glimpse of what we organize every academic year" />

    {/* Image placeholders row */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
      {[1, 2].map((n) => (
        <div
          key={n}
          className="aspect-[16/9] rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 group hover:border-[#0056b3]/40 transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center group-hover:bg-[#0056b3]/10 transition-colors">
            <ImageIcon className="w-5 h-5 text-slate-400 group-hover:text-[#0056b3]" />
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Event Photo {n}</p>
        </div>
      ))}
    </div>

    {/* Event cards grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {events.map((event, i) => (
        <EventCard key={event.title} event={event} index={i} />
      ))}
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   GALLERY PANEL
───────────────────────────────────────────── */
const GalleryPanel: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);

  const placeholders = [
    { label: 'MECHEXPO 2024' },
    { label: 'Quizmania' },
    { label: 'VNPS 2024' },
    { label: 'Industrial Visit' },
    { label: 'Technical Workshop' },
    { label: 'Team Activities' },
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

      <p className="text-center text-sm text-[#94a3b8]">
        📸 Photos will be updated after each event. Stay connected with VMEA for the latest updates.
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
    <div ref={ref} className={`p-8 lg:p-12 space-y-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

      {/* In-Charge */}
      <div>
        <SectionHeading title="In-Charge" />
        <div className="flex justify-center">
          <div className="group relative bg-white rounded-3xl border border-slate-100 shadow-lg p-8 text-center max-w-sm w-full hover:shadow-xl transition-all duration-400 overflow-hidden">
            {/* Background accent */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#1a2b4b]/5 to-transparent" />

            {/* Avatar */}
            <div className="relative mx-auto w-28 h-28 mb-5">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#1a2b4b] to-[#0056b3] flex items-center justify-center text-white font-black text-2xl border-4 border-white shadow-lg">
                PV
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#ffb100] rounded-full flex items-center justify-center">
                <Award className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <h4 className="text-xl font-extrabold text-[#1a2b4b] mb-1">Ms. Priti Vairagi</h4>
            <p className="text-xs font-bold text-[#ffb100] uppercase tracking-widest mb-1">In-Charge</p>
            <p className="text-xs text-[#94a3b8] mb-4">Mechanical Engineering Department</p>

            <div className="space-y-2.5">
              <a
                href="mailto:priti.vairagi@vcet.edu.in"
                className="flex items-center gap-3 text-sm text-[#64748b] hover:text-[#1a2b4b] justify-center group/link"
              >
                <div className="w-7 h-7 rounded-full bg-[#eff6ff] flex items-center justify-center flex-shrink-0 group-hover/link:bg-[#0056b3] transition-colors">
                  <Mail className="w-3.5 h-3.5 text-[#0056b3] group-hover/link:text-white transition-colors" />
                </div>
                priti.vairagi@vcet.edu.in
              </a>
              <div className="flex items-center gap-3 text-sm text-[#64748b] justify-center">
                <div className="w-7 h-7 rounded-full bg-[#fffbeb] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-3.5 h-3.5 text-[#ffb100]" />
                </div>
                7498687159
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Table */}
      <div>
        <SectionHeading title="Core Committee" subtitle="Meet the dedicated team driving VMEA" />

        <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[460px]">
              <thead>
                <tr className="bg-[#1a2b4b]">
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-[#ffb100]">#</th>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-[#ffb100]">Post</th>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-[#ffb100]">Name</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((m, i) => (
                  <tr
                    key={i}
                    className={`border-b border-slate-100 hover:bg-[#eff6ff]/60 transition-colors duration-200 ${m.isLeader ? 'bg-[#fffbeb]/60' : 'bg-white'
                      }`}
                  >
                    <td className="px-6 py-3.5 text-sm font-bold text-[#94a3b8]">{String(i + 1).padStart(2, '0')}</td>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
    { icon: Users, value: 100, suffix: '+', label: 'Active Members', delay: 0 },
    { icon: Award, value: 24, suffix: '+', label: 'Years of Legacy', delay: 100 },
    { icon: Zap, value: 15, suffix: '+', label: 'Events Per Year', delay: 200 },
    { icon: Wrench, value: 50, suffix: '+', label: 'Projects Showcased', delay: 300 },
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
        <p className="text-center text-xs font-black uppercase tracking-[0.3em] text-[#ffb100] mb-8">VMEA By The Numbers</p>
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
const VMEA: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('about');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabChange = (id: TabId) => {
    setActiveTab(id);
    // Smooth scroll to content on mobile
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        document.getElementById('vmea-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  };

  return (
    <PageLayout>
      <PageBanner
        title="VMEA"
        subtitle="Vidyavardhini's Mechanical Engineers Association - Building core technical knowledge and developing technical perspectives since 2000."
        breadcrumbs={[
          { label: 'Student & Career', href: '#' },
          { label: 'VMEA' },
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
                  {/* Nav header */}
                  <div className="px-5 py-4 border-b border-slate-100 bg-[#1a2b4b]/3">
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
                          className={`w-full text-left flex items-center gap-3.5 px-4 py-3.5 transition-all duration-250 group relative ${isActive
                              ? 'bg-[#1a2b4b] text-white shadow-md'
                              : 'text-[#475569] hover:bg-slate-50 hover:text-[#1a2b4b]'
                            }`}
                        >
                          {/* Active indicator */}
                          {isActive && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-7 w-1 bg-[#ffb100]" />
                          )}

                          {/* Icon */}
                          <div className={`w-9 h-9 flex items-center justify-center flex-shrink-0 transition-colors ${isActive ? 'bg-white/10' : 'bg-slate-100 group-hover:bg-[#1a2b4b]/8'
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

                {/* VMEA Quick Facts card */}
                <div className="hidden lg:block bg-gradient-to-br from-[#1a2b4b] to-[#0056b3] p-6 text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -mr-10 -mt-10" />
                  <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-[#ffb100]/10 -ml-6 -mb-6" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-8 h-8 bg-[#ffb100] rounded-lg flex items-center justify-center">
                        <Cog className="w-4 h-4 text-[#1a2b4b]" />
                      </div>
                      <h5 className="text-sm font-extrabold text-[#ffb100]">VMEA Highlights</h5>
                    </div>

                    <div className="space-y-4">
                      {[
                        { icon: Users, val: '100+', label: 'Members' },
                        { icon: Award, val: '24+', label: 'Years Active' },
                        { icon: Trophy, val: '15+', label: 'Events / Year' },
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
                        Building core technical<br />knowledge since 2000.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Content Panel */}
            <div
              id="vmea-content"
              className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_30px_-8px_rgba(0,0,0,0.06)] overflow-hidden min-h-[700px]"
            >
              {activeTab === 'about' && <AboutPanel />}
              {activeTab === 'events' && <EventsPanel />}
              {activeTab === 'gallery' && <GalleryPanel />}
              {activeTab === 'team' && <TeamPanel />}
            </div>
          </div>
        </div>
      </section>

    </PageLayout>
  );
};

export default VMEA;

