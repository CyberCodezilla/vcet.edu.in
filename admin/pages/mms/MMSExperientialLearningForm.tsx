import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronDown, ChevronUp, Plus, Trash2, Image as ImageIcon, CheckCircle, AlertTriangle } from 'lucide-react';
import type { MMSExperientialLearningPayload, GalleryItem } from '../../types';
import { mmsExperientialLearningApi } from '../../api/mmsExperientialLearning';
import { resolveApiUrl } from '../../../services/api';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';

const emptyForm: MMSExperientialLearningPayload = {
  rolePlay: [],
  groupDiscussion: [],
  entrepreneurialDrive: [],
  financialLiteracy: [],
  nescoVisit: [],
  modelMaking: []
};

const MMSExperientialLearningForm: React.FC = () => {
  const navigate = useNavigate();
  const { section } = useParams<{ section: string }>();
  const [form, setForm] = useState<MMSExperientialLearningPayload>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await mmsExperientialLearningApi.get();
      if (res.data) {
        setForm({ ...emptyForm, ...res.data });
      }
    } catch (e) {
      console.warn("Could not fetch old data, assuming empty CMS state:", e);
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
      await mmsExperientialLearningApi.update(form);
      setSuccessMsg('Changes saved successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
     return <div className="p-10 text-center"><div className="w-8 h-8 border-4 border-slate-200 border-t-[#2563EB] rounded-full animate-spin mx-auto mb-4" />Loading Form...</div>;
  }

  // Section Config Mapping
  const sectionConfig: Record<string, { title: string; key: keyof MMSExperientialLearningPayload; max: number; limit: number }> = {
    'role-play': { title: 'Role Play', key: 'rolePlay', max: 2, limit: 35 },
    'group-discussion': { title: 'Group Discussion', key: 'groupDiscussion', max: 2, limit: 35 },
    'entrepreneurial-drive': { title: 'Entrepreneurial Drive', key: 'entrepreneurialDrive', max: 2, limit: 35 },
    'financial-literacy': { title: 'Financial Literacy Program', key: 'financialLiteracy', max: 2, limit: 40 },
    'nesco-visit': { title: 'NESCO Bombay Exhibition Centre', key: 'nescoVisit', max: 2, limit: 35 },
    'model-making': { title: '3D Model Making', key: 'modelMaking', max: 4, limit: 40 },
  };

  const config = section ? sectionConfig[section] : null;

  if (!config) {
    return (
      <div className="p-10 text-center">
        <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold">Invalid Section</h2>
        <button type="button" onClick={() => navigate('/admin/pages/mms')} className="text-blue-500 hover:underline mt-4 inline-block">Back to MMS Hub</button>
      </div>
    );
  }

  const items = (form[config.key] as GalleryItem[]) || [];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-fade-in relative pt-6">
      <PageEditorHeader
        title={config.title}
        description="Experiential Learning Editor"
        onSave={() => {
          void handleSave();
        }}
        isSaving={saving}
        showBackButton
        onBack={() => navigate('/admin/pages/mms')}
      />

      {/* MESSAGES */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex items-center gap-3 text-red-700 font-medium animate-shake">
          <AlertTriangle className="w-5 h-5" /> {error}
        </div>
      )}
      {successMsg && (
        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-xl flex items-center gap-3 text-emerald-700 font-medium animate-slide-up">
          <CheckCircle className="w-5 h-5" /> {successMsg}
        </div>
      )}

      {/* EDITOR SECTION */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden shadow-slate-200/50">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Gallery Items</h3>
            <p className="text-sm text-slate-500 font-medium mt-1">Add or edit images for this activity. Max {config.max} items.</p>
          </div>
          <div className="px-4 py-2 bg-white rounded-xl border border-slate-200 text-sm font-bold text-slate-600 shadow-sm">
            {items.length} / {config.max} Items Used
          </div>
        </div>

        <div className="p-8">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item, i) => (
              <div key={i} className="group relative bg-slate-50 rounded-3xl border border-slate-200 p-4 transition-all hover:shadow-xl hover:shadow-slate-200/50 animate-fade-in">
                <button 
                  type="button" 
                  onClick={() => {
                    const newItems = items.filter((_, idx) => idx !== i);
                    setForm({ ...form, [config.key]: newItems });
                  }} 
                  className="absolute -top-2 -right-2 w-8 h-8 bg-white border border-red-100 rounded-full text-red-500 flex items-center justify-center shadow-lg hover:bg-red-50 transition-colors z-10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="relative aspect-video rounded-2xl overflow-hidden bg-white border border-slate-200 mb-4 group-hover:border-blue-200 transition-colors">
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const newItems = [...items];
                        newItems[i] = { ...newItems[i], image: file };
                        setForm({ ...form, [config.key]: newItems });
                      }
                    }}
                  />
                  {item.image ? (
                    <img src={typeof item.image === 'string' ? item.image : (item.image instanceof File || item.image instanceof Blob ? URL.createObjectURL(item.image) : ((item.image as any)?.url ? (resolveApiUrl((item.image as any).url) || '') : ''))} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                       <ImageIcon className="w-8 h-8 text-slate-300 group-hover:text-blue-500 transition-colors" />
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Click to Upload</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Image Label</label>
                    <span className={`text-[10px] font-bold ${(item.label?.length || 0) > config.limit * 0.9 ? 'text-amber-500' : 'text-slate-400'}`}>
                      {item.label?.length || 0} / {config.limit}
                    </span>
                  </div>
                  <input 
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 transition-all placeholder:text-slate-300"
                    placeholder="Enter label..."
                    value={item.label || ''}
                    maxLength={config.limit}
                    onChange={(e) => {
                      const newItems = [...items];
                      newItems[i] = { ...newItems[i], label: e.target.value };
                      setForm({ ...form, [config.key]: newItems });
                    }}
                  />
                </div>
              </div>
            ))}

            {items.length < config.max && (
              <button 
                type="button" 
                onClick={() => {
                  const newItems = [...items, { label: '', image: null }];
                  setForm({ ...form, [config.key]: newItems });
                }} 
                className="aspect-video lg:aspect-auto min-h-[12rem] bg-white border-4 border-dashed border-slate-100 rounded-[2rem] flex flex-col items-center justify-center gap-3 text-slate-300 hover:border-blue-200 hover:text-blue-500 hover:bg-blue-50/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <Plus className="w-6 h-6" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest">Add Image</span>
              </button>
            )}
           </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
        .animate-shake { animation: shake 0.3s ease-in-out infinite; animation-iteration-count: 2; }
      `}</style>
    </div>
  );
};

export default MMSExperientialLearningForm;
