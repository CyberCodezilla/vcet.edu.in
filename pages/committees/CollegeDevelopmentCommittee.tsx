import React, { useEffect, useMemo, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { Check } from 'lucide-react';
import { getCommitteeSection } from '../../services/committees';

const fallbackResponsibilities = [
  "Prepare the institute's overall teaching programme or academic calendar.",
  'Recommend to management new add-on modules and additional work in collaboration with department heads.',
  'Make recommendations to management regarding college research and consulting activities.',
  'Recommend and ensure effective use of ICT in the campus.',
  'Prepare the financial budget of the college and submit it for approval.',
  'Prepare student and employee welfare schemes.',
];

const fallbackMembers = [
  { post: 'Chairman', name: 'Shri. Vikas Vartak' },
  { post: 'Secretary', name: 'Shri. M. N. Mohol' },
  { post: 'Member', name: 'Shri. Hasmukhbhai Shah' },
  { post: 'Member', name: 'Shri. Babansheth Naik' },
  { post: 'Member', name: 'Shri. Amit Vartak' },
  { post: 'Member', name: 'Dr. Thaksen Parvat' },
  { post: 'IQAC Coordinator', name: 'Dr. Megha Trivedi' },
  { post: 'Member (Alumni Nominee)', name: 'Ms. Aishwarya Mohol' },
  { post: 'Member (Teacher Representative)', name: 'Dr. Amrita Ruperee' },
  { post: 'Member Secretary', name: 'Dr. Rakesh Himte' },
];

const prioritizedPosts = ['Chairman', 'Secretary', 'Member Secretary'];
const highlightedPosts = new Set(prioritizedPosts);

const CollegeDevelopmentCommittee: React.FC = () => {
  const [apiData, setApiData] = useState<Record<string, any> | null>(null);
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    getCommitteeSection<Record<string, any>>('cdc')
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

    const responsibilities = useMemo(() => {
    const source = Array.isArray(apiData?.responsibilities) ? apiData.responsibilities : [];
    const mapped = source.map((item: unknown) => String(item ?? '').trim()).filter(Boolean);
    return mapped.length > 0 ? mapped : fallbackResponsibilities;
  }, [apiData]);

  const members = useMemo(() => {
    const source = Array.isArray(apiData?.members) ? apiData.members : [];
    const mapped = source
      .map((row: Record<string, unknown>) => ({
        post: String(row.post ?? '').trim(),
        name: String(row.name ?? '').trim(),
      }))
      .filter((row: { post: string; name: string }) => row.post || row.name);
    return mapped.length > 0 ? mapped : fallbackMembers;
  }, [apiData]);

  const orderedMembers = useMemo(() => {
    const topMembers = prioritizedPosts
      .map((post) => members.find((member) => member.post === post))
      .filter((member): member is { post: string; name: string } => Boolean(member));
    const remainingMembers = members.filter((member) => !highlightedPosts.has(member.post));
    return [...topMembers, ...remainingMembers];
  }, [members]);

        if (!apiLoaded) {
  return (
  <PageLayout>
  <PageBanner title="College Development Committee" breadcrumbs={[{ label: 'College Development Committee' }]} />
  <section className="py-16 bg-white">
  <div className="container mx-auto px-4 sm:px-6 text-center text-slate-500">Loading content...</div>
  </section>
  </PageLayout>
  );
  }

return (
    <PageLayout>
      <PageBanner title="College Development Committee" breadcrumbs={[{ label: 'College Development Committee' }]} />

      <section className="bg-[radial-gradient(1200px_500px_at_10%_0%,rgba(26,75,124,0.09),transparent),radial-gradient(900px_400px_at_90%_10%,rgba(253,184,19,0.08),transparent),#f5f7fa] py-10 md:py-14">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto space-y-8 md:space-y-10">
            <div className="reveal bg-white border-2 border-[#8ea2b8] border-l-4 border-l-[#fdb813] shadow-[0_16px_34px_rgba(253,184,19,0.38),0_6px_14px_rgba(0,0,0,0.08)] p-6 md:p-8 transition-all duration-500">
              <div className="w-16 h-1.5 rounded-full bg-[#fdb813] mb-4" />
              <h2 className="font-display text-3xl md:text-4xl text-[#1a4b7c] font-bold mb-4">Roles and Responsibilities</h2>
              <div className="border-2 border-[#adb9c6] overflow-hidden bg-white shadow-none">
                <table className="w-full border-separate border-spacing-0">
                  <tbody>
                    {responsibilities.map((item, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#d7e5f2]'}`}>
                        <td className="px-4 md:px-5 py-4 border-b border-[#d4dbe3]">
                          <div className="flex items-start gap-[14px]">
                            <span className="mt-0.5 inline-flex w-9 h-9 rounded-lg bg-[#fff7df] border border-[#ffe3a7] items-center justify-center text-[#1a4b7c] flex-shrink-0">
                              <Check className="w-4 h-4" strokeWidth={2.5} />
                            </span>
                            <p className="text-base md:text-lg leading-[1.7] text-[#333333]">{item}</p>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="reveal bg-gradient-to-br from-white to-[#f7faff] border-2 border-[#8ea2b8] shadow-[0_16px_32px_rgba(253,184,19,0.36),0_4px_10px_rgba(0,0,0,0.08)] p-6 md:p-8 transition-all duration-500">
              <div className="w-16 h-1.5 rounded-full bg-[#fdb813] mb-4" />
              <h2 className="font-display text-3xl md:text-4xl text-[#1a4b7c] font-bold mb-5">Committee Members</h2>
              <div className="mt-8 overflow-x-auto border-2 border-[#adb9c6] shadow-none">
                <table className="w-full min-w-[640px] border-separate border-spacing-0">
                  <thead>
                    <tr className="bg-[#143759]">
                      <th className="text-left px-5 py-4 text-white font-display text-xl md:text-2xl font-bold border-b border-[#102e4a] border-r border-r-[#1e4469]">Post</th>
                      <th className="text-left px-5 py-4 text-white font-display text-xl md:text-2xl font-bold border-b border-[#102e4a]">Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderedMembers.map((member) => {
                      const isHighlighted = highlightedPosts.has(member.post);
                      return (
                        <tr key={`${member.post}-${member.name}`} className={isHighlighted ? 'bg-[#f1f4f8]' : 'bg-white'}>
                          <td className="px-5 py-4 text-[#333333] text-base md:text-lg border-b border-[#d4dbe3] border-r border-r-[#d8e0e8]">
                            <span className={`inline-flex items-center px-3 py-1.5 rounded-[20px] text-sm md:text-base font-extrabold ${isHighlighted ? 'bg-[#ffe38a] text-[#1a4b7c]' : 'bg-[#eceff3] text-[#333333]'}`}>
                              {member.post}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-[#333333] text-base md:text-lg border-b border-[#d4dbe3]">{member.name}</td>
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

export default CollegeDevelopmentCommittee;
