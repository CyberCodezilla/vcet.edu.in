import React, { useEffect, useMemo, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import {
  FlaskConical, BookOpen, FileText, Award,
  Lightbulb, ArrowRight, GraduationCap, Users,
  Rocket, MessageSquare, Presentation, ShieldCheck, User,
} from 'lucide-react';
import { getResearchSection } from '../../services/research';
import { resolveUploadedAssetUrl } from '../../utils/uploadedAssets';

/* ── R&D Hub Spokes ── */
const defaultHubSpokes = [
  { icon: Rocket,        title: 'Project Initiation',       description: 'Providing the motivation for undergoing research projects and building awareness about the latest developments in various fields.' },
  { icon: MessageSquare, title: 'Industry & Peer Engagement', description: 'Facilitating interactive sessions with industry experts and managing communications for R&D networking.' },
  { icon: Presentation,  title: 'Showcasing Work',           description: 'Organizing project exhibitions and competitions and assisting with research presentations and publications.' },
  { icon: ShieldCheck,   title: 'Legal & Protection',        description: 'Handling the administrative side of intellectual property, specifically patents and copyrights.' },
];

/* ── Objectives ── */
const defaultObjectives = [
  'Motivate Faculty members to undergo research projects sponsored by agencies such as AICTE, DST, University of Mumbai, industries etc.',
  'Create awareness among students about research practices in different domains and related methodology.',
  'Guide faculty and students for publications of their research work in referred journals, renowned conferences, book chapters and IPR protection.',
  'Addition to the infrastructure of the institute through acquisition of modern equipment for research projects.',
];

/* ── Ph.D. Pursuing (37 total) ── */
const defaultPhdPursuing = [
  { dept: 'Mechanical Engineering',  count: 10 },
  { dept: 'Information Technology',  count: 5 },
  { dept: 'Computer Engineering',    count: 5 },
  { dept: 'First Year',             count: 5 },
  { dept: 'Electronics & Tele-Communication', count: 4 },
  { dept: 'CSEDS',                   count: 3 },
  { dept: 'AIDS',                    count: 2 },
  { dept: 'Civil Engineering',       count: 2 },
  { dept: 'MMS',                     count: 1 },
];
/* ── Ph.D. Holders (20 total) ── */
const defaultPhdHolders = [
  { dept: 'Computer Engineering',    count: 4 },
  { dept: 'Information Technology',  count: 4 },
  { dept: 'Mechanical Engineering',  count: 3 },
  { dept: 'Electronics & Tele-Communication', count: 3 },
  { dept: 'Civil Engineering',       count: 3 },
  { dept: 'First Year',             count: 2 },
  { dept: 'AIDS',                    count: 1 },
];
/* ── Quick Links ── */
const defaultQuickLinks = [
  { label: 'Funded Research',       href: '/funded-research',       icon: FlaskConical },
  { label: 'Publications',          href: '/publications',          icon: BookOpen },
  { label: 'Patents',               href: '/patents',               icon: Award },
  { label: 'Research Facilities',   href: '/research-facility',     icon: GraduationCap },
  { label: 'Research Conventions',  href: '/research-conventions',  icon: Users },
  { label: 'Research Policy',       href: '/research-policy',       icon: FileText },
];

const ResearchIntro: React.FC = () => {
  const [apiData, setApiData] = useState<any>(null);
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    getResearchSection<any>('research-intro')
      .then((res) => mounted && setApiData(res))
      .catch(() => mounted && setApiData(null))
      .finally(() => {
        if (mounted) setApiLoaded(true);
      });
    

return () => {
      mounted = false;
    };
  }, []);

    const hubSpokes = useMemo(() => {
    const cards = Array.isArray(apiData?.hubCards)
      ? apiData.hubCards
          .map((card: any, index: number) => ({
            icon: defaultHubSpokes[index % defaultHubSpokes.length]?.icon || Lightbulb,
            title: String(card?.title ?? '').trim(),
            description: String(card?.description ?? '').trim(),
          }))
          .filter((card: any) => card.title.length > 0 && card.description.length > 0)
      : [];
    return cards.length > 0 ? cards : defaultHubSpokes;
  }, [apiData]);

  const objectives = useMemo(() => {
    const rows = Array.isArray(apiData?.objectives)
      ? apiData.objectives.map((item: unknown) => String(item ?? '').trim()).filter(Boolean)
      : [];
    return rows.length > 0 ? rows : defaultObjectives;
  }, [apiData]);

  const phdPursuing = useMemo(() => {
    const rows = Array.isArray(apiData?.phdPursuing)
      ? apiData.phdPursuing
          .map((item: any) => ({
            dept: String(item?.department ?? '').trim(),
            count: Number.parseInt(String(item?.count ?? '0'), 10),
          }))
          .filter((item: any) => item.dept.length > 0 && Number.isFinite(item.count))
      : [];
    return rows.length > 0 ? rows : defaultPhdPursuing;
  }, [apiData]);

  const phdHolders = useMemo(() => {
    const rows = Array.isArray(apiData?.phdHolders)
      ? apiData.phdHolders
          .map((item: any) => ({
            dept: String(item?.department ?? '').trim(),
            count: Number.parseInt(String(item?.count ?? '0'), 10),
          }))
          .filter((item: any) => item.dept.length > 0 && Number.isFinite(item.count))
      : [];
    return rows.length > 0 ? rows : defaultPhdHolders;
  }, [apiData]);

  const phdPursuingTotal = phdPursuing.reduce((sum, row) => sum + row.count, 0);
  const phdHoldersTotal = phdHolders.reduce((sum, row) => sum + row.count, 0);
  const maxPursuing = Math.max(...phdPursuing.map(d => d.count), 1);
  const maxHolders  = Math.max(...phdHolders.map(d => d.count), 1);

  const quickLinks = useMemo(() => {
    const rows = Array.isArray(apiData?.quickLinks)
      ? apiData.quickLinks
          .map((item: any, index: number) => ({
            label: String(item?.label ?? item?.title ?? '').trim(),
            href: String(item?.url ?? '').trim(),
            icon: defaultQuickLinks[index % defaultQuickLinks.length]?.icon || FileText,
          }))
          .filter((item: any) => item.label.length > 0 && item.href.length > 0)
      : [];
    return rows.length > 0 ? rows : defaultQuickLinks;
  }, [apiData]);

  const dean = useMemo(() => {
    const source = apiData?.dean ?? {};
    return {
      name: String(source?.name ?? '').trim() || 'Dr. Ashish J. Chaudhari',
      designation: String(source?.designation ?? '').trim() || 'Associate Professor, Mechanical Engineering',
      researchInterest:
        String(source?.researchInterest ?? '').trim()
        || 'I.C. Engine Combustion, Novel VCR Mechanism, Renewable Fuels, Solar Energy Capture Using Natural Resources',
      image:
        resolveUploadedAssetUrl(source?.imageUrl ?? null)
        || '/images/Research/Introduction/Dr.-ASHISH-CHAUDHARI.jpg',
    };
  }, [apiData]);

        if (!apiLoaded) {
  return (
  <PageLayout>
  <PageBanner
  title="Research – Introduction"
  breadcrumbs={[
  { label: 'Research', href: '/research' },
  { label: 'Introduction' },
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
        title="Research – Introduction"
        breadcrumbs={[
          { label: 'Research', href: '/research' },
          { label: 'Introduction' },
        ]}
      />

      {/* ── Introduction ── */}
      <section className="py-10 md:py-20 lg:py-28 bg-white border-b border-[#E5E7EB]">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-16 items-start">
            <div className="reveal lg:col-span-3">
              <span className="inline-block text-[13px] md:text-[14px] font-bold uppercase tracking-[0.3em] text-[#fdb813] border-b-2 border-[#fdb813] pb-1 mb-4 md:mb-6">
                Research at VCET
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#1a4b7c] leading-[1.15] mb-4 md:mb-6 tracking-tight">
                Research &amp; Development
              </h2>
              <div className="w-16 h-[3px] bg-[#1a4b7c] mb-6" />
              <p className="text-[#1A1A1A]/70 leading-[1.85] mb-5 text-[17px]">
                Research is an integral part of the activities of Vidyavardhini's College of Engineering and Technology Vasai. The institute faculty and students carry out research in their domain area of interest across all academic departments. The faculty members actively conduct research projects sponsored by various government agencies and industries. The aim of these sponsored research is categorized in a wide spectrum from advancement of theoretical concepts till the development of new technologies to solve practical problems.
              </p>
              <p className="text-[#1A1A1A]/70 leading-[1.85] mb-5 text-[17px]">
                Sponsored research undertaken by faculty members has contributed in terms of knowledge improvement both theoretical and practical. It also helped to bring the academia closer to the industry. The sponsored research projects add infrastructure to research laboratories through acquisition of modern equipments. The undergraduate student groups got the facility of different research equipment and training of it which improves their skill, add on knowledge. The students of all academic programs are guided to participate in research conventions, competitions across country for improving presentation skill, interaction with fellow researchers and their work.
              </p>
              <p className="text-[#1A1A1A]/70 leading-[1.85] mb-8 text-[17px]">
                The outcome of research will be published further in the referred journals, renowned conferences, book chapters, intellectual property right by faculty members. The institute has collaboration with institutes of importance within country for research activities wherein faculty members are sponsored to undergo research work as a part of their Ph.D. thesis. The Research and Development Office is the wing of the Institute which facilitates, channelizes, records, and regulates as per the Institute rules for all activities.
              </p>
              <a
                href="/funded-research"
                className="inline-flex items-center gap-2 px-5 md:px-6 py-3 bg-[#1a4b7c] text-white text-[15px] md:text-[17px] font-semibold hover:bg-[#3a6fa8] transition-colors duration-300 min-h-[44px]"
              >
                Explore Our Research
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* DEAN – Research Card */}
            <div className="reveal lg:col-span-2" style={{ transitionDelay: '0.15s' }}>
              <div className="bg-white border border-[#E5E7EB] shadow-[4px_4px_0_#E5E7EB] overflow-hidden">
                {/* Top accent */}
                <div className="h-[3px] bg-[#1a4b7c]" />

                {/* Photo */}
                <div className="aspect-[4/3] bg-[#F7F9FC] border-b border-[#E5E7EB] flex items-center justify-center overflow-hidden">
                  <img 
                    src={dean.image} 
                    alt={dean.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="p-5">
                  <span className="inline-block text-[14px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 bg-[#fdb813] text-[#1a4b7c] mb-3">
                    DEAN – Research
                  </span>
                  <h3 className="font-display font-bold text-[#1a4b7c] text-lg leading-tight">{dean.name}</h3>
                  <p className="text-[17px] text-[#6B7280] mt-1">{dean.designation}</p>

                  <div className="mt-4 border-t border-dashed border-[#E5E7EB] pt-3">
                    <p className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#6B7280] mb-1.5">Research Interest</p>
                    <p className="text-[17px] text-[#1A1A1A]/70 leading-relaxed">
                      {dean.researchInterest}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── R&D Hub-and-Spoke Diagram ── */}
      <section className="py-10 md:py-20 bg-[#F7F9FC]">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
          <div className="reveal mb-8 md:mb-14">
            <span className="text-[13px] md:text-[14px] font-bold uppercase tracking-[0.3em] text-[#fdb813] border-b-2 border-[#fdb813] pb-1">R&D Office</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#1a4b7c] mt-3 md:mt-4 tracking-tight">
              Institute Research &amp; Development Office
            </h2>
            <p className="text-[15px] md:text-[17px] text-[#6B7280] mt-3 max-w-2xl leading-relaxed">
              The R&D Office uses a hub-and-spoke model where the central office supports various academic and professional activities.
            </p>
          </div>

          {/* Hub-and-spoke visual */}
          <div className="reveal relative flex flex-col items-center">
            {/* Central hub */}
            <div className="relative z-10 bg-[#1a4b7c] text-white px-8 py-5 text-center border border-[#1a4b7c] shadow-[4px_4px_0_#E5E7EB] mb-12">
              <Lightbulb className="w-6 h-6 text-[#fdb813] mx-auto mb-2" />
              <p className="font-display font-bold text-[17px] tracking-wide">Institute R&D Office</p>
              <p className="text-[14px] text-white/50 uppercase tracking-[0.15em] mt-1">Central Hub</p>
            </div>

            {/* Spokes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E5E7EB] w-full">
              {hubSpokes.map((spoke, idx) => (
                <div
                  key={spoke.title}
                  className="reveal group bg-white p-6 relative hover:bg-[#1a4b7c] transition-colors duration-500"
                  style={{ transitionDelay: `${idx * 0.06}s` }}
                >
                  {/* Connector line to hub */}
                  <div className="hidden lg:block absolute -top-12 left-1/2 w-px h-12 bg-[#E5E7EB]" />
                  <div className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-[#fdb813] shadow-[0_0_0_2px_rgba(253,184,19,0.2)]" />
                  <spoke.icon className="w-6 h-6 text-[#1a4b7c] mb-4 group-hover:text-[#fdb813] transition-colors duration-500" />
                  <h3 className="font-display font-bold text-[#1a4b7c] text-[17px] mb-2 group-hover:text-white transition-colors duration-500">{spoke.title}</h3>
                  <p className="text-[17px] text-[#6B7280] leading-relaxed group-hover:text-white/60 transition-colors duration-500">{spoke.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Objectives ── */}
      <section className="py-10 md:py-20 bg-white border-b border-[#E5E7EB]">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
          <div className="reveal mb-8 md:mb-12">
            <span className="text-[13px] md:text-[14px] font-bold uppercase tracking-[0.3em] text-[#fdb813] border-b-2 border-[#fdb813] pb-1">Goals</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#1a4b7c] mt-3 md:mt-4 tracking-tight">
              Objectives
            </h2>
          </div>

          <div className="space-y-0 border border-[#E5E7EB]">
            {objectives.map((obj, idx) => (
              <div
                key={idx}
                className="reveal flex items-start gap-4 px-6 py-5 bg-white border-b border-[#E5E7EB] last:border-b-0 hover:bg-[#F7F9FC] transition-colors"
                style={{ transitionDelay: `${idx * 0.06}s` }}
              >
                <span className="flex-shrink-0 w-7 h-7 border-2 border-[#fdb813] flex items-center justify-center text-[17px] font-bold text-[#1a4b7c]">
                  {idx + 1}
                </span>
                <p className="text-[17px] text-[#1A1A1A]/80 leading-[1.75]">{obj}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ── Ph.D. Charts ── */}
      <section className="py-10 md:py-20 bg-white border-b border-[#E5E7EB]">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">

            {/* Ph.D. Pursuing */}
            <div className="reveal">
              <span className="text-[13px] md:text-[14px] font-bold uppercase tracking-[0.3em] text-[#fdb813] border-b-2 border-[#fdb813] pb-1">Doctoral Research</span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-[#1a4b7c] mt-3 md:mt-4 tracking-tight">
                Faculty Pursuing Ph.D.
              </h3>
              <p className="text-[17px] text-[#6B7280] mt-2 mb-6">
                Total: <span className="font-bold text-[#1a4b7c]">{phdPursuingTotal}</span> faculty members
              </p>

              <div className="space-y-3">
                {phdPursuing.map((d) => (
                  <div key={d.dept} className="group">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[17px] text-[#1A1A1A]/80">{d.dept}</span>
                      <span className="text-[17px] font-mono font-bold text-[#1a4b7c]">{d.count}</span>
                    </div>
                    <div className="w-full h-5 bg-[#F7F9FC] border border-[#E5E7EB]">
                      <div
                        className="h-full bg-[#1a4b7c] group-hover:bg-[#3a6fa8] transition-colors"
                        style={{ width: `${(d.count / maxPursuing) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ph.D. Holders */}
            <div className="reveal" style={{ transitionDelay: '0.1s' }}>
              <span className="text-[13px] md:text-[14px] font-bold uppercase tracking-[0.3em] text-[#fdb813] border-b-2 border-[#fdb813] pb-1">Doctorate Strength</span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-[#1a4b7c] mt-3 md:mt-4 tracking-tight">
                Faculty with Ph.D.
              </h3>
              <p className="text-[17px] text-[#6B7280] mt-2 mb-6">
                Total: <span className="font-bold text-[#1a4b7c]">{phdHoldersTotal}</span> faculty members
              </p>

              <div className="space-y-3">
                {phdHolders.map((d) => (
                  <div key={d.dept} className="group">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[17px] text-[#1A1A1A]/80">{d.dept}</span>
                      <span className="text-[17px] font-mono font-bold text-[#1a4b7c]">{d.count}</span>
                    </div>
                    <div className="w-full h-5 bg-[#F7F9FC] border border-[#E5E7EB]">
                      <div
                        className="h-full bg-[#fdb813] group-hover:bg-[#fdb813]/80 transition-colors"
                        style={{ width: `${(d.count / maxHolders) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick Links — Index tabs ── */}
      <section className="py-10 md:py-20 bg-[#F7F9FC] border-t border-[#E5E7EB]">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
          <div className="reveal mb-8 md:mb-12">
            <span className="text-[13px] md:text-[14px] font-bold uppercase tracking-[0.3em] text-[#fdb813] border-b-2 border-[#fdb813] pb-1">Navigate</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#1a4b7c] mt-3 md:mt-4 tracking-tight">
              Explore Research Sections
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-[#E5E7EB]">
            {quickLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                className="reveal group flex items-center gap-4 p-5 bg-white border-b border-r border-[#E5E7EB] hover:bg-[#1a4b7c] transition-colors duration-300"
                style={{ transitionDelay: `${idx * 0.05}s` }}
              >
                <div className="w-8 h-8 border border-[#E5E7EB] flex items-center justify-center flex-shrink-0 group-hover:border-white/20 transition-colors">
                  <link.icon className="w-4 h-4 text-[#1a4b7c] group-hover:text-[#fdb813] transition-colors" />
                </div>
                <span className="font-display font-semibold text-[#1a4b7c] text-[17px] group-hover:text-white transition-colors">{link.label}</span>
                <ArrowRight className="w-4 h-4 text-[#E5E7EB] ml-auto group-hover:text-white/50 group-hover:translate-x-1 transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ResearchIntro;
