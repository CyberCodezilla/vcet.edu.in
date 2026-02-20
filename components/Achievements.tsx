import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from 'framer-motion';

interface Achievement {
  id: number;
  title: string;
  description: string;
  image: string;
}

const achievements: Achievement[] = [
  { id: 1, title: "Best Faculty Award", description: "Prof. Deepak Chaudhary won best faculty award in St.VC 2025, Coimbatore", image: "/Images/Remarkable%20Acheivements/Prof.Deepak%20Chaudhary.png" },
  { id: 2, title: "VCET KABADDI TEAM Runners Up", description: "At MIT WPU PUNE NATIONAL LEVEL 'SUMMIT' CHAMPIONSHIP 2025.", image: "/Images/Remarkable%20Acheivements/VCET%20KABADDI%20TEAM%20Runners%20Up.png" },
  { id: 3, title: "Grant from AICTE", description: "Dept. of Mechanical Engineering received Grant of ₹1 lakh from AICTE under SPICES.", image: "/Images/Remarkable%20Acheivements/Congratulations%20to%20Department%20of%20Mechanical%20Engineering%20and%20Team%20VCET%20SOLECTHON.png" },
  { id: 4, title: "Avishkar 2nd Rank", description: "Avishkar secured 2nd rank, University level — WiFi-based Control System for Pond Aerators.", image: "/Images/Remarkable%20Acheivements/Avishkar%20secured%202nd%20rank%20final%20round(University%20Level.jpg" },
  { id: 5, title: "MoU with IITM Pune", description: "MoU for Installation of Short-Range X-Band Polarimetric Scanning Doppler Weather Radar at VCET.", image: "/Images/Remarkable%20Acheivements/Memorandum%20of%20Understanding%20(MoU)%20between%20IITM%20Pune%20and%20VCET.jpg" },
  { id: 6, title: "Team Airnova — 1st Place", description: "SkyGlider Competition at Ascension 2025, Technex IIT (BHU) Varanasi.", image: "/Images/Remarkable%20Acheivements/Team%20Airnova%20of%20VCET%20has%20secured%201st%20place%20..png" },
  { id: 7, title: "Miss Shyamli Jadhav — SSC Officer", description: "Selected as Officer — Short Service Commission (SSC). 2019 Passout, Mechanical.", image: "/Images/Remarkable%20Acheivements/Congratulations%20Miss%20Shyamli%20Jadhav,%20(2019%20passout)%20fMechanical..png" },
  { id: 8, title: "Grant of Patent Awarded", description: "Ms. Vaishali Shirshat and Ms. Pragati Patil awarded for innovation and patent grant.", image: "/Images/Remarkable%20Acheivements/Ms.Vaishali%20Shirsath%20and%20Ms.Pragati%20Patil..jpg" },
  { id: 9, title: "Jitendra Prajapati — 1.06 Cr Package", description: "Placed in Perplexity AI with a 1.06 Crore per annum package.", image: "/Images/Remarkable%20Acheivements/Jitendra%20Prajapati.jpg" },
  { id: 10, title: "5th Time National Champion", description: "1st Prize & 9 awards at Solar EV Championship 2025, Coimbatore.", image: "/Images/Remarkable%20Acheivements/5th%20Time%20National%20Champion.png" },
  { id: 11, title: "Snehal Tate & Team — 1st Prize", description: "National Project Competition, Mumbai.", image: "/Images/Remarkable%20Acheivements/Snehal%20Tate%20and%20Team.png" },
  { id: 12, title: "Sanjeev Sharma & Team — 1st Prize", description: "National Project Competition, Mumbai.", image: "/Images/Remarkable%20Acheivements/Sanjeev%20Sharma%20&%20Team.png" },
  { id: 13, title: "Devanshi Solanki — 3rd Place", description: "Maharashtra State University Chess Tournament.", image: "/Images/Remarkable%20Acheivements/Devanshi-Solanki-1.jpg" },
  { id: 14, title: "Team Centurion — 11th Rank", description: "Quad Bike Design Challenge, Hyderabad.", image: "/Images/Remarkable%20Acheivements/Team%20Centurion.png" },
  { id: 15, title: "Tanvi Patil — 1st Place", description: "Carrom Singles at SKREAM 2025, KJ Somaiya College.", image: "/Images/Remarkable%20Acheivements/Tanvi%20Patil%20from%20SE%20Comps%20has%20Won%20First%20place%20in%20Carrom%20Singles.png" },
  { id: 16, title: "Shreyas Pathe — Gold Medal", description: "Badminton Men's Singles & Doubles, Clara's College of Commerce, 2025.", image: "/Images/Remarkable%20Acheivements/Shreyas%20Pathe%20TE%20IT%20won%20Gold%20Medal%20in%20Badminton%20Men's%20Singles%20and%20Doubles.png" },
  { id: 17, title: "Kishor Madne — Silver Medal", description: "Mumbai Suburban Zone II Tournament.", image: "/Images/Remarkable%20Acheivements/Kishor%20Madne%20SE%20IT.jpg" },
  { id: 18, title: "SIH 2023 Grand Finale Winner", description: "Team Softracer IT — VCET won Smart India Hackathon 2023.", image: "/Images/Remarkable%20Acheivements/SIH%202023%20Grand%20Finale.jpg" },
  { id: 19, title: "Palak Churi — AIU Selection", description: "Inter University National Mallakhamb Competition 2025-26.", image: "/Images/Remarkable%20Acheivements/Palak%20Churi%20TE%20Comps.jpg" },
];

// Split into two rows — row 2 is reversed for visual contrast
const rowOne = achievements.slice(0, 10);
const rowTwo = [...achievements.slice(9)].reverse();

// Utility: keep a value wrapping between min and max
const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

interface ParallaxRowProps {
  items: Achievement[];
  baseVelocity: number;
}

function ParallaxRow({ items, baseVelocity }: ParallaxRowProps) {
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
            className="group relative flex-shrink-0 w-[280px] md:w-[340px] h-[210px] md:h-[250px] rounded-2xl overflow-hidden shadow-md cursor-pointer"
          >
            {/* Photo */}
            <img
              src={a.image}
              alt={a.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400"%3E%3Crect fill="%231B3A5C" width="600" height="400"/%3E%3Ctext fill="%23D4A843" font-family="Inter" font-size="16" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EAchievement%3C/text%3E%3C/svg%3E';
              }}
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

const Achievements: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-brand-light relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-brand-blue/[0.03] rounded-full -translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-12">
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
        {/* Row 1 — scrolls left */}
        <ParallaxRow items={rowOne} baseVelocity={0.8} />
        {/* Row 2 — scrolls right */}
        <ParallaxRow items={rowTwo} baseVelocity={-0.8} />
      </div>
    </section>
  );
};

export default Achievements;
