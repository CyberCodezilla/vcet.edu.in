import React, { useState, useEffect } from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import { StudentsLifeSectionCard, StudentsLifeImageHolder } from './MMSStudentsLifeShared';
import { get, resolveApiUrl } from '../../../services/api';
import type { MMSStudentsLifeData } from '../../../admin/types';

export default function MMSStudentsLife() {
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


  return (
    <MMSLayout title="Student's Life">
      <div className="space-y-12">
        <StudentsLifeSectionCard
          title="Student's Life"
          subtitle="A vibrant blend of academics, growth, and meaningful campus engagement"
        >
          <p className="text-[17px] leading-8 text-slate-700">
            {data?.overview?.description || `Life at V-CET is a vibrant blend of academic rigor, personal growth, and community engagement. Our campus is
            a dynamic environment where students are encouraged to explore their potential, forge meaningful connections,
            and prepare for successful careers.`}
          </p>
          <p className="text-[17px] leading-8 text-slate-700">
            Life V-CET is more than just an educational experience; it&apos;s a transformative journey that prepares students
            for future challenges and opportunities. By balancing academic excellence with extracurricular engagement and
            community involvement. The College ensures that students graduate as well-rounded individuals ready to make a
            positive impact in the world.
          </p>

          {data?.overview?.highlights && data.overview.highlights.length > 0 && (
            <div className="mt-6 border-l-4 border-brand-gold bg-slate-50 p-4">
              <h4 className="text-sm font-bold uppercase text-brand-navy mb-3">Highlights</h4>
              <ul className="list-disc pl-5 space-y-1 text-slate-700">
                {data.overview.highlights.map((h, i) => (
                  <li key={i}>{h.text}</li>
                ))}
              </ul>
            </div>
          )}
        </StudentsLifeSectionCard>

        {data?.events?.map((ev, idx) => (
          <StudentsLifeSectionCard key={idx} title={ev.name || `Event ${idx + 1}`} subtitle="Department Event & Activity">
            <p className="text-[17px] leading-8 text-slate-700">
              {ev.description}
            </p>
            {ev.outcome && (
              <div className="mt-4 border-l-2 border-brand-gold pl-4">
                <h5 className="text-sm font-semibold text-brand-navy mb-1 uppercase tracking-wider">Outcome</h5>
                <p className="text-[15px] leading-7 text-slate-600">{ev.outcome}</p>
              </div>
            )}
            {ev.images && ev.images.length > 0 && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-6">
                {ev.images.map((img, imgIdx) => (
                  <StudentsLifeImageHolder
                    key={imgIdx}
                    label={img.label || `${ev.name} Image ${imgIdx + 1}`}
                    size="large"
                    src={resolveApiUrl(img.image) || undefined}
                  />
                ))}
              </div>
            )}
          </StudentsLifeSectionCard>
        ))}
      </div>
    </MMSLayout>
  );
}
