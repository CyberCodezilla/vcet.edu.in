import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  theme?: 'dark' | 'light';
  align?: 'left' | 'center';
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, theme = 'light', align = 'left' }) => {
  const textColor = theme === 'dark' ? 'text-white' : 'text-brand-blue';
  const subtitleColor = theme === 'dark' ? 'text-gray-400' : 'text-slate-500';
  const alignment = align === 'center' ? 'text-center items-center' : '';

  return (
    <div className={`mb-14 flex flex-col ${alignment}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-0.5 bg-brand-gold"></div>
        <span className={`text-[11px] font-bold uppercase tracking-[0.2em] ${theme === 'dark' ? 'text-brand-gold' : 'text-brand-gold'}`}>
          {title}
        </span>
      </div>
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight leading-tight ${textColor}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base md:text-lg max-w-2xl leading-relaxed ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
