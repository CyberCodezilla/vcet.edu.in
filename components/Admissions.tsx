import React from 'react';
import SectionHeader from './SectionHeader';
import Button from './Button';
import { FileText, UserCheck, CreditCard, GraduationCap } from 'lucide-react';

const steps = [
  { icon: FileText, title: 'Apply Online', desc: 'Fill out the comprehensive application form via our portal.' },
  { icon: CreditCard, title: 'Pay Fee', desc: 'Complete the application processing fee payment securely.' },
  { icon: UserCheck, title: 'Counseling', desc: 'Attend the online counseling and document verification session.' },
  { icon: GraduationCap, title: 'Enrollment', desc: 'Confirm your seat and begin your journey at Nova.' },
];

const Admissions: React.FC = () => {
  return (
    <section id="admissions" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <SectionHeader title="Admissions Open 2024" />
            <p className="text-lg text-slate-600 mb-8">
              Join a community of diverse minds. Our admission process is designed to identify students with passion and potential.
            </p>
            <div className="flex flex-col gap-4">
               <Button>Apply Now</Button>
               <Button variant="outline" icon>Download Brochure</Button>
            </div>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="border border-slate-200 p-8 hover:border-brand-blue transition-colors duration-300 relative group">
                <span className="absolute top-6 right-6 text-6xl font-black text-slate-100 group-hover:text-blue-50 transition-colors duration-300 -z-10">
                  0{idx + 1}
                </span>
                <step.icon className="w-12 h-12 mb-6 stroke-1 text-brand-blue" />
                <h4 className="text-xl font-bold uppercase mb-2 text-brand-dark">{step.title}</h4>
                <p className="text-slate-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admissions;