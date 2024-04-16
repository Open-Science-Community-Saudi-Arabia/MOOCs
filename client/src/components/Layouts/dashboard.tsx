import Header from "../DashboardHeader";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <section className="dashboard_layout">
      <Header />
      <div className="w-11/12 mx-auto pt-28 pb-12">
        <Outlet />
      </div>
    </section>
  );
}
