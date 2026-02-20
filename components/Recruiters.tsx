import React from "react";
import { motion } from "framer-motion";

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
  delay?: number;
  children: React.ReactNode;
}
const BentoBox: React.FC<BentoBoxProps> = ({ className = "", style, delay = 0, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.55, delay, ease: "easeOut" }}
    whileHover={{ scale: 1.015 }}
    style={style}
    className={`rounded-3xl border border-white/10 overflow-hidden flex flex-col ${className}`}
  >
    {children}
  </motion.div>
);

// -- Infinite Marquee ----------------------------------------------------------
const InfiniteMarquee: React.FC<{ items: typeof recruiters }> = ({ items }) => (
  <div className="relative flex overflow-hidden w-full py-5">
    <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0f172a] to-transparent z-10 pointer-events-none" />
    <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0f172a] to-transparent z-10 pointer-events-none" />
    <motion.div
      className="flex gap-5"
      style={{ minWidth: "max-content" }}
      animate={{ x: ["0%", "-50%"] }}
      transition={{ repeat: Infinity, ease: "linear", duration: 22 }}
    >
      {[...items, ...items].map((company, i) => (
        <div
          key={i}
          className="flex-shrink-0 w-44 h-20 rounded-2xl flex items-center justify-center
                     bg-white/5 border border-white/10 hover:border-brand-gold/40
                     hover:bg-white/10 transition-all duration-300 cursor-pointer group"
        >
          <img
            src={company.logo}
            alt={company.name}
            className="w-32 h-12 object-contain filter grayscale brightness-200 opacity-50
                       group-hover:grayscale-0 group-hover:opacity-100 group-hover:brightness-100
                       transition-all duration-400"
            loading="lazy"
          />
        </div>
      ))}
    </motion.div>
  </div>
);

// -- Animated Bar --------------------------------------------------------------
const Bar: React.FC<{ pct: string; delay?: number }> = ({ pct, delay = 0.5 }) => (
  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-5">
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: pct }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, delay, ease: "easeOut" }}
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

    <div className="container mx-auto px-6 max-w-6xl relative z-10">

      {/* Section Header */}
      <div className="mb-14 text-center">
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

        {/* 1 � Hero stat: 500+ */}
        <BentoBox
          delay={0.1}
          className="md:col-span-2 p-8 justify-between min-h-[220px]"
          style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" }}
        >
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">
              Class of 2025 &middot; Placements
            </p>
            <h3 className="text-6xl md:text-7xl font-extrabold text-white leading-none tracking-tight">
              500+
            </h3>
            <p className="text-2xl font-medium text-slate-300 mt-2">Campus Offers Made</p>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm mt-6">
            Our dedicated placement cell connects every student with industry leaders for interviews and full-time roles.
          </p>
        </BentoBox>

        {/* 2 � Highest Package */}
        <BentoBox
          delay={0.2}
          className="p-8 justify-between min-h-[220px]"
          style={{ background: "rgba(212,168,67,0.07)" }}
        >
          <div>
            <p className="text-brand-gold/70 text-xs font-bold uppercase tracking-widest mb-3">
              Highest Package
            </p>
            <h3
              className="text-5xl font-extrabold text-transparent bg-clip-text leading-none"
              style={{ backgroundImage: "linear-gradient(135deg, #D4A843, #E8C972)" }}
            >
              ₹45 LPA
            </h3>
            <p className="text-slate-400 text-sm mt-2">Best offer &middot; 2025 batch</p>
          </div>
          <Bar pct="90%" delay={0.5} />
        </BentoBox>

        {/* 3 � Placement Rate */}
        <BentoBox
          delay={0.3}
          className="p-8 justify-between"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">
              Placement Rate
            </p>
            <h3 className="text-5xl font-extrabold text-white leading-none">95%</h3>
            <p className="text-slate-500 text-sm mt-2">Students placed annually</p>
          </div>
          <Bar pct="95%" delay={0.6} />
        </BentoBox>

        {/* 4 � Average Package */}
        <BentoBox
          delay={0.35}
          className="md:col-span-2 p-8 justify-between"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">
              Average Package
            </p>
            <h3 className="text-5xl font-extrabold text-white leading-none">
              ₹12 <span className="text-2xl font-semibold text-slate-400">LPA</span>
            </h3>
            <p className="text-slate-500 text-sm mt-2">Across all streams &middot; 2025 batch</p>
          </div>
          <Bar pct="75%" delay={0.65} />
        </BentoBox>

        {/* 5 � Marquee full-width */}
        <BentoBox
          delay={0.45}
          className="md:col-span-3 pt-7 pb-3"
          style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" }}
        >
          <div className="px-8 mb-1">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Our Hiring Partners
            </p>
          </div>
          <InfiniteMarquee items={recruiters} />
        </BentoBox>

      </div>
    </div>
  </section>
);

export default Recruiters;
