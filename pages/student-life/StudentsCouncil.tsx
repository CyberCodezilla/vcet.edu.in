import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { Trophy, Medal, Flag, Target, Dumbbell, Timer, Users, Award } from 'lucide-react';

const stats = [
  { icon: Users,  value: '300+', label: 'Active Athletes'     },
  { icon: Trophy, value: '15+',  label: 'Championships Won'   },
  { icon: Award,  value: '50+',  label: 'Medals Earned'       },
  { icon: Flag,   value: '10+',  label: 'Sports Offered'      },
];

const sports = [
  {
    icon: Target,
    title: 'Cricket',
    description: 'Our cricket team participates in inter-college and university-level tournaments, with dedicated practice sessions and coaching.',
  },
  {
    icon: Dumbbell,
    title: 'Football',
    description: 'The football team trains regularly and competes in various inter-college tournaments, fostering teamwork and sportsmanship.',
  },
  {
    icon: Medal,
    title: 'Basketball',
    description: 'Our basketball team has a strong track record in university and inter-college championships with well-maintained courts.',
  },
  {
    icon: Timer,
    title: 'Athletics',
    description: 'Track and field events nurture sprinters, long-distance runners, and field athletes who represent VCET at state and national level.',
  },
  {
    icon: Flag,
    title: 'Volleyball',
    description: 'The volleyball team actively participates in inter-college competitions, building coordination and team spirit among players.',
  },
  {
    icon: Trophy,
    title: 'Table Tennis & Indoor Games',
    description: 'Equipment and facilities for table tennis, chess, carrom, and badminton encourage recreational sports and healthy competition.',
  },
];

const achievements = [
  {
    title: 'University Champions – Cricket',
    description: 'VCET cricket team secured the championship title at the university-level cricket tournament.',
    year: '2025',
  },
  {
    title: 'Inter-College Basketball Runners-Up',
    description: 'Our basketball team reached the finals at the prestigious inter-college basketball championship.',
    year: '2024',
  },
  {
    title: 'State-Level Athletics Medals',
    description: 'Multiple students won gold and silver medals at state-level athletics competitions.',
    year: '2024',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

const SportsCommittee: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Sports Committee"
        breadcrumbs={[
          { label: 'Student Life', href: '/student-life' },
          { label: 'Sports Committee' },
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
                    sports-committee.jpg
                  </span>
                </div>
              </div>

              <div className="reveal" style={{ transitionDelay: '0.1s' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-0.5 bg-brand-gold" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                    Play. Compete. Conquer.
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy mb-6">
                  Sports Committee
                </h2>
                <p className="text-slate-500 leading-relaxed mb-4">
                  The Sports Committee at VCET is committed to promoting physical fitness,
                  sportsmanship, and competitive spirit among students. It organizes inter-college
                  tournaments, the annual sports day, and regular training sessions across multiple
                  sports disciplines.
                </p>
                <p className="text-slate-500 leading-relaxed">
                  With state-of-the-art facilities and dedicated coaching, VCET students have
                  consistently excelled at university, state, and national-level sports events,
                  bringing laurels to the institution.
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

      {/* Sports Grid */}
      <section className="py-8 md:py-16 lg:py-24 bg-brand-light">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-14 reveal">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy mb-4">
              Sports at VCET
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              A wide range of sports to fuel every athlete's passion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {sports.map((sport, idx) => (
              <div
                key={idx}
                className="reveal group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg p-6 transition-all duration-500 hover:-translate-y-1 hover:border-brand-gold/30"
                style={{ transitionDelay: `${0.05 * idx}s` }}
              >
                <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-gold/10 transition-colors duration-300">
                  <sport.icon className="w-6 h-6 text-brand-blue group-hover:text-brand-gold transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-display font-bold text-brand-navy mb-2 group-hover:text-brand-blue transition-colors duration-300">
                  {sport.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">{sport.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-8 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-14 reveal">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy mb-4">
              Achievements & Highlights
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Celebrating our athletes' remarkable accomplishments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {achievements.map((achievement, idx) => (
              <div
                key={idx}
                className="reveal group bg-gradient-to-br from-brand-dark via-brand-blue to-brand-navy rounded-xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                style={{ transitionDelay: `${0.1 * idx}s` }}
              >
                <div className="text-xs font-bold text-brand-gold/60 uppercase tracking-widest mb-3">
                  {achievement.year}
                </div>
                <h3 className="text-lg font-display font-bold text-white mb-2">
                  {achievement.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default SportsCommittee;