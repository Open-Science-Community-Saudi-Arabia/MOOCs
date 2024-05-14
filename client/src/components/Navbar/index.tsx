import {useState } from "react";
import logo from "../../images/logo.svg";
import dropdownBar from "../../images/bar.svg";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Trans } from "@lingui/macro";
import useMediaQuery from "../../hooks/usemediaQuery";
import LanguageToggle from "../LanguageToggle";

/**
 * @category Client
 * @subcategory Component
 * @module Navbar
 * @description The home page navbar,
 * @component
 * @example
 *  <Navbar />
 */

const index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1030px)");

  return (
    <>
      <header className="header">
        <Link to={"/"}>
          {" "}
          <img
            className="header__logo"
            src={logo}
            alt="Open source community Saudia Arabia logo"
          />
        </Link>

        {isDesktop || isOpen ? (
          <>
            <div
              className={
                !isOpen
                  ? "header__navbar-container"
                  : "header__sidebar-container"
              }
            >
              {isOpen && (
                <div className="sidebar-logo">
                  <Link to={"/"}>
                    {" "}
                    <img
                      className="sidebar-logo__image"
                      src={logo}
                      alt="Open source community Saudia Arabia logo"
                    />
                  </Link>
                 <div className="nav-close">
                 <div className="nav-language-toogle">
               <LanguageToggle />
               </div>

                 <button
                    aria-label="close"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className="icon-button"
                  >
                    < IoCloseCircleOutline className="sidebar-logo__close-icon" />
                  </button>
                 </div>
                </div>
              )}
              {/* <nav className="navbar">
                <Link className="navlink" to="/">
                  <Trans>Home</Trans>
                </Link>
                <Link className="navlink" to="/">
                  <Trans>Courses</Trans>
                </Link>
                <Link className="navlink" to="/">
                  <Trans>About</Trans>
                </Link>
               
                <Link className="navlink" to="/">
                  <Trans>Blog</Trans>
                </Link>
              </nav> */}

              <div className="auth-btn">
               <div className="nav-language-toogle">
               <LanguageToggle />
               </div>

                <div className="btns">
                  <Link to="/login" className="auth-btn-login">
                    <Trans>Log In</Trans>
                  </Link>
                  <Link to="/signup" className="auth-btn-signup">
                    <Trans> Sign Up</Trans>
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <button
            aria-label="menu"
            onClick={() => {
              setIsOpen(true);
            }}
            className="icon-button"
          >
            <img src={dropdownBar} alt="menu" />
          </button>
        )}
      </header>
    </>
  );
};

export default index;
