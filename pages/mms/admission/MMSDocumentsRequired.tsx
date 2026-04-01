import React, { useEffect, useState } from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import { get } from '../../../services/api';

const defaultDocumentPoints = [
  'Provisional allotment letter issue by competent authority (two copies)',
  'Receipt cum acknowledgement copy issued by scrutiny centers (sc copy) (two copies)',
  'Receipt cum acknowledgement of seat acceptance from competent authority',
  'S.S.C. Marksheet',
  'H.S.C. Marksheet/Diploma Marksheet',
  'All years Degree Marksheets',
  'Score card of entrance exam (CET/CAT/CMAT/MAT/XAT/GMAT)',
  'Degree Leaving Certificate',
  'Nationality certificate (if nationality not mentioned on leaving certificate)',
  'Domicile certificate (if birthplace is out of Maharashtra)',
  'Caste Certificate(for all categories except "open")',
  'Caste validity certificate (for all categories except "open")',
  'Non-creamy layer certificate (for all categories except "OPEN", "SC", "ST")',
  'Eligibility certificate (other than Maharashtra Board students)',
  'Migration certificate (other than Maharashtra Board students)',
  'Defence certificate (for defence category students)',
  'Gap certificate (if applicable)',
  'Income certificate issued by tahasildar (for the students)',
  'Physically handicap certificate (if applicable)',
  'Eligibility certificate for economically weaker section (EWS)',
  'Three recent passport size photographs',
];

export default function MMSDocumentsRequired() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get('/pages/mms-documents')
      .then((res: any) => {
        if (res.data && !Array.isArray(res.data)) {
          setData(res.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  let displayDocs: string[] = defaultDocumentPoints;
  if (data) {
    const combined = [
      ...(data.admissionDocs || []),
      ...(data.academicDocs || []),
      ...(data.personalDocs || []),
      ...(data.categoryDocs || []),
      ...(data.specialDocs || [])
    ];
    if (combined.length > 0) {
      displayDocs = combined;
    }
  }

  return (
    <MMSLayout title="Documents Required">
      <div className="space-y-4">
        {loading ? (
          <div className="flex h-64 w-full items-center justify-center border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-widest text-brand-navy/50">Loading documents...</p>
          </div>
        ) : (
          <article className="space-y-4 border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <h2 className="text-2xl font-display font-bold text-[#0d2d56] md:text-3xl">Documents Required</h2>
            <p className="border border-slate-200 bg-slate-50 p-3 text-[16px] leading-7 text-slate-700">
              Original one set of self attested documents only
            </p>

            <ol className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3">
              {displayDocs.map((point, index) => (
                <li key={index} className="border border-slate-200 bg-slate-50 p-3 text-[15px] leading-6 text-slate-700 md:text-[16px] md:leading-7">
                  <span className="mr-2 font-bold text-[#0d2d56]">{index + 1}.</span>
                  {point}
                </li>
              ))}
            </ol>
            
            {data?.additionalDocs && (
              <p className="mt-4 text-[15px] text-slate-700">
                <span className="font-bold text-[#0d2d56]">Additional Note: </span>
                {data.additionalDocs}
              </p>
            )}
          </article>
        )}
      </div>
    </MMSLayout>
  );
}
