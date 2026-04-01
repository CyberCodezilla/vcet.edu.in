import React, { useEffect, useState } from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import { PlacementImageHolder, PlacementSectionCard } from './MMSPlacementShared';
import { get, resolveApiUrl } from '../../../services/api';
import type { TrainingPlacementData } from '../../../admin/types';

export default function MMSPlacementGallery() {
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
      <MMSLayout title="Gallery">
        <PlacementSectionCard title="Placement Gallery" subtitle="Highlights from placement activities, sessions, and engagement events">
           <div className="py-20 text-center text-slate-500 animate-pulse">Loading Gallery...</div>
        </PlacementSectionCard>
      </MMSLayout>
    );
  }

  const defaultImages = [
    { id: 1, src: '/images/Departments/MMS(MBA)/Training And Placement/Placement/Gallery_MMS/Placement_-_Gallery_IMG1.jpg' },
    { id: 2, src: '/images/Departments/MMS(MBA)/Training And Placement/Placement/Gallery_MMS/Placement_-_Gallery_IMG2.jpg' },
    { id: 3, src: '/images/Departments/MMS(MBA)/Training And Placement/Placement/Gallery_MMS/Placement_-_Gallery_IMG3.jpg' },
    { id: 4, src: '/images/Departments/MMS(MBA)/Training And Placement/Placement/Gallery_MMS/Placement_-_Gallery_IMG4.jpg' },
    { id: 5, src: '/images/Departments/MMS(MBA)/Training And Placement/Placement/Gallery_MMS/Placement_-_Gallery_IMG5.jpg' },
    { id: 6, src: '/images/Departments/MMS(MBA)/Training And Placement/Placement/Gallery_MMS/Placement_-_Gallery_IMG6.png' },
    { id: 7, src: '/images/Departments/MMS(MBA)/Training And Placement/Placement/Gallery_MMS/Placement_-_Gallery_IMG7.jpg' },
    { id: 8, src: '/images/Departments/MMS(MBA)/Training And Placement/Placement/Gallery_MMS/Placement_-_Gallery_IMG8.png' },
    { id: 9, src: '/images/Departments/MMS(MBA)/Training And Placement/Placement/Gallery_MMS/Placement_-_Gallery_IMG9.jpg' },
  ];

  const gallery = data?.placementGallery && data.placementGallery.length > 0
    ? data.placementGallery.map((img, idx) => ({
        id: idx,
        label: img.label || `Placement Gallery ${String(idx + 1).padStart(2, '0')}`,
        src: resolveApiUrl(img.image) || undefined
      }))
    : defaultImages;

  return (
    <MMSLayout title="Gallery">
      <PlacementSectionCard title="Placement Gallery" subtitle="Highlights from placement activities, sessions, and engagement events">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {gallery.map((img, index) => (
             <PlacementImageHolder key={img.id || index} label={(img as any).label || `Placement Gallery`} size="large" src={img.src} imageSrc={img.src} />
          ))}
        </div>
      </PlacementSectionCard>
    </MMSLayout>
  );
}
