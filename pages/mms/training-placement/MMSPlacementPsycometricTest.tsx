import React, { useEffect, useState } from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import { PlacementImageHolder, PlacementSectionCard } from './MMSPlacementShared';
import { get, resolveApiUrl } from '../../../services/api';
import type { TrainingPlacementData } from '../../../admin/types';

export default function MMSPlacementPsycometricTest() {
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

  const testData = data?.psychometricTest;

  if (loading) {
    return (
      <MMSLayout title="Psycometric Test">
        <PlacementSectionCard title="Psycometric Test" subtitle="Assessment framework for specialization guidance and career alignment">
           <div className="py-20 text-center text-slate-500 animate-pulse">Loading Psycometric Test Details...</div>
        </PlacementSectionCard>
      </MMSLayout>
    );
  }

  const paragraph = testData?.paragraph 
    ? testData.paragraph
    : "The Psycometric and subject knowledge test was conducted in an online mode and comprised multiple sections, including logical reasoning, business aptitude, personality mapping, and domain-specific knowledge. The test was designed and conducted by Coding Genius Lab, a reputed organization specializing in educational assessments and skill-based evaluations. The test included scenario-based questions and analytical exercises tailored to management students. A total of 46 FYMMS students actively participated in the assessment. The results will be utilized to offer personalized guidance to each student while selecting from available specializations such as Marketing, Finance, Operations, Human Resources, and Business Analytics. The activity was well-coordinated by the MMS Department faculty and proved to be an eye-opener for many students. It provided them with a structured framework to evaluate their career interests and academic capabilities.";

  const images = testData?.images && testData.images.length > 0
    ? testData.images.map(img => ({
        label: img.label || 'Psycometric Test',
        src: resolveApiUrl(img.image) || undefined
      }))
    : [
        { label: "Psycometric Test 01", src: "/images/Departments/MMS(MBA)/Training And Placement/Placement/Pscometric Test_MMS/Placement_-_Psycometric_Test_IMG1.png" },
        { label: "Psycometric Test 02", src: "/images/Departments/MMS(MBA)/Training And Placement/Placement/Pscometric Test_MMS/Placement_-_Psycometric_Test_IMG2.png" }
      ];

  return (
    <MMSLayout title="Psycometric Test">
      <PlacementSectionCard
        title="Psycometric Test"
        subtitle="Assessment framework for specialization guidance and career alignment"
      >
        <p className="text-[17px] leading-8 text-slate-700 whitespace-pre-wrap">
          {paragraph}
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
           {images.map((img, idx) => (
             <PlacementImageHolder key={idx} label={img.label} size="large" src={img.src} imageSrc={img.src} />
           ))}
        </div>
      </PlacementSectionCard>
    </MMSLayout>
  );
}
