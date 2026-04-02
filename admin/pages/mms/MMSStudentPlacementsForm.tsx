import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Image as ImageIcon, CheckCircle, AlertTriangle } from 'lucide-react';
import type { TrainingPlacementPayload } from '../../types';
import { trainingPlacementApi } from '../../api/trainingPlacement';
import { resolveApiUrl } from '../../../services/api';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';

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
        description="MMS Training & Placement Editor"
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
        <SectionCard title="Student Placements" icon="🎓">
          <p className="text-xs text-slate-500 mb-4 font-medium">Add placed students (max 6). Includes student photo, name, specialization, and company.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {form.studentPlacements?.map((item, i) => (
              <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-xl relative space-y-3">
                <button type="button" onClick={() => {
                  const c = [...form.studentPlacements!]; c.splice(i, 1); setForm({ ...form, studentPlacements: c });
                }} className="absolute top-2 right-2 text-red-500 z-10 p-1 bg-white rounded-md shadow-sm border border-red-100"><Trash2 className="w-3.5 h-3.5" /></button>

                  <ImageUploader 
                    value={item.image}
                    onFileSelect={(f) => {
                      const c = [...form.studentPlacements!];
                      c[i] = { ...c[i], image: f };
                      setForm({ ...form, studentPlacements: c });
                    }}
                  />

                <div className="relative">
                  <label className="admin-label">Sr. No</label>
                  <input className="admin-input-small" placeholder="Sr No" value={item.srNo} onChange={e => {
                    const c = [...form.studentPlacements!]; c[i] = { ...c[i], srNo: e.target.value }; setForm({ ...form, studentPlacements: c });
                  }} />
                </div>
                <div className="relative">
                  <label className="admin-label">Student Name <span className="text-slate-400 normal-case">({item.studentName.length}/25)</span></label>
                  <input className="admin-input-small" placeholder="Full name" value={item.studentName} onChange={e => handleTextChange(e.target.value, 25, val => {
                    const c = [...form.studentPlacements!]; c[i] = { ...c[i], studentName: val }; setForm({ ...form, studentPlacements: c });
                  })} />
                </div>
                <div className="relative">
                  <label className="admin-label">Specialization <span className="text-slate-400 normal-case">({item.specialization.length}/15)</span></label>
                  <input className="admin-input-small" placeholder="e.g. Finance" value={item.specialization} onChange={e => handleTextChange(e.target.value, 15, val => {
                    const c = [...form.studentPlacements!]; c[i] = { ...c[i], specialization: val }; setForm({ ...form, studentPlacements: c });
                  })} />
                </div>
                <div className="relative">
                  <label className="admin-label">Company <span className="text-slate-400 normal-case">({item.company.length}/40)</span></label>
                  <input className="admin-input-small" placeholder="Company name" value={item.company} onChange={e => handleTextChange(e.target.value, 40, val => {
                    const c = [...form.studentPlacements!]; c[i] = { ...c[i], company: val }; setForm({ ...form, studentPlacements: c });
                  })} />
                </div>
              </div>
            ))}
            {(form.studentPlacements?.length || 0) < 6 && (
              <button type="button" onClick={() => setForm({ ...form, studentPlacements: [...(form.studentPlacements || []), { srNo: '', studentName: '', specialization: '', company: '' }] })} className="btn-add min-h-[18rem]">
                <Plus className="w-5 h-5 mx-auto mb-2" /> Add Student (Max 6)
              </button>
            )}
          </div>
          {form.studentPlacements?.length === 6 && <p className="text-xs text-amber-500 font-bold mt-3">Max 6 students reached.</p>}
        </SectionCard>

        {/* SECTION 2: Our Recruiters Banner */}
        <SectionCard title="Our Recruiters" icon="🏢">
          <p className="text-xs text-slate-500 mb-4 font-medium">Upload a single recruiter showcase banner image with an optional label.</p>
          <div className="max-w-lg space-y-4">
            <div className="relative">
              <label className="admin-label">Banner Label (Optional)</label>
              <input className="admin-input-small" placeholder="e.g. Our Top Recruiters" value={form.recruitersBanner?.label || ''} onChange={e => {
                setForm({ ...form, recruitersBanner: { ...form.recruitersBanner, label: e.target.value } });
              }} />
            </div>
            <div>
              <label className="admin-label mb-2">Recruiters Banner Image</label>
                <ImageUploader
                  value={form.recruitersBanner?.image}
                  onFileSelect={(f) => setForm({ ...form, recruitersBanner: { ...form.recruitersBanner, image: f } })}
                />
              </div>
            </div>
          </SectionCard>

        {/* SECTION 3: Placement Gallery */}
        <SectionCard title="Placement Gallery" icon="📸">
          <p className="text-xs text-slate-500 mb-4 font-medium">Upload up to 8 images for the placement gallery. Label max 35 characters.</p>
          <GalleryEditor
            items={form.placementGallery || []}
            max={8}
            labelLimit={35}
            onChange={(c) => setForm({ ...form, placementGallery: c })}
          />
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

export default MMSStudentPlacementsForm;
