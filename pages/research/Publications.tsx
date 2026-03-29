import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { BookOpen, FileText, ExternalLink, BarChart3, TrendingUp, Calendar } from 'lucide-react';

/* ── Books Published Data ── */
const booksPublished = [
  { year: '2014-15', count: 1 },
  { year: '2017-18', count: 1 },
  { year: '2018-19', count: 4 },
  { year: '2019-20', count: 2 },
  { year: '2020-21', count: 5 },
  { year: '2021-22', count: 11 },
  { year: '2022-23', count: 24 },
];
const maxBooks = Math.max(...booksPublished.map(d => d.count));
const totalBooks = booksPublished.reduce((s, d) => s + d.count, 0);
const peakBookYear = booksPublished.reduce((a, b) => (b.count > a.count ? b : a));

/* ── Journal & Conference Papers Data ── */
const papersPublished = [
  { year: '2023', journal: 6,  conference: 47 },
  { year: '2022', journal: 15, conference: 18 },
  { year: '2021', journal: 9,  conference: 26 },
  { year: '2020', journal: 3,  conference: 113 },
  { year: '2019', journal: 20, conference: 15 },
];
const maxPapers = Math.max(...papersPublished.map(d => Math.max(d.journal, d.conference)));
const totalJournal = papersPublished.reduce((s, d) => s + d.journal, 0);
const totalConference = papersPublished.reduce((s, d) => s + d.conference, 0);

const Publications: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Publications (Journals, Conference, Books)"
        breadcrumbs={[
          { label: 'Research', href: '/research' },
          { label: 'Publications' },
        ]}
      />

      {/* ══════════════════════════════════════════════════
          Section 1 — Books Published (Horizontal Bar Chart)
          ══════════════════════════════════════════════════ */}
      <section className="py-10 md:py-20 bg-[#F7F9FC]">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
          <div className="reveal mb-8 md:mb-10">
            <span className="text-[13px] md:text-[14px] font-bold uppercase tracking-[0.3em] text-[#fdb813] border-b-2 border-[#fdb813] pb-1">Books &amp; Chapters</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#1a4b7c] mt-3 md:mt-4 tracking-tight">
              Number of Books Published
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Chart */}
            <div className="lg:col-span-3 border border-[#E5E7EB] bg-white overflow-x-auto">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-[#E5E7EB]">
                <BookOpen className="w-5 h-5 text-[#1a4b7c]" />
                <span className="text-[14px] font-bold uppercase tracking-[0.15em] text-[#374151]">Books Published per Academic Year</span>
              </div>

              <div className="px-6 py-6 space-y-3">
                {booksPublished.map((d, i) => {
                  const pct = (d.count / maxBooks) * 100;
                  const isPeak = d.count === maxBooks;
                  return (
                    <div key={d.year} className="reveal flex items-center gap-0" style={{ transitionDelay: `${i * 0.05}s` }}>
                      <div className="w-20 flex-shrink-0 text-right pr-4">
                        <span className={`text-[15px] font-bold tracking-tight ${isPeak ? 'text-[#1a4b7c]' : 'text-[#374151]'}`}>
                          {d.year}
                        </span>
                      </div>
                      <div className="flex-1 h-10 bg-[#F0F2F5] relative overflow-hidden">
                        <div
                          className="h-full transition-all duration-700 ease-out relative"
                          style={{
                            width: `${Math.max(pct, 4)}%`,
                            background: isPeak
                              ? 'linear-gradient(90deg, #1a4b7c 0%, #3a6fa8 60%, #fdb813 100%)'
                              : d.count >= 10
                                ? 'linear-gradient(90deg, #1a4b7c 0%, #3a6fa8 100%)'
                                : '#3a6fa8',
                          }}
                        >
                          <div className="absolute inset-x-0 top-0 h-[2px] bg-white/20" />
                        </div>
                        <div className="absolute top-0 h-full flex items-center" style={{ left: `${Math.max(pct, 4) + 1}%` }}>
                          <span className={`text-[15px] font-bold whitespace-nowrap ${isPeak ? 'text-[#1a4b7c]' : 'text-[#1A1A1A]'}`}>
                            {d.count}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="px-6 pb-4 flex items-center gap-2">
                <div className="flex-1 h-px bg-[#E5E7EB]" />
                <span className="text-[12px] text-[#374151] uppercase tracking-[0.15em]">Academic Year →</span>
              </div>
            </div>

            {/* Stats sidebar */}
            <div className="lg:col-span-1 flex flex-col gap-0 border border-[#E5E7EB] bg-white self-start">
              <div className="p-6 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-[#fdb813]" />
                  <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#374151]">Total Books</span>
                </div>
                <p className="text-3xl font-display font-bold text-[#1a4b7c] tracking-tight leading-none">{totalBooks}</p>
                <p className="text-[14px] text-[#374151] mt-1">Published (2014–2023)</p>
              </div>
              <div className="p-6 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-[#fdb813]" />
                  <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#374151]">Peak Year</span>
                </div>
                <p className="text-3xl font-display font-bold text-[#1a4b7c] tracking-tight leading-none">{peakBookYear.year}</p>
                <p className="text-[14px] text-[#374151] mt-1">{peakBookYear.count} Books</p>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-[#fdb813]" />
                  <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#374151]">Span</span>
                </div>
                <p className="text-3xl font-display font-bold text-[#1a4b7c] tracking-tight leading-none">{booksPublished.length}</p>
                <p className="text-[14px] text-[#374151] mt-1">Academic Years</p>
              </div>
            </div>
          </div>

          {/* Books Published PDF Button */}
          <div className="reveal mt-8 md:mt-10 border border-[#E5E7EB] bg-white">
            <a
              href="https://vcet.edu.in/wp-content/uploads/2024/06/BOOKS-PUBLISHED1.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 px-4 sm:px-6 py-4 sm:py-5 group hover:bg-[#F7F9FC] transition-colors duration-200"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-[#1a4b7c] text-white flex-shrink-0">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[15px] sm:text-[17px] font-display font-bold text-[#1a4b7c] group-hover:text-[#3a6fa8] transition-colors">
                  Books &amp; Chapters Published
                </h3>
                <p className="text-[13px] sm:text-[14px] text-[#374151] mt-1 leading-relaxed">
                  View the complete list of books and book chapters published by VCET faculty members across various academic years.
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 px-3 sm:px-4 py-2 border border-[#1a4b7c] text-[#1a4b7c] group-hover:bg-[#1a4b7c] group-hover:text-white transition-colors duration-200 min-h-[44px]">
                <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.15em]">View PDF</span>
                <ExternalLink className="w-4 h-4" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          Section 2 — Journal vs Conference Papers (Grouped Vertical Bars)
          ══════════════════════════════════════════════════ */}
      <section className="py-10 md:py-20 bg-white border-t border-[#E5E7EB]">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1200px]">
          {/* Conference Publications PDF Button */}
          <div className="reveal mb-8 md:mb-10 border border-[#E5E7EB] bg-white">
            <a
              href="https://vcet.edu.in/wp-content/uploads/2024/04/CONFERENCE-PUBLICATIONS-R1.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 px-4 sm:px-6 py-4 sm:py-5 group hover:bg-[#F7F9FC] transition-colors duration-200"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-[#1a4b7c] text-white flex-shrink-0">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[15px] sm:text-[17px] font-display font-bold text-[#1a4b7c] group-hover:text-[#3a6fa8] transition-colors">
                  Conference Publications
                </h3>
                <p className="text-[13px] sm:text-[14px] text-[#374151] mt-1 leading-relaxed">
                  View the complete list of conference publications by VCET faculty and students, including paper titles, authors, conference names, and indexing details.
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 px-3 sm:px-4 py-2 border border-[#1a4b7c] text-[#1a4b7c] group-hover:bg-[#1a4b7c] group-hover:text-white transition-colors duration-200 min-h-[44px]">
                <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.15em]">View PDF</span>
                <ExternalLink className="w-4 h-4" />
              </div>
            </a>
          </div>

          <div className="reveal mb-8 md:mb-10">
            <span className="text-[13px] md:text-[14px] font-bold uppercase tracking-[0.3em] text-[#fdb813] border-b-2 border-[#fdb813] pb-1">Research Papers</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#1a4b7c] mt-3 md:mt-4 tracking-tight">
              Refered Journal Paper Publication
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Chart */}
            <div className="lg:col-span-3 border border-[#E5E7EB] bg-white overflow-x-auto">
              {/* Header + Legend */}
              <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-[#1a4b7c]" />
                  <span className="text-[14px] font-bold uppercase tracking-[0.15em] text-[#374151]">Publications by Year</span>
                </div>
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#1a4b7c]" />
                    <span className="text-[13px] text-[#374151]">Referred Journal Papers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#7eb8e0]" />
                    <span className="text-[13px] text-[#374151]">Conference Papers</span>
                  </div>
                </div>
              </div>

              {/* Vertical grouped bars */}
              <div className="px-6 py-8">
                {/* Y-axis grid + bars */}
                <div className="relative" style={{ height: '320px' }}>
                  {/* Horizontal grid lines */}
                  {[0, 20, 40, 60, 80, 100, 120, 140].map(v => (
                    <div key={v} className="absolute left-12 right-0 border-t border-[#F0F2F5] flex items-center" style={{ bottom: `${(v / 140) * 100}%` }}>
                      <span className="absolute -left-12 w-10 text-right text-[12px] text-[#374151] -translate-y-1/2">{v}</span>
                    </div>
                  ))}

                  {/* Bar groups */}
                  <div className="absolute left-12 right-0 bottom-0 top-0 flex items-end justify-around">
                    {papersPublished.map((d, i) => (
                      <div key={d.year} className="reveal flex flex-col items-center gap-1" style={{ transitionDelay: `${i * 0.08}s` }}>
                        <div className="flex items-end gap-2" style={{ height: '280px' }}>
                          {/* Journal bar */}
                          <div className="relative group/bar" style={{ width: '36px' }}>
                            <div
                              className="w-full bg-[#1a4b7c] transition-all duration-700 ease-out relative"
                              style={{ height: `${(d.journal / 140) * 280}px` }}
                            >
                              <div className="absolute inset-x-0 top-0 h-[2px] bg-white/20" />
                            </div>
                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[13px] font-bold text-[#1a4b7c] whitespace-nowrap">
                              {d.journal}
                            </span>
                          </div>
                          {/* Conference bar */}
                          <div className="relative group/bar" style={{ width: '36px' }}>
                            <div
                              className="w-full bg-[#7eb8e0] transition-all duration-700 ease-out relative"
                              style={{ height: `${(d.conference / 140) * 280}px` }}
                            >
                              <div className="absolute inset-x-0 top-0 h-[2px] bg-white/20" />
                            </div>
                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[13px] font-bold text-[#3a6fa8] whitespace-nowrap">
                              {d.conference}
                            </span>
                          </div>
                        </div>
                        <span className="text-[15px] font-bold text-[#374151] mt-2">{d.year}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* X-axis label */}
                <div className="flex items-center gap-2 mt-6 ml-12">
                  <div className="flex-1 h-px bg-[#E5E7EB]" />
                  <span className="text-[12px] text-[#374151] uppercase tracking-[0.15em]">Academic Year →</span>
                </div>
              </div>
            </div>

            {/* Stats sidebar */}
            <div className="lg:col-span-1 flex flex-col gap-0 border border-[#E5E7EB] bg-white self-start">
              <div className="p-6 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="w-4 h-4 text-[#fdb813]" />
                  <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#374151]">Total Papers</span>
                </div>
                <p className="text-3xl font-display font-bold text-[#1a4b7c] tracking-tight leading-none">{totalJournal + totalConference}</p>
                <p className="text-[14px] text-[#374151] mt-1">Published (2019–2023)</p>
              </div>
              <div className="p-6 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-4 h-4 bg-[#1a4b7c] flex-shrink-0" />
                  <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#374151]">Journal Papers</span>
                </div>
                <p className="text-3xl font-display font-bold text-[#1a4b7c] tracking-tight leading-none">{totalJournal}</p>
                <p className="text-[14px] text-[#374151] mt-1">Referred Journals</p>
              </div>
              <div className="p-6 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-4 h-4 bg-[#7eb8e0] flex-shrink-0" />
                  <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#374151]">Conference Papers</span>
                </div>
                <p className="text-3xl font-display font-bold text-[#7eb8e0] tracking-tight leading-none">{totalConference}</p>
                <p className="text-[14px] text-[#374151] mt-1">Conference Proceedings</p>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-[#fdb813]" />
                  <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#374151]">Peak Conference</span>
                </div>
                <p className="text-3xl font-display font-bold text-[#1a4b7c] tracking-tight leading-none">2020</p>
                <p className="text-[14px] text-[#374151] mt-1">113 Conference Papers</p>
              </div>
            </div>
          </div>

          {/* Journal Publications PDF Button */}
          <div className="reveal mt-8 md:mt-10 border border-[#E5E7EB] bg-white">
            <a
              href="https://vcet.edu.in/wp-content/uploads/2024/04/JOURNAL-PAPER-PUBLICATION.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 px-4 sm:px-6 py-4 sm:py-5 group hover:bg-[#F7F9FC] transition-colors duration-200"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-[#1a4b7c] text-white flex-shrink-0">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[15px] sm:text-[17px] font-display font-bold text-[#1a4b7c] group-hover:text-[#3a6fa8] transition-colors">
                  Journal Publications
                </h3>
                <p className="text-[13px] sm:text-[14px] text-[#374151] mt-1 leading-relaxed">
                  View the complete list of referred journal papers published by VCET faculty and students, including precise indexing and publication details.
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 px-3 sm:px-4 py-2 border border-[#1a4b7c] text-[#1a4b7c] group-hover:bg-[#1a4b7c] group-hover:text-white transition-colors duration-200 min-h-[44px]">
                <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.15em]">View PDF</span>
                <ExternalLink className="w-4 h-4" />
              </div>
            </a>
          </div>

        </div>
      </section>
    </PageLayout>
  );
};

export default Publications;
