import { useState } from "react";
import logo from "../../images/logo-MOOCs.svg";
import dropdownBar from "../../images/bar.svg";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import Select from "react-select";
import { locales, dynamicActivate } from "../../i18n";
import { Trans } from "@lingui/macro";

export function Navbar() {
  const [open, setIsOpen] = useState(false);

  const options = [
    { value: "en", label: locales.en },
    { value: "ar", label: locales.ar },
  ];
  const [currentLocale, setCurrentLocale] = useState(options[0]);

  let mediascreen = window.matchMedia("(min-width: 1250px)").matches;

  function changeLanguage(selectedOption: any) {
    setCurrentLocale(selectedOption);
    dynamicActivate(selectedOption.value);
  }

  const customStyles = {
    option: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      padding: "12px 12px",
      color: state.isSelected ? "#ffff" : "#009985",
      backgroundColor: state.isSelected ? "#009985" : "#ffff",
      fontSize: "14px",
      ":active": {
        ...defaultStyles[":active"],
        backgroundColor: "#ffff",
      },
    }),

    control: (defaultStyles: any) => ({
      ...defaultStyles,
      padding: "2px",
      border: "0.5px solid #009985",
      boxShadow: "none",
      borderRadius: "8px",
      width: "117px",
      ":hover": {
        ...defaultStyles[":hover"],
        border: "0.5px solid #009985",
      },
    }),
    singleValue: (defaultStyles: any) => ({
      ...defaultStyles,
      color: "#009985",
    }),
    dropdownIndicator: (defaultStyles: any) => ({
      ...defaultStyles,
      color: "#009985 !important",
    }),
    menuList: (defaultStyles: any) => ({
      ...defaultStyles,
      padding: "0",
      borderRadius: "5px",
    }),
  };
  return (
    <>
      <header className="header">
        <img className="logo" src={logo} alt="logo" />

        {mediascreen || open ? (
          <>
            <div className={!open ? "navbar_container" : "sidebar_container"}>
              {open && (
                <div className="sidebar-logo">
                  <img className="logo" src={logo} alt="logo" />
                  <IoMdCloseCircle
                    className="close_icon"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  />
                </div>
              )}
              <nav className="navbar">
                <Link className="navlink" to="/">
                  <Trans>Home</Trans>
                </Link>
                <Link className="navlink" to="/">
                  <Trans>courses</Trans>
                </Link>
                <Link className="navlink" to="/">
                  <Trans>About</Trans>
                </Link>
                <Link className="navlink" to="/">
                  <Trans>Faq</Trans>
                </Link>
                <Link className="navlink" to="/">
                  <Trans>Blog</Trans>
                </Link>
              </nav>

              <div className="auth-btn">
                <Select
                  onChange={changeLanguage}
                  defaultValue={currentLocale}
                  options={options}
                  styles={customStyles}
                  isSearchable={false}
                />

                <div className="btns">
                  <Link to="/login" className="auth-btn-login">
                    Log In
                  </Link>
                  <Link to="/signup" className="auth-btn-signup">
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <img
            src={dropdownBar}
            alt="dropdown"
            onClick={() => {
              setIsOpen(true);
            }}
          />
        )}
      </header>
    </>
  );
}
