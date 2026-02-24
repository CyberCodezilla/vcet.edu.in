import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Play, MonitorPlay, GraduationCap, BookOpen, FlaskConical, Trophy, Calendar, Library, ChevronLeft, ChevronRight } from 'lucide-react';

const exploreItems = [
  {
    id: 1,
    title: 'Campus Tour',
    icon: Play,
    link: '#video',
    description: 'Take an immersive virtual walkthrough of our sprawling 20-acre campus.',
    tag: 'VIDEO',
    accent: '#D4A843',
    bg: 'from-[#1B3A5C] to-[#0F1F33]',
  },
  {
    id: 2,
    title: 'ERP Portal',
    icon: MonitorPlay,
    link: '#erp',
    description: 'Student & faculty unified portal for schedules, results and resources.',
    tag: 'PORTAL',
    accent: '#60A5FA',
    bg: 'from-[#0F1F33] to-[#1B3A5C]',
  },
  {
    id: 3,
    title: 'Convocation',
    icon: GraduationCap,
    link: '#convocation',
    description: 'Watch ceremony highlights and meet the graduating class of 2025.',
    tag: 'CEREMONY',
    accent: '#D4A843',
    bg: 'from-[#1B3A5C] to-[#142D4C]',
  },
  {
    id: 4,
    title: 'E-Library',
    icon: Library,
    link: '#library',
    description: '50,000+ digital resources, journals and research papers on demand.',
    tag: 'LEARNING',
    accent: '#34D399',
    bg: 'from-[#142D4C] to-[#0F1F33]',
  },
  {
    id: 5,
    title: 'Research Cell',
    icon: FlaskConical,
    link: '#research',
    description: 'Cutting-edge labs and funded projects across 8 research verticals.',
    tag: 'R & D',
    accent: '#F472B6',
    bg: 'from-[#0F1F33] to-[#1B3A5C]',
  },
  {
    id: 6,
    title: 'Placements',
    icon: Trophy,
    link: '#placements',
    description: '95% placement record with 500+ recruiting companies since 2020.',
    tag: 'CAREERS',
    accent: '#D4A843',
    bg: 'from-[#1B3A5C] to-[#0F1F33]',
  },
  {
    id: 7,
    title: 'Study Material',
    icon: BookOpen,
    link: '#study',
    description: 'Curated notes, question banks and video lectures for all semesters.',
    tag: 'ACADEMICS',
    accent: '#A78BFA',
    bg: 'from-[#142D4C] to-[#1B3A5C]',
  },
  {
    id: 8,
    title: 'Events',
    icon: Calendar,
    link: '#events',
    description: 'Technical fests, cultural celebrations and industry connect programs.',
    tag: 'CAMPUS LIFE',
    accent: '#FB923C',
    bg: 'from-[#0F1F33] to-[#142D4C]',
  },
];

const ExploreUs: React.FC = () => {
  const scrollRef   = useRef<HTMLDivElement>(null);
  const pausedRef   = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout>  | null>(null);
  const autoTimer   = useRef<ReturnType<typeof setInterval> | null>(null);

  const [hoveredId, setHoveredId]   = useState<number | null>(null);
  const [activeIdx, setActiveIdx]   = useState(0);
  const [canLeft,   setCanLeft]     = useState(false);
  const [canRight,  setCanRight]    = useState(true);

  /* ── pause helper ─────────────────────────────────────────── */
  const pauseScroll = useCallback((delay = 4000) => {
    pausedRef.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => { pausedRef.current = false; }, delay);
  }, []);

  /* ── auto-scroll (1 px / 25 ms ≈ 40 px/s — very gentle) ─── */
  useEffect(() => {
    autoTimer.current = setInterval(() => {
      if (pausedRef.current || !scrollRef.current) return;
      const el = scrollRef.current;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollLeft += 1;
      }
    }, 25);
    return () => { if (autoTimer.current) clearInterval(autoTimer.current); };
  }, []);

  /* ── track scroll position → active dot + arrow states ───── */
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const idx = max > 0
      ? Math.min(exploreItems.length - 1, Math.round((el.scrollLeft / max) * (exploreItems.length - 1)))
      : 0;
    setActiveIdx(idx);
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < max - 4);
  }, []);

  /* ── manual nav ───────────────────────────────────────────── */
  const scroll = (dir: 'left' | 'right') => {
    pauseScroll(5000);
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' });
  };

  const goToIdx = (idx: number) => {
    pauseScroll(5000);
    const el = scrollRef.current;
    if (!el) return;
    const cardW = el.scrollWidth / exploreItems.length;
    el.scrollTo({ left: cardW * idx, behavior: 'smooth' });
  };

  return (
    <section className="py-20 md:py-24 bg-gradient-to-br from-brand-dark via-brand-navy to-brand-dark text-white relative overflow-hidden">

      {/* Background decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-brand-gold/[0.04] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-brand-blue/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)', backgroundSize: '50px 50px' }} />
      </div>

      <div className="relative z-10">

        {/* ── Header row ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-0.5 bg-brand-gold" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-gold">Quick Access</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white leading-tight">
              Explore{' '}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg,#D4A843,#E8C972)' }}>
                VCET
              </span>
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-sm">Everything you need — portals, labs, events &amp; more.</p>
          </div>

          {/* Arrow buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              disabled={!canLeft}
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
                canLeft
                  ? 'border-white/20 text-white/70 hover:bg-brand-gold hover:border-brand-gold hover:text-brand-dark'
                  : 'border-white/6 text-white/20 cursor-not-allowed'
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canRight}
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 ${
                canRight
                  ? 'border-white/20 text-white/70 hover:bg-brand-gold hover:border-brand-gold hover:text-brand-dark'
                  : 'border-white/6 text-white/20 cursor-not-allowed'
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── Scroll track with edge fades ── */}
        <div className="relative" style={{ overflowY: 'visible' }}>
          {/* Left fade */}
          <div
            className="pointer-events-none absolute left-0 z-10 transition-opacity duration-300"
            style={{
              top: '-4px', bottom: '-4px',
              width: '72px',
              background: 'linear-gradient(to right, #0d1b2e 0%, transparent 100%)',
              opacity: canLeft ? 1 : 0,
            }}
          />
          {/* Right fade */}
          <div
            className="pointer-events-none absolute right-0 z-10 transition-opacity duration-300"
            style={{
              top: '-4px', bottom: '-4px',
              width: '96px',
              background: 'linear-gradient(to left, #0a1628 0%, transparent 100%)',
              opacity: canRight ? 1 : 0,
            }}
          />

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseEnter={() => pauseScroll(6000)}
            onMouseLeave={() => { pausedRef.current = false; }}
            onTouchStart={() => pauseScroll(6000)}
            className="flex gap-5 overflow-x-auto px-3 sm:px-6 pt-4 pb-4 select-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', overflowY: 'visible' }}
          >
            {/* XL container centering spacer */}
            <div className="flex-shrink-0 w-[calc((100vw-80rem)/2)] max-w-0 hidden xl:block" />

            {exploreItems.map((item, i) => {
              const Icon = item.icon;
              const isHovered = hoveredId === item.id;
              const isActive  = activeIdx === i;

              return (
                <a
                  key={item.id}
                  href={item.link}
                  onMouseEnter={() => { setHoveredId(item.id); pauseScroll(6000); }}
                  onMouseLeave={() => { setHoveredId(null); pausedRef.current = false; }}
                  className={`flex-shrink-0 w-[260px] sm:w-[290px] md:w-[310px] rounded-2xl relative overflow-hidden group bg-gradient-to-br ${item.bg}`}
                  style={{
                    height: '300px',
                    border: isHovered
                      ? `1.5px solid ${item.accent}60`
                      : isActive
                      ? `1.5px solid ${item.accent}30`
                      : '1.5px solid rgba(255,255,255,0.06)',
                    transform: isHovered ? 'translateY(-8px) scale(1.015)' : 'translateY(0) scale(1)',
                    boxShadow: isHovered
                      ? `0 28px 52px rgba(0,0,0,0.55), 0 0 36px ${item.accent}28`
                      : isActive
                      ? `0 8px 24px rgba(0,0,0,0.35), 0 0 16px ${item.accent}12`
                      : '0 4px 16px rgba(0,0,0,0.3)',
                    transition: 'transform 0.38s cubic-bezier(0.34,1.1,0.64,1), box-shadow 0.38s ease, border-color 0.38s ease',
                  }}
                >
                  {/* Glow blob */}
                  <div
                    className="absolute -bottom-12 -right-12 w-44 h-44 rounded-full blur-2xl pointer-events-none transition-opacity duration-500"
                    style={{ background: item.accent, opacity: isHovered ? 0.2 : 0.06 }}
                  />
                  {/* Top-left micro glow */}
                  <div
                    className="absolute -top-6 -left-6 w-24 h-24 rounded-full blur-2xl pointer-events-none transition-opacity duration-500"
                    style={{ background: item.accent, opacity: isHovered ? 0.12 : 0 }}
                  />

                  {/* Content */}
                  <div className="relative z-10 p-7 flex flex-col h-full">

                    {/* Tag + arrow row */}
                    <div className="flex items-center justify-between mb-5">
                      <span
                        className="text-[9px] font-extrabold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full"
                        style={{
                          background: `${item.accent}18`,
                          color: item.accent,
                          border: `1px solid ${item.accent}38`,
                        }}
                      >
                        {item.tag}
                      </span>
                      <svg
                        className="w-4 h-4 transition-all duration-300"
                        style={{
                          color: item.accent,
                          opacity: isHovered ? 1 : 0,
                          transform: isHovered ? 'translate(0,0) scale(1)' : 'translate(-4px,4px) scale(0.8)',
                          transition: 'opacity 0.3s ease, transform 0.3s ease',
                        }}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </div>

                    {/* Icon */}
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                      style={{
                        background: isHovered ? `${item.accent}22` : 'rgba(255,255,255,0.07)',
                        transform: isHovered ? 'scale(1.1) rotate(-5deg)' : 'scale(1) rotate(0deg)',
                        transition: 'background 0.35s ease, transform 0.38s cubic-bezier(0.34,1.1,0.64,1)',
                        boxShadow: isHovered ? `0 4px 16px ${item.accent}30` : 'none',
                      }}
                    >
                      <Icon className="w-7 h-7" style={{ color: item.accent }} />
                    </div>

                    {/* Title */}
                    <h3
                      className="text-[1.15rem] font-extrabold text-white mb-1.5 leading-tight transition-colors duration-300"
                      style={{ color: isHovered ? '#ffffff' : 'rgba(255,255,255,0.92)' }}
                    >
                      {item.title}
                    </h3>

                    {/* Divider line */}
                    <div
                      className="h-px mb-3 transition-all duration-500"
                      style={{
                        background: `linear-gradient(90deg, ${item.accent}50, transparent)`,
                        opacity: isHovered ? 1 : 0.25,
                        width: isHovered ? '60%' : '30%',
                      }}
                    />

                    {/* Description */}
                    <p
                      className="text-[12.5px] leading-relaxed mt-auto transition-all duration-300"
                      style={{ color: isHovered ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.32)' }}
                    >
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom accent sweep */}
                  <div
                    className="absolute bottom-0 left-0 h-[3px] rounded-b-2xl transition-all duration-500 ease-out"
                    style={{
                      width: isHovered ? '100%' : isActive ? '40%' : '0%',
                      background: `linear-gradient(90deg, ${item.accent}, ${item.accent}40)`,
                    }}
                  />
                </a>
              );
            })}

            <div className="flex-shrink-0 w-6" />
          </div>
        </div>

        {/* ── Dot progress ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6 flex items-center justify-center gap-2">
          {exploreItems.map((item, i) => {
            const isAct = activeIdx === i;
            return (
              <button
                key={item.id}
                onClick={() => goToIdx(i)}
                aria-label={`Go to ${item.title}`}
                className="rounded-full transition-all duration-400 focus:outline-none"
                style={{
                  width:   isAct ? '28px' : '8px',
                  height:  '8px',
                  background: isAct ? item.accent : 'rgba(255,255,255,0.15)',
                  boxShadow: isAct ? `0 0 8px ${item.accent}80` : 'none',
                  transition: 'width 0.35s cubic-bezier(0.34,1.1,0.64,1), background 0.3s ease, box-shadow 0.3s ease',
                }}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ExploreUs;
