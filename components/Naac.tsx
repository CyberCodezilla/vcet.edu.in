import React from 'react';
import { Award, TrendingUp, Users, BookOpen } from 'lucide-react';

const Naac: React.FC = () => {
  return (
    <section id="naac" className="py-24 bg-brand-light border-y border-slate-200">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16">
           <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-brand-blue">
                Accredited & Recognized
              </h2>
              <p className="text-slate-600 text-lg">
                Consistently ranked among the top engineering colleges for academic excellence and infrastructure.
              </p>
           </div>
           <div className="mt-8 md:mt-0 flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm font-bold uppercase tracking-widest text-slate-500">NAAC Grade</p>
                <p className="text-6xl font-black text-brand-blue">A++</p>
              </div>
              <div className="h-16 w-px bg-slate-300"></div>
              <div className="text-left">
                 <p className="text-sm font-bold uppercase tracking-widest text-slate-500">NBA Accredited</p>
                 <p className="text-6xl font-black text-brand-blue">Yes</p>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Placements', value: '96%', icon: TrendingUp },
            { label: 'Faculty', value: '300+', icon: Users },
            { label: 'Publications', value: '1.2K', icon: BookOpen },
            { label: 'Awards', value: '50+', icon: Award },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-8 border border-slate-200 flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-300 group">
               <stat.icon className="w-8 h-8 mb-4 stroke-1 text-slate-400 group-hover:text-brand-blue transition-colors" />
               <span className="text-4xl md:text-5xl font-black mb-2 text-brand-dark">{stat.value}</span>
               <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Naac;