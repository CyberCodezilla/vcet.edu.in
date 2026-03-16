import React from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import { PlacementImageHolder, PlacementSectionCard } from './MMSPlacementShared';

export default function MMSPlacementPsycometricTest() {
  return (
    <MMSLayout title="Psycometric Test">
      <PlacementSectionCard
        title="Psycometric Test"
        subtitle="Assessment framework for specialization guidance and career alignment"
      >
        <p className="text-[17px] leading-8 text-slate-700">
          The Psycometric and subject knowledge test was conducted in an online mode and comprised multiple sections,
          including logical reasoning, business aptitude, personality mapping, and domain-specific knowledge. The test
          was designed and conducted by Coding Genius Lab, a reputed organization specializing in educational assessments
          and skill-based evaluations. The test included scenario-based questions and analytical exercises tailored to
          management students. A total of 46 FYMMS students actively participated in the assessment. The results will
          be utilized to offer personalized guidance to each student while selecting from available specializations such
          as Marketing, Finance, Operations, Human Resources, and Business Analytics. The activity was well-coordinated
          by the MMS Department faculty and proved to be an eye-opener for many students. It provided them with a
          structured framework to evaluate their career interests and academic capabilities.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <PlacementImageHolder label="Psycometric Test 01" size="large" />
          <PlacementImageHolder label="Psycometric Test 02" size="large" />
        </div>
      </PlacementSectionCard>
    </MMSLayout>
  );
}
