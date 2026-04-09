import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { resolveUploadedAssetUrl } from '../utils/uploadedAssets';

interface ImagePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
  title?: string;
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({ 
  isOpen, 
  onClose, 
  imageUrl, 
  title = 'Event Poster' 
}) => {
  const trimmedImageUrl = imageUrl?.trim() || null;
  const safeImageUrl = trimmedImageUrl ? resolveUploadedAssetUrl(trimmedImageUrl) ?? trimmedImageUrl : null;
  if (!isOpen || !safeImageUrl) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div 
      className="fixed inset-0 z-[10010] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md transition-opacity duration-200"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Image container */}
      <div 
        className="relative w-full h-full flex items-center justify-center max-w-6xl max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 z-[10011] w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-black/90 hover:bg-black text-white transition-colors border border-white/60 shadow-2xl"
          aria-label="Close image preview"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <img
          src={safeImageUrl}
          alt={title}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl ring-1 ring-white/20"
        />
      </div>
    </div>,
    document.body,
  );
};

export default ImagePreviewModal;
