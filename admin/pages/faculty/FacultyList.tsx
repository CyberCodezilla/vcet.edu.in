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

const DEPARTMENTS = [
  'Computer Engineering',
  'Information Technology',
  'Electronics & Telecommunication Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Artificial Intelligence & Data Science',
  'Computer Science & Data Science',
  'First Year Engineering'
];

const FacultyList: React.FC = () => {
  const [items, setItems] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchItems = () => {
    setLoading(true);
    facultyApi.list()
      .then((r) => setItems(Array.isArray(r.data) ? r.data : []))
      .catch(e => {
        console.error(e);
        setToast({ message: 'Failed to fetch faculty list', type: 'error' });
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchItems(); }, []);

  const handleDelete = async (item: Faculty) => {
    if (!window.confirm(`Delete faculty "${item.basicInfo.fullName}"? This action cannot be undone.`)) return;
    setDeletingId(item.id.toString());
    try {
      await facultyApi.delete(item.id);
      setToast({ message: `${item.basicInfo.fullName} deleted successfully`, type: 'success' });
      fetchItems();
    } catch (e) {
      setToast({ message: e instanceof Error ? e.message : 'Delete failed', type: 'error' });
      setDeletingId(null);
    }
  };

  const filteredItems = items.filter((item) => {
    const searchLower = search.toLowerCase();
    const fullName = item.basicInfo?.fullName || '';
    const departmentStr = item.basicInfo?.department || '';
    
    const matchesSearch = !search ||
      fullName.toLowerCase().includes(searchLower) ||
      departmentStr.toLowerCase().includes(searchLower);
    const matchesDept = deptFilter === 'all' || departmentStr === deptFilter;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-10 pb-12">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-widest">
            <Link to="/admin" className="hover:text-slate-600 transition-colors">Dashboard</Link>
            <span className="text-slate-300 font-normal">/</span>
            <span className="text-slate-600">Faculty Management</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#111827]">Faculty Directory</h1>
        </div>
        <Link
          to="/admin/pages/faculty/create"
          className="w-full sm:w-auto bg-[#1e293b] hover:bg-[#0f172a] text-white font-bold px-8 py-4 rounded-2xl text-xs transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 uppercase tracking-widest"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Add Faculty Member
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-4xl shadow-sm border border-slate-100">
        <div className="relative w-full md:w-96">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path strokeLinecap="round" strokeWidth="2" d="m21 21-4.35-4.35" /></svg>
          <input id="facultylist-1" name="facultylist-1" aria-label="facultylist field"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email or department..."
            className="w-full bg-slate-50 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-2xl pl-11 pr-5 py-3.5 text-sm font-bold transition-all outline-none"
          />
        </div>
        <select id="facultylist-select-1" name="facultylist-select-1" aria-label="facultylist select field"
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="w-full md:w-64 bg-slate-50 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-2xl px-5 py-3.5 text-xs font-bold text-slate-600 transition-all outline-none cursor-pointer"
        >
          <option value="all">All Departments</option>
          {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      {/* Table Interface */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 border-4 border-slate-100 border-t-[#1e293b] rounded-full animate-spin" />
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Loading Faculty...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-24 px-6">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </div>
            <h3 className="text-lg font-extrabold text-slate-700 mb-2">No Faculty Members Found</h3>
            <p className="text-slate-400 text-sm font-medium mb-8">Try adjusting your filters or search terms.</p>
            <Link to="/admin/pages/faculty/create" className="text-[#1e293b] text-xs font-black uppercase tracking-widest border-b-2 border-[#1e293b] pb-1 hover:opacity-70 transition-opacity">Add First Faculty Member</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] bg-slate-50/30">
                  <th className="text-left px-8 py-5">Faculty Member</th>
                  <th className="text-left px-8 py-5">Designation</th>
                  <th className="text-left px-8 py-5">Exp (T/I)</th>
                  <th className="text-left px-8 py-5">Status</th>
                  <th className="text-right px-8 py-5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="group hover:bg-slate-50/50 transition-all duration-300">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border-2 border-white shadow-sm">
                          {item.profileImage?.url ? (
                            <img src={item.profileImage.url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300 font-black text-xs uppercase">
                              {item.basicInfo.fullName.split(' ').map(n => n[0]).join('').substring(0, 2)}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-slate-900 font-extrabold text-base leading-tight truncate">{item.basicInfo?.fullName || 'Unnamed'}</span>
                          <span className="text-slate-400 text-xs font-bold truncate">{item.basicInfo?.email || 'No Email'}</span>
                          <span className="text-[10px] text-blue-500 font-black uppercase tracking-widest mt-1">{item.basicInfo?.department || 'No Department'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-slate-600 font-bold">{item.basicInfo?.designation || 'Faculty'}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-slate-800 font-black">{(item.experience?.teachingYears || 0)}y / {(item.experience?.industryYears || 0)}y</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Teaching / Ind.</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${item.basicInfo.isActive ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                        {item.basicInfo.isActive ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link to={`/admin/pages/faculty/${item.id}/edit`} className="p-2.5 text-slate-400 hover:text-[#1e293b] hover:bg-slate-100 rounded-2xl transition-all" title="Edit Profile">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        </Link>
                        <button onClick={() => handleDelete(item)} disabled={deletingId === item.id?.toString()} className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all disabled:opacity-40" title="Delete record">
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
      </div>

      <style>{`
        @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default FacultyList;
