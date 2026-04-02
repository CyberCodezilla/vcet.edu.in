import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, Plus, Trash2, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import type { MMSScholarshipPayload } from '../../types';
import { mmsScholarshipApi } from '../../api/mmsScholarshipApi';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';

const emptyForm: MMSScholarshipPayload = {
  overview: [],
  minority: { communities: '', purpose: '' },
  ebc: [],
  categoryBased: [],
  portal: { name: '', url: '' },
  pdf: []
};

const MMSScholarshipForm: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<MMSScholarshipPayload>(emptyForm);
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
      const res = await mmsScholarshipApi.get();
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
      await mmsScholarshipApi.update(form);
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

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-fade-in relative pt-6">
      <PageEditorHeader
        title="Scholarships"
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
        <SectionCard title="Scholarship Overview" icon="📝">
          <div className="space-y-4">
            {form.overview?.map((item, i) => (
              <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-xl relative space-y-3">
                 <button type="button" onClick={() => {
                   const c = [...form.overview!]; c.splice(i, 1); setForm({...form, overview: c});
                 }} className="absolute top-2 right-2 text-red-500 p-1 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4"/></button>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                   <div className="relative">
                     <label className="admin-label">Name (Max 100)</label>
                     <input className="admin-input-small" value={item.name} onChange={e => handleTextChange(e.target.value, 100, val => {
                       const c = [...form.overview!]; c[i].name = val; setForm({...form, overview: c});
                     })}/>
                     <span className="absolute right-2 top-8 text-[10px] text-slate-400">{item.name?.length || 0}/100</span>
                   </div>
                   <div className="relative">
                     <label className="admin-label">Category (Max 50)</label>
                     <input className="admin-input-small" value={item.category} onChange={e => handleTextChange(e.target.value, 50, val => {
                       const c = [...form.overview!]; c[i].category = val; setForm({...form, overview: c});
                     })}/>
                     <span className="absolute right-2 top-8 text-[10px] text-slate-400">{item.category?.length || 0}/50</span>
                   </div>
                   <div className="md:col-span-2 relative">
                     <label className="admin-label">Description (Max 150)</label>
                     <input className="admin-input-small" value={item.description} onChange={e => handleTextChange(e.target.value, 150, val => {
                       const c = [...form.overview!]; c[i].description = val; setForm({...form, overview: c});
                     })}/>
                     <span className="absolute right-2 top-8 text-[10px] text-slate-400">{item.description?.length || 0}/150</span>
                   </div>
                 </div>
              </div>
            ))}
            {(form.overview?.length || 0) < 10 && (
              <button type="button" onClick={() => setForm({...form, overview: [...(form.overview||[]), {name: '', category: '', description: ''}]})} className="btn-add">
                <Plus className="w-4 h-4" /> Add Scholarship
              </button>
            )}
          </div>
        </SectionCard>

        {/* SECTION 2: MINORITY */}
        <SectionCard title="Minority Scholarship" icon="👥">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
               <label className="admin-label">Eligible Communities (Max 100) <br/><span className="text-[10px] text-slate-400 font-normal">e.g. Muslim, Christian, Sikh, Buddhist, Parsi, Jain</span></label>
               <input className="admin-input-small mt-1" value={form.minority?.communities || ''} onChange={e => handleTextChange(e.target.value, 100, val => {
                 setForm({...form, minority: {...form.minority!, communities: val}});
               })}/>
            </div>
            <div className="relative">
               <label className="admin-label">Purpose (Max 150)<br/>&nbsp;</label>
               <input className="admin-input-small mt-1" value={form.minority?.purpose || ''} onChange={e => handleTextChange(e.target.value, 150, val => {
                 setForm({...form, minority: {...form.minority!, purpose: val}});
               })}/>
            </div>
          </div>
        </SectionCard>

        {/* SECTION 3: EBC */}
        <SectionCard title="EBC Scholarship" icon="🏛️">
          <div className="space-y-4">
            {form.ebc?.map((item, i) => (
              <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-xl relative space-y-3">
                 <button type="button" onClick={() => {
                   const c = [...form.ebc!]; c.splice(i, 1); setForm({...form, ebc: c});
                 }} className="absolute top-2 right-2 text-red-500 p-1 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4"/></button>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                   <div className="relative md:col-span-2">
                     <label className="admin-label">Scheme Name (Max 120)</label>
                     <input className="admin-input-small" value={item.schemeName} onChange={e => handleTextChange(e.target.value, 120, val => {
                       const c = [...form.ebc!]; c[i].schemeName = val; setForm({...form, ebc: c});
                     })}/>
                   </div>
                   <div className="relative">
                     <label className="admin-label">Category (Max 50)</label>
                     <input className="admin-input-small" value={item.category} onChange={e => handleTextChange(e.target.value, 50, val => {
                       const c = [...form.ebc!]; c[i].category = val; setForm({...form, ebc: c});
                     })}/>
                   </div>
                   <div className="relative md:col-span-3">
                     <label className="admin-label">Applicable GR Dates (Max 100)</label>
                     <input className="admin-input-small" value={item.grDates} onChange={e => handleTextChange(e.target.value, 100, val => {
                       const c = [...form.ebc!]; c[i].grDates = val; setForm({...form, ebc: c});
                     })}/>
                   </div>
                 </div>
              </div>
            ))}
            {(form.ebc?.length || 0) < 3 && (
              <button type="button" onClick={() => setForm({...form, ebc: [...(form.ebc||[]), {schemeName: '', category: '', grDates: ''}]})} className="btn-add">
                <Plus className="w-4 h-4" /> Add EBC Item
              </button>
            )}
          </div>
        </SectionCard>

        {/* SECTION 4: CATEGORY BASED */}
        <SectionCard title="Category-Based Scholarships" icon="🏷️">
          <div className="space-y-4">
            {form.categoryBased?.map((item, i) => (
              <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-xl relative space-y-3">
                 <button type="button" onClick={() => {
                   const c = [...form.categoryBased!]; c.splice(i, 1); setForm({...form, categoryBased: c});
                 }} className="absolute top-2 right-2 text-red-500 p-1 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4"/></button>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                   <div className="relative md:col-span-2">
                     <label className="admin-label">Scholarship Name (Max 120)</label>
                     <input className="admin-input-small" value={item.name} onChange={e => handleTextChange(e.target.value, 120, val => {
                       const c = [...form.categoryBased!]; c[i].name = val; setForm({...form, categoryBased: c});
                     })}/>
                   </div>
                   <div className="relative">
                     <label className="admin-label">Category (Max 50)</label>
                     <input className="admin-input-small" value={item.category} onChange={e => handleTextChange(e.target.value, 50, val => {
                       const c = [...form.categoryBased!]; c[i].category = val; setForm({...form, categoryBased: c});
                     })}/>
                   </div>
                   <div className="relative">
                     <label className="admin-label">Funding Authority (Max 50)</label>
                     <input className="admin-input-small" value={item.authority} onChange={e => handleTextChange(e.target.value, 50, val => {
                       const c = [...form.categoryBased!]; c[i].authority = val; setForm({...form, categoryBased: c});
                     })}/>
                   </div>
                 </div>
              </div>
            ))}
            {(form.categoryBased?.length || 0) < 3 && (
              <button type="button" onClick={() => setForm({...form, categoryBased: [...(form.categoryBased||[]), {name: '', category: '', authority: ''}]})} className="btn-add">
                <Plus className="w-4 h-4" /> Add Category Scholarship
              </button>
            )}
          </div>
        </SectionCard>

        {/* SECTION 5: PORTAL */}
        <SectionCard title="Scholarship Portal" icon="🌐">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
               <label className="admin-label">Portal Name (Max 100)</label>
               <input className="admin-input-small" value={form.portal?.name || ''} onChange={e => handleTextChange(e.target.value, 100, val => {
                 setForm({...form, portal: {...form.portal!, name: val}});
               })}/>
            </div>
            <div className="relative">
               <label className="admin-label">Portal URL (Max 150)</label>
               <input className="admin-input-small" value={form.portal?.url || ''} onChange={e => handleTextChange(e.target.value, 150, val => {
                 setForm({...form, portal: {...form.portal!, url: val}});
               })}/>
            </div>
          </div>
        </SectionCard>

        {/* SECTION 6: PDF SECTION */}
        <SectionCard title="Scholarship Details (PDF)" icon="📄">
          <p className="text-xs text-slate-500 mb-3 font-medium">Upload up to 2 PDFs for detailed scholarship rules.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {form.pdf?.map((pdfItem, i) => (
              <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-lg relative space-y-3">
                <button type="button" onClick={() => {
                  const c = [...form.pdf!]; c.splice(i, 1); setForm({...form, pdf: c});
                }} className="absolute top-2 right-2 text-red-500 z-10 hover:bg-red-50 p-1 rounded"><Trash2 className="w-4 h-4"/></button>
                
                <div className="relative group rounded-lg border border-dashed border-slate-300 bg-white h-24 flex flex-col items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer">
                  <input type="file" accept="application/pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                       const c = [...form.pdf!]; c[i].fileUrl = e.target.files[0]; setForm({...form, pdf: c});
                    }
                  }}/>
                  <FileText className={`w-6 h-6 ${pdfItem.fileUrl ? 'text-blue-500' : 'text-slate-300 group-hover:text-blue-400'}`}/>
                  <span className="text-[10px] text-slate-500 font-medium mt-1">{pdfItem.fileUrl ? 'File Selected' : 'Upload PDF'}</span>
                </div>
                
                <div className="relative">
                  <label className="admin-label text-[10px]">PDF Label / Name</label>
                  <input className="admin-input-small text-xs" placeholder="Label / Name" value={pdfItem.label || ''} onChange={e => {
                      const c = [...form.pdf!]; c[i].label = e.target.value; setForm({...form, pdf: c});
                  }} />
                </div>
              </div>
            ))}
            {(form.pdf?.length || 0) < 2 && (
              <button type="button" onClick={() => setForm({...form, pdf: [...(form.pdf||[]), {fileUrl: null as any, label: ''}]})} className="btn-add min-h-[12rem]">
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

export default MMSScholarshipForm;
