import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { TbMessageCircle } from "react-icons/tb";
import { BsArrowRightShort, BsQuestionCircle } from "react-icons/bs";
import "./top.scss";
import img from "../../../assets/student-profile-image.jpg";
import image from "../../../assets/student-3.jpg";

const Top = () => {
  return (
    <div className="topSection">
      <div className="headerSection flex">
        <div className="title">
          <h1>Welcome to MOOCS</h1>
          <p> Hello LadyAmi, Welcome back!</p>
        </div>
        <div className="searchBar flex">
          <input type="text" placeholder="Search Dashboard" />
          <BiSearchAlt className="icon" />
        </div>
        <div className="studentDiv flex">
          <TbMessageCircle className="icon" />
          <MdOutlineNotificationsNone className="icon" />
          <div className="studentImage">
            <img src={img} alt="profile" />
          </div>
        </div>
      </div>
      <div className="cardSection flex">
        <div className="rightCard flex">
          <h1>learn and work on extraordinary Project</h1>
          <p>Change is the end result of all true learning</p>
          <div className="buttons flex">
            <button className="btn">Trending Courses</button>
            <button className="btn transparent">Top Courses</button>
          </div>
          <div className="imageDiv">
            <img src={image} alt="profile" />
          </div>
        </div>
        <div className="leftCard flex">
          <div className="main flex">
            <div className="textDiv">
              <h1>My Stat</h1>
              <div className="flex">
                <span>
                  Today <br /> <small> 200 Points </small>
                </span>
              </div>
              <div className="flex">
                <span>
                  This Month <br /> <small> 45700 Points</small>
                </span>
              </div>
              <span className="flex link">
                Go to My Course <BsArrowRightShort className="icon" />
              </span>
            </div>
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
      </div>
    </div>
  );
};

export default Top;
