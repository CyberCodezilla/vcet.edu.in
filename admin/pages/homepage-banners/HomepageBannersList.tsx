import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { homepageBannersApi } from '../../api/homepageBanners';
import type { HomepageBanner } from '../../types';

const MAX_TOTAL_BANNERS = 20;

const HomepageBannersList: React.FC = () => {
  const [items, setItems] = useState<HomepageBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const load = () => {
    setLoading(true);
    homepageBannersApi
      .list()
      .then((r) => {
        const ordered = [...(r.data ?? [])].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
        setItems(ordered);
      })
      .catch((e) => {
        alert(e instanceof Error ? e.message : 'Failed to load banners');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return items;
    return items.filter((item) => {
      return item.title.toLowerCase().includes(term) || item.description.toLowerCase().includes(term);
    });
  }, [items, searchTerm]);

  const isAtBannerLimit = items.length >= MAX_TOTAL_BANNERS;

  const handleDelete = async (item: HomepageBanner) => {
    if (item.is_fixed) {
      alert('This is a default homepage banner and cannot be deleted. You can edit it.');
      return;
    }
    if (!confirm('Delete this banner?')) return;

    setDeletingId(item.id);
    try {
      await homepageBannersApi.delete(item.id);
      setItems((prev) => prev.filter((entry) => entry.id !== item.id));
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Delete failed');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-10 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-widest">
            <Link to="/admin" className="hover:text-slate-600 transition-colors">Dashboard</Link>
            <span className="text-slate-300 font-normal">/</span>
            <span className="text-slate-600">Homepage Banners</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#111827]">Homepage Banners</h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage the two default package banners plus any extra banners for the homepage modal.
          </p>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            Total images: {items.length}/{MAX_TOTAL_BANNERS}
          </p>
        </div>
        {isAtBannerLimit ? (
          <button
            type="button"
            disabled
            className="bg-slate-400 text-white font-bold px-6 py-3 rounded-full text-sm shadow-lg cursor-not-allowed flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            Add Banner
          </button>
        ) : (
          <Link
            to="/admin/homepage-banners/new"
            className="bg-[#1e293b] hover:bg-[#0f172a] text-white font-bold px-6 py-3 rounded-full text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            Add Banner
          </Link>
        )}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/70">
          <input id="homepagebannerslist-1" name="homepagebannerslist-1" aria-label="homepagebannerslist field"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by description..."
            className="w-full sm:max-w-sm bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1e293b]"
          />
        </div>

        {loading ? (
          <div className="py-20 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-slate-100 border-t-[#1e293b] rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-slate-500">No banners found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50/30 border-b border-slate-100 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                <tr>
                  <th className="text-left px-6 py-4">Banner</th>
                  <th className="text-left px-6 py-4">Description</th>
                  <th className="text-center px-6 py-4">Order</th>
                  <th className="text-center px-6 py-4">Type</th>
                  <th className="text-right px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4">
                      <div className="w-44 h-24 rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                        {item.image_url ? (
                          <img src={item.image_url} alt={item.title || 'Banner'} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-semibold">No image</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-xl">
                      <p className="font-semibold text-slate-800">{item.title}</p>
                      <p className="text-slate-500 mt-1 line-clamp-2">{item.description}</p>
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-slate-700">{item.sort_order}</td>
                    <td className="px-6 py-4 text-center">
                      {item.is_fixed ? (
                        <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100 uppercase tracking-wide">Default</span>
                      ) : (
                        <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase tracking-wide">Extra</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end items-center gap-2">
                        <Link
                          to={`/admin/homepage-banners/${item.id}/edit`}
                          className="px-3 py-2 text-xs font-bold rounded-lg border border-slate-200 hover:bg-slate-50"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(item)}
                          disabled={deletingId === item.id || item.is_fixed}
                          className="px-3 py-2 text-xs font-bold rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Delete
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

export default HomepageBannersList;
