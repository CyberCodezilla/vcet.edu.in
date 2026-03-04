import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { Quote } from 'lucide-react';

const PresidentsDesk: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="President's Desk"
        breadcrumbs={[
          { label: 'About Us', href: '/about-us' },
          { label: "President's Desk" },
        ]}
      />

      <section className="py-16 md:py-24 bg-gradient-to-b from-brand-light/30 via-white to-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 items-start">

              {/* Profile Card */}
              <div className="reveal">
                <div className="sticky top-32">
                  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                    {/* Photo Placeholder */}
                    <div className="aspect-[3/4] bg-gradient-to-br from-brand-blue/10 to-brand-gold/10 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-white/60 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-3xl font-display font-bold text-brand-blue/30">VV</span>
                        </div>
                        <p className="text-xs text-slate-400">president-vikas-vartak.jpg</p>
                      </div>
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-display font-bold text-brand-navy">Mr. Vikas Vartak</h3>
                      <p className="text-sm text-brand-gold font-semibold mt-1">President</p>
                      <p className="text-xs text-slate-400 mt-0.5">Vidyavardhini Education Society</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="md:col-span-2 space-y-6 bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">
                {/* Decorative Quote */}
                <div className="reveal flex items-start gap-4">
                  <Quote className="w-10 h-10 text-brand-gold/30 flex-shrink-0 rotate-180" />
                  <p className="text-xl md:text-2xl font-display font-semibold text-brand-navy leading-snug italic">
                    The main aim of the college is to help students grow in all the aspects.
                  </p>
                </div>

                <div className="h-px bg-gradient-to-r from-brand-gold/30 to-transparent my-6" />

                <div className="space-y-5 reveal" style={{ transitionDelay: '0.1s' }}>
                  <p className="text-slate-600 leading-relaxed">
                    Vidyavardhini's College of Engineering and Technology is located in Vasai at a
                    very short distance from Vasai Railway Station. The college is affiliated to
                    University of Mumbai and offers Bachelor's degree in Engineering course.
                  </p>

                  <p className="text-slate-600 leading-relaxed">
                    We have experienced and well qualified faculties who are always supportive to students.
                    Well equipped lab facility of college helps students in gaining practical
                    knowledge. College always encourages students to take part in all the extra
                    curricular and co-curricular activities.
                  </p>

                  <p className="text-slate-600 leading-relaxed">
                    We have our various committees for students such as Ethan, Solecthon, etc. wherein students can participate and enhance their
                    skills. Placement and Training Cell of college enables students to have offers
                    from world's biggest IT as well as core companies. It also provides students with
                    necessary prerequisite training for placements and interviews by experienced and
                    well qualified faculties.
                  </p>

                  <p className="text-slate-600 leading-relaxed">
                    With the help of our Placement and Training cell, many
                    students have received offers from well known companies such as Byjus, TCS,
                    Infosys, etc.
                  </p>

                  <p className="text-slate-600 leading-relaxed">
                    Alumni of Vidyavardhini's College of Engineering and Technology have excelled in
                    their career and extended their thanks to college for their growth.
                    Vidyavardhini's College of Engineering and Technology is excellent choice for your career
                    and growth.
                  </p>
                </div>

                {/* Signature area */}
                <div className="reveal pt-6 border-t border-gray-100" style={{ transitionDelay: '0.2s' }}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-0.5 bg-brand-gold" />
                    <div>
                      <p className="font-display font-bold text-brand-navy">Mr. Vikas Vartak</p>
                      <p className="text-sm text-brand-gold">President, Vidyavardhini Education Society</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default PresidentsDesk;
