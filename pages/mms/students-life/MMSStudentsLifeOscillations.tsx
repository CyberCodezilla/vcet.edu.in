import React, { useEffect, useState } from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import { StudentsLifeImageHolder, StudentsLifeSectionCard } from './MMSStudentsLifeShared';
import { get, resolveApiUrl } from '../../../services/api';
import type { MMSStudentsLifeData } from '../../../admin/types';

export default function MMSStudentsLifeOscillations() {
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


  const fbDesc = `Vidyavardhini's College of Engineering and Technology organized VNPS & Oscillations 2025 on April 4-5, providing a national platform for students to present innovative research across engineering and management disciplines. The MMS department's Management Track saw 11 students showcase projects on topics ranging from digital marketing and AI in education to investment trends and microfinance. Presentations were judged by academic experts and evaluated for originality, relevance, and practical application. The event fostered analytical thinking, professional communication, and leadership among participants. Overall, it encouraged academic excellence and highlighted emerging trends in business and management.`;

  const fallbackImages = [
    { label: 'Oscillations 01', url: '/images/Departments/MMS(MBA)/Students life/mms-studentlife-oscilations-1.jpg' },
    { label: 'Oscillations 02', url: '/images/Departments/MMS(MBA)/Students life/mms-studentlife-oscilations-2.jpeg' },
    { label: 'Oscillations 03', url: '/images/Departments/MMS(MBA)/Students life/mms-studentlife-oscilations-3.jpeg' },
    { label: 'Oscillations 04', url: '/images/Departments/MMS(MBA)/Students life/mms-studentlife-oscilations-4.jpeg' },
  ];

  const images = data?.oscillations?.images?.length ? data.oscillations.images : fallbackImages;

  return (
    <MMSLayout title="Oscillations Prize Distribution">
      <StudentsLifeSectionCard
        title="Oscillations Prize Distribution"
        subtitle="National platform celebrating innovation, research quality, and student excellence"
      >
        <p className="text-[17px] leading-8 text-slate-700 whitespace-pre-wrap">
          {data?.oscillations?.description || fbDesc}
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-6">
          {images.map((img: any, idx) => (
            <StudentsLifeImageHolder 
              key={idx} 
              label={img.label || `Oscillations ${(idx + 1).toString().padStart(2, '0')}`} 
              size="large" 
              src={resolveApiUrl(img.url || img.image) || ''} 
            />
          ))}
        </div>
      </StudentsLifeSectionCard>
    </MMSLayout>
  );
}