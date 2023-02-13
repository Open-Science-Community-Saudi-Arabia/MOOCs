import React, { useState } from "react";
import logo from "../../images/Black-Logo3.png";
import dropdownBar from "../../images/bar.svg";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoMdCloseCircle } from "react-icons/io";

export function Navbar() {
  const [language, setLanguage] = useState("");
  const [open, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  let mediascreen = window.matchMedia("(min-width: 1250px)").matches;

  function changeLanguage(e: any) {
    setLanguage(e.target.value);
    i18n.changeLanguage(e.target.value);
  }
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
                  {t("home")}
                </Link>
                <Link className="navlink" to="/">
                  {t("courses")}
                </Link>
                <Link className="navlink" to="/">
                  {t("about")}
                </Link>
                <Link className="navlink" to="/">
                  {t("faq")}
                </Link>
                <Link className="navlink" to="/">
                  {t("blog")}
                </Link>
              </nav>

              <div className="auth-btn">
                <div className="language">
                  <select value={language} onChange={(e) => changeLanguage(e)}>
                    <option value="en">English</option>
                    <option value="es">Arabic</option>
                  </select>
                </div>
                <div className="btns">
                  <button className="auth-btn-login">Log In</button>
                  <button className="auth-btn-signup">Sign Up</button>
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
