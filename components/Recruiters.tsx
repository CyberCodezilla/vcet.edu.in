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
    className={`overflow-hidden flex flex-col ${className}`}
    >
    {children}
  </div>
);

// -- Accent Bar ----------------------------------------------------------------
const Bar: React.FC<{ pct: string; gold?: boolean }> = ({ pct, gold }) => (
  <div className="w-full h-1.5 rounded-full overflow-hidden mt-5" style={{ background: "#DCE7F7" }}>
    <div
      style={{ width: pct, background: gold ? "#F4B400" : "#1E4DB7" }}
      className="h-full rounded-full"
    />
  </div>
);

// -- Main ----------------------------------------------------------------------
const Recruiters: React.FC = () => (
  <section className="py-24 relative overflow-hidden">

    {/* Background image */}
    <img
      src="/Images/PLACEMENT/corporate.jpg"
      alt=""
      className="absolute inset-0 w-full h-full object-cover"
      aria-hidden="true"
    />
    {/* Light overlay so content stays readable */}
    <div className="absolute inset-0" style={{ background: "rgba(248,250,252,0.82)" }} />

    {/* Ambient glows */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-300/20 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />
    </div>

    {/* Corner decorations */}
    {/* Top-left */}
    <div className="absolute top-0 left-0 w-24 h-24 pointer-events-none">
      <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 rounded-tl-sm" style={{ borderColor: "#F4B400" }} />
      <div className="absolute top-3 left-3 w-5 h-5 border-t border-l" style={{ borderColor: "rgba(11,61,145,0.2)" }} />
    </div>
    {/* Top-right */}
    <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none">
      <div className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 rounded-tr-sm" style={{ borderColor: "#F4B400" }} />
      <div className="absolute top-3 right-3 w-5 h-5 border-t border-r" style={{ borderColor: "rgba(11,61,145,0.2)" }} />
    </div>
    {/* Bottom-left */}
    <div className="absolute bottom-0 left-0 w-24 h-24 pointer-events-none">
      <div className="absolute bottom-6 left-6 w-10 h-10 border-b-2 border-l-2 rounded-bl-sm" style={{ borderColor: "#F4B400" }} />
      <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l" style={{ borderColor: "rgba(11,61,145,0.2)" }} />
    </div>
    {/* Bottom-right */}
    <div className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none">
      <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 rounded-br-sm" style={{ borderColor: "#F4B400" }} />
      <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r" style={{ borderColor: "rgba(11,61,145,0.2)" }} />
    </div>

    <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">

      {/* Section Header */}
      <div className="mb-8 md:mb-14 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-px" style={{ background: "#F4B400" }} />
          <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "#0B3D91" }}>
            Placement Partners
          </span>
          <div className="w-8 h-px" style={{ background: "#F4B400" }} />
        </div>
        <h2 className="text-4xl md:text-5xl font-display font-extrabold leading-tight mb-4" style={{ color: "#1E293B" }}>
          Where Our{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(90deg, #0B3D91, #1E4DB7)" }}
          >
            Alumni Thrive
          </span>
        </h2>
        <p className="max-w-md mx-auto text-[15px] leading-relaxed" style={{ color: "#64748B" }}>
          Top-tier companies recruit from our campus every year &mdash; trusting VCET graduates to power their teams.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* 1 — Hero stat: Campus Offers */}
        <BentoBox
          className="md:col-span-2 p-8 justify-between min-h-[220px] border"
          style={{
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderColor: "rgba(11,61,145,0.15)",
            boxShadow: "0 8px 32px rgba(11,61,145,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
          }}
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#0B3D91" }}>
              2024-25 &middot; Placements
            </p>
            <h3 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-none tracking-tight" style={{ color: "#0B3D91" }}>
              285
            </h3>
            <p className="text-2xl font-medium mt-2" style={{ color: "#1E293B" }}>Campus Offers Made</p>
          </div>
          <div className="mt-6 space-y-3">
            <p className="text-sm leading-relaxed" style={{ color: "#64748B" }}>
              Our dedicated placement cell connects every student with industry leaders for interviews and full-time roles.
            </p>
            <Bar pct="80%" gold />
          </div>
        </BentoBox>

        {/* 2 — Highest Package */}
        <BentoBox
          className="p-8 justify-between min-h-[220px] border"
          style={{
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderColor: "rgba(11,61,145,0.15)",
            boxShadow: "0 8px 32px rgba(11,61,145,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
          }}
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#0B3D91" }}>
              Highest Package
            </p>
            <h3 className="text-5xl font-extrabold leading-none" style={{ color: "#F4B400" }}>
              ₹21 LPA
            </h3>
            <p className="text-sm mt-2" style={{ color: "#64748B" }}>Best offer &middot; 2024-25 batch</p>
          </div>
          <Bar pct="90%" gold />
        </BentoBox>

        {/* 3 — Placement Rate */}
        <BentoBox
          className="p-8 justify-between border"
          style={{
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderColor: "rgba(11,61,145,0.15)",
            boxShadow: "0 8px 32px rgba(11,61,145,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
          }}
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#64748B" }}>
              Placement Rate
            </p>
            <h3 className="text-5xl font-extrabold leading-none" style={{ color: "#0B3D91" }}>95%</h3>
            <p className="text-sm mt-2" style={{ color: "#64748B" }}>Students placed annually</p>
          </div>
          <Bar pct="95%" />
        </BentoBox>

        {/* 4 — Average Package */}
        <BentoBox
          className="md:col-span-2 p-8 justify-between border"
          style={{
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderColor: "rgba(11,61,145,0.15)",
            boxShadow: "0 8px 32px rgba(11,61,145,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
          }}
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#64748B" }}>
              Average Package
            </p>
            <h3 className="text-5xl font-extrabold leading-none" style={{ color: "#0B3D91" }}>
              ₹6 <span className="text-2xl font-semibold" style={{ color: "#64748B" }}>LPA</span>
            </h3>
            <p className="text-sm mt-2" style={{ color: "#64748B" }}>Across all streams &middot; 2024-25 batch</p>
          </div>
          <Bar pct="29%" />
        </BentoBox>

        {/* 5 — Hiring Partners static grid */}
        <div className="md:col-span-3 overflow-hidden border" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
          {/* Header strip */}
          <div className="px-8 pt-8 pb-6" style={{ background: "#0B3D91" }}>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-6 h-px" style={{ background: "#F4B400" }} />
              <p className="text-[14px] font-bold uppercase tracking-[0.25em]" style={{ color: "#EAF2FB" }}>
                Our Hiring Partners
              </p>
              <div className="w-6 h-px" style={{ background: "#F4B400" }} />
            </div>
          </div>
          {/* Logo grid */}
          <div className="bg-white px-4 sm:px-8 py-6 sm:py-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-5">
              {recruiters.map((company) => (
                <div
                  key={company.name}
                  className="group flex flex-col items-center justify-center gap-4 p-6 border-2 border-gray-100 bg-white shadow-sm hover:border-brand-gold hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
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
