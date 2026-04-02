import React, { useEffect, useMemo, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { getFacilitiesSection } from '../../services/facilities';

const mentoringProcess = [
  'During the orientation programme, first year and direct second year students are introduced to the mentoring system.',
  'Parents of newly admitted students are also oriented about the mentoring system.',
  'Each mentor is assigned approximately 15-20 students.',
  'The mentor continues guiding the students until their graduation.',
  'The mentor maintains a record book for each student.',
];

const mentorRecordItems = [
  'Personal details of the student',
  'Family information',
  'Academic progress records',
  'Participation in co-curricular and extracurricular activities',
  'Attendance records',
  'Parent interaction records',
];

const CounselingCell: React.FC = () => {
  const [apiData, setApiData] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    getFacilitiesSection<any>('counselling-cell')
      .then((res) => mounted && setApiData(res))
      .catch(() => mounted && setApiData(null));
    return () => {
      mounted = false;
    };
  }, []);

  const general = useMemo(() => {
    const source = apiData?.general ?? {};
    return {
      title: String(source?.title ?? '').trim() || 'About Counselling Cell',
      description:
        String(source?.description ?? '').trim() ||
        "In today's fast-paced and competitive world, students face personal, social, academic, and career planning challenges. Considering this as a major concern, VCET provides professional counseling support to help students manage these challenges effectively.",
    };
  }, [apiData]);

  const staffRows = useMemo(() => {
    const rows = Array.isArray(apiData?.staff)
      ? apiData.staff
          .map((item: any) => ({
            name: String(item?.name ?? '').trim(),
            role: String(item?.role ?? '').trim(),
            desc: String(item?.desc ?? '').trim(),
          }))
          .filter((item: any) => item.name.length > 0 || item.role.length > 0)
      : [];
    return rows;
  }, [apiData]);

  const mentorRows = useMemo(() => {
    const rows = Array.isArray(apiData?.mentors)
      ? apiData.mentors
          .map((item: any) => String(item?.description ?? '').trim())
          .filter(Boolean)
      : [];
    return rows.length > 0 ? rows : mentoringProcess;
  }, [apiData]);

  const mentorRecords = useMemo(() => {
    const rows = Array.isArray(apiData?.mentors)
      ? apiData.mentors
          .map((item: any) => String(item?.title ?? '').trim())
          .filter(Boolean)
      : [];
    return rows.length > 0 ? rows : mentorRecordItems;
  }, [apiData]);

  return (
    <PageLayout>
      <PageBanner
        title="Counselling Cell"
        breadcrumbs={[
          { label: 'Counselling Cell' },
        ]}
      />

      <section className="py-10 md:py-12 bg-[#eef3fa]">
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="pointer-events-none absolute top-0 right-0 z-0 h-56 w-56 border border-brand-gold/45 bg-brand-gold/18 rounded-full" />
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="reveal rounded-none border border-brand-blue/25 bg-[#f7faff] p-4 md:p-5 shadow-[0_14px_30px_-24px_rgba(10,32,66,0.55)] hover:shadow-[0_18px_34px_-22px_rgba(10,32,66,0.62)] transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                <div className="lg:col-span-8">
                  <div className="relative inline-flex mb-6">
                    <div className="relative inline-flex items-center gap-2 border border-brand-gold/70 bg-[#1b3f6b] px-5 md:px-7 py-2.5 md:py-3 rounded-none shadow-[0_12px_20px_-14px_rgba(10,32,66,0.78)] pr-12 md:pr-14 [clip-path:polygon(0_0,100%_0,96%_50%,100%_100%,0_100%)]">
                      <span className="font-display text-2xl md:text-3xl font-extrabold uppercase tracking-[0.08em] text-brand-gold leading-none [text-shadow:0_1px_6px_rgba(84,62,8,0.35)]">
                        Student Support
                      </span>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-none border border-brand-blue/25 bg-[#e9f0fb] p-1.5 shadow-[0_14px_24px_-22px_rgba(10,32,66,0.7)] transition-all duration-300 hover:border-brand-gold/55 hover:shadow-[0_16px_28px_-20px_rgba(10,32,66,0.8)]">
                    <div className="relative rounded-none border border-white/70 bg-[#ffffff] px-5 py-4 md:px-6 md:py-5">
                      <p
                        className="text-[17px] md:text-[18px] text-[#333333] leading-8"
                        style={{ fontFamily: 'Cambria, Georgia, serif' }}
                      >
                        In today's fast-paced and competitive world, students face personal, social,
                        academic, and career planning challenges. Considering this as a major concern,
                        VCET provides professional counseling support to help students manage these
                        challenges effectively.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group lg:col-span-4" style={{ transitionDelay: '0.08s' }}>
                  <div className="relative h-full overflow-hidden rounded-none border border-brand-blue/30 bg-[#f1f6ff] p-5 shadow-[0_14px_28px_-22px_rgba(10,32,66,0.55)] hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-18px_rgba(10,32,66,0.65)] hover:border-brand-gold/60 transition-all duration-300">
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#0f2d57]" />
                    <div className="text-xs md:text-sm font-bold uppercase tracking-[0.15em] text-[#0f2d57] mb-3 pl-2">
                      Services Format
                    </div>
                    <div className="space-y-2 text-base md:text-lg text-[#333333]" style={{ fontFamily: 'Cambria, Georgia, serif' }}>
                      <div className="group/item flex items-center gap-2 rounded-none bg-[#15335c] border border-brand-gold/45 px-3 py-2.5 text-[#f7f1df] transition-all duration-300 hover:translate-x-1 hover:bg-[#0f2746] hover:border-brand-gold/70 hover:shadow-[0_10px_18px_-14px_rgba(10,32,66,0.75)]">
                        <span className="h-1.5 w-1.5 rounded-none bg-brand-gold shrink-0" />
                        <span>Individual Counseling</span>
                      </div>
                        <div className="group/item flex items-center gap-2 rounded-none bg-[#15335c] border border-brand-gold/45 px-3 py-2.5 text-[#f7f1df] transition-all duration-300 hover:translate-x-1 hover:bg-[#0f2746] hover:border-brand-gold/70 hover:shadow-[0_10px_18px_-14px_rgba(10,32,66,0.75)]">
                        <span className="h-1.5 w-1.5 rounded-none bg-brand-gold shrink-0" />
                        <span>Group Counseling</span>
                      </div>
                        <div className="group/item flex items-center gap-2 rounded-none bg-[#15335c] border border-brand-gold/45 px-3 py-2.5 text-[#f7f1df] transition-all duration-300 hover:translate-x-1 hover:bg-[#0f2746] hover:border-brand-gold/70 hover:shadow-[0_10px_18px_-14px_rgba(10,32,66,0.75)]">
                        <span className="h-1.5 w-1.5 rounded-none bg-brand-gold shrink-0" />
                        <span>Orientation Sessions</span>
                      </div>
                        <div className="group/item flex items-center gap-2 rounded-none bg-[#15335c] border border-brand-gold/45 px-3 py-2.5 text-[#f7f1df] transition-all duration-300 hover:translate-x-1 hover:bg-[#0f2746] hover:border-brand-gold/70 hover:shadow-[0_10px_18px_-14px_rgba(10,32,66,0.75)]">
                        <span className="h-1.5 w-1.5 rounded-none bg-brand-gold shrink-0" />
                        <span>Life Skills Training</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12 bg-[#eaf0f9]">
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 reveal">
              <div className="inline-flex items-center justify-center gap-2 mb-3 rounded-none border border-brand-gold/65 bg-[#102a4c] py-1.5 pl-7 pr-7 shadow-[0_8px_18px_-14px_rgba(10,32,66,0.75)] [clip-path:polygon(0_0,100%_0,92%_50%,100%_100%,0_100%,8%_50%)]">
                <span className="text-xs md:text-sm font-bold uppercase tracking-[0.14em] text-brand-gold">
                  Guidance
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy">
                {general.title}
              </h2>
            </div>

            <div
              className="reveal relative overflow-hidden border border-brand-blue/25 bg-[#f8fbff] p-6 md:p-7 shadow-[0_16px_30px_-24px_rgba(10,32,66,0.6)] hover:-translate-y-0.5 hover:shadow-[0_20px_36px_-22px_rgba(10,32,66,0.65)] hover:border-brand-gold/55 transition-all duration-300 rounded-none"
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-none border border-brand-gold/55 bg-[#102a4c] px-3 py-1">
                <div className="h-0.5 w-12 bg-brand-gold/75" />
                <div className="h-2 w-2 rounded-full bg-brand-gold shadow-[0_0_10px_rgba(212,175,55,0.7)]" />
                <div className="h-0.5 w-6 bg-brand-gold/50" />
              </div>
              <p
                className="text-[17px] md:text-[18px] text-[#333333] leading-8 mb-4"
                style={{ fontFamily: 'Cambria, Georgia, serif' }}
              >
                        {general.description}
                      </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12 bg-[#edf3fb]">
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="pointer-events-none absolute -top-16 left-1/2 z-0 h-96 w-96 -translate-x-1/2 border border-brand-gold/40 bg-brand-gold/14 rounded-full" />
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="text-center mb-8 reveal">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-10 h-0.5 bg-brand-gold" />
                <span className="text-xs md:text-sm font-bold uppercase tracking-[0.14em] text-brand-gold">
                  Professional Support
                </span>
                <div className="w-10 h-0.5 bg-brand-gold" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy">
                Counsellor Information
              </h2>
            </div>

            <div className="reveal">
              <div className="relative overflow-hidden rounded-none border border-brand-blue/25 bg-[#f8fbff] shadow-[0_20px_34px_-24px_rgba(10,32,66,0.62)] hover:-translate-y-0.5 hover:shadow-[0_24px_40px_-22px_rgba(10,32,66,0.68)] hover:border-brand-gold/60 transition-all duration-300">
                <div className="absolute inset-x-0 top-0 h-1 bg-[#0f2d57]" />
                <div className="p-6 md:p-7">
                  <div className="mb-5">
                    <div>
                      <div className="text-xs md:text-sm font-bold uppercase tracking-[0.14em] text-[#9a6a00] mb-1">
                        Institute Psychologist
                      </div>
                      <h3 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-brand-navy">
                        {staffRows[0]?.name || 'Mrs. Poonam Surange'}
                      </h3>
                      <div className="mt-3 inline-block border border-brand-gold/60 bg-[#102a4c] px-2.5 py-1.5 text-sm font-semibold text-brand-gold shadow-[0_8px_16px_-12px_rgba(10,32,66,0.65)] rounded-none">
                        {staffRows[0]?.role || 'Student Counseling and Guidance'}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-none border border-brand-blue/20 bg-[#eef3fa] p-4 mb-4 border-l-4 border-l-brand-gold shadow-[inset_0_0_0_1px_rgba(255,255,255,0.82)]">
                    <h4 className="text-base md:text-lg font-semibold text-brand-navy mb-2">Qualifications</h4>
                    <ul className="space-y-1.5 text-base md:text-lg text-[#333333]" style={{ fontFamily: 'Cambria, Georgia, serif' }}>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                        PG Psychology (Gold Medalist)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                        MS - Psychology
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                        PG Diploma in Guidance and Counseling
                      </li>
                    </ul>
                  </div>

                  <p
                    className="text-[17px] md:text-[18px] text-[#333333] leading-8"
                    style={{ fontFamily: 'Cambria, Georgia, serif' }}
                  >
                    VCET has appointed a well-qualified and experienced psychologist to provide
                    counseling support to students. Counseling services help students address
                    personal, academic, and emotional concerns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12 bg-[#eaf1fb]">
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="pointer-events-none absolute -top-20 left-8 z-0 h-[26rem] w-[26rem] border border-brand-gold/38 bg-brand-gold/12 rounded-full" />
          <div className="relative z-10 max-w-6xl mx-auto reveal">
            <div className="group relative overflow-hidden rounded-none border border-brand-blue/25 bg-[#f7fbff] p-6 md:p-8 shadow-[0_16px_30px_-24px_rgba(10,32,66,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_34px_-22px_rgba(10,32,66,0.66)] hover:border-brand-gold/55">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="text-xs md:text-sm font-bold uppercase tracking-[0.14em] text-[#9a6a00]">
                  Vision
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-brand-navy mb-4 transition-colors duration-300 group-hover:text-brand-navy">
                Vision of the Counselling Cell
              </h2>
              <p
                className="text-[17px] md:text-[18px] text-[#333333] leading-8"
                style={{ fontFamily: 'Cambria, Georgia, serif' }}
              >
                The vision of the counseling cell is to create a positive environment in the
                institute and enable individuals to contribute meaningfully to the organization and
                the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12 bg-[#edf3fb]">
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 reveal">
              <div className="inline-flex items-center justify-center gap-2 mb-3 border border-brand-gold/65 bg-[#102a4c] py-1.5 pl-7 pr-7 rounded-none [clip-path:polygon(0_0,100%_0,92%_50%,100%_100%,0_100%,8%_50%)]">
                <span className="text-xs md:text-sm font-bold uppercase tracking-[0.14em] text-brand-gold">
                  Mentoring Framework
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy">
                Student Mentoring System
              </h2>
            </div>

            <div className="reveal mb-5 rounded-none border border-brand-blue/25 bg-[#f8fbff] p-1.5 shadow-[0_14px_30px_-24px_rgba(10,32,66,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-20px_rgba(10,32,66,0.62)] hover:border-brand-gold/55">
              <div className="rounded-none border-l-4 border-brand-gold bg-[#e9f0fb] px-4 py-4 md:px-5">
                <h3 className="mb-2 text-xl md:text-2xl font-display font-bold uppercase tracking-[0.08em] text-brand-navy">
                  Introduction
                </h3>
                <p
                  className="text-[17px] md:text-[18px] text-[#333333] leading-8"
                  style={{ fontFamily: 'Cambria, Georgia, serif' }}
                >
                  A well-structured mentoring (proctor) system is implemented in the institute.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
              <div className="reveal xl:col-span-2 h-full flex flex-col rounded-none border border-brand-blue/25 bg-[#f7fbff] p-5 shadow-[0_16px_28px_-24px_rgba(10,32,66,0.55)] hover:-translate-y-0.5 hover:shadow-[0_18px_32px_-20px_rgba(10,32,66,0.62)] hover:border-brand-gold/55 transition-all duration-300">
                <div className="border-l-4 border-brand-blue pl-3 mb-4">
                  <h3 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-brand-navy">Objective</h3>
                </div>
                <p
                  className="text-[17px] md:text-[18px] text-[#333333] leading-8"
                  style={{ fontFamily: 'Cambria, Georgia, serif' }}
                >
                  Faculty members actively mentor students to ensure their holistic development.
                  The mentor system encourages a healthy relationship between students and faculty
                  members, helping students grow academically and personally.
                </p>

                <div className="mt-auto pt-4 border-t border-brand-blue/10">
                  <div className="rounded-none border border-brand-gold/65 bg-[#102a4c] p-3 shadow-[0_12px_22px_-18px_rgba(10,32,66,0.85)]">
                  <div className="text-xs md:text-sm font-bold uppercase tracking-[0.14em] text-[#ffd84d] mb-1">
                    Mentor Allocation
                  </div>
                  <p className="text-base md:text-lg text-[#f1f4fa]" style={{ fontFamily: 'Cambria, Georgia, serif' }}>
                    Each mentor is assigned approximately 15-20 students and continues guidance
                    till graduation.
                  </p>
                  </div>
                </div>
              </div>

              <div className="reveal xl:col-span-3 rounded-none border border-brand-blue/25 bg-[#f7fbff] p-5 shadow-[0_16px_28px_-24px_rgba(10,32,66,0.55)] hover:-translate-y-0.5 hover:shadow-[0_20px_34px_-20px_rgba(10,32,66,0.62)] hover:border-brand-gold/55 transition-all duration-300">
                <div className="border-l-4 border-brand-blue pl-3 mb-4">
                  <h3 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-brand-navy">Process</h3>
                </div>

                <div className="space-y-3">
                  {mentorRows.map((item, idx) => (
                    <div
                      key={idx}
                      className="group rounded-none border border-brand-blue/20 bg-[#eaf1fb] px-3 py-3.5 hover:bg-[#f8fbff] hover:border-brand-gold/55 hover:shadow-[0_12px_22px_-16px_rgba(10,32,66,0.75)] transition-all duration-300"
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 h-7 min-w-7 border border-brand-blue/45 bg-[#ffffff] text-xs md:text-sm font-bold text-brand-navy flex items-center justify-center shrink-0 transition-all duration-300 group-hover:border-brand-gold/65 group-hover:bg-[#fdf2cf] rounded-none">
                          {idx + 1}
                        </span>
                        <span
                          className="text-base md:text-lg text-[#333333] leading-8 transition-colors duration-300 group-hover:text-[#1f2f46]"
                          style={{ fontFamily: 'Cambria, Georgia, serif' }}
                        >
                          {item}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12 bg-[#eaf1fb]">
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="pointer-events-none absolute top-0 left-0 z-0 h-56 w-56 border border-brand-gold/45 bg-brand-gold/18 rounded-full" />
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="text-center mb-8 reveal">
              <div className="inline-flex items-center justify-center gap-2 mb-3 border border-brand-gold/65 bg-[#102a4c] py-1.5 pl-7 pr-7 rounded-none [clip-path:polygon(0_0,100%_0,92%_50%,100%_100%,0_100%,8%_50%)]">
                <span className="text-xs md:text-sm font-bold uppercase tracking-[0.14em] text-brand-gold">
                  Tracking System
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy">
                Mentor Record Information
              </h2>
            </div>

            <div className="reveal relative overflow-hidden rounded-none border border-brand-blue/25 bg-[#f8fbff] p-6 shadow-[0_18px_32px_-26px_rgba(10,32,66,0.58)] hover:shadow-[0_20px_36px_-22px_rgba(10,32,66,0.64)] transition-all duration-300">
              <p className="text-base md:text-lg text-[#333333] mb-4" style={{ fontFamily: 'Cambria, Georgia, serif' }}>
                The mentor maintains records including:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {mentorRecords.map((item, idx) => (
                  <div
                    key={item}
                    className="group rounded-none border border-brand-blue/20 bg-[#e9f0fb] px-4 py-3.5 text-[17px] md:text-[18px] text-[#1f2f46] hover:-translate-y-0.5 hover:bg-[#f8fbff] hover:shadow-md hover:border-brand-gold/55 transition-all duration-300"
                    style={{ transitionDelay: `${0.04 * idx}s` }}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-gold shrink-0" />
                      <span className="font-sans leading-7">{item}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-none border border-brand-gold/65 bg-[#102a4c] py-4 px-6 text-center shadow-[0_12px_26px_-16px_rgba(10,32,66,0.82)]">
                <p
                  className="text-base md:text-xl text-[#f1f4fa] leading-8 max-w-3xl mx-auto"
                  style={{ fontFamily: 'Cambria, Georgia, serif' }}
                >
                  Mentors also communicate the student's performance regularly with parents or
                  guardians.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </PageLayout>
  );
};

export default CounselingCell;
