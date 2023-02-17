import React, { ReactNode } from "react";
import { Link, Outlet } from "react-router-dom";
import "./style.scss"
type Props = { children: ReactNode }
function index() {
  return (
    <div className="forgotpassword-container">
      <div className="content-left">
        <img src="/images/ring1.png" alt="backgroundimage" className="ring2" />
        <img src="/images/ring2.svg" className="ring1" alt="backgroundimage" />
        <Link className="home-link" to="/">OSCSA</Link >
      </div>

      <div className="content-right">
      <Outlet />
      </div>
    </div>
  );
}

export default index;
