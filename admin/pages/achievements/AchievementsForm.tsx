import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { achievementsApi } from '../../api/achievements';
import type { AchievementPayload } from '../../types';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';

const AchievementsForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState<AchievementPayload>({
    title: '',
    value: '',
    participant_name: '',
    participant_role: '',
    date: '',
    category: 'Academic',
    document_name: '',
    document_url: '',
    description: '',
    icon: '🏆',
    sort_order: 0,
    is_active: true
  });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    achievementsApi.get(Number(id))
      .then((r) => {
        if (!r.data) return;
        const a = r.data;
        setForm({
          title: a.title,
          value: a.value,
          participant_name: a.participant_name ?? '',
          participant_role: a.participant_role ?? '',
          date: a.date ?? '',
          category: a.category ?? 'Academic',
          document_name: a.document_name ?? '',
          document_url: a.document_url ?? '',
          description: a.description ?? '',
          icon: a.icon ?? '🏆',
          sort_order: a.sort_order,
          is_active: a.is_active
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
      [name]: type === 'checkbox' ? target.checked : type === 'number' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.title.trim()) { setError('Achievement title is required.'); return; }
    if (!form.value.trim()) { setError('Award/Rank value is required.'); return; }
    setSaving(true);
    try {
      if (isEdit) await achievementsApi.update(Number(id), form);
      else await achievementsApi.create(form);
      navigate('/admin/achievements');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-10 h-10 border-4 border-slate-100 border-t-[#1e293b] rounded-full animate-spin" />
        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest text-center">Loading Achievement Details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12">
      <PageEditorHeader
        title={isEdit ? 'Edit Achievement' : 'Add Achievement'}
        description="Showcase student and faculty achievements, awards, and recognitions on the website."
        onSave={handleSubmit as unknown as () => void}
        isSaving={saving}
        showBackButton
        onBack={() => navigate('/admin/achievements')}
      />

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-3xl px-6 py-4 text-sm text-red-600 flex items-center gap-3">
          <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-4xl shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden flex flex-col transition-all">
        <div className="p-8 sm:p-10 space-y-8">
          {/* Main Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">Achievement Title <span className="text-red-400">*</span></label>
              <input id="achievementsform-1" aria-label="achievementsform field" name="title" value={form.title} onChange={handleChange} placeholder="e.g., First Prize in Smart India Hackathon" required className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-2xl px-5 py-4 text-sm font-bold transition-all outline-none" />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">Award / Rank <span className="text-red-400">*</span></label>
              <input id="achievementsform-2" aria-label="achievementsform field" name="value" value={form.value} onChange={handleChange} placeholder="e.g., 1st Rank or ₹1,00,000" required className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-2xl px-5 py-4 text-sm font-bold transition-all outline-none" />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">Icon / Emoji</label>
              <input id="achievementsform-3" aria-label="achievementsform field" name="icon" value={form.icon ?? ''} onChange={handleChange} placeholder="🏆" className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-2xl px-5 py-4 text-sm font-bold transition-all outline-none" />
            </div>
          </div>

          {/* Participant Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-50">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">Participant Name</label>
              <input id="achievementsform-4" aria-label="achievementsform field" name="participant_name" value={form.participant_name ?? ''} onChange={handleChange} placeholder="e.g., John Doe" className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-2xl px-5 py-4 text-sm font-bold transition-all outline-none" />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">Participant Role</label>
              <input id="achievementsform-5" aria-label="achievementsform field" name="participant_role" value={form.participant_role ?? ''} onChange={handleChange} placeholder="e.g., Final Year IT" className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-2xl px-5 py-4 text-sm font-bold transition-all outline-none" />
            </div>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">Date Achieved</label>
              <input id="achievementsform-6" aria-label="achievementsform field" type="date" name="date" value={form.date ?? ''} onChange={handleChange} className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-2xl px-5 py-4 text-sm font-bold transition-all outline-none" />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">Category</label>
              <select id="achievementsform-select-1" aria-label="achievementsform select field" name="category" value={form.category ?? 'Academic'} onChange={handleChange} className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-2xl px-5 py-4 text-sm font-bold transition-all outline-none flex">
                <option value="Academic">Academic</option>
                <option value="Sports">Sports</option>
                <option value="Research">Research</option>
                <option value="Technical">Technical</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Document Section */}
          <div className="space-y-4 pt-4 border-t border-slate-50">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Verification Document</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">Document Name</label>
                <input id="achievementsform-7" aria-label="achievementsform field" name="document_name" value={form.document_name ?? ''} onChange={handleChange} placeholder="e.g., certificate.pdf" className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-2xl px-5 py-4 text-sm font-bold transition-all outline-none" />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">Document URL</label>
                <input id="achievementsform-8" aria-label="achievementsform field" name="document_url" value={form.document_url ?? ''} onChange={handleChange} placeholder="https://drive.google.com/..." className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-2xl px-5 py-4 text-sm font-bold transition-all outline-none" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">Short Description</label>
            <textarea id="achievementsform-textarea-2" aria-label="achievementsform textarea field" name="description" value={form.description ?? ''} onChange={handleChange} rows={3} placeholder="Provide more context about the achievement..." className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-2xl px-5 py-4 text-sm font-bold transition-all outline-none resize-none" />
          </div>

          {/* Visibility & Toggle */}
          <div className="flex flex-wrap gap-8 pt-4">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className={`relative flex items-center w-12 h-6.5 rounded-full transition-all duration-300 ${form.is_active ? 'bg-[#1e293b] shadow-[0_0_12px_rgba(30,41,59,0.2)]' : 'bg-slate-200'}`}>
                <input id="achievementsform-9" aria-label="achievementsform field" type="checkbox" name="is_active" checked={form.is_active ?? true} onChange={handleChange} className="sr-only" />
                <span className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${form.is_active ? 'translate-x-6' : 'translate-x-1'}`} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black text-slate-700 uppercase tracking-wider">Live Status</span>
                <span className="text-[10px] text-slate-400 font-bold">Visible on Website</span>
              </div>
            </label>
            
            <div className="flex flex-col">
               <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Sort Priority</label>
               <input id="achievementsform-10" aria-label="achievementsform field" type="number" name="sort_order" value={form.sort_order ?? 0} onChange={handleChange} min={0} className="w-24 bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-xl px-4 py-2 text-sm font-bold transition-all outline-none" />
            </div>
          </div>
        </div>


      </form>
    </div>
  );
};

export default AchievementsForm;
