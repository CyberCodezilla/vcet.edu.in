import React from 'react';
import { resolveApiUrl } from '../../admin/api/client';
import { resolveUploadedAssetUrl } from '../../utils/uploadedAssets';

const resolveDepartmentAssetUrl = (value: unknown): string | null => {
  if (!value) return null;

  if (typeof value === 'string') {
    return resolveUploadedAssetUrl(value) ?? resolveApiUrl(value);
  }

  if (typeof value === 'object') {
    const candidate =
      (value as { url?: unknown; path?: unknown; fileUrl?: unknown; pdfUrl?: unknown }).url ??
      (value as { url?: unknown; path?: unknown; fileUrl?: unknown; pdfUrl?: unknown }).path ??
      (value as { url?: unknown; path?: unknown; fileUrl?: unknown; pdfUrl?: unknown }).fileUrl ??
      (value as { url?: unknown; path?: unknown; fileUrl?: unknown; pdfUrl?: unknown }).pdfUrl;

    return resolveDepartmentAssetUrl(candidate);
  }

  return null;
};

export const DynamicDab = ({ members, deptName }: { members: any[], deptName: string }) => {
  return (
    <div className="space-y-10">
      <div className="reveal">
        <div className="flex items-center gap-3 mb-4"><span className="w-8 h-px bg-brand-gold" /><span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">{deptName}</span></div>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy leading-tight">Departmental Advisory Board<span className="text-brand-gold"> (DAB)</span></h2>
        <div className="mt-5 h-px bg-gradient-to-r from-brand-gold via-brand-navylight to-transparent" />
      </div>
      <div className="reveal bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="bg-brand-navy text-white">{['Sr.', 'Name', 'Designation', 'Organisation'].map(h => <th key={h} className="px-4 py-4 text-left text-[11px] font-bold uppercase tracking-widest">{h}</th>)}</tr></thead>
            <tbody>
              {members.map((m, idx) => (
                <tr key={idx} className={`border-t border-slate-100 hover:bg-brand-navylight/40 transition-colors duration-150 ${idx % 2 === 1 ? 'bg-slate-50/60' : 'bg-white'}`}>
                  <td className="px-4 py-4 font-bold text-brand-navy/40 text-xs">{String(idx + 1).padStart(2, '0')}</td>
                  <td className="px-4 py-4 font-semibold text-brand-navy whitespace-nowrap">{m.name}</td>
                  <td className="px-4 py-4 text-slate-600">{m.designation}</td>
                  <td className="px-4 py-4 text-slate-600">{m.organization}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const DynamicToppers = ({ toppers, deptName }: { toppers: any[], deptName: string }) => {
  return (
    <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 space-y-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-px bg-brand-gold" />
        <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">{deptName}</span>
      </div>
      <h3 className="text-2xl font-bold text-brand-navy relative inline-block">Toppers<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
      <div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand-navy text-white">
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Year</th>
                <th className="px-4 py-3 text-left">CGPA</th>
              </tr>
            </thead>
            <tbody>
              {toppers.map((t, i) => (
                <tr key={i} className="border-t border-slate-100">
                  <td className="px-4 py-3 text-slate-600">{t.name || '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{t.year || '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{t.cgpa || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export const DynamicLinksList = ({ items, deptName, title, labelKey, urlKey }: { items: any[], deptName: string, title: string, labelKey: string, urlKey: string }) => {
  return (
    <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-px bg-brand-gold" />
        <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">{deptName}</span>
      </div>
      <h3 className="text-2xl font-bold text-brand-navy mb-5 relative inline-block">{title}<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <a key={idx} href={resolveDepartmentAssetUrl(item[urlKey]) || '#'} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-navy hover:border-brand-gold hover:bg-brand-navylight transition-colors">
            <span>{item[labelKey] || `${title} ${idx + 1}`}</span>
            <i className="ph ph-arrow-up-right text-brand-gold" />
          </a>
        ))}
      </div>
    </section>
  );
};

export const DynamicFacultyAchievements = ({ achievements, deptName }: { achievements: any[], deptName: string }) => {
  const validAchievements = (achievements || []).filter((ach: any) =>
    [
      ach?.title,
      ach?.description,
      ach?.image,
      ach?.image_url,
      ach?.photo,
      ach?.url,
      ach?.pdf,
      ach?.pdf_url,
      ach?.document_url,
      ach?.fileUrl,
    ].some((value) => {
      if (typeof value === 'string') return value.trim().length > 0;
      return Boolean(value);
    }),
  );

  return (
    <section className="reveal bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 space-y-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-px bg-brand-gold" />
        <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">{deptName}</span>
      </div>
      <h3 className="text-2xl font-bold text-brand-navy relative inline-block">Faculty Achievements<span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-gold rounded-full" /></h3>
      
      {validAchievements.length === 0 ? (
        <p className="text-slate-500 italic">Faculty achievements will be updated soon.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {validAchievements.map((ach, idx) => (
            <div key={idx} className="flex flex-col bg-slate-50 rounded-2xl p-5 border border-slate-100 hover:shadow-md transition-shadow">
              {resolveDepartmentAssetUrl(ach.image ?? ach.image_url ?? ach.photo ?? ach.url) && (
                <div className="h-40 mb-4 rounded-xl overflow-hidden bg-slate-200">
                  <img src={resolveDepartmentAssetUrl(ach.image ?? ach.image_url ?? ach.photo ?? ach.url) || ''} alt={ach.title} className="w-full h-full object-cover" />
                </div>
              )}
              <h4 className="font-bold text-brand-navy mb-2">{ach.title}</h4>
              <p className="text-sm text-slate-600 mb-4 flex-grow">{ach.description}</p>
              {resolveDepartmentAssetUrl(ach.pdf ?? ach.pdf_url ?? ach.document_url ?? ach.fileUrl) && (
                <a 
                  href={resolveDepartmentAssetUrl(ach.pdf ?? ach.pdf_url ?? ach.document_url ?? ach.fileUrl) || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 text-brand-gold font-semibold text-sm hover:text-brand-navy transition-colors"
                >
                  <i className="ph ph-file-pdf text-lg" />
                  View PDF
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
