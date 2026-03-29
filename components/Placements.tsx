import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { LampContainer } from '../ui/lamp';
import { placementStatsApi, type PlacementStat } from '../admin/api/placementStats';

interface ChartEntry {
  year: string;
  count: number;
  isCovid?: boolean;
}

function toChartEntries(stats: PlacementStat[]): ChartEntry[] {
  return stats
    .filter((s): s is PlacementStat => s && typeof s === 'object' && 'year' in s)
    .map((s) => ({
      year: s.is_ongoing ? `${s.year}*` : s.year,
      count: s.count,
      ...(s.is_covid ? { isCovid: true } : {}),
    }));
}

const CHART_H = 260; // px — usable bar area height

const Placements: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Async-loaded chart data from the backend (or mock)
  const [placementData, setPlacementData] = useState<ChartEntry[]>([]);
  const [animatedCounts, setAnimatedCounts] = useState<number[]>([]);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const isInteracting = useRef(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ping-pong auto-scroll effect
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !isVisible || placementData.length === 0) return;
    
    let direction = 1;
    let animationFrameId: number;
    const speed = 0.8; // suitable smooth speed
    
    const scroll = () => {
      if (!isInteracting.current && !isDown) {
        if (el.scrollWidth > el.clientWidth) {
          el.scrollLeft += direction * speed;

          if (direction === 1 && el.scrollLeft >= el.scrollWidth - el.clientWidth - 1) {
            direction = -1;
          } else if (direction === -1 && el.scrollLeft <= 0) {
            direction = 1;
          }
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    // Delay start slightly to allow intro animations to finish
    const startDelay = setTimeout(() => {
      animationFrameId = requestAnimationFrame(scroll);
    }, 2000);

    return () => {
      clearTimeout(startDelay);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, isDown, placementData]);

  // Fetch placement year stats from the backend
  useEffect(() => {
    placementStatsApi.list()
      .then((stats) => {
        if (!Array.isArray(stats)) {
          console.warn('Placement stats API returned non-array:', stats);
          return;
        }
        const entries = toChartEntries(stats);
        setPlacementData(entries);
        setAnimatedCounts(entries.map(() => 0));
      })
      .catch((err) => {
        console.error('Failed to load placement stats:', err);
        // On fetch error keep empty — chart just shows nothing gracefully
      });
  }, []);

  useEffect(() => {
    setAnimatedCounts(placementData.map(() => 0));
  }, [placementData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  useEffect(() => {
    if (!isVisible || placementData.length === 0) return;
    const duration = 1800;
    const steps = 72;
    const stepDuration = duration / steps;
    const timers: ReturnType<typeof setInterval>[] = [];
    placementData.forEach((item, index) => {
      const delay = index * 100;
      setTimeout(() => {
        let currentStep = 0;
        const timer = setInterval(() => {
          currentStep++;
          const t = currentStep / steps;
          // Ease-out cubic for smoother deceleration
          const eased = 1 - Math.pow(1 - t, 3);
          setAnimatedCounts(prev => {
            const next = [...prev];
            next[index] = currentStep >= steps ? item.count : Math.round(eased * item.count);
            return next;
          });
          if (currentStep >= steps) clearInterval(timer);
        }, stepDuration);
        timers.push(timer);
      }, delay);
    });
    return () => timers.forEach(t => clearInterval(t));
  }, [isVisible, placementData]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };
  const handleMouseLeave = () => setIsDown(false);
  const handleMouseUp = () => setIsDown(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollLeft - (x - startX) * 2;
  };

  const maxCount = placementData.length ? Math.max(...placementData.map(d => d.count)) : 0;
  const maxIdx   = placementData.findIndex(d => d.count === maxCount);
  const covidIndices = placementData.map((d, i) => d.isCovid ? i : -1).filter(i => i !== -1);
  const covidStartIdx = covidIndices[0];

  return (
    <section id="placements" ref={sectionRef} className="relative bg-brand-dark text-white overflow-hidden">

      {/* Lamp Header */}
      <LampContainer className="pt-24 md:pt-10 pb-0 min-h-[300px] md:min-h-[320px]">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: 'easeInOut' }}
          className="flex flex-col items-center text-center px-4"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-brand-gold"></div>
            <div className="w-8 h-0.5 bg-brand-gold"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold tracking-tight bg-gradient-to-br from-nova-white via-brand-gold to-brand-gold-light bg-clip-text text-transparent leading-tight">
            Placement Excellence
          </h2>
          <p className="text-white/50 mt-3 text-xs sm:text-sm md:text-base max-w-[280px] sm:max-w-md mx-auto leading-relaxed">
            2300+ students placed — consistent career success across academic years
          </p>
        </motion.div>
      </LampContainer>

      {/* ── Chart Section ── */}
      <div className="relative py-10 md:py-14 bg-gradient-to-b from-brand-dark to-brand-navy">
        <div className="absolute inset-0 z-0">
          <img
            src="/Images/PLACEMENT/Placement_Background.jpg"
            alt="Placements Background"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-dark/90 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">

          {/* ── Chart card ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm shadow-[0_8px_48px_rgba(0,0,0,0.45)] overflow-hidden p-4 sm:p-6 md:p-10"
          >
            {/* Subtle inner glow */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-brand-gold/10" />

            {/* Top summary row */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-white/40 mb-1">Year-wise Placements</p>
                <p className="text-xl sm:text-2xl font-bold text-white">
                  {isVisible ? (
                    <span className="tabular-nums">
                      {animatedCounts.reduce((a, b) => a + b, 0).toLocaleString()}
                    </span>
                  ) : '—'}&nbsp;
                  <span className="text-sm font-normal text-white/40">students placed</span>
                </p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/25 text-brand-gold text-xs font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
                Peak: {maxCount} &nbsp;·&nbsp; {maxIdx >= 0 ? placementData[maxIdx]?.year : '—'}
              </div>
            </div>

            {/* Scrollable chart */}
            <div
              ref={scrollRef}
              className="w-full overflow-x-auto pb-2 cursor-grab active:cursor-grabbing select-none"
              style={{ scrollbarWidth: 'none', overflowY: 'visible' }}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchStart={() => isInteracting.current = true}
              onTouchEnd={() => isInteracting.current = false}
              onScroll={() => {
                isInteracting.current = true;
                const anyRef = scrollRef.current as any;
                clearTimeout(anyRef._touchTimeout);
                anyRef._touchTimeout = setTimeout(() => {
                  isInteracting.current = false;
                }, 150);
              }}
            >
              <div className="relative min-w-max" style={{ height: `${CHART_H + 120}px` }}>

                {/* Bars row */}
                <div
                  className={`absolute bottom-10 flex items-end ${isMobile ? 'gap-3 px-2 pl-4' : 'gap-8 px-2 pl-12'}`}
                  style={{ height: `${CHART_H}px`, paddingTop: '40px' }}
                >
                {placementData.map((item, index) => {
                    const barH = maxCount > 0 ? (item.count / maxCount) * CHART_H * 0.92 : 0;
                    const isPeak = index === maxIdx;
                    const isCurrent = item.year.includes('*');
                    const isCovid = !!item.isCovid;
                    const isHovered = hoveredIdx === index;

                    return (
                      <div
                        key={index}
                        className="flex flex-col items-center group relative z-10"
                        style={{ width: isMobile ? '38px' : '60px' }}
                        onMouseEnter={() => setHoveredIdx(index)}

                        onMouseLeave={() => setHoveredIdx(null)}
                      >
                        {/* Floating count label */}
                        <div
                          className="mb-2 relative"
                          style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
                            transition: `opacity 0.5s ease ${index * 100 + 600}ms, transform 0.5s ease ${index * 100 + 600}ms`,
                          }}
                        >
                          {isCovid && (
                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] md:text-[11px] font-extrabold text-cyan-300 uppercase tracking-wider whitespace-nowrap drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]">
                              Consistent
                            </span>
                          )}
                          <span
                            className={`text-[15px] sm:text-xl md:text-2xl font-extrabold tabular-nums transition-colors duration-200 ${
                              isPeak ? 'text-amber-300' : isCovid ? 'text-cyan-300' : isHovered ? 'text-white' : 'text-brand-gold'
                            }`}
                          >
                            {animatedCounts[index]}
                          </span>
                          {isPeak && (
                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] md:text-[13px] text-amber-200 font-extrabold uppercase tracking-wider whitespace-nowrap drop-shadow-[0_0_8px_rgba(251,191,36,0.7)]">
                              ★ Best
                            </span>
                          )}
                        </div>

                        {/* Bar */}
                        <div
                          className="relative w-full rounded-t-xl overflow-hidden cursor-default"
                          style={{
                            height: isVisible ? `${barH}px` : '0px',
                            transition: `height 1.1s cubic-bezier(0.34,1.1,0.64,1) ${index * 100}ms`,
                          }}
                        >
                          {/* Main gradient fill */}
                          <div
                            className={`absolute inset-0 rounded-t-xl transition-all duration-300 ${
                              isPeak
                                ? 'bg-gradient-to-t from-amber-700 via-amber-400 to-amber-200'
                                : isCovid
                                ? 'bg-gradient-to-t from-cyan-900 via-cyan-500/80 to-cyan-300/70'
                                : isCurrent
                                ? 'bg-gradient-to-t from-yellow-900/80 via-brand-gold/60 to-brand-gold/30'
                                : 'bg-gradient-to-t from-yellow-800 via-brand-gold/75 to-brand-gold/50'
                            } ${isHovered ? 'brightness-125' : ''}`}
                          />
                          {/* Soft sheen to avoid hard vertical light streak artifacts */}
                          <div className="absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-white/16 via-white/6 to-transparent pointer-events-none" />
                          {/* Subtle inner depth for cleaner bar edges */}
                          <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),inset_0_-10px_20px_rgba(0,0,0,0.12)] pointer-events-none" />
                          {/* Top highlight cap */}
                          <div className="absolute top-0 left-0 right-0 h-1 rounded-t-xl bg-white/30" />
                          {/* Hover glow overlay */}
                          {isHovered && (
                            <div className="absolute inset-0 rounded-t-xl ring-2 ring-brand-gold/60 shadow-[0_0_18px_4px_rgba(212,175,55,0.35)]" />
                          )}
                          {/* Peak glow */}
                          {isPeak && (
                            <div className="absolute inset-0 rounded-t-xl shadow-[0_0_24px_6px_rgba(251,191,36,0.25)]" />
                          )}
                          {/* COVID resilience glow */}
                          {isCovid && (
                            <div className="absolute inset-0 rounded-t-xl shadow-[0_0_18px_4px_rgba(34,211,238,0.20)]" />
                          )}
                        </div>

                        {/* Baseline tick */}
                        <div className={`w-full h-[3px] rounded-b-sm mt-0 ${isPeak ? 'bg-amber-300/70' : isCovid ? 'bg-cyan-400/60' : 'bg-brand-gold/40'}`} />
                      </div>
                    );
                  })}
                </div>

                {/* Year labels row */}
                <div
                  className={`absolute bottom-0 flex items-center ${isMobile ? 'gap-3 px-2 pl-4' : 'gap-8 px-2 pl-12'}`}
                  style={{ height: '36px' }}
                >
                  {placementData.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        width: isMobile ? '38px' : '60px',
                        opacity: isVisible ? 1 : 0,
                        transition: `opacity 0.5s ease ${index * 100 + 800}ms`,
                      }}
                    >
                      <span
                        className={`block text-center text-[9px] md:text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap transition-colors duration-200 ${
                          hoveredIdx === index ? 'text-brand-gold' : item.isCovid ? 'text-cyan-400/70' : 'text-white/45'
                        }`}
                      >
                        {item.year}
                      </span>
                    </div>
                  ))}
                </div>


              </div>
            </div>

            {/* Footer note */}
            <div className="mt-6 sm:mt-8 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row flex-wrap sm:items-center gap-3 sm:gap-6 text-[10px] sm:text-[11px] md:text-[13px] font-semibold uppercase tracking-widest text-white/80">
                <span className="flex items-center gap-2">
                  <span className="inline-block flex-shrink-0 w-3 h-3 sm:w-4 sm:h-4 rounded-sm bg-gradient-to-t from-yellow-800 to-brand-gold/50" />
                  <span>Placed students</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="inline-block flex-shrink-0 w-3 h-3 sm:w-4 sm:h-4 rounded-sm bg-gradient-to-t from-amber-700 to-amber-200" />
                  <span className="text-amber-200">Peak year</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="inline-block flex-shrink-0 w-3 h-3 sm:w-4 sm:h-4 rounded-sm bg-gradient-to-t from-cyan-900 to-cyan-300/70" />
                  <span className="text-cyan-300">COVID years — Placements unaffected</span>
                </span>
              </div>
              <p className="text-white/60 text-[9px] sm:text-[10px] md:text-[11px] font-semibold uppercase tracking-widest leading-loose">
                * Current Academic Year (In Progress)
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Placements;
