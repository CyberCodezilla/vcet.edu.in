import React from "react";

// -- Data ----------------------------------------------------------------------
const recruiters = [
  { name: "Accenture",           logo: "/Images/recriters/Accenture-Logo-PNG-Vector-EPS-Free-Download.jpeg" },
  { name: "Godrej Infotech",     logo: "/Images/recriters/godrej-infotech.jpeg" },
  { name: "Hexaware",            logo: "/Images/recriters/hexaware-logo.jpeg" },
  { name: "Interactive Brokers", logo: "/Images/recriters/interactive-brokers.jpeg" },
  { name: "Neebal Technologies", logo: "/Images/recriters/neebal-technologoes.jpeg" },
  { name: "Vodafone",            logo: "/Images/recriters/vodafone-logo.jpeg" },
];

// -- BentoBox ------------------------------------------------------------------
interface BentoBoxProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}
const BentoBox: React.FC<BentoBoxProps> = ({ className = "", style, children }) => (
  <div
    style={style}
    className={`rounded-3xl border border-white/10 overflow-hidden flex flex-col ${className}`}
  >
    {children}
  </div>
);

// -- Accent Bar ----------------------------------------------------------------
const Bar: React.FC<{ pct: string }> = ({ pct }) => (
  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-5">
    <div
      style={{ width: pct }}
      className="h-full rounded-full bg-gradient-to-r from-brand-gold to-yellow-300"
    />
  </div>
);

// -- Main ----------------------------------------------------------------------
const Recruiters: React.FC = () => (
  <section className="py-24 bg-brand-dark relative overflow-hidden">

    {/* Ambient glows */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px]" />
    </div>

    <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">

      {/* Section Header */}
      <div className="mb-8 md:mb-14 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-px bg-brand-gold" />
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-gold">
            Placement Partners
          </span>
          <div className="w-8 h-px bg-brand-gold" />
        </div>
        <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white leading-tight mb-4">
          Where Our{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(90deg, #D4A843, #E8C972)" }}
          >
            Alumni Thrive
          </span>
        </h2>
        <p className="text-slate-400 max-w-md mx-auto text-[15px] leading-relaxed">
          Top-tier companies recruit from our campus every year � trusting VCET graduates to power their teams.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* 1 — Hero stat: Campus Offers */}
        <BentoBox
          className="md:col-span-2 p-5 sm:p-8 justify-between min-h-[200px] sm:min-h-[220px]"
          style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" }}
        >
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">
              2024-25 &middot; Placements
            </p>
            <h3 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white leading-none tracking-tight">
              285
            </h3>
            <p className="text-lg sm:text-2xl font-medium text-slate-300 mt-2">Campus Offers Made</p>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm mt-6">
            Our dedicated placement cell connects every student with industry leaders for interviews and full-time roles.
          </p>
        </BentoBox>

        {/* 2 — Highest Package */}
        <BentoBox
          className="p-5 sm:p-8 justify-between min-h-[200px] sm:min-h-[220px]"
          style={{ background: "rgba(212,168,67,0.07)" }}
        >
          <div>
            <p className="text-brand-gold/70 text-xs font-bold uppercase tracking-widest mb-3">
              Highest Package
            </p>
            <h3
              className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text leading-none"
              style={{ backgroundImage: "linear-gradient(135deg, #D4A843, #E8C972)" }}
            >
              ₹21 LPA
            </h3>
            <p className="text-slate-400 text-sm mt-2">Best offer &middot; 2024-25 batch</p>
          </div>
          <Bar pct="90%" />
        </BentoBox>

        {/* 3 — Placement Rate */}
        <BentoBox
          className="p-5 sm:p-8 justify-between"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">
              Placement Rate
            </p>
            <h3 className="text-3xl sm:text-5xl font-extrabold text-white leading-none">95%</h3>
            <p className="text-slate-500 text-sm mt-2">Students placed annually</p>
          </div>
          <Bar pct="95%" />
        </BentoBox>

        {/* 4 — Average Package */}
        <BentoBox
          className="md:col-span-2 p-5 sm:p-8 justify-between"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">
              Average Package
            </p>
            <h3 className="text-3xl sm:text-5xl font-extrabold text-white leading-none">
              ₹6 <span className="text-2xl font-semibold text-slate-400">LPA</span>
            </h3>
            <p className="text-slate-500 text-sm mt-2">Across all streams &middot; 2024-25 batch</p>
          </div>
          <Bar pct="29%" />
        </BentoBox>

        {/* 5 — Hiring Partners static grid */}
        <div className="md:col-span-3 rounded-3xl overflow-hidden border border-white/10">
          {/* Header strip */}
          <div className="bg-white px-4 sm:px-8 pt-5 sm:pt-8 pb-4 sm:pb-6 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-6 h-px bg-brand-gold" />
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                Our Hiring Partners
              </p>
              <div className="w-6 h-px bg-brand-gold" />
            </div>
            <p className="text-slate-400 text-sm mt-1">Companies that regularly recruit VCET graduates</p>
          </div>
          {/* Logo grid */}
          <div className="bg-white px-4 sm:px-8 py-6 sm:py-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-5">
              {recruiters.map((company) => (
                <div
                  key={company.name}
                  className="group flex flex-col items-center justify-center gap-2 sm:gap-4 p-4 sm:p-6 rounded-2xl border-2 border-gray-100 bg-white shadow-sm hover:border-brand-gold hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-full flex items-center justify-center h-20">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="max-w-full max-h-20 w-auto object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[12px] font-bold text-slate-600 text-center tracking-wide group-hover:text-brand-blue transition-colors leading-snug">
                    {company.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
);

export default Recruiters;
