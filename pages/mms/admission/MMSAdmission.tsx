import React, { useEffect, useState } from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import { get, resolveApiUrl } from '../../../services/api';

const criteriaPoints = [
  'The candidate should possess minimum 50% marks in aggregate or equivalent CGPA (45% in case of backward class categories and persons with disability belonging to Maharashtra State only) in any Bachelor\'s degree awarded by a recognized University.',
  'Candidate should have appeared for MAH-MBA/MMS-CET (first preference) or CMAT/CAT/MAT/ATMA/XAT/GMAT of the respective year of admission.',
];

const certificatePoints = [
  'Candidates who are graduates of the University of Mumbai will be required to produce a Transfer Certificate from the constituent college of the University last attended by them.',
  'Candidates who are graduates from other Universities will be required to produce a provisional Eligibility Certificate issued by the Registrar, University of Mumbai declaring them eligible for admission to the course. A provisional eligibility certificate is issued by the Registrar to a candidate who is prima facie found eligible for admission to the MMS course on making an application in the prescribed form and on paying the prescribed fee. Tuition fees will be accepted only after candidates from Universities other than the University of Mumbai produce a provisional eligibility certificate.',
  'The candidate should produce a Validity Certificate of the candidate\'s qualifying degree certificate from their respective university.',
  'A selected candidate, at the time of joining the program, has to finish Undertakings/Affidavits listed in the admission form as per the prescribed formats (given at the time of admission) to the effect that he/she accepts the said prerogative of the Institute.',
];

const resources = [
  'https://mu.ac.in/admission',
  'https://cetcell.mahacet.org/',
];

export default function MMSAdmission() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get('/pages/mms-admission')
      .then((res: any) => {
        if (res.data && !Array.isArray(res.data)) {
          setData(res.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const hasData = data && Object.keys(data).length > 0;

  const dynamicCriteriaPoints = hasData && data.eligibilityCriteria && data.entranceExamination ? [
    `The candidate should possess minimum ${data.eligibilityCriteria.generalPercentage || '50%'} marks in aggregate or equivalent CGPA (${data.eligibilityCriteria.reservedPercentage || '45%'} in case of backward class categories and persons with disability belonging to Maharashtra State only) in any ${data.eligibilityCriteria.degreeRequirement || "Bachelor's degree awarded by a recognized University"}.`,
    `Candidate should have appeared for ${data.entranceExamination.primaryExam || 'MAH-MBA/MMS-CET'} (first preference) or ${data.entranceExamination.alternativeExams?.map((e: any) => e.exam).filter(Boolean).join('/') || 'CMAT/CAT/MAT/ATMA/XAT/GMAT'} of the respective year of admission.`
  ] : criteriaPoints;

  const dynamicCertificatePoints = hasData && data.eligibilityCertificates && data.eligibilityCertificates.length > 0 
    ? data.eligibilityCertificates.map((c: any) => c.certificate) 
    : certificatePoints;

  const dynamicResources = hasData && data.universityLinks && data.universityLinks.length > 0 
    ? data.universityLinks.map((l: any) => l.url) 
    : resources;

  return (
    <MMSLayout title="Eligibility Criteria">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-brand-gold" />
          <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-brand-gold">Master of Management Studies</span>
        </div>

        <section>
          {loading ? (
             <div className="flex h-64 w-full items-center justify-center border border-slate-200 bg-white p-6 shadow-sm">
               <p className="text-sm font-bold uppercase tracking-widest text-brand-navy/50">Loading admission criteria...</p>
             </div>
          ) : (
          <article className="space-y-10 border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <section id="eligibility-criteria" className="space-y-5 scroll-mt-40">
              <h2 className="text-2xl font-display font-bold text-[#0d2d56] md:text-3xl">Eligibility Criteria</h2>
              <div className="h-px bg-gradient-to-r from-brand-gold via-brand-navylight to-transparent" />
              <ol className="space-y-4">
                {dynamicCriteriaPoints.map((point, index) => (
                  <li key={index} className="border border-slate-200 bg-slate-50 p-4 text-[17px] leading-8 text-slate-700">
                    <span className="mr-2 font-bold text-[#0d2d56]">{index + 1}.</span>
                    {point}
                  </li>
                ))}
              </ol>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-display font-bold text-[#0d2d56] md:text-3xl">Eligibility Certificates / Affidavits</h2>
              <div className="h-px bg-gradient-to-r from-brand-gold via-brand-navylight to-transparent" />
              <ol className="space-y-4">
                {dynamicCertificatePoints.map((point: string, index: number) => (
                  <li key={index} className="border border-slate-200 bg-slate-50 p-4 text-[17px] leading-8 text-slate-700">
                    <span className="mr-2 font-bold text-[#0d2d56]">{index + 1}.</span>
                    {point}
                  </li>
                ))}
              </ol>

              <div className="grid gap-3 pt-1">
                {dynamicResources.map((url: string, index: number) => (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="border border-brand-blue/25 bg-brand-light/35 px-4 py-3 text-[16px] font-semibold text-brand-blue transition hover:bg-brand-light"
                  >
                    {index + 5}. {url}
                  </a>
                ))}
              </div>
            </section>

            <section id="documents-required" className="space-y-3 scroll-mt-40">
              <h3 className="text-xl font-display font-bold text-[#0d2d56]">Documents Required</h3>
              <p className="border border-slate-200 bg-slate-50 p-4 text-[17px] leading-8 text-slate-700">
                Refer to the admission form checklist and University/CET notifications for the latest required document list at the time of admission.
              </p>
            </section>

            <section id="fees-structure" className="space-y-3 scroll-mt-40">
              <h3 className="text-xl font-display font-bold text-[#0d2d56]">Fees Structure</h3>
              <p className="border border-slate-200 bg-slate-50 p-4 text-[17px] leading-8 text-slate-700">
                Fees structure is governed by applicable regulatory norms and institute notifications. Please refer to the official Admission / Fees circular for the current academic year.
              </p>
            </section>
          </article>
          )}
        </section>
      </div>
    </MMSLayout>
  );
}