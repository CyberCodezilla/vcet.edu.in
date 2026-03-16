import React from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import { PlacementSectionCard } from './MMSPlacementShared';

const objectivePoints = [
  'To provide necessary support for implementing the mandate of providing excellent career opportunities for the students.',
  'To plan and execute tasks like student skills development, soft skills training and career guidance.',
  'To plan and implement campus interview process.',
  'To equip students with necessary technical and behavioral competencies by rigorous and meticulously designed skills and aptitude practical trainings.',
  'To provide all necessary facilities essential for the conduct of campus recruitment.',
  'To formulate the strategy for roll-out of campus recruitment and placement policy for the campus eligible students.',
  'To develop and sustain a long term mutually beneficial relationship with the industry.',
];

export default function MMSPlacement() {
  return (
    <MMSLayout title="Objective">
      <PlacementSectionCard
        title="Placement Objective"
        subtitle="Career-focused roadmap designed to improve placement outcomes and industry readiness"
      >
        <div className="space-y-4">
          {objectivePoints.map((point, index) => (
            <article
              key={point}
              className="rounded-none border border-brand-blue/18 bg-gradient-to-r from-white to-brand-light/28 px-4 py-4 shadow-[0_10px_22px_-20px_rgba(11,61,145,0.8)] sm:px-5"
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-none bg-brand-navy text-sm font-bold text-brand-gold">
                  {index + 1}
                </span>
                <p className="pt-0.5 text-[17px] leading-8 text-slate-700">{point}</p>
              </div>
            </article>
          ))}
        </div>
      </PlacementSectionCard>
    </MMSLayout>
  );
}
