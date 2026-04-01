import React, { useState, useEffect, useMemo } from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import { FacilitiesImageHolder, FacilitiesSectionCard } from './MMSFacilitiesShared';
import { get, resolveApiUrl } from '../../../services/api';
import type { MMSFacilitiesData } from '../../../admin/types';

const defaultImages = [
    { label: 'Classroom 01', src: '/images/Departments/MMS(MBA)/faciliteis/classroom-1.jpeg' },
    { label: 'Classroom 02', src: '/images/Departments/MMS(MBA)/faciliteis/classroom_img_2.jpeg' },
    { label: 'Classroom 03', src: '/images/Departments/MMS(MBA)/faciliteis/classroom-1.jpeg' },
    { label: 'Classroom 04', src: '/images/Departments/MMS(MBA)/faciliteis/classroom_img_2.jpeg' }
];

export default function MMSFacilitiesClassroom() {
  const [data, setData] = useState<MMSFacilitiesData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get<{ data: MMSFacilitiesData }>('/pages/mms-facilities');
        setData(response.data);
      } catch (err) {
        console.error('Failed to fetch facilities data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const galleryItems = useMemo(() => {
    const remoteData = data?.classrooms;
    if (remoteData && Array.isArray(remoteData) && remoteData.length > 0) {
      return remoteData.map((item, idx) => {
        const rawImage = item.image;
        const imageStr = rawImage && typeof rawImage === 'object' && 'url' in rawImage
          ? rawImage.url
          : (typeof rawImage === 'string' ? rawImage : null);
        
        return {
          label: item.label || `Image ${idx + 1}`,
          src: imageStr ? resolveApiUrl(imageStr) : defaultImages[idx % defaultImages.length]?.src || ''
        };
      });
    }
    return defaultImages;
  }, [data]);

  if (loading) {
    return (
      <MMSLayout title="Classroom">
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
    <MMSLayout title="Classroom">
      <FacilitiesSectionCard title="Classroom" subtitle="Modern classroom infrastructure for interactive learning">
        <div className={`grid grid-cols-1 gap-5 ${galleryItems.length > 4 ? 'md:grid-cols-3' : 'sm:grid-cols-2'}`}>
          {galleryItems.map((img, i) => (
            <FacilitiesImageHolder key={i} label={img.label} src={img.src} size={galleryItems.length > 4 ? 'large' : 'default'} />
          ))}
        </div>
      </FacilitiesSectionCard>
    </MMSLayout>
  );
}
