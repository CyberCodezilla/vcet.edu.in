import React from 'react';
import Button from './Button';
import { Bell, ChevronRight, FileText } from 'lucide-react';

const notices = [
  { id: 1, text: "Admission 2024-25: Applications open for First Year Engineering.", date: "New" },
  { id: 2, text: "Semester IV Exam Time Table released. Check student portal.", date: "Aug 12" },
  { id: 3, text: "National Level Hackathon 'Hack-n-Code' registration closes soon.", date: "Aug 10" },
  { id: 4, text: "Guest Lecture on 'AI in Healthcare' by Industry Experts.", date: "Aug 05" },
];

const Hero: React.FC = () => {
  return (
    // Added -mt-20 to pull the hero section up behind the sticky header
    <section id="home" className="relative min-h-screen w-full flex items-center overflow-hidden bg-brand-dark text-white pt-20 -mt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/1920/1080?grayscale" 
          alt="VCET Campus" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/80 to-brand-blue/30"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Column: Hero Text */}
          <div className="w-full lg:w-2/3 xl:w-3/4 relative z-20">
            <div className="inline-block mb-6 px-3 py-1 border border-white/30 backdrop-blur-md rounded-full">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">Est. 1994 • NAAC Accredited A+</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8 break-words">
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

          {/* Right Column: Notice Board */}
          <div className="w-full lg:w-1/3 xl:w-1/4 relative z-30 flex justify-end">
             {/* Box Container */}
             <div className="w-full max-w-sm bg-black/60 backdrop-blur-md border border-white/10 shadow-2xl rounded-sm overflow-hidden">
                
                {/* Header */}
                <div className="bg-brand-blue p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-white" />
                    <span className="font-bold uppercase tracking-widest text-xs text-white">Latest Notices</span>
                  </div>
                  <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  </div>
                </div>
                
                {/* List */}
                <div className="divide-y divide-white/10 max-h-[320px] overflow-y-auto custom-scrollbar">
                  {notices.map((notice) => (
                    <div key={notice.id} className="p-4 hover:bg-white/5 transition-colors cursor-pointer group">
                       <div className="flex justify-between items-center mb-1">
                          <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${notice.date === 'New' ? 'bg-red-500 text-white' : 'bg-white/10 text-white/60'}`}>
                            {notice.date}
                          </span>
                          <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                       </div>
                       <p className="text-sm font-medium text-white/90 leading-snug group-hover:text-blue-200 transition-colors">
                         {notice.text}
                       </p>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-3 bg-black/40 text-center border-t border-white/10">
                    <a href="#" className="text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors flex items-center justify-center gap-2">
                      View All Archives <FileText className="w-3 h-3" />
                    </a>
                </div>
             </div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-10 hidden xl:block z-10">
        <div className="flex items-center gap-4 -rotate-90 origin-left translate-y-8 animate-bounce">
           <span className="text-xs font-bold uppercase tracking-widest text-white/50">Scroll Down</span>
           <div className="w-20 h-[1px] bg-white/50"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;