import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { FileText, Shield, CheckCircle, Award, TrendingUp } from 'lucide-react';

const iprActivities = [
  'Patent filing and prosecution support',
  'IPR awareness workshops and seminars',
  'Patent drafting guidance for faculty and students',
  'Design registration and trademark assistance',
  'Copyright registration for software and creative works',
  'Collaboration with patent attorneys and IP firms',
];

const stats = [
  { icon: FileText, label: 'Patents Filed', value: '50+' },
  { icon: Award, label: 'Patents Granted', value: '15+' },
  { icon: Shield, label: 'Copyrights Registered', value: '20+' },
  { icon: TrendingUp, label: 'Design Patents', value: '10+' },
];

const Patents: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Patents"
        breadcrumbs={[
          { label: 'Research', href: '/research' },
          { label: 'Patents' },
        ]}
      />

      {/* Introduction */}
      <section className="py-8 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="reveal" style={{ transitionDelay: '0.1s' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-0.5 bg-brand-gold" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                    Intellectual Property
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-navy mb-4">
                  Patent Filings & IPR Activities
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  VCET actively promotes intellectual property creation among faculty and students.
                  The institution has established a structured IPR cell that facilitates patent
                  drafting, filing, and prosecution, encouraging innovation-driven research outcomes.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  The college regularly conducts IPR awareness workshops, patent search sessions,
                  and mentoring programs to help researchers protect their inventions and
                  innovations through appropriate IP mechanisms.
                </p>
              </div>

              {/* Image Placeholder */}
              <div className="reveal">
                <div className="aspect-[4/3] bg-brand-light rounded-2xl border border-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-brand-blue/20 to-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Shield className="w-8 h-8 text-brand-blue/40" />
                    </div>
                    <p className="text-xs text-slate-400">patents.jpg</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-gradient-to-r from-brand-dark via-brand-blue to-brand-navy">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <div
                  key={stat.label}
                  className="reveal text-center"
                  style={{ transitionDelay: `${idx * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-brand-gold" />
                  </div>
                  <p className="text-2xl font-display font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/60 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* IPR Activities */}
      <section className="py-16 bg-brand-light">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="reveal text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-navy mb-3">
                IPR Activities at VCET
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                Comprehensive support for intellectual property creation and protection
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {iprActivities.map((activity, idx) => (
                <div
                  key={idx}
                  className="reveal flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-brand-gold/30 hover:shadow-sm transition-all duration-300"
                  style={{ transitionDelay: `${idx * 0.06}s` }}
                >
                  <CheckCircle className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-700 font-medium">{activity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Patents;
