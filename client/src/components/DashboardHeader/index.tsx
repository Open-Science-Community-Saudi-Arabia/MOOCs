import { useEffect, useRef, useState } from "react";
import logo from "../../images/logo.svg";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { BsPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import useClickOutside from "../../hooks/useClickOutside";
import "./style.scss";
import { t, Trans } from "@lingui/macro";
import LanguageToggle from "../../components/LanguageToggle";
import { logout } from "../../utils";
import { userProfile } from "../../utils/api/auth";

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<{
    email: string;
    firstname:string;
    lastname: string;
  }>({ email: "", firstname: "", lastname: "" });
  const ref = useRef<HTMLButtonElement>(null);
  useClickOutside(ref, () => setOpen(false));

  const getUserInfo = async () => {
    try {
      let res = await userProfile();
      console.log(res);
      setUserInfo(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

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
          <span className="absolute left-4">
          {isOpen ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
          </span>
          </button>
          {isOpen && (
            <div className="dashboard-header-profile__logout-btn">
              <h2 className="w-max">{userInfo.firstname} {userInfo.lastname}</h2>
              <p className="text-[10px]">{userInfo.email}</p>
              <button
                className="text-xs bg-primary mt-3 hover:bg-primary-hover font-medium rounded-md py-1.5 px-2 text-white "
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
