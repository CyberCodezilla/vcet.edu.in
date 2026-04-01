import React, { useState, useEffect } from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import { StudentsLifeImageHolder, StudentsLifeSectionCard } from './MMSStudentsLifeShared';
import { get, resolveApiUrl } from '../../../services/api';
import type { MMSStudentsLifeData } from '../../../admin/types';

export default function MMSStudentsLifeDLLE() {
  const [data, setData] = useState<MMSStudentsLifeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get<{ data: MMSStudentsLifeData }>('/pages/mms-students-life');
        setData(response.data);
      } catch (err) {
        console.error('Failed to fetch students life data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <MMSLayout title="Loading...">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-brand-blue animate-spin"></div>
            <div className="text-slate-400 font-medium tracking-widest uppercase text-sm">Loading Content...</div>
          </div>
        </div>
      </MMSLayout>
    );
  }


  const defaultImages = [
    { id: 'def-1', src: undefined, label: 'DLLE Activity 01' },
    { id: 'def-2', src: undefined, label: 'DLLE Activity 02' },
    { id: 'def-3', src: undefined, label: 'DLLE Activity 03' },
    { id: 'def-4', src: undefined, label: 'DLLE Activity 04' },
    { id: 'def-5', src: undefined, label: 'DLLE Activity 05' },
    { id: 'def-6', src: undefined, label: 'DLLE Activity 06' },
  ];

  const backendImages = (data?.dlle?.images || []).map((img, i) => ({
    id: `dyn-${i}`,
    src: resolveApiUrl(img.image),
    label: img.label || `DLLE Activity ${String(defaultImages.length + i + 1).padStart(2, '0')}`,
  })).filter(img => img.src);

  // If there are dynamic images, you can either completely replace placeholders or combine them.
  // We'll combine them, but only keep placeholders if we don't have enough images? Or just append.
  // Actually, appending is safer.
  const allImages = backendImages.length > 0 
    ? [...defaultImages.slice(0, Math.max(0, 6 - backendImages.length)), ...backendImages] 
    : defaultImages;

  return (
    <MMSLayout title="Department of Lifelong Learning Extension (DLLE)">        
      <StudentsLifeSectionCard
        title="Department of Lifelong Learning Extension (DLLE)"
        subtitle="University-linked extension initiatives for social responsibility and practical learning"
      >
        <p className="text-[17px] leading-8 text-slate-700">
          {data?.dlle?.description || `Extension activities conducted in association with the University of Mumbai under the Department of Lifelong
          Learning and Extension (DLLE) are crucial for holistic student development. These activities bridge academic
          learning with community engagement, fostering social responsibility and practical skills. Students gain
          real-world experience, enhance their problem-solving abilities, and contribute positively to society. Students
          opted for the three projects in a group, namely Environment Education Program, Career Program and Skill
          Development Program.`}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          {data?.dlle?.projects && data.dlle.projects.length > 0 && (
            <div className="bg-slate-50 border border-slate-100 p-5 rounded-none">
              <h4 className="text-sm font-bold uppercase text-brand-navy mb-3 border-b border-brand-gold/30 pb-2">Projects</h4>
              <ul className="list-disc pl-5 space-y-2 text-slate-700">
                {data.dlle.projects.map((p, i) => <li key={i}>{p.text}</li>)}
              </ul>
            </div>
          )}
          {data?.dlle?.outcomes && data.dlle.outcomes.length > 0 && (
            <div className="bg-slate-50 border border-slate-100 p-5 rounded-none">
              <h4 className="text-sm font-bold uppercase text-brand-navy mb-3 border-b border-brand-gold/30 pb-2">Outcomes</h4>
              <ul className="list-disc pl-5 space-y-2 text-slate-700">
                {data.dlle.outcomes.map((o, i) => <li key={i}>{o.text}</li>)}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {allImages.map(({ id, src, label }) => (
            <StudentsLifeImageHolder key={id} label={label} size="large" src={src} />
          ))}
        </div>
      </StudentsLifeSectionCard>
    </MMSLayout>
  );
}
