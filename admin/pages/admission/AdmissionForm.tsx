import React, { useEffect, useState } from 'react';
import { pagesApi } from '../../api/pagesApi';
import type { AdmissionData, AdmissionPayload, AdmissionDocument, CourseIntakeItem } from '../../types';

/* ── Toast Component ────────────────────────────────────────────────────────── */
const Toast: React.FC<{ message: string; type: 'success' | 'error'; onClose: () => void }> = ({ message, type, onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl text-sm font-bold animate-slide-up ${type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
      {type === 'success' ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
      )}
      {message}
    </div>
  );
};

/* ── Section Card ─────────────────────────────────────────────────────────── */
const SectionCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-white rounded-[2rem] shadow-lg shadow-slate-200/40 border border-slate-100 overflow-hidden">
    <div className="px-8 py-5 border-b border-slate-100 flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">{icon}</div>
      <h3 className="text-sm font-extrabold text-[#111827] uppercase tracking-wider">{title}</h3>
    </div>
    <div className="p-8 space-y-6">{children}</div>
  </div>
);

const inputBase = 'w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#2563EB] rounded-2xl px-5 py-4 text-sm font-bold transition-all outline-none';
const labelBase = 'block text-xs font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1';

/* ── Document List Manager ─────────────────────────────────────────────────── */
interface DocItem extends AdmissionDocument {
  file?: File | null;
}

const DocumentListManager: React.FC<{
  items: DocItem[];
  onChange: (items: DocItem[]) => void;
  type: 'fees' | 'documents' | 'cutoffs' | 'scholarships';
}> = ({ items, onChange, type }) => {
  const addItem = () => {
    onChange([...(items || []), { title: '', description: '', year: '2024-25', category: 'UG - FIRST YEAR', fileUrl: null, fileName: null }]);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, updates: Partial<DocItem>) => {
    const next = [...items];
    next[index] = { ...next[index], ...updates };
    onChange(next);
  };

  return (
    <div className="space-y-4">
      {Array.isArray(items) && items.map((item, idx) => (
        <div key={idx} className="relative group flex items-start gap-6 bg-slate-50 border border-slate-200 rounded-[2rem] p-6 transition-all hover:shadow-md hover:border-slate-300">
          <div className="flex-shrink-0 w-12 h-12 border-2 border-slate-200 rounded-xl flex items-center justify-center text-slate-400 font-black text-lg bg-white">
            {(idx + 1).toString().padStart(2, '0')}
          </div>
          
          <div className="flex-grow space-y-4">
            <button 
              type="button" 
              onClick={() => removeItem(idx)}
              className="absolute -top-3 -right-3 w-8 h-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center shadow-md hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 z-20"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={type === 'scholarships' ? "md:col-span-2" : "md:col-span-1"}>
                <label className={labelBase}>
                  {type === 'scholarships' ? 'Scholarship Name' : 'Document Title'}
                </label>
                <input 
                  value={item.title} 
                  onChange={e => updateItem(idx, { title: e.target.value })}
                  className={inputBase}
                  placeholder={type === 'scholarships' ? "e.g. Post Matric Scholarship for OBC" : "e.g. F.E. (First Year Engineering) 2024-25"}
                />
              </div>
              {type !== 'scholarships' && (
              <div className="md:col-span-1 text-right">
                 <label className={labelBase}>{type === 'documents' ? 'Category' : 'Academic Year'}</label>
                 {type === 'documents' ? (
                   <select 
                      value={item.category} 
                      onChange={e => updateItem(idx, { category: e.target.value })}
                      className={inputBase}
                   >
                      <option value="UG - FIRST YEAR">UG - FIRST YEAR</option>
                      <option value="UG - DIRECT SE">UG - DIRECT SE</option>
                      <option value="PG - M.E.">PG - M.E.</option>
                      <option value="MANAGEMENT - MMS">MANAGEMENT - MMS</option>
                   </select>
                 ) : (
                   <select 
                      value={item.year} 
                      onChange={e => updateItem(idx, { year: e.target.value })}
                      className={inputBase}
                   >
                      <option value="2025-26">2025-26</option>
                      <option value="2024-25">2024-25</option>
                      <option value="2023-24">2023-24</option>
                   </select>
                 )}
              </div>
              )}
              {type !== 'scholarships' && (
              <div className="md:col-span-2">
                <label className={labelBase}>{type === 'cutoffs' ? 'Subtitle (e.g. Engineering Department)' : 'Short Description'}</label>
                <input 
                  value={item.description} 
                  onChange={e => updateItem(idx, { description: e.target.value })}
                  className={inputBase}
                  placeholder={type === 'cutoffs' ? "e.g. Engineering Department" : "Briefly explain what this document is for..."}
                />
              </div>
              )}
              <div className="md:col-span-2">
                <label className={labelBase}>PDF Document</label>
                <div className="relative overflow-hidden bg-white border-2 border-dashed border-slate-200 rounded-2xl p-4 transition-all hover:border-[#2563EB]">
                  <input 
                    type="file" 
                    accept="application/pdf"
                    onChange={e => updateItem(idx, { file: e.target.files?.[0] || null })}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5z" /></svg>
                    </div>
                    <span className="text-xs font-bold text-slate-600 truncate">
                      {item.file?.name || item.fileName || 'Click or drag to upload PDF'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <button 
        type="button" 
        onClick={addItem}
        className="w-full py-4 border-2 border-dashed border-slate-200 rounded-[2rem] text-slate-400 font-bold hover:border-[#2563EB] hover:text-[#2563EB] transition-all flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
        <span>Add Row</span>
      </button>
    </div>
  );
};

/* ── Course List Manager ──────────────────────────────────────────────────── */
const CourseListManager: React.FC<{
  title: string;
  items: CourseIntakeItem[];
  onChange: (items: CourseIntakeItem[]) => void;
}> = ({ title, items, onChange }) => {
  const addItem = () => onChange([...(items || []), { name: '', intake: '' }]);
  const removeItem = (index: number) => onChange(items.filter((_, i) => i !== index));
  const updateItem = (index: number, updates: Partial<CourseIntakeItem>) => {
    const next = [...items];
    next[index] = { ...next[index], ...updates };
    onChange(next);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">{title}</h4>
        <button 
          type="button" 
          onClick={addItem}
          className="px-3 py-1.5 rounded-lg bg-slate-900 shadow-sm text-white text-[10px] font-black uppercase tracking-wider hover:bg-slate-800 transition-all flex items-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
          Add Course
        </button>
      </div>
      {(items || []).map((item, idx) => (
        <div key={idx} className="flex items-center gap-4 bg-white ring-1 ring-slate-200 rounded-2xl p-4 transition-all hover:ring-[#2563EB] group">
          <div className="flex-grow grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
              <input 
                placeholder="Course Name"
                className="w-full bg-transparent border-0 focus:ring-0 px-0 py-1 text-sm font-bold text-slate-700 outline-none"
                value={item.name}
                onChange={e => updateItem(idx, { name: e.target.value })}
              />
            </div>
            <div className="md:col-span-1">
              <input 
                placeholder="Intake"
                className="w-full bg-slate-50 ring-1 ring-slate-100 rounded-xl px-4 py-1.5 text-sm font-black text-slate-900 outline-none text-center focus:ring-2 focus:ring-[#2563EB]"
                value={item.intake}
                onChange={e => updateItem(idx, { intake: e.target.value })}
              />
            </div>
          </div>
          <button 
            type="button" 
            onClick={() => removeItem(idx)}
            className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      ))}
      {(!items || items.length === 0) && (
        <div className="py-8 text-center border-2 border-dashed border-slate-100 rounded-[2rem]">
          <p className="text-xs text-slate-300 font-bold uppercase tracking-widest">No courses added yet</p>
        </div>
      )}
    </div>
  );
};

/* ── Main Admission Form ──────────────────────────────────────────────────── */
interface AdmissionFormProps {
  activeSection?: string;
  onBack?: () => void;
}

const AdmissionForm: React.FC<AdmissionFormProps> = ({ activeSection, onBack }) => {
  const [data, setData] = useState<AdmissionData | null>(null);
  const [payload, setPayload] = useState<AdmissionPayload>({
    courses: { ug: [], pg: [], management: [] },
    scholarships: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    pagesApi.admission.get()
      .then(res => {
        setData(res.data);
        setPayload({
          courses: res.data?.courses || { ug: [], pg: [], management: [] },
          feesStructure: Array.isArray(res.data?.feesStructure) ? res.data.feesStructure : [],
          documentsRequired: Array.isArray(res.data?.documentsRequired) ? res.data.documentsRequired : [],
          cutOffs: Array.isArray(res.data?.cutOffs) ? res.data.cutOffs : [],
          scholarships: Array.isArray(res.data?.scholarships) ? res.data.scholarships : [],
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPayload(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof AdmissionPayload) => {
    setPayload(prev => ({ ...prev, [field]: e.target.files?.[0] || null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await pagesApi.admission.update(payload);
      setData(res.data);
      setToast({ message: 'Admission content updated successfully', type: 'success' });
    } catch (err) {
      setToast({ message: 'Failed to update content', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="w-10 h-10 border-4 border-slate-100 border-t-[#2563EB] rounded-full animate-spin" />
      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Loading Admission Module...</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {onBack && (
            <button 
              onClick={onBack}
              className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
            </button>
          )}
          <div>
            <h1 className="text-3xl font-extrabold text-[#111827]">
              {activeSection ? `Edit ${activeSection === 'intake' ? 'Intake' : 
                                      activeSection === 'fees' ? 'Fees' : 
                                      activeSection === 'documents' ? 'Documents' : 
                                      activeSection === 'cutoffs' ? 'Cutoffs' : 
                                      activeSection === 'brochure' ? 'Brochure' : 
                                      activeSection === 'scholarships' ? 'Scholarships' : 'Section'}` : 'Admission Module'}
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              {activeSection ? `Manage your admission ${activeSection} details here.` : 'Manage intake, fees, and academic brochures.'}
            </p>
          </div>
        </div>
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest text-right">
          Last updated: {data?.updatedAt ? new Date(data.updatedAt).toLocaleDateString() : 'Never'}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Courses & Intake */}
        {(!activeSection || activeSection === 'intake') && (
          <SectionCard title="Courses & Intake" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}>
            <div className="space-y-12">
              <CourseListManager 
                title="Under Graduate Program" 
                items={payload.courses?.ug || []} 
                onChange={items => setPayload(prev => ({ ...prev, courses: { ...prev.courses!, ug: items } }))}
              />
              <CourseListManager 
                title="Post Graduate Program" 
                items={payload.courses?.pg || []} 
                onChange={items => setPayload(prev => ({ ...prev, courses: { ...prev.courses!, pg: items } }))}
              />
              <CourseListManager 
                title="Management Course Program" 
                items={payload.courses?.management || []} 
                onChange={items => setPayload(prev => ({ ...prev, courses: { ...prev.courses!, management: items } }))}
              />
            </div>
          </SectionCard>
        )}

        {/* Fees Structure List */}
        {(!activeSection || activeSection === 'fees') && (
          <SectionCard title="Fees Structure Table" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}>
            <DocumentListManager 
              type="fees" 
              items={payload.feesStructure || []} 
              onChange={items => setPayload(prev => ({ ...prev, feesStructure: items }))} 
            />
          </SectionCard>
        )}

        {/* Required Documentation List */}
        {(!activeSection || activeSection === 'documents') && (
          <SectionCard title="Required Documentation" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>}>
            <DocumentListManager 
              type="documents" 
              items={payload.documentsRequired || []} 
              onChange={items => setPayload(prev => ({ ...prev, documentsRequired: items }))} 
            />
          </SectionCard>
        )}

        {/* Cut Off List (Centralized Admission Process) */}
        {(!activeSection || activeSection === 'cutoffs') && (
          <SectionCard title="Centralized Admission Process (Cutoffs)" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v16a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}>
            <DocumentListManager 
              type="cutoffs" 
              items={payload.cutOffs || []} 
              onChange={items => setPayload(prev => ({ ...prev, cutOffs: items }))} 
            />
          </SectionCard>
        )}

        {/* Scholarships List */}
        {(!activeSection || activeSection === 'scholarships') && (
          <SectionCard title="Scholarships & Financial Aid" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}>
            <DocumentListManager 
              type="scholarships" 
              items={payload.scholarships || []} 
              onChange={items => setPayload(prev => ({ ...prev, scholarships: items }))} 
            />
          </SectionCard>
        )}

        {/* Brochure (Single File) */}
        {(!activeSection || activeSection === 'brochure') && (
          <SectionCard title="College Brochure" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}>
              <div className="relative group overflow-hidden bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-6 transition-all hover:border-[#2563EB]">
                  <input type="file" accept="application/pdf" onChange={e => handleFileChange(e, 'brochureFile')} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                  <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-red-500 shadow-sm"><svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5z" /></svg></div>
                  <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-700 truncate">{payload.brochureFile?.name || data?.brochure.fileName || 'Upload Latest College Brochure'}</span>
                      <span className="text-xs text-slate-400 font-bold">PDF Format (Max 10MB)</span>
                  </div>
                  </div>
              </div>
          </SectionCard>
        )}

        {/* Footer Actions */}
        <div className="bg-white rounded-[2rem] shadow-lg shadow-slate-200/40 border border-slate-100 px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest sm:w-1/2 leading-relaxed">
            All tables (Fees, Required Docs, Cutoffs) support dynamic row management. Changes are live after saving.
          </p>
          <button 
            type="submit" 
            disabled={saving} 
            className="w-full sm:w-auto bg-[#2563EB] hover:bg-blue-700 disabled:opacity-50 text-white font-black px-12 py-4 rounded-2xl text-xs transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 uppercase tracking-[0.15em] flex items-center justify-center gap-2"
          >
            {saving ? <><div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" /><span>Saving...</span></> : 'Update Module'}
          </button>
        </div>
      </form>

      <style>{`
        @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default AdmissionForm;
