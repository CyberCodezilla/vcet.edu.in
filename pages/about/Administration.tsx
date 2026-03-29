import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { Mail, User } from 'lucide-react';

interface AdminMember {
  name: string;
  role: string;
  email: string;
  initials: string;
  imagePlaceholder: string;
}

const adminMembers: AdminMember[] = [
  {
    name: 'Mr. Parag Patil',
    role: 'Registrar',
    email: 'registrar@vcet.edu.in',
    initials: 'PP',
    imagePlaceholder: 'registrar-parag-patil.jpg',
  },
  {
    name: 'Prof. Vishal Pande',
    role: 'Exam Incharge',
    email: 'icexam_vcet@vcet.edu.in',
    initials: 'VP',
    imagePlaceholder: 'exam-incharge-vishal-pande.jpg',
  },
];

const Administration: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Administration"
        breadcrumbs={[

          { label: 'Administration' },
        ]}
      />

      <section className="py-8 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="reveal text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                  Leadership
                </span>
                <div className="w-10 h-0.5 bg-brand-gold" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-navy">
                Administrative Team
              </h2>
              <p className="text-slate-500 mt-3 max-w-xl mx-auto">
                Meet the dedicated administrators ensuring smooth operations at VCET
              </p>
            </div>

            {/* Admin Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-3xl mx-auto">
              {adminMembers.map((member, idx) => (
                <div
                  key={member.name}
                  className="reveal"
                  style={{ transitionDelay: `${idx * 0.15}s` }}
                >
                  <div className="bg-brand-light rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:border-brand-gold/30 transition-all duration-500 group">
                    {/* Photo Placeholder */}
                    <div className="aspect-[3/4] bg-gradient-to-br from-brand-blue/10 to-brand-gold/10 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/5 to-transparent" />
                      <div className="text-center relative z-10">
                        <div className="w-20 h-20 bg-white/60 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-500">
                          <span className="text-3xl font-display font-bold text-brand-blue/30">
                            {member.initials}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">{member.imagePlaceholder}</p>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-display font-bold text-brand-navy">
                        {member.name}
                      </h3>
                      <p className="text-sm text-brand-gold font-semibold mt-1">{member.role}</p>

                      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4" />

                      <a
                        href={`mailto:${member.email}`}
                        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-brand-blue transition-colors duration-300 group/email"
                      >
                        <Mail className="w-4 h-4 text-brand-gold group-hover/email:scale-110 transition-transform duration-300" />
                        {member.email}
                      </a>
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

export default Administration;
