import React, { useEffect, useMemo, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { ArrowUpRight, Download, FileText, FolderOpen } from 'lucide-react';
import { getResearchSection } from '../../services/research';
import { resolveUploadedAssetUrl } from '../../utils/uploadedAssets';

type PdfItem = {
  title: string;
  year: string;
  href: string;
  note: string;
};

const sectionTabs = [
  { label: 'Reports', href: '#reports' },
];

const defaultReportPdfs: PdfItem[] = [
  { title: 'NIRF 2025 Engineering - VCET', year: '2025', href: 'https://vcet.edu.in/wp-content/uploads/2025/02/NIRF2025_ENGINEERING_VCET.pdf', note: 'Engineering category PDF' },
  { title: 'NIRF 2025 Management - VCET', year: '2025', href: 'https://vcet.edu.in/wp-content/uploads/2025/02/NIRF_2025_MANAGEMENT_VCET.pdf', note: 'Management category PDF' },
  { title: 'NIRF 2025 Overall - VCET', year: '2025', href: 'https://vcet.edu.in/wp-content/uploads/2025/02/NIRF2025_Overall_VCET.pdf', note: 'Overall category PDF' },
];

const PdfGrid: React.FC<{ items: PdfItem[] }> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {items.map((item, idx) => (
        <article
          key={`${item.title}-${item.year}-${idx}`}
          className="reveal group border border-[#DCE5F0] bg-white shadow-[0_2px_10px_rgba(15,23,42,0.05)] hover:shadow-[0_8px_20px_rgba(15,23,42,0.09)] transition-shadow"
          style={{ transitionDelay: `${idx * 0.04}s` }}
        >
          <div className="px-4 py-3 border-b border-[#E5ECF4] bg-[#F8FBFF] flex items-center justify-between gap-3">
            <p className="text-[12px] uppercase tracking-[0.1em] font-extrabold text-[#1A4B7C]">{item.year}</p>
            <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.08em] text-[#6B7280]">
              <FileText className="w-3.5 h-3.5" />
              PDF
            </span>
          </div>
          <div className="p-4">
            <h4 className="font-display font-bold text-[#1A4B7C] text-[18px] leading-snug mb-1.5">{item.title}</h4>
            <p className="text-[14px] text-[#6B7280] mb-4">{item.note}</p>
            <div className="flex items-center gap-2">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#1A4B7C] text-white text-[12px] font-bold hover:bg-[#173F66] transition-colors"
              >
                Open
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href={item.href}
                download
                className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#D0DCEA] text-[#1A4B7C] text-[12px] font-bold hover:border-[#1A4B7C] transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Download
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

const NIRF: React.FC = () => {
  const [apiData, setApiData] = useState<any>(null);
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    getResearchSection<any>('nirf')
      .then((res) => mounted && setApiData(res))
      .catch(() => mounted && setApiData(null))
      .finally(() => {
        if (mounted) setApiLoaded(true);
      });
    return () => {
      mounted = false;
    };
  }, []);

    const reportPdfs = useMemo(() => {
    const cards = Array.isArray(apiData?.nirfCards)
      ? apiData.nirfCards
          .map((card: any) => ({
            title: String(card?.title ?? '').trim(),
            year: String(card?.year ?? '').trim(),
            href: resolveUploadedAssetUrl(card?.fileUrl ?? card?.url ?? null) || '',
            note: String(card?.note ?? '').trim(),
          }))
          .filter((card: PdfItem) => card.title.length > 0 && card.href.length > 0)
      : [];
    return cards.length > 0 ? cards : defaultReportPdfs;
  }, [apiData]);

  if (!apiLoaded) {
    return (
      <PageLayout>
        <PageBanner
          title="NIRF"
          breadcrumbs={[
            { label: 'Research', href: '/research' },
            { label: 'NIRF' },
          ]}
        />
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 text-center text-slate-500">Loading content...</div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageBanner
        title="NIRF"
        breadcrumbs={[
          { label: 'Research', href: '/research' },
          { label: 'NIRF' },
        ]}
      />



      <section id="reports" className="py-14 md:py-16 bg-[#F8FAFC] scroll-mt-28">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
          <div className="reveal mb-10">
            <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#fdb813] border-b border-[#fdb813]/60 pb-1">Reports</span>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-[#56A9D8] mt-3 tracking-tight">Reports - Events and Committee Details :</h3>
          </div>
          <PdfGrid items={reportPdfs} />
        </div>
      </section>
    </PageLayout>
  );
};

export default NIRF;
