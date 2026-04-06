import React, { useState, useEffect } from 'react';
import { departmentApi } from '../../../api/departments';
import { newsletterApi } from '../../../api/newsletterApi';
import type { Department, Newsletter } from '../../../types';
import AdminFormSection from '../../../components/AdminFormSection';
import PageEditorHeader from '../../../../components/admin/PageEditorHeader';

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

const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
);

const FileUpload = ({ label, value, onChange, id, accept = ".pdf" }: { label: string; value: string | File | undefined | null; onChange: (f: File | undefined) => void; id: string; accept?: string }) => {
  const fileName = value instanceof File ? value.name : (value ? value.split('/').pop()?.split('?')[0] : 'Choose PDF file');
  return (
    <div className="space-y-2 w-full">
      <div className="flex items-center gap-3">
        <label className="flex-1 flex items-center gap-3 p-2 bg-slate-50 ring-1 ring-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition-all overflow-hidden border border-dashed border-slate-300">
          <svg className="w-4 h-4 text-indigo-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          <span className="text-xs font-bold text-slate-600 truncate">{fileName}</span>
          <input id={id} name={id} type="file" className="hidden" accept={accept} onChange={e => { const f = e.target.files?.[0]; if (f) onChange(f); }} />
        </label>
      </div>
    </div>
  );
};

const ImageUpload = ({ label, value, onChange, id }: { label: string; value: string | File | undefined; onChange: (f: File | undefined) => void; id: string }) => {
  const previewUrl = value instanceof File ? URL.createObjectURL(value) : (typeof value === 'string' ? value : null);
  return (
    <div className="space-y-2">
      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</label>
      <div className="flex items-center gap-4">
        {previewUrl && (
          <div className="w-12 h-12 shrink-0 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden relative group">
            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
            <button type="button" onClick={() => onChange(undefined)} className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        )}
        <label className="flex-1 flex items-center gap-3 p-3 bg-slate-50 ring-1 ring-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition-all border border-dashed border-slate-300">
          <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          <span className="text-xs font-bold text-slate-600 truncate">{value instanceof File ? value.name : 'Upload Image (JPG/PNG)'}</span>
          <input id={id} name={id} type="file" className="hidden" accept=".jpg,.jpeg,.png,.webp" onChange={e => { const f = e.target.files?.[0]; if (f) onChange(f); }} />
        </label>
      </div>
    </div>
  );
};


const DepartmentNewsletter: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  
  const [selectedDeptId, setSelectedDeptId] = useState<number | null>(null);
  const [selectedDeptInfo, setSelectedDeptInfo] = useState<Department | null>(null);
  
  const [activeSection, setActiveSection] = useState<string | null>('dynamic-newsletters');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Draft items for the dynamic API
  const [draftNewsletters, setDraftNewsletters] = useState<Partial<Newsletter & { file?: File, deleted?: boolean, edited?: boolean }>[]>([]);
  const [draftMagazines, setDraftMagazines] = useState<Partial<Newsletter & { file?: File, deleted?: boolean, edited?: boolean }>[]>([]);
  
  // Static content from the department JSON
  const [staticContent, setStaticContent] = useState<any>({});

  const newsletterMagazineLimits = {
    committeeDetails: 2400,
    pdfButtonLabel: 70,
    staffName: 80,
    email: 120,
    phone: 25,
    tableTitle: 100,
    tablePost: 60,
    tableName: 180,
  };

  useEffect(() => {
    Promise.all([departmentApi.list(), newsletterApi.list()])
      .then(([deptRes, newsRes]) => {
        setDepartments(deptRes.data);
        setNewsletters(newsRes.data);
      })
      .catch(() => setToast({ message: 'Failed to load initial data', type: 'error' }))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedDeptId) {
      const dept = departments.find(d => d.id === selectedDeptId) || null;
      setSelectedDeptInfo(dept);
      
      if (dept) {
        setStaticContent(dept.content?.newsletterMagazineSection || {
          committeeDetails: '',
          staffIncharge: {},
          tableTitle: '',
          tableRows: []
        });

        const deptNewsletters = newsletters.filter(n => n.departmentId === selectedDeptId);
        setDraftNewsletters(deptNewsletters.filter(n => n.type === 'newsletter').map(n => ({...n})));
        setDraftMagazines(deptNewsletters.filter(n => n.type === 'magazine').map(n => ({...n})));
      }
    } else {
      setSelectedDeptInfo(null);
      setStaticContent({});
      setDraftNewsletters([]);
      setDraftMagazines([]);
    }
  }, [selectedDeptId, departments, newsletters]);

  const toggleSection = (id: string) => setActiveSection(prev => prev === id ? null : id);

  const handleStaticUpdate = (updates: any) => {
    setStaticContent((prev: any) => ({ ...prev, ...updates }));
  };

  const handleDynamicItemAdd = (type: 'newsletter' | 'magazine') => {
    const newItem = { title: '', type, departmentId: selectedDeptId!, edited: true };
    if (type === 'newsletter') setDraftNewsletters(prev => [...prev, newItem]);
    else setDraftMagazines(prev => [...prev, newItem]);
  };

  const handleDynamicItemUpdate = (type: 'newsletter' | 'magazine', index: number, updates: any) => {
    if (type === 'newsletter') {
      const arr = [...draftNewsletters];
      arr[index] = { ...arr[index], ...updates, edited: true };
      setDraftNewsletters(arr);
    } else {
      const arr = [...draftMagazines];
      arr[index] = { ...arr[index], ...updates, edited: true };
      setDraftMagazines(arr);
    }
  };

  const handleDynamicItemRemove = (type: 'newsletter' | 'magazine', index: number) => {
    if (type === 'newsletter') {
      const arr = [...draftNewsletters];
      if (arr[index].id) arr[index].deleted = true; // Mark for DB deletion
      else arr.splice(index, 1); // Just remove from draft
      setDraftNewsletters(arr);
    } else {
      const arr = [...draftMagazines];
      if (arr[index].id) arr[index].deleted = true;
      else arr.splice(index, 1);
      setDraftMagazines(arr);
    }
  };

  const handleSave = async () => {
    if (!selectedDeptId || !selectedDeptInfo) return;
    setSaving(true);
    let errorCount = 0;

    // 1. Save Static Structure to Department API
    try {
      const updatedDept = {
        ...selectedDeptInfo,
        content: {
          ...selectedDeptInfo.content,
          newsletterMagazineSection: staticContent
        }
      };
      await departmentApi.update(selectedDeptId, updatedDept);
      
      // Update local departments list so subsequent clicks don't reset
      setDepartments(prev => prev.map(d => d.id === selectedDeptId ? updatedDept : d));
    } catch (e) {
      console.error(e);
      errorCount++;
    }

    // 2. Save Dynamic Files to Newsletter API
    const processItems = async (items: any[]) => {
      for (const item of items) {
        if (item.deleted && item.id) {
          try { await newsletterApi.delete(item.id); } catch (e) { errorCount++; }
        } else if (item.edited) {
          const payload = {
            title: item.title,
            description: item.title, // use title as description
            departmentId: selectedDeptId,
            type: item.type,
            pdf: item.file
          };
          try {
            if (item.id) {
              await newsletterApi.update(item.id, { ...payload, existingPdf: item.pdf } as any);
            } else {
              if (!item.file) continue; // Must have file for new
              await newsletterApi.create(payload as any);
            }
          } catch (e) {
            console.error(e);
            errorCount++;
          }
        }
      }
    };

    await processItems(draftNewsletters);
    await processItems(draftMagazines);

    if (errorCount === 0) {
      setToast({ message: 'Saved successfully', type: 'success' });
      // Refresh dynamic items
      const res = await newsletterApi.list();
      setNewsletters(res.data);
    } else {
      setToast({ message: 'Saved with some errors. Check inputs.', type: 'error' });
    }
    setSaving(false);
  };

  return (
    <div className="space-y-10 pb-12">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
      `}</style>

      <PageEditorHeader
        title="Department Newsletters & Magazines"
        description="Select a department to manage its centralized newsletter sections, magazines, and editorial details."
        onSave={handleSave}
        isSaving={saving}
        saveLabel="Save Configuration"
        showBackButton
        onBack={() => window.history.back()}
      />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-10 h-10 border-4 border-slate-100 border-t-[#1e293b] rounded-full animate-spin" />
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Loading...</p>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Department Selector */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Select Department Context *</label>
            <div className="relative">
              <select
                value={selectedDeptId || ''}
                onChange={(e) => setSelectedDeptId(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#1e293b] focus:border-transparent font-bold text-sm shadow-inner transition-all"
              >
                <option value="" disabled>Choose a department to configure...</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          {!selectedDeptId ? (
            <div className="text-center py-24 bg-white rounded-3xl border border-slate-100">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H14" /></svg>
              </div>
              <h3 className="text-lg font-extrabold text-slate-700 mb-2">No Department Selected</h3>
              <p className="text-slate-400 text-sm font-medium">Please select a department above to manage its newsletters and magazines.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Dynamic Newsletters & Magazines (replaces the JSON list items) */}
              <AdminFormSection
                title="Newsletters & Magazines (PDFs)"
                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                isOpen={activeSection === 'dynamic-newsletters'}
                onToggle={() => toggleSection('dynamic-newsletters')}
              >
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {/* Newsletters Column */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-sm font-bold text-slate-700">Newsletter PDF Buttons</h4>
                      <button
                        type="button"
                        onClick={() => handleDynamicItemAdd('newsletter')}
                        className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-xl text-[10px] font-bold hover:bg-emerald-100 transition-all border border-emerald-100"
                      >
                        <PlusIcon /> Add
                      </button>
                    </div>
                    <div className="space-y-3">
                      {draftNewsletters.map((item, i) => {
                        if (item.deleted) return null;
                        return (
                          <div key={`n-${i}`} className="bg-white p-3 rounded-xl border border-slate-200 relative group/row">
                            <input
                              type="text"
                              placeholder="Button Name (e.g. NEWSLETTER 2024-25)"
                              value={item.title || ''}
                              onChange={e => handleDynamicItemUpdate('newsletter', i, { title: e.target.value })}
                              maxLength={newsletterMagazineLimits.pdfButtonLabel}
                              className="w-full bg-white border-0 ring-1 ring-slate-200/50 focus:ring-2 focus:ring-emerald-500 rounded-xl px-3 py-2.5 text-xs font-bold outline-none"
                            />
                            <div className="mt-2">
                              <FileUpload
                                label="PDF File"
                                id={`newsletter-pdf-${i}`}
                                value={item.file || item.pdf || ''}
                                onChange={f => handleDynamicItemUpdate('newsletter', i, { file: f })}
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => handleDynamicItemRemove('newsletter', i)}
                              className="absolute -top-2 -right-2 w-7 h-7 bg-red-100 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all shadow-md"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Magazines Column */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-sm font-bold text-slate-700">Magazine PDF Buttons</h4>
                      <button
                        type="button"
                        onClick={() => handleDynamicItemAdd('magazine')}
                        className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-xl text-[10px] font-bold hover:bg-indigo-100 transition-all border border-indigo-100"
                      >
                        <PlusIcon /> Add
                      </button>
                    </div>
                    <div className="space-y-3">
                      {draftMagazines.map((item, i) => {
                        if (item.deleted) return null;
                        return (
                          <div key={`m-${i}`} className="bg-white p-3 rounded-xl border border-slate-200 relative group/row">
                            <input
                              type="text"
                              placeholder="Button Name (e.g. MAGAZINE 2024-25)"
                              value={item.title || ''}
                              onChange={e => handleDynamicItemUpdate('magazine', i, { title: e.target.value })}
                              maxLength={newsletterMagazineLimits.pdfButtonLabel}
                              className="w-full bg-white border-0 ring-1 ring-slate-200/50 focus:ring-2 focus:ring-indigo-500 rounded-xl px-3 py-2.5 text-xs font-bold outline-none"
                            />
                            <div className="mt-2">
                              <FileUpload
                                label="PDF File"
                                id={`magazine-pdf-${i}`}
                                value={item.file || item.pdf || ''}
                                onChange={f => handleDynamicItemUpdate('magazine', i, { file: f })}
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => handleDynamicItemRemove('magazine', i)}
                              className="absolute -top-2 -right-2 w-7 h-7 bg-red-100 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all shadow-md"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </AdminFormSection>

              {/* Static Content (Committee, Staff, Table) */}
              <AdminFormSection
                title="Committee & Staff Section"
                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H14" /></svg>}
                isOpen={activeSection === 'static-content'}
                onToggle={() => toggleSection('static-content')}
              >
                <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Committee Details</label>
                    <textarea
                      value={staticContent.committeeDetails || ''}
                      onChange={e => handleStaticUpdate({ committeeDetails: e.target.value.slice(0, newsletterMagazineLimits.committeeDetails) })}
                      maxLength={newsletterMagazineLimits.committeeDetails}
                      rows={6}
                      placeholder="Write committee details content..."
                      className="w-full bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-emerald-500 rounded-2xl px-5 py-3.5 text-sm font-medium outline-none transition-all"
                    />
                    <p className="text-[11px] font-semibold text-slate-400 text-right">
                      {(staticContent.committeeDetails || '').length}/{newsletterMagazineLimits.committeeDetails}
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                    <h4 className="text-sm font-bold text-slate-700">Staff Incharge</h4>
                    <input
                      type="text"
                      placeholder="Professor Name"
                      value={staticContent.staffIncharge?.name || ''}
                      onChange={e => handleStaticUpdate({ staffIncharge: { ...staticContent.staffIncharge, name: e.target.value.slice(0, newsletterMagazineLimits.staffName) } })}
                      maxLength={newsletterMagazineLimits.staffName}
                      className="w-full bg-white border-0 ring-1 ring-slate-200/50 focus:ring-2 focus:ring-indigo-500 rounded-xl px-3 py-2.5 text-xs font-bold outline-none"
                    />
                    <ImageUpload
                      label="Professor Image"
                      id="staff-image"
                      value={staticContent.staffIncharge?.image || ''}
                      onChange={f => handleStaticUpdate({ staffIncharge: { ...staticContent.staffIncharge, image: f } })}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="email"
                        placeholder="Email ID"
                        value={staticContent.staffIncharge?.email || ''}
                        onChange={e => handleStaticUpdate({ staffIncharge: { ...staticContent.staffIncharge, email: e.target.value.slice(0, newsletterMagazineLimits.email) } })}
                        maxLength={newsletterMagazineLimits.email}
                        className="w-full bg-white border-0 ring-1 ring-slate-200/50 focus:ring-2 focus:ring-indigo-500 rounded-xl px-3 py-2.5 text-xs font-medium outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Phone Number"
                        value={staticContent.staffIncharge?.phone || ''}
                        onChange={e => handleStaticUpdate({ staffIncharge: { ...staticContent.staffIncharge, phone: e.target.value.slice(0, newsletterMagazineLimits.phone) } })}
                        maxLength={newsletterMagazineLimits.phone}
                        className="w-full bg-white border-0 ring-1 ring-slate-200/50 focus:ring-2 focus:ring-indigo-500 rounded-xl px-3 py-2.5 text-xs font-medium outline-none"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                    <h4 className="text-sm font-bold text-slate-700">Table Content</h4>
                    <input
                      type="text"
                      placeholder="Table Name (e.g. ITECH Editorial Committee)"
                      value={staticContent.tableTitle || ''}
                      onChange={e => handleStaticUpdate({ tableTitle: e.target.value.slice(0, newsletterMagazineLimits.tableTitle) })}
                      maxLength={newsletterMagazineLimits.tableTitle}
                      className="w-full bg-white border-0 ring-1 ring-slate-200/50 focus:ring-2 focus:ring-indigo-500 rounded-xl px-3 py-2.5 text-xs font-bold outline-none"
                    />
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleStaticUpdate({ tableRows: [...(staticContent.tableRows || []), { post: '', name: '' }] })}
                        className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 px-3 py-1.5 rounded-xl text-[10px] font-bold hover:bg-slate-200 transition-all border border-slate-200"
                      >
                        <PlusIcon /> Add Row
                      </button>
                    </div>
                    <div className="space-y-3">
                      {(staticContent.tableRows || []).map((row: any, i: number) => (
                        <div key={`table-row-${i}`} className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-white p-3 rounded-xl border border-slate-200 relative group/row">
                          <input
                            type="text"
                            placeholder="Post"
                            value={row.post || ''}
                            onChange={e => {
                              const arr = [...staticContent.tableRows];
                              arr[i] = { ...arr[i], post: e.target.value.slice(0, newsletterMagazineLimits.tablePost) };
                              handleStaticUpdate({ tableRows: arr });
                            }}
                            maxLength={newsletterMagazineLimits.tablePost}
                            className="w-full bg-white border-0 ring-1 ring-slate-200/50 focus:ring-2 focus:ring-slate-500 rounded-xl px-3 py-2.5 text-xs font-bold outline-none"
                          />
                          <input
                            type="text"
                            placeholder="Name"
                            value={row.name || ''}
                            onChange={e => {
                              const arr = [...staticContent.tableRows];
                              arr[i] = { ...arr[i], name: e.target.value.slice(0, newsletterMagazineLimits.tableName) };
                              handleStaticUpdate({ tableRows: arr });
                            }}
                            maxLength={newsletterMagazineLimits.tableName}
                            className="w-full bg-white border-0 ring-1 ring-slate-200/50 focus:ring-2 focus:ring-slate-500 rounded-xl px-3 py-2.5 text-xs font-medium outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const arr = [...staticContent.tableRows];
                              arr.splice(i, 1);
                              handleStaticUpdate({ tableRows: arr });
                            }}
                            className="absolute -top-2 -right-2 w-7 h-7 bg-red-100 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all shadow-md"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AdminFormSection>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DepartmentNewsletter;
