import React, { useState, useEffect } from "react";
import {
  ArrowDown,
  Send,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Bell,
  X,
  Image,
} from "lucide-react";
import { post } from "../services/api";

const notices = [
  {
    text: "Admission 2024-25: Applications open for First Year Engineering.",
    tag: "NEW",
    date: null,
  },
  {
    text: "Semester IV Exam Time Table released. Check student portal.",
    tag: null,
    date: "Aug 12",
  },
  {
    text: "National Level Hackathon 'Hack-n-Code' registration closes soon.",
    tag: null,
    date: "Aug 10",
  },
  {
    text: "Guest Lecture on 'AI in Healthcare' by industry experts.",
    tag: null,
    date: "Aug 8",
  },
];

const events = [
  {
    day: "09th Feb",
    year: "2026",
    title:
      "2026 IEEE International Conference on Communication, Computing and Emerging Technologies (IC3ET)",
  },
  {
    day: "16th Jan",
    year: "2026",
    title: "ZEAL 2026 - Annual Cultural Festival & Sports Meet",
  },
];

const departments = [
  "Computer Engineering",
  "Information Technology",
  "Electronics & Telecom",
  "Mechanical Engineering",
  "Civil Engineering",
  "AI & Data Science",
  "Computer Science & DS",
];

const courses = ["B.E.", "M.E.", "MBA", "MCA"];
const specializations = [
  "General",
  "Cyber Security",
  "Data Science",
  "VLSI",
  "Structural",
];

const AdmissionForm: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    department: "",
    course: "",
    specialization: "",
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setForm((f) => ({
      ...f,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await post("/enquiries", form);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err: unknown) {
      const apiError = err as { status?: number };
      if (apiError?.status === 422) {
        setErrorMessage("Please check your details and try again.");
      } else {
        setErrorMessage("Something went wrong. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputCls =
    "w-full bg-white/[0.06] border border-white/20 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/45 focus:outline-none focus:border-brand-gold/70 focus:bg-white/[0.10] transition-all duration-200";
  const selectCls = `${inputCls} appearance-none cursor-pointer`;
  const labelCls =
    "block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1";

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div
        className="flex items-stretch flex-shrink-0 mb-4"
        style={{ background: "#0f1e38" }}
      >
        {/* Gold left accent bar */}
        <div className="w-1 flex-shrink-0 bg-brand-gold" />
        <div className="flex flex-col justify-center px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-0.5">
            Now Accepting Applications
          </p>
          <h2 className="text-lg font-extrabold uppercase tracking-widest text-white leading-tight">
            Admissions Open <span className="text-brand-gold">2026–27</span>
          </h2>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto no-scrollbar pr-0.5">
        {submitted ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-2">
            <div className="w-14 h-14 rounded-full bg-brand-gold/20 border-2 border-brand-gold flex items-center justify-center">
              <Send className="w-6 h-6 text-brand-gold" />
            </div>
            <p className="text-sm font-bold text-white">Thank you!</p>
            <p className="text-xs text-white/50">
              Our admissions team will reach out to you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            {/* Name */}
            <div>
              <label className={labelCls}>Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handle}
                required
                placeholder="Enter your full name"
                className={inputCls}
              />
            </div>

            {/* Email */}
            <div>
              <label className={labelCls}>Email Address</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handle}
                required
                placeholder="you@example.com"
                className={inputCls}
              />
            </div>

            {/* Phone */}
            <div>
              <label className={labelCls}>Mobile Number</label>
              <div className="flex gap-2">
                <span className="flex items-center px-2.5 bg-white/[0.06] border border-white/20 rounded-lg text-sm text-white/60 font-semibold flex-shrink-0">
                  +91
                </span>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handle}
                  required
                  placeholder="10-digit number"
                  maxLength={10}
                  className={`${inputCls} flex-1`}
                />
              </div>
            </div>

            {/* State + City */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={labelCls}>State</label>
                <input
                  name="state"
                  value={form.state}
                  onChange={handle}
                  placeholder="State"
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>City</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handle}
                  placeholder="City"
                  className={inputCls}
                />
              </div>
            </div>

            {/* Department */}
            <div>
              <label className={labelCls}>Department</label>
              <div className="relative">
                <select
                  name="department"
                  value={form.department}
                  onChange={handle}
                  required
                  className={selectCls}
                >
                  <option value="" disabled className="bg-brand-dark">
                    Select Department
                  </option>
                  {departments.map((d) => (
                    <option key={d} value={d} className="bg-brand-dark">
                      {d}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-white/40 pointer-events-none" />
              </div>
            </div>

            {/* Course + Specialization */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={labelCls}>Course</label>
                <div className="relative">
                  <select
                    name="course"
                    value={form.course}
                    onChange={handle}
                    required
                    className={selectCls}
                  >
                    <option value="" disabled className="bg-brand-dark">
                      Select
                    </option>
                    {courses.map((c) => (
                      <option key={c} value={c} className="bg-brand-dark">
                        {c}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-white/40 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className={labelCls}>Specialization</label>
                <div className="relative">
                  <select
                    name="specialization"
                    value={form.specialization}
                    onChange={handle}
                    className={selectCls}
                  >
                    <option value="" disabled className="bg-brand-dark">
                      Select
                    </option>
                    {specializations.map((s) => (
                      <option key={s} value={s} className="bg-brand-dark">
                        {s}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-white/40 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Consent */}
            <label className="flex items-start gap-2 cursor-pointer group">
              <input
                type="checkbox"
                name="consent"
                checked={form.consent}
                onChange={handle}
                required
                className="mt-0.5 w-3.5 h-3.5 accent-brand-gold flex-shrink-0 cursor-pointer"
              />
              <span className="text-[10px] text-white/45 leading-relaxed group-hover:text-white/60 transition-colors">
                I agree to be contacted by VCET regarding admissions via call,
                SMS or email.
              </span>
            </label>

            {/* Error message */}
            {errorMessage && (
              <p className="text-xs text-red-400 text-center py-1">
                {errorMessage}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-brand-gold hover:bg-yellow-400 text-brand-dark font-extrabold text-sm uppercase tracking-widest py-3 rounded-xl shadow-lg hover:shadow-brand-gold/30 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-brand-dark/30 border-t-brand-dark rounded-full animate-spin" />
                  Submitting…
                </>
              ) : (
                <>
                  Submit Application
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const packageImages = [
  {
    src: "/Images/Packages/HIGEST%20Package%20banner.jpg",
    label: "Highest Package",
  },
  {
    src: "/Images/Packages/AICTE-Pamphlet_page-0001.jpg",
    label: "AICTE Pamphlet",
  },
];

const bannerSlides = [
  { src: "/Images/Banner/bruse-banner.png", alt: "Bruse Banner" },
  { src: "/Images/Banner/yearly-banner.png", alt: "Yearly Banner" },
];

const Hero: React.FC = () => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"notices" | "events">("notices");
  const [cardOpen, setCardOpen] = useState(true);
  const [packagesOpen, setPackagesOpen] = useState(false);
  const [packageIndex, setPackageIndex] = useState(0);
  const [pkgZoom, setPkgZoom] = useState(1);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((i) => (i + 1) % bannerSlides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);
  return (
    <section
      id="home"
      className="relative h-screen w-full flex items-center overflow-hidden bg-brand-dark text-white -mt-14 pt-14 md:-mt-16 md:pt-16"
    >
      {/* ── Static Background ──────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/Images/Home%20background/VCET-Home-1-scaled.jpg"
          alt="VCET Campus"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* ── Right Banner Slideshow Panel ───────────────────────────────── */}
      <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-10 w-[40%] max-w-[560px] shadow-2xl rounded-lg overflow-hidden">
        <div className="relative w-full">
          {/* Spacer image to set natural aspect ratio */}
          <img
            src={bannerSlides[0].src}
            alt=""
            className="w-full h-auto block opacity-0 pointer-events-none"
          />
          {bannerSlides.map((slide, i) => (
            <img
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              className="absolute inset-0 w-full h-full object-contain transition-opacity duration-1000"
              style={{ opacity: i === slideIndex ? 1 : 0 }}
            />
          ))}
        </div>
        {/* Dot indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {bannerSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIndex(i)}
              className={`rounded-full transition-all duration-300 ${i === slideIndex ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/50 hover:bg-white/80"}`}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 h-full w-full flex items-center justify-start px-6 md:px-12">
        {/* Outer wrapper — allows the toggle button to escape overflow-hidden */}
        <div
          className="relative transition-all duration-500 ease-in-out"
          style={{
            transform: cardOpen ? "translateX(0)" : "translateX(-120%)",
            opacity: cardOpen ? 1 : 0,
            pointerEvents: cardOpen ? "auto" : "none",
          }}
        >
          {/* Single floating card */}
          <div
            className="w-[calc(100vw-3rem)] sm:w-[380px] flex flex-col overflow-hidden border border-white/10 shadow-2xl"
            style={{
              background: "rgba(10, 20, 45, 0.72)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              height: "calc(100dvh - 100px)",
              maxHeight: "calc(100dvh - 100px)",
            }}
          >
            {/* Content — swaps between form and notices/events */}
            <div className="flex-1 min-h-0 overflow-hidden px-5 pt-5 pb-2 flex flex-col">
              {!panelOpen ? (
                <div className="h-full overflow-y-auto no-scrollbar">
                  <AdmissionForm />
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  {/* Tab switcher */}
                  <div className="mb-5 grid flex-shrink-0 grid-cols-2 gap-2">
                    <button
                      onClick={() => setActiveTab("notices")}
                      aria-pressed={activeTab === "notices"}
                      className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em] transition-all duration-200 ${
                        activeTab === "notices"
                          ? "border-brand-gold bg-brand-gold text-brand-dark shadow-md"
                          : "border-white/20 bg-white/8 text-white/75 hover:border-brand-gold/60 hover:bg-white/12 hover:text-white"
                      }`}
                    >
                      <Bell className="h-3.5 w-3.5" /> Notices
                    </button>
                    <button
                      onClick={() => setActiveTab("events")}
                      aria-pressed={activeTab === "events"}
                      className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em] transition-all duration-200 ${
                        activeTab === "events"
                          ? "border-brand-gold bg-brand-gold text-brand-dark shadow-md"
                          : "border-white/20 bg-white/8 text-white/75 hover:border-brand-gold/60 hover:bg-white/12 hover:text-white"
                      }`}
                    >
                      <Calendar className="h-3.5 w-3.5" /> Events
                    </button>
                  </div>

                  {/* Section heading with gold left border */}
                  <div className="flex items-center gap-3 flex-shrink-0 mb-4">
                    <div className="w-1 self-stretch bg-brand-gold rounded-full flex-shrink-0" />
                    <h3 className="text-xl font-extrabold uppercase tracking-widest text-white leading-tight">
                      {activeTab === "notices"
                        ? "Latest Notices"
                        : "Upcoming Events"}
                    </h3>
                  </div>

                  {/* Scrollable content */}
                  <div className="flex-1 overflow-y-auto gold-scrollbar pr-1">
                    {activeTab === "notices" ? (
                      <div>
                        {notices.map((n, i) => (
                          <div
                            key={i}
                            className="py-4 border-b border-white/10 last:border-0"
                          >
                            <p className="text-[15px] font-medium text-white leading-snug">
                              {n.text}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {n.tag && (
                                <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-red-600 text-white rounded">
                                  {n.tag}
                                </span>
                              )}
                              {n.date && (
                                <span className="px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-white/10 text-white/70 rounded border border-white/20">
                                  {n.date}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div>
                        {events.map((ev, i) => (
                          <div
                            key={i}
                            className="py-4 border-b border-white/10 last:border-0"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs font-bold text-white/80 bg-white/10 px-2.5 py-1 rounded border border-white/20">
                                {ev.day}
                              </span>
                              <span className="text-xs font-extrabold bg-brand-gold text-brand-dark px-2.5 py-1 rounded">
                                {ev.year}
                              </span>
                            </div>
                            <p className="text-[15px] font-medium text-white leading-snug">
                              {ev.title}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer link */}
                  <div className="flex-shrink-0 pt-3 border-t border-white/10 mt-2">
                    <button className="text-[11px] font-bold uppercase tracking-widest text-white/45 hover:text-white/80 flex items-center gap-1 transition-colors">
                      {activeTab === "notices"
                        ? "View All Notices"
                        : "Full Calendar"}
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Stats — always pinned at bottom */}
            <div className="flex-shrink-0 px-5 py-4 border-t border-white/10">
              <div className="grid grid-cols-4 gap-2">
                {[
                  { value: "30+", label: "Years" },
                  { value: "5000+", label: "Students" },
                  { value: "96%", label: "Placements" },
                  { value: "B++", label: "NAAC" },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="text-center py-2.5 px-1 rounded-xl border border-brand-gold/30 bg-white/5 cursor-default group transition-all duration-300 hover:bg-white/10 hover:border-brand-gold/50"
                  >
                    <div className="text-base sm:text-lg font-bold text-brand-gold group-hover:scale-110 transition-transform duration-300 inline-block leading-tight whitespace-nowrap">
                      {stat.value}
                    </div>
                    <div className="text-[9px] font-semibold uppercase tracking-wider text-white/60 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Arrow toggle — sibling to card, never clipped */}
          <button
            onClick={() => setPanelOpen((o) => !o)}
            className="absolute top-1/2 -translate-y-1/2 -right-[2.1rem] z-20 flex flex-col items-center justify-center gap-1 py-3 px-1.5 rounded-r-lg transition-all duration-300 hover:brightness-110 active:scale-95"
            style={{
              background: "linear-gradient(180deg, #C49535 0%, #a07820 100%)",
              boxShadow:
                "4px 0 16px rgba(196,149,53,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
              borderLeft: "1px solid rgba(255,255,255,0.15)",
            }}
            aria-label="Toggle notices panel"
          >
            {panelOpen ? (
              <ChevronLeft className="w-4 h-4 text-white" />
            ) : (
              <ChevronRight className="w-4 h-4 text-white" />
            )}
            <span
              className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-white/90"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              {panelOpen ? "Form" : "Notices"}
            </span>
          </button>
        </div>
      </div>

      {/* ENQUIRE NOW — vertical tab on left edge */}
      <button
        onClick={() => setCardOpen(o => !o)}
        className="hidden md:flex absolute left-0 top-[44%] -translate-y-1/2 z-20 flex-col items-center justify-center gap-1 py-4 px-2 shadow-2xl transition-all duration-200 hover:brightness-110 active:scale-95"
        style={{
          background: "rgba(11, 61, 145, 0.45)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderLeft: "none",
          boxShadow:
            "0 8px 32px rgba(11,61,145,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
          writingMode: "vertical-rl",
        }}
        aria-label="Enquire Now"
      >
        <span
          className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-white"
          style={{ transform: 'rotate(180deg)' }}
        >
          Enquire Now
        </span>
      </button>

      {/* PACKAGES — vertical tab below ENQUIRE NOW */}
      <button
        onClick={() => { setPackagesOpen(true); setPackageIndex(0); setPkgZoom(1); }}
        className="hidden md:flex absolute left-0 z-20 flex-col items-center justify-center gap-1 py-4 px-2 shadow-2xl transition-all duration-200 hover:brightness-110 active:scale-95"
        style={{
          background: 'rgba(196, 149, 53, 0.55)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderLeft: 'none',
          boxShadow: '0 8px 32px rgba(196,149,53,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
          writingMode: 'vertical-rl',
          top: 'calc(44% + 60px)',
        }}
        aria-label="Packages"
      >
        <span
          className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-white"
          style={{ transform: 'rotate(180deg)' }}
        >
          Packages
        </span>
      </button>

      {/* PACKAGES IMAGE VIEWER MODAL */}
      {packagesOpen && (
        <div
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setPackagesOpen(false)}
          onWheel={(e) => {
            // e.preventDefault();
            setPkgZoom((z) =>
              Math.min(1.35, Math.max(1, z + (e.deltaY < 0 ? 0.05 : -0.05))),
            );
          }}
        >
          <div
            className="relative flex flex-col items-center max-h-[96vh] max-w-[95vw] w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image with close button pinned to its top-right corner */}
            <div className="relative inline-flex justify-center">
              <img
                src={packageImages[packageIndex].src}
                alt={packageImages[packageIndex].label}
                className="block rounded-lg shadow-2xl"
                style={{
                  maxHeight: "88vh",
                  maxWidth: "95vw",
                  objectFit: "contain",
                  transform: `scale(${pkgZoom})`,
                  transition: "transform 0.2s ease",
                }}
              />
              <button
                onClick={() => setPackagesOpen(false)}
                className="absolute top-2 right-2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/70 border border-white/20 shadow-xl hover:bg-black/90 transition-all duration-200"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Navigation dots + arrows */}
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={() =>
                  setPackageIndex(
                    (i) =>
                      (i - 1 + packageImages.length) % packageImages.length,
                  )
                }
                className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              {packageImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPackageIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                    i === packageIndex
                      ? "bg-brand-gold scale-125"
                      : "bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
              <button
                onClick={() =>
                  setPackageIndex((i) => (i + 1) % packageImages.length)
                }
                className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
            <p className="text-white/50 text-[11px] uppercase tracking-widest mt-2">
              {packageImages[packageIndex].label} — {packageIndex + 1} /{" "}
              {packageImages.length}
            </p>
          </div>
        </div>
      )}

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
          Scroll
        </span>
        <ArrowDown className="w-4 h-4 text-white/30 animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;
