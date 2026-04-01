import React, { useEffect, useState } from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import { StudentsLifeImageHolder, StudentsLifeSectionCard } from './MMSStudentsLifeShared';
import { get, resolveApiUrl } from '../../../services/api';
import type { MMSStudentsLifeData } from '../../../admin/types';

export default function MMSStudentsLifeNSIMTraining() {
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


  const fbDesc = `On January 3, 2025, the Department of Management Studies, in collaboration with NISM and SEBI, organized a Financial Education Program for MMS students at Vidyavardhini's College. Led by expert speaker Mr. Deepak Vakharia, the session focused on key topics like saving, budgeting, investing, and financial discipline. Through real-life examples and an engaging intra-day trading simulation, students learned about the risks and opportunities in capital markets. The session also highlighted career prospects in the financial sector and emphasized the importance of financial planning for long-term goals. Participants who completed the session received NISM and SEBI certifications, boosting their academic and professional credentials.`;

  const fallbackImages = [
    { label: 'NSIM Training 01', url: '/images/Departments/MMS(MBA)/Students life/mms-studentlife-nsimtraining-1.jpeg' },
    { label: 'NSIM Training 02', url: '/images/Departments/MMS(MBA)/Students life/mms-studentlife-nsimtraining-2.jpeg' },
    { label: 'NSIM Training 03', url: '/images/Departments/MMS(MBA)/Students life/mms-studentlife-nsimtraining-3.jpeg' },
    { label: 'NSIM Training 04', url: '/images/Departments/MMS(MBA)/Students life/mms-studentlife-nsimtraining-4.jpeg' },
    { label: 'NSIM Training 05', url: '/images/Departments/MMS(MBA)/Students life/mms-studentlife-nsimtraining-5.jpeg' },
    { label: 'NSIM Training 06', url: '/images/Departments/MMS(MBA)/Students life/mms-studentlife-nsimtraining-6.jpeg' },
  ];

  const images = data?.nsimTraining?.images?.length ? data.nsimTraining.images : fallbackImages;

  return (
    <MMSLayout title="NSIM Kona Kona Shiksha Training">
      <StudentsLifeSectionCard
        title="NSIM Kona Kona Shiksha Training"
        subtitle="Financial education initiative in collaboration with NISM and SEBI"
      >
        <p className="text-[17px] leading-8 text-slate-700 whitespace-pre-wrap">
          {data?.nsimTraining?.description || fbDesc}
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">  
          {images.map((img: any, idx) => (
            <StudentsLifeImageHolder 
              key={idx} 
              label={img.label || `NSIM Training ${(idx + 1).toString().padStart(2, '0')}`} 
              size="large" 
              src={resolveApiUrl(img.url || img.image) || ''} 
            />
          ))}
        </div>
      </StudentsLifeSectionCard>
    </MMSLayout>
  );
}