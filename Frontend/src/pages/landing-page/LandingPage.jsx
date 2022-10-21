import Button from "../../components/Button/Button";
import React from "react";
import Records from "../../components/Records/Records";
import { record } from "../../utils/data";
import "./landingpage.css";
import {Link} from 'react-router-dom'
import Course from "../../components/Course/Course";
import {courses, learning, testimonials} from '../../utils/data'
import Carosel from "../../components/Carousel/Carousel";
import LearningWidget from "../../components/Learningwidget/LearningWidget";
import Testimonial from "../../components/TestimonialCard/Testimonial";

function LandingPage() {
  return (
    <div className="landingpage">
      <section className="hero--wrapper">
        <div className="hero--content">
         <div className="img--wrapper">
         <img
            src="../../../public/images/Mask Group.png"
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
          {record.map((item, index)=> <Records {...item} key={`record${index}`}/>)}
          </div>           
      </section>
      <div className="record--mobile">
          {record.map((item, index)=> <Records {...item} key={`record${index}`}/>)}
          </div>
      <section className="course--container">
       <div className="heading--wrapper">
       <h1 className="course--title">
        Our Popular Courses
        </h1>
        <p className="course--desc">Lorem ipsum dolor sit amet, in sed integer. Scelerisque nam evget imperdiet accumsan, ipsum  turpis cursus. In elit amet, tortor nunc.</p>
       </div>
        <div className="carosel">
      <Carosel>
      {
        courses.map((course, index)=>  <Course {...course} key={index}/>)
       }
      </Carosel>
       </div> 
      </section>

       <section className="online--learning">
       <img src="../../../public/images/ring1.png" alt="" className="ring2" />
       <img src="../../../public/images/ring2.png" className="ring1" alt="" />
       <div className="online--learning--wrapper">
          <div className="learning--content">
          <h1>
        OSCSA 
        </h1>
        <div className="learning--benefit">
          <h3>Benefits from our online 
learning</h3> 

      <div className="learning">
     {learning.map((learn, index)=> <LearningWidget {...learn} key={index}/>)}
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
         <Button title='Click Here to Apply' outlined={true}/>
         </div>
        </div>
        <div className="instruction--img">
          <img src="../../../public/images/Mask Group.png" alt="" />
        </div> 
      </section>


      <section className="testimonial-wrapper">
           <div className="testimonial-header">
           <h1>
            Student Testimonial
            </h1>
            <p>vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci</p>
           </div> 

 <div className="testimonial--card--wrapper">
  
       {testimonials.map((item, index)=> <Testimonial {...item} key={index}/>)}

</div> 
      </section>

      <div className=" links">
       {/* <Link to="/login">Go to Login Page</Link>
        <Link to="/signup">Go to Sign Up Page</Link> */}

       </div> 
    </div>
  );
}

export default LandingPage;

