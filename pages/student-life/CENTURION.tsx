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
  Facebook,
  Instagram,
  MapPin,
  Trophy,
  Layout,
  MessageSquare,
} from 'lucide-react';
import { getStudentCareerSection } from '../../services/studentCareer';
import { resolveUploadedAssetUrl } from '../../utils/uploadedAssets';

/* ─────────────────────────────────────────────
   TYPES & DATA
───────────────────────────────────────────── */
type TabId = 'about' | 'vision' | 'objective' | 'competition' | 'sponsors' | 'team' | 'contact' | 'gallery';
type CompetitionItem = { team: string; event: string; result: string };
type TeamMember = { name: string; position: string; subsystem: string };
type ContactItem = { name: string; phone: string };
type MediaItem = { img?: string };
type VideoItem = { title?: string; vid?: string };

const tabs: { id: TabId; label: string; icon: any; desc: string }[] = [
  { id: 'about', label: 'About', icon: Info, desc: 'Our story & mission' },
  { id: 'vision', label: 'Vision and Mission', icon: Eye, desc: 'Aims & future goals' },
  { id: 'objective', label: 'Objective', icon: Target, desc: 'Key focus areas' },
  { id: 'competition', label: 'About Competition', icon: Trophy, desc: 'Events & history' },
  { id: 'sponsors', label: 'Our Sponsors', icon: Award, desc: 'Our partners' },
  { id: 'team', label: 'Team', icon: Users2, desc: 'Meet the committee' },
  { id: 'contact', label: 'Contact', icon: MessageSquare, desc: 'Get in touch' },
  { id: 'gallery', label: 'Gallery', icon: ImageIcon, desc: 'Moments captured' },
];

const teamMembers = [
  { name: 'Omkar Hatkar', position: 'Team Captain', subsystem: 'Chassis' },
  { name: 'Akansha Kariya', position: 'Vice Captain', subsystem: 'Management' },
  { name: 'Omkar Gorule', position: 'Member', subsystem: 'Vehicle Dynamics' },
  { name: 'Rushabh Jadhav', position: 'Member', subsystem: 'Power Transmission' },
  { name: 'Heramb Shinde', position: 'Member', subsystem: 'Braking' },
  { name: 'Reuben Noronha', position: 'Member', subsystem: 'Power Transmission' },
  { name: 'Krupesh Bhoir', position: 'Member', subsystem: 'Electrical' },
  { name: 'Rohit Gorivale', position: 'Member', subsystem: 'Steering' },
  { name: 'Tanvi Kadam', position: 'Member', subsystem: 'Management' },
  { name: 'Dhruv Kotian', position: 'Member', subsystem: 'Power Transmission' },
  { name: 'Shravan Chaudhary', position: 'Member', subsystem: 'Chassis' },
  { name: 'Soorya Guddemane', position: 'Member', subsystem: 'Social Media Handling' },
  { name: 'Deep Patel', position: 'Member', subsystem: 'Driver' },
];

const fallbackCompetitionItems: CompetitionItem[] = [
  { team: 'Team Centurions 1.0', event: 'Quad Torc 2016', result: '8th Overall Rank' },
  { team: 'Team Centurions 2.0', event: 'QBDC 2018', result: '11th Rank Overall & 4th in Sales presentation' },
  { team: 'Team Centurions 3.0', event: 'QBDC 2020', result: '13th Overall Rank' },
  { team: 'Team Centurions 4.0', event: 'Quad Torc 2021', result: '5th Overall Rank' },
  { team: 'Team Centurions 5.0', event: 'Quad Torc 2022', result: '8th Overall Rank' },
  { team: 'Team Centurions 5.0', event: 'Quad Torc 2023', result: '9th Rank Overall, 4th in Business Plan Presentation' },
];

const fallbackContacts: ContactItem[] = [
  { name: 'Mr. Kamlesh Bachkar', phone: '+91 9890852702' },
  { name: 'Mr. Omkar Hatkar', phone: '+91 9764050936' },
  { name: 'Akansha Kariya', phone: '+91 7083975485' },
];

// Removed subsystems list as it wasn't in original

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
   COMPONENTS
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

const StatCard: React.FC<{ icon: any; value: number; suffix: string; label: string; delay: number; inView: boolean }> =
  ({ icon: Icon, value, suffix, label, delay, inView }) => {
    const count = useCountUp(value, inView, 1500);
    return (
      <div
        className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
        style={{ transitionDelay: `${delay}ms` }}
      >
        <div className="w-12 h-12 rounded-xl bg-[#ffb100]/20 flex items-center justify-center mb-4 text-[#ffb100]">
          <Icon className="w-5 h-5" />
        </div>
        <p className="text-3xl font-extrabold text-white tabular-nums">
          {count}{suffix}
        </p>
        <p className="text-xs font-bold uppercase tracking-widest text-white/50 mt-1">{label}</p>
      </div>
    );
  };

const StatsBanner: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, 0.2);

  const stats = [
    { icon: Calendar, value: 6, suffix: '+', label: 'Years of Legacy', delay: 0 },
    { icon: Zap, value: 5, suffix: '+', label: 'Built Vehicles', delay: 100 },
    { icon: Users, value: 120, suffix: '+', label: 'Team Members', delay: 200 },
    { icon: Trophy, value: 15, suffix: '+', label: 'National Events', delay: 300 },
  ];

  return (
    <div ref={ref} className="relative bg-[#1a2b4b] py-16 px-6 overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)',
        backgroundSize: '32px 32px',
      }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ffb100]/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ffb100]/30 to-transparent" />
      <div className="container mx-auto max-w-4xl relative z-10">
        <p className="text-center text-xs font-black uppercase tracking-[0.3em] text-[#ffb100] mb-8 italic">Centurion By The Numbers</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => <StatCard key={i} {...s} inView={inView} />)}
        </div>
      </div>
    </div>
  );
};

const AboutPanel: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  return (
    <div ref={ref} className={`space-y-12 p-8 lg:p-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <SectionHeading title="About" />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
        <div className="lg:col-span-3 space-y-5 text-[#475569] leading-relaxed text-[15px]">
          <p>
            Team Centurions is one of the seasoned teams of VCET involved in the design and manufacturing of an ATV quad bike. For the past 6 years, the team has been producing vehicles that personify power and agility simultaneously. Fueled by an innate hunger to be better than before, the team has been consistently improving throughout the years by testing their mettle (and metal) in national level competitions.
          </p>
          <p>
            Team Centurions provides a platform for enthusiastic students from different branches who strive to uphold hard work, dedication, and teamwork to help solve various problems and learn through them during design, manufacturing, testing and presentation. This is a suitable and rich environment for members to grow and develop as engineers.
          </p>
        </div>

        <div className="lg:col-span-2 flex justify-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#ffb100]/20 to-[#0056b3]/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
            <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-slate-100 flex flex-col items-center gap-4">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://www.instagram.com/team_centurions"
                alt="Scan to follow Team Centurions"
                className="w-40 h-40 rounded-xl"
              />
              <div className="text-center">
                <p className="text-[11px] font-black text-[#1a2b4b] tracking-[0.25em] uppercase">Scan to Follow</p>
                <p className="text-[11px] text-[#94a3b8] mt-0.5">@team_centurions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VisionPanel: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  return (
    <div ref={ref} className={`space-y-12 p-8 lg:p-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <SectionHeading title="Vision and Mission" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-400 hover:-translate-y-1">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#0056b3]" />
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-[#eff6ff]">
            <Eye className="w-5 h-5 text-[#0056b3]" />
          </div>
          <h4 className="text-lg font-extrabold text-[#1a2b4b] mb-3">Vision</h4>
          <p className="text-[#64748b] text-sm leading-relaxed">
            To provide a platform to budding automobile enthusiasts to showcase technical and professional skill at international competitions.
          </p>
        </div>
        <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-400 hover:-translate-y-1">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#b45309]" />
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-[#fffbeb]">
            <Target className="w-5 h-5 text-[#b45309]" />
          </div>
          <h4 className="text-lg font-extrabold text-[#1a2b4b] mb-3">Mission</h4>
          <ul className="list-disc list-inside ml-2 space-y-2 text-[#64748b] text-sm">
            <li>To continuously improve design that personifies power and agility.</li>
            <li>To test our mettle in various national level events.</li>
            <li>To nurture engineering professionalism with industry standards.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const ObjectivePanel: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  return (
    <div ref={ref} className={`space-y-12 p-8 lg:p-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <SectionHeading title="Objective" />
      <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
        <ul className="list-disc list-inside ml-2 space-y-3 text-[#64748b] text-[15px] leading-relaxed">
          <li>To fabricate the vehicle in the most possible economic manner.</li>
          <li>To understand the variance in theoretical and practical knowledge and its implementation in actual practice.</li>
          <li>To design a safe, functional, and value-added vehicle each year.</li>
        </ul>
      </div>
    </div>
  );
};

const CompetitionPanel: React.FC<{ items: CompetitionItem[] }> = ({ items }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  return (
    <div ref={ref} className={`p-8 lg:p-12 space-y-10 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <SectionHeading title="About Competition" />
      <div className="space-y-6">
        <p className="text-[#475569] leading-relaxed">
          Quad Bike Design Challenge (QBDC) organized by fraternity of mechanical and automobile engineers (FMAE) and quad torque organized by Indian Society of New Era Engineers (ISNEE) are student level off-road ATV bike design challenges. These events require participants to design and fabricate an ATV with strong technical capability. Reputed industries from across the nation send delegates and experts to evaluate teams.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="p-4 text-xs font-black uppercase tracking-widest text-[#1a2b4b]/60">Team</th>
                <th className="p-4 text-xs font-black uppercase tracking-widest text-[#1a2b4b]/60">Event</th>
                <th className="p-4 text-xs font-black uppercase tracking-widest text-[#1a2b4b]/60">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {items.map(({ team: t, event: e, result: r }, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 text-sm font-bold text-[#1a2b4b]">{t}</td>
                  <td className="p-4 text-sm text-[#64748b]">{e}</td>
                  <td className="p-4 text-sm font-semibold text-blue-700">{r}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const TeamPanel: React.FC<{ faculty: Record<string, any>; team: TeamMember[] }> = ({ faculty, team }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  return (
    <div ref={ref} className={`p-8 lg:p-12 space-y-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

      {/* Faculty In Charge */}
      <div>
        <SectionHeading title="Faculty In Charge" />
        <div className="flex flex-col md:flex-row items-center gap-10 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
          <div className="relative group">
            <div className="absolute inset-0 bg-[#082b64]/5 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500" />
            <div className="relative w-48 h-56 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-slate-100">
              {faculty.fImg ? (
                <img
                  src={faculty.fImg}
                  alt={faculty.fName || 'Faculty Incharge'}
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
          </div>
          <div className="space-y-4 text-center md:text-left">
            <div>
              <h4 className="text-2xl font-extrabold text-[#082b64]">{faculty.fName || 'Mr. Kamlesh Bachkar'}</h4>
              <p className="text-[#ffb100] font-black uppercase tracking-widest text-xs mt-1">SAE Incharge</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 justify-center md:justify-start text-[#475569]">
                <div className="w-8 h-8 rounded-full bg-[#eaf3ff] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-[#082b64]" />
                </div>
                <p className="text-sm font-medium">{faculty.fMail || 'kamlesh.bachkar@vcet.edu.in'}</p>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-start text-[#475569]">
                <div className="w-8 h-8 rounded-full bg-[#fff8e7] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-[#ffb100]" />
                </div>
                <p className="text-sm font-medium">{faculty.fPhone || '+919890852702'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <SectionHeading title="Team Centurian 5.0 :" />
        <div className="overflow-x-auto rounded-xl border border-slate-100 shadow-sm">
          <table className="w-full text-left bg-white">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="p-4 text-xs font-black uppercase tracking-widest text-[#1a2b4b]/60">Team Members</th>
                <th className="p-4 text-xs font-black uppercase tracking-widest text-[#1a2b4b]/60">Position</th>
                <th className="p-4 text-xs font-black uppercase tracking-widest text-[#1a2b4b]/60">Subsystem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {team.map((member, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}>
                  <td className="p-4 text-sm font-bold text-[#1a2b4b]">{member.name}</td>
                  <td className="p-4 text-sm text-[#64748b]">{member.position}</td>
                  <td className="p-4 text-sm text-[#64748b]">{member.subsystem}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const GalleryPanel: React.FC<{ videos: VideoItem[]; gallery: MediaItem[] }> = ({ videos, gallery }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  const videoLinks = videos
    .map((item) => (item.vid && item.vid.trim() ? item.vid : ''))
    .filter(Boolean);
  return (
    <div ref={ref} className={`p-8 lg:p-12 space-y-8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <SectionHeading title="Event Videos" />
      <div className="space-y-3">
        {videoLinks.map((link, i) => (
          <div key={i} className="flex items-start gap-3 text-[#475569]">
            <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Zap className="w-3 h-3 text-green-600 fill-green-600" />
            </div>
            <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-blue-600 hover:underline break-all">
              {link}
            </a>
          </div>
        ))}
        {videoLinks.length === 0 && <p className="text-sm text-[#64748b]">No videos available.</p>}
      </div>

      <SectionHeading title="Gallery" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {gallery.map((item, i) => (
          <div key={i} className="rounded-2xl overflow-hidden aspect-video border border-slate-100 shadow-sm bg-slate-50">
            <img
              src={resolveUploadedAssetUrl(item.img) || ''}
              alt={`Centurion Gallery ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {gallery.length === 0 && (
          <p className="text-sm text-[#64748b]">No gallery images available.</p>
        )}
      </div>
    </div>
  );
};

const ContactPanel: React.FC<{ contacts: ContactItem[]; email: string; insta: string; facebook: string }> = ({ contacts, email, insta, facebook }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  return (
    <div ref={ref} className={`p-8 lg:p-12 space-y-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <div>
        <SectionHeading title="Address" />
        <div className="space-y-6">
          <p className="text-[#475569] text-[15px] leading-relaxed max-w-2xl text-center md:text-left">
            Vidyavardhini's College of Engineering and Technology (VCET) K.T. Marg Vasai West. 401202
          </p>
          <div className="flex flex-col items-center md:items-end gap-3 mt-4">
            <div className="flex items-center gap-3 text-[#1a2b4b]/60">
              <Mail className="w-4 h-4" />
              <p className="text-sm font-medium">{email || 'teamcenturionsvcet@gmail.com'}</p>
            </div>
            <div className="flex items-center gap-3 text-[#1a2b4b]/60">
              <Instagram className="w-4 h-4" />
              <p className="text-sm font-medium">{insta || 'team_centurions'}</p>
            </div>
            <div className="flex items-center gap-3 text-[#1a2b4b]/60">
              <Facebook className="w-4 h-4" />
              <p className="text-sm font-medium">{facebook || 'TeamCenturions'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-slate-50">
        {contacts.map((p, i) => (
          <div key={i} className="space-y-1 text-center md:text-left">
            <h5 className="text-sm font-bold text-[#1a2b4b]">{p.name}</h5>
            <p className="text-xs text-[#94a3b8]">{p.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const SponsorsPanel: React.FC<{ logos: MediaItem[]; sponsorText: string }> = ({ logos, sponsorText }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  const sponsors = logos
    .map((item) => item.img)
    .filter((img): img is string => !!img);
  return (
    <div ref={ref} className={`p-8 lg:p-12 space-y-10 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <SectionHeading title="Our Sponsors" />
      {sponsorText ? <p className="text-[#64748b] text-sm">{sponsorText}</p> : null}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {sponsors.map((sponsor, i) => (
          <div key={i} className="aspect-square rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden">
            <img
              src={resolveUploadedAssetUrl(sponsor) || ''}
              alt={`Sponsor ${i + 1}`}
              className="w-full h-full object-contain p-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const CenturionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('about');
  const [apiData, setApiData] = useState<Record<string, any> | null>(null);
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    getStudentCareerSection<Record<string, any>>('centurion')
      .then((res) => {
        if (mounted) setApiData(res);
      })
      .catch(() => {
        if (mounted) setApiData(null);
      })
      .finally(() => {
        if (mounted) setApiLoaded(true);
      });
    return () => {
      mounted = false;
    };
  }, []);

    const competitionItems: CompetitionItem[] = Array.isArray(apiData?.results)
    ? apiData.results
        .map((item: Record<string, unknown>) => ({
          team: String(item.team ?? ''),
          event: String(item.event ?? ''),
          result: String(item.result ?? ''),
        }))
        .filter((item: CompetitionItem) => item.team || item.event || item.result)
    : fallbackCompetitionItems;

  const team: TeamMember[] = Array.isArray(apiData?.team)
    ? apiData.team
        .map((item: Record<string, unknown>) => ({
          name: String(item.name ?? ''),
          position: String(item.pos ?? ''),
          subsystem: String(item.sub ?? ''),
        }))
        .filter((item: TeamMember) => item.name || item.position || item.subsystem)
    : teamMembers;

  const faculty = {
    fName: String(apiData?.fName ?? ''),
    fMail: String(apiData?.fMail ?? ''),
    fPhone: String(apiData?.fPhone ?? ''),
    // Backward compatibility: older payloads saved advisor image under imageUrl.
    fImg: resolveUploadedAssetUrl(apiData?.fImg ?? apiData?.imageUrl),
  };

  const contacts: ContactItem[] = Array.isArray(apiData?.contacts)
    ? apiData.contacts
        .map((item: Record<string, unknown>) => ({
          name: String(item.name ?? ''),
          phone: String(item.phone ?? ''),
        }))
        .filter((item: ContactItem) => item.name || item.phone)
    : fallbackContacts;

  const logos: MediaItem[] = Array.isArray(apiData?.logos) ? apiData.logos : [];
  const gallery: MediaItem[] = Array.isArray(apiData?.gallery) ? apiData.gallery : [];
  const videos: VideoItem[] = Array.isArray(apiData?.videos) ? apiData.videos : [];
  const sponsorText = String(apiData?.sponsorText ?? '');
  const email = String(apiData?.email ?? '');
  const insta = String(apiData?.insta ?? '');
  const facebook = String(apiData?.facebook ?? '');

  const handleTabChange = (id: TabId) => {
    setActiveTab(id);
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        document.getElementById('centurion-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  };

        if (!apiLoaded) {
  return (
  <PageLayout>
  <PageBanner
  title="CENTURION"
  subtitle="Vidyavardhini's College of Engineering and Technology's premier off-road mechanical design and manufacturing team."
  breadcrumbs={[
  { label: 'Students Club', href: '/students-club' },
  { label: 'CENTURION' }
  ]}
  />
  <section className="py-16 bg-white">
  <div className="container mx-auto px-4 sm:px-6 text-center text-slate-500">Loading content...</div>
  </section>
  </PageLayout>
  );
  }

return (
    <PageLayout>
      <PageBanner
        title="CENTURION"
        subtitle="Vidyavardhini's College of Engineering and Technology's premier off-road mechanical design and manufacturing team."
        breadcrumbs={[
          { label: 'Students Club', href: '/students-club' },
          { label: 'CENTURION' }
        ]}
      />

      <StatsBanner />

      <section className="py-16 md:py-24 bg-[#f8fafc]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-10">
            <aside className="lg:col-span-1">
              <div className="sticky top-28 space-y-4">
                <nav className="bg-white border border-slate-200 shadow-sm overflow-hidden rounded-xl">
                  <div className="px-5 py-4 border-b border-slate-100 bg-[#1a2b4b]/3">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#1a2b4b]/50 italic">Navigation</p>
                  </div>
                  <div className="p-2 space-y-1">
                    {tabs.map((tab) => {
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => handleTabChange(tab.id)}
                          className={`w-full text-left flex items-center gap-3.5 px-4 py-3.5 transition-all duration-250 group relative ${isActive ? 'bg-[#1a2b4b] text-white shadow-md' : 'text-[#475569] hover:bg-slate-50 hover:text-[#1a2b4b]'
                            }`}
                        >
                          {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-7 w-1 bg-[#ffb100]" />}
                          <div className={`w-9 h-9 flex items-center justify-center flex-shrink-0 transition-colors ${isActive ? 'bg-white/10' : 'bg-slate-100'}`}>
                            <tab.icon className={`w-4 h-4 ${isActive ? 'text-[#ffb100]' : 'text-[#64748b]'}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-[13px] font-bold leading-tight ${isActive ? 'text-white' : 'text-[#1a2b4b]'}`}>{tab.label}</p>
                            <p className={`text-[10px] mt-0.5 ${isActive ? 'text-white/50' : 'text-[#94a3b8]'}`}>{tab.desc}</p>
                          </div>
                          <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 transition-all ${isActive ? 'text-[#ffb100]' : 'text-slate-300 opacity-0 group-hover:opacity-100'}`} />
                        </button>
                      );
                    })}
                  </div>
                </nav>

                {/* CENTURION Highlights card */}
                <div className="hidden lg:block bg-gradient-to-br from-[#1a2b4b] to-[#0056b3] p-6 text-white overflow-hidden relative rounded-2xl shadow-md">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -mr-10 -mt-10" />
                  <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-[#ffb100]/10 -ml-6 -mb-6" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-8 h-8 bg-[#ffb100] rounded-lg flex items-center justify-center">
                        <Zap className="w-4 h-4 text-[#1a2b4b]" />
                      </div>
                      <h5 className="text-sm font-extrabold text-[#ffb100]">CENTURION Highlights</h5>
                    </div>

                    <div className="space-y-4">
                      {[
                        { icon: Users, val: '120+', label: 'Team Members' },
                        { icon: Zap, val: '5+', label: 'Built Vehicles' },
                        { icon: Trophy, val: '15+', label: 'National Events' },
                        { icon: Calendar, val: '6+', label: 'Years of Legacy' },
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
                      <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-wider font-bold">
                        Racing towards excellence
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            <div id="centurion-content" className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden min-h-[500px]">
              {activeTab === 'about' && <AboutPanel />}
              {activeTab === 'vision' && <VisionPanel />}
              {activeTab === 'objective' && <ObjectivePanel />}
              {activeTab === 'competition' && <CompetitionPanel items={competitionItems} />}
              {activeTab === 'sponsors' && <SponsorsPanel logos={logos} sponsorText={sponsorText} />}
              {activeTab === 'team' && <TeamPanel faculty={faculty} team={team} />}
              {activeTab === 'gallery' && <GalleryPanel videos={videos} gallery={gallery} />}
              {activeTab === 'contact' && <ContactPanel contacts={contacts} email={email} insta={insta} facebook={facebook} />}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CenturionPage;
