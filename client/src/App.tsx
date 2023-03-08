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
import Lesson from "./pages/Dashboard/lesson";
import ErrorPage from "./pages/error";
import EmailVerify from "./pages/auth/EmailVerify";
function App() {
  return (
    <Suspense fallback={<Spinner width="30px" height="30px" />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route
            path="/api/v1/auth/verifyemail/:token"
            element={<EmailVerify />}
          />
        </Route>
        <Route path="/dashboard">
          <Route
            index
            element={
              <AppProvider>
                <Dashboard />
              </AppProvider>
            }
          />
          <Route path=":id" element={<Lesson />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;

// Todo
// install elint husky and pretty
// try the json format but check the compliing first
