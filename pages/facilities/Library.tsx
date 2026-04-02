import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Globe, Newspaper, Archive, Search, Bookmark, 
  MonitorSmartphone, Clock, Users, ShieldCheck, 
  FileText, Download, LayoutGrid, ChevronDown, Award, HardDrive,
  UserCheck, Image as ImageIcon, Briefcase, MapPin, Info
} from 'lucide-react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { getFacilitiesSection } from '../../services/facilities';
import { resolveUploadedAssetUrl } from '../../utils/uploadedAssets';

/* ═══════════════════════════════════════════════════════════════ */
/* ─── Design Tokens (Sharp & Academic) ───────────────────────── */
/* ═══════════════════════════════════════════════════════════════ */
const C = {
  navy: '#0B2C4A',
  navyDk: '#071d31',
  navyMd: '#0F3A5F',
  gold: '#D4A017',
  goldLt: '#F5CC5B',
  bgPage: '#eef3fa', // Supportive Service Blue
  cardBg: '#ffffff',
  border: 'rgba(11,44,74,0.12)',
  text: '#1a202c',
  serif: '"Playfair Display", serif',
  body: 'Cambria, Georgia, serif',
};

/* ─── Transitions ────────────────────────────────────────────── */
const T = {
  spring: { type: "spring", stiffness: 300, damping: 32 } as const,
  fade: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } as const
};

/* ═══════════════════════════════════════════════════════════════ */
/* ─── Shared Components ──────────────────────────────────────── */
/* ═══════════════════════════════════════════════════════════════ */

const SectionTitle: React.FC<{ title: string; subtitle?: string; tag?: string }> = ({ title, subtitle, tag }) => (
  <div className="mb-10 text-left border-b border-brand-navy/10 pb-8 relative">
    {tag && (
      <div className="inline-flex items-center gap-2 border border-brand-gold/70 bg-[#1b3f6b] px-6 py-2 rounded-none shadow-[0_10px_15px_-10px_rgba(0,0,0,0.5)] mb-6 [clip-path:polygon(0_0,100%_0,95%_50%,100%_100%,0_100%)]">
        <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-brand-gold">{tag}</span>
      </div>
    )}
    <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-2" style={{ fontFamily: C.serif }}>
      {title}
    </h2>
    <div className="w-16 h-[4px] bg-brand-gold absolute bottom-[-2px] left-0" />
    {subtitle && <p className="text-slate-500 mt-4 text-xl italic leading-relaxed" style={{ fontFamily: C.body }}>{subtitle}</p>}
  </div>
);

const CountUp: React.FC<{ end: string; suffix?: string }> = ({ end, suffix = "" }) => {
  const [val, setVal] = useState(0);
  const target = Math.floor(parseFloat(end.replace(/,/g, '')));
  
  useEffect(() => {
    let start = 0;
    const duration = 1.5;
    const increment = target / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setVal(target);
        clearInterval(timer);
      } else {
        setVal(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [target]);

  return <span className="tabular-nums">{val.toLocaleString()}{suffix}</span>;
};

/* ═══════════════════════════════════════════════════════════════ */
/* ─── Main Component ─────────────────────────────────────────── */
/* ═══════════════════════════════════════════════════════════════ */

const Library: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [apiData, setApiData] = useState<any>(null);
  const tabKeys = ['Overview', 'Resources', 'E-Resources', 'Facilities', 'Membership', 'Committee', 'Rules', 'Gallery'] as const;
  const contentStartRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    let mounted = true;
    getFacilitiesSection<any>('library')
      .then((res) => mounted && setApiData(res))
      .catch(() => mounted && setApiData(null));
    return () => {
      mounted = false;
    };
  }, []);

  const librarySections = Array.isArray(apiData?.librarySections)
    ? apiData.librarySections
        .map((item: any) => ({
          heading: String(item?.heading ?? '').trim(),
          paragraph: String(item?.paragraph ?? '').trim(),
        }))
        .filter((item: any) => item.heading.length > 0 || item.paragraph.length > 0)
    : [];

  const statsRows = Array.isArray(apiData?.stats)
    ? apiData.stats
        .map((item: any) => ({
          label: String(item?.label ?? '').trim(),
          val: String(item?.value ?? '').trim(),
        }))
        .filter((item: any) => item.label.length > 0 && item.val.length > 0)
    : [];

  const facilitiesRows = Array.isArray(apiData?.facilitiesList)
    ? apiData.facilitiesList.map((item: any) => String(item ?? '').trim()).filter(Boolean)
    : [];

  const membershipsRows = Array.isArray(apiData?.memberships)
    ? apiData.memberships.map((item: any) => String(item ?? '').trim()).filter(Boolean)
    : [];

  const rulesRows = Array.isArray(apiData?.rules)
    ? apiData.rules.map((item: any) => String(item ?? '').trim()).filter(Boolean)
    : [];

  const contact = {
    phone: String(apiData?.contact?.phone ?? '').trim(),
    email: String(apiData?.contact?.email ?? '').trim(),
    address: String(apiData?.contact?.address ?? '').trim(),
  };

  const tabs = Array.isArray(apiData?.tabs)
    ? apiData.tabs
        .map((item: any) => String(item?.label ?? '').trim())
        .filter(Boolean)
        .slice(0, 10)
    : [];

  const displayTabs = tabKeys.map((key, idx) => ({
    key,
    label: tabs[idx] || key,
  }));

  const committeeRows = Array.isArray(apiData?.committee)
    ? apiData.committee
        .map((item: any) => ({
          name: String(item?.name ?? '').trim(),
          role: String(item?.role ?? '').trim(),
          sub: String(item?.sub ?? '').trim(),
        }))
        .filter((item: any) => item.name.length > 0 && item.role.length > 0)
    : [];

  const galleryRows = Array.isArray(apiData?.gallery)
    ? apiData.gallery
        .map((item: any, idx: number) => ({
          label: String(item?.label ?? '').trim() || `Library Gallery ${idx + 1}`,
          imageUrl: resolveUploadedAssetUrl(item?.imageUrl ?? null),
        }))
        .filter((item: any) => !!item.imageUrl)
    : [];

  // Scroll logic for tab navigation
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    if (activeTab === 'Overview') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (contentStartRef.current) {
      const yOffset = -100; // Adjust for sticky header height
      const y = contentStartRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [activeTab]);

  return (
    <PageLayout>
      <PageBanner
        title="Central Library"
        subtitle="Knowledge Resource Centre"
        breadcrumbs={[{ label: 'Facilities' }, { label: 'Library' }]}
      />

      <div ref={contentStartRef} className="flex flex-col lg:flex-row min-h-screen bg-[#eef3fa] relative">
        {/* ── 2. Side Navigation (Vertical Ribbon Style) ── */}
        <aside className="w-full lg:w-72 bg-[#102a4c] border-b lg:border-b-0 lg:border-r border-brand-gold/30 lg:sticky lg:top-[80px] lg:h-[calc(100vh-80px)] z-[40] shadow-2xl overflow-y-auto no-scrollbar">
          <div className="p-6 lg:p-10 flex flex-col gap-2">
            <div className="mb-8 hidden lg:block">
              <h3 className="text-brand-gold text-[10px] font-extrabold uppercase tracking-[0.3em] mb-2">Section Menu</h3>
              <div className="w-10 h-1 bg-brand-gold" />
            </div>
            
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible no-scrollbar gap-2">
              {displayTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative px-6 py-4 text-[11px] font-extrabold uppercase tracking-[0.15em] transition-all duration-300 min-w-max lg:min-w-0 text-left group ${
                    activeTab === tab.key ? 'text-brand-gold' : 'text-white/60 hover:text-white'
                  }`}
                  style={{ fontFamily: C.body }}
                >
                  <div 
                    className={`absolute inset-0 transition-all duration-500 z-0 ${
                      activeTab === tab.key 
                        ? 'bg-white/10 opacity-100 border-l-4 border-l-brand-gold shadow-inner' 
                        : 'bg-white/0 opacity-0 group-hover:opacity-100 group-hover:bg-white/05 border-l-4 border-l-transparent group-hover:border-l-brand-gold/30'
                    }`}
                  />
                   
                  {activeTab === tab.key && (
                    <motion.div 
                      layoutId="libraryTabVerticalInd" 
                      className="absolute left-0 top-0 bottom-0 w-1 bg-brand-gold z-20" 
                      transition={T.spring}
                    />
                  )}
                   
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ── 3. Content Area ── */}
        <main className="flex-1 relative min-h-[800px] py-16 bg-[#eef3fa]" style={{ color: C.text }}>
          {/* Ambient Decorative Orbs */}
          <div className="pointer-events-none absolute top-10 right-10 z-0 h-64 w-64 border border-brand-gold/30 bg-brand-gold/05 rounded-full" />
          <div className="pointer-events-none absolute bottom-1/4 left-5 z-0 h-96 w-96 border border-brand-blue/15 bg-brand-blue/03 rounded-full" />

          <div className="container mx-auto px-4 lg:px-12 max-w-5xl relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={T.fade}
              >
              
              {/* --- TAB: OVERVIEW --- */}
              {activeTab === 'Overview' && (
                <div className="relative">
                   <div className="bg-white border border-slate-200 p-8 md:p-12 rounded-[2.5rem] shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-full opacity-[0.01] pointer-events-none" style={{ backgroundImage: `radial-gradient(at 0% 0%, ${C.navy} 0, transparent 50%), radial-gradient(at 100% 100%, ${C.gold} 0, transparent 50%)` }} />
                      
                      {/* Institutional Watermark Seal */}
                      <div className="absolute bottom-10 right-10 opacity-[0.02] pointer-events-none select-none">
                         <BookOpen size={300} className="text-brand-navy" strokeWidth={0.5} />
                      </div>

                      <SectionTitle 
                        title="Institutional Timing Hub" 
                        subtitle="Official academic access hours and service schedule" 
                        tag="Operational Hours" 
                      />
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
                        {librarySections.slice(0, 2).map((section, idx) => (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -2 }}
                            transition={{ 
                               delay: 0.1 * (idx + 1),
                               duration: 0.6,
                               ease: [0.22, 1, 0.36, 1] 
                            }}
                            className={`bg-white border border-slate-200 border-l-8 ${idx === 0 ? 'border-l-brand-navy' : 'border-l-brand-gold'} shadow-sm relative overflow-hidden group`}
                          >
                             <div className="p-8">
                                <div className="mb-6">
                                   <h3 className="text-2xl font-bold text-brand-navy uppercase tracking-tight" style={{ fontFamily: C.serif }}>{section.heading}</h3>
                                   <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">{idx === 0 ? 'Academic Study Space' : 'Home Issue Counter'}</p>
                                </div>

                                <div className="space-y-4 border-t border-slate-100 pt-6">
                                   <div className="flex flex-col gap-2 group/time">
                                      <span className="text-lg font-bold text-brand-navy" style={{ fontFamily: C.serif }}>{section.paragraph}</span>
                                   </div>
                                   <div className={`bg-slate-50 p-4 border-l-2 ${idx === 0 ? 'border-brand-gold' : 'border-brand-navy'} italic text-sm text-slate-500`}>
                                      {idx === 0 
                                        ? 'Access to quiet study zones and digital repository connection.'
                                        : 'Book returns, renewals, and new membership inquiries.'}
                                   </div>
                                </div>
                             </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Operational Notice */}
                      <motion.div 
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.4, duration: 0.6 }}
                         whileHover={{ y: -2, transition: { duration: 0.2 } }}
                         className="mt-12 border border-brand-gold bg-[#102a4c] p-4 md:p-5 flex items-center gap-4 relative z-10 shadow-xl max-w-2xl mx-auto"
                      >
                         <div className="w-10 h-10 bg-white/10 text-brand-gold flex items-center justify-center shrink-0 border border-brand-gold/30">
                            <Info size={22} />
                         </div>
                         <p className="text-white text-base md:text-lg font-bold tracking-tight" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                            * Closed on <span className="text-brand-gold">Sunday</span> and <span className="text-brand-gold">University declared holidays.</span>
                         </p>
                      </motion.div>
                   </div>
                </div>
              )}

              {/* --- TAB: RESOURCES --- */}
              {activeTab === 'Resources' && (
                <div className="relative">
                   <div className="bg-[#f7fbff] border border-brand-blue/20 p-8 md:p-12 rounded-none shadow-[0_14px_30px_-24px_rgba(10,32,66,0.55)] relative overflow-hidden">
                    <div className="pointer-events-none absolute -bottom-20 -right-20 z-0 h-80 w-80 border border-brand-gold/20 bg-brand-gold/05 rounded-full" />
                    <SectionTitle 
                      title="Library Resource Inventory" 
                      subtitle="Comprehensive tracking of physical and digital academic assets" 
                      tag="Collection Summary" 
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 relative z-10">
                        {(statsRows.length > 0 ? statsRows : [
                          { label: "Total Library Books", val: "33979" },
                          { label: "Reference Books", val: "12348" },
                          { label: "E-books (Pearson)", val: "97" },
                          { label: "E-Journals Portfolio", val: "275" },
                        ]).map((stat, i) => (
                         <motion.div 
                           key={i}
                           initial={{ opacity: 0, y: 15 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="bg-[#102a4c] p-8 relative group shadow-sm transition-all duration-300 overflow-hidden text-center border border-brand-gold/30"
                         >
                            <div className="absolute inset-0 bg-brand-gold/5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
                            <div className="relative z-10">
                               <p className="text-[10px] font-extrabold text-brand-gold uppercase tracking-[0.25em] mb-4">{stat.label}</p>
                               <h4 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: C.serif }}>
                                  <CountUp end={stat.val} />
                               </h4>
                               <div className="w-12 h-1 bg-brand-gold mx-auto mt-6" />
                            </div>
                         </motion.div>
                       ))}
                    </div>
                    <div className="relative group z-10 shadow-[0_20px_40px_-25px_rgba(10,32,66,0.6)]">
                       <div className="relative bg-white border border-brand-blue/20 overflow-hidden">
                          <div className="bg-[#102a4c] text-white flex items-center p-6 border-b-2 border-brand-gold">
                             <div className="w-[10%] text-[10px] font-extrabold uppercase tracking-[0.2em] opacity-60">ID</div>
                             <div className="w-[50%] text-[10px] font-extrabold uppercase tracking-[0.2em]">Library Resource Collection</div>
                             <div className="w-[20%] text-[10px] font-extrabold uppercase tracking-[0.2em] text-center">Service Vendor</div>
                             <div className="w-[20%] text-[10px] font-extrabold uppercase tracking-[0.2em] text-right">Volume</div>
                          </div>
                          <div className="divide-y divide-brand-blue/05">
                        {(statsRows.length > 0
                          ? statsRows.map((item, idx) => ({
                              sr: String(idx + 1).padStart(2, '0'),
                              name: item.label,
                              vendor: 'Library',
                              no: item.val,
                            }))
                          : [
                                 { sr: "01", name: "Total no of Library Book", vendor: "Internal Archive", no: "33,979" },
                                 { sr: "02", name: "Total no of Reference books", vendor: "Scholarly Division", no: "12,348" },
                                 { sr: "03", name: "E-books for perpetual access", vendor: "Pearson Education", no: "97" },
                                 { sr: "04", name: "E-Journals Portfolio", vendor: "Science Direct", no: "275" },
                                 { sr: "05", name: "Printed Magazines and Journals", vendor: "Global Periodicals", no: "51" },
                                 { sr: "06", name: "Popular Academic Magazines", vendor: "Newsstand", no: "12" },
                                 { sr: "07", name: "Leading News Papers", vendor: "Multi-lingual", no: "12" },
                              ]).map((row, idx) => (
                               <motion.div 
                                 key={idx}
                                 initial={{ opacity: 0, x: -20 }}
                                 animate={{ opacity: 1, x: 0 }}
                                 transition={{ delay: idx * 0.1 }}
                                 className="group/row flex items-center p-6 hover:bg-[#f8faff] transition-all duration-300 relative overflow-hidden"
                               >
                                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-gold scale-y-0 group-hover/row:scale-y-100 transition-transform duration-300 origin-top" />
                                  <div className="w-[10%] font-extrabold text-brand-navy/30 group-hover/row:text-brand-navy transition-colors tabular-nums text-lg">#{row.sr}</div>
                                  <div className="w-[50%] flex flex-col">
                                     <span className="text-xl font-bold text-brand-navy group-hover/row:text-[#d48c00] transition-colors" style={{ fontFamily: C.serif }}>{row.name}</span>
                                     <span className="text-[11px] text-slate-400 uppercase tracking-widest mt-1 font-bold">Academic Asset Group</span>
                                  </div>
                                  <div className="w-[20%] flex justify-center">
                                     <span className="w-44 py-2 bg-[#102a4c] text-brand-gold text-[10px] font-extrabold uppercase tracking-widest border border-brand-gold/30 flex items-center justify-center text-center shadow-sm">
                                        {row.vendor}
                                     </span>
                                  </div>
                                  <div className="w-[20%] text-right">
                                     <span className="text-3xl font-bold text-brand-navy tabular-nums" style={{ fontFamily: C.serif }}>{row.no}</span>
                                  </div>
                               </motion.div>
                             ))}
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- TAB: E-RESOURCES --- */}
              {activeTab === 'E-Resources' && (
                <div className="relative">
                                    
                  <div className="bg-white border border-slate-200 p-8 md:p-12 rounded-[2.5rem] shadow-sm relative overflow-hidden">
                                        <SectionTitle title="Digital Resource Repository" subtitle="Access global knowledge portals, academic journals, and technical archives" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                       {[
                         { sr: 1, title: "Person India Education Pvt. Ltd.", desc: "Comprehensive E-Books access for curriculum-mapped academic titles.", val: "97 E-Books" },
                         { sr: 2, title: "Elsevier and Science Direct", desc: "Global premium technical journals and peer-reviewed research papers.", val: "275 E-journals" },
                         { sr: 3, title: "IETL Magazines and Journals", desc: "Specialized engineering publications and industrial periodicals.", val: "03 E-journals" },
                         { sr: 4, title: "DELNET Institutional Hub", desc: "Inter-Library loan and massive shared e-resources network.", val: "IIL Access" },
                         { sr: 5, title: "Library WEBOPAC Portal", desc: "Real-time college book catalogue accessible on the Intranet.", val: "33979 Catalogue" },
                         { sr: 6, title: "The Institute of Engineers (IEI)", desc: "Direct portal to IEI library and technical engineering databases.", val: "05 E-Journals" },
                       ].map((item, i) => (
                         <motion.div 
                           key={i}
                           initial={{ opacity: 0, y: 30 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: i * 0.1, duration: 0.6 }}
                            whileHover={{ y: -2 }}
                            className="bg-white border border-slate-200 p-10 shadow-sm transition-all duration-300 group relative overflow-hidden"
                         >
                            <div className="absolute top-0 left-0 w-1 h-0 bg-brand-gold group-hover:h-full transition-all duration-500" />
                            <h3 className="text-xl font-bold text-brand-navy mb-4 leading-tight group-hover:text-brand-gold transition-colors" style={{ fontFamily: C.serif }}>{item.sr}. {item.title}</h3>
                            <p className="text-slate-500 mb-6 leading-relaxed" style={{ fontFamily: C.body }}>{item.desc}</p>
                            <span className="bg-brand-navy text-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest border border-brand-navy/20 group-hover:bg-brand-gold group-hover:border-brand-gold transition-colors inline-block">
                               {item.val}
                            </span>
                            {/* Subtle Inner Glow */}
                            <div className="absolute inset-0 bg-brand-navy/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                         </motion.div>
                       ))}
                    </div>
                    <div className="mt-24 pt-16 border-t border-slate-200/60 relative z-10">
                       <h3 className="text-2xl font-bold text-brand-navy mb-12 text-center uppercase tracking-widest" style={{ fontFamily: C.serif }}>Institutional Digital Archives</h3>
                       <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                          {[1,2,3,4,5,6,7,8].map((n) => (
                            <motion.div 
                              key={n} 
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + n * 0.05 }}
                               whileHover={{ y: -2 }}
                               className="group bg-white p-6 border border-slate-200/60 text-center shadow-sm hover:border-brand-gold transition-all duration-300"
                            >
                               <div className="w-16 h-16 bg-slate-50 flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-navy/5 transition-colors">
                                  <FileText className="text-slate-300 group-hover:text-brand-gold transition-colors" size={32} />
                               </div>
                               <p className="text-[10px] font-bold text-brand-navy mb-6 tracking-[0.2em] uppercase" style={{ fontFamily: C.body }}>Archive Document {n.toString().padStart(2, '0')}</p>
                               <div className="flex justify-center gap-3">
                                  <button className="w-10 h-10 bg-brand-navy text-white hover:bg-brand-gold transition-colors flex items-center justify-center shadow-lg"><Search size={14}/></button>
                                  <button className="w-10 h-10 border border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white transition-colors flex items-center justify-center"><Download size={14}/></button>
                               </div>
                            </motion.div>
                          ))}
                       </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- TAB: FACILITIES --- */}
              {activeTab === 'Facilities' && (
                <div className="relative">
                  
                  <div className="bg-white border border-slate-200 p-8 md:p-12 rounded-[2.5rem] shadow-sm relative overflow-hidden">
                                        <SectionTitle title="DELNET Resource Ecosystem" subtitle="Comprehensive access to global union catalogues, periodicals, and academic sound archives" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
                       {(facilitiesRows.length > 0
                         ? facilitiesRows.map((label, idx) => ({ label, val: String(idx + 1) }))
                         : [
                          { label: "Union Catalogue of books", val: "26661564" },
                          { label: "Union list of current periodicals", val: "37847" },
                          { label: "Union catalogue of Periodicals", val: "20235" },
                          { label: "Databases of Periodicals Articles", val: "984809" },
                          { label: "CD ROM databases", val: "61750" },
                          { label: "Union list of Video Recording", val: "6000" },
                          { label: "Union list of Sound Recording", val: "1025" },
                          { label: "Database of Theses and Dissertations", val: "1025" },
                          { label: "Data base of E-books", val: "1613" },
                        ]).map((item, i) => (
                         <motion.div 
                           key={i} 
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: i * 0.05 }}
                            whileHover={{ y: -2 }}
                            className="p-6 bg-white border border-slate-200 shadow-sm transition-all duration-300 group relative overflow-hidden flex flex-col items-center text-center"
                         >
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-gold scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                            <div className="relative z-10 w-full">
                               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 group-hover:text-brand-gold transition-colors">{item.label}</p>
                               <h4 className="text-2xl font-bold text-brand-navy tracking-tight" style={{ fontFamily: C.serif }}>
                                  <CountUp end={item.val} />
                               </h4>
                               <div className="w-6 h-1 bg-brand-navy/10 mx-auto mt-4 group-hover:bg-brand-gold transition-colors duration-500" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                         </motion.div>
                       ))}
                    </div>
                    <div className="mt-16 bg-brand-navy p-6 border-l-8 border-brand-gold relative z-10">
                       <p className="text-white/80 italic text-sm" style={{ fontFamily: C.body }}>
                          * All above facilities are facilitated through the **DELNET Infrastructure** to provide students with a borderless academic research environment.
                       </p>
                    </div>
                  </div>
                </div>
              )}

              {/* --- TAB: MEMBERSHIP --- */}
              {activeTab === 'Membership' && (
                <div className="relative">
                   <div className="bg-white border border-slate-200 p-8 md:p-12 rounded-[2.5rem] shadow-sm relative overflow-hidden">
                                            <SectionTitle title="Library Institutional Memberships" subtitle="Official academic partnerships and knowledge networks" />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                          {(membershipsRows.length > 0
                            ? membershipsRows.map((title) => ({ title, desc: 'Institutional membership', loc: 'Academic Network' }))
                            : [
                            { title: "The Institute of Engineers (India), Kolkata", desc: "Lifetime Membership providing access to world-class engineering journals.", loc: "Kolkata" },
                            { title: "DELNET (Developing Library Network)", desc: "Comprehensive Inter-Library loan and massive shared e-resources network.", loc: "New Delhi" },
                            { title: "IIT Bombay, Mumbai", desc: "Direct resource sharing and knowledge exchange membership.", loc: "Mumbai" },
                            { title: "National Digital Library", desc: "Massive open-source warehouse of digital resources and books.", loc: "National" },
                          ]).map((item, i) => (
                           <motion.div 
                             key={i} 
                             initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                             animate={{ opacity: 1, x: 0 }}
                             transition={{ delay: i * 0.1, duration: 0.6 }}
                              whileHover={{ y: -2 }}
                              whileTap={{ backgroundColor: C.navy, transition: { duration: 0.1 } }}
                              className="bg-white border border-slate-200 p-10 relative group active:shadow-inner transition-all duration-300 overflow-hidden cursor-pointer"
                           >
                              <div className="absolute top-0 right-0 w-1.5 h-0 bg-brand-gold group-hover:h-full transition-all duration-500" />
                              <h3 className="text-xl font-bold text-brand-navy mb-4 leading-tight group-hover:text-brand-gold group-active:text-white transition-colors" style={{ fontFamily: C.serif }}>{i+1}. {item.title}</h3>
                              <p className="text-slate-500 mb-6 italic leading-relaxed group-active:text-white transition-colors" style={{ fontFamily: C.body }}>{item.desc}</p>
                              <div className="flex items-center gap-2 text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] pt-4 border-t border-slate-100 group-active:border-white/10 group-active:text-white transition-colors">
                                 <MapPin size={12} /> {item.loc}
                              </div>
                           </motion.div>
                         ))}
                      </div>
                   </div>
                </div>
              )}

              {/* --- TAB: COMMITTEE --- */}
              {activeTab === 'Committee' && (
                <div className="relative">
                   <div className="bg-white border border-slate-200 p-8 md:p-12 rounded-[2.5rem] shadow-sm relative overflow-hidden">
                                            <SectionTitle title="Library Oversight Committee" subtitle="Scholarly governance and institutional quality assurance" />
                      
                      <div className="relative z-10">
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6 }}
                          className="mb-12 max-w-sm mx-auto md:mx-0"
                        >
                           <div className="bg-brand-navy text-white p-8 shadow-xl border-l-8 border-brand-gold relative group overflow-hidden">
                              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -rotate-45 translate-x-12 -translate-y-12" />
                              <h3 className="text-xl font-bold mb-1" style={{ fontFamily: C.serif }}>Ms. Shahista Khan</h3>
                              <p className="text-brand-gold font-bold text-[10px] uppercase tracking-widest mb-4">Convener</p>
                              <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: C.body }}>AP. Electronics and Telecommunication Engineering</p>
                           </div>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                           {(committeeRows.length > 0 ? committeeRows : [
                             { name: "Ms. Anagha Patil", role: "Member", sub: "AP. Information Technology" },
                             { name: "Ms. Priti Vairagi", role: "Member", sub: "AP. Mechanical Engineering" },
                             { name: "Mr. Arbaz Kazi", role: "Member", sub: "AP. Civil Engineering" },
                             { name: "Ms. Sejal Demello", role: "Member", sub: "AP. AI & DS" },
                             { name: "Ms. Krunali Vartak", role: "Member", sub: "AP. CSE DS" },
                             { name: "Ms. Akshaya Prabhu", role: "Member", sub: "AP. Computer Engineering" },
                             { name: "Mr. Dinesh M. Jadhav", role: "Librarian", sub: "Library Department" },
                           ]).map((item, i) => (
                              <motion.div 
                               key={i} 
                               initial={{ opacity: 0, scale: 0.95 }}
                               animate={{ opacity: 1, scale: 1 }}
                               transition={{ delay: i * 0.05 }}
                               whileHover={{ y: -2 }}
                               className="bg-white border border-slate-200 p-8 shadow-sm transition-all group relative overflow-hidden"
                             >
                                <div className="absolute top-0 right-0 w-8 h-8 bg-brand-gold/10 scale-0 group-hover:scale-100 transition-transform origin-top-right duration-500" />
                                <h4 className="text-lg font-bold text-brand-navy mb-1 group-hover:text-brand-gold transition-colors" style={{ fontFamily: C.serif }}>{item.name}</h4>
                                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">{item.role}</p>
                                 <p className="border-t border-slate-100 pt-4 text-xs font-bold text-slate-500 uppercase tracking-wider leading-relaxed">{item.sub}</p>
                              </motion.div>
                            ))}
                        </div>
                      </div>
                   </div>
                </div>
              )}

              {/* --- TAB: RULES --- */}
              {activeTab === 'Rules' && (
                <div className="relative">
                   {/* Subtle Background Glow */}
                   
                   <div className="bg-white border border-slate-200 p-8 md:p-12 rounded-[2.5rem] shadow-sm relative overflow-hidden">
                      {/* Mesh Gradient Overlay */}
                                            
                      <SectionTitle title="Library Rules & Regulations" subtitle="Guidelines for a scholarly and discipline-oriented environment" />
                      
                      <div className="relative z-10">
                        {/* Rules Comparison Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                           {/* Staff Rules Card */}
                           <motion.div 
                             initial={{ opacity: 0, x: -30 }}
                             animate={{ opacity: 1, x: 0 }}
                             transition={{ duration: 0.6 }}
                             className="bg-white border-t-8 border-brand-navy shadow-sm relative overflow-hidden group border-x border-b border-slate-200"
                           >
                              <div className="p-8">
                                 <div className="flex items-center gap-4 mb-8">
                                    <div className="w-10 h-10 bg-brand-navy text-white flex items-center justify-center">
                                       <ShieldCheck size={20} />
                                    </div>
                                     <h3 className="text-2xl font-bold text-brand-navy uppercase tracking-tight" style={{ fontFamily: C.serif }}>For Staff Members</h3>
                                 </div>
                                 <div className="space-y-4">
                                    {(rulesRows.length > 0 ? rulesRows : [
                                      "Maintain absolute silence in the premises.",
                                      "Mobiles must be kept on silent mode.",
                                      "Privileged access to books, magazines, and archives.",
                                      "Report any defects or missing pages immediately.",
                                      "Replacement of lost books within 8 days.",
                                      "Audit Limit: Teaching (10) | Non-Teaching (02)",
                                      "Access to full digital library repository.",
                                      "Personal laptops are restricted in digital areas.",
                                      "Handle all academic assets with extreme care.",
                                      "Standard return period is 4 working days.",
                                      "Mandatory entry in visitor register."
                                    ]).map((rule, idx) => (
                                      <motion.div 
                                        key={idx} 
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + idx * 0.05 }}
                                        className="flex gap-3 items-start group/rule"
                                      >
                                         <span className="text-xs font-bold text-brand-gold pt-0.5 tabular-nums transition-transform group-hover/rule:translate-x-1">{(idx + 1).toString().padStart(2, '0')}</span>
                                         <p className="text-slate-600 text-lg leading-relaxed border-l border-slate-100 pl-3 group-hover/rule:border-brand-gold transition-colors" style={{ fontFamily: C.body }}>{rule}</p>
                                      </motion.div>
                                    ))}
                                 </div>
                              </div>
                           </motion.div>

                           {/* Student Rules Card */}
                           <motion.div 
                             initial={{ opacity: 0, x: 30 }}
                             animate={{ opacity: 1, x: 0 }}
                             transition={{ duration: 0.6 }}
                             className="bg-brand-navy text-white shadow-xl relative overflow-hidden group border border-white/10"
                           >
                              <div className="p-8">
                                 <div className="flex items-center gap-4 mb-8">
                                    <div className="w-10 h-10 bg-brand-gold text-brand-navy flex items-center justify-center">
                                       <UserCheck size={20} />
                                    </div>
                                     <h3 className="text-2xl font-bold text-white uppercase tracking-tight" style={{ fontFamily: C.serif }}>For Students</h3>
                                 </div>
                                 <div className="space-y-4">
                                     {(rulesRows.length > 0 ? rulesRows : [
                                        "Absolute silence in library premises",
                                        "Mobiles must be kept on silent mode",
                                        "Use of home-issue facility for books",
                                        "Full digital library repository access",
                                        "Standard weekly borrowing privileges",
                                        "One-day reference access for archives",
                                        "Ethical academic asset handling",
                                        "Mandatory entry in library registries",
                                        "SC/ST specific book bank portal",
                                        "Replacement of lost/damaged materials",
                                        "Digital activity and research logging",
                                        "No personal laptops in digital zones",
                                        "Report damaged pages immediately"
                                    ]).map((rule, idx) => (
                                      <motion.div 
                                        key={idx} 
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + idx * 0.05 }}
                                        className="flex gap-3 items-start group/rule"
                                      >
                                         <span className="text-brand-gold font-bold text-[10px] pt-1 tabular-nums transition-transform group-hover/rule:translate-x-1">{(idx + 1).toString().padStart(2, '0')}</span>
                                         <p className="text-white/80 text-lg leading-snug border-l border-white/5 pl-3 group-hover/rule:text-white transition-colors" style={{ fontFamily: C.body }}>{rule}</p>
                                      </motion.div>
                                    ))}
                                 </div>
                              </div>
                           </motion.div>
                        </div>

                        {/* Fine System Spotlight Section (Full Width to avoid gap) */}
                        <motion.div 
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5, duration: 0.6 }}
                          className="bg-white border-2 border-brand-gold p-8 shadow-xl relative overflow-hidden group"
                        >
                           <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/5 -rotate-12 translate-x-12 -translate-y-12" />
                           <div className="flex items-center gap-4 mb-8">
                              <div className="w-10 h-10 bg-brand-gold text-white flex items-center justify-center">
                                 <Award size={20} />
                              </div>
                              <h3 className="text-xl font-bold text-brand-navy uppercase tracking-widest" style={{ fontFamily: C.serif }}>Book Delay Fine & Suspension System</h3>
                           </div>
                           
                           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                              <motion.div 
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="bg-slate-50 p-6 border border-brand-gold/20 hover:bg-brand-navy hover:text-white transition-all duration-500 group/item shadow-sm hover:shadow-xl"
                              >
                                 <p className="text-[10px] font-bold uppercase tracking-widest mb-2 opacity-60">i. 1–7 Days Delay</p>
                                 <p className="text-2xl font-bold" style={{ fontFamily: C.serif }}>Rs. 2 / Day</p>
                              </motion.div>
                              <motion.div 
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="bg-slate-50 p-6 border border-brand-gold/20 hover:bg-brand-navy hover:text-white transition-all duration-500 group/item shadow-sm hover:shadow-xl"
                              >
                                 <p className="text-[10px] font-bold uppercase tracking-widest mb-2 opacity-60">ii. Above 7 Days</p>
                                 <p className="text-2xl font-bold" style={{ fontFamily: C.serif }}>Rs. 10 / Day</p>
                              </motion.div>
                              <div className="bg-brand-navy/5 p-6 border-l-4 border-brand-navy flex flex-col justify-center shadow-sm">
                                 <p className="text-[10px] font-bold uppercase tracking-widest mb-2 text-brand-navy/60">iii. 1–14 Days Delay</p>
                                 <p className="text-xs font-bold text-brand-navy uppercase tracking-tight">Suspension for <span className="text-brand-gold">One Month</span></p>
                              </div>
                              <div className="bg-red-50 p-6 border-l-4 border-red-600 flex flex-col justify-center shadow-sm">
                                 <p className="text-[10px] font-bold uppercase tracking-widest mb-2 text-red-600/60">iv. 14+ Days Delay</p>
                                 <p className="text-xs font-bold text-red-600 uppercase tracking-tight">Suspension for <span className="uppercase">Entire Semester</span></p>
                              </div>
                           </div>

                           <div className="bg-slate-50 p-4 border border-slate-200/60 flex items-center gap-4">
                              <Info size={18} className="text-brand-gold shrink-0" />
                              <p className="text-slate-500 text-xs italic" style={{ fontFamily: C.body }}>
                                 All fines and suspensions are strictly enforced to maintain resource circulation for the entire academic community.
                              </p>
                           </div>
                        </motion.div>
                      </div>
                    </div>

                    {(contact.phone || contact.email || contact.address) && (
                      <div className="mt-10 bg-white border border-slate-200 p-6 rounded-xl">
                        <h4 className="text-lg font-bold text-brand-navy mb-2">Library Contact</h4>
                        {contact.phone && <p className="text-sm text-slate-700">Phone: {contact.phone}</p>}
                        {contact.email && <p className="text-sm text-slate-700">Email: {contact.email}</p>}
                        {contact.address && <p className="text-sm text-slate-700">Address: {contact.address}</p>}
                      </div>
                    )}
                </div>
              )}

              {/* --- TAB: GALLERY --- */}
              {activeTab === 'Gallery' && (
                <div className="relative">
                   
                   <div className="bg-white border border-slate-200 p-8 md:p-12 rounded-[2.5rem] shadow-sm relative overflow-hidden">
                                            
                      <SectionTitle title="Library Photo Gallery" subtitle="Visual archives of our scholarly environment and academic infrastructure" />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                         {(galleryRows.length > 0 ? galleryRows : Array.from({ length: 8 }).map((_, idx) => ({
                            label: `Library Gallery ${idx + 1}`,
                            imageUrl: null as string | null,
                         }))).map((item, idx) => (
                            <motion.div 
                              key={idx} 
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: (idx + 1) * 0.1 }}
                              whileHover={{ y: -3 }}
                              className="group relative aspect-[16/10] bg-white overflow-hidden shadow-sm cursor-pointer border-[6px] border-white transition-all ring-1 ring-slate-200"
                            >
                              <div className="absolute inset-0 bg-brand-navy/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center z-10 text-center p-8">
                                 <motion.div 
                                   initial={{ scale: 0.8, opacity: 0 }}
                                   whileHover={{ scale: 1, opacity: 1 }}
                                   className="mb-4 w-12 h-12 border border-white/30 rounded-full flex items-center justify-center"
                                 >
                                    <Search className="text-white" size={20} />
                                 </motion.div>
                                  <p className="text-white text-xs font-bold tracking-[0.3em] uppercase transition-transform duration-500">{item.label}</p>
                               </div>
                               {item.imageUrl ? (
                                 <img src={item.imageUrl} alt={item.label} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                               ) : (
                                 <div className="absolute inset-0 bg-slate-100 flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
                                    <ImageIcon className="text-brand-navy/10" size={64} />
                                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(${C.navy} 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />
                                 </div>
                               )}
                              
                              {/* Prominent Corner Accents */}
                              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-brand-gold scale-0 group-hover:scale-100 transition-all duration-300 z-20" />
                              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-brand-gold scale-0 group-hover:scale-100 transition-all duration-300 z-20" />
                           </motion.div>
                         ))}
                      </div>
                   </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
        </main>
      </div> {/* End Flex Wrapper for Vertical Nav */}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </PageLayout>
  );
};

export default Library;
