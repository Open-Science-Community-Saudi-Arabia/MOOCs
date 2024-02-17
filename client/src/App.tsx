import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/GlobalStyles.scss";
import "react-tooltip/dist/react-tooltip.css";
import LandingPage from "./pages/home";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import ResetPassword from "./pages/auth/reset-password";
import ForgotPassword from "./pages/auth/forgot-password";
import Layout from "./components/Layout";
import Spinner from "./components/Spinner";
import ErrorPage from "./pages/error";
import EmailVerify from "./pages/auth/email-verify";
import { QueryClient, QueryClientProvider } from "react-query";
import Board from "./pages/board/dashboard";
import ViewCourse from "./pages/board/viewcourse";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Spinner width="30px" height="30px" color="#fff" />}>
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
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Board />} />
            <Route path="course/:id" element={<ViewCourse />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
