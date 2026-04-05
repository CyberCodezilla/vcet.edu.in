import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Image as ImageIcon, CheckCircle, AlertTriangle, GripVertical } from 'lucide-react';
import type { TrainingPlacementPayload } from '../../types';
import { trainingPlacementApi } from '../../api/trainingPlacement';
import { resolveApiUrl } from '../../../services/api';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';
import { SortableListContext } from '../../components/SortableList';
import AdminFormSection from '../../components/AdminFormSection';

const inputBase = "w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all text-slate-700";
const labelBase = "block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1";

const MMSPlacementInfoForm: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<TrainingPlacementPayload>({
    placementObjectives: [],
    placementCellMembers: [],
    softSkillTraining: { paragraphs: [], images: [] },
    psychometricTest: { paragraph: '', images: [] },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [activeSection, setActiveSection] = useState<string | null>('objectives');

  const toggleSection = (section: string) => {
    setActiveSection(prev => prev === section ? null : section);
  };

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await trainingPlacementApi.get();
      if (res.data) {
        setForm(prev => ({
          ...prev,
          ...res.data,
          placementObjectives: res.data.placementObjectives || [],
          placementCellMembers: res.data.placementCellMembers || [],
          softSkillTraining: res.data.softSkillTraining || { paragraphs: [], images: [] },
          psychometricTest: res.data.psychometricTest || { paragraph: '', images: [] },
        }));
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
      await trainingPlacementApi.update(form);
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
        title="Placement Info"
        description="Manage the placement cell objectives, members, and training programs."
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
        {/* SECTION 1: Placement Objectives */}
        <AdminFormSection 
          title={`1. Placement Objectives (${form.placementObjectives?.length || 0}/7)`} 
          icon="🎯"
          isOpen={activeSection === 'objectives'}
          onToggle={() => toggleSection('objectives')}
        >
          <div className="space-y-4">
            <SortableListContext
              items={form.placementObjectives || []}
              onChange={val => setForm({ ...form, placementObjectives: val })}
              renderItem={(obj, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
                <div ref={setNodeRef} style={style} className={`p-4 bg-white border border-slate-100 rounded-3xl relative shadow-sm hover:shadow-md transition-all ${isDragging ? 'shadow-xl z-50 ring-4 ring-blue-50 bg-white' : ''}`}>
                  <div className="flex items-center justify-between mb-3 border-b border-slate-50 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-200 hover:text-[#2563EB] transition-colors p-1" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                        <div className="w-4 h-0.5 bg-current mb-0.5 rounded-full" />
                        <div className="w-4 h-0.5 bg-current rounded-full" />
                      </div>
                      <span className="text-[10px] font-black uppercase text-slate-400">Objective #{i+1}</span>
                    </div>
                    <button type="button" onClick={() => {
                      const c = [...form.placementObjectives!]; c.splice(i, 1); setForm({ ...form, placementObjectives: c });
                    }} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <div className="relative">
                    <label className={labelBase}>Statement</label>
                    <textarea maxLength={160} className={inputBase + " h-20 resize-none"} value={obj.objective} placeholder="Enter objective statement..." onChange={e => {
                      const c = [...form.placementObjectives!]; c[i].objective = e.target.value; setForm({ ...form, placementObjectives: c });
                    }} />
                  </div>
                </div>
              )}
            />
            {(form.placementObjectives?.length || 0) < 7 && (
              <button type="button" onClick={() => setForm({ ...form, placementObjectives: [...(form.placementObjectives || []), { objective: '' }] })} className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-2xl p-4 text-slate-400 font-bold hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/30 transition-all uppercase tracking-widest text-[10px]">
                 <Plus className="w-4 h-4" /> Add Objective
              </button>
            )}
          </div>
        </AdminFormSection>

        {/* SECTION 2: Placement Cell Members */}
        <AdminFormSection title={`2. Placement Cell Members (${form.placementCellMembers?.length || 0}/2)`} icon="👥" isOpen={activeSection === 'members'} onToggle={() => toggleSection('members')}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SortableListContext
              items={form.placementCellMembers || []}
              onChange={val => setForm({ ...form, placementCellMembers: val })}
              renderItem={(mem, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
                <div ref={setNodeRef} style={style} className={`p-6 bg-white border border-slate-100 rounded-3xl relative shadow-sm hover:shadow-md transition-all ${isDragging ? 'shadow-xl z-50 ring-4 ring-blue-50 bg-white' : ''}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-200 hover:text-[#2563EB] transition-colors p-1" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                      <div className="w-5 h-0.5 bg-current mb-0.5 rounded-full" />
                      <div className="w-5 h-0.5 bg-current rounded-full" />
                    </div>
                    <button type="button" onClick={() => {
                      const c = [...form.placementCellMembers!]; c.splice(i, 1); setForm({ ...form, placementCellMembers: c });
                    }} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                  </div>

                  <div className="relative group rounded-2xl border-2 border-dashed border-slate-100 bg-slate-50/50 aspect-square w-32 mx-auto flex flex-col items-center justify-center hover:bg-blue-50/30 hover:border-blue-200 transition-all cursor-pointer overflow-hidden mb-6 shadow-inner">
                    <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={e => {
                        if (e.target.files?.[0]) {
                           const c = [...form.placementCellMembers!]; c[i].image = e.target.files[0]; setForm({...form, placementCellMembers: c});
                        }
                    }} />
                    {mem.image ? (
                      <img src={mem.image instanceof File ? URL.createObjectURL(mem.image) : resolveApiUrl(mem.image)} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-1">
                         <ImageIcon className="w-6 h-6 text-slate-300 group-hover:text-blue-500 transition-colors" />
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Photo</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className={labelBase}>Full Name</label>
                      <input maxLength={30} className={inputBase} value={mem.name} placeholder="Name" onChange={e => {
                         const c = [...form.placementCellMembers!]; c[i].name = e.target.value; setForm({...form, placementCellMembers: c});
                      }} />
                    </div>
                    <div>
                      <label className={labelBase}>Designation</label>
                      <input maxLength={40} className={inputBase} value={mem.role} placeholder="Role" onChange={e => {
                         const c = [...form.placementCellMembers!]; c[i].role = e.target.value; setForm({...form, placementCellMembers: c});
                      }} />
                    </div>
                    <div>
                      <label className={labelBase}>Email</label>
                      <input maxLength={30} className={inputBase} value={mem.email} placeholder="Email" onChange={e => {
                         const c = [...form.placementCellMembers!]; c[i].email = e.target.value; setForm({...form, placementCellMembers: c});
                      }} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                         <label className={labelBase}>Phone</label>
                         <input maxLength={25} className={inputBase} value={mem.phone} placeholder="Phone" onChange={e => {
                            const c = [...form.placementCellMembers!]; c[i].phone = e.target.value; setForm({...form, placementCellMembers: c});
                         }} />
                       </div>
                       <div>
                         <label className={labelBase}>Ext.</label>
                         <input maxLength={30} className={inputBase} value={mem.extension} placeholder="Extension" onChange={e => {
                            const c = [...form.placementCellMembers!]; c[i].extension = e.target.value; setForm({...form, placementCellMembers: c});
                         }} />
                       </div>
                    </div>
                  </div>
                </div>
              )}
            />
            {(form.placementCellMembers?.length || 0) < 2 && (
              <button type="button" onClick={() => setForm({ ...form, placementCellMembers: [...(form.placementCellMembers || []), { name: '', role: '', email: '', phone: '', extension: '', image: null }] })} className="flex flex-col items-center justify-center gap-3 border-4 border-dashed border-slate-100 rounded-4xl p-10 hover:border-blue-400 hover:bg-blue-50/30 transition-all text-slate-300 hover:text-blue-500 min-h-[400px]">
                <Plus className="w-8 h-8" />
                <span className="text-[10px] font-black uppercase tracking-widest">Add Cell Member</span>
              </button>
            )}
          </div>
        </AdminFormSection>

        {/* SECTION 3: Soft Skill Training */}
        <AdminFormSection title="3. Soft Skill Training" icon="🚀" isOpen={activeSection === 'soft-skill'} onToggle={() => toggleSection('soft-skill')}>
           <div className="space-y-6">
              <div className="space-y-4">
                 <label className={labelBase}>Program Description Paragraphs</label>
                 <SortableListContext
                   items={form.softSkillTraining?.paragraphs || []}
                   onChange={val => setForm({ ...form, softSkillTraining: { ...form.softSkillTraining!, paragraphs: val } })}
                   renderItem={(p, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
                     <div ref={setNodeRef} style={style} className={`p-4 bg-white border border-slate-100 rounded-3xl relative shadow-sm hover:shadow-md transition-all mb-3 ${isDragging ? 'shadow-xl z-50 ring-4 ring-blue-50 bg-white' : ''}`}>
                       <div className="flex items-center justify-between mb-3 border-b border-slate-50 pb-3">
                          <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-200 hover:text-[#2563EB] transition-colors p-1" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                            <div className="w-4 h-0.5 bg-current mb-0.5 rounded-full" />
                            <div className="w-4 h-0.5 bg-current rounded-full" />
                          </div>
                          <button type="button" onClick={() => setForm({...form, softSkillTraining: {...form.softSkillTraining!, paragraphs: form.softSkillTraining!.paragraphs.filter((_, idx) => idx !== i)}})} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-4 h-4"/></button>
                       </div>
                       <textarea maxLength={1100} className={inputBase + " h-32 resize-none"} value={p.text} placeholder="Enter training description..." onChange={e => {
                          const c = [...form.softSkillTraining!.paragraphs]; c[i].text = e.target.value; setForm({...form, softSkillTraining: {...form.softSkillTraining!, paragraphs: c}});
                       }} />
                     </div>
                   )}
                 />
                 <button type="button" onClick={() => setForm({...form, softSkillTraining: {...form.softSkillTraining!, paragraphs: [...form.softSkillTraining!.paragraphs, {text: ''}]}})} className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-2xl p-4 text-slate-400 font-bold hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/30 transition-all uppercase tracking-widest text-[10px]">
                    <Plus className="w-4 h-4" /> Add Paragraph
                 </button>
              </div>

              <div className="space-y-4 pt-6 border-t border-slate-100">
                 <label className={labelBase}>Session Images (Max 2)</label>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {form.softSkillTraining?.images?.map((item, i) => (
                      <div key={i} className="p-4 bg-white border border-slate-100 rounded-3xl relative shadow-sm hover:shadow-md transition-all">
                        <button type="button" onClick={() => {
                           const c = [...form.softSkillTraining!.images]; c.splice(i, 1); setForm({...form, softSkillTraining: {...form.softSkillTraining!, images: c}});
                        }} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-all z-20"><Trash2 className="w-4 h-4"/></button>
                        <div className="relative group rounded-2xl border-2 border-dashed border-slate-100 bg-slate-50/50 aspect-video flex flex-col items-center justify-center hover:bg-blue-50/30 hover:border-blue-200 transition-all cursor-pointer overflow-hidden mb-4 shadow-inner">
                           <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={e => {
                              if (e.target.files?.[0]) {
                                 const c = [...form.softSkillTraining!.images]; c[i].image = e.target.files[0]; setForm({...form, softSkillTraining: {...form.softSkillTraining!, images: c}});
                              }
                           }} />
                           {item.image ? (
                             <img src={item.image instanceof File ? URL.createObjectURL(item.image) : resolveApiUrl(item.image)} alt="" className="w-full h-full object-cover" />
                           ) : (
                             <ImageIcon className="w-8 h-8 text-slate-300" />
                           )}
                        </div>
                        <input className={inputBase} placeholder="Label" value={item.label} onChange={e => {
                           const c = [...form.softSkillTraining!.images]; c[i].label = e.target.value; setForm({...form, softSkillTraining: {...form.softSkillTraining!, images: c}});
                        }} />
                      </div>
                    ))}
                    {form.softSkillTraining!.images.length < 2 && (
                       <button type="button" onClick={() => setForm({...form, softSkillTraining: {...form.softSkillTraining!, images: [...form.softSkillTraining!.images, {label: '', image: null}]}})} className="flex flex-col items-center justify-center gap-3 border-4 border-dashed border-slate-100 rounded-4xl p-10 hover:border-blue-400 hover:bg-blue-50/30 transition-all text-slate-300 hover:text-blue-500 min-h-[240px]">
                          <Plus className="w-8 h-8" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Add Image</span>
                       </button>
                    )}
                 </div>
              </div>
           </div>
        </AdminFormSection>

        {/* SECTION 4: Psychometric Test */}
        <AdminFormSection title="4. Psychometric Test" icon="🧠" isOpen={activeSection === 'psychometric'} onToggle={() => toggleSection('psychometric')}>
           <div className="space-y-6">
              <div className="relative">
                 <label className={labelBase}>Program Description</label>
                 <textarea maxLength={1300} className={inputBase + " h-40 resize-none"} value={form.psychometricTest?.paragraph || ''} placeholder="Enter training description..." onChange={e => {
                    setForm({...form, psychometricTest: {...form.psychometricTest!, paragraph: e.target.value}});
                 }} />
              </div>
              <div className="space-y-4 pt-6 border-t border-slate-100">
                 <label className={labelBase}>Session Images (Max 2)</label>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {form.psychometricTest?.images?.map((item, i) => (
                      <div key={i} className="p-4 bg-white border border-slate-100 rounded-3xl relative shadow-sm hover:shadow-md transition-all">
                        <button type="button" onClick={() => {
                           const c = [...form.psychometricTest!.images]; c.splice(i, 1); setForm({...form, psychometricTest: {...form.psychometricTest!, images: c}});
                        }} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-all z-20"><Trash2 className="w-4 h-4"/></button>
                        <div className="relative group rounded-2xl border-2 border-dashed border-slate-100 bg-slate-50/50 aspect-video flex flex-col items-center justify-center hover:bg-blue-50/30 hover:border-blue-200 transition-all cursor-pointer overflow-hidden mb-4 shadow-inner">
                           <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={e => {
                              if (e.target.files?.[0]) {
                                 const c = [...form.psychometricTest!.images]; c[i].image = e.target.files[0]; setForm({...form, psychometricTest: {...form.psychometricTest!, images: c}});
                              }
                           }} />
                           {item.image ? (
                             <img src={item.image instanceof File ? URL.createObjectURL(item.image) : resolveApiUrl(item.image)} alt="" className="w-full h-full object-cover" />
                           ) : (
                             <ImageIcon className="w-8 h-8 text-slate-300" />
                           )}
                        </div>
                        <input className={inputBase} placeholder="Label" value={item.label} onChange={e => {
                           const c = [...form.psychometricTest!.images]; c[i].label = e.target.value; setForm({...form, psychometricTest: {...form.psychometricTest!, images: c}});
                        }} />
                      </div>
                    ))}
                    {form.psychometricTest!.images.length < 2 && (
                       <button type="button" onClick={() => setForm({...form, psychometricTest: {...form.psychometricTest!, images: [...form.psychometricTest!.images, {label: '', image: null}]}})} className="flex flex-col items-center justify-center gap-3 border-4 border-dashed border-slate-100 rounded-4xl p-10 hover:border-blue-400 hover:bg-blue-50/30 transition-all text-slate-300 hover:text-blue-500 min-h-[240px]">
                          <Plus className="w-8 h-8" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Add Image</span>
                       </button>
                    )}
                 </div>
              </div>
           </div>
        </AdminFormSection>
      </form>
    </div>
  );
};

export default MMSPlacementInfoForm;
