import React from "react";
import { FaFacebook, FaTwitter, FaInstagram} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import "./footer.scss";

function Footer() {
	return (
		<footer className="footer">
			<div className="footer-wrapper">
				<div className="footer-summary">
					<h1>OSCSA</h1>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis totam modi nihil debitis
						maiores asperiores, qui dolorum et! Esse excepturi deleniti molestiae quos corporis
						dolorum asperiores, numquam suscipit porro! Deserunt
					</p>
				</div>
				<div className="footer-links">
					<h2>Company</h2>
					<Link to="/">About Us</Link>
					<Link to="/">Services</Link>
					<Link to="/">Community</Link>
					<Link to="/">Testimonial</Link>
				</div>
				<div className="footer-links">
					<h2>Support</h2>
					<Link to="/">Help Center</Link>
					<Link to="/">Webians</Link>
					<Link to="/">Service</Link>
					<Link to="/">All in One</Link>
				</div>
				<div className="footer-links">
					<h2>Links</h2>
					<Link to="/">Courses</Link>
					<Link to="/">Become a teacher</Link>
					<Link to="/">Service</Link>
					<Link to="/">All in One</Link>
				</div>
				<div className="footer-links">
					<h2>Contact Us</h2>
					<div className="contact-links">
						<FaFacebook />
						<a href="https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs" target="_blank" rel="noreferrer">
							Facebook
						</a>
					</div>
					<div className="contact-links">
						<FaTwitter />
						<a href="https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs" target="_blank" rel="noreferrer">
							Twitter
						</a>
					</div>
					<div className="contact-links">
						<FaInstagram />
						<a href="https://github.com/Open-Science-Community-Saudi-Arabia/MOOCs" target="_blank" rel="noreferrer">
							Instagram
						</a>
					</div>
					<div className="contact-links">
						<MdEmail />
						<a href="mailto:#">moocs@gmail.com</a>
					</div>
				</div>
			</div>
			<div className="copyright">
				<p>Copyright &#169; 2022 Open-Science-Community-Saudi-Arabia/MOOC. All Right Reserved.</p>
			</div>
		</footer>
	);
}

export default Footer;
