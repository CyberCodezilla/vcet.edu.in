import React, { useEffect, useMemo, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { Shield, BookOpen, Users, CheckCircle2, GraduationCap, ClipboardList, Clock, AlertTriangle, Heart, Handshake, Award, UserCheck } from 'lucide-react';
import { getAboutSection } from '../../services/about';

interface ConductRule {
  title?: string;
  name?: string;
  description?: string;
  text?: string;
  displayOrder?: number;
  order?: number;
  sortOrder?: number;
  isActive?: boolean;
  active?: boolean;
}

interface ConductSection {
  title?: string;
  name?: string;
  description?: string;
  text?: string;
  displayOrder?: number;
  order?: number;
  sortOrder?: number;
  isActive?: boolean;
  active?: boolean;
  rules?: ConductRule[];
  items?: ConductRule[];
}

interface ConductData {
  conductSections?: ConductSection[];
}

const sectionIcons = [GraduationCap, BookOpen, Users];
const sectionColors = ['from-brand-blue to-brand-navy', 'from-brand-gold to-yellow-600', 'from-brand-navy to-brand-dark'];
const ruleIcons = [ClipboardList, UserCheck, Clock, AlertTriangle, Heart, Shield, Award, Handshake, CheckCircle2];

const fallbackSections: ConductSection[] = [
  {
    title: 'Code of Conduct for Students',
    description: 'Students are expected to maintain the highest standards of discipline and decorum on campus.',
    rules: [
      { title: 'Discipline', description: 'Students must adhere to all college rules and regulations.' },
      { title: 'Dress Code', description: 'Students are required to wear the prescribed uniform and display ID cards.' },
    ],
  },
  {
    title: 'Code of Conduct for Faculty',
    description: 'Faculty members are expected to uphold academic integrity and professional excellence.',
    rules: [
      { title: 'Professionalism', description: 'Faculty shall maintain professional conduct with students and colleagues.' },
      { title: 'Academic Integrity', description: 'Faculty must uphold the highest standards of honesty and fairness.' },
    ],
  },
  {
    title: 'Code of Conduct for Staff',
    description: 'Non-teaching staff play a vital role in the smooth functioning of the institution.',
    rules: [
      { title: 'Professional Behavior', description: 'Staff members shall be courteous and responsible in all duties.' },
      { title: 'Integrity & Accountability', description: 'All staff should maintain transparency and follow institutional policies.' },
    ],
  },
];

const CodeOfConduct: React.FC = () => {
  const [data, setData] = useState<ConductData | null>(null);
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    getAboutSection<ConductData>('code-of-conduct')
      .then((res) => mounted && setData(res))
      .catch(() => mounted && setData(null))
      .finally(() => {
        if (mounted) setApiLoaded(true);
      });
    

return () => {
      mounted = false;
    };
  }, []);

    const sections = useMemo(() => {
    const rows = (data?.conductSections ?? [])
      .filter((section) => (section.isActive ?? section.active ?? true) !== false)
      .sort((a, b) => (a.displayOrder ?? a.order ?? a.sortOrder ?? 0) - (b.displayOrder ?? b.order ?? b.sortOrder ?? 0));
    return rows.length ? rows : fallbackSections;
  }, [data]);

        if (!apiLoaded) {
  return (
  <PageLayout>
  <PageBanner title="Code of Conduct" breadcrumbs={[{ label: 'Code of Conduct' }]} />
  <section className="py-16 bg-white">
  <div className="container mx-auto px-4 sm:px-6 text-center text-slate-500">Loading content...</div>
  </section>
  </PageLayout>
  );
  }

return (
    <PageLayout>
      <PageBanner title="Code of Conduct" breadcrumbs={[{ label: 'Code of Conduct' }]} />

      <section className="py-8 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="reveal text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">Guidelines</span>
                <div className="w-10 h-0.5 bg-brand-gold" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-navy">Institutional Code of Conduct</h2>
              <p className="text-slate-500 mt-3 max-w-2xl mx-auto">VCET is committed to fostering a respectful, inclusive, and disciplined environment for all members of the institution.</p>
            </div>

            <div className="space-y-12">
              {sections.map((section, sIdx) => {
                const SectionIcon = sectionIcons[sIdx] ?? Users;
                const color = sectionColors[sIdx] ?? 'from-brand-blue to-brand-navy';
                const rules = (section.rules ?? section.items ?? [])
                  .filter((rule) => (rule.isActive ?? rule.active ?? true) !== false)
                  .sort((a, b) => (a.displayOrder ?? a.order ?? a.sortOrder ?? 0) - (b.displayOrder ?? b.order ?? b.sortOrder ?? 0));
                const sectionTitle = section.title ?? section.name ?? '';
                const sectionDescription = section.description ?? section.text ?? '';

                return (
                  <div key={`${sectionTitle}-${sIdx}`} className="reveal">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-md flex-shrink-0`}>
                        <SectionIcon className="w-6 h-6" />
                      </div>
                      <div>
                          <h3 className="text-xl md:text-2xl font-display font-bold text-brand-navy">{sectionTitle}</h3>
                          <p className="text-sm text-slate-500 mt-0.5">{sectionDescription}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-0 md:ml-16">
                      {rules.map((rule, rIdx) => {
                        const RuleIcon = ruleIcons[(sIdx + rIdx) % ruleIcons.length];
                        return (
                          <div key={`${rule.title}-${rIdx}`} className="reveal group bg-brand-light rounded-2xl border border-gray-100 p-5 hover:border-brand-gold/30 hover:shadow-md transition-all duration-500">
                            <div className="flex items-start gap-3">
                              <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 group-hover:border-brand-gold/40 transition-colors duration-300">
                                <RuleIcon className="w-5 h-5 text-brand-blue" />
                              </div>
                              <div>
                                <h4 className="font-display font-bold text-brand-navy text-sm">{rule.title ?? rule.name ?? ''}</h4>
                                <p className="text-sm text-slate-500 leading-relaxed mt-1">{rule.description ?? rule.text ?? ''}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {sIdx < sections.length - 1 && (
                      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mt-12" />
                    )}
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

export default CodeOfConduct;
