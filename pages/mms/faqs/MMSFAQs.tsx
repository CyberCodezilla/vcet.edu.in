import React, { useState, useEffect } from 'react';
import MMSLayout from '../../../components/mms/MMSLayout';
import { get } from '../../../services/api';
import type { MMSFaqData } from '../../../admin/types';

interface FaqItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

const defaultFaqs: FaqItem[] = [
  { id: '1', question: 'What is the course structure for the MMS program?', answer: 'The MMS program is structured into four semesters, divided into two semesters per year, as per University of Mumbai guidelines. The first year includes common subjects for all students, and the second year offers specialization options.' },
  { id: '2', question: 'Which specializations are offered?', answer: 'After the first year, VCET offers these specializations:\n• Finance\n• Marketing\n• Human Resource\n• Operations\n• Information Technology' },
  { id: '3', question: 'Why MMS at VCET?', answer: '• Well equipped with latest infrastructure\n• Flexible learning system\n• Strong industry interactions\n• 100% placement assistance\n• Certification courses as per industry standards\n• Advanced pedagogy for effective learning\n• Corporate readiness through training' },
  { id: '4', question: 'What is the current student intake for MMS?', answer: 'The intake is 120 students.\n• CAP Open Category: 108 seats\n• Institutional Quota: 12 seats\n• Direct second year (lateral entry) seats also available' },
  { id: '5', question: 'What are the timings of the course?', answer: 'Monday to Friday as per schedule (subject to flexibility). Office timing is 9:00 AM to 5:30 PM.' },
  { id: '6', question: 'How much is the program fee?', answer: 'The MMS fee during 2024-25 is INR 1,01,230 for the first year.' },
  { id: '7', question: 'Are there any scholarship facilities available?', answer: 'Yes. As per government norms, eligible students can avail scholarship/freeship benefits for categories such as SC/ST/DT/NT/SBC and minority communities, subject to CAP admission and required documents.' },
  { id: '8', question: 'What are placement opportunities available to MMS students?', answer: 'Sector-wise placement opportunities and details are available under the Placement section on the website.' },
  { id: '9', question: 'What documents are required for reserved category students?', answer: '• Caste certificate\n• Caste validity certificate\n• Non-creamy layer certificate (where applicable)' },
  { id: '10', question: 'What is the selection process for MMS programme?', answer: 'Admission is as per CET Cell process. Submit original certificates listed in MMS admission requirements and use DTE Code 319410210 for VCET.\nCET Cell: https://cetcell.mahacet.org/2024-2025/' },
  { id: '11', question: 'If I missed the last deadline, can I still apply?', answer: 'You can contact the office during working hours (9:00 AM to 5:30 PM). In case of cancellations, your application may still be reviewed as per ARA/DTE rules and merit. Contact: 7972019446 / 7558351747.' },
  { id: '12', question: 'How should I apply for Institutional and CAP vacant/cancellation seats?', answer: 'Application dates are announced via newspaper, notice board, and website. Candidates can apply in person or submit forms via courier along with application fee payment details as notified by the institute.' },
  { id: '13', question: 'How can I reach the institute?', answer: 'K.T. Marg, Vartak College Campus, Vasai Road (W), Dist. Palghar, Maharashtra 401202. It is around a 2-minute walk from Vasai Road (W) Railway Station and is also accessible from the Mumbai-Ahmedabad Western Express Highway.' },
];

export default function MMSFAQs() {
  const [openId, setOpenId] = useState<string | null>('faq-0');
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
         const response = await get<{ data: MMSFaqData }>('/pages/mms-faqs');
         let fetchedList = response.data?.mainList || [];
         
         // Always guarantee the 13 default questions are listed first
         const defaultQuestions = defaultFaqs.map(f => f.question);
         const newItems = fetchedList.filter((f: any) => !defaultQuestions.includes(f.question));
         const mergedList = [...defaultFaqs, ...newItems];

         setFaqs(mergedList.map((item: any) => ({
            id: item.id || Math.random().toString(),
            question: item.question,
            answer: item.answer,
         })));
         setOpenId(mergedList[0]?.id || null);
      } catch (err) {
         console.error('Failed to fetch FAQs data:', err);
         setFaqs(defaultFaqs);
         setOpenId(defaultFaqs[0].id);
      } finally {
         setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <MMSLayout title="Frequently Asked Questions">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-brand-blue animate-spin"></div>
            <div className="text-slate-400 font-medium tracking-widest uppercase text-sm">Loading Information Hub...</div>
          </div>
        </div>
      </MMSLayout>
    );
  }

  return (
    <MMSLayout title="Frequently Asked Questions">
      <section className="space-y-6">
        <div className="rounded-none border border-brand-navy/20 bg-gradient-to-r from-brand-navy via-brand-blue to-brand-navy px-5 py-5 text-white">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold">Master of Management Studies</p>
          <h3 className="mt-1 text-2xl font-display font-bold sm:text-3xl">Frequently Asked Questions</h3>
        </div>

        {faqs.length === 0 ? (
           <div className="bg-white p-8 text-center text-slate-500 border border-slate-200">
             No FAQs available at the moment.
           </div>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openId === faq.id;

              return (
                <article
                  key={faq.id}
                  className="overflow-hidden rounded-none border border-brand-blue/20 bg-white shadow-[0_14px_28px_-22px_rgba(11,61,145,0.65)]"
                  style={{ animation: 'faqCardReveal 420ms ease-out both', animationDelay: `${Math.min(index * 60, 1000)}ms` }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition ${
                      isOpen ? 'bg-brand-navy text-white' : 'bg-white text-brand-navy hover:bg-brand-navylight/45'
                    }`}
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-bold leading-7 sm:text-lg">
                      Q{index + 1}. {faq.question}
                    </span>
                    <span
                      className={`inline-flex flex-shrink-0 items-center rounded-none border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] transition sm:text-[11px] ${
                        isOpen
                          ? 'border-emerald-300 bg-emerald-500/20 text-emerald-100'
                          : 'border-emerald-300 bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {isOpen ? 'Answer Open' : 'Show Answer'}
                    </span>
                  </button>

                  <div
                    className="grid transition-all duration-500 ease-out"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr', opacity: isOpen ? 1 : 0.35 }}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-brand-gold/30 bg-gradient-to-br from-white to-brand-light/25 px-5 py-5 text-[20px] leading-[1.9] text-slate-800 sm:text-[22px] break-words whitespace-pre-wrap">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <style>{`
        @keyframes faqCardReveal {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </MMSLayout>
  );
}
