import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Plus, Trash2, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import type { MMSAdmissionPayload } from '../../types';
import { mmsAdmissionApi } from '../../api/mmsAdmissionApi';

const emptyForm: MMSAdmissionPayload = {
  eligibilityCriteria: {
    generalPercentage: '',
    reservedPercentage: '',
    degreeRequirement: '',
    entranceExams: []
  },
  entranceExamination: {
    primaryExam: '',
    alternativeExams: []
  },
  eligibilityCertificates: [],
  universityLinks: [],
  documentsRequired: [],
  feeSummary: {
    description: '',
    reference: ''
  },
  admissionPdf: []
};

const MMSAdmissionForm: React.FC = () => {
  const [form, setForm] = useState<MMSAdmissionPayload>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [activeSection, setActiveSection] = useState<string | null>('eligibilityCriteria');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await mmsAdmissionApi.get();
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
      await mmsAdmissionApi.update(form);
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

  const handleTextChange = (
    value: string,
    limit: number,
    setter: (val: string) => void
  ) => {
    if (value.length <= limit) setter(value);
  };

  if (loading) {
     return <div className="p-10 text-center"><div className="w-8 h-8 border-4 border-slate-200 border-t-[#2563EB] rounded-full animate-spin mx-auto mb-4" />Loading Form...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-fade-in relative pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/admin/pages/mms" className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold text-[#111827]">Admission Details</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">MMS ADMISSIONS EDITOR</p>
          </div>
        </div>
        <button onClick={handleSave} disabled={saving} className="px-8 py-3.5 bg-[#2563EB] text-white rounded-2xl font-black text-sm uppercase tracking-wider shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center gap-2">
          {saving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

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

        {/* SECTION 1: ELIGIBILITY CRITERIA */}
        <SectionCard title="Eligibility Criteria" icon="✅">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="admin-label">Min % (General Category) <span className="text-slate-400 normal-case">({form.eligibilityCriteria?.generalPercentage?.length || 0}/5)</span></label>
                <input className="admin-input-small" placeholder="e.g. 50%" value={form.eligibilityCriteria?.generalPercentage || ''} onChange={e => handleTextChange(e.target.value, 5, val => {
                  setForm({...form, eligibilityCriteria: {...form.eligibilityCriteria!, generalPercentage: val}});
                })}/>
              </div>
              <div>
                <label className="admin-label">Min % (Reserved Category - MH) <span className="text-slate-400 normal-case">({form.eligibilityCriteria?.reservedPercentage?.length || 0}/5)</span></label>
                <input className="admin-input-small" placeholder="e.g. 45%" value={form.eligibilityCriteria?.reservedPercentage || ''} onChange={e => handleTextChange(e.target.value, 5, val => {
                  setForm({...form, eligibilityCriteria: {...form.eligibilityCriteria!, reservedPercentage: val}});
                })}/>
              </div>
              <div className="md:col-span-2">
                <label className="admin-label">Accepted Degree Requirement <span className="text-slate-400 normal-case">({form.eligibilityCriteria?.degreeRequirement?.length || 0}/50)</span></label>
                <input className="admin-input-small" placeholder="e.g. Bachelor's Degree (Any Discipline) - Yes" value={form.eligibilityCriteria?.degreeRequirement || ''} onChange={e => handleTextChange(e.target.value, 50, val => {
                  setForm({...form, eligibilityCriteria: {...form.eligibilityCriteria!, degreeRequirement: val}});
                })}/>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <label className="admin-label mb-2">Accepted Entrance Exams (Max 7)</label>
              <div className="space-y-2">
                {form.eligibilityCriteria?.entranceExams?.map((exam, i) => (
                   <div key={i} className="flex gap-2">
                     <div className="flex-1 relative">
                       <input className="admin-input-small w-full" placeholder="Exam Name" value={exam.exam} onChange={e => handleTextChange(e.target.value, 100, val => {
                         const c = [...form.eligibilityCriteria!.entranceExams]; c[i].exam = val;
                         setForm({...form, eligibilityCriteria: {...form.eligibilityCriteria!, entranceExams: c}});
                       })}/>
                       <span className="absolute right-2 top-2 text-[10px] text-slate-400">{exam.exam.length}/100</span>
                     </div>
                     <button type="button" onClick={() => {
                        const c = [...form.eligibilityCriteria!.entranceExams]; c.splice(i, 1);
                         setForm({...form, eligibilityCriteria: {...form.eligibilityCriteria!, entranceExams: c}});
                     }} className="p-2 text-red-500 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                   </div>
                ))}
                {(form.eligibilityCriteria?.entranceExams?.length || 0) < 7 && (
                  <button type="button" onClick={() => {
                     const c = [...(form.eligibilityCriteria?.entranceExams || [])]; c.push({exam: ''});
                     setForm({...form, eligibilityCriteria: {...form.eligibilityCriteria!, entranceExams: c}});
                  }} className="text-xs font-bold text-blue-600 hover:underline">+ Add Exam</button>
                )}
              </div>
            </div>
          </div>
        </SectionCard>

        {/* SECTION 2: ENTRANCE EXAMINATION */}
        <SectionCard title="Entrance Examination" icon="📝">
          <div className="space-y-4">
             <div>
                <label className="admin-label">Primary Exam (Preferred) <span className="text-slate-400 normal-case">({form.entranceExamination?.primaryExam?.length || 0}/50)</span></label>
                <input className="admin-input-small" placeholder="e.g. MAH-MBA/MMS-CET" value={form.entranceExamination?.primaryExam || ''} onChange={e => handleTextChange(e.target.value, 50, val => {
                  setForm({...form, entranceExamination: {...form.entranceExamination!, primaryExam: val}});
                })}/>
             </div>
             
             <div className="pt-4 border-t border-slate-100">
              <label className="admin-label mb-2">Alternative Exams List (Max 6)</label>
              <div className="space-y-2">
                {form.entranceExamination?.alternativeExams?.map((exam, i) => (
                   <div key={i} className="flex gap-2">
                     <div className="flex-1 relative">
                       <input className="admin-input-small w-full" placeholder="Exam Name" value={exam.exam} onChange={e => handleTextChange(e.target.value, 100, val => {
                         const c = [...form.entranceExamination!.alternativeExams]; c[i].exam = val;
                         setForm({...form, entranceExamination: {...form.entranceExamination!, alternativeExams: c}});
                       })}/>
                       <span className="absolute right-2 top-2 text-[10px] text-slate-400">{exam.exam.length}/100</span>
                     </div>
                     <button type="button" onClick={() => {
                        const c = [...form.entranceExamination!.alternativeExams]; c.splice(i, 1);
                         setForm({...form, entranceExamination: {...form.entranceExamination!, alternativeExams: c}});
                     }} className="p-2 text-red-500 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                   </div>
                ))}
                {(form.entranceExamination?.alternativeExams?.length || 0) < 6 && (
                  <button type="button" onClick={() => {
                     const c = [...(form.entranceExamination?.alternativeExams || [])]; c.push({exam: ''});
                     setForm({...form, entranceExamination: {...form.entranceExamination!, alternativeExams: c}});
                  }} className="text-xs font-bold text-blue-600 hover:underline">+ Add Alternative Exam</button>
                )}
              </div>
            </div>
          </div>
        </SectionCard>

        {/* SECTION 3: ELIGIBILITY CERTIFICATES / AFFIDAVITS */}
        <SectionCard title="Eligibility Certificates / Affidavits" icon="📜">
          <div className="space-y-3">
             <p className="text-xs text-slate-500 mb-2 font-medium">Add requirements like Transfer Certificate, Validity, etc. (Max 4)</p>
             {form.eligibilityCertificates?.map((cert, i) => (
               <div key={i} className="flex gap-2 items-start">
                 <div className="flex-1 relative">
                   <input className="admin-input-small w-full" value={cert.certificate} placeholder="Requirement details (Max 100)" onChange={e => handleTextChange(e.target.value, 100, val => {
                     const c = [...form.eligibilityCertificates!]; c[i].certificate = val; setForm({...form, eligibilityCertificates: c});
                   })}/>
                   <span className="absolute right-2 top-2 text-[10px] text-slate-400">{cert.certificate.length}/100</span>
                 </div>
                 <button type="button" onClick={() => {
                    const c = [...form.eligibilityCertificates!]; c.splice(i, 1); setForm({...form, eligibilityCertificates: c});
                 }} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
               </div>
             ))}
             {(form.eligibilityCertificates?.length || 0) < 4 && (
               <button type="button" onClick={() => setForm({...form, eligibilityCertificates: [...(form.eligibilityCertificates||[]), {certificate: ''}]})} className="btn-add">
                 <Plus className="w-4 h-4" /> Add Certificate Requirement
               </button>
             )}
          </div>
        </SectionCard>

        {/* SECTION 4: UNIVERSITY LINKS */}
        <SectionCard title="University Links" icon="🔗">
          <div className="space-y-4">
             {form.universityLinks?.map((item, i) => (
               <div key={i} className="flex gap-2 items-start p-3 bg-slate-50 rounded-lg border border-slate-200">
                 <div className="flex-1 space-y-2">
                   <div className="relative">
                     <label className="admin-label">Link Label / Title <span className="text-slate-400 normal-case">({item.link.length}/100)</span></label>
                     <input className="admin-input-small w-full" placeholder="e.g. CET Cell Portal" value={item.link} onChange={e => handleTextChange(e.target.value, 100, val => {
                       const c = [...form.universityLinks!]; c[i].link = val; setForm({...form, universityLinks: c});
                     })}/>
                   </div>
                   <div className="relative">
                     <label className="admin-label">URL <span className="text-slate-400 normal-case">({item.url.length}/150)</span></label>
                     <input className="admin-input-small w-full" placeholder="https://" value={item.url} onChange={e => handleTextChange(e.target.value, 150, val => {
                       const c = [...form.universityLinks!]; c[i].url = val; setForm({...form, universityLinks: c});
                     })}/>
                   </div>
                 </div>
                 <button type="button" onClick={() => {
                    const c = [...form.universityLinks!]; c.splice(i, 1); setForm({...form, universityLinks: c});
                 }} className="p-2 text-red-500 hover:bg-red-50 rounded-lg mt-5"><Trash2 className="w-4 h-4" /></button>
               </div>
             ))}
             {(form.universityLinks?.length || 0) < 2 && (
               <button type="button" onClick={() => setForm({...form, universityLinks: [...(form.universityLinks||[]), {link: '', url: ''}]})} className="btn-add">
                 <Plus className="w-4 h-4" /> Add Link (Max 2)
               </button>
             )}
          </div>
        </SectionCard>

        {/* SECTION 5: DOCUMENTS REQUIRED */}
        <SectionCard title="Documents Required" icon="📂">
          <div className="space-y-3">
             <p className="text-xs text-slate-500 mb-2 font-medium">List of mandatory admission documents. (Max 5)</p>
             {form.documentsRequired?.map((doc, i) => (
               <div key={i} className="flex gap-2 items-start">
                 <div className="flex-1 relative">
                   <input className="admin-input-small w-full" value={doc.document} placeholder="Document Item (Max 200)" onChange={e => handleTextChange(e.target.value, 200, val => {
                     const c = [...form.documentsRequired!]; c[i].document = val; setForm({...form, documentsRequired: c});
                   })}/>
                   <span className="absolute right-2 top-2 text-[10px] text-slate-400">{doc.document.length}/200</span>
                 </div>
                 <button type="button" onClick={() => {
                    const c = [...form.documentsRequired!]; c.splice(i, 1); setForm({...form, documentsRequired: c});
                 }} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
               </div>
             ))}
             {(form.documentsRequired?.length || 0) < 5 && (
               <button type="button" onClick={() => setForm({...form, documentsRequired: [...(form.documentsRequired||[]), {document: ''}]})} className="btn-add">
                 <Plus className="w-4 h-4" /> Add Document
               </button>
             )}
          </div>
        </SectionCard>

        {/* SECTION 6: FEE STRUCTURE SUMMARY */}
        <SectionCard title="Fee Structure Summary" icon="💳">
          <div className="space-y-4">
            <div className="relative">
              <label className="admin-label">Fee Details Description <span className="text-slate-400 normal-case">({form.feeSummary?.description?.length || 0}/150)</span></label>
              <textarea className="admin-input-small resize-none" rows={3} placeholder="Brief summary of fees..." value={form.feeSummary?.description || ''} onChange={e => handleTextChange(e.target.value, 150, val => {
                setForm({...form, feeSummary: {...form.feeSummary!, description: val}});
              })}/>
            </div>
            <div className="relative">
              <label className="admin-label">Fee Circular Reference <span className="text-slate-400 normal-case">({form.feeSummary?.reference?.length || 0}/100)</span></label>
              <input className="admin-input-small w-full" placeholder="e.g. As per FRA standard circular..." value={form.feeSummary?.reference || ''} onChange={e => handleTextChange(e.target.value, 100, val => {
                setForm({...form, feeSummary: {...form.feeSummary!, reference: val}});
              })}/>
            </div>
          </div>
        </SectionCard>

        {/* SECTION 7: ADMISSION DETAILS (PDF SECTION) */}
        <SectionCard title="Admission Details (PDF Section)" icon="📄">
          <p className="text-xs text-slate-500 mb-3 font-medium">Upload up to 2 strictly PDF documents for detailed admission instructions.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {form.admissionPdf?.map((pdfItem, i) => (
              <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-lg relative space-y-3">
                <button type="button" onClick={() => {
                  const c = [...form.admissionPdf!]; c.splice(i, 1); setForm({...form, admissionPdf: c});
                }} className="absolute top-2 right-2 text-red-500 z-10 p-0.5"><Trash2 className="w-4 h-4"/></button>
                
                <div className="relative group rounded-lg border border-dashed border-slate-300 bg-white h-20 flex flex-col items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer">
                  <input type="file" accept="application/pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  <FileText className="w-5 h-5 text-red-400 group-hover:text-red-500"/>
                  <span className="text-[10px] text-slate-500 font-medium mt-1">Upload PDF</span>
                </div>
                
                <div>
                  <label className="admin-label text-[9px] mb-1 text-slate-400">PDF Label (Optional)</label>
                  <input className="admin-input-small text-xs" placeholder="Label / Name" value={pdfItem.label || ''} onChange={e => {
                      const c = [...form.admissionPdf!]; c[i].label = e.target.value; setForm({...form, admissionPdf: c});
                  }} />
                </div>
                <div>
                  <label className="admin-label text-[9px] mb-1 text-slate-400">PDF URL link (Max 150)</label>
                  <input className="admin-input-small text-xs" placeholder="https://" value={pdfItem.url || ''} onChange={e => handleTextChange(e.target.value, 150, val => {
                      const c = [...form.admissionPdf!]; c[i].url = val; setForm({...form, admissionPdf: c});
                  })} />
                </div>
              </div>
            ))}
            {(form.admissionPdf?.length || 0) < 2 && (
              <button type="button" onClick={() => setForm({...form, admissionPdf: [...(form.admissionPdf||[]), {url: '', label: ''}]})} className="btn-add min-h-[10rem]">
                <Plus className="w-5 h-5 mx-auto mb-1" /> Add PDF (Max 2)
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

export default MMSAdmissionForm;
