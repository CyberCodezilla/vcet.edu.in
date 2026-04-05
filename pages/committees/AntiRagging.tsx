import React, { useEffect, useMemo, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { Check } from 'lucide-react';
import { getCommitteeSection } from '../../services/committees';

const fallbackObjectives = [
  'To make students aware of the dehumanizing effects of ragging, which are inherent in its perversity.',
  'To keep a constant eye and vigil on ragging to prevent its occurrence and recurrence',
  'To deal with ragging incidents that come to our attention in a timely and stringent manner.',
];

const fallbackMembers = [
  { name: 'Dr. Rakesh Himte', designation: 'Principal', contact: 'Principal@vcet.edu.in' },
  { name: 'Mrs. C.V. Sonarkar', designation: 'Member', contact: 'cv.sonarkar@vcet.edu.in' },
  { name: 'Dr. Sainath Patil', designation: 'Member', contact: 'sainath.patil@vcet.edu.in' },
  { name: 'Mrs. Kanchan Sarmalkar', designation: 'Member', contact: 'kanchan.sarmalkar@vcet.edu.in' },
  { name: 'Mr. Ashok Kanthalu Kamble (Inspector)', designation: 'Member', contact: '--' },
  { name: 'Mr. Abhay Jadhav', designation: 'Member', contact: 'abhay.jadhav@vcet.edu.in' },
  { name: 'Mr. Sanjiv Vedpathak', designation: 'Member', contact: 'sanjiv.vedpathak@vcet.edu.in' },
];

const AntiRagging: React.FC = () => {
  const [apiData, setApiData] = useState<Record<string, any> | null>(null);
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    getCommitteeSection<Record<string, any>>('anti-ragging')
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

  const members = useMemo(() => {
    const source = Array.isArray(apiData?.members) ? apiData.members : [];
    const mapped = source
      .map((row: Record<string, unknown>) => ({
        name: String(row.name ?? '').trim(),
        designation: String(row.designation ?? row.post ?? '').trim(),
        contact: String(row.contact ?? row.email ?? '').trim(),
      }))
      .filter((row: { name: string; designation: string; contact: string }) => row.name || row.designation || row.contact);
    return mapped.length > 0 ? mapped : fallbackMembers;
  }, [apiData]);

        if (!apiLoaded) {
  return (
  <PageLayout>
  <PageBanner title="Anti Ragging Committee" breadcrumbs={[{ label: 'Anti Ragging Committee' }]} />
  <section className="py-16 bg-white">
  <div className="container mx-auto px-4 sm:px-6 text-center text-slate-500">Loading content...</div>
  </section>
  </PageLayout>
  );
  }

return (
    <PageLayout>
      <PageBanner title="Anti Ragging Committee" breadcrumbs={[{ label: 'Anti Ragging Committee' }]} />

      <section className="bg-[radial-gradient(1200px_500px_at_10%_0%,rgba(26,75,124,0.09),transparent),radial-gradient(900px_400px_at_90%_10%,rgba(253,184,19,0.08),transparent),#f5f7fa] py-10 md:py-14">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-6xl mx-auto space-y-8 md:space-y-10">
              <div className="reveal bg-white border border-[#8ea2b8] border-l-4 border-l-[#fdb813] shadow-[0_16px_34px_rgba(253,184,19,0.38),0_6px_14px_rgba(0,0,0,0.08)] p-6 md:p-8 transition-all duration-500">
                <div className="w-16 h-1.5 rounded-full bg-[#fdb813] mb-4" />
                <h2 className="font-display text-3xl md:text-4xl text-[#1a4b7c] font-bold mb-4">Anti-Ragging Committee</h2>
                <p className="text-[#333333] leading-relaxed text-base md:text-lg">
                  VCET has taken stringent measures to prevent ragging within the institute and on campus. The college strictly adheres to the anti-ragging guidelines issued by the university and the undergraduate commission. An anti-ragging committee is formed to prevent ragging and to create a harmonious environment on college grounds.
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
                <h2 className="font-display text-3xl md:text-4xl text-[#1a4b7c] font-bold mb-5">Committee Composition</h2>

                <div className="mt-6 overflow-x-auto border-2 border-[#6f89a5] shadow-none">
                  <table className="w-full min-w-[760px] border-separate border-spacing-0">
                    <colgroup>
                      <col className="w-[34%]" />
                      <col className="w-[28%]" />
                      <col className="w-[38%]" />
                    </colgroup>
                    <thead>
                      <tr className="bg-[#143759]">
                        <th className="text-left px-5 py-4 text-white font-display text-xl md:text-2xl font-bold border-b border-[#102e4a] border-r border-r-[#1e4469]">Name</th>
                        <th className="text-left px-5 py-4 text-white font-display text-xl md:text-2xl font-bold border-b border-[#102e4a] border-r border-r-[#1e4469]">Designation</th>
                        <th className="text-left px-5 py-4 text-white font-display text-xl md:text-2xl font-bold border-b border-[#102e4a]">Contact</th>
                      </tr>
                    </thead>
                    <tbody>
                      {members.map((member, index) => {
                        const isPrincipal = member.designation === 'Principal';
                        return (
                          <tr key={`${member.name}-${index}`} className={`group transition-all duration-200 shadow-[inset_0_-1px_0_rgba(215,221,228,0.95)] hover:bg-[#fff6dc] hover:shadow-[0_8px_18px_rgba(0,0,0,0.12)] hover:translate-y-[-1px] ${isPrincipal ? 'bg-[#f1f4f8]' : 'bg-white'}`}>
                            <td className="px-5 py-4 text-[#333333] text-base md:text-lg border-b border-[#8ea2b8] border-r border-r-[#8ea2b8]">{member.name}</td>
                            <td className="px-5 py-4 text-[#333333] text-base md:text-lg border-b border-[#8ea2b8] border-r border-r-[#8ea2b8]">
                              <span className={`inline-flex items-center px-3 py-1.5 rounded-[20px] text-sm md:text-base font-extrabold ${isPrincipal ? 'bg-[#ffe38a] text-[#1a4b7c] shadow-[0_0_0_1px_rgba(247,188,42,0.35),0_0_10px_rgba(253,184,19,0.22)]' : 'bg-[#eceff3] text-[#333333]'}`}>{member.designation}</span>
                            </td>
                            <td className="px-5 py-4 text-[#333333] text-base md:text-lg border-b border-[#8ea2b8]">{member.contact}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AntiRagging;
