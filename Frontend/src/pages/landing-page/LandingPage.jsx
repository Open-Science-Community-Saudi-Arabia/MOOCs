import Button from "../../components/Button/Button";
import React from "react";
import { Link } from "react-router-dom";
import Records from "../../components/Records/Records";
import { record } from "../../utils/data";
import "./landingpage.css";
import Course from "../../components/Course/Course";
import {courses} from '../../utils/data'
import Carosel from "../../components/Carosel/Carosel";

function LandingPage() {
  return (
    <>
      <section className="hero--wrapper">
        <div className="hero--content">
         <div className="img--wrapper">
         <img
            src="../../../public/images/hero-1.jpg"
            alt=""
            className="images"
          />
         </div>
          <div className="hero--content--wrapper">
            <h1 className="hero--title">A revolutionary way to educate.</h1>
            <p className="hero--desc">Online education is electronically supported learning that
 relies on the Internet for teacher/student interaction and
 the distribution of class materials.</p>

 <div className="button-wrapper"> 
          <Button title='Join for Free'/>
          <Button title='Explore Courses' outlined={true}/>          
        </div>
          </div>
        </div>
          <div className="record--wrapper">
          {record.map((item, index)=> <Records {...item} key={`record${index}`}/>)}
          </div>
      </section>
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
        <h1>
        OSCSA 
        </h1>
        <div>
          <h3>Benifits from our online 
learning</h3>
        </div>
       </div>
      </section>
      <section>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit cum est, consequatur dolore obcaecati pariatur quia doloremque non excepturi ipsam reiciendis unde eveniet. Alias corrupti nobis optio? Hic, ea rerum!</section>
    </>
  );
}

export default LandingPage;

{
  /* <div className=" link">
       <Link to="/login">Go to Login Page</Link>
        <Link to="/signup">Go to Sign Up Page</Link>

       </div> */
}
