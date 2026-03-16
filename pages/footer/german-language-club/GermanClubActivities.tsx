import React from 'react';
import { CalendarDays } from 'lucide-react';
import GermanPdfRow from './GermanPdfRow';

const GermanClubActivities: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 border-b border-brand-blue/10 pb-4">
        <div className="flex h-10 w-10 items-center justify-center bg-brand-blue text-white">
          <CalendarDays className="h-5 w-5" />
        </div>
        <h2 className="text-2xl font-display font-bold text-brand-navy">Activities</h2>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <article className="border border-brand-blue/15 bg-white p-5 shadow-sm">
          <h3 className="mb-3 text-lg font-display font-bold text-brand-navy">Year 2023-24 :</h3>
          <ul className="space-y-2 text-sm leading-relaxed text-slate-700 md:text-base">
            <li><span className="font-semibold">No. of students registered:</span> 28.</li>
            <li><span className="font-semibold">Declaration of course session:</span> 4th April 2023</li>
            <li><span className="font-semibold">Commencement of Course:</span> 27th July 2024</li>
            <li><span className="font-semibold">Mid -Term Exam:</span> 4th October 2023</li>
          </ul>
        </article>

        <article className="border border-brand-gold/25 bg-amber-50/35 p-5 shadow-sm">
          <h3 className="mb-3 text-lg font-display font-bold text-brand-navy">Year 2022-23 :</h3>
          <ul className="space-y-2 text-sm leading-relaxed text-slate-700 md:text-base">
            <li><span className="font-semibold">No. of students registered:</span> 26.</li>
            <li><span className="font-semibold">Declaration of course session:</span> 5th April 2022</li>
            <li><span className="font-semibold">Commencement of Course:</span> 30th July 2022</li>
          </ul>
        </article>
      </div>

      <div className="space-y-4">
        <GermanPdfRow
          title="German Certificate Sample Copy"
          description="Reference sample of the completion/certificate format."
          href="/documents/admissions/vcet-brochure.pdf"
        />
        <GermanPdfRow
          title="German Language Club Report 2023-24"
          description="Detailed annual summary, activities and outcomes report."
          href="/documents/admissions/vcet-brochure.pdf"
        />
        <GermanPdfRow
          title="2018-19 To 2023-24 List_of_Students"
          description="Compiled student participation list across academic years."
          href="/documents/admissions/vcet-brochure.pdf"
        />
      </div>
    </div>
  );
};

export default GermanClubActivities;
