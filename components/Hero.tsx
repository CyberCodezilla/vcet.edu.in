import React from 'react';
import Button from './Button';
import { ChevronRight, Calendar } from 'lucide-react';

const notices = [
  { id: 1, text: "Admission 2024-25: Applications open for First Year Engineering.", date: "New" },
  { id: 2, text: "Semester IV Exam Time Table released. Check student portal.", date: "Aug 12" },
  { id: 3, text: "National Level Hackathon 'Hack-n-Code' registration closes soon.", date: "Aug 10" },
  { id: 4, text: "Guest Lecture on 'AI in Healthcare' by Industry Experts.", date: "Aug 05" },
];

const events = [
  { id: 1, day: "09th Feb", year: "2026", title: "2026 IEEE International Conference on Communication, Computing and Emerging Technologies (IC3ET)" },
  { id: 2, day: "16th Jan", year: "2026", title: "ZEAL 2026 - Annual Cultural Festival & Sports Meet" },
];

const Hero: React.FC = () => {
  return (
    // Added -mt-20 to pull the hero section up behind the sticky header
    <section id="home" className="relative min-h-screen w-full flex items-center overflow-hidden bg-brand-dark text-white pt-32 pb-20 md:pt-40 md:pb-20 -mt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/Images/Home%20background/VCET-Home-1-scaled.jpg" 
          alt="VCET Campus" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/80 to-brand-blue/30"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-12">
          
          {/* Left Column: Hero Text - Reduced width to accommodate side-by-side widgets */}
          <div className="w-full xl:w-5/12 relative z-20">
            <div className="inline-block mb-6 px-3 py-1 border border-white/30 backdrop-blur-md rounded-full">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">Est. 1994 • NAAC Accredited A+</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-8 break-words">
              Vidyavardhini's <br/>
              <span className="text-transparent stroke-white bg-clip-text bg-cover" style={{WebkitTextStroke: '1px white'}}>College Of</span><br/>
              Engineering
            </h1>
            
            <p className="text-base md:text-lg font-light text-blue-100 max-w-xl mb-10 leading-relaxed border-l-4 border-brand-blue pl-6">
              Empowering students with quality technical education and professional ethics to meet global challenges.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button variant="white" icon>Apply Now</Button>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-brand-blue">
                Departments
              </Button>
            </div>
          </div>

          {/* Right Column: Widgets Side-by-Side */}
          <div className="w-full xl:w-7/12 relative z-30 flex flex-col md:flex-row gap-6 justify-end items-stretch">
             
             {/* Notices Box - Updated to match Upcoming Events style */}
             <div className="w-full md:w-1/2 max-w-sm bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl p-6 flex flex-col rounded-sm">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-8 w-1 bg-yellow-400"></div>
                    <h3 className="text-xl font-bold uppercase tracking-wider text-white">Latest Notices</h3>
                </div>
                
                {/* List */}
                <div className="flex-grow flex flex-col gap-4">
                  <div className="divide-y divide-white/10 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                    {notices.map((notice) => (
                      <div key={notice.id} className="py-3 first:pt-0 hover:bg-white/5 transition-colors cursor-pointer group">
                         <p className="text-sm font-medium text-white/90 leading-snug group-hover:text-yellow-400 transition-colors mb-2">
                           {notice.text}
                         </p>
                         <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-sm ${notice.date === 'New' ? 'bg-red-600 text-white' : 'bg-white/20 text-white/70'}`}>
                              {notice.date}
                         </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-white/10">
                    <a href="#" className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-yellow-400 transition-colors flex items-center gap-2">
                      View All Notices <ChevronRight className="w-3 h-3" />
                    </a>
                </div>
             </div>

             {/* Upcoming Events Box */}
             <div className="w-full md:w-1/2 max-w-sm bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl p-6 flex flex-col rounded-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-8 w-1 bg-yellow-400"></div>
                    <h3 className="text-xl font-bold uppercase tracking-wider text-white">Upcoming Events</h3>
                </div>

                <div className="space-y-6 flex-grow">
                    {events.map((event) => (
                        <div key={event.id} className="group cursor-pointer">
                            <div className="flex items-stretch mb-3 shadow-lg transform group-hover:-translate-y-1 transition-transform">
                                 <div className="bg-[#002855] text-white font-bold px-3 py-2 text-xs md:text-sm flex items-center justify-center min-w-[80px] text-center leading-tight">
                                    {event.day}
                                 </div>
                                 <div className="bg-yellow-400 text-[#002855] font-black px-3 py-2 text-sm md:text-base flex items-center justify-center min-w-[70px]">
                                    {event.year}
                                 </div>
                            </div>
                            <p className="text-sm text-blue-100 font-medium leading-relaxed group-hover:text-yellow-400 transition-colors border-l-2 border-white/10 pl-3">
                                {event.title}
                            </p>
                        </div>
                    ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-white/10">
                    <a href="#" className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-yellow-400 transition-colors flex items-center gap-2">
                        Full Calendar <Calendar className="w-3 h-3" />
                    </a>
                </div>
             </div>

          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-10 hidden 2xl:block z-10">
        <div className="flex items-center gap-4 -rotate-90 origin-left translate-y-8 animate-bounce">
           <span className="text-xs font-bold uppercase tracking-widest text-white/50">Scroll Down</span>
           <div className="w-20 h-[1px] bg-white/50"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;