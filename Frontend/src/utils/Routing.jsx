import React from "react"
import { Routes, Route } from "react-router-dom"
import LandingPage from "../pages/landing-page/LandingPage"
import Login from "../pages/login/Login"
import Signup from "../pages/signup/Signup"

function Layout() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
        </Routes>
    )
}

export default Layout
