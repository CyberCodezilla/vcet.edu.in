import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { Target, Eye, BookOpen, Award, MapPin, Calendar, Building2, BadgeCheck } from 'lucide-react';

const AboutVCET: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="About VCET"
        breadcrumbs={[
          { label: 'About Us', href: '/about-us' },
          { label: 'About VCET' },
        ]}
      />

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-brand-light/30 via-white to-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Left: Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Introduction */}
              <div className="reveal bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
                <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
                  Vidyavardhini means a Body committed to enhancement of Knowledge. Vidyavardhini
                  was established as a registered society in 1970 by late <span className="font-semibold text-brand-blue">Padmashri H. G. alias
                  Bhausaheb Vartak</span> for the noble cause of education in rural areas.
                </p>
              </div>

              <div className="reveal" style={{ transitionDelay: '0.1s' }}>
                <p className="text-base text-slate-500 leading-relaxed">
                  Vidyavardhini's College of Engineering and Technology, Vasai is located on the
                  sprawling campus of Vidyavardhini, spread over an area of <strong className="text-brand-blue">12.27 acres</strong>. It is a
                  short, two minutes walk from Vasai Road (W) Railway Station. The college is also
                  accessible by road from Mumbai.
                </p>
              </div>

              <div className="reveal" style={{ transitionDelay: '0.15s' }}>
                <p className="text-base text-slate-500 leading-relaxed">
                  Vidyavardhini Society received approval from AICTE to start the new college of
                  Engineering & Technology with effect from July, 1994. The college is affiliated
                  to the University of Mumbai for the four year degree program leading to the
                  degree of Bachelor of Engineering.
                </p>
              </div>

              {/* Image Placeholder */}
              <div className="reveal rounded-2xl overflow-hidden bg-brand-light h-[300px] md:h-[400px] flex items-center justify-center border border-gray-100" style={{ transitionDelay: '0.2s' }}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-brand-blue/40" />
                  </div>
                  <p className="text-sm font-medium text-slate-400">VCET Campus Aerial View</p>
                  <p className="text-xs text-slate-300 mt-1">about-vcet-campus.jpg</p>
                </div>
              </div>

              {/* Quick Facts */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 reveal" style={{ transitionDelay: '0.25s' }}>
                  {[
                    { icon: Calendar, value: '1994', label: 'Established' },
                    { icon: MapPin, value: '12.27', label: 'Campus Area (Acres)' },
                    { icon: Building2, value: 'Mumbai University', label: 'Affiliation' },
                    { icon: BadgeCheck, value: 'AICTE', label: 'Approved By' },
                  ].map((stat, idx) => (
                  <div key={idx} className="bg-brand-light rounded-xl p-5 text-center group hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <stat.icon className="w-5 h-5 mx-auto mb-2 text-brand-gold group-hover:text-brand-blue transition-colors duration-300" />
                    <span className={`font-bold text-brand-navy block ${stat.value.length > 10 ? 'text-sm md:text-base' : 'text-2xl'}`}>{stat.value}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mt-1 block">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-8">
              {/* Vision */}
              <div className="reveal bg-gradient-to-br from-brand-blue to-brand-navy rounded-2xl p-8 text-white" style={{ transitionDelay: '0.1s' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <Eye className="w-5 h-5 text-brand-gold" />
                  </div>
                  <h3 className="text-lg font-display font-bold">Vision</h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  To be a premier institution of technical education, aiming at becoming a
                  valuable resource for industry and society.
                </p>
              </div>

              {/* Mission */}
              <div className="reveal bg-brand-light rounded-2xl p-8" style={{ transitionDelay: '0.2s' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-brand-blue/10 rounded-xl flex items-center justify-center">
                    <Target className="w-5 h-5 text-brand-blue" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-brand-navy">Mission</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    'To provide technologically inspiring environment for learning.',
                    'To promote creativity, innovation and professional activities.',
                    'To inculcate ethical and moral values.',
                    'To cater personal, professional and societal needs through quality education.',
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold flex-shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Accreditations */}
              <div className="reveal bg-white rounded-2xl p-8 border border-gray-100 shadow-sm" style={{ transitionDelay: '0.3s' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center">
                    <Award className="w-5 h-5 text-brand-gold" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-brand-navy">Accreditations</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    'Approved by AICTE',
                    'DTE Maharashtra',
                    'Affiliated to University of Mumbai',
                    'NBA Accredited',
                    'NAAC Accredited (B++)',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="w-6 h-6 bg-green-50 rounded-md flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-3.5 h-3.5 text-green-500" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AboutVCET;
