import React, { useState, useEffect } from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import { StudentsLifeImageHolder, StudentsLifeSectionCard } from './MMSStudentsLifeShared';
import { get, resolveApiUrl } from '../../../services/api';
import type { MMSStudentsLifeData } from '../../../admin/types';

export default function MMSStudentsLifeVEcstatic() {
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
    { id: 'def-1', src: '/images/Departments/MMS(MBA)/Students life/mms-vecs-1.jpg', label: 'V-ECSTATIC 01' },
    { id: 'def-2', src: '/images/Departments/MMS(MBA)/Students life/mms-vecs-2.jpg', label: 'V-ECSTATIC 02' },
    { id: 'def-3', src: '/images/Departments/MMS(MBA)/Students life/mms-vecs-3.jpg', label: 'V-ECSTATIC 03' },
    { id: 'def-4', src: '/images/Departments/MMS(MBA)/Students life/mms-vecs-4.jpg', label: 'V-ECSTATIC 04' },
  ];

  const backendImages = (data?.vEcstatic?.images || []).map((img, i) => ({
    id: `dyn-${i}`,
    src: resolveApiUrl(img.image),
    label: img.label || `V-ECSTATIC ${String(defaultImages.length + i + 1).padStart(2, '0')}`,
  })).filter(img => img.src);

  const allImages = [...defaultImages, ...backendImages];

  return (
    <MMSLayout title="V-ECSTATIC">
      <StudentsLifeSectionCard title="V-ECSTATIC" subtitle="Annual college fest celebrating talent, unity, and student expression">
        <p className="text-[17px] leading-8 text-slate-700">
          {data?.vEcstatic?.description || `The annual College Fest "V-Ecstatic" is a highly anticipated event, bringing together students, faculty, and
          the community for a celebration of talent, creativity, and camaraderie. This vibrant festival serves as a
          platform for MMS students to showcase their diverse skills and foster a spirit of unity and enthusiasm. The
          Fest provided a holistic experience, blending fun, learning, and social responsibility. It fostered a sense
          of community, allowing students to bond, collaborate, and celebrate their collective achievements. The event
          also offered a break from academic routines, giving students a chance to unwind and rejuvenate.`}
        </p>

        {data?.vEcstatic?.activities && data.vEcstatic.activities.length > 0 && (
          <div className="mt-6 border-l-4 border-brand-gold bg-slate-50 p-4">
            <h4 className="text-sm font-bold uppercase text-brand-navy mb-3">Activities Highlights</h4>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              {data.vEcstatic.activities.map((act, i) => (
                <li key={i}>{act.text}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {allImages.map(({ id, src, label }) => (
            <StudentsLifeImageHolder key={id} label={label} size="large" src={src} />
          ))}
        </div>
      </StudentsLifeSectionCard>
    </MMSLayout>
  );
}
