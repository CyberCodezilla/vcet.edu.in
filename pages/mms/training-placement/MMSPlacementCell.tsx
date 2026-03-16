import React from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import { PlacementImageHolder, PlacementSectionCard } from './MMSPlacementShared';

const placementCellMembers = [
  {
    imageLabel: 'Placement Cell Member 1',
    name: 'Mr. Prafulla Patil',
    role: 'Placement Manager',
    email: 'placements@vcet.edu.in',
    phone: '7710070966',
    extn: '0250-2338234 (Extn:228)',
  },
  {
    imageLabel: 'Placement Cell Member 2',
    name: 'Mr. Sanket Patil',
    role: 'Training And Placement Officer',
    email: 'placements@vcet.edu.in',
    phone: '7710070970 / 9987173606',
    extn: '0250-2338234 (Extn:228)',
  },
];

export default function MMSPlacementCell() {
  return (
    <MMSLayout title="Placement Cell">
      <PlacementSectionCard
        title="Placement Cell"
        subtitle="Professional guidance, corporate connect, and dedicated student support"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {placementCellMembers.map((member) => (
            <article
              key={member.name}
              className="rounded-none border border-brand-navy/25 bg-gradient-to-b from-white to-brand-light/25 p-4 shadow-[0_14px_28px_-22px_rgba(11,61,145,0.75)] sm:p-5"
            >
              <PlacementImageHolder label={member.imageLabel} />

              <div className="mt-4 space-y-2 border-l-2 border-brand-gold pl-4 text-slate-700">
                <h4 className="text-xl font-bold text-brand-navy">{member.name}</h4>
                <p className="text-base font-semibold text-brand-blue">{member.role}</p>
                <p className="text-[16px]">{member.email}</p>
                <p className="text-[16px]">{member.phone}</p>
                <p className="text-[16px]">{member.extn}</p>
              </div>
            </article>
          ))}
        </div>
      </PlacementSectionCard>
    </MMSLayout>
  );
}
