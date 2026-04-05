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

const MMSTrainingForm: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<TrainingPlacementPayload>({
    trainingPoints: [],
    events: [],
    careerGuidance: { guidancePoints: [], seminars: [] },
    internshipSteps: [],
    trainingGallery: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [activeSection, setActiveSection] = useState<string | null>('points');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await trainingPlacementApi.get();
      if (res.data) {
        setForm(prev => ({
          ...prev,
          ...res.data,
          trainingPoints: res.data.trainingPoints || [],
          events: res.data.events || [],
          careerGuidance: res.data.careerGuidance || { guidancePoints: [], seminars: [] },
          internshipSteps: res.data.internshipSteps || [],
          trainingGallery: res.data.trainingGallery || [],
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

  if (loading) {
    return <div className="p-10 text-center"><div className="w-8 h-8 border-4 border-slate-200 border-t-[#2563EB] rounded-full animate-spin mx-auto mb-4" />Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-fade-in relative pt-6">
      <PageEditorHeader
        title="Training Initiatives"
        description="Manage industry training points, guest lectures, career guidance, and internship procedures."
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
        {/* 1. Training Points */}
        <AdminFormSection title={`1. Training Points (${form.trainingPoints?.length || 0}/5)`} icon="📋" isOpen={activeSection === 'points'} onToggle={() => setActiveSection(activeSection === 'points' ? null : 'points')}>
           <div className="space-y-3">
              <SortableListContext
                items={form.trainingPoints || []}
                onChange={val => setForm({ ...form, trainingPoints: val })}
                renderItem={(pt, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
                  <div ref={setNodeRef} style={style} className={`flex items-center gap-3 p-2 bg-white border border-slate-100 rounded-2xl relative shadow-sm hover:shadow-md transition-all ${isDragging ? 'shadow-xl z-50 ring-4 ring-blue-50 bg-white' : ''}`}>
                    <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-200 hover:text-[#2563EB] transition-colors p-1" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                       <div className="w-4 h-0.5 bg-current mb-0.5 rounded-full" />
                       <div className="w-4 h-0.5 bg-current rounded-full" />
                    </div>
                    <input className={inputBase + " flex-1 h-10 py-1.5"} value={pt.point} placeholder="Enter training highlight..." onChange={e => {
                       const c = [...form.trainingPoints]; c[i].point = e.target.value; setForm({...form, trainingPoints: c});
                    }} />
                    <button type="button" onClick={() => setForm({...form, trainingPoints: form.trainingPoints.filter((_, idx) => idx !== i)})} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-4 h-4"/></button>
                  </div>
                )}
              />
              {form.trainingPoints.length < 5 && (
                 <button type="button" onClick={() => setForm({...form, trainingPoints: [...form.trainingPoints, {point: ''}]})} className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-2xl p-3 text-slate-400 font-bold hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/30 transition-all uppercase tracking-widest text-[10px]">
                    <Plus className="w-4 h-4" /> Add Training Point
                 </button>
              )}
           </div>
        </AdminFormSection>

        {/* 2. Events */}
        <AdminFormSection title={`2. Training Events (${form.events?.length || 0}/3)`} icon="📅" isOpen={activeSection === 'events'} onToggle={() => setActiveSection(activeSection === 'events' ? null : 'events')}>
           <div className="space-y-6">
              <SortableListContext
                items={form.events || []}
                onChange={val => setForm({ ...form, events: val })}
                renderItem={(ev, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
                  <div ref={setNodeRef} style={style} className={`p-8 bg-white border border-slate-100 rounded-4xl relative shadow-sm hover:shadow-lg transition-all ${isDragging ? 'shadow-2xl z-50 ring-4 ring-blue-50 bg-white' : ''}`}>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                         <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-200 hover:text-[#2563EB] transition-colors p-1" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                           <div className="w-5 h-0.5 bg-current mb-0.5 rounded-full" />
                           <div className="w-5 h-0.5 bg-current rounded-full" />
                         </div>
                         <span className="text-[10px] font-black uppercase text-slate-400">Event #{i+1}</span>
                      </div>
                      <button type="button" onClick={() => setForm({...form, events: form.events.filter((_, idx) => idx !== i)})} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-4 h-4"/></button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-6">
                          <div>
                             <label className={labelBase}>Event Name</label>
                             <input className={inputBase} value={ev.eventName} onChange={e => {
                               const c = [...form.events]; c[i].eventName = e.target.value; setForm({...form, events: c});
                             }} />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className={labelBase}>Sr. No</label>
                                <input className={inputBase} value={ev.srNo} onChange={e => {
                                  const c = [...form.events]; c[i].srNo = e.target.value; setForm({...form, events: c});
                                }} />
                             </div>
                             <div>
                                <label className={labelBase}>Date</label>
                                <input className={inputBase} value={ev.conductionDate} placeholder="e.g. 15 Mar 2025" onChange={e => {
                                  const c = [...form.events]; c[i].conductionDate = e.target.value; setForm({...form, events: c});
                                }} />
                             </div>
                          </div>
                          <div>
                             <label className={labelBase}>Resource Person / Details</label>
                             <textarea maxLength={350} className={inputBase + " h-24 resize-none"} value={ev.resourcePerson} onChange={e => {
                               const c = [...form.events]; c[i].resourcePerson = e.target.value; setForm({...form, events: c});
                             }} />
                          </div>
                       </div>
                       <div className="relative group rounded-3xl border-2 border-dashed border-slate-100 bg-slate-50/50 aspect-video flex flex-col items-center justify-center hover:bg-blue-50/30 hover:border-blue-200 transition-all cursor-pointer overflow-hidden shadow-inner">
                          <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={e => {
                             if (e.target.files?.[0]) {
                               const c = [...form.events]; c[i].image = e.target.files[0]; setForm({...form, events: c});
                             }
                          }} />
                          {ev.image ? (
                            <img src={ev.image instanceof File ? URL.createObjectURL(ev.image) : resolveApiUrl(ev.image)} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="flex flex-col items-center justify-center gap-2">
                               <ImageIcon className="w-8 h-8 text-slate-300" />
                               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Event Photo</span>
                            </div>
                          )}
                       </div>
                    </div>
                  </div>
                )}
              />
              {form.events.length < 3 && (
                 <button type="button" onClick={() => setForm({...form, events: [...form.events, {srNo: String(form.events.length + 1), eventName: '', resourcePerson: '', conductionDate: '', image: null}]})} className="w-full flex items-center justify-center gap-3 border-4 border-dashed border-slate-100 rounded-4xl p-10 hover:border-blue-400 hover:bg-blue-50/30 transition-all text-slate-300 hover:text-blue-500">
                    <Plus className="w-8 h-8" />
                    <span className="text-[11px] font-black uppercase tracking-widest">Add Training Event</span>
                 </button>
              )}
           </div>
        </AdminFormSection>

        {/* 3. Career Guidance */}
        <AdminFormSection title="3. Career Guidance" icon="🧭" isOpen={activeSection === 'career'} onToggle={() => setActiveSection(activeSection === 'career' ? null : 'career')}>
           <div className="space-y-10">
              <div>
                 <label className={labelBase}>Guidance Highlights (Max 4)</label>
                 <div className="space-y-3">
                    {form.careerGuidance.guidancePoints.map((pt, i) => (
                       <div key={i} className="flex items-center gap-3">
                          <input className={inputBase + " h-10 py-1.5 flex-1"} value={pt.point} placeholder="Guidance point..." onChange={e => {
                             const c = {...form.careerGuidance}; c.guidancePoints[i].point = e.target.value; setForm({...form, careerGuidance: c});
                          }} />
                          <button type="button" onClick={() => {
                             const c = {...form.careerGuidance}; c.guidancePoints.splice(i, 1); setForm({...form, careerGuidance: c});
                          }} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-4 h-4"/></button>
                       </div>
                    ))}
                    {form.careerGuidance.guidancePoints.length < 4 && (
                       <button type="button" onClick={() => {
                          const c = {...form.careerGuidance}; c.guidancePoints.push({point: ''}); setForm({...form, careerGuidance: c});
                       }} className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:text-blue-600 transition-colors ml-1">+ Add Point</button>
                    )}
                 </div>
              </div>

              <div className="pt-8 border-t border-slate-50">
                 <label className={labelBase}>Career seminars (Max 8)</label>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SortableListContext
                       items={form.careerGuidance.seminars}
                       onChange={val => setForm({...form, careerGuidance: {...form.careerGuidance, seminars: val}})}
                       renderItem={(sem, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
                          <div ref={setNodeRef} style={style} className={`p-5 bg-white border border-slate-100 rounded-3xl relative shadow-sm hover:shadow-md transition-all ${isDragging ? 'shadow-xl z-50 ring-4 ring-blue-50 bg-white' : ''}`}>
                             <div className="flex items-center justify-between mb-4">
                                <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-200 hover:text-[#2563EB] transition-colors p-1" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                                   <div className="w-4 h-0.5 bg-current mb-0.5 rounded-full" />
                                   <div className="w-4 h-0.5 bg-current rounded-full" />
                                </div>
                                <button type="button" onClick={() => {
                                   const c = {...form.careerGuidance}; c.seminars.splice(i, 1); setForm({...form, careerGuidance: c});
                                }} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-4 h-4"/></button>
                             </div>
                             <div className="relative group rounded-2xl border-2 border-dashed border-slate-100 bg-slate-50/50 aspect-video flex flex-col items-center justify-center hover:bg-blue-50/30 hover:border-blue-200 transition-all cursor-pointer overflow-hidden mb-4 shadow-inner">
                                <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={e => {
                                   if (e.target.files?.[0]) {
                                      const c = {...form.careerGuidance}; c.seminars[i].image = e.target.files[0]; setForm({...form, careerGuidance: c});
                                   }
                                }} />
                                {sem.image ? (
                                   <img src={sem.image instanceof File ? URL.createObjectURL(sem.image) : resolveApiUrl(sem.image)} alt="" className="w-full h-full object-cover" />
                                ) : (
                                   <ImageIcon className="w-6 h-6 text-slate-300" />
                                )}
                             </div>
                             <div className="space-y-4">
                                <input className={inputBase + " h-9 text-[11px] py-1.5"} placeholder="Seminar Title" value={sem.title} onChange={e => {
                                   const c = {...form.careerGuidance}; c.seminars[i].title = e.target.value; setForm({...form, careerGuidance: c});
                                }} />
                                <input className={inputBase + " h-9 text-[11px] py-1.5"} placeholder="Resource Details" value={sem.resourceDetails} onChange={e => {
                                   const c = {...form.careerGuidance}; c.seminars[i].resourceDetails = e.target.value; setForm({...form, careerGuidance: c});
                                }} />
                             </div>
                          </div>
                       )}
                    />
                    {form.careerGuidance.seminars.length < 8 && (
                       <button type="button" onClick={() => {
                          const c = {...form.careerGuidance}; c.seminars.push({title: '', resourceDetails: '', image: null}); setForm({...form, careerGuidance: c});
                       }} className="flex flex-col items-center justify-center gap-3 border-4 border-dashed border-slate-100 rounded-4xl p-8 hover:border-blue-400 hover:bg-blue-50/30 transition-all text-slate-300 hover:text-blue-500 min-h-[220px]">
                          <Plus className="w-8 h-8" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Add Seminar</span>
                       </button>
                    )}
                 </div>
              </div>
           </div>
        </AdminFormSection>

        {/* 4. Internship Steps */}
        <AdminFormSection title={`4. Internship Procedure (${form.internshipSteps?.length || 0}/5)`} icon="📝" isOpen={activeSection === 'internship'} onToggle={() => setActiveSection(activeSection === 'internship' ? null : 'internship')}>
           <div className="space-y-3">
              <SortableListContext
                items={form.internshipSteps || []}
                onChange={val => setForm({ ...form, internshipSteps: val })}
                renderItem={(step, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
                  <div ref={setNodeRef} style={style} className={`flex items-center gap-3 p-2 bg-white border border-slate-100 rounded-2xl relative shadow-sm hover:shadow-md transition-all ${isDragging ? 'shadow-xl z-50 ring-4 ring-blue-50 bg-white' : ''}`}>
                    <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-200 hover:text-[#2563EB] transition-colors p-1" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                       <div className="w-4 h-0.5 bg-current mb-0.5 rounded-full" />
                       <div className="w-4 h-0.5 bg-current rounded-full" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-[10px] font-black text-slate-400 shrink-0 border border-slate-100">#{i+1}</div>
                    <input className={inputBase + " flex-1 h-10 py-1.5"} value={step.step} placeholder="Enter procedure step..." onChange={e => {
                       const c = [...form.internshipSteps]; c[i].step = e.target.value; setForm({...form, internshipSteps: c});
                    }} />
                    <button type="button" onClick={() => setForm({...form, internshipSteps: form.internshipSteps.filter((_, idx) => idx !== i)})} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-4 h-4"/></button>
                  </div>
                )}
              />
              {form.internshipSteps.length < 5 && (
                 <button type="button" onClick={() => setForm({...form, internshipSteps: [...form.internshipSteps, {step: ''}]})} className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-2xl p-3 text-slate-400 font-bold hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/30 transition-all uppercase tracking-widest text-[10px]">
                    <Plus className="w-4 h-4" /> Add Procedure Step
                 </button>
              )}
           </div>
        </AdminFormSection>

        {/* 5. Gallery */}
        <AdminFormSection title={`5. Training Gallery (${form.trainingGallery?.length || 0}/4)`} icon="🖼️" isOpen={activeSection === 'gallery'} onToggle={() => setActiveSection(activeSection === 'gallery' ? null : 'gallery')}>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <SortableListContext
                items={form.trainingGallery || []}
                onChange={val => setForm({ ...form, trainingGallery: val })}
                renderItem={(item, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
                  <div ref={setNodeRef} style={style} className={`p-4 bg-white border border-slate-100 rounded-3xl relative shadow-sm hover:shadow-md transition-all ${isDragging ? 'shadow-xl z-50 ring-4 ring-blue-50 bg-white' : ''}`}>
                    <div className="flex items-center justify-between mb-3 border-b border-slate-50 pb-3">
                       <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-200 hover:text-[#2563EB] transition-colors p-1" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                         <div className="w-4 h-0.5 bg-current mb-0.5 rounded-full" />
                         <div className="w-4 h-0.5 bg-current rounded-full" />
                       </div>
                       <button type="button" onClick={() => setForm({...form, trainingGallery: form.trainingGallery.filter((_, idx) => idx !== i)})} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-4 h-4"/></button>
                    </div>
                    <div className="relative group rounded-2xl border-2 border-dashed border-slate-100 bg-slate-50/50 aspect-square flex flex-col items-center justify-center hover:bg-blue-50/30 hover:border-blue-200 transition-all cursor-pointer overflow-hidden mb-4 shadow-inner">
                       <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={e => {
                          if (e.target.files?.[0]) {
                             const c = [...form.trainingGallery]; c[i].image = e.target.files[0]; setForm({...form, trainingGallery: c});
                          }
                       }} />
                       {item.image ? (
                          <img src={item.image instanceof File ? URL.createObjectURL(item.image) : resolveApiUrl(item.image)} alt="" className="w-full h-full object-cover" />
                       ) : (
                          <ImageIcon className="w-6 h-6 text-slate-300" />
                       )}
                    </div>
                    <input className={inputBase + " h-9 text-[10px] py-1.5"} placeholder="Label" value={item.label} onChange={e => {
                       const c = [...form.trainingGallery]; c[i].label = e.target.value; setForm({...form, trainingGallery: c});
                    }} />
                  </div>
                )}
              />
              {form.trainingGallery.length < 4 && (
                 <button type="button" onClick={() => setForm({...form, trainingGallery: [...form.trainingGallery, {label: '', image: null}]})} className="flex flex-col items-center justify-center gap-3 border-4 border-dashed border-slate-100 rounded-4xl hover:border-blue-400 hover:bg-blue-50/30 transition-all text-slate-300 hover:text-blue-500 min-h-[160px]">
                    <Plus className="w-6 h-6" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-center">Add Photo</span>
                 </button>
              )}
           </div>
        </AdminFormSection>
      </div>
    </div>
  );
};

export default MMSTrainingForm;
