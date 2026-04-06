import React from 'react';
import PageLayout from '../../../components/PageLayout';
import PageBanner from '../../../components/PageBanner';
import { ArrowLeft, Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExamAbout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <PageBanner
        title="About Exam Cell"
        breadcrumbs={[
          { label: 'Academics', href: '/dean-academics' },
          { label: 'Exam Cell', href: '/exam' },
          { label: 'About' }
        ]}
      />

      <main className="container mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 bg-brand-navy text-white rounded-xl shadow-lg hover:bg-brand-gold hover:text-brand-navy transition-all duration-300 mb-10 group reveal"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-sm uppercase tracking-wider">Back</span>
          </button>

          <div className="bg-white rounded-4xl border border-slate-100 shadow-xl overflow-hidden reveal">
            <div className="p-8 md:p-12">
              <div className="mb-10">
                <h2 className="text-3xl font-display font-bold text-brand-navy mb-6 relative pb-4">
                  About Examination Cell
                  <div className="absolute bottom-0 left-0 w-16 h-1 bg-brand-gold rounded-full" />
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Examination Cell at VCET is responsible for conduction of examinations and central assessment process with result preparation being the prime responsibilities of the Exam cell on behalf of University of Mumbai. Exam Cell is responsible to display examination timetable, coordinate and conduct external examinations, process marks, publish results and conduct convocation. Further, Exam cell coordinates with the University regarding all examination matters. The College has sufficient infrastructure for conducting all examinations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-xl font-bold text-brand-blue mb-4">Continuous Evaluation</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Term Work is the continuous evaluation during the semester by the concerned subject teacher. Normally 4-5 subjects have term work in each semester. Term work marks are awarded as per university guidelines which are given in syllabus copy. Normally, it includes marks for attendance, marks for laboratory performance / journal and marks for journal assessment. During the semester, two Term-Tests are conducted and the average of the two is the internal theory marks as per the subject scheme. These tests are conducted as per academic calendar.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-blue mb-4">Semester End Examination</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    At the end of the semester, students are evaluated for theory and practical as per University of Mumbai examination scheme.
                  </p>
                </div>
              </div>

              <div className="mt-12 p-8 bg-brand-light rounded-2xl border-l-4 border-brand-blue">
                <h3 className="text-lg font-bold text-brand-navy mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-slate-700 font-semibold transition-colors duration-300">
                    <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-brand-gold" />
                    </div>
                    <span>0250-2338234 Extn-125</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-700 font-semibold group transition-colors duration-300">
                    <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-brand-gold" />
                    </div>
                    <a href="mailto:icexam_vcet@vcet.edu.in" className="hover:text-brand-blue transition-colors">icexam_vcet@vcet.edu.in</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default ExamAbout;
