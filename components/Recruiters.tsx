import React, { useEffect, useRef, useState } from "react";
import { placementsService } from "../services/placements";

// -- Data (all logos from /public/Images/recriters/) ---------------------------
type Recruiter = { name: string; logo: string; url: string };

const recruiters: Recruiter[] = [
  { name: "Accenture",           logo: "/Images/recriters/Accenture-Logo-PNG-Vector-EPS-Free-Download.jpeg", url: "https://www.accenture.com" },
  { name: "Arcon",               logo: "/Images/Main%20Page/recruiters/arcon-logo.png",        url: "https://www.arconnet.com" },
  { name: "Bristlecone",         logo: "/Images/Main%20Page/recruiters/bristlecone-logo.png",   url: "https://www.bristlecone.com" },
  { name: "BuiltIO",             logo: "/Images/Main%20Page/recruiters/builtio-300x72-1.png",   url: "https://www.softwareag.com" },
  { name: "Capgemini",           logo: "/Images/Main%20Page/recruiters/Capgemini-300x67-1.png", url: "https://www.capgemini.com" },
  { name: "Coca-Cola",           logo: "/Images/Main%20Page/recruiters/coca-300x99-1.png",      url: "https://www.coca-colacompany.com" },
  { name: "Cognizant",           logo: "/Images/Main%20Page/recruiters/cognizant-logo.png",     url: "https://www.cognizant.com" },
  { name: "Godrej Infotech",     logo: "/Images/recriters/godrej-infotech.jpeg",   url: "https://www.godrejinfotech.com" },
  { name: "Hexaware",            logo: "/Images/recriters/hexaware-logo.jpeg",     url: "https://www.hexaware.com" },
  { name: "IBM",                 logo: "/Images/Main%20Page/recruiters/IBM-logo.png",           url: "https://www.ibm.com" },
  { name: "Infosys",             logo: "/Images/Main%20Page/recruiters/infosys-300x116-1.png",  url: "https://www.infosys.com" },
  { name: "Interactive Brokers", logo: "/Images/recriters/interactive-brokers.jpeg",url: "https://www.interactivebrokers.com" },
  { name: "Johnson Controls",    logo: "/Images/Main%20Page/recruiters/Johnson-logo.png",       url: "https://www.johnsoncontrols.com" },
  { name: "L&T",                 logo: "/Images/Main%20Page/recruiters/lt-300x81-1.jpg",        url: "https://www.larsentoubro.com" },
  { name: "LTIMindtree",         logo: "/Images/Main%20Page/recruiters/lti-logo.png",           url: "https://www.ltimindtree.com" },
  { name: "Mahindra",            logo: "/Images/Main%20Page/recruiters/mahindra-300x85-1.png",  url: "https://www.mahindra.com" },
  { name: "Neebal Technologies", logo: "/Images/recriters/neebal-technologoes.jpeg",url: "https://www.neebal.com" },
  { name: "Persistent Systems",  logo: "/Images/Main%20Page/recruiters/logo-rgb-black-e1751968833241.png", url: "https://www.persistent.com" },
  { name: "Schneider Electric",  logo: "/Images/Main%20Page/recruiters/schneider-logo.png",     url: "https://www.se.com" },
  { name: "Tata Power",          logo: "/Images/Main%20Page/recruiters/Tata-Power.png",         url: "https://www.tatapower.com" },
  { name: "Technimant",          logo: "/Images/Main%20Page/recruiters/Technimant-logo.png",    url: "https://www.technimant.com" },
  { name: "Verdantis",           logo: "/Images/Main%20Page/recruiters/verdantis-300x77-1.png", url: "https://www.verdantis.com" },
  { name: "Vistaar",             logo: "/Images/Main%20Page/recruiters/Vistaar-logo-1.png",     url: "https://www.vfrpl.in" },
  { name: "Vodafone",            logo: "/Images/Main%20Page/recruiters/VODAPHONE.jpg",          url: "https://www.vodafone.com" },
  { name: "Wipro",               logo: "/Images/Main%20Page/recruiters/wipro-logo.png",         url: "https://www.wipro.com" },
  { name: "Zensoft",             logo: "/Images/Main%20Page/recruiters/Zensoft-logo.jpg",       url: "https://www.zensoft.io" },
  { name: "Zeus Learning",       logo: "/Images/Main%20Page/recruiters/Zeus-Learning-logo.png", url: "https://www.zeuslearning.com" },
];

// Row 1 — Top / best-known companies
const rowOne: Recruiter[] = [
  { name: "Accenture",           logo: "/Images/recriters/Accenture-Logo-PNG-Vector-EPS-Free-Download.jpeg", url: "https://www.accenture.com" },
  { name: "Capgemini",           logo: "/Images/Main%20Page/recruiters/Capgemini-300x67-1.png", url: "https://www.capgemini.com" },
  { name: "Coca-Cola",           logo: "/Images/Main%20Page/recruiters/coca-300x99-1.png",      url: "https://www.coca-colacompany.com" },
  { name: "Cognizant",           logo: "/Images/Main%20Page/recruiters/cognizant-logo.png",     url: "https://www.cognizant.com" },
  { name: "IBM",                 logo: "/Images/Main%20Page/recruiters/IBM-logo.png",           url: "https://www.ibm.com" },
  { name: "Infosys",             logo: "/Images/Main%20Page/recruiters/infosys-300x116-1.png",  url: "https://www.infosys.com" },
  { name: "L&T",                 logo: "/Images/Main%20Page/recruiters/lt-300x81-1.jpg",        url: "https://www.larsentoubro.com" },
  { name: "LTIMindtree",         logo: "/Images/Main%20Page/recruiters/lti-logo.png",           url: "https://www.ltimindtree.com" },
  { name: "Mahindra",            logo: "/Images/Main%20Page/recruiters/mahindra-300x85-1.png",  url: "https://www.mahindra.com" },
  { name: "Schneider Electric",  logo: "/Images/Main%20Page/recruiters/schneider-logo.png",     url: "https://www.se.com" },
  { name: "Tata Power",          logo: "/Images/Main%20Page/recruiters/Tata-Power.png",         url: "https://www.tatapower.com" },
  { name: "Vodafone",            logo: "/Images/Main%20Page/recruiters/VODAPHONE.jpg",          url: "https://www.vodafone.com" },
  { name: "Wipro",               logo: "/Images/Main%20Page/recruiters/wipro-logo.png",         url: "https://www.wipro.com" },
  { name: "Persistent Systems",  logo: "/Images/Main%20Page/recruiters/logo-rgb-black-e1751968833241.png", url: "https://www.persistent.com" },
];

// Row 2 — Remaining partners
const rowTwo: Recruiter[] = [
  { name: "Arcon",               logo: "/Images/Main%20Page/recruiters/arcon-logo.png",         url: "https://www.arconnet.com" },
  { name: "Bristlecone",         logo: "/Images/Main%20Page/recruiters/bristlecone-logo.png",   url: "https://www.bristlecone.com" },
  { name: "BuiltIO",             logo: "/Images/Main%20Page/recruiters/builtio-300x72-1.png",   url: "https://www.softwareag.com" },
  { name: "Godrej Infotech",     logo: "/Images/recriters/godrej-infotech.jpeg",   url: "https://www.godrejinfotech.com" },
  { name: "Hexaware",            logo: "/Images/recriters/hexaware-logo.jpeg",     url: "https://www.hexaware.com" },
  { name: "Interactive Brokers", logo: "/Images/recriters/interactive-brokers.jpeg",url: "https://www.interactivebrokers.com" },
  { name: "Johnson Controls",    logo: "/Images/Main%20Page/recruiters/Johnson-logo.png",       url: "https://www.johnsoncontrols.com" },
  { name: "Neebal Technologies", logo: "/Images/recriters/neebal-technologoes.jpeg",url: "https://www.neebal.com" },
  { name: "Technimant",          logo: "/Images/Main%20Page/recruiters/Technimant-logo.png",    url: "https://www.technimant.com" },
  { name: "Verdantis",           logo: "/Images/Main%20Page/recruiters/verdantis-300x77-1.png", url: "https://www.verdantis.com" },
  { name: "Vistaar",             logo: "/Images/Main%20Page/recruiters/Vistaar-logo-1.png",     url: "https://www.vfrpl.in" },
  { name: "Zensoft",             logo: "/Images/Main%20Page/recruiters/Zensoft-logo.jpg",       url: "https://www.zensoft.io" },
  { name: "Zeus Learning",       logo: "/Images/Main%20Page/recruiters/Zeus-Learning-logo.png", url: "https://www.zeuslearning.com" },
];

// -- BentoBox ------------------------------------------------------------------
interface BentoBoxProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}
const BentoBox: React.FC<BentoBoxProps> = ({ className = "", style, children }) => (
  <div
    style={style}
    className={`overflow-hidden flex flex-col ${className}`}
    >
    {children}
  </div>
);

// -- Accent Bar ----------------------------------------------------------------
const Bar: React.FC<{ pct: string; gold?: boolean }> = ({ pct, gold }) => (
  <div className="w-full h-1.5 rounded-full overflow-hidden mt-5" style={{ background: "#DCE7F7" }}>
    <div
      style={{ width: pct, background: gold ? "#F4B400" : "#1E4DB7" }}
      className="h-full rounded-full"
    />
  </div>
);

// -- MarqueeRow — infinite auto-scroll with pause on hover ---------------
interface MarqueeRowProps {
  items: Recruiter[];
  direction?: "left" | "right";
  speed?: number; // seconds for one full cycle
  onItemClick?: (item: Recruiter) => void;
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({ items, direction = "left", speed = 40, onItemClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const posRef = useRef(0);
  const pausedRef = useRef(false);
  const initRef = useRef(false);
  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartPosRef = useRef(0);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wasDragRef = useRef(false);  // true if user dragged more than 5px
  const clickTargetRef = useRef<Recruiter | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const oneSetWidth = el.scrollWidth / 3;
    const pxPerFrame = oneSetWidth / (speed * 60);

    if (!initRef.current) {
      if (direction === "right") {
        posRef.current = oneSetWidth;
      }
      initRef.current = true;
    }

    const wrap = () => {
      const el2 = scrollRef.current;
      if (!el2) return;
      const w = el2.scrollWidth / 3;
      if (posRef.current >= w * 2) posRef.current -= w;
      if (posRef.current < 0) posRef.current += w;
    };

    const tick = () => {
      if (!pausedRef.current && !draggingRef.current) {
        if (direction === "left") {
          posRef.current += pxPerFrame;
        } else {
          posRef.current -= pxPerFrame;
        }
        wrap();
        el.style.transform = `translateX(${-posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [direction, speed]);

  // -- Drag / touch handlers --
  const scheduleResume = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, 2000); // auto-scroll resumes 2s after user stops dragging
  };

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    wasDragRef.current = false;
    // Don't clear clickTargetRef here - it's set by individual cards
    pausedRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    dragStartXRef.current = e.clientX;
    dragStartPosRef.current = posRef.current;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const delta = dragStartXRef.current - e.clientX;
    // If user moved more than 5px, it's a drag, not a click
    if (Math.abs(delta) > 5) wasDragRef.current = true;
    const el = scrollRef.current;
    if (!el) return;
    const oneSetWidth = el.scrollWidth / 3;
    let next = dragStartPosRef.current + delta;
    if (next >= oneSetWidth * 2) next -= oneSetWidth;
    if (next < 0) next += oneSetWidth;
    posRef.current = next;
    el.style.transform = `translateX(${-posRef.current}px)`;
  };

  const lastTapTimeRef = useRef<number>(0);

  const onPointerUp = () => {
    const wasClick = !wasDragRef.current;
    draggingRef.current = false;
    scheduleResume();
    
    // If it was a click (not a drag), fire the click handler
    if (wasClick && clickTargetRef.current && onItemClick) {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        const now = Date.now();
        if (now - lastTapTimeRef.current < 400) {
          // Double hit verified
          onItemClick(clickTargetRef.current);
          lastTapTimeRef.current = 0;
        } else {
          // First hit on mobile - wait for second
          lastTapTimeRef.current = now;
        }
      } else {
        // Single click always works on desktop
        onItemClick(clickTargetRef.current);
      }
    }
    clickTargetRef.current = null;
  };

  // -- Mouse wheel horizontal scrolling using native listener for passive: false --
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const onWheelNative = (e: WheelEvent) => {
      // Only handle horizontal-like scroll (shift+wheel or trackpad)
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta === 0) return;
      e.preventDefault();
      pausedRef.current = true;
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);

      const el = scrollRef.current;
      if (!el) return;
      const oneSetWidth = el.scrollWidth / 3;
      posRef.current += delta * 0.8;
      if (posRef.current >= oneSetWidth * 2) posRef.current -= oneSetWidth;
      if (posRef.current < 0) posRef.current += oneSetWidth;
      el.style.transform = `translateX(${-posRef.current}px)`;
      scheduleResume();
    };

    wrapper.addEventListener("wheel", onWheelNative, { passive: false });
    return () => wrapper.removeEventListener("wheel", onWheelNative);
  }, []);

  const tripled = [...items, ...items, ...items];

  return (
    <div
      ref={wrapperRef}
      className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing select-none pt-2"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
        maskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
        touchAction: "pan-y",
      }}
    >
      <div ref={scrollRef} className="flex w-max will-change-transform">
        {tripled.map((company, i) => (
          <div
            key={`${company.name}-${i}`}
            className="flex-shrink-0 mx-3 sm:mx-4"
            onPointerDown={() => { clickTargetRef.current = company; }}
          >
            <div className="group flex flex-col items-center justify-center gap-3 w-[140px] sm:w-[160px] md:w-[180px] p-5 sm:p-6 border-2 border-gray-100 bg-white rounded-xl shadow-sm hover:border-brand-gold/60 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="w-full flex items-center justify-center h-[60px] sm:h-[70px]">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="max-w-full max-h-[60px] sm:max-h-[70px] w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <span className="text-[11px] sm:text-[12px] font-bold text-slate-600 text-center tracking-wide group-hover:text-brand-blue transition-colors leading-snug">
                {company.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// -- Main ----------------------------------------------------------------------
const Recruiters: React.FC = () => {
  const [confirmTarget, setConfirmTarget] = useState<Recruiter | null>(null);
  const [rowOneData, setRowOneData] = useState<Recruiter[]>(rowOne);
  const [rowTwoData, setRowTwoData] = useState<Recruiter[]>(rowTwo);

  useEffect(() => {
    placementsService.list().then((partners) => {
      if (partners && partners.length > 0) {
        const recruitersData: Recruiter[] = partners.map((p: any) => ({
          name: p.company || p.name,
          logo: p.logo,
          url: p.website || '#',
        }));
        const half = Math.ceil(recruitersData.length / 2);
        setRowOneData(recruitersData.slice(0, half));
        setRowTwoData(recruitersData.slice(half));
      }
    });
  }, []);

  const handleRecruiterClick = (item: Recruiter) => {
    setConfirmTarget(item);
  };

  const handleConfirm = () => {
    if (confirmTarget) {
      window.open(confirmTarget.url, '_blank', 'noopener,noreferrer');
    }
    setConfirmTarget(null);
  };

  const handleCancel = () => {
    setConfirmTarget(null);
  };

  return (
  <>
  {/* Confirmation Popup */}
  {confirmTarget && (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleCancel}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-[90vw] mx-4 text-center animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'fadeInUp 0.25s ease-out' }}
      >
        {/* Recruiter logo preview */}
        <div className="w-20 h-20 mx-auto mb-5 rounded-xl border-2 border-gray-100 bg-gray-50 flex items-center justify-center p-3">
          <img
            src={confirmTarget.logo}
            alt={confirmTarget.name}
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <h3 className="text-lg font-bold text-brand-navy mb-2">
          Visit {confirmTarget.name}?
        </h3>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          Do you want to visit <span className="font-semibold text-brand-blue">{confirmTarget.name}</span>'s official site?<br />
          <span className="text-xs text-slate-400 mt-1 block">{confirmTarget.url}</span>
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={handleCancel}
            className="px-6 py-2.5 rounded-lg border-2 border-gray-200 text-sm font-semibold text-slate-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:brightness-110 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #0B3D91, #1E4DB7)' }}
          >
            Yes, Visit Site
          </button>
        </div>
      </div>
    </div>
  )}

  <section id="recruiters" className="py-14 sm:py-18 md:py-24 relative overflow-hidden">

    {/* Background image */}
    <img
      src="/Images/PLACEMENT/corporate.jpg"
      alt=""
      className="absolute inset-0 w-full h-full object-cover"
      aria-hidden="true"
      loading="lazy"
    />
    {/* Light overlay so content stays readable */}
    <div className="absolute inset-0" style={{ background: "rgba(248,250,252,0.82)" }} />

    {/* Ambient glows */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] bg-blue-300/20 rounded-full blur-[100px] sm:blur-[130px] md:blur-[140px]" />
      <div className="absolute bottom-0 right-1/4 w-[240px] h-[240px] sm:w-[340px] sm:h-[340px] md:w-[400px] md:h-[400px] bg-blue-500/10 rounded-full blur-[70px] sm:blur-[90px] md:blur-[100px]" />
    </div>

    {/* Corner decorations */}
    {/* Top-left */}
    <div className="absolute top-0 left-0 w-24 h-24 pointer-events-none">
      <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 rounded-tl-sm" style={{ borderColor: "#F4B400" }} />
      <div className="absolute top-3 left-3 w-5 h-5 border-t border-l" style={{ borderColor: "rgba(11,61,145,0.2)" }} />
    </div>
    {/* Top-right */}
    <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none">
      <div className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 rounded-tr-sm" style={{ borderColor: "#F4B400" }} />
      <div className="absolute top-3 right-3 w-5 h-5 border-t border-r" style={{ borderColor: "rgba(11,61,145,0.2)" }} />
    </div>
    {/* Bottom-left */}
    <div className="absolute bottom-0 left-0 w-24 h-24 pointer-events-none">
      <div className="absolute bottom-6 left-6 w-10 h-10 border-b-2 border-l-2 rounded-bl-sm" style={{ borderColor: "#F4B400" }} />
      <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l" style={{ borderColor: "rgba(11,61,145,0.2)" }} />
    </div>
    {/* Bottom-right */}
    <div className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none">
      <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 rounded-br-sm" style={{ borderColor: "#F4B400" }} />
      <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r" style={{ borderColor: "rgba(11,61,145,0.2)" }} />
    </div>

    <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">

      {/* Section Header */}
      <div className="mb-8 md:mb-14 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-px" style={{ background: "#F4B400" }} />
          <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "#0B3D91" }}>
            Our Hiring Partners
          </span>
          <div className="w-8 h-px" style={{ background: "#F4B400" }} />
        </div>
        <h2 className="text-4xl md:text-5xl font-display font-extrabold leading-tight mb-4" style={{ color: "#1E293B" }}>
          Where Our{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(90deg, #0B3D91, #1E4DB7)" }}
          >
            Alumni Thrive
          </span>
        </h2>
        <p className="max-w-md mx-auto text-[15px] leading-relaxed" style={{ color: "#64748B" }}>
          Top-tier companies recruit from our campus every year &mdash; trusting VCET graduates to power their teams.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* 1 — Hero stat: Campus Offers */}
        <BentoBox
          className="md:col-span-2 p-5 sm:p-6 md:p-8 justify-between min-h-[220px] border"
          style={{
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderColor: "rgba(11,61,145,0.15)",
            boxShadow: "0 8px 32px rgba(11,61,145,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
          }}
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#0B3D91" }}>
              2024-25 &middot; Placements
            </p>
            <h3 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-none tracking-tight" style={{ color: "#0B3D91" }}>
              285
            </h3>
            <p className="text-2xl font-medium mt-2" style={{ color: "#1E293B" }}>Campus Offers Made</p>
          </div>
          <div className="mt-6 space-y-3">
            <p className="text-sm leading-relaxed" style={{ color: "#64748B" }}>
              Our dedicated placement cell connects every student with industry leaders for interviews and full-time roles.
            </p>
            <Bar pct="80%" gold />
          </div>
        </BentoBox>

        {/* 2 — Highest Package */}
        <BentoBox
          className="p-5 sm:p-6 md:p-8 justify-between min-h-[220px] md:min-h-[320px] md:row-span-2 border"
          style={{
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderColor: "rgba(11,61,145,0.15)",
            boxShadow: "0 8px 32px rgba(11,61,145,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
          }}
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#0B3D91" }}>
              Highest Package
            </p>
            <h3 className="text-5xl font-extrabold leading-none" style={{ color: "#F4B400" }}>
              ₹1.06 Cpa
            </h3>
            <p className="text-sm mt-2" style={{ color: "#64748B" }}>Best offer &middot; 2024-25 batch</p>
          </div>
          <Bar pct="90%" gold />
        </BentoBox>

        {/* 4 — Average Package */}
        <BentoBox
          className="md:col-span-2 p-5 sm:p-6 md:p-8 justify-between border"
          style={{
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderColor: "rgba(11,61,145,0.15)",
            boxShadow: "0 8px 32px rgba(11,61,145,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
          }}
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#64748B" }}>
              Average Package
            </p>
            <h3 className="text-5xl font-extrabold leading-none" style={{ color: "#0B3D91" }}>
              ₹6 <span className="text-2xl font-semibold" style={{ color: "#64748B" }}>LPA</span>
            </h3>
            <p className="text-sm mt-2" style={{ color: "#64748B" }}>Across all streams &middot; 2024-25 batch</p>
          </div>
          <Bar pct="29%" />
        </BentoBox>

        {/* 5 — Hiring Partners — auto-scrolling marquee */}
        <div className="md:col-span-3 overflow-hidden border" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
          {/* Header strip */}
          <div className="px-5 sm:px-6 md:px-8 pt-6 sm:pt-7 md:pt-8 pb-5 sm:pb-6" style={{ background: "#0B3D91" }}>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-6 h-px" style={{ background: "#F4B400" }} />
              <p className="text-[14px] font-bold uppercase tracking-[0.25em]" style={{ color: "#EAF2FB" }}>
                Our Hiring Partners
              </p>
              <div className="w-6 h-px" style={{ background: "#F4B400" }} />
            </div>
          </div>

          {/* Marquee area */}
          <div className="bg-white px-0 py-8 sm:py-10 space-y-6 overflow-hidden">
            <MarqueeRow items={rowOneData} direction="left" speed={45} onItemClick={handleRecruiterClick} />
            <MarqueeRow items={rowTwoData} direction="right" speed={40} onItemClick={handleRecruiterClick} />
          </div>
        </div>

      </div>
    </div>
  </section>
  </>
  );
};

export default Recruiters;
