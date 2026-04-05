import React, { useEffect, useMemo, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { Mail } from 'lucide-react';
import { getAboutSection } from '../../services/about';
import { resolveUploadedAssetUrl } from '../../utils/uploadedAssets';

interface AdminMember {
  name?: string;
  role?: string;
  email?: string;
  image?: string | null;
  displayOrder?: number;
  isActive?: boolean;
}

interface AdministrationData {
  adminCards?: AdminMember[];
}

const fallbackMembers: AdminMember[] = [
  { name: 'Mr. Parag Patil', role: 'Registrar', email: 'registrar@vcet.edu.in' },
  { name: 'Prof. Vishal Pande', role: 'Exam Incharge', email: 'icexam_vcet@vcet.edu.in' },
];

const Administration: React.FC = () => {
  const [data, setData] = useState<AdministrationData | null>(null);
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    getAboutSection<AdministrationData>('administration')
      .then((res) => mounted && setData(res))
      .catch(() => mounted && setData(null))
      .finally(() => {
        if (mounted) setApiLoaded(true);
      });
    

return () => {
      mounted = false;
    };
  }, []);

    const members = useMemo(() => {
    const rows = (data?.adminCards ?? [])
      .filter((card) => card.isActive !== false)
      .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
    return rows.length ? rows : fallbackMembers;
  }, [data]);

        if (!apiLoaded) {
  return (
  <PageLayout>
  <PageBanner title="Administration" breadcrumbs={[{ label: 'Administration' }]} />
  <section className="py-16 bg-white">
  <div className="container mx-auto px-4 sm:px-6 text-center text-slate-500">Loading content...</div>
  </section>
  </PageLayout>
  );
  }

return (
    <PageLayout>
      <PageBanner title="Administration" breadcrumbs={[{ label: 'Administration' }]} />

      <section className="py-8 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="reveal text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">Leadership</span>
                <div className="w-10 h-0.5 bg-brand-gold" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-navy">Administrative Team</h2>
              <p className="text-slate-500 mt-3 max-w-xl mx-auto">Meet the dedicated administrators ensuring smooth operations at VCET</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-3xl mx-auto">
              {members.map((member, idx) => {
                const memberImage = resolveUploadedAssetUrl(member.image ?? null);
                return (
                <div key={`${member.name}-${idx}`} className="reveal" style={{ transitionDelay: `${idx * 0.15}s` }}>
                  <div className="bg-brand-light rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:border-brand-gold/30 transition-all duration-500 group">
                    <div className="aspect-[3/4] bg-gradient-to-br from-brand-blue/10 to-brand-gold/10 flex items-center justify-center relative overflow-hidden">
                      {memberImage && (
                        <img
                          src={memberImage}
                          alt={`${member.name ?? 'Admin'} profile`}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 to-transparent z-10" />
                    </div>

                    <div className="p-6 text-center">
                      <h3 className="text-xl font-display font-bold text-brand-navy">{member.name}</h3>
                      <p className="text-sm text-brand-gold font-semibold mt-1">{member.role}</p>

                      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4" />

                      {!!member.email && (
                        <a href={`mailto:${member.email}`} className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-brand-blue transition-colors duration-300 group/email">
                          <Mail className="w-4 h-4 text-brand-gold group-hover/email:scale-110 transition-transform duration-300" />
                          {member.email}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Administration;
