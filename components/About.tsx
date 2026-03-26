import React, { useRef, useState, useEffect } from 'react';
import SectionHeader from './SectionHeader';
import { Target, Eye, Users, BookOpen, MapPin, ShieldCheck, Sparkles } from 'lucide-react';

const ESTABLISHED_DATE = new Date(1994, 6, 1); // July 1994
const currentYear = new Date().getFullYear();
const yearsSinceEstablished = Math.max(currentYear - ESTABLISHED_DATE.getFullYear(), 1);

const stats = [
  { icon: Users, target: 5000, suffix: '+', label: 'Students' },
  { icon: BookOpen, target: 200, suffix: '+', label: 'Faculty' },
  { icon: Target, target: yearsSinceEstablished, suffix: '', label: 'Years' },
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
    <div
      ref={ref}
      className="rounded-2xl border border-brand-blue/10 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-blue/30 hover:shadow-md"
    >
      <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/5">
        <stat.icon className="h-5 w-5 text-brand-blue" />
      </div>
      <span className="block tabular-nums text-3xl font-bold text-brand-navy md:text-4xl">{displayValue}</span>
      <span className="mt-1 block text-[11px] font-semibold uppercase tracking-widest text-slate-500">{stat.label}</span>
    </div>
  );
};

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-44 right-0 h-80 w-80 rounded-full bg-brand-blue/[0.05] blur-3xl" />
        <div className="absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-brand-gold/[0.08] blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeader title="Who We Are" subtitle="Pioneering education for a digital world since 1994 — shaping engineers who build the future." />

        <div className="grid grid-cols-1 gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          <div className="space-y-8 reveal">
            <p className="text-2xl md:text-3xl font-display font-semibold leading-snug text-slate-800">
              At VCET, we believe education is not just about textbooks. It's about{' '}
              <span className="text-brand-gold">breaking boundaries</span>{' '}
              and creating solutions for real-world problems.
            </p>
            <p className="text-base leading-relaxed text-slate-600">
              Located in the heart of the tech corridor, our sprawling campus is home to over 5,000 students and 200+ faculty members. We combine traditional engineering discipline with modern design thinking, preparing graduates who excel in both innovation and execution.
            </p>
            
            <div className="group relative h-[380px] w-full overflow-hidden rounded-2xl border border-brand-blue/10 bg-brand-light sm:h-[480px] md:h-[520px]">
              <img 
                src="/Images/About/vcet_campus.jpg" 
                alt="VCET Campus" 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/20 to-transparent transition-opacity duration-300 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-6 reveal" style={{transitionDelay: '0.2s'}}>
            <div className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:border-brand-blue/20 hover:shadow-md">
              <div className="flex justify-between items-start mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/8 transition-colors duration-300 group-hover:bg-brand-blue">
                  <Target className="h-6 w-6 text-brand-blue transition-colors group-hover:text-white" />
                </div>
                <span className="text-xs font-bold text-brand-gold/40 uppercase tracking-widest">01</span>
              </div>
              <h3 className="mb-3 text-xl font-bold text-brand-navy">Our Mission</h3>
              <p className="text-sm leading-relaxed text-slate-600">
                To provide a dynamic learning environment that fosters innovation, critical thinking, and ethical leadership in engineering and technology.
              </p>
            </div>

            <div className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:border-brand-blue/20 hover:shadow-md">
              <div className="flex justify-between items-start mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gold/10 transition-colors duration-300 group-hover:bg-brand-gold">
                  <Eye className="h-6 w-6 text-brand-gold transition-colors group-hover:text-white" />
                </div>
                <span className="text-xs font-bold text-brand-gold/40 uppercase tracking-widest">02</span>
              </div>
              <h3 className="mb-3 text-xl font-bold text-brand-navy">Our Vision</h3>
              <p className="text-sm leading-relaxed text-slate-600">
                To be a globally recognized centre of excellence, shaping the future through sustainable engineering practices and impactful research.
              </p>
            </div>

            <div className="rounded-2xl bg-gradient-to-r from-brand-blue to-brand-navy p-8 text-center shadow-lg shadow-brand-blue/20">
              <div className="text-center">
                <p className="mb-2 text-4xl font-display font-bold text-white md:text-5xl">25+ Years</p>
                <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">Of Academic Excellence</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { icon: MapPin, title: 'Prime Location', desc: '2-minute walk from Vasai Road (W).' },
                { icon: ShieldCheck, title: 'Trusted Institution', desc: 'Established reputation in engineering education.' },
                { icon: Sparkles, title: 'Future Focused', desc: 'Learning built around modern technology.' },
              ].map((item) => (
                <article
                  key={item.title}
                  className="rounded-xl border border-brand-blue/10 bg-white px-4 py-4 shadow-sm transition-all duration-300 hover:border-brand-blue/25 hover:shadow-md"
                >
                  <item.icon className="mb-2 h-4 w-4 text-brand-blue" />
                  <h3 className="text-sm font-semibold text-brand-navy">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16">
          {stats.map((stat, idx) => (
            <StatCard key={idx} stat={stat} onVisible={() => {}} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
