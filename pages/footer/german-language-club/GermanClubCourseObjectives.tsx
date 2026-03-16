import React from 'react';
import { Target } from 'lucide-react';
import GermanPdfRow from './GermanPdfRow';

const GermanClubCourseObjectives: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 border-b border-brand-blue/10 pb-4">
        <div className="flex h-10 w-10 items-center justify-center bg-brand-blue text-white">
          <Target className="h-5 w-5" />
        </div>
        <h2 className="text-2xl font-display font-bold text-brand-navy">Course Objectives</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <article className="border border-brand-blue/15 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-display font-bold text-brand-navy">Course Objectives :</h3>
          <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-slate-700 md:text-base">
            <li>To learn the basic grammar and vocabulary of German language.</li>
            <li>To conjugate the verbs, word order, prepositions, construct the sentences while reading the text.</li>
            <li>To build the sentences with the prepositions and construct the sentences with Perfect and past tense.</li>
            <li>To examine the culture, day-to-day life of German family culture and write essay, email, letter, resume.</li>
          </ol>
        </article>

        <article className="border border-brand-gold/30 bg-amber-50/30 p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-display font-bold text-brand-navy">Course Outcomes :</h3>
          <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-slate-700 md:text-base">
            <li>Understand the basic grammar and vocabulary of German language.</li>
            <li>Conjugate the verbs, word order, prepositions, construct the sentences while reading the text.</li>
            <li>Build the sentences with the prepositions and construct the sentences with Perfect and past tense.</li>
            <li>Examine the culture, day-to-day life of German family culture and write essay, email, letter, resume.</li>
          </ol>
        </article>
      </div>

      <GermanPdfRow
        title="Mapping of CO-PO"
        description="Detailed mapping document for course objectives and program outcomes."
        href="/documents/admissions/vcet-brochure.pdf"
      />
    </div>
  );
};

export default GermanClubCourseObjectives;
