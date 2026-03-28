import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { Heart, Users, BookOpen, HandHeart, Target, Lightbulb, GraduationCap, Award } from 'lucide-react';

const aboutPoints = [
  {
    icon: Heart,
    title: 'Student Welfare',
    description: 'Providing comprehensive support to students from socio-economically disadvantaged groups for their holistic development.',
  },
  {
    icon: BookOpen,
    title: 'Academic Support',
    description: 'Offering remedial coaching, mentoring, and academic assistance to help students excel in their studies.',
  },
  {
    icon: HandHeart,
    title: 'Financial Assistance',
    description: 'Facilitating access to scholarships, fee waivers, free ships, and other financial aid from government and private sources.',
  },
  {
    icon: GraduationCap,
    title: 'Career Guidance',
    description: 'Providing career counseling, placement assistance, and skill development opportunities.',
  },
  {
    icon: Lightbulb,
    title: 'Empowerment Programs',
    description: 'Conducting workshops, seminars, and awareness programs for personal and professional growth.',
  },
  {
    icon: Target,
    title: 'Bridging the Gap',
    description: 'Working towards reducing the disparity between socio-economically advantaged and disadvantaged students.',
  },
];

const initiatives = [
  'Identifying and enrolling students from SEDG backgrounds during admissions',
  'Providing free study materials, textbooks, and access to digital learning resources',
  'Organizing bridge courses and remedial classes in core subjects',
  'Facilitating government scholarship applications and documentation support',
  'Conducting personality development and soft skills training workshops',
  'Arranging counseling sessions for emotional and psychological well-being',
  'Coordinating with NGOs and social organizations for additional support',
  'Mentoring sessions by alumni from similar backgrounds',
  'Organizing awareness programs on rights, entitlements, and government schemes',
  'Facilitating participation in co-curricular and extra-curricular activities',
];

const SEDGCell: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Socio-Economically Disadvantaged Groups Cell"
        breadcrumbs={[
          { label: 'SEDG Cell' },
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
                About SEDG Cell
              </h2>
              <p className="text-slate-500 leading-relaxed mb-4">
                The Socio-Economically Disadvantaged Groups (SEDG) Cell at VCET is dedicated to
                supporting students from socially and economically weaker sections of society.
                The cell ensures that these students receive the necessary assistance to pursue
                quality education without financial or social barriers.
              </p>
              <p className="text-slate-500 leading-relaxed">
                As per the National Education Policy 2020, the SEDG Cell focuses on reducing
                disparities and promoting equity in education. The cell identifies students who
                belong to SC, ST, OBC, minorities, economically weaker sections, and other
                disadvantaged groups and provides them with targeted support systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-8 md:py-16 lg:py-24 bg-brand-light">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14 reveal">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">Focus Areas</span>
                <div className="w-8 h-0.5 bg-brand-gold" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-navy">
                What We Do
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {aboutPoints.map((item, idx) => (
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

      {/* Initiatives */}
      <section className="py-8 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14 reveal">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">Initiatives</span>
                <div className="w-8 h-0.5 bg-brand-gold" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-navy">
                Our Initiatives
              </h2>
            </div>

            <div className="space-y-3">
              {initiatives.map((initiative, idx) => (
                <div
                  key={idx}
                  className="reveal flex items-start gap-4 bg-brand-light rounded-none p-4 hover:shadow-md transition-all duration-300"
                  style={{ transitionDelay: `${Math.min(idx * 0.04, 0.4)}s` }}
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Award className="w-4 h-4 text-brand-gold" />
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{initiative}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default SEDGCell;

