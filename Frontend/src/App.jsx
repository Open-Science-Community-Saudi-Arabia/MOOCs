import React from "react"
import "./styles/GlobalStyles.scss"
import { Routes, Route } from "react-router-dom"
import LandingPage from "./pages/landing-page/LandingPage"
import Login from "./pages/auth/login"
import Signup from "./pages/auth/signup"
import Dashboard from "./pages/Dashboard"
import {AppProvider} from "./context";
import ResetPassword from "./pages/auth/password/reset-password";
import ForgotPassword from "./pages/auth/password/forgotpassword";

function App() {
    
    return (

        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/dashboard"
            element={ <AppProvider><Dashboard /></AppProvider>}
            />
              
        </Routes>)
}

export default App

