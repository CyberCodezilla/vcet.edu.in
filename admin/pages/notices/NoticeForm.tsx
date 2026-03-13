import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { noticesApi } from '../../api/notices';
import type { NoticePayload } from '../../types';
import { Link } from 'react-router-dom';

const CATEGORIES = ['Academic', 'Cultural', 'Placement', 'Administrative', 'General'];

const empty: NoticePayload = {
  title: '',
  category: 'General',
  description: '',
  external_link: '',
  is_new: false,
  is_active: true,
  sort_order: 0,
};

const NoticeForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState<NoticePayload>(empty);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    setFetching(true);
    noticesApi
      .get(Number(id))
      .then((r) => {
        if (r.data) {
          const d = r.data;
          setForm({
            title: d.title,
            category: d.category ?? 'General',
            description: d.description ?? '',
            external_link: d.external_link ?? '',
            is_new: d.is_new,
            is_active: d.is_active,
            sort_order: d.sort_order,
          });
        }
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setFetching(false));
  }, [id]);

  const set = <K extends keyof NoticePayload>(key: K, value: NoticePayload[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const payload: NoticePayload = { ...form, ...(file ? { attachment: file } : {}) };
    try {
      if (isEdit) {
        await noticesApi.update(Number(id), payload);
      } else {
        await noticesApi.create(payload);
      }
      navigate('/admin/notices');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-3 border-slate-100 border-t-[#1e293b] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-widest">
            <Link to="/admin" className="hover:text-slate-600 transition-colors">Dashboard</Link>
            <span className="text-slate-300 font-normal">/</span>
            <Link to="/admin/notices" className="hover:text-slate-600 transition-colors">Notices</Link>
            <span className="text-slate-300 font-normal">/</span>
            <span className="text-slate-600">{isEdit ? 'Edit' : 'New'}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#111827]">{isEdit ? 'Edit Notice' : 'Add New Notice'}</h1>
        </div>
        <button
          type="button"
          onClick={() => navigate('/admin/notices')}
          className="text-slate-500 hover:text-slate-800 text-sm font-bold flex items-center gap-2 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to List
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-2xl px-5 py-4 text-sm text-red-600 font-medium flex items-center gap-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200/60 shadow-xl shadow-slate-200/40 rounded-[2rem] p-8 lg:p-10 space-y-7">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">Notice Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              required
              className="admin-input"
              placeholder="e.g. End Semester Exam Timetable"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">Category</label>
            <select
              value={form.category ?? 'General'}
              onChange={(e) => set('category', e.target.value)}
              className="admin-input appearance-none"
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Sort Order */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">Sort Order</label>
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) => set('sort_order', Number(e.target.value))}
              className="admin-input"
              min={0}
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">Description (Snippet)</label>
          <textarea
            value={form.description ?? ''}
            onChange={(e) => set('description', e.target.value)}
            rows={4}
            className="admin-input resize-none"
            placeholder="Briefly describe what this notice is about..."
          />
        </div>

        {/* External link */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">External Link</label>
            <input
              type="url"
              value={form.external_link ?? ''}
              onChange={(e) => set('external_link', e.target.value)}
              className="admin-input"
              placeholder="https://vcet.edu.in/..."
            />
          </div>

          {/* PDF attachment */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">Attachment (PDF)</label>
            <div className="relative group">
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-6 file:rounded-2xl file:border-0 file:text-xs file:font-bold file:bg-[#1e293b]/5 file:text-[#1e293b] hover:file:bg-[#1e293b]/10 cursor-pointer transition-all admin-input p-0 overflow-hidden"
              />
            </div>
            {file && <p className="text-[10px] text-emerald-600 font-bold mt-2 uppercase tracking-tight">Selected: {file.name}</p>}
          </div>
        </div>

        {/* Action Toggles */}
        <div className="pt-4 flex flex-col sm:flex-row gap-6">
          <label className="flex items-center gap-3.5 cursor-pointer group select-none">
            <div className={`relative flex items-center w-12 h-6.5 rounded-full transition-all duration-300 ${form.is_active ? 'bg-[#1e293b]' : 'bg-slate-200'}`}>
              <input type="checkbox" checked={form.is_active} onChange={(e) => set('is_active', e.target.checked)} className="sr-only" />
              <span className={`w-4.5 h-4.5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${form.is_active ? 'translate-x-6.5' : 'translate-x-1'}`} />
            </div>
            <div>
              <span className="block text-sm font-bold text-slate-700 group-hover:text-black transition-colors">Visible to Public</span>
              <span className="block text-[10px] text-slate-400 font-medium uppercase tracking-tighter">Live on Website</span>
            </div>
          </label>

          <label className="flex items-center gap-3.5 cursor-pointer group select-none">
            <div className={`relative flex items-center w-12 h-6.5 rounded-full transition-all duration-300 ${form.is_new ? 'bg-blue-600' : 'bg-slate-200'}`}>
              <input type="checkbox" checked={form.is_new} onChange={(e) => set('is_new', e.target.checked)} className="sr-only" />
              <span className={`w-4.5 h-4.5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${form.is_new ? 'translate-x-6.5' : 'translate-x-1'}`} />
            </div>
            <div>
              <span className="block text-sm font-bold text-slate-700 group-hover:text-black transition-colors">Highlight as New</span>
              <span className="block text-[10px] text-slate-400 font-medium uppercase tracking-tighter">Adds "NEW" Badge</span>
            </div>
          </label>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center gap-4 pt-8 border-t border-slate-100">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 sm:flex-none min-w-[160px] bg-[#1e293b] hover:bg-[#334155] disabled:opacity-50 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2 group"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>{isEdit ? 'Save Changes' : 'Publish Notice'}</span>
                <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/notices')}
            className="flex-1 sm:flex-none min-w-[120px] px-6 py-4 rounded-2xl text-sm font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200"
          >
            Cancel
          </button>
        </div>
      </form>

      <style>{`
        .admin-input {
          width: 100%;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 1.25rem;
          padding: 0.875rem 1.25rem;
          color: #1e293b;
          font-size: 0.875rem;
          font-weight: 500;
          outline: none;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .admin-input::placeholder { color: #94a3b8; }
        .admin-input:focus { 
          border-color: #94a3b8; 
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(241,245,249, 0.8);
        }
        select.admin-input {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 1.25rem;
          padding-right: 3rem;
        }
      `}</style>
    </div>
  );
};

export default NoticeForm;
