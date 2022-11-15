import React from "react"
import { Routes, Route } from "react-router-dom"
import LandingPage from "../pages/landing-page/LandingPage"
import Login from "../pages/auth/login"
import Signup from "../pages/auth/signup"

function Layout() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    )
}

export default Layout
