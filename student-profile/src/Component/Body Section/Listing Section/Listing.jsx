import React from "react";
import "./listing.scss";
import { BsArrowRightShort } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import img from "../../../assets/course-3.jpg";
import img2 from "../../../assets/course-2.jpg";
import img3 from "../../../assets/student-1.jpg";
import img1 from "../../../assets/course-1.jpg";

const Listing = () => {
  return (
    <div className="listingSection">
      <div className="heading flex">
        <h1>My courses</h1>
        <button className="btn flex">
          Sell All <BsArrowRightShort className="icon" />
        </button>
      </div>
      <div className="sectionContainer flex">
        <div className="singleCourse">
          <AiFillHeart className="icon" />
          <img src={img} alt="course" />
          <h3>UX/UI Design</h3>
        </div>
        <div className="singleCourse">
          <AiFillHeart className="icon" />
          <img src={img} alt="course" />
          <h3>UX/UI Design</h3>
        </div>
        <div className="singleCourse">
          <AiFillHeart className="icon" />
          <img src={img2} alt="course" />
          <h3>HTML5</h3>
        </div>
        <div className="singleCourse">
          <AiFillHeart className="icon" />
          <img src={img} alt="course" />
          <h3>UX/UI Design</h3>
        </div>
      </div>
      <div className="course flex">
        <div className="topCourses">
          <div className="heading flex">
            <h3> Your Top Courses</h3>
            <button className="btn flex">
              Sell All <BsArrowRightShort className="icon" />
            </button>
          </div>
          <div className="card flex">
            <div className="courses">
              <img src={img} alt="course" />
              <img src={img3} alt="course" />
              <img src={img} alt="course" />
              <img src={img3} alt="course" />
            </div>
            <div className="card">
              <span>
                35000 Total Points <br />
                <small>
                  9 courses <span> 6 Days </span>
                </small>
              </span>
            </div>
          </div>
        </div>
        <div className="weakCourses">
          <div className="heading flex">
            <h3> Your Weak Courses</h3>
            <button className="btn flex">
              Sell All <BsArrowRightShort className="icon" />
            </button>
          </div>
          <div className="card flex">
            <div className="courses">
              <img src={img1} alt="course" />
              <img src={img2} alt="course" />
              <img src={img1} alt="course" />
              <img src={img1} alt="course" />
            </div>
            <div className="card">
              <span>
                354 Total Points <br />
                <small>
                  11 courses <span> 6 Days </span>
                </small>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;
