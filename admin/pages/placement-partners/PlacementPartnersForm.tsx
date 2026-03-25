import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { placementPartnersApi } from '../../api/placementPartners';
import type { PlacementPartnerPayload } from '../../types';

const PlacementPartnersForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState<PlacementPartnerPayload>({ name: '', website: '', is_active: true, sort_order: 0 });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    placementPartnersApi.get(Number(id))
      .then((r) => {
        if (!r.data) return;
        const p = r.data;
        setForm({ name: p.name, website: p.website ?? '', is_active: p.is_active, sort_order: p.sort_order });
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim()) { setError('Company name is required.'); return; }
    setSaving(true);
    try {
      if (isEdit) await placementPartnersApi.update(Number(id), form);
      else await placementPartnersApi.create(form);
      navigate('/admin/placement-partners');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <div className="w-10 h-10 border-4 border-slate-100 border-t-[#1e293b] rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl">
        {/* Breadcrumbs */}
        <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
          <Link to="/admin" className="hover:text-[#1e293b] transition-colors">Dashboard</Link>
          <span>/</span>
          <Link to="/admin/placement-partners" className="hover:text-[#1e293b] transition-colors">Partners</Link>
          <span>/</span>
          <span className="text-slate-900">{isEdit ? 'Edit Partner' : 'New Partner'}</span>
        </div>

        <div className="bg-white border border-slate-200/60 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 p-10 md:p-14">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-3">
              {isEdit ? 'Edit' : 'New'} <span className="text-[#1e293b]">Recruiter</span>
            </h1>
            <p className="text-slate-400 text-sm">Fill in the company details for display.</p>
          </div>

          {error && (
            <div className="mb-8 bg-red-50 border border-red-100 rounded-2xl px-6 py-4 flex items-center gap-3 text-red-600 animate-shake">
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <p className="text-xs font-bold uppercase tracking-wide">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Company Name *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Infosys Limited"
                  className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-2xl px-6 py-4 text-sm transition-all outline-none font-medium placeholder:text-slate-300"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Website URL</label>
                <input
                  name="website"
                  value={form.website ?? ''}
                  onChange={handleChange}
                  placeholder="https://www.infosys.com"
                  className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-2xl px-6 py-4 text-sm transition-all outline-none font-medium placeholder:text-slate-300"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Sort Order</label>
                <input
                  type="number"
                  name="sort_order"
                  value={form.sort_order ?? 0}
                  onChange={handleChange}
                  min={0}
                  className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-2xl px-6 py-4 text-sm transition-all outline-none font-medium"
                />
              </div>

              <div className="flex items-end pb-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`relative flex items-center w-12 h-7 rounded-full transition-all duration-300 ${form.is_active ? 'bg-[#1e293b] shadow-lg shadow-slate-200' : 'bg-slate-200'}`}>
                    <input type="checkbox" name="is_active" checked={form.is_active ?? true} onChange={handleChange} className="sr-only" />
                    <span className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${form.is_active ? 'translate-x-6' : 'translate-x-1'}`} />
                  </div>
                  <span className="text-xs font-black text-slate-600 uppercase tracking-widest group-hover:text-slate-900 transition-colors">Visible to Public</span>
                </label>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-[#1e293b] hover:bg-slate-800 disabled:opacity-50 text-white font-black px-8 py-5 rounded-2xl text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-200 hover:-translate-y-1"
              >
                {saving ? 'Processing...' : isEdit ? 'Save Changes' : 'Add Partner'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/placement-partners')}
                className="px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlacementPartnersForm;
