import React from 'react';
import PageLayout from '../../components/PageLayout';
import PageBanner from '../../components/PageBanner';
import { FileText, Calendar, Download, ClipboardCheck, Clock, Award, BookOpen, Users } from 'lucide-react';

const examCellFunctions = [
  {
    icon: Calendar,
    title: 'Exam Scheduling',
    description: 'Planning and scheduling internal and external examinations throughout the academic year.',
  },
  {
    icon: ClipboardCheck,
    title: 'Question Paper Management',
    description: 'Coordinating question paper setting, moderation, and secure distribution for all examinations.',
  },
  {
    icon: FileText,
    title: 'Results Processing',
    description: 'Timely processing and declaration of examination results with accuracy and transparency.',
  },
  {
    icon: Users,
    title: 'Student Grievances',
    description: 'Handling exam-related grievances including revaluation requests and mark verification.',
  },
  {
    icon: BookOpen,
    title: 'University Coordination',
    description: 'Liaising with the University of Mumbai for exam-related matters, hall tickets, and mark sheets.',
  },
  {
    icon: Award,
    title: 'ATKT Management',
    description: 'Managing ATKT examinations, schedules, and results for students with backlogs.',
  },
];

const downloads = [
  { title: 'Exam Schedule - Current Semester', type: 'PDF' },
  { title: 'Exam Seating Arrangement', type: 'PDF' },
  { title: 'Hall Ticket Information', type: 'PDF' },
  { title: 'Revaluation Application Form', type: 'PDF' },
  { title: 'Photocopy Application Form', type: 'PDF' },
  { title: 'Grade Card / Marksheet Request', type: 'PDF' },
  { title: 'Exam Guidelines & Rules', type: 'PDF' },
  { title: 'Previous Year Question Papers', type: 'ZIP' },
];

const importantLinks = [
  'University of Mumbai - Online Results Portal',
  'ATKT Exam Registration',
  'Online Exam Form Submission',
  'Previous Semester Results',
  'Academic Calendar with Exam Dates',
];

const ExamCell: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Exam Cell"
        breadcrumbs={[
          { label: 'Exam Cell' },
        ]}
      />

      {/* Overview */}
      <section className="py-8 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="reveal">
                <div className="bg-brand-light rounded-2xl aspect-[4/3] flex items-center justify-center border border-brand-blue/10">
                  <span className="text-sm font-semibold text-brand-blue/40 tracking-wide">
                    exam-cell.jpg
                  </span>
                </div>
              </div>

              <div className="reveal" style={{ transitionDelay: '0.1s' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-0.5 bg-brand-gold" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                    Examinations
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-navy mb-6">
                  Examination Cell
                </h2>
                <p className="text-slate-500 leading-relaxed mb-4">
                  The Examination Cell at VCET is responsible for the smooth conduct of all internal
                  and external examinations. The cell ensures that examinations are conducted with
                  integrity, fairness, and adherence to the guidelines set by the University of Mumbai.
                </p>
                <p className="text-slate-500 leading-relaxed">
                  From scheduling and hall ticket distribution to result processing and grievance
                  handling, the Exam Cell provides comprehensive support to students and faculty
                  throughout the examination cycle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Functions */}
      <section className="py-8 md:py-16 lg:py-24 bg-brand-light">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-14 reveal">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">Functions</span>
                <div className="w-8 h-0.5 bg-brand-gold" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-navy">
                Exam Cell Functions
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {examCellFunctions.map((item, idx) => (
                <div
                  key={idx}
                  className="reveal group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-500"
                  style={{ transitionDelay: `${Math.min(idx * 0.05, 0.4)}s` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/5 flex items-center justify-center mb-4 group-hover:bg-brand-gold/10 transition-colors duration-300">
                    <item.icon className="w-5 h-5 text-brand-blue/60 group-hover:text-brand-gold transition-colors duration-300" />
                  </div>
                  <h3 className="text-sm font-semibold text-brand-navy mb-2 font-display">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section className="py-8 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-14 reveal">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">Downloads</span>
                <div className="w-8 h-0.5 bg-brand-gold" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-navy">
                Exam-Related Downloads
              </h2>
            </div>

            <div className="space-y-3">
              {downloads.map((doc, idx) => (
                <div
                  key={idx}
                  className="reveal flex items-center justify-between bg-brand-light rounded-xl p-4 hover:shadow-md transition-all duration-300 group cursor-pointer"
                  style={{ transitionDelay: `${Math.min(idx * 0.04, 0.4)}s` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-blue/5 flex items-center justify-center group-hover:bg-brand-gold/10 transition-colors duration-300">
                      <FileText className="w-4 h-4 text-brand-blue/60 group-hover:text-brand-gold transition-colors duration-300" />
                    </div>
                    <div>
                      <span className="text-sm text-slate-600 font-medium">{doc.title}</span>
                      <span className="text-[10px] text-slate-400 uppercase ml-2 font-bold">{doc.type}</span>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-slate-300 group-hover:text-brand-gold transition-colors duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Important Links */}
      <section className="py-8 md:py-16 lg:py-24 bg-brand-light">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-14 reveal">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">Quick Links</span>
                <div className="w-8 h-0.5 bg-brand-gold" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-navy">
                Results & Important Links
              </h2>
            </div>

            <div className="space-y-3">
              {importantLinks.map((link, idx) => (
                <div
                  key={idx}
                  className="reveal flex items-center gap-4 bg-white rounded-xl p-4 hover:shadow-md transition-all duration-300 group cursor-pointer"
                  style={{ transitionDelay: `${Math.min(idx * 0.05, 0.4)}s` }}
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-brand-gold" />
                  </div>
                  <p className="text-sm text-slate-600 font-medium group-hover:text-brand-blue transition-colors duration-300">{link}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ExamCell;
