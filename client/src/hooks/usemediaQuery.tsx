import { useState, useEffect } from "react";

/**
 * @category Client
 * @subcategory Hooks
 * @module useMediaQuery
 * @description The hooks responds to screen size changes.
 * @component
 * @example
 * const isDesktop = useMediaQuery("(min-width: 1280px)");
 */


const useMediaQuery = (query: any) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
};

export default useMediaQuery;
