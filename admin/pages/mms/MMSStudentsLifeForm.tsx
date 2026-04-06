import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Image as ImageIcon, CheckCircle, AlertTriangle, FileText, GripVertical } from 'lucide-react';
import type { MMSStudentsLifePayload, GalleryItem } from '../../types';
import { mmsStudentsLifeApi } from '../../api/mmsStudentsLifeApi';
import { resolveApiUrl } from '../../../services/api';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';
import { SortableListContext } from '../../components/SortableList';
import AdminFormSection from '../../components/AdminFormSection';

const inputBase = "w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all text-slate-700";
const labelBase = "block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1";

const emptyForm: MMSStudentsLifePayload = {
  overview: { description: '', highlights: [] },
  vEcstatic: { description: '', activities: [] as any, images: [] },
  dlle: { description: '', projects: [] as any, outcomes: [] as any, images: [] },
  bookReview: { description: '', benefits: [] as any, images: [] },
  addOnCourses: { description: '', topics: [] as any, objectives: [] as any, images: [] },
  advanceExcel: { description: '', objectives: [] as any, images: [] },
  powerBi: { description: '', objectives: [] as any, images: [] },
  industrySessions: { description: '', learningPoints: [] as any, sessions: [] },
  ideation: { description: '', images: [] },
  oscillations: { description: '', images: [] },
  nsimTraining: { description: '', images: [] },
  rankers: [],
  customEvents: [],
  pdfs: []
};

const MMSStudentsLifeForm: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<MMSStudentsLifePayload>(emptyForm);
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
      const res = await mmsStudentsLifeApi.get();
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
      await mmsStudentsLifeApi.update(form);
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

  const renderGallery = (items: GalleryItem[], max: number, onChange: (items: GalleryItem[]) => void) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <SortableListContext
        items={items}
        onChange={onChange}
        renderItem={(item, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
          <div ref={setNodeRef} style={style} className={`p-4 bg-white border border-slate-100 rounded-3xl relative shadow-sm hover:shadow-md transition-all ${isDragging ? 'shadow-xl z-50 ring-4 ring-blue-50 bg-white' : ''}`}>
             <div className="flex items-center justify-between mb-3 border-b border-slate-50 pb-3">
               <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-200 hover:text-[#2563EB] transition-colors p-1" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                 <div className="w-4 h-0.5 bg-current mb-0.5 rounded-full" />
                 <div className="w-4 h-0.5 bg-current rounded-full" />
               </div>
               <button type="button" onClick={() => onChange(items.filter((_, idx) => idx !== i))} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-4 h-4"/></button>
             </div>
             <div className="relative group rounded-2xl border-2 border-dashed border-slate-100 bg-slate-50/50 aspect-square flex flex-col items-center justify-center hover:bg-blue-50/30 hover:border-blue-200 transition-all cursor-pointer overflow-hidden mb-4 shadow-inner">
                <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={e => {
                   if (e.target.files?.[0]) {
                      const c = [...items]; c[i].image = e.target.files[0]; onChange(c);
                   }
                }} />
                {item.image ? (
                   <img src={item.image instanceof File ? URL.createObjectURL(item.image) : resolveApiUrl(item.image)} alt="" className="w-full h-full object-cover" />
                ) : (
                   <ImageIcon className="w-6 h-6 text-slate-300" />
                )}
             </div>
             <input className={inputBase + " h-9 text-[10px] py-1.5"} placeholder="Label" value={item.label} onChange={e => {
                const c = [...items]; c[i].label = e.target.value; onChange(c);
             }} />
          </div>
        )}
      />
      {items.length < max && (
        <button type="button" onClick={() => onChange([...items, { label: '', image: null }])} className="flex flex-col items-center justify-center gap-3 border-4 border-dashed border-slate-100 rounded-4xl hover:border-blue-400 hover:bg-blue-50/30 transition-all text-slate-300 hover:text-blue-500 min-h-[200px]">
           <Plus className="w-6 h-6" />
           <span className="text-[10px] font-black uppercase tracking-widest">Add Photo</span>
        </button>
      )}
    </div>
  );

  const renderSimpleList = (items: { text: string }[], max: number, onChange: (items: { text: string }[]) => void) => (
     <div className="space-y-3">
        <SortableListContext
          items={items}
          onChange={onChange}
          renderItem={(item, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
            <div ref={setNodeRef} style={style} className={`flex items-center gap-3 p-2 bg-white border border-slate-100 rounded-2xl relative shadow-sm hover:shadow-md transition-all ${isDragging ? 'shadow-xl z-50 ring-4 ring-blue-50 bg-white' : ''}`}>
               <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-200 hover:text-[#2563EB] transition-colors p-1" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                 <div className="w-4 h-0.5 bg-current mb-0.5 rounded-full" />
                 <div className="w-4 h-0.5 bg-current rounded-full" />
               </div>
               <input className={inputBase + " flex-1 h-10 py-1.5"} value={item.text} placeholder="Item text..." onChange={e => {
                  const c = [...items]; c[i].text = e.target.value; onChange(c);
               }} />
               <button type="button" onClick={() => onChange(items.filter((_, idx) => idx !== i))} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-4 h-4"/></button>
            </div>
          )}
        />
        {items.length < max && (
           <button type="button" onClick={() => onChange([...items, { text: '' }])} className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-2xl p-3 text-slate-400 font-bold hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/30 transition-all uppercase tracking-widest text-[10px]">
              <Plus className="w-4 h-4" /> Add Item
           </button>
        )}
     </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-fade-in relative pt-6">
      <PageEditorHeader
        title="Students Life"
        description="Manage extra-curricular activities, festivals, and specialized training programs."
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
        {/* 1. Overview */}
        <AdminFormSection title="1. Section Overview" icon="🏡" isOpen={activeSection === 'overview'} onToggle={() => setActiveSection(activeSection === 'overview' ? null : 'overview')}>
           <div className="space-y-6">
              <div>
                 <label className={labelBase}>Main Description</label>
                 <textarea maxLength={500} className={inputBase + " h-32 resize-none"} value={form.overview.description} onChange={e => setForm({...form, overview: {...form.overview, description: e.target.value}})} />
              </div>
              <div className="space-y-2">
                 <label className={labelBase}>Highlights</label>
                 {renderSimpleList(form.overview.highlights, 4, (l) => setForm({...form, overview: {...form.overview, highlights: l as any}}))}
              </div>
           </div>
        </AdminFormSection>

        {/* 2. V-Ecstatic */}
        <AdminFormSection title="2. V-Ecstatic Festival" icon="🎭" isOpen={activeSection === 'v-ecstatic'} onToggle={() => setActiveSection(activeSection === 'v-ecstatic' ? null : 'v-ecstatic')}>
           <div className="space-y-6">
              <div>
                 <label className={labelBase}>Event Description</label>
                 <textarea maxLength={300} className={inputBase + " h-24 resize-none"} value={form.vEcstatic.description} onChange={e => setForm({...form, vEcstatic: {...form.vEcstatic, description: e.target.value}})} />
              </div>
              <div className="space-y-2">
                 <label className={labelBase}>Activities</label>
                 {renderSimpleList(form.vEcstatic.activities as any, 5, (l) => setForm({...form, vEcstatic: {...form.vEcstatic, activities: l as any}}))}
              </div>
              <div className="space-y-2 pt-4 border-t border-slate-50">
                 <label className={labelBase}>Event Gallery</label>
                 {renderGallery(form.vEcstatic.images, 5, (g) => setForm({...form, vEcstatic: {...form.vEcstatic, images: g}}))}
              </div>
           </div>
        </AdminFormSection>

        {/* 3. DLLE */}
        <AdminFormSection title="3. DLLE Extension" icon="🌱" isOpen={activeSection === 'dlle'} onToggle={() => setActiveSection(activeSection === 'dlle' ? null : 'dlle')}>
           <div className="space-y-6">
              <div>
                 <label className={labelBase}>Section Description</label>
                 <textarea maxLength={300} className={inputBase + " h-24 resize-none"} value={form.dlle.description} onChange={e => setForm({...form, dlle: {...form.dlle, description: e.target.value}})} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                    <label className={labelBase}>Projects</label>
                    {renderSimpleList(form.dlle.projects as any, 5, (l) => setForm({...form, dlle: {...form.dlle, projects: l as any}}))}
                 </div>
                 <div className="space-y-2">
                    <label className={labelBase}>Outcomes</label>
                    {renderSimpleList(form.dlle.outcomes as any, 3, (l) => setForm({...form, dlle: {...form.dlle, outcomes: l as any}}))}
                 </div>
              </div>
              <div className="space-y-2 pt-4 border-t border-slate-50">
                 <label className={labelBase}>Gallery</label>
                 {renderGallery(form.dlle.images, 3, (g) => setForm({...form, dlle: {...form.dlle, images: g}}))}
              </div>
           </div>
        </AdminFormSection>

        {/* 4. Specialized Training (PowerBI, Excel, etc.) */}
        <AdminFormSection title="4. Specialized Training Programs" icon="📈" isOpen={activeSection === 'training'} onToggle={() => setActiveSection(activeSection === 'training' ? null : 'training')}>
           <div className="space-y-12">
              <div className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100 space-y-6">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-[#2563EB] mb-4">Power BI Course</h4>
                 <textarea maxLength={300} className={inputBase + " h-24 bg-white"} value={form.powerBi.description} placeholder="Description" onChange={e => setForm({...form, powerBi: {...form.powerBi, description: e.target.value}})} />
                 {renderSimpleList(form.powerBi.objectives as any, 5, (l) => setForm({...form, powerBi: {...form.powerBi, objectives: l as any}}))}
                 {renderGallery(form.powerBi.images, 5, (g) => setForm({...form, powerBi: {...form.powerBi, images: g}}))}
              </div>
              <div className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100 space-y-6">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-[#2563EB] mb-4">Advanced Excel</h4>
                 <textarea maxLength={300} className={inputBase + " h-24 bg-white"} value={form.advanceExcel.description} placeholder="Description" onChange={e => setForm({...form, advanceExcel: {...form.advanceExcel, description: e.target.value}})} />
                 {renderSimpleList(form.advanceExcel.objectives as any, 5, (l) => setForm({...form, advanceExcel: {...form.advanceExcel, objectives: l as any}}))}
                 {renderGallery(form.advanceExcel.images, 5, (g) => setForm({...form, advanceExcel: {...form.advanceExcel, images: g}}))}
              </div>
           </div>
        </AdminFormSection>

        {/* 5. Custom Dynamic Events */}
        <AdminFormSection title={`5. Dynamic Events (${form.customEvents?.length || 0})`} icon="🎡" isOpen={activeSection === 'custom'} onToggle={() => setActiveSection(activeSection === 'custom' ? null : 'custom')}>
           <div className="space-y-8">
              <SortableListContext
                items={form.customEvents}
                onChange={val => setForm({...form, customEvents: val})}
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
                      <button type="button" onClick={() => setForm({...form, customEvents: form.customEvents.filter((_, idx) => idx !== i)})} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-4 h-4"/></button>
                    </div>
                    <div className="space-y-6">
                       <div>
                          <label className={labelBase}>Event Name</label>
                          <input className={inputBase} value={ev.name} onChange={e => {
                             const c = [...form.customEvents]; c[i].name = e.target.value; c[i].slug = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''); setForm({...form, customEvents: c});
                          }} />
                       </div>
                       <div>
                          <label className={labelBase}>Event Description</label>
                          <textarea maxLength={800} className={inputBase + " h-32 resize-none"} value={ev.description} onChange={e => {
                             const c = [...form.customEvents]; c[i].description = e.target.value; setForm({...form, customEvents: c});
                          }} />
                       </div>
                       <div className="pt-4 border-t border-slate-50">
                          <label className={labelBase}>Event Gallery</label>
                          {renderGallery(ev.images || [], 6, (g) => {
                             const c = [...form.customEvents]; c[i].images = g; setForm({...form, customEvents: c});
                          })}
                       </div>
                    </div>
                  </div>
                )}
              />
              <button type="button" onClick={() => setForm({...form, customEvents: [...form.customEvents, {id: Date.now().toString(), name: '', slug: '', description: '', images: []}]})} className="w-full flex items-center justify-center gap-3 border-4 border-dashed border-slate-100 rounded-4xl p-10 hover:border-blue-400 hover:bg-blue-50/30 transition-all text-slate-300 hover:text-blue-500">
                 <Plus className="w-8 h-8" />
                 <span className="text-[11px] font-black uppercase tracking-widest">Add New Dynamic Event</span>
              </button>
           </div>
        </AdminFormSection>

        {/* 6. PDF Documents */}
        <AdminFormSection title={`6. PDF Resources (${form.pdfs?.length || 0}/2)`} icon="📄" isOpen={activeSection === 'pdfs'} onToggle={() => setActiveSection(activeSection === 'pdfs' ? null : 'pdfs')}>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {form.pdfs.map((pdf, i) => (
                <div key={i} className="p-6 bg-white border border-slate-100 rounded-3xl relative shadow-sm hover:shadow-md transition-all">
                  <button type="button" onClick={() => setForm({...form, pdfs: form.pdfs.filter((_, idx) => idx !== i)})} className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all z-20"><Trash2 className="w-4 h-4"/></button>
                  <div className="relative group rounded-2xl border-2 border-dashed border-slate-100 bg-slate-50/50 h-32 flex flex-col items-center justify-center hover:bg-blue-50/30 hover:border-blue-200 transition-all cursor-pointer overflow-hidden shadow-inner mb-4">
                     <FileText className="w-8 h-8 text-slate-300 group-hover:text-blue-500 transition-colors mb-2" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">PDF Document</span>
                  </div>
                  <div className="space-y-4">
                     <input className={inputBase} value={pdf.title} placeholder="Document Title" onChange={e => {
                        const c = [...form.pdfs]; c[i].title = e.target.value; setForm({...form, pdfs: c});
                     }} />
                     <input className={inputBase} value={pdf.url} placeholder="https://..." onChange={e => {
                        const c = [...form.pdfs]; c[i].url = e.target.value; setForm({...form, pdfs: c});
                     }} />
                  </div>
                </div>
              ))}
              {form.pdfs.length < 2 && (
                 <button type="button" onClick={() => setForm({...form, pdfs: [...form.pdfs, {title: '', url: ''}]})} className="flex flex-col items-center justify-center gap-3 border-4 border-dashed border-slate-100 rounded-4xl p-10 hover:border-blue-400 hover:bg-blue-50/30 transition-all text-slate-300 hover:text-blue-500 min-h-[240px]">
                    <Plus className="w-8 h-8" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Add Rules PDF</span>
                 </button>
              )}
           </div>
        </AdminFormSection>
      </div>
    </div>
  );
};

export default MMSStudentsLifeForm;
