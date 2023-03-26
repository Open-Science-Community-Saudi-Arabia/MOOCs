import { useRef, useState } from "react";
import logo from "../../images/logo.svg";
import dropdownBar from "../../images/bar.svg";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";

import { Trans } from "@lingui/macro";
import useMediaQuery from "../../hooks/usemediaQuery";
import useClickOutside from "../../hooks/useClickOutside";
import LanguageToggle from "../LanguageToggle";

const index = () => {
  const [isOpen, setIsOpen] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 1280px)");

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
                  <button
                    aria-label="close"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className="icon-button"
                  >
                    <IoMdCloseCircle className="sidebar-logo__close-icon" />
                  </button>
                </div>
              )}
              <nav className="navbar">
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
                  <Trans>Faq</Trans>
                </Link>
                <Link className="navlink" to="/">
                  <Trans>Blog</Trans>
                </Link>
              </nav>

              <div className="auth-btn">
                <LanguageToggle />

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
