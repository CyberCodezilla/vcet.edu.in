import React, { useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { useMmsImageHolder } from '../../../hooks/mms/useMmsImageHolder';
import { resolveUploadedAssetUrl } from '../../../utils/uploadedAssets';

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
  src?: string;
  imageSrc?: string;
}

export function ExperientialImageHolder({ label, imageSrc }: ExperientialImageHolderProps) {
  const hookImageUrl = useMmsImageHolder('experiential', label, !!imageSrc);
  const imageUrl = imageSrc || hookImageUrl;
  const resolvedImageUrl = imageUrl ? resolveUploadedAssetUrl(imageUrl) ?? imageUrl : null;
  const [isLoaded, setIsLoaded] = useState(false);
  const cardHeightClass = 'h-[400px]';
  const frameClass = 'h-[250px]';

  return (
    <article className={`group relative overflow-hidden rounded-none border border-brand-blue/25 bg-gradient-to-br from-slate-50 to-brand-light/45 p-[3px] shadow-[0_18px_30px_-24px_rgba(11,61,145,0.65)] ${cardHeightClass}`}>
      <div className="relative flex h-full flex-col rounded-none border border-brand-blue/20 bg-white p-4 sm:p-5">
        {resolvedImageUrl ? (
          <>
            {!isLoaded && (
              <div className={`absolute inset-x-4 top-4 sm:inset-x-5 flex items-center justify-center bg-brand-navy animate-pulse ${frameClass}`}>
                <ImageIcon className="h-8 w-8 text-brand-blue/20" />
              </div>
            )}
            <div className={`w-full rounded-none bg-brand-navy ${frameClass}`}>
              <img
                src={resolvedImageUrl}
                alt={label}
                onLoad={() => setIsLoaded(true)}
                className={`block h-full w-full rounded-none object-contain transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                referrerPolicy="no-referrer"
              />
            </div>
          </>
        ) : (
          <div className={`flex items-center justify-center rounded-none border-2 border-dashed border-brand-blue/30 bg-brand-navy text-center ${frameClass}`}>
            <div className="space-y-2 px-4">
              <ImageIcon className="mx-auto h-9 w-9 text-brand-blue/65" />      
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">Image Holder</p>
            </div>
          </div>
        )}

        <div className="mt-3 flex flex-1 flex-col justify-end border-t border-brand-blue/10 pt-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">Image Title</p>
          <p className="mt-1 text-sm font-semibold text-brand-navy">{label}</p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand-gold via-yellow-300 to-brand-gold/70" />
      <div className="pointer-events-none absolute right-0 top-0 h-8 w-8 border-r-[3px] border-t-[3px] border-brand-gold/90" />
    </article>
  );
}

export function ExperientialSkeletonHolder() {
  return (
    <article className="group relative h-[400px] overflow-hidden rounded-none border border-brand-blue/25 bg-gradient-to-br from-slate-50 to-brand-light/45 p-[3px] shadow-[0_18px_30px_-24px_rgba(11,61,145,0.65)] animate-pulse">
      <div className="flex h-full flex-col rounded-none border border-brand-blue/20 bg-white p-4 sm:p-5">
        <div className="flex h-[250px] items-center justify-center bg-brand-navy">
          <ImageIcon className="h-9 w-9 text-brand-blue/20" />
        </div>
        <div className="mt-3 flex flex-1 flex-col justify-end border-t border-brand-blue/10 pt-3">
          <div className="h-3 w-24 bg-slate-200" />
          <div className="mt-2 h-4 w-40 bg-slate-200" />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand-gold via-yellow-300 to-brand-gold/70 opacity-30" />
      <div className="pointer-events-none absolute right-0 top-0 h-8 w-8 border-r-[3px] border-t-[3px] border-brand-gold/30" />
    </article>
  );
}
