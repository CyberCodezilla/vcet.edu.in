import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { Award, Star, Lightbulb, Target, Heart, BookOpen, TrendingUp, Leaf } from 'lucide-react';

const bestPractices = [
  {
    icon: BookOpen,
    title: 'Outcome-Based Education',
    description: 'Implementation of OBE framework across all programs ensuring alignment of curriculum with learning outcomes and industry needs. CO-PO mapping and attainment analysis for continuous improvement.',
  },
  {
    icon: Target,
    title: 'Research Culture Promotion',
    description: 'Fostering a vibrant research culture through internal funding, research conventions, faculty development programs, and collaboration with industry and academic institutions.',
  },
  {
    icon: Heart,
    title: 'Holistic Student Development',
    description: 'Beyond academics, emphasis on personality development, soft skills training, sports, cultural activities, and community service through NSS, clubs, and professional societies.',
  },
  {
    icon: Leaf,
    title: 'Green Campus Initiative',
    description: 'Commitment to environmental sustainability through solar energy adoption, rainwater harvesting, waste management, tree plantation drives, and IGBC green building practices.',
  },
  {
    icon: TrendingUp,
    title: 'Industry-Institute Partnership',
    description: 'Strengthening industry connections through MoUs, guest lectures, industrial visits, internships, and collaborative projects for real-world exposure.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation & Entrepreneurship',
    description: 'Nurturing innovation through hackathons, startup incubation, IIC activities, and E-Cell initiatives encouraging students to develop entrepreneurial mindset.',
  },
];

const distinctivenessPoints = [
  'Strong emphasis on value-based education aligned with institutional vision and mission',
  'Dedicated focus on research and innovation with annual research conventions',
  'Comprehensive mentoring system ensuring personalized attention to every student',
  'Active alumni network contributing to institutional development and student placements',
  'Robust grievance redressal mechanism ensuring transparency and accountability',
  'Integration of ICT tools in teaching-learning for enhanced student engagement',
  'Community engagement through NSS, outreach programs, and social responsibility initiatives',
  'Continuous faculty development through FDPs, workshops, and research grants',
];

const BestPractices: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Best Practices & Institutional Distinctiveness"
        breadcrumbs={[
          { label: 'NAAC', href: '#' },
          { label: 'Best Practices' },
        ]}
      />

      {/* Best Practices */}
      <section className="py-8 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14 reveal">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">Quality Practices</span>
                <div className="w-8 h-0.5 bg-brand-gold" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-navy">
                Best Practices
              </h2>
              <p className="text-slate-500 mt-3 max-w-2xl mx-auto text-sm">
                VCET has adopted several best practices that contribute to the overall quality enhancement
                of the institution and student development.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {bestPractices.map((practice, idx) => (
                <div
                  key={idx}
                  className="reveal group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-500"
                  style={{ transitionDelay: `${Math.min(idx * 0.05, 0.4)}s` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/5 flex items-center justify-center mb-4 group-hover:bg-brand-gold/10 transition-colors duration-300">
                    <practice.icon className="w-5 h-5 text-brand-blue/60 group-hover:text-brand-gold transition-colors duration-300" />
                  </div>
                  <h3 className="text-sm font-semibold text-brand-navy mb-2 font-display">{practice.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{practice.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Distinctiveness */}
      <section className="py-8 md:py-16 lg:py-24 bg-brand-light">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14 reveal">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">Distinctiveness</span>
                <div className="w-8 h-0.5 bg-brand-gold" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-navy">
                Institutional Distinctiveness
              </h2>
              <p className="text-slate-500 mt-3 max-w-xl mx-auto text-sm">
                Key aspects that make VCET stand out as an institution committed to excellence.
              </p>
            </div>

            <div className="space-y-3">
              {distinctivenessPoints.map((point, idx) => (
                <div
                  key={idx}
                  className="reveal flex items-start gap-4 bg-white rounded-xl p-4 hover:shadow-md transition-all duration-300"
                  style={{ transitionDelay: `${Math.min(idx * 0.04, 0.4)}s` }}
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Star className="w-4 h-4 text-brand-gold" />
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default BestPractices;
