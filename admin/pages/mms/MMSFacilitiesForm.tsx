import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Image as ImageIcon, CheckCircle, AlertTriangle } from 'lucide-react';
import type { MMSFacilitiesPayload, GalleryItem } from '../../types';
import { mmsFacilitiesApi } from '../../api/mmsFacilitiesApi';
import { resolveApiUrl } from '../../../services/api';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';
import { SortableListContext } from '../../components/SortableList';
import AdminFormSection from '../../components/AdminFormSection';

const inputBase = "w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all text-slate-700";
const labelBase = "block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1";

const resolvePreviewImage = (image: unknown): string => {
  if (typeof image === 'string') return resolveApiUrl(image);
  if (image instanceof Blob) return URL.createObjectURL(image);
  if (image && typeof image === 'object' && 'url' in image && typeof (image as { url?: unknown }).url === 'string') {
    return resolveApiUrl((image as { url: string }).url) || '';
  }
  return '';
};

const emptyForm: MMSFacilitiesPayload = {
  computerLabs: [],
  library: [],
  seminarHall: [],
  classrooms: [],
  gymkhana: []
};

const MMSFacilitiesForm: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<MMSFacilitiesPayload>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [activeAccordionSection, setActiveAccordionSection] = useState<string | null>('computerLabs');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await mmsFacilitiesApi.get();
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
      await mmsFacilitiesApi.update(form);
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

  const renderGallerySection = (key: keyof MMSFacilitiesPayload, title: string, icon: string, max: number, charLimit: number) => {
    const items = (form[key] as GalleryItem[]) || [];
    return (
      <AdminFormSection 
        title={`${title} (${items.length}/${max})`} 
        icon={icon}
        isOpen={activeAccordionSection === key}
        onToggle={() => setActiveAccordionSection(activeAccordionSection === key ? null : key)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SortableListContext
            items={items}
            onChange={val => setForm({ ...form, [key]: val })}
            renderItem={(item, i, id, dragHandleProps, setNodeRef, style, isDragging, actions) => (
              <div ref={setNodeRef} style={style} className={`p-4 bg-white border border-slate-100 rounded-3xl relative shadow-sm hover:shadow-md transition-all ${isDragging ? 'shadow-xl z-50 ring-4 ring-blue-50 bg-white' : ''}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-200 hover:text-[#2563EB] transition-colors p-1" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                    <div className="w-4 h-0.5 bg-current mb-0.5 rounded-full" />
                    <div className="w-4 h-0.5 bg-current rounded-full" />
                  </div>
                  <button type="button" onClick={() => {
                    const c = [...items]; c.splice(i, 1); setForm({...form, [key]: c});
                  }} className="text-slate-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-all"><Trash2 className="w-4 h-4"/></button>
                </div>
                
                <div className="relative group rounded-2xl border-2 border-dashed border-slate-100 bg-slate-50/50 aspect-video flex flex-col items-center justify-center hover:bg-blue-50/30 hover:border-blue-200 transition-all cursor-pointer overflow-hidden mb-4">
                  <input id={`mms-fac-file-${key}-${i}`} name={`mms-fac-file-${key}-${i}`} aria-label="mmsfacilitiesform field" type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                       const c = [...items]; c[i].image = e.target.files[0]; setForm({...form, [key]: c});
                    }
                  }}/>
                  {item.image ? (
                    <img src={resolvePreviewImage(item.image)} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2">
                       <ImageIcon className="w-6 h-6 text-slate-300 group-hover:text-blue-500 transition-colors" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Upload Image</span>
                    </div>
                  )}
                </div>
                
                <div className="relative pt-2">
                  <label className={labelBase}>Label</label>
                  <input id={`mms-fac-label-${key}-${i}`} name={`mms-fac-label-${key}-${i}`} aria-label="mmsfacilitiesform field" className={inputBase} placeholder="Enter label..." value={item.label || ''} maxLength={charLimit} onChange={e => {
                      const c = [...items]; c[i].label = e.target.value; setForm({...form, [key]: c});
                  }} />
                </div>
              </div>
            )}
          />
          {items.length < max && (
            <button type="button" onClick={() => setForm({...form, [key]: [...items, {label: '', image: null}]})} className="flex flex-col items-center justify-center gap-3 border-4 border-dashed border-slate-100 rounded-4xl p-10 hover:border-blue-400 hover:bg-blue-50/30 transition-all text-slate-300 hover:text-blue-500">
               <Plus className="w-8 h-8" />
               <span className="text-[10px] font-black uppercase tracking-widest">Add Image</span>
            </button>
          )}
        </div>
      </AdminFormSection>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-fade-in relative pt-6">
      <PageEditorHeader
        title="Facilities"
        description="Manage the image galleries for college facilities and labs."
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
        {renderGallerySection('computerLabs', 'Computer Labs', '💻', 10, 50)}
        {renderGallerySection('library', 'Library', '📚', 10, 50)}
        {renderGallerySection('seminarHall', 'Seminar Hall', '🎤', 10, 50)}
        {renderGallerySection('classrooms', 'Classrooms', '🏫', 10, 50)}
        {renderGallerySection('gymkhana', 'Gymkhana', '🏋️', 10, 50)}
      </form>
    </div>
  );
};

export default MMSFacilitiesForm;
