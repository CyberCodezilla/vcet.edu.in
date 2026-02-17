import React from 'react';
import SectionHeader from './SectionHeader';
import { Wifi, Book, Coffee, Monitor, Activity, Globe } from 'lucide-react';

const facilities = [
  { icon: Monitor, title: 'Advanced Labs', desc: 'State-of-the-art computer centers with high-end GPUs.' },
  { icon: Book, title: 'Digital Library', desc: 'Access to IEEE journals and 50,000+ volumes.' },
  { icon: Wifi, title: 'Smart Campus', desc: '24/7 High-speed Wi-Fi connectivity across 100 acres.' },
  { icon: Activity, title: 'Sports Complex', desc: 'Indoor stadium, gym, and Olympic-size synthetic track.' },
];

const Facilities: React.FC = () => {
  return (
    <section id="facilities" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <SectionHeader title="Campus Life" subtitle="Beyond the classroom, a world of opportunities awaits." />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200">
           {facilities.map((fac, idx) => (
             <div key={idx} className="bg-white p-10 hover:bg-brand-blue hover:text-white transition-colors duration-300 group min-h-[300px] flex flex-col justify-between">
                <div>
                  <fac.icon className="w-12 h-12 stroke-1 mb-6 group-hover:stroke-white transition-colors text-brand-blue" />
                  <h3 className="text-xl font-bold uppercase mb-4">{fac.title}</h3>
                  <p className="text-slate-500 group-hover:text-blue-100 text-sm leading-relaxed">
                    {fac.desc}
                  </p>
                </div>
                <div className="w-8 h-1 bg-brand-blue mt-8 group-hover:bg-white transition-colors"></div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default Facilities;