import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  theme?: 'dark' | 'light';
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, theme = 'light' }) => {
  const textColor = theme === 'dark' ? 'text-white' : 'text-brand-blue';
  const borderColor = theme === 'dark' ? 'border-white/20' : 'border-brand-blue/20';

  return (
    <div className={`mb-16 pb-6 border-b ${borderColor}`}>
      <h2 className={`text-4xl md:text-6xl font-black uppercase tracking-tighter ${textColor}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg md:text-xl max-w-2xl ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;