import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { testimonialsApi } from '../../api/testimonials';
import type { TestimonialPayload } from '../../types';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';

const TestimonialsForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState<TestimonialPayload>({ name: '', role: '', text: '', rating: 5, is_active: true });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    testimonialsApi.get(Number(id))
      .then((r) => {
        if (!r.data) return;
        const t = r.data;
        setForm({ name: t.name, role: t.role ?? '', text: t.text, rating: t.rating ?? 5, is_active: t.is_active });
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
    if (!form.name?.trim()) { setError('Name is required.'); return; }
    if (!form.text?.trim()) { setError('Quote text is required.'); return; }
    setSaving(true);
    try {
      if (isEdit) await testimonialsApi.update(Number(id), form);
      else await testimonialsApi.create(form);
      navigate('/admin/testimonials');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="w-10 h-10 border-4 border-slate-100 border-t-[#1e293b] rounded-full animate-spin" />
      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Loading Testimonial...</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto pb-24">
      {/* Breadcrumbs */}
      <PageEditorHeader
        title={isEdit ? 'Edit Testimonial' : 'Add New Testimonial'}
        description="Manage student and alumni testimonials for the website."
        onSave={handleSubmit as unknown as () => void}
        isSaving={saving}
        showBackButton
        onBack={() => navigate('/admin/testimonials')}
      />

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-4xl shadow-xl shadow-slate-200/50 border border-slate-100 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">Person's Name</label>
                <input id="testimonialsform-1" aria-label="testimonialsform field"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1e293b] focus:bg-white rounded-2xl px-6 py-4 text-sm font-bold transition-all outline-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">Role / Batch</label>
                <input id="testimonialsform-2" aria-label="testimonialsform field"
                  name="role"
                  value={form.role ?? ''}
                  onChange={handleChange}
                  placeholder="e.g. B.E. Computer, 2023"
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1e293b] focus:bg-white rounded-2xl px-6 py-4 text-sm font-bold transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">Testimonial Quote</label>
              <textarea id="testimonialsform-textarea-2" aria-label="testimonialsform textarea field"
                name="text"
                value={form.text}
                onChange={handleChange}
                placeholder="Share their experience at VCET..."
                rows={5}
                className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1e293b] focus:bg-white rounded-3xl px-6 py-4 text-sm font-bold transition-all outline-none resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">Star Rating</label>
                <select id="testimonialsform-select-1" aria-label="testimonialsform select field"
                  name="rating"
                  value={form.rating ?? 5}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-[#1e293b] focus:bg-white rounded-2xl px-6 py-4 text-sm font-bold transition-all outline-none"
                >
                  {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} Star{r !== 1 ? 's' : ''}</option>)}
                </select>
              </div>
              <div className="flex items-end pb-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`relative w-12 h-6 rounded-full transition-all duration-300 ${form.is_active ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                    <input id="testimonialsform-3" aria-label="testimonialsform field"
                      type="checkbox"
                      name="is_active"
                      checked={form.is_active}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${form.is_active ? 'left-7' : 'left-1'}`} />
                  </div>
                  <span className="text-xs font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-700 transition-colors">Visible on Site</span>
                </label>
              </div>
            </div>
          </div>
        </div>


      </form>
    </div>
  );
};

export default TestimonialsForm;
