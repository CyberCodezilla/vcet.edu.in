import React from 'react';
import PageLayout from '../../../components/PageLayout';
import PageBanner from '../../../components/PageBanner';
import { ArrowLeft, FileText, Download, File } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface PDFItem {
  name: string;
  url?: string;
}

export interface PDFGroup {
  groupName: string;
  subTitle?: string;
  departments?: string[];
  pdfs: PDFItem[];
}

export interface ExamPDFPageProps {
  title: string;
  subtitle: string;
  breadcrumbLabel: string;
  groups: PDFGroup[];
}

const ExamPDFPage: React.FC<ExamPDFPageProps> = ({ title, subtitle, breadcrumbLabel, groups }) => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <PageBanner
        title={title}
        breadcrumbs={[
          { label: 'Academics', href: '/dean-academics' },
          { label: 'Exam Cell', href: '/exam' },
          { label: breadcrumbLabel }
        ]}
      />

      <main className="container mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          {/* Back button */}
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 bg-brand-navy text-brand-gold rounded-xl shadow-lg hover:bg-brand-gold hover:text-brand-navy transition-all duration-300 mb-12 group reveal"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-xs uppercase tracking-wider">Back</span>
          </button>

          {/* Heading */}
          <div className="mb-10 reveal">
            <h2 className="text-3xl font-display font-bold text-brand-navy mb-2">{title} PDF Downloads</h2>
            <p className="text-slate-500">{subtitle}</p>
            <div className="w-16 h-1 bg-brand-gold mt-4 rounded-full" />
          </div>

          {/* Groups */}
          {groups.length > 0 ? (
            <div className="space-y-16">
              {groups.map((group, gIdx) => (
                <div key={gIdx} className="reveal" style={{ transitionDelay: `${gIdx * 0.05}s` }}>
                  <div className="mb-6 border-b border-brand-gold/10 pb-4">
                    <h3 className="text-2xl font-display font-bold text-brand-blue hover:text-brand-gold transition-colors duration-300">
                      {group.groupName}
                    </h3>
                    {group.subTitle && (
                      <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mt-1">
                        {group.subTitle}
                      </p>
                    )}
                  </div>

                  {group.departments && group.departments.length > 0 && (
                    <div className="mb-6 flex flex-wrap gap-2">
                       {group.departments.map((dept, i) => (
                         <span key={i} className="px-4 py-2 bg-brand-navy/5 text-brand-navy/80 rounded-lg font-medium text-sm">
                           {dept}
                         </span>
                       ))}
                    </div>
                  )}

                  {group.pdfs && group.pdfs.length > 0 && (
                    <div className="bg-white rounded-4xl border border-slate-100 shadow-xl overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="bg-brand-light">
                              <th className="px-8 py-5 text-brand-navy font-bold text-sm uppercase tracking-wider">File Name</th>
                              <th className="px-8 py-5 text-brand-navy font-bold text-sm uppercase tracking-wider text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {group.pdfs.map((pdf, pIdx) => (
                              <tr key={pIdx} className="hover:bg-brand-blue/5 transition-colors group cursor-default">
                                <td className="px-8 py-5">
                                  <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center group-hover:bg-red-500 group-hover:rotate-6 transition-all duration-500">
                                      <FileText className="w-5 h-5 text-red-500 group-hover:text-white transition-colors duration-500" />
                                    </div>
                                    <span className="font-semibold text-slate-700 group-hover:text-brand-blue transition-colors duration-300">
                                      {pdf.name}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-8 py-5 text-right">
                                  <a 
                                    href={pdf.url || '#'} 
                                    onClick={(e) => {
                                      if (!pdf.url) {
                                        e.preventDefault();
                                        alert('No PDF available');
                                      }
                                    }}
                                    target={pdf.url ? "_blank" : undefined} 
                                    rel={pdf.url ? "noopener noreferrer" : undefined}
                                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                                  >
                                    <File className="w-4 h-4" />
                                    <span className="font-bold text-xs uppercase tracking-wider">View PDF</span>
                                    <Download className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 reveal">
              <div className="w-20 h-20 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-slate-300" />
              </div>
              <p className="text-slate-500 font-medium">Data will be updated soon.</p>
            </div>
          )}
        </div>
      </main>
    </PageLayout>
  );
};

export default ExamPDFPage;

