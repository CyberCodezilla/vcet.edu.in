import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { placementPartnersApi } from '../../api/placementPartners';
import type { PlacementPartner, PlacementPartnerPayload } from '../../types';

const PlacementPartnersList: React.FC = () => {
  const [items, setItems] = useState<PlacementPartner[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const toggleFilter = () => {
    setStatusFilter(prev => prev === 'all' ? 'active' : prev === 'active' ? 'inactive' : 'all');
  };

  const handleExport = () => {
    let exportItems = [];
    try { exportItems = filteredItems; } catch(e) { try { exportItems = items; } catch(e) {} }
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

  const fetchItems = () => {
    setLoading(true);
    placementPartnersApi.list()
      .then((r) => setItems(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchItems(); }, []);

  const handleToggleStatus = async (item: PlacementPartner) => {
    try {
      const payload: PlacementPartnerPayload = {
        name: item.name,
        is_active: !item.is_active,
        website: item.website ?? '',
        sort_order: item.sort_order
      };
      await placementPartnersApi.update(item.id, payload);
      setItems(items.map(i => i.id === item.id ? { ...i, is_active: !i.is_active } : i));
    } catch (e) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (item: PlacementPartner) => {
    if (!window.confirm(`Remove recruiter "${item.name}"?`)) return;
    setDeletingId(item.id);
    try { await placementPartnersApi.delete(item.id); fetchItems(); }
    catch (e) { alert(e instanceof Error ? e.message : 'Delete failed'); setDeletingId(null); }
  };

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter((item: any) => {
    if (statusFilter === 'all') return true;
    const isActive = item.is_active !== undefined ? item.is_active : true;
    if (statusFilter === 'active' && !isActive) return false;
    if (statusFilter === 'inactive' && isActive) return false;
    return true;
  });

  return (
    <div className="space-y-10 pb-12">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            <Link to="/admin" className="hover:text-[#1e293b] transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-slate-900">Partners</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Our <span className="text-[#1e293b]">Hiring Partners</span>
          </h1>
        </div>
        <Link 
          to="/admin/placement-partners/new" 
          className="flex items-center gap-2 bg-[#1e293b] hover:bg-[#334155] text-white font-bold px-6 py-4 rounded-2xl text-xs transition-all shadow-lg shadow-slate-200 hover:-translate-y-0.5"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3}><path d="M12 5v14M5 12h14" strokeLinecap="round"/></svg>
          Add Partner
        </Link>
      </div>

      {/* Search & Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <input id="placementpartnerslist-1" name="placementpartnerslist-1" aria-label="placementpartnerslist field"
            type="text"
            placeholder="Search partners by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-2xl px-12 py-4 text-sm transition-all shadow-sm outline-none"
          />
          <svg className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
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

      {/* Main Container */}
      <div className="bg-white border border-slate-200/60 rounded-4xl shadow-xl shadow-slate-200/40 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-10 h-10 border-4 border-slate-100 border-t-[#1e293b] rounded-full animate-spin" />
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            </div>
            <p className="text-slate-900 font-bold">No partners found</p>
            <p className="text-slate-400 text-sm mt-1">Try scheduling a new recruitment partner.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="text-left px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Partner Logo</th>
                  <th className="text-left px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Company Name</th>
                  <th className="text-left px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Website</th>
                  <th className="text-center px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Order</th>
                  <th className="text-right px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="group hover:bg-slate-50/50 transition-all duration-300">
                    <td className="px-8 py-6">
                      <div className="w-20 h-12 rounded-xl bg-slate-100 overflow-hidden flex items-center justify-center shadow-inner border border-slate-200/60 p-1.5 group-hover:bg-white transition-colors duration-300">
                        {item.logo
                          ? <img src={item.logo} alt={item.name} className="w-full h-full object-contain" />
                          : <span className="text-slate-300 text-[8px] font-black uppercase tracking-tighter">No Logo</span>}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-bold text-slate-900 group-hover:text-[#1e293b] transition-colors">{item.name}</span>
                    </td>
                    <td className="px-8 py-6">
                      {item.website ? (
                        <a 
                          href={item.website} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-xs font-bold text-blue-600 hover:text-blue-800 underline underline-offset-4 decoration-blue-200 hover:decoration-blue-600 transition-all truncate block max-w-[200px]"
                        >
                          {item.website.replace(/^https?:\/\/(www\.)?/, '')}
                        </a>
                      ) : (
                        <span className="text-slate-300 text-xs italic">—</span>
                      )}
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="inline-flex items-center px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-black">
                        #{item.sort_order}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => handleToggleStatus(item)}
                          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${item.is_active ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-400'}`}
                          title={item.is_active ? 'Hide from website' : 'Show on website'}
                        >
                          {item.is_active ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.046m4.596-4.596A9.964 9.964 0 0112 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3l18 18"/></svg>
                          )}
                        </button>
                        <Link 
                          to={`/admin/placement-partners/${item.id}/edit`} 
                          className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-[#1e293b] hover:text-white transition-all"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                        </Link>
                        <button 
                          onClick={() => handleDelete(item)} 
                          disabled={deletingId === item.id} 
                          className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all disabled:opacity-50"
                        >
                          {deletingId === item.id ? (
                            <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                          )}
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
    </div>
  );
};

export default PlacementPartnersList;
