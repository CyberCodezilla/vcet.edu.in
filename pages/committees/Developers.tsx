import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';

/* ── Data ── */

const professors = [
  {
    name: 'Dr. Yogesh Pingle',
    title: 'PhD, Senior Professor of Computation',
    description:
      'Spearheading the intersection of classical rhetoric and digital systems architecture.',
  },
  {
    name: 'Ashish Gosavi',
    title: 'PhD, Head of Digital Humanities',
    description:
      'Expert in algorithmic ethics and the preservation of global digital heritage.',
  },
  {
    name: 'Nitin',
    title: 'M.Phil, Director of Systems Design',
    description:
      'Leading our proprietary framework development for academic data modeling.',
  },
];

const developers = [
  {
    name: 'Yash Sanil',
    qualification: 'B.E. Computer Science & Engineering(Data Science)',
    role: 'Lead Developer',
  },
  {
    name: 'Yash Dedhia',
    qualification: 'B.E. Computer Science & Engineering(Data Science)',
    role: 'UI Architect',
  },
  {
    name: 'Sahil Karpe',
    qualification: 'B.E. Computer Science & Engineering(Data Science)',
    role: 'Systems Engineer',
  },
  {
    name: 'Shubham Pawar',
    qualification: 'B.E. Computer Science & Engineering(Data Science)',
    role: 'Full Stack Developer',
  },
  {
    name: 'Sahil Rane',
    qualification: 'B.E. Computer Science & Engineering(Data Science)',
    role: 'Data Science Lead',
  },
];

const students = [
  { name: 'Shreya Sawant', role: 'Front-end Apprentice' },
  { name: 'Sumrita Sawant', role: 'Back-end Apprentice' },
  { name: 'Dakshata Salgaonkar', role: 'UI Research' },
  { name: 'Shweta Patil', role: 'QA Engineering' },
  { name: 'Sumit Vishwakarma', role: 'API Design' },
  { name: 'Antariksh Singh', role: 'Database Modeling' },
  { name: 'Pratik Ravale', role: 'DevOps Intern' },
  { name: 'Pranish Shetty', role: 'Security Analyst' },
  { name: 'Rehan Pinjari', role: 'Mobile Systems' },
  { name: 'Priti', role: 'Documentation' },
];

/* ── Component ── */

const Developers: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Website Developers"
        subtitle="Meet the visionaries, developers, and student fellows behind the VCET digital experience."
        breadcrumbs={[
          { label: 'Committees', href: '/developers' },
          { label: 'Website Developers' },
        ]}
      />

      <section className="bg-[radial-gradient(1200px_500px_at_10%_0%,rgba(26,75,124,0.09),transparent),radial-gradient(900px_400px_at_90%_10%,rgba(253,184,19,0.08),transparent),#f5f7fa] py-10 md:py-14">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto space-y-12 md:space-y-16">

            {/* ── Tier 1: Professors ── */}
            <div>
              <div className="text-center mb-10">
                <span className="inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold mb-2">
                  Our Technical Visionaries
                </span>
                <h2 className="font-display text-3xl md:text-4xl text-[#1a4b7c] font-bold">
                  Faculty Mentors
                </h2>
                <div className="w-16 h-1.5 rounded-full bg-brand-gold mx-auto mt-4" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {professors.map((prof, i) => (
                  <div
                    key={i}
                    className="reveal group bg-white border border-[#8ea2b8]/40 shadow-[0_8px_24px_rgba(26,75,124,0.10)] overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(253,184,19,0.22),0_6px_14px_rgba(0,0,0,0.08)]"
                    style={{ transitionDelay: `${i * 0.06}s` }}
                  >
                    {/* Compact square placeholder */}
                    <div className="flex items-center justify-center bg-gradient-to-br from-[#e8eef6] to-[#d0dcea] h-44">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-20 h-20 rounded-full bg-[#1a4b7c]/10 border-2 border-[#1a4b7c]/20 flex items-center justify-center">
                          <svg className="w-10 h-10 text-[#1a4b7c]/40" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                          </svg>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#1a4b7c]/40">Photo</span>
                      </div>
                    </div>
                    <div className="p-6 md:p-8 text-center">
                      <h3 className="font-display text-xl md:text-2xl text-[#1a4b7c] font-bold mb-1">
                        {prof.name}
                      </h3>
                      <p className="text-xs font-bold uppercase tracking-wider text-brand-gold mb-3">
                        {prof.title}
                      </p>
                      <p className="text-[#333] text-sm leading-relaxed">
                        {prof.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Tier 2: Core Developers ── */}
            <div
              className="reveal bg-gradient-to-br from-white to-[#f8fbff] border-2 border-[#8ea2b8] shadow-[0_14px_28px_rgba(26,75,124,0.18),0_4px_10px_rgba(0,0,0,0.06)] p-6 md:p-10 transition-all duration-500"
              style={{ transitionDelay: '0.06s' }}
            >
              <div className="text-center mb-8">
                <div className="w-16 h-1.5 rounded-full bg-brand-gold mx-auto mb-4" />
                <h2 className="font-display text-3xl md:text-4xl text-[#1a4b7c] font-bold">
                  Core Development Team
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                {developers.map((dev, i) => (
                  <div
                    key={i}
                    className={`reveal group bg-white border border-[#8ea2b8]/30 p-6 md:p-8 text-center shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_10px_22px_rgba(253,184,19,0.20)] ${
                      i === 4 ? 'col-span-2 sm:col-span-1 lg:col-span-1' : ''
                    }`}
                    style={{ transitionDelay: `${i * 0.05}s` }}
                  >
                    {/* Large circular placeholder */}
                    <div className="w-32 h-32 rounded-full mx-auto mb-5 border-2 border-brand-gold ring-4 ring-brand-gold/15 bg-gradient-to-br from-[#e8eef6] to-[#d0dcea] flex items-center justify-center">
                      <svg className="w-16 h-16 text-[#1a4b7c]/35" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                      </svg>
                    </div>
                    <h4 className="font-display text-base md:text-lg text-[#1a4b7c] font-bold leading-tight">
                      {dev.name}
                    </h4>
                    <p className="text-[11px] text-[#555] mt-1 mb-3 leading-snug">
                      {dev.qualification}
                    </p>
                    <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider bg-[#143759] text-brand-gold px-3 py-1 rounded-full">
                      {dev.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Tier 3: Student Fellowship ── */}
            <div
              className="reveal bg-white border-2 border-[#7f96ad] shadow-[0_16px_32px_rgba(253,184,19,0.18),0_4px_10px_rgba(0,0,0,0.06)] p-6 md:p-10 transition-all duration-500"
              style={{ transitionDelay: '0.12s' }}
            >
              <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-14">
                {/* Left description */}
                <div className="lg:w-1/3">
                  <div className="w-16 h-1.5 rounded-full bg-brand-gold mb-4" />
                  <h2 className="font-display text-2xl md:text-3xl text-[#1a4b7c] font-bold mb-4">
                    The Student Fellowship
                  </h2>
                  <p className="text-[#333] text-sm leading-relaxed mb-6">
                    Each year, ten exceptional students are selected to apprentice within the
                    team. These developers represent the next generation of academic technical
                    leadership.
                  </p>
                  <span className="inline-flex items-center text-[#1a4b7c] font-bold text-sm group cursor-pointer">
                    <span className="border-b-2 border-brand-gold pb-0.5 transition-all group-hover:pr-3">
                      View Fellowship Program
                    </span>
                    <span className="ml-2 text-brand-gold transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>

                {/* Right grid of names */}
                <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-10">
                  {students.map((student, i) => (
                    <div
                      key={i}
                      className="reveal flex items-center gap-4 py-3.5 border-b border-[#8ea2b8]/20 transition-colors duration-300 hover:bg-[#fdb813]/5"
                      style={{ transitionDelay: `${Math.min(i * 0.03, 0.25)}s` }}
                    >
                      <span className="font-display text-brand-gold text-xl font-bold w-8 flex-shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="font-bold text-[#1a4b7c] text-sm md:text-base leading-tight">
                          {student.name}
                        </p>
                        <p className="text-[10px] uppercase font-bold tracking-wider text-[#555] mt-0.5">
                          {student.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Developers;
