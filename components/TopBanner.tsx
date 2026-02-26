import React from 'react';
import { Phone, Mail, Bell, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

const tickerItems = [
  '🎓 Admissions Open 2025–26 — Apply Now for B.E. & M.E. Programs',
  '📋 Semester Exam Timetable Released — Check Student Portal',
  '🏆 VCET Students Win National Hackathon 2025 — Congratulations!',
  '📢 Guest Lecture on AI & Machine Learning — Register at Front Office',
  '🌐 NBA Accreditation Renewed for All Eligible Programs',
];

const TopBanner: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-100 relative overflow-hidden print:hidden">
      {/* Decorative top accent line */}
      <div className="h-1 bg-gradient-to-r from-brand-blue via-brand-gold to-brand-blue"></div>

      {/* ── Mobile compact row — hidden on mobile (Header already shows logo) ── */}
      <div className="hidden items-center gap-3 px-4 py-3">
        <img
          src="/Images/VCET%20logo.jpeg"
          alt="VCET Logo"
          className="w-10 h-10 object-contain rounded-sm flex-shrink-0"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-extrabold uppercase tracking-tight text-brand-blue leading-tight truncate">
            Vidyavardhini's College of Engg &amp; Tech
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5">Vasai Road &bull; Estd. 1994</p>
        </div>
        <span className="flex-shrink-0 inline-flex items-center gap-1 bg-brand-gold/15 border border-brand-gold/30 text-brand-navy px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
          NAAC
        </span>
      </div>

      {/* ── Desktop full row (md+) ── */}
      <div className="hidden md:block">
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
                  target.style.display = 'none';
                }}
              />
            </div>

          {/* College Name & Info */}
          <div className="text-left">
            <h1 className="text-lg md:text-2xl lg:text-[1.65rem] font-extrabold uppercase tracking-tight text-brand-blue leading-tight">
              Vidyavardhini's College of Engineering & Technology
            </h1>
            <h2 className="text-base md:text-lg font-semibold text-brand-navy/60 mt-1 tracking-wide">
              विद्यावर्धिनीचे अभियांत्रिकी आणि तंत्रज्ञान महाविद्यालय, वसई रोड
            </h2>
            <p className="text-[11px] md:text-xs font-medium text-slate-500 mt-2 tracking-wide">
              Approved by AICTE, DTE Maharashtra &bull; an Autonomous Institute Affiliated to University of Mumbai
            </p>

          </div>

          </div>{/* closes logo+text unit */}

          {/* ── Empty space reserved for logos ── */}
          <div className="flex-1" />

          {/* Quick Contact + Social - Desktop only */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="flex flex-col gap-1.5 text-right">
              <a href="tel:+917972019446" className="flex items-center gap-2 text-xs text-slate-500 hover:text-brand-blue transition-colors">
                <Phone className="w-3.5 h-3.5" />
                +91 797 201 9446
              </a>
              <a href="mailto:vcet_inbox@vcet.edu.in" className="flex items-center gap-2 text-xs text-slate-500 hover:text-brand-blue transition-colors">
                <Mail className="w-3.5 h-3.5" />
                vcet_inbox@vcet.edu.in
              </a>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            <div className="flex items-center gap-1.5">
              {[
                { icon: Facebook, href: 'https://www.facebook.com/vcet.vasai.50/', label: 'Facebook' },
                { icon: Instagram, href: 'https://www.instagram.com/official.vcet/', label: 'Instagram' },
                { icon: Linkedin, href: 'https://www.linkedin.com/school/vcetvasai/', label: 'LinkedIn' },
                { icon: Youtube, href: 'https://www.youtube.com/channel/UCjBw5a7WU00GwkxaTjF9jqg', label: 'YouTube' },
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
      </div>{/* closes hidden md:block */}

      {/* Marquee Ticker */}
      <div className="border-t border-brand-blue/10 bg-brand-blue/[0.03]">
        <div className="flex items-center h-8 overflow-hidden">
          {/* Label */}
          <div className="flex-shrink-0 flex items-center gap-1.5 px-3 bg-brand-gold h-full">
            <Bell className="w-3 h-3 text-white" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white whitespace-nowrap">Latest News</span>
          </div>
          {/* Ticker track */}
          <div className="ticker-wrap flex-1 overflow-hidden h-full flex items-center">
            <div className="ticker-track flex items-center gap-0">
              {[...tickerItems, ...tickerItems].map((item, i) => (
                <span key={i} className="whitespace-nowrap text-[11px] text-brand-navy/70 font-medium px-8">
                  {item}
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
