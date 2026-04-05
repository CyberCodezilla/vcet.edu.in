import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { newsTickerApi } from '../../api/newsTicker';
import type { NewsTickerPayload } from '../../types';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';

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
      <PageEditorHeader
        title={isEdit ? 'Edit Ticker Item' : 'Add New Ticker'}
        description="Ticker items will rotate at the top of the header on the website."
        onSave={handleSubmit as unknown as () => void}
        isSaving={saving}
        showBackButton
        onBack={() => navigate('/admin/news-ticker')}
      />

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-4xl shadow-xl shadow-slate-200/50 border border-slate-100 space-y-8">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">Ticker Message</label>
              <textarea id="newstickerform-textarea-1" aria-label="newstickerform textarea field"
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
              <input id="newstickerform-1" aria-label="newstickerform field"
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
                <input id="newstickerform-2" aria-label="newstickerform field"
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
                    <input id="newstickerform-3" aria-label="newstickerform field"
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


      </form>
    </div>
  );
};

export default NewsTickerForm;
