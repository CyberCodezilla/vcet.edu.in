import React from 'react';
import { ImageIcon } from 'lucide-react';
import { useMmsImageHolder } from '../../../hooks/mms/useMmsImageHolder';

interface ExperientialSectionCardProps {
  title: string;
  children: React.ReactNode;
}

export function ExperientialSectionCard({ title, children }: ExperientialSectionCardProps) {
  return (
    <section className="overflow-hidden rounded-none border border-brand-navy/25 bg-white shadow-[0_16px_30px_-24px_rgba(11,61,145,0.6)]">
      <div className="border-b border-brand-gold/55 bg-gradient-to-r from-brand-navy via-brand-blue to-brand-navy px-5 py-4">
        <h2 className="text-2xl font-display font-bold text-brand-gold sm:text-3xl">{title}</h2>
      </div>
      <div className="space-y-5 p-5 sm:p-7">{children}</div>
    </section>
  );
}

interface ExperientialImageHolderProps {
  label: string;
}

export function ExperientialImageHolder({ label }: ExperientialImageHolderProps) {
  const imageUrl = useMmsImageHolder('experiential', label);

  return (
    <article className="group relative overflow-hidden rounded-none border border-brand-blue/25 bg-gradient-to-br from-slate-50 to-brand-light/45 p-[3px] shadow-[0_18px_30px_-24px_rgba(11,61,145,0.65)]">
      <div className="rounded-none border border-brand-blue/20 bg-white p-4 sm:p-5">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={label}
            className="block min-h-[220px] w-full rounded-none object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="flex min-h-[220px] items-center justify-center rounded-none border-2 border-dashed border-brand-blue/30 bg-gradient-to-br from-brand-light/35 to-slate-100 text-center">
            <div className="space-y-2 px-4">
              <ImageIcon className="mx-auto h-9 w-9 text-brand-blue/65" />
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">Image Holder</p>
              <p className="text-sm font-semibold text-brand-navy">{label}</p>
            </div>
          </div>
        )}
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand-gold via-yellow-300 to-brand-gold/70" />
      <div className="pointer-events-none absolute right-0 top-0 h-8 w-8 border-r-[3px] border-t-[3px] border-brand-gold/90" />
    </article>
  );
}
