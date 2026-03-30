import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2, CheckCircle, AlertTriangle } from 'lucide-react';
import type { TrainingPlacementPayload } from '../../types';
import { trainingPlacementApi } from '../../api/trainingPlacement';

const MMSOjtInternshipForm: React.FC = () => {
  const [form, setForm] = useState<TrainingPlacementPayload>({
    internshipList: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await trainingPlacementApi.get();
      if (res.data) {
        setForm(prev => ({
          ...prev,
          internshipList: res.data.internshipList || [],
        }));
      }
    } catch (e) {
      console.warn("Could not fetch old data:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setSaving(true);
    setError('');
    setSuccessMsg('');
    try {
      await trainingPlacementApi.update(form);
      setSuccessMsg('Changes saved successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleTextChange = (value: string, limit: number, setter: (val: string) => void) => {
    if (value.length <= limit) setter(value);
  };

  if (loading) {
    return <div className="p-10 text-center"><div className="w-8 h-8 border-4 border-slate-200 border-t-[#2563EB] rounded-full animate-spin mx-auto mb-4" />Loading Form...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-fade-in relative pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/admin/pages/mms" className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold text-[#111827]">OJT & Internships</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">MMS TRAINING & PLACEMENT EDITOR</p>
          </div>
        </div>
        <button onClick={() => handleSave()} disabled={saving} className="px-8 py-3.5 bg-[#2563EB] text-white rounded-2xl font-black text-sm uppercase tracking-wider shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center gap-2">
          {saving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-xl px-5 py-4 text-sm text-red-600 font-medium flex items-center gap-3">
          <AlertTriangle className="w-5 h-5" /> {error}
        </div>
      )}
      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-5 py-4 text-sm text-emerald-600 font-medium flex items-center gap-3">
          <CheckCircle className="w-5 h-5" /> {successMsg}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-4">

        {/* OJT & Summer Internship List */}
        <SectionCard title="OJT & Summer Internship List" icon="📊">
          <p className="text-xs text-slate-500 mb-4 font-medium">Manage the OJT and summer internship records (max 45 rows).</p>
          <div className="overflow-x-auto bg-white rounded-xl border border-slate-200">
            <table className="w-full text-xs text-left text-slate-600">
              <thead className="bg-slate-50 text-[10px] uppercase font-extrabold text-slate-400">
                <tr>
                  <th className="px-4 py-3 w-16">Sr.</th>
                  <th className="px-4 py-3">Student Name <span className="text-slate-300 font-normal">(Max 50)</span></th>
                  <th className="px-4 py-3 w-32">Spec <span className="text-slate-300 font-normal">(Max 15)</span></th>
                  <th className="px-4 py-3">Company <span className="text-slate-300 font-normal">(Max 45)</span></th>
                  <th className="px-4 py-3 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {form.internshipList?.map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-2">
                      <input className="admin-input-small w-14 text-center" value={item.srNo} onChange={e => {
                        const c = [...form.internshipList!]; c[i] = { ...c[i], srNo: e.target.value }; setForm({ ...form, internshipList: c });
                      }} />
                    </td>
                    <td className="p-2">
                      <input className="admin-input-small w-full" value={item.studentName} placeholder="Student name" onChange={e => handleTextChange(e.target.value, 50, val => {
                        const c = [...form.internshipList!]; c[i] = { ...c[i], studentName: val }; setForm({ ...form, internshipList: c });
                      })} />
                    </td>
                    <td className="p-2">
                      <input className="admin-input-small w-full" value={item.specialization} placeholder="Spec" onChange={e => handleTextChange(e.target.value, 15, val => {
                        const c = [...form.internshipList!]; c[i] = { ...c[i], specialization: val }; setForm({ ...form, internshipList: c });
                      })} />
                    </td>
                    <td className="p-2">
                      <input className="admin-input-small w-full" value={item.company} placeholder="Company name" onChange={e => handleTextChange(e.target.value, 45, val => {
                        const c = [...form.internshipList!]; c[i] = { ...c[i], company: val }; setForm({ ...form, internshipList: c });
                      })} />
                    </td>
                    <td className="p-2 text-center">
                      <button type="button" onClick={() => {
                        const c = [...form.internshipList!]; c.splice(i, 1); setForm({ ...form, internshipList: c });
                      }} className="text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase">{form.internshipList?.length || 0} / 45 rows</span>
            {(form.internshipList?.length || 0) < 45 && (
              <button type="button" onClick={() => setForm({ ...form, internshipList: [...(form.internshipList || []), { srNo: String((form.internshipList?.length || 0) + 1), studentName: '', specialization: '', company: '' }] })} className="btn-add max-w-xs">
                <Plus className="w-4 h-4" /> Add Row
              </button>
            )}
          </div>
          {form.internshipList?.length === 45 && <p className="text-xs text-amber-500 font-bold mt-2">Max 45 rows reached.</p>}
        </SectionCard>

      </form>
      <style>{`
        .admin-input-small { width: 100%; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 0.5rem; padding: 0.5rem 0.75rem; color: #0f172a; font-size: 0.75rem; font-weight: 500; outline: none; transition: 0.2s; }
        .admin-input-small:focus { border-color: #2563EB; background: #fff; box-shadow: 0 0 0 2px rgba(37,99,235, 0.1); }
        .admin-label { display: block; font-size: 0.65rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.35rem; }
        .btn-add { display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; border: 2px dashed #cbd5e1; border-radius: 0.75rem; padding: 0.75rem; font-size: 0.75rem; font-weight: bold; color: #64748b; background: white; transition: 0.2s; cursor: pointer; }
        .btn-add:hover { border-color: #2563EB; color: #2563EB; background: #eff6ff; }
      `}</style>
    </div>
  );
};

/* ── Helper Components ── */

const SectionCard = ({ icon, title, children }: any) => (
  <div className="bg-white rounded-[2rem] p-8 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.05)] border border-slate-100">
    <div className="flex items-center gap-3 mb-8">
      {icon && <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-lg shadow-sm border border-slate-100">{icon}</div>}
      <h2 className="text-sm font-black text-[#111827] uppercase tracking-wider">{title}</h2>
    </div>
    <div>{children}</div>
  </div>
);

export default MMSOjtInternshipForm;
