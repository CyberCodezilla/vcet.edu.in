import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import type { MMSFeesPayload } from '../../types';
import { mmsFeesApi } from '../../api/mmsFeesApi';

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
  const [form, setForm] = useState<MMSFeesPayload>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/admin/pages/mms" className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold text-[#111827]">Fee Structure</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">MMS ADMISSIONS EDITOR</p>
          </div>
        </div>
        <button onClick={handleSave} disabled={saving} className="px-8 py-3.5 bg-[#2563EB] text-white rounded-2xl font-black text-sm uppercase tracking-wider shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center gap-2">
          {saving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

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
        <SectionCard title="Fees Overview" icon="📋">
          <div className="space-y-4">
            {form.overview?.map((item, i) => (
              <div key={i} className="flex gap-3 items-start p-4 bg-slate-50 border border-slate-200 rounded-xl relative">
                 <button type="button" onClick={() => {
                   const c = [...form.overview!]; c.splice(i, 1); setForm({...form, overview: c});
                 }} className="absolute top-2 right-2 text-red-500 p-1 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4"/></button>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full border-r-[30px] border-transparent">
                   <div className="relative">
                     <label className="admin-label">Category Name (Max 100)</label>
                     <input className="admin-input-small" value={item.categoryName} placeholder="e.g. Open Category" onChange={e => handleTextChange(e.target.value, 100, val => {
                       const c = [...form.overview!]; c[i].categoryName = val; setForm({...form, overview: c});
                     })}/>
                   </div>
                   <div className="relative">
                     <label className="admin-label">Student Type (Max 20)</label>
                     <input className="admin-input-small" value={item.studentType} placeholder="e.g. All" onChange={e => handleTextChange(e.target.value, 20, val => {
                       const c = [...form.overview!]; c[i].studentType = val; setForm({...form, overview: c});
                     })}/>
                   </div>
                   <div className="relative">
                     <label className="admin-label">Fees Amount (Max 20)</label>
                     <input className="admin-input-small" value={item.amount} placeholder="e.g. ₹ 1,00,000" onChange={e => handleTextChange(e.target.value, 20, val => {
                       const c = [...form.overview!]; c[i].amount = val; setForm({...form, overview: c});
                     })}/>
                   </div>
                 </div>
              </div>
            ))}
            {(form.overview?.length || 0) < 6 && (
              <button type="button" onClick={() => setForm({...form, overview: [...(form.overview||[]), {categoryName: '', studentType: '', amount: ''}]})} className="btn-add">
                <Plus className="w-4 h-4" /> Add Overview Category (Max 6)
              </button>
            )}
          </div>
        </SectionCard>

        {/* SECTION 2: CATEGORY DETAILS */}
        <SectionCard title="Category Fee Details" icon="💳">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
               <label className="admin-label">Open Category Fees (Max 50)</label>
               <input className="admin-input-small" value={form.categoryDetails?.openFees || ''} onChange={e => handleTextChange(e.target.value, 50, val => {
                 setForm({...form, categoryDetails: {...form.categoryDetails!, openFees: val}});
               })}/>
            </div>
            <div className="relative">
               <label className="admin-label">OBC/SEBC/EBC/EWS (Male) (Max 50)</label>
               <input className="admin-input-small" value={form.categoryDetails?.obcFeesMale || ''} onChange={e => handleTextChange(e.target.value, 50, val => {
                 setForm({...form, categoryDetails: {...form.categoryDetails!, obcFeesMale: val}});
               })}/>
            </div>
            <div className="relative">
               <label className="admin-label">OBC/SEBC/EBC/EWS (Female) (Max 50)</label>
               <input className="admin-input-small" value={form.categoryDetails?.obcFeesFemale || ''} onChange={e => handleTextChange(e.target.value, 50, val => {
                 setForm({...form, categoryDetails: {...form.categoryDetails!, obcFeesFemale: val}});
               })}/>
            </div>
            <div className="relative">
               <label className="admin-label">SBC/NT/DT/VJ/TFWS (Max 50)</label>
               <input className="admin-input-small" value={form.categoryDetails?.sbcFees || ''} onChange={e => handleTextChange(e.target.value, 50, val => {
                 setForm({...form, categoryDetails: {...form.categoryDetails!, sbcFees: val}});
               })}/>
            </div>
            <div className="relative">
               <label className="admin-label">SC/ST Fees (Max 50)</label>
               <input className="admin-input-small" value={form.categoryDetails?.scstFees || ''} onChange={e => handleTextChange(e.target.value, 50, val => {
                 setForm({...form, categoryDetails: {...form.categoryDetails!, scstFees: val}});
               })}/>
            </div>
          </div>
        </SectionCard>

        {/* SECTION 3: CONCESSION REQ */}
        <SectionCard title="Fee Concession Requirement" icon="💎">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
               <label className="admin-label">Required Documents (Max 150)</label>
               <textarea rows={3} className="admin-input-small resize-none" value={form.concessionReq?.documents || ''} onChange={e => handleTextChange(e.target.value, 150, val => {
                 setForm({...form, concessionReq: {...form.concessionReq!, documents: val}});
               })}/>
            </div>
            <div className="relative">
               <label className="admin-label">Scholarship Form (Max 150)</label>
               <textarea rows={3} className="admin-input-small resize-none" value={form.concessionReq?.formReq || ''} onChange={e => handleTextChange(e.target.value, 150, val => {
                 setForm({...form, concessionReq: {...form.concessionReq!, formReq: val}});
               })}/>
            </div>
            <div className="relative">
               <label className="admin-label">Portal Link (Max 150)</label>
               <textarea rows={3} className="admin-input-small resize-none" value={form.concessionReq?.portalLink || ''} onChange={e => handleTextChange(e.target.value, 150, val => {
                 setForm({...form, concessionReq: {...form.concessionReq!, portalLink: val}});
               })}/>
            </div>
          </div>
        </SectionCard>

        {/* SECTION 4: OFFLINE PAYMENT */}
        <SectionCard title="Payment Method (Offline)" icon="💵">
          <div className="space-y-4">
            {form.offlinePayment?.map((item, i) => (
              <div key={i} className="flex gap-3 items-start p-4 bg-slate-50 border border-slate-200 rounded-xl relative">
                 <button type="button" onClick={() => {
                   const c = [...form.offlinePayment!]; c.splice(i, 1); setForm({...form, offlinePayment: c});
                 }} className="absolute top-2 right-2 text-red-500 p-1 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4"/></button>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full border-r-[30px] border-transparent">
                   <div className="relative">
                     <label className="admin-label">Mode (Max 50)</label>
                     <input className="admin-input-small" value={item.mode} placeholder="DD / Pay Order" onChange={e => handleTextChange(e.target.value, 50, val => {
                       const c = [...form.offlinePayment!]; c[i].mode = val; setForm({...form, offlinePayment: c});
                     })}/>
                   </div>
                   <div className="relative">
                     <label className="admin-label">Payee Name (Max 120)</label>
                     <input className="admin-input-small" value={item.payeeName} placeholder="Favoring Name" onChange={e => handleTextChange(e.target.value, 120, val => {
                       const c = [...form.offlinePayment!]; c[i].payeeName = val; setForm({...form, offlinePayment: c});
                     })}/>
                   </div>
                   <div className="relative">
                     <label className="admin-label">Payable Location (Max 50)</label>
                     <input className="admin-input-small" value={item.location} placeholder="e.g. Mumbai" onChange={e => handleTextChange(e.target.value, 50, val => {
                       const c = [...form.offlinePayment!]; c[i].location = val; setForm({...form, offlinePayment: c});
                     })}/>
                   </div>
                 </div>
              </div>
            ))}
            {(form.offlinePayment?.length || 0) < 3 && (
              <button type="button" onClick={() => setForm({...form, offlinePayment: [...(form.offlinePayment||[]), {mode: '', payeeName: '', location: ''}]})} className="btn-add">
                <Plus className="w-4 h-4" /> Add Offline Method (Max 3)
              </button>
            )}
          </div>
        </SectionCard>

        {/* SECTION 5: ONLINE PAYMENT */}
        <SectionCard title="Payment Method (Online - RTGS/NEFT)" icon="🏦">
          <div className="space-y-4">
            {form.onlinePayment?.map((item, i) => (
              <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-xl relative space-y-3">
                 <button type="button" onClick={() => {
                   const c = [...form.onlinePayment!]; c.splice(i, 1); setForm({...form, onlinePayment: c});
                 }} className="absolute top-2 right-2 text-red-500 p-1 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4"/></button>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                   <div className="relative md:col-span-2">
                     <label className="admin-label">Bank Account Name (Max 120)</label>
                     <input className="admin-input-small" value={item.accountName} onChange={e => handleTextChange(e.target.value, 120, val => {
                       const c = [...form.onlinePayment!]; c[i].accountName = val; setForm({...form, onlinePayment: c});
                     })}/>
                   </div>
                   <div className="relative">
                     <label className="admin-label">Bank Name (Max 100)</label>
                     <input className="admin-input-small" value={item.bankName} onChange={e => handleTextChange(e.target.value, 100, val => {
                       const c = [...form.onlinePayment!]; c[i].bankName = val; setForm({...form, onlinePayment: c});
                     })}/>
                   </div>
                   <div className="relative">
                     <label className="admin-label">Account Number (Max 30)</label>
                     <input className="admin-input-small" value={item.accountNumber} onChange={e => handleTextChange(e.target.value, 30, val => {
                       const c = [...form.onlinePayment!]; c[i].accountNumber = val; setForm({...form, onlinePayment: c});
                     })}/>
                   </div>
                   <div className="relative">
                     <label className="admin-label">Account Type (Max 20)</label>
                     <input className="admin-input-small" value={item.accountType} onChange={e => handleTextChange(e.target.value, 20, val => {
                       const c = [...form.onlinePayment!]; c[i].accountType = val; setForm({...form, onlinePayment: c});
                     })}/>
                   </div>
                   <div className="relative">
                     <label className="admin-label">IFSC Code (Max 20)</label>
                     <input className="admin-input-small" value={item.ifsc} onChange={e => handleTextChange(e.target.value, 20, val => {
                       const c = [...form.onlinePayment!]; c[i].ifsc = val; setForm({...form, onlinePayment: c});
                     })}/>
                   </div>
                 </div>
              </div>
            ))}
            {(form.onlinePayment?.length || 0) < 5 && (
              <button type="button" onClick={() => setForm({...form, onlinePayment: [...(form.onlinePayment||[]), {accountName: '', bankName: '', accountNumber: '', accountType: '', ifsc: ''}]})} className="btn-add">
                <Plus className="w-4 h-4" /> Add Online Account (Max 5)
              </button>
            )}
          </div>
        </SectionCard>

        {/* SECTION 6: TRANSACTION REQ */}
        <SectionCard title="Transaction Requirement" icon="📌">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
               <label className="admin-label">UTR Requirement (Max 100)</label>
               <input className="admin-input-small" value={form.transactionReq?.utrReq || ''} onChange={e => handleTextChange(e.target.value, 100, val => {
                 setForm({...form, transactionReq: {...form.transactionReq!, utrReq: val}});
               })}/>
            </div>
            <div className="relative">
               <label className="admin-label">Mention on Admission Form</label>
               <select className="admin-input-small py-[0.55rem]" value={form.transactionReq?.mentionOnForm || 'No'} onChange={e => {
                 setForm({...form, transactionReq: {...form.transactionReq!, mentionOnForm: e.target.value}});
               }}>
                 <option value="Yes">Yes</option>
                 <option value="No">No</option>
               </select>
            </div>
          </div>
        </SectionCard>

        {/* SECTION 7: PDF SECTION */}
        <SectionCard title="Fee Details (PDF)" icon="📄">
          <p className="text-xs text-slate-500 mb-3 font-medium">Upload 1 PDF fee circular.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {form.feePdf?.map((pdfItem, i) => (
              <div key={i} className="p-4 bg-slate-50 border border-slate-200 rounded-lg relative space-y-3">
                <button type="button" onClick={() => {
                  const c = [...form.feePdf!]; c.splice(i, 1); setForm({...form, feePdf: c});
                }} className="absolute top-2 right-2 text-red-500 z-10 hover:bg-red-50 p-1 rounded"><Trash2 className="w-4 h-4"/></button>
                
                <div className="relative group rounded-lg border border-dashed border-slate-300 bg-white h-24 flex flex-col items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer">
                  <input type="file" accept="application/pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                       const c = [...form.feePdf!]; c[i].fileUrl = e.target.files[0]; setForm({...form, feePdf: c});
                    }
                  }}/>
                  <FileText className={`w-6 h-6 ${pdfItem.fileUrl ? 'text-blue-500' : 'text-slate-300 group-hover:text-blue-400'}`}/>
                  <span className="text-[10px] text-slate-500 font-medium mt-1">{pdfItem.fileUrl ? 'File Selected' : 'Upload PDF'}</span>
                </div>
                
                <div className="relative">
                  <label className="admin-label text-[10px]">PDF Label / Name</label>
                  <input className="admin-input-small text-xs" placeholder="Label / Name" value={pdfItem.label || ''} onChange={e => {
                      const c = [...form.feePdf!]; c[i].label = e.target.value; setForm({...form, feePdf: c});
                  }} />
                </div>
              </div>
            ))}
            {(form.feePdf?.length || 0) < 1 && (
              <button type="button" onClick={() => setForm({...form, feePdf: [...(form.feePdf||[]), {fileUrl: null as any, label: ''}]})} className="btn-add min-h-[12rem]">
                <Plus className="w-5 h-5 mx-auto mb-1" /> Add PDF (Max 1)
              </button>
            )}
          </div>
        </SectionCard>

      </form>

      <style>{`
        .admin-input-small { width: 100%; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 0.5rem; padding: 0.5rem 0.75rem; color: #0f172a; font-size: 0.75rem; font-weight: 500; outline: none; transition: 0.2s; }
        .admin-input-small:focus { border-color: #2563EB; background: #fff; box-shadow: 0 0 0 2px rgba(37,99,235, 0.1); }
        .admin-label { display: block; font-size: 0.65rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.35rem; }
        .btn-add { display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; border: 2px dashed #cbd5e1; border-radius: 0.75rem; padding: 0.75rem; font-size: 0.75rem; font-weight: bold; color: #64748b; background: white; transition: 0.2s; cursor: pointer; }
        .btn-add:hover { border-color: #2563EB; color: #2563EB; background: #eff6ff; }
      `}</style>
    </div>
  );
};

const SectionCard = ({ icon, title, children }: any) => {
  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.05)] border border-slate-100">
      <div className="flex items-center gap-3 mb-8">
         {icon && <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-lg shadow-sm border border-slate-100">{icon}</div>}
         <h2 className="text-sm font-black text-[#111827] uppercase tracking-wider">{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default MMSFeesForm;
