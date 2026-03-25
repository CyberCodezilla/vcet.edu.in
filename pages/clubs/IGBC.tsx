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
  Target,
  BookOpen,
  Lightbulb,
  Globe,
  Leaf,
  Trophy,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   TYPES & DATA
───────────────────────────────────────────── */
type TabId = 'about' | 'objectives' | 'events' | 'gallery' | 'team';

const tabs: { id: TabId; label: string; icon: any; desc: string }[] = [
  { id: 'about', label: 'About IGBC', icon: Info, desc: 'Our story & mission' },
  { id: 'objectives', label: 'Objectives', icon: Target, desc: 'Goals & aims' },
  { id: 'events', label: 'Events', icon: Calendar, desc: 'Activities & programs' },
  { id: 'gallery', label: 'Gallery', icon: ImageIcon, desc: 'Moments captured' },
  { id: 'team', label: 'Team', icon: Users2, desc: 'Meet the committee' },
];

/* 
ADMIN EDIT: FACULTY INCHARGE DATA
Modify this object to update the Faculty Incharge details
*/
const facultyIncharge = {
  name: 'Dr. Viren Chandanshive',
  email: 'viren.chandanshive@vcet.edu.in',
  phone: '9112196004',
  initials: 'VC',
  title: 'Faculty Incharge'
};

/* 
ADMIN EDIT: STUDENT COMMITTEE TABLE DATA
Modify this array to update the Student Committee 2023-24
Names array supports multiple members for the same position
*/
const studentCommittee = [
  { position: 'President', dept: 'Civil', name: 'Deeksha Shetty', isLeader: true },
  { position: 'Secretary', dept: 'Civil', name: 'Shreya Bari', isLeader: true },
  { position: 'Treasurer', dept: 'Civil', name: 'Aditya Kute', isLeader: false },
  { position: 'Industry Institute Interaction Head', dept: 'Civil', name: 'Prajakta Borse', isLeader: false },
  { position: 'Creative Head', dept: 'Civil', name: 'Kimaya Salunkhe', isLeader: false },
  { position: 'Publicity and Magazine Head', dept: 'Civil', name: 'Prerna Kasar', isLeader: false },
  { position: 'Data Management Head', dept: 'Civil', name: 'Saloni Pundpal', isLeader: false },
  { position: 'Data Management Head', dept: 'Civil', name: 'Rashi Pawaaskar', isLeader: false },
];

const events = [
  {
    title: 'Activities',
    icon: BookOpen,
    accent: '#0056b3',
    tag: 'Knowledge Sharing',
    paragraphs: [
      'Student chapters often organize a variety of activities such as seminars, workshops, and guest lectures featuring professionals from the green building industry. These events aim to enhance the knowledge and skills of students in the field of sustainable construction.',
    ],
  },
  {
    title: 'Projects and Competitions',
    icon: Trophy,
    accent: '#ffb100',
    tag: 'Innovation',
    paragraphs: [
      'IGBC Student Chapters may initiate and participate in projects related to green building, sustainability, and environmental conservation. They may also organize or participate in competitions, hackathons, or design challenges to encourage innovative solutions.',
    ],
  },
  {
    title: 'Training and Skill Development',
    icon: Zap,
    accent: '#0056b3',
    tag: 'Skill Building',
    paragraphs: [
      'The student chapter may conduct training sessions or skill development programs to equip students with the necessary tools to incorporate green building principles into their future careers.',
    ],
  },
  {
    title: 'Networking Opportunities',
    icon: Users,
    accent: '#ffb100',
    tag: 'Industry Connect',
    paragraphs: [
      'Student chapters often provide a platform for networking among students, faculty, and professionals in the field. This can include industry visits, interaction with experts, and networking events.',
    ],
  },
  {
    title: 'Collaboration with Industry',
    icon: Globe,
    accent: '#0056b3',
    tag: 'Partnerships',
    paragraphs: [
      'Collaboration with local industry professionals, construction firms, and environmental organizations is common. This collaboration can provide students with insights into real-world projects and opportunities for internships.',
    ],
  },
  {
    title: 'Awareness Campaigns',
    icon: Info,
    accent: '#ffb100',
    tag: 'Outreach',
    paragraphs: [
      'Student chapters may engage in awareness campaigns within their academic community to promote the importance of sustainable building practices. This could involve organizing awareness drives, green building exhibitions, or community outreach programs.',
    ],
  },
  {
    title: 'Skill Enhancement Workshops',
    icon: Award,
    accent: '#0056b3',
    tag: 'Technical Training',
    paragraphs: [
      'Workshops focused on practical skills related to sustainable design, energy modeling, and other green building aspects may be organized to enhance the technical capabilities of students.',
    ],
  },
  {
    title: 'Participation in IGBC Events',
    icon: Leaf,
    accent: '#ffb100',
    tag: 'National Level',
    paragraphs: [
      'Student chapters may participate in or contribute to larger IGBC events, conferences, or initiatives. This allows students to connect with the broader green building community and stay updated on industry trends. The council also organizes Green Building Congress, its annual flagship event on green buildings.',
    ],
  },
];

const objectivesList = [
  { title: 'Educational Outreach', text: 'To organize workshops, seminars, and guest lectures by industry experts to provide students with in-depth knowledge about green building concepts, sustainable practices, and the latest advancements in the field.' },
  { title: 'Hands-On Experience', text: 'To encourage participation in design competitions and projects that focus on green building and sustainability, enabling students to apply their knowledge in practical scenarios.' },
  { title: 'Research and Innovation', text: 'To foster innovation by supporting student-led projects and initiatives that aim to develop new solutions for sustainable development.' },
  { title: 'Community Engagement', text: 'To organize community outreach programs and awareness campaigns that educate the public about the importance of sustainability and green living.' },
  { title: 'Professional Development', text: 'To provide networking opportunities for students by connecting them with professionals and organizations in the civil engineering industry.' },
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
      <SectionHeading title="About IGBC" subtitle="The Indian Green Building Council" />

      {/* Hero text + Icon Box */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
        <div className="lg:col-span-3 space-y-5 text-[#475569] leading-relaxed text-[15px]">
          <p>
            The Indian Green Building Council (IGBC) is a technical committee of civil engineering department for the development of the student. The aim of an IGBC Student Chapter aligns with the broader goals of IGBC, focusing on promoting awareness and understanding of green building concepts among students.
          </p>
          <p>
            This may include sustainable construction practices, energy efficiency, water conservation, and other environmentally conscious strategies. IGBC student chapter has its foundation from the inauguration of the department since 2020. From its birth, IGBC student chapter actively organizes the various technical events, Product Showcase, Project Showcase and different workshops related to the civil engineering for the awareness of advancement in technologies.
          </p>
          <p>
            The council offers a wide array of services which include developing new green building rating programs, certification services and green building training programs. The council also organizes Green Building Congress, its annual flagship event on green buildings.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {['Green Building', 'Sustainability', 'Energy Efficiency', 'Water Conservation', 'LEED'].map((tag) => (
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
                <Leaf className="w-16 h-16" />
              </div>
              <div className="text-center">
                <p className="text-[11px] font-black text-[#1a2b4b] tracking-[0.25em] uppercase">Green Building Council</p>
                <p className="text-[11px] text-[#94a3b8] mt-0.5">Since 2020</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vision & Mission cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            icon: Leaf,
            title: 'Our Aim',
            text: 'To foster a culture of sustainability and environmental consciousness among students by educating and engaging them in advanced building practices, sustainable development, and eco-friendly initiatives.',
            color: '#0056b3',
            bg: '#eff6ff',
          },
          {
            icon: Target,
            title: 'Our Mission',
            text: 'To create a knowledgeable and proactive student community committed to leading the way in sustainable development and advanced building practices, providing competitive edge through unique resources and industry connections.',
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
   OBJECTIVES PANEL
───────────────────────────────────────────── */
const ObjectivesPanel: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  return (
    <div ref={ref} className={`p-8 lg:p-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <SectionHeading title="Objectives" subtitle="Strategic goals driving our mission" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {objectivesList.map((obj, i) => (
          <div
            key={i}
            className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl overflow-hidden transition-all duration-500 hover:-translate-y-1"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div className="h-1.5 bg-gradient-to-r from-[#0056b3] to-[#0056b3]/60" />
            <div className="p-7">
              <div className="flex items-start gap-4 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#ffb100]/15 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-[#ffb100] font-black text-sm">{i + 1}</span>
                </div>
                <h4 className="text-[17px] font-extrabold text-[#1a2b4b] leading-snug pt-1.5">{obj.title}</h4>
              </div>
              <p className="text-[#64748b] text-sm leading-relaxed pl-14">{obj.text}</p>
            </div>
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
    <SectionHeading title="Events & Activities" subtitle="Programs organized by IGBC Student Chapter" />

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

  /* 
  ADMIN EDIT: GALLERY IMAGES
  Modify the array below to change labels or add image URLs
  */
  const placeholders = [
    { label: 'Green Building Congress' },
    { label: 'Product Showcase' },
    { label: 'Project Showcase' },
    { label: 'Workshop Session' },
    { label: 'Engineers Day Event' },
    { label: 'Industry Visit' },
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
        📸 Photos will be updated after each event.
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

      {/* Faculty Incharge */}
      <div>
        <SectionHeading title="Faculty Incharge" />
        <div className="flex justify-center">
          <div className="group relative bg-white rounded-3xl border border-slate-100 shadow-lg p-8 text-center max-w-sm w-full hover:shadow-xl transition-all duration-400 overflow-hidden">
            {/* Background accent */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#1a2b4b]/5 to-transparent" />

            {/* Avatar */}
            <div className="relative mx-auto w-28 h-28 mb-5">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#1a2b4b] to-[#0056b3] flex items-center justify-center text-white font-black text-2xl border-4 border-white shadow-lg">
                {facultyIncharge.initials}
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#ffb100] rounded-full flex items-center justify-center">
                <Award className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <h4 className="text-xl font-extrabold text-[#1a2b4b] mb-1">{facultyIncharge.name}</h4>
            <p className="text-xs font-bold text-[#ffb100] uppercase tracking-widest mb-4">{facultyIncharge.title}</p>

            <div className="space-y-2.5">
              <a
                href={`mailto:${facultyIncharge.email}`}
                className="flex items-center gap-3 text-sm text-[#64748b] hover:text-[#1a2b4b] justify-center group/link"
              >
                <div className="w-7 h-7 rounded-full bg-[#eff6ff] flex items-center justify-center flex-shrink-0 group-hover/link:bg-[#0056b3] transition-colors">
                  <Mail className="w-3.5 h-3.5 text-[#0056b3] group-hover/link:text-white transition-colors" />
                </div>
                {facultyIncharge.email}
              </a>
              <div className="flex items-center gap-3 text-sm text-[#64748b] justify-center">
                <div className="w-7 h-7 rounded-full bg-[#fffbeb] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-3.5 h-3.5 text-[#ffb100]" />
                </div>
                {facultyIncharge.phone}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Student Committee Table */}
      <div>
        <SectionHeading title="Student Committee 2023-24" subtitle="Meet the dedicated team driving IGBC VCET Student Chapter" />

        <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            {/* 
              ADMIN EDIT: STUDENT COMMITTEE TABLE
              To modify content, edit the studentCommittee array at the top of this file.
            */}
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
                {studentCommittee.map((m, i) => (
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
    { icon: Zap, value: 4, suffix: '+', label: 'Years of Legacy', delay: 200 },
    { icon: Leaf, value: 50, suffix: '+', label: 'Green Projects', delay: 300 },
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
        <p className="text-center text-xs font-black uppercase tracking-[0.3em] text-[#ffb100] mb-8">IGBC VCET By The Numbers</p>
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
const IGBC: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('about');
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
        document.getElementById('igbc-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  };

  return (
    <PageLayout>
      <PageBanner
        title="IGBC Student Chapter"
        subtitle="The Indian Green Building Council - Promoting sustainable construction and green building practices."
        breadcrumbs={[
          { label: 'Student & Career', href: '#' },
          { label: 'IGBC' },
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

                {/* IGBC Quick Facts card */}
                <div className="hidden lg:block bg-gradient-to-br from-[#1a2b4b] to-[#0056b3] p-6 text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -mr-10 -mt-10" />
                  <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-[#ffb100]/10 -ml-6 -mb-6" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-8 h-8 bg-[#ffb100] rounded-lg flex items-center justify-center">
                        <Leaf className="w-4 h-4 text-[#1a2b4b]" />
                      </div>
                      <h5 className="text-sm font-extrabold text-[#ffb100]">IGBC Highlights</h5>
                    </div>

                    <div className="space-y-4">
                      {[
                        { icon: Users, val: '100+', label: 'Members' },
                        { icon: Award, val: '15+', label: 'Events / Year' },
                        { icon: Leaf, val: '2020', label: 'Established' },
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
                        Building a sustainable<br />future for humanity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Content Panel */}
            <div
              id="igbc-content"
              className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_30px_-8px_rgba(0,0,0,0.06)] overflow-hidden min-h-[700px]"
            >
              {activeTab === 'about' && <AboutPanel />}
              {activeTab === 'objectives' && <ObjectivesPanel />}
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

export default IGBC;