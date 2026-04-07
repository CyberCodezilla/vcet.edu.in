import React, { useRef, useState, useEffect, useMemo } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from 'framer-motion';
import { resolveUploadedAssetUrl } from '../utils/uploadedAssets';
import { useAchievements } from '../hooks/useAchievements';

interface AchievementItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

const ACHIEVEMENTS_DIR = '/images/Main Page/Remarkable Acheivements/';

function extractFileName(pathValue: string): string | null {
  if (!pathValue) return null;
  const cleanPath = pathValue.split('?')[0].split('#')[0];
  const segments = cleanPath.split('/').filter(Boolean);
  return segments.length ? segments[segments.length - 1] : null;
}

function normalizeAchievementImagePath(pathValue: string): string {
  const trimmed = (pathValue || '').trim();
  if (!trimmed) return trimmed;

  if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith('data:') || trimmed.startsWith('blob:')) {
    return trimmed;
  }

  if (trimmed.startsWith('/') || trimmed.startsWith('images/') || trimmed.startsWith('storage/') || trimmed.startsWith('uploads/')) {
    return trimmed;
  }

  const fileName = extractFileName(trimmed);
  if (!fileName) return trimmed;

  return `${ACHIEVEMENTS_DIR}${fileName}`;
}

function resolveAchievementImage(pathValue: string): string {
  if (!pathValue) return '';

  const normalizedPath = normalizeAchievementImagePath(pathValue);

  const segments = normalizedPath.split('/');
  const lastIdx = segments.length - 1;
  if (lastIdx >= 0) {
    segments[lastIdx] = segments[lastIdx].replace(/\s+/g, '_');
  }
  const spaceResolvedPath = segments.join('/');

  return resolveUploadedAssetUrl(spaceResolvedPath) ?? '';
}

function handleAchievementImageError(event: React.SyntheticEvent<HTMLImageElement>): void {
  const img = event.currentTarget;
  const originalSrc = img.dataset.originalSrc || img.src;

  if (!img.dataset.originalSrc) {
    img.dataset.originalSrc = originalSrc;
  }

  if (img.dataset.renderRetry !== '1') {
    img.dataset.renderRetry = '1';
    const fileName = extractFileName(originalSrc);
    if (fileName) {
      const sanitizedFileName = fileName.replace(/\s+/g, '_');
      const retryPath = `${ACHIEVEMENTS_DIR}${sanitizedFileName}`;
      const retryUrl = resolveUploadedAssetUrl(retryPath);
      if (retryUrl && retryUrl !== img.src) {
        img.src = retryUrl;
        return;
      }
    }
  }

  img.dataset.loadFailed = '1';
}

function handleAchievementImageLoad(event: React.SyntheticEvent<HTMLImageElement>): void {
  const img = event.currentTarget;
  img.dataset.loadFailed = '0';
  img.style.opacity = '';
  img.style.filter = '';
}

const STATIC_ACHIEVEMENTS: AchievementItem[] = [
  { id: 1, title: "Best Faculty Award", description: "Prof. Deepak Chaudhary won best faculty award in St.VC 2025, Coimbatore", image: "Prof.Deepak Chaudhary.png" },
  { id: 2, title: "VCET KABADDI TEAM Runners Up", description: "At MIT WPU PUNE NATIONAL LEVEL 'SUMMIT' CHAMPIONSHIP 2025.", image: "VCET KABADDI TEAM Runners Up.png" },
  { id: 3, title: "Grant from AICTE", description: "Dept. of Mechanical Engineering received Grant of ₹1 lakh from AICTE under SPICES.", image: "Congratulations to Department of Mechanical Engineering and Team VCET SOLECTHON.png" },
  { id: 4, title: "Avishkar 2nd Rank", description: "Avishkar secured 2nd rank, University level — WiFi-based Control System for Pond Aerators.", image: "Avishkar secured 2nd rank final round(University Level.jpg" },
  { id: 5, title: "MoU with IITM Pune", description: "MoU for Installation of Short-Range X-Band Polarimetric Scanning Doppler Weather Radar at VCET.", image: "Memorandum of Understanding (MoU) between IITM Pune and VCET.jpg" },
  { id: 6, title: "Team Airnova — 1st Place", description: "SkyGlider Competition at Ascension 2025, Technex IIT (BHU) Varanasi.", image: "Team Airnova of VCET has secured 1st place ..png" },
  { id: 7, title: "Miss Shyamli Jadhav — SSC Officer", description: "Selected as Officer — Short Service Commission (SSC). 2019 Passout, Mechanical.", image: "Congratulations Miss Shyamli Jadhav, (2019 passout) fMechanical..png" },
  { id: 8, title: "Grant of Patent Awarded", description: "Ms. Vaishali Shirshat and Ms. Pragati Patil awarded for innovation and patent grant.", image: "Ms.Vaishali Shirsath and Ms.Pragati Patil..jpg" },
  { id: 9, title: "Jitendra Prajapati — 1.06 Cr Package", description: "Placed in Perplexity AI with a 1.06 Crore per annum package.", image: "Jitendra Prajapati.jpg" },
  { id: 10, title: "5th Time National Champion", description: "1st Prize & 9 awards at Solar EV Championship 2025, Coimbatore.", image: "5th Time National Champion.png" },
  { id: 11, title: "Snehal Tate & Team — 1st Prize", description: "National Project Competition, Mumbai.", image: "Snehal Tate and Team.png" },
  { id: 12, title: "Sanjeev Sharma & Team — 1st Prize", description: "National Project Competition, Mumbai.", image: "Sanjeev Sharma & Team.png" },
  { id: 13, title: "Devanshi Solanki — 3rd Place", description: "Maharashtra State University Chess Tournament.", image: "Devanshi-Solanki-1.jpg" },
  { id: 14, title: "Team Centurion — 11th Rank", description: "Quad Bike Design Challenge, Hyderabad.", image: "Team Centurion.png" },
  { id: 15, title: "Tanvi Patil — 1st Place", description: "Carrom Singles at SKREAM 2025, KJ Somaiya College.", image: "Tanvi Patil from SE Comps has Won First place in Carrom Singles.png" },
  { id: 16, title: "Shreyas Pathe — Gold Medal", description: "Badminton Men's Singles & Doubles, Clara's College of Commerce, 2025.", image: "Shreyas Pathe TE IT won Gold Medal in Badminton Men s Singles and Doubles.png" },
  { id: 17, title: "Kishor Madne — Silver Medal", description: "Mumbai Suburban Zone II Tournament.", image: "Kishor Madne SE IT.jpg" },
  { id: 18, title: "SIH 2023 Grand Finale Winner", description: "Team Softracer IT — VCET won Smart India Hackathon 2023.", image: "SIH 2023 Grand Finale.jpg" },
  { id: 19, title: "Palak Churi — AIU Selection", description: "Inter University National Mallakhamb Competition 2025-26.", image: "Palak Churi TE Comps.jpg" },
];

function wrapAchievements(items: AchievementItem[]): AchievementItem[] {
  return items.map((item) => ({
    ...item,
    image: resolveAchievementImage(item.image),
  }));
}

// Utility: keep a value wrapping between min and max
const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

interface ParallaxRowProps {
  items: AchievementItem[];
  baseVelocity: number;
  onImageClick: (item: AchievementItem) => void;
}

function ParallaxRow({ items, baseVelocity, onImageClick }: ParallaxRowProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const skew = useTransform(smoothVelocity, [-1000, 1000], [-6, 6]);
  const x = useTransform(baseX, (v) => `${wrap(0, -50, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((_t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  // Duplicate items twice so the loop is seamless
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap w-full">
      <motion.div
        className="flex flex-nowrap gap-5"
        style={{ x, skewX: skew }}
      >
        {doubled.map((a, i) => (
          <div
            key={`${a.id}-${i}`}
            className="group relative flex-shrink-0 w-[220px] sm:w-[280px] md:w-[340px] h-[170px] sm:h-[210px] md:h-[250px] rounded-2xl overflow-hidden shadow-md cursor-pointer"
            onClick={() => onImageClick(a)}
          >
            {/* Photo */}
            <img
              src={a.image}
              alt={a.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onLoad={handleAchievementImageLoad}
              onError={handleAchievementImageError}
            />

            {/* Always-on bottom gradient + title */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent" />

            {/* Gold accent sweep on hover */}
            <div className="absolute top-0 left-0 h-0.5 w-0 bg-brand-gold group-hover:w-full transition-all duration-700 ease-out" />

            {/* Text — title always visible, description slides up on hover */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white font-bold text-sm leading-snug line-clamp-2 drop-shadow">
                {a.title}
              </h3>
              <p
                className="text-white/80 text-xs mt-1.5 leading-relaxed line-clamp-2
                           max-h-0 overflow-hidden opacity-0
                           group-hover:max-h-20 group-hover:opacity-100
                           transition-all duration-500 ease-out"
              >
                {a.description}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function MobileParallaxRow({ items, speed, direction, onImageClick }: { items: AchievementItem[], speed: number, direction: 1 | -1, onImageClick: (a: AchievementItem) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInteracting = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    
    let animationFrameId: number;
    // Set initial position for reverse scrolling to prevent immediate jump
    if (direction === -1) {
      el.scrollLeft = el.scrollWidth / 3;
    }

    const scroll = () => {
      if (!isInteracting.current && el.scrollWidth > 0) {
        const singleSetWidth = el.scrollWidth / 3;
        
        if (direction === 1) {
          el.scrollLeft += speed;
          if (el.scrollLeft >= singleSetWidth * 2) {
             el.scrollLeft -= singleSetWidth;
          }
        } else {
          el.scrollLeft -= speed;
          if (el.scrollLeft <= 0) {
             el.scrollLeft += singleSetWidth;
          }
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };
    
    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [speed, direction]);

  const tripled = [...items, ...items, ...items];

  return (
    <div 
      ref={scrollRef}
      className="flex overflow-x-auto w-full no-scrollbar gap-5 px-4"
      onTouchStart={() => isInteracting.current = true}
      onTouchEnd={() => isInteracting.current = false}
      onScroll={() => {
        isInteracting.current = true;
        const refAny = scrollRef.current as any;
        clearTimeout(refAny._timeout);
        refAny._timeout = setTimeout(() => {
           isInteracting.current = false;
        }, 150);
      }}
      style={{ scrollBehavior: 'auto' }}
    >
      {tripled.map((a, i) => (
        <div
          key={`${a.id}-${i}`}
          className="group relative flex-shrink-0 w-[220px] sm:w-[280px] h-[170px] sm:h-[210px] rounded-2xl overflow-hidden shadow-md cursor-pointer"
          onClick={() => onImageClick(a)}
        >
            <img
              src={a.image}
              alt={a.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onLoad={handleAchievementImageLoad}
              onError={handleAchievementImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent" />
            <div className="absolute top-0 left-0 h-0.5 w-0 bg-brand-gold group-hover:w-full transition-all duration-700 ease-out" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white font-bold text-sm leading-snug line-clamp-2 drop-shadow">
                {a.title}
              </h3>
              <p
                className="text-white/80 text-xs mt-1.5 leading-relaxed line-clamp-2
                           max-h-0 overflow-hidden opacity-0
                           group-hover:max-h-20 group-hover:opacity-100
                           transition-all duration-500 ease-out"
              >
                {a.description}
              </p>
            </div>
        </div>
      ))}
    </div>
  );
}

const Achievements: React.FC = () => {
  const { achievements: backendAchievements, loading } = useAchievements();
  const [selectedAchievement, setSelectedAchievement] = useState<AchievementItem | null>(null);
  const [lightboxZoom, setLightboxZoom] = useState(1);

  const displayAchievements = useMemo(() => {
    if (backendAchievements && backendAchievements.length > 0) {
      const mapped = backendAchievements
        .map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description || '',
          // Use the dedicated image_url field added in the migration/seeder
          image: item.image_url || '',
        }))
        .filter((a) => a.image);

      // If backend has records but none with images, fall back to static data
      if (mapped.length === 0) {
        return wrapAchievements(STATIC_ACHIEVEMENTS);
      }

      return wrapAchievements(mapped);
    }
    return wrapAchievements(STATIC_ACHIEVEMENTS);
  }, [backendAchievements]);

  const rowOne = useMemo(() => displayAchievements.slice(0, Math.ceil(displayAchievements.length / 2)), [displayAchievements]);
  const rowTwo = useMemo(() => [...displayAchievements.slice(Math.ceil(displayAchievements.length / 2))].reverse(), [displayAchievements]);

  useEffect(() => {
    setLightboxZoom(1);
  }, [selectedAchievement]);

  if (loading && (!backendAchievements || backendAchievements.length === 0)) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-brand-gold/20 border-t-brand-gold rounded-full animate-spin" />
        <p className="text-brand-navy/60 font-medium animate-pulse">Loading achievements...</p>
      </div>
    );
  }

  return (
    <section id="achievements" className="py-10 md:py-14 bg-brand-light relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-0 left-0 w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px] bg-brand-blue/[0.03] rounded-full -translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 mb-12">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-0.5 bg-brand-gold" />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">
            Recognition
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-brand-navy">
          Remarkable Achievements
        </h2>
        <p className="text-slate-500 mt-2 text-sm">
          Scroll to explore — speed up for the full effect.
        </p>
      </div>

      {/* Velocity-scroll rows with edge fade */}
      <div
        className="relative w-full space-y-5"
        style={{
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          maskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        {/* Desktop View (Framer Motion) */}
        <div className="hidden lg:block space-y-5">
          {/* Row 1 — scrolls left */}
          <ParallaxRow items={rowOne} baseVelocity={0.8} onImageClick={setSelectedAchievement} />
          {/* Row 2 — scrolls right */}
          <ParallaxRow items={rowTwo} baseVelocity={-0.8} onImageClick={setSelectedAchievement} />
        </div>

        {/* Mobile View (Native Touch Scrolling + Auto Scroll) */}
        <div className="block lg:hidden space-y-5">
          <MobileParallaxRow items={rowOne} speed={2.2} direction={1} onImageClick={setSelectedAchievement} />
          <MobileParallaxRow items={rowTwo} speed={2.2} direction={-1} onImageClick={setSelectedAchievement} />
        </div>
      </div>

      {/* ── Image Lightbox Modal ── */}
      {selectedAchievement && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setSelectedAchievement(null)}
          onWheel={e => {
            // e.preventDefault(); // removed to fix passive event listener error
            setLightboxZoom(z => Math.min(1.35, Math.max(1, z + (e.deltaY < 0 ? 0.05 : -0.05))));
          }}
        >
          <div
            className="relative max-w-2xl w-full rounded-2xl overflow-hidden border-4 border-brand-gold/60 shadow-[0_8px_60px_rgba(212,168,67,0.25)] bg-white"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedAchievement(null)}
              className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-brand-dark/70 hover:bg-brand-dark text-white transition-colors shadow-lg"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            <img
              src={selectedAchievement.image}
              alt={selectedAchievement.title}
              className="w-full h-auto max-h-[70vh] object-contain bg-gray-50"
              onLoad={handleAchievementImageLoad}
              onError={handleAchievementImageError}
              style={{ transform: `scale(${lightboxZoom})`, transition: 'transform 0.2s ease' }}
            />

            {/* Caption */}
            <div className="px-5 py-4 bg-white border-t border-brand-gold/20">
              <h3 className="text-base font-bold text-brand-navy">{selectedAchievement.title}</h3>
              <p className="text-sm text-slate-500 mt-1">{selectedAchievement.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Achievements;
