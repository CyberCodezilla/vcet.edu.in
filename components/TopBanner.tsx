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

      {/* ── Unified Responsive Row ── */}
      <div className="block pb-2 lg:pb-0">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-3 md:py-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-4">
            {/* Logo + College Name */}
            <div className="flex flex-col lg:flex-row items-center text-center lg:text-left gap-3 lg:gap-5 flex-shrink-0 max-w-full">
              <div className="flex-shrink-0">
                <img
                  src="/Images/VCET logo.jpeg"
                  alt="VCET Logo"
                  className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain drop-shadow-sm"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </div>

              {/* College Name & Info */}
              <div className="flex-1 min-w-0">
                <h1 className="text-sm sm:text-lg md:text-2xl lg:text-[1.65rem] font-extrabold uppercase tracking-tight text-brand-blue leading-tight">
                  Vidyavardhini's College of Engineering & Technology
                </h1>
                <h2 className="text-[10px] sm:text-xs md:text-base font-semibold text-brand-navy/60 mt-1 sm:mt-1.5 tracking-wide">
                  विद्यावर्धिनीचे अभियांत्रिकी आणि तंत्रज्ञान महाविद्यालय, वसई रोड
                </h2>
                <p className="text-[9px] sm:text-[10px] md:text-xs font-medium text-slate-500 mt-1.5 tracking-wide">
                  Approved by AICTE, DTE Maharashtra &bull; An Autonomous Institute Affiliated to University of Mumbai
                </p>
              </div>
            </div>
            {/* closes logo+text unit */}

            {/* NAAC & NBA Logos */}
            <div className="flex items-center justify-center gap-3 sm:gap-6 flex-shrink-0 w-full lg:w-auto mt-2 lg:mt-0">
              <img
                src="/Images/LOGO/NAAC_LOGO.png"
                alt="NAAC Accredited"
                className="h-10 sm:h-14 lg:h-20 w-auto object-contain drop-shadow-sm"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <img
                src="/Images/LOGO/NBA logo.webp"
                alt="NBA Accredited"
                className="h-10 sm:h-14 lg:h-20 w-auto object-contain drop-shadow-sm"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>

            <div className="flex-1 hidden lg:block" />

            {/* Quick Contact + Social */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 flex-shrink-0 w-full lg:w-auto mt-2 lg:mt-0">
              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-center gap-2 sm:gap-1.5 text-center sm:text-right flex-wrap">
                <a
                  href="tel:+917972019446"
                  className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-slate-500 hover:text-brand-blue transition-colors"
                >
                  <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  +91 797 201 9446
                </a>
                <a
                  href="mailto:vcet_inbox@vcet.edu.in"
                  className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-slate-500 hover:text-brand-blue transition-colors"
                >
                  <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  vcet_inbox@vcet.edu.in
                </a>
              </div>
              <div className="w-px h-8 bg-gray-200 hidden sm:block" />
              <div className="w-full h-px bg-gray-100 sm:hidden max-w-[200px] mt-1 mb-1" />
              <div className="flex items-center justify-center gap-1.5 mt-1 sm:mt-0">
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
      {/* ── End Unified Row ── */}

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
