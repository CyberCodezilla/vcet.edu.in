import React, { useRef, useState, useEffect } from 'react';
import SectionHeader from './SectionHeader';
import { Target, Eye, Users, BookOpen } from 'lucide-react';

const stats = [
  { icon: Users, target: 5000, suffix: '+', label: 'Students' },
  { icon: BookOpen, target: 300, suffix: '+', label: 'Faculty' },
  { icon: Target, target: 25, suffix: '+', label: 'Years' },
  { icon: Eye, target: null, suffix: 'A+', label: 'NAAC Grade' },
];

function useCountUp(target: number | null, duration = 1800) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started || target === null) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { count, start: () => setStarted(true) };
}

const StatCard: React.FC<{ stat: typeof stats[0]; onVisible: () => void }> = ({ stat, onVisible }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { count, start } = useCountUp(stat.target);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { start(); onVisible(); obs.disconnect(); }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const displayValue = stat.target === null ? stat.suffix : `${count}${stat.suffix}`;

  return (
    <div ref={ref} className="bg-brand-light rounded-xl p-6 text-center hover:shadow-md transition-all duration-300 group">
      <stat.icon className="w-6 h-6 mx-auto mb-3 text-brand-blue/40 group-hover:text-brand-blue transition-colors" />
      <span className="text-3xl md:text-4xl font-bold text-brand-navy block tabular-nums">{displayValue}</span>
      <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mt-1 block">{stat.label}</span>
    </div>
  );
};

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/[0.02] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader title="Who We Are" subtitle="Pioneering education for a digital world since 1994 — shaping engineers who build the future." />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* Left Column */}
          <div className="space-y-8 reveal">
            <p className="text-2xl md:text-3xl font-display font-semibold leading-snug text-slate-800">
              At VCET, we believe education is not just about textbooks. It's about{' '}
              <span className="text-brand-gold">breaking boundaries</span>{' '}
              and creating solutions for real-world problems.
            </p>
            <p className="text-slate-500 leading-relaxed text-base">
              Located in the heart of the tech corridor, our sprawling campus is home to over 5,000 students and 300 faculty members. We combine traditional engineering discipline with modern design thinking, preparing graduates who excel in both innovation and execution.
            </p>
            
            {/* Image placeholder */}
            <div className="h-[350px] w-full bg-brand-light overflow-hidden relative group rounded-xl">
              <img 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='800'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%231B3A5C;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%230F1F33;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23grad)' width='600' height='800'/%3E%3Ctext fill='%23D4A843' font-family='Inter' font-size='22' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3EVCET Campus%3C/text%3E%3C/svg%3E" 
                alt="VCET Campus" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6 reveal" style={{transitionDelay: '0.2s'}}>
            {/* Mission Card */}
            <div className="group border border-gray-100 rounded-xl p-8 hover:border-brand-blue/20 hover:shadow-lg transition-all duration-500 bg-white">
              <div className="flex justify-between items-start mb-5">
                <div className="w-12 h-12 rounded-xl bg-brand-blue/5 flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                  <Target className="w-6 h-6 text-brand-blue group-hover:text-white transition-colors" />
                </div>
                <span className="text-xs font-bold text-brand-gold/40 uppercase tracking-widest">01</span>
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-3">Our Mission</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                To provide a dynamic learning environment that fosters innovation, critical thinking, and ethical leadership in engineering and technology.
              </p>
            </div>

            {/* Vision Card */}
            <div className="group border border-gray-100 rounded-xl p-8 hover:border-brand-blue/20 hover:shadow-lg transition-all duration-500 bg-white">
              <div className="flex justify-between items-start mb-5">
                <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center group-hover:bg-brand-gold transition-all duration-300">
                  <Eye className="w-6 h-6 text-brand-gold group-hover:text-white transition-colors" />
                </div>
                <span className="text-xs font-bold text-brand-gold/40 uppercase tracking-widest">02</span>
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-3">Our Vision</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                To be a globally recognized centre of excellence, shaping the future through sustainable engineering practices and impactful research.
              </p>
            </div>

            {/* Highlight Banner */}
            <div className="bg-gradient-to-r from-brand-blue to-brand-navy rounded-xl p-8 flex items-center justify-center">
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-display font-bold text-white mb-2">25+ Years</p>
                <p className="text-brand-gold text-sm font-semibold tracking-widest uppercase">Of Academic Excellence</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {stats.map((stat, idx) => (
            <StatCard key={idx} stat={stat} onVisible={() => {}} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
