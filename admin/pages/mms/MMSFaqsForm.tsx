import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, CheckCircle, AlertTriangle, FileText, HelpCircle, School, Star, Users, Clock, CreditCard, Award, GraduationCap } from 'lucide-react';
import type { MMSFaqPayload } from '../../types';
import { mmsFaqsApi } from '../../api/mmsFaqsApi';

const emptyForm: MMSFaqPayload = {
  mainList: Array(10).fill({ question: 'Question Placeholder', answer: '' }).map((q, i) => ({ ...q, id: `faq-${i}` })),
  courseStructure: { duration: '', description: '' },
  specializations: [],
  keyFeatures: [],
  intakeSeats: [{ title: 'Total Intake', value: '' }],
  timings: { days: '', hours: '', notes: '' },
  feeAmount: { amount: '', yearLabel: '' },
  scholarshipPoints: [],
  admissionSteps: [],
  resourcePdfs: []
};

const MMSFaqsForm: React.FC = () => {
  const { section } = useParams<{ section: string }>();
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
      if (res.data) {
        setForm({ ...emptyForm, ...res.data });
      }
    } catch (e) {
      console.warn("Could not fetch old data, assuming empty CMS state:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
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

  if (loading) {
     return <div className="p-10 text-center"><div className="w-8 h-8 border-4 border-slate-200 border-t-[#2563EB] rounded-full animate-spin mx-auto mb-4" />Loading Form...</div>;
  }

  const renderSectionHeader = (title: string, subtitle: string, icon: React.ReactNode) => (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <Link to="/admin/pages/mms" className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg shadow-slate-200">{icon}</div>
          <div>
            <h1 className="text-3xl font-extrabold text-[#111827]">{title}</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{subtitle}</p>
          </div>
        </div>
      </div>
      <button onClick={handleSave} disabled={saving} className="px-8 py-3.5 bg-[#2563EB] text-white rounded-2xl font-black text-sm uppercase tracking-wider shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center gap-2">
        {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Save Changes'}
      </button>
    </div>
  );

  const renderTextArea = (label: string, value: string, min: number, max: number, onChange: (v: string) => void) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center px-1">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
        <span className={`text-[10px] font-black ${value.length < min || value.length > max ? 'text-red-500' : 'text-emerald-500'}`}>
          {value.length} / {max} chars (Target: {min}-{max})
        </span>
      </div>
      <textarea 
        className="w-full bg-slate-50 border border-slate-200 rounded-3xl p-6 text-sm font-medium focus:bg-white focus:ring-8 focus:ring-blue-100 focus:border-[#2563EB] transition-all h-32 resize-none shadow-inner"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Enter ${label.toLowerCase()}...`}
        maxLength={max}
      />
    </div>
  );

  const renderListEditor = (label: string, items: { text: string }[], maxItems: number, charLimit: number, onChange: (items: { text: string }[]) => void) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-slate-900 text-white p-4 rounded-3xl shadow-xl shadow-slate-200/50">
        <label className="text-xs font-black uppercase tracking-widest ml-2">{label}</label>
        <div className="text-[10px] font-black bg-white/10 px-3 py-1 rounded-full uppercase tracking-widest">
           {items.length} / {maxItems} items
        </div>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-3 group animate-fade-in relative">
             <div className="flex-1">
                <input 
                  className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 focus:ring-8 focus:ring-blue-100 focus:border-[#2563EB] transition-all shadow-sm"
                  value={item.text}
                  maxLength={charLimit}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[i].text = e.target.value;
                    onChange(newItems);
                  }}
                  placeholder={`Item ${i + 1}...`}
                />
                <span className="absolute right-16 top-1/2 -translate-y-1/2 text-[9px] font-black text-slate-300 group-focus-within:text-blue-400">
                  {item.text.length} / {charLimit}
                </span>
             </div>
             <button type="button" onClick={() => onChange(items.filter((_, idx) => idx !== i))} className="w-12 h-12 mt-1 bg-red-50 text-red-500 border border-red-100 rounded-2xl hover:bg-red-500 hover:text-white transition-all flex items-center justify-center shadow-sm">
               <Trash2 className="w-5 h-5" />
             </button>
          </div>
        ))}
        {items.length < maxItems && (
          <button type="button" onClick={() => onChange([...items, { text: '' }])} className="w-full py-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] flex items-center justify-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:border-blue-300 hover:text-blue-500 hover:bg-white transition-all">
            <Plus className="w-4 h-4" /> Add New Point
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-fade-in relative pt-6 text-slate-800">
      {/* 1. FAQ LIST SECTION */}
      {section === 'main-list' && (
        <>
          {renderSectionHeader('FAQ List', 'CORE PROGRAM Q&A (Answers Only)', <HelpCircle className="w-6 h-6"/>)}
          <div className="space-y-4">
             {form.mainList?.map((faq, i) => (
               <div key={i} className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl space-y-4 group transition-all hover:shadow-slate-200/50">
                  <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                     <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400">Q{i+1}</span>
                     <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">{faq.question}</h3>
                  </div>
                  {renderTextArea('The Answer', faq.answer, 250, 400, (v) => {
                     const newList = [...form.mainList!];
                     newList[i].answer = v;
                     setForm({ ...form, mainList: newList });
                  })}
               </div>
             ))}
          </div>
        </>
      )}

      {/* 2. COURSE STRUCTURE SECTION */}
      {section === 'course-structure' && (
        <>
          {renderSectionHeader('Course Structure', 'PROGRAM DURATION & COMPOSITION', <School className="w-6 h-6"/>)}
          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-xl space-y-10">
             <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Academic Duration</label>
                <input className="w-full bg-slate-50 border border-slate-200 rounded-[2rem] px-8 py-5 text-lg font-black text-[#2563EB] outline-none focus:bg-white focus:ring-8 focus:ring-blue-100 shadow-inner" value={form.courseStructure!.duration} onChange={e => setForm({...form, courseStructure: {...form.courseStructure!, duration: e.target.value}})} placeholder="e.g. 2 Years / 4 Semesters"/>
             </div>
             {renderTextArea('Structure Description', form.courseStructure!.description, 150, 250, (v) => setForm({...form, courseStructure: {...form.courseStructure!, description: v}}))}
          </div>
        </>
      )}

      {/* 3. SPECIALIZATIONS SECTION */}
      {section === 'specializations' && (
        <>
          {renderSectionHeader('Specializations', 'CURRICULUM STREAMS', <Star className="w-6 h-6"/>)}
          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-xl">
             {renderListEditor('Specialization Names', form.specializations || [], 6, 50, (l) => setForm({...form, specializations: l}))}
          </div>
        </>
      )}

      {/* 4. KEY FEATURES SECTION */}
      {section === 'key-features' && (
        <>
          {renderSectionHeader('Key Features (USP)', 'WHY CHOOSE VCET MMS?', <GraduationCap className="w-6 h-6"/>)}
          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-xl">
             {renderListEditor('Highlight Points', form.keyFeatures || [], 6, 80, (l) => setForm({...form, keyFeatures: l}))}
          </div>
        </>
      )}

      {/* 5. INTAKE SECTION */}
      {section === 'intake-seats' && (
        <>
          {renderSectionHeader('Intake & Seats', 'ENROLLMENT NUMBERS', <Users className="w-6 h-6"/>)}
          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-xl space-y-8">
             <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 shadow-inner">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                   {form.intakeSeats?.map((s, i) => (
                      <div key={i} className="bg-white p-6 rounded-[1.5rem] border border-slate-200 shadow-sm relative group">
                         <button type="button" onClick={() => setForm({...form, intakeSeats: form.intakeSeats!.filter((_,idx) => idx !== i)})} className="absolute -top-2 -right-2 w-7 h-7 bg-red-50 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-red-100 shadow-md"><Trash2 className="w-3.5"/></button>
                         <input className="w-full text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 outline-none border-b border-transparent focus:border-blue-200" value={s.title} onChange={e => { const n = [...form.intakeSeats!]; n[i].title = e.target.value; setForm({...form, intakeSeats: n}); }} placeholder="Category..."/>
                         <input className="w-full text-2xl font-black text-slate-800 outline-none" value={s.value} onChange={e => { const n = [...form.intakeSeats!]; n[i].value = e.target.value; setForm({...form, intakeSeats: n}); }} placeholder="Value..."/>
                      </div>
                   ))}
                   {(form.intakeSeats?.length || 0) < 3 && (
                      <button type="button" onClick={() => setForm({...form, intakeSeats: [...form.intakeSeats!, {title:'', value:''}]})} className="min-h-[8rem] border-4 border-dashed border-slate-200 rounded-[1.5rem] text-slate-300 flex flex-col items-center justify-center gap-2 hover:border-blue-200 hover:text-blue-500 transition-all font-black text-[10px] uppercase tracking-widest">
                         <Plus className="w-6 h-6"/> Add Category
                      </button>
                   )}
                </div>
             </div>
          </div>
        </>
      )}

      {/* 6. TIMINGS SECTION */}
      {section === 'timings' && (
        <>
          {renderSectionHeader('Course Timings', 'SCHEDULE & WORKING DAYS', <Clock className="w-6 h-6"/>)}
          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-xl space-y-10">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Working Days</label>
                   <input className="w-full bg-slate-50 border border-slate-200 rounded-[2rem] px-8 py-5 text-lg font-black text-slate-800 outline-none focus:bg-white focus:ring-8 focus:ring-blue-100 shadow-inner" value={form.timings?.days} onChange={e => setForm({...form, timings: {...form.timings!, days: e.target.value}})} placeholder="e.g. Monday - Friday"/>
                </div>
                <div className="space-y-4">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Time Schedule</label>
                   <input className="w-full bg-slate-50 border border-slate-200 rounded-[2rem] px-8 py-5 text-lg font-black text-slate-800 outline-none focus:bg-white focus:ring-8 focus:ring-blue-100 shadow-inner" value={form.timings?.hours} onChange={e => setForm({...form, timings: {...form.timings!, hours: e.target.value}})} placeholder="e.g. 9:00 AM - 5:00 PM"/>
                </div>
             </div>
             {renderTextArea('Additional Notes', form.timings?.notes || '', 80, 150, (v) => setForm({...form, timings: {...form.timings!, notes: v}}))}
          </div>
        </>
      )}

      {/* 7. FEES SECTION */}
      {section === 'fees' && (
        <>
          {renderSectionHeader('Fee Structure Info', 'TUITION & ACADEMIC FEES', <CreditCard className="w-6 h-6"/>)}
          <div className="bg-white rounded-[2.5rem] p-12 border border-slate-200 shadow-xl space-y-10 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600 rounded-bl-[4rem] text-white flex items-center justify-center p-6"><CreditCard className="w-8 h-8 opacity-50"/></div>
             <div className="space-y-6 max-w-xl mx-auto">
                <div className="space-y-4">
                   <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Annual Fee Amount</label>
                   <input className="w-full bg-white border-b-4 border-slate-100 text-5xl font-black text-slate-900 text-center outline-none focus:border-blue-500 transition-all py-4" value={form.feeAmount?.amount} onChange={e => setForm({...form, feeAmount: {...form.feeAmount!, amount: e.target.value}})} placeholder="₹ 0,00,000"/>
                </div>
                <div className="space-y-4">
                   <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Academic Year Reference</label>
                   <input className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold text-slate-500 text-center outline-none" value={form.feeAmount?.yearLabel} onChange={e => setForm({...form, feeAmount: {...form.feeAmount!, yearLabel: e.target.value}})} placeholder="e.g. For academic year 2024-25"/>
                </div>
             </div>
          </div>
        </>
      )}

      {/* 8. SCHOLARSHIP SECTION */}
      {section === 'scholarship' && (
        <>
          {renderSectionHeader('Scholarship Details', 'ELIGIBILITY & CRITERIA', <Award className="w-6 h-6"/>)}
          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-xl">
             {renderListEditor('Scholarship Point Policy', form.scholarshipPoints || [], 4, 250, (l) => setForm({...form, scholarshipPoints: l}))}
          </div>
        </>
      )}

      {/* 9. ADMISSION SECTION */}
      {section === 'admission' && (
        <>
          {renderSectionHeader('Admission Steps', 'SELECTION PROCESS WORKFLOW', <GraduationCap className="w-6 h-6"/>)}
          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-xl">
             {renderListEditor('Process Step Breakdown', form.admissionSteps || [], 4, 250, (l) => setForm({...form, admissionSteps: l}))}
          </div>
        </>
      )}

      {/* 10. PDF RESOURCES SECTION */}
      {section === 'pdfs' && (
        <>
          {renderSectionHeader('PDF Resources', 'GENERAL DOCUMENTS & GUIDES', <FileText className="w-6 h-6"/>)}
          <div className="bg-white rounded-[2.5rem] p-12 border border-slate-200 shadow-xl space-y-4">
             {form.resourcePdfs?.map((pdf, i) => (
               <div key={i} className="flex gap-4 items-center bg-slate-50 border border-slate-200 p-8 rounded-[2rem] transition-all hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50">
                 <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm"><FileText className="w-8 h-8 text-slate-400" /></div>
                 <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">Document Title</label>
                       <input className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700" placeholder="Title..." value={pdf.title} maxLength={80} onChange={e => { const n = [...form.resourcePdfs!]; n[i].title = e.target.value; setForm({...form, resourcePdfs: n}); }}/>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">Document URL / Path</label>
                       <input className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-blue-500" placeholder="URL..." value={pdf.url} onChange={e => { const n = [...form.resourcePdfs!]; n[i].url = e.target.value; setForm({...form, resourcePdfs: n}); }}/>
                    </div>
                 </div>
                 <button type="button" onClick={() => setForm({...form, resourcePdfs: form.resourcePdfs!.filter((_,idx) => idx !== i)})} className="w-12 h-12 bg-red-50 text-red-500 border border-red-100 rounded-2xl hover:bg-red-500 hover:text-white transition-all flex items-center justify-center shadow-sm mt-6"><Trash2 className="w-5 h-5"/></button>
               </div>
             ))}
             {(form.resourcePdfs?.length || 0) < 2 && (
               <button type="button" onClick={() => setForm({...form, resourcePdfs: [...(form.resourcePdfs || []), { title: '', url: '' }]})} className="w-full py-8 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 text-slate-300 hover:border-blue-400 hover:text-blue-500 hover:bg-white transition-all font-black uppercase text-[10px] tracking-widest">
                  <Plus className="w-8 h-8 opacity-30"/><br/>Add General Information PDF
               </button>
             )}
          </div>
        </>
      )}

      {/* MESSAGES (FOOTER ONES) */}
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
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
        .animate-shake { animation: shake 0.3s ease-in-out infinite; animation-iteration-count: 2; }
      `}</style>
    </div>
  );
};

export default MMSFaqsForm;
