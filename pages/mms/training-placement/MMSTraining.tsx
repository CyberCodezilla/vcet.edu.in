import React, { useState, useEffect } from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import { get } from '../../../services/api';
import type { TrainingPlacementData } from '../../../admin/types';

export default function MMSTraining() {
  const [data, setData] = useState<TrainingPlacementData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get('/pages/mms-training-placement');
        setData(response.data);
      } catch (err) {
        console.error('Failed to fetch training placement data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const trainingPoints = (data?.trainingPoints && data.trainingPoints.length > 0) ? data.trainingPoints : [
    { point: 'Scheduling of pre-placement training programs in conjunction with academic schedule.' },
    { point: 'Conducting Aptitude Development training sessions right from SEMESTER-1 to provide high-quality training by seasoned trainers experienced in corporate education.' },
    { point: 'Conducting technical and domain specific training sessions.' },
    { point: 'Orientation of students on core companies opportunities and preparations required for placements.' },
    { point: "Identification of students' soft skills and Aptitude development/training needs and provide additional sessions either through external/internal resources." },
  ];

  return (
    <MMSLayout title="Training">
      <section className="space-y-6">
        <article className="overflow-hidden rounded-none border border-brand-navy/25 bg-white shadow-[0_18px_34px_-24px_rgba(11,61,145,0.55)]">
          <div className="border-b border-brand-gold/60 bg-gradient-to-r from-brand-navy via-brand-blue to-brand-navy px-5 py-5 sm:px-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold/95">Training and Placement</p>
            <h3 className="mt-1 text-2xl font-display font-bold text-white sm:text-3xl">Pre-Placement Training Framework</h3>
          </div>

          <div className="space-y-6 px-5 py-6 sm:px-7">
            <p className="text-[18px] leading-9 text-slate-700">
              To gear-up the students for facing the recruitment process successfully, an extensive pre-placement training on aptitude, group discussions, interviews and presentation is offered to the students. The various measures taken in line with this are:
            </p>

            <div className="space-y-4">
              {loading ? (
                Array.from({ length: 5 }).map((_, idx) => (
                  <article
                    key={idx}
                    className="rounded-none border border-brand-blue/18 bg-gradient-to-r from-white to-brand-light/28 px-4 py-4 shadow-[0_10px_22px_-20px_rgba(11,61,145,0.8)] sm:px-5"
                  >
                    <div className="flex items-start gap-3 animate-pulse">
                      <span className="inline-flex h-8 w-8 flex-shrink-0 bg-slate-200 rounded-none"></span>
                      <div className="flex-1 space-y-2 pt-1">
                        <div className="h-4 bg-slate-200 rounded-none w-full"></div>
                        <div className="h-4 bg-slate-200 rounded-none w-5/6"></div>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                trainingPoints.map((item, index) => (
                  <article
                    key={index}
                    className="rounded-none border border-brand-blue/18 bg-gradient-to-r from-white to-brand-light/28 px-4 py-4 shadow-[0_10px_22px_-20px_rgba(11,61,145,0.8)] sm:px-5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-none bg-brand-navy text-sm font-bold text-brand-gold">
                        {index + 1}
                      </span>
                      <p className="pt-0.5 text-[17px] leading-8 text-slate-700">{item.point}</p>
                    </div>
                  </article>
                ))
              ) 
          }
            </div>
          </div>
        </article>
      </section>
    </MMSLayout>
  );
}
