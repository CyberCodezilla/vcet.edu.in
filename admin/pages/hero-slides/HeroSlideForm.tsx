import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { heroSlidesApi } from '../../api/heroSlides';
import type { HeroSlidePayload } from '../../types';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';

const HeroSlideForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState<HeroSlidePayload>({ title: '', subtitle: '', button_text: '', button_link: '', sort_order: 0, is_active: true });
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
      if (isEdit) await heroSlidesApi.update(Number(id), form);
      else await heroSlidesApi.create(form);
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
      <PageEditorHeader
        title={isEdit ? 'Edit Hero Slide' : 'Add New Hero Slide'}
        description="Configure banner slides for the homepage hero section."
        onSave={handleSubmit as unknown as () => void}
        isSaving={saving}
        showBackButton
        onBack={() => navigate('/admin/hero-slides')}
      />

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-4xl shadow-xl shadow-slate-200/50 border border-slate-100 space-y-8">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">Slide Title</label>
              <input id="heroslideform-1" aria-label="heroslideform field"
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
              <textarea id="heroslideform-textarea-1" aria-label="heroslideform textarea field"
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
                <input id="heroslideform-2" aria-label="heroslideform field"
                  name="button_text"
                  value={form.button_text ?? ''}
                  onChange={handleChange}
                  placeholder="e.g. Explore Now"
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1e293b] focus:bg-white rounded-2xl px-6 py-4 text-sm font-bold transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">Button Link</label>
                <input id="heroslideform-3" aria-label="heroslideform field"
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
                <input id="heroslideform-4" aria-label="heroslideform field"
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
                    <input id="heroslideform-5" aria-label="heroslideform field"
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


      </form>
    </div>
  );
};

export default HeroSlideForm;
