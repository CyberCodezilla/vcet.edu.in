import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { newsTickerApi } from '../../api/newsTicker';
import type { NewsTicker } from '../../types';

const NewsTickerList: React.FC = () => {
  const [items, setItems] = useState<NewsTicker[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchItems = () => {
    setLoading(true);
    newsTickerApi.list()
      .then((r) => setItems(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchItems(); }, []);

  const handleDelete = async (item: NewsTicker) => {
    if (!window.confirm(`Delete ticker: "${item.text.substring(0, 60)}…"?`)) return;
    setDeletingId(item.id);
    try {
      await newsTickerApi.delete(item.id);
      setItems((prev) => prev.filter((i) => i.id !== item.id));
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Delete failed');
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleStatus = async (item: NewsTicker) => {
    const newStatus = !item.is_active;
    try {
      setItems(prev => prev.map(i => i.id === item.id ? { ...i, is_active: newStatus } : i));
      await newsTickerApi.update(item.id, { is_active: newStatus });
    } catch (e) {
      setItems(prev => prev.map(i => i.id === item.id ? { ...i, is_active: !newStatus } : i));
      alert('Failed to update status');
    }
  };

  const filteredItems = items.filter(item => 
    item.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.link && item.link.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-10 pb-12">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-widest">
            <Link to="/admin" className="hover:text-slate-600 transition-colors">Dashboard</Link>
            <span className="text-slate-300 font-normal">/</span>
            <span className="text-slate-600">News Ticker</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#111827]">News Ticker</h1>
        </div>
        <Link 
          to="/admin/news-ticker/new" 
          className="bg-[#1e293b] hover:bg-[#0f172a] text-white font-bold px-6 py-3 rounded-full text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          Add Item
        </Link>
      </div>

      {/* Search & Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            placeholder="Search news ticker..."
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

      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 border-4 border-slate-100 border-t-[#1e293b] rounded-full animate-spin" />
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Loading Items...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-24 text-slate-400 text-sm font-bold uppercase tracking-widest">No ticker items found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] bg-slate-50/30">
                  <th className="text-left px-8 py-5">Ticker Message</th>
                  <th className="text-left px-8 py-5">Internal Link</th>
                  <th className="text-center px-8 py-5">Sort Order</th>
                  <th className="text-right px-8 py-5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="group hover:bg-slate-50/50 transition-all duration-300">
                    <td className="px-8 py-6 max-w-md">
                      <div className="flex flex-col">
                        <span className="text-slate-900 font-extrabold text-sm leading-relaxed group-hover:text-[#1e293b] transition-colors">{item.text}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      {item.link ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1e293b] bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200/50 truncate max-w-[150px]">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                          {item.link}
                        </span>
                      ) : (
                        <span className="text-slate-300 text-xs italic font-semibold">—</span>
                      )}
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 text-slate-600 font-bold text-xs border border-slate-100 ring-2 ring-white shadow-sm">
                        {item.sort_order}
                      </span>
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
                        <Link to={`/admin/news-ticker/${item.id}/edit`} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all" title="Edit">
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
      </div>
    </div>
  );
};

export default NewsTickerList;
