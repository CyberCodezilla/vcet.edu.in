import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { placementPartnersApi } from '../../api/placementPartners';
import type { PlacementPartnerPayload } from '../../types';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';

const PlacementPartnersForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState<PlacementPartnerPayload>({ name: '', website: '', is_active: true, sort_order: 0 });
  const [logoFile, setLogoFile] = useState<File | null>(null);
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
      const payload: PlacementPartnerPayload = { ...form, ...(logoFile ? { logo: logoFile } : {}) };
      if (isEdit) await placementPartnersApi.update(Number(id), payload);
      else await placementPartnersApi.create(payload);
      navigate('/admin/placement-partners');
    } catch (err: any) {
      setError(err instanceof Error ? err.message : 'Save failed');
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
        <PageEditorHeader
          title={isEdit ? 'Edit Recruiter' : 'New Recruiter'}
          description="Fill in the company details for display on the recruiters page."
          onSave={handleSubmit as unknown as () => void}
          isSaving={saving}
          showBackButton
          onBack={() => navigate('/admin/placement-partners')}
        />

        <div className="bg-white border border-slate-200/60 rounded-4xl shadow-2xl shadow-slate-200/50 p-10 md:p-14">

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
                <input id="placementpartnersform-1" aria-label="placementpartnersform field"
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
                <input id="placementpartnersform-2" aria-label="placementpartnersform field"
                  name="website"
                  value={form.website ?? ''}
                  onChange={handleChange}
                  placeholder="https://www.infosys.com"
                  className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-2xl px-6 py-4 text-sm transition-all outline-none font-medium placeholder:text-slate-300"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Sort Order</label>
                <input id="placementpartnersform-3" aria-label="placementpartnersform field"
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
                    <input id="placementpartnersform-4" aria-label="placementpartnersform field" type="checkbox" name="is_active" checked={form.is_active ?? true} onChange={handleChange} className="sr-only" />
                    <span className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${form.is_active ? 'translate-x-6' : 'translate-x-1'}`} />
                  </div>
                  <span className="text-xs font-black text-slate-600 uppercase tracking-widest group-hover:text-slate-900 transition-colors">Visible to Public</span>
                </label>
              </div>

              <div className="md:col-span-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Company Logo</label>
                <div className="relative group">
                  <input id="placementpartnersform-5" name="placementpartnersform-5" aria-label="placementpartnersform field"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl px-6 py-8 flex flex-col items-center justify-center gap-2 group-hover:border-[#1e293b] group-hover:bg-white transition-all">
                    <svg className="w-8 h-8 text-slate-300 group-hover:text-[#1e293b] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    <p className="text-xs font-bold text-slate-500 group-hover:text-slate-800">
                      {logoFile ? logoFile.name : 'Click to upload company logo'}
                    </p>
                    <p className="text-[10px] text-slate-400">PNG or SVG recommended</p>
                  </div>
                </div>
              </div>
            </div>


          </form>
        </div>
      </div>
    </div>
  );
};

export default PlacementPartnersForm;
