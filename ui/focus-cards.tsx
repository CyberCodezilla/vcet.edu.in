import React from "react";
import { Link } from "react-router-dom";

export type Card = {
  title: string;
  src: string;
  description?: string;
  tag?: string;
  href?: string;
};

const FocusCard: React.FC<{ card: Card }> = ({ card }) => {
  const inner = (
    <div className="group relative overflow-hidden h-64 md:h-72 w-full cursor-pointer">

      {/* 4. Top border — expands left→right on hover */}
      <div className="absolute top-0 left-0 h-0.5 w-0 bg-brand-blue group-hover:w-full transition-all duration-500 ease-in-out z-20" />

      {/* 1. Image / Placeholder — keeps same composition without loading external images */}
      {card.src ? (
        <img
          src={card.src}
          alt={card.title}
          className="absolute inset-0 w-full h-full object-cover opacity-90 scale-100 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-700 via-slate-600 to-slate-700 text-white/65 transition-all duration-700 group-hover:brightness-110">
          <div className="rounded-xl border border-white/25 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em]">
            Image Holder
          </div>
        </div>
      )}

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* 2. Content block — slides up on hover */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
        <h3 className="text-lg md:text-xl font-bold text-white leading-tight uppercase tracking-widest">
          {card.title}
        </h3>
        {card.description && (
          <p className="text-white/60 text-xs mt-1.5 leading-relaxed">
            {card.description}
          </p>
        )}
        {/* 3. Button — fades in on hover */}
        <span className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 self-start px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest border border-white/40 text-white hover:bg-white hover:text-black">
          View Curriculum
        </span>
      </div>
    </div>
  );

  return card.href ? (
    <Link to={card.href} className="block">
      {inner}
    </Link>
  ) : (
    <div>{inner}</div>
  );
};

export function FocusCards({ cards }: { cards: Card[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5 w-full">
      {cards.map((card) => (
        <FocusCard key={card.title} card={card} />
      ))}
    </div>
  );
}
