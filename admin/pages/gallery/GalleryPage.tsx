import React, { useEffect, useRef, useState } from 'react';
import { galleryApi } from '../../api/gallery';
import type { GalleryImage } from '../../types';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';

const GalleryPage: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchImages = () => {
    setLoading(true);
    galleryApi.list()
      .then((r) => setImages(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchImages(); }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!file) { setError('Please select an image.'); return; }
    setUploading(true);
    try {
      await galleryApi.upload({ image: file, caption: caption.trim() || undefined });
      setFile(null);
      setCaption('');
      if (fileRef.current) fileRef.current.value = '';
      fetchImages();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (img: GalleryImage) => {
    if (!window.confirm(`Delete this image${img.caption ? ` (${img.caption})` : ''}?`)) return;
    setDeletingId(img.id);
    try { await galleryApi.delete(img.id); fetchImages(); }
    catch (e) { alert(e instanceof Error ? e.message : 'Delete failed'); setDeletingId(null); }
  };

  return (
    <div className="space-y-6">
      <PageEditorHeader
        title="Campus Gallery"
        description="Manage the photo gallery with campus events, infrastructure, and student life."
        onSave={() => (document.querySelector('form button[type="submit"]') as HTMLButtonElement)?.click()}
        isSaving={uploading}
        saveLabel="Upload Image"
        showBackButton
        onBack={() => window.history.back()}
      />

      {/* Upload form */}
      <div className="bg-white border border-slate-100 shadow-sm rounded-4xl p-6">
        <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-5">Upload Image</h2>
        {error && <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm text-red-600 mb-5">{error}</div>}
        <style>{`.ai{background:#f8fafc;border:1px solid #e2e8f0;border-radius:.75rem;padding:.625rem .875rem;width:100%;color:#1e293b;font-size:.875rem;outline:none;transition:all .2s}.ai:focus{border-color:#94a3b8;background:#ffffff;box-shadow:0 0 0 4px rgba(241,245,249,.8)}.ai::placeholder{color:#94a3b8}`}</style>
        <form onSubmit={handleUpload} className="flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-48">
            <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2 font-medium">Image *</label>
            <input id="gallerypage-1" name="gallerypage-1" aria-label="gallerypage field" ref={fileRef} type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-medium file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer transition-colors" />
          </div>
          <div className="flex-1 min-w-48">
             <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2 font-medium">Caption (optional)</label>
            <input id="gallerypage-2" name="gallerypage-2" aria-label="gallerypage field" value={caption} onChange={(e) => setCaption(e.target.value)} className="ai" placeholder="Describe the photo" />
          </div>
          <button type="submit" disabled={uploading || !file} className="bg-[#1e293b] hover:bg-[#334155] disabled:opacity-50 text-white font-medium px-6 py-2.5 rounded-xl text-sm transition-colors shadow-sm shrink-0 mb-1 lg:mb-0 hidden">
            {uploading ? 'Uploading…' : 'Upload Image'}
          </button>
        </form>
      </div>

      {/* Image grid */}
      {loading ? (
        <div className="flex items-center justify-center py-16"><div className="w-6 h-6 border-2 border-slate-200 border-t-[#1e293b] rounded-full animate-spin" /></div>
      ) : images.length === 0 ? (
        <div className="text-center py-16 text-slate-400 text-sm bg-white border border-slate-100 shadow-sm rounded-4xl">No images yet. Upload one above.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {images.map((img) => (
            <div key={img.id} className="group relative rounded-xl overflow-hidden bg-slate-100 border border-slate-200 aspect-square shadow-sm">
              <img src={img.image} alt={img.caption ?? 'Gallery image'} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              {img.caption && (
                <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-sm border-t border-slate-100 px-3 py-2.5 text-xs text-slate-700 font-medium truncate translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                  {img.caption}
                </div>
              )}
              <button
                onClick={() => handleDelete(img)}
                disabled={deletingId === img.id}
                className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm border border-slate-200 text-red-500 hover:bg-red-50 hover:border-red-200 opacity-0 group-hover:opacity-100 transition-all disabled:opacity-50 flex items-center justify-center shadow-sm"
                title="Delete"
              >
                {deletingId === img.id
                  ? <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                  : <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/></svg>
                }
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
