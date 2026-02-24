import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { LampContainer } from '../ui/lamp';

const placementData = [
  { year: '2017-18', count: 299 },
  { year: '2018-19', count: 320 },
  { year: '2019-20', count: 263 },
  { year: '2020-21', count: 305 },
  { year: '2021-22', count: 257 },
  { year: '2022-23', count: 261 },
  { year: '2023-24', count: 228 },
  { year: '2024-25*', count: 188 },
];

const CHART_H = 260; // px — usable bar area height
const GRID_STEPS = 4; // horizontal grid lines

const Placements: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animatedCounts, setAnimatedCounts] = useState<number[]>(placementData.map(() => 0));
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
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
  }, [isVisible]);

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

  const maxCount = Math.max(...placementData.map(d => d.count));
  const maxIdx   = placementData.findIndex(d => d.count === maxCount);

  // Grid line values
  const gridValues = Array.from({ length: GRID_STEPS + 1 }, (_, i) =>
    Math.round((maxCount / GRID_STEPS) * i)
  );

  return (
    <section ref={sectionRef} className="relative bg-slate-950 text-white overflow-hidden">

      {/* Lamp Header */}
      <LampContainer className="pt-10 pb-0 min-h-[320px]">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: 'easeInOut' }}
          className="flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-brand-gold"></div>
            <div className="w-8 h-0.5 bg-brand-gold"></div>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight bg-gradient-to-br from-amber-200 via-brand-gold to-amber-400 bg-clip-text text-transparent">
            Placement Excellence
          </h2>
          <p className="text-white/50 mt-3 text-sm md:text-base max-w-md">
            1800+ students placed — consistent career success across academic years
          </p>
        </motion.div>
      </LampContainer>

      {/* Chart Section */}
      <div className="relative py-12 md:py-16 bg-gradient-to-b from-slate-950 to-brand-dark">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/Images/PLACEMENT/Placement_Background.jpg"
            alt="Placements Background"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/90 to-transparent" />
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
                Peak: {maxCount} &nbsp;·&nbsp; {placementData[maxIdx].year}
              </div>
            </div>

            {/* Scrollable chart */}
            <div
              ref={scrollRef}
              className="w-full overflow-x-auto pb-2 cursor-grab active:cursor-grabbing select-none"
              style={{ scrollbarWidth: 'none' }}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              <div className="relative min-w-max" style={{ height: `${CHART_H + 80}px` }}>

                {/* Grid lines + Y-axis labels */}
                <div
                  className="absolute left-0 right-0 top-0"
                  style={{ height: `${CHART_H}px` }}
                >
                  {gridValues.slice(1).map((val, gi) => {
                    const yPct = 100 - (val / maxCount) * 100;
                    return (
                      <div
                        key={gi}
                        className="absolute left-0 right-0 flex items-center gap-2"
                        style={{ top: `${yPct}%` }}
                      >
                        <span className="text-[9px] text-white/25 font-mono w-8 text-right flex-shrink-0">
                          {val}
                        </span>
                        <div className="flex-1 border-t border-dashed border-white/8" />
                      </div>
                    );
                  })}
                </div>

                {/* Bars row */}
                <div
                  className="absolute bottom-10 flex items-end gap-5 md:gap-8 px-2 pl-12"
                  style={{ height: `${CHART_H}px` }}
                >
                  {placementData.map((item, index) => {
                    const barH = (item.count / maxCount) * CHART_H * 0.92;
                    const isPeak = index === maxIdx;
                    const isCurrent = item.year.includes('*');
                    const isHovered = hoveredIdx === index;

                    return (
                      <div
                        key={index}
                        className="flex flex-col items-center group"
                        style={{ width: '60px' }}
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
                          <span
                            className={`text-xl md:text-2xl font-extrabold tabular-nums transition-colors duration-200 ${
                              isPeak ? 'text-amber-300' : isHovered ? 'text-white' : 'text-brand-gold'
                            }`}
                          >
                            {animatedCounts[index]}
                          </span>
                          {isPeak && (
                            <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] text-amber-300/80 font-bold uppercase tracking-wider whitespace-nowrap">
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
                                : isCurrent
                                ? 'bg-gradient-to-t from-yellow-900/80 via-brand-gold/60 to-brand-gold/30'
                                : 'bg-gradient-to-t from-yellow-800 via-brand-gold/75 to-brand-gold/50'
                            } ${isHovered ? 'brightness-125' : ''}`}
                          />
                          {/* Shine streak */}
                          <div className="absolute top-0 left-[30%] w-[18%] h-full bg-white/12 blur-[2px] rounded-full pointer-events-none" />
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
                        </div>

                        {/* Baseline tick */}
                        <div className={`w-full h-[3px] rounded-b-sm mt-0 ${isPeak ? 'bg-amber-300/70' : 'bg-brand-gold/40'}`} />
                      </div>
                    );
                  })}
                </div>

                {/* Year labels row */}
                <div
                  className="absolute bottom-0 flex items-center gap-5 md:gap-8 px-2 pl-12"
                  style={{ height: '36px' }}
                >
                  {placementData.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        width: '60px',
                        opacity: isVisible ? 1 : 0,
                        transition: `opacity 0.5s ease ${index * 100 + 800}ms`,
                      }}
                    >
                      <span
                        className={`block text-center text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap transition-colors duration-200 ${
                          hoveredIdx === index ? 'text-brand-gold' : 'text-white/45'
                        }`}
                      >
                        {item.year}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Baseline axis */}
                <div
                  className="absolute left-12 right-0 border-t border-white/15"
                  style={{ bottom: '36px' }}
                />
              </div>
            </div>

            {/* Footer note */}
            <div className="mt-5 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-4 text-[10px] text-white/30 uppercase tracking-widest">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-3 h-3 rounded-sm bg-gradient-to-t from-yellow-800 to-brand-gold/50" />
                  Placed students
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-3 h-3 rounded-sm bg-gradient-to-t from-amber-700 to-amber-200" />
                  Peak year
                </span>
              </div>
              <p className="text-white/25 text-[10px] uppercase tracking-widest">* Current Academic Year (In Progress)</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Placements;
