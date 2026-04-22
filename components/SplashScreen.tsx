import React, { useState, useEffect, useMemo } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useHomepageData } from '../context/HomepageDataContext';
import { resolveUploadedAssetUrl } from '../utils/uploadedAssets';

type SplashImage = {
  src: string;
  label: string;
  fallbackSrc?: string;
};

const highestPackageFallback =
  resolveUploadedAssetUrl('/images/Main Page/Packages/HIGEST_Package_banner.jpg') ??
  '/images/Main Page/Packages/HIGEST_Package_banner.jpg';

const aictePamphletFallback =
  resolveUploadedAssetUrl('/images/about/aicte-pamphlet-banner.jpg') ??
  '/images/about/aicte-pamphlet-banner.jpg';

const splashImages: SplashImage[] = [
  {
    src: highestPackageFallback,
    label: 'Highest Package',
    fallbackSrc: highestPackageFallback,
  },
  {
    src: aictePamphletFallback,
    label: 'AICTE Pamphlet',
    fallbackSrc: aictePamphletFallback,
  },
];

function getBannerFallback(label: string): string | undefined {
  const normalized = label.toLowerCase();

  if (normalized.includes('highest package')) {
    return highestPackageFallback;
  }

  if (normalized.includes('aicte')) {
    return aictePamphletFallback;
  }

  return undefined;
}

const SplashScreen: React.FC = () => {
  const homepage = useHomepageData();
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);

  const dynamicImages: SplashImage[] = (homepage?.data.homepageBanners ?? [])
    .filter((banner) => Boolean(banner.image_url))
    .map((banner) => {
      const label = banner.description || banner.title || 'Homepage Banner';
      const fallbackKey = `${banner.title ?? ''} ${label}`;
      const fallbackSrc = getBannerFallback(fallbackKey);
      const primarySrc = resolveUploadedAssetUrl(banner.image_url as string) ?? (banner.image_url as string);

      return {
        // Prefer stable static path for known fixed banners to avoid delayed 404->fallback hops.
        src: fallbackSrc ?? primarySrc,
        label,
        fallbackSrc,
      };
    });
  const images = dynamicImages.length > 0 ? dynamicImages : splashImages;
  const currentImage = useMemo(() => images[index] ?? images[0], [images, index]);

  useEffect(() => {
    const seen = sessionStorage.getItem('splashSeen');
    if (!seen) {
      setVisible(true);
      sessionStorage.setItem('splashSeen', 'true');
    }
  }, []);

  // Auto-advance every 10s
  useEffect(() => {
    if (!visible) return;
    const t = setInterval(() => setIndex(i => (i + 1) % images.length), 10000);
    return () => clearInterval(t);
  }, [visible, images.length]);

  useEffect(() => {
    setIndex((current) => (current >= images.length ? 0 : current));
  }, [images.length]);

  useEffect(() => {
    setIsImageLoading(true);
  }, [index, currentImage?.src]);

  const moveSlide = (delta: number) => {
    if (isNavigating || images.length <= 1) {
      return;
    }

    setIsNavigating(true);
    setIndex(i => (i + delta + images.length) % images.length);
    window.setTimeout(() => {
      setIsNavigating(false);
    }, 180);
  };

  const goToSlide = (nextIndex: number) => {
    if (isNavigating || images.length <= 1) {
      return;
    }

    setIsNavigating(true);
    setIndex(nextIndex);
    window.setTimeout(() => {
      setIsNavigating(false);
    }, 180);
  };

  if (!visible || !currentImage) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 backdrop-blur-sm"
      onClick={() => setVisible(false)}
    >
      <div
        className="relative flex flex-col items-center max-h-[96vh] max-w-[95vw] w-full mx-4"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-2 right-2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {/* Image */}
        <img
          key={`${index}-${currentImage.src}`}
          src={currentImage.src}
          alt={currentImage.label}
          onLoad={() => {
            setIsImageLoading(false);
          }}
          onError={(event) => {
            const fallbackSrc = currentImage.fallbackSrc;
            if (!fallbackSrc) {
              setIsImageLoading(false);
              return;
            }

            const target = event.currentTarget;
            const currentSrc = target.currentSrc || target.src;
            try {
              const resolvedCurrent = new URL(currentSrc, window.location.origin).href;
              const resolvedFallback = new URL(fallbackSrc, window.location.origin).href;
              if (resolvedCurrent === resolvedFallback) {
                return;
              }
            } catch {
              if (currentSrc === fallbackSrc) {
                return;
              }
            }

            if (!fallbackSrc.trim()) {
              setIsImageLoading(false);
              return;
            }
            target.src = fallbackSrc;
          }}
          className="w-full h-auto block shadow-2xl"
          style={{ maxHeight: '86vh', objectFit: 'contain', width: '100%' }}
        />
        {isImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="px-3 py-1.5 rounded-full bg-black/40 text-white/75 text-xs tracking-wide">
              Loading banner...
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={() => moveSlide(-1)}
            disabled={isNavigating}
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              disabled={isNavigating}
              className={`rounded-full transition-all duration-200 ${i === index ? 'w-5 h-2.5 bg-brand-gold' : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'}`}
            />
          ))}
          <button
            onClick={() => moveSlide(1)}
            disabled={isNavigating}
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
        <p className="text-white/40 text-[11px] uppercase tracking-widest mt-2">
          {currentImage.label} — {index + 1} / {images.length} &nbsp;·&nbsp; Click outside to close
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
