import React, { useState, useEffect } from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import { get } from '../../../services/api';
import type { TrainingPlacementData, InternshipStep } from '../../../admin/types';

export default function MMSTrainingInternship() {
  const [data, setData] = useState<TrainingPlacementData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get('/pages/mms-training-placement');
        setData(response.data);
      } catch (err) {
        console.error('Failed to fetch training internship data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fallbackSteps: InternshipStep[] = [
    { step: 'At first Training and Placement cell issue a letter for summer/winter internship for each student.' },
    { step: 'Students submit this letter to individual organization/industry from where they need to seek training as an intern.' },
    { step: 'After completion of training, industry gives a certificate or assessment letter.' },
    { step: 'Students submit Xerox copy of their training certificate issued by industry to training and placement cell.' },
    { step: 'Students submit feedback and training report for the completed internship.' }, 
  ];

  const steps = (data?.internshipSteps && data.internshipSteps.length > 0) ? data.internshipSteps : fallbackSteps;

  return (
    <MMSLayout title="Internship">
      <section className="space-y-6">
        <article className="overflow-hidden rounded-none border border-brand-navy/25 bg-white shadow-[0_18px_34px_-24px_rgba(11,61,145,0.55)]">
          <div className="border-b border-brand-gold/60 bg-gradient-to-r from-brand-navy via-brand-blue to-brand-navy px-5 py-5 sm:px-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold/95">Training and Placement</p>
            <h3 className="mt-1 text-2xl font-display font-bold text-white sm:text-3xl">Internship</h3>
          </div>

          <div className="space-y-8 px-5 py-6 sm:px-7">
            <p className="text-[18px] leading-9 text-slate-700">
              Gaining from course books, lectures and other investigation material does not get the job done for all encompassing learning. Down to earth and hands-on learning is fundamental for better comprehension of work forms. Industry internships are sorted out to uncover the students for industry condition which upgrades the down to earth comprehension of the ideas. The students are urged to take up internship programs during their semester break. Training and Placement cell give their guidelines, recommendations, scope and contact subtleties of industries. They additionally help the students by interacting with the industry persons, give them recommendation letters and other fundamental backings.        
            </p>

            <section className="space-y-4">
              <h4 className="text-2xl font-display font-bold text-brand-navy">Procedure</h4>
              <div className="space-y-3">
                {loading ? (
                  Array.from({ length: 5 }).map((_, idx) => (
                    <article key={idx} className="rounded-none border border-brand-blue/18 bg-gradient-to-r from-white to-brand-light/28 px-4 py-4 shadow-[0_10px_22px_-20px_rgba(11,61,145,0.8)] sm:px-5 animate-pulse">
                      <div className="flex items-start gap-3">
                        <span className="inline-flex h-8 w-8 flex-shrink-0 bg-slate-200 rounded-none"></span>
                        <div className="h-5 bg-slate-200 w-3/4 rounded-none mt-1"></div>
                      </div>
                    </article>
                  ))
              ) : (
                steps.map((item, index) => (
                  <article key={index} className="rounded-none border border-brand-blue/18 bg-gradient-to-r from-white to-brand-light/28 px-4 py-4 shadow-[0_10px_22px_-20px_rgba(11,61,145,0.8)] sm:px-5">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-none bg-brand-navy text-sm font-bold text-brand-gold">
                        {index + 1}
                      </span>
                      <p className="pt-0.5 text-[17px] leading-8 text-slate-700">{item.step}</p>
                    </div>
                  </article>
                ))
              )
}
            </div>
          </section>
        </div>
      </article>
    </section>
  </MMSLayout>
);
}
