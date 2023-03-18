import { useState } from "react";
import logo from "../../images/logo.svg";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Header=()=> {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="dashboard-header">
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
          Search
        </label>
        <input className="dashboard-header-inputfield__input" id="search" type="search" placeholder="Search courses" />
      </div>

      <div className="dashboard-header-profile">
        <button
          aria-label="Open profile"
          onClick={() => setOpen(!isOpen)}
          className="icon-button dashboard-header-profile__btn"
        >
          <span className="dashboard-header-profile__btn-text">GS</span>
          <RiArrowDropDownLine />
        </button>
        {isOpen && <button className="dashboard-header-profile__logout-btn">Log Out</button>}
      </div>
    </div>
  );
}
export default Header