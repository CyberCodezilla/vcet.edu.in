import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { Building2, User, Users, GraduationCap, Briefcase } from 'lucide-react';

interface OrgNode {
  name: string;
  title: string;
  icon: React.ReactNode;
  children?: OrgNode[];
}

const hierarchy: OrgNode = {
  name: 'Mr. Vikas Vartak',
  title: 'Chairman',
  icon: <Building2 className="w-5 h-5" />,
  children: [
    {
      name: 'Dr. Rakesh Himte',
      title: 'Principal',
      icon: <User className="w-5 h-5" />,
      children: [
        {
          name: 'Deans',
          title: 'Academic & Administrative Deans',
          icon: <Briefcase className="w-5 h-5" />,
          children: [
            {
              name: 'HODs',
              title: 'Heads of Departments',
              icon: <Users className="w-5 h-5" />,
              children: [
                {
                  name: 'Faculty',
                  title: 'Teaching Staff',
                  icon: <GraduationCap className="w-5 h-5" />,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const OrgCard: React.FC<{ node: OrgNode; delay: number }> = ({ node, delay }) => (
  <div className="flex flex-col items-center">
    <div
      className="reveal group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-brand-gold/30 transition-all duration-500 p-6 text-center min-w-[220px] max-w-[280px]"
      style={{ transitionDelay: `${delay * 0.1}s` }}
    >
      <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-brand-blue to-brand-navy flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
        {node.icon}
      </div>
      <h3 className="text-lg font-display font-bold text-brand-navy">{node.name}</h3>
      <p className="text-sm text-brand-gold font-semibold mt-1">{node.title}</p>
    </div>

    {node.children && (
      <>
        {/* Connecting line */}
        <div className="w-px h-10 bg-gradient-to-b from-brand-gold/50 to-brand-blue/30" />
        <div className="w-3 h-3 rounded-full bg-brand-gold/40 border-2 border-brand-gold -mt-1.5 mb-2" />

        {/* Children */}
        <div className="flex flex-wrap justify-center gap-8">
          {node.children.map((child, idx) => (
            <OrgCard key={idx} node={child} delay={delay + idx + 1} />
          ))}
        </div>
      </>
    )}
  </div>
);

const OrganizationalStructure: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Organizational Structure"
        breadcrumbs={[

          { label: 'Organizational Structure' },
        ]}
      />

      {/* Org Chart Image Section */}
      <section className="py-8 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="reveal text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                  Hierarchy
                </span>
                <div className="w-10 h-0.5 bg-brand-gold" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-navy">
                Organizational Chart
              </h2>
              <p className="text-slate-500 mt-3 max-w-xl mx-auto">
                The organizational framework of Vidyavardhini's College of Engineering and Technology
              </p>
            </div>

            {/* Image Placeholder */}
            <div className="reveal mb-20">
              <div className="aspect-[16/10] bg-brand-light rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center hover:border-brand-gold/40 transition-colors duration-300">
                <div className="text-center">
                  <Building2 className="w-16 h-16 text-brand-blue/20 mx-auto mb-3" />
                  <p className="text-sm text-slate-400 font-medium">organizational-structure-chart.jpg</p>
                  <p className="text-xs text-slate-300 mt-1">Full organizational hierarchy chart</p>
                </div>
              </div>
            </div>

            {/* Interactive Card-Based Hierarchy */}
            <div className="reveal text-center mb-12" style={{ transitionDelay: '0.1s' }}>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                  Structure
                </span>
                <div className="w-10 h-0.5 bg-brand-gold" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-navy">
                Institutional Hierarchy
              </h2>
            </div>

            <div className="flex justify-center overflow-x-auto pb-8">
              <OrgCard node={hierarchy} delay={1} />
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default OrganizationalStructure;
