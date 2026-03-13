import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { newsTickerApi } from '../../api/newsTicker';
import type { NewsTickerPayload } from '../../types';

const NewsTickerForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState<NewsTickerPayload>({ text: '', link: '', is_active: true, sort_order: 0 });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    newsTickerApi.get(Number(id))
      .then((r) => {
        if (!r.data) return;
        const t = r.data;
        setForm({ text: t.text, link: t.link ?? '', is_active: t.is_active, sort_order: t.sort_order });
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.text?.trim()) { setError('Text is required.'); return; }
    setSaving(true);
    try {
      if (isEdit) await newsTickerApi.update(Number(id), form);
      else await newsTickerApi.create(form);
      navigate('/admin/news-ticker');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="w-10 h-10 border-4 border-slate-100 border-t-[#1e293b] rounded-full animate-spin" />
      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Loading Ticker...</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto pb-24">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 mb-4 uppercase tracking-widest">
        <Link to="/admin" className="hover:text-slate-600 transition-colors">Dashboard</Link>
        <span className="text-slate-300 font-normal">/</span>
        <Link to="/admin/news-ticker" className="hover:text-slate-600 transition-colors">News Ticker</Link>
        <span className="text-slate-300 font-normal">/</span>
        <span className="text-slate-600">{isEdit ? 'Edit' : 'New'}</span>
      </div>

      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          {isEdit ? 'Edit' : 'Add New'} <span className="text-slate-400">Ticker Item</span>
        </h1>
        <button 
          onClick={() => navigate('/admin/news-ticker')}
          className="text-slate-400 hover:text-slate-600 font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to List
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 space-y-8">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">Ticker Message</label>
              <textarea
                name="text"
                value={form.text}
                onChange={handleChange}
                placeholder="Enter the news or announcement text..."
                rows={4}
                required
                className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1e293b] focus:bg-white rounded-3xl px-6 py-4 text-sm font-bold transition-all outline-none resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">Internal Link (Optional)</label>
              <input
                name="link"
                value={form.link ?? ''}
                onChange={handleChange}
                placeholder="e.g. /admissions-2024"
                className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1e293b] focus:bg-white rounded-2xl px-6 py-4 text-sm font-bold transition-all outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">Sort Order</label>
                <input
                  type="number"
                  name="sort_order"
                  value={form.sort_order ?? 0}
                  onChange={handleChange}
                  min={0}
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1e293b] focus:bg-white rounded-2xl px-6 py-4 text-sm font-bold transition-all outline-none"
                />
              </div>
              <div className="flex items-end pb-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`relative w-12 h-6 rounded-full transition-all duration-300 ${form.is_active ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                    <input
                      type="checkbox"
                      name="is_active"
                      checked={form.is_active}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${form.is_active ? 'left-7' : 'left-1'}`} />
                  </div>
                  <span className="text-xs font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-700 transition-colors">Active Status</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Actions & Tips */}
        <div className="space-y-6">
          <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl shadow-slate-900/20 text-white space-y-6">
            <h3 className="font-bold text-lg italic tracking-tight underline decoration-slate-700 underline-offset-8">Ticker Settings</h3>
            <p className="text-slate-400 text-xs leading-relaxed font-semibold">Ticker items will rotate at the top of the header on the website.</p>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
                <p className="text-red-400 text-[10px] font-black uppercase tracking-widest mb-1">Error</p>
                <p className="text-red-200 text-xs font-bold leading-relaxed">{error}</p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={saving}
              className="w-full bg-white text-slate-900 font-black py-4 rounded-2xl text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-white/10"
            >
              {saving && <div className="w-4 h-4 border-2 border-slate-900/20 border-t-slate-900 rounded-full animate-spin" />}
              {isEdit ? 'Update Item' : 'Publish Item'}
            </button>
            <button
              onClick={() => navigate('/admin/news-ticker')}
              className="w-full bg-slate-800 text-slate-400 font-bold py-4 rounded-2xl text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-slate-700 hover:text-white"
            >
              Discard
            </button>
          </div>

          <div className="bg-[#1e293b] p-8 rounded-[2.5rem] border border-slate-700/30 text-white">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Pro Tip</h4>
            <p className="text-slate-400 text-xs leading-relaxed font-bold italic">Keep ticker messages short and engaging for better readability on mobile devices.</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewsTickerForm;
