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
  Globe,
  Cpu,
  Radio,
  Trophy,
  Wrench,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────── */
type TabId = 'about' | 'events' | 'gallery' | 'team';

/* ─────────────────────────────────────────────────────────────
   TABS CONFIG
───────────────────────────────────────────────────────────── */
const tabs: { id: TabId; label: string; icon: React.ElementType; desc: string }[] = [
  { id: 'about',   label: 'About IETE', icon: Info,      desc: 'Our story & mission'   },
  { id: 'events',  label: 'Events',     icon: Calendar,  desc: 'Activities & programs' },
  { id: 'gallery', label: 'Gallery',    icon: ImageIcon, desc: 'Moments captured'       },
  { id: 'team',    label: 'Team',       icon: Users2,    desc: 'Meet the committee'     },
];

/* ─────────────────────────────────────────────────────────────
   EVENTS DATA
   ADMIN: To add a new event — copy one object block and paste
          inside the `events` array. Update title, icon, accent,
          tag, and paragraphs. Accent must be a hex color string.
   ADMIN: To remove an event — delete its object from the array.
───────────────────────────────────────────────────────────── */
const events = [
  {
    title: 'Anveshan',
    icon: Cpu,
    accent: '#0056b3',
    tag: 'Product Showcase',
    paragraphs: [
      'Anveshan is a product showcase event which is organized by VCET IETE-SF in association with IEEE VCET SB. This event provides an opportunity to students to learn what are the advancements in technologies of products which are used in industrial organization.',
    ],
  },
  {
    title: 'Oscillations',
    icon: Radio,
    accent: '#ffb100',
    tag: 'Technical Paper',
    paragraphs: [
      'Oscillations is a Technical Paper Presentation event by IETE Bombay section in which students from different colleges participate and present technical paper of their respective projects.',
    ],
  },
  {
    title: 'Technical Workshops',
    icon: Wrench,
    accent: '#0056b3',
    tag: 'Skill Building',
    paragraphs: [
      'VCET IETE-SF organizes various technical workshops for students like MATLAB, Verilog, Arduino etc. which are useful for developing technical skills.',
    ],
  },
  {
    title: 'Industry Oriented Training',
    icon: Globe,
    accent: '#ffb100',
    tag: 'Industry Training',
    paragraphs: [
      'VCET IETE-SF organises various industry oriented training programmes like Embedded C and ARM processor, Python, etc. which provides technical exposure to the students.',
    ],
  },
  {
    title: 'VNPS (VCET National Level Project Showcase)',
    icon: Trophy,
    accent: '#0056b3',
    tag: 'National Competition',
    paragraphs: [
      'VNPS is a project showcase event of VCET which is organized by all the student chapters of VCET. It provides a platform for students of VCET and from other colleges to showcase their skills.',
    ],
  },
];

/* ─────────────────────────────────────────────────────────────
   GALLERY PLACEHOLDERS
   ADMIN: To replace a placeholder with a real image, change the
          `img` field from undefined to the image URL string, e.g.:
          img: '/images/anveshan-2024.jpg'
          The label is shown as alt text and caption.
   ADMIN: To add a new gallery item — copy one object and append.
   ADMIN: To remove a gallery item — delete its object.
───────────────────────────────────────────────────────────── */
const galleryItems: { label: string; img?: string }[] = [
  { label: 'Anveshan'             },
  { label: 'Oscillations'         },
  { label: 'Technical Workshop'   },
  { label: 'VNPS Showcase'        },
];

/* ─────────────────────────────────────────────────────────────
   TEAM TABLES DATA
   ADMIN: To update a committee member — change the `name` value.
   ADMIN: To add a row — copy a {post, name} object and append.
   ADMIN: To remove a row — delete its object from the array.
───────────────────────────────────────────────────────────── */

/* Table 1 — Co-Ordinators Final Year */
const finalYearCoords: { post: string; name: string }[] = [
  /* ADMIN: Update names below — format: { post: 'POST TITLE', name: 'Member Name' } */
  { post: 'CHAIRMAN',              name: 'ADITYA NAIK'       },
  { post: 'SECRETARY',             name: 'YASH LAL'           },
  { post: 'COMMITTEE COORDINATOR', name: 'KHUSHBOO PATEL'     },
  { post: 'TREASURER',             name: 'VIRAJ JADHAV'       },
  { post: 'EVENT COORDINATOR',     name: 'SHRISHTI SHETTY'    },
  { post: 'TECHNICAL ADVISOR',     name: 'DIVYA TATKARE'      },
  { post: 'DESIGNER HEAD',         name: 'PARTH DHURI'        },
  { post: 'PRO INCHARGE',          name: 'JANHVI MEHTA'       },
  { post: 'Magazine Head',         name: 'Pranita Kapse'      },
  { post: 'PRO Head',              name: 'Shrija Shetty'      },
  { post: 'CREATIVE HEAD',         name: 'YOGENDRA MARATHE'   },
];

/* Table 2 — Third Year */
const thirdYearCoords: { post: string; name: string }[] = [
  /* ADMIN: Update names below */
  { post: 'VICE-CHAIRPERSON',              name: 'OMKAR SAMANT'              },
  { post: 'DEPUTY SECRETARY',              name: 'ASHWINI RATHOD'            },
  { post: 'DEPUTY COMMITTEE COORDINATOR',  name: 'KETAKEE MODAK'             },
  { post: 'DEPUTY TREASURER',              name: 'SPREETI RANE'              },
  { post: 'DEPUTY EVENT COORDINATOR',      name: 'GAURAVI SHETTY'            },
  { post: 'DEPUTY TECHNICAL ADVISOR',      name: 'ALOK DUBEY'                },
  { post: 'DEPUTY PRO INCHARGE',           name: 'SAHIL PATIL'               },
  { post: 'DEPUTY TASK FORCE HEAD',        name: 'KARTHIK SHETTY, GARVIT GARG' },
];

/* ─────────────────────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────────────────────── */
function useInView(ref: React.RefObject<Element>, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
      },
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

/* ─────────────────────────────────────────────────────────────
   STAT COUNTER CARD
───────────────────────────────────────────────────────────── */
const StatCard: React.FC<{
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  delay: number;
  inView: boolean;
}> = ({ icon: Icon, value, suffix, label, delay, inView }) => {
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

/* ─────────────────────────────────────────────────────────────
   SECTION HEADING
───────────────────────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────────────────────
   ABOUT PANEL
───────────────────────────────────────────────────────────── */
const AboutPanel: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);

  return (
    <div
      ref={ref}
      className={`space-y-12 p-8 lg:p-12 transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <SectionHeading
        title="About VCET IETE-SF"
        subtitle="Institution of Electronics and Telecommunication Engineers"
      />

      {/* Hero text + icon visual */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
        <div className="lg:col-span-3 space-y-5 text-[#475569] leading-relaxed text-[15px]">
          <p>
            The Institution of Electronics and Telecommunication Engineers (IETE) is India's leading
            recognized professional society devoted to the advancement of Science and Technology of
            Electronics, Telecommunication &amp; IT. Founded in 1953, IETE is the National Apex
            Professional body of Electronics and Telecommunication, Computer Science and IT Professionals.
          </p>
          <p>
            The objectives of IETE focus on advancing electro-technology. IETE conducts and sponsors
            technical meetings, conferences, symposia, and exhibitions all over India, publishes technical
            journals and provides continuing education as well as career advancement opportunities to its
            members.
          </p>
          <p>
            Towards this end, VCET IETE-SF promotes and conducts basic engineering and continuing technical
            education programmes for human resource development. Every year, VCET IETE-SF organizes events
            like Oscillations (technical paper presentation), VNPS (VCET National level product showcase),
            interdepartmental quiz competitions, seminars and workshops on various topics in the EXTC domain.
          </p>
          {/* ADMIN: Update tag pills below — add/remove tags as needed */}
          <div className="flex flex-wrap gap-3 pt-2">
            {['EXTC', 'Telecommunication', 'IT', 'Oscillations', 'VNPS'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full bg-[#eff6ff] text-[#0056b3] text-xs font-bold border border-[#0056b3]/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Decorative icon panel (replaces QR code) */}
        <div className="lg:col-span-2 flex justify-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#ffb100]/20 to-[#0056b3]/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
            <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-slate-100 flex flex-col items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1a2b4b] to-[#0056b3] flex items-center justify-center shadow-lg">
                <Radio className="w-10 h-10 text-[#ffb100]" />
              </div>
              <div className="text-center">
                <p className="text-[11px] font-black text-[#1a2b4b] tracking-[0.2em] uppercase">Founded 1953</p>
                <p className="text-[11px] text-[#94a3b8] mt-1">VCET, Vasai</p>
              </div>
              <div className="grid grid-cols-2 gap-3 w-full">
                {[
                  { icon: Cpu,     label: 'EXTC'     },
                  { icon: Radio,   label: 'Telecom'  },
                  { icon: Globe,   label: 'IT'       },
                  { icon: Trophy,  label: 'VNPS'     },
                ].map(({ icon: Ic, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1 bg-slate-50 rounded-xl p-2.5">
                    <Ic className="w-4 h-4 text-[#0056b3]" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#94a3b8]">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vision & Mission cards */}
      {/* ADMIN: Update vision/mission text below as needed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            icon: Eye,
            title: 'Our Vision',
            text: 'To be the National Apex Professional body in Electronics and Telecommunication, advancing electro-technology and providing the foremost source of technical and educational information for professional growth.',
            color: '#0056b3',
            bg: '#eff6ff',
          },
          {
            icon: Target,
            title: 'Our Mission',
            text: 'To conduct and sponsor technical meetings, conferences, symposia, exhibitions and publish technical journals — providing continuing education and career advancement opportunities in Electronics, Telecommunication, and IT.',
            color: '#b45309',
            bg: '#fffbeb',
          },
        ].map((card, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-400 hover:-translate-y-1"
          >
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

/* ─────────────────────────────────────────────────────────────
   EVENT CARD
───────────────────────────────────────────────────────────── */
const EventCard: React.FC<{ event: typeof events[0]; index: number }> = ({ event, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);

  return (
    <div
      ref={ref}
      className={`group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl overflow-hidden transition-all duration-500 hover:-translate-y-1 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
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

/* ─────────────────────────────────────────────────────────────
   EVENTS PANEL
───────────────────────────────────────────────────────────── */
const EventsPanel: React.FC = () => (
  <div className="p-8 lg:p-12 space-y-8">
    <SectionHeading
      title="Events & Activities"
      subtitle="A glimpse of what VCET IETE-SF organizes every academic year"
    />

    {/* ADMIN: Replace these placeholder slots with real event images.
         Set src on the <img> tag inside each slot, or swap the div for an <img>.
         Each slot is 16:9 aspect ratio. */}
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

/* ─────────────────────────────────────────────────────────────
   GALLERY PANEL
───────────────────────────────────────────────────────────── */
const GalleryPanel: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);

  return (
    <div
      ref={ref}
      className={`p-8 lg:p-12 space-y-8 transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <SectionHeading title="Gallery" subtitle="Moments from our events and activities" />

      {/* ADMIN: Gallery grid — 4 placeholders.
           To replace a placeholder with a real photo:
             1. Add an `img` field to the corresponding object in `galleryItems` array above.
             2. The component will automatically render the image instead of the placeholder.
           To add a new gallery item — append to `galleryItems` array at the top of this file.
           To remove an item — delete its object from `galleryItems`. */}
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
        {galleryItems.map((item, i) => (
          <div
            key={i}
            className={`group relative aspect-[4/3] overflow-hidden rounded-2xl ${
              item.img
                ? 'bg-slate-100'
                : `bg-gradient-to-br ${
                    i % 2 === 0
                      ? 'from-[#1a2b4b]/5 to-[#0056b3]/10 border-2 border-dashed border-[#0056b3]/20'
                      : 'from-[#ffb100]/5 to-[#ffb100]/15 border-2 border-dashed border-[#ffb100]/30'
                  }`
            } flex flex-col items-center justify-center gap-2 hover:border-solid hover:shadow-md transition-all duration-300 cursor-pointer`}
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            {item.img ? (
              /* ADMIN: Real photo — swap src when available */
              <img
                src={item.img}
                alt={item.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <>
                <div className="w-10 h-10 bg-white/60 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ImageIcon className="w-4 h-4 text-[#1a2b4b]/40" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#1a2b4b]/40 text-center px-2">
                  {item.label}
                </p>
              </>
            )}
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-[#94a3b8]">
        📸 Photos will be updated after each event. Stay connected with VCET IETE-SF for the latest updates.
      </p>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   MEMBER TABLE  (reusable for both committee tables)
   ADMIN: Pass `heading` and `rows` props.
          rows is an array of { post, name } objects.
───────────────────────────────────────────────────────────── */
interface MemberRow { post: string; name: string; }

const MemberTable: React.FC<{ heading: string; rows: MemberRow[] }> = ({ heading, rows }) => (
  <div className="mb-10">
    <h3 className="text-base font-extrabold text-[#1a2b4b] mb-4 flex items-center gap-2">
      <div className="w-1 h-5 bg-[#ffb100] rounded-full flex-shrink-0" />
      {heading}
    </h3>
    <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        {/* ADMIN: Table columns are Post and Name.
             To add a row — append to the rows array passed via prop.
             To remove a row — delete from the array. */}
        <table className="w-full text-left border-collapse min-w-[360px]">
          <thead>
            <tr className="bg-[#1a2b4b]">
              <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-[#ffb100] w-[45%]">Post</th>
              <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-[#ffb100]">Name</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className={`border-b border-slate-100 hover:bg-[#eff6ff]/60 transition-colors duration-200 ${
                  i % 2 === 0 ? 'bg-white' : 'bg-[#f7f9fc]'
                }`}
              >
                <td className="px-6 py-3.5 text-sm font-bold text-[#1a2b4b]">{row.post}</td>
                <td className="px-6 py-3.5 text-sm font-semibold text-[#334155]">{row.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────
   TEAM PANEL
───────────────────────────────────────────────────────────── */
const TeamPanel: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);

  return (
    <div
      ref={ref}
      className={`p-8 lg:p-12 space-y-12 transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      {/* Faculty In-Charge card */}
      {/* ADMIN: Update name, email, phone, and initials below.
           To add a photo — replace the initials div with:
           <img src="/path/to/photo.jpg" alt="Ms. Shaista Khanam"
                className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg" /> */}
      <div>
        <SectionHeading title="Faculty In-Charge" />
        <div className="flex justify-center">
          <div className="group relative bg-white rounded-3xl border border-slate-100 shadow-lg p-8 text-center max-w-sm w-full hover:shadow-xl transition-all duration-400 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#1a2b4b]/5 to-transparent" />

            {/* Avatar with initials — ADMIN: Change "SK" to match new in-charge's initials */}
            <div className="relative mx-auto w-28 h-28 mb-5">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#1a2b4b] to-[#0056b3] flex items-center justify-center text-white font-black text-2xl border-4 border-white shadow-lg">
                SK
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#ffb100] rounded-full flex items-center justify-center">
                <Award className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            {/* ADMIN: Update name below */}
            <h4 className="text-xl font-extrabold text-[#1a2b4b] mb-1">Ms. Shaista Khanam</h4>
            <p className="text-xs font-bold text-[#ffb100] uppercase tracking-widest mb-4">Faculty In-Charge</p>

            <div className="space-y-2.5">
              {/* ADMIN: Update email href and display text below */}
              <a
                href="mailto:shaista.khanam@vcet.edu.in"
                className="flex items-center gap-3 text-sm text-[#64748b] hover:text-[#1a2b4b] justify-center group/link"
              >
                <div className="w-7 h-7 rounded-full bg-[#eff6ff] flex items-center justify-center flex-shrink-0 group-hover/link:bg-[#0056b3] transition-colors">
                  <Mail className="w-3.5 h-3.5 text-[#0056b3] group-hover/link:text-white transition-colors" />
                </div>
                shaista.khanam@vcet.edu.in
              </a>
              {/* ADMIN: Update phone number below */}
              <div className="flex items-center gap-3 text-sm text-[#64748b] justify-center">
                <div className="w-7 h-7 rounded-full bg-[#fffbeb] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-3.5 h-3.5 text-[#ffb100]" />
                </div>
                9321562213
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Committee tables */}
      <div>
        <SectionHeading
          title="Student Committee"
          subtitle="Dedicated members driving VCET IETE-SF"
        />

        {/* ADMIN: Table 1 — Co-Ordinators Final Year.
             To update members — edit `finalYearCoords` array at the top of this file.
             To add a row — append { post: 'Post Title', name: 'Member Name' }.
             To remove a row — delete its object. */}
        <MemberTable
          heading="Co-Ordinators Final Year"
          rows={finalYearCoords}
        />

        {/* ADMIN: Table 2 — Third Year.
             To update members — edit `thirdYearCoords` array at the top of this file.
             For multiple names in one post, separate with a comma in the `name` field. */}
        <MemberTable
          heading="Third Year"
          rows={thirdYearCoords}
        />
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   STATS BANNER
───────────────────────────────────────────────────────────── */
const StatsBanner: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, 0.2);

  /* ADMIN: Update stats values/labels below */
  const stats: {
    icon: React.ElementType;
    value: number;
    suffix: string;
    label: string;
    delay: number;
  }[] = [
    { icon: Users,  value: 100,  suffix: '+', label: 'Active Members', delay: 0   },
    { icon: Award,  value: 5,    suffix: '+', label: 'Events Per Year', delay: 100 },
    { icon: Wrench, value: 4,    suffix: '+', label: 'Workshops',       delay: 200 },
    { icon: Cpu,    value: 1953, suffix: '',  label: 'Founded',         delay: 300 },
  ];

  return (
    <div ref={ref} className="relative bg-[#1a2b4b] py-16 px-6 overflow-hidden">
      {/* Background dot pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ffb100]/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ffb100]/30 to-transparent" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <p className="text-center text-xs font-black uppercase tracking-[0.3em] text-[#ffb100] mb-8">
          VCET IETE-SF — By The Numbers
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <StatCard key={i} {...s} inView={inView} />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────────────────────── */
const IETE: React.FC = () => {
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
        document.getElementById('iete-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  };

  /* Suppress unused-variable lint warning — isScrolled drives future sticky-nav logic */
  void isScrolled;

  return (
    <PageLayout>
      {/* ADMIN: Update title, subtitle, and breadcrumbs for page banner below */}
      <PageBanner
        title="IETE Student Forum"
        subtitle="Advancing Science and Technology of Electronics, Telecommunication, Computers and Information Technology."
        breadcrumbs={[{ label: 'IETE' }]}
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
                  <div className="px-4 md:px-5 py-3 md:py-4 border-b border-slate-100 bg-[#1a2b4b]/3">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#1a2b4b]/50">Navigation</p>
                  </div>
                  <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible gap-0 lg:p-2 lg:space-y-1 no-scrollbar">
                    {tabs.map((tab) => {
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => handleTabChange(tab.id)}
                          className={`w-full lg:w-auto flex-shrink-0 text-left flex items-center gap-1.5 lg:gap-3.5 px-2.5 py-2 lg:py-3.5 transition-all duration-250 group relative min-h-[40px] ${
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
                            isActive
                              ? 'text-[#ffb100] translate-x-0.5'
                              : 'text-slate-300 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                          }`} />
                        </button>
                      );
                    })}
                  </div>
                </nav>

                {/* IETE Highlights card */}
                {/* ADMIN: Update highlights values/labels below */}
                <div className="hidden lg:block bg-gradient-to-br from-[#1a2b4b] to-[#0056b3] p-6 text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -mr-10 -mt-10" />
                  <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-[#ffb100]/10 -ml-6 -mb-6" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-8 h-8 bg-[#ffb100] rounded-lg flex items-center justify-center">
                        <Zap className="w-4 h-4 text-[#1a2b4b]" />
                      </div>
                      <h5 className="text-sm font-extrabold text-[#ffb100]">IETE Highlights</h5>
                    </div>
                    <div className="space-y-4">
                      {([
                        { icon: Users,  val: '100+', label: 'Members'       },
                        { icon: Award,  val: '5+',   label: 'Events / Year' },
                        { icon: Wrench, val: '4+',   label: 'Workshops'     },
                      ] as { icon: React.ElementType; val: string; label: string }[]).map(({ icon: Icon, val, label }) => (
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
                        Advancing EXTC sciences for<br />the benefit of humanity.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </aside>

            {/* Content Panel */}
            <div
              id="iete-content"
              className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_30px_-8px_rgba(0,0,0,0.06)] overflow-hidden min-h-[700px]"
            >
              {activeTab === 'about'   && <AboutPanel />}
              {activeTab === 'events'  && <EventsPanel />}
              {activeTab === 'gallery' && <GalleryPanel />}
              {activeTab === 'team'    && <TeamPanel />}
            </div>

          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default IETE;