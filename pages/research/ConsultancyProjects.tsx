import React, { useEffect, useMemo, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { Briefcase, TrendingUp, Zap, Download, FileText, ExternalLink } from 'lucide-react';
import { getResearchSection } from '../../services/research';
import { resolveUploadedAssetUrl } from '../../utils/uploadedAssets';

// ─── Revenue Trend Data (sorted chronologically) ──────────────────────────────
interface RevenueEntry { year: string; value: number; note: 'Peak' | 'Lowest' | '' }

const defaultRevenueData: RevenueEntry[] = [
  { year: "'16-17", value: 0.880, note: '' },
  { year: "'17-18", value: 0.352, note: '' },
  { year: "'18-19", value: 0.348, note: '' },
  { year: "'19-20", value: 0.715, note: '' },
  { year: "'20-21", value: 0.325, note: 'Lowest' },
  { year: "'21-22", value: 2.720, note: 'Peak' },
  { year: "'22-23", value: 2.280, note: '' },
  { year: "'23-24", value: 0.666, note: '' },
];

// ─── SVG Chart Constants ───────────────────────────────────────────────────────
const CW = 960, CH = 440;
const PAD_L = 80, PAD_R = 24, PAD_T = 56, PAD_B = 80;
const PLOT_W = CW - PAD_L - PAD_R;   // 856
const PLOT_H = CH - PAD_T - PAD_B;   // 304
const DEFAULT_MAX_VAL = 2.72;
const Y_GRID = [0.5, 1.0, 1.5, 2.0, 2.5];

// ─── Consultancy Portfolio ─────────────────────────────────────────────────────
interface PortfolioItem {
  name: string;
  tagline: string;
  description: string;
  keywords: string[];
  iconBg: string;
  emoji: string;
  imageUrl?: string;
}

const defaultPortfolio: PortfolioItem[] = [
  {
    name: 'Arihant / Playtime',
    tagline: 'Playground & Water Park Equipment Provider',
    description: 'Consultancy for design, safety evaluation, and quality assurance of recreational playground and water park equipment.',
    keywords: ['Playground', 'Water Park', 'Equipment'],
    iconBg: 'from-sky-400 to-cyan-500',
    emoji: '🎠',
    imageUrl: '/images/Research/Consultancy Projects/Arihant - Playtime/Arihant_Playtime_.jpg',
  },
  {
    name: 'Synergy',
    tagline: '"Together We Achieve More"',
    description: 'Collaborative industrial solutions leveraging VCET faculty expertise for integrated engineering and project management outcomes.',
    keywords: ['Collaboration', 'Integration', 'Solutions'],
    iconBg: 'from-violet-500 to-purple-600',
    emoji: '🤝',
  },
  {
    name: 'Tata Memorial Hospital',
    tagline: 'Service · Research · Education',
    description: 'Premier cancer treatment and research institution in Mumbai. Consultancy spanning medical engineering, biomedical devices, and healthcare research.',
    keywords: ['Cancer Research', 'Healthcare', 'Biomedical'],
    iconBg: 'from-red-500 to-rose-600',
    emoji: '🏥',
    imageUrl: '/images/Research/Consultancy Projects/Tata Memorial Hospital/Tata_Memorial_Hospital.png',
  },
  {
    name: 'Achievo',
    tagline: '"Creative Solutions Beyond Imagination"',
    description: 'Technology-driven consultancy enabling innovative product design, rapid prototyping, and engineering breakthroughs.',
    keywords: ['Innovation', 'Product Design', 'Technology'],
    iconBg: 'from-amber-400 to-orange-500',
    emoji: '💡',
    imageUrl: '/images/Research/Consultancy Projects/Achievo/Achievo.jpg',
  },
  {
    name: 'Funplay',
    tagline: 'Innovation · Safety · Speed',
    description: 'Next-generation recreational and entertainment solutions engineered with a focus on innovation, structural safety, and performance.',
    keywords: ['Innovation', 'Safety', 'Speed'],
    iconBg: 'from-green-400 to-emerald-600',
    emoji: '🎮',
    imageUrl: '/images/Research/Consultancy Projects/Funplay/Funplay.jpg',
  },
  {
    name: 'Abhinandan Industries',
    tagline: 'Geometric Precision, Engineered Excellence',
    description: 'Industrial manufacturing partner identifiable by its geometric, circular orange-and-grey icon — symbolising precision and reliability.',
    keywords: ['Industrial', 'Engineering', 'Manufacturing'],
    iconBg: 'from-orange-400 to-slate-500',
    emoji: '⚙️',
    imageUrl: '/images/Research/Consultancy Projects/Abhinandan Industries/Abhinandan_Industries.jpg',
  },
  {
    name: 'ARS Energy Auditors',
    tagline: 'Energy Audits & Efficiency Specialists',
    description: 'Comprehensive energy audit consultancy helping industries quantify consumption, reduce waste, and significantly improve operational efficiency.',
    keywords: ['Energy Audit', 'Efficiency', 'Sustainability'],
    iconBg: 'from-yellow-400 to-amber-500',
    emoji: '⚡',
    imageUrl: '/images/Research/Consultancy Projects/ARS Energy Auditors/ARS_Energy_Auditors.jpg',
  },
  {
    name: 'Sridevi',
    tagline: 'Block. Bold. Green.',
    description: 'Business consulting partner recognised by its distinctive green block-style graphic logo, reflecting structured and sustainable business practices.',
    keywords: ['Sustainability', 'Brand', 'Consulting'],
    iconBg: 'from-green-600 to-teal-600',
    emoji: '🟩',
  },
  {
    name: 'Parle / One Roof Solution',
    tagline: 'Pharma · Food & Beverages · Cosmetics',
    description: 'Integrated consultancy for the fast-moving consumer goods sector, spanning pharmaceutical manufacturing, food & beverages, and cosmetics.',
    keywords: ['Pharma', 'Food & Beverages', 'Cosmetics'],
    iconBg: 'from-pink-500 to-fuchsia-600',
    emoji: '🏭',
    imageUrl: '/images/Research/Consultancy Projects/Parle - One Roof Solution/Parle_One_Roof.jpg',
  },
];

const ConsultancyProjects: React.FC = () => {
  const [apiData, setApiData] = useState<any>(null);
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    getResearchSection<any>('consultancy')
      .then((res) => mounted && setApiData(res))
      .catch(() => mounted && setApiData(null))
      .finally(() => {
        if (mounted) setApiLoaded(true);
      });
    

return () => {
      mounted = false;
    };
  }, []);

    const revenueData = useMemo(() => {
    const rows = Array.isArray(apiData?.consultancyRevenue)
      ? apiData.consultancyRevenue
          .map((row: any) => ({
            year: String(row?.year ?? '').trim(),
            value: Number.parseFloat(String(row?.value ?? '0')),
            note: (row?.note === 'Peak' || row?.note === 'Lowest' ? row.note : '') as 'Peak' | 'Lowest' | '',
          }))
          .filter((row: RevenueEntry) => row.year && Number.isFinite(row.value))
      : [];
    return rows.length > 0 ? rows : defaultRevenueData;
  }, [apiData]);

  const portfolio = useMemo(() => {
    const cards = Array.isArray(apiData?.industryPartners)
      ? apiData.industryPartners
          .map((partner: any, index: number) => ({
            name: String(partner?.name ?? '').trim(),
            tagline: String(partner?.tagline ?? '').trim(),
            description: String(partner?.description ?? '').trim(),
            keywords: Array.isArray(partner?.tags) ? partner.tags.map((tag: unknown) => String(tag ?? '').trim()).filter(Boolean).slice(0, 3) : [],
            iconBg: defaultPortfolio[index % defaultPortfolio.length]?.iconBg || 'from-slate-400 to-slate-600',
            emoji: defaultPortfolio[index % defaultPortfolio.length]?.emoji || '🔬',
            imageUrl: resolveUploadedAssetUrl(partner?.imageUrl ?? null) || undefined,
          }))
          .filter((partner: PortfolioItem) => partner.name.length > 0)
      : [];
    return cards.length > 0 ? cards : defaultPortfolio;
  }, [apiData]);

  const consultancyReportHref =
    resolveUploadedAssetUrl(apiData?.consultancyReport?.fileUrl ?? apiData?.consultancyReport?.url ?? null)
    || 'https://vcet.edu.in/wp-content/uploads/2024/06/CONSULTANCY-PROJECTS-revised.pdf';

  const MAX_VAL = Math.max(DEFAULT_MAX_VAL, ...revenueData.map((d) => d.value), 1);
  const SLOT_W = PLOT_W / Math.max(revenueData.length, 1);
  const BAR_W = Math.floor(SLOT_W * 0.58);

  function bHeight(v: number) { return (v / MAX_VAL) * PLOT_H; }
  function bX(i: number) { return PAD_L + i * SLOT_W + (SLOT_W - BAR_W) / 2; }
  function bY(v: number) { return PAD_T + PLOT_H - bHeight(v); }

        if (!apiLoaded) {
  return (
  <PageLayout>
  <PageBanner
  title="Consultancy Projects"
  breadcrumbs={[
  { label: 'Research', href: '/research' },
  { label: 'Consultancy Projects' },
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
        title="Consultancy Projects"
        breadcrumbs={[
          { label: 'Research', href: '/research' },
          { label: 'Consultancy Projects' },
        ]}
      />


      {/* ── Revenue Trends + Insights Sidebar ─────────────────────────────────── */}
      <section className="py-8 md:py-16 bg-brand-light">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Section header */}
            <div className="reveal text-center mb-8 md:mb-12">
              <div className="flex items-center justify-center gap-3 mb-3 md:mb-4">
                <div className="w-8 md:w-10 h-0.5 bg-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                  Data Visualization
                </span>
                <div className="w-8 md:w-10 h-0.5 bg-brand-gold" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-brand-navy mb-2 md:mb-3">
                Consultancy Revenue Trends
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto text-sm">
                Year-wise consultancy revenue (₹ in Lacs) — academic years 2016–17 to 2023–24
              </p>
            </div>

            <div className="flex flex-col gap-8">

              {/* ── Vertical Bar Chart (full width) ───────────────────────── */}
              <div className="reveal bg-white rounded-2xl p-3 sm:p-6 border border-gray-100 shadow-sm overflow-x-auto">
                <svg
                  viewBox={`0 0 ${CW} ${CH}`}
                  className="w-full h-auto"
                  aria-label="Consultancy Revenue Trends Bar Chart"
                >
                  {/* Y-axis labels only (no grid lines) */}
                  {Y_GRID.map((v) => {
                    const y = PAD_T + PLOT_H - (v / MAX_VAL) * PLOT_H;
                    return (
                      <text
                        key={v}
                        x={PAD_L - 10} y={y + 5}
                        textAnchor="end" fontSize="14" fill="#64748B"
                      >
                        {v.toFixed(1)}
                      </text>
                    );
                  })}

                  {/* Baseline + Y-axis spine */}
                  <line x1={PAD_L} y1={PAD_T + PLOT_H} x2={CW - PAD_R} y2={PAD_T + PLOT_H} stroke="#CBD5E1" strokeWidth="1.5" />
                  <line x1={PAD_L} y1={PAD_T}           x2={PAD_L}      y2={PAD_T + PLOT_H} stroke="#CBD5E1" strokeWidth="1.5" />

                  {/* Bars */}
                  {revenueData.map((d, i) => {
                    const bh  = bHeight(d.value);
                    const x   = bX(i);
                    const y   = bY(d.value);
                    const isPeak   = d.note === 'Peak';
                    const isLowest = d.note === 'Lowest';
                    const fill = isPeak ? '#EAB308' : isLowest ? '#94A3B8' : '#1A4B7C';
                    const labelFill = isPeak ? '#A16207' : isLowest ? '#64748B' : '#1A4B7C';

                    return (
                      <g key={d.year}>
                        {/* Bar */}
                        <rect x={x} y={y} width={BAR_W} height={bh} fill={fill} rx="4" ry="4" opacity="0.92" />

                        {/* Peak / Lowest badge */}
                        {d.note !== '' && (
                          <text
                            x={x + BAR_W / 2} y={y - 28}
                            textAnchor="middle" fontSize="13" fontWeight="700" fill={labelFill}
                          >
                            {isPeak ? '▲ Peak' : '▼ Lowest'}
                          </text>
                        )}

                        {/* Value label */}
                        <text
                          x={x + BAR_W / 2} y={y - 10}
                          textAnchor="middle" fontSize="15" fontWeight="700" fill={labelFill}
                        >
                          {d.value}
                        </text>

                        {/* X-axis label */}
                        <text
                          x={x + BAR_W / 2} y={PAD_T + PLOT_H + 26}
                          textAnchor="middle" fontSize="14" fill="#475569"
                        >
                          {d.year}
                        </text>
                      </g>
                    );
                  })}

                  {/* Y-axis unit label (rotated) */}
                  <text
                    x={20}
                    y={PAD_T + PLOT_H / 2}
                    textAnchor="middle"
                    fontSize="13"
                    fill="#64748B"
                    transform={`rotate(-90 20 ${PAD_T + PLOT_H / 2})`}
                  >
                    ₹ Lacs
                  </text>

                  {/* Legend */}
                  <g>
                    <rect x={PAD_L + 4} y={CH - 22} width="14" height="12" fill="#1A4B7C" rx="3" />
                    <text x={PAD_L + 22} y={CH - 11} fontSize="13" fill="#475569">Regular</text>

                    <rect x={PAD_L + 100} y={CH - 22} width="14" height="12" fill="#EAB308" rx="3" />
                    <text x={PAD_L + 118} y={CH - 11} fontSize="13" fill="#475569">Peak Year</text>

                    <rect x={PAD_L + 210} y={CH - 22} width="14" height="12" fill="#94A3B8" rx="3" />
                    <text x={PAD_L + 228} y={CH - 11} fontSize="13" fill="#475569">Lowest Year</text>
                  </g>
                </svg>
              </div>

              {/* ── Golden Era insight banner (full width, below chart) ───── */}
              <div className="reveal bg-amber-50 border border-amber-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4" style={{ transitionDelay: '0.15s' }}>
                <div className="w-11 h-11 bg-amber-400/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-amber-600" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-amber-600 mb-0.5">Golden Era</p>
                  <h4 className="font-display font-bold text-amber-900 text-base leading-tight mb-1">
                    2021–22 Surge — VCET's Consultancy Peak
                  </h4>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    The academic year 2021–22 marked VCET's consultancy peak at{' '}
                    <span className="font-bold">₹ 2.72 Lacs</span> — a{' '}
                    <span className="font-bold">737 %</span> jump from the 2020–21 low, reflecting a strong post-pandemic industry rebound and active outreach by the faculty consultancy cell.
                  </p>
                </div>
                <div className="flex-shrink-0 flex items-center gap-2 text-xs font-semibold text-amber-700 bg-amber-100 rounded-lg px-3 py-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  Peak: ₹ 2.72 L in '21–22
                </div>
              </div>

              {/* ── PDF Download Button ─────────────────────────────────── */}
              <div className="reveal mt-8 md:mt-10 border border-[#E5E7EB] bg-white w-full">
                <a
                  href={consultancyReportHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 px-4 sm:px-6 py-4 sm:py-5 group hover:bg-[#F7F9FC] transition-colors duration-200"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-[#1a4b7c] text-white flex-shrink-0">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <h3 className="text-[15px] sm:text-[17px] font-display font-bold text-[#1a4b7c] group-hover:text-[#3a6fa8] transition-colors">
                      Consultancy Projects Report
                    </h3>
                    <p className="text-[13px] sm:text-[14px] text-[#374151] mt-1 leading-relaxed">
                      View the detailed record of consultancy projects, revenue trends, and industry collaborations executed by VCET faculty.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 px-3 sm:px-4 py-2 border border-[#1a4b7c] text-[#1a4b7c] group-hover:bg-[#1a4b7c] group-hover:text-white transition-colors duration-200 min-h-[44px]">
                    <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.15em]">View PDF</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Consultancy Portfolio Grid ─────────────────────────────────────────── */}
      <section className="py-8 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Section header */}
            <div className="reveal text-center mb-8 md:mb-12">
              <div className="flex items-center justify-center gap-3 mb-3 md:mb-4">
                <div className="w-8 md:w-10 h-0.5 bg-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                  Industry Partners
                </span>
                <div className="w-8 md:w-10 h-0.5 bg-brand-gold" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-brand-navy mb-2 md:mb-3">
                Consultancy Portfolio
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto text-sm">
                A cross-sector portfolio of organisations that have partnered with VCET's faculty for consultancy engagements
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.map((item, idx) => (
                <div
                  key={item.name}
                  className="reveal bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col"
                  style={{ transitionDelay: `${idx * 0.07}s` }}
                >
                  {/* Image Placeholder */}
                  <div className="aspect-[16/9] bg-white border-b border-gray-100 flex items-center justify-center overflow-hidden">
                    {item.imageUrl ? (
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-full h-full object-contain p-4 mix-blend-multiply" 
                      />
                    ) : (
                      <div className="text-center px-4">
                        <div className={`w-14 h-14 mx-auto mb-3 rounded-xl flex items-center justify-center text-3xl`}>
                          {item.emoji}
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                          {item.name}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-display font-bold text-brand-navy text-base leading-tight mb-1">
                      {item.name}
                    </h3>
                    <p className="text-xs font-semibold text-brand-gold italic mb-2">
                      {item.tagline}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed flex-1">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {item.keywords.map((kw) => (
                        <span
                          key={kw}
                          className="px-2.5 py-0.5 bg-brand-light text-brand-navy text-[10px] font-semibold uppercase tracking-wide rounded-full border border-gray-100"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ConsultancyProjects;
