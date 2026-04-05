import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface AdminFormSectionProps {
  title: string;
  icon?: React.ReactNode | string;
  subtitle?: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  isCollapsible?: boolean;
  className?: string;
}

/**
 * A shared, premium, and optionally collapsible section component for admin forms.
 * Uses framer-motion for smooth height animations and follows the rounded-4xl design system.
 */
const AdminFormSection: React.FC<AdminFormSectionProps> = ({
  title,
  icon,
  subtitle,
  children,
  isOpen = true,
  onToggle,
  isCollapsible = true,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-4xl shadow-lg shadow-slate-200/40 border border-slate-100 overflow-hidden transition-all duration-300 ${className}`}>
      {/* Header */}
      <div 
        className={`px-8 py-5 flex items-center justify-between gap-3 flex-wrap cursor-pointer select-none border-b border-slate-50 transition-colors hover:bg-slate-50/50 ${!isOpen ? 'border-transparent' : ''}`}
        onClick={() => isCollapsible && onToggle && onToggle()}
      >
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 shadow-sm border border-slate-200/50">
              {typeof icon === 'string' ? (
                <span className="text-lg">{icon}</span>
              ) : (
                icon
              )}
            </div>
          )}
          <h3 className="text-sm font-extrabold text-[#111827] uppercase tracking-wider">{title}</h3>
        </div>
        
        <div className="flex items-center gap-4 ml-auto">
          {subtitle && (
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              {subtitle}
            </p>
          )}
          
          {isCollapsible && (
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="text-slate-400"
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          )}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="p-8 space-y-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminFormSection;
