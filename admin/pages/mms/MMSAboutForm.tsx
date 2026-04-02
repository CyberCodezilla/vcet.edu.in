import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronDown, ChevronUp, Plus, Trash2, Image as ImageIcon, CheckCircle, AlertTriangle } from 'lucide-react';
import type { MMSAboutPayload } from '../../types';
import { mmsAboutApi } from '../../api/mmsAboutApi';
import { resolveApiUrl } from '../../api/client';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';

const emptyForm: MMSAboutPayload = {
  aboutMMS: { description: '', image: null },
  principalDesk: { message: '', photo: null },
  hodDesk: { message: '', photo: null },
  faculty: [],
  dabMembers: []
};

const MMSAboutForm: React.FC = () => {
  const navigate = useNavigate();
  const { section } = useParams<{ section: string }>();
  const [form, setForm] = useState<MMSAboutPayload>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');


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
    <div className="max-w-4xl mx-auto space-y-8 pb-12 animate-fade-in relative">
      <PageEditorHeader
        title={
          section === 'overview' ? 'About MMS' :
          section === 'principal' ? "Principal's Desk" :
          section === 'hod' ? "HOD's Desk" :
          section === 'faculty' ? 'MMS Faculty' :
          section === 'dab' ? 'Advisory Board (DAB)' : 'MMS About'
        }
        description="About Us Editor"
        onSave={() => {
          void handleSave();
        }}
        isSaving={saving}
        showBackButton
        onBack={() => navigate('/admin/pages/mms')}
      />

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-xl px-5 py-4 text-sm text-red-600 font-medium flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" /> {error}
        </div>
      )}
      
      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-5 py-4 text-sm text-emerald-600 font-medium flex items-center gap-3">
          <CheckCircle className="w-5 h-5 flex-shrink-0" /> {successMsg}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-4">

        {/* SECTION 1: ABOUT MMS */}
        {section === 'overview' && (
          <SectionCard title="ABOUT MMS" icon="📝">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1">
               <label className="admin-label">Section Image</label>
               <ImageUploader 
                 image={form.aboutMMS?.image} 
                 onChange={(f) => setForm({...form, aboutMMS: {...form.aboutMMS!, image: f}})} 
               />
               <p className="text-[10px] text-slate-400 mt-2 text-center">Max 1 Image</p>
            </div>
            <div className="col-span-1 md:col-span-2 relative">
               <label className="admin-label">Description Text <span className="text-slate-400 normal-case">({form.aboutMMS?.description?.length || 0}/1200)</span></label>
               <textarea 
                  className="admin-input-small h-48 resize-none" 
                  placeholder="Enter detailed description here... (max 1200 chars)"
                  value={form.aboutMMS?.description || ''}
                  onChange={e => handleTextChange(e.target.value, 1200, val => {
                    setForm({...form, aboutMMS: {...form.aboutMMS!, description: val}});
                  })}
               />
            </div>
          </div>
        </SectionCard>
        )}

        {/* SECTION 2: PRINCIPAL'S DESK */}
        {section === 'principal' && (
        <SectionCard title="PRINCIPAL'S DESK" icon="👤">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 border-r border-slate-100 pr-4">
               <label className="admin-label">Principal Photo</label>
               <ImageUploader 
                 image={form.principalDesk?.photo} 
                 onChange={(f) => setForm({...form, principalDesk: {...form.principalDesk!, photo: f}})} 
               />
            </div>
            <div className="col-span-1 md:col-span-2 relative">
               <label className="admin-label">Message <span className="text-slate-400 normal-case">({form.principalDesk?.message?.length || 0}/1500)</span></label>
               <textarea 
                  className="admin-input-small h-48 resize-none" 
                  placeholder="Principal's message... (max 1500 chars)"
                  value={form.principalDesk?.message || ''}
                  onChange={e => handleTextChange(e.target.value, 1500, val => {
                    setForm({...form, principalDesk: {...form.principalDesk!, message: val}});
                  })}
               />
            </div>
          </div>
        </SectionCard>
        )}

        {/* SECTION 3: HOD'S DESK */}
        {section === 'hod' && (
        <SectionCard title="HOD'S DESK" icon="👤">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 border-r border-slate-100 pr-4">
               <label className="admin-label">HOD Photo</label>
               <ImageUploader 
                 image={form.hodDesk?.photo} 
                 onChange={(f) => setForm({...form, hodDesk: {...form.hodDesk!, photo: f}})} 
               />
            </div>
            <div className="col-span-1 md:col-span-2 relative">
               <label className="admin-label">Message <span className="text-slate-400 normal-case">({form.hodDesk?.message?.length || 0}/1500)</span></label>
               <textarea 
                  className="admin-input-small h-48 resize-none" 
                  placeholder="HOD's message... (max 1500 chars)" 
                  value={form.hodDesk?.message || ''}
                  onChange={e => handleTextChange(e.target.value, 1500, val => {
                    setForm({...form, hodDesk: {...form.hodDesk!, message: val}});
                  })}
               />
            </div>
          </div>
        </SectionCard>
        )}

        {/* SECTION 4: MMS FACULTY */}
        {section === 'faculty' && (
        <SectionCard title={`MMS FACULTY (${form.faculty?.length || 0})`} icon="👥">
          <p className="text-xs text-slate-500 mb-4 font-medium">Add faculty members.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {form.faculty?.map((member, i) => (
              <div key={i} className="flex gap-4 p-4 border border-slate-200 rounded-xl bg-slate-50 relative">
                {true && (
                   <button type="button" onClick={() => {
                     const c = [...form.faculty!]; c.splice(i, 1); setForm({...form, faculty: c});
                   }} className="absolute top-2 right-2 text-red-500 p-1 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4"/></button>
                )}
                <div className="w-20 shrink-0">
                  <ImageUploader 
                    image={member.photo} 
                    onChange={f => { const c = [...form.faculty!]; c[i].photo = f; setForm({...form, faculty: c}); }} 
                    compact
                  />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="relative">
                     <label className="admin-label">Name <span className="text-slate-400 normal-case">({member.name.length}/40)</span></label>
                     <input className="admin-input-small font-bold" value={member.name} onChange={e => handleTextChange(e.target.value, 40, val => {
                         const c = [...form.faculty!]; c[i].name = val; setForm({...form, faculty: c});
                     })}/>
                  </div>
                  <div className="relative">
                     <label className="admin-label">Designation <span className="text-slate-400 normal-case">({member.designation.length}/60)</span></label>
                     <input className="admin-input-small text-slate-600" value={member.designation} onChange={e => handleTextChange(e.target.value, 60, val => {
                         const c = [...form.faculty!]; c[i].designation = val; setForm({...form, faculty: c});
                     })}/>
                  </div>
                  <div className="relative">
                     <label className="admin-label">Email <span className="text-slate-400 normal-case">({member.email?.length || 0}/50)</span></label>
                     <input className="admin-input-small text-[#2563EB] font-medium" type="email" value={member.email || ''} onChange={e => handleTextChange(e.target.value, 50, val => {
                         const c = [...form.faculty!]; c[i].email = val; setForm({...form, faculty: c});
                     })}/>
                  </div>

                </div>
              </div>
            ))}
            {true && (
              <button type="button" onClick={() => setForm({...form, faculty: [...(form.faculty||[]), {name: '', designation: '', email: '', photo: null}]})} className="btn-add min-h-[120px]">
                <Plus className="w-5 h-5 mx-auto mb-1" /> Add Faculty Member
              </button>
            )}
          </div>
        </SectionCard>
        )}

        {/* SECTION 5: DEPARTMENTAL ADVISORY BOARD */}
        {section === 'dab' && (
        <SectionCard title={`DEPARTMENTAL ADVISORY BOARD (DAB) ()`} icon="👔">
          <p className="text-xs text-slate-500 mb-4 font-medium">Add members of the DAB.</p>
          <div className="space-y-3">
             {form.dabMembers?.map((member, i) => (
                <div key={i} className="flex gap-2 p-3 bg-white border border-slate-200 rounded-xl relative">
                   <div className="w-8 flex items-center justify-center border-r border-slate-100 font-bold text-slate-400 text-sm">
                      #{i+1}
                   </div>
                   <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-3 px-2">
                      <div className="relative">
                        <label className="admin-label">Name (Max 40)</label>
                        <input className="admin-input-small" placeholder="Name" value={member.name} onChange={e => handleTextChange(e.target.value, 40, val => {
                           const c = [...form.dabMembers!]; c[i].name = val; setForm({...form, dabMembers: c});
                        })}/>
                      </div>
                      <div className="relative">
                        <label className="admin-label">Designation (Max 60)</label>
                        <input className="admin-input-small" placeholder="Designation" value={member.designation} onChange={e => handleTextChange(e.target.value, 60, val => {
                           const c = [...form.dabMembers!]; c[i].designation = val; setForm({...form, dabMembers: c});
                        })}/>
                      </div>
                      <div className="relative">
                        <label className="admin-label">Organization (Max 70)</label>
                        <input className="admin-input-small" placeholder="Organization" value={member.organization} onChange={e => handleTextChange(e.target.value, 70, val => {
                           const c = [...form.dabMembers!]; c[i].organization = val; setForm({...form, dabMembers: c});
                        })}/>
                      </div>
                      <div className="relative">
                        <label className="admin-label">Role in DAB (Max 30)</label>
                        <input className="admin-input-small" placeholder="e.g. Chairman" value={member.role} onChange={e => handleTextChange(e.target.value, 30, val => {
                           const c = [...form.dabMembers!]; c[i].role = val; setForm({...form, dabMembers: c});
                        })}/>
                      </div>
                   </div>
                   
                   {true && (
                     <button type="button" onClick={() => {
                        const c = [...form.dabMembers!]; c.splice(i, 1); setForm({...form, dabMembers: c});
                     }} className="text-red-500 hover:bg-red-50 p-2 rounded-lg flex items-center justify-center shrink-0">
                       <Trash2 className="w-4 h-4"/>
                     </button>
                   )}
                </div>
             ))}
             {true && (
              <button type="button" onClick={() => setForm({...form, dabMembers: [...(form.dabMembers||[]), {srNo: (form.dabMembers?.length || 0)+1, name: '', designation: '', organization: '', role: ''}]})} className="btn-add">
                <Plus className="w-4 h-4" /> Add Row
              </button>
            )}
          </div>
        </SectionCard>
        )}

      </form>
      
      <style>{`
        .admin-input-small {
          width: 100%; bg-slate-50; border: 1px solid #e2e8f0; border-radius: 0.5rem; padding: 0.5rem 0.75rem; 
          color: #0f172a; font-size: 0.75rem; font-weight: 500; outline: none; transition: 0.2s;
        }
        .admin-input-small:focus { border-color: #2563EB; background: #fff; box-shadow: 0 0 0 2px rgba(37,99,235, 0.1); }
        .admin-label { display: block; font-size: 0.65rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem; }
        .btn-add { display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; border: 2px dashed #cbd5e1; border-radius: 0.75rem; padding: 0.75rem; font-size: 0.75rem; font-weight: bold; color: #64748b; background: white; transition: 0.2s; cursor: pointer; }
        .btn-add:hover { border-color: #2563EB; color: #2563EB; background: #eff6ff; }
      `}</style>
    </div>
  );
};

// --- Helper Components --- //

const SectionCard: React.FC<{ title: string; icon: string; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-white rounded-[2rem] shadow-lg shadow-slate-200/40 border border-slate-100 overflow-hidden">
    <div className="px-8 py-5 border-b border-slate-100 flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">{icon}</div>
      <h3 className="text-sm font-extrabold text-[#111827] uppercase tracking-wider">{title}</h3>
    </div>
    <div className="p-8 space-y-6">{children}</div>
  </div>
);

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
        <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={e => {
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
