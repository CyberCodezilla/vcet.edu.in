import React, { useCallback, useEffect, useState } from 'react';

type HorizontalTableShellProps = {
  children: React.ReactNode;
  storageKey: string;
  scrollerClassName?: string;
  showEdgeFades?: boolean;
};

export default function HorizontalTableShell({
  children,
  storageKey,
  scrollerClassName = '',
  showEdgeFades = true,
}: HorizontalTableShellProps) {
  const [showHint, setShowHint] = useState(false);

  const dismissHint = useCallback(() => {
    setShowHint(false);

    try {
      window.localStorage.setItem(storageKey, 'seen');
    } catch {
      // Ignore storage failures in private mode or strict browsers.
    }
  }, [storageKey]);

  useEffect(() => {
    try {
      const hasSeen = window.localStorage.getItem(storageKey) === 'seen';
      setShowHint(!hasSeen);
    } catch {
      setShowHint(true);
    }
  }, [storageKey]);

  return (
    <div className="relative">
      <div
        className={`overflow-x-auto snap-x snap-proximity lg:snap-none ${scrollerClassName}`}
        onPointerDown={dismissHint}
        onTouchStart={dismissHint}
        onWheel={dismissHint}
        onScroll={dismissHint}
      >
        {children}
      </div>

      {showEdgeFades ? (
        <>
          <div aria-hidden className="pointer-events-none absolute bottom-[1px] left-[1px] top-[1px] w-8 bg-gradient-to-r from-white via-white/90 to-transparent lg:hidden" />
          <div aria-hidden className="pointer-events-none absolute bottom-[1px] right-[1px] top-[1px] w-8 bg-gradient-to-l from-white via-white/90 to-transparent lg:hidden" />
        </>
      ) : null}

      {showHint ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-2 z-30 flex justify-center px-2 lg:hidden">
          <span className="border border-brand-gold/70 bg-gradient-to-r from-brand-gold/25 via-[#f8e7b0] to-brand-gold/25 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1b3154] shadow-[0_6px_14px_-8px_rgba(195,160,82,0.8)] backdrop-blur-[1px]">
            Swipe to view more
          </span>
        </div>
      ) : null}
    </div>
  );
}
