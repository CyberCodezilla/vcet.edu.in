import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'white' | 'gold';
  children: React.ReactNode;
  icon?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  icon = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-7 py-3.5 text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300 rounded-lg";
  
  const variants = {
    primary: "bg-brand-blue text-white hover:bg-brand-navy shadow-sm hover:shadow-lg hover:-translate-y-0.5",
    outline: "border-2 border-brand-blue bg-transparent text-brand-blue hover:bg-brand-blue hover:text-white",
    white: "bg-white text-brand-blue hover:bg-brand-gold hover:text-brand-dark shadow-sm hover:shadow-lg hover:-translate-y-0.5",
    gold: "bg-brand-gold text-brand-dark hover:bg-brand-gold-light shadow-sm hover:shadow-lg hover:-translate-y-0.5"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {icon && <ArrowRight className="ml-2 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />}
    </button>
  );
};

export default Button;
