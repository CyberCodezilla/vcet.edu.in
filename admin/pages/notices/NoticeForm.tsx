import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { noticesApi } from '../../api/notices';
import type { NoticePayload } from '../../types';
import PdfPreviewModal from '../../components/PdfPreviewModal';

const NOTICE_TYPES: Array<{ label: string; value: NonNullable<NoticePayload['type']> }> = [
  { label: 'General', value: 'general' },
  { label: 'Info', value: 'info' },
  { label: 'Warning', value: 'warning' },
  { label: 'Urgent', value: 'urgent' },
];

interface NoticeFormState {
  title: string;
  type: NonNullable<NoticePayload['type']>;
  body: string;
  link_url: string;
  link_label: string;
  deactivates_at: string;
  is_active: boolean;
}

interface ExistingPdfState {
  name: string;
  size: number | null;
  previewUrl: string | null;
  publicUrl: string | null;
}

const empty: NoticeFormState = {
  title: '',
  type: 'general',
  body: '',
  link_url: '',
  link_label: '',
  deactivates_at: '',
  is_active: true,
};

function toLocalDateTimeInput(value: string | null | undefined): string {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  const timezoneOffsetMs = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - timezoneOffsetMs).toISOString().slice(0, 16);
}

const NoticeForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState<NoticeFormState>(empty);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [existingPdf, setExistingPdf] = useState<ExistingPdfState | null>(null);
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);
  const [removePdf, setRemovePdf] = useState(false);
  const [localPdfPreviewUrl, setLocalPdfPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!id) {
      setForm(empty);
      setExistingPdf(null);
      setSelectedPdf(null);
      setRemovePdf(false);
      setFetching(false);
      setError('');
      setSuccess('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setFetching(true);
    setError('');
    setSuccess('');
    noticesApi
      .get(Number(id))
      .then((r) => {
        if (r.data) {
          const d = r.data;
          setForm({
            title: d.title,
            type: d.type ?? 'general',
            body: d.body ?? '',
            link_url: d.link_url ?? '',
            link_label: d.link_label ?? '',
            deactivates_at: toLocalDateTimeInput(d.deactivates_at),
            is_active: d.is_active,
          });
          setExistingPdf(
            d.has_pdf
              ? {
                  name: d.pdf_name ?? 'notice.pdf',
                  size: d.pdf_size ?? null,
                  previewUrl: d.admin_pdf_url ?? d.pdf_url,
                  publicUrl: d.pdf_url,
                }
              : null,
          );
          setRemovePdf(false);
          setSelectedPdf(null);
          if (fileInputRef.current) fileInputRef.current.value = '';
        }
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setFetching(false));
  }, [id]);

  useEffect(() => {
    if (!selectedPdf) {
      setLocalPdfPreviewUrl(null);
      return;
    }

    const previewUrl = URL.createObjectURL(selectedPdf);
    setLocalPdfPreviewUrl(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [selectedPdf]);

  const set = <K extends keyof NoticeFormState>(key: K, value: NoticeFormState[K]) => {
    setSuccess('');
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const previewUrl = localPdfPreviewUrl ?? (!removePdf ? existingPdf?.previewUrl ?? null : null);
  const publicPdfUrl = !removePdf ? existingPdf?.publicUrl ?? null : null;
  const pdfName = selectedPdf?.name ?? (!removePdf ? existingPdf?.name ?? null : null);
  const pdfSize = selectedPdf?.size ?? (!removePdf ? existingPdf?.size ?? null : null);

  const clearNoticeForm = () => {
    setForm(empty);
    setExistingPdf(null);
    setSelectedPdf(null);
    setRemovePdf(false);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (file && file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setError('Only PDF files can be uploaded for notices.');
      e.target.value = '';
      return;
    }

    setError('');
    setSuccess('');
    setSelectedPdf(file);
    setRemovePdf(false);
  };

  const handlePdfAction = () => {
    if (selectedPdf) {
      setSuccess('');
      setSelectedPdf(null);
      setRemovePdf(false);
      return;
    }

    if (existingPdf && !removePdf) {
      setSuccess('');
      setRemovePdf(true);
      return;
    }

    if (existingPdf && removePdf) {
      setSuccess('');
      setRemovePdf(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const payload: NoticePayload = {
      title: form.title.trim(),
      body: form.body.trim(),
      type: form.type,
      link_url: form.link_url.trim() || null,
      link_label: form.link_label.trim() || null,
      deactivates_at: form.deactivates_at ? new Date(form.deactivates_at).toISOString() : null,
      pdf: selectedPdf,
      remove_pdf: removePdf && !selectedPdf,
      is_active: form.is_active,
    };

    try {
      if (isEdit) {
        await noticesApi.update(Number(id), payload);
        setSuccess('Notice updated successfully.');
      } else {
        await noticesApi.create(payload);
        clearNoticeForm();
        setSuccess('Notice published successfully.');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) {
      setSelectedPdf(null);
      return;
    }
    if (selected.type !== 'application/pdf') {
      alert('Only PDF files are allowed.');
      e.target.value = '';
      return;
    }
    setSelectedPdf(selected);
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-3 border-slate-100 border-t-[#2563EB] rounded-full animate-spin" />
      </div>
    );
  }

  const pdfPreviewToUse = previewUrl?.trim() || null;

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">

      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-widest">
            <Link to="/admin" className="hover:text-slate-600 transition-colors">Dashboard</Link>
            <span className="text-slate-300 font-normal">/</span>
            <Link to="/admin/notices" className="hover:text-slate-600 transition-colors">Notices</Link>
            <span className="text-slate-300 font-normal">/</span>
            <span className="text-slate-600">{isEdit ? 'Edit' : 'New'}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#111827]">{isEdit ? 'Edit Notice' : 'Upload New Notice'}</h1>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-2xl px-5 py-4 text-sm text-red-600 font-medium flex items-center gap-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          {error}
        </div>
      )}

      {success && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl px-5 py-4 text-sm text-emerald-700 font-medium flex items-center gap-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200/60 shadow-xl shadow-slate-200/40 rounded-[2rem] p-8 lg:p-10 space-y-7">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">Notice Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              required
              className="admin-input"
              placeholder="e.g. End Semester Exam Timetable"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">Type</label>
            <select
              value={form.type}
              onChange={(e) => set('type', e.target.value as NonNullable<NoticePayload['type']>)}
              className="admin-input appearance-none"
            >
              {NOTICE_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Scheduled Deactivation */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">Deactivates At</label>
            <input
              type="datetime-local"
              value={form.deactivates_at}
              onChange={(e) => set('deactivates_at', e.target.value)}
              className="admin-input"
            />
          </div>
        </div>

        {/* Link fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">External Link</label>
            <input
              type="url"
              value={form.link_url}
              onChange={(e) => set('link_url', e.target.value)}
              className="admin-input"
              placeholder="https://vcet.edu.in/..."
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">Link Label</label>
            <input
              type="text"
              value={form.link_label}
              onChange={(e) => set('link_label', e.target.value)}
              className="admin-input"
              placeholder="Read More"
            />
          </div>
        </div>

        {/* PDF Upload Area */}
        <div className="space-y-6 pt-2">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Document Upload</h3>
          <div className="bg-slate-50 border border-slate-200 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center text-blue-500 mb-4 ring-1 ring-slate-100">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
            </div>
            
            <input
              type="file"
              accept=".pdf,application/pdf"
              id="file-upload"
              onChange={handleFileChange}
              className="hidden"
            />
            
            <label htmlFor="file-upload" className="cursor-pointer bg-white ring-1 ring-slate-200 hover:bg-slate-50 hover:ring-[#2563EB] text-[#2563EB] text-sm font-bold py-2.5 px-6 rounded-xl transition-all shadow-sm">
              Browse PDF File
            </label>
            
            <p className="text-xs text-slate-400 font-medium mt-3">Maximum file size: 10MB. PDF formats only.</p>

            {/* Display Selected File or Existing PDF */}
            {pdfPreviewToUse && (
              <>
                <div className="mt-6 w-full flex items-center justify-between bg-white border border-blue-100 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-black tracking-tight">PDF</span>
                    </div>
                    <div className="text-left truncate">
                      <p className="text-sm font-bold text-slate-900 truncate">{selectedPdf ? selectedPdf.name : (form.title || 'Current Document.pdf')}</p>
                      <p className="text-xs text-emerald-600 font-bold uppercase tracking-wide">Ready for upload</p>
                    </div>
                  </div>
                </div>

                {/* Inline PDF Preview */}
                <div className="mt-6 w-full rounded-2xl border border-slate-200 bg-slate-50/70 overflow-hidden">
                  <div className="px-5 py-4 border-b border-slate-200/80 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-slate-800">PDF Preview</p>
                    </div>
                    <a
                      href={pdfPreviewToUse}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-bold text-slate-700 hover:text-black transition-colors"
                    >
                      Open in New Tab
                    </a>
                  </div>
                  <iframe
                    src={pdfPreviewToUse}
                    title="Notice PDF preview"
                    className="w-full h-[28rem] bg-white"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={() => navigate('/admin/notices')}
            className="px-6 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-[#2563EB] hover:bg-blue-700 disabled:opacity-50 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-blue-200 flex items-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <span>{isEdit ? 'Save Changes' : 'Upload Notice'}</span>
            )}
          </button>
        </div>
      </form>

      <style>{`
        .admin-input {
          width: 100%;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          color: #0f172a;
          font-size: 0.875rem;
          font-weight: 500;
          outline: none;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .admin-input::placeholder { color: #94a3b8; font-weight: 400; }
        .admin-input:focus { 
          border-color: #2563EB; 
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(37,99,235, 0.1);
        }
        select.admin-input {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 1.25rem;
          padding-right: 2.5rem;
        }
      `}</style>
    </div>
  );
};

export default NoticeForm;
