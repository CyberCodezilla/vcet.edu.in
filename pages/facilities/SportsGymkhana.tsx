import React, { useEffect, useMemo, useRef, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { getFacilitiesSection } from '../../services/facilities';
import { resolveUploadedAssetUrl } from '../../utils/uploadedAssets';

/* ═══════════════════════════════════════════════════════════════ */
/* ─── Design Tokens ──────────────────────────────────────────── */
/* ═══════════════════════════════════════════════════════════════ */
const C = {
  navy: '#1a4b7c',
  navyDk: '#153f69',
  navyMd: '#245d96',
  gold: '#D4A017',
  goldLt: '#F5CC5B',
  bgPage: '#eef3fa',
  cardBg: '#ffffff',
};

const H = 'Playfair Display, Georgia, serif';
const T = 'Cambria, Georgia, serif';
const SF = 'Inter, system-ui, sans-serif';
const COMMON_SPORT_ICON = 'M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z';

/* ─── Data ────────────────────────────────────────────────────── */
const sportsList = [
  { name: 'Overarm Cricket', icon: 'M13.5 10.5L21 3m-4.5 4.5L13.5 4.5M3 21l9-9m0 0l3-3m-3 3l-3 3M21 3l-1.5 1.5m0-1.5L21 4.5M12 12l1.5-1.5M12 12l-1.5 1.5' },
  { name: 'Box Cricket', icon: 'M13.5 10.5L21 3m-4.5 4.5L13.5 4.5M3 21l9-9m0 0l3-3m-3 3l-3 3M21 3l-1.5 1.5m0-1.5L21 4.5M12 12l1.5-1.5M12 12l-1.5 1.5' },
  { name: 'Kabaddi', icon: 'M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z' },
  { name: 'Volleyball', icon: 'M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z' },
  { name: 'Basketball', icon: 'M12 3a9 9 0 100 18 9 9 0 000-18zM4.33 16A7 7 0 0110 5.1V19a7 7 0 01-5.67-3zm9.67 3V5.1a7 7 0 015.67 10.9A7 7 0 0114 19z' },
  { name: 'Throwball', icon: 'M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z' },
  { name: 'Girls Cricket', icon: 'M13.5 10.5L21 3m-4.5 4.5L13.5 4.5M3 21l9-9m0 0l3-3m-3 3l-3 3M21 3l-1.5 1.5m0-1.5L21 4.5M12 12l1.5-1.5M12 12l-1.5 1.5' },
  { name: 'Badminton', icon: 'M8.2 12.8L4.5 21l8.3-3.7m-8.3 3.7l3.7-8.3m4.6 4.6l-3.7 8.3m0-8.3l8.3-3.7m0 0a3.5 3.5 0 10-5-5 3.5 3.5 0 005 5z' },
  { name: 'Footvolley', icon: 'M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z' },
  { name: 'Chess', icon: 'M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2m14-10a4 4 0 11-8 0 4 4 0 018 0zM7 8h10M7 12h10' },
  { name: 'Carrom', icon: 'M12 3a9 9 0 100 18 9 9 0 000-18zm0 13a4 4 0 110-8 4 4 0 010 8z' },
  { name: 'Table Tennis', icon: 'M18 6a6 6 0 10-12 0 6 6 0 0012 0zm-6 15v-3' },
  { name: 'Tug of War', icon: 'M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z' },
  { name: 'Arm-Wrestling', icon: 'M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z' },
  { name: 'Athletics', icon: 'M13 3l-1 1M13 14l-2 2-2-4m12-4l-3 1-1 3-2-2m5 1l-1 2m3 5l-2 1M9 7l1-3m1 14l-3 3-1-3L6 14m3-3l1 3' },
];

const competitionsList = [
  'Wrestling Competition', 'Mallakhamb Competition',
  'Zonal Mallakhamb Competition', 'Powerlifting Tournament',
  'Men\u2019s Kabaddi Team', 'IISM',
];

const competitionImages = [
  '/images/Facilities/Sports & Gymkhana/Sports & Gymkhana/Sports-Achievement1.jpg',
  '/images/Facilities/Sports & Gymkhana/Sports & Gymkhana/Sports-Achievement2.jpg',
  '/images/Facilities/Sports & Gymkhana/Sports & Gymkhana/Sports-Achievement3.jpg',
  '/images/Facilities/Sports & Gymkhana/Sports & Gymkhana/Sports-Achievement4-768x1024.jpg',
  '/images/Facilities/Sports & Gymkhana/Sports & Gymkhana/Sports-Achievement5-300x215.jpg',
  '/images/Facilities/Sports & Gymkhana/Sports & Gymkhana/Sports-Achievement6.jpg',
];

const studentAchievements = [
  { text: 'Mr. Kishor Madane \u2013 Silver Medal \u2013 Mumbai University Intercollegiate Wrestling Competition.', medal: 'silver' },
  { text: 'Ms. Palak Churi \u2013 Multiple medals in Mallakhamb competitions including Gold Medal at All India Inter University competition.', medal: 'gold' },
  { text: 'Mr. Om Tandel \u2013 Gold Medal \u2013 Mumbai University Intercollegiate Powerlifting Tournament.', medal: 'gold' },
  { text: 'VCET Men\u2019s Kabaddi Team \u2013 Silver Medal at ENERTIA organized by Thakur College.', medal: 'silver' },
  { text: 'Omkar Shelke \u2013 Second Prize at IISM Andheri.', medal: 'bronze' },
];

const MEDAL: Record<string, { dot: string; glow: string; label: string }> = {
  gold: { dot: '#D4A017', glow: 'rgba(212,160,23,0.4)', label: 'Gold' },
  silver: { dot: '#9ca3af', glow: 'rgba(156,163,175,0.4)', label: 'Silver' },
  bronze: { dot: '#cd7f32', glow: 'rgba(205,127,50,0.4)', label: 'Bronze' },
};

const cricketResults = [['2023', 'VCET', 'University', 'Winner'], ['2022', 'VCET', 'Intercollegiate', 'Runner Up'], ['2021', 'VCET', 'District', 'Winner']];
const footballResults = [['2023', 'VCET', 'University', 'Semi Finalist'], ['2022', 'VCET', 'Intercollegiate', 'Quarter Finalist'], ['2021', 'VCET', 'District', 'Winner']];
const kabaddiResults = [['2023', 'VCET', 'University', 'Runner Up'], ['2022', 'VCET', 'Intercollegiate', 'Winner'], ['2021', 'VCET', 'District', 'Winner']];

const LEVEL_BY_YEAR: Record<string, string> = {
  '2023': 'University',
  '2022': 'Intercollegiate',
  '2021': 'District',
};

const RESULT_BADGE: Record<string, { bg: string; color: string }> = {
  'Winner': { bg: 'rgba(212,160,23,0.15)', color: '#b8860b' },
  'Runner Up': { bg: 'rgba(156,163,175,0.15)', color: '#6b7280' },
  'Semi Finalist': { bg: 'rgba(99,102,241,0.12)', color: '#4338ca' },
  'Quarter Finalist': { bg: 'rgba(14,165,233,0.12)', color: '#0369a1' },
};

/* ═══════════════════════════════════════════════════════════════ */
/* ─── Reveal Component ───────────────────────────────────────── */
/* ═══════════════════════════════════════════════════════════════ */
const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  dir?: 'up' | 'left' | 'right' | 'fade';
  className?: string;
}> = ({ children, delay = 0, dir = 'up', className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const from = dir === 'left' ? 'translateX(-30px)' : dir === 'right' ? 'translateX(30px)' : dir === 'fade' ? 'none' : 'translateY(28px)';
  return (
    <div ref={ref} className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? 'none' : from,
        transition: `opacity 0.65s cubic-bezier(.4,0,.2,1) ${delay}ms, transform 0.65s cubic-bezier(.4,0,.2,1) ${delay}ms`,
      }}>
      {children}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════ */
/* ─── Section Heading ─────────────────────────────────────────── */
/* ═══════════════════════════════════════════════════════════════ */
const SH: React.FC<{ title: string; tag?: string; center?: boolean; light?: boolean; delay?: number }> = ({
  title, tag, center = true, light = false, delay = 0,
}) => (
  <Reveal delay={delay} className={`mb-12 ${center ? 'text-center' : ''}`}>
    {tag && (
      <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] px-8 py-2 mb-4 border [clip-path:polygon(0_0,100%_0,94%_50%,100%_100%,0_100%,6%_50%)]"
        style={{
          color: light ? C.gold : '#fff',
          background: light ? '#102a4c' : C.navy,
          borderColor: light ? 'rgba(212,160,23,0.5)' : 'rgba(255,255,255,0.1)',
          fontFamily: SF,
          borderRadius: '0px',
        }}>
        {tag}
      </span>
    )}
    <h2 className="text-3xl md:text-[2.5rem] font-bold tracking-tight leading-tight"
      style={{ fontFamily: H, color: light ? '#fff' : C.navy }}>
      {title}
    </h2>
    <GoldBar center={center} delay={delay + 200} />
  </Reveal>
);

/* ─── Animated Gold Accent Bar ──────────────────────────────── */
const GoldBar: React.FC<{ center?: boolean; delay?: number }> = ({ center = true, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`mt-4 ${center ? 'flex justify-center' : ''}`}>
      <div style={{
        height: '3px', width: vis ? '56px' : '0px', backgroundColor: C.gold, borderRadius: '2px',
        transition: `width 0.7s cubic-bezier(.4,0,.2,1) ${delay}ms`,
      }} />
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════ */
/* ─── Result Table ───────────────────────────────────────────── */
/* ═══════════════════════════════════════════════════════════════ */
const ResultTable: React.FC<{ title: string; rows: string[][]; fullCols?: boolean; delay?: number }> = ({
  title, rows, fullCols = false, delay = 0,
}) => (
  <Reveal delay={delay}>
    <div className="overflow-hidden shadow-[0_14px_30px_-24px_rgba(10,32,66,0.55)]" style={{ borderRadius: '0px', border: '1px solid rgba(11,44,74,0.08)' }}>
      {/* Header */}
      <div className="px-6 py-5 flex items-center justify-between" style={{ background: `linear-gradient(135deg, ${C.navyDk} 0%, ${C.navyMd} 100%)`, borderBottom: `3px solid ${C.gold}` }}>
        <h3 className="text-[1.2rem] font-bold text-white tracking-wide" style={{ fontFamily: H }}>{title}</h3>
        <span className="text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5" style={{ color: C.gold, background: 'rgba(212,160,23,0.15)', border: `1px solid rgba(212,160,23,0.3)`, fontFamily: SF, borderRadius: '0px' }}>
          Tournament
        </span>
      </div>
      {/* Col headers */}
      <div className={`hidden md:grid px-6 py-4 text-[11px] font-bold uppercase tracking-widest border-b`}
        style={{ gridTemplateColumns: fullCols ? '1fr 1.4fr 140px 140px' : '1fr 140px 140px', color: C.navy, background: '#f0f5fc', borderBottomColor: 'rgba(11,44,74,0.08)', fontFamily: SF }}>
        <span>Year</span>
        {fullCols && <span>Institute</span>}
        <span className="text-left">Level</span>
        <span className="text-left">Position</span>
      </div>
      {/* Rows */}
      <div className="bg-white">
        {rows.map((row, i) => (
          <Reveal key={i} delay={i * 60} dir="up">
            <div
              className="group px-6 py-4 border-b last:border-0 transition-all duration-300 cursor-pointer"
              style={{
                display: 'grid',
                gridTemplateColumns: fullCols ? '1fr 1.4fr 140px 140px' : '1fr 140px 140px',
                alignItems: 'center',
                gap: '8px',
                borderBottomColor: 'rgba(11,44,74,0.06)',
                backgroundColor: i % 2 === 0 ? '#fff' : '#f8fafd',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#eef4ff')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = i % 2 === 0 ? '#fff' : '#f8fafd')}
            >
              <span className="text-[15px] font-semibold truncate" style={{ fontFamily: T, color: '#1a1a2e' }}>{row[0]}</span>
              {fullCols && <span className="text-[14px] text-gray-600 truncate" style={{ fontFamily: T }}>{row[1]}</span>}
              <div className="text-left">
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider py-1.5 whitespace-nowrap transition-all duration-300 group-hover:scale-105"
                  style={{ background: 'rgba(11,44,74,0.08)', color: C.navy, fontFamily: SF, borderRadius: '0px', width: '125px', textAlign: 'center' }}>
                  {row[2]}
                </span>
              </div>
              <div className="text-left">
                {(() => {
                  const badge = RESULT_BADGE[row[3]] || { bg: 'rgba(11,44,74,0.08)', color: C.navy };
                  return (
                    <span className="inline-block text-[11px] font-bold py-1.5 whitespace-nowrap transition-all duration-300 group-hover:scale-105"
                      style={{ background: badge.bg, color: badge.color, fontFamily: SF, borderRadius: '0px', width: '125px', textAlign: 'center' }}>
                      {row[3]}
                    </span>
                  );
                })()}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </Reveal>
);

/* ═══════════════════════════════════════════════════════════════ */
/* ─── Page Component ─────────────────────────────────────────── */
/* ═══════════════════════════════════════════════════════════════ */
const SportsGymkhana: React.FC = () => {
  const [apiData, setApiData] = useState<any>(null);
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    getFacilitiesSection<any>('sports-gymkhana')
      .then((res) => mounted && setApiData(res))
      .catch(() => mounted && setApiData(null))
      .finally(() => {
        if (mounted) setApiLoaded(true);
      });
    return () => {
      mounted = false;
    };
  }, []);

    const displaySports = useMemo(() => {
    const rows = Array.isArray(apiData?.sports)
      ? apiData.sports
          .map((sport: any) => ({
            name: String(sport?.name ?? '').trim(),
            icon: String(sport?.icon ?? '').trim(),
          }))
          .filter((sport: any) => sport.name.length > 0)
      : [];
    return rows.length > 0 ? rows : sportsList;
  }, [apiData]);

  const displayAchievements = useMemo(() => {
    const rows = Array.isArray(apiData?.achievements)
      ? apiData.achievements
          .map((entry: any, idx: number) => ({
            text: String(entry ?? '').trim(),
            medal: idx % 2 === 0 ? 'gold' : 'silver',
          }))
          .filter((entry: any) => entry.text.length > 0)
      : [];
    return rows.length > 0 ? rows : studentAchievements;
  }, [apiData]);

  const apiRows = useMemo(() => {
    const rows = Array.isArray(apiData?.results)
      ? apiData.results
          .map((row: any) => ({
            year: String(row?.year ?? '').trim(),
            entry: String(row?.entry ?? '').trim(),
            cricket: String(row?.cricket ?? '').trim(),
            football: String(row?.football ?? '').trim(),
            kabaddi: String(row?.kabaddi ?? '').trim(),
          }))
          .filter((row: any) => row.year.length > 0)
      : [];
    return rows;
  }, [apiData]);

  const getPositionBySport = (row: any, sport: 'cricket' | 'football' | 'kabaddi'): string => {
    const explicit = String(row?.[sport] ?? '').trim();
    if (explicit) return explicit;
    const text = String(row?.entry ?? '').trim();
    if (!text) return '';
    const map: Record<'cricket' | 'football' | 'kabaddi', string[]> = {
      cricket: ['cricket'],
      football: ['football'],
      kabaddi: ['kabaddi'],
    };
    const chunks = text.split('|').map((part) => part.trim()).filter(Boolean);
    for (const chunk of chunks) {
      const [lhsRaw, rhsRaw] = chunk.split(':');
      if (!rhsRaw) continue;
      const lhs = lhsRaw.trim().toLowerCase();
      if (map[sport].some((token) => lhs.includes(token))) {
        return rhsRaw.trim();
      }
    }
    return text;
  };

  const displayCricketResults = useMemo(() => {
    if (apiRows.length === 0) return cricketResults;
    return apiRows.map((row: any) => [
      row.year,
      'VCET',
      LEVEL_BY_YEAR[row.year] || 'University',
      getPositionBySport(row, 'cricket'),
    ]);
  }, [apiRows]);

  const displayFootballResults = useMemo(() => {
    if (apiRows.length === 0) return footballResults;
    return apiRows.map((row: any) => [
      row.year,
      'VCET',
      LEVEL_BY_YEAR[row.year] || 'Intercollegiate',
      getPositionBySport(row, 'football'),
    ]);
  }, [apiRows]);

  const displayKabaddiResults = useMemo(() => {
    if (apiRows.length === 0) return kabaddiResults;
    return apiRows.map((row: any) => [
      row.year,
      'VCET',
      LEVEL_BY_YEAR[row.year] || 'District',
      getPositionBySport(row, 'kabaddi'),
    ]);
  }, [apiRows]);

  const displayGallery = useMemo(() => {
    const rows = Array.isArray(apiData?.gallery)
      ? apiData.gallery
          .map((item: any, idx: number) => ({
            label: String(item?.label ?? '').trim() || `Image ${idx + 1}`,
            imageUrl: resolveUploadedAssetUrl(item?.imageUrl ?? null),
          }))
          .filter((item: any) => !!item.imageUrl)
      : [];
    return rows;
  }, [apiData]);

  const displayFacilityImages = useMemo(() => {
    const fromApi = displayGallery.slice(0, 2).map((item: any) => item.imageUrl);
    if (fromApi.length === 2) return fromApi as string[];
    const fallback = [
      '/images/Facilities/Sports & Gymkhana/Sports & Gymkhana/gym_2.png',
      '/images/Facilities/Sports & Gymkhana/Sports & Gymkhana/football.png',
    ];
    return fromApi.length > 0 ? [...fromApi, ...fallback].slice(0, 2) : fallback;
  }, [displayGallery]);

  const displayCompetitionImages = useMemo(() => {
    const fromApi = displayGallery.slice(2, 8).map((item: any) => item.imageUrl);
    if (fromApi.length >= 6) return fromApi.slice(0, 6) as string[];
    return competitionImages;
  }, [displayGallery]);

  if (!apiLoaded) {
    return (
      <PageLayout>
        <PageBanner
          title="Sports Gymkhana"
          breadcrumbs={[
            { label: 'Sports Gymkhana' },
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
      title="Sports & Gymkhana"
      breadcrumbs={[{ label: 'Sports & Gymkhana' }]}
    />

    {/* ══ 1. ABOUT + TIMINGS ══════════════════════════════════════ */}
    <section className="py-14 relative overflow-hidden" style={{ background: '#eef3fa' }}>
      {/* Ambient outlined orbs */}
      <div className="pointer-events-none absolute -top-24 -right-24 z-0 rounded-full border border-[#1a4b7c]/10 bg-[#1a4b7c]/03" style={{ width: 450, height: 450 }} />
      <div className="pointer-events-none absolute -bottom-16 -left-16 z-0 rounded-full border border-[#D4A017]/20 bg-[#D4A017]/05" style={{ width: 300, height: 300 }} />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">

          {/* ── About Card ── */}
          <Reveal dir="left" delay={0} className="lg:col-span-2 flex flex-col">
            <div className="flex flex-col h-full">
              {/* Pill tag */}
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] px-8 py-2 border mb-3 [clip-path:polygon(0_0,100%_0,96%_50%,100%_100%,0_100%)] shadow-md"
                   style={{ color: C.gold, background: '#1b3f6b', borderColor: 'rgba(212,160,23,0.5)', fontFamily: SF, borderRadius: '0px' }}>
                   Overview
                </span>
                <h2 className="text-3xl md:text-[2.4rem] font-bold tracking-tight" style={{ fontFamily: H, color: C.navy }}>About Gymkhana</h2>
                <GoldBar center={false} delay={300} />
              </div>

              <div className="flex-1 relative overflow-hidden bg-white transition-all duration-400 cursor-default shadow-[0_14px_30px_-24px_rgba(10,32,66,0.55)]"
                style={{ borderRadius: '40px 0 40px 0', border: '1px solid rgba(11,44,74,0.08)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0_20px_40px_-20px_rgba(10,32,66,0.65)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0_14px_30px_-24px_rgba(10,32,66,0.55)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}>
                {/* Animated top border */}
                <div className="absolute inset-x-0 top-0 h-[4px]" style={{ background: `linear-gradient(90deg, ${C.navy}, ${C.gold}, ${C.navy})`, backgroundSize: '200% 100%', animation: 'shimmer 4s linear infinite' }} />
                {/* Background glow orbs */}
                <div className="absolute -top-10 -right-10 rounded-full pointer-events-none" style={{ width: 160, height: 160, background: `radial-gradient(circle, rgba(212,160,23,0.12) 0%, transparent 70%)`, filter: 'blur(20px)' }} />
                <div className="absolute -bottom-10 -left-10 rounded-full pointer-events-none" style={{ width: 120, height: 120, background: `radial-gradient(circle, rgba(11,44,74,0.08) 0%, transparent 70%)`, filter: 'blur(20px)' }} />
                {/* Pulse badge */}
                <div className="p-8 pb-0 md:p-10 md:pb-0">
                  <div className="mb-5 inline-flex items-center gap-3 px-4 py-1.5" style={{ background: C.navy, borderRadius: '4px', border: `1px solid rgba(212,160,23,0.4)` }}>
                    <div className="h-0.5 w-8" style={{ backgroundColor: C.gold }} />
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: C.gold, boxShadow: `0 0 8px ${C.gold}`, animation: 'pulse 2s infinite' }} />
                    <div className="h-0.5 w-4" style={{ backgroundColor: `${C.gold}99` }} />
                  </div>
                </div>
                <p className="relative z-10 text-[19px] text-gray-700 leading-9 p-8 pt-5 md:p-10 md:pt-4" style={{ fontFamily: T }}>
                  At VCET the Gymkhana serves as the vibrant heart of our campus, pulsating with energy and
                  opportunities for students to engage, excel, and enrich their college experience. For
                  athletics, the Gymkhana offers a wide array of programs designed to cater to the varied
                  interests of our students. More than just a recreational centre, the Gymkhana is a hub of
                  diverse activities, where students come together to pursue their passions, cultivate new
                  skills, and forge lasting friendships.
                </p>
              </div>
            </div>
          </Reveal>

          {/* ── Timings Card ── */}
          <Reveal dir="right" delay={150} className="lg:col-span-1 flex flex-col">
            <div className="flex flex-col h-full">
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] px-8 py-2 border mb-3 [clip-path:polygon(0_0,100%_0,96%_50%,100%_100%,0_100%)] shadow-md"
                  style={{ color: C.gold, background: '#1b3f6b', borderColor: 'rgba(212,160,23,0.5)', fontFamily: SF, borderRadius: '0px' }}>
                  Working Hours
                </span>
                <h2 className="text-3xl md:text-[2.4rem] font-bold tracking-tight" style={{ fontFamily: H, color: C.navy }}>Timings</h2>
                <GoldBar center={false} delay={450} />
              </div>
              <div className="flex-1 bg-white transition-all duration-400 shadow-[0_14px_30px_-24px_rgba(10,32,66,0.55)]"
                style={{ borderRadius: '0 40px 0 40px', border: `1px solid rgba(11,44,74,0.08)`, borderLeft: `6px solid ${C.navy}` }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0_20px_40px_-20px_rgba(10,32,66,0.65)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0_14px_30px_-24px_rgba(10,32,66,0.55)')}>
                <div className="p-7">
                  {/* Clock header */}
                  <div className="flex items-center gap-3 mb-6 pb-4" style={{ borderBottom: '1px solid rgba(11,44,74,0.08)' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${C.navy}12` }}>
                      <svg className="w-5 h-5" style={{ color: C.navy }} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    </div>
                    <h3 className="text-[1.05rem] font-bold" style={{ fontFamily: H, color: C.navy }}>Monday to Friday</h3>
                  </div>
                  <div className="space-y-4">
                    {[['Session 1', '1.15 pm \u2013 2.00 pm'], ['Session 2', '4.00 pm \u2013 6.00 pm']].map(([label, time], i) => (
                      <div key={label} className="transition-all duration-300"
                        style={{ borderRadius: '10px', background: i === 0 ? '#f8fafd' : '#f0f4fb', borderLeft: `3px solid ${C.gold}`, padding: '16px 18px' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 6px 20px rgba(11,44,74,0.1)`; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'none'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}>
                        <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: '#94a3b8', fontFamily: SF }}>{label}</p>
                        <p className="text-[20px] font-bold" style={{ fontFamily: T, color: '#1a1a2e' }}>{time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    {/* ══ 2. SPORTS FACILITIES ════════════════════════════════════ */}
    <section className="py-14 relative overflow-hidden" style={{ background: '#eaf0f9' }}>
      <div className="pointer-events-none absolute top-10 left-10 z-0 rounded-full border border-[#D4A017]/25 bg-[#D4A017]/08" style={{ width: 400, height: 400 }} />
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

          {/* Sports grid */}
          <div className="lg:col-span-2">
            <SH title="Sports Facilities" tag="Activities" center={false} delay={0} />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {displaySports.map((sport, idx) => (
                <Reveal key={idx} delay={idx * 40} dir="up">
                  <div className="group flex items-center gap-3 px-4 py-4 bg-white transition-all duration-300 cursor-default"
                    style={{ borderRadius: '0px', boxShadow: '0 2px 12px rgba(11,44,74,0.07)', border: '1px solid rgba(11,44,74,0.08)', borderLeft: `6px solid ${C.navy}` }}
                    onMouseEnter={e => {
                      const d = e.currentTarget as HTMLDivElement;
                      d.style.transform = 'translateY(-3px)';
                      d.style.boxShadow = `0 10px 28px rgba(11,44,74,0.14)`;
                      d.style.borderColor = C.gold;
                      d.style.backgroundColor = '#102a4c';
                    }}
                    onMouseLeave={e => {
                      const d = e.currentTarget as HTMLDivElement;
                      d.style.transform = 'none';
                      d.style.boxShadow = '0 2px 12px rgba(11,44,74,0.07)';
                      d.style.borderColor = 'rgba(11,44,74,0.08)';
                      d.style.backgroundColor = '#fff';
                    }}>
                    {/* Icon container */}
                    <div className="w-9 h-9 rounded-none flex items-center justify-center shrink-0 transition-all duration-300 group-hover:rotate-6 shadow-sm" style={{ background: `${C.navy}0f`, border: `1px solid ${C.navy}20` }}>
                      <svg className="w-4 h-4 text-[#1a4b7c] transition-colors duration-300 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d={COMMON_SPORT_ICON} />
                      </svg>
                    </div>
                    <span className="text-[15px] font-semibold leading-snug text-[#1a1a2e] transition-colors duration-300 group-hover:text-white" style={{ fontFamily: SF }}>{sport.name}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Facility images */}
          <Reveal dir="right" delay={200} className="lg:col-span-1">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] px-8 py-2 border mb-3 [clip-path:polygon(0_0,100%_0,96%_50%,100%_100%,0_100%)] shadow-md"
                style={{ color: C.gold, background: '#1b3f6b', borderColor: 'rgba(212,160,23,0.5)', fontFamily: SF, borderRadius: '0px' }}>
                Facility
              </span>
              <h2 className="text-3xl md:text-[2.4rem] font-bold tracking-tight" style={{ fontFamily: H, color: C.navy }}>Facility Images</h2>
              <GoldBar center={false} delay={400} />
            </div>
            <div className="flex flex-col gap-5">
              {displayFacilityImages.map((image, index) => (
                <div key={index} className="h-52 overflow-hidden border border-white/20">
                  <img src={image} alt={index === 0 ? 'Gymkhana Facility' : 'Sports Ground'} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    {/* ══ 3. ACHIEVEMENTS / COMPETITIONS — DARK NAVY SECTION ════════ */}
    <section className="py-14 relative overflow-hidden" style={{ background: `linear-gradient(160deg, ${C.navyDk} 0%, ${C.navyMd} 100%)` }}>
      {/* Decorative orbs */}
      <div className="pointer-events-none absolute -top-24 -left-24 rounded-full opacity-20" style={{ width: 350, height: 350, background: `radial-gradient(circle, ${C.gold} 0%, transparent 65%)`, filter: 'blur(60px)' }} />
      <div className="pointer-events-none absolute -bottom-24 -right-24 rounded-full opacity-10" style={{ width: 300, height: 300, background: `radial-gradient(circle, ${C.goldLt} 0%, transparent 65%)`, filter: 'blur(60px)' }} />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <SH title="Sports Achievements" tag="Records" center light delay={0} />

        {/* Intro paragraph box */}
        <Reveal delay={100}>
          <div className="mb-12 p-8 md:p-12 relative overflow-hidden transition-all duration-500 cursor-default group/intro"
            style={{
              borderRadius: '0px',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={e => {
              const d = e.currentTarget as HTMLDivElement;
              d.style.transform = 'translateY(-5px)';
              d.style.background = 'rgba(255,255,255,0.14)';
              d.style.borderColor = C.gold;
              d.style.boxShadow = `0 20px 45px rgba(0,0,0,0.3), 0 0 15px ${C.gold}25`;
            }}
            onMouseLeave={e => {
              const d = e.currentTarget as HTMLDivElement;
              d.style.transform = 'none';
              d.style.background = 'rgba(255,255,255,0.08)';
              d.style.borderColor = 'rgba(255,255,255,0.15)';
              d.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
            }}>
            {/* Decorative gold quote icon */}
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover/intro:opacity-40 transition-opacity duration-500">
              <svg className="w-16 h-16" style={{ color: C.gold }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017C10.4647 13 10.017 12.5523 10.017 12V9C10.017 7.34315 11.3601 6 13.017 6H19.017C20.6738 6 22.017 7.34315 22.017 9V15C22.017 17.2091 20.2261 19 18.017 19H17.017C16.4647 19 16.017 19.4477 16.017 20V21H14.017ZM3.017 21L3.017 18C3.017 16.8954 3.91243 16 5.017 16H8.017C8.56928 16 9.017 15.5523 9.017 15V9C9.017 8.44772 8.46928 8 7.917 8H4.017C3.46472 8 3.017 8.44772 3.017 9V12C3.017 12.5523 2.56928 13 2.017 13H0.017C-0.535282 13 -1.017 12.5523 -1.017 12V9C-1.017 7.34315 0.326145 6 2.017 6H8.017C9.67385 6 11.017 7.34315 11.017 9V15C11.017 17.2091 9.22614 19 7.017 19H6.017C5.46472 19 5.017 19.4477 5.017 20V21H3.017Z" />
              </svg>
            </div>

            <p className="text-[20px] leading-10 relative z-10 italic font-medium" style={{ fontFamily: T, color: 'rgba(255,255,255,0.95)' }}>
              Vidyavardhini's College of Engineering and Technology always encourages its students to
              participate in extracurricular activities. This year our students participated in university
              sports organized by the University of Mumbai. The sports include Cricket, Volleyball, Kabaddi,
              Wrestling, Power Lifting and Mallakhamb. The Brief summary for AY 2023-24 of student's
              participation is as follows.
            </p>
          </div>
        </Reveal>

        {/* Competition split-cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
          {competitionsList.map((title, idx) => (
            <Reveal key={idx} delay={idx * 80} className="h-full">
              <div className="group h-full min-h-[220px] overflow-hidden grid grid-cols-1 sm:grid-cols-[46%_54%] transition-all duration-400 cursor-pointer"
                style={{ borderRadius: '0px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}
                onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.background = 'rgba(255,255,255,0.12)'; d.style.transform = 'translateY(-4px)'; d.style.boxShadow = `0 20px 50px rgba(0,0,0,0.3)`; }}
                onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.background = 'rgba(255,255,255,0.07)'; d.style.transform = 'none'; d.style.boxShadow = 'none'; }}>
                {/* Text panel */}
                <div className="flex h-full flex-col justify-center px-6 py-6 relative" style={{ borderRight: '1px solid rgba(255,255,255,0.10)' }}>
                  {/* Left accent bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-400 group-hover:w-[5px]" style={{ background: `linear-gradient(to bottom, ${C.gold}, ${C.goldLt})`, borderRadius: '0 2px 2px 0' }} />
                  <span className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: C.gold, fontFamily: SF }}>Competition</span>
                  <h4 className="text-[16.5px] font-bold leading-snug transition-colors duration-300 group-hover:text-[#F5CC5B]" style={{ fontFamily: H, color: '#fff' }}>{title}</h4>
                </div>
                <div className="relative min-h-[220px] overflow-hidden" style={{ borderRadius: '0px' }}>
                  <img
                    src={displayCompetitionImages[idx]}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* ══ 4. STUDENT ACHIEVEMENTS — TIMELINE ════════════════════════ */}
    <section className="py-14 relative overflow-hidden" style={{ background: '#edf3fb' }}>
      <div className="pointer-events-none absolute -top-20 -right-20 z-0 rounded-full border border-[#D4A017]/30 bg-[#D4A017]/10" style={{ width: 450, height: 450 }} />
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <SH title="Student Achievements" tag="Proud Moments" delay={0} />

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Central vertical line */}
          <div className="absolute left-[22px] md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-px" style={{ background: `linear-gradient(to bottom, ${C.navy}, rgba(11,44,74,0.1))` }} />

          {displayAchievements.map((ach, idx) => {
            const m = MEDAL[ach.medal];
            const isRight = idx % 2 === 0;
            return (
              <Reveal key={idx} delay={idx * 100} dir={isRight ? 'left' : 'right'}>
                <div className={`relative pl-14 md:pl-0 mb-8 md:flex ${isRight ? 'md:flex-row' : 'md:flex-row-reverse'} md:gap-8 md:items-center`}>
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-5 w-[44px] h-[44px] rounded-full flex items-center justify-center shrink-0 z-10"
                    style={{ background: '#fff', border: `3px solid ${m.dot}`, boxShadow: `0 0 0 5px ${m.glow}` }}>
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: m.dot, animation: 'pulse 2s infinite' }} />
                  </div>

                  {/* Card */}
                  <div className={`md:w-[calc(50%-28px)] bg-white transition-all duration-300 ${isRight ? 'md:mr-auto' : 'md:ml-auto'}`}
                    style={{ borderRadius: '0px', boxShadow: '0 4px 20px rgba(11,44,74,0.08)', border: `1px solid rgba(11,44,74,0.07)`, borderLeft: `4px solid ${m.dot}`, padding: '20px 24px' }}
                    onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.transform = 'translateY(-3px)'; d.style.boxShadow = `0 12px 32px rgba(11,44,74,0.14)`; }}
                    onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.transform = 'none'; d.style.boxShadow = '0 4px 20px rgba(11,44,74,0.08)'; }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5" style={{ background: `${m.glow}`, color: m.dot === '#D4A017' ? '#b8860b' : m.dot, fontFamily: SF, borderRadius: '0px' }}>{m.label} Medal</span>
                    </div>
                    <p className="text-[16px] leading-7" style={{ fontFamily: T, color: '#374151' }}>{ach.text}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>

    {/* ══ 5. SPORTS RESULTS ══════════════════════════════════════════ */}
    <section className="py-14 relative overflow-hidden" style={{ background: '#eef3fa' }}>
      <div className="pointer-events-none absolute bottom-0 left-0 z-0 rounded-full border border-[#1a4b7c]/15 bg-[#1a4b7c]/04" style={{ width: 400, height: 400 }} />
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <SH title="Sports Results" tag="Victories" delay={0} />
        <div className="space-y-8">
          <ResultTable title="Cricket Results" rows={displayCricketResults} fullCols delay={0} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ResultTable title="Football Results" rows={displayFootballResults} delay={100} />
            <ResultTable title="Kabaddi Results" rows={displayKabaddiResults} delay={180} />
          </div>
        </div>
      </div>
    </section>

    {/* Global keyframes */}
    <style>{`
      @keyframes shimmer {
        0%   { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50%  { opacity: 0.6; transform: scale(1.15); }
      }
    `}</style>
    </PageLayout>
  );
};

export default SportsGymkhana;
