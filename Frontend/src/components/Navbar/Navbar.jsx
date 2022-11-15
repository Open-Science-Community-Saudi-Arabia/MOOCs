import React, { useState } from "react";
import { TfiWorld } from "react-icons/tfi";
import { BiCaretDown, BiSearchAlt } from "react-icons/bi";
import { HiBars3 } from "react-icons/hi2";
import { FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

function Navbar() {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className="header">
			<nav className="navbar">
				<Link to="/" className="logo">
					OSCSA
				</Link>
				<button className="category-btn">
						Categories
						<BiCaretDown />
					</button>
					<div className="search">
						<BiSearchAlt />
						<input type="text" className="search-input" placeholder="Search for courses" />
					</div>
					<Link to="#" className="nav-links">
						Resources
					</Link>
					<Link to="#" className="nav-links">
						About
					</Link>
					<button className="auth-btns" onClick={() => navigate("/login")}>
						Log In
					</button>
					<button className="auth-btns" onClick={() => navigate("/signup")}>
						Sign Up
					</button>
					<button className="icon-btn">
						<TfiWorld />
					</button>
				<div className={isOpen ? "navbar-mobile open" : "navbar-mobile"}>
					<Link to="#" className={isOpen ? "nav-links mobile" : "nav-links"}>
						Resources
					</Link>
					<Link to="#" className={isOpen ? "nav-links mobile" : "nav-links"}>
						About
					</Link>
					<button className={isOpen ? "category-btn mobile" : "category-btn"}>
						Categories
						<BiCaretDown />
					</button>
					<button
						className={isOpen ? "auth-btns mobile" : "auth-btns"}
						onClick={() => navigate("/login")}
					>
						Log In
					</button>
					<button
						className={isOpen ? "auth-btns mobile" : "auth-btns"}
						onClick={() => navigate("/signup")}
					>
						Sign Up
					</button>
				</div>
				<button className="mobile-nav-icon" onClick={() => setIsOpen(!isOpen)}>
					{isOpen ? <FaTimes /> : <HiBars3 />}
				</button>
			</nav>
		</header>
	);
}

export default Navbar;
