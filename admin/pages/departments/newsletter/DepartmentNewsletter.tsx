import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { departmentApi } from '../../../api/departments';
import { newsletterApi } from '../../../api/newsletterApi';
import type { Department, Newsletter } from '../../../types';

import NewsletterForm from './NewsletterForm';
import NewsletterPreview from './NewsletterPreview';
import NewsletterCard from './NewsletterCard';
import PdfViewer from './PdfViewer';

/* ── Toast Component ────────────────────────────────────────────────────────── */
const Toast: React.FC<{ message: string; type: 'success' | 'error'; onClose: () => void }> = ({ message, type, onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={`fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl text-sm font-bold animate-slide-up ${type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
      {type === 'success' ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
      )}
      {message}
    </div>
  );
};

const DepartmentNewsletter: React.FC = () => {
  // State
  const [departments, setDepartments] = useState<Department[]>([]);
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [departmentId, setDepartmentId] = useState<string | number>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  
  // Edit & View State
  const [editingItem, setEditingItem] = useState<Newsletter | null>(null);
  const [previewPdfUrl, setPreviewPdfUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Previews derived from Form or Edit state
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [localPdfPreviewUrl, setLocalPdfPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([departmentApi.list(), newsletterApi.list()])
      .then(([deptRes, newsRes]) => {
        setDepartments(deptRes.data);
        setNewsletters(newsRes.data);
      })
      .catch((e) => setToast({ message: 'Failed to load initial data', type: 'error' }))
      .finally(() => setLoading(false));
  }, []);

  // Update image preview URL dynamically
  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImagePreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (editingItem?.image) {
      setImagePreviewUrl(editingItem.image);
    } else {
      setImagePreviewUrl(null);
    }
  }, [imageFile, editingItem]);

  // Update pdf preview URL dynamically
  useEffect(() => {
    if (pdfFile) {
      const url = URL.createObjectURL(pdfFile);
      setLocalPdfPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (editingItem?.pdf) {
      setLocalPdfPreviewUrl(editingItem.pdf);
    } else {
      setLocalPdfPreviewUrl(null);
    }
  }, [pdfFile, editingItem]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDepartmentId('');
    setImageFile(null);
    setPdfFile(null);
    setEditingItem(null);
  };

  const handleEdit = (n: Newsletter) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setEditingItem(n);
    setTitle(n.title);
    setDescription(n.description);
    setDepartmentId(n.departmentId);
    setImageFile(null); // Keep null unless they upload a new one
    setPdfFile(null);   // Keep null unless they upload a new one
  };

  const handleDelete = async (n: Newsletter) => {
    if (!window.confirm('Delete this newsletter? This action cannot be undone.')) return;
    setDeletingId(n.id);
    try {
      await newsletterApi.delete(n.id);
      setNewsletters((prev) => prev.filter((item) => item.id !== n.id));
      setToast({ message: 'Newsletter deleted successfully', type: 'success' });
      if (editingItem?.id === n.id) resetForm();
    } catch (e) {
      setToast({ message: 'Error deleting newsletter', type: 'error' });
    } finally {
      setDeletingId(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!departmentId) {
       setToast({ message: 'Please select a department', type: 'error' });
       return;
    }
    
    setIsSubmitting(true);
    try {
      if (editingItem) {
        // Edit mode
        const res = await newsletterApi.update(editingItem.id, {
          title, description, departmentId,
          image: imageFile, pdf: pdfFile,
          existingImage: editingItem.image,
          existingPdf: editingItem.pdf
        } as any);
        setNewsletters((prev) => prev.map((n) => n.id === editingItem.id ? res.data : n));
        setToast({ message: 'Newsletter updated successfully', type: 'success' });
      } else {
        // Create mode
        if (!imageFile || !pdfFile) {
           setToast({ message: 'Image and PDF are required', type: 'error' });
           setIsSubmitting(false);
           return;
        }
        const res = await newsletterApi.create({
          title, description, departmentId, image: imageFile, pdf: pdfFile
        });
        setNewsletters((prev) => [res.data, ...prev]);
        setToast({ message: 'Newsletter published successfully', type: 'success' });
      }
      resetForm();
    } catch (err: any) {
       setToast({ message: err.message || 'Failed to submit newsletter', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-10 pb-12">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {previewPdfUrl && <PdfViewer url={previewPdfUrl} onClose={() => setPreviewPdfUrl(null)} />}

      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-widest">
            <Link to="/admin" className="hover:text-slate-600 transition-colors">Dashboard</Link>
            <span className="text-slate-300 font-normal">/</span>
            <Link to="/admin/pages/home" className="hover:text-slate-600 transition-colors">Pages</Link>
            <span className="text-slate-300 font-normal">/</span>
            <span className="text-slate-600">Newsletter</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#111827]">Department Newsletters</h1>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-10 h-10 border-4 border-slate-100 border-t-[#1e293b] rounded-full animate-spin" />
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Loading Platform...</p>
        </div>
      ) : (
        <>
          {/* Main Grid Creation / Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left Box: Preview */}
            <NewsletterPreview 
              title={title}
              description={description}
              departmentId={departmentId}
              imagePreview={imagePreviewUrl}
              pdfPreview={localPdfPreviewUrl}
              departments={departments}
              onPreviewPdf={() => localPdfPreviewUrl && setPreviewPdfUrl(localPdfPreviewUrl)}
            />

            {/* Right Box: Form */}
            <NewsletterForm 
              title={title} setTitle={setTitle}
              description={description} setDescription={setDescription}
              departmentId={departmentId} setDepartmentId={setDepartmentId}
              departments={departments}
              setImageFile={setImageFile} setPdfFile={setPdfFile}
              imageName={imageFile?.name || (editingItem?.image ? editingItem.image.split('_').pop() : null) || null}
              pdfName={pdfFile?.name || (editingItem?.pdf ? editingItem.pdf.split('_').pop() : null) || null}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              isEditing={!!editingItem}
              onCancelEdit={resetForm}
            />
          </div>

          <hr className="border-slate-100 my-12" />

          {/* List Section */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-[#111827]">Published Editions</h2>
              <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-bold uppercase tracking-wider">
                {newsletters.length} Total
              </span>
            </div>
            
            {newsletters.length === 0 ? (
               <div className="text-center py-24 bg-white rounded-[2rem] border border-slate-100">
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                </div>
                <h3 className="text-lg font-extrabold text-slate-700 mb-2">No Newsletters Yet</h3>
                <p className="text-slate-400 text-sm font-medium">Create your first edition using the form above.</p>
               </div>
            ) : (
              <div className="flex flex-col gap-4">
                {newsletters.map(n => (
                  <NewsletterCard 
                    key={n.id}
                    newsletter={n}
                    departments={departments}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onPreview={(nl) => {
                      if (nl.pdf) setPreviewPdfUrl(nl.pdf);
                      else setToast({ message: 'PDF not found', type: 'error' });
                    }}
                    isDeleting={deletingId === n.id}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DepartmentNewsletter;
