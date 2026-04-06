import React from 'react';

interface PdfItem {
  label: string;
  href: string;
}

interface CommitteeRow {
  post: string;
  name: string;
}

interface DepartmentNewsletterPanelProps {
  departmentLabel: string;
  committeeDetails?: string[];
  newsletterItems: PdfItem[];
  magazineItems: PdfItem[];
  staffName?: string;
  staffEmail?: string;
  staffPhone?: string;
  staffImage?: string | null;
  tableTitle?: string;
  tableRows?: CommitteeRow[];
}

const defaultEditorialRows: CommitteeRow[] = [
  { post: 'Chairman', name: 'Prathamesh Anil Karambe' },
  { post: 'Chief editor', name: 'Smita Verma' },
  { post: 'Chief editor', name: 'Revathi Nair' },
  { post: 'Chief editor', name: 'Gaurav Gawde' },
  { post: 'Newsletter Head', name: 'Khushboo Memon' },
  { post: 'Graphics head', name: 'Tarun Parmar' },
  { post: 'Treasurer', name: 'Ravikant Sharma' },
  { post: 'Treasurer', name: 'Shreyash Mhashilakar' },
];

const DepartmentNewsletterPanel: React.FC<DepartmentNewsletterPanelProps> = ({
  departmentLabel,
  committeeDetails = [
    'This committee works towards creating informative publications, encouraging student participation, and showcasing departmental activities through regular newsletters and magazines.',
  ],
  newsletterItems,
  magazineItems,
  staffName = 'Prof. Bharati Gondhalekar',
  staffEmail = 'bharati.gondhalekar@vcet.edu.in',
  staffPhone = '9423365470',
  staffImage,
  tableTitle = 'ITECH Editorial Committee',
  tableRows = defaultEditorialRows,
}) => {
  return (
    <section className="reveal space-y-8">
      <article className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-px bg-brand-gold" />
          <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">{departmentLabel}</span>
        </div>
        <h3 className="text-2xl font-bold text-brand-navy mb-6 relative inline-block">
          Committee Details
          <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" />
        </h3>
        <div className="space-y-4 text-[15px] leading-8 text-slate-600">
          {committeeDetails.map((paragraph, idx) => (
            <p key={`committee-${idx}`}>{paragraph}</p>
          ))}
        </div>
      </article>

      <article className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
        <div className="mt-0 grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="border border-[#D9E3EE] bg-white shadow-[0_10px_20px_rgba(15,23,42,0.06)]">
            <div className="px-5 py-4 bg-gradient-to-r from-[#123E67] to-[#1E578B] border-b border-[#0F355B]">
              <h4 className="text-white text-[22px] font-display font-bold tracking-tight">Newsletter</h4>
            </div>
            <div className="p-4 md:p-5 grid gap-2">
              {newsletterItems.map((item, idx) => (
                <a
                  key={`newsletter-${item.label}-${idx}`}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between gap-3 px-4 py-2.5 border border-[#BCD2E8] bg-white text-[#1A4B7C] font-semibold text-[14px] hover:border-[#56A9D8] hover:bg-[#EDF6FD] transition-colors"
                  style={{ transitionDelay: `${idx * 0.02}s` }}
                >
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-sm border border-[#56A9D8]/50 text-[#56A9D8] text-[10px] font-extrabold">PDF</span>
                    <span>{item.label}</span>
                  </span>
                  <i className="ph ph-arrow-up-right text-[#4F6B86]" />
                </a>
              ))}
            </div>
          </div>

          <div className="border border-[#D9E3EE] bg-white shadow-[0_10px_20px_rgba(15,23,42,0.06)]">
            <div className="px-5 py-4 bg-gradient-to-r from-[#123E67] to-[#1E578B] border-b border-[#0F355B]">
              <h4 className="text-white text-[22px] font-display font-bold tracking-tight">Magazine</h4>
            </div>
            <div className="p-4 md:p-5 grid gap-2">
              {magazineItems.map((item, idx) => (
                <a
                  key={`magazine-${item.label}-${idx}`}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between gap-3 px-4 py-2.5 border border-[#BCD2E8] bg-white text-[#1A4B7C] font-semibold text-[14px] hover:border-[#56A9D8] hover:bg-[#EDF6FD] transition-colors"
                  style={{ transitionDelay: `${idx * 0.02}s` }}
                >
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-sm border border-[#56A9D8]/50 text-[#56A9D8] text-[10px] font-extrabold">PDF</span>
                    <span>{item.label}</span>
                  </span>
                  <i className="ph ph-arrow-up-right text-[#4F6B86]" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </article>

      <article className="border border-[#D9E3EE] bg-white shadow-[0_10px_20px_rgba(15,23,42,0.06)]">
        <div className="px-5 py-4 bg-gradient-to-r from-[#123E67] to-[#1E578B] border-b border-[#0F355B]">
          <h4 className="text-white text-[20px] md:text-[22px] font-display font-bold tracking-tight">Committee Details / Staff Incharge</h4>
        </div>
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
            <div className="w-full md:w-[170px] lg:w-[190px] flex-shrink-0">
              <div className="aspect-[4/5] rounded-2xl border border-[#D8E6F3] bg-[#F4F8FC] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
                {staffImage ? (
                  <img src={staffImage} alt={staffName || 'Staff Incharge'} className="w-full h-full object-cover" />
                ) : (
                  <>
                    <i className="ph ph-user-circle text-[44px] text-[#56A9D8]" />
                    <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#4F6B86]">Faculty Image</p>
                    <p className="text-[10px] text-[#6B7F95]">Image unavailable</p>
                  </>
                )}
              </div>
            </div>

            <div className="min-w-0">
              {staffName && <h5 className="text-3xl font-display font-bold text-[#56A9D8]">{staffName}</h5>}
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 text-[#4F6B86] font-medium">
                {staffEmail && (
                  <a href={`mailto:${staffEmail}`} className="inline-flex items-center gap-2 hover:text-[#1A4B7C] transition-colors">
                    <i className="ph ph-envelope-simple text-[#56A9D8]" />
                    <span>{staffEmail}</span>
                  </a>
                )}
                {staffPhone && (
                  <a href={`tel:${staffPhone}`} className="inline-flex items-center gap-2 hover:text-[#1A4B7C] transition-colors">
                    <i className="ph ph-phone text-[#56A9D8]" />
                    <span>{staffPhone}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>

      <article className="border border-[#D9E3EE] bg-white shadow-[0_10px_20px_rgba(15,23,42,0.06)]">
        <div className="px-5 py-4 bg-gradient-to-r from-[#123E67] to-[#1E578B] border-b border-[#0F355B]">
          <h4 className="text-white text-[20px] md:text-[22px] font-display font-bold tracking-tight">{tableTitle}</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse">
            <thead>
              <tr className="bg-[#F4F8FC] text-[#1A4B7C]">
                <th className="w-[40%] px-4 py-3 text-left text-[12px] uppercase tracking-[0.1em] font-extrabold border-r border-[#D8E2EE]">Post</th>
                <th className="px-4 py-3 text-left text-[12px] uppercase tracking-[0.1em] font-extrabold">Name</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, index) => (
                <tr key={`${row.post}-${row.name}-${index}`} className={`border-t border-[#E4EBF3] ${index % 2 === 0 ? 'bg-white' : 'bg-[#FBFDFF]'}`}>
                  <td className="px-4 py-3.5 align-top text-[14px] md:text-[15px] font-semibold text-[#1A4B7C] border-r border-[#E4EBF3]">
                    {row.post}
                  </td>
                  <td className="px-4 py-3.5 align-top text-[14px] md:text-[15px] text-[#374151] leading-[1.75]">
                    {row.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
};

export default DepartmentNewsletterPanel;
