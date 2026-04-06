import React, { useEffect, useRef, useState } from 'react';

interface PageEditorHeaderProps {
  title: string;
  description?: string;
  onSave: () => void | Promise<void>;
  isSaving?: boolean;
  saveLabel?: string;
  disabled?: boolean;
  showBackButton?: boolean;
  onBack?: () => void;
  className?: string;
}

const PageEditorHeader: React.FC<PageEditorHeaderProps> = ({
  title,
  description,
  onSave,
  isSaving = false,
  saveLabel = 'Save Changes',
  disabled = false,
  showBackButton = true,
  onBack,
  className = '',
}) => {
  const [justSaved, setJustSaved] = useState(false);
  const saveRequestedRef = useRef(false);
  const prevSavingRef = useRef(isSaving);

  useEffect(() => {
    const wasSaving = prevSavingRef.current;
    prevSavingRef.current = isSaving;
    if (wasSaving && !isSaving && saveRequestedRef.current) {
      setJustSaved(true);
      const timeout = setTimeout(() => setJustSaved(false), 1400);
      saveRequestedRef.current = false;
      return () => clearTimeout(timeout);
    }
    return;
  }, [isSaving]);

  const handleSaveClick = () => {
    setJustSaved(false);
    saveRequestedRef.current = true;
    void onSave();
  };

  return (
    <div
      className={`sticky top-18 z-30 flex items-center justify-between gap-4 rounded-2xl border border-slate-200/70 bg-white px-6 py-4 shadow-sm md:px-8 ${className}`}
    >
      <div className="flex min-w-0 items-center gap-4">
        {showBackButton && (
          <button
            type="button"
            onClick={onBack}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500 transition-colors hover:bg-slate-100"
            aria-label="Go back"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-semibold text-slate-900">{title}</h1>
          {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
        </div>
      </div>

      <button
        type="button"
        onClick={handleSaveClick}
        disabled={isSaving || disabled}
        className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSaving && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />}
        {isSaving ? 'Saving...' : justSaved ? 'Saved' : saveLabel}
      </button>
    </div>
  );
};

export default PageEditorHeader;
