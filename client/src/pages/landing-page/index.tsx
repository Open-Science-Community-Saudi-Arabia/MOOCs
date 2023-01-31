import React from "react";
import { Navbar } from "../../components/Navbar";
import "./landingpage.scss";
import illustration from "../../images/Illustration.svg";
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
          <h1 className="">Search and find your best courses with easy way</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur. Proin amet ac nunc porta
            volutpat semper donec eget. Bibendum gravida sagittis tortor eu sit.
            Tempor molestie eget sit lorem.
          </p>
          <div className="btns">
            <button>Join us now!</button>
            <Link className="all-plans-link" to="/">
              See all plans
            </Link>
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
              <p className="member">{option.members}+ enrolled</p>
              <p className="description">{option.description}</p>
              <button className="btn">Start Learning</button>
            </div>
          ))}
        </div>
        <div className="course-list">
          {CourseList.map((course) => (
            <div key={course.id} id={course.name}>
              <course.icon key={course.id} className="course-icon" />
              <p className="course-name">{course.name}</p>
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
        <h1>Open Science Practices</h1>
        <div className="__container">
          {OpenPractice.map((option, i) => (
            <div
              key={option.id}
              style={{
                flexDirection: i % 2 ? "row-reverse" : "row",
              }}
              className="practices"
            >
              <div
                style={{ backgroundColor: option.color }}
                className={`${i % 2 && `rev`} icon-box`}
              >
                {<option.icon />}
              </div>
              <div
                style={{
                  alignItems: i % 2 ? "end" : "start",
                  textAlign: i % 2 ? "right" : "initial",
                }}
                className="description"
              >
                <p className="__name">{option.name} </p>
                <span className="__content">{option.content} </span>
              </div>
            </div>
          ))}
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
