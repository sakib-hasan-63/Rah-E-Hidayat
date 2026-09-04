import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop automatically scrolls the window to the top (0, 0)
 * whenever the route or pathname changes, ensuring users immediately
 * see newly opened content from the top of the page.
 */
export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, search, hash]);

  return null;
}
