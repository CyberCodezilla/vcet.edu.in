import React from 'react';
import SectionHeader from './SectionHeader';
import { Department } from '../types';
import { ArrowRight } from 'lucide-react';

const departments: Department[] = [
  { id: '1', name: 'Computer Science', description: 'AI, ML & Data Science', image: 'https://picsum.photos/800/600?random=2' },
  { id: '2', name: 'Mechanical Eng.', description: 'Robotics & Automation', image: 'https://picsum.photos/800/600?random=3' },
  { id: '3', name: 'Electronics & Comm.', description: 'IoT & Embedded Systems', image: 'https://picsum.photos/800/600?random=4' },
  { id: '4', name: 'Civil Engineering', description: 'Sustainable Infrastructure', image: 'https://picsum.photos/800/600?random=5' },
  { id: '5', name: 'Information Tech', description: 'Cloud & Cyber Security', image: 'https://picsum.photos/800/600?random=6' },
  { id: '6', name: 'Electrical Eng.', description: 'Renewable Energy', image: 'https://picsum.photos/800/600?random=7' },
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