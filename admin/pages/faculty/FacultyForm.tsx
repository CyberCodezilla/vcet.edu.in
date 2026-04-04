import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { facultyApi } from '../../api/faculty';
import type { FacultyPayload } from '../../types';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';

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

/* ── Reusable Section Card ─────────────────────────────────────────────────── */
const SectionCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-white rounded-4xl shadow-lg shadow-slate-200/40 border border-slate-100 overflow-hidden">
    <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-center sm:justify-start gap-3">
      <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">{icon}</div>
      <h3 className="text-sm font-extrabold text-[#111827] uppercase tracking-wider">{title}</h3>
    </div>
    <div className="p-8 space-y-6">{children}</div>
  </div>
);

/* ── Input helpers ──────────────────────────────────────────────────────────── */
const inputBase = 'w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-2xl px-5 py-4 text-sm font-bold transition-all outline-none';
const labelBase = 'block text-xs font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1';

const DEPARTMENTS = [
  'Computer Engineering',
  'Information Technology',
  'Electronics & Telecommunication Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Artificial Intelligence & Data Science',
  'Computer Science & Data Science',
  'First Year Engineering'
];

const FacultyForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState<FacultyPayload>({
    basicInfo: {
      fullName: '',
      designation: '',
      department: DEPARTMENTS[0],
      email: '',
      dob: '',
      joinDate: '',
      isActive: true,
    },
    qualifications: { degrees: [''], specialization: '' },
    experience: { teachingYears: 0, industryYears: 0, totalPapers: 0, totalBooks: 0, totalPatents: 0 },
    academic: { pgProjects: '', researchDomains: [''], consultancyProjects: [''] },
    publications: { books: [{ title: '', isbn: '' }], patents: [{ title: '', date: '' }], researchPapers: [''] },
    rolesAndAwards: { roles: [''], awards: [''] },
    onlineLinks: { website: '', youtube: '', github: '' },
    memberships: { organizations: [''] },
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (!isEdit) return;
    facultyApi.get(id!)
      .then((r) => {
        if (!r.data) return;
        const f = r.data;
        setForm({
          basicInfo: { ...f.basicInfo, dob: f.basicInfo.dob?.split('T')[0] ?? '', joinDate: f.basicInfo.joinDate?.split('T')[0] ?? '' },
          qualifications: { ...f.qualifications },
          experience: { ...f.experience },
          academic: { ...f.academic },
          publications: { ...f.publications },
          rolesAndAwards: { ...f.rolesAndAwards },
          onlineLinks: { ...f.onlineLinks },
          memberships: { ...f.memberships },
        });
        if (f.profileImage?.url) setImagePreview(f.profileImage.url);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const handleBasicChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      basicInfo: { 
        ...prev.basicInfo, 
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value 
      }
    }));
  };

  const handleNestedChange = (section: keyof FacultyPayload, field: string, value: any) => {
    setForm(prev => ({
      ...prev,
      [section]: { ...(prev[section] as any), [field]: value }
    }));
  };

  const handleArrayChange = (section: keyof FacultyPayload, field: string, index: number, value: any) => {
    setForm(prev => {
      const sectionData = prev[section] as any;
      const arr = [...sectionData[field]];
      arr[index] = value;
      return { ...prev, [section]: { ...sectionData, [field]: arr } };
    });
  };

  const addArrayItem = (section: keyof FacultyPayload, field: string, defaultValue: any = '') => {
    setForm(prev => {
      const sectionData = prev[section] as any;
      return { ...prev, [section]: { ...sectionData, [field]: [...sectionData[field], defaultValue] } };
    });
  };

  const removeArrayItem = (section: keyof FacultyPayload, field: string, index: number) => {
    setForm(prev => {
      const sectionData = prev[section] as any;
      if (sectionData[field].length <= 1) return prev;
      return { ...prev, [section]: { ...sectionData, [field]: sectionData[field].filter((_: any, i: number) => i !== index) } };
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.basicInfo.fullName.trim()) { setError('Full Name is required.'); return; }
    if (!form.basicInfo.email.trim()) { setError('Email is required.'); return; }
    
    setSaving(true);
    try {
      const payload: FacultyPayload = { ...form };
      if (profileImage) payload.profileImage = profileImage;

      if (isEdit) await facultyApi.update(id!, payload);
      else await facultyApi.create(payload);

      setToast({ message: isEdit ? 'Faculty updated successfully' : 'Faculty created successfully', type: 'success' });
      setTimeout(() => navigate('/admin/pages/faculty'), 800);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed');
      setToast({ message: e instanceof Error ? e.message : 'Save failed', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-10 h-10 border-4 border-slate-100 border-t-[#1e293b] rounded-full animate-spin" />
        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest text-center">Loading Faculty Details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 px-4 sm:px-0">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <PageEditorHeader
        title={isEdit ? 'Edit Faculty Profile' : 'Add New Faculty'}
        description="Manage faculty profiles, expertise, qualifications and research publications."
        onSave={handleSubmit as unknown as () => void}
        isSaving={saving}
        showBackButton
        onBack={() => navigate('/admin/pages/faculty')}
      />

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-3xl px-6 py-4 text-sm text-red-600 flex items-center gap-3">
          <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 1. Basic Info & Image Upload */}
        <SectionCard title="Basic Information" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-1/3 flex flex-col items-center">
              <label className={labelBase + " text-center"}>Profile Image</label>
              <div className="relative group cursor-pointer w-40 h-40 rounded-3xl overflow-hidden bg-slate-100 border-2 border-dashed border-slate-300 hover:border-[#1e293b] transition-all">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-slate-400">
                    <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span className="text-[10px] font-black uppercase tracking-widest">Upload photo</span>
                  </div>
                )}
                <input id="facultyform-1" name="facultyform-1" aria-label="facultyform field" type="file" onChange={handleImageChange} accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
            </div>
            <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <label className={labelBase}>Full Name</label>
                <input id="facultyform-2" aria-label="facultyform field" name="fullName" value={form.basicInfo.fullName} onChange={handleBasicChange} placeholder="Dr. Sunita Mehta" className={inputBase} required />
              </div>
              <div>
                <label className={labelBase}>Designation</label>
                <input id="facultyform-3" aria-label="facultyform field" name="designation" value={form.basicInfo.designation} onChange={handleBasicChange} placeholder="Associate Professor" className={inputBase} required />
              </div>
              <div>
                <label className={labelBase}>Department</label>
                <select id="facultyform-select-1" aria-label="facultyform select field" name="department" value={form.basicInfo.department} onChange={handleBasicChange} className={inputBase}>
                  {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className={labelBase}>Email</label>
                <input id="facultyform-4" aria-label="facultyform field" name="email" type="email" value={form.basicInfo.email} onChange={handleBasicChange} placeholder="sunita@college.edu" className={inputBase} required />
              </div>
              <div>
                <label className={labelBase}>Date of Birth</label>
                <input id="facultyform-5" aria-label="facultyform field" name="dob" type="date" value={form.basicInfo.dob} onChange={handleBasicChange} className={inputBase} />
              </div>
              <div>
                <label className={labelBase}>Joining Date</label>
                <input id="facultyform-6" aria-label="facultyform field" name="joinDate" type="date" value={form.basicInfo.joinDate} onChange={handleBasicChange} className={inputBase} />
              </div>
            </div>
          </div>
        </SectionCard>

        {/* 2. Qualifications */}
        <SectionCard title="Qualifications" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" /></svg>}>
          <div className="space-y-4">
            <label className={labelBase}>Degrees (add multiple)</label>
            {(form.qualifications?.degrees || []).map((deg, idx) => (
              <div key={idx} className="flex gap-2">
                <input id="facultyform-7" name="facultyform-7" aria-label="facultyform field" value={deg} onChange={(e) => handleArrayChange('qualifications', 'degrees', idx, e.target.value)} placeholder="e.g., Ph.D. in Computer Science" className={inputBase} />
                <button type="button" onClick={() => removeArrayItem('qualifications', 'degrees', idx)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem('qualifications', 'degrees')} className="text-[#1e293b] text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:opacity-70 transition-opacity">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
              Add Degree
            </button>
            <div className="pt-4">
              <label className={labelBase}>Specialization</label>
              <input id="facultyform-8" name="facultyform-8" aria-label="facultyform field" value={form.qualifications?.specialization} onChange={(e) => handleNestedChange('qualifications', 'specialization', e.target.value)} placeholder="e.g., Machine Learning & Deep Learning" className={inputBase} />
            </div>
          </div>
        </SectionCard>

        {/* 3. Experience Stats */}
        <SectionCard title="Experience Stats" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: 'Teaching Yrs', field: 'teachingYears', bg: 'bg-blue-50/50', border: 'border-blue-100', textLabel: 'text-blue-400', ring: 'ring-blue-200', focus: 'focus:ring-blue-500', text: 'text-blue-700' },
              { label: 'Industry Yrs', field: 'industryYears', bg: 'bg-slate-50/50', border: 'border-slate-100', textLabel: 'text-slate-400', ring: 'ring-slate-200', focus: 'focus:ring-slate-500', text: 'text-slate-700' },
              { label: 'Papers', field: 'totalPapers', bg: 'bg-emerald-50/50', border: 'border-emerald-100', textLabel: 'text-emerald-400', ring: 'ring-emerald-200', focus: 'focus:ring-emerald-500', text: 'text-emerald-700' },
              { label: 'Books', field: 'totalBooks', bg: 'bg-purple-50/50', border: 'border-purple-100', textLabel: 'text-purple-400', ring: 'ring-purple-200', focus: 'focus:ring-purple-500', text: 'text-purple-700' },
              { label: 'Patents', field: 'totalPatents', bg: 'bg-orange-50/50', border: 'border-orange-100', textLabel: 'text-orange-400', ring: 'ring-orange-200', focus: 'focus:ring-orange-500', text: 'text-orange-700' },
            ].map(stat => (
              <div key={stat.field} className={`${stat.bg} p-4 rounded-3xl text-center border ${stat.border}`}>
                <label className={`block text-[10px] font-black ${stat.textLabel} uppercase tracking-widest mb-2`}>{stat.label}</label>
                <input id="facultyform-9" name="facultyform-9" aria-label="facultyform field" type="number" value={(form.experience as any)?.[stat.field] || 0} onChange={(e) => handleNestedChange('experience', stat.field, Number(e.target.value))} className={`w-full text-center bg-white ring-1 ${stat.ring} focus:ring-2 ${stat.focus} rounded-2xl px-3 py-3 text-lg font-black ${stat.text} outline-none`} />
              </div>
            ))}
          </div>
        </SectionCard>

        {/* 4. Academic Details */}
        <SectionCard title="Academic Details" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}>
          <div className="space-y-6">
            <div>
              <label className={labelBase}>PG Projects Guided (Summary)</label>
              <input id="facultyform-10" name="facultyform-10" aria-label="facultyform field" value={form.academic?.pgProjects} onChange={(e) => handleNestedChange('academic', 'pgProjects', e.target.value)} placeholder="e.g., 12 M.Tech projects guided" className={inputBase} />
            </div>
            <div>
              <label className={labelBase}>Research Domains</label>
              {(form.academic?.researchDomains || []).map((dom, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input id="facultyform-11" name="facultyform-11" aria-label="facultyform field" value={dom} onChange={(e) => handleArrayChange('academic', 'researchDomains', idx, e.target.value)} className={inputBase} />
                  <button type="button" onClick={() => removeArrayItem('academic', 'researchDomains', idx)} className="p-2 text-slate-300 hover:text-red-500 hover:scale-110 transition-all"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem('academic', 'researchDomains')} className="text-blue-600 text-[10px] font-black uppercase tracking-widest mt-1">+ Add Domain</button>
            </div>
            <div>
              <label className={labelBase}>Consultancy Projects</label>
              {(form.academic?.consultancyProjects || []).map((cp, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input id="facultyform-12" name="facultyform-12" aria-label="facultyform field" value={cp} onChange={(e) => handleArrayChange('academic', 'consultancyProjects', idx, e.target.value)} className={inputBase} />
                  <button type="button" onClick={() => removeArrayItem('academic', 'consultancyProjects', idx)} className="p-2 text-slate-300 hover:text-red-500 hover:scale-110 transition-all"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem('academic', 'consultancyProjects')} className="text-blue-600 text-[10px] font-black uppercase tracking-widest mt-1">+ Add Project</button>
            </div>
          </div>
        </SectionCard>

        {/* 5. Publications */}
        <SectionCard title="Publications" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}>
          <div className="space-y-8">
            <div>
              <label className={labelBase}>Books (Dynamic Fields)</label>
              {(form.publications?.books || []).map((book, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 p-4 bg-slate-50/50 rounded-2xl relative group">
                  <input id="facultyform-13" name="facultyform-13" aria-label="facultyform field" value={book.title} onChange={(e) => handleArrayChange('publications', 'books', idx, { ...book, title: e.target.value })} placeholder="Book Title" className={inputBase + " bg-white"} />
                  <input id="facultyform-14" name="facultyform-14" aria-label="facultyform field" value={book.isbn} onChange={(e) => handleArrayChange('publications', 'books', idx, { ...book, isbn: e.target.value })} placeholder="ISBN Number" className={inputBase + " bg-white"} />
                  <button type="button" onClick={() => removeArrayItem('publications', 'books', idx)} className="absolute -top-2 -right-2 bg-white shadow-md rounded-full p-1.5 text-red-400 opacity-0 group-hover:opacity-100 transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem('publications', 'books', { title: '', isbn: '' })} className="text-blue-600 text-[10px] font-black uppercase tracking-widest">+ Add Book Entry</button>
            </div>
            
            <div>
              <label className={labelBase}>Patents (Dynamic Fields)</label>
              {(form.publications?.patents || []).map((pat, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 p-4 bg-slate-50/50 rounded-2xl relative group">
                  <input id="facultyform-15" name="facultyform-15" aria-label="facultyform field" value={pat.title} onChange={(e) => handleArrayChange('publications', 'patents', idx, { ...pat, title: e.target.value })} placeholder="Patent Title" className={inputBase + " bg-white"} />
                  <input id="facultyform-16" name="facultyform-16" aria-label="facultyform field" type="date" value={pat.date} onChange={(e) => handleArrayChange('publications', 'patents', idx, { ...pat, date: e.target.value })} className={inputBase + " bg-white"} />
                  <button type="button" onClick={() => removeArrayItem('publications', 'patents', idx)} className="absolute -top-2 -right-2 bg-white shadow-md rounded-full p-1.5 text-red-400 opacity-0 group-hover:opacity-100 transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem('publications', 'patents', { title: '', date: '' })} className="text-blue-600 text-[10px] font-black uppercase tracking-widest">+ Add Patent Entry</button>
            </div>

            <div>
              <label className={labelBase}>Research Papers (Links/Titles)</label>
              {(form.publications?.researchPapers || []).map((rp, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input id="facultyform-17" name="facultyform-17" aria-label="facultyform field" value={rp} onChange={(e) => handleArrayChange('publications', 'researchPapers', idx, e.target.value)} className={inputBase} />
                  <button type="button" onClick={() => removeArrayItem('publications', 'researchPapers', idx)} className="p-2 text-slate-300 hover:text-red-500"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem('publications', 'researchPapers')} className="text-blue-600 text-[10px] font-black uppercase tracking-widest">+ Add Paper</button>
            </div>
          </div>
        </SectionCard>

        {/* 6. Roles & Awards */}
        <SectionCard title="Roles & Awards" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <label className={labelBase}>Roles & Responsibilities</label>
              {(form.rolesAndAwards?.roles || []).map((role, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input id="facultyform-18" name="facultyform-18" aria-label="facultyform field" value={role} onChange={(e) => handleArrayChange('rolesAndAwards', 'roles', idx, e.target.value)} className={inputBase} />
                  <button type="button" onClick={() => removeArrayItem('rolesAndAwards', 'roles', idx)} className="text-red-300 scale-90"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem('rolesAndAwards', 'roles')} className="text-[#1e293b] text-[10px] font-black uppercase tracking-widest">+ Add Role</button>
            </div>
            <div>
              <label className={labelBase}>Awards & Honors</label>
              {(form.rolesAndAwards?.awards || []).map((award, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input id="facultyform-19" name="facultyform-19" aria-label="facultyform field" value={award} onChange={(e) => handleArrayChange('rolesAndAwards', 'awards', idx, e.target.value)} className={inputBase} />
                  <button type="button" onClick={() => removeArrayItem('rolesAndAwards', 'awards', idx)} className="text-red-300 scale-90"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem('rolesAndAwards', 'awards')} className="text-[#1e293b] text-[10px] font-black uppercase tracking-widest">+ Add Award</button>
            </div>
          </div>
        </SectionCard>

        {/* 7. Online Links */}
        <SectionCard title="Online Links" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className={labelBase}>Personal Website</label>
              <input id="facultyform-20" name="facultyform-20" aria-label="facultyform field" value={form.onlineLinks?.website} onChange={(e) => handleNestedChange('onlineLinks', 'website', e.target.value)} placeholder="https://..." className={inputBase} />
            </div>
            <div>
              <label className={labelBase}>YouTube</label>
              <input id="facultyform-21" name="facultyform-21" aria-label="facultyform field" value={form.onlineLinks?.youtube} onChange={(e) => handleNestedChange('onlineLinks', 'youtube', e.target.value)} placeholder="Channel Link" className={inputBase} />
            </div>
            <div>
              <label className={labelBase}>GitHub</label>
              <input id="facultyform-22" name="facultyform-22" aria-label="facultyform field" value={form.onlineLinks?.github} onChange={(e) => handleNestedChange('onlineLinks', 'github', e.target.value)} placeholder="GitHub Profile" className={inputBase} />
            </div>
          </div>
        </SectionCard>

        {/* 8. Memberships */}
        <SectionCard title="Memberships" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}>
          <div>
            <label className={labelBase}>Organizations (add multiple)</label>
            {(form.memberships?.organizations || []).map((org, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input id="facultyform-23" name="facultyform-23" aria-label="facultyform field" value={org} onChange={(e) => handleArrayChange('memberships', 'organizations', idx, e.target.value)} placeholder="e.g., IEEE, ACM" className={inputBase} />
                <button type="button" onClick={() => removeArrayItem('memberships', 'organizations', idx)} className="p-2 text-red-300 hover:text-red-500 scale-90 transition-all"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem('memberships', 'organizations')} className="text-blue-600 text-[10px] font-black uppercase tracking-widest mt-1">+ Add Membership</button>
          </div>
        </SectionCard>

        {/* Status Toggle */}
        <div className="bg-white rounded-4xl shadow-lg shadow-slate-200/40 border border-slate-100 px-8 py-6 flex items-center justify-between">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className={`relative flex items-center w-12 h-6.5 rounded-full transition-all duration-300 ${form.basicInfo.isActive ? 'bg-[#1e293b]' : 'bg-slate-200'}`}>
              <input id="facultyform-24" aria-label="facultyform field" type="checkbox" name="isActive" checked={form.basicInfo.isActive} onChange={handleBasicChange} className="sr-only" />
              <span className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${form.basicInfo.isActive ? 'translate-x-6' : 'translate-x-1'}`} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-black text-slate-700 uppercase tracking-wider">Active Status</span>
              <span className="text-[10px] text-slate-400 font-bold">Visible on Department and Profile pages</span>
            </div>
          </label>
        </div>

        {/* Footer Actions */}

      </form>

      <style>{`
        @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default FacultyForm;
