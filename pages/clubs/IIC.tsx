import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { Lightbulb, Award, Rocket, Users, Calendar, Star, CheckCircle } from 'lucide-react';

const activities = [
  {
    icon: Lightbulb,
    title: 'Innovation & Ideation',
    description: 'Regular ideation workshops, brainstorming sessions, and innovation challenges to nurture creative thinking among students.',
  },
  {
    icon: Rocket,
    title: 'Hackathons & Competitions',
    description: 'Organizing and participating in hackathons like Smart India Hackathon (SIH), Toycathon, and internal innovation challenges.',
  },
  {
    icon: Award,
    title: 'IPR & Patent Support',
    description: 'Workshops on intellectual property rights, patent drafting, and filing support for innovative ideas and inventions.',
  },
  {
    icon: Users,
    title: 'Mentoring & Incubation',
    description: 'Start-up mentoring, pre-incubation support, and connections with investors and industry mentors for aspiring entrepreneurs.',
  },
  {
    icon: Star,
    title: 'Seminars & Guest Lectures',
    description: 'Expert talks by successful entrepreneurs, innovators, and industry leaders to inspire and motivate students.',
  },
  {
    icon: Calendar,
    title: 'Annual Innovation Week',
    description: 'A week-long celebration of innovation featuring exhibitions, poster presentations, and prototype demonstrations.',
  },
];

const iicHighlights = [
  'Established under the Ministry of Education, Government of India',
  'Star rating awarded by MoE Innovation Cell for consistent performance',
  'Conducted 40+ innovation and entrepreneurship activities',
  'Active participation in Smart India Hackathon (SIH)',
  'Mentoring student start-ups and incubation support',
  'Collaboration with AICTE, MIC, and startup ecosystem partners',
];

const IIC: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Institution's Innovation Council (IIC)"
        breadcrumbs={[
          { label: 'Research', href: '/research' },
          { label: 'IIC' },
        ]}
      />

      {/* Introduction */}
      <section className="py-8 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Image Placeholder */}
              <div className="reveal">
                <div className="aspect-[4/3] bg-brand-light rounded-2xl border border-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-brand-blue/20 to-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Lightbulb className="w-8 h-8 text-brand-blue/40" />
                    </div>
                    <p className="text-xs text-slate-400">iic.jpg</p>
                  </div>
                </div>
              </div>

              <div className="reveal" style={{ transitionDelay: '0.1s' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-0.5 bg-brand-gold" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                    Innovation Council
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-navy mb-4">
                  IIC at VCET
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  The Institution's Innovation Council (IIC) at VCET has been established under the
                  Ministry of Education's Innovation Cell (MIC), Government of India. The IIC aims
                  to systematically foster the culture of innovation among students and faculty by
                  conducting various innovation and entrepreneurship-related activities.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  VCET's IIC has been consistently performing with high ratings, organizing numerous
                  hackathons, ideation workshops, seminars, and startup mentoring programs that
                  empower students to transform their innovative ideas into impactful solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IIC Highlights */}
      <section className="py-16 bg-brand-light">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="reveal text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-navy mb-3">
                IIC Highlights
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                Key achievements and milestones of VCET's Innovation Council
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {iicHighlights.map((item, idx) => (
                <div
                  key={idx}
                  className="reveal flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-brand-gold/30 hover:shadow-sm transition-all duration-300"
                  style={{ transitionDelay: `${idx * 0.06}s` }}
                >
                  <CheckCircle className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-700 font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Activities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="reveal text-center mb-14">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-navy mb-3">
                Innovation Activities
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Activities and programs conducted by IIC to foster innovation and entrepreneurship
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.map((activity, idx) => (
                <div
                  key={activity.title}
                  className="reveal bg-brand-light rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-500"
                  style={{ transitionDelay: `${idx * 0.08}s` }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-blue to-brand-navy rounded-xl flex items-center justify-center mb-4">
                    <activity.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-brand-navy text-lg mb-2">
                    {activity.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{activity.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default IIC;
