import React from "react";
import { Navbar } from "../../components/Navbar";
import "./landingpage.scss";
import illustration from "../../images/hero-image.svg";
import { Link } from "react-router-dom";
import { CourseList, Courses, OpenPractice, Supporter } from "../../data";
import { Tooltip } from "react-tooltip";
import { MdArrowForward } from "react-icons/md";
import Footer from "../../components/Footer";

export default function index() {
  return (
    <>
      {/* Navbar */}
      <Navbar />
      <section className="hero--container">
        <div className="left">
          <h1 className="">
            {" "}
            <span>Learning with Open Innovation MOOCs </span>
            <br />
          </h1>
          <p>
            Revolutionize your research and education journey with Open
            Innovation MOOCs. Innovate with Open Science today.
          </p>
          <div className="btns">
            <button>Join us now!</button>
          </div>
        </div>
        <div className="right">
          <img src={illustration} alt="illustration" />
        </div>
      </section>

      {/* section Courses section ------  */}
      <section className="courses-section">
        <h1>Our best courses for you</h1>
        <div className="course-container">
          {Courses.map((option) => (
            <div key={option.id} className="course">
              <div className="icon-content">
                <img src={option.icon} className="icon" alt="icon" />
              </div>
              <h3 className="name">{option.name}</h3>
              <p className="description">{option.description}</p>
              <button className="btn">Start Learning</button>
            </div>
          ))}
        </div>

        <div className="course-list">
          {CourseList.map((course) => (
            <div key={course.id} id={course.name}>
              <img
                src={course.icon}
                className="course-icon"
                alt={course.name}
              />
              <Tooltip
                anchorId={course.name}
                place="top"
                content="Coming Soon"
              />
            </div>
          ))}
        </div>

        <Link to="" className="more-courses">
          <span> See All Courses</span>
          <MdArrowForward className="arrow" />
        </Link>
      </section>

      {/* Open science practice section */}
      <section className="open-science-section">
        <div className="__container">
          <h1>Open Science Practices</h1>
          <div className="__content">
            {OpenPractice.map((option, i) => (
              <div
                key={option.id}
                // style={{
                //   flexDirection: i % 2 ? "row-reverse" : "row",
                // }}
                className="practices"
              >
                {/* <div className={`${i % 2 && `rev`}`}> */}
                <img src={option.icon} alt="image" />
                {/* </div> */}
                <div
                  // style={{
                  //   alignItems: i % 2 ? "end" : "start",
                  //   textAlign: i % 2 ? "right" : "initial",
                  // }}
                  className="description"
                >
                  <p className="__name">{option.name} </p>
                  <span className="__content">{option.content} </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Colloboration */}
      <section className="collaboration-section">
        <div className="__container">
          <h1>Support and collaboration from leading organizations</h1>
          <div className="icon__content">
            {Supporter.map((option) => (
              <img
                key={option.id}
                src={option.icon}
                alt={option.name}
                className="icon"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Participants */}
      <section className="participants">
        <div className="join-class"></div>
        <div className="text-content">
          {" "}
          <h1>Join Over 1000+ participants to learn high demand Courses.</h1>
          <button>Join Us</button>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </>
  );
}
