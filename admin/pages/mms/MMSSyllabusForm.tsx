import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, CheckCircle, AlertTriangle, Upload, Trash2, GripVertical } from 'lucide-react';
import type { MMSSyllabusPayload } from '../../types';
import { mmsSyllabusApi } from '../../api/mmsSyllabusApi';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';
import AdminFormSection from '../../components/AdminFormSection';

const inputBase = "w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all text-slate-700";
const labelBase = "block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1";

const emptyForm: MMSSyllabusPayload = {
  firstYearPdf: { label: 'First Year Syllabus', url: null },
  secondYearPdf: { label: 'Second Year Syllabus', url: null }
};

const MMSSyllabusForm: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<MMSSyllabusPayload>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [activeSection, setActiveSection] = useState<string | null>('first-year');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await mmsSyllabusApi.get();
      if (res.data) {
        setForm({ ...emptyForm, ...res.data });
      }
    } catch (e) {
      console.warn("Could not fetch old data, assuming empty CMS state:", e);
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
      await mmsSyllabusApi.update(form);
      setSuccessMsg('Changes saved successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
     return <div className="p-10 text-center"><div className="w-8 h-8 border-4 border-slate-200 border-t-[#2563EB] rounded-full animate-spin mx-auto mb-4" />Loading...</div>;
  }

  const renderSyllabusSection = (key: 'firstYearPdf' | 'secondYearPdf', title: string) => {
    const pdfData = form[key]!;
    return (
      <div className="space-y-6">
        <div className="relative group rounded-3xl border-2 border-dashed border-slate-100 bg-slate-50/50 aspect-video md:aspect-[21/9] flex flex-col items-center justify-center hover:bg-blue-50/30 hover:border-blue-200 transition-all cursor-pointer overflow-hidden shadow-inner">
           <input type="file" accept="application/pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={e => {
              if (e.target.files?.[0]) {
                 setForm({...form, [key]: {...pdfData, url: e.target.files[0]}});
              }
           }} />
           <div className="flex flex-col items-center justify-center gap-3">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm transition-all ${pdfData.url ? 'bg-blue-500 text-white' : 'bg-white text-slate-300'}`}>
                 {pdfData.url ? <FileText className="w-6 h-6" /> : <Upload className="w-6 h-6" />}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                 {pdfData.url ? (pdfData.url instanceof File ? pdfData.url.name : 'Document Uploaded') : 'Upload Syllabus PDF'}
              </span>
           </div>
           {pdfData.url && (
              <button type="button" onClick={(e) => { e.stopPropagation(); setForm({...form, [key]: {...pdfData, url: null}}); }} className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-red-500 p-2 rounded-xl shadow-lg hover:bg-red-50 transition-all z-20 opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4"/></button>
           )}
        </div>
        <div>
           <label className={labelBase}>Document Label</label>
           <input className={inputBase} value={pdfData.label} onChange={e => setForm({...form, [key]: {...pdfData, label: e.target.value}})} placeholder="e.g. First Year Syllabus (Revised 2024)" />
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-fade-in relative pt-6">
      <PageEditorHeader
        title="MMS Syllabus"
        description="Manage syllabus curriculum documents for first and second year students."
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

      <div className="space-y-4">
        <AdminFormSection title="1. First Year Syllabus" icon="📚" isOpen={activeSection === 'first-year'} onToggle={() => setActiveSection(activeSection === 'first-year' ? null : 'first-year')}>
           {renderSyllabusSection('firstYearPdf', 'First Year')}
        </AdminFormSection>

        <AdminFormSection title="2. Second Year Syllabus" icon="🎓" isOpen={activeSection === 'second-year'} onToggle={() => setActiveSection(activeSection === 'second-year' ? null : 'second-year')}>
           {renderSyllabusSection('secondYearPdf', 'Second Year')}
        </AdminFormSection>
      </div>
    </div>
  );
};

export default MMSSyllabusForm;
