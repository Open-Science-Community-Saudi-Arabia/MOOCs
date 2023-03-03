import { Navbar } from "../../components/Navbar";
import "./landingpage.scss";
import illustration from "../../images/hero-image.svg";
import { Link } from "react-router-dom";
import { CourseList, Courses, OpenPractice, Supporter } from "../../data";
import { Tooltip } from "react-tooltip";
import { MdArrowForward } from "react-icons/md";
import Footer from "../../components/Footer";
import { Trans,t } from "@lingui/macro";


export default function index() {
  return (
    <>
      {/* Navbar */}
      <Navbar />
      <section className="hero--container">
        <div className="left">
          <h1 className="">
            {" "}
            <span>
              <Trans>Learning with Open Innovation MOOCs</Trans>
            </span>
            <br />
          </h1>
          <p>
            <Trans>
              {" "}
              Revolutionize your research and education journey with Open
              Innovation MOOCs. Innovate with Open Science today.
            </Trans>
          </p>
          <div className="btns">
            <button>
              <Trans>Join us now!</Trans>
            </button>
          </div>
        </div>
        <div className="right">
          <img src={illustration} alt="illustration" />
        </div>
      </section>

      {/* section Courses section ------  */}
      <section className="courses-section">
        <h1>
          <Trans>Our best courses for you</Trans>
        </h1>
        <div className="course-container">
          {Courses.map(({id,name,icon,description}) => (
            <div key={id} className="course">
              <div className="icon-content">
                <img src={icon} className="icon" alt="icon" />
              </div>
              <h3 className="name">{name}</h3>
              <p className="description">{description}</p>
              <button className="btn">
                <Trans>Start Learning</Trans>
              </button>
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
                html={"<Trans>Coming Soon</Trans>"}
              />
            </div>
          ))}
        </div>

        <Link to="" className="more-courses">
          <span>
            {" "}
            <Trans>See All Courses</Trans>
          </span>
          <MdArrowForward className="arrow" />
        </Link>
      </section>

      {/* Open science practice section */}
      <section className="open-science-section">
        <div className="__container">
          <h1>
            <Trans>Open Science Practices</Trans>
          </h1>
          <div className="__content">
            {OpenPractice.map(({id,content,name,icon}) => (
              <div key={id} className="practices">
                <img src={icon} alt="image" />
                <div className="description">
                  <p className="__name">
                    <Trans>{name}</Trans>
                  </p>
                  <span className="__content">
                    <Trans>{content}</Trans>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Colloboration */}
      <section className="collaboration-section">
        <div className="__container">
          <h1>
            <Trans>Support and collaboration from leading organizations</Trans>
          </h1>
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
          <h1>
            <Trans>
              Join Over 1000+ participants to learn high demand Courses.
            </Trans>
          </h1>
          <button>
            <Trans>Join Us</Trans>
          </button>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </>
  );
}
