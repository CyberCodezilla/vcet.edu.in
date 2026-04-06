import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import type { MMSDocumentsPayload } from '../../types';
import { mmsDocumentsApi } from '../../api/mmsDocumentsApi';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';
import { SortableListContext } from '../../components/SortableList';
import AdminFormSection from '../../components/AdminFormSection';

const inputBase = "w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all text-slate-700";
const labelBase = "block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1";

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

  const handleTextChange = (value: string, limit: number, setter: (val: string) => void) => {
    if (value.length <= limit) setter(value);
  };

  if (loading) {
     return <div className="p-10 text-center"><div className="w-8 h-8 border-4 border-slate-200 border-t-[#2563EB] rounded-full animate-spin mx-auto mb-4" />Loading Form...</div>;
  }

  const renderStringList = (
    key: keyof Pick<MMSDocumentsPayload, 'admissionDocs' | 'academicDocs' | 'personalDocs' | 'categoryDocs' | 'specialDocs'>,
    title: string,
    placeholder: string,
    maxLimit: number,
    charLimit: number
  ) => {
    const list = form[key] || [];
    return (
      <div className="space-y-4">
        <SortableListContext
          items={list}
          onChange={val => setForm({ ...form, [key]: val })}
          renderItem={(item, i, id, dragHandleProps, setNodeRef, style, isDragging, actions) => (
            <div ref={setNodeRef} style={style} className={`flex gap-3 items-center p-3 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all ${isDragging ? 'shadow-xl z-50 ring-4 ring-blue-50 bg-white' : ''}`}>
              <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-200 hover:text-[#2563EB] transition-colors p-1 shrink-0" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                <div className="w-4 h-0.5 bg-current mb-0.5 rounded-full" />
                <div className="w-4 h-0.5 bg-current rounded-full" />
              </div>
              <div className="flex-1 relative">
                <input id={`mms-doc-input-${key}-${i}`} name={`mms-doc-input-${key}-${i}`} aria-label="mmsdocumentsform field" className={inputBase} value={item || ''} placeholder={placeholder} onChange={e => handleTextChange(e.target.value, charLimit, val => {
                  const c = [...list]; c[i] = val; setForm({...form, [key]: c});
                })}/>
              </div>
              <button type="button" onClick={() => {
                 const c = [...list]; c.splice(i, 1); setForm({...form, [key]: c});
              }} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          )}
        />
        {(list?.length || 0) < maxLimit && (
          <button type="button" onClick={() => {
             const c = [...list]; c.push(''); setForm({...form, [key]: c});
          }} className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-2xl p-4 text-slate-400 font-bold hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/30 transition-all uppercase tracking-widest text-[10px]">
             <Plus className="w-4 h-4" /> Add Item ({list?.length || 0}/{maxLimit})
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-fade-in relative pt-6">
      <PageEditorHeader
        title="Documents Required"
        description="Manage the list of documents required for MMS admission."
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
        <AdminFormSection 
          title="1. Document Submission Overview" 
          icon="📋"
          isOpen={activeSection === 'overview'}
          onToggle={() => setActiveSection(activeSection === 'overview' ? null : 'overview')}
        >
          <div className="space-y-4">
            <SortableListContext
              items={form.overview || []}
              onChange={val => setForm({ ...form, overview: val })}
              renderItem={(item, i, id, dragHandleProps, setNodeRef, style, isDragging, actions) => (
                <div ref={setNodeRef} style={style} className={`p-6 bg-white border border-slate-100 rounded-3xl relative shadow-sm hover:shadow-md transition-all ${isDragging ? 'shadow-xl z-50 ring-4 ring-blue-50 bg-white' : ''}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-200 hover:text-[#2563EB] transition-colors p-1" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                      <div className="w-5 h-0.5 bg-current mb-0.5 rounded-full" />
                      <div className="w-5 h-0.5 bg-current mb-0.5 rounded-full" />
                      <div className="w-5 h-0.5 bg-current rounded-full" />
                    </div>
                    <button type="button" onClick={() => {
                       const c = [...form.overview!]; c.splice(i, 1); setForm({...form, overview: c});
                    }} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className={labelBase}>Requirement</label>
                      <input id={`mms-doc-over-req-${i}`} name={`mms-doc-over-req-${i}`} aria-label="mmsdocumentsform field" className={inputBase} value={item.requirement} placeholder="e.g. Original Documents" onChange={e => handleTextChange(e.target.value, 100, val => {
                        const c = [...form.overview!]; c[i].requirement = val; setForm({...form, overview: c});
                      })}/>
                    </div>
                    <div className="relative">
                      <label className={labelBase}>Copies</label>
                      <input id={`mms-doc-over-copy-${i}`} name={`mms-doc-over-copy-${i}`} aria-label="mmsdocumentsform field" className={inputBase + " text-center"} value={item.copies} placeholder="e.g. 3 sets" onChange={e => handleTextChange(e.target.value, 20, val => {
                        const c = [...form.overview!]; c[i].copies = val; setForm({...form, overview: c});
                      })}/>
                    </div>
                  </div>
                </div>
              )}
            />
            {(form.overview?.length || 0) < 3 && (
              <button type="button" onClick={() => setForm({...form, overview: [...(form.overview||[]), {requirement: '', copies: ''}]})} className="w-full flex flex-col items-center justify-center gap-3 border-4 border-dashed border-slate-100 rounded-4xl p-10 hover:border-blue-400 hover:bg-blue-50/30 transition-all text-slate-300 hover:text-blue-500">
                <Plus className="w-8 h-8" />
                <span className="text-[10px] font-black uppercase tracking-widest">Add Overview Requirement</span>
              </button>
            )}
          </div>
        </AdminFormSection>

        {/* SECTION 2: ADMISSION DOCUMENTS */}
        <AdminFormSection title="2. Admission Documents" icon="📝" isOpen={activeSection === 'admissionDocs'} onToggle={() => setActiveSection(activeSection === 'admissionDocs' ? null : 'admissionDocs')}>
          {renderStringList('admissionDocs', 'Admission Document', 'e.g. Provisional Allotment Letter', 3, 100)}
        </AdminFormSection>

        {/* SECTION 3: ACADEMIC DOCUMENTS */}
        <AdminFormSection title="3. Academic Documents" icon="🎓" isOpen={activeSection === 'academicDocs'} onToggle={() => setActiveSection(activeSection === 'academicDocs' ? null : 'academicDocs')}>
          {renderStringList('academicDocs', 'Academic Document', 'e.g. SSC Marksheet', 10, 100)}
        </AdminFormSection>

        {/* SECTION 4: PERSONAL & DOMICILE DOCUMENTS */}
        <AdminFormSection title="4. Personal & Domicile" icon="🏠" isOpen={activeSection === 'personalDocs'} onToggle={() => setActiveSection(activeSection === 'personalDocs' ? null : 'personalDocs')}>
          {renderStringList('personalDocs', 'Personal Document', 'e.g. Nationality Certificate', 5, 100)}
        </AdminFormSection>

        {/* SECTION 5: CATEGORY DOCUMENTS */}
        <AdminFormSection title="5. Category Documents" icon="👥" isOpen={activeSection === 'categoryDocs'} onToggle={() => setActiveSection(activeSection === 'categoryDocs' ? null : 'categoryDocs')}>
          {renderStringList('categoryDocs', 'Category Document', 'e.g. Caste Certificate', 6, 100)}
        </AdminFormSection>

        {/* SECTION 6: SPECIAL DOCUMENTS */}
        <AdminFormSection title="6. Special Case Documents" icon="⭐" isOpen={activeSection === 'specialDocs'} onToggle={() => setActiveSection(activeSection === 'specialDocs' ? null : 'specialDocs')}>
          {renderStringList('specialDocs', 'Special Document', 'e.g. Gap Certificate', 6, 100)}
        </AdminFormSection>

        {/* SECTION 7: ADDITIONAL REQUIREMENTS */}
        <AdminFormSection title="7. Additional Requirements" icon="📌" isOpen={activeSection === 'additional'} onToggle={() => setActiveSection(activeSection === 'additional' ? null : 'additional')}>
          <div className="relative">
             <label className={labelBase}>Requirement Detail</label>
             <input id="mmsdocumentsform-4" name="mmsdocumentsform-4" aria-label="mmsdocumentsform field" className={inputBase} value={form.additionalDocs || ''} placeholder="e.g. Passport Size Photographs (3 copies)" onChange={e => handleTextChange(e.target.value, 100, val => {
               setForm({...form, additionalDocs: val});
             })}/>
          </div>
        </AdminFormSection>

        {/* SECTION 8: CHECKLIST PDF */}
        <AdminFormSection title="8. Documents Checklist (PDF)" icon="📄" isOpen={activeSection === 'pdf'} onToggle={() => setActiveSection(activeSection === 'pdf' ? null : 'pdf')}>
          <p className={labelBase + " text-slate-400!"}>Upload exactly 1 PDF checklist for candidates.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {form.checklistPdf?.map((pdfItem, i) => (
              <div key={i} className="p-6 bg-white border border-slate-100 rounded-3xl relative space-y-4 shadow-sm hover:shadow-md transition-all">
                <button type="button" onClick={() => {
                  const c = [...form.checklistPdf!]; c.splice(i, 1); setForm({...form, checklistPdf: c});
                }} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-all"><Trash2 className="w-4 h-4"/></button>
                
                <div className="relative group rounded-2xl border-2 border-dashed border-slate-100 bg-slate-50/50 h-32 flex flex-col items-center justify-center hover:bg-blue-50/30 hover:border-blue-200 transition-all cursor-pointer overflow-hidden shadow-inner">
                  <input id="mmsdocumentsform-5" name="mmsdocumentsform-5" aria-label="mmsdocumentsform field" type="file" accept="application/pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                       const c = [...form.checklistPdf!]; c[i].fileUrl = e.target.files[0]; setForm({...form, checklistPdf: c});
                    }
                  }}/>
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <FileText className={`w-5 h-5 ${pdfItem.fileUrl ? 'text-blue-500' : 'text-slate-300 group-hover:text-blue-400'}`}/>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{pdfItem.fileUrl ? 'File Selected' : 'Upload PDF'}</span>
                </div>
                
                <div className="relative pt-2">
                  <label className={labelBase}>PDF Label</label>
                  <input id="mmsdocumentsform-6" name="mmsdocumentsform-6" aria-label="mmsdocumentsform field" className={inputBase} placeholder="e.g. Document Checklist 2024" value={pdfItem.label || ''} onChange={e => {
                      const c = [...form.checklistPdf!]; c[i].label = e.target.value; setForm({...form, checklistPdf: c});
                  }} />
                </div>
              </div>
            ))}
            {(form.checklistPdf?.length || 0) < 1 && (
              <button type="button" onClick={() => setForm({...form, checklistPdf: [...(form.checklistPdf||[]), {fileUrl: null as any, label: ''}]})} className="flex flex-col items-center justify-center gap-3 border-4 border-dashed border-slate-100 rounded-4xl p-10 hover:border-blue-400 hover:bg-blue-50/30 transition-all text-slate-300 hover:text-blue-500 min-h-[260px]">
                <Plus className="w-8 h-8" />
                <span className="text-[10px] font-black uppercase tracking-widest">Add PDF Checklist</span>
              </button>
            )}
          </div>
        </AdminFormSection>
      </form>
    </div>
  );
};

export default MMSDocumentsForm;
