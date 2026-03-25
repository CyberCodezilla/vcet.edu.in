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

/* ── Initial Empty Content State ────────────────────────────────────────────── */
const initialContent = {
  about: '',
  vision: '',
  mission: [''],
  dabMembers: [{ name: '', designation: '', organization: '' }],
  mou: '',
  patents: '',
  pos: '',
  peo: '',
  pso: '',
  faculty: [] as number[],
  toppers: [{ name: '', year: '', cgpa: '' }],
  syllabus: [{ year: '', link: '' }],
  newsletter: [{ title: '', link: '' }],
  timetable: ''
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
                  value={name}
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
                    value={slug}
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

          {/* About */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <h2 className="text-xl font-extrabold text-slate-800 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              About Department
            </h2>
            <textarea
              value={content.about}
              onChange={e => setContent({ ...content, about: e.target.value })}
              className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-2xl px-5 py-4 text-sm font-medium transition-all outline-none min-h-[150px]"
              placeholder="Enter department introduction..."
            />
          </div>

          {/* Vision & Mission */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <h2 className="text-xl font-extrabold text-slate-800 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Vision & Mission
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Vision Statement</label>
                <textarea
                  value={content.vision}
                  onChange={e => setContent({ ...content, vision: e.target.value })}
                  className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-2xl px-5 py-4 text-sm font-medium transition-all outline-none"
                  placeholder="Enter vision statement..."
                  rows={3}
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Mission Statements</label>
                  <button type="button" onClick={() => addArrayItem('mission', '')} className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
                    Add Mission
                  </button>
                </div>
                <div className="space-y-3">
                  {content.mission.map((m, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="shrink-0 w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs mt-1">{i + 1}</span>
                      <textarea
                        value={m}
                        onChange={e => updateArrayItem('mission', i, e.target.value)}
                        className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-2xl px-5 py-3 text-sm font-medium transition-all outline-none"
                        rows={2}
                      />
                      <button type="button" onClick={() => removeArrayItem('mission', i)} className="shrink-0 text-slate-400 hover:text-red-500 mt-3 self-start">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Outcomes (POs/PEOs/PSOs) */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <h2 className="text-xl font-extrabold text-slate-800 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
              Department Outcomes
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Program Outcomes (POs)</label>
                <textarea
                  value={content.pos}
                  onChange={e => setContent({ ...content, pos: e.target.value })}
                  className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 rounded-2xl px-5 py-4 text-sm font-medium transition-all outline-none min-h-[120px]"
                  placeholder="Enter POs..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Program Educational Objectives (PEOs)</label>
                <textarea
                  value={content.peo}
                  onChange={e => setContent({ ...content, peo: e.target.value })}
                  className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 rounded-2xl px-5 py-4 text-sm font-medium transition-all outline-none min-h-[100px]"
                  placeholder="Enter PEOs..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Program Specific Outcomes (PSOs)</label>
                <textarea
                  value={content.pso}
                  onChange={e => setContent({ ...content, pso: e.target.value })}
                  className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 rounded-2xl px-5 py-4 text-sm font-medium transition-all outline-none min-h-[100px]"
                  placeholder="Enter PSOs..."
                />
              </div>
            </div>
          </div>

          {/* Dynamic Tables: DAB, Faculty, Toppers, Syllabus */}
          
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
              {content.dabMembers.map((member, i) => (
                <div key={i} className="flex gap-4 items-center group/row">
                  <input
                    type="text"
                    placeholder="Name"
                    value={member.name}
                    onChange={e => updateArrayItem('dabMembers', i, { ...member, name: e.target.value })}
                    className="flex-1 bg-slate-50 border-0 ring-1 ring-slate-200/50 focus:ring-2 focus:ring-indigo-500 rounded-2xl px-5 py-4 text-sm font-medium outline-none transition-all"
                  />
                  <input
                    type="text"
                    placeholder="Designation"
                    value={member.designation}
                    onChange={e => updateArrayItem('dabMembers', i, { ...member, designation: e.target.value })}
                    className="flex-1 bg-slate-50 border-0 ring-1 ring-slate-200/50 focus:ring-2 focus:ring-indigo-500 rounded-2xl px-5 py-4 text-sm font-medium outline-none transition-all"
                  />
                  <input
                    type="text"
                    placeholder="Organization"
                    value={member.organization}
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
                  acc[f.department] = acc[f.department] || [];
                  acc[f.department].push(f);
                  return acc;
                }, {} as Record<string, Faculty[]>)
              ).map(([deptName, facs]) => (
                <div key={deptName} className="space-y-3">
                  <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest px-2">{deptName}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {facs.map(f => {
                      const isSelected = content.faculty.includes(f.id);
                      return (
                        <label key={f.id} className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${isSelected ? 'bg-indigo-50 border-indigo-200 ring-4 ring-indigo-50' : 'bg-white border-slate-100 hover:border-slate-200'}`}>
                          <input
                            type="checkbox"
                            className="mt-1 w-4 h-4 text-indigo-600 rounded-lg border-slate-300 focus:ring-indigo-500"
                            checked={isSelected}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setContent(prev => ({ ...prev, faculty: [...prev.faculty, f.id] }));
                              } else {
                                setContent(prev => ({ ...prev, faculty: prev.faculty.filter(id => id !== f.id) }));
                              }
                            }}
                          />
                          <div className="flex flex-col">
                            <span className={`text-sm font-bold ${isSelected ? 'text-indigo-900' : 'text-slate-700'}`}>{f.name}</span>
                            <span className={`text-[11px] font-medium ${isSelected ? 'text-indigo-600/70' : 'text-slate-400'}`}>{f.designation || f.specialization || f.page}</span>
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
              {content.toppers.map((topper, i) => (
                <div key={i} className="flex gap-4 items-center group/row">
                  <input
                    type="text"
                    placeholder="Student Name"
                    value={topper.name}
                    onChange={e => updateArrayItem('toppers', i, { ...topper, name: e.target.value })}
                    className="flex-1 bg-slate-50 border-0 ring-1 ring-slate-200/50 focus:ring-2 focus:ring-amber-500 rounded-2xl px-5 py-4 text-sm font-medium outline-none transition-all"
                  />
                  <input
                    type="text"
                    placeholder="Year (e.g. 2023-24)"
                    value={topper.year}
                    onChange={e => updateArrayItem('toppers', i, { ...topper, year: e.target.value })}
                    className="w-48 bg-slate-50 border-0 ring-1 ring-slate-200/50 focus:ring-2 focus:ring-amber-500 rounded-2xl px-5 py-4 text-sm font-medium outline-none transition-all"
                  />
                  <input
                    type="text"
                    placeholder="CGPA"
                    value={topper.cgpa}
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
          
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <h2 className="text-xl font-extrabold text-slate-800 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Achievements
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">MoU & Collaborations</label>
                <textarea
                  value={content.mou}
                  onChange={e => setContent({ ...content, mou: e.target.value })}
                  className="w-full bg-slate-50 border-0 ring-1 ring-slate-200/50 focus:ring-2 focus:ring-indigo-500 rounded-2xl px-5 py-4 text-sm font-medium transition-all outline-none"
                  placeholder="Details of MoUs..."
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Patents</label>
                <textarea
                  value={content.patents}
                  onChange={e => setContent({ ...content, patents: e.target.value })}
                  className="w-full bg-slate-50 border-0 ring-1 ring-slate-200/50 focus:ring-2 focus:ring-indigo-500 rounded-2xl px-5 py-4 text-sm font-medium transition-all outline-none"
                  placeholder="Details of patents..."
                  rows={4}
                />
              </div>
            </div>
          </div>

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
                onClick={() => addArrayItem('syllabus', { year: '', link: '' })} 
                className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-xl text-[10px] font-bold hover:bg-indigo-100 transition-all shadow-sm border border-indigo-100"
              >
                <PlusIcon /> Add
              </button>
            </div>
            <div className="space-y-4">
              {content.syllabus.map((s, i) => (
                <div key={i} className="flex flex-col gap-3 p-4 bg-slate-50 rounded-[1.5rem] border border-slate-100 relative group/row hover:border-slate-200 transition-all font-sans">
                  <input
                    type="text"
                    placeholder="Year (e.g. FE)"
                    value={s.year}
                    onChange={e => updateArrayItem('syllabus', i, { ...s, year: e.target.value })}
                    className="w-full bg-white border-0 ring-1 ring-slate-200/50 focus:ring-2 focus:ring-indigo-500 rounded-2xl px-4 py-3 text-xs font-bold outline-none"
                  />
                  <input
                    type="url"
                    placeholder="Link URL"
                    value={s.link}
                    onChange={e => updateArrayItem('syllabus', i, { ...s, link: e.target.value })}
                    className="w-full bg-white border-0 ring-1 ring-slate-200/50 focus:ring-2 focus:ring-indigo-500 rounded-2xl px-4 py-3 text-xs text-blue-500 font-medium outline-none"
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
                <PlusIcon /> Add
              </button>
            </div>
            <div className="space-y-4">
              {content.newsletter.map((n, i) => (
                <div key={i} className="flex flex-col gap-3 p-4 bg-slate-50 rounded-[1.5rem] relative group/row border border-slate-100 hover:border-slate-200 transition-all font-sans">
                  <input
                    type="text"
                    placeholder="Title (e.g. Jan 2024 Edition)"
                    value={n.title}
                    onChange={e => updateArrayItem('newsletter', i, { ...n, title: e.target.value })}
                    className="w-full bg-white border-0 ring-1 ring-slate-200/50 focus:ring-2 focus:ring-emerald-500 rounded-2xl px-4 py-3 text-xs font-bold outline-none"
                  />
                  <input
                    type="url"
                    placeholder="Link URL"
                    value={n.link}
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
            <h2 className="text-lg font-extrabold text-slate-800 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Timetable URL
            </h2>
            <div className="space-y-4">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Timetable PDF Link</label>
              <input
                type="url"
                value={content.timetable}
                onChange={e => setContent({ ...content, timetable: e.target.value })}
                className="w-full bg-slate-50 border-0 ring-1 ring-slate-200/50 focus:ring-2 focus:ring-indigo-500 rounded-2xl px-5 py-4 text-sm font-medium transition-all outline-none"
                placeholder="https://vcet.edu.in/...timetable.pdf"
              />
              <p className="text-[10px] font-bold text-slate-400 ml-1">Paste the URL for the department timetable PDF.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
