import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { Accessibility, Heart, BookOpen, Users, Target, HandHeart, GraduationCap, Lightbulb } from 'lucide-react';

const objectives = [
  {
    icon: Accessibility,
    title: 'Accessibility',
    description: 'Ensuring campus accessibility and barrier-free environment for differently-abled students.',
  },
  {
    icon: Heart,
    title: 'Inclusive Environment',
    description: 'Creating an inclusive environment that respects diversity and promotes equal participation.',
  },
  {
    icon: BookOpen,
    title: 'Academic Support',
    description: 'Providing additional academic support through assistive technology, scribes, and extra time.',
  },
  {
    icon: HandHeart,
    title: 'Scholarship Facilitation',
    description: 'Assisting eligible students in availing government scholarships and financial aid.',
  },
  {
    icon: GraduationCap,
    title: 'Career Guidance',
    description: 'Special career counseling and placement support for disadvantaged students.',
  },
  {
    icon: Lightbulb,
    title: 'Skill Development',
    description: 'Conducting skill enhancement workshops and training programs for holistic development.',
  },
];

const activities = [
  'Orientation programs for newly admitted students from disadvantaged backgrounds',
  'Providing assistive devices and technology for differently-abled students',
  'Organizing sensitization workshops for faculty and staff',
  'Facilitating wheelchair accessibility and ramp facilities across campus',
  'Arranging sign language interpreters and special educators as needed',
  'Coordinating with government agencies for welfare schemes and benefits',
  'Conducting mentoring sessions for academic and personal development',
  'Organizing awareness drives on disability rights and inclusion',
  'Facilitating internship and placement opportunities through corporate partnerships',
];

const EqualOpportunity: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Equal Opportunity Cell"
        breadcrumbs={[
          { label: 'Equal Opportunity Cell' },
        ]}
      />

      {/* About */}
      <section className="py-8 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="reveal">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                  Empowerment
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy mb-6">
                Equal Opportunity Cell (EOC)
              </h2>
              <p className="text-slate-500 leading-relaxed mb-4">
                The Equal Opportunity Cell (EOC) at VCET is established to ensure that all students,
                especially those from differently-abled and disadvantaged backgrounds, receive equal
                opportunities for education, growth, and development. The cell works towards creating
                a barrier-free and inclusive campus environment.
              </p>
              <p className="text-slate-500 leading-relaxed">
                The EOC coordinates with various stakeholders to provide necessary support systems,
                infrastructure modifications, and assistance to ensure that every student can participate
                fully in academic and co-curricular activities without any discrimination or hindrance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-8 md:py-16 lg:py-24 bg-brand-light">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14 reveal">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">Objectives</span>
                <div className="w-8 h-0.5 bg-brand-gold" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-navy">
                Our Objectives
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {objectives.map((item, idx) => (
                <div
                  key={idx}
                  className="reveal group bg-white rounded-none border border-[#8ea2b8] p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-500"
                  style={{ transitionDelay: `${Math.min(idx * 0.05, 0.4)}s` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/5 flex items-center justify-center mb-4 group-hover:bg-brand-gold/10 transition-colors duration-300">
                    <item.icon className="w-5 h-5 text-brand-blue/60 group-hover:text-brand-gold transition-colors duration-300" />
                  </div>
                  <h3 className="text-sm font-semibold text-brand-navy mb-2 font-display">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-8 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14 reveal">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">Activities</span>
                <div className="w-8 h-0.5 bg-brand-gold" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-navy">
                Activities & Initiatives
              </h2>
            </div>

            <div className="space-y-3">
              {activities.map((activity, idx) => (
                <div
                  key={idx}
                  className="reveal flex items-start gap-4 bg-brand-light rounded-none p-4 hover:shadow-md transition-all duration-300"
                  style={{ transitionDelay: `${Math.min(idx * 0.04, 0.4)}s` }}
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Target className="w-4 h-4 text-brand-gold" />
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{activity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default EqualOpportunity;

