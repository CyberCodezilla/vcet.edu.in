import React, { useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { Calendar, Download, ExternalLink, Loader2 } from 'lucide-react';

interface AcademicDocument {
  title: string;
  year?: string;
  description?: string;
  fileUrl: string;
}

const staticCalendars: AcademicDocument[] = [
  { title: 'EVEN SEM 2025-26 SE TE BE (Tentative)', year: '2025-26', fileUrl: '/pdfs/Academics/AcademicCalender/Academic_Calendar_Even_2025-26.pdf' },
  { title: 'ODD SEM 2025-26 SE TE BE', year: '2025-26', fileUrl: '/pdfs/Academics/AcademicCalender/acad-calen-odd-25-26(SE,TE,BE).pdf' },
  { title: 'EVEN SEM 2024-25', year: '2024-25', fileUrl: '/pdfs/Academics/AcademicCalender/Academic_Calender_2024_25_Even_2025-1.pdf' },
  { title: 'ODD SEM 2024-25 FE ME', year: '2024-25', fileUrl: '/pdfs/Academics/AcademicCalender/Academic_Calendar_Odd-24-25(FE,ME,Sem1).pdf' },
  { title: 'ODD SEM 2024-25 SE TE BE', year: '2024-25', fileUrl: '/pdfs/Academics/AcademicCalender/Academic_Calendar_Odd-24-25(SE,TE,BE).pdf' },
  { title: 'EVEN SEM 2023-24 SE TE BE', year: '2023-24', fileUrl: '/pdfs/Academics/AcademicCalender/Academic-Calendar_Even-Sem_-2023-2024.pdf' },
  { title: 'EVEN SEM 2022-23 SE TE BE', year: '2022-23', fileUrl: '/pdfs/Academics/AcademicCalender/Academic-Calendar-Even-Semester-2022-23-SE-TE-BE.pdf' },
  { title: 'FE & ME EVEN SEM 2022-23', year: '2022-23', fileUrl: '/pdfs/Academics/AcademicCalender/FE_SemII_Academic_Calendar2022-23(EvenSem).pdf' },
  { title: 'FE ODD SEM 2022-23', year: '2022-23', fileUrl: '/pdfs/Academics/AcademicCalender/Academic-Calendar-Odd-Semester-2022-23-F.E.pdf' },
];

const AcademicCalendar: React.FC = () => {
  const calendars = staticCalendars;
  const loading = false;
  const error = null;

  return (
    <PageLayout>
      <PageBanner
        title="Academic Calendar"
        breadcrumbs={[
          { label: 'Academic Calendar' },
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
                  Schedules
                </span>
                <div className="w-8 md:w-10 h-0.5 bg-brand-gold" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-brand-navy">
                Download Academic Calendars
              </h2>
              <p className="text-slate-500 mt-2 md:mt-3 max-w-xl mx-auto text-sm md:text-base">
                Stay updated with VCET's semester-wise academic calendars for all programs
              </p>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-brand-blue" />
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="text-center py-16 text-red-500">
                <p>{error}</p>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && calendars.length === 0 && (
              <div className="text-center py-16 text-slate-400">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No academic calendars available at the moment.</p>
              </div>
            )}

            {/* Timeline-style Calendar List */}
            {!loading && !error && calendars.length > 0 && (
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-brand-gold/40 via-brand-blue/20 to-transparent" />

                <div className="space-y-5">
                  {calendars.map((cal, idx) => (
                    <a
                      key={idx}
                      href={cal.fileUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="reveal visible group block"
                      style={{ transitionDelay: `${idx * 0.06}s` }}
                    >
                      <div className="flex items-center gap-3 sm:gap-5 pl-2 md:pl-4">
                        {/* Timeline dot */}
                        <div className="relative z-10 flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-brand-blue to-brand-navy flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                          <Calendar className="w-4 h-4 md:w-5 md:h-5 text-white" />
                        </div>

                        {/* Card */}
                        <div className="flex-1 flex items-center justify-between p-3 sm:p-5 bg-brand-light rounded-2xl border border-gray-100 hover:border-brand-gold/40 hover:shadow-lg transition-all duration-500 min-h-[52px]">
                          <div className="flex items-center gap-3 min-w-0">
                            <h3 className="font-display font-bold text-brand-navy group-hover:text-brand-blue transition-colors duration-300 text-sm md:text-base">
                              {cal.title}
                            </h3>
                            {cal.description && (
                              <span className="flex-shrink-0 px-2.5 py-0.5 bg-brand-gold/15 text-brand-gold text-[10px] font-bold uppercase tracking-wider rounded-full">
                                {cal.description}
                              </span>
                            )}
                            {cal.year && (
                              <span className="flex-shrink-0 px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full">
                                {cal.year}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-brand-blue/50 group-hover:text-brand-gold transition-colors duration-300 flex-shrink-0 ml-4">
                            <Download className="w-4 h-4" />
                            <ExternalLink className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AcademicCalendar;
