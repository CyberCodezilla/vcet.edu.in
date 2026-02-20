import React from 'react';
import Button from './Button';
import { ChevronRight, Calendar, ArrowDown } from 'lucide-react';

const notices = [
  { id: 1, text: "Admission 2025-26: Applications open for First Year Engineering.", date: "New" },
  { id: 2, text: "Semester IV Exam Time Table released. Check student portal.", date: "Aug 12" },
  { id: 3, text: "National Level Hackathon 'Hack-n-Code' registration closes soon.", date: "Aug 10" },
  { id: 4, text: "Guest Lecture on 'AI in Healthcare' by Industry Experts.", date: "Aug 05" },
];

const events = [
  { id: 1, day: "09th Feb", year: "2026", title: "2026 IEEE International Conference on Communication, Computing and Emerging Technologies (IC3ET)" },
  { id: 2, day: "16th Jan", year: "2026", title: "ZEAL 2026 — Annual Cultural Festival & Sports Meet" },
];

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen w-full flex items-center overflow-hidden bg-brand-dark text-white -mt-[4.5rem] pt-[4.5rem]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/Images/Home%20background/VCET-Home-1-scaled.jpg" 
          alt="VCET Campus" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/75 to-brand-navy/50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 py-20 md:py-28">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-12 xl:gap-16">
          
          {/* Left: Main Content */}
          <div className="w-full xl:w-5/12 relative z-20">
            {/* Badge – delay 0 */}
            <div className="hero-anim" style={{animationDelay: '0.1s'}}>
              <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
                <span className="w-2 h-2 bg-brand-gold rounded-full animate-pulse"></span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/80">Est. 1994 &bull; NAAC A+ Accredited</span>
              </div>
            </div>
            
            {/* Headline – delay 0.2 */}
            <div className="hero-anim" style={{animationDelay: '0.2s'}}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-display font-bold tracking-tight leading-[1.05] mb-8">
                Vidyavardhini's<br/>
                <span className="text-brand-gold">College of</span><br/>
                Engineering
              </h1>
            </div>
            
            {/* Tagline – delay 0.35 */}
            <div className="hero-anim" style={{animationDelay: '0.35s'}}>
              <p className="text-base md:text-lg font-light text-white/70 max-w-xl mb-10 leading-relaxed">
                Empowering students with quality technical education and professional ethics to meet global challenges since three decades.
              </p>
            </div>
            
            {/* CTA Buttons – delay 0.5 */}
            <div className="hero-anim" style={{animationDelay: '0.5s'}}>
              <div className="flex flex-wrap gap-3">
                <Button variant="gold" icon>Apply Now</Button>
                <Button variant="outline" className="text-white border-white/30 hover:bg-white hover:text-brand-blue hover:border-white">
                  Explore Departments
                </Button>
              </div>
            </div>

            {/* Quick Stats – delay 0.65 */}
            <div className="hero-anim" style={{animationDelay: '0.65s'}}>
              <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10">
                {[
                  { value: '30+', label: 'Years' },
                  { value: '5000+', label: 'Students' },
                  { value: '96%', label: 'Placements' },
                  { value: 'A+', label: 'NAAC' },
                ].map((stat, idx) => (
                  <div key={idx} className="text-center group cursor-default">
                    <div className="text-2xl md:text-3xl font-bold text-brand-gold group-hover:scale-110 transition-transform duration-300 inline-block">{stat.value}</div>
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-white/40 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Notices & Events Cards – delay 0.4 */}
          <div className="hero-anim w-full xl:w-7/12 relative z-30 flex flex-col md:flex-row gap-5 justify-end items-stretch" style={{animationDelay: '0.4s'}}>
             
             {/* Notices Card */}
             <div className="w-full md:w-1/2 max-w-sm bg-white/[0.04] backdrop-blur-md border border-white/[0.08] p-6 flex flex-col rounded-xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-7 w-0.5 bg-brand-gold rounded-full"></div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">Latest Notices</h3>
                </div>
                
                <div className="flex-grow">
                  <div className="divide-y divide-white/[0.06] max-h-[280px] overflow-y-auto pr-2 no-scrollbar">
                    {notices.map((notice) => (
                      <div key={notice.id} className="py-3 first:pt-0 hover:bg-white/[0.03] rounded-lg px-2 -mx-2 transition-colors cursor-pointer group">
                        <p className="text-sm font-medium text-white/80 leading-snug group-hover:text-brand-gold transition-colors mb-2">
                          {notice.text}
                        </p>
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                          notice.date === 'New' 
                            ? 'bg-red-500/20 text-red-400' 
                            : 'bg-white/10 text-white/50'
                        }`}>
                          {notice.date}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-white/[0.06]">
                  <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-brand-gold transition-colors flex items-center gap-2 group">
                    View All Notices 
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
             </div>

             {/* Events Card */}
             <div className="w-full md:w-1/2 max-w-sm bg-white/[0.04] backdrop-blur-md border border-white/[0.08] p-6 flex flex-col rounded-xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-7 w-0.5 bg-brand-gold rounded-full"></div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">Upcoming Events</h3>
                </div>

                <div className="space-y-5 flex-grow">
                  {events.map((event) => (
                    <div key={event.id} className="group cursor-pointer">
                      <div className="flex items-stretch mb-2.5 rounded-lg overflow-hidden shadow-lg transform group-hover:-translate-y-0.5 transition-transform duration-300">
                        <div className="bg-brand-navy text-white font-bold px-3 py-2 text-xs flex items-center justify-center min-w-[80px] text-center leading-tight">
                          {event.day}
                        </div>
                        <div className="bg-brand-gold text-brand-dark font-extrabold px-3 py-2 text-sm flex items-center justify-center min-w-[65px]">
                          {event.year}
                        </div>
                      </div>
                      <p className="text-sm text-white/70 font-medium leading-relaxed group-hover:text-brand-gold transition-colors border-l-2 border-white/10 pl-3">
                        {event.title}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-5 pt-4 border-t border-white/[0.06]">
                  <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-brand-gold transition-colors flex items-center gap-2 group">
                    Full Calendar 
                    <Calendar className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
             </div>

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/30">Scroll</span>
        <ArrowDown className="w-4 h-4 text-white/30 animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;
