import React from 'react';
import PageLayout from '../../../components/PageLayout';
import PageBanner from '../../../components/PageBanner';
import { ArrowLeft, ArrowRight, ShieldCheck, Mail, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExamVerification: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <PageBanner
        title="Student Verification"
        breadcrumbs={[
          { label: 'Academics', href: '/dean-academics' },
          { label: 'Exam Cell', href: '/exam' },
          { label: 'Verification' }
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

          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden reveal">
            <div className="p-8 md:p-12">
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-brand-gold" />
                  </div>
                  <h2 className="text-3xl font-display font-bold text-brand-navy relative pb-2 uppercase tracking-wide">
                    Educational Verification
                    <div className="absolute bottom-0 left-0 w-16 h-1 bg-brand-gold rounded-full" />
                  </h2>
                </div>
                <p className="text-slate-600 leading-relaxed text-lg mb-8">
                  In order to get students Educational verification from VCET, the desirous agencies are required to submit a letter addressed to Exam In charge, VCET along with following documents.
                </p>

                <h3 className="text-xl font-bold text-brand-blue mb-6 flex items-center gap-2">
                  <ArrowRight className="w-5 h-5 text-brand-gold" />
                  Procedure for Student Educational Verification:
                </h3>
                <div className="space-y-4 mb-10">
                  {[
                    'Final year mark list copy issued by University of Mumbai',
                    'LOA signed by the candidate.',
                    'DD of Rs. (As stated below) in favor of "Vidyavaridhi’s College of Engineering and Technology" payable at Mumbai.'
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-brand-light rounded-xl border border-brand-blue/5">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-sm">
                        {i + 1}
                      </span>
                      <p className="text-slate-700 font-medium">{step}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-900 rounded-3xl p-8 mb-12 text-white/90 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-brand-gold/20 transition-colors duration-500" />
                  <h4 className="text-brand-gold font-bold text-xl mb-6 flex items-center gap-2">
                    <Info className="w-5 h-5 text-brand-gold" />
                    Bank NEFT / RTGS details:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                    <div>
                      <p className="text-white/40 text-xs uppercase font-bold tracking-widest mb-1">Account Name</p>
                      <p className="font-semibold text-sm">Vidyavardhini’s College of Engineering & Technology</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-xs uppercase font-bold tracking-widest mb-1">Bank Name</p>
                      <p className="font-semibold text-sm">Union Bank of India</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-xs uppercase font-bold tracking-widest mb-1">Bank Branch</p>
                      <p className="font-semibold text-sm">Vidyavardhini College Rd.</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-xs uppercase font-bold tracking-widest mb-1">Account No.</p>
                      <p className="font-mono text-brand-gold font-bold text-lg">320602011001031</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-xs uppercase font-bold tracking-widest mb-1">IFSC Code</p>
                      <p className="font-mono font-bold">UBIN0562556</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-xs uppercase font-bold tracking-widest mb-1">MICR Code</p>
                      <p className="font-mono font-bold">400026153</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-brand-blue mb-6">Rates for Student Educational Verification:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                  {[
                    { label: 'Up to 3 years', price: '1000' },
                    { label: '4 years to 10 years', price: '1500' },
                    { label: '11 years to 20 years', price: '2000' },
                    { label: 'More than 20 years', price: '2500' }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-brand-gold/20 transition-all duration-300">
                      <span className="text-slate-600 font-semibold">{item.label}</span>
                      <span className="text-brand-navy font-bold text-lg">₹ {item.price}/-</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-slate-700 font-semibold bg-brand-gold/5 p-6 rounded-2xl border border-brand-gold/10 text-sm italic">
                  <Info className="w-5 h-5 text-brand-gold flex-shrink-0" />
                  <p>In case of any query mail to: <a href="mailto:icexam_vcet@vcet.edu.in" className="text-brand-blue font-bold not-italic hover:underline ml-1">icexam_vcet@vcet.edu.in</a></p>
                </div>

                <div className="mt-8 p-6 bg-red-50 rounded-2xl border border-red-100">
                  <p className="text-red-600 font-bold mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                    Important Note:
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    No oral/ verbal confirmation about the educational verification will be provided. Verification process get completed within two/three working days after receiving all the documents.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default ExamVerification;
