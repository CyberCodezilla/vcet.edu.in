import React, { useEffect, useMemo, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { Check, FileText } from 'lucide-react';
import { getCommitteeSection } from '../../services/committees';
import { resolveUploadedAssetUrl } from '../../utils/uploadedAssets';

type Member = { role: string; name: string };
type PdfReport = { year: string; url: string };

const fallbackObjectives = [
  'To develop a system for conscious, consistent and catalytic action to improve the academic and administrative performance of the institution.',
  'To promote measures for institutional functioning towards quality enhancement through internalization of quality culture and institutionalization of best practices.',
];

const fallbackMembers: Member[] = [
  { role: 'Chairperson', name: 'Dr. Rakesh Himte, Principal' },
  { role: 'Co-ordinator', name: 'Dr. Megha Trivedi' },
  { role: 'Member', name: 'Mr. Pushkaraj Vartak' },
  { role: 'Member', name: 'Mr. Atin Shah' },
  { role: 'Member', name: 'Mr. Amit Vartak' },
  { role: 'Member', name: 'Dr. Sangeeta Joshi' },
  { role: 'Member', name: 'Dr. R.R. Sedamkar' },
  { role: 'Member', name: 'Dr. Vikas Gupta' },
  { role: 'Member', name: 'Dr. Uday Aswalekar' },
  { role: 'Member', name: 'Dr. Ajay Radke' },
];

const fallbackMomReports: PdfReport[] = [
  { year: '2022-23', url: '/pdfs/Committees/IQAC/IQAC-MoM-2022-23.pdf' },
  { year: '2021-22', url: '/pdfs/Committees/IQAC/IQAC-MoM-2021-22.pdf' },
  { year: '2020-21', url: '/pdfs/Committees/IQAC/IQAC_MoM_2020_21.pdf' },
  { year: '2019-20', url: '/pdfs/Committees/IQAC/IQAC_MoM_2019_20-1.pdf' },
  { year: '2018-19', url: '/pdfs/Committees/IQAC/IQAC_MoM_2018_19-1.pdf' },
  { year: '2017-18', url: '/pdfs/Committees/IQAC/IQAC_MoM_2017_18-1.pdf' },
];

const fallbackAqarReports: PdfReport[] = [
  { year: '2022-23', url: '/pdfs/Committees/IQAC/AQAR_2022-23.pdf' },
  { year: '2021-22', url: '/pdfs/Committees/IQAC/AQAR_2021-22.pdf' },
  { year: '2020-21', url: '/pdfs/Committees/IQAC/AQAR_2020-21.pdf' },
  { year: '2019-20', url: '/pdfs/Committees/IQAC/AQAR_2019-20.pdf' },
  { year: '2018-19', url: '/pdfs/Committees/IQAC/AQAR_2018-19.pdf' },
];

const prioritizedRoles = ['Chairperson', 'Co-ordinator'];
const highlightedRoles = new Set(prioritizedRoles);

const chunkReports = (reports: PdfReport[], size: number): PdfReport[][] => {
  const chunks: PdfReport[][] = [];
  for (let i = 0; i < reports.length; i += size) chunks.push(reports.slice(i, i + size));
  return chunks;
};

const IQAC: React.FC = () => {
  const [apiData, setApiData] = useState<Record<string, any> | null>(null);
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    getCommitteeSection<Record<string, any>>('iqac')
      .then((res) => {
        if (mounted) setApiData(res);
      })
      .catch(() => {
        if (mounted) setApiData(null);
      })
      .finally(() => {
        if (mounted) setApiLoaded(true);
      });
    

return () => {
      mounted = false;
    };
  }, []);

    const objectives = useMemo(() => {
    const source = Array.isArray(apiData?.objectives) ? apiData.objectives : [];
    const mapped = source.map((item: unknown) => String(item ?? '').trim()).filter(Boolean);
    return mapped.length > 0 ? mapped : fallbackObjectives;
  }, [apiData]);

  const members = useMemo<Member[]>(() => {
    const source = Array.isArray(apiData?.members) ? apiData.members : [];
    const mapped = source
      .map((row: Record<string, unknown>) => ({
        role: String(row.designation ?? row.role ?? row.post ?? '').trim(),
        name: String(row.name ?? '').trim(),
      }))
      .filter((row: Member) => row.role || row.name);
    return mapped.length > 0 ? mapped : fallbackMembers;
  }, [apiData]);

  const orderedMembers = useMemo(() => {
    const top = prioritizedRoles
      .map((role) => members.find((member) => member.role === role))
      .filter((item): item is Member => Boolean(item));
    const rest = members.filter((member) => !highlightedRoles.has(member.role));
    return [...top, ...rest];
  }, [members]);

  const aqarReports = useMemo<PdfReport[]>(() => {
    const source = Array.isArray(apiData?.reports) ? apiData.reports : [];
    const mapped = source
      .map((row: Record<string, unknown>) => ({
        year: String(row.year ?? '').trim(),
        url: String(resolveUploadedAssetUrl(String(row.fileUrl ?? row.pdfUrl ?? '').trim()) || String(row.fileUrl ?? row.pdfUrl ?? '').trim()),
      }))
      .filter((row: PdfReport) => row.year && row.url);
    return mapped.length > 0 ? mapped : fallbackAqarReports;
  }, [apiData]);

  const momReports = useMemo<PdfReport[]>(() => {
    const source = Array.isArray(apiData?.momReports) ? apiData.momReports : [];
    const mapped = source
      .map((row: Record<string, unknown>) => ({
        year: String(row.year ?? '').trim(),
        url: String(resolveUploadedAssetUrl(String(row.fileUrl ?? row.pdfUrl ?? '').trim()) || String(row.fileUrl ?? row.pdfUrl ?? '').trim()),
      }))
      .filter((row: PdfReport) => row.year && row.url);
    return mapped.length > 0 ? mapped : fallbackMomReports;
  }, [apiData]);

  const momReportParts = chunkReports(momReports, 3);
  const aqarReportParts = chunkReports(aqarReports, 3);

        if (!apiLoaded) {
  return (
  <PageLayout>
  <PageBanner title="IQAC" breadcrumbs={[{ label: 'IQAC' }]} />
  <section className="py-16 bg-white">
  <div className="container mx-auto px-4 sm:px-6 text-center text-slate-500">Loading content...</div>
  </section>
  </PageLayout>
  );
  }

return (
    <PageLayout>
      <PageBanner title="IQAC" breadcrumbs={[{ label: 'IQAC' }]} />

      <section className="bg-[radial-gradient(1200px_500px_at_10%_0%,rgba(26,75,124,0.09),transparent),radial-gradient(900px_400px_at_90%_10%,rgba(253,184,19,0.08),transparent),#f5f7fa] py-10 md:py-14">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto space-y-8 md:space-y-10">
            <div className="reveal bg-white border border-[#8ea2b8] border-l-4 border-l-[#fdb813] shadow-[0_16px_34px_rgba(253,184,19,0.38),0_6px_14px_rgba(0,0,0,0.08)] p-6 md:p-8 transition-all duration-500">
              <div className="w-16 h-1.5 rounded-full bg-[#fdb813] mb-4" />
              <h2 className="font-display text-3xl md:text-4xl text-[#1a4b7c] font-bold mb-4">Internal Quality Assurance Cell</h2>
              <p className="text-[#333333] leading-relaxed text-base md:text-lg mb-4">
                The Internal Quality Assurance Cell (IQAC) of Vidyavardhini&apos;s College of Engineering & Technology was established in July 2017.
              </p>
              <p className="text-[#333333] leading-relaxed text-base md:text-lg">
                IQAC works to develop a system for conscious, consistent and catalytic improvement in the overall academic and administrative performance of the institution.
              </p>
            </div>

            <div className="reveal bg-gradient-to-br from-white to-[#f8fbff] border-2 border-[#8ea2b8] shadow-[0_14px_28px_rgba(26,75,124,0.30),0_4px_10px_rgba(0,0,0,0.08)] p-6 md:p-8 transition-all duration-500" style={{ transitionDelay: '0.06s' }}>
              <div className="w-16 h-1.5 rounded-full bg-[#fdb813] mb-4" />
              <h2 className="font-display text-3xl md:text-4xl text-[#1a4b7c] font-bold mb-5">Objectives</h2>
              <div className="space-y-4">
                {objectives.map((objective, index) => (
                  <div key={index} className="reveal group flex items-start gap-4 bg-[#ffefc2] border border-[#fdb813] rounded-none p-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#fff4d6] hover:border-[#e3a910] hover:shadow-[0_10px_22px_rgba(253,184,19,0.30)]" style={{ transitionDelay: `${Math.min(index * 0.05, 0.2)}s` }}>
                    <span className="mt-0.5 inline-flex w-9 h-9 rounded-lg bg-[#143759] border border-[#102e4a] items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                      <Check className="w-5 h-5 text-[#fdb813]" strokeWidth={3.25} />
                    </span>
                    <p className="text-base md:text-lg leading-[1.7] text-[#333333]">{objective}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal bg-gradient-to-br from-white to-[#f7faff] border-2 border-[#7f96ad] shadow-[0_16px_32px_rgba(253,184,19,0.36),0_4px_10px_rgba(0,0,0,0.08)] p-6 md:p-8 transition-all duration-500" style={{ transitionDelay: '0.12s' }}>
              <div className="w-16 h-1.5 rounded-full bg-[#fdb813] mb-4" />
              <h2 className="font-display text-3xl md:text-4xl text-[#1a4b7c] font-bold mb-5">IQAC Committee Composition</h2>

              <div className="mt-6 overflow-x-auto border-2 border-[#6f89a5] shadow-none">
                <table className="w-full min-w-[640px] border-separate border-spacing-0">
                  <colgroup>
                    <col className="w-[32%]" />
                    <col className="w-[68%]" />
                  </colgroup>
                  <thead>
                    <tr className="bg-[#143759]">
                      <th className="text-left px-5 py-4 text-white font-display text-xl md:text-2xl font-bold border-b border-[#102e4a] border-r border-r-[#1e4469]">Role</th>
                      <th className="text-left px-5 py-4 text-white font-display text-xl md:text-2xl font-bold border-b border-[#102e4a]">Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderedMembers.map((member) => {
                      const isHighlighted = highlightedRoles.has(member.role);
                      return (
                        <tr key={`${member.role}-${member.name}`} className={`group transition-all duration-200 shadow-[inset_0_-1px_0_rgba(215,221,228,0.95)] hover:bg-[#fff6dc] hover:shadow-[0_8px_18px_rgba(0,0,0,0.12)] hover:translate-y-[-1px] ${isHighlighted ? 'bg-[#f1f4f8]' : 'bg-white'}`}>
                          <td className="px-5 py-4 text-[#333333] text-base md:text-lg border-b border-[#8ea2b8] border-r border-r-[#8ea2b8]">
                            <span className={`inline-flex items-center px-3 py-1.5 rounded-[20px] text-sm md:text-base font-extrabold ${isHighlighted ? 'bg-[#ffe38a] text-[#1a4b7c] shadow-[0_0_0_1px_rgba(247,188,42,0.35),0_0_10px_rgba(253,184,19,0.22)]' : 'bg-[#eceff3] text-[#333333]'}`}>{member.role}</span>
                          </td>
                          <td className="px-5 py-4 text-[#333333] text-base md:text-lg border-b border-[#8ea2b8]">{member.name}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[#f3f6fb]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="reveal border border-[#8ea2b8] border-l-4 border-l-[#fdb813] bg-white p-3 pl-4 md:p-4 md:pl-5 shadow-[0_12px_26px_rgba(20,55,89,0.08)]">
              <h2 className="text-center text-xl md:text-2xl lg:text-3xl font-display font-bold text-brand-navy mb-6 md:mb-8 md:whitespace-nowrap">
                <span className="inline-block border-b-4 border-[#fdb813] pb-1">IQAC Minutes of Meeting (MoM)</span>
              </h2>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-2.5 md:gap-3.5">
                {momReportParts.map((part, partIndex) => (
                  <div key={partIndex} className="space-y-2.5">
                    {part.map((report, idx) => (
                      <div key={`${partIndex}-${idx}`} className="reveal border border-[#7f96ad] bg-[#f8fbff] p-2 md:p-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#fff4d6] hover:border-[#e3a910] hover:shadow-[0_10px_22px_rgba(253,184,19,0.24)]" style={{ transitionDelay: `${Math.min((partIndex * 3 + idx) * 0.04, 0.25)}s` }}>
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-2.5">
                          <div className="w-8 h-8 md:w-9 md:h-9 bg-[#1d5388] flex items-center justify-center flex-shrink-0">
                            <FileText className="w-4 h-4 md:w-5 md:h-5 text-[#fdb813]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base md:text-lg font-display font-bold text-brand-navy">MoM {report.year}</h3>
                          </div>
                          <a href={report.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center self-start md:self-center px-2 py-1 text-[8px] md:text-[10px] font-bold tracking-[0.05em] uppercase border border-[#6f89a5] text-[#5e7794] bg-[#edf3fa] transition-colors duration-200 hover:bg-[#1d5388] hover:text-white hover:border-[#1d5388] cursor-pointer">
                            View PDF
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white border-t border-[#dbe3ec]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="reveal border border-[#8ea2b8] border-l-4 border-l-[#fdb813] bg-[#f8fbff] p-5 pl-6 md:p-7 md:pl-8 shadow-[0_12px_26px_rgba(20,55,89,0.08)]">
              <h2 className="text-center text-xl md:text-2xl lg:text-3xl font-display font-bold text-brand-navy mb-6 md:mb-8 md:whitespace-nowrap">
                <span className="inline-block border-b-4 border-[#fdb813] pb-1">Annual Quality Assurance Reports (AQAR)</span>
              </h2>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-2.5 md:gap-3.5">
                {aqarReportParts.map((part, partIndex) => (
                  <div key={partIndex} className="space-y-2.5">
                    {part.map((report, idx) => (
                      <div key={`${partIndex}-${idx}`} className="reveal border border-[#7f96ad] bg-[#f8fbff] p-2 md:p-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#fff4d6] hover:border-[#e3a910] hover:shadow-[0_10px_22px_rgba(253,184,19,0.24)]" style={{ transitionDelay: `${Math.min((partIndex * 3 + idx) * 0.04, 0.25)}s` }}>
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-2.5">
                          <div className="w-8 h-8 md:w-9 md:h-9 bg-[#1d5388] flex items-center justify-center flex-shrink-0">
                            <FileText className="w-4 h-4 md:w-5 md:h-5 text-[#fdb813]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base md:text-lg font-display font-bold text-brand-navy">AQAR {report.year}</h3>
                          </div>
                          <a href={report.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center self-start md:self-center px-2 py-1 text-[8px] md:text-[10px] font-bold tracking-[0.05em] uppercase border border-[#6f89a5] text-[#5e7794] bg-[#edf3fa] transition-colors duration-200 hover:bg-[#1d5388] hover:text-white hover:border-[#1d5388] cursor-pointer">
                            View PDF
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default IQAC;
