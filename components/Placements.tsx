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

const Placements: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animatedCounts, setAnimatedCounts] = useState<number[]>(placementData.map(() => 0));
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    const timers: NodeJS.Timeout[] = [];

    placementData.forEach((item, index) => {
      let currentStep = 0;
      const increment = item.count / steps;
      const timer = setInterval(() => {
        currentStep++;
        if (currentStep <= steps) {
          setAnimatedCounts(prev => {
            const newCounts = [...prev];
            newCounts[index] = Math.min(Math.round(increment * currentStep), item.count);
            return newCounts;
          });
        } else {
          clearInterval(timer);
        }
      }, stepDuration);
      timers.push(timer);
    });

    return () => timers.forEach(timer => clearInterval(timer));
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

  return (
    <section ref={sectionRef} className="relative bg-slate-950 text-white overflow-hidden">

      {/* ── Lamp Header ── */}
      <LampContainer className="pt-10 pb-0 min-h-[320px]">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: 'easeInOut' }}
          className="flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-brand-gold"></div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">Track Record</span>
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

      {/* ── Chart Section ── */}
      <div className="relative py-10 md:py-14 bg-gradient-to-b from-slate-950 to-brand-dark">
        <div className="absolute inset-0 z-0">
          <img
            src="/Images/PLACEMENT/Placement_Background.jpg"
            alt="Placements Background"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/90 to-transparent"></div>
        </div>
      <div className="container mx-auto px-6 relative z-10">

        {/* Chart-style Timeline */}
        <div 
          ref={scrollRef}
          className="w-full overflow-x-auto pb-4 custom-scrollbar cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div className="flex items-end gap-6 md:gap-8 min-w-max px-4 pb-2" style={{height: '280px'}}>
            {placementData.map((item, index) => {
              const barHeight = (item.count / maxCount) * 180;
              return (
                <div 
                  key={index} 
                  className={`flex flex-col items-center gap-3 transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Count */}
                  <span className="text-2xl md:text-3xl font-bold text-brand-gold tabular-nums">
                    {animatedCounts[index]}
                  </span>

                  {/* Bar */}
                  <div className="w-14 md:w-16 relative group">
                    <div 
                      className="w-full bg-gradient-to-t from-brand-gold/80 to-brand-gold/40 rounded-t-lg transition-all duration-1000 ease-out group-hover:from-brand-gold group-hover:to-brand-gold/60"
                      style={{ height: isVisible ? `${barHeight}px` : '0px', transitionDelay: `${index * 150}ms` }}
                    ></div>
                  </div>

                  {/* Year label */}
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-white/50 whitespace-nowrap">
                    {item.year}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="mt-4 text-right text-white/30 text-[10px] uppercase tracking-widest">
          * Current Academic Year (In Progress)
        </div>
      </div>
      </div>
    </section>
  );
};

export default Placements;
