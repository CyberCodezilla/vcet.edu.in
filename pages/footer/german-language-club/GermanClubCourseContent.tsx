import React from 'react';
import { BookMarked } from 'lucide-react';
import GermanPdfRow from './GermanPdfRow';

const GermanClubCourseContent: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 border-b border-brand-blue/10 pb-4">
        <div className="flex h-10 w-10 items-center justify-center bg-brand-blue text-white">
          <BookMarked className="h-5 w-5" />
        </div>
        <h2 className="text-2xl font-display font-bold text-brand-navy">Course Contents</h2>
      </div>

      <article className="border border-brand-blue/15 bg-white p-5 shadow-sm">
        <p className="text-sm leading-relaxed text-slate-700 md:text-base">
          This syllabus will help the students for German A1 Certification.
        </p>

        <ul className="mt-4 grid grid-cols-1 gap-2 text-sm text-slate-700 md:grid-cols-2 md:text-base">
          <li className="border border-brand-blue/10 bg-brand-light/40 px-3 py-2">Start on German.</li>
          <li className="border border-brand-blue/10 bg-brand-light/40 px-3 py-2">Basic Grammar.</li>
          <li className="border border-brand-blue/10 bg-brand-light/40 px-3 py-2">In the language course.</li>
          <li className="border border-brand-blue/10 bg-brand-light/40 px-3 py-2">Cities-Countries-Languages.</li>
          <li className="border border-brand-blue/10 bg-brand-light/40 px-3 py-2">People and Houses.</li>
          <li className="border border-brand-blue/10 bg-brand-light/40 px-3 py-2">Appointments.</li>
          <li className="border border-brand-blue/10 bg-brand-light/40 px-3 py-2">Orientations.</li>
          <li className="border border-brand-blue/10 bg-brand-light/40 px-3 py-2">Modal Verbs.</li>
        </ul>

        <div className="mt-5 border-t border-brand-blue/10 pt-4 text-sm text-slate-700 md:text-base">
          <p><span className="font-bold text-brand-navy">Total Hours:</span> 52 hours</p>
          <p className="mt-2 text-slate-600">
            <span className="font-semibold text-brand-navy">Note:</span> Teaching hours can differ due to public holidays,
            festivals or under any critical circumstances.
          </p>
        </div>
      </article>

      <GermanPdfRow
        title="German A1 certification syllabus"
        description="Complete course structure prepared for German A1 certification readiness."
        href="/documents/admissions/vcet-brochure.pdf"
      />
    </div>
  );
};

export default GermanClubCourseContent;
