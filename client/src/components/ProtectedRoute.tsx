import { Outlet } from "react-router-dom";
import AppProvider from "../context";

export default function ProtectedRoute() {
  return (
    <div>
      <AppProvider>
        <Outlet />
      </AppProvider>
    </div>
  );
}
