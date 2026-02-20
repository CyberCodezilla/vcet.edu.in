import React from 'react';
import SectionHeader from './SectionHeader';
import Button from './Button';
import { FileText, UserCheck, CreditCard, GraduationCap } from 'lucide-react';

const steps = [
  { icon: FileText, title: 'Apply Online', desc: 'Fill out the comprehensive application form via our portal.' },
  { icon: CreditCard, title: 'Pay Fee', desc: 'Complete the application processing fee payment securely.' },
  { icon: UserCheck, title: 'Counseling', desc: 'Attend the online counseling and document verification session.' },
  { icon: GraduationCap, title: 'Enrollment', desc: 'Confirm your seat and begin your journey at VCET.' },
];

const Admissions: React.FC = () => {
  return (
    <section id="admissions" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-14">
          <div className="lg:w-1/3">
            <SectionHeader title="Admissions Open 2025" />
            <p className="text-base text-slate-500 mb-8 leading-relaxed">
              Join a community of diverse minds. Our admission process is designed to identify students with passion and potential.
            </p>
            <div className="flex flex-col gap-3">
              <Button>Apply Now</Button>
              <Button variant="outline" icon>Download Brochure</Button>
            </div>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-5">
            {steps.map((step, idx) => (
              <div key={idx} className="border border-gray-100 rounded-xl p-7 hover:border-brand-blue/20 hover:shadow-lg transition-all duration-300 relative group">
                <span className="absolute top-5 right-5 text-5xl font-bold text-gray-50 group-hover:text-brand-blue/5 transition-colors">
                  0{idx + 1}
                </span>
                <div className="w-12 h-12 rounded-xl bg-brand-blue/5 flex items-center justify-center mb-5 group-hover:bg-brand-blue transition-colors duration-300">
                  <step.icon className="w-6 h-6 text-brand-blue group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-lg font-bold text-brand-navy mb-2">{step.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admissions;
