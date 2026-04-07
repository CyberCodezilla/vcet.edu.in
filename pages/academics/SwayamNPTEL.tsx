import React from 'react';
import { ExternalLink, Globe, BookOpenCheck } from 'lucide-react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';

type Resource = {
  title: string;
  description: string;
  href: string;
  type: 'Portal' | 'Catalogue' | 'Guidance';
};

const resources: Resource[] = [
  {
    title: 'NPTEL Portal',
    description: 'Official NPTEL home portal for online engineering and interdisciplinary courses.',
    href: 'https://nptel.ac.in/',
    type: 'Portal',
  },
  {
    title: 'SWAYAM Platform',
    description: 'National SWAYAM platform for MOOCs and certified learning opportunities.',
    href: 'https://swayam.gov.in/',
    type: 'Portal',
  },
  {
    title: 'NPTEL Course Catalogue',
    description: 'Browse semester-wise and domain-wise NPTEL course offerings.',
    href: 'https://nptel.ac.in/course.html',
    type: 'Catalogue',
  },
  {
    title: 'NPTEL Local Chapter Information',
    description: 'Institution/local chapter support information and enrollment guidance.',
    href: 'https://nptel.ac.in/localchapter/',
    type: 'Guidance',
  },
];

const SwayamNPTEL: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Swayam - NPTEL"
        breadcrumbs={[{ label: 'Swayam - NPTEL' }]}
      />

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="reveal text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-10 h-0.5 bg-brand-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">National MOOCs</span>
              <span className="w-10 h-0.5 bg-brand-gold" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy">SWAYAM and NPTEL Resources</h2>
            <p className="text-slate-600 mt-3 max-w-3xl mx-auto leading-relaxed">
              Access the official SWAYAM and NPTEL portals for enrollment, course exploration,
              and certification details.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {resources.map((item, idx) => (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="reveal group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-brand-gold/60 transition-all"
                style={{ transitionDelay: `${idx * 0.06}s` }}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-brand-navylight flex items-center justify-center text-brand-navy group-hover:bg-brand-navy group-hover:text-white transition-colors">
                    {item.type === 'Catalogue' ? <BookOpenCheck className="w-5 h-5" /> : <Globe className="w-5 h-5" />}
                  </div>
                  <ExternalLink className="w-4 h-4 text-brand-gold flex-shrink-0" />
                </div>
                <h3 className="text-lg font-bold text-brand-navy leading-snug">{item.title}</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">{item.description}</p>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-gold mt-4">{item.type}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default SwayamNPTEL;
