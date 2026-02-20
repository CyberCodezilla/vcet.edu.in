import React from "react";
import { motion } from "motion/react";

function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden bg-slate-950 w-full z-0",
        className
      )}
    >
      {/* Lamp beams */}
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        {/* Left conic beam */}
        <motion.div
          initial={{ opacity: 0.5, width: "10rem" }}
          whileInView={{ opacity: 1, width: "24rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage:
              "conic-gradient(from 70deg at center top, #D4A843, transparent, transparent)",
          }}
          className="absolute inset-auto right-1/2 h-40 overflow-visible w-[24rem] text-white"
        >
          <div className="absolute w-full left-0 bg-slate-950 h-28 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-32 h-full left-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Right conic beam */}
        <motion.div
          initial={{ opacity: 0.5, width: "10rem" }}
          whileInView={{ opacity: 1, width: "24rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage:
              "conic-gradient(from 290deg at center top, transparent, transparent, #D4A843)",
          }}
          className="absolute inset-auto left-1/2 h-40 w-[24rem] text-white"
        >
          <div className="absolute w-32 h-full right-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-full right-0 bg-slate-950 h-28 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* Dark blur layer */}
        <div className="absolute top-1/2 h-36 w-full translate-y-8 scale-x-150 bg-slate-950 blur-2xl" />
        {/* Glow orb */}
        <div className="absolute inset-auto z-50 h-24 w-[20rem] -translate-y-1/2 rounded-full bg-amber-400/40 blur-3xl" />
        {/* Inner bright orb */}
        <motion.div
          initial={{ width: "6rem" }}
          whileInView={{ width: "12rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-30 h-24 w-48 -translate-y-[4rem] rounded-full bg-amber-300/60 blur-2xl"
        />
        {/* Lamp line */}
        <motion.div
          initial={{ width: "10rem" }}
          whileInView={{ width: "24rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-50 h-0.5 w-[24rem] -translate-y-[5rem] bg-amber-300"
        />
        {/* Dark mask below line */}
        <div className="absolute inset-auto z-40 h-32 w-full -translate-y-[9rem] bg-slate-950" />
      </div>

      {/* Content */}
      <div className="relative z-50 flex -translate-y-28 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};
