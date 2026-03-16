import React from 'react';
import { ImageIcon } from 'lucide-react';

interface PlacementSectionCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function PlacementSectionCard({ title, subtitle, children }: PlacementSectionCardProps) {
  return (
    <section className="overflow-hidden rounded-none border border-brand-navy/25 bg-white shadow-[0_16px_34px_-24px_rgba(11,61,145,0.58)]">
      <div className="border-b border-brand-gold/55 bg-gradient-to-r from-brand-navy via-brand-blue to-brand-navy px-5 py-5 sm:px-7">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold/90">Training and Placement</p>
        <h3 className="mt-1 text-2xl font-display font-bold text-white sm:text-3xl">{title}</h3>
        {subtitle ? <p className="mt-1 text-sm text-brand-navylight">{subtitle}</p> : null}
      </div>
      <div className="space-y-6 px-5 py-6 sm:px-7">{children}</div>
    </section>
  );
}

interface PlacementImageHolderProps {
  label: string;
  size?: 'default' | 'large';
}

export function PlacementImageHolder({ label, size = 'default' }: PlacementImageHolderProps) {
  const minHeightClass = size === 'large' ? 'min-h-[300px]' : 'min-h-[220px]';

  return (
    <article className="group relative overflow-hidden rounded-none border border-brand-blue/20 bg-gradient-to-br from-slate-50 to-brand-light/35 p-[3px] shadow-[0_16px_28px_-20px_rgba(11,61,145,0.6)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_36px_-20px_rgba(11,61,145,0.65)]">
      <div className="rounded-none border border-brand-blue/15 bg-white p-4">
        <div className={`flex ${minHeightClass} items-center justify-center rounded-none border-2 border-dashed border-brand-blue/30 bg-gradient-to-br from-brand-light/30 to-slate-100 text-center`}>
          <div className="space-y-2 px-4">
            <ImageIcon className="mx-auto h-9 w-9 text-brand-blue/65" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">Image Holder</p>
            <p className="text-sm font-semibold text-brand-navy">{label}</p>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand-gold via-yellow-300 to-brand-gold/75" />
      <div className="pointer-events-none absolute right-0 top-0 h-8 w-8 border-r-[3px] border-t-[3px] border-brand-gold/90" />
    </article>
  );
}

interface PlacementDataTableCardProps {
  title: string;
  children: React.ReactNode;
}

export function PlacementDataTableCard({ title, children }: PlacementDataTableCardProps) {
  return (
    <section className="overflow-hidden rounded-none border border-brand-navy/25 bg-white shadow-[0_18px_36px_-26px_rgba(11,61,145,0.6)]">
      <div className="border-b border-brand-gold/60 bg-gradient-to-r from-brand-navy via-brand-blue to-brand-navy px-5 py-4 sm:px-7">
        <h3 className="text-2xl font-display font-bold text-white sm:text-3xl">{title}</h3>
      </div>
      <div className="px-3 py-3 sm:px-4 sm:py-4 md:px-5">{children}</div>
    </section>
  );
}
