import React, { useEffect, useMemo, useRef, useState } from "react";

type Grid = { rows: number; cols: number };

const PRESET_GRIDS: Record<string, Grid> = {
  "6x4": { rows: 4, cols: 6 },
  "8x8": { rows: 8, cols: 8 },
  "8x3": { rows: 3, cols: 8 },
  "4x6": { rows: 6, cols: 4 },
  "3x8": { rows: 8, cols: 3 },
};

interface PixelImageProps {
  src: string;
  alt?: string;
  grid?: keyof typeof PRESET_GRIDS;
  customGrid?: Grid;
  grayscaleAnimation?: boolean;
  pixelFadeInDuration?: number; // ms per tile
  maxAnimationDelay?: number;   // max random tile delay
  colorRevealDelay?: number;    // ms after which colour appears
  /** Extra delay (ms) before the whole animation starts — use for stagger */
  animationDelay?: number;
  className?: string;
}

export function PixelImage({
  src,
  alt = "image",
  grid = "6x4",
  customGrid,
  grayscaleAnimation = true,
  pixelFadeInDuration = 900,
  maxAnimationDelay = 1100,
  colorRevealDelay = 1300,
  animationDelay = 0,
  className = "",
}: PixelImageProps) {
  const { rows, cols } = customGrid ?? PRESET_GRIDS[grid];
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showColor, setShowColor] = useState(false);

  // Generate grid pieces with clip-paths and random delays once
  const pieces = useMemo(() => {
    const total = rows * cols;
    return Array.from({ length: total }, (_, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const x1 = (col / cols) * 100;
      const x2 = ((col + 1) / cols) * 100;
      const y1 = (row / rows) * 100;
      const y2 = ((row + 1) / rows) * 100;
      return {
        clipPath: `polygon(${x1}% ${y1}%, ${x2}% ${y1}%, ${x2}% ${y2}%, ${x1}% ${y2}%)`,
        delay: Math.random() * maxAnimationDelay,
      };
    });
  }, [rows, cols, maxAnimationDelay]);

  // Trigger animation when container enters viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          obs.disconnect();
          // Stagger: wait animationDelay before starting pixel reveal
          const t1 = setTimeout(() => setIsVisible(true), animationDelay);
          // Remove grayscale after all tiles have faded + colour delay
          const t2 = setTimeout(
            () => setShowColor(true),
            animationDelay + colorRevealDelay
          );
          return () => { clearTimeout(t1); clearTimeout(t2); };
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [animationDelay, colorRevealDelay]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none overflow-hidden ${className}`}
    >
      {pieces.map((piece, index) => (
        <div
          key={index}
          className="absolute inset-0"
          style={{
            clipPath: piece.clipPath,
            opacity: isVisible ? 1 : 0,
            transition: `opacity ${pixelFadeInDuration}ms ease-out`,
            transitionDelay: isVisible ? `${piece.delay}ms` : "0ms",
          }}
        >
          <img
            src={src}
            alt={`${alt} piece ${index + 1}`}
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter:
                grayscaleAnimation && !showColor ? "grayscale(100%)" : "none",
              transition: grayscaleAnimation
                ? `filter ${pixelFadeInDuration}ms cubic-bezier(0.4,0,0.2,1)`
                : "none",
              transitionDelay: grayscaleAnimation
                ? `${animationDelay + colorRevealDelay}ms`
                : "0ms",
            }}
          />
        </div>
      ))}
    </div>
  );
}
