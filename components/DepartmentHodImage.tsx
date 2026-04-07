import React from 'react';
import { resolveUploadedAssetUrl } from '../utils/uploadedAssets';

interface DepartmentHodImageProps {
  imageSrc?: string | null;
  alt?: string;
  className?: string;
  placeholderLabel?: string;
  placeholderHint?: string;
}

const DepartmentHodImage: React.FC<DepartmentHodImageProps> = ({
  imageSrc,
  alt = 'Department HOD',
  className = 'mx-auto max-w-md text-center space-y-4',
  placeholderLabel = 'HOD Image Placeholder',
  placeholderHint = 'Add image later in this area',
}) => {
  const resolvedImageSrc = imageSrc ? resolveUploadedAssetUrl(imageSrc) ?? imageSrc : null;

  return (
    <div className={className}>
      <div className={resolvedImageSrc ? 'overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm' : 'rounded-3xl border-2 border-dashed border-blue-200 bg-blue-50/40 px-6 py-12'}>
        {resolvedImageSrc ? (
          <img src={resolvedImageSrc} alt={alt} className="aspect-[4/5] w-full object-cover" />
        ) : (
          <>
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm">
              <i className="ph ph-image text-2xl" />
            </div>
            <p className="text-base font-semibold text-slate-600">{placeholderLabel}</p>
            <p className="mt-1 text-sm text-slate-400">{placeholderHint}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default DepartmentHodImage;