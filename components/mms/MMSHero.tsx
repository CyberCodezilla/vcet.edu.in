import React, { useEffect, useMemo, useState } from 'react';
import { MMS_HERO_IMAGES } from '../../services/mms/imagePool';

const heroImages = [...MMS_HERO_IMAGES];

export default function MMSHero() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeImage = useMemo(() => heroImages[activeIndex] || null, [activeIndex]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[360px] overflow-hidden rounded-xl border border-slate-200 bg-slate-100 sm:h-[420px]">
      {activeImage ? (
        <img
          src={activeImage}
          alt="MMS campus highlights"
          className="h-full w-full object-cover"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = 'none';
          }}
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/65 to-slate-700/35" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.2em]">Vidyavardhini&apos;s College</p>
        <h1 className="mt-2 text-2xl font-bold sm:text-4xl">Master of Management Studies (MMS)</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-100 sm:text-base">
          Approved by AICTE and DTE Maharashtra. Affiliated to University of Mumbai.
        </p>
      </div>
      <div className="absolute bottom-4 right-4 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Show slide ${index + 1}`}
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 w-2.5 rounded-full ${index === activeIndex ? 'bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </section>
  );
}
