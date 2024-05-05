import { useRef, useState } from "react";
import logo from "../../images/logo.svg";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { BsPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import useClickOutside from "../../hooks/useClickOutside";
import "./style.scss";
import { t, Trans } from "@lingui/macro";
import LanguageToggle from "../../components/LanguageToggle";
import { logout } from "../../utils";

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  useClickOutside(ref, () => setOpen(false));

  //Get user's profile/endpoint for the email
  return (
    <div className="dashboard-header">
      <div className="dashboard-header__container">
        <Link to={"/dashboard"}>
          {" "}
          <img
            className="dashboard-header__logo"
            src={logo}
            alt="Open source community Saudia Arabia logo"
          />
        </Link>
        <div className="dashboard-header-inputfield">
          {" "}
          <label className="sr-only" htmlFor="search">
            <Trans> Search</Trans>
          </label>
          <input
            className="dashboard-header-inputfield__input"
            id="search"
            type="search"
            placeholder={t`Search courses`}
          />
        </div>

        <div className="dashboard-header-profile">
          <div className="languageToggle">
            {" "}
            <LanguageToggle btncolor="#009985" />
          </div>
          <button
            aria-label="Open profile"
            onClick={() => setOpen(!isOpen)}
            className="icon-button dashboard-header-profile__btn"
          >
            <span className="dashboard-header-profile__btn-text icon-button">
              <BsPersonFill />
            </span>
            {isOpen ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
          </button>
          {isOpen && (
            <div className="dashboard-header-profile__logout-btn">
              <p className="text-xs pb-3">sandygoodnews@gmail.com</p>
              <button
                className="text-xs bg-primary font-medium rounded-md py-1.5 px-2 text-white "
                ref={ref}
                onClick={logout}
              >
                <Trans> Log Out</Trans>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
