import React, { useState, useEffect } from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import { StudentsLifeImageHolder, StudentsLifeSectionCard } from './MMSStudentsLifeShared';
import { get, resolveApiUrl } from '../../../services/api';
import type { MMSStudentsLifeData } from '../../../admin/types';

export default function MMSStudentsLifeIndustryExpertSessions() {
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


  const defaultSessions = [
    { id: 'def-1', text: 'MMS students interacting with industry experts during a knowledge-sharing session.', src: '/images/Departments/MMS(MBA)/Students life/mms-studentlife-industryexpertsession-1.jpeg' },
    { id: 'def-2', text: 'Group photo with esteemed guest speakers and students after an insightful session.', src: '/images/Departments/MMS(MBA)/Students life/mms-studentlife-industryexpertsession-2.jpeg' },
    { id: 'def-3', text: 'Student delivering a presentation during the expert-led session to enhance communication and leadership skills.', src: '/images/Departments/MMS(MBA)/Students life/mms-studentlife-industryexpertsession-3.jpeg' },
  ];

  const backendSessions = (data?.industrySessions?.sessions || []).map((img, i) => ({
    id: `dyn-${i}`,
    text: img.label || `Industry Session ${defaultSessions.length + i + 1}`,
    src: resolveApiUrl(img.image),
  })).filter(img => img.src);

  const allSessions = [...defaultSessions, ...backendSessions];

  return (
    <MMSLayout title="INDUSTRY EXPERT SESSIONS">
      <StudentsLifeSectionCard
        title="INDUSTRY EXPERT SESSIONS"
        subtitle="Connecting classroom concepts with current business practices and leadership perspectives"
      >
        <p className="text-[17px] leading-8 text-slate-700">
          {data?.industrySessions?.description || `As part of our commitment to providing practical insights and real-world knowledge, a series of industry
          expert sessions were organized for MMS students, covering key subjects such as Financial Management, Human
          Resources (HR), and Business Research Methods. These sessions aimed to bridge the gap between academic
          learning and industry practices. The industry expert sessions provided MMS students with valuable exposure to
          current industry practices and trends. By learning directly from seasoned professionals, students could relate
          theoretical knowledge to practical applications, thereby enriching their academic experience and preparing them
          for successful careers. These expert-led sessions have significantly contributed to the professional growth of
          our MMS students, offering them a unique opportunity to learn from and interact with industry leaders. The
          insights gained from these sessions will undoubtedly aid them in navigating their future careers with
          confidence and competence.`}
        </p>

        {data?.industrySessions?.learningPoints && data.industrySessions.learningPoints.length > 0 && (
          <div className="mt-6 border-l-4 border-brand-gold bg-slate-50 p-5">
            <h4 className="text-sm font-bold uppercase text-brand-navy mb-4">Key Learning Points</h4>
            <ul className="space-y-3">
              {data.industrySessions.learningPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-navy text-[10px] font-bold text-white">{index + 1}</span>
                  <span className="text-[15px] leading-6 text-slate-700">{point.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {allSessions.map(({ id, text, src }, index) => (
            <article key={id} className="space-y-3">
              <StudentsLifeImageHolder label={`Industry Session ${index + 1}`} src={src} />
              <p className="border-l-2 border-brand-gold pl-3 text-sm leading-6 text-slate-700">{text}</p>
            </article>
          ))}
        </div>
      </StudentsLifeSectionCard>
    </MMSLayout>
  );
}
