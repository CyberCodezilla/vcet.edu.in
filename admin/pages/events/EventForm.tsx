import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { eventsApi } from '../../api/events';
import type { EventPayload } from '../../types';
import PdfPreviewModal from '../../components/PdfPreviewModal';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';

const CATEGORIES = ['Academic', 'Cultural', 'Sports', 'Technical', 'Workshop', 'Other'];

const empty: EventPayload = {
  title: '',
  organizer: '',
  description: '',
  date: '',
  time: '',
  venue: '',
  category: 'Event',
  status: 'Upcoming',
  is_featured: false,
  is_active: true,
  expiry_date: '',
  expiry_time: '',
  external_link: '',
  external_link_label: '',
};

const EventForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState<EventPayload>(empty);
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [existingPdfUrl, setExistingPdfUrl] = useState<string | null>(null);
  const [localImagePreviewUrl, setLocalImagePreviewUrl] = useState<string | null>(null);
  
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    eventsApi
      .get(Number(id))
      .then((r) => {
        if (!r.data) return;
        const ev = r.data as any; // Cast to access dynamically added attachment
        setForm({
          title: ev.title,
          organizer: ev.organizer ?? '',
          description: ev.description ?? '',
          date: ev.date,
          time: ev.time ?? '',
          venue: ev.venue ?? '',
          category: ev.category ?? 'Event',
          status: ev.status ?? 'Upcoming',
          is_featured: ev.is_featured,
          is_active: ev.is_active,
          expiry_date: ev.expiry_date ?? '',
          expiry_time: ev.expiry_time ?? '',
          external_link: ev.external_link ?? '',
          external_link_label: ev.external_link_label ?? '',
        });
        if (ev.image) setExistingImageUrl(ev.image);
        if (ev.attachment) setExistingPdfUrl(ev.attachment);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  useEffect(() => {
    if (!imageFile) {
      setLocalImagePreviewUrl(null);
      return;
    }

    const previewUrl = URL.createObjectURL(imageFile);
    setLocalImagePreviewUrl(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [imageFile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? target.checked : value,
    }));
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) {
      setPdfFile(null);
      return;
    }
    if (selected.type !== 'application/pdf') {
      alert('Only PDF files are allowed for attachments.');
      e.target.value = '';
      return;
    }
    setPdfFile(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.title.trim() || !form.date) {
      setError('Title and Event Date are required.');
      return;
    }
    
    // PDF upload is optional for events, unlike notices, so we don't strictly require it
    setSaving(true);
    try {
      const payload: EventPayload = { ...form };
      if (imageFile) payload.image = imageFile;
      if (pdfFile) payload.attachment = pdfFile;

      if (isEdit) {
        await eventsApi.update(Number(id), payload);
      } else {
        await eventsApi.create(payload);
      }
      navigate('/admin/events');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-10 h-10 border-4 border-slate-100 border-t-[#2563EB] rounded-full animate-spin" />
        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest text-center">Loading Event Details...</p>
      </div>
    );
  }

  const pdfPreviewToUse = pdfFile ? URL.createObjectURL(pdfFile) : existingPdfUrl;
  const imagePreviewToUse = localImagePreviewUrl ?? existingImageUrl;

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <PdfPreviewModal 
        isOpen={previewOpen} 
        onClose={() => setPreviewOpen(false)} 
        pdfUrl={pdfPreviewToUse} 
        title={form.title || 'PDF Preview'} 
      />

      <PageEditorHeader
        title={isEdit ? 'Edit Event' : 'Add New Event'}
        description="Manage campus events, workshops, technical symposiums, and cultural festivals."
        onSave={handleSubmit as unknown as () => void}
        isSaving={saving}
        showBackButton
        onBack={() => navigate('/admin/events')}
      />

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-2xl px-5 py-4 text-sm text-red-600 font-medium flex items-center gap-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border text-left border-slate-200 shadow-sm rounded-4xl p-8 lg:p-10 space-y-8">
        
        {/* Main Info */}
        <div className="space-y-6">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Event Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">Event Title *</label>
              <input id="eventform-1" aria-label="eventform field" name="title" value={form.title} onChange={handleChange} placeholder="e.g., Annual Tech Symposium 2024" required className="admin-input" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">Organizing Body</label>
              <input id="eventform-2" aria-label="eventform field" name="organizer" value={form.organizer ?? ''} onChange={handleChange} placeholder="e.g., Organized by IT Department" className="admin-input" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">Category</label>
              <select id="eventform-select-1" aria-label="eventform select field" name="category" value={form.category ?? ''} onChange={handleChange} className="admin-input appearance-none">
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">Event Description</label>
            <textarea id="eventform-textarea-2" aria-label="eventform textarea field" name="description" value={form.description ?? ''} onChange={handleChange} rows={4} placeholder="Briefly describe the event highlights..." className="admin-input resize-none" />
          </div>
        </div>

        {/* Date, Time, Venue */}
        <div className="space-y-6 pt-2">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Scheduling & Location</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">Event Date *</label>
              <input id="eventform-3" aria-label="eventform field" type="date" name="date" value={form.date} onChange={handleChange} required className="admin-input" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">Time Slot</label>
              <input id="eventform-4" aria-label="eventform field" type="text" name="time" value={form.time ?? ''} onChange={handleChange} placeholder="e.g., 09:00 AM - 05:00 PM" className="admin-input" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">Venue / Location</label>
              <input id="eventform-5" aria-label="eventform field" name="venue" value={form.venue ?? ''} onChange={handleChange} placeholder="e.g., Main Auditorium, Block A" className="admin-input" />
            </div>
          </div>
        </div>

        {/* Expiry Details */}
        <div className="space-y-6 pt-2">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Expiry Details (Optional)</h3>
          <p className="text-xs text-slate-500 font-medium">When specified, the event will automatically be marked as "Expired" and hidden from active lists after the date and time pass.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">Expiry Date</label>
              <input id="eventform-6" aria-label="eventform field" type="date" name="expiry_date" value={form.expiry_date ?? ''} onChange={handleChange} className="admin-input" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">Expiry Time</label>
              <input id="eventform-7" aria-label="eventform field" type="time" name="expiry_time" value={form.expiry_time ?? ''} onChange={handleChange} className="admin-input" />
            </div>
          </div>
        </div>

        {/* Uploads */}
        <div className="space-y-6 pt-2">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Media & Documents</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Poster Upload */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">Event Poster (Image)</label>
              <div className="relative group">
                <input id="eventform-8" name="eventform-8" aria-label="eventform field"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center group-hover:bg-slate-100 transition-all h-36">
                  <div className="text-slate-400 group-hover:text-blue-600 mb-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <p className="text-xs font-bold text-slate-600 px-2 truncate w-full">{imageFile ? imageFile.name : 'Upload Event Poster'}</p>
                </div>
              </div>
            </div>

            {/* PDF Attachment Upload */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">Brochure/Attachment (PDF)</label>
              <div className="relative group">
                <input id="eventform-9" name="eventform-9" aria-label="eventform field"
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handlePdfChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center group-hover:bg-slate-100 transition-all h-36">
                  <div className="text-slate-400 group-hover:text-red-500 mb-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                  </div>
                  <p className="text-xs font-bold text-slate-600 px-2 truncate w-full">{pdfFile ? pdfFile.name : 'Upload PDF Document'}</p>
                </div>
              </div>
            </div>
          </div>

          {imagePreviewToUse && (
            <div className="mt-2 w-full flex items-center justify-between bg-white border border-amber-100 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <span className="text-xs font-black tracking-tight">IMG</span>
                </div>
                <div className="text-left truncate">
                  <p className="text-sm font-bold text-slate-900 truncate">{imageFile ? imageFile.name : (form.title || 'Event Poster')}</p>
                  <p className="text-xs text-emerald-600 font-bold uppercase tracking-wide">Poster available</p>
                </div>
              </div>
              <a
                href={imagePreviewToUse}
                target="_blank"
                rel="noreferrer"
                className="ml-4 px-4 py-2 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                Preview
              </a>
            </div>
          )}

          {/* Display Existing PDF or Selected PDF Preview Button */}
          {pdfPreviewToUse && (
            <div className="mt-2 w-full flex items-center justify-between bg-white border border-blue-100 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                  <span className="text-xs font-black tracking-tight">PDF</span>
                </div>
                <div className="text-left truncate">
                  <p className="text-sm font-bold text-slate-900 truncate">{pdfFile ? pdfFile.name : (form.title || 'Attached Document.pdf')}</p>
                  <p className="text-xs text-emerald-600 font-bold uppercase tracking-wide">Ready for upload</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPreviewOpen(true)}
                className="ml-4 px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                Preview
              </button>
            </div>
          )}
        </div>

        {/* External Link */}
        <div className="space-y-6 pt-2">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">External Link</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">External Link URL</label>
              <input id="eventform-10" aria-label="eventform field" 
                type="url" 
                name="external_link" 
                value={form.external_link ?? ''} 
                onChange={handleChange} 
                placeholder="e.g., https://example.com/event-details" 
                className="admin-input" 
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">Link Label</label>
              <input id="eventform-11" aria-label="eventform field" 
                type="text" 
                name="external_link_label" 
                value={form.external_link_label ?? ''} 
                onChange={handleChange} 
                placeholder="e.g., Learn More, Register, Details" 
                className="admin-input" 
              />
            </div>
          </div>
        </div>

        {/* Visibility Controls */}
        <div className="flex flex-wrap gap-8 pt-4">
          <label className="flex items-center gap-3.5 cursor-pointer group select-none">
            <div className={`relative flex items-center w-12 h-6.5 rounded-full transition-all duration-300 ${form.is_active ? 'bg-[#2563EB]' : 'bg-slate-200'}`}>
              <input id="eventform-12" aria-label="eventform field" type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} className="sr-only" />
              <span className={`w-4.5 h-4.5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${form.is_active ? 'translate-x-6.5' : 'translate-x-1'}`} />
            </div>
            <div>
              <span className="block text-sm font-bold text-slate-700 group-hover:text-black transition-colors">Set as Active</span>
              <span className="block text-[10px] text-slate-400 font-medium uppercase tracking-tighter">Visible to Public</span>
            </div>
          </label>

          <label className="flex items-center gap-3.5 cursor-pointer group select-none">
            <div className={`relative flex items-center w-12 h-6.5 rounded-full transition-all duration-300 ${form.is_featured ? 'bg-amber-400' : 'bg-slate-200'}`}>
              <input id="eventform-13" aria-label="eventform field" type="checkbox" name="is_featured" checked={form.is_featured} onChange={handleChange} className="sr-only" />
              <span className={`w-4.5 h-4.5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${form.is_featured ? 'translate-x-6.5' : 'translate-x-1'}`} />
            </div>
            <div>
              <span className="block text-sm font-bold text-slate-700 group-hover:text-black transition-colors">Highlight Event</span>
              <span className="block text-[10px] text-slate-400 font-medium uppercase tracking-tighter">Featured on Home</span>
            </div>
          </label>
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

export default EventForm;
