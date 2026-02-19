import React from 'react';
import SectionHeader from './SectionHeader';
import { Department } from '../types';
import { ArrowRight } from 'lucide-react';

const departments: Department[] = [
  { id: '1', name: 'Computer Science', description: 'AI, ML & Data Science', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Cdefs%3E%3ClinearGradient id="grad1" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23003366;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23001a33;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill="url(%23grad1)" width="800" height="600"/%3E%3Ctext fill="%23ffffff" font-family="Arial" font-size="28" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EComputer Science%3C/text%3E%3C/svg%3E' },
  { id: '2', name: 'Mechanical Eng.', description: 'Robotics & Automation', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Cdefs%3E%3ClinearGradient id="grad2" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23003366;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23001a33;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill="url(%23grad2)" width="800" height="600"/%3E%3Ctext fill="%23ffffff" font-family="Arial" font-size="28" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EMechanical%3C/text%3E%3C/svg%3E' },
  { id: '3', name: 'Electronics & Comm.', description: 'IoT & Embedded Systems', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Cdefs%3E%3ClinearGradient id="grad3" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23003366;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23001a33;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill="url(%23grad3)" width="800" height="600"/%3E%3Ctext fill="%23ffffff" font-family="Arial" font-size="28" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EElectronics%3C/text%3E%3C/svg%3E' },
  { id: '4', name: 'Civil Engineering', description: 'Sustainable Infrastructure', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Cdefs%3E%3ClinearGradient id="grad4" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23003366;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23001a33;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill="url(%23grad4)" width="800" height="600"/%3E%3Ctext fill="%23ffffff" font-family="Arial" font-size="28" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ECivil%3C/text%3E%3C/svg%3E' },
  { id: '5', name: 'Information Tech', description: 'Cloud & Cyber Security', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Cdefs%3E%3ClinearGradient id="grad5" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23003366;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23001a33;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill="url(%23grad5)" width="800" height="600"/%3E%3Ctext fill="%23ffffff" font-family="Arial" font-size="28" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EInformation Tech%3C/text%3E%3C/svg%3E' },
  { id: '6', name: 'Electrical Eng.', description: 'Renewable Energy', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Cdefs%3E%3ClinearGradient id="grad6" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23003366;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23001a33;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill="url(%23grad6)" width="800" height="600"/%3E%3Ctext fill="%23ffffff" font-family="Arial" font-size="28" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EElectrical%3C/text%3E%3C/svg%3E' },
];

const Departments: React.FC = () => {
  return (
    <section id="departments" className="py-24 bg-brand-dark text-white">
      <div className="container mx-auto px-6">
        <SectionHeader title="Academic Departments" theme="dark" subtitle="World-class programs designed for the industry leaders of tomorrow." />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-blue/20 border border-brand-blue/20">
          {departments.map((dept) => (
            <div key={dept.id} className="group relative bg-brand-dark h-[400px] overflow-hidden">
              {/* Image Background */}
              <img 
                src={dept.image} 
                alt={dept.name} 
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-3xl font-bold uppercase leading-none mb-2">{dept.name}</h3>
                  <p className="text-blue-200 font-medium tracking-wide mb-6">{dept.description}</p>
                  
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:gap-4 transition-all text-white">
                      View Curriculum <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Top Border on Hover */}
              <div className="absolute top-0 left-0 w-0 h-1 bg-brand-blue group-hover:w-full transition-all duration-500 ease-in-out" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Departments;