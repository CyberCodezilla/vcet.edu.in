import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FileText, CheckCircle, AlertTriangle, Upload, Eye, Trash2 } from 'lucide-react';
import type { MMSSyllabusPayload } from '../../types';
import { mmsSyllabusApi } from '../../api/mmsSyllabusApi';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';

const emptyForm: MMSSyllabusPayload = {
  firstYearPdf: { label: 'First Year Syllabus', url: null },
  secondYearPdf: { label: 'Second Year Syllabus', url: null }
};

const MMSSyllabusForm: React.FC = () => {
  const navigate = useNavigate();
  const { section } = useParams<{ section: string }>();
  const [form, setForm] = useState<MMSSyllabusPayload>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

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
     return <div className="p-10 text-center"><div className="w-8 h-8 border-4 border-slate-200 border-t-[#2563EB] rounded-full animate-spin mx-auto mb-4" />Loading Form...</div>;
  }

  const isFirstYear = section === 'first-year';
  const config = isFirstYear 
    ? { title: 'First Year Syllabus', key: 'firstYearPdf' as const } 
    : { title: 'Second Year Syllabus', key: 'secondYearPdf' as const };

  const pdfData = form[config.key]!;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 animate-fade-in relative pt-6">
      <PageEditorHeader
        title={config.title}
        description="Syllabus Document Editor"
        onSave={() => {
          void handleSave();
        }}
        isSaving={saving}
        showBackButton
        onBack={() => navigate('/admin/pages/mms')}
      />

      {/* MESSAGES */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex items-center gap-3 text-red-700 font-medium animate-shake">
          <AlertTriangle className="w-5 h-5" /> {error}
        </div>
      )}
      {successMsg && (
        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-xl flex items-center gap-3 text-emerald-700 font-medium animate-slide-up">
          <CheckCircle className="w-5 h-5" /> {successMsg}
        </div>
      )}

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden shadow-slate-200/50">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-xl font-bold text-slate-800">Syllabus PDF</h3>
          <p className="text-sm text-slate-500 font-medium mt-1">Upload the curriculum document for {isFirstYear ? 'Semester I & II' : 'Semester III & IV'}.</p>
        </div>

        <div className="p-10">
          <div className="max-w-2xl mx-auto space-y-8 text-center">
             <div className="relative group">
                <input 
                  type="file" 
                  accept="application/pdf" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setForm({ ...form, [config.key]: { ...pdfData, url: file } });
                    }
                  }}
                />
                <div className={`aspect-[16/6] rounded-[2rem] border-4 border-dashed transition-all flex flex-col items-center justify-center gap-4 ${pdfData.url ? 'border-emerald-100 bg-emerald-50/30' : 'border-slate-100 bg-slate-50/30 group-hover:border-blue-200 group-hover:bg-blue-50/30'}`}>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${pdfData.url ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-white text-slate-400 shadow-slate-100 group-hover:text-blue-500 group-hover:shadow-blue-100'}`}>
                    {pdfData.url ? <CheckCircle className="w-8 h-8" /> : <Upload className="w-8 h-8" />}
                  </div>
                  <div>
                    <h4 className={`text-lg font-bold ${pdfData.url ? 'text-emerald-700' : 'text-slate-600'}`}>
                      {pdfData.url ? (pdfData.url instanceof File ? pdfData.url.name : 'Current Syllabus PDF') : 'Click to Upload PDF'}
                    </h4>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">PDF documents only • Max 10MB</p>
                  </div>
                </div>
             </div>

             <div className="space-y-4">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Document Label</label>
                </div>
                <input 
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 outline-none focus:bg-white focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 transition-all shadow-inner"
                  value={pdfData.label}
                  onChange={(e) => setForm({ ...form, [config.key]: { ...pdfData, label: e.target.value } })}
                  placeholder="e.g. First Year Syllabus (Revised 2024)"
                />
             </div>

             <div className="flex gap-4 justify-center mt-4">
               {pdfData.url && !(pdfData.url instanceof File) && (
                  <a href={pdfData.url as string} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700 transition-all shadow-lg shadow-slate-200">
                    <Eye className="w-4 h-4" /> View Current Document
                  </a>
               )}
               {pdfData.url && (
                  <button 
                    type="button"
                    onClick={() => setForm({ ...form, [config.key]: { ...pdfData, url: null } })}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-100 transition-all shadow-sm"
                  >
                    <Trash2 className="w-4 h-4" /> Remove Document
                  </button>
               )}
             </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
        .animate-shake { animation: shake 0.3s ease-in-out infinite; animation-iteration-count: 2; }
      `}</style>
    </div>
  );
};

export default MMSSyllabusForm;
