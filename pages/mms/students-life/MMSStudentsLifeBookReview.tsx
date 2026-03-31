import React, { useState, useEffect } from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import { StudentsLifeImageHolder, StudentsLifeSectionCard } from './MMSStudentsLifeShared';
import { get, resolveApiUrl } from '../../../services/api';
import type { MMSStudentsLifeData } from '../../../admin/types';

export default function MMSStudentsLifeBookReview() {
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
    { id: 'def-1', label: "Book Review Session 01", src: "/images/Departments/MMS(MBA)/Students life/mms-studentlife-bookreview-1.jpg" },
    { id: 'def-2', label: "Book Review Session 02", src: undefined },
  ];

  const backendImages = (data?.bookReview?.images || []).map((img, i) => ({
    id: `dyn-${i}`,
    label: img.label || `Book Review Session ${String(defaultImages.length + i + 1).padStart(2, '0')}`,
    src: resolveApiUrl(img.image),
  })).filter(img => img.src);

  // Use backend images to overwrite undefined placeholders, or just append them if enough images exist
  const allImages = backendImages.length > 0 
    ? [...defaultImages.filter(di => di.src !== undefined), ...backendImages] 
    : defaultImages;

  return (
    <MMSLayout title="Book Review">
      <StudentsLifeSectionCard title="Book Review" subtitle="Critical reading and reflective learning for future business leaders">
        <p className="text-[17px] leading-8 text-slate-700">
          {data?.bookReview?.description || `Book review activities are invaluable for developing critical thinking and analytical skills. They encourage
          students to engage deeply with business literature, enhancing their understanding of key concepts and
          theories. By articulating their insights and critiques, students improve their communication skills. This
          activity also fosters a habit of continuous learning, essential for future business leaders. Our students at
          the department have successfully reviewed and presented their learning on selected books.`}
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {allImages.map(({ id, label, src }) => (
             <StudentsLifeImageHolder key={id} label={label} size="large" src={src} />
          ))}
        </div>
      </StudentsLifeSectionCard>
    </MMSLayout>
  );
}
