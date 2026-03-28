import React, { useEffect } from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { Monitor, Lightbulb, Briefcase, Users, BookOpen, GraduationCap, ChevronRight, Image as ImageIcon } from 'lucide-react';

const pillarList = [
  {
    icon: Monitor,
    title: 'ICT-Enabled Classrooms',
    description: 'Smart classrooms equipped with interactive boards and high-speed internet facilitate engaging, tech-driven learning.',
  },
  {
    icon: Lightbulb,
    title: 'Project-Based Learning',
    description: 'Early-semester real-world projects fostering creativity, problem-solving, and practical application of theory.',
  },
  {
    icon: Briefcase,
    title: 'Industry Collaboration',
    description: 'Partnerships with industry leaders ensure curriculum relevance through guest lectures and internships.',
  },
  {
    icon: Users,
    title: 'Mentoring Programs',
    description: 'Robust faculty-mentoring pairs every student with dedicated guidance for academic and career growth.',
  },
  {
    icon: BookOpen,
    title: 'Outcome-Based Education',
    description: 'NBA/NAAC aligned framework ensuring measurable learning outcomes and continuous quality improvement.',
  },
  {
    icon: GraduationCap,
    title: 'Continuous Assessment',
    description: 'Regular quizzes and evaluations providing timely feedback and ensuring students stay on track.',
  },
];

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
  // Simple intersection observer logic for "reveal" effect
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
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
        breadcrumbs={[
          { label: 'Teaching Learning Process' },
        ]}
      />

      {/* Hero Section */}
      <section className="py-8 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Visual Placeholder */}
              <div className="reveal">
                <div className="aspect-[4/3] bg-slate-50 rounded-2xl border border-gray-100 flex items-center justify-center relative shadow-sm overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-amber-500/5 group-hover:opacity-0 transition-opacity"></div>
                  <div className="text-center relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600/10 to-[#C5A022]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100">
                      <Monitor className="w-10 h-10 text-blue-600/60" />
                    </div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                      Pedagogical Excellence
                    </p>
                  </div>
                </div>
              </div>

              {/* Introduction */}
              <div className="reveal" style={{ transitionDelay: '0.1s' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-0.5 bg-[#C5A022]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A022]">
                    Our Approach
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#002147] mb-6 leading-tight">
                  Innovative Teaching & Learning at VCET
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                  At VCET, we believe in creating a holistic learning environment that goes beyond
                  traditional classroom teaching. Our process integrates modern pedagogical methods
                  with cutting-edge technology to deliver an immersive educational experience.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  The institution follows an outcome-based education (OBE) framework, ensuring
                  curriculum is designed to achieve specific outcomes aligned with global standards
                  of engineering education.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-16 md:py-20 bg-[#F8FAFC] border-b border-[#E5E7EB]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="reveal mb-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A022] block mb-3">
                The Foundation
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-[#002147] mb-4">
                Key Pillars of Our Teaching-Learning Process
              </h2>
              <p className="text-slate-600 max-w-3xl">
                A multi-faceted approach to engineering education ensuring students are
                industry-ready and future-prepared.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {pillarList.map((item, idx) => (
                <article
                  key={item.title}
                  className="reveal bg-white border border-[#E1E8F2] rounded-xl p-5 shadow-[0_1px_8px_rgba(15,23,42,0.04)] relative overflow-hidden group hover:shadow-[0_4px_16px_rgba(0,33,71,0.08)] transition-shadow duration-300"
                  style={{ transitionDelay: `${idx * 0.05}s` }}
                >
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#C5A022] to-[#002147]" />
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#002147]/8 border border-[#002147]/15 flex items-center justify-center flex-shrink-0 group-hover:bg-[#002147]/12 transition-colors duration-300">
                      <item.icon className="w-5 h-5 text-[#002147]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#002147] text-lg mb-1.5">{item.title}</h3>
                      <p className="text-[15px] text-[#4B5563] leading-[1.75]">{item.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Flowchart Section */}
      <section className="py-20 md:py-28 bg-white">
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
                Curricular Planning & Implementation
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
                    <div className={`flex-1 flex flex-col border-2 ${phase.border} rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow`}>
                      {/* Phase header */}
                      <div className={`${phase.color} px-5 py-4 flex items-center justify-between`}>
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
                  Our OBE model centers on defined Graduate Attributes (POs). Inputs from stakeholders
                  drive the Vision, Mission, and Objectives, which trickle down to Course Outcomes
                  and Continuous Improvement.
                </p>

                {/* Simplified Visual Element */}
                <div className="mt-12">
                  <div className="bg-slate-50 p-12 rounded-3xl border border-slate-100 flex flex-col items-center justify-center min-h-[360px] shadow-inner text-center">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-100">
                      <ImageIcon className="text-[#002147]/30 w-8 h-8" />
                    </div>
                    <p className="text-[#002147] font-bold uppercase tracking-[0.25em] text-[10px] mb-2">
                      OBE Framework Diagram
                    </p>
                    <p className="text-slate-400 text-xs max-w-sm mx-auto">
                      A detailed visual mapping of Program Educational Objectives (PEOs) to specific course outcomes, highlighting the continuous feedback loop for academic quality.
                    </p>
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
