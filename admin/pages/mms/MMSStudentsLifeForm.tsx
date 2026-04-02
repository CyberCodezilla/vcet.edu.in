import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronDown, ChevronUp, Plus, Trash2, Image as ImageIcon, CheckCircle, AlertTriangle, FileText, User, Star } from 'lucide-react';
import type { MMSStudentsLifePayload, GalleryItem } from '../../types';
import { mmsStudentsLifeApi } from '../../api/mmsStudentsLifeApi';
import { resolveApiUrl } from '../../../services/api';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';

const emptyForm: MMSStudentsLifePayload = {
  overview: { description: '', highlights: [] },
  vEcstatic: { description: '', activities: [], images: [] },
  dlle: { description: '', projects: [], outcomes: [], images: [] },
  bookReview: { description: '', benefits: [], images: [] },
  addOnCourses: { description: '', topics: [], objectives: [], images: [] },
  advanceExcel: { description: '', objectives: [], images: [] },
  powerBi: { description: '', objectives: [], images: [] },
  industrySessions: { description: '', learningPoints: [], sessions: [] },
  ideation: { description: '', images: [] },
  oscillations: { description: '', images: [] },
  nsimTraining: { description: '', images: [] },
  rankers: [],
  customEvents: [],
  pdfs: []
};

const MMSStudentsLifeForm: React.FC = () => {
  const navigate = useNavigate();
  const { section } = useParams<{ section: string }>();
  const [form, setForm] = useState<MMSStudentsLifePayload>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

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
     return <div className="p-10 text-center"><div className="w-8 h-8 border-4 border-slate-200 border-t-[#2563EB] rounded-full animate-spin mx-auto mb-4" />Loading Form...</div>;
  }

  const renderSectionHeader = (title: string, subtitle: string) => (
    <PageEditorHeader
      title={title}
      description={subtitle}
      onSave={() => {
        void handleSave();
      }}
      isSaving={saving}
      showBackButton
      onBack={() => navigate('/admin/pages/mms')}
      className="mb-8"
    />
  );

  const renderTextArea = (label: string, value: string, min: number, max: number, onChange: (v: string) => void) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-bold text-slate-700">{label}</label>
        <span className={`text-[10px] font-black ${value.length < min || value.length > max ? 'text-red-500' : 'text-emerald-500'}`}>
          {value.length} / {max} chars (Min {min})
        </span>
      </div>
      <textarea 
        className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-medium focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-[#2563EB] transition-all h-32 resize-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Enter ${label.toLowerCase()}...`}
        maxLength={max}
      />
    </div>
  );

  const renderListEditor = (label: string, items: { text: string }[], maxItems: number, charLimit: number, onChange: (items: { text: string }[]) => void) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-slate-50/50 p-4 rounded-xl border border-slate-100">
        <label className="text-sm font-bold text-slate-700 uppercase tracking-tight">{label}</label>
        <div className="text-[10px] font-black text-slate-400 tracking-widest bg-white border border-slate-200 px-3 py-1 rounded-full uppercase shadow-sm">
           {items.length} / {maxItems} items used
        </div>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2 group animate-fade-in">
             <div className="flex-1 relative">
                <input 
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-4 focus:ring-blue-100 focus:border-[#2563EB] transition-all"
                  value={item.text}
                  maxLength={charLimit}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[i].text = e.target.value;
                    onChange(newItems);
                  }}
                  placeholder={`Item ${i + 1}...`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-bold text-slate-300 group-focus-within:text-blue-400">
                  {item.text.length} / {charLimit}
                </span>
             </div>
             <button type="button" onClick={() => onChange(items.filter((_, idx) => idx !== i))} className="p-3 bg-red-50 text-red-500 border border-red-100 rounded-xl hover:bg-red-100 transition-colors shadow-sm">
               <Trash2 className="w-5 h-5" />
             </button>
          </div>
        ))}
        {items.length < maxItems && (
          <button type="button" onClick={() => onChange([...items, { text: '' }])} className="w-full py-3 bg-white border-2 border-dashed border-slate-100 rounded-xl flex items-center justify-center gap-2 text-slate-400 font-bold text-xs hover:border-blue-200 hover:bg-blue-50/50 transition-all uppercase tracking-widest">
            <Plus className="w-4 h-4" /> Add Item
          </button>
        )}
      </div>
    </div>
  );

  const renderGalleryEditor = (label: string, items: GalleryItem[], maxItems: number, charLimit: number, onChange: (items: GalleryItem[]) => void) => (
    <div className="space-y-4 pt-4 border-t border-slate-50 mt-4">
      <div className="flex justify-between items-center bg-slate-50/50 p-4 rounded-xl border border-slate-100">
        <label className="text-sm font-bold text-slate-700 uppercase tracking-tight">{label}</label>
        <div className="text-[10px] font-black text-slate-400 tracking-widest bg-white border border-slate-200 px-3 py-1 rounded-full uppercase shadow-sm">
           {items.length} / {maxItems} images used
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item, i) => (
          <div key={i} className="group relative bg-slate-50 rounded-2xl border border-slate-200 p-3 transition-all">
            <button type="button" onClick={() => onChange(items.filter((_, idx) => idx !== i))} className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-red-100 rounded-full text-red-500 flex items-center justify-center shadow-lg hover:bg-red-50 transition-colors z-10"><Trash2 className="w-3" /></button>
            <div className="relative aspect-video rounded-xl bg-white border border-slate-200 mb-2 overflow-hidden flex items-center justify-center">
               <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={async (e) => {
                 const file = e.target.files?.[0];
                 if (file) { const newItems = [...items]; newItems[i].image = file; onChange(newItems); }
               }}/>
               {item.image ? (
                 <img src={typeof item.image === 'string' ? item.image : (item.image instanceof File || item.image instanceof Blob ? URL.createObjectURL(item.image) : ((item.image as any)?.url ? (resolveApiUrl((item.image as any).url) || '') : ''))} className="w-full h-full object-cover" alt="" />
               ) : (
                <ImageIcon className="w-6 h-6 text-slate-300" />
               )}
            </div>
            <input className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-[10px] font-bold text-slate-600 outline-none focus:border-blue-300" placeholder="Label..." value={item.label || ''} maxLength={charLimit} onChange={e => {
               const newItems = [...items]; newItems[i].label = e.target.value; onChange(newItems);
            }}/>
          </div>
        ))}
        {items.length < maxItems && (
           <button type="button" onClick={() => onChange([...items, { label: '', image: null }])} className="min-h-[6rem] bg-white border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center gap-1 text-slate-300 hover:border-blue-100 hover:text-blue-400 hover:bg-blue-50/20 transition-all font-black uppercase text-[10px]">
             <Plus className="w-4 h-4" /> Add Image
           </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-fade-in relative pt-6">
      {/* Dynamic Section Rendering */}
      {section === 'overview' && (
        <>
          {renderSectionHeader('Student Life Overview', 'CORE DEPARTMENT HIGHLIGHTS')}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl space-y-8 animate-fade-in">
            {renderTextArea('Description', form.overview?.description || '', 300, 500, (v) => setForm({ ...form, overview: { ...form.overview!, description: v } }))}
            {renderListEditor('Highlights', form.overview?.highlights || [], 4, 80, (l) => setForm({ ...form, overview: { ...form.overview!, highlights: l } }))}
          </div>
        </>
      )}

      {section === 'v-ecstatic' && (
        <>
          {renderSectionHeader('V-Ecstatic', 'ANNUAL FESTIVAL CMS')}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl space-y-8 animate-fade-in">
            {renderTextArea('Description', form.vEcstatic?.description || '', 200, 300, (v) => setForm({ ...form, vEcstatic: { ...form.vEcstatic!, description: v } }))}
            {renderListEditor('Activities', form.vEcstatic?.activities || [], 5, 80, (l) => setForm({ ...form, vEcstatic: { ...form.vEcstatic!, activities: l } }))}
            {renderGalleryEditor('Event Images', form.vEcstatic?.images || [], 5, 35, (g) => setForm({ ...form, vEcstatic: { ...form.vEcstatic!, images: g } }))}
          </div>
        </>
      )}

      {section === 'dlle' && (
        <>
          {renderSectionHeader('DLLE', 'EXTENSION ACTIVITIES CMS')}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl space-y-8 animate-fade-in">
            {renderTextArea('Description', form.dlle?.description || '', 200, 300, (v) => setForm({ ...form, dlle: { ...form.dlle!, description: v } }))}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {renderListEditor('Projects', form.dlle?.projects || [], 5, 50, (l) => setForm({ ...form, dlle: { ...form.dlle!, projects: l } }))}
              {renderListEditor('Outcomes', form.dlle?.outcomes || [], 3, 80, (l) => setForm({ ...form, dlle: { ...form.dlle!, outcomes: l } }))}
            </div>
            {renderGalleryEditor('Section Images', form.dlle?.images || [], 3, 35, (g) => setForm({ ...form, dlle: { ...form.dlle!, images: g } }))}
          </div>
        </>
      )}

      {section === 'book-review' && (
        <>
          {renderSectionHeader('Book Review', 'LITERARY ACTIVITIES CMS')}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl space-y-8 animate-fade-in">
            {renderTextArea('Description', form.bookReview?.description || '', 150, 250, (v) => setForm({ ...form, bookReview: { ...form.bookReview!, description: v } }))}
            {renderListEditor('Benefits', form.bookReview?.benefits || [], 4, 80, (l) => setForm({ ...form, bookReview: { ...form.bookReview!, benefits: l } }))}
            {renderGalleryEditor('Section Images', form.bookReview?.images || [], 4, 35, (g) => setForm({ ...form, bookReview: { ...form.bookReview!, images: g } }))}
          </div>
        </>
      )}

      {section === 'add-on-courses' && (
        <>
          {renderSectionHeader('Add-On Courses', 'SKILL DEVELOPMENT CMS')}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl space-y-8 animate-fade-in">
            {renderTextArea('Description', form.addOnCourses?.description || '', 200, 300, (v) => setForm({ ...form, addOnCourses: { ...form.addOnCourses!, description: v } }))}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {renderListEditor('Topics Covered', form.addOnCourses?.topics || [], 6, 50, (l) => setForm({ ...form, addOnCourses: { ...form.addOnCourses!, topics: l } }))}
              {renderListEditor('Objectives', form.addOnCourses?.objectives || [], 5, 80, (l) => setForm({ ...form, addOnCourses: { ...form.addOnCourses!, objectives: l } }))}
            </div>
            {renderGalleryEditor('Course Images', form.addOnCourses?.images || [], 4, 35, (g) => setForm({ ...form, addOnCourses: { ...form.addOnCourses!, images: g } }))}
          </div>
        </>
      )}
        {section === 'add-on-courses-powerbi' && (
          <>
            {renderSectionHeader('Add-On Courses on Powerbi', 'SKILL DEVELOPMENT CMS')}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl space-y-8 animate-fade-in">
              {renderTextArea('Description', form.powerBi?.description || '', 200, 300, (v) => setForm({ ...form, powerBi: { ...form.powerBi!, description: v } }))}
              {renderListEditor('Objectives', form.powerBi?.objectives || [], 5, 80, (l) => setForm({ ...form, powerBi: { ...form.powerBi!, objectives: l } }))}
              {renderGalleryEditor('Highlights/Images', form.powerBi?.images || [], 5, 35, (g) => setForm({ ...form, powerBi: { ...form.powerBi!, images: g } }))}
            </div>
          </>
        )}

        {section === 'advance-excel' && (
          <>
            {renderSectionHeader('ADD ON COURSES ON ADVANCE EXCEL', 'SKILL DEVELOPMENT CMS')}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl space-y-8 animate-fade-in">
              {renderTextArea('Description', form.advanceExcel?.description || '', 200, 300, (v) => setForm({ ...form, advanceExcel: { ...form.advanceExcel!, description: v } }))}
              {renderListEditor('Objectives', form.advanceExcel?.objectives || [], 5, 80, (l) => setForm({ ...form, advanceExcel: { ...form.advanceExcel!, objectives: l } }))}
              {renderGalleryEditor('Training Images', form.advanceExcel?.images || [], 5, 35, (g) => setForm({ ...form, advanceExcel: { ...form.advanceExcel!, images: g } }))}
            </div>
          </>
        )}
      {section === 'industry-sessions' && (
        <>
          {renderSectionHeader('Industry Sessions', 'EXPERT LECTURES / VISITS CMS')}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl space-y-8 animate-fade-in">
            {renderTextArea('Description', form.industrySessions?.description || '', 150, 250, (v) => setForm({ ...form, industrySessions: { ...form.industrySessions!, description: v } }))}
            {renderListEditor('Key Learning Points', form.industrySessions?.learningPoints || [], 4, 80, (l) => setForm({ ...form, industrySessions: { ...form.industrySessions!, learningPoints: l } }))}
            {renderGalleryEditor('Session Images', form.industrySessions?.sessions || [], 3, 35, (g) => setForm({ ...form, industrySessions: { ...form.industrySessions!, sessions: g } }))}
          </div>
        </>
      )}

      {section === 'ideation' && (
          <>
            {renderSectionHeader('Ideation', 'STUDENT INNOVATION')}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl space-y-8 animate-fade-in">
              {renderTextArea('Description', form.ideation?.description || '', 120, 200, (v) => setForm({...form, ideation: { ...form.ideation, description: v, images: form.ideation?.images || [] }} as any))}
              {renderGalleryEditor('Ideation Gallery', form.ideation?.images || [], 5, 45, (g) => setForm({...form, ideation: { ...form.ideation, images: g, description: form.ideation?.description || '' }} as any))}
            </div>
          </>
        )}

        {section === 'oscillations' && (
          <>
            {renderSectionHeader('Oscillations', 'ANNUAL FESTIVAL')}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl space-y-8 animate-fade-in">
              {renderTextArea('Description', form.oscillations?.description || '', 120, 200, (v) => setForm({...form, oscillations: { ...form.oscillations, description: v, images: form.oscillations?.images || [] }} as any))}
              {renderGalleryEditor('Oscillations Gallery', form.oscillations?.images || [], 8, 45, (g) => setForm({...form, oscillations: { ...form.oscillations, images: g, description: form.oscillations?.description || '' }} as any))}     
            </div>
          </>
        )}

        {section === 'nsimTraining' && (
          <>
            {renderSectionHeader('NSIM Training', 'SKILL DEVELOPMENT')}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl space-y-8 animate-fade-in">
              {renderTextArea('Description', form.nsimTraining?.description || '', 120, 200, (v) => setForm({...form, nsimTraining: { ...form.nsimTraining, description: v, images: form.nsimTraining?.images || [] }} as any))}
              {renderGalleryEditor('Training Gallery', form.nsimTraining?.images || [], 5, 45, (g) => setForm({...form, nsimTraining: { ...form.nsimTraining, images: g, description: form.nsimTraining?.description || '' }} as any))}
            </div>
          </>
        )}

      {section === 'custom-events' && (
        <>
          {renderSectionHeader('Custom Events', 'DYNAMIC EVENTS')}
          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-xl animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-500" />
            <div className="space-y-12">
              {form.customEvents?.map((ev, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200 p-6 rounded-3xl relative">
                  <button type="button" onClick={() => { const n = [...form.customEvents!]; n.splice(i, 1); setForm({...form, customEvents: n}) }} className="absolute -top-4 -right-4 w-10 h-10 bg-red-50 text-red-500 flex items-center justify-center rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-md z-10"><Trash2 className="w-5 h-5"/></button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <input className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700" placeholder="Event Name (e.g. Activity 1)" value={ev.name} onChange={e => { const n = [...form.customEvents!]; n[i].name = e.target.value; n[i].slug = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''); setForm({...form, customEvents: n}); }}/>
                    <input className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 cursor-not-allowed" placeholder="URL Slug (auto-generated)" value={ev.slug} readOnly />
                  </div>
                  {renderTextArea(`Description for ${ev.name || 'Event'}`, ev.description || '', 10, 800, (v) => { const n = [...form.customEvents!]; n[i].description = v; setForm({...form, customEvents: n}); })}
                  <div className="mt-6">
                    {renderGalleryEditor(`Gallery for ${ev.name || 'Event'}`, ev.images || [], 10, 45, (g) => { const n = [...form.customEvents!]; n[i].images = g; setForm({...form, customEvents: n}); })}
                  </div>
                </div>
              ))}
              <div className="pt-4">
                <button type="button" onClick={() => setForm({...form, customEvents: [...(form.customEvents || []), { id: Date.now().toString(), name: '', slug: '', description: '', images: [] }]})} className="w-full py-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex items-center justify-center gap-2 text-slate-400 font-bold text-xs hover:border-blue-400 hover:text-blue-500 transition-all uppercase tracking-widest"><Plus className="w-5 h-5"/> Add New Dynamic Event</button>
              </div>
            </div>
          </div>
        </>
      )}

      {section === 'pdfs' && (
        <>
          {renderSectionHeader('PDF Resources', 'DOCUMENTS & DOWNLOADS')}
          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-xl animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-500" />
            <div className="space-y-4">
              {form.pdfs?.map((pdf, i) => (
                <div key={i} className="flex gap-4 items-center bg-slate-50 border border-slate-200 p-6 rounded-3xl transition-all hover:bg-white hover:shadow-lg">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm"><FileText className="w-6 h-6 text-red-500" /></div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-blue-100" placeholder="Document Title..." value={pdf.title} maxLength={80} onChange={e => { const n = [...form.pdfs!]; n[i].title = e.target.value; setForm({...form, pdfs: n}); }}/>
                    <input className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-blue-500 focus:ring-4 focus:ring-blue-100" placeholder="Document URL..." value={pdf.url} onChange={e => { const n = [...form.pdfs!]; n[i].url = e.target.value; setForm({...form, pdfs: n}); }}/>
                  </div>
                  <button type="button" onClick={() => setForm({...form, pdfs: form.pdfs!.filter((_,idx) => idx !== i)})} className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"><Trash2 className="w-5 h-5"/></button>
                </div>
              ))}
              {(form.pdfs?.length || 0) < 2 && (
                <button type="button" onClick={() => setForm({...form, pdfs: [...(form.pdfs || []), { title: '', url: '' }]})} className="w-full py-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex items-center justify-center gap-2 text-slate-400 font-bold text-xs hover:border-blue-400 hover:text-blue-500 transition-all uppercase tracking-widest"><Plus className="w-5 h-5"/> Add PDF Document</button>
              )}
            </div>
          </div>
        </>
      )}

      {/* MESSAGES (FOOTER ONES) */}
      {successMsg && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
           <div className="bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-bold border border-emerald-400/50 backdrop-blur-md">
             <CheckCircle className="w-6 h-6" /> {successMsg}
           </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
        @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
      `}</style>
    </div>
  );
};

export default MMSStudentsLifeForm;




