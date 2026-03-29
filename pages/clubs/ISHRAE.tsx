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
  Wind,
  Thermometer,
  Building2,
  Briefcase,
  Trophy,
  Globe,
  Fan,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   TYPES & DATA
───────────────────────────────────────────── */
type TabId = 'about' | 'events' | 'gallery' | 'team';

const tabs: { id: TabId; label: string; icon: any; desc: string }[] = [
  { id: 'about', label: 'About ISHRAE', icon: Info, desc: 'Our mission & vision' },
  { id: 'events', label: 'Events', icon: Calendar, desc: 'Activities & programs' },
  { id: 'gallery', label: 'Gallery', icon: ImageIcon, desc: 'Moments captured' },
  { id: 'team', label: 'Team', icon: Users2, desc: 'Meet the committee' },
];

const teamMembersCore = [
  { position: 'President', dept: 'Mechanical', name: 'Mr. Omkar Malusare', isLeader: true },
  { position: 'Secretary', dept: 'Mechanical', name: 'Mr. Dhruv Kadam', isLeader: true },
  { position: 'Treasurer', dept: 'Mechanical', name: 'Mr. Sachin Rai', isLeader: false },
  { position: 'Technical Team Head', dept: 'Mechanical', name: 'Mr. Omkar Bhoir', isLeader: false },
  { position: 'PR Head', dept: 'Mechanical', name: 'Harsh Dhembare', isLeader: false },
  { position: 'Organizing Head', dept: 'Mechanical', name: 'Mr. Rishabh Maurya', isLeader: false },
];

const teamMembers2024 = [
  { position: 'Member', dept: 'Mechanical', name: 'Mr. Niharika Das', isLeader: false },
  { position: 'Member', dept: 'Mechanical', name: 'Mr. Nilesh Birje', isLeader: false },
  { position: 'Member', dept: 'Mechanical', name: 'Mr. Chandrashekha Mishra', isLeader: false },
  { position: 'Member', dept: 'Mechanical', name: 'Mr. Soham Karvir', isLeader: false },
];

const teamMembers2021 = [
  { position: 'Member TTH', dept: 'Mechanical', name: 'Ms. Riya Rohidas Patil', isLeader: false },
  { position: 'Member TTH', dept: 'Mechanical', name: 'Mr. Shreya Narshim Pai', isLeader: false },
  { position: 'Member RWH', dept: 'Mechanical', name: 'Mr. Varad Santosh Takke', isLeader: false },
  { position: 'Member PH', dept: 'Mechanical', name: 'Mr. Suyash Mahesh Hoskote', isLeader: false },
  { position: 'Member', dept: 'Mechanical', name: 'Mr. Jitesh Yeshwant Bhagudia', isLeader: false },
  { position: 'Member', dept: 'Mechanical', name: 'Mr. Aditya Dnyaneshwar Patane', isLeader: false },
  { position: 'Member', dept: 'Mechanical', name: 'Mr. Prasant Simanchal Sahu', isLeader: false },
  { position: 'Member', dept: 'Mechanical', name: 'Mr. Tejash Umesh Surti', isLeader: false },
  { position: 'Member', dept: 'Mechanical', name: 'Ms. Vaibhavi Deepak Murkar', isLeader: false },
  { position: 'Member', dept: 'Mechanical', name: 'Mr. Rahul Sunil Patil', isLeader: false },
  { position: 'Member', dept: 'Mechanical', name: 'Ms. Ashitha Ashok Poojari', isLeader: false },
];

const events = [
  {
    title: 'Jamboree',
    icon: Trophy,
    accent: '#0056b3',
    tag: 'Technical Festival',
    paragraphs: [
      'Jamboree is the flagship technical festival organized by ISHRAE-VCET Students Chapter. This vibrant event hosts various competitions including Technical Paper Presentation, T-Shirt Design, Mock Interview, Poster Design, Games, and seminars related to HVAC.',
      'The festival witnesses enthusiastic participation from students across various colleges, providing a platform to showcase technical creativity, communication skills, and innovative thinking in the field of heating, ventilation, and air conditioning.',
    ],
    outcomes: [
      'Enhances technical presentation skills',
      'Encourages creative design thinking',
      'Develops interview and communication abilities',
      'Promotes teamwork and interdisciplinary learning',
    ],
  },
  {
    title: 'ACREX & Quest Presentation',
    icon: Building2,
    accent: '#ffb100',
    tag: 'Industry Exhibition',
    paragraphs: [
      'ACREX is a premier international exhibition on air conditioning, heating, ventilation, and allied engineering services. ISHRAE-VCET participates with presentations during ACREX and A Quest events, showcasing student research and innovations.',
      'The inter-collegiate engineering quiz competition is conducted during ACREX, divided into four zone events culminating in finals. These platforms provide exposure to cutting-edge industry technologies and networking opportunities with HVAC professionals.',
    ],
  },
  {
    title: 'ISTL (ISHRAE Student Technical League)',
    icon: Award,
    accent: '#0056b3',
    tag: 'National Competition',
    paragraphs: [
      'ISTL is a prestigious competition where registered colleges participate to find the best air conditioning system design for IT/Commercial buildings. Teams perform heating load calculations and present 30-minute technical presentations before HVAC engineers.',
      'In ISTL 2018, VCET qualified among the top 5 teams out of 15 participating colleges, securing "Best Innovation Design" award and 3rd runner up position. The team members were Mr. Harsheel Mehta, Mr. Abhishek Shah, and Mr. Shantanu Sawale.',
    ],
  },
  {
    title: 'Job Junction',
    icon: Briefcase,
    accent: '#ffb100',
    tag: 'Career Initiative',
    paragraphs: [
      'Job Junction is an initiative by ISHRAE to provide job opportunities to fresh graduate engineers and help HVAC industries find qualified talent. Organized across India, this program bridges the gap between academic learning and industry requirements.',
      'The affiliation ceremony recognizes subject toppers in Thermodynamics, Heat Transfer, and Refrigeration & Air Conditioning, along with placement achievements through ISHRAE Job Junction.',
    ],
  },
  {
    title: 'Industrial Visits',
    icon: Globe,
    accent: '#0056b3',
    tag: 'Industry Exposure',
    paragraphs: [
      'Regular industrial visits are organized to HVAC system related industries, allowing students to witness real-world implementations of classroom concepts. These visits facilitate networking with researchers and industry professionals.',
      'Students gain insights into future opportunities for research and development, strengthening their academic journey and engineering prospects through immersive industry experiences.',
    ],
  },
  {
    title: 'Installation Ceremony',
    icon: Users,
    accent: '#ffb100',
    tag: 'Annual Event',
    paragraphs: [
      'The annual Installation Ceremony marks the official installation of office bearers for the ISHRAE-VCET Students Chapter. This glorious event is blessed by the presence of eminent personalities from the HVAC industry and academia.',
      'The ceremony includes the installation of student chapter office bearers, felicitation of outgoing members, and various technical activities that set the tone for the upcoming academic year.',
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
    <h2 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-[#1a2b4b] mb-3 tracking-tight">{title}</h2>
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
      <SectionHeading title="About ISHRAE" subtitle="The Indian Society of Heating, Refrigerating and Air Conditioning Engineers" />

      {/* Hero text + Contact Card */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
        <div className="lg:col-span-3 space-y-5 text-[#475569] leading-relaxed text-[15px]">
          <p>
            ISHRAE is committed to advancing the arts and sciences of heating, ventilating, air conditioning
            and refrigerating to serve humanity and promote a sustainable world. At VCET, our Students Chapter
            fosters a community of aspiring mechanical engineers and HVAC professionals.
          </p>
          <p>
            We provide platforms for continuing education through lectures, demonstrations, and publications.
            Our chapter encourages scientific research and impacts education through specialized courses,
            workshops, seminars, and consultancy work in the fields of air-conditioning and refrigeration.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {['HVAC', 'Refrigeration', 'Thermodynamics', 'Energy Efficiency', 'Sustainability'].map((tag) => (
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
                <Wind className="w-16 h-16" />
              </div>
              <div className="text-center">
                <p className="text-[11px] font-black text-[#1a2b4b] tracking-[0.25em] uppercase">Serving Humanity</p>
                <p className="text-[11px] text-[#94a3b8] mt-0.5">Since 2009</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vision & Mission cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            icon: Target,
            title: 'Our Mission',
            text: 'To advance the arts and sciences of heating, ventilating, air conditioning and refrigerating to serve humanity and promote a sustainable world.',
            color: '#0056b3',
            bg: '#eff6ff',
          },
          {
            icon: Eye,
            title: 'Our Vision',
            text: 'ISHRAE will be the global leader, the foremost source of technical and educational information, and the primary provider of opportunity for professional growth in the arts and sciences of heating, ventilating, air conditioning and refrigerating.',
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

      {/* Aims & Objectives */}
      <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-100">
        <h4 className="text-lg font-extrabold text-[#1a2b4b] mb-6 flex items-center gap-2">
          <Fan className="w-5 h-5 text-[#ffb100]" />
          Aims & Objectives
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'Advancement of the sciences of heating, RAC engineering and related sciences',
            'Continuing education through lectures, demonstrations and publications',
            'Encouragement of scientific research in HVAC&R',
            'Impact education via courses, workshops, seminars and certificates',
            'Provide consultancy work in air-conditioning and refrigeration',
          ].map((aim, i) => (
            <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0056b3] flex-shrink-0 mt-2" />
              <p className="text-sm text-[#475569]">{aim}</p>
            </div>
          ))}
        </div>
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

          {event.outcomes && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-[11px] font-black uppercase tracking-widest text-[#1a2b4b] mb-3">Key Highlights:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {event.outcomes.map((outcome, i) => (
                  <div key={i} className="flex items-start gap-2.5 bg-slate-50 rounded-lg p-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ffb100] flex-shrink-0 mt-1.5" />
                    <p className="text-xs text-[#475569] leading-relaxed">{outcome}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
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
    <SectionHeading title="Events & Activities" subtitle="Promoting excellence in HVAC&R through various technical programs" />

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
    { label: 'Installation Ceremony' },
    { label: 'Jamboree 2024' },
    { label: 'ACREX Exhibition' },
    { label: 'ISTL Competition' },
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

      <p className="text-center text-sm text-[#94a3b8]">
        📸 Photos will be updated after each event. Contact the team for more details.
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

      {/* Faculty Coordinator */}
      <div>
        <SectionHeading title="Faculty Coordinator" />
        <div className="flex justify-center">
          <div className="group relative bg-white rounded-3xl border border-slate-100 shadow-lg p-8 text-center max-w-sm w-full hover:shadow-xl transition-all duration-400 overflow-hidden">
            {/* Background accent */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#1a2b4b]/5 to-transparent" />

            {/* Avatar */}
            <div className="relative mx-auto w-28 h-28 mb-5">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#1a2b4b] to-[#0056b3] flex items-center justify-center text-white font-black text-2xl border-4 border-white shadow-lg">
                RM
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#ffb100] rounded-full flex items-center justify-center">
                <Award className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <h4 className="text-xl font-extrabold text-[#1a2b4b] mb-1">Mr. Rishabh Melwanki</h4>
            <p className="text-xs font-bold text-[#ffb100] uppercase tracking-widest mb-4">Faculty Coordinator</p>

            <div className="space-y-2.5">
              <a
                href="mailto:rishabh.melwanki@vcet.edu.in"
                className="flex items-center gap-3 text-sm text-[#64748b] hover:text-[#1a2b4b] justify-center group/link"
              >
                <div className="w-7 h-7 rounded-full bg-[#eff6ff] flex items-center justify-center flex-shrink-0 group-hover/link:bg-[#0056b3] transition-colors">
                  <Mail className="w-3.5 h-3.5 text-[#0056b3] group-hover/link:text-white transition-colors" />
                </div>
                rishabh.melwanki@vcet.edu.in
              </a>
              <div className="flex items-center gap-3 text-sm text-[#64748b] justify-center">
                <div className="w-7 h-7 rounded-full bg-[#fffbeb] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-3.5 h-3.5 text-[#ffb100]" />
                </div>
                9029353539
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Team 2023-24 */}
      <div>
        <SectionHeading title="Core Committee 2023-24" subtitle="STUDENT BODIES: ISHRAE-VCET STUDENTS CHAPTER [2023-24] Core Members" />

        <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[560px]">
              <thead>
                <tr className="bg-[#1a2b4b]">
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-[#ffb100]">#</th>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-[#ffb100]">Position</th>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-[#ffb100]">Class</th>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-[#ffb100]">Name</th>
                </tr>
              </thead>
              <tbody>
                {teamMembersCore.map((m, i) => (
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
                    <td className="px-6 py-3.5">
                      <span className="text-xs font-bold text-[#64748b] bg-slate-100 px-2.5 py-1 rounded-full">{m.dept}</span>
                    </td>
                    <td className="px-6 py-3.5 text-sm font-semibold text-[#334155]">{m.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Members 2023-24 */}
      <div>
        <h3 className="text-lg font-bold text-[#1a2b4b] mb-4">Members 2023-24</h3>
        <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[560px]">
              <thead>
                <tr className="bg-[#1a2b4b]">
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-[#ffb100]">#</th>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-[#ffb100]">Position</th>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-[#ffb100]">Class</th>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-[#ffb100]">Name</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers2024.map((m, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-[#eff6ff]/60 transition-colors duration-200 bg-white">
                    <td className="px-6 py-3.5 text-sm font-bold text-[#94a3b8]">{String(i + 1).padStart(2, '0')}</td>
                    <td className="px-6 py-3.5 text-sm font-bold text-[#1a2b4b]">{m.position}</td>
                    <td className="px-6 py-3.5">
                      <span className="text-xs font-bold text-[#64748b] bg-slate-100 px-2.5 py-1 rounded-full">{m.dept}</span>
                    </td>
                    <td className="px-6 py-3.5 text-sm font-semibold text-[#334155]">{m.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Members 2021-22 */}
      <div>
        <h3 className="text-lg font-bold text-[#1a2b4b] mb-4">Members 2021-22</h3>
        <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[560px]">
              <thead>
                <tr className="bg-[#1a2b4b]">
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-[#ffb100]">#</th>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-[#ffb100]">Position</th>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-[#ffb100]">Class</th>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-[#ffb100]">Name</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers2021.map((m, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-[#eff6ff]/60 transition-colors duration-200 bg-white">
                    <td className="px-6 py-3.5 text-sm font-bold text-[#94a3b8]">{String(i + 1).padStart(2, '0')}</td>
                    <td className="px-6 py-3.5 text-sm font-bold text-[#1a2b4b]">{m.position}</td>
                    <td className="px-6 py-3.5">
                      <span className="text-xs font-bold text-[#64748b] bg-slate-100 px-2.5 py-1 rounded-full">{m.dept}</span>
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
    { icon: Users, value: 100, suffix: '+', label: 'Student Members', delay: 0 },
    { icon: Award, value: 15, suffix: '+', label: 'Events Per Year', delay: 100 },
    { icon: Trophy, value: 5, suffix: '+', label: 'Years Active', delay: 200 },
    { icon: Globe, value: 20, suffix: '+', label: 'Industry Partners', delay: 300 },
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
        <p className="text-center text-xs font-black uppercase tracking-[0.3em] text-[#ffb100] mb-8">ISHRAE VCET By The Numbers</p>
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
const ISHRAE: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('about');

  const handleTabChange = (id: TabId) => {
    setActiveTab(id);
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        document.getElementById('ishrae-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  };

  return (
    <PageLayout>
      <PageBanner
        title="ISHRAE Students Chapter"
        subtitle="Advancing the arts and sciences of HVAC&R to serve humanity and promote a sustainable world."
        breadcrumbs={[
          { label: 'Student & Career', href: '#' },
          { label: 'ISHRAE' },
        ]}
      />

      {/* Stats Banner */}
      <StatsBanner />

      {/* Main Content */}
      <section className="py-8 md:py-16 lg:py-24 bg-[#f8fafc]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-10">

            {/* Sidebar Nav */}
            <aside className="lg:col-span-1">
              <div className="sticky top-20 lg:top-28 space-y-4">
                {/* Tab navigation */}
                <nav className="bg-white border border-slate-200 shadow-sm">
                  {/* Nav header */}
                  <div className="px-4 md:px-5 py-3 md:py-4 border-b border-slate-100 bg-[#1a2b4b]/3">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#1a2b4b]/50">Navigation</p>
                  </div>
                  {/* Nav items */}
                  <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible gap-0 lg:p-2 lg:space-y-1 no-scrollbar">
                    {tabs.map((tab) => {
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => handleTabChange(tab.id)}
                          className={`w-full lg:w-auto flex-shrink-0 text-left flex items-center gap-1.5 lg:gap-3.5 px-2.5 py-2 lg:py-3.5 transition-all duration-250 group relative min-h-[40px] ${isActive
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

                {/* ISHRAE Quick Facts card */}
                <div className="hidden lg:block bg-gradient-to-br from-[#1a2b4b] to-[#0056b3] p-6 text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -mr-10 -mt-10" />
                  <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-[#ffb100]/10 -ml-6 -mb-6" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-8 h-8 bg-[#ffb100] rounded-lg flex items-center justify-center">
                        <Wind className="w-4 h-4 text-[#1a2b4b]" />
                      </div>
                      <h5 className="text-sm font-extrabold text-[#ffb100]">ISHRAE Highlights</h5>
                    </div>

                    <div className="space-y-4">
                      {[
                        { icon: Users, val: '100+', label: 'Members' },
                        { icon: Award, val: '15+', label: 'Events / Year' },
                        { icon: Trophy, val: '2009', label: 'Established' },
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
                        Promoting sustainable<br />HVAC&R solutions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Content Panel */}
            <div
              id="ishrae-content"
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

export default ISHRAE;