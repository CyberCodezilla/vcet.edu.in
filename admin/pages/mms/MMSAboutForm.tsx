import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Image as ImageIcon, CheckCircle, AlertTriangle } from 'lucide-react';
import type { MMSAboutPayload } from '../../types';
import { mmsAboutApi } from '../../api/mmsAboutApi';
import { resolveApiUrl } from '../../../services/api';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';
import { SortableListContext } from '../../components/SortableList';
import AdminFormSection from '../../components/AdminFormSection';

const inputBase = "w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all text-slate-700";
const labelBase = "block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1";

const emptyForm: MMSAboutPayload = {
  aboutMMS: { description: '', image: null },
  principalDesk: { message: '', photo: null },
  hodDesk: { message: '', photo: null },
  faculty: [],
  dabMembers: []
};

const MMSAboutForm: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<MMSAboutPayload>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [activeAccordionSection, setActiveAccordionSection] = useState<string | null>('overview');


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await mmsAboutApi.get();
      if (res.data) {
        setForm({ ...emptyForm, ...res.data });
      } else {
        // Pre-fill min limits for arrays if empty API response
        setForm({
          ...emptyForm,
          faculty: Array(5).fill({ name: '', designation: '', email: '', photo: null }),
          dabMembers: Array(5).fill({ srNo: 0, name: '', designation: '', organization: '', role: '' }).map((v, i) => ({...v, srNo: i + 1}))
        });
      }
    } catch (e) {
      console.warn("Could not fetch old data, assuming empty CMS state:", e);
      // Fallback with min forms
      setForm({
        ...emptyForm,
        faculty: Array(5).fill({ name: '', designation: '', email: '', photo: null }),
        dabMembers: Array(5).fill({ srNo: 0, name: '', designation: '', organization: '', role: '' }).map((v, i) => ({...v, srNo: i + 1}))
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setSaving(true);
    setError('');
    setSuccessMsg('');

    // Pre-save validation
    let validationError = '';
    const descLen = form.aboutMMS?.description?.length || 0;
    if (descLen < 1) validationError = `About MMS description must be at least 500 characters (Currently ${descLen}).`;
    
    const prinLen = form.principalDesk?.message?.length || 0;
    if (prinLen < 0) validationError = `Principal's Message must be at least 800 characters (Currently ${prinLen}).`;

    const hodLen = form.hodDesk?.message?.length || 0;
    if (hodLen < 0) validationError = `HOD's Message must be at least 800 characters (Currently ${hodLen}).`;

    

    

    if (validationError) {
       setError(validationError);
       setSaving(false);
       return;
    }

    try {
      await mmsAboutApi.update(form);
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

  const handleImageUpload = (file: File | null, setter: (f: File | null) => void) => {
    setter(file);
  };

  if (loading) {
     return <div className="p-10 text-center"><div className="w-8 h-8 border-4 border-slate-200 border-t-[#2563EB] rounded-full animate-spin mx-auto mb-4" />Loading Form...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 animate-fade-in relative pt-6">
      <PageEditorHeader
        title="MMS About Editor"
        description="Manage overview, Principal's and HOD's desk, faculty, and advisory board."
        onSave={() => {
          void handleSave();
        }}
        isSaving={saving}
        showBackButton
        onBack={() => navigate('/admin/pages/mms')}
      />

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-xl px-5 py-4 text-sm text-red-600 font-medium flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 shrink-0" /> {error}
        </div>
      )}
      
      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-5 py-4 text-sm text-emerald-600 font-medium flex items-center gap-3">
          <CheckCircle className="w-5 h-5 shrink-0" /> {successMsg}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-4">
        {/* SECTION 1: ABOUT MMS */}
        <AdminFormSection 
          title="1. Overview & About MMS" 
          icon="📝"
          isOpen={activeAccordionSection === 'overview'}
          onToggle={() => setActiveAccordionSection(activeAccordionSection === 'overview' ? null : 'overview')}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1">
               <label className={labelBase}>Section Image</label>
               <ImageUploader 
                 image={form.aboutMMS?.image} 
                 onChange={(f) => setForm({...form, aboutMMS: {...form.aboutMMS!, image: f}})} 
               />
            </div>
            <div className="col-span-1 md:col-span-2 relative">
               <label className={labelBase}>Description Text <span className="text-slate-400 normal-case font-medium">({form.aboutMMS?.description?.length || 0}/1200)</span></label>
               <textarea id="mmsaboutform-textarea-1" name="mmsaboutform-textarea-1" aria-label="mmsaboutform textarea field" 
                  className={inputBase + " h-48 resize-none"} 
                  placeholder="Enter detailed description here..."
                  value={form.aboutMMS?.description || ''}
                  onChange={e => handleTextChange(e.target.value, 1200, val => {
                    setForm({...form, aboutMMS: {...form.aboutMMS!, description: val}});
                  })}
               />
            </div>
          </div>
        </AdminFormSection>

        {/* SECTION 2: PRINCIPAL'S DESK */}
        <AdminFormSection 
          title="2. Principal's Desk" 
          icon="👤"
          isOpen={activeAccordionSection === 'principal'}
          onToggle={() => setActiveAccordionSection(activeAccordionSection === 'principal' ? null : 'principal')}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 border-r border-slate-100 pr-4">
               <label className={labelBase}>Principal Photo</label>
               <ImageUploader 
                 image={form.principalDesk?.photo} 
                 onChange={(f) => setForm({...form, principalDesk: {...form.principalDesk!, photo: f}})} 
               />
            </div>
            <div className="col-span-1 md:col-span-2 relative">
               <label className={labelBase}>Message <span className="text-slate-400 normal-case font-medium">({form.principalDesk?.message?.length || 0}/1500)</span></label>
               <textarea id="mmsaboutform-textarea-2" name="mmsaboutform-textarea-2" aria-label="mmsaboutform textarea field" 
                  className={inputBase + " h-48 resize-none"} 
                  placeholder="Principal's message..."
                  value={form.principalDesk?.message || ''}
                  onChange={e => handleTextChange(e.target.value, 1500, val => {
                    setForm({...form, principalDesk: {...form.principalDesk!, message: val}});
                  })}
               />
            </div>
          </div>
        </AdminFormSection>

        {/* SECTION 3: HOD'S DESK */}
        <AdminFormSection 
          title="3. HOD's Desk" 
          icon="👨‍🏫"
          isOpen={activeAccordionSection === 'hod'}
          onToggle={() => setActiveAccordionSection(activeAccordionSection === 'hod' ? null : 'hod')}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 border-r border-slate-100 pr-4">
               <label className={labelBase}>HOD Photo</label>
               <ImageUploader 
                 image={form.hodDesk?.photo} 
                 onChange={(f) => setForm({...form, hodDesk: {...form.hodDesk!, photo: f}})} 
               />
            </div>
            <div className="col-span-1 md:col-span-2 relative">
               <label className={labelBase}>Message <span className="text-slate-400 normal-case font-medium">({form.hodDesk?.message?.length || 0}/1500)</span></label>
               <textarea id="mmsaboutform-textarea-3" name="mmsaboutform-textarea-3" aria-label="mmsaboutform textarea field" 
                  className={inputBase + " h-48 resize-none"} 
                  placeholder="HOD's message..." 
                  value={form.hodDesk?.message || ''}
                  onChange={e => handleTextChange(e.target.value, 1500, val => {
                    setForm({...form, hodDesk: {...form.hodDesk!, message: val}});
                  })}
               />
            </div>
          </div>
        </AdminFormSection>

        {/* SECTION 4: MMS FACULTY */}
        <AdminFormSection 
          title={`4. MMS Faculty (${form.faculty?.length || 0})`} 
          icon="👥"
          isOpen={activeAccordionSection === 'faculty'}
          onToggle={() => setActiveAccordionSection(activeAccordionSection === 'faculty' ? null : 'faculty')}
        >
          <p className={labelBase + " text-slate-400! mb-4!"}>Add or manage faculty members.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SortableListContext
            items={form.faculty || []}
            onChange={val => setForm({ ...form, faculty: val })}
            renderItem={(member, i, id, dragHandleProps, setNodeRef, style, isDragging, actions) => (
              <div ref={setNodeRef} style={style} className={`flex gap-4 p-6 border border-slate-100 rounded-3xl bg-white relative transition-all ${isDragging ? 'shadow-2xl z-50 ring-4 ring-blue-50' : 'hover:shadow-lg shadow-sm border-slate-100'}`}>
                <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-300 hover:text-[#2563EB] transition-colors p-1 self-start mt-2" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                  <div className="w-5 h-0.5 bg-current mb-0.5 rounded-full" />
                  <div className="w-5 h-0.5 bg-current mb-0.5 rounded-full" />
                  <div className="w-5 h-0.5 bg-current rounded-full" />
                </div>
                <button type="button" onClick={() => {
                  const c = [...form.faculty!]; c.splice(i, 1); setForm({...form, faculty: c});
                }} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 p-2 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-4 h-4"/></button>
                <div className="w-24 shrink-0">
                  <ImageUploader 
                    image={member.photo} 
                    onChange={f => { const c = [...form.faculty!]; c[i].photo = f; setForm({...form, faculty: c}); }} 
                    compact
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="relative">
                     <label className={labelBase}>Name</label>
                     <input id={`mms-fac-name-${i}`} name={`mms-fac-name-${i}`} aria-label="mmsaboutform field" className={inputBase} value={member.name} placeholder="Faculty Name" onChange={e => handleTextChange(e.target.value, 40, val => {
                         const c = [...form.faculty!]; c[i].name = val; setForm({...form, faculty: c});
                     })}/>
                  </div>
                  <div className="relative">
                     <label className={labelBase}>Designation</label>
                     <input id={`mms-fac-desc-${i}`} name={`mms-fac-desc-${i}`} aria-label="mmsaboutform field" className={inputBase} value={member.designation} placeholder="e.g. Asst. Professor" onChange={e => handleTextChange(e.target.value, 60, val => {
                         const c = [...form.faculty!]; c[i].designation = val; setForm({...form, faculty: c});
                     })}/>
                  </div>
                  <div className="relative">
                     <label className={labelBase}>Email</label>
                     <input id={`mms-fac-mail-${i}`} name={`mms-fac-mail-${i}`} aria-label="mmsaboutform field" className={inputBase + " text-[#2563EB]"} type="email" value={member.email || ''} placeholder="email@vcet.edu.in" onChange={e => handleTextChange(e.target.value, 50, val => {
                         const c = [...form.faculty!]; c[i].email = val; setForm({...form, faculty: c});
                     })}/>
                  </div>
                </div>
              </div>
            )}
          />
              <button type="button" onClick={() => setForm({...form, faculty: [...(form.faculty||[]), {name: '', designation: '', email: '', photo: null}]})} className="flex flex-col items-center justify-center gap-3 border-4 border-dashed border-slate-100 rounded-4xl p-10 hover:border-blue-400 hover:bg-blue-50/30 transition-all text-slate-300 hover:text-blue-500">
                <Plus className="w-8 h-8" /> 
                <span className="text-[10px] font-black uppercase tracking-widest">Add Faculty Member</span>
              </button>
          </div>
        </AdminFormSection>

        {/* SECTION 5: DEPARTMENTAL ADVISORY BOARD */}
        <AdminFormSection 
          title="5. Departmental Advisory Board (DAB)" 
          icon="👔"
          isOpen={activeAccordionSection === 'dab'}
          onToggle={() => setActiveAccordionSection(activeAccordionSection === 'dab' ? null : 'dab')}
        >
          <p className={labelBase + " text-slate-400! mb-4!"}>Manage the professional advisory board members.</p>
          <div className="space-y-4">
             <SortableListContext
                items={form.dabMembers || []}
                onChange={val => setForm({ ...form, dabMembers: val })}
                renderItem={(member, i, id, dragHandleProps, setNodeRef, style, isDragging, actions) => (
                  <div ref={setNodeRef} style={style} className={`flex gap-4 p-5 bg-white border border-slate-100 rounded-3xl relative transition-all ${isDragging ? 'shadow-2xl z-50 ring-4 ring-blue-50' : 'hover:shadow-md shadow-sm'}`}>
                    <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-200 hover:text-[#2563EB] transition-colors p-1 shrink-0 justify-center border-r border-slate-100 pr-3" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                      <div className="w-4 h-0.5 bg-current mb-0.5 rounded-full" />
                      <div className="w-4 h-0.5 bg-current mb-0.5 rounded-full" />
                      <div className="w-4 h-0.5 bg-current rounded-full" />
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                       <div className="relative">
                         <label className={labelBase}>Name</label>
                         <input id={`mms-dab-name-${i}`} name={`mms-dab-name-${i}`} aria-label="mmsaboutform field" className={inputBase} placeholder="Name" value={member.name} onChange={e => handleTextChange(e.target.value, 40, val => {
                            const c = [...form.dabMembers!]; c[i].name = val; setForm({...form, dabMembers: c});
                         })}/>
                       </div>
                       <div className="relative">
                         <label className={labelBase}>Designation</label>
                         <input id={`mms-dab-desig-${i}`} name={`mms-dab-desig-${i}`} aria-label="mmsaboutform field" className={inputBase} placeholder="Designation" value={member.designation} onChange={e => handleTextChange(e.target.value, 60, val => {
                            const c = [...form.dabMembers!]; c[i].designation = val; setForm({...form, dabMembers: c});
                         })}/>
                       </div>
                       <div className="relative">
                         <label className={labelBase}>Organization</label>
                         <input id={`mms-dab-org-${i}`} name={`mms-dab-org-${i}`} aria-label="mmsaboutform field" className={inputBase} placeholder="Organization" value={member.organization} onChange={e => handleTextChange(e.target.value, 70, val => {
                            const c = [...form.dabMembers!]; c[i].organization = val; setForm({...form, dabMembers: c});
                         })}/>
                       </div>
                       <div className="relative">
                         <label className={labelBase}>Role in DAB</label>
                         <input id={`mms-dab-role-${i}`} name={`mms-dab-role-${i}`} aria-label="mmsaboutform field" className={inputBase} placeholder="e.g. Chairman" value={member.role} onChange={e => handleTextChange(e.target.value, 30, val => {
                            const c = [...form.dabMembers!]; c[i].role = val; setForm({...form, dabMembers: c});
                         })}/>
                       </div>
                    </div>
                    
                    <button type="button" onClick={() => {
                       const c = [...form.dabMembers!]; c.splice(i, 1); setForm({...form, dabMembers: c});
                    }} className="text-slate-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-xl flex items-center justify-center shrink-0 self-center transition-all">
                      <Trash2 className="w-5 h-5"/>
                    </button>
                  </div>
                )}
             />
              <button type="button" onClick={() => setForm({...form, dabMembers: [...(form.dabMembers||[]), {srNo: (form.dabMembers?.length || 0)+1, name: '', designation: '', organization: '', role: ''}]})} className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-2xl p-4 text-slate-400 font-bold hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/30 transition-all uppercase tracking-widest text-[10px]">
                <Plus className="w-4 h-4" /> Add DAB Member
              </button>
          </div>
        </AdminFormSection>
      </form>
    </div>
  );
};

const ImageUploader = ({ image, onChange, compact = false }: { image: any, onChange: (f: File|null) => void, compact?: boolean }) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (image instanceof File) {
      const u = URL.createObjectURL(image);
      setPreview(u);
      return () => URL.revokeObjectURL(u);
    } else if (typeof image === 'string') {
        setPreview(resolveApiUrl(image));
      } else if (image && typeof image === 'object' && image.url) {
        setPreview(resolveApiUrl(image.url));      } else {
        setPreview(null);
      }
    }, [image]);

    return (
      <div className={`relative rounded-xl border-2 border-dashed ${preview ? 'border-blue-300' : 'border-slate-300'} bg-slate-50 overflow-hidden flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer group ${compact ? 'h-24' : 'h-48'}`}>
        <input id="mmsaboutform-8" name="mmsaboutform-8" aria-label="mmsaboutform field" type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={e => {
          if (e.target.files && e.target.files.length > 0) onChange(e.target.files[0]);
        }} />      {preview ? (
        <img src={preview} alt="preview" className="w-full h-full object-cover" />
      ) : (
        <div className="text-center p-4">
           <ImageIcon className={`mx-auto text-slate-300 group-hover:text-blue-400 transition-colors ${compact ? 'w-6 h-6 mb-1' : 'w-10 h-10 mb-2'}`} />
           {!compact && <span className="text-xs font-bold text-slate-400 block group-hover:text-blue-500 transition-colors">Upload Image</span>}
        </div>
      )}
    </div>
  );
};

export default MMSAboutForm;
