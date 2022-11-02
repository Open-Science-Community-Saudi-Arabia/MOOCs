import React from "react"
import { Routes, Route } from "react-router-dom"
import LandingPage from "../pages/landing-page/LandingPage";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import Course from "../pages/pages/course";
import CourseDetails from "../components/CourseDetails/CourseDetails";

function Layout() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/course" element={<Course />} />
            <Route path="/course/:id" exact element={<CourseDetails/>}/>
        </Routes>
    )
}

export default Layout
