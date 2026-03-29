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

          { label: "President's Desk" },
        ]}
      />

      <section className="relative py-8 md:py-16 lg:py-24 bg-white overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-2/3 h-full bg-[radial-gradient(ellipse_at_top_right,rgba(212,168,67,0.06),transparent_60%)]" />
          <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-[radial-gradient(ellipse_at_bottom_left,rgba(27,58,92,0.04),transparent_60%)]" />
          <div
            className="absolute inset-0 opacity-[0.018]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,0,0,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,1) 1px,transparent 1px)',
              backgroundSize: '52px 52px',
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="max-w-5xl mx-auto">

            {/* Eyebrow */}
            <div className="reveal flex items-center gap-3 mb-6 md:mb-10">
              <div className="w-8 h-0.5 bg-brand-gold" />
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-brand-gold">
                Message from the President
              </span>
            </div>

            <div className="flex flex-col lg:flex-row gap-10 xl:gap-14 items-start">

              {/* ── Profile Card ── */}
              <div className="reveal w-full lg:w-72 flex-shrink-0">
                <div className="sticky top-28">
                  {/* Gold glow border */}
                  <div className="rounded-3xl p-[2.5px] bg-gradient-to-br from-yellow-300 via-brand-gold to-yellow-500 shadow-[0_0_40px_6px_rgba(253,184,19,0.4)]">
                    <div className="bg-white rounded-[22px] overflow-hidden">

                      {/* Photo — clean, no overlay text */}
                      <div className="relative w-full overflow-hidden bg-brand-light" style={{ height: '280px' }}>
                        {/* Subtle shine sweep */}
                        <div
                          className="absolute inset-0 z-10 pointer-events-none"
                          style={{ background: 'linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.12) 52%, transparent 68%)' }}
                        />
                        <img
                          src="/Images/president-photo.jpg"
                          alt="Mr. Vikas Vartak – President, Vidyavardhini Education Society"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>

                      {/* Info panel */}
                      <div className="px-5 py-4 bg-gradient-to-b from-white to-amber-50/40">
                        {/* Name + badge */}
                        <div className="text-center mb-3">
                          <h3 className="text-xl font-display font-extrabold text-brand-navy leading-tight">
                            Mr. Vikas Vartak
                          </h3>
                          <div className="mt-2 inline-flex items-center gap-2 bg-gradient-to-r from-yellow-300 via-brand-gold to-yellow-400 px-4 py-1.5 rounded-full shadow-md shadow-brand-gold/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-navy/60" />
                            <span className="text-[11px] font-black text-brand-navy uppercase tracking-[0.22em]">President</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500 font-semibold text-center mb-3 leading-snug">
                          Vidyavardhini Education Society
                        </p>
                        <div className="h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent mb-3" />
                        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-brand-gold/30 rounded-xl p-3 shadow-sm text-center">
                          <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">Affiliated To</p>
                          <p className="text-sm font-bold text-brand-navy leading-snug">University of Mumbai, Maharashtra</p>
                        </div>
                      </div>

                      {/* Gold shimmer bar */}
                      <div className="h-2 bg-gradient-to-r from-yellow-300 via-brand-gold to-yellow-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Message Content ── */}
              <div className="flex-1 min-w-0">

                {/* Pull-quote card */}
                <div className="reveal relative bg-gradient-to-br from-brand-navy to-brand-blue rounded-2xl p-6 overflow-hidden shadow-lg mb-8">
                  <div className="absolute -top-2 right-4 opacity-[0.06] select-none pointer-events-none">
                    <Quote className="w-24 h-24 text-white" />
                  </div>
                  <Quote className="w-6 h-6 text-brand-gold mb-3" />
                  <p className="text-lg md:text-xl font-display font-semibold text-white leading-relaxed">
                    The main aim of the college is to help students grow in all aspects of life.
                  </p>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="w-6 h-px bg-brand-gold/60" />
                    <p className="text-xs font-semibold text-brand-gold/90 tracking-wide">Mr. Vikas Vartak</p>
                  </div>
                </div>

                {/* Prose */}
                <div className="reveal space-y-4 text-slate-700 leading-[1.85] text-[15px]" style={{ transitionDelay: '0.1s' }}>
                  <p>
                    Vidyavardhini's College of Engineering and Technology is located in Vasai, just
                    a short distance from Vasai Railway Station. Affiliated to the University of Mumbai,
                    the college offers Bachelor's degree programmes in Engineering, combining strong
                    academics with a vibrant campus culture.
                  </p>
                  <p>
                    Our experienced and well-qualified faculty are always supportive, and our
                    well-equipped laboratories ensure students gain hands-on practical knowledge.
                    The college actively encourages participation in extracurricular and co-curricular
                    activities through various student committees, helping every student develop
                    holistically.
                  </p>
                  <p>
                    Our Placement and Training Cell prepares students for the professional world through
                    rigorous training and connects them with leading IT and core engineering companies.
                    Alumni of VCET have secured positions at organisations such as TCS, Infosys, and Byju's,
                    and continue to credit the institution for their growth and success.
                  </p>
                </div>

                {/* Closing quote */}
                <div className="reveal mt-8" style={{ transitionDelay: '0.2s' }}>
                  <div className="bg-brand-light border border-brand-gold/20 rounded-2xl px-7 py-5 relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-brand-gold to-brand-blue" />
                    <p className="text-slate-700 leading-[1.85] text-[15px] italic">
                      "Vidyavardhini's College of Engineering and Technology is an excellent choice for
                      your career and growth. We remain committed to shaping the engineers and leaders
                      of tomorrow."
                    </p>
                    <div className="flex items-center gap-3 mt-4">
                      <div className="w-8 h-0.5 bg-brand-gold" />
                      <div>
                        <p className="font-display font-bold text-brand-navy text-sm">Mr. Vikas Vartak</p>
                        <p className="text-xs text-brand-gold font-semibold">President, Vidyavardhini Education Society</p>
                      </div>
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
