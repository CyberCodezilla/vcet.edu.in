import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, CheckCircle, AlertTriangle } from 'lucide-react';
import type { MMSFaqPayload } from '../../types';
import { mmsFaqsApi } from '../../api/mmsFaqsApi';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';
import { SortableListContext } from '../../components/SortableList';
import AdminFormSection from '../../components/AdminFormSection';

const inputBase = "w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all text-slate-700";
const labelBase = "block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1";

const MMSFaqsForm: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<MMSFaqPayload>({ mainList: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [activeAccordionSection, setActiveAccordionSection] = useState<string | null>('faqs');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await mmsFaqsApi.get();
      if (res.data) {
        setForm(res.data);
      }
    } catch (e) {
      console.warn("Could not fetch old data:", e);
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

  if (loading) {
     return <div className="p-10 text-center"><div className="w-8 h-8 border-4 border-slate-200 border-t-[#2563EB] rounded-full animate-spin mx-auto mb-4" />Loading Form...</div>;
  }

  const mainList = form.mainList || [];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-fade-in relative pt-6">
      <PageEditorHeader
        title="MMS FAQs Editor"
        description="Manage the list of Frequently Asked Questions for the MMS department."
        onSave={() => {
          void handleSave();
        }}
        isSaving={saving}
        showBackButton
        onBack={() => navigate('/admin/pages/mms')}
      />

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-xl px-5 py-4 text-sm text-red-600 font-medium flex items-center gap-3">
           <AlertTriangle className="w-5 h-5" /> {error}
        </div>
      )}
      
      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-5 py-4 text-sm text-emerald-600 font-medium flex items-center gap-3">
           <CheckCircle className="w-5 h-5" /> {successMsg}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-4">
        <AdminFormSection 
          title={`FAQ List Management (${mainList.length})`} 
          icon="❓"
          isOpen={activeAccordionSection === 'faqs'}
          onToggle={() => setActiveAccordionSection(activeAccordionSection === 'faqs' ? null : 'faqs')}
        >
          <div className="space-y-6">
            <SortableListContext
              items={mainList}
              onChange={val => setForm({ ...form, mainList: val })}
              renderItem={(faq, i, id, dragHandleProps, setNodeRef, style, isDragging, actions) => (
                <div ref={setNodeRef} style={style} className={`p-6 bg-white border border-slate-100 rounded-3xl relative shadow-sm hover:shadow-md transition-all ${isDragging ? 'shadow-xl z-50 ring-4 ring-blue-50 bg-white' : ''}`}>
                  <div className="flex items-center justify-between mb-6 border-b border-slate-50 pb-4">
                    <div className="flex gap-4 items-center">
                      <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-200 hover:text-[#2563EB] transition-colors p-1" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                        <div className="w-5 h-0.5 bg-current mb-0.5 rounded-full" />
                        <div className="w-5 h-0.5 bg-current mb-0.5 rounded-full" />
                        <div className="w-5 h-0.5 bg-current rounded-full" />
                      </div>
                      <span className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400">#{i + 1}</span>
                    </div>
                    <button type="button" onClick={() => {
                        const newList = mainList.filter((_, idx) => idx !== i);
                        setForm({ ...form, mainList: newList });
                    }} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"><Trash2 className="w-5 h-5" /></button>
                  </div>

                  <div className="space-y-6">
                    <div className="relative">
                      <label className={labelBase}>Question</label>
                      <input id={`faq-q-${i}`} name={`faq-q-${i}`} aria-label="mmsfaqsform field" 
                        className={inputBase}
                        value={faq.question}
                        placeholder="Enter question..."
                        onChange={e => {
                           const newList = [...mainList]; newList[i].question = e.target.value; setForm({...form, mainList: newList});
                        }}
                      />
                    </div>

                    <div className="relative">
                      <label className={labelBase}>Answer</label>
                      <textarea id={`faq-a-${i}`} name={`faq-a-${i}`} aria-label="mmsfaqsform field" 
                        className={inputBase + " h-32 resize-none"}
                        value={faq.answer}
                        placeholder="Enter answer..."
                        onChange={e => {
                           const newList = [...mainList]; newList[i].answer = e.target.value; setForm({...form, mainList: newList});
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            />

            <button 
              type="button" 
              onClick={() => setForm({ ...form, mainList: [...mainList, { id: `faq-${Date.now()}`, question: '', answer: '' }] })} 
              className="w-full flex flex-col items-center justify-center gap-3 border-4 border-dashed border-slate-100 rounded-4xl p-10 hover:border-blue-400 hover:bg-blue-50/30 transition-all text-slate-300 hover:text-blue-500"
            >
              <Plus className="w-8 h-8" />
              <span className="text-[10px] font-black uppercase tracking-widest">Add New FAQ Entry</span>
            </button>
          </div>
        </AdminFormSection>
      </form>
    </div>
  );
};

export default MMSFaqsForm;
