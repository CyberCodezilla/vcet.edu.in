import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, Plus, Trash2, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import type { MMSDocumentsPayload } from '../../types';
import { mmsDocumentsApi } from '../../api/mmsDocumentsApi';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';

const emptyForm: MMSDocumentsPayload = {
  overview: [],
  admissionDocs: [],
  academicDocs: [],
  personalDocs: [],
  categoryDocs: [],
  specialDocs: [],
  additionalDocs: '',
  checklistPdf: []
};

const MMSDocumentsForm: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<MMSDocumentsPayload>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [activeSection, setActiveSection] = useState<string | null>('overview');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await mmsDocumentsApi.get();
      if (res.data) {
        setForm({ ...emptyForm, ...res.data });
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
      await mmsDocumentsApi.update(form);
      setSuccessMsg('Changes saved successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const toggleSection = (id: string) => {
    setActiveSection(prev => prev === id ? null : id);
  };

  const handleTextChange = (value: string, limit: number, setter: (val: string) => void) => {
    if (value.length <= limit) setter(value);
  };

  if (loading) {
     return <div className="p-10 text-center"><div className="w-8 h-8 border-4 border-slate-200 border-t-[#2563EB] rounded-full animate-spin mx-auto mb-4" />Loading Form...</div>;
  }

  // Generic List Renderer
  const renderStringList = (
    key: keyof Pick<MMSDocumentsPayload, 'admissionDocs' | 'academicDocs' | 'personalDocs' | 'categoryDocs' | 'specialDocs'>,
    title: string,
    placeholder: string,
    maxLimit: number,
    charLimit: number
  ) => {
    const list = form[key] || [];
    return (
      <div className="space-y-3">
        {list.map((item, i) => (
          <div key={i} className="flex gap-2 items-start">
            <div className="flex-1 relative">
              <input className="admin-input-small w-full" value={item || ''} placeholder={placeholder} onChange={e => handleTextChange(e.target.value, charLimit, val => {
                const c = [...list]; c[i] = val; setForm({...form, [key]: c});
              })}/>
              <span className="absolute right-2 top-2 text-[10px] text-slate-400">{item?.length || 0}/{charLimit}</span>
            </div>
            <button type="button" onClick={() => {
               const c = [...list]; c.splice(i, 1); setForm({...form, [key]: c});
            }} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
        {(list?.length || 0) < maxLimit && (
          <button type="button" onClick={() => {
             const c = [...list]; c.push(''); setForm({...form, [key]: c});
          }} className="btn-add">
            <Plus className="w-4 h-4" /> Add Item (Max {maxLimit})
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-fade-in relative pt-6">
      <PageEditorHeader
        title="Documents Required"
        description="MMS Admissions Editor"
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

        {/* SECTION 1: OVERVIEW */}
        <SectionCard title="Document Submission Overview" icon="📋">
          <div className="space-y-4">
            {form.overview?.map((item, i) => (
              <div key={i} className="flex gap-2 items-start bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div className="flex-1 relative">
                  <label className="admin-label">Requirement (Max 100)</label>
                  <input className="admin-input-small w-full" value={item.requirement} placeholder="e.g. Original Documents" onChange={e => handleTextChange(e.target.value, 100, val => {
                    const c = [...form.overview!]; c[i].requirement = val; setForm({...form, overview: c});
                  })}/>
                </div>
                <div className="w-32 relative text-center">
                  <label className="admin-label">Copies (20)</label>
                  <input className="admin-input-small w-full text-center" value={item.copies} placeholder="e.g. 3 copies" onChange={e => handleTextChange(e.target.value, 20, val => {
                    const c = [...form.overview!]; c[i].copies = val; setForm({...form, overview: c});
                  })}/>
                </div>
                <button type="button" onClick={() => {
                   const c = [...form.overview!]; c.splice(i, 1); setForm({...form, overview: c});
                }} className="p-2 text-red-500 hover:bg-red-50 rounded-lg mt-5"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
            {(form.overview?.length || 0) < 2 && (
              <button type="button" onClick={() => setForm({...form, overview: [...(form.overview||[]), {requirement: '', copies: ''}]})} className="btn-add">
                <Plus className="w-4 h-4" /> Add Overview Requirement (Max 2)
              </button>
            )}
          </div>
        </SectionCard>

        {/* SECTIONS 2 to 6: DOCUMENT LISTS */}
        <SectionCard title="Admission Documents" icon="📝">
          {renderStringList('admissionDocs', 'Admission Document', 'e.g. Provisional Allotment Letter', 3, 100)}
        </SectionCard>

        <SectionCard title="Academic Documents" icon="🎓">
          {renderStringList('academicDocs', 'Academic Document', 'e.g. SSC Marksheet', 5, 100)}
        </SectionCard>

        <SectionCard title="Personal & Domicile Documents" icon="🏠">
          {renderStringList('personalDocs', 'Personal Document', 'e.g. Nationality Certificate', 2, 100)}
        </SectionCard>

        <SectionCard title="Category-Based Documents" icon="👥">
          {renderStringList('categoryDocs', 'Category Document', 'e.g. Caste Certificate', 4, 100)}
        </SectionCard>

        <SectionCard title="Special Case Documents" icon="⭐">
          {renderStringList('specialDocs', 'Special Document', 'e.g. Gap Certificate', 6, 100)}
        </SectionCard>

        {/* SECTION 7: ADDITIONAL REQUIREMENTS */}
        <SectionCard title="Additional Requirements" icon="📌">
          <div className="relative">
             <label className="admin-label">Requirement Detail (Max 50) <span className="text-[10px] font-normal normal-case text-slate-400">e.g. Passport Size Photographs</span></label>
             <input className="admin-input-small" value={form.additionalDocs || ''} onChange={e => handleTextChange(e.target.value, 50, val => {
               setForm({...form, additionalDocs: val});
             })}/>
          </div>
        </SectionCard>

        {/* SECTION 8: CHECKLIST PDF */}
        <SectionCard title="Documents Checklist (PDF)" icon="📄">
          <p className="text-xs text-slate-500 mb-3 font-medium">Upload exactly 1 PDF checklist.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {form.checklistPdf?.map((pdfItem, i) => (
              <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-lg relative space-y-3">
                <button type="button" onClick={() => {
                  const c = [...form.checklistPdf!]; c.splice(i, 1); setForm({...form, checklistPdf: c});
                }} className="absolute top-2 right-2 text-red-500 z-10 hover:bg-red-50 p-1 rounded"><Trash2 className="w-4 h-4"/></button>
                
                <div className="relative group rounded-lg border border-dashed border-slate-300 bg-white h-24 flex flex-col items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer">
                  <input type="file" accept="application/pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                       const c = [...form.checklistPdf!]; c[i].fileUrl = e.target.files[0]; setForm({...form, checklistPdf: c});
                    }
                  }}/>
                  <FileText className={`w-6 h-6 ${pdfItem.fileUrl ? 'text-blue-500' : 'text-slate-300 group-hover:text-blue-400'}`}/>
                  <span className="text-[10px] text-slate-500 font-medium mt-1">{pdfItem.fileUrl ? 'File Selected' : 'Upload PDF'}</span>
                </div>
                
                <div className="relative">
                  <label className="admin-label text-[10px]">PDF Label / Name</label>
                  <input className="admin-input-small text-xs" placeholder="Label / Name" value={pdfItem.label || ''} onChange={e => {
                      const c = [...form.checklistPdf!]; c[i].label = e.target.value; setForm({...form, checklistPdf: c});
                  }} />
                </div>
              </div>
            ))}
            {(form.checklistPdf?.length || 0) < 1 && (
              <button type="button" onClick={() => setForm({...form, checklistPdf: [...(form.checklistPdf||[]), {fileUrl: null as any, label: ''}]})} className="btn-add min-h-[12rem]">
                <Plus className="w-5 h-5 mx-auto mb-1" /> Add PDF (Max 1)
              </button>
            )}
          </div>
        </SectionCard>

      </form>
      <style>{`
        .admin-input-small { width: 100%; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 0.5rem; padding: 0.5rem 0.75rem; color: #0f172a; font-size: 0.75rem; font-weight: 500; outline: none; transition: 0.2s; }
        .admin-input-small:focus { border-color: #2563EB; background: #fff; box-shadow: 0 0 0 2px rgba(37,99,235, 0.1); }
        .admin-label { display: block; font-size: 0.65rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.35rem; }
        .btn-add { display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; border: 2px dashed #cbd5e1; border-radius: 0.75rem; padding: 0.75rem; font-size: 0.75rem; font-weight: bold; color: #64748b; background: white; transition: 0.2s; cursor: pointer; }
        .btn-add:hover { border-color: #2563EB; color: #2563EB; background: #eff6ff; }
      `}</style>
    </div>
  );
};

const SectionCard = ({ icon, title, children }: any) => {
  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.05)] border border-slate-100">
      <div className="flex items-center gap-3 mb-8">
         {icon && <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-lg shadow-sm border border-slate-100">{icon}</div>}
         <h2 className="text-sm font-black text-[#111827] uppercase tracking-wider">{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default MMSDocumentsForm;
