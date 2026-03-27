import React from 'react';
import { PixelImage } from '../ui/pixel-image';
import { useGalleries } from '../hooks/useGalleries';
import { Link } from 'react-router-dom';

interface FallbackGalleryItem {
  title: string;
  subtitle: string;
  src: string;
}

const fallbackGalleryItems: FallbackGalleryItem[] = [
  {
    title: 'VCET Campus',
    subtitle: 'Our Sprawling Campus',
    src: '/Images/gallery/Gallary_1.jpg',
  },
  {
    title: 'AICTE IDEA Lab',
    subtitle: 'Innovation & Design',
    src: '/Images/gallery/aicte_idea_lab.png',
  },
  {
    title: 'Center of Excellence',
    subtitle: 'Advanced Research',
    src: '/Images/gallery/Gallary_1.jpg',
  },
  {
    title: 'Machinery Diagnostics',
    subtitle: 'Precision Engineering',
    src: '/Images/gallery/Gallary_1.jpg',
  },
  {
    title: 'Texas Instruments Lab',
    subtitle: 'Embedded Systems',
    src: '/Images/gallery/texas_instruments_lab.png',
  },
  {
    title: 'Robotics Lab',
    subtitle: 'Automation & AI',
    src: '/Images/gallery/Gallary_1.jpg',
  },
  {
    title: 'Siemens Lab',
    subtitle: 'Industrial Automation',
    src: '/Images/gallery/Gallary_1.jpg',
  },
  {
    title: 'Oracle Academy',
    subtitle: 'Cloud & Databases',
    src: '/Images/gallery/Gallary_1.jpg',
  },
  {
    title: 'e-Yantra Lab',
    subtitle: 'Drones & Embedded',
    src: '/Images/gallery/Gallary_1.jpg',
  },
];

const STAGGER_MS = 320;

const Gallery: React.FC = () => {
  const { galleries, loading, error } = useGalleries();

  const activeGalleries = galleries.filter(g => g.is_active);
  const displayGalleries = activeGalleries.length > 0
    ? activeGalleries.map(g => ({
        title: g.title || '',
        subtitle: g.subtitle || '',
        src: g.image_url || '/Images/gallery/Gallary_1.jpg',
        id: String(g.id)
      }))
    : fallbackGalleryItems.map((fg, i) => ({ ...fg, id: `fallback-${i}` }));

  return (
    <section id="gallery" className="py-10 md:py-14 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-brand-gold" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">
              Campus
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-brand-navy">
            Gallery &amp; Labs
          </h2>
          <p className="text-slate-500 mt-2 text-sm">
            Every image reveals itself tile by tile — scroll down to watch them come alive.
          </p>
        </div>

        {/*
          Grid layout (desktop — 3 cols):
            Item 0 (campus):  col-span-2, row-span-2  → big featured shot
            Items 1-8 (labs): col-span-1, row-span-1
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px] sm:auto-rows-[260px]">
          {displayGalleries.map((item, idx) => {
            const isFeatured = idx === 0;
            let linkTo = null;
            if (item.title === 'AICTE IDEA Lab') linkTo = '/aicte-idea-vcet';
            if (item.title === 'Center of Excellence') linkTo = '/coe-siemens';
            if (item.title === 'Machinery Diagnostics') linkTo = '/machinery-diagnostics';
            if (item.title === 'Texas Instruments Lab') linkTo = '/texas-instruments-lab';
            if (item.title === 'Robotics Lab') linkTo = '/robotics-lab';
            if (item.title === 'Oracle Academy') linkTo = '/oracle-academy';
            if (item.title === 'e-Yantra Lab') linkTo = '/e-yantra';
            
            return (
              <div
                key={item.id}
                className={[
                  'relative overflow-hidden rounded-2xl group bg-brand-navy shadow-md',
                  isFeatured ? 'sm:col-span-2 lg:col-span-2 md:row-span-2 lg:row-span-2' : '',
                ].join(' ')}
              >
                {linkTo ? (
                  <Link to={linkTo} className="absolute inset-0 z-20">
                    <span className="sr-only">View {item.title}</span>
                  </Link>
                ) : null}
                {/* Pixel-reveal image — load for featured item or specific labs with images */}
                {isFeatured || item.title === 'AICTE IDEA Lab' || item.title === 'Texas Instruments Lab' ? (
                  <PixelImage
                    src={item.src}
                    alt={item.title}
                    customGrid={isFeatured ? { rows: 6, cols: 8 } : { rows: 4, cols: 4 }}
                    grayscaleAnimation
                    pixelFadeInDuration={500}
                    maxAnimationDelay={600}
                    colorRevealDelay={700}
                    animationDelay={idx * STAGGER_MS}
                    className="absolute inset-0"
                  />
                ) : (
                  /* Image placeholder for other non-featured items */
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-300 to-slate-400 animate-pulse" />
                )}

                {/* Label overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300 z-10">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-gold mb-0.5">
                    {item.subtitle}
                  </p>
                  <h3 className="text-white font-display font-bold text-base md:text-lg leading-tight">
                    {item.title}
                  </h3>
                </div>

                {/* Hover top border sweep */}
                <div className="absolute top-0 left-0 h-0.5 w-0 bg-brand-gold group-hover:w-full transition-all duration-700 ease-out z-10" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
