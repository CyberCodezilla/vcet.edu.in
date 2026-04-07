import React, { useState, useEffect } from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import HorizontalTableShell from '../../../components/mms/HorizontalTableShell';
import { get, resolveApiUrl } from '../../../services/api';
import type { TrainingPlacementData, CareerGuidanceSeminar } from '../../../admin/types';
import { resolveUploadedAssetUrl } from '../../../utils/uploadedAssets';

export default function MMSTrainingCareerGuidance() {
  const [data, setData] = useState<TrainingPlacementData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get('/pages/mms-training-placement');
        setData((response as any).data);
      } catch (err) {
        console.error('Failed to fetch training placement data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const guidancePoints = (data?.careerGuidance?.guidancePoints && data.careerGuidance.guidancePoints.length > 0) 
    ? data.careerGuidance.guidancePoints 
    : [
        { point: 'Seminars on Higher Studies' },
        { point: 'Talks on Career Guidance' },
        { point: 'Motivational lectures by Alumni, Entrepreneurs, Industry guests and Faculty.' },
        { point: 'Subscription of newspapers related to career opportunities such as Rojgar Samachar.' },
      ];

  const fallbackSeminars: CareerGuidanceSeminar[] = [
    {
      title: 'Seminar on Business Processes',
      resourceDetails: 'Mr. Swapnil Kondle\nCEO, SS Dies Works. Experience of 10 Years in Product Management and Service Delivery across Banking, Telecom and Manufacturing. Experience - 15 Years',
      image: '/images/Departments/MMS(MBA)/Training And Placement/Training/Career Guidance/Training_Career_Guidance_-_Mr.Swapnil_kondle.jpg'
    },
    {
      title: 'Seminar on Financial Management',
      resourceDetails: 'Ms. Aishwarya Mohol\nTreasury Deputy Manager in Forex at Axis Bank Mumbai. Experience - 10 Years',
      image: '/images/Departments/MMS(MBA)/Training And Placement/Training/Career Guidance/Training_Career_Guidance_-_Ms.Aishwarya_Mohol.jpg'
    }
  ];

  const seminars = (data?.careerGuidance?.seminars && data.careerGuidance.seminars.length > 0) 
    ? data.careerGuidance.seminars 
    : fallbackSeminars;

  return (
    <MMSLayout title="Career Guidance">
      <section className="space-y-6">
        <article className="overflow-hidden rounded-none border border-brand-navy/25 bg-white shadow-[0_18px_34px_-24px_rgba(11,61,145,0.55)]">
          <div className="border-b border-brand-gold/60 bg-gradient-to-r from-brand-navy via-brand-blue to-brand-navy px-5 py-5 sm:px-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold/95">Training and Placement</p>
            <h3 className="mt-1 text-2xl font-display font-bold text-white sm:text-3|e">Career Guidance</h3>
          </div>

          <div className="space-y-5 px-5 py-6 sm:px-7">
            <p className="text-[18px] leading-9 text-slate-700">
              In line with objective of helping in placing students in competitively good companies, apropos initiatives are taken to counsel the students with respect to career guidance and higher education. Some of them are:
            </p>

            <ul className="space-y-3">
              {loading ? (
                Array.from({ length: 4 }).map((_, idx) => (
                  <li key={idx} className="flex items-start gap-3 rounded-none border border-brand-blue/18 bg-gradient-to-r from-white to-brand-light/28 px-4 py-3 animate-pulse">
                    <span className="inline-flex h-8 w-8 flex-shrink-0 bg-slate-200 rounded-none"></span>
                    <div className="h-5 bg-slate-200 rounded-none w-3/4 mt-1.5"></div>
                  </li>
                ))
              ) : (
                guidancePoints.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 rounded-none border border-brand-blue/18 bg-gradient-to-r from-white to-brand-light/28 px-4 py-3 text-[17px] leading-8 text-slate-700">
                    <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-none bg-brand-navy text-sm font-bold text-brand-gold"> 
                      {index + 1}
                    </span>
                    <span>{item.point}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </article>

        <section className="overflow-hidden rounded-none border border-brand-navy/25 bg-white shadow-[0_18px_36px_-26px_rgba(11,61,145,0.6)]">
          <div className="px-3 py-3 sm:px-4 sm:py-4 md:px-5">
            <HorizontalTableShell storageKey="mms-table-hint-career-guidance" scrollerClassName="border border-brand-navy/20 bg-white">
              <table className="w-full min-w-[980px] snap-start border-collapse">
              <thead>
                <tr className="text-white">
                  <th className="sticky top-0 z-20 w-[70px] border border-[#0a325f] bg-[#0d4888] px-3 py-3 text-left text-xl font-bold uppercase">Sr.</th>      
                  <th className="sticky top-0 z-20 w-[300px] border border-[#0a325f] bg-[#0d4888] px-3 py-3 text-left text-xl font-bold">Event</th>
                  <th className="sticky top-0 z-20 border border-[#0a325f] bg-[#0d4888] px-3 py-3 text-left text-xl font-bold">Resource Person</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 2 }).map((_, idx) => (
                    <tr key={idx} className="align-top animate-pulse">
                      <td className="border border-slate-700/80 px-3 py-3"><div className="h-5 w-5 bg-slate-200"></div></td>
                      <td className="border border-slate-700/80 px-3 py-3"><div className="h-5 w-3/4 bg-slate-200"></div></td>
                      <td className="border border-slate-700/80 px-3 py-3">
                        <div className="space-y-2">
                          <div className="h-20 w-20 bg-slate-200"></div>
                          <div className="h-5 w-1/3 bg-slate-200"></div>
                          <div className="h-10 w-full bg-slate-200"></div>
                        </div>
                      </td>
                    </tr>
                  ))
              ) : (
                seminars.map((seminar, idx) => {
                  const lines = seminar.resourceDetails.split('\n');
                  const name = lines[0];
                  const desc = lines.slice(1).join('\n');
                  return (
                    <tr key={idx} className="align-top hover:bg-slate-50">
                      <td className="border border-slate-700/80 px-3 py-3 text-base text-slate-900">{idx + 1}</td>
                      <td className="border border-slate-700/80 px-3 py-3 text-lg leading-[1.5] text-slate-900">{seminar.title}</td>
                      <td className="border border-slate-700/80 px-3 py-3 text-slate-900">
                        <div className="space-y-2">
                          {seminar.image ? (
                            <div className="flex h-20 w-20 items-center justify-center rounded-none border border-brand-blue/25 bg-slate-50 overflow-hidden">
                              <img src={resolveUploadedAssetUrl(seminar.image) ?? resolveApiUrl(seminar.image)} alt={name} className="h-full w-full object-cover" />
                            </div>
                          ) : null}
                          {name ? <p className="text-base leading-7 font-semibold">{name}</p> : null}
                          {desc ? <p className="text-sm leading-6 text-slate-700">{desc}</p> : null}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
            </table>
          </HorizontalTableShell>
        </div>
      </section>
    </section>
  </MMSLayout>
) }
