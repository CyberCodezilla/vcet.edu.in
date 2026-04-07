import React, { useMemo, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { Download, ExternalLink, FileText, FolderOpen } from 'lucide-react';

type DownloadCategory = 'Forms' | 'Policies' | 'Compliance' | 'Journal Finder';

type DownloadItem = {
  title: string;
  category: DownloadCategory;
  url: string;
  fileType: string;
  sizeBytes?: number;
};

const downloadItems: DownloadItem[] = [
  {
    title: 'Form for Research Recommendation',
    category: 'Forms',
    url: '/pdfs/Research/ResearchDownloads/Form for research recommendation.pdf',
    fileType: 'PDF',
  },
  {
    title: 'Form for Institute Research Funding Proposal',
    category: 'Forms',
    url: '/pdfs/Research/ResearchDownloads/Form for Institute Research Funding Proposal.pdf',
    fileType: 'PDF',
  },
  {
    title: 'Institute Research Policy',
    category: 'Policies',
    url: 'https://vcet.edu.in/wp-content/uploads/2025/03/Institute-Research-Policy.pdf',
    fileType: 'PDF',
    sizeBytes: 2621008,
  },
  {
    title: 'Procedure for Student Educational Verification',
    category: 'Forms',
    url: 'https://vcet.edu.in/wp-content/uploads/2021/11/Educational_verification-1-1.pdf',
    fileType: 'PDF',
    sizeBytes: 37915,
  },
  {
    title: 'VCET HR Policy',
    category: 'Policies',
    url: 'https://vcet.edu.in/NAAC/VCET_HR_POLICY.pdf',
    fileType: 'PDF',
    sizeBytes: 1007295,
  },
  {
    title: 'Mandatory Disclosure (December 2025)',
    category: 'Compliance',
    url: 'https://vcet.edu.in/wp-content/uploads/2026/01/Mandatory-Disclosure-as-On-December-2025-FINAL.pdf',
    fileType: 'PDF',
    sizeBytes: 3517874,
  },
  {
    title: 'FRA Fee Proposal 2025-26 (Engineering)',
    category: 'Compliance',
    url: 'https://vcet.edu.in/wp-content/uploads/2025/05/FRA-FEE-PROPOSAL-2025-26-ENGG.pdf',
    fileType: 'PDF',
    sizeBytes: 421890,
  },
  {
    title: 'FRA Fee Proposal 2025-26 (ME)',
    category: 'Compliance',
    url: 'https://vcet.edu.in/wp-content/uploads/2025/05/FRA-FEE-PROPOSAL-2025-26-ME.pdf',
    fileType: 'PDF',
    sizeBytes: 411699,
  },
  {
    title: 'FRA Fee Proposal 2025-26 (MBA)',
    category: 'Compliance',
    url: 'https://vcet.edu.in/wp-content/uploads/2025/05/FRA-FEE-PROPOSAL-2025-26-MBA.pdf',
    fileType: 'PDF',
    sizeBytes: 420161,
  },
  {
    title: 'Fee Approved by FRA for 2025-26',
    category: 'Compliance',
    url: 'https://vcet.edu.in/wp-content/uploads/2025/10/FRA-Fee-2025-26-17.7.25.pdf',
    fileType: 'PDF',
    sizeBytes: 2118630,
  },
  {
    title: 'EOA 1994 to 2024',
    category: 'Compliance',
    url: 'https://vcet.edu.in/wp-content/uploads/2026/03/EOA-1994-2024.pdf',
    fileType: 'PDF',
    sizeBytes: 17158772,
  },
  {
    title: 'EOA Report 2025-2026',
    category: 'Compliance',
    url: 'https://vcet.edu.in/wp-content/uploads/2025/06/EOA-Report-2025-2026.pdf',
    fileType: 'PDF',
    sizeBytes: 213522,
  },
  {
    title: 'Certificate - Medium of Instruction',
    category: 'Compliance',
    url: 'https://vcet.edu.in/wp-content/uploads/2026/03/Medium-of-Instruction-Cert.pdf',
    fileType: 'PDF',
    sizeBytes: 100646,
  },
  {
    title: 'UGC Care Journal List',
    category: 'Journal Finder',
    url: 'https://drive.google.com/drive/folders/1PjJa_YPNtCHLhfRLkJb5YzbW9p6j7Nwe?usp=sharing',
    fileType: 'DRIVE',
  },
  {
    title: 'Elsevier Journal Finder',
    category: 'Journal Finder',
    url: 'https://journalfinder.elsevier.com/',
    fileType: 'WEB',
  },
  {
    title: 'Springer Journal Suggester',
    category: 'Journal Finder',
    url: 'https://journalsuggester.springer.com/',
    fileType: 'WEB',
  },
  {
    title: 'IEEE Journal Recommender',
    category: 'Journal Finder',
    url: 'https://publication-recommender.ieee.org/home',
    fileType: 'WEB',
  },
];

const categories: Array<'All' | DownloadCategory> = ['All', 'Forms', 'Policies', 'Compliance', 'Journal Finder'];

const formatSize = (bytes?: number) => {
  if (!bytes || bytes <= 0) return 'Not listed';
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const Downloads: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | DownloadCategory>('All');

  const filtered = useMemo(
    () => (activeCategory === 'All' ? downloadItems : downloadItems.filter((item) => item.category === activeCategory)),
    [activeCategory]
  );

  return (
    <PageLayout>
      <PageBanner
        title="Downloads"
        breadcrumbs={[
          { label: 'Downloads' },
        ]}
      />

      <section className="py-8 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <div className="reveal text-center mb-8 md:mb-14">
              <div className="flex items-center justify-center gap-3 mb-3 md:mb-4">
                <div className="w-8 md:w-10 h-0.5 bg-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                  Official Resources
                </span>
                <div className="w-8 md:w-10 h-0.5 bg-brand-gold" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-brand-navy">
                Downloadable Documents and Reference Links
              </h2>
              <p className="text-slate-500 mt-2 md:mt-3 max-w-xl mx-auto text-sm md:text-base">
                Filter by category and access official VCET documents with file type and size indicators.
              </p>
            </div>

            {/* Category Filters */}
            <div className="reveal flex flex-wrap justify-center gap-2 mb-8 md:mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 min-h-[44px] ${
                    activeCategory === cat
                      ? 'bg-gradient-to-r from-brand-blue to-brand-navy text-white shadow-md'
                      : 'bg-brand-light text-slate-600 border border-gray-200 hover:border-brand-gold/40 hover:text-brand-navy'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Download List */}
            <div className="space-y-4">
              {filtered.map((item, idx) => (
                <a
                  key={item.title}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reveal group block"
                  style={{ transitionDelay: `${idx * 0.05}s` }}
                >
                  <div className="flex items-center gap-4 p-5 bg-brand-light rounded-2xl border border-gray-100 hover:border-brand-gold/40 hover:shadow-lg transition-all duration-500">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-brand-navy flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-bold text-brand-navy group-hover:text-brand-blue transition-colors duration-300">
                        {item.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <FolderOpen className="w-3 h-3 text-brand-gold" />
                        <span className="text-xs text-slate-500">{item.category}</span>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          Type: {item.fileType}
                        </span>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          Size: {formatSize(item.sizeBytes)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-brand-blue/50 group-hover:text-brand-gold transition-colors duration-300 flex-shrink-0">
                      <Download className="w-5 h-5" />
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-12">
                <FolderOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-400 font-medium">No documents in this category</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Downloads;
