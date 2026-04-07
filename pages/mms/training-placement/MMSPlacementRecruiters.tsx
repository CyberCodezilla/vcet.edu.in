import React, { useEffect, useState } from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import { PlacementSectionCard } from './MMSPlacementShared';
import { get, resolveApiUrl } from '../../../services/api';
import type { TrainingPlacementData } from '../../../admin/types';
import { resolveUploadedAssetUrl } from '../../../utils/uploadedAssets';

export default function MMSPlacementRecruiters() {
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

  const defaultImages = [
    '/images/Departments/MMS(MBA)/Training And Placement/Placement/Our_Recruiters/Placement_-_Our_Recruiters_IMG1.png',
    '/images/Departments/MMS(MBA)/Training And Placement/Placement/Our_Recruiters/Placement_-_Our_Recruiters_IMG2.png',
    '/images/Departments/MMS(MBA)/Training And Placement/Placement/Our_Recruiters/Placement_-_Our_Recruiters_IMG3.png',
    '/images/Departments/MMS(MBA)/Training And Placement/Placement/Our_Recruiters/Placement_-_Our_Recruiters_IMG4.jpeg',
    '/images/Departments/MMS(MBA)/Training And Placement/Placement/Our_Recruiters/Placement_-_Our_Recruiters_IMG5.png',
    '/images/Departments/MMS(MBA)/Training And Placement/Placement/Our_Recruiters/Placement_-_Our_Recruiters_IMG6.png',
    '/Images/Departments/MMS(MBA)/Training And Placement/Placement/Our_Recruiters/Placement_-_Our_Recruiters_IMG7.png',
    '/Images/Departments/MMS(MBA)/Training And Placement/Placement/Our_Recruiters/Placement_-_Our_Recruiters_IMG8.webp',
    '/Images/Departments/MMS(MBA)/Training And Placement/Placement/Our_Recruiters/Placement_-_Our_Recruiters_IMG9.png',
  ];

  const bannerImg = data?.recruitersBanner?.image
    ? resolveUploadedAssetUrl(data.recruitersBanner.image) ?? resolveApiUrl(data.recruitersBanner.image)
    : null;
const bannerLabel = data?.recruitersBanner?.label || "";

  return (
    <MMSLayout title="Our Recruiters">
      <PlacementSectionCard title="Our Recruiters" subtitle="Top companies hiring our management graduates">
        {loading ? (
          <div className="py-20 text-center text-slate-500 animate-pulse">Loading Recruiters...</div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6">
              {bannerImg && (
                <div className="flex flex-col items-center justify-center rounded-none bg-white p-4 shadow-sm border border-brand-blue/15">
                  <img src={bannerImg} alt={bannerLabel || "Uploaded Recruiter"} className="max-h-24 w-auto object-contain" />
                  {bannerLabel && <span className="mt-2 text-xs font-bold text-[#0d4888] text-center">{bannerLabel}</span>}
                </div>
              )}
              {defaultImages.map((src, index) => (
                <div key={index} className="flex items-center justify-center rounded-none bg-white p-4 shadow-sm border border-brand-blue/15">
                  <img src={resolveUploadedAssetUrl(src) ?? src} alt={`Recruiter ${index + 1}`} className="max-h-24 w-auto object-contain" />
                </div>
              ))}
            </div>
          </div>
        )}
      </PlacementSectionCard>
    </MMSLayout>
  );
}
