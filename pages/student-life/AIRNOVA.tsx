import React, { useEffect, useRef, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import {
  Award,
  Calendar,
  Check,
  ChevronRight,
  Eye,
  Image as ImageIcon,
  Info,
  Instagram,
  Linkedin,
  Mail,
  MessageSquare,
  Phone,
  Target,
  Trophy,
  Users,
  Users2,
  Zap,
} from 'lucide-react';
import { getStudentCareerSection } from '../../services/studentCareer';
import { resolveUploadedAssetUrl } from '../../utils/uploadedAssets';

type TabId = 'about' | 'vision' | 'objective' | 'competition' | 'sponsors' | 'team' | 'contact' | 'gallery';

type CompetitionItem = { event: string; result: string; project?: string; img?: string };
type TeamMember = { name: string; contact: string; position: string };
type ContactItem = { name: string; phone: string };
type MediaItem = { img?: string; cap?: string };

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

const fallbackCompetition: CompetitionItem[] = [
  { event: 'Aerodominator 7.0 (Virtual) 2020', result: '16th (AIR)', project: 'Vaayuvaidya' },
  { event: "MSSA's Interplanetary Aerial Systems Challenge 2021", result: 'Rank 21 Worldwide', project: 'Dhairya' },
];

const fallbackTeam: TeamMember[] = [
  { name: 'Rishabh Tripathi', contact: '9369744734', position: 'Captain' },
  { name: 'Prajjwal Vishwakarma', contact: '8108269351', position: 'Vice - Captain' },
  { name: 'Atharva Vaidya', contact: '7507094765', position: 'Team Manager' },
];

const fallbackContacts: ContactItem[] = [
  { name: 'Prof. Vishwas Palve', phone: '+91 9870300102' },
  { name: 'Ayush Panchal', phone: '+91 84229 89037' },
  { name: 'Aditya Patane', phone: '+91 88792 13394' },
];

function useInView(ref: React.RefObject<Element>, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

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

const AboutPanel: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  return (
    <div ref={ref} className={`space-y-8 p-8 lg:p-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <SectionHeading title="About" />
      <p className="text-[#475569] leading-relaxed text-[15px]">
        Team Airnova is the official Aeronautics & Aerospace team of Vidyavardhini&apos;s College of Engineering & Technology. The team works on RC Aircrafts, UAVs and space-tech concepts while preparing students for practical engineering and competitions.
      </p>
      <p className="text-[#475569] leading-relaxed text-[15px]">
        It provides a platform for students to design, manufacture and validate innovative aerial systems that align with current industrial developments.
      </p>
    </div>
  );
};

const VisionPanel: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  return (
    <div ref={ref} className={`space-y-10 p-8 lg:p-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <SectionHeading title="Vision and Mission" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-100 bg-white p-8">
          <h4 className="text-2xl font-extrabold text-[#1a2b4b] mb-4">Vision</h4>
          <p className="text-[#64748b] text-[15px] leading-relaxed">
            To build globally capable aerospace engineers who can solve real-world aerial mobility and aviation challenges.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-8">
          <h4 className="text-2xl font-extrabold text-[#1a2b4b] mb-4">Mission</h4>
          <p className="text-[#64748b] text-[15px] leading-relaxed">
            To research, design and prototype practical UAV and aircraft solutions through collaborative engineering.
          </p>
        </div>
      </div>
    </div>
  );
};

const ObjectivePanel: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  return (
    <div ref={ref} className={`space-y-8 p-8 lg:p-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <SectionHeading title="Objectives" />
      <ul className="space-y-4 text-[#64748b] text-[15px] leading-relaxed">
        <li className="flex items-start gap-3"><Check className="w-5 h-5 text-gray-500 mt-0.5" /> Design aerodynamically efficient and structurally optimized UAVs.</li>
        <li className="flex items-start gap-3"><Check className="w-5 h-5 text-gray-500 mt-0.5" /> Innovate new fabrication and testing methods for flight platforms.</li>
        <li className="flex items-start gap-3"><Check className="w-5 h-5 text-gray-500 mt-0.5" /> Build sustainable propulsion systems with reduced environmental impact.</li>
      </ul>
    </div>
  );
};

const CompetitionPanel: React.FC<{ items: CompetitionItem[] }> = ({ items }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  return (
    <div ref={ref} className={`p-8 lg:p-12 space-y-8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <SectionHeading title="About Competition" />
      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full text-left">
          <thead className="bg-[#f8fafc]">
            <tr>
              <th className="p-4 text-sm font-bold text-[#1a2b4b]">Event</th>
              <th className="p-4 text-sm font-bold text-[#1a2b4b]">Result</th>
              <th className="p-4 text-sm font-bold text-[#1a2b4b]">Project/Notes</th>
              <th className="p-4 text-sm font-bold text-[#1a2b4b]">Image</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {items.map((item, idx) => (
              <tr key={idx}>
                <td className="p-4 text-sm text-[#475569]">{item.event}</td>
                <td className="p-4 text-sm text-[#475569]">{item.result}</td>
                <td className="p-4 text-sm text-[#475569]">{item.project || '-'}</td>
                <td className="p-4">
                  {item.img ? <img src={resolveUploadedAssetUrl(item.img) || ''} alt={item.event} className="w-24 h-16 object-cover rounded-md border border-slate-200" /> : <span className="text-xs text-slate-400">-</span>}
                </td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan={4} className="p-6 text-sm text-slate-500 text-center">No competition data available.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SponsorsPanel: React.FC<{ logos: MediaItem[]; sponsorText: string }> = ({ logos, sponsorText }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  const sponsors = logos.map((item) => item.img).filter((img): img is string => !!img);
  return (
    <div ref={ref} className={`p-8 lg:p-12 space-y-8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <SectionHeading title="Our Sponsors" />
      {sponsorText ? <p className="text-[#64748b] text-sm">{sponsorText}</p> : null}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {sponsors.map((src, idx) => (
          <div key={idx} className="aspect-square rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden">
            <img src={resolveUploadedAssetUrl(src) || ''} alt={`Sponsor ${idx + 1}`} className="w-full h-full object-contain p-2" />
          </div>
        ))}
        {sponsors.length === 0 && <p className="text-sm text-[#64748b]">No sponsor logos available.</p>}
      </div>
    </div>
  );
};

const TeamPanel: React.FC<{ faculty: Record<string, string>; team: TeamMember[] }> = ({ faculty, team }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  return (
    <div ref={ref} className={`p-8 lg:p-12 space-y-10 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <SectionHeading title="Professional Team" />
      <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm flex flex-col md:flex-row gap-8">
        <div className="w-40 h-48 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
          {faculty.fImg ? <img src={faculty.fImg} alt={faculty.fName || 'Faculty Advisor'} className="w-full h-full object-cover" /> : null}
        </div>
        <div className="space-y-2">
          <h4 className="text-xl font-extrabold text-[#082b64]">{faculty.fName || 'Faculty Advisor'}</h4>
          {faculty.fMail ? <p className="text-sm text-[#475569] flex items-center gap-2"><Mail className="w-4 h-4" />{faculty.fMail}</p> : null}
          {faculty.fPhone ? <p className="text-sm text-[#475569] flex items-center gap-2"><Phone className="w-4 h-4" />{faculty.fPhone}</p> : null}
        </div>
      </div>
      <div className="overflow-x-auto rounded-xl border border-slate-100 shadow-sm">
        <table className="w-full text-left bg-white min-w-[600px]">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-4 text-xs font-black uppercase tracking-widest text-[#1a2b4b]/60">Sr. No.</th>
              <th className="p-4 text-xs font-black uppercase tracking-widest text-[#1a2b4b]/60">Name</th>
              <th className="p-4 text-xs font-black uppercase tracking-widest text-[#1a2b4b]/60">Contact</th>
              <th className="p-4 text-xs font-black uppercase tracking-widest text-[#1a2b4b]/60">Position</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {team.map((member, idx) => (
              <tr key={idx}>
                <td className="p-4 text-sm text-[#64748b]">{idx + 1}</td>
                <td className="p-4 text-sm font-bold text-[#1a2b4b]">{member.name}</td>
                <td className="p-4 text-sm text-[#64748b]">{member.contact}</td>
                <td className="p-4 text-sm text-[#64748b]">{member.position}</td>
              </tr>
            ))}
            {team.length === 0 && <tr><td colSpan={4} className="p-6 text-sm text-slate-500 text-center">No team data available.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const GalleryPanel: React.FC<{ gallery: MediaItem[] }> = ({ gallery }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  const images = gallery.map((item) => item.img).filter((img): img is string => !!img);
  return (
    <div ref={ref} className={`p-8 lg:p-12 space-y-8 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <SectionHeading title="Gallery" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((src, idx) => (
          <div key={idx} className="rounded-2xl overflow-hidden aspect-video border border-slate-100 shadow-sm">
            <img src={resolveUploadedAssetUrl(src) || ''} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
        {images.length === 0 && <p className="text-sm text-[#64748b]">No gallery images available.</p>}
      </div>
    </div>
  );
};

const ContactPanel: React.FC<{ contacts: ContactItem[]; email: string; insta: string; linkedin: string }> = ({ contacts, email, insta, linkedin }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  return (
    <div ref={ref} className={`p-8 lg:p-12 space-y-10 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <SectionHeading title="Contact Us" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          {contacts.map((c, idx) => (
            <div key={idx} className="space-y-1">
              <h5 className="text-sm font-bold text-[#1a2b4b]">{c.name}</h5>
              <p className="text-sm text-[#64748b]">{c.phone}</p>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          {email ? <a href={`mailto:${email}`} className="flex items-center gap-3 text-sm text-[#1a2b4b] hover:underline"><Mail className="w-5 h-5" />{email}</a> : null}
          {insta ? <a href={insta} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-[#1a2b4b] hover:underline"><Instagram className="w-5 h-5" />{insta}</a> : null}
          {linkedin ? <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-[#1a2b4b] hover:underline"><Linkedin className="w-5 h-5" />{linkedin}</a> : null}
        </div>
      </div>
    </div>
  );
};

const AirnovaPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('about');
  const [apiData, setApiData] = useState<Record<string, any> | null>(null);
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    getStudentCareerSection<Record<string, any>>('airnova')
      .then((res) => {
        if (mounted) setApiData(res);
      })
      .catch(() => {
        if (mounted) setApiData(null);
      })
      .finally(() => {
        if (mounted) setApiLoaded(true);
      });
    return () => { mounted = false; };
  }, []);

    const competitionItems: CompetitionItem[] = Array.isArray(apiData?.results)
    ? apiData.results
      .map((item: Record<string, unknown>) => ({
        event: String(item.event ?? ''),
        result: String(item.result ?? ''),
        project: String(item.project ?? ''),
        img: typeof item.img === 'string' ? item.img : '',
      }))
      .filter((item: CompetitionItem) => item.event || item.result || item.project || item.img)
    : fallbackCompetition;

  const team: TeamMember[] = Array.isArray(apiData?.team)
    ? apiData.team
      .map((item: Record<string, unknown>) => ({
        name: String(item.name ?? ''),
        contact: String(item.contact ?? ''),
        position: String(item.pos ?? ''),
      }))
      .filter((item: TeamMember) => item.name || item.contact || item.position)
    : fallbackTeam;

  const faculty = {
    fName: String(apiData?.fName ?? ''),
    fMail: String(apiData?.fMail ?? ''),
    fPhone: String(apiData?.fPhone ?? ''),
    // Backward compatibility: older payloads saved advisor image under imageUrl.
    fImg: resolveUploadedAssetUrl(apiData?.fImg ?? apiData?.imageUrl) || '',
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
  const sponsorText = String(apiData?.sponsorText ?? '');
  const email = String(apiData?.email ?? '');
  const insta = String(apiData?.insta ?? '');
  const linkedin = String(apiData?.linkedin ?? '');

  const handleTabChange = (id: TabId) => {
    setActiveTab(id);
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        document.getElementById('airnova-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  };

        if (!apiLoaded) {
  return (
  <PageLayout>
  <PageBanner
  title="AIRNOVA"
  subtitle="Vidyavardhini's College of Engineering and Technology's official Aeronautics & Aerospace team."
  breadcrumbs={[
  { label: 'Students Club', href: '/students-club' },
  { label: 'AIRNOVA' },
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
        title="AIRNOVA"
        subtitle="Vidyavardhini's College of Engineering and Technology's official Aeronautics & Aerospace team."
        breadcrumbs={[
          { label: 'Students Club', href: '/students-club' },
          { label: 'AIRNOVA' },
        ]}
      />

      <div className="relative bg-[#1a2b4b] py-16 px-6 overflow-hidden">
        <div className="container mx-auto max-w-4xl relative z-10">
          <p className="text-center text-xs font-black uppercase tracking-[0.3em] text-[#ffb100] mb-8 italic">Airnova By The Numbers</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[{ icon: Users, val: '150+', label: 'Team Members' }, { icon: Zap, val: '6+', label: 'Built Aircrafts' }, { icon: Trophy, val: '10+', label: 'National Events' }, { icon: Calendar, val: '5+', label: 'Years of Legacy' }].map(({ icon: Icon, val, label }) => (
              <div key={label} className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                <Icon className="w-5 h-5 text-[#ffb100] mb-2" />
                <p className="text-2xl font-extrabold text-white">{val}</p>
                <p className="text-xs font-bold uppercase tracking-wider text-white/60 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="py-16 md:py-24 bg-[#f8fafc]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-10">
            <aside className="lg:col-span-1">
              <div className="sticky top-28">
                <nav className="bg-white border border-slate-200 shadow-sm overflow-hidden rounded-xl">
                  <div className="px-5 py-4 border-b border-slate-100 bg-[#1a2b4b]/3">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#1a2b4b]/50 italic">Navigation</p>
                  </div>
                  <div className="p-2 space-y-1">
                    {tabs.map((tab) => {
                      const isActive = activeTab === tab.id;
                      return (
                        <button key={tab.id} onClick={() => handleTabChange(tab.id)} className={`w-full text-left flex items-center gap-3.5 px-4 py-3.5 transition-all ${isActive ? 'bg-[#1a2b4b] text-white' : 'text-[#475569] hover:bg-slate-50 hover:text-[#1a2b4b]'}`}>
                          <div className={`w-9 h-9 flex items-center justify-center ${isActive ? 'bg-white/10' : 'bg-slate-100'}`}>
                            <tab.icon className={`w-4 h-4 ${isActive ? 'text-[#ffb100]' : 'text-[#64748b]'}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-[13px] font-bold leading-tight ${isActive ? 'text-white' : 'text-[#1a2b4b]'}`}>{tab.label}</p>
                            <p className={`text-[10px] mt-0.5 ${isActive ? 'text-white/50' : 'text-[#94a3b8]'}`}>{tab.desc}</p>
                          </div>
                          <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-[#ffb100]' : 'text-slate-300'}`} />
                        </button>
                      );
                    })}
                  </div>
                </nav>
              </div>
            </aside>

            <div id="airnova-content" className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden min-h-[500px]">
              {activeTab === 'about' && <AboutPanel />}
              {activeTab === 'vision' && <VisionPanel />}
              {activeTab === 'objective' && <ObjectivePanel />}
              {activeTab === 'competition' && <CompetitionPanel items={competitionItems} />}
              {activeTab === 'sponsors' && <SponsorsPanel logos={logos} sponsorText={sponsorText} />}
              {activeTab === 'team' && <TeamPanel faculty={faculty} team={team} />}
              {activeTab === 'gallery' && <GalleryPanel gallery={gallery} />}
              {activeTab === 'contact' && <ContactPanel contacts={contacts} email={email} insta={insta} linkedin={linkedin} />}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AirnovaPage;
