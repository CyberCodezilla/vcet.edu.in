import React from 'react';
import { Quote } from 'lucide-react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';

const introParagraph =
  "It is my pleasure to welcome you to Vidyavardhini's College of Engineering & Technology (VCET), Vasai, an institution committed to academic excellence and overall growth. At VCET, education transforms not only professional ability but also character, confidence, and responsibility.";

const messageParagraphs = [
  "As an autonomous institution, we have academic flexibility to build and adapt our curriculum in response to changing market expectations and emerging technology. This adaptability allows us to offer multidisciplinary electives, value-added programs, and project-based learning experiences that supplement classroom education and improve practical comprehension.",
  "Our academic methodology is underpinned by Outcome-Based Education principles, which ensure that learning outcomes are measurable, relevant, and in line with national quality requirements.",
  "We retain a strong emphasis on academic rigor, which is reinforced by ongoing internal evaluation, transparent assessment processes, and systematic quality audits. Our faculty members use research-based teaching methods that promote critical thinking and analytical abilities. Learning at VCET goes beyond textbooks, with well-equipped laboratories, internships, field trips, and collaborative projects that provide valuable real-world experiences.",
  "Our academic culture values innovation and research. Our Innovation and Entrepreneurship initiatives, and technical groups enable students to experiment with new ideas and discover creative solutions to current problems. Participation in conferences, research publications, and patent-related projects reinforces our commitment to knowledge development and responsible innovation.",
  "In addition, we provide training in soft skills, aptitude development, and new domains such as AI, Data Science, the Internet of Things, and robotics. This comprehensive strategy ensures that our graduates are prepared for both immediate employment and long-term professional advancement.",
  "Our Training and Placement Cell works tirelessly to establish excellent partnerships with reputable businesses across industries. Through specialized training modules, technical workshops, and mock recruiting exercises, we provide students with the confidence and competence they need to succeed in competitive selection processes. Our consistent placement record indicates the industry's trust in our students and the quality of education they get.",
  "At VCET, we try to foster discipline, ethical responsibility, and a spirit of lifelong learning. We are devoted to developing individuals who are technically sound, socially conscious, and ready to make important contributions to society.",
  "I invite aspiring students and stakeholders to join us on this journey of development and achievement. Let us work together to create a future based on knowledge, honesty, creativity, and meaningful action.",
];

const DeanAcademics: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Dean Academics's Desk"
        breadcrumbs={[
          { label: 'Academics', href: '/academics' },
          { label: "Dean Academics's Desk" },
        ]}
      />

      <section className="relative overflow-hidden bg-white py-16 md:py-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 h-full w-2/3 bg-[radial-gradient(ellipse_at_top_right,rgba(212,168,67,0.06),transparent_60%)]" />
          <div className="absolute bottom-0 left-0 h-2/3 w-2/3 bg-[radial-gradient(ellipse_at_bottom_left,rgba(27,58,92,0.05),transparent_60%)]" />
          <div
            className="absolute inset-0 opacity-[0.018]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,0,0,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,1) 1px,transparent 1px)',
              backgroundSize: '52px 52px',
            }}
          />
        </div>

        <div className="container relative mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-start gap-10 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-12">
              <aside className="reveal lg:sticky lg:top-28">
                <div className="group rounded-3xl bg-gradient-to-br from-yellow-300 via-brand-gold to-yellow-500 p-[2.5px] shadow-[0_0_40px_6px_rgba(253,184,19,0.25)] transition-transform duration-500 hover:-translate-y-1">
                  <div className="overflow-hidden rounded-[22px] bg-white">
                    <div className="relative h-[360px] overflow-hidden bg-brand-light">
                      <div
                        className="absolute inset-0 z-10 pointer-events-none"
                        style={{
                          background:
                            'linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.14) 52%, transparent 68%)',
                        }}
                      />
                      <img
                        src="/Images/dean_of_academics.jpeg"
                        alt="Dr. Vikas Gupta, Dean, Academics, VCET"
                        className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>

                    <div className="bg-gradient-to-b from-white to-amber-50/40 px-5 py-5">
                      <h2 className="text-center text-2xl font-display font-extrabold text-brand-navy">
                        Dr. Vikas Gupta
                      </h2>
                      <div className="mt-3 flex justify-center">
                        <span className="inline-flex items-center rounded-full bg-gradient-to-r from-yellow-300 via-brand-gold to-yellow-400 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-brand-navy shadow-md shadow-brand-gold/20">
                          Dean , Academics
                        </span>
                      </div>

                      <div className="my-4 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent" />

                      <div className="space-y-3 text-center">
                        <p className="text-sm font-semibold leading-6 text-brand-navy">
                          Ph D (Electronics and Communication Engineering)
                        </p>
                        <p className="text-sm font-medium leading-6 text-slate-500">
                          Vidyavardhini&apos;s College of Engineering &amp; Technology (VCET), Vasai.
                        </p>
                      </div>
                    </div>

                    <div className="h-2 bg-gradient-to-r from-yellow-300 via-brand-gold to-yellow-400" />
                  </div>
                </div>
              </aside>

              <div className="min-w-0">
                <div className="reveal mb-6 flex items-center gap-3">
                  <div className="h-0.5 w-10 bg-brand-gold" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-brand-gold">
                    Vidyavardhini&apos;s College of Engineering &amp; Technology
                  </span>
                </div>

                <div className="reveal mb-8 rounded-2xl bg-gradient-to-br from-brand-navy via-brand-blue to-brand-navy p-6 shadow-xl">
                  <Quote className="mb-4 h-6 w-6 text-brand-gold" />
                  <p className="text-lg leading-relaxed text-white md:text-xl font-display font-semibold">
                    {introParagraph}
                  </p>
                </div>

                <div
                  className="reveal rounded-[28px] border border-brand-blue/10 bg-white/90 p-6 shadow-[0_30px_80px_-55px_rgba(15,23,42,0.45)] backdrop-blur md:p-8"
                  style={{ transitionDelay: '0.08s' }}
                >
                  <div className="space-y-5 text-[15px] leading-[1.95] text-slate-700">
                    {messageParagraphs.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                <div
                  className="reveal mt-8 overflow-hidden rounded-2xl border border-brand-gold/20 bg-brand-light shadow-sm"
                  style={{ transitionDelay: '0.14s' }}
                >
                  <div className="h-1 w-full bg-gradient-to-r from-brand-gold via-yellow-400 to-brand-blue" />
                  <div className="px-6 py-6 md:px-8">
                    <p className="text-xl font-display font-bold text-brand-navy">Dr. Vikas Gupta</p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                      Ph D (Electronics and Communication Engineering)
                    </p>
                    <p className="text-sm font-semibold leading-6 text-slate-600">Dean , Academics</p>
                    <p className="text-sm font-semibold leading-6 text-slate-600">
                      Vidyavardhini&apos;s College of Engineering &amp; Technology (VCET), Vasai.
                    </p>
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

export default DeanAcademics;
