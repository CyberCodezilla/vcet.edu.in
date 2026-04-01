import React, { useState, useEffect } from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import { PlacementImageHolder } from './MMSPlacementShared';
import { get, resolveApiUrl } from '../../../services/api';
import type { TrainingPlacementData, GalleryItem } from '../../../admin/types';

export default function MMSTrainingGallery() {
  const [data, setData] = useState<TrainingPlacementData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get('/pages/mms-training-placement');
        setData(response.data);
      } catch (err) {
        console.error('Failed to fetch training gallery data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fallbackImages: GalleryItem[] = [
    { label: 'Training Gallery 01', image: '/images/Departments/MMS(MBA)/Training And Placement/Training/Gallery/Training-Gallery_IMG1.jpg' },
    { label: 'Training Gallery 02', image: '/images/Departments/MMS(MBA)/Training And Placement/Training/Gallery/Training-Gallery_IMG2.jpg' },
    { label: 'Training Gallery 03', image: '/images/Departments/MMS(MBA)/Training And Placement/Training/Gallery/Training-Gallery_IMG3.jpg' },
    { label: 'Training Gallery 04', image: '/images/Departments/MMS(MBA)/Training And Placement/Training/Gallery/Training-Gallery_IMG4.jpg' },
    { label: 'Training Gallery 05', image: '/images/Departments/MMS(MBA)/Training And Placement/Training/Gallery/Training-Gallery_IMG5.jpg' },
  ];

  const gallery = (data?.trainingGallery && data.trainingGallery.length > 0) ? data.trainingGallery : fallbackImages;

  return (
    <MMSLayout title="Gallery">
      <section className="overflow-hidden rounded-none border border-brand-navy/25 bg-white shadow-[0_18px_34px_-24px_rgba(11,61,145,0.55)]">
        <div className="border-b border-brand-gold/60 bg-gradient-to-r from-brand-navy via-brand-blue to-brand-navy px-5 py-5 sm:px-7">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold/95">Training and Placement</p>
          <h3 className="mt-1 text-2xl font-display font-bold text-white sm:text-3xl">Training Gallery</h3>
        </div>

        <div className="grid grid-cols-1 gap-6 px-5 sm:grid-cols-2 sm:p-7">      
          {loading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="h-[300px] w-full animate-pulse bg-slate-200 border border-slate-300"></div>
            ))
          ) : (
            gallery.map((item, idx) => (
              <PlacementImageHolder 
                key={idx} 
                label={item.label} 
                size="large" 
                imageSrc={item.image ? resolveApiUrl(item.image) : undefined} 
              />
            ))
          )}
        </div>
      </section>
    </MMSLayout>
  );
}
