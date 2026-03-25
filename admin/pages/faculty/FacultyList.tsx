import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { facultyApi } from '../../api/faculty';
import type { Faculty } from '../../types';

/* ── Toast Component ────────────────────────────────────────────────────────── */
const Toast: React.FC<{ message: string; type: 'success' | 'error'; onClose: () => void }> = ({ message, type, onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl text-sm font-bold animate-slide-up ${type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
      {type === 'success' ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
      )}
      {message}
    </div>
  );
};

/* ── Departments & Pages for filters ─────────────────────────────────────── */
const DEPARTMENTS = ['Computer Engineering', 'Information Technology', 'Electronics & Telecommunication', 'Mechanical Engineering', 'Civil Engineering', 'AI & Data Science', 'First Year'];
const PAGES = ['Departments', 'Academics', 'Research', 'Administration'];

const FacultyList: React.FC = () => {
  const [items, setItems] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [togglingId, setTogglingId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [pageFilter, setPageFilter] = useState('all');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchItems = () => {
    setLoading(true);
    facultyApi.list()
      .then((r) => setItems(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchItems(); }, []);

  const handleToggleVisibility = async (item: Faculty) => {
    setTogglingId(item.id);
    try {
      const newStatus = !item.is_active;
      await facultyApi.update(item.id, { is_active: newStatus });
      setToast({ message: `${item.name} is now ${newStatus ? 'active' : 'inactive'}`, type: 'success' });
      // Update local state for immediate feedback
      setItems(prev => prev.map(i => i.id === item.id ? { ...i, is_active: newStatus } : i));
    } catch (e) {
      setToast({ message: e instanceof Error ? e.message : 'Toggle failed', type: 'error' });
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async (item: Faculty) => {
    if (!window.confirm(`Delete faculty "${item.name}"? This action cannot be undone.`)) return;
    setDeletingId(item.id);
    try {
      await facultyApi.delete(item.id);
      setToast({ message: `${item.name} deleted successfully`, type: 'success' });
      fetchItems();
    } catch (e) {
      setToast({ message: e instanceof Error ? e.message : 'Delete failed', type: 'error' });
      setDeletingId(null);
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = !search || item.name.toLowerCase().includes(search.toLowerCase()) || item.department.toLowerCase().includes(search.toLowerCase());
    const matchesDept = deptFilter === 'all' || item.department === deptFilter;
    const matchesPage = pageFilter === 'all' || item.page === pageFilter;
    return matchesSearch && matchesDept && matchesPage;
  });

  const totalDepts = new Set(items.map(i => i.department)).size;

  return (
    <div className="space-y-10 pb-12">
      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-widest">
            <Link to="/admin" className="hover:text-slate-600 transition-colors">Dashboard</Link>
            <span className="text-slate-300 font-normal">/</span>
            <Link to="/admin/pages/home" className="hover:text-slate-600 transition-colors">Pages</Link>
            <span className="text-slate-300 font-normal">/</span>
            <span className="text-slate-600">Faculty</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#111827]">Faculty Management</h1>
        </div>
        <Link
          to="/admin/pages/faculty/create"
          className="bg-[#1e293b] hover:bg-[#0f172a] text-white font-bold px-6 py-3 rounded-full text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Add Faculty
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5 group hover:shadow-md transition-all">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>
          </div>
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-0.5">Total Faculty</p>
            <h3 className="text-2xl font-black text-slate-800">{items.length}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5 group hover:shadow-md transition-all">
          <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          </div>
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-0.5">Departments</p>
            <h3 className="text-2xl font-black text-slate-800">{totalDepts}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5 group hover:shadow-md transition-all">
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-0.5">Total Papers</p>
            <h3 className="text-2xl font-black text-slate-800">{items.reduce((s, i) => s + i.papers, 0)}</h3>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path strokeLinecap="round" strokeWidth="2" d="m21 21-4.35-4.35" /></svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or department..."
            className="w-full bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-2xl pl-11 pr-5 py-4 text-sm font-bold transition-all outline-none shadow-sm"
          />
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-2xl px-5 py-4 text-xs font-bold text-slate-600 transition-all outline-none shadow-sm cursor-pointer"
          >
            <option value="all">All Departments</option>
            {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <select
            value={pageFilter}
            onChange={(e) => setPageFilter(e.target.value)}
            className="bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-2xl px-5 py-4 text-xs font-bold text-slate-600 transition-all outline-none shadow-sm cursor-pointer"
          >
            <option value="all">All Pages</option>
            {PAGES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 border-4 border-slate-100 border-t-[#1e293b] rounded-full animate-spin" />
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Loading Faculty...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>
            </div>
            <h3 className="text-lg font-extrabold text-slate-700 mb-2">No Faculty Found</h3>
            <p className="text-slate-400 text-sm font-medium mb-6">
              {search || deptFilter !== 'all' || pageFilter !== 'all'
                ? 'Try adjusting your search or filters.'
                : 'Get started by adding your first faculty member.'}
            </p>
            {!search && deptFilter === 'all' && pageFilter === 'all' && (
              <Link
                to="/admin/pages/faculty/create"
                className="inline-flex items-center gap-2 bg-[#1e293b] hover:bg-[#0f172a] text-white font-bold px-6 py-3 rounded-full text-sm transition-all shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                Add First Faculty
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] bg-slate-50/30">
                  <th className="text-left px-8 py-5">Faculty Member</th>
                  <th className="text-left px-8 py-5">Department</th>
                  <th className="text-left px-8 py-5">Page</th>
                  <th className="text-left px-8 py-5">Experience</th>
                  <th className="text-left px-8 py-5">Status</th>
                  <th className="text-right px-8 py-5 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="group hover:bg-slate-50/50 transition-all duration-300 border-b border-slate-50 last:border-0">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-black shadow-inner group-hover:scale-110 transition-transform">
                          {item.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-slate-900 font-extrabold text-base leading-tight group-hover:text-[#1e293b] transition-colors">{item.name}</span>
                          <span className="text-slate-400 text-xs font-semibold">{item.email}</span>
                          <a
                            href={`/faculty/${item.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-600 hover:underline text-[10px] font-bold flex items-center gap-1 w-fit mt-1 group/profile"
                          >
                            <span>View Public Profile</span>
                            <svg className="w-2.5 h-2.5 opacity-0 group-hover/profile:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="inline-flex px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border bg-blue-50 text-blue-600 border-blue-100">
                        {item.department}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-slate-500 font-bold whitespace-nowrap">{item.page}</td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-slate-700 font-bold">{item.teachingExperience} yrs teaching</span>
                        <span className="text-slate-400 text-[10px] font-bold mt-0.5">{item.industryExperience} yrs industry</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-colors ${item.is_active ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                        {item.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-3 min-w-[150px]">
                        <button
                          onClick={() => handleToggleVisibility(item)}
                          disabled={togglingId === item.id}
                          className={`px-4 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider border transition-all whitespace-nowrap disabled:opacity-50 ${item.is_active ? 'text-orange-500 border-orange-200 hover:bg-orange-50' : 'text-emerald-500 border-emerald-200 hover:bg-emerald-50'}`}
                        >
                          {togglingId === item.id ? '...' : item.is_active ? 'Deactivate' : 'Reactivate'}
                        </button>
                        <Link
                          to={`/admin/pages/faculty/${item.id}/edit`}
                          className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all"
                          title="Edit"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        </Link>
                        <button
                          onClick={() => handleDelete(item)}
                          disabled={deletingId === item.id}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all disabled:opacity-40"
                          title="Delete"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Table Footer */}
        {!loading && filteredItems.length > 0 && (
          <div className="bg-slate-50/30 px-8 py-6 flex items-center justify-between">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
              Showing {filteredItems.length} of {items.length} faculty members
            </p>
          </div>
        )}
      </div>

      {/* Inline CSS for toast animation */}
      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default FacultyList;
