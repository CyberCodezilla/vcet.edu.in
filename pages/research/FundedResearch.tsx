import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { IndianRupee, Calendar, TrendingUp, BarChart3, FileText, ExternalLink } from 'lucide-react';

/* ── Funding Data (Govt & Non-Govt Agencies) ── */
const fundingByYear = [
  { year: '2013-14', amount: 0.45 },
  { year: '2014-15', amount: 0.75 },
  { year: '2015-16', amount: 25.22 },
  { year: '2016-17', amount: 0.85 },
  { year: '2017-18', amount: 0.60 },
  { year: '2018-19', amount: 1.64 },
  { year: '2019-20', amount: 2.10 },
  { year: '2021-22', amount: 13.84 },
  { year: '2022-23', amount: 4.06 },
];
const maxFunding = Math.max(...fundingByYear.map(d => d.amount));
const totalFunding = fundingByYear.reduce((s, d) => s + d.amount, 0);
const peakYear = fundingByYear.reduce((a, b) => (b.amount > a.amount ? b : a));

const FundedResearch: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Funded Research"
        breadcrumbs={[
          { label: 'Research', href: '/research' },
          { label: 'Funded Research' },
        ]}
      />

      {/* ── Funding Chart ── */}
      <section className="py-20 bg-[#F7F9FC]">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
          <div className="reveal mb-10">
            <span className="text-[14px] font-bold uppercase tracking-[0.3em] text-[#fdb813] border-b-2 border-[#fdb813] pb-1">Funding Overview</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[#1a4b7c] mt-4 tracking-tight">
              Funded Research from Government<br className="hidden sm:block" /> &amp; Non-Government Agencies
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Chart area */}
            <div className="lg:col-span-3 border border-[#E5E7EB] bg-white">
              {/* Chart header */}
              <div className="flex items-center gap-3 px-6 py-4 border-b border-[#E5E7EB]">
                <BarChart3 className="w-5 h-5 text-[#1a4b7c]" />
                <span className="text-[14px] font-bold uppercase tracking-[0.15em] text-[#374151]">Research Funding (₹ in Lacs)</span>
              </div>

              {/* Bars */}
              <div className="px-6 py-6 space-y-3">
                {fundingByYear.map((d, i) => {
                  const pct = (d.amount / maxFunding) * 100;
                  const isPeak = d.amount === maxFunding;
                  return (
                    <div key={d.year} className="reveal flex items-center gap-0" style={{ transitionDelay: `${i * 0.05}s` }}>
                      {/* Year label */}
                      <div className="w-20 flex-shrink-0 text-right pr-4">
                        <span className={`text-[15px] font-bold tracking-tight ${isPeak ? 'text-[#1a4b7c]' : 'text-[#374151]'}`}>
                          {d.year}
                        </span>
                      </div>

                      {/* Bar track */}
                      <div className="flex-1 h-10 bg-[#F0F2F5] relative overflow-hidden">
                        {/* Filled portion */}
                        <div
                          className="h-full flex items-center transition-all duration-700 ease-out relative"
                          style={{
                            width: `${Math.max(pct, 3)}%`,
                            background: isPeak
                              ? 'linear-gradient(90deg, #1a4b7c 0%, #3a6fa8 60%, #fdb813 100%)'
                              : d.amount >= 10
                                ? 'linear-gradient(90deg, #1a4b7c 0%, #3a6fa8 100%)'
                                : '#3a6fa8',
                          }}
                        >
                          {/* Inner glow line */}
                          <div className="absolute inset-x-0 top-0 h-[2px] bg-white/20" />
                        </div>

                        {/* Value label */}
                        <div
                          className="absolute top-0 h-full flex items-center"
                          style={{ left: `${Math.max(pct, 3) + 1}%` }}
                        >
                          <span className={`text-[15px] font-bold whitespace-nowrap ${isPeak ? 'text-[#1a4b7c]' : 'text-[#1A1A1A]'}`}>
                            ₹ {d.amount.toFixed(2)} L
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Gridline reference */}
              <div className="px-6 pb-4 flex items-center gap-2">
                <div className="flex-1 h-px bg-[#E5E7EB]" />
                <span className="text-[12px] text-[#374151] uppercase tracking-[0.15em]">Academic Year →</span>
              </div>
            </div>

            {/* Stats sidebar */}
            <div className="lg:col-span-1 flex flex-col gap-0 border border-[#E5E7EB] bg-white self-start">
              {/* Total */}
              <div className="p-6 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-2 mb-3">
                  <IndianRupee className="w-4 h-4 text-[#fdb813]" />
                  <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#374151]">Total Funding</span>
                </div>
                <p className="text-3xl font-display font-bold text-[#1a4b7c] tracking-tight leading-none">
                  ₹ {totalFunding.toFixed(2)}
                </p>
                <p className="text-[14px] text-[#374151] mt-1">Lacs (2013–2023)</p>
              </div>

              {/* Peak */}
              <div className="p-6 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-[#fdb813]" />
                  <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#374151]">Peak Year</span>
                </div>
                <p className="text-3xl font-display font-bold text-[#1a4b7c] tracking-tight leading-none">
                  {peakYear.year}
                </p>
                <p className="text-[14px] text-[#374151] mt-1">₹ {peakYear.amount.toFixed(2)} Lacs</p>
              </div>

              {/* Years active */}
              <div className="p-6 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-[#fdb813]" />
                  <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#374151]">Span</span>
                </div>
                <p className="text-3xl font-display font-bold text-[#1a4b7c] tracking-tight leading-none">
                  {fundingByYear.length}
                </p>
                <p className="text-[14px] text-[#374151] mt-1">Academic Years</p>
              </div>

              {/* Average */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="w-4 h-4 text-[#fdb813]" />
                  <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#374151]">Avg / Year</span>
                </div>
                <p className="text-3xl font-display font-bold text-[#1a4b7c] tracking-tight leading-none">
                  ₹ {(totalFunding / fundingByYear.length).toFixed(2)}
                </p>
                <p className="text-[14px] text-[#374151] mt-1">Lacs</p>
              </div>
            </div>
          </div>

          {/* Detailed Report Button */}
          <div className="reveal mt-10 border border-[#E5E7EB] bg-white">
            <a
              href="https://vcet.edu.in/wp-content/uploads/2024/06/RESEARCH-FUNDING1.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 px-6 py-5 group hover:bg-[#F7F9FC] transition-colors duration-200"
            >
              <div className="w-14 h-14 flex items-center justify-center bg-[#1a4b7c] text-white flex-shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[17px] font-display font-bold text-[#1a4b7c] group-hover:text-[#3a6fa8] transition-colors">
                  Detailed Research Funding Report
                </h3>
                <p className="text-[14px] text-[#374151] mt-1 leading-relaxed">
                  View the complete year-wise breakdown of funded research projects from Government &amp; Non-Government agencies including project details, principal investigators, and sanctioned amounts.
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 px-4 py-2 border border-[#1a4b7c] text-[#1a4b7c] group-hover:bg-[#1a4b7c] group-hover:text-white transition-colors duration-200">
                <span className="text-[14px] font-bold uppercase tracking-[0.15em]">View PDF</span>
                <ExternalLink className="w-4 h-4" />
              </div>
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default FundedResearch;
