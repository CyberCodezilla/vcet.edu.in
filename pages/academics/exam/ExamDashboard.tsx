import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../../../components/PageLayout';
import PageBanner from '../../../components/PageBanner';
import { 
  Info, 
  BookOpen, 
  Calendar, 
  Files, 
  FileText, 
  BarChart, 
  UserCheck, 
  Bell,
  ArrowRight
} from 'lucide-react';

const categories = [
  {
    to: '/exam/about',
    icon: Info,
    title: 'About Exam',
    description: 'Learn about the Examination Cell, responsibilities, and operations.',
    delay: '0.1s'
  },
  {
    to: '/exam/syllabus',
    icon: BookOpen,
    title: 'University Syllabus',
    description: 'Download comprehensive course syllabi and subject structures.',
    delay: '0.1s'
  },
  {
    to: '/exam/timetable',
    icon: Calendar,
    title: 'University Exam Timetable',
    description: 'View current and upcoming semester examination schedules.',
    delay: '0.2s'
  },
  {
    to: '/exam/question-paper',
    icon: Files,
    title: 'University Question Paper',
    description: "Access previous years' university examination question papers.",
    delay: '0.2s'
  },
  {
    to: '/exam/sample-papers',
    icon: FileText,
    title: 'Sample Papers',
    description: 'Practice with sample papers and mock tests for examinations.',
    delay: '0.3s'
  },
  {
    to: '/exam/results',
    icon: BarChart,
    title: 'University Result',
    description: 'Check the latest semester graduation and internal examination results.',
    delay: '0.3s'
  },
  {
    to: '/exam/verification',
    icon: UserCheck,
    title: 'Student Verification',
    description: 'Details and status regarding student document and degree verification.',
    delay: '0.4s'
  },
  {
    to: '/exam/notices',
    icon: Bell,
    title: 'Exam Notice',
    description: 'Important announcements regarding continuous evaluation and exams.',
    delay: '0.4s'
  }
];

const ExamDashboard: React.FC = () => {
  return (
    <PageLayout>
      <PageBanner
        title="Exam Cell"
        breadcrumbs={[
          { label: 'Academics', href: '/dean-academics' },
          { label: 'Exam Cell' }
        ]}
      />

      <main className="container mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header section */}
          <div className="mb-10 reveal">
            <h2 className="text-3xl font-display font-bold text-brand-navy mb-2">Select Category</h2>
            <p className="text-slate-500">Browse through all Examination department files below.</p>
            <div className="w-16 h-1 bg-brand-gold mt-4 rounded-full" />
          </div>

          {/* Categories Grid */}
          {categories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((category, idx) => (
                <Link
                  key={idx}
                  to={category.to}
                  className="reveal group flex flex-col items-center text-center p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-brand-blue/10 transition-all duration-500"
                  style={{ transitionDelay: category.delay }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-brand-blue/5 flex items-center justify-center mb-6 group-hover:bg-brand-blue group-hover:rotate-12 transition-all duration-500">
                    <category.icon className="w-8 h-8 text-brand-blue/70 group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-navy mb-3 group-hover:text-brand-blue transition-colors duration-300">
                    {category.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    {category.description}
                  </p>
                  <div className="mt-auto flex items-center gap-2 text-brand-gold font-bold text-[10px] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </main>
    </PageLayout>
  );
};

export default ExamDashboard;
