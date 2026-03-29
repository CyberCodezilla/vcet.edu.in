import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';

const bestPracticeCards = [
  {
    title: 'BEST PRACTICE - 1',
    href: 'https://vcet.edu.in/NAAC/7/7.2.1_Best_Practices_1_and_Supporting_Document.pdf',
  },
  {
    title: 'BEST PRACTICE - 2',
    href: 'https://vcet.edu.in/NAAC/7/7.2.1_Best_Practices_2_and_Supporting_Document_signed.pdf',
  },
  {
    title: 'INSTITUTIONAL DISTINCTIVENESS',
    href: 'https://vcet.edu.in/NAAC/7/7.3.1_Institutional_Distintiveness_r1_signed.pdf',
  },
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

      <section className="py-10 md:py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bestPracticeCards.map((card) => (
                <a
                  key={card.title}
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={card.title}
                  className="reveal group flex items-center gap-5 rounded-xl bg-brand-navy px-5 py-4 shadow-[0_10px_25px_rgba(15,23,42,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(15,23,42,0.22)]"
                >
                  <span className="h-12 w-1.5 rounded-full bg-brand-gold flex-shrink-0" />
                  <span className="text-[13px] sm:text-sm font-bold uppercase tracking-[0.12em] text-white">
                    {card.title}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default BestPractices;
