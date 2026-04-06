import React, { useEffect, useMemo, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { Check } from 'lucide-react';
import { getCommitteeSection } from '../../services/committees';

const fallbackObjectives = [
  'To create awareness among all employees.',
  'To make it illegal for any employee to engage in unwelcome workplace sexual harassment or acts that amount to sexual harassment.',
  'To ensure that all individuals are treated with respect and that no discriminatory treatment is meted out solely based on gender.',
  'To provide a fair and compassionate redress process.',
];

const fallbackMembers = [
  {
    post: 'Presiding Officer',
    name: 'Dr.Archana Dongre',
    email: 'archana.dongre@vcet.edu.in',
    contactNo: '91-9291500000',
    address: 'K.T.Marg,Vasai Road (W)',
  },
  {
    post: 'Member',
    name: 'Dr. Ashish Chaudhari',
    email: 'ashish.chaudhari@vcet.edu.in',
    contactNo: '91-8830385807',
    address: 'K.T.Marg,Vasai Road (W)',
  },
  {
    post: 'Member',
    name: 'Dr. Anagha Patil',
    email: 'anagha.patil@vcet.edu.in',
    contactNo: '91-9004078402',
    address: 'K.T.Marg,Vasai Road (W)',
  },
  {
    post: 'Member',
    name: 'Ms. Milan Pawar',
    email: 'milan.pawar@vcet.edu.in',
    contactNo: '91-9702333011',
    address: 'K.T.Marg,Vasai Road (W)',
  },
  {
    post: 'Member',
    name: 'Ms. Ashlesha Patil',
    email: 'ashlesha.patil@vcet.edu.in',
    contactNo: '91-9833447730',
    address: 'K.T.Marg,Vasai Road (W)',
  },
  {
    post: 'Member',
    name: 'Mr. Rohan Patil',
    email: 'rohan.patil@vcet.edu.in',
    contactNo: '--',
    address: 'K.T.Marg,Vasai Road (W)',
  },
  {
    post: 'Member',
    name: 'Ms. Prapti Raut',
    email: 'prapti.raut@vcet.edu.in',
    contactNo: '--',
    address: 'Student T.E.(EXTC)',
  },
  {
    post: 'Member',
    name: 'Ms. Krisha Chika',
    email: 'krisha.chika@vcet.edu.in',
    contactNo: '--',
    address: 'Student T.E.(COMP)',
  },
];

const InternalComplaint: React.FC = () => {
  const [apiData, setApiData] = useState<Record<string, any> | null>(null);
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    getCommitteeSection<Record<string, any>>('icc')
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
        post: String(row.post ?? row.designation ?? '').trim(),
        name: String(row.name ?? '').trim(),
        email: String(row.email ?? '').trim(),
        contactNo: String(row.contact ?? row.contactNo ?? '').trim(),
        address: String(row.address ?? '').trim(),
      }))
      .filter((row: { post: string; name: string; email: string; contactNo: string; address: string }) => row.post || row.name || row.email || row.contactNo || row.address);
    return mapped.length > 0 ? mapped : fallbackMembers;
  }, [apiData]);

        if (!apiLoaded) {
  return (
  <PageLayout>
  <PageBanner
  title="Internal Complaint Committee"
  breadcrumbs={[
  { label: 'Internal Complaint Committee' },
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
        title="Internal Complaint Committee"
        breadcrumbs={[
          { label: 'Internal Complaint Committee' },
        ]}
      />

      <section className="bg-[radial-gradient(1200px_500px_at_10%_0%,rgba(26,75,124,0.09),transparent),radial-gradient(900px_400px_at_90%_10%,rgba(253,184,19,0.08),transparent),#f5f7fa] py-10 md:py-14">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto space-y-8 md:space-y-10">
            <div className="reveal bg-white border border-[#8ea2b8] border-l-4 border-l-[#fdb813] shadow-[0_16px_34px_rgba(253,184,19,0.38),0_6px_14px_rgba(0,0,0,0.08)] p-6 md:p-8 transition-all duration-500">
              <div className="w-16 h-1.5 rounded-full bg-[#fdb813] mb-4" />
              <h2 className="font-display text-3xl md:text-4xl text-[#1a4b7c] font-bold mb-4">
                Internal Complaint Committee
              </h2>
              <p className="text-[#333333] leading-relaxed text-base md:text-lg mb-4">
                As an employer, VCET, Vasai intends to provide and promote a safe working environment
                for all women employed by the institution.
              </p>
              <p className="text-[#333333] leading-relaxed text-base md:text-lg">
                As per the guidelines of the Sexual Harassment of Women at Woekplace (Prevention,
                Prohibition and Redressal) Act and Rule 2013. VCET has established an internal
                Complaints Committee to extend the Act&apos;s Provisions to all VCET&apos;s employees.
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
                <table className="w-full min-w-[1060px] border-separate border-spacing-0">
                  <colgroup>
                    <col className="w-[17%]" />
                    <col className="w-[23%]" />
                    <col className="w-[22%]" />
                    <col className="w-[16%]" />
                    <col className="w-[22%]" />
                  </colgroup>
                  <thead>
                    <tr className="bg-[#143759]">
                      <th className="text-left px-5 py-4 text-white font-display text-xl md:text-2xl font-bold border-b border-[#102e4a] border-r border-r-[#1e4469]">
                        Post
                      </th>
                      <th className="text-left px-5 py-4 text-white font-display text-xl md:text-2xl font-bold border-b border-[#102e4a] border-r border-r-[#1e4469]">
                        Name
                      </th>
                      <th className="text-left px-5 py-4 text-white font-display text-xl md:text-2xl font-bold border-b border-[#102e4a] border-r border-r-[#1e4469]">
                        Email Id
                      </th>
                      <th className="text-left px-5 py-4 text-white font-display text-xl md:text-2xl font-bold border-b border-[#102e4a] border-r border-r-[#1e4469]">
                        Contact No.
                      </th>
                      <th className="text-left px-5 py-4 text-white font-display text-xl md:text-2xl font-bold border-b border-[#102e4a]">
                        Address
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((member, index) => {
                      const isPresidingOfficer = member.post === 'Presiding Officer';

                      return (
                        <tr
                          key={`${member.post}-${member.name}-${index}`}
                          className={`group transition-all duration-200 shadow-[inset_0_-1px_0_rgba(215,221,228,0.95)] hover:bg-[#fff6dc] hover:shadow-[0_8px_18px_rgba(0,0,0,0.12)] hover:translate-y-[-1px] ${
                            isPresidingOfficer ? 'bg-[#f1f4f8]' : 'bg-white'
                          }`}
                        >
                          <td className="px-5 py-4 text-[#333333] text-base md:text-lg border-b border-[#8ea2b8] border-r border-r-[#8ea2b8]">
                            <span
                              className={`inline-flex items-center px-3 py-1.5 rounded-[20px] text-sm md:text-base font-extrabold ${
                                isPresidingOfficer
                                  ? 'bg-[#ffe38a] text-[#1a4b7c] shadow-[0_0_0_1px_rgba(247,188,42,0.35),0_0_10px_rgba(253,184,19,0.22)]'
                                  : 'bg-[#eceff3] text-[#333333]'
                              }`}
                            >
                              {member.post}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-[#333333] text-base md:text-lg border-b border-[#8ea2b8] border-r border-r-[#8ea2b8]">
                            {member.name}
                          </td>
                          <td className="px-5 py-4 text-[#333333] text-base md:text-lg border-b border-[#8ea2b8] border-r border-r-[#8ea2b8]">
                            {member.email}
                          </td>
                          <td className="px-5 py-4 text-[#333333] text-base md:text-lg border-b border-[#8ea2b8] border-r border-r-[#8ea2b8]">
                            {member.contactNo}
                          </td>
                          <td className="px-5 py-4 text-[#333333] text-base md:text-lg border-b border-[#8ea2b8]">
                            {member.address}
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

export default InternalComplaint;

