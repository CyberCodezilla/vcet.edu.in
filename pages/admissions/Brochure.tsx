import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { Download, BookOpen, Image } from 'lucide-react';

const Brochure: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Brochure"
        breadcrumbs={[{ label: 'Brochure' }]}
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Section Intro */}
          <div className="max-w-3xl mx-auto text-center mb-14 reveal">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy mb-4">
              College Brochure
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Get a comprehensive overview of VCET — our programs, campus, facilities,
              achievements, and more — all in one place.
            </p>
          </div>

          {/* Featured Brochure Card */}
          <div className="max-w-3xl mx-auto reveal" style={{ transitionDelay: '0.1s' }}>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 group">
              {/* Brochure Cover Image Placeholder */}
              <div className="relative bg-gradient-to-br from-brand-light to-gray-100 h-[350px] md:h-[480px] flex items-center justify-center overflow-hidden">
                {/* Decorative background */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(27,58,92,0.04),transparent_70%)]" />
                <div className="absolute top-6 right-6 w-32 h-32 bg-brand-gold/[0.06] rounded-full" />
                <div className="absolute bottom-6 left-6 w-24 h-24 bg-brand-blue/[0.06] rounded-full" />

                <div className="text-center relative z-10">
                  <div className="w-20 h-20 bg-brand-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-500">
                    <Image className="w-10 h-10 text-brand-blue/40" />
                  </div>
                  <p className="text-base font-display font-semibold text-slate-400">
                    VCET Brochure Cover
                  </p>
                  <p className="text-xs text-slate-300 mt-1">vcet-brochure-cover.jpg</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8 md:p-10 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-brand-blue to-brand-navy rounded-xl flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-brand-navy">
                    VCET College Brochure
                  </h3>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed max-w-md mx-auto mb-8">
                  Explore everything about Vidyavardhini's College of Engineering and Technology —
                  our rich legacy, diverse programs, cutting-edge facilities, and vibrant campus life.
                </p>

                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-brand-blue to-brand-navy text-white font-display font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-brand-gold hover:to-yellow-600 transition-all duration-500 hover:-translate-y-0.5 group/btn"
                >
                  <Download className="w-5 h-5 group-hover/btn:animate-bounce" />
                  Download Brochure
                </a>

                <p className="text-[10px] text-slate-300 mt-4 uppercase tracking-widest font-semibold">
                  PDF Format
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
