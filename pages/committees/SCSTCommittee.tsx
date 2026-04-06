import React, { useEffect, useMemo, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { Check } from 'lucide-react';
import { getCommitteeSection } from '../../services/committees';

const fallbackObjectives = [
  'Ensuring that the policies and programs devised by the Government of India, the University Grants Commission (UGC), and state governments regarding backward castes and classes are effectively implemented within the institution.',
  'Acting as advocates for SC/ST students, helping them access government schemes and programs designed to support their educational and career aspirations.',
  'Providing counseling and guidance services tailored to the specific needs of SC/ST students, assisting them in navigating academic challenges and personal issues they may face during their college life.',
  'Taking proactive measures to prevent any form of discrimination or atrocities against SC/ST faculty, staff, and students within the institute and creating a safe and inclusive environment for all community members.',
  'Implementing, monitoring, and continuously evaluating the reservation policy within the institute, ensuring that it is effectively enforced and that eligible SC/ST candidates are given the opportunities they are entitled to.',
  'Establishing a formal grievance redressal mechanism specifically tailored to address the concerns and issues faced by SC/ST students.',
];

const fallbackMembers = [
  { name: 'Mrs. C.V. Sonarkar', designation: 'Chairman', caste: 'SC' },
  { name: 'Dr. Swapnil Mane', designation: 'Member', caste: 'SC' },
  { name: 'Mr. Sandeep Pawar', designation: 'Member', caste: 'SC' },
  { name: 'Mrs. Shubhangi Dalvi', designation: 'Member', caste: 'OBC' },
  { name: 'Mr. Sachin Gondke', designation: 'Member', caste: 'ST' },
];

const SCSTCommittee: React.FC = () => {
  const [apiData, setApiData] = useState<Record<string, any> | null>(null);
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    getCommitteeSection<Record<string, any>>('sc-st')
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
      .map((row: Record<string, unknown>, index: number) => ({
        name: String(row.name ?? '').trim(),
        designation: String(row.designation ?? row.post ?? '').trim(),
        caste: String(row.caste ?? fallbackMembers[index]?.caste ?? '').trim(),
      }))
      .filter((row: { name: string; designation: string; caste: string }) => row.name || row.designation || row.caste);
    return mapped.length > 0 ? mapped : fallbackMembers;
  }, [apiData]);

        if (!apiLoaded) {
  return (
  <PageLayout>
  <PageBanner
  title="SC-ST Committee"
  breadcrumbs={[
  { label: 'SC-ST Committee' },
  ]}
  />
  <section className="py-16 bg-white">
  <div className="container mx-auto px-4 sm:px-6 text-center text-slate-500">Loading content...</div>
  </section>
  </PageLayout>
  );
  }

return (
    <PageLayout>
      <PageBanner
        title="SC-ST Committee"
        breadcrumbs={[
          { label: 'SC-ST Committee' },
        ]}
      />

      <section className="bg-[radial-gradient(1200px_500px_at_10%_0%,rgba(26,75,124,0.09),transparent),radial-gradient(900px_400px_at_90%_10%,rgba(253,184,19,0.08),transparent),#f5f7fa] py-10 md:py-14">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto space-y-8 md:space-y-10">
            <div className="reveal bg-white border border-[#8ea2b8] border-l-4 border-l-[#fdb813] shadow-[0_16px_34px_rgba(253,184,19,0.38),0_6px_14px_rgba(0,0,0,0.08)] p-6 md:p-8 transition-all duration-500">
              <div className="w-16 h-1.5 rounded-full bg-[#fdb813] mb-4" />
              <h2 className="font-display text-3xl md:text-4xl text-[#1a4b7c] font-bold mb-4">
                SC-ST Committee
              </h2>
              <p className="text-[#333333] leading-relaxed text-base md:text-lg">
                Vidyavardhini&apos;s College of Engineering and Technology (VCET) has formed the
                Schedule Caste/Schedule Tribe (SC/ST) committee as per the AICTE guidelines and
                the Scheduled Castes and the Scheduled Tribes (Prevention of Atrocities) Act No.
                33 of 1989.
              </p>
            </div>

            <div
              className="reveal bg-gradient-to-br from-white to-[#f8fbff] border-2 border-[#8ea2b8] shadow-[0_14px_28px_rgba(26,75,124,0.30),0_4px_10px_rgba(0,0,0,0.08)] p-6 md:p-8 transition-all duration-500"
              style={{ transitionDelay: '0.06s' }}
            >
              <div className="w-16 h-1.5 rounded-full bg-[#fdb813] mb-4" />
              <h2 className="font-display text-3xl md:text-4xl text-[#1a4b7c] font-bold mb-5">
                Objectives
              </h2>
              <div className="space-y-4">
                {objectives.map((objective, index) => (
                  <div
                    key={index}
                    className="reveal group flex items-start gap-4 bg-[#ffefc2] border border-[#fdb813] rounded-none p-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#fff4d6] hover:border-[#e3a910] hover:shadow-[0_10px_22px_rgba(253,184,19,0.30)]"
                    style={{ transitionDelay: `${Math.min(index * 0.05, 0.2)}s` }}
                  >
                    <span className="mt-0.5 inline-flex w-9 h-9 rounded-lg bg-[#143759] border border-[#102e4a] items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                      <Check className="w-5 h-5 text-[#fdb813]" strokeWidth={3.25} />
                    </span>
                    <p className="text-base md:text-lg leading-[1.7] text-[#333333]">{objective}</p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="reveal bg-gradient-to-br from-white to-[#f7faff] border-2 border-[#7f96ad] shadow-[0_16px_32px_rgba(253,184,19,0.36),0_4px_10px_rgba(0,0,0,0.08)] p-6 md:p-8 transition-all duration-500"
              style={{ transitionDelay: '0.12s' }}
            >
              <div className="w-16 h-1.5 rounded-full bg-[#fdb813] mb-4" />
              <h2 className="font-display text-3xl md:text-4xl text-[#1a4b7c] font-bold mb-5">
                Committee Composition
              </h2>

              <div className="mt-6 overflow-x-auto border-2 border-[#6f89a5] shadow-none">
                <table className="w-full min-w-[720px] border-separate border-spacing-0">
                  <colgroup>
                    <col className="w-[38%]" />
                    <col className="w-[31%]" />
                    <col className="w-[31%]" />
                  </colgroup>
                  <thead>
                    <tr className="bg-[#143759]">
                      <th className="text-left px-5 py-4 text-white font-display text-xl md:text-2xl font-bold border-b border-[#102e4a] border-r border-r-[#1e4469]">
                        Name
                      </th>
                      <th className="text-left px-5 py-4 text-white font-display text-xl md:text-2xl font-bold border-b border-[#102e4a] border-r border-r-[#1e4469]">
                        Designation
                      </th>
                      <th className="text-left px-5 py-4 text-white font-display text-xl md:text-2xl font-bold border-b border-[#102e4a]">
                        Caste
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((member, index) => {
                      const isChairman = member.designation === 'Chairman';

                      return (
                        <tr
                          key={`${member.name}-${index}`}
                          className={`group transition-all duration-200 shadow-[inset_0_-1px_0_rgba(215,221,228,0.95)] hover:bg-[#fff6dc] hover:shadow-[0_8px_18px_rgba(0,0,0,0.12)] hover:translate-y-[-1px] ${
                            isChairman ? 'bg-[#f1f4f8]' : 'bg-white'
                          }`}
                        >
                          <td className="px-5 py-4 text-[#333333] text-base md:text-lg border-b border-[#8ea2b8] border-r border-r-[#8ea2b8]">
                            {member.name}
                          </td>
                          <td className="px-5 py-4 text-[#333333] text-base md:text-lg border-b border-[#8ea2b8] border-r border-r-[#8ea2b8]">
                            <span
                              className={`inline-flex items-center px-3 py-1.5 rounded-[20px] text-sm md:text-base font-extrabold ${
                                isChairman
                                  ? 'bg-[#ffe38a] text-[#1a4b7c] shadow-[0_0_0_1px_rgba(247,188,42,0.35),0_0_10px_rgba(253,184,19,0.22)]'
                                  : 'bg-[#eceff3] text-[#333333]'
                              }`}
                            >
                              {member.designation}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-[#333333] text-base md:text-lg border-b border-[#8ea2b8]">
                            {member.caste}
                          </td>
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
    </PageLayout>
  );
};

export default SCSTCommittee;

