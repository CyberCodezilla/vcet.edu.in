import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { Crown, Users } from 'lucide-react';

const members = [
  { role: 'Chairman', name: 'Mr. Vikas Vartak', description: 'Chairman Vidyavardhini' },
  { role: 'Member', name: 'Mr. M.N. alias Bhausaheb Mohol', description: 'Industrialist' },
  { role: 'Member', name: 'Mr. Pandurang alias Babansheth Naik', description: 'Educationist' },
  { role: 'Member', name: 'Mr. Hasmukh Shah', description: 'Industrialist' },
  { role: 'Member', name: 'Mr. Madhurkar B Parekh', description: 'Industrialist, Chairman of Pidilite Industries' },
  { role: 'Member', name: 'Director of Technical Education (M.S.)', description: 'Ex-Officio' },
  { role: 'Member', name: 'Nominee of the University', description: 'Ex-Officio' },
  { role: 'Member', name: 'Director, WRO AICTE', description: 'Ex-Officio' },
  { role: 'Member', name: 'Educationalist/Industrialist', description: 'Nominated by AICTE' },
  { role: 'Member Secretary', name: 'Dr. Rakesh Himte', description: 'Principal' },
  { role: 'Member', name: 'Dr. Uday Aswalekar', description: 'Staff Representative, Professor, MECH' },
  { role: 'Member', name: 'Dr. Archana Ekbote', description: 'Staff Representative, Assistant Professor, INFT' },
];

const chairman = members[0];
const otherMembers = members.slice(1);

const getInitials = (name: string) =>
  name
    .replace(/[^a-zA-Z ]/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

const GoverningCouncil: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Governing Council"
        breadcrumbs={[
          { label: 'About Us', href: '/about-us' },
          { label: 'Governing Council' },
        ]}
      />

      <section className="py-16 md:py-24 bg-gradient-to-b from-brand-light/30 via-white to-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="reveal text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-gold">Leadership & Governance</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-display text-brand-navy">The Governing Council</h2>
            </div>

            <div className="reveal bg-white border border-gray-100 shadow-sm rounded-2xl p-8 md:p-10">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-brand-blue to-brand-navy text-white flex items-center justify-center font-display text-3xl font-bold">
                  {getInitials(chairman.name)}
                </div>
                <div className="text-center md:text-left">
                  <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
                    <Crown className="w-4 h-4" />
                    {chairman.role}
                  </p>
                  <h3 className="mt-2 text-3xl font-display text-brand-navy">{chairman.name}</h3>
                  <p className="text-slate-500">{chairman.description}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {otherMembers.map((member, idx) => (
                <div
                  key={member.name}
                  className="reveal bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300"
                  style={{ transitionDelay: `${idx * 0.04}s` }}
                >
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl bg-brand-light text-brand-blue flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">{member.role}</p>
                      <h4 className="text-lg font-display text-brand-navy mt-1">{member.name}</h4>
                      <p className="text-sm text-slate-500 mt-1">{member.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default GoverningCouncil;
