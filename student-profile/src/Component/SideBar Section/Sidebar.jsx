import React from "react";
import "./sidebar.scss";
import logo from "../../assets/logo1.png";
import { AiOutlineHome, AiOutlineLogout } from "react-icons/ai";
import { SiCodeproject } from "react-icons/si";
import { MdOutlineExplore, MdOutlinePermContactCalendar } from "react-icons/md";
import { BsQuestionCircle, BsTrophy } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { GiSecurityGate } from "react-icons/gi";

const Sidebar = () => {
  return (
    <div className="sideBar grid">
      <div className="logoDiv flex">
        <img src={logo} alt="logo" />
        <h2>MOOCS</h2>
      </div>
      <div className="menuDiv">
        <h3 className="divTitle">QUICK MENU</h3>
        <ul className="menuLists grid">
          <li className="listItem">
            <a href="button" className="menuLink flex">
              <AiOutlineHome className="icon" />
              <span className="smallText">Home</span>
            </a>
          </li>
          <li className="listItem">
            <a href="button" className="menuLink flex">
              <SiCodeproject className="icon" />
              <span className="smallText">Project</span>
            </a>
          </li>

          <li className="listItem">
            <a href="button" className="menuLink flex">
              <MdOutlineExplore className="icon" />
              <span className="smallText">Explore</span>
            </a>
          </li>
          <li className="listItem">
            <a href="button" className="menuLink flex">
              <BsTrophy className="icon" />
              <span className="smallText">Certificate</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="settingsDiv">
        <h3 className="divTitle">SETTINGS</h3>
        <ul className="menuLists grid">
          <li className="listItem">
            <a href="button" className="menuLink flex">
              <CgProfile className="icon" />
              <span className="smallText">Profile</span>
            </a>
          </li>
          <li className="listItem">
            <a href="button" className="menuLink flex">
              <GiSecurityGate className="icon" />
              <span className="smallText">Security</span>
            </a>
          </li>
          <li className="listItem">
            <a href="button" className="menuLink flex">
              <MdOutlinePermContactCalendar className="icon" />
              <span className="smallText">Contact</span>
            </a>
          </li>
          <li className="listItem">
            <a href="button" className="menuLink flex">
              <AiOutlineLogout className="icon" />
              <span className="smallText">Logout</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="sideBarCard">
        <BsQuestionCircle className="icon" />
        <div className="cardContent">
          <div className="circle1"></div>
          <div className="circle2"></div>
          <h3>Help Center</h3>
          <p> Need Help? Please Contact MOOCS for more questions.</p>
          <button className="btn">Go to help center</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
