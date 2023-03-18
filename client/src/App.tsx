import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/GlobalStyles.scss";
import "react-tooltip/dist/react-tooltip.css";
import LandingPage from "./pages/home";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import { AppProvider } from "./context";
import ResetPassword from "./pages/auth/reset-password";
import ForgotPassword from "./pages/auth/forgot-password";
import Layout from "./components/Layout";
import Spinner from "./components/Spinner";
import ErrorPage from "./pages/error";
import EmailVerify from "./pages/auth/email-verify";
import { QueryClient, QueryClientProvider } from "react-query";
import Dashboard from "./pages/dashboard";
import Course from "./pages/dashboard/course";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Spinner width="30px" height="30px" />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route
              path="/api/v1/auth/verifyemail/:access_token"
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
            <Route path=":id" element={<Course />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;

// Todo
// install elint husky and pretty
// Run  for performances and accesibility checks
// review the file structure - were to put components
// review the auth provider
