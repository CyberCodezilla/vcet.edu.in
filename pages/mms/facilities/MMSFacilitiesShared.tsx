import React from 'react';
import { ImageIcon } from 'lucide-react';
import { useMmsImageHolder } from '../../../hooks/mms/useMmsImageHolder';
import { resolveUploadedAssetUrl } from '../../../utils/uploadedAssets';

interface FacilitiesSectionCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export function FacilitiesSectionCard({ title, subtitle, children }: FacilitiesSectionCardProps) {
  return (
    <section className="overflow-hidden rounded-none border border-brand-navy/25 bg-white shadow-[0_16px_32px_-22px_rgba(11,61,145,0.5)]">
      <div className="border-b border-brand-gold/55 bg-gradient-to-r from-brand-navy via-brand-blue to-brand-navy px-5 py-4 sm:px-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold/90">Master of Management Studies</p>
        <h3 className="mt-1 text-2xl font-display font-bold text-white sm:text-3xl">{title}</h3>
        <p className="mt-1 text-sm text-brand-navylight">{subtitle}</p>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}

interface FacilitiesImageHolderProps {
  label: string;
  size?: 'default' | 'large';
  src?: string;
  imageSrc?: string;
}

export function FacilitiesImageHolder(props: FacilitiesImageHolderProps) {
  const { label, size = 'default' } = props;
  const cardHeightClass = 'h-[400px]';
  const frameClass = 'h-[250px]';
  const imageUrl = props.src || props.imageSrc;
  const resolvedImageUrl = imageUrl ? resolveUploadedAssetUrl(imageUrl) ?? imageUrl : null;

  return (
    <article className={`group relative overflow-hidden rounded-none border border-brand-blue/20 bg-gradient-to-br from-slate-50 to-brand-light/35 p-[3px] shadow-[0_16px_28px_-20px_rgba(11,61,145,0.6)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_36px_-20px_rgba(11,61,145,0.65)] ${cardHeightClass}`}>
      <div className="flex h-full flex-col rounded-none border border-brand-blue/15 bg-white p-4">
        {resolvedImageUrl ? (
          <div className={`w-full rounded-none bg-brand-navy ${frameClass}`}>
            <img
              src={resolvedImageUrl}
              alt={label}
              className="block h-full w-full rounded-none object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
        ) : (
          <div className={`flex ${frameClass} items-center justify-center rounded-none border-2 border-dashed border-brand-blue/30 bg-brand-navy text-center`}>
            <div className="space-y-2 px-4">
              <ImageIcon className="mx-auto h-9 w-9 text-brand-blue/65" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">Image Holder</p>
            </div>
          </div>
        )}

        <div className="mt-3 flex flex-1 flex-col justify-end border-t border-brand-blue/10 pt-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">Image Title</p>
          <p className="mt-1 text-sm font-semibold text-brand-navy">{label}</p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand-gold via-yellow-300 to-brand-gold/75" />
      <div className="pointer-events-none absolute right-0 top-0 h-8 w-8 border-r-[3px] border-t-[3px] border-brand-gold/90" />
    </article>
  );
}
