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

const MMSStudentPlacementsForm: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<TrainingPlacementPayload>({
    studentPlacements: [],
    recruitersBanner: {},
    placementGallery: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [activeSection, setActiveSection] = useState<string | null>('students');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await trainingPlacementApi.get();
      if (res.data) {
        setForm(prev => ({
          ...prev,
          ...res.data,
          studentPlacements: res.data.studentPlacements || [],
          recruitersBanner: res.data.recruitersBanner || {},
          placementGallery: res.data.placementGallery || [],
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
        title="Student Placements"
        description="Manage placed students, recruiter banners, and the placement event gallery."
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
        {/* SECTION 1: Student Placements */}
        <AdminFormSection title={`1. Placed Students (${form.studentPlacements?.length || 0}/6)`} icon="🎓" isOpen={activeSection === 'students'} onToggle={() => setActiveSection(activeSection === 'students' ? null : 'students')}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SortableListContext
              items={form.studentPlacements || []}
              onChange={val => setForm({ ...form, studentPlacements: val })}
              renderItem={(item, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
                <div ref={setNodeRef} style={style} className={`p-6 bg-white border border-slate-100 rounded-3xl relative shadow-sm hover:shadow-md transition-all ${isDragging ? 'shadow-xl z-50 ring-4 ring-blue-50 bg-white' : ''}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-200 hover:text-[#2563EB] transition-colors p-1" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                      <div className="w-5 h-0.5 bg-current mb-0.5 rounded-full" />
                      <div className="w-5 h-0.5 bg-current rounded-full" />
                    </div>
                    <button type="button" onClick={() => {
                      const c = [...form.studentPlacements!]; c.splice(i, 1); setForm({ ...form, studentPlacements: c });
                    }} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                  </div>

                  <div className="relative group rounded-2xl border-2 border-dashed border-slate-100 bg-slate-50/50 aspect-square flex flex-col items-center justify-center hover:bg-blue-50/30 hover:border-blue-200 transition-all cursor-pointer overflow-hidden mb-6 shadow-inner">
                    <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={e => {
                        if (e.target.files?.[0]) {
                           const c = [...form.studentPlacements!]; c[i].image = e.target.files[0]; setForm({...form, studentPlacements: c});
                        }
                    }} />
                    {item.image ? (
                      <img src={item.image instanceof File ? URL.createObjectURL(item.image) : resolveApiUrl(item.image)} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-1">
                         <ImageIcon className="w-6 h-6 text-slate-300 group-hover:text-blue-500 transition-colors" />
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Photo</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-4 gap-3">
                       <div className="col-span-1">
                          <label className={labelBase}>Sr.</label>
                          <input className={inputBase + " px-2 text-center"} value={item.srNo} onChange={e => {
                             const c = [...form.studentPlacements!]; c[i].srNo = e.target.value; setForm({...form, studentPlacements: c});
                          }} />
                       </div>
                       <div className="col-span-3">
                          <label className={labelBase}>Student Name</label>
                          <input maxLength={25} className={inputBase} value={item.studentName} placeholder="Name" onChange={e => {
                             const c = [...form.studentPlacements!]; c[i].studentName = e.target.value; setForm({...form, studentPlacements: c});
                          }} />
                       </div>
                    </div>
                    <div>
                      <label className={labelBase}>Specialization</label>
                      <input maxLength={15} className={inputBase} value={item.specialization} placeholder="e.g. Finance" onChange={e => {
                         const c = [...form.studentPlacements!]; c[i].specialization = e.target.value; setForm({...form, studentPlacements: c});
                      }} />
                    </div>
                    <div>
                      <label className={labelBase}>Company</label>
                      <input maxLength={40} className={inputBase} value={item.company} placeholder="Company Name" onChange={e => {
                         const c = [...form.studentPlacements!]; c[i].company = e.target.value; setForm({...form, studentPlacements: c});
                      }} />
                    </div>
                  </div>
                </div>
              )}
            />
            {(form.studentPlacements?.length || 0) < 6 && (
              <button type="button" onClick={() => setForm({ ...form, studentPlacements: [...(form.studentPlacements || []), { srNo: String((form.studentPlacements?.length || 0) + 1), studentName: '', specialization: '', company: '', image: null }] })} className="flex flex-col items-center justify-center gap-3 border-4 border-dashed border-slate-100 rounded-4xl p-10 hover:border-blue-400 hover:bg-blue-50/30 transition-all text-slate-300 hover:text-blue-500 min-h-[300px]">
                <Plus className="w-8 h-8" />
                <span className="text-[10px] font-black uppercase tracking-widest">Add Placed Student</span>
              </button>
            )}
          </div>
        </AdminFormSection>

        {/* SECTION 2: Recruiters Banner */}
        <AdminFormSection title="2. Recruiters Showcase" icon="🏢" isOpen={activeSection === 'recruiters'} onToggle={() => setActiveSection(activeSection === 'recruiters' ? null : 'recruiters')}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className={labelBase}>Section Title / Label</label>
                <input className={inputBase} placeholder="e.g. Our Top Recruiters" value={form.recruitersBanner?.label || ''} onChange={e => setForm({...form, recruitersBanner: {...form.recruitersBanner, label: e.target.value}})}/>
              </div>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">This banner typically displays an optimized grid of company logos. Ensure the uploaded image is high resolution for the best visual impact.</p>
            </div>
            <div className="relative group rounded-3xl border-2 border-dashed border-slate-100 bg-slate-50/50 aspect-video flex flex-col items-center justify-center hover:bg-blue-50/30 hover:border-blue-200 transition-all cursor-pointer overflow-hidden shadow-inner">
               <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={e => {
                  if (e.target.files?.[0]) setForm({...form, recruitersBanner: {...form.recruitersBanner, image: e.target.files[0]}});
               }} />
               {form.recruitersBanner?.image ? (
                 <img src={form.recruitersBanner.image instanceof File ? URL.createObjectURL(form.recruitersBanner.image) : resolveApiUrl(form.recruitersBanner.image)} alt="" className="w-full h-full object-cover" />
               ) : (
                 <div className="flex flex-col items-center justify-center gap-2">
                    <ImageIcon className="w-8 h-8 text-slate-300" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Upload Banner Image</span>
                 </div>
               )}
            </div>
          </div>
        </AdminFormSection>

        {/* SECTION 3: Placement Gallery */}
        <AdminFormSection title={`3. Placement Event Gallery (${form.placementGallery?.length || 0}/8)`} icon="📸" isOpen={activeSection === 'gallery'} onToggle={() => setActiveSection(activeSection === 'gallery' ? null : 'gallery')}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <SortableListContext
              items={form.placementGallery || []}
              onChange={val => setForm({ ...form, placementGallery: val })}
              renderItem={(item, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
                <div ref={setNodeRef} style={style} className={`p-4 bg-white border border-slate-100 rounded-3xl relative shadow-sm hover:shadow-md transition-all ${isDragging ? 'shadow-xl z-50 ring-4 ring-blue-50 bg-white' : ''}`}>
                  <div className="flex items-center justify-between mb-3 border-b border-slate-50 pb-3">
                    <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-200 hover:text-[#2563EB] transition-colors p-1" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                      <div className="w-4 h-0.5 bg-current mb-0.5 rounded-full" />
                      <div className="w-4 h-0.5 bg-current rounded-full" />
                    </div>
                    <button type="button" onClick={() => setForm({...form, placementGallery: form.placementGallery.filter((_, idx) => idx !== i)})} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-4 h-4"/></button>
                  </div>
                  <div className="relative group rounded-2xl border-2 border-dashed border-slate-100 bg-slate-50/50 aspect-square flex flex-col items-center justify-center hover:bg-blue-50/30 hover:border-blue-200 transition-all cursor-pointer overflow-hidden mb-4 shadow-inner">
                     <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={e => {
                        if (e.target.files?.[0]) {
                           const c = [...form.placementGallery!]; c[i].image = e.target.files[0]; setForm({...form, placementGallery: c});
                        }
                     }} />
                     {item.image ? (
                        <img src={item.image instanceof File ? URL.createObjectURL(item.image) : resolveApiUrl(item.image)} alt="" className="w-full h-full object-cover" />
                     ) : (
                        <ImageIcon className="w-5 h-5 text-slate-300" />
                     )}
                  </div>
                  <input maxLength={35} className={inputBase + " py-1.5 px-3 text-[10px] h-9"} placeholder="Label" value={item.label} onChange={e => {
                     const c = [...form.placementGallery!]; c[i].label = e.target.value; setForm({...form, placementGallery: c});
                  }} />
                </div>
              )}
            />
            {form.placementGallery.length < 8 && (
              <button type="button" onClick={() => setForm({...form, placementGallery: [...form.placementGallery, {label: '', image: null}]})} className="flex flex-col items-center justify-center gap-3 border-4 border-dashed border-slate-100 rounded-4xl hover:border-blue-400 hover:bg-blue-50/30 transition-all text-slate-300 hover:text-blue-500 min-h-[160px]">
                <Plus className="w-6 h-6" />
                <span className="text-[10px] font-black uppercase tracking-widest text-center">Add Photo</span>
              </button>
            )}
          </div>
        </AdminFormSection>
      </form>
    </div>
  );
};

export default MMSStudentPlacementsForm;
