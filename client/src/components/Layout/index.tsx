import { Link, Outlet } from "react-router-dom";
import "./style.scss";

function index() {
  return (
    <section className="layout-container">
      <div className="content-left">
        <img src="/images/ring1.png" alt="" className="content-left__ring2" />
        <img src="/images/ring2.svg" className="content-left__ring1" alt="" />
        <Link className="content-left__home-link" to="/">
          OSCSA
        </Link>
      </div>

      <div className="content-right">
        <Outlet />
      </div>
    </section>
  );
}

export default index;
