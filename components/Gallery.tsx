import React from 'react';
import { PixelImage } from '../ui/pixel-image';

interface GalleryItem {
  title: string;
  subtitle: string;
  src: string;
}

const galleryItems: GalleryItem[] = [
  {
    title: 'VCET Campus',
    subtitle: 'Our Sprawling Campus',
    src: '/Images/gallery/Gallary_1.jpg',
  },
  {
    title: 'AICTE IDEA Lab',
    subtitle: 'Innovation & Design',
    src: '/Images/gallery/Gallary_1.jpg',
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
    src: '/Images/gallery/Gallary_1.jpg',
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
          {galleryItems.map((item, idx) => {
            const isFeatured = idx === 0;
            return (
              <div
                key={item.title}
                className={[
                  'relative overflow-hidden rounded-2xl group bg-brand-navy shadow-md',
                  isFeatured ? 'sm:col-span-2 lg:col-span-2 md:row-span-2 lg:row-span-2' : '',
                ].join(' ')}
              >
                {/* Pixel-reveal image — staggered by card index */}
                <PixelImage
                  src={item.src}
                  alt={item.title}
                  customGrid={isFeatured ? { rows: 6, cols: 8 } : { rows: 4, cols: 6 }}
                  grayscaleAnimation
                  pixelFadeInDuration={500}
                  maxAnimationDelay={600}
                  colorRevealDelay={700}
                  animationDelay={idx * STAGGER_MS}
                  className="absolute inset-0"
                />

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
