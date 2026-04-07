import React, { useEffect, useRef, useState } from "react";
import { useHomepageData } from "../context/HomepageDataContext";
import { placementsService } from "../services/placements";
import { resolveUploadedAssetUrl } from "../utils/uploadedAssets";

// -- Data (all logos from /public/images/Main Page/recruiters/) ---------------------------
type Recruiter = { name: string; logo: string; url: string };
const RECRUITERS_BACKEND_PATH = "/images/Main Page/recruiters/";

// Canonical name -> bundled local fallback image path.
const LOGO_ARCON = "/images/Main Page/recruiters/arcon-logo.png";
const LOGO_BRISTLECONE = "/images/Main Page/recruiters/bristlecone-logo.png";
const LOGO_BUILTIO = "/images/Main Page/recruiters/builtio-300x72-1.png";
const LOGO_CAPGEMINI = "/images/Main Page/recruiters/Capgemini-300x67-1.png";
const LOGO_COCA_COLA = "/images/Main Page/recruiters/coca-300x99-1.png";
const LOGO_COGNIZANT = "/images/Main Page/recruiters/cognizant-logo.png";
const LOGO_IBM = "/images/Main Page/recruiters/IBM-logo.png";
const LOGO_INFOSYS = "/images/Main Page/recruiters/infosys-300x116-1.png";
const LOGO_JOHNSON = "/images/Main Page/recruiters/Johnson-logo.png";
const LOGO_LT = "/images/Main Page/recruiters/lt-300x81-1.jpg";
const LOGO_LTI = "/images/Main Page/recruiters/lti-logo.png";
const LOGO_MAHINDRA = "/images/Main Page/recruiters/mahindra-300x85-1.png";
const LOGO_PERSISTENT = "/images/Main Page/recruiters/logo-rgb-black-e1751968833241.png";
const LOGO_SCHNEIDER = "/images/Main Page/recruiters/schneider-logo.png";
const LOGO_TATA_POWER = "/images/Main Page/recruiters/Tata-Power.png";
const LOGO_TECHNIMANT = "/images/Main Page/recruiters/Technimant-logo.png";
const LOGO_VERDANTIS = "/images/Main Page/recruiters/verdantis-300x77-1.png";
const LOGO_VISTAAR = "/images/Main Page/recruiters/Vistaar-logo-1.png";
const LOGO_VODAFONE = "/images/Main Page/recruiters/VODAPHONE.jpg";
const LOGO_WIPRO = "/images/Main Page/recruiters/wipro-logo.png";
const LOGO_ZENSOFT = "/images/Main Page/recruiters/Zensoft-logo.jpg";
const LOGO_ZEUS = "/images/Main Page/recruiters/Zeus-Learning-logo.png";

// Additional fallbacks matching backend public/images/Main Page/recruiters/
const LOGO_ACCENTURE = "/images/Main Page/recruiters/accenture-logo.png";
const LOGO_GODREJ = "/images/Main Page/recruiters/godrej-infotech-logo.png";
const LOGO_HEXAWARE = "/images/Main Page/recruiters/hexaware-logo.jpeg";
const LOGO_INTERACTIVE_BROKERS = "/images/Main Page/recruiters/interactive-brokers-logo.png";
const LOGO_NEEBAL = "/images/Main Page/recruiters/neebal-technologies-logo.png";

const recruiterLogoMap: Record<string, string> = {
  "arcon":               LOGO_ARCON,
  "bristlecone":         LOGO_BRISTLECONE,
  "builtio":             LOGO_BUILTIO,
  "capgemini":           LOGO_CAPGEMINI,
  "coca-cola":           LOGO_COCA_COLA,
  "cognizant":           LOGO_COGNIZANT,
  "ibm":                 LOGO_IBM,
  "infosys":             LOGO_INFOSYS,
  "johnson controls":    LOGO_JOHNSON,
  "l&t":                 LOGO_LT,
  "larsen":              LOGO_LT,
  "ltimindtree":         LOGO_LTI,
  "lti":                 LOGO_LTI,
  "mahindra":            LOGO_MAHINDRA,
  "persistent":          LOGO_PERSISTENT,
  "persistent systems":  LOGO_PERSISTENT,
  "schneider":           LOGO_SCHNEIDER,
  "schneider electric":  LOGO_SCHNEIDER,
  "tata power":          LOGO_TATA_POWER,
  "technimant":          LOGO_TECHNIMANT,
  "verdantis":           LOGO_VERDANTIS,
  "vistaar":             LOGO_VISTAAR,
  "vodafone":            LOGO_VODAFONE,
  "wipro":               LOGO_WIPRO,
  "zensoft":             LOGO_ZENSOFT,
  "zeus learning":       LOGO_ZEUS,
  "zeus":                LOGO_ZEUS,
  "godrej":              LOGO_GODREJ,
  "accenture":           LOGO_ACCENTURE,
  "hexaware":            LOGO_HEXAWARE,
  "interactive brokers": LOGO_INTERACTIVE_BROKERS,
  "neebal":              LOGO_NEEBAL,
};

const CLEAN_RECRUITERS_PATH = "/images/recruiters_clean/";

const forcedRecruiterFileByName: Record<string, string> = {
  "accenture":           "Accenture-Logo-PNG-Vector-EPS-Free-Download.jpeg",
  "godrej":              "godrej-infotech.jpeg",
  "hexaware":            "hexaware-logo.jpeg",
  "interactive brokers": "interactive-brokers.jpeg",
  "neebal":              "neebal-technologoes.jpeg",
};

function toKey(value: unknown): string {
  return typeof value === "string" ? value.toLowerCase().replace(/\s+/g, " ").trim() : "";
}

function getForcedRecruiterLogoByName(nameValue: unknown): string | null {
  const key = toKey(nameValue);
  if (!key) return null;

  for (const [partnerName, fileName] of Object.entries(forcedRecruiterFileByName)) {
    if (key.includes(partnerName)) {
      return `${CLEAN_RECRUITERS_PATH}${fileName}`;
    }
  }

  return null;
}

/** Try to find a local logo for a company name (case-insensitive, partial match) */
function findLocalLogo(name: string): string | null {
  const key = name.toLowerCase().trim();
  if (recruiterLogoMap[key]) return recruiterLogoMap[key];
  // Partial match: check if any map key is contained in (or contains) the name
  for (const [mapKey, path] of Object.entries(recruiterLogoMap)) {
    if (key.includes(mapKey) || mapKey.includes(key)) return path;
  }
  return null;
}

function extractFileName(pathValue: string): string | null {
  const cleanPath = pathValue.split('?')[0].split('#')[0];
  const segments = cleanPath.split('/').filter(Boolean);
  return segments.length ? segments[segments.length - 1] : null;
}

function normalizeRecruiterLogoCandidate(candidate: unknown): string | null {
  if (typeof candidate !== 'string') return null;

  const trimmed = candidate.trim();
  if (!trimmed) return trimmed;

  // Bare filename from API should point to recruiters folder on backend.
  if (!trimmed.includes('/')) {
    return `${RECRUITERS_BACKEND_PATH}${trimmed}`;
  }

  // If path is absolute (e.g. from placementsService), leave as is.
  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  // Upload-style values should map to the canonical recruiters folder.
  const lower = trimmed.toLowerCase();
  if (lower.startsWith('/uploads/') || lower.startsWith('uploads/') || lower.includes('/uploads/')) {
    const fileName = extractFileName(trimmed);
    if (fileName) return `${RECRUITERS_BACKEND_PATH}${fileName}`;
  }

  return trimmed;
}

function resolveRecruiterLogo(raw: any): string | null {
  const name = raw?.company ?? raw?.name;
  const forcedPath = getForcedRecruiterLogoByName(name);
  if (forcedPath) return resolveUploadedAssetUrl(forcedPath);

  // Check manual mapping first
  const mapped = findLocalLogo(name);
  if (mapped) return resolveUploadedAssetUrl(mapped);

  const rawCandidate =
    raw?.logo ??
    raw?.logo_url ??
    raw?.logoUrl ??
    raw?.image ??
    raw?.image_url ??
    raw?.imageUrl ??
    null;

  const candidate = normalizeRecruiterLogoCandidate(rawCandidate);
  const backendLogo = resolveUploadedAssetUrl(candidate);
  
  if (backendLogo) {
    if (typeof window !== "undefined" && window.location.protocol === "https:" && backendLogo.startsWith("http://")) {
      return `https://${backendLogo.slice("http://".length)}`;
    }
    return backendLogo;
  }

  return null;
}

function getBackendImageRetryCandidates(url: string): string[] {
  if (!url) return [];

  const add = (set: Set<string>, next: string | null | undefined) => {
    if (!next || next === url) return;
    set.add(next);
  };

  const candidates = new Set<string>();

  const recruitersPathRetry = (() => {
    try {
      const parsed = new URL(url);
      const fileName = extractFileName(parsed.pathname);
      if (!fileName) return null;
      return resolveUploadedAssetUrl(`${RECRUITERS_BACKEND_PATH}${fileName}`) || `${RECRUITERS_BACKEND_PATH}${fileName}`;
    } catch {
      const fileName = extractFileName(url);
      if (!fileName) return null;
      return resolveUploadedAssetUrl(`${RECRUITERS_BACKEND_PATH}${fileName}`) || `${RECRUITERS_BACKEND_PATH}${fileName}`;
    }
  })();
  add(candidates, recruitersPathRetry);

  // Common backend path mismatches in hosted deployments.
  if (url.includes('/uploads/images/')) {
    add(candidates, url.replace('/uploads/images/', '/images/'));
    add(candidates, url.replace('/uploads/images/', '/Images/'));
    add(candidates, url.replace('/uploads/images/', '/uploads/'));
  }

  if (url.includes('/images/')) {
    add(candidates, url.replace('/images/', '/uploads/images/'));
    add(candidates, url.replace('/images/', '/Images/'));
    add(candidates, url.replace('/images/', '/uploads/'));
  }

  if (url.includes('/Images/')) {
    add(candidates, url.replace('/Images/', '/uploads/images/'));
    add(candidates, url.replace('/Images/', '/images/'));
    add(candidates, url.replace('/Images/', '/uploads/'));
  }

  // If backend returned /uploads/<file>, also try image-folder conventions.
  if (url.includes('/uploads/') && !url.includes('/uploads/images/')) {
    add(candidates, url.replace('/uploads/', '/uploads/images/'));
    add(candidates, url.replace('/uploads/', '/images/'));
    add(candidates, url.replace('/uploads/', '/Images/'));
  }

  return Array.from(candidates);
}

function handleLogoLoadError(
  event: React.SyntheticEvent<HTMLImageElement>,
): void {
  const img = event.currentTarget;
  const originalSrc = img.dataset.originalSrc || img.src;
  if (!img.dataset.originalSrc) {
    img.dataset.originalSrc = originalSrc;
  }

  // Retry backend-only path variants before giving up.
  const retries = getBackendImageRetryCandidates(originalSrc);
  const retryIndex = Number(img.dataset.retryIndex || '0');

  if (retryIndex < retries.length) {
    img.dataset.retryIndex = String(retryIndex + 1);
    img.dataset.altTried = '1';
    img.src = retries[retryIndex];
    return;
  }

  // Keep a visible placeholder state (no local logo fallback).
  img.dataset.fallbackApplied = '1';
  img.style.opacity = '0.2';
}

// Default hardcoded recruiters (used when API returns no data)
const defaultRecruiters: Recruiter[] = [];

function splitIntoRows(items: Recruiter[]): [Recruiter[], Recruiter[]] {
  const half = Math.ceil(items.length / 2);
  return [items.slice(0, half), items.slice(half)];
}

const [defaultRowOne, defaultRowTwo] = splitIntoRows(defaultRecruiters);


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
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({ items, direction = "left", speed = 40 }) => {
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

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Reset init when source rows change so direction starts from expected origin.
    initRef.current = false;

    const wrap = () => {
      const el2 = scrollRef.current;
      if (!el2) return;
      const w = el2.scrollWidth / 3;
      if (!w || !Number.isFinite(w)) return;
      if (posRef.current >= w * 2) posRef.current -= w;
      if (posRef.current < 0) posRef.current += w;
    };

    const tick = () => {
      if (!pausedRef.current && !draggingRef.current) {
        const currentEl = scrollRef.current;
        const oneSetWidth = currentEl ? currentEl.scrollWidth / 3 : 0;

        // Wait until content width is measured (images may load after first paint).
        if (!oneSetWidth || !Number.isFinite(oneSetWidth)) {
          animRef.current = requestAnimationFrame(tick);
          return;
        }

        if (!initRef.current) {
          if (direction === "right") {
            posRef.current = oneSetWidth;
          }
          initRef.current = true;
        }

        const pxPerFrame = oneSetWidth / (speed * 60);
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
  }, [direction, speed, items]);

  // -- Drag / touch handlers --
  const scheduleResume = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, 2000); // auto-scroll resumes 2s after user stops dragging
  };

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    pausedRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    dragStartXRef.current = e.clientX;
    dragStartPosRef.current = posRef.current;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const delta = dragStartXRef.current - e.clientX;
    const el = scrollRef.current;
    if (!el) return;
    const oneSetWidth = el.scrollWidth / 3;
    let next = dragStartPosRef.current + delta;
    if (next >= oneSetWidth * 2) next -= oneSetWidth;
    if (next < 0) next += oneSetWidth;
    posRef.current = next;
    el.style.transform = `translateX(${-posRef.current}px)`;
  };

  const onPointerUp = () => {
    draggingRef.current = false;
    scheduleResume();
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
          >
            <div className="group flex flex-col items-center justify-center gap-3 w-[140px] sm:w-[160px] md:w-[180px] p-5 sm:p-6 border-2 border-gray-100 bg-white rounded-xl shadow-sm hover:border-brand-gold/60 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-full flex items-center justify-center h-[60px] sm:h-[70px]">
                <img
                  src={company.logo}
                  alt={company.name}
                  onError={(event) => handleLogoLoadError(event)}
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
  const homepage = useHomepageData();
  const useAggregate = Boolean(homepage);
  const [rowOneData, setRowOneData] = useState<Recruiter[]>(defaultRowOne);
  const [rowTwoData, setRowTwoData] = useState<Recruiter[]>(defaultRowTwo);

  useEffect(() => {
    const applyRows = (items: Recruiter[]) => {
      if (!items.length) return false;
      const [r1, r2] = splitIntoRows(items);
      setRowOneData(r1);
      setRowTwoData(r2);
      return true;
    };

    if (useAggregate) {
      const recruitersData: Recruiter[] = (homepage?.data?.placements || [])
        .map((p: any) => {
          const name = p.company || p.name || '';
          const logo = resolveRecruiterLogo(p);
          if (!name || !logo) return null;

          return {
            name,
            logo,
            url: p.website || p.url || '#',
          };
        })
        .filter(Boolean) as Recruiter[];

      if (applyRows(recruitersData)) return;
    }

    placementsService.list().then((partners) => {
      if (partners && partners.length > 0) {
        // Prefer backend-provided logos and only then fall back to local mapped logos.
        const recruitersData: Recruiter[] = partners
          .map((p: any) => {
            const name = p.company || p.name || '';
            const logo = resolveRecruiterLogo(p);
            if (!logo) return null; // Skip companies with no usable logo
            return {
              name,
              logo,
              url: p.website || '#',
            };
          })
          .filter(Boolean) as Recruiter[];

        applyRows(recruitersData);
      }
    });
  }, [homepage, useAggregate]);

  return (
  <>
  <section id="recruiters" className="py-14 sm:py-18 md:py-24 relative overflow-hidden">

    {/* Background image */}
    <img
      src={resolveUploadedAssetUrl("/images/Main Page/PLACEMENT/Placement_Background.jpg") ?? "/images/Main Page/PLACEMENT/Placement_Background.jpg"}
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
            <MarqueeRow items={rowOneData} direction="left" speed={45} />
            <MarqueeRow items={rowTwoData} direction="right" speed={40} />
          </div>
        </div>

      </div>
    </div>
  </section>
  </>
  );
};

export default Recruiters;
