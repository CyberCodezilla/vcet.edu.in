import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { FileText, Download, BookOpen, Award, ArrowRight, ExternalLink } from 'lucide-react';

const criteria = [
  { number: '1', title: 'Curricular Aspects', description: 'Curriculum design, academic flexibility, and curriculum enrichment through value-added courses.' },
  { number: '2', title: 'Teaching-Learning & Evaluation', description: 'Student-centric methods, teacher quality, and learning outcomes-based evaluation.' },
  { number: '3', title: 'Research, Innovations & Extension', description: 'Research promotion, innovation ecosystem, extension activities, and collaboration.' },
  { number: '4', title: 'Infrastructure & Learning Resources', description: 'Physical and IT infrastructure, library facilities, and campus maintenance.' },
  { number: '5', title: 'Student Support & Progression', description: 'Student mentoring, scholarships, career counseling, and alumni engagement.' },
  { number: '6', title: 'Governance, Leadership & Management', description: 'Vision, strategy, faculty empowerment, and financial management.' },
  { number: '7', title: 'Institutional Values & Best Practices', description: 'Gender equity, environmental consciousness, and community engagement.' },
];

const documents = [
  'Self Study Report (SSR) Cycle 2 - Complete Document',
  'IIQA (Institutional Information for Quality Assessment)',
  'Extended Profile and Criteria-wise Data',
  'DVV Clarifications and Supporting Documents',
  'Student Satisfaction Survey Analysis',
  'Metric-wise Supporting Documents',
];

const SSRCycle2: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="SSR Cycle 2"
        breadcrumbs={[
          { label: 'NAAC', href: '#' },
          { label: 'SSR Cycle 2' },
        ]}
      />

      {/* About */}
      <section className="py-8 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="reveal">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                  NAAC Accreditation
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy mb-6">
                Self Study Report - Cycle 2
              </h2>
              <p className="text-slate-500 leading-relaxed mb-4">
                The Self Study Report (SSR) for Cycle 2 represents the institution's journey of
                continuous quality improvement since the first cycle of accreditation. This report
                documents the progress, achievements, and new initiatives undertaken by VCET across
                all seven criteria of the NAAC assessment framework.
              </p>
              <p className="text-slate-500 leading-relaxed mb-6">
                The SSR Cycle 2 highlights the institution's growth in research output, academic
                innovations, infrastructure development, and its commitment to producing industry-ready
                engineers through outcome-based education.
              </p>

              <a
                href="/research-conventions"
                className="inline-flex items-center gap-2 bg-brand-gold/10 text-brand-navy px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-brand-gold/20 transition-colors duration-300"
              >
                <BookOpen className="w-4 h-4 text-brand-gold" />
                Research Convention
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Criteria */}
      <section className="py-8 md:py-16 lg:py-24 bg-brand-light">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14 reveal">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">Framework</span>
                <div className="w-8 h-0.5 bg-brand-gold" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-navy">
                NAAC Criteria - Cycle 2
              </h2>
            </div>

            <div className="space-y-4">
              {criteria.map((item, idx) => (
                <div
                  key={idx}
                  className="reveal flex items-start gap-5 bg-white rounded-xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-500 border border-gray-100"
                  style={{ transitionDelay: `${Math.min(idx * 0.05, 0.4)}s` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-blue text-white flex items-center justify-center flex-shrink-0 font-display font-bold text-lg">
                    {item.number}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-brand-navy mb-1 font-display">{item.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section className="py-8 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14 reveal">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">Downloads</span>
                <div className="w-8 h-0.5 bg-brand-gold" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-navy">
                Downloadable Documents
              </h2>
            </div>

            <div className="space-y-3">
              {documents.map((doc, idx) => (
                <div
                  key={idx}
                  className="reveal flex items-center justify-between bg-brand-light rounded-xl p-4 hover:shadow-md transition-all duration-300 group cursor-pointer"
                  style={{ transitionDelay: `${Math.min(idx * 0.05, 0.4)}s` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-blue/5 flex items-center justify-center group-hover:bg-brand-gold/10 transition-colors duration-300">
                      <FileText className="w-4 h-4 text-brand-blue/60 group-hover:text-brand-gold transition-colors duration-300" />
                    </div>
                    <span className="text-sm text-slate-600 font-medium">{doc}</span>
                  </div>
                  <Download className="w-4 h-4 text-slate-300 group-hover:text-brand-gold transition-colors duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default SSRCycle2;
