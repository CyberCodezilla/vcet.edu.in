import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { heroSlidesApi } from '../../api/heroSlides';
import type { HeroSlidePayload } from '../../types';

const HeroSlideForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState<HeroSlidePayload>({ title: '', subtitle: '', button_text: '', button_link: '', sort_order: 0, is_active: true });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    heroSlidesApi.get(Number(id))
      .then((r) => {
        if (!r.data) return;
        const s = r.data;
        setForm({ title: s.title, subtitle: s.subtitle ?? '', button_text: s.button_text ?? '', button_link: s.button_link ?? '', sort_order: s.sort_order, is_active: s.is_active });
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.title?.trim()) { setError('Title is required.'); return; }
    setSaving(true);
    try {
      const payload: HeroSlidePayload = { ...form, ...(imageFile ? { image: imageFile } : {}) };
      if (isEdit) await heroSlidesApi.update(Number(id), payload);
      else await heroSlidesApi.create(payload);
      navigate('/admin/hero-slides');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="w-10 h-10 border-4 border-slate-100 border-t-[#1e293b] rounded-full animate-spin" />
      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Loading Slide...</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto pb-24">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 mb-4 uppercase tracking-widest">
        <Link to="/admin" className="hover:text-slate-600 transition-colors">Dashboard</Link>
        <span className="text-slate-300 font-normal">/</span>
        <Link to="/admin/hero-slides" className="hover:text-slate-600 transition-colors">Hero Slides</Link>
        <span className="text-slate-300 font-normal">/</span>
        <span className="text-slate-600">{isEdit ? 'Edit' : 'New'}</span>
      </div>

      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          {isEdit ? 'Edit' : 'Add New'} <span className="text-slate-400">Hero Slide</span>
        </h1>
        <button 
          onClick={() => navigate('/admin/hero-slides')}
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
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">Slide Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Empowering Future Engineers"
                className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1e293b] focus:bg-white rounded-2xl px-6 py-4 text-sm font-bold transition-all outline-none"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">Subtitle Text</label>
              <textarea
                name="subtitle"
                value={form.subtitle ?? ''}
                onChange={handleChange}
                placeholder="Brief description for the slide banner..."
                rows={3}
                className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1e293b] focus:bg-white rounded-3xl px-6 py-4 text-sm font-bold transition-all outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">Button Text</label>
                <input
                  name="button_text"
                  value={form.button_text ?? ''}
                  onChange={handleChange}
                  placeholder="e.g. Explore Now"
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1e293b] focus:bg-white rounded-2xl px-6 py-4 text-sm font-bold transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">Button Link</label>
                <input
                  name="button_link"
                  value={form.button_link ?? ''}
                  onChange={handleChange}
                  placeholder="e.g. /admissions"
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1e293b] focus:bg-white rounded-2xl px-6 py-4 text-sm font-bold transition-all outline-none"
                />
              </div>
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
                  <span className="text-xs font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-700 transition-colors">Active Slide</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Image Upload & Actions */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1 block mb-4">Background Image</label>
            <div className="relative group cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <div className="w-full aspect-video rounded-[2rem] bg-slate-50 border-4 border-dashed border-slate-100 flex flex-col items-center justify-center gap-3 group-hover:bg-slate-100 group-hover:border-slate-200 transition-all overflow-hidden">
                {imageFile ? (
                  <img src={URL.createObjectURL(imageFile)} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center px-4">Upload Banner Image</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl shadow-slate-900/20 text-white space-y-6">
            <h3 className="font-bold text-lg">Banner Settings</h3>
            <p className="text-slate-400 text-xs leading-relaxed font-medium">This slide will be displayed on the homepage hero section.</p>
            {error && <p className="text-red-400 text-xs font-bold leading-relaxed">{error}</p>}
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="w-full bg-white text-slate-900 font-black py-4 rounded-2xl text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving && <div className="w-4 h-4 border-2 border-slate-900/20 border-t-slate-900 rounded-full animate-spin" />}
              {isEdit ? 'Update Slide' : 'Publish Slide'}
            </button>
            <button
              onClick={() => navigate('/admin/hero-slides')}
              className="w-full bg-slate-800 text-slate-400 font-bold py-4 rounded-2xl text-xs uppercase tracking-widest transition-all hover:bg-slate-700 hover:text-white"
            >
              Discard Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HeroSlideForm;
