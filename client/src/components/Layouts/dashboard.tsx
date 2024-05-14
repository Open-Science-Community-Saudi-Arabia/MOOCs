import Header from "../DashboardHeader";
import "./style.scss";
import { Outlet } from "react-router-dom";

 /**
   * @category Client
   * @subcategory Component
   * @module Dashboard Layout
   * @description The layout component wraps the protected pages using react-router-outlet.
   * @component
   * @example
 *  <DashboardLayout />
   */

export default function DashboardLayout() {
  return (
    <section className="dashboard_layout">
      <Header />
      <div className="bg-[#f5f5f7] px-6 md:px-8 md:px-12 mx-auto pt-28 pb-12">
        <Outlet />
      </div>
    </section>
  );
}
