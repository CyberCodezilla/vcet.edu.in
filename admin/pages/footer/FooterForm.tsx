import React, { useEffect, useState } from 'react';
import PageEditorHeader from '../../../components/admin/PageEditorHeader';
import AdminFormSection from '../../components/AdminFormSection';
import { pagesApi } from '../../api/pagesApi';
import { resolveUploadedAssetUrl } from '../../../utils/uploadedAssets';

type FooterFormProps = {
  slug: string;
  onBack: () => void;
};

type FooterStatementItem = {
  label: string;
  description: string;
  href: string;
  file: File | null;
};

const SLUG_TITLES: Record<string, string> = {
  'audited-statement': 'Audited Statement',
};

const DEFAULT_ITEMS: FooterStatementItem[] = [
  {
    label: 'Audited Statement 2021-2022',
    description: 'Income and expenditure statement for FY 2021-22.',
    href: '/pdfs/Facilities/FOOTER/AuditedStatement/2021-22-1.pdf',
    file: null,
  },
  {
    label: 'Audited Statement 2022-2023',
    description: 'Income and expenditure statement for FY 2022-23.',
    href: '/pdfs/Facilities/FOOTER/AuditedStatement/2022-23-1.pdf',
    file: null,
  },
];

const Toast: React.FC<{ message: string; type: 'success' | 'error'; onClose: () => void }> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(onClose, 3000);
    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div className={`fixed bottom-6 right-6 z-50 rounded-xl px-5 py-3 text-sm font-semibold shadow-xl ${type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
      {message}
    </div>
  );
};

function toText(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function toHref(value: Record<string, unknown>): string {
  const fromHref = toText(value.href);
  if (fromHref) return fromHref;

  const fromFileUrl = toText(value.fileUrl);
  if (fromFileUrl) return fromFileUrl;

  const fromUrl = toText(value.url);
  if (fromUrl) return fromUrl;

  const fileObj = value.file;
  if (fileObj && typeof fileObj === 'object') {
    const nested = fileObj as Record<string, unknown>;
    return toText(nested.url);
  }

  return '';
}

function normalizeItems(raw: unknown): FooterStatementItem[] {
  if (!raw || typeof raw !== 'object') {
    return DEFAULT_ITEMS;
  }

  const record = raw as Record<string, unknown>;
  const candidates = Array.isArray(record.items) ? record.items : [];

  if (candidates.length === 0) {
    return DEFAULT_ITEMS;
  }

  const normalized = candidates
    .filter((item): item is Record<string, unknown> => !!item && typeof item === 'object')
    .map((item) => ({
      label: toText(item.label),
      description: toText(item.description),
      href: toHref(item),
      file: null,
    }));

  return normalized.length > 0 ? normalized : DEFAULT_ITEMS;
}

const inputClass = 'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/10';

const FooterForm: React.FC<FooterFormProps> = ({ slug, onBack }) => {
  const [items, setItems] = useState<FooterStatementItem[]>(DEFAULT_ITEMS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      try {
        const response = await pagesApi.footer.get(slug);
        if (!mounted) return;
        setItems(normalizeItems((response as { data?: unknown })?.data));
      } catch {
        if (!mounted) return;
        setItems(DEFAULT_ITEMS);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [slug]);

  const updateItem = (index: number, patch: Partial<FooterStatementItem>) => {
    setItems((current) => {
      const next = [...current];
      next[index] = { ...next[index], ...patch };
      return next;
    });
  };

  const addItem = () => {
    setItems((current) => [...current, { label: '', description: '', href: '', file: null }]);
  };

  const removeItem = (index: number) => {
    setItems((current) => current.filter((_, i) => i !== index));
  };

  const save = async () => {
    setSaving(true);
    try {
      const payloadItems = items
        .map((item) => {
          const next: Record<string, unknown> = {
            label: item.label.trim(),
            description: item.description.trim(),
          };

          if (item.file instanceof File) {
            next.file = item.file;
          } else if (item.href.trim()) {
            next.href = item.href.trim();
          }

          return next;
        })
        .filter((item) => {
          const label = toText(item.label);
          const description = toText(item.description);
          const href = toText(item.href);
          return label !== '' || description !== '' || href !== '' || item.file instanceof File;
        });

      const response = await pagesApi.footer.update(slug, { items: payloadItems });
      setItems(normalizeItems((response as { data?: unknown })?.data));
      setToast({ message: 'Footer PDFs saved successfully.', type: 'success' });
    } catch {
      setToast({ message: 'Unable to save footer PDFs. Please try again.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageEditorHeader
        title={`${SLUG_TITLES[slug] ?? slug.replace(/-/g, ' ')} Editor`}
        description="Manage footer PDFs and their labels for the public page."
        onSave={save}
        isSaving={saving}
        onBack={onBack}
      />

      <AdminFormSection
        title="PDF Entries"
        subtitle="Footer"
        isCollapsible={false}
      >
        {loading ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
            Loading footer data...
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item, index) => {
              const resolvedHref = item.href ? (resolveUploadedAssetUrl(item.href) || item.href) : '';

              return (
                <div key={`${slug}-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Label</label>
                      <input id={`footer-label-${index}`} aria-label="footer label" className={inputClass} value={item.label} onChange={(e) => updateItem(index, { label: e.target.value })} placeholder="Audited Statement 2024-2025" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Current PDF URL</label>
                      <input id={`footer-href-${index}`} aria-label="footer href" className={inputClass} value={item.href} onChange={(e) => updateItem(index, { href: e.target.value, file: null })} placeholder="/pdfs/... or https://..." />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Description</label>
                    <textarea id={`footer-description-${index}`} aria-label="footer description" className={`${inputClass} min-h-[84px]`} value={item.description} onChange={(e) => updateItem(index, { description: e.target.value })} placeholder="Short description for this statement" />
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <label className="inline-flex cursor-pointer items-center rounded-lg bg-[#2563EB] px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700">
                      Attach PDF
                      <input
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          if (!file) return;
                          updateItem(index, { file, href: '' });
                        }}
                      />
                    </label>

                    {item.file && (
                      <span className="text-xs font-medium text-emerald-700">Selected: {item.file.name}</span>
                    )}

                    {!item.file && resolvedHref && (
                      <a
                        href={resolvedHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-blue-700 hover:underline"
                      >
                        Preview Current PDF
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="ml-auto rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100"
                    >
                      Remove Row
                    </button>
                  </div>
                </div>
              );
            })}

            <button
              type="button"
              onClick={addItem}
              className="w-full rounded-2xl border-2 border-dashed border-slate-300 px-4 py-3 text-sm font-semibold text-slate-600 hover:border-[#2563EB] hover:text-[#2563EB]"
            >
              Add PDF Row
            </button>
          </div>
        )}
      </AdminFormSection>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default FooterForm;
