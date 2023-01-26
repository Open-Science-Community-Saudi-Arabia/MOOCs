import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/oscsalogo.jpg";
import Github from "../../images/github-image.png";
import LinkedIn from "../../images/linkedin.png";
import Twitter from "../../images/twitter.png";
import Facebook from "../../images/facebook.png";
import "./footer.scss";

export default function index() {
  return (
    <div className="footer">
      <div className="__container">
        <div className="__logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="right">
          <div className="quicklinks">
            <h3>Quick Links</h3>
            <Link to=""> Courses</Link>
            <Link to="">Blog</Link>
            <Link to="">Guidelines </Link>
            <Link to="">Resources</Link>
          </div>
          <div className="community">
            <h3>Communities</h3>
            <Link to="">OSCSA</Link>
            <Link to="">Turing Way </Link>
            <Link to="">Partnership </Link>
          </div>
          <div className="sociallinks">
            <h3> Follow Us</h3>
            <Link to="">
              <img src={Twitter} alt="twitter" />
            </Link>
            <Link to="">
              <img src={LinkedIn} alt="linkedin" />
            </Link>
            <Link to="">
              <img src={Github} alt="github" />
            </Link>
            <Link to="">
              <img src={Facebook} alt="facebook" />
            </Link>
          </div>
          <div className="info">
            <h3> Contact Info</h3>
            <Link to=""> admin@openscisaudi.com</Link>
          </div>
        </div>
      </div>
      <p>Copyright © OSCSA 2023</p>
    </div>
  );
}
