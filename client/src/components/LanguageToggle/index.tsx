import React, { useRef, useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import { GoGlobe } from "react-icons/go";
import { dynamicActivate } from "../../i18n";
import "./style.scss";

const index = () => {
  const [openLanguage, setOpenLanguage] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpenLanguage(false));
  const options = [
    { value: "en", label: "English" },
    { value: "ar", label: "Arabic" },
  ];

  const locale = window.localStorage.getItem("language");

  const changeLanguage = (selectedOption: any) => {
    window.localStorage.setItem("language", selectedOption);
    dynamicActivate(selectedOption);
  };
  return (
    <div className="languagetoggler">
      <button
        onClick={() => setOpenLanguage(!openLanguage)}
        className="languagetoggler__selected"
      >
        {" "}
        <GoGlobe />
        {locale}
      </button>
      {openLanguage && (
        <div ref={ref} className="languagetoggler__btn">
          {options.map((item) => (
            <button
              onClick={() => {
                changeLanguage(item.value);
              }}
              key={item.label}
            >
              {item.label} ({item.value})
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
export default index;
