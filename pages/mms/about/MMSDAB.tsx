import React, { useEffect, useState } from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import { get } from '../../../services/api';

interface DABMember {
  srNo: number;
  name: string;
  designation: string;
  organization: string;
  role: string;
}

interface MMSAboutData {
  data: {
    dabMembers: DABMember[];
  };
}

export default function MMSDAB() {
  const [dabMembers, setDabMembers] = useState<DABMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get<MMSAboutData>('/pages/mms-about')
      .then((res) => {
        if (res.data?.dabMembers) {
          setDabMembers(res.data.dabMembers);
        }
      })
      .catch((err) => {
        console.error('Failed to load DAB members:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const industryCount = dabMembers.filter((m) => m.role.toLowerCase().includes('industry')).length;
  const academicCount = dabMembers.filter((m) => m.role.toLowerCase().includes('academia') || m.role.toLowerCase().includes('department') || m.role.toLowerCase().includes('principal')).length;
  const studentCount = dabMembers.filter((m) => m.role.toLowerCase().includes('student') || m.role.toLowerCase().includes('parent')).length;

  const badgeClass = (role: string) => {
    const normalized = role.toLowerCase();
    if (normalized.includes('industry')) return 'bg-amber-50 text-amber-700';   
    if (normalized.includes('student')) return 'bg-emerald-50 text-emerald-700';
    if (normalized.includes('parent')) return 'bg-purple-50 text-purple-700';   
    return 'bg-brand-navylight text-brand-navy';
  };

  return (
    <MMSLayout title="Departmental Advisory Board (DAB)">
      <section className="space-y-10">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-brand-gold" />
            <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold">Master of Management Studies</span>
          </div>
          <h2 className="text-3xl font-display font-bold leading-tight text-brand-navy md:text-4xl">
            Departmental Advisory Board
            <span className="text-brand-gold"> (DAB)</span>
          </h2>
          <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
            <i className="ph-fill ph-info text-brand-gold" />
            <p>Guiding the department towards academic excellence and industry relevance.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: 'Industry Experts', value: industryCount, icon: 'ph-buildings', color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Academic Members', value: academicCount, icon: 'ph-graduation-cap', color: 'text-brand-blue', bg: 'bg-brand-navylight' },
            { label: 'Students & Parents', value: studentCount, icon: 'ph-users-three', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg}`}>
                <i className={`ph-fill ${stat.icon} text-2xl ${stat.color}`} />
              </div>
              <div>
                <span className="block text-2xl font-bold text-brand-navy">{stat.value}</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="flex h-64 w-full items-center justify-center">
            <p className="text-sm font-bold uppercase tracking-widest text-brand-navy/50">Loading DAB members...</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b-2 border-brand-navy bg-brand-light">
                    <th className="whitespace-nowrap px-6 py-4 font-bold tracking-wider text-brand-navy">Sr. No.</th>
                    <th className="px-6 py-4 font-bold tracking-wider text-brand-navy">Name</th>
                    <th className="px-6 py-4 font-bold tracking-wider text-brand-navy">Designation</th>
                    <th className="px-6 py-4 font-bold tracking-wider text-brand-navy">Organization</th>
                    <th className="whitespace-nowrap px-6 py-4 font-bold tracking-wider text-brand-navy">Role in DAB</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {dabMembers.length > 0 ? (
                    dabMembers.map((member, idx) => (
                      <tr key={idx} className="transition-colors hover:bg-slate-50/50">
                        <td className="whitespace-nowrap px-6 py-4 font-semibold text-slate-500">
                          {String(member.srNo).padStart(2, '0')}
                        </td>
                        <td className="px-6 py-4 font-semibold text-brand-navy">{member.name}</td>
                        <td className="px-6 py-4 text-slate-600">{member.designation}</td>
                        <td className="px-6 py-4 text-slate-600">{member.organization}</td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${badgeClass(member.role)}`}>
                            {member.role}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                        No DAB members available currently.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </MMSLayout>
  );
}