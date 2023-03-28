import { Link } from "react-router-dom";
import logo from "../../images/oscsalogo.jpg";
import Github from "../../images/github-image.png";
import LinkedIn from "../../images/linkedin.png";
import Twitter from "../../images/twitter.png";
import Facebook from "../../images/facebook.png";
import "./footer.scss";
import { Trans } from "@lingui/macro";

const index=()=> {
  return (
    <section className="footer-container">
      <div className="footer">
        <Link to={"/"} className="footer__logo">
          {" "}
          <img
            className="logo-image"
            src={logo}
            alt="Open source community Saudia Arabia logo"
          />
        </Link>

        <div className="footer__content">
          <div className="footer__content-quicklinks">
            <h3 className="heading">
              <Trans>Quick Links</Trans>
            </h3>
            <Link className="nav-link" to="">
              <Trans>Courses</Trans>
            </Link>
            <Link className="nav-link" to="">
              <Trans>Blog</Trans>
            </Link>
            <Link className="nav-link" to="">
              <Trans>Guidelines</Trans>{" "}
            </Link>
            <Link className="nav-link" to="">
              <Trans>Resources</Trans>
            </Link>
          </div>
          <div className="footer__content-communities">
            <h3 className="heading">  <Trans>Communities</Trans></h3>
            <Link className="nav-link" to="">
              <Trans>OSCSA</Trans>
            </Link>
            <Link className="nav-link" to="">
              <Trans>Turing Way</Trans>{" "}
            </Link>
            <Link className="nav-link" to="">
              <Trans>Partnership </Trans>
            </Link>
          </div>
          <div className="footer__content-sociallinks">
            <h3 className="heading">
              {" "}
              <Trans>Follow Us</Trans>
            </h3>
            <Link className="nav-link" to="">
              <img className="nav-link__image" src={Twitter} alt="twitter" />
            </Link>
            <Link className="nav-link" to="">
              <img className="nav-link__image" src={LinkedIn} alt="linkedin" />
            </Link>
            <Link className="nav-link" to="">
              <img className="nav-link__image" src={Github} alt="github" />
            </Link>
            <Link className="nav-link" to="">
              <img className="nav-link__image" src={Facebook} alt="facebook" />
            </Link>
          </div>
          <div className="footer__content-info">
            <h3 className="heading">
              {" "}
              <Trans>Contact Info</Trans>
            </h3>
            <Link className="nav-link" to="">
              {" "}
              admin@openscisaudi.com
            </Link>
          </div>
        </div>
      </div>
      <p className="footer-container__copyright">
        <Trans>Copyright © OSCSA MOOCS</Trans> {new Date().getFullYear()}
      </p>
    </section>
  );
}
export default index