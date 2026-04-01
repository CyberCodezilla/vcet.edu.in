import React, { useEffect, useState } from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import { PlacementSectionCard } from './MMSPlacementShared';
import { get } from '../../../services/api';
import type { TrainingPlacementData } from '../../../admin/types';

const defaultObjectivePoints = [
  'To provide necessary support for implementing the mandate of providing excellent career opportunities for the students.',
  'To plan and execute tasks like student skills development, soft skills training and career guidance.',
  'To plan and implement campus interview process.',
  'To equip students with necessary technical and behavioral competencies by rigorous and meticulously designed skills and aptitude practical trainings.',
  'To provide all necessary facilities essential for the conduct of campus recruitment.',
  'To formulate the strategy for roll-out of campus recruitment and placement policy for the campus eligible students.',
  'To develop and sustain a long term mutually beneficial relationship with the industry.',
];

export default function MMSPlacement() {
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
      <MMSLayout title="Objective">
        <PlacementSectionCard title="Placement Objective" subtitle="Career-focused roadmap designed to improve placement outcomes and industry readiness">
           <div className="py-20 text-center text-slate-500 animate-pulse">Loading Objective Details...</div>
        </PlacementSectionCard>
      </MMSLayout>
    );
  }

  const objectivePoints = data?.placementObjectives && data.placementObjectives.length > 0 
    ? data.placementObjectives.map(o => o.objective)
    : defaultObjectivePoints;

  return (
    <MMSLayout title="Objective">
      <PlacementSectionCard
        title="Placement Objective"
        subtitle="Career-focused roadmap designed to improve placement outcomes and industry readiness"
      >
        <div className="space-y-4">
          {objectivePoints.map((point, index) => (
            <article
              key={index}
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
