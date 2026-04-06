import React, { useEffect, useState } from 'react';
import { GraduationCap, Monitor, PlayCircle } from 'lucide-react';
import { useHomepageData } from '../context/HomepageDataContext';
import { get } from '../services/api';

const defaultItems = [
  { id: 'video', title: 'Video', icon: PlayCircle, href: 'https://www.youtube.com/watch?v=8He2x-kDRkQ' },
  { id: 'erp', title: 'ERP Portal', icon: Monitor, href: 'https://erp.vcet.edu.in/login.htm' },
  { id: 'convocation', title: 'Convocation', icon: GraduationCap, href: null },
];

const iconMap: Record<string, any> = {
  PlayCircle,
  Monitor,
  GraduationCap
};

const ExploreUs: React.FC = () => {
  const homepage = useHomepageData();
  const useAggregate = Boolean(homepage);
  const [quickAccessItems, setQuickAccessItems] = useState(defaultItems);

  useEffect(() => {
    if (useAggregate) {
      const aggregatedItems = homepage!.data.exploreUs;
      if (aggregatedItems.length > 0) {
        setQuickAccessItems(aggregatedItems.map((item) => ({
          id: item.identifier || String(item.id),
          title: item.title,
          icon: iconMap[item.icon || ''] || PlayCircle,
          href: item.url,
        })));
      }
      return;
    }

    const fetchItems = async () => {
      try {
        const response = await get<any[]>('/explore-us');
        if (response && response.length > 0) {
          const fetchedItems = response.map((item: any) => ({
            id: item.identifier,
            title: item.title,
            icon: iconMap[item.icon] || PlayCircle,
            href: item.url
          }));
          setQuickAccessItems(fetchedItems);
        }
      } catch (error) {
        console.error('Failed to load explore us items, using defaults', error);
      }
    };
    fetchItems();
  }, [homepage, useAggregate]);

  return (
    <section
      id="explore"
      className="relative w-full overflow-hidden bg-gradient-to-r from-[#0F3B82] via-[#133B7C] to-[#0F3875]"
    >
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.18),transparent_45%),radial-gradient(circle_at_80%_50%,rgba(255,215,0,0.12),transparent_40%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-5">
        <div className="flex flex-col md:grid md:grid-cols-4 items-center gap-y-6 md:gap-x-4 w-full">
          {/* Section Title */}
          <div className="w-full flex items-center justify-center md:justify-start gap-4 md:border-r md:border-white/20 md:pr-10">
            <span className="hidden md:block w-[3px] h-14 rounded-full bg-brand-gold" />
            <h2 className="text-white font-display font-bold tracking-tight text-3xl md:text-[2.65rem] leading-none">
              Explore Us
            </h2>
          </div>

          {/* Quick Access Items */}
          <div className="w-full flex items-start justify-between sm:justify-evenly px-2 gap-2 md:contents">
            {quickAccessItems.map((item) => {
              const Icon = item.icon;
              const baseClassName = 'group flex flex-col items-center justify-start gap-2 text-white/95 py-1 transition-transform duration-300 hover:-translate-y-0.5 max-w-[100px] md:max-w-none w-full';

              if (item.href) {
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={baseClassName}
                    aria-label={item.title}
                  >
                    <span className="relative inline-flex items-center justify-center mb-1 md:mb-0">
                      <span className="absolute inset-0 rounded-full bg-brand-gold/0 group-hover:bg-brand-gold/10 transition-colors duration-300" />
                      <Icon strokeWidth={1.8} className="w-[34px] h-[34px] md:w-[44px] md:h-[44px] text-brand-gold drop-shadow-[0_0_8px_rgba(255,195,0,0.25)]" />
                    </span>
                    <span className="text-[13px] md:text-[2rem] font-display font-semibold leading-[1.1] text-center group-hover:text-brand-gold transition-colors duration-300">
                      {item.title}
                    </span>
                  </a>
                );
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  className={baseClassName}
                  aria-label={item.title}
                >
                  <span className="relative inline-flex items-center justify-center mb-1 md:mb-0">
                    <span className="absolute inset-0 rounded-full bg-brand-gold/0 group-hover:bg-brand-gold/10 transition-colors duration-300" />
                    <Icon strokeWidth={1.8} className="w-[34px] h-[34px] md:w-[44px] md:h-[44px] text-brand-gold drop-shadow-[0_0_8px_rgba(255,195,0,0.25)]" />
                  </span>
                  <span className="text-[13px] md:text-[2rem] font-display font-semibold leading-[1.1] text-center group-hover:text-brand-gold transition-colors duration-300">
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreUs;
