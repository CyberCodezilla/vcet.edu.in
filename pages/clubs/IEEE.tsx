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
  Play,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  MapPin,
  ExternalLink,
  Building2,
  ArrowRight,
  Globe,
  Cpu,
  BookOpen,
  Microscope,
  Lightbulb,
  Trophy,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   TYPES & DATA
───────────────────────────────────────────── */
type TabId = 'about' | 'events' | 'gallery' | 'team';

const tabs: { id: TabId; label: string; icon: any; desc: string }[] = [
  { id: 'about',   label: 'About IEEE', icon: Info,      desc: 'Our story & mission' },
  { id: 'events',  label: 'Events',     icon: Calendar,  desc: 'Activities & programs' },
  { id: 'gallery', label: 'Gallery',    icon: ImageIcon, desc: 'Moments captured' },
  { id: 'team',    label: 'Team',       icon: Users2,    desc: 'Meet the committee' },
];

const teamMembers = [
  { position: 'Chairperson',                  dept: 'BE-EXTC',  name: 'Mr. Shikhar Mehta',   isLeader: true  },
  { position: 'Vice Chairperson',             dept: 'TE-AI&DS', name: 'Omkar Bhikle',         isLeader: true  },
  { position: 'Secretary',                    dept: 'BE-EXTC',  name: 'Pinanshu Surve',        isLeader: false },
  { position: 'Deputy Secretary',             dept: 'TE-AI&DS', name: 'Aditya Biradar',        isLeader: false },
  { position: 'Treasurer',                    dept: 'BE-EXTC',  name: 'Nilesh Jangid',         isLeader: false },
  { position: 'Deputy Treasurer',             dept: 'TE-AI&DS', name: 'Yash Biranje',          isLeader: false },
  { position: 'Managing Head',                dept: 'BE-EXTC',  name: 'Sarvesh Sant',          isLeader: false },
  { position: 'Deputy Managing Head',         dept: 'TE-EXTC',  name: 'Dhruv Sharma',          isLeader: false },
  { position: 'Committee Coordinator',        dept: 'BE-EXTC',  name: 'Achintya Nagar',        isLeader: false },
  { position: 'Deputy Committee Coordinator', dept: 'TE-AI&DS', name: 'Aaditya Bobade',        isLeader: false },
  { position: 'Technical Head',               dept: 'BE-EXTC',  name: 'Saurabh Chavan',       isLeader: false },
  { position: 'Deputy Technical Head',        dept: 'TE-EXTC',  name: 'Sahil Gorivale',        isLeader: false },
  { position: 'Technical Advisor',            dept: 'TE-EXTC',  name: 'Sachin Chaudhary',      isLeader: false },
  { position: 'Publicity Head',               dept: 'BE-EXTC',  name: 'Aditi Bhat',            isLeader: false },
  { position: 'Deputy Publicity Head',        dept: 'TE-EXTC',  name: 'Hemant Jena',           isLeader: false },
  { position: 'Deputy Creative Head',         dept: 'TE-EXTC',  name: 'Sanket Das',            isLeader: false },
];

const events = [
  {
    title: 'Anveshan',
    icon: Cpu,
    accent: '#0056b3',
    tag: 'Product Showcase',
    paragraphs: [
      'Anveshan is a product showcase event organized by IEEE VCET SB. This event provides an opportunity for students to learn about technological advancements of products used in industrial organizations. The event witnesses enthusiastic participation from companies which use this platform to display their latest innovations, services, and products to illustrate the evolving landscape of industrial technologies.',
      'Anveshan fosters networking opportunities, enabling attendees to connect with businesses and industry professionals. The main objective is to enlighten upcoming engineers about recent technologies. It is a single-day event where representatives from companies demonstrate products and train students, who then explain these features to visitors.',
    ],
  },
  {
    title: 'VNPS (VCET National Level Project Showcase)',
    icon: Trophy,
    accent: '#ffb100',
    tag: 'National Competition',
    paragraphs: [
      'VNPS is an event organized by VCET in association with various departments and student committees including IEEE, ISA, CSI, IETE, VMEA, ISHRAE and IGBC. The primary objective is to foster a research-oriented culture and promote experiential learning through project-based initiatives. It provides a platform for aspiring technical students nationwide to showcase innovative projects and compete on a national level, fostering competitiveness and learning.',
    ],
  },
  {
    title: 'Oscillations',
    icon: Lightbulb,
    accent: '#0056b3',
    tag: 'Technical Paper',
    paragraphs: [
      'OSCILLATIONS is a technical paper presentation event annually organized by IEEE-SB and IETE-SF. The primary objective is to give due recognition to the inquisitiveness and creativity of students. It provides a platform for individuals to showcase their research skills and expertise, encouraging students to present innovative work in front of a knowledgeable audience.',
    ],
  },
  {
    title: 'Think Aloud',
    icon: BookOpen,
    accent: '#ffb100',
    tag: 'Group Discussion',
    paragraphs: [
      'THINK ALOUD is an event organized by VCET to promote academic excellence and enhance knowledge through engaging interdisciplinary discussions. It provides an inclusive platform for group discussions where students openly express thoughts in a formal setting. The event comprises a traditional group discussion round and an elimination round, augmenting communication and presentation skills.',
    ],
  },
  {
    title: 'Outreach Activity (STEM Workshop)',
    icon: Microscope,
    accent: '#0056b3',
    tag: 'STEM Outreach',
    paragraphs: [
      'STEM workshop is a step towards providing a platform for students to use technology for learning science concepts, enhancing analytical and logical thinking skills.',
    ],
    outcomes: [
      'Fosters ingenuity and creativity.',
      'Builds resilience.',
      'Encourages experiential learning and teamwork.',
      'Enhances knowledge application and problem-solving.',
    ],
  },
  {
    title: 'Industrial Visit',
    icon: Globe,
    accent: '#ffb100',
    tag: 'Industry Exposure',
    paragraphs: [
      'Industrial Visits serve to broaden understanding of classroom concepts and real-world implementations. It facilitates networking with researchers and provides insights into future opportunities for research. This immersive experience adds significant value to the students\' academic journey by strengthening their prospects in engineering and technology.',
    ],
  },
  {
    title: 'Seminars / Workshops / Hands-on Training',
    icon: Award,
    accent: '#0056b3',
    tag: 'Skill Building',
    paragraphs: [
      'VCET organizes various hands-on technical workshops like MATLAB, Verilog, Arduino etc., useful for training and developing technical skills. We also organize seminars and training programs hosted by experienced industry experts on latest technological advancements to upgrade students\' technological acumen.',
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
    <div ref={ref} className={`space-y-8 md:space-y-12 p-4 md:p-8 lg:p-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <SectionHeading title="About IEEE" subtitle="Institute of Electrical and Electronics Engineers" />

      {/* Hero text + QR */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
        <div className="lg:col-span-3 space-y-5 text-[#475569] leading-relaxed text-[15px]">
          <p>
            IEEE is the world's largest technical professional organization dedicated to advancing
            technology for the benefit of humanity. At VCET, our Student Branch fosters a vibrant
            community of innovators and engineers.
          </p>
          <p>
            We provide a platform for students to enhance their technical skills through workshops,
            seminars, and real-world project experiences. Join us in our journey of excellence,
            collaboration, and professional growth!
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {['MATLAB', 'Verilog', 'Arduino', 'IoT', 'Research'].map((tag) => (
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
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://www.instagram.com/ieee_vcet_sb"
                alt="Scan to follow IEEE VCET on Instagram"
                className="w-40 h-40 rounded-xl"
              />
              <div className="text-center">
                <p className="text-[11px] font-black text-[#1a2b4b] tracking-[0.25em] uppercase">Scan to Follow</p>
                <p className="text-[11px] text-[#94a3b8] mt-0.5">@ieee_vcet_sb</p>
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
   EVENT CARD
───────────────────────────────────────────── */
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

          {event.outcomes && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-[11px] font-black uppercase tracking-widest text-[#1a2b4b] mb-3">Expected Outcomes:</p>
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
  <div className="p-4 md:p-8 lg:p-12 space-y-8">
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
    { label: 'Anveshan 2024' },
    { label: 'VNPS 2024' },
    { label: 'Oscillations' },
    { label: 'Think Aloud' },
    { label: 'STEM Workshop' },
    { label: 'Industrial Visit' },
  ];

  return (
    <div ref={ref} className={`p-4 md:p-8 lg:p-12 space-y-8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
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
            <div className="w-10 h-10 bg-white/60 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <ImageIcon className="w-4 h-4 text-[#1a2b4b]/40" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#1a2b4b]/40 text-center px-2">{item.label}</p>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-[#94a3b8]">
        📸 Photos will be updated after each event. Follow us on Instagram{' '}
        <a
          href="https://www.instagram.com/ieee_vcet_sb"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0056b3] font-bold hover:underline"
        >
          @ieee_vcet_sb
        </a>
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
    <div ref={ref} className={`p-4 md:p-8 lg:p-12 space-y-8 md:space-y-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

      {/* Branch Counselor */}
      <div>
        <SectionHeading title="Branch Counselor" />
        <div className="flex justify-center">
          <div className="group relative bg-white rounded-3xl border border-slate-100 shadow-lg p-8 text-center max-w-sm w-full hover:shadow-xl transition-all duration-400 overflow-hidden">
            {/* Background accent */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#1a2b4b]/5 to-transparent" />

            {/* Avatar */}
            <div className="relative mx-auto w-28 h-28 mb-5">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#1a2b4b] to-[#0056b3] flex items-center justify-center text-white font-black text-2xl border-4 border-white shadow-lg">
                SJ
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#ffb100] rounded-full flex items-center justify-center">
                <Award className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <h4 className="text-xl font-extrabold text-[#1a2b4b] mb-1">Dr. Sunayana Jadhav</h4>
            <p className="text-xs font-bold text-[#ffb100] uppercase tracking-widest mb-4">Branch Counselor</p>

            <div className="space-y-2.5">
              <a
                href="mailto:sunayana.jadhav@vcet.edu.in"
                className="flex items-center gap-3 text-sm text-[#64748b] hover:text-[#1a2b4b] justify-center group/link"
              >
                <div className="w-7 h-7 rounded-full bg-[#eff6ff] flex items-center justify-center flex-shrink-0 group-hover/link:bg-[#0056b3] transition-colors">
                  <Mail className="w-3.5 h-3.5 text-[#0056b3] group-hover/link:text-white transition-colors" />
                </div>
                sunayana.jadhav@vcet.edu.in
              </a>
              <div className="flex items-center gap-3 text-sm text-[#64748b] justify-center">
                <div className="w-7 h-7 rounded-full bg-[#fffbeb] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-3.5 h-3.5 text-[#ffb100]" />
                </div>
                9766715766
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Table */}
      <div>
        <SectionHeading title="Core Committee 2024-25" subtitle="Meet the dedicated team driving IEEE VCET Student Branch" />

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
                {teamMembers.map((m, i) => (
                  <tr
                    key={i}
                    className={`border-b border-slate-100 hover:bg-[#eff6ff]/60 transition-colors duration-200 ${
                      m.isLeader ? 'bg-[#fffbeb]/60' : 'bg-white'
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
    { icon: Users,  value: 150, suffix: '+', label: 'Student Members', delay: 0   },
    { icon: Award,  value: 20,  suffix: '+', label: 'Events Per Year',  delay: 100 },
    { icon: Zap,    value: 50,  suffix: '+', label: 'Papers Presented', delay: 200 },
    { icon: Cpu,    value: 10,  suffix: '+', label: 'Years of Legacy',  delay: 300 },
  ];

  return (
    <div
      ref={ref}
      className="relative bg-[#1a2b4b] py-8 md:py-16 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)',
        backgroundSize: '32px 32px',
      }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ffb100]/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ffb100]/30 to-transparent" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <p className="text-center text-xs font-black uppercase tracking-[0.3em] text-[#ffb100] mb-8">IEEE VCET By The Numbers</p>
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
   CUSTOM FOOTER
───────────────────────────────────────────── */


/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const IEEE: React.FC = () => {
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
        document.getElementById('ieee-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  };

  return (
    <PageLayout>
      <PageBanner
        title="IEEE Student Branch"
        subtitle="Empowering students and nurturing essential professional skills through technological innovation and excellence."
        breadcrumbs={[
          { label: 'IEEE' },
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
                  {/* Nav items — horizontal scroll on mobile, vertical on desktop */}
                  <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible gap-0 lg:p-2 lg:space-y-1 no-scrollbar">
                    {tabs.map((tab) => {
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => handleTabChange(tab.id)}
                          className={`w-full lg:w-auto flex-shrink-0 text-left flex items-center gap-1.5 lg:gap-3.5 px-2.5 py-2 lg:py-3.5 transition-all duration-250 group relative min-h-[40px] ${
                            isActive
                              ? 'bg-[#1a2b4b] text-white shadow-md'
                              : 'text-[#475569] hover:bg-slate-50 hover:text-[#1a2b4b]'
                          }`}
                        >
                          {/* Active indicator */}
                          {isActive && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-7 w-1 bg-[#ffb100]" />
                          )}

                          {/* Icon */}
                          <div className={`w-9 h-9 flex items-center justify-center flex-shrink-0 transition-colors ${
                            isActive ? 'bg-white/10' : 'bg-slate-100 group-hover:bg-[#1a2b4b]/8'
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

                          <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 transition-all ${
                            isActive ? 'text-[#ffb100] translate-x-0.5' : 'text-slate-300 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                          }`} />
                        </button>
                      );
                    })}
                  </div>
                </nav>

                {/* IEEE Quick Facts card */}
                <div className="hidden lg:block bg-gradient-to-br from-[#1a2b4b] to-[#0056b3] p-6 text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -mr-10 -mt-10" />
                  <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-[#ffb100]/10 -ml-6 -mb-6" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-8 h-8 bg-[#ffb100] rounded-lg flex items-center justify-center">
                        <Zap className="w-4 h-4 text-[#1a2b4b]" />
                      </div>
                      <h5 className="text-sm font-extrabold text-[#ffb100]">IEEE Highlights</h5>
                    </div>

                    <div className="space-y-4">
                      {[
                        { icon: Users,  val: '150+', label: 'Members' },
                        { icon: Award,  val: '20+',  label: 'Events / Year' },
                        { icon: Trophy, val: '50+',  label: 'Papers' },
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
                        Advancing technology for<br />the benefit of humanity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Content Panel */}
            <div
              id="ieee-content"
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

export default IEEE;
