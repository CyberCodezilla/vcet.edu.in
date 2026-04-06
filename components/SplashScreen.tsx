import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const splashImages = [
  { src: '/images/Main Page/Packages/HIGEST_Package_banner.jpg', label: 'Highest Package' },
  { src: '/images/Main Page/Packages/AICTE-Pamphlet_page-0001.jpg', label: 'AICTE Pamphlet' },
];

const SplashScreen: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const seen = sessionStorage.getItem('splashSeen');
    if (!seen) {
      setVisible(true);
      sessionStorage.setItem('splashSeen', 'true');
    }
  }, []);

  // Auto-advance every 10s
  useEffect(() => {
    if (!visible) return;
    const t = setInterval(() => setIndex(i => (i + 1) % splashImages.length), 10000);
    return () => clearInterval(t);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 backdrop-blur-sm"
      onClick={() => setVisible(false)}
    >
      <div
        className="relative flex flex-col items-center max-h-[96vh] max-w-[95vw] w-full mx-4"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-2 right-2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {/* Image */}
        <img
          src={splashImages[index].src}
          alt={splashImages[index].label}
          className="w-full h-auto block shadow-2xl"
          style={{ maxHeight: '86vh', objectFit: 'contain', width: '100%' }}
        />

        {/* Navigation */}
        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={() => setIndex(i => (i - 1 + splashImages.length) % splashImages.length)}
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          {splashImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`rounded-full transition-all duration-200 ${i === index ? 'w-5 h-2.5 bg-brand-gold' : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'}`}
            />
          ))}
          <button
            onClick={() => setIndex(i => (i + 1) % splashImages.length)}
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
        <p className="text-white/40 text-[11px] uppercase tracking-widest mt-2">
          {splashImages[index].label} — {index + 1} / {splashImages.length} &nbsp;·&nbsp; Click outside to close
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
