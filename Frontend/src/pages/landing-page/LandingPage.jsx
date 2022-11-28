import React from "react";
import Records from "../../components/Records/Records";
import { record, courses, learning, testimonials } from "../../utils/data";
import "./landingpage.scss";
import Course from "../../components/Course/Course";
import Carousel from "../../components/Carousel/Carousel";
import LearningWidget from "../../components/Learningwidget/LearningWidget";
import Testimonial from "../../components/TestimonialCard/Testimonial";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function LandingPage() {
  return (
    <>
      <Navbar />
      <div className="landingpage">
        <section className="hero--container">
          <div className="hero--wrapper">

            <div className="hero--content ">
              <div className="img--wrapper">
                <img
                  src="/images/Mask Group.png"
                  alt=""
                  className="images"
                />
              </div>
              <div className="hero--content--wrapper">
                <h1 className="hero--title">A revolutionary way to educate.</h1>
                <p className="hero--desc">Online education is electronically supported learning that
                  relies on the Internet for teacher/student interaction and
                  the distribution of class materials.</p>
              </div>
            </div>
            <div className="record--wrapper">
              {record.map((item, index) => <Records {...item} key={`record${index}`} />)}
            </div>
          </div>

        </section>

        <section className="course--container cont">
          <div className="heading--wrapper">
            <h1 className="course--title">
              Our Popular Courses
            </h1>
            <p className="course--desc">Lorem ipsum dolor sit amet, in sed integer. Scelerisque nam evget imperdiet accumsan, ipsum  turpis cursus. In elit amet, tortor nunc.</p>
          </div>
          <div className="carosel">
            <Carousel>
              {
                courses.map((course, index) => <Course {...course} key={index} />)
              }
            </Carousel>
          </div>
        </section>

        <section className="online--learning">
          <img src="/images/ring1.png" alt="" className="ring2" />
          <img src="/images/ring2.png" className="ring1" alt="" />
          <div className="online--learning--wrapper">
            <div className="learning--content">
              <h1>
                OSCSA
              </h1>
              <div className="learning--benefit">
                <h3>Benefits from our online
                  learning</h3>

                <div className="learning">
                  {learning.map((learn, index) => <LearningWidget {...learn} key={index} />)}
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="instructor-container">
          <div className="instructor">
            <h1>
              Become an Instructor
            </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo,
              luctus venenatis, lectus magna fringilla urna,

            </p>
            <div className="Buttton--wrapper">
              <button>Click Here to Apply</button>
            </div>
          </div>
          <div className="instruction--img">
            <img src="/images/Mask Group.png" alt="" />
          </div>
        </section>


        <section className="testimonial-wrapper cont">
          <div className="testimonial-header">
            <h1>
              Student Testimonial
            </h1>
            <p>vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci</p>
          </div>

          <div className="testimonial--card--wrapper ">
            {testimonials.map((item, index) => <Testimonial {...item} key={index} />)}
          </div>
        </section>


      </div>
      <Footer />
    </>
  );
}

export default LandingPage;

