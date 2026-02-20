import React, { useRef, useState } from 'react';
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 md:py-24 bg-gradient-to-br from-brand-dark via-brand-navy to-brand-dark text-white relative overflow-hidden">
      {/* Background decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-brand-gold/[0.04] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-brand-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)', backgroundSize: '50px 50px' }}>
        </div>
      </div>

      <div className="relative z-10">
        {/* Header row */}
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-0.5 bg-brand-gold"></div>
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-gold">Quick Access</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white leading-tight">
              Explore <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg,#D4A843,#E8C972)' }}>VCET</span>
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-sm">Everything you need — portals, labs, events &amp; more.</p>
          </div>

          {/* Nav arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:bg-brand-gold hover:border-brand-gold hover:text-brand-dark transition-all duration-300"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:bg-brand-gold hover:border-brand-gold hover:text-brand-dark transition-all duration-300"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal scroll track */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto no-scrollbar px-6 max-w-none pb-2"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {/* Leading margin aligned with container */}
          <div className="flex-shrink-0 w-[calc((100vw-80rem)/2)] max-w-0 hidden xl:block"></div>

          {exploreItems.map((item) => {
            const Icon = item.icon;
            const isHovered = hoveredId === item.id;
            return (
              <a
                key={item.id}
                href={item.link}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`flex-shrink-0 w-[300px] md:w-[320px] h-[280px] rounded-2xl relative overflow-hidden group bg-gradient-to-br ${item.bg} transition-all duration-400 ease-out`}
                style={{
                  scrollSnapAlign: 'start',
                  border: isHovered ? `1.5px solid ${item.accent}55` : '1.5px solid rgba(255,255,255,0.06)',
                  transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                  boxShadow: isHovered ? `0 24px 48px rgba(0,0,0,0.5), 0 0 40px ${item.accent}22` : '0 4px 16px rgba(0,0,0,0.3)',
                  transition: 'transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease',
                }}
              >
                {/* Accent glow spot */}
                <div
                  className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-2xl transition-opacity duration-500 pointer-events-none"
                  style={{ background: item.accent, opacity: isHovered ? 0.18 : 0.07 }}
                />

                {/* Noise/texture overlay */}
                <div className="absolute inset-0 opacity-[0.03]"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
                />

                {/* Content */}
                <div className="relative z-10 p-8 flex flex-col h-full">
                  {/* Tag pill */}
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="text-[9px] font-extrabold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full"
                      style={{ background: `${item.accent}20`, color: item.accent, border: `1px solid ${item.accent}40` }}
                    >
                      {item.tag}
                    </span>
                    {/* Corner arrow, appears on hover */}
                    <svg
                      className="w-4 h-4 transition-all duration-300"
                      style={{ color: item.accent, opacity: isHovered ? 1 : 0, transform: isHovered ? 'translate(0,0)' : 'translate(-4px,4px)' }}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>

                  {/* Big icon */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-all duration-400"
                    style={{
                      background: isHovered ? `${item.accent}25` : 'rgba(255,255,255,0.06)',
                      transform: isHovered ? 'scale(1.12) rotate(-4deg)' : 'scale(1)',
                    }}
                  >
                    <Icon className="w-8 h-8" style={{ color: item.accent }} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-extrabold text-white mb-2 leading-tight">{item.title}</h3>

                  {/* Description */}
                  <p
                    className="text-[13px] leading-relaxed transition-all duration-300 mt-auto"
                    style={{ color: isHovered ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.38)' }}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Bottom accent bar */}
                <div
                  className="absolute bottom-0 left-0 h-[3px] transition-all duration-500 ease-out rounded-b-2xl"
                  style={{ width: isHovered ? '100%' : '0%', background: `linear-gradient(90deg, ${item.accent}, transparent)` }}
                />
              </a>
            );
          })}

          {/* Trailing fade spacer */}
          <div className="flex-shrink-0 w-6"></div>
        </div>

        {/* Scroll progress dots */}
        <div className="max-w-7xl mx-auto px-6 mt-8 flex items-center gap-2">
          {exploreItems.map((item) => (
            <div
              key={item.id}
              className="h-1 rounded-full transition-all duration-300"
              style={{
                width: hoveredId === item.id ? '28px' : '8px',
                background: hoveredId === item.id ? item.accent : 'rgba(255,255,255,0.12)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreUs;
