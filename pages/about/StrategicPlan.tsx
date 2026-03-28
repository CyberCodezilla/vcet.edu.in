import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { FileText, Download, Calendar } from 'lucide-react';

interface PlanDocument {
  label: string;
  year: string;
  url: string;
}

const plans: PlanDocument[] = [
  {
    label: 'Strategic Plan 2025–2029',
    year: '2025–2029',
    url: 'https://vcet.edu.in/wp-content/uploads/2024/04/Strategitc-Plan-2025-29.pdf',
  },
  {
    label: 'Strategic Plan 2024–25',
    year: '2024–25',
    url: 'https://vcet.edu.in/wp-content/uploads/2024/04/Strategitc-Plan-2024-25.pdf',
  },
  {
    label: 'Strategic Plan 2023–24',
    year: '2023–24',
    url: 'https://vcet.edu.in/wp-content/uploads/2024/04/Strategitc-Plan-2023-24.pdf',
  },
  {
    label: 'Strategic Plan 2022–23',
    year: '2022–23',
    url: 'https://vcet.edu.in/wp-content/uploads/2024/04/Strategitc-Plan-2022-23.pdf',
  },
  {
    label: 'Strategic Plan 2021–22',
    year: '2021–22',
    url: 'https://vcet.edu.in/wp-content/uploads/2024/04/Strategitc-Plan-2021-22-1.pdf',
  },
  {
    label: 'Strategic Plan 2020–21',
    year: '2020–21',
    url: 'https://vcet.edu.in/wp-content/uploads/2024/04/Strategitc-Plan-2020-21.pdf',
  },
];

const StrategicPlan: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Strategic Plan"
        breadcrumbs={[

          { label: 'Strategic Plan' },
        ]}
      />

      <section className="py-8 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <div className="reveal text-center mb-8 md:mb-14">
              <div className="flex items-center justify-center gap-3 mb-3 md:mb-4">
                <div className="w-8 md:w-10 h-0.5 bg-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                  Documents
                </span>
                <div className="w-8 md:w-10 h-0.5 bg-brand-gold" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-brand-navy">
                Download Strategic Plans
              </h2>
              <p className="text-slate-500 mt-2 md:mt-3 max-w-xl mx-auto text-sm md:text-base">
                Access VCET's strategic plans outlining our vision, goals, and roadmap for academic excellence
              </p>
            </div>

            {/* Download Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {plans.map((plan, idx) => (
                <a
                  key={plan.year}
                  href={plan.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reveal group"
                  style={{ transitionDelay: `${idx * 0.08}s` }}
                >
                  <div className="flex items-center gap-4 p-5 bg-brand-light rounded-2xl border border-gray-100 hover:border-brand-gold/40 hover:shadow-lg transition-all duration-500 h-full">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-brand-blue to-brand-navy flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <FileText className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-bold text-brand-navy group-hover:text-brand-blue transition-colors duration-300">
                        {plan.label}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                        <span className="text-xs text-slate-400">{plan.year}</span>
                      </div>
                    </div>

                    {/* Download Icon */}
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center group-hover:bg-brand-gold group-hover:border-brand-gold transition-all duration-300">
                      <Download className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Info Note */}
            <div className="reveal mt-10 text-center" style={{ transitionDelay: '0.5s' }}>
              <p className="text-xs text-slate-400">
                All documents are in PDF format. Click to download or open in a new tab.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default StrategicPlan;
