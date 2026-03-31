import React, { useState, useEffect } from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import { StudentsLifeImageHolder, StudentsLifeSectionCard } from './MMSStudentsLifeShared';
import { get, resolveApiUrl } from '../../../services/api';
import type { MMSStudentsLifeData } from '../../../admin/types';

export default function MMSStudentsLifeAboutAddOnCourses() {
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
          {data?.addOnCourses?.description || `30-Hours Add-On Course for MMS Students on each of the following topics: Excel, Communication Skills, and
          Campus Recruitment Training. To enhance the employability and professional skills of our MMS students, a
          comprehensive 30-hour add-on course was conducted, focusing on Excel proficiency, communication skills, and
          campus recruitment training. This add-on course significantly improved students data handling, communication,
          and recruitment skills, bridging the gap between academic knowledge and industry requirements. The practical
          approach ensured students could apply what they learned in realistic scenarios. By focusing on Excel,
          communication skills, and campus recruitment preparation, this course has equipped MMS students with essential
          tools for their professional careers, ensuring they are well-prepared for the demands of the job market.`}
        </p>

        {data?.addOnCourses?.topics && data.addOnCourses.topics.length > 0 && (
          <div className="mt-8 space-y-3">
            <h4 className="text-xl font-bold text-brand-navy">Topics Covered:</h4>
            <ul className="space-y-3">
              {data.addOnCourses.topics.map((item, index) => (
                <li key={index} className="flex items-start gap-3 border border-brand-blue/18 bg-gradient-to-r from-white to-brand-light/25 px-4 py-3 text-[16px] leading-7 text-slate-700">
                  <span className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center bg-brand-navy text-xs font-bold text-brand-gold">{index + 1}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {data?.addOnCourses?.objectives && data.addOnCourses.objectives.length > 0 && (
          <div className="mt-8 space-y-3">
            <h4 className="text-xl font-bold text-brand-navy">Objectives:</h4>
            <ul className="space-y-3">
              {data.addOnCourses.objectives.map((item, index) => (
                <li key={index} className="flex items-start gap-3 border border-brand-blue/18 bg-gradient-to-r from-white to-brand-light/25 px-4 py-3 text-[16px] leading-7 text-slate-700">
                  <span className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center bg-brand-navy text-xs font-bold text-brand-gold">{index + 1}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
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
