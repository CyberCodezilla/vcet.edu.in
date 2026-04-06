import React, { useEffect, useState } from 'react';
import { pagesApi } from '../../api/pagesApi';
import type { AboutData, AboutPayload } from '../../types';
import { resolveUploadedAssetUrl } from '../../../utils/uploadedAssets';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useListSync } from '../../hooks/useListSync';
import AdminFormSection from '../../components/AdminFormSection';
import { 
  FileText, 
  Award, 
  Zap, 
  User, 
  MessageSquare, 
  Star, 
  GraduationCap, 
  LayoutGrid, 
  Briefcase, 
  Users, 
  Network, 
  Gavel 
} from 'lucide-react';

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


const inputBase = 'w-full bg-slate-50 border-0 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#2563EB] rounded-2xl px-5 py-3/4 text-sm font-bold transition-all outline-none';
const labelBase = 'block text-xs font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1';

const FileUploadField: React.FC<{
  label: string;
  accept: string;
  value?: string | File | null;
  onChange: (value: string | File | null) => void;
}> = ({ label, accept, value, onChange }) => {
  const currentUrl = typeof value === 'string' ? resolveUploadedAssetUrl(value) : null;
  const fileName = value instanceof File ? value.name : null;

  return (
    <div className="space-y-2">
      <label className={labelBase}>{label}</label>
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <input id="aboutusform-1" name="aboutusform-1" aria-label="aboutusform field"
          type="file"
          accept={accept}
          className="text-sm font-semibold text-slate-600 file:mr-3 file:rounded-xl file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-blue-700"
          onChange={(event) => {
            const selectedFile = event.target.files?.[0] ?? null;
            if (selectedFile) {
              onChange(selectedFile);
            }
          }}
        />
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold text-slate-500 break-all">
            {fileName ? `Selected: ${fileName}` : currentUrl ? `Current: ${currentUrl}` : 'No file uploaded'}
          </p>
          {(value instanceof File || (typeof value === 'string' && value.trim() !== '')) && (
            <button
              type="button"
              onClick={() => onChange(null)}
              className="rounded-xl border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-red-600 hover:bg-red-100"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/* ── DnD Hook ─────────────────────────────────────────────────────────────── */
/* ── DnD Hook ─────────────────────────────────────────────────────────────── */

/* ── Reusable Managers ──────────────────────────────────────────────────────── */

const LimitedInput: React.FC<{ value: string; onChange: (v: string) => void; max: number; label: string; placeholder?: string; type?: 'text'|'textarea'; min?: number }> = ({ value, onChange, max, label, placeholder, type='text', min }) => {
  const isError = min && (value?.length || 0) < min;
  return (
    <div className="relative">
      <label className={labelBase}>{label}</label>
      {type === 'text' ? (
        <input id="aboutusform-2" name="aboutusform-2" aria-label="aboutusform field" value={value || ''} onChange={e => { if (e.target.value.length <= max) onChange(e.target.value) }} className={`${inputBase} p-4`} placeholder={placeholder} />
      ) : (
        <textarea id="aboutusform-textarea-1" name="aboutusform-textarea-1" aria-label="aboutusform textarea field" value={value || ''} onChange={e => { if (e.target.value.length <= max) onChange(e.target.value) }} className={`${inputBase} p-4 min-h-[100px] resize-y`} placeholder={placeholder} />
      )}
      <div className={`absolute bottom-3 right-4 text-[10px] font-bold ${isError ? 'text-red-500' : 'text-slate-400'}`}>
        {value?.length || 0} / {max} {min ? `(min ${min})` : ''}
      </div>
    </div>
  );
};

const SortableDynamicItem = ({ id, item, idx, fields, minItems, itemsLength, del, upd }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 1,
    position: 'relative' as const,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex gap-4 p-5 bg-slate-50 border border-slate-100 rounded-3xl relative transition-all group overflow-hidden shadow-sm">
      <div className="flex flex-col pt-8 pr-2 border-r border-slate-200 cursor-grab active:cursor-grabbing text-slate-400 hover:text-blue-500" {...attributes} {...listeners}>
        <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 8h16M4 16h16"/></svg>
      </div>
      <div className="grid grid-cols-1 gap-y-4 grow">
         {fields.map((f: any) => (
            <LimitedInput key={f.key} label={f.label} max={f.max} min={f.min} type={f.type} value={item[f.key]} onChange={v => upd(idx, { [f.key]: v })} />
         ))}
      </div>
      {itemsLength > minItems && (
        <button onClick={() => del(idx)} className="self-start mt-8 p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      )}
    </div>
  );
};

const DynamicListManager: React.FC<{ 
  items: any[]; 
  minItems?: number;
  maxItems: number; 
  fields: { key: string; label: string; max: number; type?: 'text'|'textarea'; min?: number }[]; 
  onChange: (val: any[]) => void 
}> = ({ items = [], maxItems, minItems=0, fields, onChange }) => {
  const { ids, handleMove, handleRemove } = useListSync(items);
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

  const add = () => { if (items.length < maxItems) { const empty: any = {}; fields.forEach(f => empty[f.key] = ''); onChange([...items, empty]); } };
  const upd = (i: number, u: any) => { const n = [...items]; n[i] = { ...n[i], ...u }; onChange(n); };
  const del = (i: number) => { if (items.length > minItems) { handleRemove(i); onChange(items.filter((_, idx) => idx !== i)); } };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = ids.findIndex(id => id === active.id);
      const newIndex = ids.findIndex(id => id === over.id);
      handleMove(oldIndex, newIndex);
      onChange(arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <div className="space-y-4">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
          {items.map((item, idx) => (
             <SortableDynamicItem key={ids[idx]} id={ids[idx]} item={item} idx={idx} fields={fields} minItems={minItems} itemsLength={items.length} del={del} upd={upd} />
          ))}
        </SortableContext>
      </DndContext>
      {items.length < maxItems && (
        <button onClick={add} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-sm font-bold text-slate-400 hover:border-blue-500 hover:text-blue-500 transition-all flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
          Add Item ({items.length}/{maxItems})
        </button>
      )}
    </div>
  );
};

const SortableStringItem = ({ id, str, idx, minItems, itemsLength, label, maxLength, minLength, type, del, upd }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1, zIndex: isDragging ? 10 : 1, position: 'relative' as const };
  
  return (
    <div ref={setNodeRef} style={style} className="flex gap-3 items-center group">
      <div className="cursor-grab active:cursor-grabbing text-slate-300 hover:text-blue-500 p-2" {...attributes} {...listeners}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 8h16M4 16h16"/></svg>
      </div>
      <div className="grow">
         <LimitedInput label={`${label} ${idx+1}`} max={maxLength} min={minLength} type={type} value={str} onChange={v => upd(idx, v)} />
      </div>
      {itemsLength > minItems && (
        <button onClick={() => del(idx)} className="p-2 text-red-400 hover:text-red-500 opacity-0 group-hover:opacity-100 mt-6"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/></svg></button>
      )}
    </div>
  );
};

const StringListManager: React.FC<{ items: string[]; minItems?: number; maxItems: number; maxLength: number; minLength?: number; onChange: (val: string[]) => void; label?: string; type?: 'text'|'textarea' }> = ({ items = [], minItems=0, maxItems, maxLength, minLength, onChange, label='Entry', type='text' }) => {
  const { ids, handleMove, handleRemove } = useListSync(items);
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

  const add = () => { if (items.length < maxItems) onChange([...items, '']); };
  const upd = (i: number, v: string) => { const n = [...items]; n[i] = v; onChange(n); };
  const del = (i: number) => { if (items.length > minItems) { handleRemove(i); onChange(items.filter((_, idx) => idx !== i)); } };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = ids.findIndex(id => id === active.id);
      const newIndex = ids.findIndex(id => id === over.id);
      handleMove(oldIndex, newIndex);
      onChange(arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <div className="space-y-3">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
          {items.map((str, idx) => (
             <SortableStringItem key={ids[idx]} id={ids[idx]} str={str} idx={idx} minItems={minItems} itemsLength={items.length} label={label} maxLength={maxLength} minLength={minLength} type={type} del={del} upd={upd} />
          ))}
        </SortableContext>
      </DndContext>
      {items.length < maxItems && (
        <button onClick={add} className="text-xs font-bold text-blue-600 hover:text-blue-700 uppercase tracking-widest">+ Add {label} ({items.length}/{maxItems})</button>
      )}
    </div>
  );
};

const ConductRulesManager: React.FC<{
  sections: any[];
  onChange: (sections: any[]) => void;
}> = ({ sections = [], onChange }) => {
  const updateSectionRules = (sectionIndex: number, rules: any[]) => {
    const next = [...sections];
    next[sectionIndex] = { ...next[sectionIndex], rules };
    onChange(next);
  };

  return (
    <div className="space-y-6">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="rounded-2xl border border-slate-200 p-5 bg-slate-50">
          <h4 className="text-sm font-extrabold text-slate-700 uppercase tracking-wider mb-4">
            {section.title || `Section ${sectionIndex + 1}`} Rules
          </h4>
          <DynamicListManager
            items={section.rules || []}
            minItems={2}
            maxItems={6}
            onChange={(rules) => updateSectionRules(sectionIndex, rules)}
            fields={[
              { key: 'title', label: 'Rule Title', max: 35 },
              { key: 'description', label: 'Rule Description', max: 360, min: 140, type: 'textarea' },
            ]}
          />
        </div>
      ))}
    </div>
  );
};

/* ── Main Form ─────────────────────────────────────────────────────────────── */
interface AboutUsFormProps {
  slug: string;
  onBack: () => void;
}

const AboutUsForm: React.FC<AboutUsFormProps> = ({ slug, onBack }) => {
  const [data, setData] = useState<AboutData | null>(null);
  const [payload, setPayload] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    // Set default open section based on slug
    if (slug === 'overview') setActiveSection('paragraphs');
    else if (slug === 'president-desk' || slug === 'principal-desk') setActiveSection('profile');
    else if (slug === 'governing-council') setActiveSection('chairman');
    else if (slug === 'org-structure') setActiveSection('intro');
    else if (slug === 'administration') setActiveSection('officers');
    else if (slug === 'strategic-plan') setActiveSection('documents');
    else if (slug === 'code-of-conduct') setActiveSection('framework');
  }, [slug]);

  const toggleSection = (id: string) => setActiveSection(prev => prev === id ? null : id);

  useEffect(() => {
    pagesApi.about.get(slug).then(res => {
      setData(res.data);
      setPayload(res.data || {});
    }).finally(() => setLoading(false));
  }, [slug]);

  const handleSubmit = async () => {
    setSaving(true);
    const trimPayloadStrings = (value: unknown): unknown => {
      if (value instanceof File) {
        return value;
      }

      if (Array.isArray(value)) {
        return value.map((item) => trimPayloadStrings(item));
      }

      if (value && typeof value === 'object') {
        const output: Record<string, unknown> = {};
        Object.entries(value as Record<string, unknown>).forEach(([key, nestedValue]) => {
          output[key] = trimPayloadStrings(nestedValue);
        });
        return output;
      }

      if (typeof value === 'string') {
        return value.trim();
      }

      return value;
    };

    const processedPayload = trimPayloadStrings(payload) as AboutPayload;

    try {
      await pagesApi.about.update(slug, processedPayload);
      setToast({ message: 'Saved successfully', type: 'success' });
    } catch {
      setToast({ message: 'Error saving data', type: 'error' });
    } finally { setSaving(false); }
  };

  if (loading) return <div className="p-12 text-center text-slate-400 font-bold animate-pulse">LOADING...</div>;

  const updateProp = (key: string, val: any) => setPayload({ ...payload, [key]: val });
  const updateIntro = (key: string, val: any) => setPayload({ ...payload, intro: { ...payload.intro, [key]: val }});

  const renderContent = () => {
    switch (slug) {
      case 'overview':
        return (
          <div className="space-y-4">
            <AdminFormSection
              title="Institute Overview Paragraphs"
              icon={<FileText className="w-5 h-5" />}
              isOpen={activeSection === 'paragraphs'}
              onToggle={() => toggleSection('paragraphs')}
            >
              <StringListManager items={payload.paragraphs} minItems={3} maxItems={3} maxLength={900} minLength={500} type="textarea" onChange={v => updateProp('paragraphs', v)} label="Paragraph" />
            </AdminFormSection>

            <AdminFormSection
              title="Accreditation Points"
              icon={<Award className="w-5 h-5" />}
              isOpen={activeSection === 'accreditation'}
              onToggle={() => toggleSection('accreditation')}
            >
              <StringListManager items={payload.accreditation} minItems={4} maxItems={6} maxLength={80} minLength={20} onChange={v => updateProp('accreditation', v)} label="Point" />
            </AdminFormSection>

            <AdminFormSection
              title="Quick Facts"
              icon={<Zap className="w-5 h-5" />}
              isOpen={activeSection === 'facts'}
              onToggle={() => toggleSection('facts')}
            >
              <DynamicListManager items={payload.facts} minItems={4} maxItems={4} onChange={v => updateProp('facts', v)} fields={[
                { key: 'label', label: 'Fact Label', max: 20 },
                { key: 'value', label: 'Fact Value', max: 15 }
              ]} />
            </AdminFormSection>
          </div>
        );

      case 'president-desk':
      case 'principal-desk':
        const isPrincipal = slug === 'principal-desk';
        return (
          <div className="space-y-4">
            <AdminFormSection
              title="Leader Profile"
              icon={<User className="w-5 h-5" />}
              isOpen={activeSection === 'profile'}
              onToggle={() => toggleSection('profile')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LimitedInput label="Full Name" max={50} value={payload.intro?.name} onChange={v => updateIntro('name', v)} />
                <LimitedInput label={isPrincipal ? "Role Headline" : "Designation & Org"} max={isPrincipal ? 80 : 90} value={payload.intro?.role} onChange={v => updateIntro('role', v)} />
                <div className="col-span-2">
                  <FileUploadField label="Profile Image Upload" accept="image/*" value={payload.intro?.image} onChange={v => updateIntro('image', v)} />
                </div>
              </div>
            </AdminFormSection>

            <AdminFormSection
              title="Message Content"
              icon={<MessageSquare className="w-5 h-5" />}
              isOpen={activeSection === 'message'}
              onToggle={() => toggleSection('message')}
            >
              <StringListManager items={payload.messageParagraphs} minItems={isPrincipal ? 4 : 3} maxItems={isPrincipal ? 5 : 4} maxLength={isPrincipal ? 950 : 850} minLength={isPrincipal ? 400 : 350} type="textarea" onChange={v => updateProp('messageParagraphs', v)} label="Message Para" />
            </AdminFormSection>

            <AdminFormSection
              title="Quotes & Callouts"
              icon={<Star className="w-5 h-5" />}
              isOpen={activeSection === 'quotes'}
              onToggle={() => toggleSection('quotes')}
            >
              <LimitedInput label="Highlight Quote" max={isPrincipal ? 260 : 220} min={isPrincipal ? 120 : 100} type="textarea" value={payload.intro?.highlightQuote} onChange={v => updateIntro('highlightQuote', v)} />
              <div className="mt-6">
                <LimitedInput label="Closing Quote" max={isPrincipal ? 420 : 380} min={isPrincipal ? 180 : 160} type="textarea" value={payload.intro?.closingQuote} onChange={v => updateIntro('closingQuote', v)} />
              </div>
            </AdminFormSection>

            {isPrincipal && (
              <>
                <AdminFormSection
                  title="Principal Qualifications"
                  icon={<GraduationCap className="w-5 h-5" />}
                  isOpen={activeSection === 'qualifications'}
                  onToggle={() => toggleSection('qualifications')}
                >
                  <DynamicListManager items={payload.profileDetails} minItems={3} maxItems={3} onChange={v => updateProp('profileDetails', v)} fields={[
                    { key: 'qualification', label: 'Qual', max: 20 },
                    { key: 'experience', label: 'Exp', max: 20 },
                    { key: 'affiliation', label: 'Affiliation', max: 80 }
                  ]} />
                </AdminFormSection>

                <AdminFormSection
                  title="Campus Highlights Cards"
                  icon={<LayoutGrid className="w-5 h-5" />}
                  isOpen={activeSection === 'highlights'}
                  onToggle={() => toggleSection('highlights')}
                >
                  <DynamicListManager items={payload.highlightsCards} minItems={4} maxItems={4} onChange={v => updateProp('highlightsCards', v)} fields={[
                    { key: 'value', label: 'Icon/Value', max: 25 },
                    { key: 'label', label: 'Title', max: 35 }
                  ]} />
                </AdminFormSection>
              </>
            )}
          </div>
        );

      case 'governing-council':
        return (
          <div className="space-y-4">
            <AdminFormSection
              title="Chairman"
              icon={<Briefcase className="w-5 h-5" />}
              isOpen={activeSection === 'chairman'}
              onToggle={() => toggleSection('chairman')}
            >
              <LimitedInput label="Chairman Name" max={70} value={payload.chairman?.name} onChange={v => updateProp('chairman', { ...payload.chairman, name: v })} />
              <div className="mt-4"><LimitedInput label="Role" max={25} value={payload.chairman?.role} onChange={v => updateProp('chairman', { ...payload.chairman, role: v })} /></div>
              <div className="mt-4"><LimitedInput label="Short Description" max={90} value={payload.chairman?.description} onChange={v => updateProp('chairman', { ...payload.chairman, description: v })} /></div>
            </AdminFormSection>

            <AdminFormSection
              title="GC Members Table"
              icon={<Users className="w-5 h-5" />}
              isOpen={activeSection === 'members'}
              onToggle={() => toggleSection('members')}
            >
               <DynamicListManager items={payload.councilMembers} minItems={8} maxItems={15} onChange={v => updateProp('councilMembers', v)} fields={[
                 { key: 'role', label: 'Role', max: 25 },
                 { key: 'name', label: 'Name', max: 70 },
                 { key: 'description', label: 'Description/Org', max: 90 }
               ]} />
            </AdminFormSection>
          </div>
        );

      case 'org-structure':
        return (
          <div className="space-y-4">
            <AdminFormSection
              title="Structure Intro"
              icon={<Network className="w-5 h-5" />}
              isOpen={activeSection === 'intro'}
              onToggle={() => toggleSection('intro')}
            >
              <LimitedInput label="Introduction Text" max={220} min={80} type="textarea" value={payload.orgIntro} onChange={v => updateProp('orgIntro', v)} />
              <div className="mt-6">
                <FileUploadField label="Org Chart Image Upload" accept="image/*" value={payload.orgChartImage} onChange={v => updateProp('orgChartImage', v)} />
              </div>
            </AdminFormSection>

            <AdminFormSection
              title="Hierarchy Nodes"
              icon={<Network className="w-5 h-5" />}
              isOpen={activeSection === 'nodes'}
              onToggle={() => toggleSection('nodes')}
            >
              <div className="p-4 mb-4 bg-blue-50 text-blue-700 text-xs font-bold rounded-xl border border-blue-200">
                Define hierarchy nodes. Support for 4-6 levels, max 8 nodes per level.
              </div>
              <DynamicListManager items={payload.orgNodes} minItems={4} maxItems={48} onChange={v => updateProp('orgNodes', v)} fields={[
                { key: 'name', label: 'Individual Name', max: 50 },
                { key: 'title', label: 'Institutional Title', max: 60 },
                { key: 'parent', label: 'Parent Node ID/Reference', max: 50 },
                { key: 'displayOrder', label: 'Display Order', max: 2 }
              ]} />
            </AdminFormSection>
          </div>
        );

      case 'administration':
        return (
          <AdminFormSection
            title="Administrative Officers"
            icon={<Briefcase className="w-5 h-5" />}
            isOpen={activeSection === 'officers'}
            onToggle={() => toggleSection('officers')}
          >
            <DynamicListManager items={payload.adminCards} minItems={2} maxItems={4} onChange={v => updateProp('adminCards', v)} fields={[
              { key: 'name', label: 'Name', max: 50 },
              { key: 'role', label: 'Designation', max: 40 },
              { key: 'email', label: 'Official Email', max: 80 }
            ]} />
            <div className="space-y-4 pt-2">
              {(payload.adminCards ?? []).map((card: any, index: number) => (
                <FileUploadField
                  key={`admin-image-${index}`}
                  label={`Admin Card ${index + 1} Image`}
                  accept="image/*"
                  value={card?.image}
                  onChange={(v) => {
                    const nextCards = [...(payload.adminCards ?? [])];
                    nextCards[index] = { ...(nextCards[index] ?? {}), image: v };
                    updateProp('adminCards', nextCards);
                  }}
                />
              ))}
            </div>
          </AdminFormSection>
        );

      case 'strategic-plan':
        return (
          <AdminFormSection
            title="Strategic Documents (PDF)"
            icon={<FileText className="w-5 h-5" />}
            isOpen={activeSection === 'documents'}
            onToggle={() => toggleSection('documents')}
          >
            <DynamicListManager items={payload.documents} minItems={5} maxItems={8} onChange={v => updateProp('documents', v)} fields={[
              { key: 'label', label: 'Doc Label', max: 60 },
              { key: 'year', label: 'Academic Year', max: 20 }
            ]} />
            <div className="space-y-4 pt-2">
              {(payload.documents ?? []).map((doc: any, index: number) => (
                <FileUploadField
                  key={`strategic-doc-${index}`}
                  label={`Document ${index + 1} PDF`}
                  accept="application/pdf"
                  value={doc?.fileUrl}
                  onChange={(v) => {
                    const nextDocs = [...(payload.documents ?? [])];
                    nextDocs[index] = { ...(nextDocs[index] ?? {}), fileUrl: v };
                    updateProp('documents', nextDocs);
                  }}
                />
              ))}
            </div>
          </AdminFormSection>
        );

      case 'code-of-conduct':
        return (
          <AdminFormSection
            title="Conduct Framework"
            icon={<Gavel className="w-5 h-5" />}
            isOpen={activeSection === 'framework'}
            onToggle={() => toggleSection('framework')}
          >
            <div className="p-4 mb-4 bg-slate-900 text-white text-[10px] uppercase tracking-tighter font-black rounded-xl border-l-4 border-blue-500">
              Note: This section strictly expects 3 conduct modules (Student, Staff, Faculty).
            </div>
            <DynamicListManager items={payload.conductSections} minItems={3} maxItems={3} onChange={v => updateProp('conductSections', v)} fields={[
              { key: 'title', label: 'Section Title', max: 45 },
              { key: 'description', label: 'Headline Description', max: 180, min: 80, type: 'textarea' }
            ]} />
            <ConductRulesManager sections={payload.conductSections || []} onChange={v => updateProp('conductSections', v)} />
          </AdminFormSection>
        );

      default:
        return <div className="p-8 text-center text-slate-400 font-bold uppercase tracking-widest bg-slate-50 border border-slate-100 rounded-3xl">Coming Soon...</div>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 animate-fade-in relative">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <PageEditorHeader
        title={data?.name || 'About Us Editor'}
        description="Manage institutional overview, leadership messages, and governance details."
        onSave={handleSubmit}
        isSaving={saving}
        showBackButton
        onBack={onBack}
      />

      <div className="space-y-6">
         {renderContent()}
      </div>
    </div>
  );
};

export default AboutUsForm;
