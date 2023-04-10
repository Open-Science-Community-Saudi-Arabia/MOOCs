import Navbar from "../../components/Navbar";
import "./home.scss";
import illustration from "../../images/hero-image.svg";
import { Link } from "react-router-dom";
import { CourseList, Courses, OpenPractice, Supporter } from "../../data";
import { Tooltip } from "react-tooltip";
import { MdArrowForward } from "react-icons/md";
import Footer from "../../components/Footer";
import { Trans } from "@lingui/macro";

/**
 * @category Frontend
 * @subcategory Pages
 * @module Home
 * @description The landing Page.
 * @component
 * @example
 * <Route path="/" element={<LandingPage />} />
 */

const Home = () => {
  return (
    <>
      <Navbar />
      <section className="hero-container">
        <div className="hero-container__left">
          <h1 className="hero-container__left-heading">
            {" "}
            <Trans>Learning with Open Innovation MOOCs</Trans>
            <br />
          </h1>
          <p className="hero-container__left-text">
            <Trans>
              {" "}
              Revolutionize your research and education journey with Open
              Innovation MOOCs. Innovate with Open Science today.
            </Trans>
          </p>
          <div className="hero-container__left-signup">
            <Link to={"/signup"} className="hero-container__left-signup__link">
              <Trans>Join us now!</Trans>
            </Link>
          </div>
        </div>
        <div className="hero-container__right">
          <img
            className="hero-container__right-img"
            src={illustration}
            alt=" Artifical intelligence illustration"
          />
        </div>
      </section>

      {/* section Courses section ------  */}
      <section className="courses-section">
        <h2 className="courses-section__heading">
          <Trans>Our best courses for you</Trans>
        </h2>
        <div className="courses-section__container">
          {Courses.map(({ id, name, icon, description }) => (
            <div key={id} className="courses-section__container-course">
              <div className="courses-section__container-course__icon-content">
                <img
                  src={icon}
                  className="courses-section__container-course__icon-content-icon"
                  alt={`${name} icon`}
                />
              </div>
              <h3 className="courses-section__container-course__name">
                <Trans> {name()}</Trans>
              </h3>
              <p className="courses-section__container-course__description">
                {description()}
              </p>
              <Link
                to={"/login"}
                className="courses-section__container-course__link"
              >
                <Trans>Start Learning</Trans>
              </Link>
            </div>
          ))}
        </div>

        <div className="courses-section__courses">
          {CourseList.map((course) => (
            <div
              className="courses-section__courses-list"
              key={course.id}
              id={course.name}
            >
              <img
                src={course.icon}
                className="courses-section__courses-list__icon-img"
                alt={`${course.name} icon`}
              />
              <Tooltip
                anchorId={course.name}
                place="top"
                html={"<Trans>Coming Soon</Trans>"}
              />
            </div>
          ))}
        </div>

        <Link to={"/login"} className="courses-section__link">
          <span>
            {" "}
            <Trans>See All Courses</Trans>
          </span>
          <MdArrowForward className="courses-section__link-arrow" />
        </Link>
      </section>

      {/* Open science practice section */}
      <section className="open-science">
        <article className="open-science__article">
          <h2 className="open-science__article-heading">
            <Trans>Open Science Practices</Trans>
          </h2>
          <div className="open-science__article-content">
            {OpenPractice.map(({ id, content, name, icon }) => (
              <div key={id} className="open-science__article-content__list">
                <img
                  src={icon}
                  alt={`${name}icon`}
                  className="open-science__article-content__list-img"
                />
                <div className="open-science__article-content__list-item aligned">
                  <h3 className="open-science__article-content__list-item-name aligned">
                    {name()}
                  </h3>
                  <span className="open-science__article-content__list-item-description aligned">
                    {content()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      {/* Colloboration */}
      <section className="collaboration-section">
        <div className="collaboration-section__container">
          <h2 className="collaboration-section__container-heading">
            <Trans>Support and collaboration from leading organizations</Trans>
          </h2>
          <div className="collaboration-section__container-icon">
            {Supporter.map((option) => (
              <img
                key={option.id}
                src={option.icon}
                alt={`${option.name}icon`}
                className="collaboration-section__container-icon-img"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Participants */}
      <section className="participants">
        <div className="participants__background-image"></div>
        <div className="participants__content">
          {" "}
          <h2 className="participants__content-heading">
            <Trans>
              Join Over 1000+ participants to learn high demand courses.
            </Trans>
          </h2>
          <Link className="participants__content-link" to={"/login"}>
            <Trans>Join Us</Trans>
          </Link>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </>
  );
};



export default Home;
