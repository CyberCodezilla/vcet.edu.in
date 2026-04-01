import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { get } from '../../services/api';
import TopBanner from '../TopBanner';
import Header from '../Header';
import Footer from '../Footer';
import MMSHeader from './MMSHeader';
import MMSEnquirePopup from './MMSEnquirePopup';
import { MMS_IMAGES } from '../../services/mms/imagePool';

interface MMSLayoutProps {
  title?: string;
  children: React.ReactNode;
}

interface SectionMenu {
  match: (path: string) => boolean;
  title: string;
  items: Array<{ label: string; href: string }>;
}

const sectionMenus: SectionMenu[] = [
  {
    match: (path) => path.startsWith('/mms/about'),
    title: 'About Section',
    items: [
      { label: 'About', href: '/mms/about' },
      { label: "Principal's Desk", href: '/mms/about/principals-desk' },
      { label: "HOD's Desk", href: '/mms/about/hods-desk' },
      { label: 'Faculty', href: '/mms/about/faculty' },
      { label: 'Vision and Mission', href: '/mms/about/vision-mission' },
      { label: 'Departmental Advisory Board', href: '/mms/about/dab' },
      { label: 'Program Outcomes (POs)', href: '/mms/about/program-outcomes' },
    ],
  },
  {
    match: (path) => path.startsWith('/mms/admission') || path.startsWith('/mms/admission-details'),
    title: 'Admission Details',
    items: [
      { label: 'Eligibility Criteria', href: '/mms/admission-details#eligibility-criteria' },
      { label: 'Scholarship', href: '/mms/admission-details/scholarship' },
      { label: 'Documents Required', href: '/mms/admission-details/documents-required' },
      { label: 'Fees Structure', href: '/mms/admission-details/fees-structure' },
    ],
  },
  {
    match: (path) => path.startsWith('/mms/training-placement/training'),
    title: 'Training',
    items: [
      { label: 'Training', href: '/mms/training-placement/training' },
      { label: 'Events', href: '/mms/training-placement/training/events' },
      { label: 'Career Guidance', href: '/mms/training-placement/training/career-guidance' },
      { label: 'Internship', href: '/mms/training-placement/training/internship' },
      { label: 'Gallery', href: '/mms/training-placement/training/gallery' },
    ],
  },
  {
    match: (path) => path.startsWith('/mms/training-placement/placement'),
    title: 'Placement',
    items: [
      { label: 'Objective', href: '/mms/training-placement/placement' },
      { label: 'Soft Skill Training', href: '/mms/training-placement/placement/soft-skill-training' },
      { label: 'Psycometric Test', href: '/mms/training-placement/placement/psycometric-test' },
      { label: 'Placement Cell', href: '/mms/training-placement/placement/placement-cell' },
      { label: 'Gallery', href: '/mms/training-placement/placement/gallery' },
      { label: 'Our Recruiters', href: '/mms/training-placement/placement/our-recruiters' },
      { label: 'Students Placements', href: '/mms/training-placement/placement/students-placements' },
      { label: 'Internships', href: '/mms/training-placement/placement/internships' },
    ],
  },
  {
    match: (path) => path.startsWith('/mms/students-life'),
    title: "Student's Life",
    items: [
      { label: 'Student Life', href: '/mms/students-life' },
      { label: 'V-Ecstatic', href: '/mms/students-life/v-ecstatic' },
      { label: 'DLLE', href: '/mms/students-life/dlle' },
      { label: 'Book Review', href: '/mms/students-life/book-review' },
      { label: 'About Add-on Courses', href: '/mms/students-life/about-add-on-courses' },
      { label: 'Add-on Courses on PowerBi', href: '/mms/students-life/add-on-courses-powerbi' },
      { label: 'Add-on Courses on Advance Excel', href: '/mms/students-life/add-on-courses-advance-excel' },
      { label: 'Industry Expert Sessions', href: '/mms/students-life/industry-expert-sessions' },
      { label: 'NSIM training', href: '/mms/students-life/nsim-training' },
      { label: 'Oscillations', href: '/mms/students-life/oscillations' },
      { label: 'IDEATHON 1.0', href: '/mms/students-life/ideathon-1-0' },
      { label: 'Rankers', href: '/mms/students-life/rankers' },
    ],
  },
  {
    match: (path) => path.startsWith('/mms/facilities'),
    title: 'Facilities',
    items: [
      { label: 'Computer Labs', href: '/mms/facilities' },
      { label: 'Library', href: '/mms/facilities/library' },
      { label: 'Seminar Hall', href: '/mms/facilities/seminar-hall' },
      { label: 'Classroom', href: '/mms/facilities/classroom' },
      { label: 'Gymkhana', href: '/mms/facilities/gymkhana' },
    ],
  },
  {
    match: (path) => path.startsWith('/mms/experiential-learning'),
    title: 'Experiential Learning',
    items: [
      { label: 'Information', href: '/mms/experiential-learning' },
      { label: 'Role Play', href: '/mms/experiential-learning/role-play' },
      { label: 'Group Discussion', href: '/mms/experiential-learning/group-discussion' },
      { label: 'Entrepreneurial Drive', href: '/mms/experiential-learning/entrepreneurial-drive' },
      { label: 'Financial Literacy Program', href: '/mms/experiential-learning/financial-literacy-program' },
      { label: 'NESCO Bombay Exhibition Centre', href: '/mms/experiential-learning/nesco-bombay-exhibition-centre' },
      { label: '3D Model Making', href: '/mms/experiential-learning/3d-model-making-presentation' },
    ],
  },
];

export default function MMSLayout({ title, children }: MMSLayoutProps) {
  const { pathname, hash } = useLocation();

  const [customEventsMenu, setCustomEventsMenu] = useState<{label: string, href: string}[]>([]);
  useEffect(() => {
    if (pathname.startsWith('/mms/students-life')) {
      get('/pages/mms-students-life').then(res => {
        const evs = (res.data)?.customEvents || [];
        setCustomEventsMenu(evs.map((e) => ({ label: e.name, href: `/mms/students-life/event/${e.slug}` })));
      }).catch(e => console.warn(e));
    }
  }, [pathname]);

  const baseActiveMenu = sectionMenus.find((menu) => menu.match(pathname));
  const activeMenu = React.useMemo(() => {
    if (!baseActiveMenu) return null;
    if (baseActiveMenu.title === "Student's Life" && customEventsMenu.length > 0) {
      // prevent duplicates
      const newItems = customEventsMenu.filter(cItem => !baseActiveMenu.items.some(i => i.href === cItem.href));
      return { ...baseActiveMenu, items: [...baseActiveMenu.items, ...newItems] };
    }
    return baseActiveMenu;
  }, [baseActiveMenu, customEventsMenu]);

  const showExperientialDescriptor = pathname.startsWith('/mms/experiential-learning');
  const [showPosterPopup, setShowPosterPopup] = useState(false);

  useEffect(() => {
    const popupSeen = sessionStorage.getItem('mms-entry-poster-seen');
    if (!popupSeen) {
      setShowPosterPopup(true);
      sessionStorage.setItem('mms-entry-poster-seen', '1');
    }
  }, []);

  useEffect(() => {
    if (showPosterPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showPosterPopup]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-800">
      <div className="relative z-[100]">
        <TopBanner />
        <Header />
      </div>

      <MMSHeader />

      <main className="mx-auto w-full max-w-[1360px] px-3 py-5 sm:px-5 sm:py-7 lg:px-7">
        <div className={`flex flex-col gap-5 sm:gap-6 ${activeMenu ? 'lg:flex-row lg:items-start lg:gap-7 xl:gap-8' : ''}`}>
          {activeMenu ? (
            <>
              {/* Mobile horizontal nav */}
              <div className="block lg:hidden w-full overflow-x-auto no-scrollbar border border-brand-navy/20 bg-white shadow-sm">
                <div className="flex gap-0 min-w-max">
                  {activeMenu.items.map((item) => {
                    const hashIndex = item.href.indexOf('#');
                    const baseHref = hashIndex >= 0 ? item.href.slice(0, hashIndex) : item.href;
                    const itemHash = hashIndex >= 0 ? item.href.slice(hashIndex) : '';
                    const isDefaultSection = itemHash === '#eligibility-criteria' && pathname === baseHref && !hash;
                    const isActive = itemHash
                      ? pathname === baseHref && (hash === itemHash || isDefaultSection)
                      : pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        className={`flex-shrink-0 px-4 py-3 text-sm font-semibold whitespace-nowrap transition min-h-[44px] flex items-center ${
                          isActive
                            ? 'bg-brand-navy text-white'
                            : 'text-brand-navy hover:bg-brand-navylight'
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Desktop sidebar */}
              <aside className="hidden lg:block lg:w-[250px] lg:flex-shrink-0 xl:w-[280px]">
                <nav className="overflow-hidden rounded-none border border-brand-navy/30 bg-white shadow-[0_14px_34px_-22px_rgba(11,61,145,0.45)]">
                  <div className="p-3">
                    {activeMenu.items.map((item) => {
                      const hashIndex = item.href.indexOf('#');
                      const baseHref = hashIndex >= 0 ? item.href.slice(0, hashIndex) : item.href;
                      const itemHash = hashIndex >= 0 ? item.href.slice(hashIndex) : '';
                      const isDefaultSection = itemHash === '#eligibility-criteria' && pathname === baseHref && !hash;
                      const isActive = itemHash
                        ? pathname === baseHref && (hash === itemHash || isDefaultSection)
                        : pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          to={item.href}
                          className={`mb-1.5 block rounded-none px-4 py-3.5 text-[17px] font-semibold transition ${
                            isActive
                              ? 'bg-brand-navy text-white'
                              : 'text-brand-navy hover:bg-brand-navylight hover:text-brand-navy'
                          }`}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </nav>
              </aside>
            </>
          ) : null}

          <div
            key={`${pathname}${hash}`}
            className="mms-page-transition min-w-0 w-full flex-1 text-base leading-7 text-slate-700 sm:text-[17px] sm:leading-8 lg:pl-1 xl:pl-2"
          >
            {title ? (
              <h2 className="mb-4 text-2xl font-display font-bold leading-[1.2] tracking-[-0.01em] text-brand-navy sm:text-3xl lg:text-5xl">
                {title}
              </h2>
            ) : null}
            {showExperientialDescriptor ? (
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-brand-gold">Master of Management Studies</span>
              </div>
            ) : null}
            {children}
          </div>
        </div>
      </main>

      <Footer />

      <MMSEnquirePopup />

      <style>{`
        .mms-page-transition {
          transform-origin: left center;
          animation: mmsPageTurn 260ms cubic-bezier(0.22, 0.7, 0.2, 1);
          will-change: transform, opacity;
        }

        @keyframes mmsPageTurn {
          0% {
            opacity: 0;
            transform: translateX(10px) scale(0.997);
          }
          100% {
            opacity: 1;
            transform: translateX(0px) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mms-page-transition {
            animation: none !important;
          }
        }
      `}</style>

      {showPosterPopup ? (
        <div className="fixed inset-0 z-[220] flex items-center justify-center bg-slate-950/55 p-3 backdrop-blur-md sm:p-6">
          <div className="relative max-h-[94vh] max-w-[96vw] overflow-hidden rounded-lg border border-white/30 bg-slate-900 shadow-[0_26px_80px_-30px_rgba(0,0,0,0.85)]">
            <button
              type="button"
              onClick={() => setShowPosterPopup(false)}
              className="absolute right-2 top-2 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-2xl leading-none text-white transition hover:bg-black"
              aria-label="Close poster"
            >
              &times;
            </button>
            <img
              src={MMS_IMAGES.banner}
              alt="MMS Admission Poster"
              className="block max-h-[92vh] w-auto max-w-[95vw] object-contain"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
