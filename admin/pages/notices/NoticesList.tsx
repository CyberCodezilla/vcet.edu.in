import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { noticesApi } from '../../api/notices';
import type { Notice } from '../../types';

const NoticesList: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [viewedIds, setViewedIds] = useState<Set<number>>(new Set());

  const load = () => {
    setLoading(true);
    noticesApi
      .list()
      .then((r) => setNotices(r.data ?? []))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleView = (id: number) => {
    setViewedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Delete notice "${title}"?`)) return;
    setDeleting(id);
    try {
      await noticesApi.delete(id);
      setNotices((prev) => prev.filter((n) => n.id !== id));
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Delete failed');
    } finally {
      setDeleting(null);
    }
  };

  const filteredNotices = notices.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (n.category && n.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const stats = {
    total: notices.length,
    published: notices.filter(n => n.is_active).length,
    drafts: notices.filter(n => !n.is_active).length
  };

  const getCategoryStyles = (category: string | null) => {
    switch (category?.toLowerCase()) {
      case 'academic': return 'bg-blue-50 text-blue-600';
      case 'cultural': return 'bg-purple-50 text-purple-600';
      case 'placement': return 'bg-orange-50 text-orange-600';
      default: return 'bg-slate-50 text-slate-600';
    }
  };

  return (
    <div className="space-y-10 pb-12">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-widest">
            <Link to="/admin" className="hover:text-slate-600 transition-colors">Dashboard</Link>
            <span className="text-slate-300 font-normal">/</span>
            <span className="text-slate-600">Notices</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#111827]">Notices Management</h1>
        </div>
        <Link
          to="/admin/notices/new"
          className="bg-[#1e293b] hover:bg-[#334155] text-white font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-lg shadow-slate-200 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add New Notice
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-2xl px-5 py-4 text-sm text-red-600 font-medium flex items-center gap-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          {error}
        </div>
      )}

      {/* Search & Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            placeholder="Search notices by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-2xl px-12 py-4 text-sm transition-all shadow-sm outline-none"
          />
          <svg className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white ring-1 ring-slate-200 px-6 py-4 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4.5h18m-18 5h18m-18 5h18m-18 5h18" /></svg>
            Filter
          </button>
          <button className="flex items-center gap-2 bg-white ring-1 ring-slate-200 px-6 py-4 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Export
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white border border-slate-200/60 rounded-[2rem] shadow-xl shadow-slate-200/40 overflow-hidden">
        {/* Table Section */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="w-8 h-8 border-3 border-slate-100 border-t-[#1e293b] rounded-full animate-spin" />
            </div>
          ) : filteredNotices.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <p className="text-slate-400 font-bold">No notices found.</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-50/50">
                <tr className="border-b border-slate-100 text-slate-400 text-[11px] uppercase tracking-[0.1em] font-bold">
                  <th className="text-left px-8 py-5">Notice Title</th>
                  <th className="text-left px-6 py-5">Category</th>
                  <th className="text-left px-6 py-5">Published Date</th>
                  <th className="text-left px-6 py-5">Status</th>
                  <th className="text-right px-8 py-5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredNotices.map((n) => (
                  <tr key={n.id} className="hover:bg-slate-50/30 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex flex-col gap-1">
                        <span className="text-[#111827] font-bold text-sm leading-tight group-hover:text-slate-900 transition-colors">
                          {n.title}
                        </span>
                        <span className="text-slate-400 text-[11px] font-medium tracking-wide">
                          Notice ID: #NOT-{n.id}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase ${getCategoryStyles(n.category)}`}>
                        {n.category || 'General'}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-slate-500 font-medium">
                      {n.is_active ? new Date(n.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : '—'}
                    </td>
                    <td className="px-6 py-5">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase ${n.is_active ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${n.is_active ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                        {n.is_active ? 'Published' : 'Draft'}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-4">
                        <button 
                          onClick={() => handleView(n.id)}
                          className={`transition-colors ${viewedIds.has(n.id) ? 'text-red-400 hover:text-red-600' : 'text-slate-400 hover:text-slate-700'}`}
                          title={viewedIds.has(n.id) ? "Mark as Unviewed" : "View"}
                        >
                          {viewedIds.has(n.id) ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                        <Link to={`/admin/notices/${n.id}/edit`} className="text-slate-400 hover:text-[#1e293b] transition-colors" title="Edit">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </Link>
                        <button 
                          onClick={() => handleDelete(n.id, n.title)}
                          disabled={deleting === n.id}
                          className="text-slate-400 hover:text-red-600 transition-colors disabled:opacity-30" 
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
          )}
        </div>

        {/* Footer controls */}
        {!loading && filteredNotices.length > 0 && (
          <div className="px-8 py-5 border-t border-slate-100 flex items-center justify-between bg-slate-50/20">
            <p className="text-xs text-slate-400 font-bold">
              Showing <span className="text-slate-600 font-extrabold">{filteredNotices.length}</span> of <span className="text-slate-600 font-extrabold">{notices.length}</span> entries
            </p>
            <div className="flex items-center gap-1.5">
              <button disabled className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-400 transition-all">Previous</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1e293b] text-white text-xs font-bold shadow-lg shadow-slate-200">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 text-xs font-bold transition-all">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 text-xs font-bold transition-all">3</button>
              <button className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all">Next</button>
            </div>
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-xl shadow-slate-200/30 flex items-center gap-5">
          <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center">
            <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Total Notices</p>
            <h3 className="text-3xl font-extrabold text-[#111827] mt-0.5">{stats.total}</h3>
          </div>
        </div>

        <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-xl shadow-slate-200/30 flex items-center gap-5">
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center">
            <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Published</p>
            <h3 className="text-3xl font-extrabold text-[#111827] mt-0.5">{stats.published}</h3>
          </div>
        </div>

        <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-xl shadow-slate-200/30 flex items-center gap-5">
          <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center">
            <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Drafts</p>
            <h3 className="text-3xl font-extrabold text-[#111827] mt-0.5">{stats.drafts}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticesList;
