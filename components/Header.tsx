import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight, Search } from 'lucide-react';
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Increased threshold to account for TopBanner
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Search Overlay behavior
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearchOpen]);

  return (
    <>
      <header className={`sticky top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white border-b border-brand-blue shadow-md' : 'bg-transparent text-white'}`}>
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
            
            {/* Search Trigger (Desktop) */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className={`p-2 rounded-full transition-colors ${scrolled ? 'hover:bg-brand-blue/10' : 'hover:bg-white/20'}`}
              aria-label="Open Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <a href="#admissions" className={`flex items-center gap-1 px-4 py-2 border ${scrolled ? 'border-brand-blue hover:bg-brand-blue hover:text-white' : 'border-white hover:bg-white hover:text-brand-blue'} transition-all text-xs font-bold uppercase tracking-widest`}>
              Apply <ArrowUpRight className="w-3 h-3" />
            </a>
          </nav>

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center gap-4">
            {/* Search Trigger (Mobile) */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className={`p-2 rounded-full transition-colors ${scrolled ? 'hover:bg-brand-blue/10' : 'hover:bg-white/20'}`}
              aria-label="Open Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button 
              className="lg:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
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

      {/* Full Screen Search Overlay */}
      <div className={`fixed inset-0 z-[100] bg-brand-dark/95 backdrop-blur-md transition-all duration-500 ease-in-out ${isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {/* Close Button */}
        <button 
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-6 right-6 p-2 text-white/50 hover:text-white hover:rotate-90 transition-all duration-300"
            aria-label="Close Search"
        >
            <X className="w-10 h-10" />
        </button>

        <div className="container mx-auto px-6 h-full flex flex-col justify-center items-center">
             <div className="w-full max-w-4xl relative">
                <label htmlFor="site-search" className="block text-brand-blue text-sm font-bold uppercase tracking-[0.2em] mb-4 pl-1">
                    What are you looking for?
                </label>
                <div className="relative group">
                    <input
                        ref={searchInputRef}
                        type="text"
                        id="site-search"
                        className="w-full bg-transparent border-b-2 border-white/20 text-3xl md:text-5xl lg:text-6xl font-black text-white py-4 pr-12 focus:outline-none focus:border-brand-blue transition-colors placeholder:text-white/10"
                        placeholder="Type to search..."
                    />
                    <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 text-white/20 group-focus-within:text-brand-blue transition-colors" />
                </div>
                
                {/* Quick Suggestions */}
                <div className="mt-10">
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">Popular Searches</p>
                    <div className="flex flex-wrap gap-3">
                        {['Computer Engineering', 'Admissions 2024', 'Placement Records', 'Exam Cell', 'Faculty Directory'].map((item) => (
                            <button key={item} className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:bg-white hover:text-brand-dark hover:border-white transition-all">
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
             </div>
        </div>
      </div>
    </>
  );
};

export default Header;