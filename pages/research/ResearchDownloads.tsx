import React, { useEffect, useMemo, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { ArrowUpRight, ExternalLink, FileText, Link2 } from 'lucide-react';
import { getResearchSection } from '../../services/research';

type LinkItem = {
  label: string;
  href: string;
};

const defaultDocButtons = [
  {
    label: 'Form for research recommendation',
    href: 'https://docs.google.com/document/d/1RqHvcqpi9CVdeQrYhDnDpt5BEEAOqR6x/view',
  },
  {
    label: 'Form for Institute Research Funding Proposal',
    href: 'https://docs.google.com/document/d/1em4Az-lpgdJsC0vCvbI5-CkytCz-pxuF/view',
  },
];

const defaultLeftLinks = [
  {
    label: 'UGC Care Journal List',
    href: 'https://drive.google.com/drive/folders/1PjJa_YPNtCHLhfRLkJb5YzbW9p6j7Nwe?usp=sharing',
  },
  { label: 'Elsevier Journal Finder Link', href: 'https://journalfinder.elsevier.com/' },
  { label: 'Springer Journal Suggester Link', href: 'https://journalsuggester.springer.com/' },
  { label: 'IEEE Journal Recommender Link', href: 'https://publication-recommender.ieee.org/home' },
  {
    label: 'Taylor and Francis Journal Suggester Link',
    href: 'https://authorservices.taylorandfrancis.com/publishing-your-research/choosing-a-journal/journal-suggester/',
  },
  { label: 'Wiley Journal Finder Link', href: 'https://journalfinder.wiley.com/search?type=match' },
];

const defaultRightLinks = [
  {
    label: 'UGC Care Journal List',
    href: 'https://drive.google.com/drive/folders/1PjJa_YPNtCHLhfRLkJb5YzbW9p6j7Nwe?usp=sharing',
  },
  { label: 'Sage Research Methods', href: 'http://methods.sagepub.com/' },
  { label: 'IIT Bombay Digital Library for Reference', href: 'http://dspace.library.iitb.ac.in/jspui/' },
  { label: 'IIT Guwahati Digital Library for Reference', href: 'http://gyan.iitg.ernet.in/handle/123456789/20' },
  { label: 'Shodh Sindhu Mumbai University Finder', href: 'https://ess.inflibnet.ac.in/eres.php?memID=44' },
  { label: 'E-THESIS Finder', href: 'https://shodhganga.inflibnet.ac.in/' },
];

const ResearchDownloads: React.FC = () => {
  const [apiData, setApiData] = useState<any>(null);
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    getResearchSection<any>('downloads')
      .then((res) => mounted && setApiData(res))
      .catch(() => mounted && setApiData(null))
      .finally(() => {
        if (mounted) setApiLoaded(true);
      });
    

return () => {
      mounted = false;
    };
  }, []);

    const docButtons = useMemo(() => {
    const rows = Array.isArray(apiData?.topButtons)
      ? apiData.topButtons
          .map((item: any) => ({
            label: String(item?.label ?? item?.title ?? '').trim(),
            href: String(item?.url ?? '').trim(),
          }))
          .filter((item: { label: string; href: string }) => item.label.length > 0 && item.href.length > 0)
      : [];
    return rows.length > 0 ? rows : defaultDocButtons;
  }, [apiData]);

  const leftLinks = useMemo(() => {
    const rows = Array.isArray(apiData?.leftLinks)
      ? apiData.leftLinks
          .map((item: any) => ({
            label: String(item?.label ?? item?.title ?? '').trim(),
            href: String(item?.url ?? '').trim(),
          }))
          .filter((item: { label: string; href: string }) => item.label.length > 0 && item.href.length > 0)
      : [];
    return rows.length > 0 ? rows : defaultLeftLinks;
  }, [apiData]);

  const rightLinks = useMemo(() => {
    const rows = Array.isArray(apiData?.rightLinks)
      ? apiData.rightLinks
          .map((item: any) => ({
            label: String(item?.label ?? item?.title ?? '').trim(),
            href: String(item?.url ?? '').trim(),
          }))
          .filter((item: { label: string; href: string }) => item.label.length > 0 && item.href.length > 0)
      : [];
    return rows.length > 0 ? rows : defaultRightLinks;
  }, [apiData]);

        if (!apiLoaded) {
  return (
  <PageLayout>
  <PageBanner
  title="Research Downloads"
  breadcrumbs={[
  { label: 'Research', href: '/research' },
  { label: 'Downloads' },
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
        title="Research Downloads"
        breadcrumbs={[
          { label: 'Research', href: '/research' },
          { label: 'Downloads' },
        ]}
      />

      <section className="relative py-14 md:py-16 bg-[#F4F7FB] border-b border-[#E2E8F0] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-25">
          <div className="absolute -top-16 -right-8 w-64 h-64 rounded-full bg-[#1A4B7C]/15 blur-3xl" />
          <div className="absolute -bottom-16 -left-8 w-64 h-64 rounded-full bg-[#fdb813]/20 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
            {docButtons.map((button: LinkItem, idx: number) => (
              <a
                key={button.label}
                href={button.href}
                target="_blank"
                rel="noopener noreferrer"
                className="reveal group relative overflow-visible border border-[#0E3A66] bg-[#0E3A66] text-[#FFD200] px-5 py-4 md:py-5 shadow-[0_6px_16px_rgba(15,23,42,0.12)] hover:bg-[#0B3158] transition-colors"
                style={{ transitionDelay: `${idx * 0.05}s` }}
              >
                <span className="pointer-events-none absolute -top-3 right-4 inline-flex items-center gap-1 rounded-sm border border-[#E0A700] bg-gradient-to-r from-[#F5C94F] to-[#E1A700] px-2 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#0E3A66] shadow-[0_4px_10px_rgba(224,167,0,0.35)] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300">
                  <FileText className="w-3.5 h-3.5" />
                  Doc File
                </span>
                <span className="absolute top-0 left-0 h-full w-[6px] bg-[#FFD200]" />
                <div className="pl-2">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-display font-bold text-[18px] md:text-[20px] leading-tight">{button.label}</p>
                    <ArrowUpRight className="w-5 h-5 text-[#FFD200] mt-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-[#FEE58A]">
                    <FileText className="w-4 h-4" />
                    <span className="text-[12px] md:text-[13px]">Opens document file in new tab</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-[#F7FAFD]">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
          <div className="reveal text-center mb-9">
            <h3 className="text-3xl md:text-4xl font-display font-bold text-[#0E3A66] tracking-tight">
              Important Links for Journal Finder
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {[leftLinks, rightLinks].map((links, groupIndex) => (
              <article
                key={groupIndex}
                className="reveal border border-[#D8E4F0] bg-white p-5 md:p-6"
                style={{ transitionDelay: `${groupIndex * 0.05}s` }}
              >
                <ul className="space-y-3.5">
                  {links.map((linkItem: LinkItem, linkIndex: number) => (
                    <li key={linkItem.label + linkIndex}>
                      <a
                        href={linkItem.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between gap-3 border border-[#DEE8F2] bg-[#F9FCFF] px-3.5 py-3 hover:border-[#1A4B7C]/35 hover:bg-white transition-colors"
                      >
                        <span className="flex items-center gap-2.5 min-w-0">
                          <Link2 className="w-4 h-4 text-[#E8B300] flex-shrink-0" />
                          <span className="text-[14px] md:text-[15px] text-[#0E3A66] font-medium leading-[1.5]">{linkItem.label}</span>
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-gradient-to-r from-[#F2BE2D] to-[#E1A700] text-[#0E3A66] text-[11px] md:text-[12px] font-extrabold uppercase tracking-[0.08em] shadow-[0_2px_8px_rgba(224,167,0,0.35)] group-hover:brightness-105 flex-shrink-0 transition-all">
                          Open
                          <ExternalLink className="w-3.5 h-3.5" />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>


        </div>
      </section>
    </PageLayout>
  );
};

export default ResearchDownloads;
