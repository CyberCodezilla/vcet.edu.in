import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2, Image as ImageIcon, CheckCircle, AlertTriangle } from 'lucide-react';
import type { TrainingPlacementPayload } from '../../types';
import { trainingPlacementApi } from '../../api/trainingPlacement';
import { resolveApiUrl } from '../../../services/api';

const MMSPlacementInfoForm: React.FC = () => {
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/admin/pages/mms" className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold text-[#111827]">Placement Info</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">MMS TRAINING & PLACEMENT EDITOR</p>
          </div>
        </div>
        <button onClick={() => handleSave()} disabled={saving} className="px-8 py-3.5 bg-[#2563EB] text-white rounded-2xl font-black text-sm uppercase tracking-wider shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center gap-2">
          {saving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

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
        <SectionCard title="Placement Objectives" icon="🎯">
          <p className="text-xs text-slate-500 mb-4 font-medium">Define placement objectives (max 7). Each objective max 160 characters.</p>
          <div className="space-y-3">
            {form.placementObjectives?.map((obj, i) => (
              <div key={i} className="flex gap-2">
                <div className="flex-1 relative">
                  <textarea className="admin-input-small resize-none" rows={2} value={obj.objective} placeholder="Placement objective statement..." onChange={e => handleTextChange(e.target.value, 160, val => {
                    const c = [...form.placementObjectives!]; c[i] = { ...c[i], objective: val }; setForm({ ...form, placementObjectives: c });
                  })} />
                  <span className="absolute right-2 bottom-2 text-[10px] text-slate-400">{obj.objective.length}/160</span>
                </div>
                <button type="button" onClick={() => {
                  const c = [...form.placementObjectives!]; c.splice(i, 1); setForm({ ...form, placementObjectives: c });
                }} className="p-2 text-red-500 rounded-lg shrink-0 self-start"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
            {(form.placementObjectives?.length || 0) < 7 && (
              <button type="button" onClick={() => setForm({ ...form, placementObjectives: [...(form.placementObjectives || []), { objective: '' }] })} className="btn-add">
                <Plus className="w-4 h-4" /> Add Objective (Max 7)
              </button>
            )}
            {form.placementObjectives?.length === 7 && <p className="text-xs text-amber-500 font-bold">Max 7 objectives reached.</p>}
          </div>
        </SectionCard>

        {/* SECTION 2: Placement Cell Members */}
        <SectionCard title="Placement Cell Members" icon="👤">
          <p className="text-xs text-slate-500 mb-4 font-medium">Add placement cell members (max 2). Includes photo, name, role, email, phone, extension.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {form.placementCellMembers?.map((mem, i) => (
              <div key={i} className="p-5 bg-slate-50 border border-slate-200 rounded-xl relative space-y-3">
                <button type="button" onClick={() => {
                  const c = [...form.placementCellMembers!]; c.splice(i, 1); setForm({ ...form, placementCellMembers: c });
                }} className="absolute top-2 right-2 text-red-500 z-10 p-1 bg-white rounded-md shadow-sm border border-red-100"><Trash2 className="w-3.5 h-3.5" /></button>

                <ImageUploader 
                  value={mem.image} 
                  onFileSelect={f => {
                    const c = [...form.placementCellMembers!]; 
                    c[i] = { ...c[i], image: f }; 
                    setForm({ ...form, placementCellMembers: c });
                  }} 
                />

                <div className="relative">
                  <label className="admin-label">Name <span className="text-slate-400 normal-case">({mem.name.length}/30)</span></label>
                  <input className="admin-input-small" placeholder="Full Name *" value={mem.name} onChange={e => handleTextChange(e.target.value, 30, val => {
                    const c = [...form.placementCellMembers!]; c[i] = { ...c[i], name: val }; setForm({ ...form, placementCellMembers: c });
                  })} />
                </div>
                <div className="relative">
                  <label className="admin-label">Role <span className="text-slate-400 normal-case">({mem.role.length}/40)</span></label>
                  <input className="admin-input-small" placeholder="Designation / Role *" value={mem.role} onChange={e => handleTextChange(e.target.value, 40, val => {
                    const c = [...form.placementCellMembers!]; c[i] = { ...c[i], role: val }; setForm({ ...form, placementCellMembers: c });
                  })} />
                </div>
                <div className="relative">
                  <label className="admin-label">Email <span className="text-slate-400 normal-case">({mem.email.length}/30)</span></label>
                  <input className="admin-input-small" placeholder="Email address *" value={mem.email} onChange={e => handleTextChange(e.target.value, 30, val => {
                    const c = [...form.placementCellMembers!]; c[i] = { ...c[i], email: val }; setForm({ ...form, placementCellMembers: c });
                  })} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <label className="admin-label">Phone <span className="text-slate-400 normal-case">({mem.phone.length}/25)</span></label>
                    <input className="admin-input-small" placeholder="Phone *" value={mem.phone} onChange={e => handleTextChange(e.target.value, 25, val => {
                      const c = [...form.placementCellMembers!]; c[i] = { ...c[i], phone: val }; setForm({ ...form, placementCellMembers: c });
                    })} />
                  </div>
                  <div className="relative">
                    <label className="admin-label">Extension <span className="text-slate-400 normal-case">({mem.extension.length}/30)</span></label>
                    <input className="admin-input-small" placeholder="Ext" value={mem.extension} onChange={e => handleTextChange(e.target.value, 30, val => {
                      const c = [...form.placementCellMembers!]; c[i] = { ...c[i], extension: val }; setForm({ ...form, placementCellMembers: c });
                    })} />
                  </div>
                </div>
              </div>
            ))}
            {(form.placementCellMembers?.length || 0) < 2 && (
              <button type="button" onClick={() => setForm({ ...form, placementCellMembers: [...(form.placementCellMembers || []), { name: '', role: '', email: '', phone: '', extension: '' }] })} className="btn-add h-full min-h-[16rem]">
                <Plus className="w-5 h-5 mx-auto mb-2" /> Add Member (Max 2)
              </button>
            )}
          </div>
        </SectionCard>

        {/* SECTION 3: Soft Skill Training */}
        <SectionCard title="Soft Skill Training" icon="💡">
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-sm text-slate-700 mb-3">Program Description <span className="text-slate-400 font-medium text-xs">(Max 3 paragraphs, 1100 chars each)</span></h4>
              <div className="space-y-3">
                {form.softSkillTraining?.paragraphs?.map((p, i) => (
                  <div key={i} className="flex gap-2">
                    <div className="flex-1 relative">
                      <textarea className="admin-input-small resize-none" rows={4} value={p.text} placeholder="Program description paragraph..." onChange={e => handleTextChange(e.target.value, 1100, val => {
                        const c = { ...form.softSkillTraining! };
                        const paras = [...c.paragraphs]; paras[i] = { ...paras[i], text: val };
                        setForm({ ...form, softSkillTraining: { ...c, paragraphs: paras } });
                      })} />
                      <span className="absolute right-2 bottom-2 text-[10px] text-slate-400">{p.text.length}/1100</span>
                    </div>
                    <button type="button" onClick={() => {
                      const c = { ...form.softSkillTraining! };
                      const paras = [...c.paragraphs]; paras.splice(i, 1);
                      setForm({ ...form, softSkillTraining: { ...c, paragraphs: paras } });
                    }} className="text-red-500 shrink-0 self-start p-2"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
                {(form.softSkillTraining?.paragraphs?.length || 0) < 3 && (
                  <button type="button" className="btn-add" onClick={() => {
                    const c = form.softSkillTraining ? { ...form.softSkillTraining } : { paragraphs: [], images: [] };
                    setForm({ ...form, softSkillTraining: { ...c, paragraphs: [...c.paragraphs, { text: '' }] } });
                  }}><Plus className="w-4 h-4" /> Add Paragraph</button>
                )}
              </div>
            </div>

            <div className="pt-5 border-t border-slate-200">
              <h4 className="font-bold text-sm text-slate-700 mb-3">Session Images <span className="text-slate-400 font-medium text-xs">(Max 2, Label 21 chars)</span></h4>
              <GalleryEditor items={form.softSkillTraining?.images || []} max={2} labelLimit={21} onChange={(imgs) => {
                setForm({ ...form, softSkillTraining: { ...form.softSkillTraining!, images: imgs } });
              }} />
            </div>
          </div>
        </SectionCard>

        {/* SECTION 4: Psychometric Test */}
        <SectionCard title="Psychometric Test" icon="🧠">
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-sm text-slate-700 mb-3">Test Description <span className="text-slate-400 font-medium text-xs">(Max 1300 chars)</span></h4>
              <div className="relative">
                <textarea className="admin-input-small resize-none" rows={6} value={form.psychometricTest?.paragraph || ''} placeholder="Psychometric test description..." onChange={e => handleTextChange(e.target.value, 1300, val => {
                  setForm({ ...form, psychometricTest: { ...form.psychometricTest!, paragraph: val } });
                })} />
                <span className="absolute right-2 bottom-2 text-[10px] text-slate-400">{(form.psychometricTest?.paragraph || '').length}/1300</span>
              </div>
            </div>

            <div className="pt-5 border-t border-slate-200">
              <h4 className="font-bold text-sm text-slate-700 mb-3">Session Images <span className="text-slate-400 font-medium text-xs">(Max 2, Label 19 chars)</span></h4>
              <GalleryEditor items={form.psychometricTest?.images || []} max={2} labelLimit={19} onChange={(imgs) => {
                setForm({ ...form, psychometricTest: { ...form.psychometricTest!, images: imgs } });
              }} />
            </div>
          </div>
        </SectionCard>

      </form>
      <style>{`
        .admin-input-small { width: 100%; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 0.5rem; padding: 0.5rem 0.75rem; color: #0f172a; font-size: 0.75rem; font-weight: 500; outline: none; transition: 0.2s; }
        .admin-input-small:focus { border-color: #2563EB; background: #fff; box-shadow: 0 0 0 2px rgba(37,99,235, 0.1); }
        .admin-label { display: block; font-size: 0.65rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.35rem; }
        .btn-add { display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; border: 2px dashed #cbd5e1; border-radius: 0.75rem; padding: 0.75rem; font-size: 0.75rem; font-weight: bold; color: #64748b; background: white; transition: 0.2s; cursor: pointer; }
        .btn-add:hover { border-color: #2563EB; color: #2563EB; background: #eff6ff; }
      `}</style>
    </div>
  );
};

/* ── Helper Components ── */

const SectionCard = ({ icon, title, children }: any) => (
  <div className="bg-white rounded-[2rem] p-8 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.05)] border border-slate-100">
    <div className="flex items-center gap-3 mb-8">
      {icon && <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-lg shadow-sm border border-slate-100">{icon}</div>}
      <h2 className="text-sm font-black text-[#111827] uppercase tracking-wider">{title}</h2>
    </div>
    <div>{children}</div>
  </div>
);

const ImageUploader = ({ value, onFileSelect }: { value?: any; onFileSelect: (f: File) => void }) => {
  const imageUrl = value instanceof File ? URL.createObjectURL(value) : (value && typeof value === 'object' && 'url' in value ? resolveApiUrl((value as any).url) : resolveApiUrl(value as string));
  return (
    <div className="relative group rounded-xl border-2 border-dashed border-slate-200 p-4 bg-slate-50 hover:bg-slate-100 transition-colors flex flex-col items-center justify-center min-h-[80px] text-center cursor-pointer overflow-hidden">
      <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={(e) => { if (e.target.files?.[0]) onFileSelect(e.target.files[0]); }} />
      {imageUrl ? (
        <img src={imageUrl} alt="preview" className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <>
          <ImageIcon className="w-5 h-5 text-slate-400 group-hover:text-blue-500 mb-1" />
          <p className="text-[10px] text-slate-500 font-semibold">Click to Upload</p>
        </>
      )}
    </div>
  );
};

const GalleryEditor = ({ items, max, labelLimit, onChange }: { items: any[]; max: number; labelLimit: number; onChange: (items: any[]) => void }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {items.map((item, i) => {
      const imgUrl = item.image instanceof File ? URL.createObjectURL(item.image) : (item.image && typeof item.image === 'object' && 'url' in item.image ? resolveApiUrl((item.image as any).url) : resolveApiUrl(item.image as string));
      return (
      <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-lg relative space-y-2">
        <button type="button" onClick={() => onChange(items.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 bg-white border border-red-100 rounded text-red-500 z-10 p-0.5"><Trash2 className="w-3 h-3" /></button>
        <div className="relative group rounded-lg border border-dashed border-slate-300 bg-white h-20 flex items-center justify-center cursor-pointer overflow-hidden">
          <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={(e) => {
            if (e.target.files?.[0]) {
              const c = [...items]; c[i] = { ...c[i], image: e.target.files[0] }; onChange(c);
            }
          }} />
          {imgUrl ? (
            <img src={imgUrl} alt="preview" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <ImageIcon className="w-5 h-5 text-slate-400 group-hover:text-blue-500" />
          )}
        </div>
        <input className="admin-input-small text-center relative z-20" placeholder={`Label (Max ${labelLimit})`} value={item.label} onChange={e => {
          if (e.target.value.length <= labelLimit) {
            const c = [...items]; c[i] = { ...c[i], label: e.target.value }; onChange(c);
          }
        }} />
      </div>
    )})}
    {items.length < max && (
      <button type="button" onClick={() => onChange([...items, { label: '', image: null }])} className="btn-add min-h-[7rem]">
        <Plus className="w-5 h-5 mx-auto mb-1" /> Add Image
      </button>
    )}
  </div>
);

export default MMSPlacementInfoForm;

