import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { GraduationCap, Target, Award, Users, Briefcase, BookOpen, Lightbulb, TrendingUp } from 'lucide-react';

const stats = [
  { icon: GraduationCap, value: '500+', label: 'Students Trained' },
  { icon: Target, value: '10+', label: 'Skill Programs' },
  { icon: Award, value: 'NSDC', label: 'Certified' },
  { icon: Briefcase, value: '90%+', label: 'Employment Rate' },
];

const programs = [
  {
    icon: BookOpen,
    title: 'Technical Skill Training',
    description: 'Industry-aligned technical skill courses covering programming, data analytics, cloud computing, and digital technologies with hands-on projects.',
  },
  {
    icon: Briefcase,
    title: 'Employability Enhancement',
    description: 'Programs focused on resume building, interview preparation, soft skills, communication, and professional etiquette for job readiness.',
  },
  {
    icon: Lightbulb,
    title: 'Entrepreneurship Development',
    description: 'Workshops on business planning, startup ecosystem, ideation, and financial literacy to nurture the entrepreneurial spirit in students.',
  },
  {
    icon: TrendingUp,
    title: 'Industry-Specific Modules',
    description: 'Customized training modules aligned with specific industry requirements, ensuring students are prepared for sector-specific career paths.',
  },
  {
    icon: Target,
    title: 'Certification Programs',
    description: 'NSDC-recognized certification courses that add value to student profiles and are acknowledged by employers across industries.',
  },
  {
    icon: Users,
    title: 'Mentorship & Placement Support',
    description: 'One-on-one mentoring sessions and placement assistance connecting trained students with industry partners and job opportunities.',
  },
];

const benefits = [
  {
    title: 'Government-Recognized Certifications',
    description: 'Students receive NSDC-certified credentials that are nationally recognized, adding significant value to their professional portfolios.',
  },
  {
    title: 'Bridge the Skill Gap',
    description: 'Programs designed to bridge the gap between academic knowledge and industry requirements, making graduates truly employable.',
  },
  {
    title: 'Career Advancement',
    description: 'Skill development training opens doors to diverse career opportunities and accelerates professional growth in the competitive job market.',
  },
];

const NSDC: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="NSDC"
        breadcrumbs={[
          { label: 'NSDC' },
        ]}
      />

      {/* Overview */}
      <section className="py-8 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="reveal">
                <div className="bg-brand-light rounded-2xl aspect-[4/3] flex items-center justify-center border border-brand-blue/10">
                  <span className="text-sm font-semibold text-brand-blue/40 tracking-wide">
                    nsdc.jpg
                  </span>
                </div>
              </div>

              <div className="reveal" style={{ transitionDelay: '0.1s' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-0.5 bg-brand-gold" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                    Skill India. Build India.
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy mb-6">
                  National Skill Development Corporation
                </h2>
                <p className="text-slate-500 leading-relaxed mb-4">
                  VCET actively participates in the National Skill Development Corporation (NSDC)
                  programs to provide students with industry-relevant skill development training. These
                  programs are designed to enhance employability, bridge the gap between academic
                  learning and industry expectations, and empower students with certifications recognized
                  across the country.
                </p>
                <p className="text-slate-500 leading-relaxed">
                  From technical skills and digital literacy to soft skills and entrepreneurship
                  development, NSDC programs at VCET ensure that every student graduates with the
                  competencies needed to succeed in the modern workforce.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-gradient-to-br from-brand-dark via-brand-blue to-brand-navy">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="reveal text-center p-6"
                style={{ transitionDelay: `${0.1 * idx}s` }}
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-white/10 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-brand-gold" />
                </div>
                <div className="text-2xl md:text-3xl font-display font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-widest text-white/50 font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-8 md:py-16 lg:py-24 bg-brand-light">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-14 reveal">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy mb-4">
              Skill Development Programs
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Building competencies for a future-ready workforce.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {programs.map((program, idx) => (
              <div
                key={idx}
                className="reveal group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg p-6 transition-all duration-500 hover:-translate-y-1 hover:border-brand-gold/30"
                style={{ transitionDelay: `${0.05 * idx}s` }}
              >
                <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-gold/10 transition-colors duration-300">
                  <program.icon className="w-6 h-6 text-brand-blue group-hover:text-brand-gold transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-display font-bold text-brand-navy mb-2 group-hover:text-brand-blue transition-colors duration-300">
                  {program.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-8 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-14 reveal">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy mb-4">
              Why NSDC Programs?
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Nationally recognized skill development for career success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((item, idx) => (
              <div
                key={idx}
                className="reveal group bg-gradient-to-br from-brand-dark via-brand-blue to-brand-navy rounded-xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                style={{ transitionDelay: `${0.1 * idx}s` }}
              >
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="w-5 h-5 text-brand-gold" />
                </div>
                <h3 className="text-lg font-display font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default NSDC;
