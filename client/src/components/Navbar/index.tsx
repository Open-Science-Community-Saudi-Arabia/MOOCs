import React from "react";
import logo from "../../assets/oscsalogo.jpg";
import "./navbar.scss";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="logo" />
      <nav className="navbar">
        <Link className="navlink" to="/">
          Home
        </Link>
        <Link className="navlink" to="/">
          Courses
        </Link>
        <Link className="navlink" to="/">
          About
        </Link>
        <Link className="navlink" to="/">
          FAQ
        </Link>
        <Link className="navlink" to="/">
          Blog
        </Link>
      </nav>
      <div className="auth-btn">
        <button className="auth-btn-login">Log In</button>
        <button className="auth-btn-signup">Sign Up</button>
      </div>
    </header>
  );
}

export default Navbar;
