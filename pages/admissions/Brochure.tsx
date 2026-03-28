import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { Download, BookOpen, Image } from 'lucide-react';
import { useAdmissionSection } from '../../hooks/useAdmissionSection';
import { getSectionContentValue } from './admissionSectionUtils';

const BROCHURE_PDF_URL = '/documents/admissions/vcet-brochure.pdf';
const BROCHURE_FILE_NAME = 'vcet-brochure.pdf';

const Brochure: React.FC = () => {
  const { section, error } = useAdmissionSection('brochure');
  const brochureItem = section?.items?.[0];
  const brochureUrl = brochureItem?.document_url || brochureItem?.external_url || BROCHURE_PDF_URL;
  const brochureFileName = brochureItem?.pdf_name || BROCHURE_FILE_NAME;

  return (
    <PageLayout>
      <PageBanner
        title={section?.title || 'Brochure'}
        breadcrumbs={[{ label: 'Brochure' }]}
      />

      <section className="py-8 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          {error && (
            <div className="mx-auto mb-10 max-w-3xl rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-medium text-amber-800">
              Showing the bundled brochure because the live admission API could not be loaded.
            </div>
          )}

          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-14 reveal">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-brand-navy mb-3 md:mb-4">
              {getSectionContentValue(section, 'heading', 'College Brochure')}
            </h2>
            <p className="text-slate-500 text-base md:text-lg leading-relaxed">
              {getSectionContentValue(
                section,
                'intro',
                'Get a comprehensive overview of VCET - our programs, campus, facilities, achievements, and more - all in one place.',
              )}
            </p>
          </div>

          <div className="max-w-3xl mx-auto reveal" style={{ transitionDelay: '0.1s' }}>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 group">
              <div className="relative bg-gradient-to-br from-brand-light to-gray-100 h-[350px] md:h-[480px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(27,58,92,0.04),transparent_70%)]" />
                <div className="absolute top-6 right-6 w-32 h-32 bg-brand-gold/[0.06] rounded-full" />
                <div className="absolute bottom-6 left-6 w-24 h-24 bg-brand-blue/[0.06] rounded-full" />

                <div className="text-center relative z-10">
                  <div className="w-20 h-20 bg-brand-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-500">
                    <Image className="w-10 h-10 text-brand-blue/40" />
                  </div>
                  <p className="text-base font-display font-semibold text-slate-400">
                    VCET Brochure
                  </p>
                  <p className="text-xs text-slate-300 mt-1">PDF document</p>
                </div>
              </div>

              <div className="p-5 md:p-8 lg:p-10 text-center">
                <div className="flex items-center justify-center gap-3 mb-3 md:mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-brand-blue to-brand-navy rounded-xl flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-display font-bold text-brand-navy">
                    {brochureItem?.title || 'VCET College Brochure'}
                  </h3>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed max-w-md mx-auto mb-6 md:mb-8">
                  {getSectionContentValue(
                    section,
                    'description',
                    'Explore everything about Vidyavardhini\'s College of Engineering and Technology - our rich legacy, diverse programs, cutting-edge facilities, and vibrant campus life.',
                  )}
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
                  <a
                    href={brochureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-brand-blue to-brand-navy text-white font-display font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-brand-gold hover:to-yellow-600 transition-all duration-500 hover:-translate-y-0.5 group/btn min-h-[44px]"
                  >
                    <BookOpen className="w-5 h-5" />
                    Open Brochure
                  </a>

                  <a
                    href={brochureUrl}
                    download={brochureFileName}
                    className="inline-flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-white text-brand-navy font-display font-bold rounded-xl border border-brand-blue/20 shadow-sm hover:border-brand-gold/40 hover:text-brand-blue hover:-translate-y-0.5 transition-all duration-500 min-h-[44px]"
                  >
                    <Download className="w-5 h-5" />
                    Download PDF
                  </a>
                </div>

                <p className="text-[10px] text-slate-300 mt-4 uppercase tracking-widest font-semibold">
                  Opens in a new tab with browser download controls
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Brochure;
