import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { achievementsApi } from '../../api/achievements';
import type { Achievement } from '../../types';

const AchievementsList: React.FC = () => {
  const [items, setItems] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('All Entries');

  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const fetchItems = () => {
    setLoading(true);
    achievementsApi.list()
      .then((r) => setItems(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchItems(); }, []);

  const handleDelete = async (item: Achievement) => {
    if (!window.confirm(`Delete achievement "${item.title}"?`)) return;
    setDeletingId(item.id);
    try { await achievementsApi.delete(item.id); fetchItems(); }
    catch (e) { alert(e instanceof Error ? e.message : 'Delete failed'); setDeletingId(null); }
  };

  const handleToggleStatus = async (item: Achievement) => {
    const newStatus = !item.is_active;
    try {
      setItems(prev => prev.map(a => a.id === item.id ? { ...a, is_active: newStatus } : a));
      await achievementsApi.update(item.id, { is_active: newStatus });
    } catch (e) {
      setItems(prev => prev.map(a => a.id === item.id ? { ...a, is_active: !newStatus } : a));
      alert('Status update failed');
    }
  };

  const filteredItems = (activeTab === 'All Entries'
    ? items
    : items.filter(item => item.category === activeTab)).filter((item: any) => { 
    if (statusFilter === 'all') return true;
    const isActive = item.is_active !== undefined ? item.is_active : true;      
    if (statusFilter === 'active' && !isActive) return false;
    if (statusFilter === 'inactive' && isActive) return false;
    return true;
  });

  const toggleFilter = () => {
    setStatusFilter(prev => prev === 'all' ? 'active' : prev === 'active' ? 'inactive' : 'all');
  };

  const handleExport = () => {
    if (!filteredItems.length) return;
    
    // Create CSV content
    const headers = Object.keys(filteredItems[0]).join(',');
    const csvContent = filteredItems.map(row => 
      Object.values(row).map(val => `"${String(val).replace(/"/g, '""')}"`).join(',')
    ).join('\n');
    
    // Create and trigger download
    const blob = new Blob([`${headers}\n${csvContent}`], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `achievements_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'VC';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <div className="space-y-10 pb-12">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-widest">
            <Link to="/admin" className="hover:text-slate-600 transition-colors">Dashboard</Link>
            <span className="text-slate-300 font-normal">/</span>
            <span className="text-slate-600">Achievements</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#111827]">Achievements Management</h1>
        </div>
        <Link 
          to="/admin/achievements/new" 
          className="bg-[#1e293b] hover:bg-[#0f172a] text-white font-bold px-6 py-3 rounded-full text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Add Achievement
        </Link>
      </div>

      {/* Stats Cards Section (Above Header but following reference order) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-4xl shadow-sm border border-slate-100 flex items-center gap-5 group hover:shadow-md transition-all">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-0.5">Verified Awards</p>
            <h3 className="text-2xl font-black text-slate-800">124</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-4xl shadow-sm border border-slate-100 flex items-center gap-5 group hover:shadow-md transition-all">
          <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-0.5">Pending Review</p>
            <h3 className="text-2xl font-black text-slate-800">08</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-4xl shadow-sm border border-slate-100 flex items-center gap-5 group hover:shadow-md transition-all">
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
          </div>
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-0.5">This Month</p>
            <h3 className="text-2xl font-black text-slate-800">+12%</h3>
          </div>
        </div>
      </div>

      {/* Search & Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex bg-slate-100/50 p-1.5 rounded-2xl w-full sm:w-auto overflow-x-auto no-scrollbar">
          {['All Entries', 'Sports', 'Academic', 'Research'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${activeTab === tab ? 'bg-white text-[#1e293b] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={toggleFilter} className={`flex items-center gap-2 ring-1 px-6 py-4 rounded-2xl text-xs font-bold transition-all shadow-sm ${statusFilter !== 'all' ? 'bg-[#1e293b] text-white ring-[#1e293b]' : 'bg-white text-slate-600 ring-slate-200 hover:bg-slate-50'}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4.5h18m-18 5h18m-18 5h18m-18 5h18" /></svg>
            Filter: {statusFilter === 'all' ? 'All' : statusFilter === 'active' ? 'Active' : 'Inactive'}
          </button>
          <button onClick={handleExport} className="flex items-center gap-2 bg-white ring-1 ring-slate-200 px-6 py-4 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Export
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 border-4 border-slate-100 border-t-[#1e293b] rounded-full animate-spin" />
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Loading Achievements...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-24 text-slate-400 text-sm font-bold">No achievements found in this category.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] bg-slate-50/30">
                  <th className="text-left px-8 py-5">Achievement Title</th>
                  <th className="text-left px-8 py-5">Participant</th>
                  <th className="text-left px-8 py-5">Date</th>
                  <th className="text-left px-8 py-5">Category</th>
                  <th className="text-left px-8 py-5">Document</th>
                  <th className="text-right px-8 py-5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="group hover:bg-slate-50/50 transition-all duration-300">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl shadow-inner border border-slate-100 group-hover:scale-110 transition-transform">
                          {item.icon || '🏆'}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-slate-900 font-extrabold text-base leading-tight group-hover:text-[#1e293b] transition-colors">{item.title}</span>
                          <span className="text-slate-400 text-xs font-semibold">{item.value}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center text-[10px] font-black text-slate-500 uppercase overflow-hidden">
                          {item.participant_avatar ? (
                            <img src={item.participant_avatar} alt="" className="w-full h-full object-cover" />
                          ) : (
                            getInitials(item.participant_name)
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-slate-700 font-bold leading-none">{item.participant_name || 'Alumnus'}</span>
                          <span className="text-slate-400 text-[10px] font-bold mt-1 uppercase tracking-tighter">{item.participant_role || 'VCETian'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-slate-500 font-bold whitespace-nowrap">
                      {item.date ? new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Jan 01, 2024'}
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${
                        item.category === 'Academic' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                        item.category === 'Sports' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        'bg-purple-50 text-purple-600 border-purple-100'
                      }`}>
                        {item.category || 'Academic'}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <a href={item.document_url || '#'} className="flex items-center gap-2 text-slate-600 hover:text-[#1e293b] transition-colors font-bold">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        <span className="truncate max-w-[100px]">{item.document_name || 'cert.pdf'}</span>
                      </a>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button 
                          onClick={() => handleToggleStatus(item)}
                          className={`p-2 transition-colors rounded-xl ${item.is_active ? 'text-slate-400 hover:text-slate-700 hover:bg-slate-100' : 'text-red-400 hover:text-red-600 hover:bg-red-50'}`}
                          title={item.is_active ? "Hide from Website" : "Show on Website"}
                        >
                          {item.is_active ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                            </svg>
                          )}
                        </button>
                        <Link to={`/admin/achievements/${item.id}/edit`} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all" title="Edit">
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
        {!loading && (
          <div className="bg-slate-50/30 px-8 py-6 flex items-center justify-between">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Page 1 of 12</p>
            <div className="flex items-center gap-2">
              <button disabled className="px-4 py-2 text-xs font-bold text-slate-400 cursor-not-allowed">Previous</button>
              <div className="flex gap-1.5">
                {[1, 2, 3].map(n => (
                  <button key={n} className={`w-9 h-9 flex items-center justify-center rounded-xl text-xs font-bold transition-all ${n === 1 ? 'bg-[#1e293b] text-white shadow-lg' : 'bg-white text-slate-600 ring-1 ring-slate-100 hover:bg-slate-50'}`}>{n}</button>
                ))}
              </div>
              <button className="px-4 py-2 text-xs font-bold text-[#1e293b] hover:bg-slate-100 rounded-xl transition-colors">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementsList;
