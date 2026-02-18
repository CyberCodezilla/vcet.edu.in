import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight, Search, ChevronDown } from 'lucide-react';
import { NavItem } from '../types';

interface DropdownItem {
  label: string;
  href: string;
}

interface MenuGroup {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

const menuGroups: MenuGroup[] = [
  { label: 'About Us', href: '#about' },
  { 
    label: 'Admission', 
    dropdown: [
      { label: 'Admission', href: '#admissions' },
      { label: 'Training & Placements', href: '#placements' },
    ]
  },
  { 
    label: 'Academics', 
    dropdown: [
      { label: 'Departments', href: '#departments' },
      { label: 'Academics', href: '#academics' },
      { label: 'Research', href: '#research' },
      { label: 'MMS(MBA)', href: '#mms' },
      { label: 'Exam', href: '#exam' },
    ]
  },
  { 
    label: 'Campus Life', 
    dropdown: [
      { label: 'Facilities', href: '#facilities' },
      { label: 'Student life@vcet', href: '#student-life' },
      { label: 'Committees', href: '#committees' },
    ]
  },
  { 
    label: 'Accreditation', 
    dropdown: [
      { label: 'NAAC', href: '#naac' },
      { label: 'Accreditation', href: '#accreditation' },
    ]
  },
  { 
    label: 'More', 
    dropdown: [
      { label: 'Alumni Portal', href: '#alumni' },
      { label: 'Career@VCET', href: '#career' },
      { label: 'Contact Us', href: '#footer' },
    ]
  },
];

const navItems: NavItem[] = [
  { label: 'About Us', href: '#about' },
  { label: 'Admission', href: '#admissions' },
  { label: 'Departments', href: '#departments' },
  { label: 'Academics', href: '#academics' },
  { label: 'Research', href: '#research' },
  { label: 'Facilities', href: '#facilities' },
  { label: 'Student life@vcet', href: '#student-life' },
  { label: 'Committees', href: '#committees' },
  { label: 'Alumni Portal', href: '#alumni' },
  { label: 'NAAC', href: '#naac' },
  { label: 'Accreditation', href: '#accreditation' },
  { label: 'Training & Placements', href: '#placements' },
  { label: 'MMS(MBA)', href: '#mms' },
  { label: 'Career@VCET', href: '#career' },
  { label: 'Exam', href: '#exam' },
  { label: 'Contact Us', href: '#footer' },
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
          <div className="flex items-center">
            <img 
              src="/Images/VCET logo.jpeg" 
              alt="VCET Logo" 
              className="h-16 w-auto"
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {menuGroups.map((group) => (
              <div key={group.label} className="relative group/nav">
                {group.dropdown ? (
                  <>
                    <button className="text-xs font-bold uppercase tracking-widest hover:opacity-70 transition-all flex items-center gap-1">
                      {group.label}
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-200">
                      <div className={`${scrolled ? 'bg-white border border-brand-blue' : 'bg-brand-dark border border-white/20'} shadow-lg min-w-[200px] py-2`}>
                        {group.dropdown.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            className={`block px-4 py-2 text-xs font-semibold uppercase tracking-wide ${scrolled ? 'text-brand-blue hover:bg-brand-blue/10' : 'text-white hover:bg-white/10'} transition-colors`}
                          >
                            {item.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <a 
                    href={group.href} 
                    className="text-xs font-bold uppercase tracking-widest hover:underline decoration-2 underline-offset-4 transition-all"
                  >
                    {group.label}
                  </a>
                )}
              </div>
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
        <div className={`fixed inset-0 bg-brand-dark text-white z-40 flex flex-col pt-32 px-6 transition-transform duration-500 ease-in-out lg:hidden overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <nav className="flex flex-col gap-6 pb-8">
            {menuGroups.map((group) => (
              <div key={group.label}>
                {group.dropdown ? (
                  <div className="border-b border-white/20 pb-4">
                    <div className="text-2xl font-black uppercase tracking-tighter mb-3 text-gray-400">
                      {group.label}
                    </div>
                    <div className="flex flex-col gap-2 pl-4">
                      {group.dropdown.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="text-lg font-semibold hover:text-gray-400 transition-colors flex items-center gap-2"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a 
                    href={group.href} 
                    onClick={() => setIsOpen(false)}
                    className="text-3xl font-black uppercase tracking-tighter hover:text-gray-400 transition-colors border-b border-white/20 pb-4 flex justify-between items-center group"
                  >
                    {group.label}
                    <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                )}
              </div>
            ))}
          </nav>
          <div className="mt-auto mb-12 border-t border-white/20 pt-8">
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