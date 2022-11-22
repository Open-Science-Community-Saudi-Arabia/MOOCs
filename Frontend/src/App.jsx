import React from "react"
import "./GlobalStyles.css"
import { Routes, Route } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from "./pages/landing-page/LandingPage"
import Login from "./pages/auth/login"
import Signup from "./pages/auth/signup"
import Dashboard from "./pages/Dashboard"
import {AppProvider} from "./context";

function App() {
    return (

        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard"
            element={ <AppProvider><Dashboard /></AppProvider>}
            />
              
        </Routes>)
}

export default App
