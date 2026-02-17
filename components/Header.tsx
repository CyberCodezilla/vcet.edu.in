import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Departments', href: '#departments' },
  { label: 'Admissions', href: '#admissions' },
  { label: 'NAAC', href: '#naac' },
  { label: 'Facilities', href: '#facilities' },
  { label: 'Contact', href: '#footer' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white border-b border-brand-blue' : 'bg-transparent text-white'}`}>
      <div className={`container mx-auto px-6 h-20 flex items-center justify-between ${scrolled ? 'text-brand-blue' : 'text-white mix-blend-difference'}`}>
        
        {/* Logo Area */}
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 border-2 flex items-center justify-center font-black text-xl ${scrolled ? 'border-brand-blue' : 'border-white'}`}>
            V
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-none uppercase tracking-wider">VCET</span>
            <span className="text-[10px] font-medium leading-none uppercase tracking-widest opacity-80">Vidyavardhini's College of Engg</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              className="text-sm font-bold uppercase tracking-widest hover:underline decoration-2 underline-offset-4 transition-all"
            >
              {item.label}
            </a>
          ))}
          <a href="#admissions" className={`flex items-center gap-1 px-4 py-2 border ${scrolled ? 'border-brand-blue hover:bg-brand-blue hover:text-white' : 'border-white hover:bg-white hover:text-brand-blue'} transition-all text-xs font-bold uppercase tracking-widest`}>
            Apply <ArrowUpRight className="w-3 h-3" />
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-brand-dark text-white z-40 flex flex-col pt-32 px-6 transition-transform duration-500 ease-in-out lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <nav className="flex flex-col gap-8">
          {navItems.map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              onClick={() => setIsOpen(false)}
              className="text-4xl font-black uppercase tracking-tighter hover:text-gray-400 transition-colors border-b border-white/20 pb-4 flex justify-between items-center group"
            >
              {item.label}
              <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </nav>
        <div className="mt-auto mb-12">
          <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">Contact</p>
          <p className="text-xl font-bold">vcet_inbox@vcet.edu.in</p>
          <p className="text-xl font-bold">+91 0250-2338234</p>
        </div>
      </div>
    </header>
  );
};

export default Header;