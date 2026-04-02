import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, CheckCircle, HelpCircle } from 'lucide-react';
import type { MMSFaqPayload } from '../../types';
import { mmsFaqsApi } from '../../api/mmsFaqsApi';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';

const defaultFaqsRaw = [
  { id: 'faq-1', question: 'What is the course structure for the MMS program?', answer: 'The MMS program is structured into four semesters, divided into two semesters per year, as per University of Mumbai guidelines. The first year includes common subjects for all students, and the second year offers specialization options.' },
  { id: 'faq-2', question: 'Which specializations are offered?', answer: 'After the first year, VCET offers these specializations:\n• Finance\n• Marketing\n• Human Resource\n• Operations\n• Information Technology' },
  { id: 'faq-3', question: 'Why MMS at VCET?', answer: '• Well equipped with latest infrastructure\n• Flexible learning system\n• Strong industry interactions\n• 100% placement assistance\n• Certification courses as per industry standards\n• Advanced pedagogy for effective learning\n• Corporate readiness through training' },
  { id: 'faq-4', question: 'What is the current student intake for MMS?', answer: 'The intake is 120 students.\n• CAP Open Category: 108 seats\n• Institutional Quota: 12 seats\n• Direct second year (lateral entry) seats also available' },
  { id: 'faq-5', question: 'What are the timings of the course?', answer: 'Monday to Friday as per schedule (subject to flexibility). Office timing is 9:00 AM to 5:30 PM.' },
  { id: 'faq-6', question: 'How much is the program fee?', answer: 'The MMS fee during 2024-25 is INR 1,01,230 for the first year.' },
  { id: 'faq-7', question: 'Are there any scholarship facilities available?', answer: 'Yes. As per government norms, eligible students can avail scholarship/freeship benefits for categories such as SC/ST/DT/NT/SBC and minority communities, subject to CAP admission and required documents.' },
  { id: 'faq-8', question: 'What are placement opportunities available to MMS students?', answer: 'Sector-wise placement opportunities and details are available under the Placement section on the website.' },
  { id: 'faq-9', question: 'What documents are required for reserved category students?', answer: '• Caste certificate\n• Caste validity certificate\n• Non-creamy layer certificate (where applicable)' },
  { id: 'faq-10', question: 'What is the selection process for MMS programme?', answer: 'Admission is as per CET Cell process. Submit original certificates listed in MMS admission requirements and use DTE Code 319410210 for VCET.\nCET Cell: https://cetcell.mahacet.org/2024-2025/' },
  { id: 'faq-11', question: 'If I missed the last deadline, can I still apply?', answer: 'You can contact the office during working hours (9:00 AM to 5:30 PM). In case of cancellations, your application may still be reviewed as per ARA/DTE rules and merit. Contact: 7972019446 / 7558351747.' },
  { id: 'faq-12', question: 'How should I apply for Institutional and CAP vacant/cancellation seats?', answer: 'Application dates are announced via newspaper, notice board, and website. Candidates can apply in person or submit forms via courier along with application fee payment details as notified by the institute.' },
  { id: 'faq-13', question: 'How can I reach the institute?', answer: 'K.T. Marg, Vartak College Campus, Vasai Road (W), Dist. Palghar, Maharashtra 401202. It is around a 2-minute walk from Vasai Road (W) Railway Station and is also accessible from the Mumbai-Ahmedabad Western Express Highway.' },
];

const emptyForm: MMSFaqPayload = {
  mainList: defaultFaqsRaw,
};

const MMSFaqsForm: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<MMSFaqPayload>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await mmsFaqsApi.get();
      let fetchedList = res.data?.mainList || [];

      // Merge defaults with any new ones we added previously
      const defaultQuestions = defaultFaqsRaw.map(f => f.question);
      const newItems = fetchedList.filter((f: any) => !defaultQuestions.includes(f.question));
      const mergedList = [...defaultFaqsRaw, ...newItems];

      if (res.data) {
        setForm({ ...emptyForm, ...res.data, mainList: mergedList });
      } else {
        setForm({ ...emptyForm, mainList: mergedList });
      }
    } catch (e) {
      console.warn("Could not fetch old data, assuming empty CMS state:", e);
      setForm(emptyForm);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setSaving(true);
    setError('');
    setSuccessMsg('');

    try {
      await mmsFaqsApi.update(form);
      setSuccessMsg('Changes saved successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const mainList = form.mainList || [];

  const updateQuestion = (index: number, question: string) => {
    const newList = [...mainList];
    newList[index].question = question;
    setForm({ ...form, mainList: newList });
  };

  const updateAnswer = (index: number, answer: string) => {
    const newList = [...mainList];
    newList[index].answer = answer;
    setForm({ ...form, mainList: newList });
  };

  const addFaq = () => {
    const newList = [
      ...mainList,
      { id: `faq-${Date.now()}`, question: '', answer: '' },
    ];
    setForm({ ...form, mainList: newList });
  };

  const removeFaq = (index: number) => {
    const newList = mainList.filter((_, i) => i !== index);
    setForm({ ...form, mainList: newList });
  };

  if (loading) {
     return <div className="p-10 text-center"><div className="w-8 h-8 border-4 border-slate-200 border-t-[#2563EB] rounded-full animate-spin mx-auto mb-4" />Loading Form...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-fade-in relative pt-6 text-slate-800">
      <PageEditorHeader
        title="Manage FAQs"
        description="Questions & Answers"
        onSave={() => {
          void handleSave();
        }}
        isSaving={saving}
        showBackButton
        onBack={() => navigate('/admin/pages/mms')}
        className="mb-8"
      />

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-xl border border-red-200">
          {error}
        </div>
      )}

      <div className="space-y-6">
         {mainList.map((faq, i) => (
           <div key={faq.id || i} className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl space-y-4 group transition-all hover:shadow-slate-200/50 relative">
              <button 
                type="button" 
                onClick={() => removeFaq(i)}
                className="absolute top-6 right-6 w-10 h-10 bg-red-50 text-red-500 border border-red-100 rounded-xl hover:bg-red-500 hover:text-white transition-all flex items-center justify-center shadow-sm"
              >
                <Trash2 className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                 <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400">Q{i+1}</span>
                 <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">FAQ Entry</h3>
              </div>

              <div className="space-y-6">
                {/* Question Input */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Question</label>
                  <input 
                    className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-sm font-bold text-slate-800 focus:bg-white focus:ring-8 focus:ring-blue-100 focus:border-[#2563EB] transition-all shadow-sm"
                    value={faq.question}
                    onChange={(e) => updateQuestion(i, e.target.value)}
                    placeholder="Enter the question here..."
                  />
                </div>

                {/* Answer Textarea */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Answer</label>
                  <textarea 
                    className="w-full bg-slate-50 border border-slate-200 rounded-3xl p-6 text-sm font-medium focus:bg-white focus:ring-8 focus:ring-blue-100 focus:border-[#2563EB] transition-all min-h-[120px] resize-y shadow-inner"
                    value={faq.answer}
                    onChange={(e) => updateAnswer(i, e.target.value)}
                    placeholder="Enter the detailed answer..."
                  />
                </div>
              </div>
           </div>
         ))}

         <button 
           type="button" 
           onClick={addFaq} 
           className="w-full py-6 bg-slate-50 border-2 border-dashed border-slate-300 rounded-[2.5rem] flex items-center justify-center gap-2 text-slate-500 font-black text-xs uppercase tracking-widest hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer"
         >
           <Plus className="w-5 h-5" /> Add New FAQ
         </button>
      </div>

      {successMsg && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
           <div className="bg-slate-900 text-white px-8 py-5 rounded-[2rem] shadow-2xl flex items-center gap-4 font-black text-xs uppercase tracking-widest border border-slate-700/50 backdrop-blur-md">
             <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30"><CheckCircle className="w-5 h-5" /></div>
             {successMsg}
           </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
        @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
      `}</style>
    </div>
  );
};

export default MMSFaqsForm;
