import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { resolveUploadedAssetUrl } from '../utils/uploadedAssets';

let activeScrollLocks = 0;
let previousBodyOverflow = '';
let previousBodyPaddingRight = '';

const lockBodyScroll = () => {
  if (typeof window === 'undefined') return;

  const body = document.body;
  const docEl = document.documentElement;

  if (activeScrollLocks === 0) {
    previousBodyOverflow = body.style.overflow;
    previousBodyPaddingRight = body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - docEl.clientWidth;
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    body.style.overflow = 'hidden';
  }

  activeScrollLocks += 1;
};

const unlockBodyScroll = () => {
  if (typeof window === 'undefined') return;

  activeScrollLocks = Math.max(0, activeScrollLocks - 1);

  if (activeScrollLocks === 0) {
    const body = document.body;
    body.style.overflow = previousBodyOverflow;
    body.style.paddingRight = previousBodyPaddingRight;
  }
};

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
  const isRenderable = isOpen && Boolean(safeImageUrl);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (!isRenderable) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    lockBodyScroll();
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      unlockBodyScroll();
    };
  }, [isRenderable, onClose]);

  if (!isRenderable || !safeImageUrl) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[10010] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md transition-opacity duration-200"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Image container */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[10012] w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/90 hover:bg-black text-white transition-colors border border-white/60 shadow-2xl"
        aria-label="Close image preview"
      >
        <X className="w-6 h-6" />
      </button>

      <div 
        className="relative w-full h-full flex items-center justify-center px-4 py-12 sm:px-8 sm:py-14"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={safeImageUrl}
          alt={title}
          className="max-w-[min(96vw,1200px)] max-h-[calc(100vh-7rem)] object-contain rounded-lg shadow-2xl ring-1 ring-white/20"
        />
      </div>
    </div>,
    document.body,
  );
};

export default ImagePreviewModal;
