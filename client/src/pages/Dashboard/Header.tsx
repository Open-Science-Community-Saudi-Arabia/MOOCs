import { useState } from "react";
import logo from "../../images/logo.svg";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function Header() {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="header">
      <Link to={"/dashboard"}>
        {" "}
        <img className="logo" src={logo} alt="logo" />
      </Link>
      <input type="search" placeholder="Search courses" />
      <div onClick={() => setOpen(!isOpen)} className="profile">
        <p>GS</p>
        <RiArrowDropDownLine />
        {isOpen && <button>Log Out</button>}
      </div>
    </div>
  );
}
