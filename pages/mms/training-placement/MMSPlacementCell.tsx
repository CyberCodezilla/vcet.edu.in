import React, { useEffect, useState } from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import { PlacementImageHolder, PlacementSectionCard } from './MMSPlacementShared';
import { get, resolveApiUrl } from '../../../services/api';
import type { TrainingPlacementData } from '../../../admin/types';

const defaultPlacementCellMembers = [
  {
    imageLabel: 'Placement Cell Member 1',
    src: '/images/Departments/MMS(MBA)/Training And Placement/Placement/Placement Cell/Placement_Placement_Cell_-_Mr.Prafulla_Patil.jpeg',
    name: 'Mr. Prafulla Patil',
    role: 'Placement Manager',
    email: 'placements@vcet.edu.in',
    phone: '7710070966',
    extn: '0250-2338234 (Extn:228)',
  },
  {
    imageLabel: 'Placement Cell Member 2',
    src: '/images/Departments/MMS(MBA)/Training And Placement/Placement/Placement Cell/Placement_Placement_Cell_-_Mr.Sanket_Patil.jpg',
    name: 'Mr. Sanket Patil',
    role: 'Training And Placement Officer',
    email: 'placements@vcet.edu.in',
    phone: '7710070970 / 9987173606',
    extn: '0250-2338234 (Extn:228)',
  },
];

export default function MMSPlacementCell() {
  const [data, setData] = useState<TrainingPlacementData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get<{ data: TrainingPlacementData }>('/pages/mms-training-placement');
        setData(response.data);
      } catch (err) {
        console.error('Failed to fetch training placement data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <MMSLayout title="Placement Cell">
        <PlacementSectionCard title="Placement Cell" subtitle="Professional guidance, corporate connect, and dedicated student support">
           <div className="py-20 text-center text-slate-500 animate-pulse">Loading Placement Cell Details...</div>
        </PlacementSectionCard>
      </MMSLayout>
    );
  }

  const placementCellMembers = data?.placementCellMembers && data.placementCellMembers.length > 0
    ? data.placementCellMembers.map((member, idx) => ({
        imageLabel: member.name || `Placement Cell Member ${idx + 1}`,
        src: resolveApiUrl(member.image) || undefined,
        name: member.name,
        role: member.role,
        email: member.email,
        phone: member.phone,
        extn: member.extension || '',
      }))
    : defaultPlacementCellMembers;

  return (
    <MMSLayout title="Placement Cell">
      <PlacementSectionCard
        title="Placement Cell"
        subtitle="Professional guidance, corporate connect, and dedicated student support"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {placementCellMembers.map((member, idx) => (
            <article
              key={idx}
              className="rounded-none border border-brand-navy/25 bg-gradient-to-b from-white to-brand-light/25 p-4 shadow-[0_14px_28px_-22px_rgba(11,61,145,0.75)] sm:p-5"
            >
              <PlacementImageHolder label={member.imageLabel} src={member.src} imageSrc={member.src} />

              <div className="mt-4 space-y-2 border-l-2 border-brand-gold pl-4 text-slate-700">
                <h4 className="text-xl font-bold text-brand-navy">{member.name}</h4>
                <p className="text-base font-semibold text-brand-blue">{member.role}</p>
                <p className="text-[16px]">{member.email}</p>
                <p className="text-[16px]">{member.phone}</p>
                {member.extn && <p className="text-[16px]">{member.extn}</p>}
              </div>
            </article>
          ))}
        </div>
      </PlacementSectionCard>
    </MMSLayout>
  );
}
