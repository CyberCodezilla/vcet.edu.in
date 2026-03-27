import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { departmentApi } from '../../api/departments';
import { facultyApi } from '../../api/faculty';
import type { DepartmentPayload, Department, Faculty } from '../../types';

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

const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
);

const TrashIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
);

/* ── Custom File Input (PDF) ── */
const FileUpload = ({ label, value, onChange, id, accept = ".pdf" }: { label: string; value: string | File | undefined; onChange: (f: File | undefined) => void; id: string; accept?: string }) => {
  const fileName = value instanceof File ? value.name : (value ? value.split('/').pop()?.split('?')[0] : 'Choose PDF file');
  return (
    <div className="space-y-2">
      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</label>
      <div className="flex items-center gap-3">
        <label className="flex-1 flex items-center gap-3 p-3.5 bg-slate-50 ring-1 ring-slate-200 rounded-2xl cursor-pointer hover:bg-slate-100 transition-all overflow-hidden border border-dashed border-slate-300">
          <svg className="w-4 h-4 text-indigo-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          <span className="text-xs font-bold text-slate-600 truncate">{fileName}</span>
          <input type="file" className="hidden" accept={accept} onChange={e => { const f = e.target.files?.[0]; if (f) onChange(f); }} />
        </label>
        {value && (
          <button type="button" onClick={() => onChange(undefined)} className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        )}
      </div>
    </div>
  );
};

/* ── Custom Image Input ── */
const ImageUpload = ({ label, value, onChange, id }: { label: string; value: string | File | undefined; onChange: (f: File | undefined) => void; id: string }) => {
  const [preview, setPreview] = useState<string | null>(null);
  useEffect(() => {
    if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    } else if (typeof value === 'string') setPreview(value);
    else setPreview(null);
  }, [value]);
  return (
    <div className="space-y-2">
      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</label>
      <div className="flex items-center gap-4">
        {preview && (
          <div className="w-14 h-14 rounded-2xl overflow-hidden ring-1 ring-slate-200 shrink-0 shadow-sm border-2 border-white">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
        <label className="flex-1 flex items-center gap-3 p-3.5 bg-slate-50 ring-1 ring-slate-200 rounded-2xl cursor-pointer hover:bg-slate-100 transition-all overflow-hidden border border-dashed border-slate-300">
          <svg className="w-4 h-4 text-indigo-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          <span className="text-xs font-bold text-slate-600 truncate">{value instanceof File ? value.name : (value ? 'Change Image' : 'Upload Image')}</span>
          <input type="file" className="hidden" accept="image/*" onChange={e => { const f = e.target.files?.[0]; if (f) onChange(f); }} />
        </label>
        {value && (
          <button type="button" onClick={() => onChange(undefined)} className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        )}
      </div>
    </div>
  );
};

/* ── Initial Empty Content State ────────────────────────────────────────────── */
const initialContent = {
  dabMembers: [{ name: '', designation: '', organization: '' }],
  faculty: [] as number[],
  toppers: [{ name: '', year: '', cgpa: '' }],
  newsletter: [{ title: '', link: '' }],
  
  // New / Modernized Structure
  patents: [{ title: '', description: '', pdf: undefined as string | File | undefined }],
  mous: [{ organization: '', description: '', pdf: undefined as string | File | undefined }],
  syllabus: [{ title: '', pdf: undefined as string | File | undefined }],
  timetable: [{ class: '', pdf: undefined as string | File | undefined }],
  facultyAchievements: [{ title: '', description: '', image: undefined as string | File | undefined, pdf: undefined as string | File | undefined }],
  studentAchievements: [{ title: '', description: '', image: undefined as string | File | undefined, pdf: undefined as string | File | undefined }],
  activities: [{ title: '', description: '', image: undefined as string | File | undefined, pdf: undefined as string | File | undefined }],
};

export default function DepartmentForm() {
  const { slug: existingSlug } = useParams<{ slug: string }>();
  const isEditing = Boolean(existingSlug);
  const navigate = useNavigate();

  const [departmentId, setDepartmentId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [is_active, setIsActive] = useState(true);
  const [content, setContent] = useState<Required<DepartmentPayload>['content']>(initialContent);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [availableFaculty, setAvailableFaculty] = useState<Faculty[]>([]);

  useEffect(() => {
    facultyApi.list().then(res => setAvailableFaculty(res.data)).catch(console.error);
  }, []);

  // Auto-generate slug from name if not editing
  useEffect(() => {
    if (!isEditing && name) {
      setSlug(name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  }, [name, isEditing]);

  useEffect(() => {
    if (isEditing && existingSlug) {
      setLoading(true);
      departmentApi.getBySlug(existingSlug)
        .then(res => {
          const dept = res.data;
          setDepartmentId(dept.id);
          setName(dept.name);
          setSlug(dept.slug);
          setIsActive(dept.is_active);
          setContent({ ...initialContent, ...dept.content });
        })
        .catch(err => {
          console.error(err);
          setToast({ message: 'Failed to load department', type: 'error' });
          setTimeout(() => navigate('/admin/pages/departments/list'), 2000);
        })
        .finally(() => setLoading(false));
    }
  }, [isEditing, existingSlug, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) {
      setToast({ message: 'Name and Slug are required', type: 'error' });
      return;
    }

    setSaving(true);
    const payload: DepartmentPayload = {
      name,
      slug,
      is_active,
      content
    };

    try {
      if (isEditing && departmentId) {
        await departmentApi.update(departmentId, payload);
        setToast({ message: 'Department updated successfully', type: 'success' });
        // Update URL if slug changed
        if (slug !== existingSlug) {
          setTimeout(() => navigate(`/admin/pages/departments/list/${slug}/edit`, { replace: true }), 1000);
        }
      } else {
        await departmentApi.create(payload);
        setToast({ message: 'Department created successfully', type: 'success' });
        setTimeout(() => navigate('/admin/pages/departments/list'), 1500);
      }
    } catch (err: any) {
      setToast({ message: err.message || 'Failed to save department', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  /* ── Array Helpers ── */
  const updateArrayItem = <K extends keyof typeof initialContent>(key: K, index: number, value: any) => {
    const arr = [...(content[key] as any[])];
    arr[index] = value;
    setContent(prev => ({ ...prev, [key]: arr }));
  };

  const addArrayItem = <K extends keyof typeof initialContent>(key: K, emptyValue: any) => {
    setContent(prev => ({ ...prev, [key]: [...(prev[key] as any[]), emptyValue] }));
  };

  const removeArrayItem = <K extends keyof typeof initialContent>(key: K, index: number) => {
    setContent(prev => ({ ...prev, [key]: (prev[key] as any[]).filter((_, i) => i !== index) }));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-10 h-10 border-4 border-slate-100 border-t-[#1e293b] rounded-full animate-spin" />
        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Loading department details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-24 space-y-8">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-widest">
            <Link to="/admin" className="hover:text-slate-600 transition-colors">Dashboard</Link>
            <span className="text-slate-300 font-normal">/</span>
            <Link to="/admin/pages/departments/list" className="hover:text-slate-600 transition-colors">Departments</Link>
            <span className="text-slate-300 font-normal">/</span>
            <span className="text-slate-600">{isEditing ? 'Edit' : 'Create'}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#111827]">
            {isEditing ? 'Edit Department' : 'Create Department'}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/admin/pages/departments/list" className="text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="bg-[#1e293b] hover:bg-[#0f172a] text-white font-bold px-8 py-3.5 rounded-full text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {saving ? (
              <><span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> Saving...</>
            ) : (
              <><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg> {isEditing ? 'Update Details' : 'Save Department'}</>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Main Info */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <h2 className="text-xl font-extrabold text-slate-800 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Basic Information
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Department Name</label>
                <input
                  type="text"
                  value={name || ""}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-2xl px-5 py-4 text-sm font-bold transition-all outline-none"
                  placeholder="e.g. Computer Engineering"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">URL Slug</label>
                  <input
                    type="text"
                    value={slug || ""}
                    onChange={e => setSlug(e.target.value)}
                    className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-2xl px-5 py-4 text-sm font-bold transition-all outline-none text-slate-600"
                    placeholder="e.g. computer-engineering"
                    required
                  />
                  <p className="text-[10px] font-bold text-slate-400 mt-2 ml-1">Will be accessible at /departments/{slug || '...'}</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Status</label>
                  <select
                    value={is_active ? 'true' : 'false'}
                    onChange={e => setIsActive(e.target.value === 'true')}
                    className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-2xl px-5 py-4 text-sm font-bold transition-all outline-none"
                  >
                    <option value="true">Active (Visible on frontend)</option>
                    <option value="false">Inactive (Draft/Hidden)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Patents */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                </div>
                Patents
              </h2>
              <button 
                type="button"
                onClick={() => addArrayItem('patents', { title: '', description: '', pdf: undefined })} 
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[11px] font-bold hover:bg-indigo-100 transition-all border border-indigo-100 shadow-sm"
              >
                <PlusIcon /> Add Patent
              </button>
            </div>
            <div className="space-y-6">
              {content.patents?.map((patent, i) => (
                <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 relative group/row space-y-4">
                  <button type="button" onClick={() => removeArrayItem('patents', i)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-all"><TrashIcon /></button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Patent Title</label>
                      <input
                        type="text"
                        value={patent.title || ""}
                        onChange={e => updateArrayItem('patents', i, { ...patent, title: e.target.value })}
                        className="w-full bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 rounded-2xl px-5 py-3.5 text-sm font-bold outline-none transition-all"
                        placeholder="e.g. AI-based Traffic System"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Description</label>
                      <textarea
                        value={patent.description || ""}
                        onChange={e => updateArrayItem('patents', i, { ...patent, description: e.target.value })}
                        className="w-full bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 rounded-2xl px-5 py-3.5 text-sm font-medium outline-none transition-all"
                        placeholder="Briefly describe the patent..."
                        rows={2}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <FileUpload 
                        label="Patent PDF" 
                        id={`patent-pdf-${i}`} 
                        value={patent.pdf || ""} 
                        onChange={(f) => updateArrayItem('patents', i, { ...patent, pdf: f })} 
                      />
                    </div>
                  </div>
                </div>
              ))}
              {(!content.patents || content.patents.length === 0) && (
                <div className="text-center py-8 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                  <p className="text-xs font-bold text-slate-400 uppercase">No patents added yet</p>
                </div>
              )}
            </div>
          </div>

          {/* MoUs */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                MoUs & Collaborations
              </h2>
              <button 
                type="button"
                onClick={() => addArrayItem('mous', { organization: '', description: '', pdf: undefined })} 
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[11px] font-bold hover:bg-emerald-100 transition-all border border-emerald-100 shadow-sm"
              >
                <PlusIcon /> Add MoU
              </button>
            </div>
            <div className="space-y-6">
              {content.mous?.map((mou, i) => (
                <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 relative group/row space-y-4">
                  <button type="button" onClick={() => removeArrayItem('mous', i)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-all"><TrashIcon /></button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Organization Name</label>
                      <input
                        type="text"
                        value={mou.organization || ""}
                        onChange={e => updateArrayItem('mous', i, { ...mou, organization: e.target.value })}
                        className="w-full bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-emerald-500 rounded-2xl px-5 py-3.5 text-sm font-bold outline-none transition-all"
                        placeholder="e.g. Microsoft / AWS Academy"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Description</label>
                      <textarea
                        value={mou.description || ""}
                        onChange={e => updateArrayItem('mous', i, { ...mou, description: e.target.value })}
                        className="w-full bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-emerald-500 rounded-2xl px-5 py-3.5 text-sm font-medium outline-none transition-all"
                        placeholder="Briefly describe the collaboration..."
                        rows={2}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <FileUpload 
                        label="MoU PDF" 
                        id={`mou-pdf-${i}`} 
                        value={mou.pdf || ""} 
                        onChange={(f) => updateArrayItem('mous', i, { ...mou, pdf: f })} 
                      />
                    </div>
                  </div>
                </div>
              ))}
              {(!content.mous || content.mous.length === 0) && (
                <div className="text-center py-8 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                  <p className="text-xs font-bold text-slate-400 uppercase">No MoUs added yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Achievements - Faculty & Student */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <h2 className="text-xl font-extrabold text-slate-800 mb-8 flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" /></svg>
              </div>
              Achievements
            </h2>
            
            <div className="space-y-10">
              {/* Faculty Achievements */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Faculty Achievements</label>
                  <button type="button" onClick={() => addArrayItem('facultyAchievements', { title: '', description: '', image: undefined, pdf: undefined })} className="text-[10px] font-bold text-amber-600 hover:text-amber-800 flex items-center gap-1.5 uppercase tracking-widest bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100 transition-all">
                    <PlusIcon /> Add Achievement
                  </button>
                </div>
                <div className="space-y-4">
                  {content.facultyAchievements?.map((ach, i) => (
                    <div key={i} className="p-5 bg-slate-50/50 rounded-3xl border border-slate-100 relative group/row space-y-4">
                      <button type="button" onClick={() => removeArrayItem('facultyAchievements', i)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-all"><TrashIcon /></button>
                      <input
                        type="text"
                        value={ach.title || ""}
                        onChange={e => updateArrayItem('facultyAchievements', i, { ...ach, title: e.target.value })}
                        className="w-full bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-amber-500 rounded-2xl px-4 py-3 text-sm font-bold outline-none"
                        placeholder="Achievement Title"
                      />
                      <textarea
                        value={ach.description || ""}
                        onChange={e => updateArrayItem('facultyAchievements', i, { ...ach, description: e.target.value })}
                        className="w-full bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-amber-500 rounded-2xl px-4 py-3 text-sm font-medium outline-none"
                        placeholder="Brief description..."
                        rows={2}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ImageUpload label="Image (Optional)" id={`fac-ach-img-${i}`} value={ach.image || ""} onChange={f => updateArrayItem('facultyAchievements', i, { ...ach, image: f })} />
                        <FileUpload label="PDF (Optional)" id={`fac-ach-pdf-${i}`} value={ach.pdf || ""} onChange={f => updateArrayItem('facultyAchievements', i, { ...ach, pdf: f })} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Student Achievements */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Student Achievements</label>
                  <button type="button" onClick={() => addArrayItem('studentAchievements', { title: '', description: '', image: undefined, pdf: undefined })} className="text-[10px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 transition-all">
                    <PlusIcon /> Add Achievement
                  </button>
                </div>
                <div className="space-y-4">
                  {content.studentAchievements?.map((ach, i) => (
                    <div key={i} className="p-5 bg-slate-50/50 rounded-3xl border border-slate-100 relative group/row space-y-4">
                      <button type="button" onClick={() => removeArrayItem('studentAchievements', i)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-all"><TrashIcon /></button>
                      <input
                        type="text"
                        value={ach.title || ""}
                        onChange={e => updateArrayItem('studentAchievements', i, { ...ach, title: e.target.value })}
                        className="w-full bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 rounded-2xl px-4 py-3 text-sm font-bold outline-none"
                        placeholder="Achievement Title"
                      />
                      <textarea
                        value={ach.description || ""}
                        onChange={e => updateArrayItem('studentAchievements', i, { ...ach, description: e.target.value })}
                        className="w-full bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 rounded-2xl px-4 py-3 text-sm font-medium outline-none"
                        placeholder="Brief description..."
                        rows={2}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ImageUpload label="Image (Optional)" id={`stu-ach-img-${i}`} value={ach.image || ""} onChange={f => updateArrayItem('studentAchievements', i, { ...ach, image: f })} />
                        <FileUpload label="PDF (Optional)" id={`stu-ach-pdf-${i}`} value={ach.pdf || ""} onChange={f => updateArrayItem('studentAchievements', i, { ...ach, pdf: f })} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Activities */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                Department Activities
              </h2>
              <button 
                type="button"
                onClick={() => addArrayItem('activities', { title: '', description: '', image: undefined, pdf: undefined })} 
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-50 text-purple-600 rounded-xl text-[11px] font-bold hover:bg-purple-100 transition-all border border-purple-100 shadow-sm"
              >
                <PlusIcon /> Add Activity
              </button>
            </div>
            <div className="space-y-6">
              {content.activities?.map((act, i) => (
                <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 relative group/row space-y-4">
                  <button type="button" onClick={() => removeArrayItem('activities', i)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-all"><TrashIcon /></button>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Activity Title</label>
                      <input
                        type="text"
                        value={act.title || ""}
                        onChange={e => updateArrayItem('activities', i, { ...act, title: e.target.value })}
                        className="w-full bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-purple-500 rounded-2xl px-5 py-3.5 text-sm font-bold outline-none"
                        placeholder="e.g. Industrial Visit to ISRO"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Description</label>
                      <textarea
                        value={act.description || ""}
                        onChange={e => updateArrayItem('activities', i, { ...act, description: e.target.value })}
                        className="w-full bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-purple-500 rounded-2xl px-5 py-3.5 text-sm font-medium outline-none"
                        placeholder="Brief details about the activity..."
                        rows={2}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ImageUpload label="Activity Image" id={`act-img-${i}`} value={act.image || ""} onChange={f => updateArrayItem('activities', i, { ...act, image: f })} />
                      <FileUpload label="Activity PDF/Report" id={`act-pdf-${i}`} value={act.pdf || ""} onChange={f => updateArrayItem('activities', i, { ...act, pdf: f })} />
                    </div>
                  </div>
                </div>
              ))}
              {(!content.activities || content.activities.length === 0) && (
                <div className="text-center py-8 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                  <p className="text-xs font-bold text-slate-400 uppercase">No activities added yet</p>
                </div>
              )}
            </div>
          </div>

          {/* DAB Members */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                DAB Members
              </h2>
              <button 
                type="button"
                onClick={() => addArrayItem('dabMembers', { name: '', designation: '', organization: '' })} 
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[11px] font-bold hover:bg-indigo-100 transition-all border border-indigo-100"
              >
                <PlusIcon /> Add Member
              </button>
            </div>
            <div className="space-y-4">
              {content.dabMembers?.map((member, i) => (
                <div key={i} className="flex gap-4 items-center group/row">
                  <input
                    type="text"
                    placeholder="Name"
                    value={member.name || ""}
                    onChange={e => updateArrayItem('dabMembers', i, { ...member, name: e.target.value })}
                    className="flex-1 bg-slate-50 border-0 ring-1 ring-slate-200/50 focus:ring-2 focus:ring-indigo-500 rounded-2xl px-5 py-4 text-sm font-medium outline-none transition-all"
                  />
                  <input
                    type="text"
                    placeholder="Designation"
                    value={member.designation || ""}
                    onChange={e => updateArrayItem('dabMembers', i, { ...member, designation: e.target.value })}
                    className="flex-1 bg-slate-50 border-0 ring-1 ring-slate-200/50 focus:ring-2 focus:ring-indigo-500 rounded-2xl px-5 py-4 text-sm font-medium outline-none transition-all"
                  />
                  <input
                    type="text"
                    placeholder="Organization"
                    value={member.organization || ""}
                    onChange={e => updateArrayItem('dabMembers', i, { ...member, organization: e.target.value })}
                    className="flex-1 bg-slate-50 border-0 ring-1 ring-slate-200/50 focus:ring-2 focus:ring-indigo-500 rounded-2xl px-5 py-4 text-sm font-medium outline-none transition-all"
                  />
                  <button 
                    type="button"
                    onClick={() => removeArrayItem('dabMembers', i)} 
                    className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all opacity-40 group-hover/row:opacity-100"
                  >
                    <TrashIcon />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Faculty */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <h2 className="text-xl font-extrabold text-slate-800 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              Core Faculty Selection
            </h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Select faculty from the directory. Grouped by department.</p>
            
            <div className="max-h-96 overflow-y-auto pr-2 space-y-6">
              {Object.entries(
                availableFaculty.reduce((acc, f) => {
                  acc[f.basicInfo.department] = acc[f.basicInfo.department] || [];
                  acc[f.basicInfo.department].push(f);
                  const deptName = f.basicInfo?.department || 'Unassigned';
                  acc[deptName] = acc[deptName] || [];
                  acc[deptName].push(f);
                  return acc;
                }, {} as Record<string, Faculty[]>)
              ).map(([deptName, facs]) => (
                <div key={deptName} className="space-y-3">
                  <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest px-2">{deptName}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {facs.map((f, idx) => {
                        const isSelected = content.faculty?.includes(f.id as any);
                        return (
                          <label key={`${f.id}-${idx}`} className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${isSelected ? 'bg-indigo-50 border-indigo-200 ring-4 ring-indigo-50' : 'bg-white border-slate-100 hover:border-slate-200'}`}>
                          <input
                            type="checkbox"
                            className="mt-1 w-4 h-4 text-indigo-600 rounded-lg border-slate-300 focus:ring-indigo-500"
                            checked={isSelected}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setContent(prev => ({ ...prev, faculty: [...(prev.faculty || []), f.id] as any }));
                              } else {
                                setContent(prev => ({ ...prev, faculty: (prev.faculty || []).filter(id => id !== f.id as any) }));
                              }
                            }}
                          />
                          <div className="flex flex-col">

                            <span className={`text-sm font-bold ${isSelected ? 'text-indigo-900' : 'text-slate-700'}`}>{f.basicInfo?.fullName || 'Unnamed'}</span>
                            <span className={`text-[11px] font-medium ${isSelected ? 'text-indigo-600/70' : 'text-slate-400'}`}>{f.basicInfo?.designation || f.qualifications?.specialization || 'Faculty'}</span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
              {availableFaculty.length === 0 && (
                <p className="text-sm text-slate-500 italic py-4">No faculty found. Please add faculty in the Faculty page first.</p>
              )}
            </div>
          </div>

          {/* Student Toppers */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" /></svg>
                </div>
                Student Toppers
              </h2>
              <button 
                type="button"
                onClick={() => addArrayItem('toppers', { name: '', year: '', cgpa: '' })} 
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-50 text-amber-600 rounded-xl text-[11px] font-bold hover:bg-amber-100 transition-all border border-amber-100"
              >
                <PlusIcon /> Add Topper
              </button>
            </div>
            <div className="space-y-4">
              {content.toppers?.map((topper, i) => (
                <div key={i} className="flex gap-4 items-center group/row">
                  <input
                    type="text"
                    placeholder="Student Name"
                    value={topper.name || ""}
                    onChange={e => updateArrayItem('toppers', i, { ...topper, name: e.target.value })}
                    className="flex-1 bg-slate-50 border-0 ring-1 ring-slate-200/50 focus:ring-2 focus:ring-amber-500 rounded-2xl px-5 py-4 text-sm font-medium outline-none transition-all"
                  />
                  <input
                    type="text"
                    placeholder="Year (e.g. 2023-24)"
                    value={topper.year || ""}
                    onChange={e => updateArrayItem('toppers', i, { ...topper, year: e.target.value })}
                    className="w-48 bg-slate-50 border-0 ring-1 ring-slate-200/50 focus:ring-2 focus:ring-amber-500 rounded-2xl px-5 py-4 text-sm font-medium outline-none transition-all"
                  />
                  <input
                    type="text"
                    placeholder="CGPA"
                    value={topper.cgpa || ""}
                    onChange={e => updateArrayItem('toppers', i, { ...topper, cgpa: e.target.value })}
                    className="w-32 bg-slate-50 border-0 ring-1 ring-slate-200/50 focus:ring-2 focus:ring-amber-500 rounded-2xl px-5 py-4 text-sm font-medium outline-none transition-all"
                  />
                  <button 
                    type="button"
                    onClick={() => removeArrayItem('toppers', i)} 
                    className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all opacity-40 group-hover/row:opacity-100"
                  >
                    <TrashIcon />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar Sections */}
        <div className="space-y-8">
          
          {/* Syllabus Links */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-extrabold text-slate-800 flex items-center gap-3">
                <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                </div>
                Syllabus
              </h2>
              <button 
                type="button"
                onClick={() => addArrayItem('syllabus', { title: '', pdf: undefined })} 
                className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-xl text-[10px] font-bold hover:bg-indigo-100 transition-all shadow-sm border border-indigo-100"
              >
                <PlusIcon /> Add Item
              </button>
            </div>
            <div className="space-y-4">
              {content.syllabus?.map((s, i) => (
                <div key={i} className="flex flex-col gap-3 p-4 bg-slate-50 rounded-[1.5rem] border border-slate-100 relative group/row hover:border-slate-200 transition-all font-sans">
                  <input
                    type="text"
                    placeholder="e.g. FE Syllabus 2024"
                    value={s.title || ""}
                    onChange={e => updateArrayItem('syllabus', i, { ...s, title: e.target.value })}
                    className="w-full bg-white border-0 ring-1 ring-slate-200/50 focus:ring-2 focus:ring-indigo-500 rounded-2xl px-4 py-3 text-xs font-bold outline-none"
                  />
                  <FileUpload 
                    label="Syllabus PDF" 
                    id={`syllabus-pdf-${i}`} 
                    value={s.pdf || ""} 
                    onChange={f => updateArrayItem('syllabus', i, { ...s, pdf: f })} 
                  />
                  <button 
                    type="button" 
                    onClick={() => removeArrayItem('syllabus', i)}
                    className="absolute -top-2 -right-2 w-7 h-7 bg-red-100 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all shadow-md active:scale-95"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-extrabold text-slate-800 flex items-center gap-3">
                <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H14" /></svg>
                </div>
                Newsletters
              </h2>
              <button 
                type="button"
                onClick={() => addArrayItem('newsletter', { title: '', link: '' })} 
                className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-xl text-[10px] font-bold hover:bg-emerald-100 transition-all shadow-sm border border-emerald-100"
              >
                <PlusIcon /> Add Item
              </button>
            </div>
            <div className="space-y-4">
              {content.newsletter?.map((n, i) => (
                <div key={i} className="flex flex-col gap-3 p-4 bg-slate-50 rounded-[1.5rem] relative group/row border border-slate-100 hover:border-slate-200 transition-all font-sans">
                  <input
                    type="text"
                    placeholder="Title (e.g. Jan 2024 Edition)"
                    value={n.title || ""}
                    onChange={e => updateArrayItem('newsletter', i, { ...n, title: e.target.value })}
                    className="w-full bg-white border-0 ring-1 ring-slate-200/50 focus:ring-2 focus:ring-emerald-500 rounded-2xl px-4 py-3 text-xs font-bold outline-none"
                  />
                  <input
                    type="url"
                    placeholder="External Link URL"
                    value={n.link || ""}
                    onChange={e => updateArrayItem('newsletter', i, { ...n, link: e.target.value })}
                    className="w-full bg-white border-0 ring-1 ring-slate-200/50 focus:ring-2 focus:ring-emerald-500 rounded-2xl px-4 py-3 text-xs text-blue-500 font-medium outline-none"
                  />
                  <button 
                    type="button" 
                    onClick={() => removeArrayItem('newsletter', i)} 
                    className="absolute -top-2 -right-2 w-7 h-7 bg-red-100 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all shadow-md active:scale-95"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-extrabold text-slate-800 mb-6 flex items-center gap-2">
                <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                Timetable
              </h2>
              <button 
                type="button"
                onClick={() => addArrayItem('timetable', { class: '', pdf: undefined })} 
                className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 px-3 py-1.5 rounded-xl text-[10px] font-bold hover:bg-slate-200 transition-all shadow-sm border border-slate-200"
              >
                <PlusIcon /> Add Class
              </button>
            </div>
            <div className="space-y-4">
              {content.timetable?.map((t, i) => (
                <div key={i} className="flex flex-col gap-3 p-4 bg-slate-50 rounded-[1.5rem] border border-slate-100 relative group/row hover:border-slate-200 transition-all font-sans">
                  <input
                    type="text"
                    placeholder="Class (e.g. SE IT)"
                    value={t.class || ""}
                    onChange={e => updateArrayItem('timetable', i, { ...t, class: e.target.value })}
                    className="w-full bg-white border-0 ring-1 ring-slate-200/50 focus:ring-2 focus:ring-slate-500 rounded-2xl px-4 py-3 text-xs font-bold outline-none"
                  />
                  <FileUpload 
                    label="Time Table PDF" 
                    id={`timetable-pdf-${i}`} 
                    value={t.pdf || ""} 
                    onChange={f => updateArrayItem('timetable', i, { ...t, pdf: f })} 
                  />
                  <button 
                    type="button" 
                    onClick={() => removeArrayItem('timetable', i)}
                    className="absolute -top-2 -right-2 w-7 h-7 bg-red-100 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all shadow-md active:scale-95"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}



