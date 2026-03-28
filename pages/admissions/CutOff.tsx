import React from 'react';
import {
  Download,
  FileText,
} from 'lucide-react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';

type CutOffItem = {
  id: number;
  title: string;
  url: string;
  badge?: string;
  year: string;
  category: string;
};

type TimelineItemProps = {
  item: CutOffItem;
};

const CUT_OFF_DATA: CutOffItem[] = [
  {
    id: 1,
    title: 'F.E. (First Year Engineering) 2025-26',
    url: 'https://vcet.edu.in/wp-content/uploads/2026/02/F.E-CUT-OFF-25-26-New.pdf',
    badge: 'New',
    year: '2025-26',
    category: 'Engineering',
  },
  {
    id: 2,
    title: 'M.E. (Masters of Engineering) 2025-26',
    url: 'https://vcet.edu.in/wp-content/uploads/2026/02/ME-CUT-OFF-25-26-New.pdf',
    badge: 'New',
    year: '2025-26',
    category: 'Engineering',
  },
  {
    id: 3,
    title: 'DSE (Direct Second Year) 2025-26',
    url: 'https://vcet.edu.in/wp-content/uploads/2026/02/DSE-CUT-OFF-25-26-New.pdf',
    badge: 'New',
    year: '2025-26',
    category: 'Engineering',
  },
  {
    id: 4,
    title: 'MMS (Master of Management Studies) 2025-26',
    url: 'https://vcet.edu.in/wp-content/uploads/2026/02/MMS-CUT-OFF-25-26-New.pdf',
    badge: 'New',
    year: '2025-26',
    category: 'Management',
  },
  {
    id: 5,
    title: 'First Year Engineering 2022-23',
    url: 'https://vcet.edu.in/wp-content/uploads/2023/05/FIRST-YEAR-ENGINEERING-CUT-OFF-22-23.pdf',
    year: '2022-23',
    category: 'Engineering',
  },

];

const TimelineItem: React.FC<TimelineItemProps> = ({ item }) => (
  <div className="group relative flex gap-6 pb-8 last:pb-0">
    <div className="absolute bottom-0 left-6 top-10 w-0.5 bg-gray-100 group-last:hidden" />

    <div className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border-2 border-gray-100 bg-white transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#e6a315] group-hover:shadow-lg group-hover:shadow-[#e6a315]/20">
      <FileText className={`h-5 w-5 ${item.badge ? 'text-[#e6a315]' : 'text-[#1e4e85]'}`} />
    </div>

    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="-mt-1 flex-grow rounded-3xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-900/5 group-hover:-translate-y-1 md:p-6"
    >
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              {item.year}
            </span>
            {item.badge && (
              <span className="animate-pulse rounded-full bg-[#e6a315] px-2 py-0.5 text-[9px] font-black uppercase text-white">
                {item.badge}
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-[#1e4e85] transition-colors group-hover:text-blue-600">
            {item.title}
          </h3>
          <p className="text-xs font-medium text-gray-400">{item.category} Department</p>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-2 text-sm font-semibold text-[#1e4e85] transition-all duration-300 group-hover:bg-[#1e4e85] group-hover:text-white">
          <span>Download PDF</span>
          <Download className="h-4 w-4" />
        </div>
      </div>
    </a>
  </div>
);

const CutOff: React.FC = () => {
  return (
    <PageLayout>
      <div className="min-h-screen bg-[#fcfdff] font-sans selection:bg-[#e6a315] selection:text-white">
        <PageBanner
          title="Cut Off Details"
          breadcrumbs={[{ label: 'Cut Off' }]}
        />

        <main className="relative z-20 mx-auto mt-6 md:mt-12 lg:mt-20 max-w-4xl px-4 sm:px-6 pb-12 md:pb-24">
          <div className="mb-10 flex items-center justify-between border-b border-gray-100 pb-6">
            <div>
              <h2 className="text-2xl font-black text-[#1e4e85]">
                Centralized Admission Process
              </h2>
              <p className="mt-1 text-sm text-gray-400">
                Archive of CAP Round cut-offs for various years
              </p>
            </div>
            <div className="hidden text-right sm:block">
              <span className="text-3xl font-black text-[#e6a315]">{CUT_OFF_DATA.length}</span>
              <p className="text-[10px] font-bold uppercase leading-none tracking-tighter text-gray-400">
                Total Documents
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {CUT_OFF_DATA.map((item) => (
              <TimelineItem key={item.id} item={item} />
            ))}
          </div>
        </main>
      </div>
    </PageLayout>
  );
};

export default CutOff;
