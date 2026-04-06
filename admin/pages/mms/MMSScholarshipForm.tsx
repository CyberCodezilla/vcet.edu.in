import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, FileText, CheckCircle, AlertTriangle, GripVertical } from 'lucide-react';
import type { MMSScholarshipPayload } from '../../types';
import { mmsScholarshipApi } from '../../api/mmsScholarshipApi';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';
import { SortableListContext } from '../../components/SortableList';
import AdminFormSection from '../../components/AdminFormSection';

const inputBase = "w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all text-slate-700";
const labelBase = "block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1";

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

  const toggleSection = (id: string) => {
    setActiveSection(prev => prev === id ? null : id);
  };

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
        description="Manage various scholarship schemes, eligibility criteria, and mandatory portals."
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
          title={`1. Scholarship Overview (${form.overview?.length || 0}/10)`} 
          icon="📝"
          isOpen={activeSection === 'overview'}
          onToggle={() => toggleSection('overview')}
        >
          <div className="space-y-4">
            <SortableListContext
              items={form.overview || []}
              onChange={val => setForm({ ...form, overview: val })}
              renderItem={(item, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
                <div ref={setNodeRef} style={style} className={`p-6 bg-white border border-slate-100 rounded-3xl relative shadow-sm hover:shadow-md transition-all ${isDragging ? 'shadow-xl z-50 ring-4 ring-blue-50 bg-white' : ''}`}>
                  <div className="flex items-center justify-between mb-4 border-b border-slate-50 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-200 hover:text-[#2563EB] transition-colors p-1" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                        <div className="w-5 h-0.5 bg-current mb-0.5 rounded-full" />
                        <div className="w-5 h-0.5 bg-current rounded-full" />
                      </div>
                      <span className="text-[10px] font-black uppercase text-slate-400">Scholarship #{i+1}</span>
                    </div>
                    <button type="button" onClick={() => {
                      const c = [...form.overview!]; c.splice(i, 1); setForm({ ...form, overview: c });
                    }} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelBase}>Scholarship Name</label>
                      <input maxLength={100} className={inputBase} value={item.name} placeholder="e.g. Rajarshi Shahu Maharaj Scholarship" onChange={e => {
                        const c = [...form.overview!]; c[i].name = e.target.value; setForm({ ...form, overview: c });
                      }} />
                    </div>
                    <div>
                      <label className={labelBase}>Category</label>
                      <input maxLength={50} className={inputBase} value={item.category} placeholder="e.g. Open / OBC" onChange={e => {
                        const c = [...form.overview!]; c[i].category = e.target.value; setForm({ ...form, overview: c });
                      }} />
                    </div>
                    <div className="md:col-span-2">
                      <label className={labelBase}>Brief Description / Eligibility</label>
                      <textarea maxLength={150} className={inputBase + " h-20 resize-none"} value={item.description} placeholder="Criteria summary..." onChange={e => {
                        const c = [...form.overview!]; c[i].description = e.target.value; setForm({ ...form, overview: c });
                      }} />
                    </div>
                  </div>
                </div>
              )}
            />
            {(form.overview?.length || 0) < 10 && (
              <button type="button" onClick={() => setForm({...form, overview: [...(form.overview||[]), {name: '', category: '', description: ''}]})} className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-2xl p-4 text-slate-400 font-bold hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/30 transition-all uppercase tracking-widest text-[10px]">
                <Plus className="w-4 h-4" /> Add Scholarship
              </button>
            )}
          </div>
        </AdminFormSection>

        {/* SECTION 2: MINORITY */}
        <AdminFormSection title="2. Minority Scholarship" icon="🤝" isOpen={activeSection === 'minority'} onToggle={() => toggleSection('minority')}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
               <label className={labelBase}>Eligible Communities</label>
               <input maxLength={100} className={inputBase} placeholder="e.g. Muslim, Christian, Sikh..." value={form.minority?.communities || ''} onChange={e => setForm({...form, minority: {...form.minority!, communities: e.target.value}})}/>
            </div>
            <div>
               <label className={labelBase}>Purpose</label>
               <input maxLength={150} className={inputBase} placeholder="e.g. Higher Education Support" value={form.minority?.purpose || ''} onChange={e => setForm({...form, minority: {...form.minority!, purpose: e.target.value}})}/>
            </div>
          </div>
        </AdminFormSection>

        {/* SECTION 3: EBC */}
        <AdminFormSection title={`3. EBC Scholarship (${form.ebc?.length || 0}/3)`} icon="🏢" isOpen={activeSection === 'ebc'} onToggle={() => toggleSection('ebc')}>
          <div className="space-y-4">
            <SortableListContext
              items={form.ebc || []}
              onChange={val => setForm({ ...form, ebc: val })}
              renderItem={(item, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
                <div ref={setNodeRef} style={style} className={`p-6 bg-white border border-slate-100 rounded-3xl relative shadow-sm hover:shadow-md transition-all ${isDragging ? 'shadow-xl z-50 ring-4 ring-blue-50 bg-white' : ''}`}>
                  <div className="flex items-center justify-between mb-4 border-b border-slate-50 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-200 hover:text-[#2563EB] transition-colors p-1" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                        <div className="w-5 h-0.5 bg-current mb-0.5 rounded-full" />
                        <div className="w-5 h-0.5 bg-current rounded-full" />
                      </div>
                      <span className="text-[10px] font-black uppercase text-slate-400">EBC Item #{i+1}</span>
                    </div>
                    <button type="button" onClick={() => {
                      const c = [...form.ebc!]; c.splice(i, 1); setForm({ ...form, ebc: c });
                    }} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                       <label className={labelBase}>Scheme Name</label>
                       <input maxLength={120} className={inputBase} value={item.schemeName} placeholder="Full scheme name" onChange={e => {
                          const c = [...form.ebc!]; c[i].schemeName = e.target.value; setForm({...form, ebc: c});
                       }} />
                    </div>
                    <div>
                       <label className={labelBase}>Category</label>
                       <input maxLength={50} className={inputBase} value={item.category} placeholder="Category" onChange={e => {
                          const c = [...form.ebc!]; c[i].category = e.target.value; setForm({...form, ebc: c});
                       }} />
                    </div>
                    <div>
                       <label className={labelBase}>Applicable GR Dates</label>
                       <input maxLength={100} className={inputBase} value={item.grDates} placeholder="GR Reference" onChange={e => {
                          const c = [...form.ebc!]; c[i].grDates = e.target.value; setForm({...form, ebc: c});
                       }} />
                    </div>
                  </div>
                </div>
              )}
            />
            {(form.ebc?.length || 0) < 3 && (
              <button type="button" onClick={() => setForm({...form, ebc: [...(form.ebc||[]), {schemeName: '', category: '', grDates: ''}]})} className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-2xl p-4 text-slate-400 font-bold hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/30 transition-all uppercase tracking-widest text-[10px]">
                <Plus className="w-4 h-4" /> Add EBC Item
              </button>
            )}
          </div>
        </AdminFormSection>

        {/* SECTION 4: CATEGORY BASED */}
        <AdminFormSection title={`4. Category-Based Scholarships (${form.categoryBased?.length || 0}/3)`} icon="🏷️" isOpen={activeSection === 'category'} onToggle={() => toggleSection('category')}>
          <div className="space-y-4">
            <SortableListContext
              items={form.categoryBased || []}
              onChange={val => setForm({ ...form, categoryBased: val })}
              renderItem={(item, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
                <div ref={setNodeRef} style={style} className={`p-6 bg-white border border-slate-100 rounded-3xl relative shadow-sm hover:shadow-md transition-all ${isDragging ? 'shadow-xl z-50 ring-4 ring-blue-50 bg-white' : ''}`}>
                  <div className="flex items-center justify-between mb-4 border-b border-slate-50 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-200 hover:text-[#2563EB] transition-colors p-1" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                        <div className="w-5 h-0.5 bg-current mb-0.5 rounded-full" />
                        <div className="w-5 h-0.5 bg-current rounded-full" />
                      </div>
                      <span className="text-[10px] font-black uppercase text-slate-400">Scheme #{i+1}</span>
                    </div>
                    <button type="button" onClick={() => {
                      const c = [...form.categoryBased!]; c.splice(i, 1); setForm({ ...form, categoryBased: c });
                    }} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                       <label className={labelBase}>Scholarship Name</label>
                       <input maxLength={120} className={inputBase} value={item.name} onChange={e => {
                          const c = [...form.categoryBased!]; c[i].name = e.target.value; setForm({...form, categoryBased: c});
                       }} />
                    </div>
                    <div>
                       <label className={labelBase}>Category</label>
                       <input maxLength={50} className={inputBase} value={item.category} placeholder="e.g. SC / ST" onChange={e => {
                          const c = [...form.categoryBased!]; c[i].category = e.target.value; setForm({...form, categoryBased: c});
                       }} />
                    </div>
                    <div>
                       <label className={labelBase}>Funding Authority</label>
                       <input maxLength={50} className={inputBase} value={item.authority} placeholder="e.g. Social Justice Dept." onChange={e => {
                          const c = [...form.categoryBased!]; c[i].authority = e.target.value; setForm({...form, categoryBased: c});
                       }} />
                    </div>
                  </div>
                </div>
              )}
            />
            {(form.categoryBased?.length || 0) < 3 && (
              <button type="button" onClick={() => setForm({...form, categoryBased: [...(form.categoryBased||[]), {name: '', category: '', authority: ''}]})} className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-2xl p-4 text-slate-400 font-bold hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/30 transition-all uppercase tracking-widest text-[10px]">
                <Plus className="w-4 h-4" /> Add Item
              </button>
            )}
          </div>
        </AdminFormSection>

        {/* SECTION 5: PORTAL */}
        <AdminFormSection title="5. Mandatory Portal" icon="🌐" isOpen={activeSection === 'portal'} onToggle={() => toggleSection('portal')}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
               <label className={labelBase}>Portal Name</label>
               <input maxLength={100} className={inputBase} placeholder="e.g. MahaDBT" value={form.portal?.name || ''} onChange={e => setForm({...form, portal: {...form.portal!, name: e.target.value}})}/>
            </div>
            <div>
               <label className={labelBase}>Portal URL</label>
               <input maxLength={150} className={inputBase} placeholder="https://..." value={form.portal?.url || ''} onChange={e => setForm({...form, portal: {...form.portal!, url: e.target.value}})}/>
            </div>
          </div>
        </AdminFormSection>

        {/* SECTION 6: PDF SECTION */}
        <AdminFormSection title={`6. Detailed Rules (PDF) (${form.pdf?.length || 0}/2)`} icon="📄" isOpen={activeSection === 'pdf'} onToggle={() => toggleSection('pdf')}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SortableListContext
              items={form.pdf || []}
              onChange={val => setForm({ ...form, pdf: val })}
              renderItem={(pdfItem, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
                <div ref={setNodeRef} style={style} className={`p-6 bg-white border border-slate-100 rounded-3xl relative shadow-sm hover:shadow-md transition-all ${isDragging ? 'shadow-xl z-50 ring-4 ring-blue-50 bg-white' : ''}`}>
                  <div className="flex items-center justify-between mb-4 border-b border-slate-50 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-200 hover:text-[#2563EB] transition-colors p-1" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                        <div className="w-5 h-0.5 bg-current mb-0.5 rounded-full" />
                        <div className="w-5 h-0.5 bg-current rounded-full" />
                      </div>
                      <span className="text-[10px] font-black uppercase text-slate-400">PDF Document #{i+1}</span>
                    </div>
                    <button type="button" onClick={() => {
                      const c = [...form.pdf!]; c.splice(i, 1); setForm({ ...form, pdf: c });
                    }} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                  </div>

                  <div className="space-y-4">
                    <div className="relative group rounded-2xl border-2 border-dashed border-slate-100 bg-slate-50/50 h-32 flex flex-col items-center justify-center hover:bg-blue-50/30 hover:border-blue-200 transition-all cursor-pointer overflow-hidden shadow-inner">
                      <input type="file" accept="application/pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={e => {
                        if (e.target.files?.[0]) {
                          const c = [...form.pdf!]; c[i].fileUrl = e.target.files[0]; setForm({ ...form, pdf: c });
                        }
                      }} />
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <FileText className={`w-5 h-5 ${pdfItem.fileUrl ? 'text-blue-500' : 'text-slate-300 group-hover:text-blue-400'}`} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{pdfItem.fileUrl ? 'PDF Selected' : 'Upload PDF'}</span>
                    </div>
                    <div>
                      <label className={labelBase}>Document Label</label>
                      <input className={inputBase} placeholder="e.g. Scholarship Rules 2024" value={pdfItem.label || ''} onChange={e => {
                        const c = [...form.pdf!]; c[i].label = e.target.value; setForm({ ...form, pdf: c });
                      }} />
                    </div>
                  </div>
                </div>
              )}
            />
            {(form.pdf?.length || 0) < 2 && (
              <button type="button" onClick={() => setForm({...form, pdf: [...(form.pdf||[]), {fileUrl: null as any, label: ''}]})} className="flex flex-col items-center justify-center gap-3 border-4 border-dashed border-slate-100 rounded-4xl p-10 hover:border-blue-400 hover:bg-blue-50/30 transition-all text-slate-300 hover:text-blue-500 min-h-[220px]">
                <Plus className="w-8 h-8" />
                <span className="text-[10px] font-black uppercase tracking-widest">Add Rules PDF</span>
              </button>
            )}
          </div>
        </AdminFormSection>
      </form>
    </div>
  );
};

export default MMSScholarshipForm;
