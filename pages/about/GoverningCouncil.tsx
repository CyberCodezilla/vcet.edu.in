import React, { useEffect, useMemo, useState } from 'react';
import { Crown, User } from 'lucide-react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { getAboutSection } from '../../services/about';

interface CouncilMember {
  role?: string;
  name?: string;
  description?: string;
  displayOrder?: number;
  isActive?: boolean;
}

interface CouncilData {
  chairman?: CouncilMember;
  councilMembers?: CouncilMember[];
}

export default function GoverningCouncil() {
  const [data, setData] = useState<CouncilData | null>(null);
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    getAboutSection<CouncilData>('governing-council')
      .then((res) => mounted && setData(res))
      .catch(() => mounted && setData(null))
      .finally(() => {
        if (mounted) setApiLoaded(true);
      });
    

if (!apiLoaded) {
    return (
      <PageLayout>
        <PageBanner title="The Governing Council" breadcrumbs={[{ label: 'Governing Council' }]} />
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 text-center text-slate-500">Loading content...</div>
        </section>
      </PageLayout>
    );
  }

return () => {
      mounted = false;
    };
  }, []);

    const chairman = data?.chairman ?? {
    role: 'Chairman',
    name: 'Sri. Vikas Vartak',
    description: 'Chairman Vidyavardhini',
  };

  const members = useMemo(() => {
    const rows = (data?.councilMembers ?? [])
      .filter((member) => member.isActive !== false)
      .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

    if (rows.length > 0) {
      return rows;
    }

    return [
      { role: 'Member', name: 'Sri. M.N. alias Bhausaheb Mohol', description: 'Industrialist' },
      { role: 'Member', name: 'Sri. Pandurang alias Babansheth Naik', description: 'Educationist' },
      { role: 'Member Secretary', name: 'Dr. Rakesh Himte', description: 'Principal' },
    ];
  }, [data]);

  return (
    <PageLayout>
      <div className="w-full bg-white min-h-screen font-sans">
        <PageBanner title="The Governing Council" subtitle="A distinguished assembly of educators, industrialists, and visionaries dedicated to shaping the future of our academic community." breadcrumbs={[{ label: 'Governing Council' }]} />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 py-8 md:py-16">
          <div className="space-y-10 md:space-y-16">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 bg-[#f8fafc] p-6 md:p-12 rounded-tr-[2rem] md:rounded-tr-[4rem] rounded-bl-[2rem] md:rounded-bl-[4rem] border border-gray-100 shadow-sm">
              <div className="relative shrink-0">
                <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-[#fdb813] shadow-lg bg-gray-200 flex items-center justify-center">
                  <User className="w-20 h-20 text-gray-400" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#1a4b7c] rounded-full flex items-center justify-center shadow-md border-2 border-white">
                  <Crown className="w-5 h-5 text-[#fdb813]" />
                </div>
              </div>

              <div className="text-center md:text-left">
                <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#fdb813]/60 mb-1">01</p>
                <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#fdb813] mb-2">{chairman.role}</p>
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a4b7c] mb-3">{chairman.name}</h2>
                <p className="text-slate-500 italic leading-relaxed text-lg">{chairman.description}</p>
                <div className="mt-5 w-16 h-1 bg-[#fdb813] rounded-full md:mx-0 mx-auto" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-8 h-px bg-[#fdb813]" />
                <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#fdb813]">Council Members</p>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <div className="flex flex-col gap-6">
                {members.map((member, idx) => (
                  <div key={`${member.name}-${idx}`} className="flex items-center gap-5 group">
                    <div className="w-24 h-24 shrink-0 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#fdb813] transition-all duration-300 shadow-sm bg-gray-200 flex items-center justify-center">
                      <User className="w-10 h-10 text-gray-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold text-[#fdb813]/50 leading-none mb-1">{String(idx + 2).padStart(2, '0')}</p>
                      <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#fdb813] leading-none mb-1">{member.role}</p>
                      <h3 className="font-display font-bold text-[#1a4b7c] text-base leading-snug">{member.name}</h3>
                      <p className="text-sm text-slate-500 mt-0.5">{member.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
