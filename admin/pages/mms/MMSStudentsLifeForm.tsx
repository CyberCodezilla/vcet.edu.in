import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronDown, ChevronUp, Plus, Trash2, Image as ImageIcon, CheckCircle, AlertTriangle, ArrowLeft, FileText, User, Star } from 'lucide-react';
import type { MMSStudentsLifePayload, GalleryItem } from '../../types';
import { mmsStudentsLifeApi } from '../../api/mmsStudentsLifeApi';

const emptyForm: MMSStudentsLifePayload = {
  overview: { description: '', highlights: [] },
  vEcstatic: { description: '', activities: [], images: [] },
  dlle: { description: '', projects: [], outcomes: [], images: [] },
  bookReview: { description: '', benefits: [], images: [] },
  addOnCourses: { description: '', topics: [], objectives: [], images: [] },
  industrySessions: { description: '', learningPoints: [], sessions: [] },
  events: [],
  rankers: [],
  pdfs: []
};

const MMSStudentsLifeForm: React.FC = () => {
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <Link to="/admin/pages/mms" className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold text-[#111827]">{title}</h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{subtitle}</p>
        </div>
      </div>
      <button onClick={handleSave} disabled={saving} className="px-8 py-3.5 bg-[#2563EB] text-white rounded-2xl font-black text-sm uppercase tracking-wider shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center gap-2">
        {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Save Changes'}
      </button>
    </div>
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
                 <img src={typeof item.image === 'string' ? item.image : URL.createObjectURL(item.image)} className="w-full h-full object-cover" alt="" />
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

      {section === 'events' && (
        <>
          {renderSectionHeader('Events & Activities', 'IDEATHON / OSCILLATIONS / ETC')}
          <div className="space-y-6">
            {form.events?.map((ev, i) => (
              <div key={i} className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl animate-fade-in group">
                 <div className="flex justify-between items-center mb-6">
                    <input className="text-xl font-black text-slate-800 outline-none border-b-2 border-transparent focus:border-blue-500 pb-1" value={ev.name} onChange={e => { const n = [...form.events!]; n[i].name = e.target.value; setForm({...form, events: n}); }} placeholder="Event Name..."/>
                    <button type="button" onClick={() => setForm({...form, events: form.events!.filter((_,idx) => idx !== i)})} className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors"><Trash2 className="w-5 h-5"/></button>
                 </div>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                       {renderTextArea('Description', ev.description, 120, 200, (v) => { const n = [...form.events!]; n[i].description = v; setForm({...form, events: n}); })}
                       {renderTextArea('Outcome', ev.outcome, 50, 160, (v) => { const n = [...form.events!]; n[i].outcome = v; setForm({...form, events: n}); })}
                    </div>
                    {renderGalleryEditor('Event Gallery', ev.images || [], 3, 35, (g) => { const n = [...form.events!]; n[i].images = g; setForm({...form, events: n}); })}
                 </div>
              </div>
            ))}
            {(form.events?.length || 0) < 6 && (
              <button type="button" onClick={() => setForm({...form, events: [...(form.events || []), { name: '', description: '', outcome: '', images: [] }]})} className="w-full py-8 bg-white border-4 border-dashed border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 text-slate-300 hover:border-blue-200 hover:text-blue-500 hover:bg-blue-50/50 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors"><Plus className="w-6 h-6"/></div>
                <span className="text-sm font-black uppercase tracking-widest">Add New Event Activity</span>
              </button>
            )}
          </div>
        </>
      )}

      {section === 'rankers' && (
        <>
          {renderSectionHeader('Rankers & Achievements', 'TOP PERFORMER SHOWCASE')}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl animate-fade-in">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {form.rankers?.map((ranker, i) => (
                  <div key={i} className="relative bg-slate-50 rounded-3xl p-6 border border-slate-200 space-y-4 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all">
                     <button type="button" onClick={() => setForm({...form, rankers: form.rankers!.filter((_,idx) => idx !== i)})} className="absolute -top-3 -right-3 w-8 h-8 bg-white border border-red-100 rounded-full text-red-500 flex items-center justify-center shadow-lg hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4"/></button>
                     <div className="w-24 h-24 rounded-full border-4 border-white shadow-md mx-auto relative overflow-hidden bg-white">
                        <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) { const n = [...form.rankers!]; n[i].image = file; setForm({...form, rankers: n}); }
                        }}/>
                        {ranker.image ? (
                          <img src={typeof ranker.image === 'string' ? ranker.image : URL.createObjectURL(ranker.image)} className="w-full h-full object-cover" alt="" />
                        ) : (
                          <User className="w-10 h-10 text-slate-300 m-auto mt-6" />
                        )}
                     </div>
                     <div className="space-y-3">
                        <input className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-black text-slate-800 text-center uppercase tracking-tight" placeholder="Student Name..." value={ranker.name} maxLength={50} onChange={e => { const n = [...form.rankers!]; n[i].name = e.target.value; setForm({...form, rankers: n}); }}/>
                        <input className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-blue-600 text-center shadow-inner shadow-blue-50" placeholder="Rank/Achievement..." value={ranker.rank} maxLength={100} onChange={e => { const n = [...form.rankers!]; n[i].rank = e.target.value; setForm({...form, rankers: n}); }}/>
                        <input className="w-full bg-slate-100/50 border-none rounded-xl px-4 py-2 text-[10px] font-black text-slate-400 text-center" placeholder="Year (e.g. 2023-24)..." value={ranker.year} onChange={e => { const n = [...form.rankers!]; n[i].year = e.target.value; setForm({...form, rankers: n}); }}/>
                     </div>
                  </div>
                ))}
                {(form.rankers?.length || 0) < 10 && (
                  <button type="button" onClick={() => setForm({...form, rankers: [...(form.rankers || []), { name: '', rank: '', year: '', image: null }]})} className="min-h-[16rem] bg-white border-2 border-dashed border-slate-100 rounded-[2rem] flex flex-col items-center justify-center gap-3 text-slate-300 hover:border-blue-200 hover:text-blue-500 transition-all font-black text-xs uppercase tracking-widest">
                     <Star className="w-8 h-8 opacity-30" /> Add Ranker
                  </button>
                )}
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
