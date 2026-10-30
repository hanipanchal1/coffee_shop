import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// ─────────────────────────────────────────────────────────────
//  ScrollToTop
//  Ensures that whenever the user clicks any navigation link
//  or route changes, the page always starts from the top (0, 0)
//  instead of preserving the previous page's scroll position.
// ─────────────────────────────────────────────────────────────

const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // If navigating to an anchor (e.g. #booking), scroll to it
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    // Always scroll to the start (top) of the page on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname, search, hash]);

  return null;
};

export default ScrollToTop;

