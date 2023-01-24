import React from "react";
import Navbar from "../../components/Navbar";
import "./landingpage.scss";
import illustration from "../../assets/illustration.svg"
import { Link } from "react-router-dom";


export default function index() {
  return (
    <div>
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
            <Link className="all-plans-link" to= "/">See all plans</Link>
          </div>
        </div>
        <div className="right">
          {/* <div className="illustration"></div> */}
          <img src={illustration} alt="illustration"/>
        </div>
      </section>
    </div>
  );
}
