import React from 'react';
import { Phone, Mail, Bell } from 'lucide-react';

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
      
      <div className="container mx-auto px-4 md:px-6 py-5 md:py-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-8">
          
          {/* Logo */}
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
          <div className="text-center flex-grow">
            <h1 className="text-lg md:text-2xl lg:text-[1.65rem] font-extrabold uppercase tracking-tight text-brand-blue leading-tight">
              Vidyavardhini's College of Engineering & Technology
            </h1>
            <h2 className="text-base md:text-lg font-semibold text-brand-navy/60 mt-1 tracking-wide">
              विद्यावर्धिनीचे अभियांत्रिकी आणि तंत्रज्ञान महाविद्यालय, वसई रोड
            </h2>
            <p className="text-[11px] md:text-xs font-medium text-slate-500 mt-2 tracking-wide">
              Approved by AICTE, DTE Maharashtra &bull; Affiliated to University of Mumbai
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
              <span className="inline-flex items-center gap-1.5 bg-brand-blue/5 border border-brand-blue/10 text-brand-blue px-3 py-1 rounded text-[11px] font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 bg-brand-gold rounded-full"></span>
                NAAC A+ Accredited
              </span>
              <span className="inline-flex items-center gap-1.5 bg-brand-gold/10 border border-brand-gold/20 text-brand-navy px-3 py-1 rounded text-[11px] font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 bg-brand-blue rounded-full"></span>
                NBA Accredited
              </span>
            </div>
          </div>

          {/* Quick Contact - Desktop only */}
          <div className="hidden lg:flex flex-col gap-1.5 text-right flex-shrink-0">
            <a href="tel:+917972019446" className="flex items-center gap-2 text-xs text-slate-500 hover:text-brand-blue transition-colors">
              <Phone className="w-3.5 h-3.5" />
              +91 797 201 9446
            </a>
            <a href="mailto:vcet_inbox@vcet.edu.in" className="flex items-center gap-2 text-xs text-slate-500 hover:text-brand-blue transition-colors">
              <Mail className="w-3.5 h-3.5" />
              vcet_inbox@vcet.edu.in
            </a>
          </div>
        </div>
      </div>

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
