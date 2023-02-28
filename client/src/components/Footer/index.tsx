import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/oscsalogo.jpg";
import Github from "../../images/github-image.png";
import LinkedIn from "../../images/linkedin.png";
import Twitter from "../../images/twitter.png";
import Facebook from "../../images/facebook.png";
import "./footer.scss";
import { Trans } from "@lingui/macro";

export default function index() {
  return (
    <div className="footer">
      <div className="__container">
        <div className="__logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="right">
          <div className="quicklinks">
            <h3>
              <Trans>Quick Links</Trans>
            </h3>
            <Link to="">
              <Trans>Courses</Trans>
            </Link>
            <Link to="">
              <Trans>Blog</Trans>
            </Link>
            <Link to="">
              <Trans>Guidelines</Trans>{" "}
            </Link>
            <Link to="">
              <Trans>Resources</Trans>
            </Link>
          </div>
          <div className="community">
            <h3>Communities</h3>
            <Link to="">
              <Trans>OSCSA</Trans>
            </Link>
            <Link to="">
              <Trans>Turing Way</Trans>{" "}
            </Link>
            <Link to="">
              <Trans>Partnership </Trans>
            </Link>
          </div>
          <div className="sociallinks">
            <h3>
              {" "}
              <Trans>Follow Us</Trans>
            </h3>
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
            <h3>
              {" "}
              <Trans>Contact Info</Trans>
            </h3>
            <Link to=""> admin@openscisaudi.com</Link>
          </div>
        </div>
      </div>
      <p>
        <Trans>Copyright © OSCSA MOOCS</Trans> {new Date().getFullYear()}
      </p>
    </div>
  );
}
