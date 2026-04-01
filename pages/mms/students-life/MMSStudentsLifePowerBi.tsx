import React from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import { StudentsLifeImageHolder, StudentsLifeSectionCard } from './MMSStudentsLifeShared';

import { useState, useEffect } from 'react';
import { get, resolveApiUrl } from '../../../services/api';
import type { MMSStudentsLifeData } from '../../../admin/types';

const powerBiObjectives = [
  'To familiarize participants with the Power BI environment, dashboards, and essential tools.',
  'To teach participants different techniques for data import, cleaning, and transformation using Power Query.',
  'To explore DAX (Data Analysis Expressions), custom visuals, and interactive dashboards.',
  'To provide practical case studies and projects to apply learning in professional scenarios.',
];

const powerBiHighlights = [
  { text: 'Instructor guiding students through a practical Power BI session in the computer lab.', src: '/images/Departments/MMS(MBA)/Students life/mms-studentlife-addoncoursespowerbi-1.jpg' },
  { text: 'Student presenters showcasing their Power BI dashboards and insights to the class.', src: '/images/Departments/MMS(MBA)/Students life/mms-studentlife-addoncoursespowerbi-2.jpg' },
  { text: 'Trainer being felicitated as a token of appreciation for an impactful workshop.', src: '/images/Departments/MMS(MBA)/Students life/mms-studentlife-addoncoursespowerbi-3.jpg' },
  { text: 'Hands-on training session with students working on live Power BI projects.', src: '/images/Departments/MMS(MBA)/Students life/mms-studentlife-addoncoursespowerbi-4.jpeg' },
  { text: 'Instructor revisiting key concepts during a recap session to strengthen student understanding.', src: '/images/Departments/MMS(MBA)/Students life/mms-studentlife-addoncoursespowerbi-5.jpeg' },
];

export default function MMSStudentsLifePowerBi() {
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


  const objectives = data?.powerBi?.objectives && data.powerBi.objectives.length > 0 ? data.powerBi.objectives.map(o => o.text) : powerBiObjectives;

  const backendHighlights = (data?.powerBi?.images || []).map((img, i) => ({
    text: img.label || `PowerBI Session ${i + 1}`,
    src: resolveApiUrl(img.image),
  })).filter(img => img.src);

  const highlights = backendHighlights.length > 0 ? backendHighlights : powerBiHighlights;

  return (
    <MMSLayout title="Add-on Courses on Powerbi">
      <StudentsLifeSectionCard
        title="Add-on Courses on Powerbi"
        subtitle="Applied business intelligence training for data-driven decision making"
      >
        <p className="text-[17px] leading-8 text-slate-700">
          {data?.powerBi?.description || "Vidyavardhini's College of Engineering and Technology (VCET) students from the Master of Management Studies (MMS) Department have organized a Power BI Training Program aimed at enhancing participants' skills in data visualization, business intelligence, and interactive reporting. The program equips participants with essential Power BI capabilities that are widely used in professional and corporate environments."}
        </p>

        <div className="space-y-3">
          <h4 className="text-xl font-bold text-brand-navy">Objectives:</h4>
          <ul className="space-y-3">
            {objectives.map((point, index) => (
              <li key={point} className="flex items-start gap-3 border border-brand-blue/18 bg-gradient-to-r from-white to-brand-light/25 px-4 py-3 text-[16px] leading-7 text-slate-700">
                <span className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center bg-brand-navy text-xs font-bold text-brand-gold">{index + 1}</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-base font-semibold uppercase tracking-[0.08em] text-brand-blue">Timing: Total 30hrs</p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {highlights.map(({ text, src }, index) => (
            <article key={text} className="space-y-3">
              <StudentsLifeImageHolder label={`PowerBI Session ${index + 1}`} size="large" src={src} />
              <p className="border-l-2 border-brand-gold pl-3 text-sm leading-6 text-slate-700">{text}</p>
            </article>
          ))}
        </div>
      </StudentsLifeSectionCard>
    </MMSLayout>
  );
}









