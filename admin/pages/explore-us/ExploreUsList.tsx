import React, { useState, useEffect } from 'react';
import { Pencil, Save, X, Loader2, AlertCircle } from 'lucide-react';
import { get, put } from '../../../services/api';

interface ExploreItem {
  id: number;
  identifier: string;
  title: string;
  icon: string | null;
  url: string | null;
}

const ExploreUsList: React.FC = () => {
  const [items, setItems] = useState<ExploreItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Edit state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<{ title: string; url: string }>({ title: '', url: '' });
  const [saving, setSaving] = useState(false);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      // Change to the proper API url depending on how the frontend is configured
      const response = await get<ExploreItem[]>('/explore-us'); 
      setItems(response);
    } catch (err: any) {
      console.error('Error fetching explore items:', err);
      setError('Failed to load explore us links from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleEditClick = (item: ExploreItem) => {
    setEditingId(item.id);
    setEditFormData({
      title: item.title || '',
      url: item.url || '',
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData({ title: '', url: '' });
  };

  const handleSave = async (id: number) => {
    try {
      setSaving(true);
      await put(`/explore-us/${id}`, editFormData);
      await fetchItems(); // Refresh data
      setEditingId(null); // Exit edit mode
    } catch (err: any) {
      console.error('Error updating explore item:', err);
      alert('Failed to update URL. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 text-brand-gold animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-sm border border-red-100 text-red-500">
        <AlertCircle className="w-12 h-12 mb-4 opacity-50" />
        <h2 className="text-lg font-semibold mb-2">Error</h2>
        <p>{error}</p>
        <button onClick={fetchItems} className="mt-4 px-4 py-2 bg-brand-navy text-white rounded-lg text-sm">Retry</button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-200">
        <h2 className="text-xl font-bold text-brand-navy">Explore Us Links</h2>
        <p className="text-sm text-slate-500 mt-1">Manage the quick access links shown on the homepage</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">URL</th>
              <th className="px-6 py-4 w-28 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  {editingId === item.id ? (
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                      value={editFormData.title}
                      onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                    />
                  ) : (
                    <span className="font-semibold text-slate-800">{item.title}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingId === item.id ? (
                    <input
                      type="url"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                      value={editFormData.url}
                      onChange={(e) => setEditFormData({ ...editFormData, url: e.target.value })}
                      placeholder="e.g. https://domain.com/page"
                    />
                  ) : (
                    <a href={item.url || '#'} target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline truncate inline-block max-w-sm">
                      {item.url || <span className="text-slate-400 italic">No URL configured</span>}
                    </a>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  {editingId === item.id ? (
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleSave(item.id)}
                        disabled={saving}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Save"
                      >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        disabled={saving}
                        className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-lg transition-colors"
                        title="Cancel"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEditClick(item)}
                      className="p-2 text-slate-400 hover:text-brand-gold hover:bg-brand-gold/10 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
            
            {items.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-slate-500">
                  No links found. Please run the backend seeder.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExploreUsList;