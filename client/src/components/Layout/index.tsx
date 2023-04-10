import { Link, Outlet } from "react-router-dom";
import "./style.scss";

const index = () => {
  /**
   * @category Frontend
   * @subcategory Component
   * @module Layout
   * @description The layout component wraps the Auth pages using react-router-outlet.
   * @component

   */
  return (
    <section className="layout">
      <div className="layout__content-left">
        <img
          src="/images/ring1.png"
          alt=""
          className="layout__content-left__ring2"
        />
        <img
          src="/images/ring2.svg"
          className="layout__content-left__ring1"
          alt=""
        />
        <Link className="layout__content-left__home-link" to="/">
          OSCSA
        </Link>
      </div>

      <div className="layout__content-right">
        <Outlet />
      </div>
    </section>
  );
};

export default index;
