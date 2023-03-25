import { useRef, useState } from "react";
import logo from "../../images/logo.svg";
import dropdownBar from "../../images/bar.svg";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import { GoGlobe } from "react-icons/go";
import { dynamicActivate } from "../../i18n";
import { Trans } from "@lingui/macro";
import useMediaQuery from "../../hooks/usemediaQuery";
import useClickOutside from "../../hooks/useClickOutside";

const index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openLanguage, setOpenLanguage] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const options = [
    { value: "en", label: "English" },
    { value: "ar", label: "Arabic" },
  ];

  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpenLanguage(false));
  const locale = window.localStorage.getItem("language");

  const changeLanguage = (selectedOption: any) => {
    window.localStorage.setItem("language", selectedOption);
    dynamicActivate(selectedOption);
  };

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
                <div className="auth-btn__language">
                  <button
                    onClick={() => setOpenLanguage(!openLanguage)}
                    className="auth-btn__language__selected"
                  >
                    {" "}
                    <GoGlobe />
                    {locale}
                  </button>
                  {openLanguage && (
                    <div ref={ref} className="auth-btn__language__btn">
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
