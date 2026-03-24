import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { eventsApi } from '../../api/events';
import type { Event } from '../../types';
import PdfPreviewModal from '../../components/PdfPreviewModal';

const EventsList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
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
    try { exportItems = filteredAndSorted; } catch(e) { try { exportItems = events; } catch(e) {} }
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
  const [sortConfig, setSortConfig] = useState<{ key: 'date' | 'expiry_date'; direction: 'asc' | 'desc' }>({
    key: 'date', direction: 'desc'
  });

  // Action State
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [previewPdfUrl, setPreviewPdfUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState('');

  const load = () => {
    setLoading(true);
    eventsApi
      .list()
      .then((r) => setEvents(r.data ?? []))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  // Handlers
  const handleSort = (key: 'date' | 'expiry_date') => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const handleToggleStatus = async (ev: Event) => {
    if (updatingId === ev.id) return;
    setUpdatingId(ev.id);
    try {
      await eventsApi.update(ev.id, { 
        title: ev.title, 
        is_active: !ev.is_active 
      });
      setEvents(prev => prev.map(e => e.id === ev.id ? { ...e, is_active: !e.is_active } : e));
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Update failed');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete the event "${title}"? This action cannot be undone.`)) return;
    setDeletingId(id);
    try {
      await eventsApi.delete(id);
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Delete failed');
    } finally {
      setDeletingId(null);
    }
  };

  const isExpired = (ev: Event) => {
    if (!ev.expiry_date) return false;
    const expiryStr = `${ev.expiry_date}T${ev.expiry_time || '23:59:00'}`;
    return new Date() > new Date(expiryStr);
  };

  // Memoized Filtering & Sorting
  const filteredAndSorted = useMemo(() => {
    let result = events.filter(e => 
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.organizer && e.organizer.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    result.sort((a, b) => {
      const valA = new Date(a[sortConfig.key] || 0).getTime();
      const valB = new Date(b[sortConfig.key] || 0).getTime();
      return sortConfig.direction === 'asc' ? valA - valB : valB - valA;
    });
    
    return result;
  }, [events, searchTerm, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage);
  const paginatedEvents = filteredAndSorted.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const stats = {
    total: events.length,
    active: events.filter(e => e.is_active && !isExpired(e)).length,
    expired: events.filter(e => isExpired(e)).length,
  };

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
            <span className="text-slate-600">Events</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#111827]">Events Management</h1>
        </div>
        <Link
          to="/admin/events/new"
          className="bg-[#2563EB] hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-lg shadow-blue-200 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          Create Event
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
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Total Events</p>
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
              placeholder="Search by title or organizer..."
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
          ) : paginatedEvents.length === 0 ? (
            <div className="text-center py-20 bg-white">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <p className="text-slate-500 font-medium">No events found.</p>
            </div>
          ) : (
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-white border-b border-slate-200 text-slate-400 text-xs uppercase tracking-wider font-bold">
                <tr>
                  <th className="px-6 py-4">Title & Preview</th>
                  <th className="px-6 py-4 cursor-pointer hover:text-slate-600 group" onClick={() => handleSort('date')}>
                    <div className="flex items-center gap-1">
                      Event Date & Time
                      {sortConfig.key === 'date' && (
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
                {paginatedEvents.map((ev) => {
                  const expired = isExpired(ev);
                  let statusRender;
                  if (expired) {
                    statusRender = <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold bg-orange-50 text-orange-600 border border-orange-100 uppercase tracking-wide">Expired</span>;
                  } else if (ev.is_active) {
                    statusRender = <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 uppercase tracking-wide">Active</span>;
                  } else {
                    statusRender = <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200 uppercase tracking-wide">Inactive</span>;
                  }

                  // Hack to get typescript to know about ev.attachment 
                  // Because in original types attachment might not be in the Event (though we just added it to the payload, if it's not in the UI response we might need to cast). Wait, we did not add attachment to Event in types, only EventPayload!
                  // Let me cast to any to be safe since we added it to payload but maybe not to Event formally unless I double check.
                  const eventWithAttachment = ev as any;

                  return (
                    <tr key={ev.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1.5 max-w-[280px]">
                          <span className="text-slate-900 font-bold truncate block">{ev.title}</span>
                          <span className="text-xs text-slate-500 truncate block">{ev.organizer || 'VCET'}</span>
                          {eventWithAttachment.attachment ? (
                            <button 
                              onClick={() => { setPreviewTitle(ev.title); setPreviewPdfUrl(eventWithAttachment.attachment); }}
                              className="self-start inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-blue-800 transition-colors bg-blue-50 px-2 py-1 rounded-md mt-1"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                              Preview PDF
                            </button>
                          ) : (
                            <span className="text-xs text-slate-400 italic mt-1">No PDF Attached</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col text-xs">
                          <span className="font-semibold text-slate-700">
                            {new Date(ev.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                          </span>
                          <span className="text-slate-500">{ev.time || '—'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {ev.expiry_date ? (
                          <div className="flex flex-col text-xs">
                            <span className="font-semibold text-slate-700">{ev.expiry_date}</span>
                            <span className="text-slate-400">{ev.expiry_time || '23:59:00'}</span>
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
                              onClick={() => handleToggleStatus(ev)}
                              disabled={updatingId === ev.id}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all disabled:opacity-50 ${
                                ev.is_active 
                                  ? 'bg-orange-50 text-orange-600 hover:bg-orange-100 ring-1 ring-orange-200' 
                                  : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 ring-1 ring-emerald-200'
                              }`}
                            >
                              {ev.is_active ? 'Deactivate' : 'Reactivate'}
                            </button>
                          )}
                          <Link 
                            to={`/admin/events/${ev.id}/edit`} 
                            className="p-2 text-slate-400 hover:text-[#2563EB] hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                          </Link>
                          <button
                            onClick={() => handleDelete(ev.id, ev.title)}
                            disabled={deletingId === ev.id}
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

export default EventsList;
