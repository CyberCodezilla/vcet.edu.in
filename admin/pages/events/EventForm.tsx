import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { eventsApi } from '../../api/events';
import type { EventPayload } from '../../types';

const CATEGORIES = ['Academic', 'Cultural', 'Sports', 'Technical', 'Workshop', 'Other'];

const EventForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState<EventPayload>({
    title: '',
    organizer: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    category: '',
    status: 'Upcoming',
    is_featured: false,
    is_active: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    eventsApi
      .get(Number(id))
      .then((r) => {
        if (!r.data) return;
        const ev = r.data;
        setForm({
          title: ev.title,
          organizer: ev.organizer ?? '',
          description: ev.description ?? '',
          date: ev.date,
          time: ev.time ?? '',
          venue: ev.venue ?? '',
          category: ev.category ?? '',
          status: ev.status ?? 'Upcoming',
          is_featured: ev.is_featured,
          is_active: ev.is_active,
        });
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? target.checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.title.trim() || !form.date) {
      setError('Title and Date are required.');
      return;
    }
    setSaving(true);
    try {
      const payload: EventPayload = { ...form, ...(imageFile ? { image: imageFile } : {}) };
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
        <div className="w-10 h-10 border-4 border-slate-100 border-t-[#1e293b] rounded-full animate-spin" />
        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest text-center">Loading Event Details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-widest">
            <Link to="/admin" className="hover:text-slate-600 transition-colors">Dashboard</Link>
            <span className="text-slate-300 font-normal">/</span>
            <Link to="/admin/events" className="hover:text-slate-600 transition-colors">Events</Link>
            <span className="text-slate-300 font-normal">/</span>
            <span className="text-slate-600">{isEdit ? 'Edit' : 'New'}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#111827] text-center sm:text-left">{isEdit ? 'Edit Event' : 'Add New Event'}</h1>
        </div>
        <button
          type="button"
          onClick={() => navigate('/admin/events')}
          className="bg-white border border-slate-200 text-slate-500 hover:text-red-500 hover:border-red-200 transition-all p-3 rounded-2xl shadow-sm hover:shadow-md hidden sm:block"
          title="Cancel and Go Back"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-3xl px-6 py-4 text-sm text-red-600 flex items-center gap-3 animate-shake">
          <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden flex flex-col transition-all">
        <div className="p-8 sm:p-10 space-y-8">
          {/* Main Info */}
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">Event Title <span className="text-red-400">*</span></label>
              <input name="title" value={form.title} onChange={handleChange} placeholder="e.g., Annual Tech Symposium 2024" required className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-2xl px-5 py-4 text-sm font-bold transition-all outline-none" />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">Organizing Body</label>
              <input name="organizer" value={form.organizer ?? ''} onChange={handleChange} placeholder="e.g., Organized by IT Department" className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-2xl px-5 py-4 text-sm font-bold transition-all outline-none" />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">Event Description</label>
              <textarea name="description" value={form.description ?? ''} onChange={handleChange} rows={4} placeholder="Briefly describe the event highlights..." className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-2xl px-5 py-4 text-sm font-bold transition-all outline-none resize-none" />
            </div>
          </div>

          {/* Date, Time, Venue */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">Event Date <span className="text-red-400">*</span></label>
              <input type="date" name="date" value={form.date} onChange={handleChange} required className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-2xl px-5 py-4 text-sm font-bold transition-all outline-none" />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">Time Slot</label>
              <input type="text" name="time" value={form.time ?? ''} onChange={handleChange} placeholder="e.g., 09:00 AM - 05:00 PM" className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-2xl px-5 py-4 text-sm font-bold transition-all outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">Venue / Location</label>
            <input name="venue" value={form.venue ?? ''} onChange={handleChange} placeholder="e.g., Main Auditorium, Block A" className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-2xl px-5 py-4 text-sm font-bold transition-all outline-none" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">Category</label>
              <select name="category" value={form.category ?? ''} onChange={handleChange} className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-2xl px-5 py-4 text-sm font-bold transition-all outline-none flex">
                <option value="">— Select Category —</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">Status</label>
              <select name="status" value={form.status ?? 'Upcoming'} onChange={handleChange} className="w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#1e293b] rounded-2xl px-5 py-4 text-sm font-bold transition-all outline-none flex">
                <option value="Upcoming">Upcoming</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Image Upload */}
          <div className="pt-2">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Event Poster / Cover Image</label>
            <div className="relative group">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center gap-3 group-hover:bg-slate-100/50 group-hover:border-slate-300 transition-all">
                <div className="p-3 bg-white rounded-2xl shadow-sm text-slate-400 group-hover:text-[#1e293b] transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <p className="text-xs font-bold text-slate-500">{imageFile ? imageFile.name : 'Drop image here or click to browse'}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Recommended: 1200 x 675 px</p>
              </div>
            </div>
          </div>

          {/* Visibility Controls */}
          <div className="flex flex-wrap gap-8 pt-4">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className={`relative flex items-center w-12 h-6.5 rounded-full transition-all duration-300 ${form.is_featured ? 'bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.3)]' : 'bg-slate-200'}`}>
                <input type="checkbox" name="is_featured" checked={form.is_featured ?? false} onChange={handleChange} className="sr-only" />
                <span className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${form.is_featured ? 'translate-x-6' : 'translate-x-1'}`} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black text-slate-700 uppercase tracking-wider">Highlight Event</span>
                <span className="text-[10px] text-slate-400 font-bold">Featured on Home</span>
              </div>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className={`relative flex items-center w-12 h-6.5 rounded-full transition-all duration-300 ${form.is_active ? 'bg-[#1e293b] shadow-[0_0_12px_rgba(30,41,59,0.2)]' : 'bg-slate-200'}`}>
                <input type="checkbox" name="is_active" checked={form.is_active ?? false} onChange={handleChange} className="sr-only" />
                <span className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${form.is_active ? 'translate-x-6' : 'translate-x-1'}`} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black text-slate-700 uppercase tracking-wider">Live Status</span>
                <span className="text-[10px] text-slate-400 font-bold">Visible to Public</span>
              </div>
            </label>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-8 py-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest hidden sm:block">All fields marked with * are mandatory</p>
           <div className="flex items-center gap-3 w-full sm:w-auto">
             <button
               type="button"
               onClick={() => navigate('/admin/events')}
               className="flex-1 sm:flex-none px-8 py-4 rounded-2xl text-xs font-black text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all uppercase tracking-widest"
             >
               Discard
             </button>
             <button
               type="submit"
               disabled={saving}
               className="flex-1 sm:flex-none bg-[#1e293b] hover:bg-[#0f172a] disabled:opacity-50 text-white font-black px-10 py-4 rounded-2xl text-xs transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 uppercase tracking-[0.15em] flex items-center justify-center gap-2"
             >
               {saving ? (
                 <>
                   <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                   <span>Processing...</span>
                 </>
               ) : isEdit ? 'Update Details' : 'Publish Event'}
             </button>
           </div>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
