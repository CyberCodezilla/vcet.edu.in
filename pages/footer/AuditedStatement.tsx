import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { ExternalLink, FileText } from 'lucide-react';

type StatementItem = {
  label: string;
  description: string;
  href: string;
};

const statementItems: StatementItem[] = [
  {
    label: 'Audited Statement 2019-2020',
    description: 'Income and expenditure statement for FY 2019-20.',
    href: 'pdfs/Facilities/FOOTER/AuditedStatement/Income-Expenditure-2019-20.pdf',
  },
  {
    label: 'Audited Statement 2020-2021',
    description: 'Income and expenditure statement for FY 2020-21.',
    href: 'pdfs/Facilities/FOOTER/AuditedStatement/Income-Expenditure-2020-2021.pdf',
  },
  {
    label: 'Audited Statement 2021-2022',
    description: 'Income and expenditure statement for FY 2021-22.',
    href: 'pdfs/Facilities/FOOTER/AuditedStatement/Income-Expenditure-2021-22.pdf',
  },
  {
    label: 'Audited Statement 2022-2023',
    description: 'Income and expenditure statement for FY 2022-23.',
    href: 'pdfs/Facilities/FOOTER/AuditedStatement/Income-Expenditure-2022-23.pdf',
  },
  {
    label: 'Audited Statement 2023-2024',
    description: 'Income and expenditure statement for FY 2023-24.',
    href: 'pdfs/Facilities/FOOTER/AuditedStatement/AUDITED-STATEMENT-2023-24.pdf',
  },
  {
    label: 'Audited Statement 2024-2025',
    description: 'Income and expenditure statement for FY 2024-25.',
    href: 'pdfs/Facilities/FOOTER/AuditedStatement/INCOME-EXPENDITURE-STATEMET-FOR-THE-YEAR-ENDED-31ST-MARCH-2025.pdf',
  },
];

const AuditedStatement: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Audited Statement"
        breadcrumbs={[
          { label: 'Audited Statement' },
        ]}
      />

      <section className="py-10 md:py-20 bg-[#F7F9FC] border-b border-[#E5E7EB]">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
            {statementItems.map((item, idx) => (
              <div key={`${item.label}-${idx}`} className="reveal border border-[#E5E7EB] bg-white" style={{ transitionDelay: `${idx * 0.04}s` }}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 px-4 sm:px-6 py-4 sm:py-5 group hover:bg-[#F7F9FC] transition-colors duration-200"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-[#1a4b7c] text-white flex-shrink-0">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] sm:text-[17px] font-display font-bold text-[#1a4b7c] group-hover:text-[#3a6fa8] transition-colors">
                      {item.label}
                    </h3>
                    <p className="text-[13px] sm:text-[14px] text-[#374151] mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 px-3 sm:px-4 py-2 border border-[#1a4b7c] text-[#1a4b7c] group-hover:bg-[#1a4b7c] group-hover:text-white transition-colors duration-200 min-h-[44px]">
                    <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.15em]">View PDF</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AuditedStatement;

