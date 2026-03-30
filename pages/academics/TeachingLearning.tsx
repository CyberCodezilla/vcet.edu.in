import React, { useEffect } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { ChevronRight, Image as ImageIcon } from 'lucide-react';

const flowPhases = [
  {
    label: 'Pre-requisites',
    step: '01',
    color: 'bg-amber-700',
    border: 'border-amber-700',
    dot: 'bg-amber-700',
    items: [
      'University Curriculum',
      'Academic Calendar',
      'Subject Allocation',
      'Timetable Preparation',
      'Formation of COs, CO-PO/PSO mapping',
      'Gap Identification and Action Plan',
      'Lesson Plan / Lab Manual',
      'Mode of Conduction',
      'Additional Activities (Expert Lecture / Workshop etc.)',
    ],
  },
  {
    label: 'In-Semester',
    step: '02',
    color: 'bg-blue-800',
    border: 'border-blue-800',
    dot: 'bg-blue-800',
    items: [
      'Curriculum Delivery',
      'Conduction of Academic Schedule',
      'In-semester Continuous Assessment',
      'Activity for weak/average/bright learners',
      'Attendance Monitoring',
      'Interaction with parents',
      'Online Teaching Feedback',
      'Co-curricular Activities',
      'Extra-curricular Activities',
    ],
  },
  {
    label: 'End-Semester',
    step: '03',
    color: 'bg-rose-800',
    border: 'border-rose-800',
    dot: 'bg-rose-800',
    items: [
      'End Semester Assessment',
      'Course Exit Survey',
      'Contribution of CO Attainment towards POs/PSOs',
      'Observations and Action Taken for course',
      'Program Exit Survey',
      'Stakeholders Feedback',
      'PO-PSO Attainment for Batch',
      'Observations and Action Taken for Batch',
    ],
  },
];

const TeachingLearning: React.FC = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <PageLayout>
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }
        .container {
          max-width: 1200px;
        }
      `}</style>

      <PageBanner
        title="Teaching Learning Process"
        breadcrumbs={[{ label: 'Teaching Learning Process' }]}
      />

      {/* Objective Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="reveal mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-[#C5A022]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A022]">
                  Mission
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#002147] mb-6">
                Objective
              </h2>
            </div>

            <div className="reveal" style={{ transitionDelay: '0.1s' }}>
              <p className="text-slate-600 leading-relaxed text-lg">
                In today's time teacher's role is not limited only to teaching but one has to play
                the role of mentor, guide, philosopher, friend, guardian and most importantly
                facilitator. This helps to direct the efforts to make the student a nation builder
                and a responsible citizen.
              </p>
              <p className="text-slate-600 leading-relaxed text-lg mt-4">
                At VCET, our aim is to groom the students such that he/she should be employable /
                Entrepreneur, good human being with self-confidence and self-respect. For dynamic
                teaching learning, ICT tools are used to make the teaching learning process
                interactive. Regularly organised workshops, expert lectures, industrial visits
                etc. are conducted to fulfil the curriculum gap and to enhance their knowledge.
                Sometimes a subject is very theoretical, so to develop interest we have to relate
                the subject with real life examples, design assignments which need some surveys,
                group discussions and exploring the internet. This develops students' interest in
                the subject. Encourage students to take up projects with innovative ideas,
                contribution to the society, follow the ethics and work as a team. Encourage and
                motivate students to participate in co-curricular and extra-curricular activities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Curricular Planning & Implementation — image + flowchart */}
      <section className="py-20 md:py-28 bg-white border-t border-[#E5E7EB]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="reveal mb-14">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-[#C5A022]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A022]">
                  Strategic Planning
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#002147] mb-4">
                Curricular Planning &amp; Implementation
              </h2>
              <p className="text-slate-600 max-w-2xl text-base leading-relaxed">
                A structured three-phase roadmap ensures seamless knowledge transfer and student
                success across the semester.
              </p>
            </div>


            {/* Three-phase flowchart */}
            <div className="reveal overflow-x-auto rounded-3xl border border-gray-100 shadow-xl bg-white p-8">
              <div className="flex items-stretch min-w-[900px] gap-0">
                {flowPhases.map((phase, idx) => (
                  <React.Fragment key={phase.label}>
                    <div
                      className={`flex-1 flex flex-col border-2 ${phase.border} rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow`}
                    >
                      {/* Phase header */}
                      <div
                        className={`${phase.color} px-5 py-4 flex items-center justify-between`}
                      >
                        <span className="text-white font-bold text-sm uppercase tracking-wider">
                          {phase.label}
                        </span>
                        <div className="bg-white/20 px-2 py-0.5 rounded text-white text-[10px] font-bold">
                          Phase {phase.step}
                        </div>
                      </div>
                      {/* Phase items */}
                      <ul className="p-5 flex-1 space-y-3 bg-white">
                        {phase.items.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 py-1 border-b border-slate-50 last:border-0 text-[13px] text-slate-700 font-medium"
                          >
                            <span
                              className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${phase.dot}`}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Arrow between phases */}
                    {idx < flowPhases.length - 1 && (
                      <div className="flex items-center justify-center w-12 flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#002147]/40 shadow-inner">
                          <ChevronRight size={20} />
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Outcome Based Education Section */}
            <div className="reveal mt-28">
              <div className="max-w-5xl">
                <h3 className="text-2xl md:text-4xl font-bold text-[#002147] mb-6 flex items-center gap-4 group">
                  <ChevronRight className="text-[#C5A022] w-7 h-7 mt-1 group-hover:translate-x-1 transition-transform" />
                  Outcome Based Education Framework
                </h3>
                <p className="text-slate-600 text-lg md:text-xl leading-relaxed mb-12">
                  Our OBE model centers on defined Graduate Attributes (POs). Inputs from
                  stakeholders drive the Vision, Mission, and Objectives, which trickle down to
                  Course Outcomes and Continuous Improvement.
                </p>

                {/* Diagram Image Holder */}
                <div className="mt-12">
                  <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 shadow-inner">
                    <div className="aspect-[16/9] w-full border-2 border-dashed border-[#002147]/20 bg-white rounded-2xl flex flex-col items-center justify-center text-center px-6">
                      <div className="w-14 h-14 bg-[#002147]/5 rounded-xl border border-[#002147]/15 flex items-center justify-center mb-4">
                        <ImageIcon className="text-[#002147]/35 w-7 h-7" />
                      </div>
                      <p className="text-[#002147] font-bold uppercase tracking-[0.2em] text-[10px] mb-1">
                        OBE Framework Diagram - Image Holder
                      </p>
                      <p className="text-slate-400 text-xs">
                        Recommended image ratio: 16:9
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default TeachingLearning;