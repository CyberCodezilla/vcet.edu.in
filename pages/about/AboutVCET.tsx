import React, { useEffect, useMemo, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { Target, Eye, BookOpen, Award, MapPin, Calendar, Users, GraduationCap, Sparkles, Building2 } from 'lucide-react';
import { getAboutSection } from '../../services/about';

interface OverviewData {
  paragraphs?: string[];
  accreditation?: string[];
  facts?: { label: string; value: string; displayOrder?: number; isActive?: boolean }[];
}

const AboutVCET: React.FC = () => {
  const [data, setData] = useState<OverviewData | null>(null);
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    getAboutSection<OverviewData>('overview')
      .then((res) => {
        if (mounted) setData(res);
      })
      .catch(() => {
        if (mounted) setData(null);
      })
      .finally(() => {
        if (mounted) setApiLoaded(true);
      });

    

return () => {
      mounted = false;
    };
  }, []);

    const quickFacts = useMemo(() => {
    const facts = (data?.facts ?? [])
      .filter((fact) => fact.isActive !== false)
      .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

    if (facts.length === 0) {
      return [
        { icon: Calendar, value: '1994', label: 'Established' },
        { icon: MapPin, value: '12.27', label: 'Acres Campus' },
        { icon: GraduationCap, value: '5000+', label: 'Students' },
        { icon: Users, value: '200+', label: 'Faculty' },
      ];
    }

    return facts.map((fact) => {
      const label = fact.label?.toLowerCase() ?? '';
      let icon = GraduationCap;
      if (label.includes('established')) icon = Calendar;
      else if (label.includes('acre') || label.includes('campus')) icon = MapPin;
      else if (label.includes('faculty')) icon = Users;

      return { icon, value: fact.value, label: fact.label };
    });
  }, [data]);

  const paragraphs = data?.paragraphs?.length === 3 ? data.paragraphs : [
    "Vidyavardhini means a Body committed to enhancement of Knowledge. Vidyavardhini was established as a registered society in 1970 by late Padmashri H. G. alias Bhausaheb Vartak for the noble cause of education in rural areas.",
    "Vidyavardhini's College of Engineering and Technology, Vasai is located on the sprawling campus of Vidyavardhini, spread over an area of 12.27 acres. It is a short, two minutes walk from Vasai Road (W) Railway Station. The college is also accessible by road from Mumbai.",
    'Vidyavardhini Society received approval from AICTE to start the new college of Engineering & Technology with effect from July, 1994. The college is affiliated to the University of Mumbai for the four year degree program leading to the degree of Bachelor of Engineering.',
  ];

  const accreditationPoints = (data?.accreditation ?? [])
    .filter(Boolean)
    .length > 0
    ? (data?.accreditation ?? [])
    : [
      'Approved by AICTE',
      'DTE Maharashtra',
      'Affiliated to University of Mumbai',
      'NBA Accredited',
      'NAAC Accredited (B++)',
    ];

  const missionPoints = [
    'To provide technologically inspiring environment for learning.',
    'To promote creativity, innovation and professional activities.',
    'To inculcate ethical and moral values.',
    'To cater personal, professional and societal needs through quality education.',
  ];

  const sectionTitles = [
    'Legacy Rooted in Knowledge',
    'Campus and Connectivity',
    'Academic Journey Since 1994',
  ];

  const sectionIcons = [Sparkles, Building2, BookOpen];
  const sectionEyebrows = ['Foundation & Heritage', 'Campus & Location', 'Academics & Affiliation'];

  const quickFactsResolved = quickFacts.length > 0 ? quickFacts : [
    { icon: Calendar, value: '1994', label: 'Established' },
    { icon: MapPin, value: '12.27', label: 'Acres Campus' },
    { icon: GraduationCap, value: '5000+', label: 'Students' },
    { icon: Users, value: '200+', label: 'Faculty' },
  ];

        if (!apiLoaded) {
  return (
  <PageLayout>
  <PageBanner
  title="About VCET"
  breadcrumbs={[
  { label: 'About VCET' },
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
        title="About VCET"
        breadcrumbs={[
          { label: 'About VCET' },
        ]}
      />

      <section className="py-8 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-start lg:gap-16">

            <div className="space-y-8 lg:col-span-2">
              {paragraphs.map((paragraph, index) => {
                const Icon = sectionIcons[index] ?? BookOpen;
                return (
                  <div key={index} className="info-card reveal" style={{ transitionDelay: `${index * 0.08}s` }}>
                    <div className="info-card-top">
                      <span className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-brand-blue" />
                        <span className="text-xs font-bold uppercase tracking-[0.15em] text-brand-blue">{sectionEyebrows[index] ?? 'Overview'}</span>
                      </span>
                    </div>
                    <div className="info-card-body">
                      <h2 className="mb-3 text-2xl font-display font-bold leading-tight text-brand-navy md:text-3xl">{sectionTitles[index] ?? 'Institute Overview'}</h2>
                      <p className="text-lg leading-relaxed text-slate-700 md:text-xl">{paragraph}</p>
                    </div>
                  </div>
                );
              })}

              <div className="reveal flex h-[300px] items-center justify-center overflow-hidden rounded-2xl border border-brand-blue/10 bg-brand-light shadow-sm md:h-[430px] lg:h-[430px]" style={{ transitionDelay: '0.16s' }}>
                <img src="/images/Main Page/Home background/VCET-Home-1-scaled.jpg" alt="VCET Campus" className="w-full h-full object-cover" />
              </div>  
            </div>

            <div className="space-y-8">
              <div id="mission-vision" className="reveal rounded-2xl bg-gradient-to-br from-brand-blue to-brand-navy p-5 md:p-8 text-white shadow-lg shadow-brand-blue/25" style={{ transitionDelay: '0.1s' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <Eye className="w-5 h-5 text-brand-gold" />
                  </div>
                  <h3 className="text-2xl font-display font-bold leading-tight">Vision</h3>
                </div>
                <p className="text-lg leading-relaxed text-white/90">
                  To be a premier institution of technical education, aiming at becoming a
                  valuable resource for industry and society.
                </p>
              </div>

              <div className="reveal rounded-2xl border border-brand-blue/10 bg-brand-light p-5 md:p-8" style={{ transitionDelay: '0.16s' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-brand-blue/10 rounded-xl flex items-center justify-center">
                    <Target className="w-5 h-5 text-brand-blue" />
                  </div>
                  <h3 className="text-2xl font-display font-bold leading-tight text-brand-navy">Mission</h3>
                </div>
                <ul className="space-y-3">
                  {missionPoints.map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-lg leading-relaxed text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold flex-shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div id="accreditations" className="reveal rounded-2xl border border-gray-100 bg-white p-5 md:p-8 shadow-sm" style={{ transitionDelay: '0.22s' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center">
                    <Award className="w-5 h-5 text-brand-gold" />
                  </div>
                  <h3 className="text-2xl font-display font-bold leading-tight text-brand-navy">Accreditations</h3>
                </div>
                <ul className="space-y-2.5">
                  {accreditationPoints.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-lg text-slate-700">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-blue/10 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue block" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="reveal grid grid-cols-2 gap-4" style={{ transitionDelay: '0.26s' }}>
                 {quickFactsResolved.map((stat, idx) => (
                  <div key={idx} className="rounded-xl border border-brand-blue/10 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:border-brand-blue/25 hover:shadow-md">
                    <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-brand-blue/8">
                      <stat.icon className="h-4 w-4 text-brand-blue" />
                    </div>
                    <span className="block text-[2.25rem] leading-none font-bold text-brand-navy">{stat.value}</span>
                    <span className="mt-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AboutVCET;
