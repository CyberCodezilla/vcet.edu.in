import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { Users, Rocket, Code, Lightbulb, Globe, Wrench, Camera, Music, Award } from 'lucide-react';

const stats = [
  { icon: Users, value: 'SAE-VCET', label: 'Student Chapter' },
  { icon: Rocket, value: '2019-20', label: 'Re-registered' },
  { icon: Globe, value: '3', label: 'National Teams' },
  { icon: Lightbulb, value: 'Mobility', label: 'Innovation Focus' },
];

const activities = [
  {
    icon: Code,
    title: 'Mobility Technology Learning',
    description: 'SAE India is the global leader in technical learning for mobility; VCET students learn vehicle systems, design, and advanced transport solutions.',
  },
  {
    icon: Wrench,
    title: 'Engineering Competitions',
    description: 'Engineered vehicles compete under TEAM ETHAN, TEAM SOLECTHON, TEAM CENTURION in national events with strong mentorship from faculty.',
  },
  {
    icon: Camera,
    title: 'Gallery & Showcases',
    description: 'Work samples, prototype vehicles, and progress updates are documented in club galleries and shared on the campus portal.',
  },
  {
    icon: Music,
    title: 'Student Leadership',
    description: 'Students drive the SAE committee with faculty guidance, fostering collaboration among mobility practitioners, academics and industry.',
  },
];

const highlights = [
  {
    title: 'Individually Driven Society',
    description: 'SAEIndia membership is owned by individuals from industry, academia, and students, making the club truly student-centered.',
  },
  {
    title: 'Strategic SAE Partner',
    description: 'VCET is associated with SAE India and SAE International, advancing the mobility industry through a non-profit engineering society.',
  },
  {
    title: 'Active National Participation',
    description: 'Teams from VCET participate in national-level competitions, boosting institutional visibility and experiential engineering education.',
  },
];

const StudentsClub: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="SAE India Collegiate Club"
        breadcrumbs={[
          { label: 'Students Club' },
          { label: 'SAE' },
        ]}
      />

      {/* Overview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="reveal">
                <div className="bg-brand-light rounded-2xl aspect-[4/3] flex items-center justify-center border border-brand-blue/10">
                  <span className="text-sm font-semibold text-brand-blue/40 tracking-wide">
                    SAE Club at VCET
                  </span>
                </div>
              </div>

              <div className="reveal" style={{ transitionDelay: '0.1s' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-0.5 bg-brand-gold" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                    Mobility. Innovation. Leadership.
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy mb-6">
                  About SAE India – VCET
                </h2>
                <p className="text-slate-500 leading-relaxed mb-4">
                  SAE International is the global leader in technical learning for the mobility industry,
                  and SAE India is the premier resource for mobility technology in India. Individual
                  members — including engineers, industry executives, academics, and students — drive the
                  organization.
                </p>
                <p className="text-slate-500 leading-relaxed">
                  VCET Mechanical Engineering Department is associated with SAE India and renewed
                  its SAE Collegiate Club registration in 2019-20 (SAEICCWIS234). The club supports
                  national-level teams Team ETHAN, Team SOLECTHON, and Team CENTURION.
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

      {/* Activities */}
      <section className="py-16 md:py-24 bg-brand-light">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-14 reveal">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy mb-4">
              Activities & Focus
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              SAE-VCET focuses on experiential learning and national-level mobility engineering competitions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {activities.map((activity, idx) => (
              <div
                key={idx}
                className="reveal group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg p-6 transition-all duration-500 hover:-translate-y-1 hover:border-brand-gold/30"
                style={{ transitionDelay: `${0.05 * idx}s` }}
              >
                <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-gold/10 transition-colors duration-300">
                  <activity.icon className="w-6 h-6 text-brand-blue group-hover:text-brand-gold transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-display font-bold text-brand-navy mb-2 group-hover:text-brand-blue transition-colors duration-300">
                  {activity.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-14 reveal">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy mb-4">
              SAE-VCET Highlights
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Student-driven engineering excellence, strengthened by industry-academic alignment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="reveal group bg-gradient-to-br from-brand-dark via-brand-blue to-brand-navy rounded-xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                style={{ transitionDelay: `${0.1 * idx}s` }}
              >
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-5 h-5 text-brand-gold" />
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

export default StudentsClub;
