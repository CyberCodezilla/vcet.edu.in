import React from "react";
import {
  Phone,
  Mail,
  Bell,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ExternalLink,
} from "lucide-react";
import { useNewsTicker } from "../hooks/useNewsTicker";

const TopBanner: React.FC = () => {
  const { items: tickerItems, loading } = useNewsTicker();

  return (
    <div className="bg-white border-b border-gray-100 relative overflow-hidden print:hidden">
      {/* Decorative top accent line */}
      <div className="h-1 bg-gradient-to-r from-brand-blue via-brand-gold to-brand-blue"></div>

      {/* ── Compact row — visible up to tablet ── */}
      <div className="lg:hidden px-3 sm:px-4 py-3.5">
        <div className="flex items-start gap-3">
          <img
            src="/Images/VCET%20logo.jpeg"
            alt="VCET Logo"
            className="w-11 h-11 object-contain rounded-sm flex-shrink-0"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-extrabold uppercase tracking-tight text-brand-blue leading-tight">
              Vidyavardhini&apos;s College of Engineering &amp; Technology
            </p>
            <p className="text-[10px] text-slate-500 mt-1 leading-snug">
              Vasai Road • Autonomous Institute, University of Mumbai
            </p>
          </div>
        </div>
        <div className="mt-2.5 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 bg-brand-gold/15 border border-brand-gold/30 text-brand-navy px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
            NAAC Accredited
          </span>
          <img
            src="/Images/LOGO/NBA%20logo.webp"
            alt="NBA Accredited"
            className="h-8 w-auto object-contain flex-shrink-0"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      </div>

      {/* ── Desktop full row (lg+) ── */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex flex-row items-center gap-4">
            {/* Logo + College Name */}
            <div className="flex flex-row items-center gap-5 flex-shrink-0">
              <div className="flex-shrink-0">
                <img
                  src="/Images/VCET%20logo.jpeg"
                  alt="VCET Logo"
                  className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-sm"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </div>

              {/* College Name & Info */}
              <div className="text-left">
                <h1 className="text-lg md:text-2xl lg:text-[1.65rem] font-extrabold uppercase tracking-tight text-brand-blue leading-tight">
                  Vidyavardhini's College of Engineering & Technology
                </h1>
                <h2 className="text-base md:text-lg font-semibold text-brand-navy/60 mt-1 tracking-wide">
                  विद्यावर्धिनीचे अभियांत्रिकी आणि तंत्रज्ञान महाविद्यालय, वसई
                  रोड
                </h2>
                <p className="text-[11px] md:text-xs font-medium text-slate-500 mt-2 tracking-wide">
                  Approved by AICTE, DTE Maharashtra &bull; An Autonomous
                  Institute Affiliated to University of Mumbai
                </p>
              </div>
            </div>
            {/* closes logo+text unit */}

            {/* NAAC & NBA Logos */}
            <div className="flex items-center gap-4 flex-shrink-0 mx-auto">
              <img
                src="/Images/LOGO/NAAC_LOGO.png"
                alt="NAAC B++ Accredited"
                className="h-16 md:h-20 w-auto object-contain drop-shadow-sm"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <img
                src="/Images/LOGO/NBA%20logo.webp"
                alt="NBA Accredited"
                className="h-16 md:h-20 w-auto object-contain drop-shadow-sm"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>

            <div className="flex-1" />

            {/* Quick Contact + Social - Desktop only */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="flex flex-col gap-1.5 text-right">
                <a
                  href="tel:+917972019446"
                  className="flex items-center gap-2 text-xs text-slate-500 hover:text-brand-blue transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  +91 797 201 9446
                </a>
                <a
                  href="mailto:vcet_inbox@vcet.edu.in"
                  className="flex items-center gap-2 text-xs text-slate-500 hover:text-brand-blue transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  vcet_inbox@vcet.edu.in
                </a>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="flex items-center gap-1.5">
                {[
                  {
                    icon: Facebook,
                    href: "https://www.facebook.com/vcet.vasai.50/",
                    label: "Facebook",
                  },
                  {
                    icon: Instagram,
                    href: "https://www.instagram.com/official.vcet/",
                    label: "Instagram",
                  },
                  {
                    icon: Linkedin,
                    href: "https://www.linkedin.com/school/vcetvasai/",
                    label: "LinkedIn",
                  },
                  {
                    icon: Youtube,
                    href: "https://www.youtube.com/channel/UCjBw5a7WU00GwkxaTjF9jqg",
                    label: "YouTube",
                  },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:bg-brand-blue hover:text-white transition-all duration-200"
                  >
                    <social.icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* closes hidden md:block */}

      {/* Marquee Ticker */}
      <div className="border-t border-brand-blue/10 bg-brand-blue/[0.03]">
        <div className="flex items-center h-9 sm:h-8 overflow-hidden">
          {/* Label */}
          <div className="flex-shrink-0 flex items-center gap-1.5 px-2.5 sm:px-3 bg-brand-gold h-full">
            <Bell className="w-3 h-3 text-brand-blue" />
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-blue whitespace-nowrap">
              Latest News
            </span>
          </div>
          {/* Ticker track */}
          <div className="ticker-wrap flex-1 overflow-hidden h-full flex items-center">
            <div className="ticker-track flex items-center gap-0">
              {[...tickerItems, ...tickerItems].map((item, i) => (
                <span
                  key={i}
                  className="whitespace-nowrap flex items-center gap-2 text-[10px] sm:text-[11px] text-brand-navy/70 font-medium px-5 sm:px-8"
                >
                  <span>{item.text}</span>
                  {item.link && (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-brand-blue hover:text-brand-gold transition-colors">
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
