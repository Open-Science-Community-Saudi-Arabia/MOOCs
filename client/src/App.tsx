import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/GlobalStyles.scss";
import "react-tooltip/dist/react-tooltip.css";
import LandingPage from "./pages/home";
import Login from "./pages/auth/login";
import AdminLogin from "./pages/auth/admin/login";
import Signup from "./pages/auth/signup";
import ResetPassword from "./pages/auth/reset-password";
import ForgotPassword from "./pages/auth/forgot-password";
import Layout from "./components/Layouts";
import Spinner from "./components/Spinner";
import ErrorPage from "./pages/error";
import EmailVerify from "./pages/auth/email-verify";
import { QueryClient, QueryClientProvider } from "react-query";
import Board from "./pages/board/dashboard";
import ViewCourse from "./pages/board/viewcourse";
import AdminBoard from "./pages/admin";
import CollaboratorBoard from "./pages/collaborator";
import DashboardLayout from "./components/Layouts/dashboard";
import AddCourse from "./components/AddCourse";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Spinner width="30px" height="30px" color="#fff" />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route
              path="/verifyemail/:access_token"
              element={<EmailVerify />}
            />
          </Route>

          <Route element={<DashboardLayout />}>
            <Route
              path="/collaborator/dashboard"
              element={<CollaboratorBoard />}
            />
            <Route path="dashboard" element={<Board />} />
            <Route path="/collaborator/add-course" element={<AddCourse/>} />
            {/* admin */}
            <Route path="/admin/dashboard" element={<AdminBoard />} />
          </Route>
          <Route path="course/:id" element={<ViewCourse />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
