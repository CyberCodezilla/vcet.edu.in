import React, { useState, useEffect } from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import { StudentsLifeImageHolder, StudentsLifeSectionCard } from './MMSStudentsLifeShared';
import { get, resolveApiUrl } from '../../../services/api';
import type { MMSStudentsLifeData } from '../../../admin/types';

export default function MMSStudentsLifeAboutAddOnCourses() {
  const [data, setData] = useState<MMSStudentsLifeData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get<{ data: MMSStudentsLifeData }>('/pages/mms-students-life');
        setData(response.data);
      } catch (err) {
        console.error('Failed to fetch students life data:', err);
      }
    };
    fetchData();
  }, []);

  const defaultTopics = [
    { id: 'def-1', topic: 'Communication Skills', src: '/images/Departments/MMS(MBA)/Students life/mms-studentlife-aboutaddoncourses-1.jpg' },
    { id: 'def-2', topic: 'Excel proficiency', src: '/images/Departments/MMS(MBA)/Students life/mms-studentlife-aboutaddoncourses-2.jpg' },
    { id: 'def-3', topic: 'Campus Recruitment Training', src: '/images/Departments/MMS(MBA)/Students life/mms-studentlife-aboutaddoncourses-3.jpg' },
  ];

  const backendImages = (data?.addOnCourses?.images || []).map((img, i) => ({
    id: `dyn-${i}`,
    topic: img.label || `Course Activity ${i + 1}`,
    src: resolveApiUrl(img.image),
  })).filter(img => img.src);

  const allTopics = [...defaultTopics, ...backendImages];

  return (
    <MMSLayout title="Add-on Courses">
      <StudentsLifeSectionCard
        title="Add-on Courses"
        subtitle="30-hour skill enhancement modules aligned with employability outcomes"
      >
        <p className="text-[17px] leading-8 text-slate-700">
          30-Hours Add-On Course for MMS Students on each of the following topics: Excel, Communication Skills, and
          Campus Recruitment Training. To enhance the employability and professional skills of our MMS students, a
          comprehensive 30-hour add-on course was conducted, focusing on Excel proficiency, communication skills, and
          campus recruitment training. This add-on course significantly improved students data handling, communication,
          and recruitment skills, bridging the gap between academic knowledge and industry requirements. The practical
          approach ensured students could apply what they learned in realistic scenarios. By focusing on Excel,
          communication skills, and campus recruitment preparation, this course has equipped MMS students with essential
          tools for their professional careers, ensuring they are well-prepared for the demands of the job market.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {allTopics.map(({ id, topic, src }) => (
            <article key={id} className="space-y-3">
              <StudentsLifeImageHolder label={topic} src={src} />
              <p className="border-l-2 border-brand-gold pl-3 text-sm font-semibold uppercase tracking-[0.08em] text-brand-navy">{topic}</p>
            </article>
          ))}
        </div>
      </StudentsLifeSectionCard>
    </MMSLayout>
  );
}
