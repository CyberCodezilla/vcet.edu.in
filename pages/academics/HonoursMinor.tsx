import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { 
  Download, 
  FileText, 
  GraduationCap, 
  CheckCircle2,
  ExternalLink,
  Lightbulb
} from 'lucide-react';

// --- Content Data ---
const booklets = [
  {
    title: 'Honours / Minor Degree Program – Booklet Part 1',
    url: 'https://vcet.edu.in/wp-content/uploads/2022/08/Honours-Minor-Degree-Program-_Booklet_Part-1-Final.pdf',

  },
  {
    title: 'Honours / Minor Degree Program – Booklet Part 2',
    url: 'https://vcet.edu.in/wp-content/uploads/2022/08/Honours-Minor-Degree-Program-Booklet-_Part-2_Detailed-Syllabus-Final.pdf',

  },
];

const highlights = [
  'Additional specialization alongside regular B.E. degree',
  'Interdisciplinary learning across engineering domains',
  'Enhanced employability and career prospects',
  'Flexible credit-based structure as per NEP 2020',
  'Industry-relevant elective courses',
  'Mentored by experienced faculty members',
];

const HonoursMinor: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Honours / Minor Degree Program"
        breadcrumbs={[{ label: 'Honours / Minor Degree Program' }]}
      />

      {/* Hero / Introduction Section */}
      <section className="py-8 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className="reveal">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-0.5 bg-brand-gold" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                    Academic Program
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-6 leading-tight">
                  Earn an Honours or Minor Degree at VCET
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4 text-lg">
                  In alignment with the National Education Policy (NEP) 2020 and Mumbai University
                  guidelines, VCET offers Honours and Minor Degree Programs that allow students
                  to pursue additional specializations alongside their regular engineering degree.
                </p>
                <p className="text-slate-600 leading-relaxed text-lg">
                  The Honours Degree enables students to gain deeper expertise in their own
                  branch, while the Minor Degree allows exploration of a different discipline,
                  fostering interdisciplinary learning and broadening career opportunities.
                </p>
              </div>

              {/* Image Placeholder */}
              <div className="reveal">
                <div className="aspect-[4/3] bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="text-center relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-brand-blue/10 to-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                      <GraduationCap className="w-10 h-10 text-brand-blue/40" />
                    </div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">VCET Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights (Numbered Ledger List Design) */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="mb-8 reveal">
            <span className="inline-block text-[12px] font-bold uppercase tracking-[0.3em] text-brand-gold border-b-2 border-brand-gold pb-1 mb-4">
              Strategic Advantages
            </span>
            <h2 className="text-5xl md:text-7xl font-bold text-brand-navy tracking-tight">
              Program Highlights
            </h2>
          </div>

          <div className="reveal border border-slate-200 shadow-sm rounded-sm overflow-hidden bg-white">
            {highlights.map((item, idx) => (
              <div 
                key={idx}
                className="flex items-start gap-5 p-4 md:p-6 border-b border-slate-100 last:border-b-0 hover:bg-brand-navy/[0.01] transition-colors group"
              >
                <div className="w-8 h-8 flex items-center justify-center border-2 border-brand-gold text-brand-navy font-bold text-sm flex-shrink-0 mt-0.5 group-hover:bg-brand-gold group-hover:text-white transition-all duration-300">
                  {idx + 1}
                </div>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed font-normal">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Booklets - Formal Ledger Table */}
      <section className="py-16 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-brand-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                Downloads
              </span>
              <div className="w-10 h-0.5 bg-brand-gold" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-navy tracking-tight mb-6">
              Program Booklets
            </h2>
            <p className="text-lg text-slate-500">
              Access the official institutional booklets for program structure and syllabus details.
            </p>
          </div>

          {/* Formal Ledger Table */}
          <div className="border-[8px] border-brand-navy bg-white overflow-hidden shadow-2xl rounded-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] border-collapse">
                <thead>
                  <tr className="bg-brand-navy text-white">
                    <th className="px-8 py-6 text-left text-[11px] font-bold uppercase tracking-[0.25em] border-r border-white/10 w-[100px]">Index</th>
                    <th className="px-8 py-6 text-left text-[11px] font-bold uppercase tracking-[0.25em] border-r border-white/10">Documentation Details</th>
                    <th className="px-8 py-6 text-center text-[11px] font-bold uppercase tracking-[0.25em] w-[140px]">Download</th>
                  </tr>
                </thead>
                <tbody>
                  {booklets.map((item, idx) => (
                    <tr 
                      key={idx}
                      className={`group border-b border-slate-100 last:border-b-0 transition-colors duration-300 ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                      } hover:bg-brand-navy/5 reveal`}
                      style={{ transitionDelay: `${idx * 0.1}s` }}
                    >
                      <td className="px-8 py-8 text-center border-r border-slate-100">
                        <div className="w-12 h-12 border-2 border-brand-navy flex items-center justify-center font-bold text-brand-navy group-hover:bg-brand-navy group-hover:text-white transition-all transform group-hover:scale-110">
                          {String(idx + 1).padStart(2, '0')}
                        </div>
                      </td>
                      <td className="px-8 py-8 border-r border-slate-100">
                        <div className="flex items-center gap-6">
                          <div className="p-3 bg-brand-gold/10 rounded-lg group-hover:bg-brand-gold transition-colors duration-300">
                            <FileText className="w-6 h-6 text-brand-navy group-hover:text-white" />
                          </div>
                          <h4 className="text-[19px] font-bold text-brand-navy group-hover:translate-x-1 transition-transform">
                            {item.title}
                          </h4>
                        </div>
                      </td>
                      <td className="px-8 py-8 text-center">
                        <a 
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-14 h-14 rounded-full inline-flex items-center justify-center text-brand-navy bg-slate-100 hover:bg-brand-gold hover:text-white transition-all duration-500 transform hover:rotate-[360deg] shadow-inner"
                        >
                          <Download className="w-6 h-6" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default HonoursMinor;
