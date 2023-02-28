import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/GlobalStyles.scss";
import "react-tooltip/dist/react-tooltip.css";
import LandingPage from "./pages/landing-page";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Dashboard from "./pages/Dashboard";
import { AppProvider } from "./context";
import ResetPassword from "./pages/auth/reset-password";
import ForgotPassword from "./pages/auth/forgotpassword";
import Layout from "./components/Layout";
import Spinner from "./components/Spinner";
function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Route>
        <Route
          path="/dashboard"
          element={
            <AppProvider>
              <Dashboard />
            </AppProvider>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
