import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from '../pages/landing-page/LandingPage'
import Login from '../pages/login/Login'
import Profile from '../pages/profile-page/Profile'
import Signup from '../pages/signup/Signup'

function Layout() {
	return (
		<Routes>
			<Route path='/' element={<LandingPage />}></Route>
			<Route path='/login' element={<Login />}></Route>
			<Route path='/signup' element={<Signup />}></Route>
			<Route path='/profile' element={<Profile />}></Route>
		</Routes>
	)
}

export default Layout
