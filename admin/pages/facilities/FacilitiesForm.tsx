import React, { useEffect, useState } from 'react';
import { pagesApi } from '../../api/pagesApi';
import type { FacilityData, FacilityPayload } from '../../types';

/* ── Toast Component ────────────────────────────────────────────────────────── */
const Toast: React.FC<{ message: string; type: 'success' | 'error'; onClose: () => void }> = ({ message, type, onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl text-sm font-bold animate-slide-up ${type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
      {type === 'success' ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
      )}
      {message}
    </div>
  );
};

/* ── UI Components ─────────────────────────────────────────────────────────── */
const SectionCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-white rounded-[2rem] shadow-lg shadow-slate-200/40 border border-slate-100 overflow-hidden">
    <div className="px-8 py-5 border-b border-slate-100 flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">{icon}</div>
      <h3 className="text-sm font-extrabold text-[#111827] uppercase tracking-wider">{title}</h3>
    </div>
    <div className="p-8 space-y-6">{children}</div>
  </div>
);

const inputBase = 'w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#2563EB] rounded-2xl px-5 py-3/4 text-sm font-bold transition-all outline-none';
const labelBase = 'block text-xs font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1';

/* ── Reusable Managers ──────────────────────────────────────────────────────── */

// Text Input with Character Counter
const LimitedInput: React.FC<{ value: string; onChange: (v: string) => void; max: number; label: string; placeholder?: string; type?: 'text'|'textarea' }> = ({ value, onChange, max, label, placeholder, type='text' }) => (
  <div className="relative">
    <label className={labelBase}>{label}</label>
    {type === 'text' ? (
      <input value={value || ''} onChange={e => { if (e.target.value.length <= max) onChange(e.target.value) }} className={`${inputBase} p-4`} placeholder={placeholder} />
    ) : (
      <textarea value={value || ''} onChange={e => { if (e.target.value.length <= max) onChange(e.target.value) }} className={`${inputBase} p-4 min-h-[100px] resize-y`} placeholder={placeholder} />
    )}
    <div className={`absolute bottom-3 right-4 text-[10px] font-bold ${value?.length >= max ? 'text-red-500' : 'text-slate-400'}`}>
      {value?.length || 0} / {max}
    </div>
  </div>
);

// Generic Items List Manager (Allows adding/editing objects in an array with Up/Down arrows)
const DynamicListManager: React.FC<{ 
  items: any[]; 
  maxItems: number; 
  fields: { key: string; label: string; max: number; type?: 'text'|'textarea' }[]; 
  onChange: (val: any[]) => void 
}> = ({ items = [], maxItems, fields, onChange }) => {
  const add = () => { if (items.length < maxItems) { const empty: any = {}; fields.forEach(f => empty[f.key] = ''); onChange([...items, empty]); } };
  const upd = (i: number, u: any) => { const n = [...items]; n[i] = { ...n[i], ...u }; onChange(n); };
  const del = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const move = (i: number, up: boolean) => {
    if (up && i > 0) { const n = [...items]; [n[i], n[i-1]] = [n[i-1], n[i]]; onChange(n); }
    if (!up && i < items.length - 1) { const n = [...items]; [n[i], n[i+1]] = [n[i+1], n[i]]; onChange(n); }
  };

  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
         <div key={idx} className="flex gap-4 p-5 bg-slate-50 border border-slate-100 rounded-3xl relative transition-all group overflow-hidden">
            <div className="flex flex-col gap-2 pt-8 pr-2 border-r border-slate-200">
              <button disabled={idx===0} onClick={() => move(idx, true)} className="text-slate-400 hover:text-blue-500 disabled:opacity-30"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7"/></svg></button>
              <button disabled={idx===items.length-1} onClick={() => move(idx, false)} className="text-slate-400 hover:text-blue-500 disabled:opacity-30"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"/></svg></button>
            </div>
            <div className="grid grid-cols-1 gap-y-4 flex-grow">
               {fields.map(f => (
                  <LimitedInput key={f.key} label={f.label} max={f.max} type={f.type} value={item[f.key]} onChange={v => upd(idx, { [f.key]: v })} />
               ))}
            </div>
            <button onClick={() => del(idx)} className="self-start mt-8 p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
         </div>
      ))}
      <button onClick={add} disabled={items.length >= maxItems} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-sm font-bold text-slate-400 hover:border-blue-500 hover:text-blue-500 disabled:bg-slate-50 disabled:hover:border-slate-200 disabled:text-slate-300 transition-all flex items-center justify-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
        Add Item ({items.length}/{maxItems})
      </button>
    </div>
  );
};

// String Array Manager
const StringListManager: React.FC<{ items: string[]; maxItems: number; maxLength: number; onChange: (val: string[]) => void; label?: string }> = ({ items = [], maxItems, maxLength, onChange, label='Entry' }) => {
  const add = () => { if (items.length < maxItems) onChange([...items, '']); };
  const upd = (i: number, v: string) => { const n = [...items]; n[i] = v; onChange(n); };
  const del = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const move = (i: number, up: boolean) => {
    if (up && i > 0) { const n = [...items]; [n[i], n[i-1]] = [n[i-1], n[i]]; onChange(n); }
    if (!up && i < items.length - 1) { const n = [...items]; [n[i], n[i+1]] = [n[i+1], n[i]]; onChange(n); }
  };

  return (
    <div className="space-y-3">
      {items.map((str, idx) => (
         <div key={idx} className="flex gap-3 items-center group">
            <div className="flex gap-1">
              <button disabled={idx===0} onClick={() => move(idx, true)} className="text-slate-300 hover:text-blue-500 disabled:opacity-30"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7"/></svg></button>
              <button disabled={idx===items.length-1} onClick={() => move(idx, false)} className="text-slate-300 hover:text-blue-500 disabled:opacity-30"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"/></svg></button>
            </div>
            <div className="flex-grow">
               <LimitedInput label={`${label} ${idx+1}`} max={maxLength} value={str} onChange={v => upd(idx, v)} />
            </div>
            <button onClick={() => del(idx)} className="p-2 text-red-400 hover:text-red-500 opacity-0 group-hover:opacity-100 mt-6"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/></svg></button>
         </div>
      ))}
      <button onClick={add} disabled={items.length >= maxItems} className="text-xs font-bold text-blue-600 hover:text-blue-700 uppercase tracking-widest disabled:opacity-50">+ Add {label} ({items.length}/{maxItems})</button>
    </div>
  );
};

/* ── Main Form ─────────────────────────────────────────────────────────────── */
interface FacilitiesFormProps {
  slug: string;
  onBack: () => void;
}

const FacilitiesForm: React.FC<FacilitiesFormProps> = ({ slug, onBack }) => {
  const [data, setData] = useState<FacilityData | null>(null);
  const [payload, setPayload] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    pagesApi.facilities.get(slug).then(res => {
      setData(res.data);
      setPayload(res.data || {});
    }).finally(() => setLoading(false));
  }, [slug]);

  const handleSubmit = async () => {
    setSaving(true);
    try {
      await pagesApi.facilities.update(slug, payload);
      setToast({ message: 'Saved successfully', type: 'success' });
    } catch {
      setToast({ message: 'Error saving data', type: 'error' });
    } finally { setSaving(false); }
  };

  if (loading) return <div className="p-12 text-center text-slate-400 font-bold animate-pulse">LOADING...</div>;

  const updateProp = (key: string, val: any) => setPayload({ ...payload, [key]: val });
  const updateGeneral = (key: string, val: any) => setPayload({ ...payload, general: { ...payload.general, [key]: val }});
  
  const renderContent = () => {
    switch (slug) {
      case 'central-computing':
        return (
          <div className="space-y-8">
            <SectionCard title="Statistics" icon="📊">
              <DynamicListManager items={payload.stats} maxItems={5} onChange={v=>updateProp('stats', v)} fields={[
                { key: 'label', label: 'Stat Label', max: 15 },
                { key: 'value', label: 'Number Value', max: 6 }
              ]} />
            </SectionCard>
            <SectionCard title="Key Staff" icon="👥">
              <DynamicListManager items={payload.staff} maxItems={8} onChange={v=>updateProp('staff', v)} fields={[
                { key: 'name', label: 'Name', max: 30 },
                { key: 'role', label: 'Role/Title', max: 40 }
              ]} />
            </SectionCard>
            <SectionCard title="Computing Labs" icon="💻">
              <DynamicListManager items={payload.labs} maxItems={6} onChange={v=>updateProp('labs', v)} fields={[
                { key: 'name', label: 'Lab Name', max: 30 },
                { key: 'pcCount', label: 'PC Count', max: 5 },
                { key: 'specs', label: 'Config Specs (CPU/RAM)', max: 80 },
                { key: 'specLine', label: 'Short Subline', max: 120 }
              ]} />
            </SectionCard>
          </div>
        );

      case 'counselling-cell':
        return (
          <div className="space-y-8">
            <SectionCard title="General Intro" icon="ℹ️">
               <LimitedInput label="Section Heading" max={50} value={payload.general?.title} onChange={v=>updateGeneral('title', v)} />
               <div className="mt-4"><LimitedInput label="Description" type="textarea" max={400} value={payload.general?.description} onChange={v=>updateGeneral('description', v)} /></div>
            </SectionCard>
            <SectionCard title="Counsellor Profile" icon="🧠">
              <DynamicListManager items={payload.staff} maxItems={6} onChange={v=>updateProp('staff', v)} fields={[
                { key: 'name', label: 'Name', max: 30 },
                { key: 'role', label: 'Role', max: 40 },
                { key: 'desc', label: 'Short Bio', max: 150, type: 'textarea' }
              ]} />
            </SectionCard>
            <SectionCard title="Mentoring Modules" icon="🤝">
              <DynamicListManager items={payload.mentors} maxItems={8} onChange={v=>updateProp('mentors', v)} fields={[
                { key: 'title', label: 'Module Title', max: 40 },
                { key: 'description', label: 'Description', max: 150, type: 'textarea' }
              ]} />
            </SectionCard>
          </div>
        );

      case 'differently-abled':
      case 'health-facilities':
        const isHealth = slug === 'health-facilities';
        return (
           <SectionCard title={isHealth ? "Health Infrastructure" : "Accessible Facilities"} icon={isHealth ? "⚕️" : "♿"}>
              <div className="p-4 mb-4 bg-orange-50 text-orange-700 text-xs font-bold rounded-xl border border-orange-200">
                 These items will be displayed in an elegant 3-column grid layout on the main site.
              </div>
              <DynamicListManager items={payload.items} maxItems={18} onChange={v=>updateProp('items', v)} fields={[
                { key: 'name', label: 'Facility Name', max: 40 },
                { key: 'description', label: 'Description', max: 150, type: 'textarea' }
              ]} />
           </SectionCard>
        );

      case 'ladies-common-room':
        return (
          <div className="space-y-8">
             <SectionCard title="Overview" icon="🌸">
               <LimitedInput label="Main Title" max={30} value={payload.general?.title} onChange={v=>updateGeneral('title', v)} />
               <div className="mt-4"><LimitedInput label="Description" type="textarea" max={120} value={payload.general?.description} onChange={v=>updateGeneral('description', v)} /></div>
             </SectionCard>
             <SectionCard title="Indoor Activities" icon="🎯">
               <DynamicListManager items={payload.activities} maxItems={6} onChange={v=>updateProp('activities', v)} fields={[
                 { key: 'name', label: 'Activity Name', max: 30 },
                 { key: 'description', label: 'Rules / Detail', max: 100 }
               ]} />
             </SectionCard>
          </div>
        );

      case 'library':
         return (
            <div className="space-y-8">
               <SectionCard title="Library Structure & Content" icon="📚">
                  <DynamicListManager items={payload.librarySections} maxItems={5} onChange={v=>updateProp('librarySections', v)} fields={[
                     { key: 'heading', label: 'Heading', max: 80 },
                     { key: 'paragraph', label: 'Content Body', max: 1000, type: 'textarea' }
                  ]} />
               </SectionCard>
               <SectionCard title="Library Quick Stats" icon="📊">
                  <DynamicListManager items={payload.stats} maxItems={8} onChange={v=>updateProp('stats', v)} fields={[
                     { key: 'label', label: 'Metric Name (e.g. Total Books)', max: 30 },
                     { key: 'value', label: 'Numerical Value (1-6 digits)', max: 6 }
                  ]} />
               </SectionCard>
               <SectionCard title="Rules & Arrays" icon="📜">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="p-6 border border-slate-200 rounded-3xl">
                     <h4 className="text-sm font-black mb-4 uppercase">Facilities List</h4>
                     <StringListManager items={payload.facilitiesList} maxItems={15} maxLength={100} onChange={v=>updateProp('facilitiesList', v)} />
                   </div>
                   <div className="p-6 border border-slate-200 rounded-3xl">
                     <h4 className="text-sm font-black mb-4 uppercase">Membership Types</h4>
                     <StringListManager items={payload.memberships} maxItems={10} maxLength={80} onChange={v=>updateProp('memberships', v)} />
                   </div>
                   <div className="p-6 border border-slate-200 rounded-3xl md:col-span-2">
                     <h4 className="text-sm font-black mb-4 uppercase">Rules & Regulations</h4>
                     <StringListManager items={payload.rules} maxItems={25} maxLength={250} onChange={v=>updateProp('rules', v)} label="Rule" />
                   </div>
                 </div>
               </SectionCard>
               <SectionCard title="Library Contact" icon="📞">
                  <div className="grid grid-cols-2 gap-4">
                     <LimitedInput label="Phone Number" max={15} value={payload.contact?.phone} onChange={v=>updateProp('contact', {...payload.contact, phone: v})} />
                     <LimitedInput label="Email" max={40} value={payload.contact?.email} onChange={v=>updateProp('contact', {...payload.contact, email: v})} />
                     <div className="col-span-2"><LimitedInput label="Address Block" type="textarea" max={250} value={payload.contact?.address} onChange={v=>updateProp('contact', {...payload.contact, address: v})} /></div>
                  </div>
               </SectionCard>
            </div>
         );

      case 'sports-gymkhana':
         return (
            <div className="space-y-8">
               <SectionCard title="Available Sports" icon="🏃">
                  <DynamicListManager items={payload.sports} maxItems={15} onChange={v=>updateProp('sports', v)} fields={[
                     { key: 'name', label: 'Sport Name', max: 25 },
                     { key: 'icon', label: 'Emoji / Icon', max: 4 }
                  ]} />
               </SectionCard>
               <SectionCard title="Top Achievements" icon="🏆">
                  <StringListManager items={payload.achievements} maxItems={10} maxLength={120} onChange={v=>updateProp('achievements', v)} label="Achievement" />
               </SectionCard>
               <SectionCard title="Tournament Results" icon="🏅">
                  <DynamicListManager items={payload.results} maxItems={5} onChange={v=>updateProp('results', v)} fields={[
                     { key: 'year', label: 'Academic Year', max: 10 },
                     { key: 'entry', label: 'Result Summary Text', max: 80 }
                  ]} />
               </SectionCard>
               <SectionCard title="Gymkhana Rules" icon="⚖️">
                  <StringListManager items={payload.rules} maxItems={10} maxLength={200} onChange={v=>updateProp('rules', v)} label="Rule" />
               </SectionCard>
            </div>
         );

      default:
        return <div className="p-8 text-center text-slate-400 font-bold uppercase tracking-widest bg-slate-50 border border-slate-100 rounded-3xl">Module being refined...</div>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 animate-fade-in relative">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div>
            <h1 className="text-3xl font-extrabold text-[#111827]">{data?.name}</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">FACILITIES EDITOR</p>
          </div>
        </div>
        <button onClick={handleSubmit} disabled={saving} className="px-8 py-3.5 bg-[#2563EB] text-white rounded-2xl font-black text-sm uppercase tracking-wider shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center gap-2">
          {saving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-6">
         {renderContent()}
      </div>
    </div>
  );
};

export default FacilitiesForm;
