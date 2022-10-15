import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./landingpage.css";

function LandingPage() {
	return (
		<>
			<Navbar />
			<div className="landing-page">
				<h1>
					<Link to="/login">Go to Login Page</Link>
				</h1>

				<h1>
					<Link to="/signup">Go to Sign Up Page</Link>
				</h1>
			</div>
		</>
	);
}

export default LandingPage;
