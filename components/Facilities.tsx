import React from 'react';
import SectionHeader from './SectionHeader';
import { Wifi, Book, Monitor, Activity } from 'lucide-react';

const facilities = [
  { icon: Monitor, title: 'Advanced Labs', desc: 'State-of-the-art computer centers with high-end GPUs and latest software suites.' },
  { icon: Book, title: 'Digital Library', desc: 'Access to IEEE journals, research databases, and 50,000+ physical volumes.' },
  { icon: Wifi, title: 'Smart Campus', desc: '24/7 high-speed Wi-Fi connectivity and smart infrastructure across campus.' },
  { icon: Activity, title: 'Sports Complex', desc: 'Indoor stadium, gymnasium, and Olympic-size synthetic track for athletics.' },
];

const Facilities: React.FC = () => {
  return (
    <section id="facilities" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-6">
        <SectionHeader title="Campus Life" subtitle="Beyond the classroom, a world of opportunities and modern facilities awaits." />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {facilities.map((fac, idx) => (
            <div 
              key={idx} 
              className="group bg-brand-light rounded-xl p-8 hover:bg-brand-blue transition-all duration-500 flex flex-col min-h-[280px] reveal"
              style={{transitionDelay: `${idx * 0.1}s`}}
            >
              <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-6 group-hover:bg-white/15 transition-colors duration-300">
                <fac.icon className="w-6 h-6 text-brand-blue group-hover:text-white transition-colors duration-300" />
              </div>
              
              <h3 className="text-lg font-bold text-brand-navy mb-3 group-hover:text-white transition-colors duration-300">
                {fac.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed group-hover:text-white/70 transition-colors duration-300 flex-grow">
                {fac.desc}
              </p>
              
              <div className="w-8 h-0.5 bg-brand-gold mt-6 group-hover:w-12 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facilities;
