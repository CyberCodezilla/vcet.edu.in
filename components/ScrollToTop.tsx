import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  const previousPathRef = useRef<string | null>(null);

  useEffect(() => {
    const previousPath = previousPathRef.current;
    const isGermanRoute = pathname.startsWith('/german-language-club');
    const wasGermanRoute = previousPath?.startsWith('/german-language-club');
    const isMmsRoute = pathname.startsWith('/mms');
    const wasMmsRoute = previousPath?.startsWith('/mms');

    // Keep the page position stable when switching tabs within the same mini-site sections.
    if ((isGermanRoute && wasGermanRoute) || (isMmsRoute && wasMmsRoute)) {
      previousPathRef.current = pathname;
      return;
    }

    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    previousPathRef.current = pathname;
  }, [pathname]);

  return null;
};

export default ScrollToTop;
