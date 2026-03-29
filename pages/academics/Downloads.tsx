import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { Download, FileText, ExternalLink, FolderOpen } from 'lucide-react';

const ADMISSION_BROCHURE_URL = '/documents/admissions/vcet-brochure.pdf';

const downloadItems = [
  { title: 'Academic Calendar', category: 'Academics', url: '#' },
  { title: 'Syllabus Documents', category: 'Academics', url: '#' },
  { title: 'Examination Timetable', category: 'Academics', url: '#' },
  { title: 'Research Policy', category: 'Research', url: '#' },
  { title: 'NIRF Data Submission', category: 'Research', url: '#' },
  { title: 'Anti-Ragging Policy', category: 'Administration', url: '#' },
  { title: 'Code of Conduct', category: 'Administration', url: '#' },
  { title: 'Admission Brochure', category: 'Admissions', url: ADMISSION_BROCHURE_URL },
  { title: 'Fee Structure', category: 'Admissions', url: '#' },
  { title: 'Scholarship Forms', category: 'Admissions', url: '#' },
  { title: 'NAAC SSR Report', category: 'Accreditation', url: '#' },
  { title: 'AQAR Report', category: 'Accreditation', url: '#' },
];

const categories = ['All', 'Academics', 'Research', 'Administration', 'Admissions', 'Accreditation'];

const Downloads: React.FC = () => {
  const [activeCategory, setActiveCategory] = React.useState('All');

  const filtered = activeCategory === 'All'
    ? downloadItems
    : downloadItems.filter((item) => item.category === activeCategory);

  return (
    <PageLayout>
      <PageBanner
        title="Downloads"
        breadcrumbs={[
          { label: 'Downloads' },
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
                  Resources
                </span>
                <div className="w-8 md:w-10 h-0.5 bg-brand-gold" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-brand-navy">
                Downloadable Documents
              </h2>
              <p className="text-slate-500 mt-2 md:mt-3 max-w-xl mx-auto text-sm md:text-base">
                Access important documents, forms, and resources from VCET
              </p>
            </div>

            {/* Category Filters */}
            <div className="reveal flex flex-wrap justify-center gap-2 mb-8 md:mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 min-h-[44px] ${
                    activeCategory === cat
                      ? 'bg-gradient-to-r from-brand-blue to-brand-navy text-white shadow-md'
                      : 'bg-brand-light text-slate-600 border border-gray-200 hover:border-brand-gold/40 hover:text-brand-navy'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Download List */}
            <div className="space-y-4">
              {filtered.map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reveal group block"
                  style={{ transitionDelay: `${idx * 0.05}s` }}
                >
                  <div className="flex items-center gap-4 p-5 bg-brand-light rounded-2xl border border-gray-100 hover:border-brand-gold/40 hover:shadow-lg transition-all duration-500">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-brand-navy flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-bold text-brand-navy group-hover:text-brand-blue transition-colors duration-300">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <FolderOpen className="w-3 h-3 text-brand-gold" />
                        <span className="text-xs text-slate-400">{item.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-brand-blue/50 group-hover:text-brand-gold transition-colors duration-300 flex-shrink-0">
                      <Download className="w-5 h-5" />
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-12">
                <FolderOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-400 font-medium">No documents in this category</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Downloads;
