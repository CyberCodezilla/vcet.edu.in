import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import MMSLayout from '../../../components/mms/MMSLayout';
import { StudentsLifeImageHolder, StudentsLifeSectionCard } from './MMSStudentsLifeShared';
import { get, resolveApiUrl } from '../../../services/api';
import type { MMSStudentsLifeData } from '../../../admin/types';

export default function MMSStudentsLifeCustomEvent() {
  const { slug } = useParams<{ slug: string }>();
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
  }, [slug]);

  if (loading) {
    return <MMSLayout title="Loading..."><div className="p-10 text-center text-slate-500 animate-pulse">Loading event details...</div></MMSLayout>;
  }

  const customEvents = data?.customEvents || [];
  const event = customEvents.find(e => e.slug === slug);

  if (!event) {
    return <Navigate to="/mms/students-life" replace />;
  }

  const images = event.images || [];

  return (
    <MMSLayout title={event.name}>
      <StudentsLifeSectionCard
        title={event.name}
        subtitle="MMS Student Life Activity"
      >
        <p className="text-[17px] leading-8 text-slate-700 whitespace-pre-wrap">
          {event.description}
        </p>

        {images.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-8">
            {images.map((img: any, idx) => (
              <StudentsLifeImageHolder
                key={idx}
                label={img.label || `Image ${(idx + 1).toString().padStart(2, '0')}`}
                size="large"
                src={resolveApiUrl(img.url || img.image) || ''}
              />
            ))}
          </div>
        )}
      </StudentsLifeSectionCard>
    </MMSLayout>
  );
}
