import React from 'react';
import Button from './Button';
import { Bell, Calendar, ChevronRight, FileText } from 'lucide-react';

const notices = [
  { id: 1, text: "Admission 2024-25: Applications open for First Year Engineering.", date: "New" },
  { id: 2, text: "Semester IV Exam Time Table released. Check student portal.", date: "Aug 12" },
  { id: 3, text: "National Level Hackathon 'Hack-n-Code' registration closes soon.", date: "Aug 10" },
  { id: 4, text: "Guest Lecture on 'AI in Healthcare' by Industry Experts.", date: "Aug 05" },
  { id: 5, text: "Institute level round for Direct Second Year Admissions.", date: "Aug 01" },
];

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen w-full flex items-center overflow-hidden bg-brand-dark text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/1920/1080?grayscale" 
          alt="VCET Campus" 
          className="w-full h-full object-cover opacity-30 hover:scale-105 transition-transform duration-[20s] ease-linear"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/70 to-brand-blue/40"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 pt-28 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Text */}
          <div className="lg:col-span-8">
            <div className="inline-block mb-6 px-3 py-1 border border-white/30 backdrop-blur-md rounded-full">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">Est. 1994 • NAAC Accredited A+</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
              Vidyavardhini's <br/>
              <span className="text-transparent stroke-white bg-clip-text bg-cover" style={{WebkitTextStroke: '1px white'}}>College Of</span><br/>
              Engineering
            </h1>
            
            <p className="text-lg md:text-xl font-light text-blue-100 max-w-2xl mb-10 leading-relaxed border-l-4 border-brand-blue pl-6">
              Empowering students with quality technical education and professional ethics to meet global challenges.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="white" icon>Apply Now</Button>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-brand-blue">
                Departments
              </Button>
            </div>
          </div>

          {/* Right Column: Notice Board (The "Black Rectangle") */}
          <div className="lg:col-span-4 h-full flex items-center">
            <div className="w-full bg-black/80 backdrop-blur-sm border border-white/10 p-1 shadow-2xl">
              {/* Notice Header */}
              <div className="bg-brand-blue p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-white animate-pulse" />
                  <span className="font-bold uppercase tracking-widest text-sm text-white">Latest Notices</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
              </div>

              {/* Notice List */}
              <div className="h-[400px] overflow-hidden relative group">
                {/* Scrolling content container */}
                 <div className="absolute top-0 left-0 w-full animate-[scroll-up_15s_linear_infinite] hover:[animation-play-state:paused] p-6 space-y-6">
                    {/* Duplicate the list to create seamless loop effect */}
                    {[...notices, ...notices].map((notice, idx) => (
                      <div key={`${notice.id}-${idx}`} className="border-b border-gray-700 pb-4 last:border-0 hover:bg-white/5 transition-colors p-2 cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                           <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${notice.date === 'New' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300'}`}>
                             {notice.date}
                           </span>
                           <ChevronRight className="w-4 h-4 text-gray-500" />
                        </div>
                        <p className="text-sm font-medium text-gray-200 leading-snug hover:text-white transition-colors">
                          {notice.text}
                        </p>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Footer of Notice Board */}
              <div className="p-4 bg-gray-900 border-t border-gray-800 text-center">
                <button className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white flex items-center justify-center gap-2 transition-all">
                  View All Archives <FileText className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-10 animate-bounce hidden md:block">
        <div className="flex items-center gap-4 -rotate-90 origin-left translate-y-8">
           <span className="text-xs font-bold uppercase tracking-widest text-white/50">Scroll Down</span>
           <div className="w-20 h-[1px] bg-white/50"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;