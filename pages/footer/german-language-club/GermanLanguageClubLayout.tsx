import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Info, BookOpenCheck, BookText, Activity, Image, User } from 'lucide-react';
import PageLayout from '../../../components/PageLayout';
import PageBanner from '../../../components/PageBanner';

const menuItems = [
  { label: 'About', href: '/german-language-club/about', icon: Info },
  { label: 'Course Objectives', href: '/german-language-club/course-objectives', icon: BookOpenCheck },
  { label: 'Course Content', href: '/german-language-club/course-content', icon: BookText },
  { label: 'Activities', href: '/german-language-club/activities', icon: Activity },
  { label: 'Gallery', href: '/german-language-club/gallery', icon: Image },
  { label: 'Faculty', href: '/german-language-club/faculty', icon: User },
];

const GermanLanguageClubLayout: React.FC = () => {
  const location = useLocation();

  const germanLetters = [
    { char: 'A', top: '10%', left: '6%', delay: '0s' },
    { char: 'B', top: '22%', left: '88%', delay: '0.8s' },
    { char: 'C', top: '72%', left: '7%', delay: '1.6s' },
    { char: 'D', top: '80%', left: '86%', delay: '2.2s' },
    { char: 'Ä', top: '40%', left: '3%', delay: '0.5s' },
    { char: 'E', top: '58%', left: '92%', delay: '1.4s' },
    { char: 'Ö', top: '15%', left: '48%', delay: '2.8s' },
    { char: 'Ü', top: '88%', left: '49%', delay: '3.2s' },
    { char: 'ß', top: '52%', left: '52%', delay: '2.4s' },
  ];

  return (
    <PageLayout>
      <PageBanner
        title="German Language Club"
        breadcrumbs={[
          { label: 'Clubs', href: '/students-club' },
          { label: 'German Language Club' },
        ]}
      />

      <section className="relative overflow-hidden bg-brand-light py-12 md:py-16">
        <div className="pointer-events-none absolute inset-0">
          {germanLetters.map((letter, index) => (
            <span
              key={`${letter.char}-${index}`}
              className="german-float-letter absolute font-display text-3xl font-bold text-brand-blue/10"
              style={{ top: letter.top, left: letter.left, animationDelay: letter.delay }}
            >
              {letter.char}
            </span>
          ))}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(26,75,124,0.08),transparent_38%),radial-gradient(circle_at_75%_80%,rgba(253,184,19,0.14),transparent_42%)]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6">
          <div className="relative z-10 grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
            <aside className="overflow-hidden border border-brand-blue/15 bg-white shadow-sm">
              <nav className="p-3">
                <ul className="space-y-2">
                  {menuItems.map((item) => (
                    <li key={item.label}>
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          [
                            'group flex items-center gap-3 px-3 py-3 text-sm font-semibold transition-all duration-200',
                            isActive
                              ? 'bg-gradient-to-r from-brand-dark via-brand-blue to-brand-navy text-white shadow-sm'
                              : 'text-brand-navy hover:bg-brand-navy/5',
                          ].join(' ')
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <span
                              className={[
                                'flex h-8 w-8 items-center justify-center transition-colors',
                                isActive ? 'bg-brand-gold text-brand-dark' : 'bg-brand-blue/10 text-brand-blue',
                              ].join(' ')}
                            >
                              <item.icon className="h-4 w-4" />
                            </span>
                            <span>{item.label}</span>
                          </>
                        )}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            <div className="relative border border-brand-blue/10 bg-white p-6 shadow-sm md:p-8">
              <div className="pointer-events-none absolute inset-y-0 left-0 w-3 bg-gradient-to-b from-brand-gold/40 via-brand-gold/15 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-2 bg-gradient-to-b from-brand-blue/15 to-transparent" />
              <div key={location.pathname} className="german-page-turn">
                <Outlet />
              </div>
            </div>
          </div>
        </div>

        <style>{`
          .german-float-letter {
            animation: germanFloat 8s ease-in-out infinite;
          }

          .german-page-turn {
            transform-origin: left center;
            animation: germanPageTurn 340ms cubic-bezier(0.2, 0.7, 0.2, 1);
            will-change: transform, opacity;
          }

          @keyframes germanFloat {
            0% {
              transform: translateY(0px) rotate(0deg);
              opacity: 0.16;
            }
            50% {
              transform: translateY(-12px) rotate(4deg);
              opacity: 0.28;
            }
            100% {
              transform: translateY(0px) rotate(0deg);
              opacity: 0.16;
            }
          }

          @keyframes germanPageTurn {
            0% {
              opacity: 0;
              transform: perspective(900px) rotateY(-8deg) translateX(8px);
            }
            100% {
              opacity: 1;
              transform: perspective(900px) rotateY(0deg) translateX(0px);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .german-page-turn,
            .german-float-letter {
              animation: none !important;
            }
          }
        `}</style>
      </section>
    </PageLayout>
  );
};

export default GermanLanguageClubLayout;
