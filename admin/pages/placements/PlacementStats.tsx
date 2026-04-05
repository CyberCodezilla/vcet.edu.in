import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { placementStatsApi, type PlacementStat } from '../../api/placementStats';

const emptyForm = { year: '', count: '', is_covid: false, is_ongoing: false };

const PlacementStats: React.FC = () => {
  const [stats, setStats] = useState<PlacementStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<number | null>(null);
  const [formErr, setFormErr] = useState('');

  const refresh = () => {
    setLoading(true);
    placementStatsApi.list()
      .then(setStats)
      .finally(() => setLoading(false));
  };

  useEffect(() => { refresh(); }, []);

  const validateForm = () => {
    if (!form.year.trim()) return 'Year label is required (e.g. 2026-27)';
    const n = Number(form.count);
    if (!form.count || isNaN(n) || n < 0) return 'Count must be a non-negative number';
    const duplicate = stats.some(
      (s) => s.year === form.year.trim() && s.id !== editId
    );
    if (duplicate) return `A stat for "${form.year.trim()}" already exists. Edit that row instead.`;
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateForm();
    if (err) { setFormErr(err); return; }
    setFormErr('');
    setSaving(true);
    const payload = {
      year: form.year.trim(),
      count: Number(form.count),
      is_covid: form.is_covid,
      is_ongoing: form.is_ongoing,
    };
    try {
      if (editId !== null) {
        await placementStatsApi.update(editId, payload);
        setEditId(null);
      } else {
        await placementStatsApi.add(payload);
      }
      setForm(emptyForm);
      refresh();
    } catch (e) {
      setFormErr(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (s: PlacementStat) => {
    setEditId(s.id);
    setForm({ year: s.year, count: String(s.count), is_covid: !!s.is_covid, is_ongoing: !!s.is_ongoing });
    setFormErr('');
  };

  const handleDelete = async (id: number, year: string) => {
    if (!confirm(`Delete stat for "${year}"?`)) return;
    try {
      await placementStatsApi.remove(id);
      refresh();
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Delete failed');
    }
  };

  const handleCancel = () => { setEditId(null); setForm(emptyForm); setFormErr(''); };

  return (
    <div className="space-y-10 pb-12">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            <Link to="/admin" className="hover:text-[#1e293b] transition-colors">Dashboard</Link>
            <span>/</span>
            <Link to="/admin/home" className="hover:text-[#1e293b] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900">Placement Stats</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Placement <span className="text-[#1e293b]">Statistics</span>
          </h1>
        </div>
      </div>

      {/* Year Stats Panel */}
      <div className="bg-white border border-slate-200/60 rounded-4xl shadow-xl shadow-slate-200/40 overflow-hidden">
        {/* Panel header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">Homepage Chart — Year Stats</h2>
            <p className="text-xs text-slate-400 mt-0.5">These totals power the bar chart on the main homepage.</p>
          </div>
          <div className="flex items-center gap-2 bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-amber-200">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
            Chart Data
          </div>
        </div>

        {/* Stats table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-slate-100 border-t-[#1e293b] rounded-full animate-spin" />
            </div>
          ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="text-left px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Year</th>
                <th className="text-left px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Total Students</th>
                <th className="text-left px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Flags</th>
                <th className="text-right px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {stats.map((s) => (
                <tr key={s.id} className="group hover:bg-slate-50/50 transition-all">
                  <td className="px-8 py-4 text-sm font-bold text-slate-900">
                    {s.year}{s.is_ongoing ? ' *' : ''}
                  </td>
                  <td className="px-8 py-4">
                    <span className="text-sm font-black text-[#1e293b]">{s.count}</span>
                  </td>
                  <td className="px-8 py-4 flex gap-2 flex-wrap">
                    {s.is_covid && (
                      <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-red-100">Covid</span>
                    )}
                    {s.is_ongoing && (
                      <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-blue-100">Ongoing</span>
                    )}
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(s)}
                        className="w-8 h-8 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-[#1e293b] hover:text-white transition-all"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                      </button>
                      <button
                        onClick={() => handleDelete(s.id, s.year)}
                        className="w-8 h-8 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>

        {/* Add / Edit form */}
        <form onSubmit={handleSubmit} className="px-8 py-6 bg-slate-50/50 border-t border-slate-100">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
            {editId !== null ? 'Edit Year Stat' : 'Add New Year'}
          </p>
          <div className="flex flex-wrap gap-3 items-end">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Year Label</label>
              <input id="placementstats-1" name="placementstats-1" aria-label="placementstats field"
                type="text"
                placeholder="e.g. 2026-27"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                className="bg-white border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-xl px-4 py-3 text-sm outline-none w-36"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Total Students</label>
              <input id="placementstats-2" name="placementstats-2" aria-label="placementstats field"
                type="number"
                min="0"
                placeholder="e.g. 250"
                value={form.count}
                onChange={(e) => setForm({ ...form, count: e.target.value })}
                className="bg-white border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-xl px-4 py-3 text-sm outline-none w-32"
              />
            </div>
            <label className="flex items-center gap-2 cursor-pointer select-none pb-3">
              <input id="placementstats-3" name="placementstats-3" aria-label="placementstats field"
                type="checkbox"
                checked={form.is_covid}
                onChange={(e) => setForm({ ...form, is_covid: e.target.checked })}
                className="w-4 h-4 rounded accent-red-500"
              />
              <span className="text-xs font-bold text-slate-600">Covid year</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none pb-3">
              <input id="placementstats-4" name="placementstats-4" aria-label="placementstats field"
                type="checkbox"
                checked={form.is_ongoing}
                onChange={(e) => setForm({ ...form, is_ongoing: e.target.checked })}
                className="w-4 h-4 rounded accent-blue-500"
              />
              <span className="text-xs font-bold text-slate-600">Ongoing (adds *)</span>
            </label>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-[#1e293b] hover:bg-[#334155] text-white font-bold px-5 py-3 rounded-xl text-xs transition-all shadow-sm mb-0.5 disabled:opacity-60"
            >
              {saving ? (
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              )}
              {editId !== null ? 'Save Changes' : 'Add Year'}
            </button>
            {editId !== null && (
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold px-5 py-3 rounded-xl text-xs transition-all mb-0.5"
              >
                Cancel
              </button>
            )}
          </div>
          {formErr && <p className="text-xs text-red-500 font-bold mt-2">{formErr}</p>}
        </form>
      </div>
    </div>
  );
};

export default PlacementStats;
