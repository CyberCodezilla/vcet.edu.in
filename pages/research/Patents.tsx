import React, { useEffect, useMemo, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { CheckCircle2 } from 'lucide-react';
import { getResearchSection } from '../../services/research';

/* â”€â”€ Real Patent Data â”€â”€ */
const defaultPatents = [
  {
    sr: 1,
    dept: 'Computer Engineering',
    faculty: 'Mr. Anil Hingmire',
    title: 'Method for Human Product Interaction System Using Graphical Code for Customer Retention',
    office: 'Indian Patent Office',
    year: 2023,
    appNo: '202221018013',
    status: 'Published in Journal',
  },
  {
    sr: 2,
    dept: 'Electronics & Telecomm / Mechanical Engineering',
    faculty: 'Dr. Sunayana Jadhav & Mr. Sanjay Loha',
    title: 'Smart Saline Assistance System',
    office: 'Indian Patent Office',
    year: 2023,
    appNo: '202321042351',
    status: 'Published',
  },
  {
    sr: 3,
    dept: 'Computer Engineering',
    faculty: 'Dr. Dinesh Patil',
    title: 'A Novel Approach to Detect Malicious Insider',
    office: 'Indian Patent Office',
    year: 2023,
    appNo: '202321026779',
    status: 'Published',
  },
  {
    sr: 4,
    dept: 'Computer Science Engg. & Data Science',
    faculty: 'Mr. Yogesh Pingle',
    title: 'Musical Medical Illness Healing Electronic Devices',
    office: 'Indian Patent Office',
    year: 2023,
    appNo: '202321077307',
    status: 'Published',
  },
  {
    sr: 5,
    dept: 'Artificial Intelligence & Data Science',
    faculty: 'Mr. Tatwadarshi P. Nagarhalli',
    title: 'A Novel Approach for Developing a Question Answering System',
    office: 'Indian Patent Office',
    year: 2023,
    appNo: '202221039047A',
    status: 'Published',
  },
  {
    sr: 6,
    dept: 'Computer Engineering',
    faculty: 'Dr. Amruta Mhatre',
    title: 'Approach for Object Tracking Using Neural Networks in a Real Time Environment',
    office: 'Indian Patent Office',
    year: 2023,
    appNo: '202311076533',
    status: 'Published',
  },
  {
    sr: 7,
    dept: 'Information Technology',
    faculty: 'Mrs. Vaishali Shirsath',
    title: 'ML Based Robot for Industry Application',
    office: 'Indian Patent Office',
    year: 2023,
    appNo: '394779-001',
    status: 'Published in Journal No. 44/2023',
  },
  {
    sr: 8,
    dept: 'Computer Engineering',
    faculty: 'Mr. Sunil Katkar',
    title: 'A Machine Learning Model for Providing Recommendation on Mental Condition Based on Real Time Data',
    office: 'Indian Patent Office',
    year: 2022,
    appNo: '202221051148A',
    status: 'Published',
  },
  {
    sr: 9,
    dept: 'Computer Engineering',
    faculty: 'Mr. Sunil Katkar',
    title: 'An IoT Based Secured Automatic Payroll System Using Double Factor Authentication',
    office: 'Indian Patent Office',
    year: 2022,
    appNo: '202221017078',
    status: 'Published',
  },
  {
    sr: 10,
    dept: 'Information Technology',
    faculty: 'Mr. Sainath Patil',
    title: 'A Shortest Path Finding System to Eliminate the Network Overhead During the Communication',
    office: 'German Patent',
    year: 2022,
    appNo: 'DE-20 2022 106 165 U1',
    status: 'Published',
  },
  {
    sr: 11,
    dept: 'Computer Engineering',
    faculty: 'Mr. Anil Hingmire',
    title: 'Intelligent AI and IoT Based Energy Management System Architecture for Smart Grid Technology',
    office: 'Canadian Intellectual Property Office',
    year: 2021,
    appNo: '202141041761',
    status: 'Published',
  },
  {
    sr: 12,
    dept: 'Information Technology',
    faculty: 'Mr. Yogesh Pingle',
    title: 'Intelligent Wearable Sweat Sensor Based Device for Monitoring and Recommending Personal Physical Fitness',
    office: 'Indian Patent Office',
    year: 2021,
    appNo: '202111032293A',
    status: 'Published in Journal',
  },
  {
    sr: 13,
    dept: 'Computer Engineering',
    faculty: 'Mr. Tatwadarshi P. Nagarhalli',
    title: 'A System for Hindi Text Steganography Using Enhanced Vedic Numeric Code',
    office: 'Indian Patent Office',
    year: 2016,
    appNo: '201621022081A',
    status: 'Published',
  },
];

const defaultYears = ['All', '2023', '2022', '2021', '2016'];

type PatentRow = {
  sr: number;
  dept: string;
  faculty: string;
  title: string;
  office: string;
  year: number;
  appNo: string;
  status: string;
};

const officeAccent: Record<string, { bar: string; badge: string; text: string; label: string }> = {
  'Indian Patent Office':              { bar: '#1a4b7c', badge: 'bg-[#EFF4FB]',  text: 'text-[#1a4b7c]',  label: 'IND' },
  'German Patent':                     { bar: '#374151', badge: 'bg-[#F3F4F6]',  text: 'text-[#374151]',  label: 'DEU' },
  'Canadian Intellectual Property Office': { bar: '#fdb813', badge: 'bg-[#FFFBEB]', text: 'text-[#92400E]', label: 'CAN' },
};

const ResearchPatents: React.FC = () => {
  const [apiData, setApiData] = useState<any>(null);
  const [activeYear, setActiveYear] = useState('All');
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    getResearchSection<any>('patents')
      .then((res) => mounted && setApiData(res))
      .catch(() => mounted && setApiData(null))
      .finally(() => {
        if (mounted) setApiLoaded(true);
      });
    

return () => {
      mounted = false;
    };
  }, []);

    const patents = useMemo<PatentRow[]>(() => {
    const rows = Array.isArray(apiData?.patents)
      ? apiData.patents
          .map((row: any, index: number) => ({
            sr: Number.parseInt(String(row?.sno ?? row?.sr ?? index + 1), 10) || index + 1,
            dept: String(row?.department ?? row?.dept ?? '').trim(),
            faculty: String(row?.names ?? row?.faculty ?? '').trim(),
            title: String(row?.title ?? '').trim(),
            office: String(row?.office ?? '').trim(),
            year: Number.parseInt(String(row?.year ?? ''), 10) || 0,
            appNo: String(row?.appNo ?? '').trim(),
            status: String(row?.status ?? '').trim(),
          }))
          .filter((row: any) => row.title.length > 0)
      : [];
    return rows.length > 0 ? rows : defaultPatents;
  }, [apiData]);

  const years = useMemo(() => {
    const configured = Array.isArray(apiData?.patentYears)
      ? apiData.patentYears.map((y: unknown) => String(y ?? '').trim()).filter(Boolean)
      : [];
    if (configured.length > 0) return ['All', ...configured];
    const fromRows = Array.from(new Set(patents.map((p: any) => String(p.year)).filter(Boolean)));
    return fromRows.length > 0 ? ['All', ...fromRows] : defaultYears;
  }, [apiData, patents]);

  const filtered: PatentRow[] = activeYear === 'All'
    ? patents
    : patents.filter((p: PatentRow) => String(p.year) === activeYear);

        if (!apiLoaded) {
  return (
  <PageLayout>
  <PageBanner
  title="Patents"
  breadcrumbs={[
  { label: 'Research', href: '/research' },
  { label: 'Patents' },
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
        title="Patents"
        breadcrumbs={[
          { label: 'Research', href: '/research' },
          { label: 'Patents' },
        ]}
      />

      {/* â”€â”€ Patent Table â”€â”€ */}
      <section className="py-10 md:py-20 bg-[#F7F9FC]">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1400px]">

          {/* Section heading */}
          <div className="reveal mb-8 md:mb-10">
            <span className="text-[13px] md:text-[14px] font-bold uppercase tracking-[0.3em] text-[#fdb813] border-b-2 border-[#fdb813] pb-1">Intellectual Property</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#1a4b7c] mt-3 md:mt-4 tracking-tight">Patent Portfolio</h2>
          </div>

          {/* Legend + Year Filter — same row */}
          <div className="reveal flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
            {/* Office legend */}
            <div className="flex flex-wrap items-center gap-3 md:gap-5">
              {Object.entries(officeAccent).map(([office, style]) => (
                <div key={office} className="flex items-center gap-2">
                  <div className="w-3 h-3 flex-shrink-0" style={{ backgroundColor: style.bar }} />
                  <span className="text-[12px] md:text-[13px] text-[#374151] font-medium">{office}</span>
                </div>
              ))}
            </div>
            {/* Year filter — scrollable on mobile */}
            <div className="flex items-center gap-0 border border-[#E5E7EB] flex-shrink-0 overflow-x-auto">
              {years.map(y => (
                <button
                  key={y}
                  onClick={() => setActiveYear(y)}
                  className={`px-3 md:px-4 py-2 text-[13px] md:text-[14px] font-bold uppercase tracking-[0.1em] border-r border-[#E5E7EB] last:border-r-0 transition-colors duration-200 whitespace-nowrap min-h-[44px] ${
                    activeYear === y ? 'bg-[#1a4b7c] text-white' : 'bg-white text-[#374151] hover:bg-[#F7F9FC]'
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="reveal overflow-x-auto border border-[#E5E7EB] bg-white">
            <table className="w-full text-left border-collapse min-w-[900px]">
              {/* Table head */}
              <thead>
                <tr className="bg-[#1a4b7c] text-white">
                  <th className="px-4 py-4 text-[13px] font-bold uppercase tracking-[0.2em] w-10 text-center border-r border-white/10">#</th>
                  <th className="px-4 py-4 text-[13px] font-bold uppercase tracking-[0.2em] border-r border-white/10">Faculty & Department</th>
                  <th className="px-4 py-4 text-[13px] font-bold uppercase tracking-[0.2em] border-r border-white/10">Patent Title</th>
                  <th className="px-4 py-4 text-[13px] font-bold uppercase tracking-[0.2em] border-r border-white/10 w-32 text-center">Office</th>
                  <th className="px-4 py-4 text-[13px] font-bold uppercase tracking-[0.2em] border-r border-white/10 w-16 text-center">Year</th>
                  <th className="px-4 py-4 text-[13px] font-bold uppercase tracking-[0.2em] border-r border-white/10 w-48">Application No.</th>
                  <th className="px-4 py-4 text-[13px] font-bold uppercase tracking-[0.2em] w-36 text-center">Status</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((p: PatentRow, idx: number) => {
                  const accent = officeAccent[p.office] ?? officeAccent['Indian Patent Office'];
                  const isEven = idx % 2 === 0;
                  return (
                    <tr
                      key={p.sr}
                      className={`group border-b border-[#E5E7EB] last:border-b-0 transition-colors duration-150 hover:bg-[#EFF4FB] ${isEven ? 'bg-white' : 'bg-[#F7F9FC]'}`}
                    >
                      {/* Sr. No with left accent bar */}
                      <td className="relative text-center px-4 py-4 border-r border-[#E5E7EB]">
                        <div
                          className="absolute left-0 top-0 bottom-0 w-[3px]"
                          style={{ backgroundColor: accent.bar }}
                        />
                        <span className="text-[14px] font-bold text-[#1a4b7c]">{String(p.sr).padStart(2, '0')}</span>
                      </td>

                      {/* Faculty + Dept */}
                      <td className="px-4 py-4 border-r border-[#E5E7EB]">
                        <p className="text-[15px] font-bold text-[#1a4b7c] leading-snug">{p.faculty}</p>
                        <p className="text-[13px] text-[#374151] mt-0.5 leading-snug">{p.dept}</p>
                      </td>

                      {/* Title */}
                      <td className="px-4 py-4 border-r border-[#E5E7EB]">
                        <p className="text-[15px] text-[#1A1A1A] leading-snug font-medium">{p.title}</p>
                      </td>

                      {/* Office Badge */}
                      <td className="px-4 py-4 border-r border-[#E5E7EB] text-center">
                        <span className={`inline-block text-[13px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 ${accent.badge} ${accent.text}`}>
                          {accent.label}
                        </span>
                      </td>

                      {/* Year */}
                      <td className="px-4 py-4 border-r border-[#E5E7EB] text-center">
                        <span className="text-[15px] font-bold text-[#1a4b7c]">{p.year}</span>
                      </td>

                      {/* App No */}
                      <td className="px-4 py-4 border-r border-[#E5E7EB]">
                        <span className="font-mono text-[13px] text-[#374151] break-all">{p.appNo}</span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-[0.1em] text-emerald-700">
                          <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-[#374151]">No patents found for the selected year.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Row count */}
          <p className="mt-3 text-[13px] text-[#374151] text-right">
            Showing <span className="font-bold text-[#1a4b7c]">{filtered.length}</span> of {patents.length} patents
          </p>
        </div>
      </section>
    </PageLayout>
  );
};

export default ResearchPatents;
