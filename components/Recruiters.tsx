import React, { useState } from 'react';
import { Building2, TrendingUp, Users2, Briefcase } from 'lucide-react';

const recruiters = [
  { name: 'Accenture',           logo: '/Images/recriters/Accenture-Logo-PNG-Vector-EPS-Free-Download.jpeg', color: '#A100FF' },
  { name: 'Godrej Infotech',     logo: '/Images/recriters/godrej-infotech.jpeg',                              color: '#007C39' },
  { name: 'Hexaware',            logo: '/Images/recriters/hexaware-logo.jpeg',                                color: '#E31837' },
  { name: 'Interactive Brokers', logo: '/Images/recriters/interactive-brokers.jpeg',                          color: '#E8272D' },
  { name: 'Neebal Technologies', logo: '/Images/recriters/neebal-technologoes.jpeg',                          color: '#F7A800' },
  { name: 'Vodafone',            logo: '/Images/recriters/vodafone-logo.jpeg',                                color: '#E60000' },
];

const stats = [
  { icon: Building2,  value: '500+',   label: 'Recruiting Companies' },
  { icon: TrendingUp, value: '₹12 LPA', label: 'Average Package' },
  { icon: Users2,     value: '95%',    label: 'Placement Rate' },
  { icon: Briefcase,  value: '₹45 LPA', label: 'Highest Package' },
];

const LogoCard: React.FC<{ company: typeof recruiters[0] }> = ({ company }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="flex-shrink-0 w-44 mx-3 group/card select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative rounded-2xl p-5 flex flex-col items-center justify-center h-28 cursor-pointer transition-all duration-400 ease-out overflow-hidden"
        style={{
          background: hovered ? '#ffffff' : 'rgba(255,255,255,0.06)',
          boxShadow: hovered ? `0 8px 32px ${company.color}33, 0 2px 8px rgba(0,0,0,0.3)` : '0 1px 4px rgba(0,0,0,0.2)',
          border: hovered ? `1.5px solid ${company.color}66` : '1.5px solid rgba(255,255,255,0.08)',
          transform: hovered ? 'translateY(-6px) scale(1.04)' : 'translateY(0) scale(1)',
        }}
      >
        {/* Glow blob */}
        <div
          className="absolute inset-0 rounded-2xl transition-opacity duration-400 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 80%, ${company.color}22 0%, transparent 70%)`,
            opacity: hovered ? 1 : 0,
          }}
        />

        <img
          src={company.logo}
          alt={company.name}
          className="w-full h-14 object-contain relative z-10 transition-all duration-400"
          style={{ filter: hovered ? 'none' : 'grayscale(100%) brightness(1.8)', opacity: hovered ? 1 : 0.45 }}
          loading="lazy"
        />

        {/* Company name tooltip on hover */}
        <span
          className="absolute bottom-2 left-0 right-0 text-center text-[10px] font-bold uppercase tracking-widest transition-all duration-300 z-10"
          style={{ color: company.color, opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(4px)' }}
        >
          {company.name}
        </span>
      </div>
    </div>
  );
};

const MarqueeRow: React.FC<{ items: typeof recruiters; reverse?: boolean; paused: boolean }> = ({ items, reverse, paused }) => {
  const doubled = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden relative w-full">
      <div
        className="flex items-center"
        style={{
          animation: `marquee-scroll ${reverse ? 'reverse' : 'normal'} 28s linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
          width: 'max-content',
        }}
      >
        {doubled.map((company, idx) => (
          <LogoCard key={idx} company={company} />
        ))}
      </div>
    </div>
  );
};

const Recruiters: React.FC = () => {
  const [paused, setPaused] = useState(false);

  return (
    <section className="py-0 bg-brand-dark relative overflow-hidden">

      {/* CSS keyframe injected inline */}
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        .recruiter-stat-card:hover .recruiter-stat-icon {
          transform: scale(1.2) rotate(-6deg);
        }
      `}</style>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-blue/10 rounded-full blur-3xl"></div>
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)', backgroundSize: '60px 60px' }}>
        </div>
      </div>

      {/* ── Header ─────────────────────────────── */}
      <div className="container mx-auto px-6 pt-20 pb-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-0.5 bg-brand-gold"></div>
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-gold">Placement Partners</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white leading-tight">
              Our Top<br />
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(90deg, #D4A843, #E8C972)' }}>
                Recruiters
              </span>
            </h2>
          </div>
          <p className="text-slate-400 max-w-xs text-sm leading-relaxed">
            Industry leaders who trust VCET graduates to power their engineering and technology teams.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="recruiter-stat-card group relative rounded-2xl p-5 overflow-hidden cursor-default"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {/* Hover fill */}
              <div className="absolute inset-0 rounded-2xl bg-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              <div
                className="recruiter-stat-icon w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300"
                style={{ background: 'rgba(212,168,67,0.15)' }}
              >
                <stat.icon className="w-5 h-5 text-brand-gold" />
              </div>
              <p className="text-2xl md:text-3xl font-extrabold text-white mb-1">{stat.value}</p>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">{stat.label}</p>
              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-brand-gold to-transparent w-0 group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Dual Marquee ─────────────────────────────── */}
      <div
        className="pb-16 relative z-10 space-y-4"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Hover hint label */}
        <div className="container mx-auto px-6 flex justify-end mb-2">
          <span className="text-[10px] text-slate-600 font-medium tracking-wider uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-gold/60 animate-pulse inline-block"></span>
            Hover to pause
          </span>
        </div>

        {/* Row 1 — scrolls left */}
        <MarqueeRow items={recruiters} paused={paused} />

        {/* Row 2 — scrolls right */}
        <MarqueeRow items={[...recruiters].reverse()} reverse paused={paused} />
      </div>

      {/* Bottom fade edge */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-brand-dark to-transparent pointer-events-none z-20"></div>
    </section>
  );
};

export default Recruiters;
