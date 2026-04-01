import React, { useEffect, useState } from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import { get } from '../../../services/api';

const defaultScholarshipPoints = [
  'Minority: The Scheme\'s goal is to provide financial help to underprivileged and deserving students from minority populations (Belonging to minority communities such as Muslims, Sikhs, Christians, Buddhists, Jain, and Zoroastrians (Parsis)).',
  'Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna. (EBC) (As Per the GR Dated 07th Oct 2017, 01st March 2018, 31st March 2018, 11.07.2019)',
  'Post Matric Scholarship to OBC Students. (OBC/Scholarship)',
  'Post Matric Scholarship Scheme (Government of India) (ST/Scholarship)',
  'Government of India Post-Matric Scholarship. (SC/Scholarship)',
];

const defaultPortal = 'https://mahadbt.maharashtra.gov.in/login/login';

export default function MMSScholarship() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get('/pages/mms-scholarship')
      .then((res: any) => {
        if (res.data && !Array.isArray(res.data)) {
          setData(res.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  let points = defaultScholarshipPoints;
  if (data) {
    const dyn: string[] = [];
    if (data.minority?.purpose || data.minority?.communities) {
      dyn.push(`Minority: ${data.minority.purpose || 'The Scheme\'s goal is to provide financial help...'} (Belonging to minority communities such as ${data.minority.communities || 'Muslims, Sikhs, Christians...'})`);
    }
    if (data.ebc && data.ebc.length > 0) {
      data.ebc.forEach((e: any) => dyn.push(`${e.schemeName} (${e.category}) ${e.grDates ? '(As Per the GR Dated ' + e.grDates + ')' : ''}`));
    }
    if (data.categoryBased && data.categoryBased.length > 0) {
      data.categoryBased.forEach((c: any) => dyn.push(`${c.name} ${c.authority ? '(' + c.authority + ')' : ''} (${c.category}/Scholarship)`));
    }
    
    if (dyn.length > 0) {
        points = dyn;
    } else if (data.overview && data.overview.length > 0) {
        points = data.overview.map((o: any) => `${o.name}: ${o.description}`);
    }
  }

  const portalUrl = data?.portal?.url || defaultPortal;
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

  return (
    <MMSLayout title="Scholarship">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-brand-gold" />
          <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-brand-gold">Master of Management Studies</span>
        </div>

        {loading ? (
          <div className="flex h-64 w-full items-center justify-center border border-slate-200 bg-white p-6 shadow-sm">
             <p className="text-sm font-bold uppercase tracking-widest text-brand-navy/50">Loading scholarships...</p>
          </div>
        ) : (
        <article className="space-y-6 border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <section className="space-y-3">
            <h2 className="text-2xl font-display font-bold text-[#0d2d56] md:text-3xl">Scholarship</h2>
            <div className="h-px bg-gradient-to-r from-brand-gold via-brand-navylight to-transparent" />
            <ol className="space-y-4">
              {points.map((point, index) => (
                <li key={index} className="border border-slate-200 bg-slate-50 p-4 text-[17px] leading-8 text-slate-700">
                  <span className="mr-2 font-bold text-[#0d2d56]">{romanNumerals[index] || (index + 1) + '.'}</span>
                  {point}
                </li>
              ))}
            </ol>

            <a
              href={portalUrl}
              target="_blank"
              rel="noreferrer"
              className="block border border-brand-blue/25 bg-brand-light/35 px-4 py-3 text-[16px] font-semibold text-brand-blue transition hover:bg-brand-light"
            >
              {portalUrl}
            </a>
          </section>
        </article>
        )}
      </div>
    </MMSLayout>
  );
}
