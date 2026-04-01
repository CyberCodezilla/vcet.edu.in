import React, { useEffect, useState } from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import { StudentsLifeImageHolder, StudentsLifeSectionCard } from './MMSStudentsLifeShared';
import { get, resolveApiUrl } from '../../../services/api';
import type { MMSStudentsLifeData } from '../../../admin/types';

export default function MMSStudentsLifeIdeathon() {
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


  const fbDesc = `The MMS Department at Vidyavardhini College of Engineering and Technology organized Ideathon 1.0 on 22nd October 2024, with participation from 14 colleges across Mumbai and Palghar. The event provided a platform for students to present innovative, real-world solutions, fostering creativity, collaboration, and critical thinking. Esteemed judges-Mr. Francis Tuscano (Managing Director, Thermovision Technologies Pvt. Ltd.), Mr. Vinay Patel (Assistant Professor-Mechanical, VCET), and Dr. Ashish Chaudhari (Research Dean, VCET)-evaluated the ideas. Participants enhanced their presentation and networking skills, while the organizing team honed leadership and coordination abilities.`;

  const fallbackImages = [
    { label: 'IDEATHON 01', url: '/images/Departments/MMS(MBA)/Students life/mms-studentlife-ideathon1.0-2.jpg' },
    { label: 'IDEATHON 02', url: '/images/Departments/MMS(MBA)/Students life/mms-studentlife-ideathon1.0-3.jpg' },
    { label: 'IDEATHON 03', url: '/images/Departments/MMS(MBA)/Students life/mms-studentlife-ideathon1.0-4.jpg' },
    { label: 'IDEATHON 04', url: '/images/Departments/MMS(MBA)/Students life/mms-studentlife-ideathon1.0-5.jpg' },
  ];

  const images = data?.ideation?.images?.length ? data.ideation.images : fallbackImages;

  return (
    <MMSLayout title="IDEATHON 1.0">
      <StudentsLifeSectionCard
        title="IDEATHON 1.0"
        subtitle="Innovation challenge designed to strengthen creativity, teamwork, and solution thinking"
      >
        <p className="text-[17px] leading-8 text-slate-700 whitespace-pre-wrap">
          {data?.ideation?.description || fbDesc}
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-6">
          {images.map((img: any, idx) => (
            <StudentsLifeImageHolder 
              key={idx} 
              label={img.label || `IDEATHON ${(idx + 1).toString().padStart(2, '0')}`} 
              size="large" 
              src={resolveApiUrl(img.url || img.image) || ''} 
            />
          ))}
        </div>
      </StudentsLifeSectionCard>
    </MMSLayout>
  );
}