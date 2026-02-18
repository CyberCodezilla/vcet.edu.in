import React from 'react';
import SectionHeader from './SectionHeader';
import { Target, Eye } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <SectionHeader title="Who We Are" subtitle="Pioneering education for a digital world since 1995." />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <p className="text-2xl md:text-3xl font-light leading-tight text-slate-800">
              At VCET, we believe education is not just about textbooks. It's about <span className="font-bold border-b-4 border-brand-blue">breaking boundaries</span> and creating solutions for real-world problems.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Located in the heart of the tech corridor, our sprawling 100-acre campus is home to over 5,000 students and 300 faculty members. We combine traditional engineering discipline with modern design thinking.
            </p>
            <div className="h-[400px] w-full bg-gray-100 overflow-hidden relative group">
                <img src="https://picsum.photos/600/800?random=1" alt="Students" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
          </div>

          <div className="space-y-8">
             {/* Cards */}
             <div className="group border border-brand-blue p-8 hover:bg-brand-blue hover:text-white transition-all duration-300">
                <div className="flex justify-between items-start mb-6">
                  <Target className="w-10 h-10 stroke-1" />
                  <span className="text-sm font-bold uppercase tracking-widest opacity-50">01</span>
                </div>
                <h3 className="text-2xl font-bold uppercase mb-4">Our Mission</h3>
                <p className="opacity-80 leading-relaxed">
                  To provide a dynamic learning environment that fosters innovation, critical thinking, and ethical leadership in engineering and technology.
                </p>
             </div>

             <div className="group border border-brand-blue p-8 hover:bg-brand-blue hover:text-white transition-all duration-300">
                <div className="flex justify-between items-start mb-6">
                  <Eye className="w-10 h-10 stroke-1" />
                  <span className="text-sm font-bold uppercase tracking-widest opacity-50">02</span>
                </div>
                <h3 className="text-2xl font-bold uppercase mb-4">Our Vision</h3>
                <p className="opacity-80 leading-relaxed">
                  To be a globally recognized centre of excellence, shaping the future through sustainable engineering practices and research.
                </p>
             </div>

             <div className="h-[200px] w-full bg-brand-dark flex items-center justify-center p-8">
                <p className="text-white text-4xl font-black text-center uppercase leading-none">
                  25+ Years <br/><span className="text-blue-400/50 text-lg tracking-widest">Of Excellence</span>
                </p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;