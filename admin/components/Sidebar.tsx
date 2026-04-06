import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { SITE_PAGE_TABS } from '../pages/pages/sitePagesConfig';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

/* ── Icons ─────────────────────────────────────────────────────────────────── */

const LayoutGrid = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);
const Bell = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);
const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const BriefcaseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>
);
const LogOutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);
const MenuIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const XIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const ImageIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);
const StarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const QuoteIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
  </svg>
);
const HashIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" />
    <line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" />
  </svg>
);
const MonitorIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);
const FolderIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
  </svg>
);
const FileTextIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);
const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const MailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const ChevronLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const ChevronRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <polyline points="9 6 15 12 9 18" />
  </svg>
);
const HelpCircleIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

/* ── Nav sections ──────────────────────────────────────────────────────────── */

interface NavSection {
  label: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    label: '',
    items: [
      { label: 'Dashboard', path: '/admin', icon: <LayoutGrid /> },
    ],
  },
  {
    label: 'Pages',
    items: [
      { label: 'Pages', path: '/admin/pages/home', icon: <FolderIcon /> },
    ],
  },
  {
    label: 'Content Management',
    items: [
      { label: 'Homepage Banners', path: '/admin/homepage-banners', icon: <ImageIcon /> },
      { label: 'Notices', path: '/admin/notices', icon: <Bell /> },
      { label: 'Events', path: '/admin/events', icon: <CalendarIcon /> },
      { label: 'Hero Slides', path: '/admin/hero-slides', icon: <MonitorIcon /> },
      { label: 'Gallery', path: '/admin/galleries', icon: <ImageIcon /> },
      { label: 'News Ticker', path: '/admin/news-ticker', icon: <HashIcon /> },
      { label: 'Achievements', path: '/admin/achievements', icon: <StarIcon /> },
      { label: 'Testimonials', path: '/admin/testimonials', icon: <QuoteIcon /> },
      { label: 'Explore Us Links', path: '/admin/explore-us', icon: <MonitorIcon /> },
    ],
  },
  {
    label: 'Enquiries',
    items: [
      { label: 'Enquiries', path: '/admin/enquiries', icon: <MailIcon /> },
    ],
  },
  {
    label: 'Corporate Relations',
    items: [
      { label: 'Our Hiring Partners', path: '/admin/placements', icon: <BriefcaseIcon /> },
      { label: 'Placement Partners', path: '/admin/placement-partners', icon: <UsersIcon /> },
    ],
  },
];

/* ── Sidebar Component ─────────────────────────────────────────────────────── */

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const location = useLocation();
  const isPagesRoute = location.pathname.startsWith('/admin/pages');

  useEffect(() => {
    if (isPagesRoute) setPagesOpen(true);
  }, [isPagesRoute]);

  const linkClass = (active: boolean) =>
    `flex items-center gap-3 rounded-xl text-sm font-medium transition-all duration-200 ${
      collapsed ? 'justify-center px-2 py-2.5' : 'px-4 py-2.5'
    } ${active
      ? 'bg-[#2563EB] text-white shadow-md shadow-blue-200'
      : 'text-slate-500 hover:text-[#0F172A] hover:bg-slate-100'
    }`;

  const navContent = (isMobile: boolean) => (
    <nav className="flex flex-col h-full">
      {/* Sidebar Header: Branding + Toggle */}
      <div className={`border-b border-slate-200/80 flex items-center ${collapsed && !isMobile ? 'justify-center px-3 py-5' : 'justify-between px-5 py-5'}`}>
        {/* Branding */}
        <div className={`flex items-center gap-3 ${collapsed && !isMobile ? 'hidden' : ''}`}>
          <div className="w-9 h-9 rounded-xl bg-[#2563EB] flex items-center justify-center flex-shrink-0 shadow-sm">
            <span className="text-white text-sm font-bold">V</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#0F172A] text-sm font-bold leading-none mb-1">VCET</span>
            <span className="text-slate-400 text-[10px] uppercase tracking-widest leading-none">Admin Panel</span>
          </div>
        </div>
        
        {/* Collapsed Logo (show only when collapsed on desktop) */}
        {collapsed && !isMobile && (
          <div className="w-9 h-9 rounded-xl bg-[#2563EB] flex items-center justify-center flex-shrink-0 shadow-sm mb-2">
            <span className="text-white text-sm font-bold">V</span>
          </div>
        )}

        {/* Toggle Button */}
        {!isMobile && (
          <button
            onClick={onToggle}
            className={`w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors ${collapsed ? 'mt-3' : ''}`}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </button>
        )}
      </div>

      {/* Nav items */}
      <div className="flex-1 px-3 py-4 space-y-4 overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.label || 'main'}>
            {section.label && !(collapsed && !isMobile) && (
              <p className="px-4 mb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                {section.label}
              </p>
            )}
            {section.label && collapsed && !isMobile && (
              <div className="mx-auto w-8 border-t border-slate-200 my-2" />
            )}
            <div className="space-y-0.5">
              {section.label === 'Pages' ? (
                <>
                  <button
                    type="button"
                    onClick={() => setPagesOpen((prev) => !prev)}
                    className={linkClass(isPagesRoute)}
                    title={collapsed && !isMobile ? 'Pages' : undefined}
                  >
                    <span className="flex-shrink-0"><FolderIcon /></span>
                    {!(collapsed && !isMobile) && (
                      <>
                        <span className="flex-1 text-left">Pages</span>
                        <span className={`transition-transform duration-200 ${pagesOpen ? 'rotate-90' : ''}`}>
                          <ChevronRightIcon />
                        </span>
                      </>
                    )}
                  </button>
                  {pagesOpen && (
                    <div className={`${collapsed && !isMobile ? 'space-y-0.5' : 'ml-3 pl-3 border-l border-slate-200 space-y-0.5'}`}>
                      {SITE_PAGE_TABS.map((tab) => (
                        <NavLink
                          key={tab.path}
                          to={tab.path}
                          className={({ isActive }) => linkClass(isActive)}
                          onClick={() => setMobileOpen(false)}
                          title={collapsed && !isMobile ? tab.label : undefined}
                        >
                          <span className="flex-shrink-0">{tab.key === 'home' ? <LayoutGrid /> : <FileTextIcon />}</span>
                          {!(collapsed && !isMobile) && <span>{tab.label}</span>}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                section.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/admin'}
                    className={({ isActive }) => linkClass(isActive)}
                    onClick={() => setMobileOpen(false)}
                    title={collapsed && !isMobile ? item.label : undefined}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    {!(collapsed && !isMobile) && <span>{item.label}</span>}
                  </NavLink>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar Footer: Support / Help */}
      <div className="px-3 py-4 border-t border-slate-200/80 bg-slate-50">
        {collapsed && !isMobile ? (
          <div className="flex justify-center">
            <a 
              href="mailto:support@vcet.edu.in" 
              className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#2563EB] hover:border-blue-200 transition-colors shadow-sm"
              title="Help & Support"
            >
              <HelpCircleIcon />
            </a>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-blue-50 rounded-full opacity-50"></div>
            <div className="relative z-10 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 text-[#2563EB]">
                <HelpCircleIcon />
              </div>
              <div>
                <p className="text-[#0F172A] text-sm font-semibold mb-1">Need help?</p>
                <p className="text-slate-500 text-xs mb-3 leading-relaxed">
                  Check our documentation or contact support.
                </p>
                <a 
                  href="mailto:support@vcet.edu.in"
                  className="inline-flex items-center text-xs font-semibold text-[#2563EB] hover:text-blue-700 transition-colors"
                >
                  Contact Support →
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-700 shadow-sm hover:shadow-md transition-shadow"
      >
        {mobileOpen ? <XIcon /> : <MenuIcon />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`lg:hidden fixed top-0 left-0 z-40 h-full w-64 bg-white border-r border-slate-200
          transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {navContent(true)}
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:block fixed top-0 left-0 z-30 h-full bg-white border-r border-slate-200/80
          transition-all duration-300 ease-in-out ${collapsed ? 'w-[72px]' : 'w-64'}`}
      >
        {navContent(false)}
      </aside>
    </>
  );
};

export default Sidebar;
