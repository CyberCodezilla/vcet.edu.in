import React from 'react';
import { Award, TrendingUp, Users, BookOpen } from 'lucide-react';

const Naac: React.FC = () => {
  return (
    <section id="naac" className="py-20 md:py-28 bg-brand-light relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-14 gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-0.5 bg-brand-gold"></div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">Accreditation</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-brand-navy mb-4">
              Accredited & Recognized
            </h2>
            <p className="text-slate-500 text-base leading-relaxed">
              Consistently ranked among the top engineering colleges for academic excellence, infrastructure, and industry connect.
            </p>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">NAAC Grade</p>
              <p className="text-5xl font-display font-bold text-brand-blue">A+</p>
            </div>
            <div className="h-14 w-px bg-gray-200"></div>
            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">NBA</p>
              <p className="text-5xl font-display font-bold text-brand-gold">Yes</p>
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
            <div key={idx} className="bg-white rounded-xl p-7 flex flex-col items-center justify-center hover:shadow-lg transition-all duration-300 group border border-gray-50">
              <stat.icon className="w-6 h-6 mb-3 text-slate-300 group-hover:text-brand-blue transition-colors" />
              <span className="text-3xl md:text-4xl font-bold text-brand-navy mb-1">{stat.value}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Naac;
