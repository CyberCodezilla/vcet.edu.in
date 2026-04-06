import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, CheckCircle, AlertTriangle, GripVertical } from 'lucide-react';
import type { TrainingPlacementPayload } from '../../types';
import { trainingPlacementApi } from '../../api/trainingPlacement';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';
import { SortableListContext } from '../../components/SortableList';
import AdminFormSection from '../../components/AdminFormSection';

const inputBase = "w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all text-slate-700";
const labelBase = "block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1";

const MMSOjtInternshipForm: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<TrainingPlacementPayload>({
    internshipList: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [activeAccordionSection, setActiveAccordionSection] = useState<string | null>('internships');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await trainingPlacementApi.get();
      if (res.data) {
        setForm(prev => ({
          ...prev,
          internshipList: res.data.internshipList || [],
        }));
      }
    } catch (e) {
      console.warn("Could not fetch old data:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setSaving(true);
    setError('');
    setSuccessMsg('');
    try {
      await trainingPlacementApi.update(form);
      setSuccessMsg('Changes saved successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleTextChange = (value: string, limit: number, setter: (val: string) => void) => {
    if (value.length <= limit) setter(value);
  };

  if (loading) {
    return <div className="p-10 text-center"><div className="w-8 h-8 border-4 border-slate-200 border-t-[#2563EB] rounded-full animate-spin mx-auto mb-4" />Loading Form...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-fade-in relative pt-6">
      <PageEditorHeader
        title="OJT & Internships"
        description="Manage the list of students and their OJT/Summer Internship placements."
        onSave={() => {
          void handleSave();
        }}
        isSaving={saving}
        showBackButton
        onBack={() => navigate('/admin/pages/mms')}
      />

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-xl px-5 py-4 text-sm text-red-600 font-medium flex items-center gap-3">
          <AlertTriangle className="w-5 h-5" /> {error}
        </div>
      )}
      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-5 py-4 text-sm text-emerald-600 font-medium flex items-center gap-3">
          <CheckCircle className="w-5 h-5" /> {successMsg}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-4">
        <AdminFormSection 
          title={`Internship Records (${form.internshipList?.length || 0}/45)`} 
          icon="📊"
          isOpen={activeAccordionSection === 'internships'}
          onToggle={() => setActiveAccordionSection(activeAccordionSection === 'internships' ? null : 'internships')}
        >
          <div className="space-y-4">
            <div className="overflow-hidden bg-white rounded-3xl border border-slate-100 shadow-sm overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 w-16 text-center">Drag</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 w-20 text-center">Sr.</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Student Name</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 w-32">Spec.</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Company</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 w-16 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <SortableListContext
                    items={form.internshipList || []}
                    onChange={val => setForm({ ...form, internshipList: val })}
                    renderItem={(item, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
                      <tr ref={setNodeRef} style={style} className={`transition-all ${isDragging ? 'z-50 bg-white shadow-2xl ring-4 ring-blue-50 relative' : 'hover:bg-slate-50/30'}`}>
                        <td className="px-6 py-4">
                          <div className="flex justify-center cursor-grab active:cursor-grabbing text-slate-200 hover:text-[#2563EB] transition-colors" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                            <GripVertical className="w-5 h-5" />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <input className={inputBase + " text-center px-2 py-1.5 h-10"} value={item.srNo} onChange={e => {
                            const c = [...form.internshipList!]; c[i].srNo = e.target.value; setForm({ ...form, internshipList: c });
                          }} />
                        </td>
                        <td className="px-6 py-4">
                          <input className={inputBase + " py-1.5 h-10"} value={item.studentName} placeholder="Student Name" onChange={e => handleTextChange(e.target.value, 50, val => {
                            const c = [...form.internshipList!]; c[i].studentName = val; setForm({ ...form, internshipList: c });
                          })} />
                        </td>
                        <td className="px-6 py-4">
                          <input className={inputBase + " py-1.5 h-10"} value={item.specialization} placeholder="Spec" onChange={e => handleTextChange(e.target.value, 15, val => {
                            const c = [...form.internshipList!]; c[i].specialization = val; setForm({ ...form, internshipList: c });
                          })} />
                        </td>
                        <td className="px-6 py-4">
                          <input className={inputBase + " py-1.5 h-10"} value={item.company} placeholder="Company Name" onChange={e => handleTextChange(e.target.value, 45, val => {
                            const c = [...form.internshipList!]; c[i].company = val; setForm({ ...form, internshipList: c });
                          })} />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button type="button" onClick={() => {
                            const c = [...form.internshipList!]; c.splice(i, 1); setForm({ ...form, internshipList: c });
                          }} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    )}
                  />
                </tbody>
              </table>
            </div>

            {(form.internshipList?.length || 0) < 45 && (
              <button type="button" onClick={() => setForm({ ...form, internshipList: [...(form.internshipList || []), { srNo: String((form.internshipList?.length || 0) + 1), studentName: '', specialization: '', company: '' }] })} className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-2xl p-4 text-slate-400 font-bold hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/30 transition-all uppercase tracking-widest text-[10px]">
                <Plus className="w-4 h-4" /> Add New Row
              </button>
            )}
          </div>
        </AdminFormSection>
      </form>
    </div>
  );
};

export default MMSOjtInternshipForm;
