import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { BookOpen, ExternalLink } from 'lucide-react';

const HonoursMinor = () => {
  const booklets = [
    {
      title: 'Honours / Minor Degree Program - Booklet Part 1',
      description: 'Program structure, framework, and implementation guidelines.',
      href: '/pdfs/Academics/Honours-Minor-Degree-Program/Honours-Minor-Degree-Program-_Booklet_Part-1-Final.pdf',
    },
    {
      title: 'Honours / Minor Degree Program - Booklet Part 2',
      description: 'Detailed syllabus for Honours and Minor degree pathways.',
      href: '/pdfs/Academics/Honours-Minor-Degree-Program/Honours-Minor-Degree-Program-Booklet-_Part-2_Detailed-Syllabus-Final.pdf',
    },
  ];

  return (
    <PageLayout>
      <PageBanner
        title="Honours / Minor Degree Program"
        breadcrumbs={[{ label: 'Honours / Minor Degree Program' }]}
      />

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="reveal text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-10 h-0.5 bg-brand-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">Academics</span>
              <span className="w-10 h-0.5 bg-brand-gold" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy">Program Booklets</h2>
            <p className="text-slate-600 mt-3 max-w-3xl mx-auto leading-relaxed">
              Refer the official VCET booklet documents for structure and detailed syllabus of
              Honours and Minor degree programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {booklets.map((item, idx) => (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="reveal group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-brand-gold/60 transition-all"
                style={{ transitionDelay: `${idx * 0.06}s` }}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-brand-navylight flex items-center justify-center text-brand-navy group-hover:bg-brand-navy group-hover:text-white transition-colors">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <ExternalLink className="w-4 h-4 text-brand-gold flex-shrink-0" />
                </div>
                <h3 className="text-lg font-bold text-brand-navy leading-snug">{item.title}</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">{item.description}</p>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-gold mt-4">PDF Document</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default HonoursMinor;
