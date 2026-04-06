import React from 'react';
import { useHomepageData } from '../context/HomepageDataContext';
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
    src: '/images/Main Page/gallery/Gallary_1.jpg',
  },
  {
    title: 'AICTE IDEA Lab',
    subtitle: 'Innovation & Design',
    src: '/images/Main Page/gallery/Gallary_1.jpg',
  },
  {
    title: 'Center of Excellence',
    subtitle: 'Advanced Research',
    src: '/images/Main Page/gallery/Gallary_1.jpg',
  },
  {
    title: 'Machinery Diagnostics',
    subtitle: 'Precision Engineering',
    src: '/images/Main Page/gallery/Gallary_1.jpg',
  },
  {
    title: 'Texas Instruments Lab',
    subtitle: 'Embedded Systems',
    src: '/images/Main Page/gallery/texas_lab_new.jpg',
  },
  {
    title: 'Robotics Lab',
    subtitle: 'Automation & AI',
    src: '/images/Main Page/gallery/Gallary_1.jpg',
  },
  {
    title: 'Siemens Lab',
    subtitle: 'Industrial Automation',
    src: '/images/Main Page/gallery/Gallary_1.jpg',
  },
  {
    title: 'Oracle Academy',
    subtitle: 'Cloud & Databases',
    src: '/images/Main Page/gallery/Gallary_1.jpg',
  },
  {
    title: 'e-Yantra Lab',
    subtitle: 'Drones & Embedded',
    src: '/images/Main Page/gallery/Gallary_1.jpg',
  },
];

const STAGGER_MS = 320;

const Gallery: React.FC = () => {
  const homepage = useHomepageData();
  const useAggregate = Boolean(homepage);
  const { galleries: fallbackGalleries } = useGalleries(!useAggregate);
  const galleries = useAggregate ? homepage!.data.galleries : fallbackGalleries;

  const activeGalleries = galleries.filter(g => g.is_active);
  const displayGalleries = activeGalleries.length > 0
    ? activeGalleries.map(g => ({
        title: g.title || '',
        subtitle: g.subtitle || '',
        src: g.image_url || '/images/Main Page/gallery/Gallary_1.jpg',
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
            const hasTileImage = isFeatured;
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
                  'relative overflow-hidden rounded-2xl group bg-brand-navy shadow-md transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.985]',
                  isFeatured ? 'sm:col-span-2 lg:col-span-2 md:row-span-2 lg:row-span-2' : '',
                ].join(' ')}
              >
                {linkTo ? (
                  <Link to={linkTo} className="absolute inset-0 z-20">
                    <span className="sr-only">View {item.title}</span>
                  </Link>
                ) : null}
                {/* Pixel-reveal image — load for featured item or specific labs with images */}
                {hasTileImage ? (
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
                  <>
                    {/* Animated graphic background for button-like lab tiles */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(56,189,248,0.32),transparent_45%),radial-gradient(circle_at_80%_75%,rgba(15,118,185,0.28),transparent_55%),linear-gradient(165deg,#153f73_0%,#0b2447_58%,#091a34_100%)] transition-transform duration-500 group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:20px_20px] transition-opacity duration-300 group-hover:opacity-[0.3]" />
                    <div className="absolute -left-24 top-0 h-full w-24 bg-white/20 blur-xl -skew-x-12 translate-x-0 group-hover:translate-x-[340%] transition-transform duration-700 ease-out" />
                    <div className="absolute left-4 top-4 h-7 w-7 rounded-full border border-brand-gold/70 bg-brand-gold/15 shadow-[0_0_0_0_rgba(244,180,0,0.35)] group-hover:shadow-[0_0_0_8px_rgba(244,180,0,0)] transition-all duration-500" />
                  </>
                )}

                {/* Label overlay */}
                {hasTileImage ? (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/85 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300 z-10">
                      <p className="text-[11px] md:text-xs font-bold uppercase tracking-[0.18em] text-brand-gold mb-1">
                        {item.subtitle}
                      </p>
                      <h3 className="text-white font-display font-bold text-lg md:text-2xl leading-tight">
                        {item.title}
                      </h3>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
                    <p className="text-[11px] md:text-xs font-bold uppercase tracking-[0.18em] text-brand-gold mb-2">
                      {item.subtitle}
                    </p>
                    <h3 className="text-white font-display font-bold text-lg md:text-2xl leading-tight">
                      {item.title}
                    </h3>
                    {linkTo ? (
                      <span className="mt-3 inline-flex items-center rounded-full border border-brand-gold/50 bg-brand-gold/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-gold transition-all duration-300 group-hover:bg-brand-gold/20 group-active:scale-95">
                        Explore
                      </span>
                    ) : null}
                  </div>
                )}

                {/* Hover top border sweep */}
                <div className="absolute top-0 left-0 h-0.5 w-0 bg-brand-gold group-hover:w-full transition-all duration-700 ease-out z-10" />
                {!hasTileImage ? (
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-white/0 group-hover:ring-brand-gold/45 transition-all duration-300" />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
