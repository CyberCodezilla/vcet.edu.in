import React, { useEffect, useMemo, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { Briefcase, FileText, ClipboardList, Send, CheckCircle, Clock, MapPin, Users } from 'lucide-react';
import { getStudentCareerSection } from '../../services/studentCareer';

const stats = [
  { icon: Briefcase, value: '100+', label: 'Faculty & Staff' },
  { icon: Users, value: '50+', label: 'Departments' },
  { icon: Clock, value: 'Full-Time', label: 'Opportunities' },
  { icon: MapPin, value: 'Vasai', label: 'Location' },
];

const openings = [
  {
    title: 'Assistant Professor – Computer Engineering',
    department: 'Computer Engineering',
    type: 'Full-Time',
    posted: 'January 2026',
  },
  {
    title: 'Assistant Professor – Mechanical Engineering',
    department: 'Mechanical Engineering',
    type: 'Full-Time',
    posted: 'January 2026',
  },
  {
    title: 'Lab Assistant – AI & Data Science',
    department: 'AI & Data Science',
    type: 'Full-Time',
    posted: 'December 2025',
  },
  {
    title: 'Administrative Officer',
    department: 'Administration',
    type: 'Full-Time',
    posted: 'December 2025',
  },
];

const processSteps = [
  {
    step: '01',
    title: 'Check Openings',
    description: 'Browse our current job openings and find a position that matches your qualifications and interests.',
  },
  {
    step: '02',
    title: 'Submit Application',
    description: 'Send your updated resume along with a cover letter and relevant documents to the designated email address.',
  },
  {
    step: '03',
    title: 'Screening & Shortlisting',
    description: 'Applications are reviewed and shortlisted candidates are contacted for the interview process.',
  },
  {
    step: '04',
    title: 'Interview & Selection',
    description: 'Shortlisted candidates undergo an interview. Selected candidates receive an official offer letter.',
  },
];

const CareerAtVCET: React.FC = () => {
  const [apiData, setApiData] = useState<Record<string, any> | null>(null);
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    getStudentCareerSection<Record<string, any>>('career-at-vcet')
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

    const resolvedStats = useMemo(() => {
    if (!Array.isArray(apiData?.stats)) return stats;
    const iconMap = [Briefcase, Users, Clock, MapPin];
    const mapped = apiData.stats.map((item: Record<string, unknown>, index: number) => ({
      icon: iconMap[index] ?? Briefcase,
      value: String(item.value ?? ''),
      label: String(item.label ?? ''),
    })).filter((item: { value: string; label: string; }) => item.value || item.label);
    return mapped.length > 0 ? mapped : stats;
  }, [apiData]);

  const resolvedOpenings = useMemo(() => {
    if (!Array.isArray(apiData?.openings)) return openings;
    const mapped = apiData.openings.map((item: Record<string, unknown>) => ({
      title: String(item.title ?? ''),
      department: String(item.department ?? ''),
      type: String(item.type ?? ''),
      posted: String(item.posted ?? ''),
    })).filter((item: { title: string; }) => item.title);
    return mapped.length > 0 ? mapped : openings;
  }, [apiData]);

  const resolvedSteps = useMemo(() => {
    if (!Array.isArray(apiData?.processSteps)) return processSteps;
    const mapped = apiData.processSteps.map((item: Record<string, unknown>, index: number) => ({
      step: String(item.step ?? `${index + 1}`.padStart(2, '0')),
      title: String(item.title ?? ''),
      description: String(item.description ?? ''),
    })).filter((item: { title: string; }) => item.title);
    return mapped.length > 0 ? mapped : processSteps;
  }, [apiData]);

  const heroTag = typeof apiData?.heroTag === 'string' && apiData.heroTag.trim() ? apiData.heroTag : 'Join Our Team';
  const heroTitle = typeof apiData?.heroTitle === 'string' && apiData.heroTitle.trim() ? apiData.heroTitle : 'Career Opportunities at VCET';
  const heroDescription = typeof apiData?.heroDescription === 'string' && apiData.heroDescription.trim()
    ? apiData.heroDescription
    : "Vidyavardhini's College of Engineering and Technology (VCET) is always looking for talented, passionate individuals to join our team. We offer a dynamic work environment, opportunities for professional growth, and a chance to shape the future of engineering education.";

        if (!apiLoaded) {
  return (
  <PageLayout>
  <PageBanner
  title="Career @ VCET"
  breadcrumbs={[
  { label: 'Career @ VCET' },
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
        title="Career @ VCET"
        breadcrumbs={[
          { label: 'Career @ VCET' },
        ]}
      />

      {/* Overview */}
      <section className="py-8 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="reveal">
                <div className="bg-brand-light rounded-2xl aspect-[4/3] flex items-center justify-center border border-brand-blue/10">
                  <span className="text-sm font-semibold text-brand-blue/40 tracking-wide">
                    career-at-vcet.jpg
                  </span>
                </div>
              </div>

              <div className="reveal" style={{ transitionDelay: '0.1s' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-0.5 bg-brand-gold" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">{heroTag}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy mb-6">
                  {heroTitle}
                </h2>
                <p className="text-slate-500 leading-relaxed mb-4">
                  {heroDescription}
                </p>
                <p className="text-slate-500 leading-relaxed mb-6">
                  Whether you are an experienced academician, a researcher, or an administrative
                  professional, we invite you to explore exciting career opportunities at VCET.
                </p>
                <a
                  href="#openings"
                  className="inline-flex items-center gap-2 bg-brand-blue text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-brand-navy transition-colors duration-300"
                >
                  <FileText className="w-4 h-4" />
                  View Recruitment Notice
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-gradient-to-br from-brand-dark via-brand-blue to-brand-navy">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {resolvedStats.map((stat, idx) => (
              <div
                key={idx}
                className="reveal text-center p-6"
                style={{ transitionDelay: `${0.1 * idx}s` }}
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-white/10 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-brand-gold" />
                </div>
                <div className="text-2xl md:text-3xl font-display font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-widest text-white/50 font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section id="openings" className="py-8 md:py-16 lg:py-24 bg-brand-light">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-14 reveal">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy mb-4">
              Current Openings
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Explore available positions and take the next step in your career.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {resolvedOpenings.map((opening, idx) => (
              <div
                key={idx}
                className="reveal group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg p-6 transition-all duration-500 hover:-translate-y-1 hover:border-brand-gold/30"
                style={{ transitionDelay: `${0.05 * idx}s` }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-display font-bold text-brand-navy mb-1 group-hover:text-brand-blue transition-colors duration-300">
                      {opening.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5" /> {opening.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {opening.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <ClipboardList className="w-3.5 h-3.5" /> Posted: {opening.posted}
                      </span>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 bg-brand-blue/10 text-brand-blue px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-blue hover:text-white transition-colors duration-300"
                  >
                    <Send className="w-3.5 h-3.5" /> Apply
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-8 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-14 reveal">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy mb-4">
              Application Process
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              A simple and transparent hiring process to find the right talent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {resolvedSteps.map((item, idx) => (
              <div
                key={idx}
                className="reveal group bg-brand-light rounded-xl p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
                style={{ transitionDelay: `${0.1 * idx}s` }}
              >
                <div className="text-3xl font-display font-bold text-brand-gold/30 mb-3 group-hover:text-brand-gold transition-colors duration-300">
                  {item.step}
                </div>
                <div className="w-10 h-10 mx-auto bg-white rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-gold/10 transition-colors duration-300">
                  <CheckCircle className="w-5 h-5 text-brand-blue group-hover:text-brand-gold transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-display font-bold text-brand-navy mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CareerAtVCET;
