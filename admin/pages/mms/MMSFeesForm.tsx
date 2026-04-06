import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import type { MMSFeesPayload } from '../../types';
import { mmsFeesApi } from '../../api/mmsFeesApi';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';
import { SortableListContext } from '../../components/SortableList';
import AdminFormSection from '../../components/AdminFormSection';

const inputBase = "w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all text-slate-700";
const labelBase = "block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1";

const emptyForm: MMSFeesPayload = {
  overview: [],
  categoryDetails: { openFees: '', obcFeesMale: '', obcFeesFemale: '', sbcFees: '', scstFees: '' },
  concessionReq: { documents: '', formReq: '', portalLink: '' },
  offlinePayment: [],
  onlinePayment: [],
  transactionReq: { utrReq: '', mentionOnForm: 'No' },
  feePdf: []
};

const MMSFeesForm: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<MMSFeesPayload>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [activeSection, setActiveSection] = useState<string | null>('overview');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await mmsFeesApi.get();
      if (res.data) {
        setForm({ ...emptyForm, ...res.data });
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
      await mmsFeesApi.update(form);
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
        title="Fee Structure"
        description="Manage the fee structure and payment details for MMS admission."
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
        {/* SECTION 1: OVERVIEW */}
        <AdminFormSection title="1. Fees Overview" icon="📋" isOpen={activeSection === 'overview'} onToggle={() => setActiveSection(activeSection === 'overview' ? null : 'overview')}>
          <div className="space-y-4">
            <SortableListContext
              items={form.overview || []}
              onChange={val => setForm({ ...form, overview: val })}
              renderItem={(item, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
                <div ref={setNodeRef} style={style} className={`p-6 bg-white border border-slate-100 rounded-3xl relative shadow-sm hover:shadow-md transition-all ${isDragging ? 'shadow-xl z-50 ring-4 ring-blue-50 bg-white' : ''}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-200 hover:text-[#2563EB] transition-colors p-1" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                      <div className="w-5 h-0.5 bg-current mb-0.5 rounded-full" />
                      <div className="w-5 h-0.5 bg-current mb-0.5 rounded-full" />
                      <div className="w-5 h-0.5 bg-current rounded-full" />
                    </div>
                    <button type="button" onClick={() => {
                      const c = [...form.overview!]; c.splice(i, 1); setForm({...form, overview: c});
                    }} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"><Trash2 className="w-4 h-4"/></button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    <div className="relative">
                      <label className={labelBase}>Category Name</label>
                      <input id={`mms-fees-overview-cat-${i}`} name={`mms-fees-overview-cat-${i}`} aria-label="mmsfeesform field" className={inputBase} value={item.categoryName} placeholder="e.g. Open Category" onChange={e => handleTextChange(e.target.value, 100, val => {
                        const c = [...form.overview!]; c[i].categoryName = val; setForm({...form, overview: c});
                      })}/>
                    </div>
                    <div className="relative">
                      <label className={labelBase}>Student Type</label>
                      <input id={`mms-fees-overview-type-${i}`} name={`mms-fees-overview-type-${i}`} aria-label="mmsfeesform field" className={inputBase} value={item.studentType} placeholder="e.g. All" onChange={e => handleTextChange(e.target.value, 20, val => {
                        const c = [...form.overview!]; c[i].studentType = val; setForm({...form, overview: c});
                      })}/>
                    </div>
                    <div className="relative">
                      <label className={labelBase}>Fees Amount</label>
                      <input id={`mms-fees-overview-amount-${i}`} name={`mms-fees-overview-amount-${i}`} aria-label="mmsfeesform field" className={inputBase} value={item.amount} placeholder="e.g. ₹ 1,01,230" onChange={e => handleTextChange(e.target.value, 20, val => {
                        const c = [...form.overview!]; c[i].amount = val; setForm({...form, overview: c});
                      })}/>
                    </div>
                  </div>
                </div>
              )}
            />
            <button type="button" onClick={() => setForm({...form, overview: [...(form.overview||[]), {categoryName: '', studentType: '', amount: ''}]})} className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-2xl p-4 text-slate-400 font-bold hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/30 transition-all uppercase tracking-widest text-[10px]">
              <Plus className="w-4 h-4" /> Add Overview Category
            </button>
          </div>
        </AdminFormSection>

        {/* SECTION 2: CATEGORY DETAILS */}
        <AdminFormSection title="2. Category Fee Details" icon="💳" isOpen={activeSection === 'details'} onToggle={() => setActiveSection(activeSection === 'details' ? null : 'details')}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
            <div className="relative">
               <label className={labelBase}>Open Category Fees</label>
               <input id="mmsfeesform-4" name="mmsfeesform-4" aria-label="mmsfeesform field" className={inputBase} value={form.categoryDetails?.openFees || ''} onChange={e => handleTextChange(e.target.value, 50, val => {
                 setForm({...form, categoryDetails: {...form.categoryDetails!, openFees: val}});
               })}/>
            </div>
            <div className="relative">
               <label className={labelBase}>OBC/SEBC/EBC/EWS (Male)</label>
               <input id="mmsfeesform-5" name="mmsfeesform-5" aria-label="mmsfeesform field" className={inputBase} value={form.categoryDetails?.obcFeesMale || ''} onChange={e => handleTextChange(e.target.value, 50, val => {
                 setForm({...form, categoryDetails: {...form.categoryDetails!, obcFeesMale: val}});
               })}/>
            </div>
            <div className="relative">
               <label className={labelBase}>OBC/SEBC/EBC/EWS (Female)</label>
               <input id="mmsfeesform-6" name="mmsfeesform-6" aria-label="mmsfeesform field" className={inputBase} value={form.categoryDetails?.obcFeesFemale || ''} onChange={e => handleTextChange(e.target.value, 50, val => {
                 setForm({...form, categoryDetails: {...form.categoryDetails!, obcFeesFemale: val}});
               })}/>
            </div>
            <div className="relative">
               <label className={labelBase}>SBC/NT/DT/VJ/TFWS</label>
               <input id="mmsfeesform-7" name="mmsfeesform-7" aria-label="mmsfeesform field" className={inputBase} value={form.categoryDetails?.sbcFees || ''} onChange={e => handleTextChange(e.target.value, 50, val => {
                 setForm({...form, categoryDetails: {...form.categoryDetails!, sbcFees: val}});
               })}/>
            </div>
            <div className="relative md:col-span-2">
               <label className={labelBase}>SC/ST Fees</label>
               <input id="mmsfeesform-8" name="mmsfeesform-8" aria-label="mmsfeesform field" className={inputBase} value={form.categoryDetails?.scstFees || ''} onChange={e => handleTextChange(e.target.value, 50, val => {
                 setForm({...form, categoryDetails: {...form.categoryDetails!, scstFees: val}});
               })}/>
            </div>
          </div>
        </AdminFormSection>

        {/* SECTION 3: CONCESSION REQ */}
        <AdminFormSection title="3. Fee Concession Requirements" icon="💎" isOpen={activeSection === 'concession'} onToggle={() => setActiveSection(activeSection === 'concession' ? null : 'concession')}>
          <div className="grid grid-cols-1 gap-6 p-2">
            <div className="relative">
               <label className={labelBase}>Required Documents</label>
               <textarea id="mmsfeesform-textarea-2" name="mmsfeesform-textarea-2" aria-label="mmsfeesform textarea field" rows={2} className={inputBase} value={form.concessionReq?.documents || ''} onChange={e => handleTextChange(e.target.value, 150, val => {
                 setForm({...form, concessionReq: {...form.concessionReq!, documents: val}});
               })}/>
            </div>
            <div className="relative">
               <label className={labelBase}>Scholarship Form</label>
               <textarea id="mmsfeesform-textarea-3" name="mmsfeesform-textarea-3" aria-label="mmsfeesform textarea field" rows={2} className={inputBase} value={form.concessionReq?.formReq || ''} onChange={e => handleTextChange(e.target.value, 150, val => {
                 setForm({...form, concessionReq: {...form.concessionReq!, formReq: val}});
               })}/>
            </div>
            <div className="relative">
               <label className={labelBase}>Portal Link</label>
               <input id="mmsfeesform-textarea-4" name="mmsfeesform-textarea-4" aria-label="mmsfeesform field" className={inputBase} value={form.concessionReq?.portalLink || ''} onChange={e => handleTextChange(e.target.value, 150, val => {
                 setForm({...form, concessionReq: {...form.concessionReq!, portalLink: val}});
               })}/>
            </div>
          </div>
        </AdminFormSection>

        {/* SECTION 4: OFFLINE PAYMENT */}
        <AdminFormSection title="4. Payment Method (Offline)" icon="💵" isOpen={activeSection === 'offline'} onToggle={() => setActiveSection(activeSection === 'offline' ? null : 'offline')}>
          <div className="space-y-4">
            <SortableListContext
              items={form.offlinePayment || []}
              onChange={val => setForm({ ...form, offlinePayment: val })}
              renderItem={(item, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
                <div ref={setNodeRef} style={style} className={`p-6 bg-white border border-slate-100 rounded-3xl relative shadow-sm hover:shadow-md transition-all ${isDragging ? 'shadow-xl z-50 ring-4 ring-blue-50 bg-white' : ''}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-200 hover:text-[#2563EB] transition-colors p-1" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                      <div className="w-5 h-0.5 bg-current mb-0.5 rounded-full" />
                      <div className="w-5 h-0.5 bg-current mb-0.5 rounded-full" />
                      <div className="w-5 h-0.5 bg-current rounded-full" />
                    </div>
                    <button type="button" onClick={() => {
                      const c = [...form.offlinePayment!]; c.splice(i, 1); setForm({...form, offlinePayment: c});
                    }} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"><Trash2 className="w-4 h-4"/></button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="relative">
                      <label className={labelBase}>Mode</label>
                      <input className={inputBase} value={item.mode} placeholder="DD / Pay Order" onChange={e => handleTextChange(e.target.value, 50, val => {
                        const c = [...form.offlinePayment!]; c[i].mode = val; setForm({...form, offlinePayment: c});
                      })}/>
                    </div>
                    <div className="relative">
                      <label className={labelBase}>Payee Name</label>
                      <input className={inputBase} value={item.payeeName} placeholder="Favoring Name" onChange={e => handleTextChange(e.target.value, 120, val => {
                        const c = [...form.offlinePayment!]; c[i].payeeName = val; setForm({...form, offlinePayment: c});
                      })}/>
                    </div>
                    <div className="relative">
                      <label className={labelBase}>Location</label>
                      <input className={inputBase} value={item.location} placeholder="e.g. Vasai" onChange={e => handleTextChange(e.target.value, 50, val => {
                        const c = [...form.offlinePayment!]; c[i].location = val; setForm({...form, offlinePayment: c});
                      })}/>
                    </div>
                  </div>
                </div>
              )}
            />
            <button type="button" onClick={() => setForm({...form, offlinePayment: [...(form.offlinePayment||[]), {mode: '', payeeName: '', location: ''}]})} className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-2xl p-4 text-slate-400 font-bold hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/30 transition-all uppercase tracking-widest text-[10px]">
               <Plus className="w-4 h-4" /> Add Offline Method
            </button>
          </div>
        </AdminFormSection>

        {/* SECTION 5: ONLINE PAYMENT */}
        <AdminFormSection title="5. Payment Method (Online)" icon="🏦" isOpen={activeSection === 'online'} onToggle={() => setActiveSection(activeSection === 'online' ? null : 'online')}>
          <div className="space-y-4">
            <SortableListContext
              items={form.onlinePayment || []}
              onChange={val => setForm({ ...form, onlinePayment: val })}
              renderItem={(item, i, id, dragHandleProps, setNodeRef, style, isDragging) => (
                <div ref={setNodeRef} style={style} className={`p-6 bg-white border border-slate-100 rounded-3xl relative shadow-sm hover:shadow-md transition-all ${isDragging ? 'shadow-xl z-50 ring-4 ring-blue-50 bg-white' : ''}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col cursor-grab active:cursor-grabbing text-slate-200 hover:text-[#2563EB] transition-colors p-1" {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
                      <div className="w-5 h-0.5 bg-current mb-0.5 rounded-full" />
                      <div className="w-5 h-0.5 bg-current mb-0.5 rounded-full" />
                      <div className="w-5 h-0.5 bg-current rounded-full" />
                    </div>
                    <button type="button" onClick={() => {
                      const c = [...form.onlinePayment!]; c.splice(i, 1); setForm({...form, onlinePayment: c});
                    }} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"><Trash2 className="w-4 h-4"/></button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative md:col-span-2">
                      <label className={labelBase}>Bank Account Name</label>
                      <input className={inputBase} value={item.accountName} onChange={e => handleTextChange(e.target.value, 120, val => {
                        const c = [...form.onlinePayment!]; c[i].accountName = val; setForm({...form, onlinePayment: c});
                      })}/>
                    </div>
                    <div className="relative">
                      <label className={labelBase}>Bank Name</label>
                      <input className={inputBase} value={item.bankName} onChange={e => handleTextChange(e.target.value, 100, val => {
                        const c = [...form.onlinePayment!]; c[i].bankName = val; setForm({...form, onlinePayment: c});
                      })}/>
                    </div>
                    <div className="relative">
                      <label className={labelBase}>Account Number</label>
                      <input className={inputBase} value={item.accountNumber} onChange={e => handleTextChange(e.target.value, 30, val => {
                        const c = [...form.onlinePayment!]; c[i].accountNumber = val; setForm({...form, onlinePayment: c});
                      })}/>
                    </div>
                    <div className="relative">
                      <label className={labelBase}>Account Type</label>
                      <input className={inputBase} value={item.accountType} placeholder="Saving / Current" onChange={e => handleTextChange(e.target.value, 20, val => {
                        const c = [...form.onlinePayment!]; c[i].accountType = val; setForm({...form, onlinePayment: c});
                      })}/>
                    </div>
                    <div className="relative">
                      <label className={labelBase}>IFSC Code</label>
                      <input className={inputBase} value={item.ifsc} onChange={e => handleTextChange(e.target.value, 20, val => {
                        const c = [...form.onlinePayment!]; c[i].ifsc = val; setForm({...form, onlinePayment: c});
                      })}/>
                    </div>
                  </div>
                </div>
              )}
            />
            <button type="button" onClick={() => setForm({...form, onlinePayment: [...(form.onlinePayment||[]), {accountName: '', bankName: '', accountNumber: '', accountType: '', ifsc: ''}]})} className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-2xl p-4 text-slate-400 font-bold hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/30 transition-all uppercase tracking-widest text-[10px]">
                <Plus className="w-4 h-4" /> Add Online Account
            </button>
          </div>
        </AdminFormSection>

        {/* SECTION 6: TRANSACTION REQ */}
        <AdminFormSection title="6. Transaction Requirements" icon="📌" isOpen={activeSection === 'transaction'} onToggle={() => setActiveSection(activeSection === 'transaction' ? null : 'transaction')}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
            <div className="relative">
               <label className={labelBase}>UTR Requirement Detail</label>
               <input className={inputBase} value={form.transactionReq?.utrReq || ''} placeholder="e.g. Original UTR print out" onChange={e => handleTextChange(e.target.value, 100, val => {
                 setForm({...form, transactionReq: {...form.transactionReq!, utrReq: val}});
               })}/>
            </div>
            <div className="relative">
               <label className={labelBase}>Mention on Admission Form</label>
               <select className={inputBase} value={form.transactionReq?.mentionOnForm || 'No'} onChange={e => {
                 setForm({...form, transactionReq: {...form.transactionReq!, mentionOnForm: e.target.value}});
               }}>
                 <option value="Yes">Yes</option>
                 <option value="No">No</option>
               </select>
            </div>
          </div>
        </AdminFormSection>

        {/* SECTION 7: PDF SECTION */}
        <AdminFormSection title="7. Fee Details (PDF)" icon="📄" isOpen={activeSection === 'pdf'} onToggle={() => setActiveSection(activeSection === 'pdf' ? null : 'pdf')}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {form.feePdf?.map((pdfItem, i) => (
              <div key={i} className="p-6 bg-white border border-slate-100 rounded-3xl relative space-y-4 shadow-sm hover:shadow-md transition-all">
                <button type="button" onClick={() => {
                  const c = [...form.feePdf!]; c.splice(i, 1); setForm({...form, feePdf: c});
                }} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-all"><Trash2 className="w-4 h-4"/></button>
                
                <div className="relative group rounded-2xl border-2 border-dashed border-slate-100 bg-slate-50/50 h-32 flex flex-col items-center justify-center hover:bg-blue-50/30 hover:border-blue-200 transition-all cursor-pointer overflow-hidden shadow-inner">
                  <input type="file" accept="application/pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      const c = [...form.feePdf!]; c[i].fileUrl = e.target.files[0]; setForm({...form, feePdf: c});
                    }
                  }}/>
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <FileText className={`w-5 h-5 ${pdfItem.fileUrl ? 'text-blue-500' : 'text-slate-300 group-hover:text-blue-400'}`}/>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{pdfItem.fileUrl ? 'File Selected' : 'Upload PDF'}</span>
                </div>
                
                <div className="relative pt-2">
                  <label className={labelBase}>PDF Label</label>
                  <input className={inputBase} placeholder="e.g. Fee Circular 2024-25" value={pdfItem.label || ''} onChange={e => {
                      const c = [...form.feePdf!]; c[i].label = e.target.value; setForm({...form, feePdf: c});
                  }} />
                </div>
              </div>
            ))}
            {(form.feePdf?.length || 0) < 1 && (
              <button type="button" onClick={() => setForm({...form, feePdf: [...(form.feePdf||[]), {fileUrl: null as any, label: ''}]})} className="flex flex-col items-center justify-center gap-3 border-4 border-dashed border-slate-100 rounded-4xl p-10 hover:border-blue-400 hover:bg-blue-50/30 transition-all text-slate-300 hover:text-blue-500 min-h-[260px]">
                <Plus className="w-8 h-8" />
                <span className="text-[10px] font-black uppercase tracking-widest">Add Fee PDF Circular</span>
              </button>
            )}
          </div>
        </AdminFormSection>
      </form>
    </div>
  );
};

export default MMSFeesForm;
