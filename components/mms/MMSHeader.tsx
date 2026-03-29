import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface SubLink {
  label: string;
  href: string;
  newTab?: boolean;
}

interface NavItem {
  label: string;
  href: string;
  subLinks?: SubLink[];
  activeMatchPrefix?: string;
}

const navItems: NavItem[] = [
  { label: 'HOME', href: '/mms' },
  { label: 'ABOUT', href: '/mms/about' },
  { label: 'ADMISSION DETAILS', href: '/mms/admission-details' },
  { label: 'EXPERIENTIAL LEARNING', href: '/mms/experiential-learning' },
  {
    label: 'TRAINING & PLACEMENTS',
    href: '/mms/training-placement/training',
    activeMatchPrefix: '/mms/training-placement',
    subLinks: [
      { label: 'Training', href: '/mms/training-placement/training' },
      { label: 'Placement', href: '/mms/training-placement/placement' },
    ],
  },
  { label: "STUDENT'S LIFE", href: '/mms/students-life' },
  {
    label: 'SYLLABUS',
    href: 'https://vcet.edu.in/mms/FY.pdf',
    subLinks: [
      { label: 'First Year', href: 'https://vcet.edu.in/mms/FY.pdf', newTab: true },
      { label: 'Second Year', href: 'https://vcet.edu.in/mms/SY_syllabus.pdf', newTab: true },
    ],
  },
  { label: 'FACILITIES', href: '/mms/facilities' },
  { label: "FAQ'S", href: '/mms/faqs' },
];

const isExternal = (href: string) => href.startsWith('http') || href.endsWith('.pdf');

export default function MMSHeader() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activePath = useMemo(() => location.pathname, [location.pathname]);

  return (
    <header className="sticky top-[64px] z-40 border-t border-[#111827] border-b border-brand-gold/45 bg-[#fff6db]">
      <div className="mx-auto flex w-full max-w-[1360px] flex-col md:flex-row md:items-center px-3 py-2 sm:px-5 lg:px-7">
        <nav className="flex flex-1 flex-col md:flex-row md:flex-wrap md:items-center w-full gap-2 md:gap-1 text-[13px] sm:text-sm">
          
          {/* Top Row: MMS Tag & Hamburger */}
          <div className="flex w-full items-center justify-between md:w-auto">
            <Link
              to="/mms"
              className="inline-flex rounded-none bg-brand-gold px-2.5 py-1 font-bold uppercase tracking-[0.12em] text-brand-navy"
            >
              MMS
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center p-1.5 bg-brand-gold text-brand-navy rounded shadow-sm hover:brightness-105 transition-all"
              aria-label="Toggle MMS Menu"
            >
              {isMobileMenuOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
            </button>
          </div>

          {/* Nav Links (collapsible on mobile) */}
          <div className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row md:flex-wrap md:items-center gap-1.5 md:gap-1 w-full pt-2 pb-1 md:pt-0 md:pb-0`}>
            {navItems.map((item) => {
            const isActive = !isExternal(item.href) && (activePath === item.href || (item.activeMatchPrefix ? activePath.startsWith(item.activeMatchPrefix) : false));

            if (item.subLinks?.length) {
              return (
                <div key={item.label} className="group relative">
                  {isExternal(item.href) ? (
                    <button
                      type="button"
                      className="inline-flex rounded-none px-2.5 py-1.5 font-semibold text-slate-700 transition hover:bg-brand-gold hover:font-bold hover:text-brand-navy"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className={`inline-flex rounded-none px-2.5 py-1.5 font-semibold transition ${
                        isActive
                          ? 'bg-brand-gold font-bold text-brand-navy'
                          : 'text-slate-700 hover:bg-brand-gold hover:font-bold hover:text-brand-navy'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}

                  <div className="invisible absolute left-0 top-full z-50 mt-1 min-w-[220px] border border-brand-navy/20 bg-white opacity-0 shadow-lg transition duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    {item.subLinks.map((subLink) => {
                      const isSubExternal = isExternal(subLink.href);
                      const isSubActive = !isSubExternal && activePath === subLink.href;

                      if (isSubExternal) {
                        return (
                          <a
                            key={subLink.href}
                            href={subLink.href}
                            target={subLink.newTab ? '_blank' : undefined}
                            rel={subLink.newTab ? 'noreferrer' : undefined}
                            className="block px-4 py-2.5 text-sm font-semibold text-brand-navy transition hover:bg-brand-navylight"
                          >
                            {subLink.label}
                          </a>
                        );
                      }

                      return (
                        <Link
                          key={subLink.href}
                          to={subLink.href}
                          className={`block px-4 py-2.5 text-sm font-semibold transition ${
                            isSubActive
                              ? 'bg-brand-navy text-white'
                              : 'text-brand-navy hover:bg-brand-navylight'
                          }`}
                        >
                          {subLink.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            }

            if (isExternal(item.href)) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-none px-2.5 py-1.5 font-semibold text-slate-700 transition hover:bg-brand-gold hover:font-bold hover:text-brand-navy"
                >
                  {item.label}
                </a>
              );
            }

            return (
              <Link
                key={item.label}
                to={item.href}
                className={`inline-flex rounded-none px-2.5 py-1.5 font-semibold transition ${
                  isActive
                    ? 'bg-brand-gold font-bold text-brand-navy'
                    : 'text-slate-700 hover:bg-brand-gold hover:font-bold hover:text-brand-navy'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          </div>
        </nav>
      </div>
    </header>
  );
}
