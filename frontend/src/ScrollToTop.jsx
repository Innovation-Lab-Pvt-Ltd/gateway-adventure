import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls the window to the top whenever the route changes.
 * Render it once, inside <BrowserRouter>, e.g. right above <Routes>.
 *
 * Links with a hash (e.g. /#trekking) are left alone so anchor
 * navigation still works.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;

    // "instant" avoids a slow scroll if you use `scroll-behavior: smooth` in CSS
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;