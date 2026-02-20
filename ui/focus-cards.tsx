import React, { useState, useCallback } from "react";

export type Card = {
  title: string;
  src: string;
  description?: string;
  tag?: string;
};

type FocusCardProps = {
  card: Card;
  index: number;
  hovered: number | null;
  setHovered: (index: number | null) => void;
};

const FocusCard: React.FC<FocusCardProps> = ({ card, index, hovered, setHovered }) => (
  <div
    onMouseEnter={() => setHovered(index)}
    onMouseLeave={() => setHovered(null)}
    className={`rounded-2xl relative overflow-hidden h-72 md:h-96 w-full transition-all duration-500 ease-out cursor-pointer
      ${hovered !== null && hovered !== index ? "opacity-40 scale-[0.97] blur-[1px]" : "opacity-100 scale-100 blur-0"}
    `}
  >
    {/* Background image */}
    <img
      src={card.src}
      alt={card.title}
      className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out
        ${hovered === index ? "scale-110" : "scale-100"}
      `}
    />

    {/* Gradient overlay — always present at bottom */}
    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />

    {/* Hover overlay */}
    <div
      className={`absolute inset-0 bg-brand-navy/30 transition-opacity duration-500
        ${hovered === index ? "opacity-100" : "opacity-0"}
      `}
    />

    {/* Top accent bar on hover */}
    <div
      className={`absolute top-0 left-0 h-0.5 bg-brand-gold transition-all duration-700 ease-out
        ${hovered === index ? "w-full" : "w-0"}
      `}
    />

    {/* Content */}
    <div className="absolute inset-0 p-6 flex flex-col justify-end">
      {/* Tag */}
      {card.tag && (
        <span
          className={`text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold mb-2 transition-all duration-300
            ${hovered === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
          `}
        >
          {card.tag}
        </span>
      )}

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-display font-bold text-white leading-tight">
        {card.title}
      </h3>

      {/* Description — slides up on hover */}
      {card.description && (
        <p
          className={`text-white/70 text-sm mt-1.5 leading-relaxed transition-all duration-500
            ${hovered === index ? "opacity-100 translate-y-0 max-h-20" : "opacity-0 translate-y-3 max-h-0"}
          `}
        >
          {card.description}
        </p>
      )}
    </div>
  </div>
);

export function FocusCards({ cards }: { cards: Card[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const handleSet = useCallback((v: number | null) => setHovered(v), []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
      {cards.map((card, index) => (
        <FocusCard
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={handleSet}
        />
      ))}
    </div>
  );
}
