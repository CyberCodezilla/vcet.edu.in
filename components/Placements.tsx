import React, { useEffect, useState, useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';

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
  
  // Drag to scroll state
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section ref={sectionRef} className="relative py-12 bg-slate-900 text-white overflow-hidden">
        <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            height: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(250, 204, 21, 0.4); 
            border-radius: 10px;
            cursor: pointer;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(250, 204, 21, 0.8); 
          }
        `}</style>

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
            <img 
              src="/Images/Placement/Placement_Background.jpg" 
              alt="Placements Background" 
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/60"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
            {/* Header */}
            <div className={`mb-8 border-l-4 border-yellow-400 pl-4 transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">
                    Placements
                </h2>
                <p className="text-blue-200 mt-1 text-sm md:text-base">Consistent track record of career success.</p>
            </div>

            {/* Horizontal Timeline Container */}
            <div 
                ref={scrollRef}
                className="w-full overflow-x-auto pb-6 pt-2 custom-scrollbar cursor-grab active:cursor-grabbing select-none"
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                <div className="flex items-center min-w-max relative py-4 px-4">
                     {/* Horizontal Line connecting items - Visible only on md and up for cleaner mobile look */}
                    <div className={`absolute left-0 w-full h-px bg-white/20 top-1/2 -translate-y-1/2 z-0 transition-all duration-1000 delay-500 origin-left hidden md:block ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></div>

                    {placementData.map((item, index) => (
                        <div 
                            key={index} 
                            className={`relative z-10 flex flex-col items-center justify-center mx-6 md:mx-10 group transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            {/* Count */}
                            <div className="mb-4 transform group-hover:-translate-y-1 transition-transform duration-300">
                                <span className="text-4xl md:text-5xl font-black text-yellow-400 tabular-nums drop-shadow-[0_0_10px_rgba(250,204,21,0.3)]">
                                    {item.count}
                                </span>
                            </div>

                            {/* Marker on line */}
                            <div className="bg-slate-900 p-1 rounded-full border-2 border-yellow-400 mb-4 shadow-[0_0_15px_rgba(250,204,21,0.5)] group-hover:scale-125 transition-transform duration-300 relative">
                                <CheckCircle2 className="w-4 h-4 text-yellow-400" />
                                {/* Glow effect */}
                                <div className="absolute inset-0 rounded-full bg-yellow-400/20 animate-ping"></div>
                            </div>

                            {/* Year */}
                            <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-white/80 group-hover:text-white transition-colors">
                                {item.year}
                            </span>
                        </div>
                    ))}
                    {/* Add extra padding at the end for scroll space */}
                    <div className="w-12"></div>
                </div>
            </div>
            
            <div className="mt-4 text-center md:text-right text-white/40 text-[10px] uppercase tracking-widest">
                * Current Academic Year (In Progress)
            </div>
        </div>
    </section>
  );
};

export default Placements;