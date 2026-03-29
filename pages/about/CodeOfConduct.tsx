import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import {
  Shield,
  BookOpen,
  Users,
  CheckCircle2,
  GraduationCap,
  ClipboardList,
  Clock,
  AlertTriangle,
  Heart,
  Handshake,
  Award,
  UserCheck,
} from 'lucide-react';

interface ConductSection {
  title: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  items: { icon: React.ReactNode; title: string; text: string }[];
}

const sections: ConductSection[] = [
  {
    title: 'Code of Conduct for Students',
    icon: <GraduationCap className="w-6 h-6" />,
    color: 'from-brand-blue to-brand-navy',
    description:
      'Students are expected to maintain the highest standards of discipline and decorum on campus.',
    items: [
      {
        icon: <ClipboardList className="w-5 h-5" />,
        title: 'Discipline',
        text: 'Students must adhere to all college rules and regulations. Any form of misconduct, vandalism, or disruption of academic activities is strictly prohibited.',
      },
      {
        icon: <UserCheck className="w-5 h-5" />,
        title: 'Dress Code',
        text: 'Students are required to wear the prescribed college uniform on all working days. Identity cards must be displayed visibly at all times on campus.',
      },
      {
        icon: <Clock className="w-5 h-5" />,
        title: 'Attendance',
        text: 'A minimum of 75% attendance is mandatory for all lectures, practicals, and tutorials. Students falling short of attendance requirements may be detained from examinations.',
      },
      {
        icon: <AlertTriangle className="w-5 h-5" />,
        title: 'Anti-Ragging',
        text: 'Ragging in any form is a punishable offense under the Maharashtra Prohibition of Ragging Act. The college maintains zero tolerance towards ragging and strict action will be taken against offenders.',
      },
    ],
  },
  {
    title: 'Code of Conduct for Faculty',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'from-brand-gold to-yellow-600',
    description:
      'Faculty members are expected to uphold the values of academic integrity and professional excellence.',
    items: [
      {
        icon: <Heart className="w-5 h-5" />,
        title: 'Professionalism',
        text: 'Faculty members shall maintain professional conduct in all interactions with students, colleagues, and stakeholders. They should be punctual, well-prepared, and committed to delivering quality education.',
      },
      {
        icon: <Shield className="w-5 h-5" />,
        title: 'Academic Integrity',
        text: 'Faculty must uphold the highest standards of academic honesty. They should encourage original thinking, provide fair and unbiased assessments, and maintain confidentiality of examination-related matters.',
      },
      {
        icon: <Award className="w-5 h-5" />,
        title: 'Continuous Development',
        text: 'Faculty are encouraged to pursue research, attend workshops, and stay updated with the latest advancements in their respective fields to enrich the learning experience.',
      },
    ],
  },
  {
    title: 'Code of Conduct for Staff',
    icon: <Users className="w-6 h-6" />,
    color: 'from-brand-navy to-brand-dark',
    description:
      'Non-teaching staff play a vital role in the smooth functioning of the institution.',
    items: [
      {
        icon: <Handshake className="w-5 h-5" />,
        title: 'Professional Behavior',
        text: 'Staff members shall conduct themselves with courtesy and professionalism. They should be cooperative with students, faculty, and visitors, and carry out their duties responsibly.',
      },
      {
        icon: <CheckCircle2 className="w-5 h-5" />,
        title: 'Integrity & Accountability',
        text: 'All staff must maintain transparency in their work, handle institutional resources responsibly, and adhere to applicable rules, policies, and guidelines set by the administration.',
      },
    ],
  },
];

const CodeOfConduct: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Code of Conduct"
        breadcrumbs={[

          { label: 'Code of Conduct' },
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
                  Guidelines
                </span>
                <div className="w-10 h-0.5 bg-brand-gold" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-navy">
                Institutional Code of Conduct
              </h2>
              <p className="text-slate-500 mt-3 max-w-2xl mx-auto">
                VCET is committed to fostering a respectful, inclusive, and disciplined environment
                for all members of the institution.
              </p>
            </div>

            {/* Conduct Sections */}
            <div className="space-y-12">
              {sections.map((section, sIdx) => (
                <div
                  key={section.title}
                  className="reveal"
                  style={{ transitionDelay: `${sIdx * 0.12}s` }}
                >
                  {/* Section Title Card */}
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center text-white shadow-md flex-shrink-0`}
                    >
                      {section.icon}
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-display font-bold text-brand-navy">
                        {section.title}
                      </h3>
                      <p className="text-sm text-slate-500 mt-0.5">{section.description}</p>
                    </div>
                  </div>

                  {/* Items Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-0 md:ml-16">
                    {section.items.map((item, iIdx) => (
                      <div
                        key={item.title}
                        className="reveal group bg-brand-light rounded-2xl border border-gray-100 p-5 hover:border-brand-gold/30 hover:shadow-md transition-all duration-500"
                        style={{ transitionDelay: `${(sIdx * 0.12) + (iIdx * 0.06)}s` }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 group-hover:border-brand-gold/40 transition-colors duration-300">
                            <span className="text-brand-blue">{item.icon}</span>
                          </div>
                          <div>
                            <h4 className="font-display font-bold text-brand-navy text-sm">
                              {item.title}
                            </h4>
                            <p className="text-sm text-slate-500 leading-relaxed mt-1">
                              {item.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Divider between sections */}
                  {sIdx < sections.length - 1 && (
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mt-12" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CodeOfConduct;
