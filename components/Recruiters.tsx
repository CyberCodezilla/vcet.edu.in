import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const recruiters = [
  { name: 'Accenture', logo: '/Images/recriters/Accenture-Logo-PNG-Vector-EPS-Free-Download.jpeg' },
  { name: 'Godrej Infotech', logo: '/Images/recriters/godrej-infotech.jpeg' },
  { name: 'Hexaware', logo: '/Images/recriters/hexaware-logo.jpeg' },
  { name: 'Interactive Brokers', logo: '/Images/recriters/interactive-brokers.jpeg' },
  { name: 'Neebal Technologies', logo: '/Images/recriters/neebal-technologoes.jpeg' },
  { name: 'Vodafone', logo: '/Images/recriters/vodafone-logo.jpeg' },
];

const Recruiters: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 300;
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="py-8 bg-white border-b border-slate-100 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-6 border-l-4 border-yellow-400 pl-4">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-brand-blue">
                Recruiters
            </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative group px-2 md:px-8">
            {/* Left Button */}
            <button
                onClick={() => scroll('left')}
                className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 p-2 text-brand-blue/30 hover:text-brand-blue hover:scale-125 transition-all"
                aria-label="Scroll left"
            >
                <ChevronLeft className="w-10 h-10" />
            </button>

            {/* Scroll Area */}
            <div
                ref={scrollRef}
                className="flex items-center gap-8 md:gap-16 overflow-x-auto no-scrollbar py-4 scroll-smooth px-4"
            >
                {recruiters.map((company, idx) => (
                    <div key={idx} className="flex-shrink-0 w-48 md:w-56 group/logo">
                        <img
                            src={company.logo}
                            alt={company.name}
                            className="w-full h-20 md:h-24 object-contain grayscale opacity-50 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 transition-all duration-500 transform group-hover/logo:scale-110 filter"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>

            {/* Right Button */}
            <button
                onClick={() => scroll('right')}
                className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 p-2 text-brand-blue/30 hover:text-brand-blue hover:scale-125 transition-all"
                aria-label="Scroll right"
            >
                <ChevronRight className="w-10 h-10" />
            </button>
        </div>
      </div>
    </section>
  );
};

export default Recruiters;