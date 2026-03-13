import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { eventsApi } from '../../api/events';
import type { Event } from '../../types';

const EventsList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const load = () => {
    setLoading(true);
    eventsApi
      .list()
      .then((r) => setEvents(r.data ?? []))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Delete event "${title}"?`)) return;
    setDeleting(id);
    try {
      await eventsApi.delete(id);
      setEvents((prev) => prev.filter((ev) => ev.id !== id));
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Delete failed');
    } finally {
      setDeleting(null);
    }
  };

  const handleToggleStatus = async (ev: Event) => {
    const newStatus = !ev.is_active;
    try {
      // Optimitic update
      setEvents(prev => prev.map(e => e.id === ev.id ? { ...e, is_active: newStatus } : e));
      await eventsApi.update(ev.id, { is_active: newStatus });
    } catch (e) {
      // Revert on error
      setEvents(prev => prev.map(e => e.id === ev.id ? { ...e, is_active: !newStatus } : e));
      alert('Failed to update status');
    }
  };

  const filteredEvents = events.filter(ev => 
    ev.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ev.organizer?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusStyles = (status: string | null) => {
    switch (status) {
      case 'Upcoming': return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'Completed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Cancelled': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  const getStatusDot = (status: string | null) => {
    switch (status) {
      case 'Upcoming': return 'bg-orange-500';
      case 'Completed': return 'bg-emerald-500';
      case 'Cancelled': return 'bg-red-500';
      default: return 'bg-slate-400';
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
            <span className="text-slate-600">Events</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#111827]">Events Management</h1>
        </div>
        <Link
          to="/admin/events/new"
          className="bg-[#1e293b] hover:bg-[#0f172a] text-white font-bold px-6 py-3 rounded-full text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Create New Event
        </Link>
      </div>

      {/* Search & Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            placeholder="Search events by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-2xl px-12 py-4 text-sm transition-all shadow-sm outline-none"
          />
          <svg className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white ring-1 ring-slate-200 px-6 py-4 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4.5h18m-18 5h18m-18 5h18m-18 5h18" /></svg>
            Filter
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white ring-1 ring-slate-200 px-6 py-4 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Export
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-2xl px-6 py-4 text-sm text-red-600 flex items-center gap-3">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
          {error}
        </div>
      )}

      {/* Table Section */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 border-4 border-slate-100 border-t-[#1e293b] rounded-full animate-spin" />
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Loading Events...</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-slate-300 italic text-2xl">?</div>
            <p className="text-slate-500 font-bold">No events found matching your criteria</p>
            <p className="text-slate-400 text-sm mt-1 mb-6">Try adjusting your search terms</p>
            <button onClick={() => setSearchTerm('')} className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold px-6 py-2 rounded-full text-xs transition-colors">Clear Search</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] bg-slate-50/30">
                  <th className="text-left px-8 py-5">Event Name</th>
                  <th className="text-left px-8 py-5">Date & Time</th>
                  <th className="text-left px-8 py-5">Venue</th>
                  <th className="text-left px-8 py-5">Type</th>
                  <th className="text-right px-8 py-5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredEvents.map((ev) => (
                  <tr key={ev.id} className="group hover:bg-slate-50/50 transition-all duration-300">
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1">
                        <span className="text-slate-900 font-extrabold text-base leading-tight group-hover:text-[#1e293b] transition-colors">{ev.title}</span>
                        <span className="text-slate-400 text-xs font-semibold">{ev.organizer || 'Organized by VCET'}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-slate-700 font-bold">{new Date(ev.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          <span className="text-slate-400 text-[11px] font-bold">{ev.time || '10:00 AM - 04:00 PM'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-slate-500 font-bold">
                      {ev.venue || 'Main Campus'}
                    </td>
                    <td className="px-8 py-6">
                      <span className="inline-flex px-3 py-1 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider border border-blue-100">
                        {ev.category || 'Event'}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-4">
                        <button 
                          onClick={() => handleToggleStatus(ev)}
                          className={`transition-colors ${ev.is_active ? 'text-slate-400 hover:text-slate-700' : 'text-red-400 hover:text-red-600'}`}
                          title={ev.is_active ? "Hide from Website" : "Show on Website"}
                        >
                          {ev.is_active ? (
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
                        <Link to={`/admin/events/${ev.id}/edit`} className="text-slate-400 hover:text-[#1e293b] transition-colors" title="Edit">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </Link>
                        <button 
                          onClick={() => handleDelete(ev.id, ev.title)}
                          disabled={deleting === ev.id}
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
          </div>
        )}

        {/* Footer Section */}
        {!loading && filteredEvents.length > 0 && (
          <div className="bg-slate-50/50 px-8 py-5 border-t border-slate-100 flex items-center justify-between">
            <p className="text-slate-400 text-xs font-bold">
              Showing <span className="text-slate-700">{filteredEvents.length}</span> of <span className="text-slate-700">{events.length}</span> entries
            </p>
            <div className="flex items-center gap-2">
              <button disabled className="px-4 py-2 text-xs font-bold text-slate-400 cursor-not-allowed">Previous</button>
              <div className="flex gap-1">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1e293b] text-white text-xs font-bold shadow-md">1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 text-slate-600 text-xs font-bold transition-colors">2</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 text-slate-600 text-xs font-bold transition-colors">3</button>
              </div>
              <button className="px-4 py-2 text-xs font-bold text-[#1e293b] hover:bg-slate-200 rounded-lg transition-colors">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsList;
