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
      { label: 'MMS (MBA)', href: '#mms' },
      { label: 'Exam', href: '#exam' },
    ]
  },
  { 
    label: 'Campus Life', 
    dropdown: [
      { label: 'Facilities', href: '#facilities' },
      { label: 'Student Life @VCET', href: '#student-life' },
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
      { label: 'Career @VCET', href: '#career' },
      { label: 'Contact Us', href: '#footer' },
    ]
  },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => searchInputRef.current?.focus(), 150);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isSearchOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <header className={`sticky top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.08)] border-b border-gray-100' 
          : 'bg-transparent'
      }`}>
        <div className={`container mx-auto px-6 h-16 md:h-[4.5rem] flex items-center justify-between transition-colors duration-500 ${
          scrolled ? 'text-brand-blue' : 'text-white'
        }`}>
          
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 flex-shrink-0">
            <img 
              src="/Images/VCET%20logo.jpeg" 
              alt="VCET Logo" 
              className="h-10 md:h-12 w-auto rounded-sm"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div className={`hidden sm:block ${scrolled ? '' : 'mix-blend-difference'}`}>
              <span className="text-sm font-bold tracking-tight leading-none block">VCET</span>
              <span className="text-[10px] font-medium opacity-60 tracking-wider uppercase">Engineering</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {menuGroups.map((group) => (
              <div key={group.label} className="relative group/nav">
                {group.dropdown ? (
                  <>
                    <button className={`px-3 py-2 text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1 rounded-md transition-all duration-300 ${
                      scrolled 
                        ? 'hover:bg-brand-blue/5 hover:text-brand-blue' 
                        : 'hover:bg-white/10'
                    }`}>
                      {group.label}
                      <ChevronDown className="w-3 h-3 opacity-50 group-hover/nav:rotate-180 transition-transform duration-300" />
                    </button>
                    <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 transform group-hover/nav:translate-y-0 translate-y-1">
                      <div className="bg-white rounded-lg shadow-xl border border-gray-100 min-w-[220px] py-2 overflow-hidden">
                        {group.dropdown.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            className="block px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-slate-600 hover:text-brand-blue hover:bg-brand-blue/5 transition-all duration-200 border-l-2 border-transparent hover:border-brand-gold"
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
                    className={`px-3 py-2 text-[11px] font-semibold uppercase tracking-wider rounded-md transition-all duration-300 ${
                      scrolled 
                        ? 'hover:bg-brand-blue/5 hover:text-brand-blue' 
                        : 'hover:bg-white/10'
                    }`}
                  >
                    {group.label}
                  </a>
                )}
              </div>
            ))}
            
            <div className="w-px h-6 bg-current opacity-15 mx-2"></div>

            <button 
              onClick={() => setIsSearchOpen(true)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                scrolled ? 'hover:bg-brand-blue/5' : 'hover:bg-white/10'
              }`}
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            <a href="#admissions" className={`ml-1 flex items-center gap-1.5 px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
              scrolled 
                ? 'bg-brand-blue text-white hover:bg-brand-navy shadow-sm hover:shadow-md' 
                : 'bg-white/15 backdrop-blur-sm border border-white/20 hover:bg-white hover:text-brand-blue'
            }`}>
              Apply Now <ArrowUpRight className="w-3 h-3" />
            </a>
          </nav>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center gap-2">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className={`p-2 rounded-lg transition-all ${scrolled ? 'hover:bg-brand-blue/5' : 'hover:bg-white/10'}`}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button 
              className="p-2 rounded-lg"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-brand-dark/98 backdrop-blur-lg text-white z-40 flex flex-col transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] lg:hidden ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}>
          <div className="flex items-center justify-between px-6 h-16 border-b border-white/10">
            <span className="text-lg font-bold tracking-tight">VCET</span>
            <button onClick={() => setIsOpen(false)} className="p-2">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="flex-1 overflow-y-auto px-6 py-8">
            <div className="space-y-1">
              {menuGroups.map((group) => (
                <div key={group.label}>
                  {group.dropdown ? (
                    <div>
                      <button 
                        onClick={() => setActiveDropdown(activeDropdown === group.label ? null : group.label)}
                        className="w-full flex items-center justify-between py-3 text-lg font-semibold border-b border-white/5 hover:text-brand-gold transition-colors"
                      >
                        {group.label}
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === group.label ? 'rotate-180' : ''}`} />
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ${activeDropdown === group.label ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="pl-4 py-2 space-y-1">
                          {group.dropdown.map((item) => (
                            <a
                              key={item.label}
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className="block py-2 text-sm text-white/60 hover:text-brand-gold transition-colors"
                            >
                              {item.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <a 
                      href={group.href} 
                      onClick={() => setIsOpen(false)}
                      className="block py-3 text-lg font-semibold border-b border-white/5 hover:text-brand-gold transition-colors"
                    >
                      {group.label}
                    </a>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-white/10">
              <a href="#admissions" onClick={() => setIsOpen(false)} className="block w-full text-center bg-brand-gold text-brand-dark font-bold uppercase tracking-wider py-3 rounded-lg hover:bg-brand-gold-light transition-colors">
                Apply Now
              </a>
              <div className="mt-8 text-sm text-white/40">
                <p>vcet_inbox@vcet.edu.in</p>
                <p>+91 0250-2338234</p>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Full Screen Search Overlay */}
      <div className={`fixed inset-0 z-[100] bg-brand-dark/97 backdrop-blur-xl transition-all duration-500 ${
        isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}>
        <button 
          onClick={() => setIsSearchOpen(false)}
          className="absolute top-6 right-6 p-3 text-white/40 hover:text-white rounded-full hover:bg-white/10 transition-all duration-300"
          aria-label="Close Search"
        >
          <X className="w-8 h-8" />
        </button>

        <div className="container mx-auto px-6 h-full flex flex-col justify-center items-center">
          <div className="w-full max-w-3xl">
            <label htmlFor="site-search" className="block text-brand-gold text-xs font-bold uppercase tracking-[0.2em] mb-6">
              What are you looking for?
            </label>
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                id="site-search"
                className="w-full bg-transparent border-b-2 border-white/20 text-2xl md:text-4xl lg:text-5xl font-bold text-white py-4 pr-12 focus:outline-none focus:border-brand-gold transition-colors placeholder:text-white/10"
                placeholder="Search..."
              />
              <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-7 h-7 text-white/20" />
            </div>
            
            <div className="mt-10">
              <p className="text-white/30 text-xs font-semibold uppercase tracking-widest mb-4">Popular</p>
              <div className="flex flex-wrap gap-2">
                {['Computer Engineering', 'Admissions 2025', 'Placements', 'Exam Cell', 'Faculty'].map((item) => (
                  <button key={item} className="px-4 py-2 rounded-full border border-white/10 text-white/50 text-sm hover:bg-white hover:text-brand-dark hover:border-white transition-all duration-300">
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
