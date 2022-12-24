import React from "react";
import "./activity.scss";
import { BsArrowRightShort } from "react-icons/bs";
import img from "../../../assets/course-2.jpg";

const Activity = () => {
  return (
    <div className="activitySection">
      <div className="heading flex">
        <h1>Upcoming Activities</h1>
        <button className="btn flex">
          {" "}
          See All
          <BsArrowRightShort className="icon" />
        </button>
      </div>
      <div className="contentSection grid">
        <div className="singleActivity flex">
          <img src={img} alt="course" />
          <div className="activityDetails">
            <span className="name">Assignment</span>
            <small>11/04/2022</small>
          </div>
          <div className="duration">10 Days left</div>
        </div>
        <div className="singleActivity flex">
          <img src={img} alt="course" />
          <div className="activityDetails">
            <span className="name">Assignment</span>
            <small>11/04/2022</small>
          </div>
          <div className="duration">10 Days Left</div>
        </div>
        <div className="singleActivity flex">
          <img src={img} alt="course" />
          <div className="activityDetails">
            <span className="name">Assignment</span>
            <small>11/04/2022</small>
          </div>
          <div className="duration">10 Days Left</div>
        </div>

        <div className="singleActivity flex">
          <img src={img} alt="course" />
          <div className="activityDetails">
            <span className="name">Assignment</span>
            <small>11/04/2022</small>
          </div>
          <div className="duration">10 Days Left</div>
        </div>
        <div className="singleActivity flex">
          <img src={img} alt="course" />
          <div className="activityDetails">
            <span className="name">Assignment</span>
            <small>11/04/2022</small>
          </div>
          <div className="time">10 Days Left</div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
