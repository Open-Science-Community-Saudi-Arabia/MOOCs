import  {  useEffect } from "react";

/**
 * @category Client App
 * @subcategory Hooks
 * @module useClickOutside
 * @description The hooks closes the opened DOM ref when user clicks outside.
 * @component
 * @example
 * import { useRef, useState } from "react";
 * 
 * const Header = () => {
 * const [isOpen, setOpen] = useState(false);
 * useClickOutside(ref, () => setOpenLanguage(false));
 * return(
 * <button ref={ref} onClick={logout}> Log Out </button>
 * )}
 */

const useClickOutside = (ref: any, handler: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [ref,handler]);

};
export default useClickOutside;
