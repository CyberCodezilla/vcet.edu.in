import React, { useEffect, useMemo, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { ExternalLink, FileText } from 'lucide-react';
import { resolveUploadedAssetUrl } from '../../utils/uploadedAssets';
import { get } from '../../services/api';

type StatementItem = {
  label: string;
  description: string;
  href: string;
};

const statementItems: StatementItem[] = [
  {
    label: 'Audited Statement 2021-2022',
    description: 'Income and expenditure statement for FY 2021-22.',
    href: '/pdfs/Facilities/FOOTER/AuditedStatement/2021-22-1.pdf',
  },
  {
    label: 'Audited Statement 2022-2023',
    description: 'Income and expenditure statement for FY 2022-23.',
    href: '/pdfs/Facilities/FOOTER/AuditedStatement/2022-23-1.pdf',
  },
];

type PageResponse = {
  data?: {
    items?: Array<Record<string, unknown>>;
  } | Record<string, unknown>;
};

const toText = (value: unknown): string => (typeof value === 'string' ? value : '');

const normalizeDynamicItems = (raw: unknown): StatementItem[] => {
  if (!raw || typeof raw !== 'object') {
    return [];
  }

  const data = raw as Record<string, unknown>;
  const items = Array.isArray(data.items) ? data.items : [];

  return items
    .filter((item): item is Record<string, unknown> => !!item && typeof item === 'object')
    .map((item) => {
      const fallbackFile = item.file && typeof item.file === 'object' ? (item.file as Record<string, unknown>) : null;
      const href =
        toText(item.href) ||
        toText(item.fileUrl) ||
        toText(item.url) ||
        toText(fallbackFile?.url);

      return {
        label: toText(item.label),
        description: toText(item.description),
        href,
      };
    })
    .filter((item) => Boolean(item.href));
};

const AuditedStatement: React.FC = () => {
  const [dynamicItems, setDynamicItems] = useState<StatementItem[]>([]);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const response = await get<PageResponse>('/pages/footer/audited-statement');
        if (!mounted) return;
        setDynamicItems(normalizeDynamicItems(response?.data));
      } catch {
        if (!mounted) return;
        setDynamicItems([]);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const renderedItems = useMemo(
    () => (dynamicItems.length > 0 ? dynamicItems : statementItems),
    [dynamicItems],
  );

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
            {renderedItems.map((item, idx) => (
              <div key={`${item.label}-${idx}`} className="reveal border border-[#E5E7EB] bg-white" style={{ transitionDelay: `${idx * 0.04}s` }}>
                <a
                  href={resolveUploadedAssetUrl(item.href) || item.href}
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

