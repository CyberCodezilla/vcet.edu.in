import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image as ImageIcon, Video, Trash2, Plus, CheckCircle, AlertTriangle, GripVertical, FileText } from 'lucide-react';
import { resolveApiUrl } from '../../../services/api';
import type { MMSHomePayload } from '../../types';
import { mmsHomeApi } from '../../api/mmsHomeApi';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';
import { SortableListContext } from '../../components/SortableList';
import AdminFormSection from '../../components/AdminFormSection';

const inputBase = "w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all text-slate-700";
const labelBase = "block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1";

const emptyForm: MMSHomePayload = {
  sliders: Array(3).fill({ title: '', subtitle: '', image: null }),
  admission: { heading: '', description: '', banner: null },
  notices: [],
  notifications: [],
  internships: [],
  events: [],
  testimonials: [],
  videos: [],
  documents: []
};

const MMSHomepageForm: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<MMSHomePayload>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [activeSection, setActiveSection] = useState<string | null>('admission');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await mmsHomeApi.get();
      if (res.data) {
        const fetchedData = { ...res.data };
        ['sliders', 'notices', 'notifications', 'internships', 'events', 'testimonials', 'videos', 'documents'].forEach(key => {
           if (fetchedData[key] !== null && typeof fetchedData[key] === 'object' && !Array.isArray(fetchedData[key])) {
              fetchedData[key] = Object.values(fetchedData[key]);
           }
        });
        setForm({ ...emptyForm, ...fetchedData });
      }
    } catch (e) {
      console.warn('Could not fetch old data, assuming empty CMS state', e);
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
      await mmsHomeApi.update(form);
      setSuccessMsg('MMS Homepage updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update homepage');
    } finally {
      setSaving(false);
    }
  };

  const handleArrayChange = (key: keyof MMSHomePayload, index: number, field: string, value: any) => {
    setForm(prev => {
      const list = [...(prev[key] as any[])];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, [key]: list };
    });
  };

  if (loading) {
     return <div className="p-10 text-center"><div className="w-8 h-8 border-4 border-slate-200 border-t-[#2563EB] rounded-full animate-spin mx-auto mb-4" />Loading...</div>;
  }

  const resolvePreview = (file: any, type: 'image' | 'video' | 'pdf') => {
    if (!file) return null;
    if (typeof file === 'string') return resolveApiUrl(file);
    if (file instanceof Blob || file instanceof File) return URL.createObjectURL(file);
    if (file.url) return resolveApiUrl(file.url);
    return null;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-fade-in relative pt-6">
      <PageEditorHeader
        title="MMS Homepage"
        description="Manage the main landing page content for the MMS department."
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
        {/* Admission Highlight */}
        <AdminFormSection title="1. Admission Highlight" icon="🎓" isOpen={activeSection === 'admission'} onToggle={() => setActiveSection(activeSection === 'admission' ? null : 'admission')}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className={labelBase}>Heading</label>
              <input maxLength={60} value={form.admission.heading || ''} onChange={e => setForm({...form, admission: {...form.admission, heading: e.target.value}})} className={inputBase} placeholder="e.g. Admission 2024-25 Open" />
            </div>
            <div className="md:col-span-2">
              <label className={labelBase}>Description</label>
              <textarea maxLength={220} value={form.admission.description || ''} onChange={e => setForm({...form, admission: {...form.admission, description: e.target.value}})} className={inputBase + " h-24"} rows={2} placeholder="Brief description..." />
            </div>
            <div className="md:col-span-2">
              <label className={labelBase}>Banner Image</label>
              <div className="relative group rounded-2xl border-2 border-dashed border-slate-100 bg-slate-50/50 aspect-video md:aspect-[21/9] flex flex-col items-center justify-center hover:bg-blue-50/30 hover:border-blue-200 transition-all cursor-pointer overflow-hidden shadow-inner">
                <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={e => setForm({...form, admission: {...form.admission, banner: e.target.files?.[0] || null}})} />
                {form.admission.banner ? (
                  <img src={resolvePreview(form.admission.banner, 'image') || ''} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2">
                     <ImageIcon className="w-8 h-8 text-slate-300 group-hover:text-blue-500 transition-colors" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Upload Banner</span>
                  </div>
                )}
                {form.admission.banner && (
                  <button type="button" onClick={(e) => { e.stopPropagation(); setForm({...form, admission: {...form.admission, banner: null}}); }} className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-red-500 p-2 rounded-xl shadow-lg hover:bg-red-50 transition-all z-20 opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4"/></button>
                )}
              </div>
            </div>
          </div>
        </AdminFormSection>

        {/* Notice Board */}
        <AdminFormSection title={`2. Notice Board (${form.notices.length})`} icon="📢" isOpen={activeSection === 'notices'} onToggle={() => setActiveSection(activeSection === 'notices' ? null : 'notices')}>
          <div className="space-y-4">
            <SortableListContext
              items={form.notices}
              onChange={val => setForm({...form, notices: val})}
              renderItem={(item, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
                <div ref={setNodeRef} style={style} className={`p-6 bg-white border border-slate-100 rounded-3xl relative shadow-sm hover:shadow-md transition-all ${isDragging ? 'shadow-xl z-50 ring-4 ring-blue-50 bg-white' : ''}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-200 hover:text-[#2563EB] transition-colors p-1" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                      <div className="w-5 h-0.5 bg-current mb-0.5 rounded-full" />
                      <div className="w-5 h-0.5 bg-current mb-0.5 rounded-full" />
                      <div className="w-5 h-0.5 bg-current rounded-full" />
                    </div>
                    <button type="button" onClick={() => setForm({...form, notices: form.notices.filter((_, idx) => idx !== i)})} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"><Trash2 className="w-4 h-4"/></button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelBase}>Title</label>
                      <input maxLength={35} value={item.title || ''} onChange={e => handleArrayChange('notices', i, 'title', e.target.value)} className={inputBase} placeholder="e.g. CAP Admission" />
                    </div>
                    <div>
                      <label className={labelBase}>Label</label>
                      <input maxLength={20} value={item.label || ''} onChange={e => handleArrayChange('notices', i, 'label', e.target.value)} className={inputBase} placeholder="e.g. Important" />
                    </div>
                    <div className="md:col-span-2">
                      <label className={labelBase}>Notice Text</label>
                      <textarea maxLength={120} value={item.text || ''} onChange={e => handleArrayChange('notices', i, 'text', e.target.value)} className={inputBase + " h-20"} rows={2} placeholder="Notice content..." />
                    </div>
                  </div>
                </div>
              )}
            />
            <button type="button" onClick={() => setForm({...form, notices: [...form.notices, {title: '', label: '', text: ''}]})} className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-2xl p-4 text-slate-400 font-bold hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/30 transition-all uppercase tracking-widest text-[10px]">
              <Plus className="w-4 h-4" /> Add New Notice
            </button>
          </div>
        </AdminFormSection>

        {/* Testimonials */}
        <AdminFormSection title={`3. Student Testimonials (${form.testimonials.length})`} icon="💬" isOpen={activeSection === 'testimonials'} onToggle={() => setActiveSection(activeSection === 'testimonials' ? null : 'testimonials')}>
          <div className="space-y-4">
            <SortableListContext
              items={form.testimonials}
              onChange={val => setForm({...form, testimonials: val})}
              renderItem={(item, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
                <div ref={setNodeRef} style={style} className={`p-6 bg-white border border-slate-100 rounded-3xl relative shadow-sm hover:shadow-md transition-all ${isDragging ? 'shadow-xl z-50 ring-4 ring-blue-50 bg-white' : ''}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-200 hover:text-[#2563EB] transition-colors p-1" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                      <div className="w-5 h-0.5 bg-current mb-0.5 rounded-full" />
                      <div className="w-5 h-0.5 bg-current mb-0.5 rounded-full" />
                      <div className="w-5 h-0.5 bg-current rounded-full" />
                    </div>
                    <button type="button" onClick={() => setForm({...form, testimonials: form.testimonials.filter((_, idx) => idx !== i)})} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"><Trash2 className="w-4 h-4"/></button>
                  </div>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={labelBase}>Student Name</label>
                        <input maxLength={35} value={item.name || ''} onChange={e => handleArrayChange('testimonials', i, 'name', e.target.value)} className={inputBase} />
                      </div>
                      <div>
                        <label className={labelBase}>Role / Year</label>
                        <input maxLength={30} value={item.role || ''} onChange={e => handleArrayChange('testimonials', i, 'role', e.target.value)} className={inputBase} placeholder="e.g. Alumnus 2023" />
                      </div>
                    </div>
                    <div>
                      <label className={labelBase}>Quote</label>
                      <textarea maxLength={320} value={item.quote || ''} onChange={e => handleArrayChange('testimonials', i, 'quote', e.target.value)} className={inputBase + " h-24"} rows={3} placeholder="Paste student testimonial here..." />
                    </div>
                  </div>
                </div>
              )}
            />
            <button type="button" onClick={() => setForm({...form, testimonials: [...form.testimonials, {name: '', role: '', quote: ''}]})} className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-2xl p-4 text-slate-400 font-bold hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/30 transition-all uppercase tracking-widest text-[10px]">
              <Plus className="w-4 h-4" /> Add Testimonial
            </button>
          </div>
        </AdminFormSection>

        {/* Resources / Documents */}
        <AdminFormSection title={`4. Resources & Documents (${form.documents.length})`} icon="📄" isOpen={activeSection === 'documents'} onToggle={() => setActiveSection(activeSection === 'documents' ? null : 'documents')}>
          <div className="space-y-4">
            <SortableListContext
              items={form.documents}
              onChange={val => setForm({...form, documents: val})}
              renderItem={(item, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
                <div ref={setNodeRef} style={style} className={`p-6 bg-white border border-slate-100 rounded-3xl relative shadow-sm hover:shadow-md transition-all ${isDragging ? 'shadow-xl z-50 ring-4 ring-blue-50 bg-white' : ''}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-200 hover:text-[#2563EB] transition-colors p-1" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                      <div className="w-5 h-0.5 bg-current mb-0.5 rounded-full" />
                      <div className="w-5 h-0.5 bg-current mb-0.5 rounded-full" />
                      <div className="w-5 h-0.5 bg-current rounded-full" />
                    </div>
                    <button type="button" onClick={() => setForm({...form, documents: form.documents.filter((_, idx) => idx !== i)})} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"><Trash2 className="w-4 h-4"/></button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className={labelBase}>Document Label</label>
                      <input maxLength={60} value={item.label || ''} onChange={e => handleArrayChange('documents', i, 'label', e.target.value)} className={inputBase} />
                    </div>
                    <div className="group relative rounded-2xl border-2 border-dashed border-slate-100 bg-slate-50/50 h-32 flex flex-col items-center justify-center hover:bg-blue-50/30 hover:border-blue-200 transition-all cursor-pointer overflow-hidden shadow-inner">
                      <input type="file" accept="application/pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={e => handleArrayChange('documents', i, 'pdfFile', e.target.files?.[0] || null)} />
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <FileText className={`w-5 h-5 ${item.pdfFile ? 'text-blue-500' : 'text-slate-300 group-hover:text-blue-400'}`}/>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.pdfFile ? 'PDF Selected' : 'Upload PDF'}</span>
                    </div>
                    <div>
                      <label className={labelBase}>External URL (Optional)</label>
                      <input value={item.url || ''} onChange={e => handleArrayChange('documents', i, 'url', e.target.value)} placeholder="https://..." className={inputBase} />
                    </div>
                  </div>
                </div>
              )}
            />
            <button type="button" onClick={() => setForm({...form, documents: [...form.documents, {label: '', url: '', pdfFile: null}]})} className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-2xl p-4 text-slate-400 font-bold hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/30 transition-all uppercase tracking-widest text-[10px]">
               <Plus className="w-4 h-4" /> Add Document
            </button>
          </div>
        </AdminFormSection>
      </form>
    </div>
  );
};

export default MMSHomepageForm;
