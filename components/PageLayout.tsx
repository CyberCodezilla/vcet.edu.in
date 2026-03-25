import React, { useEffect } from 'react';
import Header from './Header';
import TopBanner from './TopBanner';
import Footer from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Intersection Observer for scroll-triggered animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden font-sans bg-white text-slate-800">
      <div className="relative z-[100]">
        <TopBanner />
        <Header />
      </div>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default PageLayout;
