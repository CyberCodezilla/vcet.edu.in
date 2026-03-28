import React, { useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { Shield, Award, Globe, CheckCircle2, Hash } from 'lucide-react';

/* â”€â”€ Real Patent Data â”€â”€ */
const patents = [
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

const years = ['All', '2023', '2022', '2021', '2016'];

const officeAccent: Record<string, { bar: string; badge: string; text: string; label: string }> = {
  'Indian Patent Office':              { bar: '#1a4b7c', badge: 'bg-[#EFF4FB]',  text: 'text-[#1a4b7c]',  label: 'IND' },
  'German Patent':                     { bar: '#374151', badge: 'bg-[#F3F4F6]',  text: 'text-[#374151]',  label: 'DEU' },
  'Canadian Intellectual Property Office': { bar: '#fdb813', badge: 'bg-[#FFFBEB]', text: 'text-[#92400E]', label: 'CAN' },
};

const ResearchPatents: React.FC = () => {
  const [activeYear, setActiveYear] = useState('All');

  const filtered = activeYear === 'All'
    ? patents
    : patents.filter(p => String(p.year) === activeYear);

  return (
    <PageLayout>
      <PageBanner
        title="Patents"
        breadcrumbs={[
          { label: 'Research', href: '/research' },
          { label: 'Patents' },
        ]}
      />

      {/* â”€â”€ Stats Banner â”€â”€ */}
      <section className="bg-[#1a4b7c]">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { icon: Hash,        value: '13',  label: 'Patents Listed' },
              { icon: Shield,      value: '10',  label: 'Indian Patents' },
              { icon: Globe,       value: '2',   label: 'International' },
              { icon: Award,       value: '8',   label: 'Depts. Involved' },
            ].map((s, i) => (
              <div key={s.label} className="reveal py-5 md:py-8 px-3 md:px-6 text-center" style={{ transitionDelay: `${i * 0.06}s` }}>
                <s.icon className="w-4 h-4 md:w-5 md:h-5 text-[#fdb813] mx-auto mb-2" />
                <p className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">{s.value}</p>
                <p className="text-white/60 text-[11px] md:text-[14px] uppercase tracking-[0.15em] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                {filtered.map((p, idx) => {
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
