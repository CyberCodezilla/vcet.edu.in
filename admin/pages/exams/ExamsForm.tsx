import React, { useState, useEffect } from 'react';
import { pagesApi } from '../../api/pagesApi';
import { ExamData, ExamPayload, AdmissionDocument as DocItem, SyllabusSection, ResultSection } from '../../types';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';
import { SortableListContext } from '../../components/SortableList';

const SectionCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-white border border-slate-200/60 rounded-5xl overflow-hidden shadow-sm transition-all hover:shadow-md">
    <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-4">
      <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#2563EB]">
        {icon}
      </div>
      <h2 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h2>
    </div>
    <div className="p-8">
      {children}
    </div>
  </div>
);

const inputBase = "w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all";
const labelBase = "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 ml-1";

export const DEPARTMENTS = [
  "Artificial Intelligence and Data Science",
  "Computer Engineering",
  "Information Technology",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electronics and Telecommunication Engineering",
  "Instrumentation Engineering",
  "Computer Science and Engineering (Data Science)",
  "Applied Science and Humanities (First Year)"
];

const DocumentListManager: React.FC<{
  items: DocItem[];
  onChange: (items: DocItem[]) => void;
  type: string;
}> = ({ items, onChange, type }) => {
  const addItem = () => {
    onChange([...(items || []), { title: '', description: '', year: '2024-25', category: '', fileUrl: null, fileName: null }]);
  };

  const removeItem = (idx: number) => {
    onChange(items.filter((_, i) => i !== idx));
  };

  const updateItem = (idx: number, updates: Partial<DocItem & { file?: File | null }>) => {
    const newItems = [...items];
    newItems[idx] = { ...newItems[idx], ...updates };
    onChange(newItems);
  };

  return (
    <div className="space-y-4">
      <SortableListContext
        items={items}
        onChange={onChange}
        renderItem={(item, idx, id, dragHandleProps, setNodeRef, style, isDragging, actions) => (
          <div ref={setNodeRef} style={style} className="relative group flex items-start gap-6 bg-slate-50 border border-slate-200 rounded-4xl p-6 transition-all hover:shadow-md hover:border-slate-300">
            <div className="shrink-0 w-12 h-12 border-2 border-slate-200 rounded-xl flex items-center justify-center text-slate-400 font-black text-lg bg-white cursor-grab active:cursor-grabbing hover:bg-slate-50 hover:text-[#2563EB] transition-colors" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 8h16M4 16h16"/></svg>
            </div>
            
            <div className="grow space-y-4">
              <button 
                type="button" 
                onClick={() => removeItem(idx)}
                className="absolute -top-3 -right-3 w-8 h-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center shadow-md hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 z-20"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
  
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className={labelBase}>File Title / Label</label>
                  <input id={`examsform-doc-${idx}`} name={`examsform-doc-${idx}`} aria-label="examsform field" 
                    value={item.title} 
                    onChange={e => updateItem(idx, { title: e.target.value })}
                    className={inputBase}
                    placeholder={`e.g. ${type.charAt(0).toUpperCase() + type.slice(1)} Sem III Revised`}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="md:col-span-1">
                      <label className={labelBase}>Academic Year / Semester</label>
                      <input id={`examsform-year-${idx}`} name={`examsform-year-${idx}`} aria-label="examsform field" 
                        value={item.year} 
                        onChange={e => updateItem(idx, { year: e.target.value })}
                        className={inputBase}
                        placeholder="e.g. 2024-25 or Sem IV"
                      />
                   </div>
                   <div className="md:col-span-1">
                      <label className={labelBase}>PDF Document</label>
                      <div className="relative overflow-hidden bg-white border-2 border-dashed border-slate-200 rounded-2xl p-4 transition-all hover:border-[#2563EB]">
                        <input id={`examsform-file-${idx}`} name={`examsform-file-${idx}`} aria-label="examsform field" 
                          type="file" 
                          accept="application/pdf"
                          onChange={e => updateItem(idx, { file: e.target.files?.[0] || null })}
                          className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        />
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                          </div>
                          <div className="grow min-w-0">
                            <p className="text-sm font-medium text-slate-700 truncate">
                              {(item as any).file?.name || item.fileName || 'Click to upload PDF'}
                            </p>
                            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mt-0.5">PDF ONLY • MAX 10MB</p>
                          </div>
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}
      />

      <button
        type="button"
        onClick={addItem}
        className="w-full py-4 border-2 border-dashed border-slate-200 rounded-4xl text-slate-400 text-sm font-semibold hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-blue-50/50 transition-all flex items-center justify-center gap-2 group"
      >
        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
        </div>
        Add New Document
      </button>
    </div>
  );
};

const SyllabusSectionManager: React.FC<{
  sections: SyllabusSection[];
  onChange: (sections: SyllabusSection[]) => void;
}> = ({ sections, onChange }) => {
  const addSection = () => {
    onChange([...(sections || []), { department: '', documents: [] }]);
  };

  const removeSection = (idx: number) => {
    onChange(sections.filter((_, i) => i !== idx));
  };

  const updateSection = (idx: number, updates: Partial<SyllabusSection>) => {
    const newSections = [...sections];
    newSections[idx] = { ...newSections[idx], ...updates };
    onChange(newSections);
  };

  return (
    <div className="space-y-10">
      <SortableListContext
        items={sections}
        onChange={onChange}
        renderItem={(section, idx, id, dragHandleProps, setNodeRef, style, isDragging, actions) => (
          <div ref={setNodeRef} style={style} className="bg-slate-50/50 border border-slate-200 rounded-5xl p-8 space-y-6 relative group shadow-sm transition-all hover:shadow-md">
            <div className="absolute top-8 -left-6 flex items-center gap-2 cursor-grab active:cursor-grabbing text-slate-300 hover:text-[#2563EB] transition-colors" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
              <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8 9h8m-8 6h8"/></svg>
              </div>
            </div>

            <button 
              type="button" 
              onClick={() => removeSection(idx)}
              className="absolute top-6 right-6 w-10 h-10 bg-white text-red-500 rounded-2xl flex items-center justify-center shadow-sm hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
  
            <div className="max-w-2xl px-2">
              <label className={labelBase}>Department Name</label>
              <select id={`examsform-syllabus-select-${idx}`} name={`examsform-syllabus-select-${idx}`} aria-label="examsform select field" 
                value={section.department} 
                onChange={e => updateSection(idx, { department: e.target.value })}
                className={inputBase}
              >
                <option value="">Select Department</option>
                {DEPARTMENTS.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
  
            <div className="pt-4 px-2">
               <label className={labelBase + " mb-4"}>Departmental Documents</label>
               <DocumentListManager 
                 type="syllabus" 
                 items={section.documents || []} 
                 onChange={docs => updateSection(idx, { documents: docs })} 
               />
            </div>
          </div>
        )}
      />

      <button
        type="button"
        onClick={addSection}
        className="w-full py-6 border-2 border-dashed border-slate-200 rounded-5xl text-slate-400 text-sm font-bold hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-blue-50/50 transition-all flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
        Add New Department Section
      </button>
    </div>
  );
};

const ResultSectionManager: React.FC<{
  sections: ResultSection[];
  onChange: (sections: ResultSection[]) => void;
}> = ({ sections, onChange }) => {
  const addSection = () => {
    onChange([...(sections || []), { title: '', department: '', documents: [] }]);
  };

  const removeSection = (idx: number) => {
    onChange(sections.filter((_, i) => i !== idx));
  };

  const updateSection = (idx: number, updates: Partial<ResultSection>) => {
    const newSections = [...sections];
    newSections[idx] = { ...newSections[idx], ...updates };
    onChange(newSections);
  };

  return (
    <div className="space-y-10">
      <SortableListContext
        items={sections}
        onChange={onChange}
        renderItem={(section, idx, id, dragHandleProps, setNodeRef, style, isDragging, actions) => (
          <div ref={setNodeRef} style={style} className="bg-slate-50/50 border border-slate-200 rounded-5xl p-8 space-y-6 relative group shadow-sm transition-all hover:shadow-md">
            <div className="absolute top-8 -left-6 flex items-center gap-2 cursor-grab active:cursor-grabbing text-slate-300 hover:text-[#2563EB] transition-colors" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
              <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8 9h8m-8 6h8"/></svg>
              </div>
            </div>

            <button 
              type="button" 
              onClick={() => removeSection(idx)}
              className="absolute top-6 right-6 w-10 h-10 bg-white text-red-500 rounded-2xl flex items-center justify-center shadow-sm hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
              <div>
                <label className={labelBase}>Exam Month & Year</label>
                <input id={`examsform-result-title-${idx}`} name={`examsform-result-title-${idx}`} aria-label="examsform field" 
                  value={section.title} 
                  onChange={e => updateSection(idx, { title: e.target.value })}
                  className={inputBase}
                  placeholder="e.g. December 2021"
                />
              </div>
              <div>
                <label className={labelBase}>Department Name</label>
                <select id={`examsform-result-dept-select-${idx}`} name={`examsform-result-dept-select-${idx}`} aria-label="examsform select field" 
                  value={section.department} 
                  onChange={e => updateSection(idx, { department: e.target.value })}
                  className={inputBase}
                >
                  <option value="">Select Department</option>
                  {DEPARTMENTS.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>
  
            <div className="pt-4 px-2">
               <label className={labelBase + " mb-4"}>Result Documents</label>
               <DocumentListManager 
                 type="results" 
                 items={section.documents || []} 
                 onChange={docs => updateSection(idx, { documents: docs })} 
               />
            </div>
          </div>
        )}
      />

      <button
        type="button"
        onClick={addSection}
        className="w-full py-6 border-2 border-dashed border-slate-200 rounded-5xl text-slate-400 text-sm font-bold hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-blue-50/50 transition-all flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
        Add New Result Section (Period/Dept)
      </button>
    </div>
  );
};

interface ExamFormProps {
  activeSection?: string;
  onBack?: () => void;
}

const ExamsForm: React.FC<ExamFormProps> = ({ activeSection, onBack }) => {
  const [data, setData] = useState<ExamData | null>(null);
  const [payload, setPayload] = useState<ExamPayload>({
    syllabus: [],
    timetable: [],
    questionPapers: [],
    samplePapers: [],
    results: [],
    notices: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    pagesApi.exam.get()
      .then(res => {
        setData(res.data);
        setPayload({
          syllabus: Array.isArray(res.data?.syllabus) ? res.data.syllabus : [],
          timetable: Array.isArray(res.data?.timetable) ? res.data.timetable : [],
          questionPapers: Array.isArray(res.data?.questionPapers) ? res.data.questionPapers : [],
          samplePapers: Array.isArray(res.data?.samplePapers) ? res.data.samplePapers : [],
          results: Array.isArray(res.data?.results) ? res.data.results : [],
          notices: Array.isArray(res.data?.notices) ? res.data.notices : [],
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const saveChanges = async () => {
    setSaving(true);
    try {
      await pagesApi.exam.update(payload);
      alert('Exam page updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update Exam page.');
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveChanges();
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64 bg-white border border-slate-200/60 rounded-3xl animate-pulse">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-slate-500">Loading Exam Content...</p>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSave} className="mx-auto max-w-6xl space-y-8 px-4 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 sm:px-6 lg:px-8">
      <PageEditorHeader
        title="Exam Section Editor"
        description={`Manage ${activeSection ? activeSection.replace(/([A-Z])/g, ' $1').toLowerCase() : 'all examination'} related documents.`}
        onSave={saveChanges}
        isSaving={saving}
        showBackButton
        onBack={onBack}
      />

      <div className="space-y-8 pb-20">
        {/* Syllabus */}
        {(!activeSection || activeSection === 'syllabus') && (
          <SectionCard title="University Syllabus (Grouped by Dept)" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.253 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}>
            <SyllabusSectionManager 
              sections={payload.syllabus || []} 
              onChange={sections => setPayload(prev => ({ ...prev, syllabus: sections }))} 
            />
          </SectionCard>
        )}

        {/* Timetable */}
        {(!activeSection || activeSection === 'timetable') && (
          <SectionCard title="Exam Timetables" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}>
            <DocumentListManager 
              type="timetable" 
              items={payload.timetable || []} 
              onChange={items => setPayload(prev => ({ ...prev, timetable: items }))} 
            />
          </SectionCard>
        )}

        {/* Question Papers */}
        {(!activeSection || activeSection === 'questionPapers') && (
          <SectionCard title="University Question Papers" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}>
            <DocumentListManager 
              type="questionPapers" 
              items={payload.questionPapers || []} 
              onChange={items => setPayload(prev => ({ ...prev, questionPapers: items }))} 
            />
          </SectionCard>
        )}

        {/* Sample Papers */}
        {(!activeSection || activeSection === 'samplePapers') && (
          <SectionCard title="Sample Papers" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>}>
            <DocumentListManager 
              type="samplePapers" 
              items={payload.samplePapers || []} 
              onChange={items => setPayload(prev => ({ ...prev, samplePapers: items }))} 
            />
          </SectionCard>
        )}

        {/* Results */}
        {(!activeSection || activeSection === 'results') && (
          <SectionCard title="University Results (Grouped by Period/Dept)" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}>
            <ResultSectionManager 
              sections={payload.results || []} 
              onChange={sections => setPayload(prev => ({ ...prev, results: sections }))} 
            />
          </SectionCard>
        )}

        {/* Notices */}
        {(!activeSection || activeSection === 'notices') && (
          <SectionCard title="Exam Notices" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>}>
            <DocumentListManager 
              type="notices" 
              items={payload.notices || []} 
              onChange={items => setPayload(prev => ({ ...prev, notices: items }))} 
            />
          </SectionCard>
        )}
      </div>
    </form>
  );
};

export default ExamsForm;
