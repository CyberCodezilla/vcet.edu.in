import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { Quote, GraduationCap, Briefcase, Users, Star } from 'lucide-react';

const highlights = [
  { icon: GraduationCap, value: 'Ph.D.',    label: 'Doctorate Holder' },
  { icon: Briefcase,     value: '20+',      label: 'Years of Experience' },
  { icon: Users,         value: '3000+',    label: 'Students Guided' },
  { icon: Star,          value: 'NAAC B++', label: 'Accredited Institution' },
];

const PrincipalsDesk: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Principal's Desk"
        breadcrumbs={[

          { label: "Principal's Desk" },
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
            <div className="reveal flex items-center gap-3 mb-6 md:mb-8">
              <div className="w-8 h-0.5 bg-brand-gold" />
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-brand-gold">
                Message from the Principal
              </span>
            </div>

            {/* Mobile-first layout: flex-col on mobile, float-left card on lg */}
            <div className="reveal flex flex-col lg:block">

              {/* ── Profile Card ── */}
              <div className="w-full sm:w-72 lg:float-left lg:mr-8 mb-6 flex-shrink-0 mx-auto">
                {/* Gold outer glow border */}
                <div className="rounded-3xl p-[2.5px] bg-gradient-to-br from-yellow-300 via-brand-gold to-yellow-500 shadow-[0_0_40px_6px_rgba(253,184,19,0.4)]">
                  <div className="bg-white rounded-[22px] overflow-hidden">

                    {/* ── Photo — clean, no overlay text ── */}
                    <div className="relative w-full overflow-hidden bg-brand-light" style={{ height: '280px' }}>
                      {/* Subtle shine sweep */}
                      <div
                        className="absolute inset-0 z-10 pointer-events-none"
                        style={{ background: 'linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.12) 52%, transparent 68%)' }}
                      />
                      <img
                        src="/Images/principal-photo.jpg"
                        alt="Dr. Rakesh Himte – Principal, VCET"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    {/* ── Info panel ── */}
                    <div className="px-5 py-4 bg-gradient-to-b from-white to-amber-50/40">
                      {/* Name + badge */}
                      <div className="text-center mb-3">
                        <h3 className="text-xl font-display font-extrabold text-brand-navy leading-tight">
                          Dr. Rakesh Himte
                        </h3>
                        <div className="mt-2 inline-flex items-center gap-2 bg-gradient-to-r from-yellow-300 via-brand-gold to-yellow-400 px-4 py-1.5 rounded-full shadow-md shadow-brand-gold/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-navy/60" />
                          <span className="text-[11px] font-black text-brand-navy uppercase tracking-[0.22em]">Principal</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 font-semibold text-center mb-3 leading-snug">
                        Vidyavardhini's College of Engineering &amp; Technology, Vasai
                      </p>
                      <div className="h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent mb-3" />
                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="bg-white border border-brand-gold/25 rounded-xl p-3 shadow-sm">
                          <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">Qualification</p>
                          <p className="text-base font-extrabold text-brand-navy">Ph.D.</p>
                        </div>
                        <div className="bg-white border border-brand-gold/25 rounded-xl p-3 shadow-sm">
                          <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">Experience</p>
                          <p className="text-base font-extrabold text-brand-navy">20+ Yrs</p>
                        </div>
                        <div className="col-span-2 bg-gradient-to-r from-amber-50 to-yellow-50 border border-brand-gold/30 rounded-xl p-3 shadow-sm">
                          <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">Affiliated To</p>
                          <p className="text-sm font-bold text-brand-navy leading-snug">Mumbai University, Maharashtra</p>
                        </div>
                      </div>
                    </div>

                    {/* Gold shimmer bar */}
                    <div className="h-2 bg-gradient-to-r from-yellow-300 via-brand-gold to-yellow-400" />
                  </div>
                </div>
              </div>

              {/* ── Pull-quote ── */}
              <div className="relative bg-gradient-to-br from-brand-navy to-brand-blue rounded-2xl p-6 overflow-hidden shadow-lg mb-6">
                <div className="absolute -top-2 right-4 opacity-[0.06] select-none pointer-events-none">
                  <Quote className="w-24 h-24 text-white" />
                </div>
                <Quote className="w-6 h-6 text-brand-gold mb-3" />
                <p className="text-lg md:text-xl font-display font-semibold text-white leading-relaxed">
                  Our cherished motto is the 'overall empowerment of students' for their all-round development.
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-6 h-px bg-brand-gold/60" />
                  <p className="text-xs font-semibold text-brand-gold/90 tracking-wide">Dr. Rakesh Himte</p>
                </div>
              </div>

              {/* ── Flowing prose ── */}
              <div className="space-y-4 text-slate-700 leading-[1.85] text-[15px]">
                <p>
                  As a proud VCETite, our cherished motto is the{' '}
                  <em className="not-italic font-semibold text-brand-navy">'overall empowerment of students'</em>{' '}
                  for their all-round development. Today, education means much more than merely acquiring knowledge —
                  our focus has always been on building character, honing skills, and improving the employability
                  of our young talent. VCET's culture and the strong foundation it provides have assisted
                  students in achieving their educational objectives and ensuring a brighter future.
                </p>
                <p>
                  On the academic front, we maintained our reputation and renewed our commitment to consistency
                  in the years ahead. At the infrastructure level, the Ground and 1st Floors have been renovated,
                  with work on remaining floors underway — changes that have meaningfully elevated the ambience of VCET.
                </p>
                <p>
                  We also wholeheartedly responded to the government's appeal for community service by launching{' '}
                  <strong className="font-semibold text-brand-blue">'UDAAN'</strong>, our community services wing.
                  Under the 'Swachha Bhaarat Abhiyaan', we spread awareness and worked to keep our surroundings
                  clean and green. A clothes donation campaign benefited Anand Ashram-Vasai and Dadasaheb Tatke
                  Ashram-Thane, while volunteers taught Maths and English to students at Swagat Ashram Orphanage,
                  Malad. A street play titled{' '}
                  <strong className="font-semibold text-brand-blue">"#RespectHer"</strong> helped us realise our
                  social responsibilities and the true meaning of being an 'Indian'.
                </p>
                <p>
                  On the placement front, the Training and Placement Committee set a high placement record this
                  year, earning glowing feedback from industry stalwarts. The collective effort of management,
                  teaching and non-teaching staff, and students has been the backbone of this success — and it
                  makes me immensely proud to lead this wonderful institution.
                </p>
              </div>

              {/* ── Closing quote — appears after float clears ── */}
              <div className="clear-both mt-6">
                <div className="bg-brand-light border border-brand-gold/20 rounded-2xl px-7 py-5 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-brand-gold to-brand-blue" />
                  <p className="text-slate-700 leading-[1.85] text-[15px] italic">
                    "I appeal to all of you one more time — give your best and make VCET one of the finest learning
                    centres among its peers. I wish you all good luck and greater success in your future endeavours.
                    Proud VCETites, keep that energy and spirit alive as we write more success stories together."
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Highlights Strip ── */}
      <section className="py-14 bg-gradient-to-r from-brand-dark via-brand-blue to-brand-navy">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {highlights.map((h, i) => (
                <div
                  key={h.label}
                  className="reveal flex flex-col items-center text-center"
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center mb-3 ring-1 ring-white/10">
                    <h.icon className="w-5 h-5 text-brand-gold" />
                  </div>
                  <p className="text-white font-display font-bold text-2xl">{h.value}</p>
                  <p className="text-white/60 text-sm mt-1 tracking-wide">{h.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default PrincipalsDesk;
