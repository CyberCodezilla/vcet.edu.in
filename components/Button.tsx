import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'white';
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
  const baseStyles = "inline-flex items-center justify-center px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 border-2";
  
  const variants = {
    primary: "border-brand-blue bg-brand-blue text-white hover:bg-white hover:text-brand-blue",
    outline: "border-brand-blue bg-transparent text-brand-blue hover:bg-brand-blue hover:text-white",
    white: "border-white bg-white text-brand-blue hover:bg-brand-blue hover:text-white hover:border-brand-blue"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {icon && <ArrowRight className="ml-2 w-4 h-4" />}
    </button>
  );
};

export default Button;