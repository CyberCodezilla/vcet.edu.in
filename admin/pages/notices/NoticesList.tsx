import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { noticesApi } from '../../api/notices';
import type { Notice } from '../../types';
import PdfPreviewModal from '../../components/PdfPreviewModal';

function isNoticeExpired(notice: Notice, now: number): boolean {
  if (!notice.deactivates_at) return false;

  const deactivatesAt = new Date(notice.deactivates_at);
  if (Number.isNaN(deactivatesAt.getTime())) return false;

  return deactivatesAt.getTime() <= now;
}

function isNoticeVisible(notice: Notice, now: number): boolean {
  return notice.is_active && !isNoticeExpired(notice, now);
}

const NoticesList: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // UI State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const toggleFilter = () => {
    setStatusFilter(prev => prev === 'all' ? 'active' : prev === 'active' ? 'inactive' : 'all');
  };

  const handleExport = () => {
    let exportItems = [];
    try { exportItems = filteredAndSorted; } catch(e) { try { exportItems = notices; } catch(e) {} }
    if (!exportItems || exportItems.length === 0) {
      alert('No data to export');
      return;
    }
    const headers = Object.keys(exportItems[0]);
    const csvData = exportItems.map(item => 
      headers.map(h => `"${String((item)[h] ?? '').replace(/"/g, '""')}"`).join(',')
    );
    csvData.unshift(headers.join(','));
    const blob = new Blob([csvData.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'export.csv';
    a.click();
    URL.revokeObjectURL(url);
  };
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const [sortConfig, setSortConfig] = useState<{ key: 'created_at' | 'expiry_date'; direction: 'asc' | 'desc' }>({
    key: 'created_at', direction: 'desc'
  });

  // Action State
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [previewPdfUrl, setPreviewPdfUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState('');

  const load = () => {
    setLoading(true);
    setError('');
    noticesApi
      .list()
      .then((r) => setNotices((r.data ?? []).filter((notice) => !notice.deleted_at)))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  // Handlers
  const handleSort = (key: 'created_at' | 'expiry_date') => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const handleToggleStatus = async (notice: Notice) => {
    if (updatingId === notice.id) return;
    setUpdatingId(notice.id);
    try {
      // payload sends the toggle
      await noticesApi.update(notice.id, { 
        title: notice.title,
        body: notice.body, 
        is_active: !notice.is_active 
      });
      setNotices(prev => prev.map(n => n.id === notice.id ? { ...n, is_active: !n.is_active } : n));
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Update failed');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete the notice "${title}"? This action cannot be undone.`)) return;
    setDeletingId(id);
    try {
      await noticesApi.delete(id);
      setNotices((prev) => prev.filter((n) => n.id !== id));
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Delete failed');
    } finally {
      setDeletingId(null);
    }
  };

  const isExpired = (n: Notice) => {
    if (!n.expiry_date) return false;
    const expiryStr = `${n.expiry_date}T${n.expiry_time || '23:59:00'}`;
    return new Date() > new Date(expiryStr);
  };

  // Memoized Filtering & Sorting
  const filteredAndSorted = useMemo(() => {
    let result = notices.filter(n => n.title.toLowerCase().includes(searchTerm.toLowerCase()));
    
    result.sort((a, b) => {
      const valA = new Date(a[sortConfig.key] || 0).getTime();
      const valB = new Date(b[sortConfig.key] || 0).getTime();
      return sortConfig.direction === 'asc' ? valA - valB : valB - valA;
    });
    
    return result;
  }, [notices, searchTerm, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage);
  const paginatedNotices = filteredAndSorted.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const stats = {
    total: notices.length,
    active: notices.filter(n => n.is_active && !isExpired(n)).length,
    expired: notices.filter(n => isExpired(n)).length,
  };

  const getTypeLabel = (type: string) =>
    type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div className="space-y-10 pb-12">
      <PdfPreviewModal 
        isOpen={!!previewPdfUrl} 
        onClose={() => setPreviewPdfUrl(null)} 
        pdfUrl={previewPdfUrl} 
        title={previewTitle} 
      />

      {/* Header */}
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
          className="bg-[#2563EB] hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-lg shadow-blue-200 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          Upload Notice
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-2xl px-5 py-4 text-sm text-red-600 font-medium flex items-center gap-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          {error}
        </div>
      )}

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Total Notices</p>
            <h3 className="text-3xl font-extrabold text-[#111827] mt-0.5">{stats.total}</h3>
          </div>
        </div>
        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Active & Live</p>
            <h3 className="text-3xl font-extrabold text-[#111827] mt-0.5">{stats.active}</h3>
          </div>
        </div>
        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Expired</p>
            <h3 className="text-3xl font-extrabold text-[#111827] mt-0.5">{stats.expired}</h3>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50/50">
          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#2563EB] outline-none transition-all shadow-sm"
            />
            <svg className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <div className="text-xs font-semibold text-slate-500">
            Showing {filteredAndSorted.length} result(s)
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20 bg-white">
              <div className="w-8 h-8 border-3 border-slate-100 border-t-[#2563EB] rounded-full animate-spin" />
            </div>
          ) : paginatedNotices.length === 0 ? (
            <div className="text-center py-20 bg-white">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <p className="text-slate-500 font-medium">No notices found.</p>
            </div>
          ) : (
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-white border-b border-slate-200 text-slate-400 text-xs uppercase tracking-wider font-bold">
                <tr>
                  <th className="px-6 py-4">Title & Preview</th>
                  <th className="px-6 py-4 cursor-pointer hover:text-slate-600 group" onClick={() => handleSort('created_at')}>
                    <div className="flex items-center gap-1">
                      Upload Date
                      {sortConfig.key === 'created_at' && (
                        <svg className={`w-3 h-3 transition-transform ${sortConfig.direction === 'desc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7" /></svg>
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-4 cursor-pointer hover:text-slate-600 group" onClick={() => handleSort('expiry_date')}>
                    <div className="flex items-center gap-1">
                      Expiry Date & Time
                      {sortConfig.key === 'expiry_date' && (
                        <svg className={`w-3 h-3 transition-transform ${sortConfig.direction === 'desc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7" /></svg>
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {paginatedNotices.map((n) => {
                  const expired = isExpired(n);
                  const noticePdfUrl = (() => {
                    const candidate = n.admin_pdf_url ?? n.pdf_url;
                    return candidate && candidate.trim() ? candidate : null;
                  })();
                  let statusRender;
                  if (expired) {
                    statusRender = <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold bg-orange-50 text-orange-600 border border-orange-100 uppercase tracking-wide">Expired</span>;
                  } else if (n.is_active) {
                    statusRender = <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 uppercase tracking-wide">Active</span>;
                  } else {
                    statusRender = <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200 uppercase tracking-wide">Inactive</span>;
                  }

                  return (
                    <tr key={n.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1.5 max-w-[280px]">
                          <span className="text-slate-900 font-bold truncate block">{n.title}</span>
                          {noticePdfUrl ? (
                            <button 
                              onClick={() => { setPreviewTitle(n.title); setPreviewPdfUrl(noticePdfUrl); }}
                              className="self-start inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-blue-800 transition-colors bg-blue-50 px-2 py-1 rounded-md"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                              Preview PDF
                            </button>
                          ) : (
                            <span className="text-xs text-slate-400 italic">No PDF Attached</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-medium text-xs">
                        {new Date(n.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>
                      <td className="px-6 py-4">
                        {n.expiry_date ? (
                          <div className="flex flex-col text-xs">
                            <span className="font-semibold text-slate-700">{n.expiry_date}</span>
                            <span className="text-slate-400">{n.expiry_time || '23:59:00'}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 italic">No Expiry</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {statusRender}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {!expired && (
                            <button
                              onClick={() => handleToggleStatus(n)}
                              disabled={updatingId === n.id}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all disabled:opacity-50 ${
                                n.is_active 
                                  ? 'bg-orange-50 text-orange-600 hover:bg-orange-100 ring-1 ring-orange-200' 
                                  : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 ring-1 ring-emerald-200'
                              }`}
                            >
                              {n.is_active ? 'Deactivate' : 'Reactivate'}
                            </button>
                          )}
                          <Link 
                            to={`/admin/notices/${n.id}/edit`} 
                            className="p-2 text-slate-400 hover:text-[#2563EB] hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                          </Link>
                          <button
                            onClick={() => handleDelete(n.id, n.title)}
                            disabled={deletingId === n.id}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30"
                            title="Delete"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {!loading && filteredAndSorted.length > itemsPerPage && (
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
            <p className="text-xs text-slate-500 font-medium">
              Page <span className="font-bold text-slate-900">{page}</span> of <span className="font-bold text-slate-900">{totalPages}</span>
            </p>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-200 disabled:opacity-30 transition-colors"
              >
                Prev
              </button>
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-200 disabled:opacity-30 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticesList;
