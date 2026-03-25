import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { facultyApi } from '../../api/faculty';
import type { FacultyPayload } from '../../types';

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
  <div className="bg-white rounded-[2rem] shadow-lg shadow-slate-200/40 border border-slate-100 overflow-hidden">
    <div className="px-8 py-5 border-b border-slate-100 flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">{icon}</div>
      <h3 className="text-sm font-extrabold text-[#111827] uppercase tracking-wider">{title}</h3>
    </div>
    <div className="p-8 space-y-6">{children}</div>
  </div>
);

/* ── Input helpers ──────────────────────────────────────────────────────────── */
const inputBase = 'w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-2xl px-5 py-4 text-sm font-bold transition-all outline-none';
const inputDisabled = 'w-full bg-slate-100 border-0 ring-1 ring-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-400 cursor-not-allowed outline-none';
const labelBase = 'block text-xs font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1';

const DEPARTMENTS = ['Computer Engineering', 'Information Technology', 'Electronics & Telecommunication', 'Mechanical Engineering', 'Civil Engineering', 'AI & Data Science', 'First Year'];
const PAGES_OPTIONS = ['Departments', 'Academics', 'Research', 'Administration'];

const FacultyForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState<FacultyPayload>({
    name: '',
    department: 'Computer Engineering',
    page: 'Departments',
    teachingExperience: 0,
    industryExperience: 0,
    papers: 0,
    books: 0,
    patents: 0,
    dob: '',
    joinDate: '',
    email: '',
    qualification: '',
    specialization: '',
    pgProjects: '',
    researchDomain: '',
    consultancyProjects: '',
    publications: { books: '', isbn: '', patents: '', papers: '' },
    roles: '',
    awards: '',
    onlinePresence: { website: '', youtube: '', resources: '' },
    memberships: '',
    is_active: true,
  });

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (!isEdit) return;
    facultyApi.get(Number(id))
      .then((r) => {
        if (!r.data) return;
        const f = r.data;
        setForm({
          name: f.name,
          department: f.department,
          page: f.page,
          teachingExperience: f.teachingExperience,
          industryExperience: f.industryExperience,
          papers: f.papers,
          books: f.books,
          patents: f.patents,
          dob: f.dob,
          joinDate: f.joinDate,
          email: f.email,
          qualification: f.qualification,
          specialization: f.specialization,
          pgProjects: f.pgProjects,
          researchDomain: f.researchDomain,
          consultancyProjects: f.consultancyProjects,
          publications: { ...f.publications },
          roles: f.roles,
          awards: f.awards,
          onlinePresence: { ...f.onlinePresence },
          memberships: f.memberships,
          is_active: f.is_active,
        });
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? target.checked : type === 'number' ? Number(value) : value,
    }));
  };

  const handleNestedChange = (group: 'publications' | 'onlinePresence', field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [group]: { ...(prev[group] as Record<string, string>), [field]: value },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name?.trim()) { setError('Faculty name is required.'); return; }
    if (!form.email?.trim()) { setError('Email is required.'); return; }
    if (!form.department?.trim()) { setError('Department is required.'); return; }
    setSaving(true);
    try {
      if (isEdit) await facultyApi.update(Number(id), form);
      else await facultyApi.create(form);
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
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-widest">
            <Link to="/admin" className="hover:text-slate-600 transition-colors">Dashboard</Link>
            <span className="text-slate-300 font-normal">/</span>
            <Link to="/admin/pages/faculty" className="hover:text-slate-600 transition-colors">Faculty</Link>
            <span className="text-slate-300 font-normal">/</span>
            <span className="text-slate-600">{isEdit ? 'Edit' : 'Create'}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#111827]">{isEdit ? 'Edit Faculty' : 'Add New Faculty'}</h1>
        </div>
        <button
          type="button"
          onClick={() => navigate('/admin/pages/faculty')}
          className="bg-white border border-slate-200 text-slate-500 hover:text-red-500 hover:border-red-200 transition-all p-3 rounded-2xl shadow-sm hover:shadow-md hidden sm:block"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-100 rounded-3xl px-6 py-4 text-sm text-red-600 flex items-center gap-3">
          <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* ── Top Stats ────────────────────────────────────────────────────────── */}
        <SectionCard
          title="Quick Stats"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="bg-blue-50/50 p-5 rounded-2xl text-center border border-blue-100/50">
              <label className="block text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">Teaching Exp (Yrs)</label>
              <input type="number" name="teachingExperience" value={form.teachingExperience ?? 0} onChange={handleChange} min={0} className="w-full text-center bg-white ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-500 rounded-xl px-3 py-2.5 text-lg font-black text-blue-700 outline-none" />
            </div>
            <div className="bg-slate-50/50 p-5 rounded-2xl text-center border border-slate-200/50">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Industry Exp (Yrs)</label>
              <input type="number" name="industryExperience" value={form.industryExperience ?? 0} onChange={handleChange} min={0} className="w-full text-center bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-500 rounded-xl px-3 py-2.5 text-lg font-black text-slate-700 outline-none" />
            </div>
            <div className="bg-emerald-50/50 p-5 rounded-2xl text-center border border-emerald-100/50">
              <label className="block text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2">Papers</label>
              <input type="number" name="papers" value={form.papers ?? 0} onChange={handleChange} min={0} className="w-full text-center bg-white ring-1 ring-emerald-200 focus:ring-2 focus:ring-emerald-500 rounded-xl px-3 py-2.5 text-lg font-black text-emerald-700 outline-none" />
            </div>
            <div className="bg-purple-50/50 p-5 rounded-2xl text-center border border-purple-100/50">
              <label className="block text-[10px] font-black text-purple-400 uppercase tracking-widest mb-2">Books</label>
              <input type="number" name="books" value={form.books ?? 0} onChange={handleChange} min={0} className="w-full text-center bg-white ring-1 ring-purple-200 focus:ring-2 focus:ring-purple-500 rounded-xl px-3 py-2.5 text-lg font-black text-purple-700 outline-none" />
            </div>
            <div className="bg-orange-50/50 p-5 rounded-2xl text-center border border-orange-100/50">
              <label className="block text-[10px] font-black text-orange-400 uppercase tracking-widest mb-2">Patents</label>
              <input type="number" name="patents" value={form.patents ?? 0} onChange={handleChange} min={0} className="w-full text-center bg-white ring-1 ring-orange-200 focus:ring-2 focus:ring-orange-500 rounded-xl px-3 py-2.5 text-lg font-black text-orange-700 outline-none" />
            </div>
          </div>
        </SectionCard>

        {/* ── Profile Information ──────────────────────────────────────────────── */}
        <SectionCard
          title="Profile Information"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
        >
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2">
              <label className={labelBase}>Full Name <span className="text-red-400">*</span></label>
              <input name="name" value={form.name ?? ''} onChange={handleChange} placeholder="e.g., Dr. Sunita Mehta" required className={inputBase} />
            </div>
            <div>
              <label className={labelBase}>Department <span className="text-red-400">*</span></label>
              <select name="department" value={form.department ?? ''} onChange={handleChange} className={inputBase + ' cursor-pointer'}>
                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className={labelBase}>Page</label>
              <select name="page" value={form.page ?? ''} onChange={handleChange} className={inputBase + ' cursor-pointer'}>
                {PAGES_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          {/* Personal Info */}
          <div className="pt-4 border-t border-slate-50">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Personal Info</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className={labelBase}>Date of Birth</label>
                <input type="date" name="dob" value={form.dob ?? ''} onChange={handleChange} className={inputBase} />
              </div>
              <div>
                <label className={labelBase}>Join Date</label>
                <input type="date" name="joinDate" value={form.joinDate ?? ''} onChange={handleChange} className={inputBase} />
              </div>
              <div>
                <label className={labelBase}>Email</label>
                <input type="email" name="email" value={form.email ?? ''} onChange={handleChange} className={inputBase} />
              </div>
            </div>
          </div>

          {/* Qualification & Specialization */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-50">
            <div>
              <label className={labelBase}>Qualification</label>
              <input name="qualification" value={form.qualification ?? ''} onChange={handleChange} placeholder="e.g., Ph.D. Computer Science" className={inputBase} />
            </div>
            <div>
              <label className={labelBase}>Specialization</label>
              <input name="specialization" value={form.specialization ?? ''} onChange={handleChange} placeholder="e.g., Machine Learning & AI" className={inputBase} />
            </div>
          </div>
        </SectionCard>

        {/* ── Academic Work ────────────────────────────────────────────────────── */}
        <SectionCard
          title="Academic Work"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2">
              <label className={labelBase}>PG Projects Guided</label>
              <input name="pgProjects" value={form.pgProjects ?? ''} onChange={handleChange} placeholder="e.g., 12 M.Tech projects guided" className={inputBase} />
            </div>
            <div>
              <label className={labelBase}>Research Domain</label>
              <input name="researchDomain" value={form.researchDomain ?? ''} onChange={handleChange} placeholder="e.g., Artificial Intelligence, Deep Learning" className={inputBase} />
            </div>
            <div>
              <label className={labelBase}>Consultancy Projects</label>
              <input name="consultancyProjects" value={form.consultancyProjects ?? ''} onChange={handleChange} placeholder="e.g., Smart City Analytics for Mumbai Corp" className={inputBase} />
            </div>
          </div>
        </SectionCard>

        {/* ── Publications ─────────────────────────────────────────────────────── */}
        <SectionCard
          title="Publications"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={labelBase}>Books Published</label>
              <input value={form.publications?.books ?? ''} onChange={(e) => handleNestedChange('publications', 'books', e.target.value)} placeholder="Book title (Publisher, Year)" className={inputBase} />
            </div>
            <div>
              <label className={labelBase}>ISBN</label>
              <input value={form.publications?.isbn ?? ''} onChange={(e) => handleNestedChange('publications', 'isbn', e.target.value)} placeholder="e.g., 978-3-030-12345-6" className={inputBase} />
            </div>
            <div>
              <label className={labelBase}>Patents</label>
              <input value={form.publications?.patents ?? ''} onChange={(e) => handleNestedChange('publications', 'patents', e.target.value)} placeholder="Patent title (Patent No.)" className={inputBase} />
            </div>
            <div>
              <label className={labelBase}>Research Papers</label>
              <input value={form.publications?.papers ?? ''} onChange={(e) => handleNestedChange('publications', 'papers', e.target.value)} placeholder="e.g., 32 papers in IEEE, Elsevier" className={inputBase} />
            </div>
          </div>
        </SectionCard>

        {/* ── Roles & Awards ───────────────────────────────────────────────────── */}
        <SectionCard
          title="Roles & Awards"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>}
        >
          <div className="space-y-6">
            <div>
              <label className={labelBase}>Roles & Responsibilities</label>
              <textarea name="roles" value={form.roles ?? ''} onChange={handleChange} rows={4} placeholder="Enter each role on a new line..." className={inputBase + ' resize-none'} />
            </div>
            <div>
              <label className={labelBase}>Awards & Achievements</label>
              <textarea name="awards" value={form.awards ?? ''} onChange={handleChange} rows={4} placeholder="Enter each award on a new line..." className={inputBase + ' resize-none'} />
            </div>
          </div>
        </SectionCard>

        {/* ── Online Presence ──────────────────────────────────────────────────── */}
        <SectionCard
          title="Online Presence"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2">
              <label className={labelBase}>Website / Profile Links</label>
              <input value={form.onlinePresence?.website ?? ''} onChange={(e) => handleNestedChange('onlinePresence', 'website', e.target.value)} placeholder="https://scholar.google.com/..." className={inputBase} />
            </div>
            <div>
              <label className={labelBase}>YouTube Channel</label>
              <input value={form.onlinePresence?.youtube ?? ''} onChange={(e) => handleNestedChange('onlinePresence', 'youtube', e.target.value)} placeholder="https://youtube.com/@..." className={inputBase} />
            </div>
            <div>
              <label className={labelBase}>E-Resources / Notes</label>
              <input value={form.onlinePresence?.resources ?? ''} onChange={(e) => handleNestedChange('onlinePresence', 'resources', e.target.value)} placeholder="https://github.com/..." className={inputBase} />
            </div>
          </div>
        </SectionCard>

        {/* ── Memberships ──────────────────────────────────────────────────────── */}
        <SectionCard
          title="Professional Memberships"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
        >
          <div>
            <label className={labelBase}>Memberships</label>
            <textarea name="memberships" value={form.memberships ?? ''} onChange={handleChange} rows={3} placeholder="Enter each membership on a new line (e.g., IEEE Senior Member)" className={inputBase + ' resize-none'} />
          </div>
        </SectionCard>

        {/* ── Active Status ────────────────────────────────────────────────────── */}
        <div className="bg-white rounded-[2rem] shadow-lg shadow-slate-200/40 border border-slate-100 px-8 py-6 flex items-center justify-between">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className={`relative flex items-center w-12 h-6.5 rounded-full transition-all duration-300 ${form.is_active ? 'bg-[#1e293b] shadow-[0_0_12px_rgba(30,41,59,0.2)]' : 'bg-slate-200'}`}>
              <input type="checkbox" name="is_active" checked={form.is_active ?? true} onChange={handleChange} className="sr-only" />
              <span className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${form.is_active ? 'translate-x-6' : 'translate-x-1'}`} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-black text-slate-700 uppercase tracking-wider">Active Status</span>
              <span className="text-[10px] text-slate-400 font-bold">Visible on the website</span>
            </div>
          </label>
        </div>

        {/* ── Footer Actions ───────────────────────────────────────────────────── */}
        <div className="bg-white rounded-[2rem] shadow-lg shadow-slate-200/40 border border-slate-100 px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate('/admin/pages/faculty')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl text-xs font-black text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all uppercase tracking-widest"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto bg-[#1e293b] hover:bg-[#0f172a] disabled:opacity-50 text-white font-black px-10 py-4 rounded-2xl text-xs transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 uppercase tracking-[0.15em] flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : isEdit ? 'Update Faculty' : 'Create Faculty'}
          </button>
        </div>
      </form>

      {/* Inline CSS for toast animation */}
      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default FacultyForm;
