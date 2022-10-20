import React from "react"
import "./signup.css"
import { Link } from "react-router-dom"

function Signup() {
    return (
        <section className="container forms">
            <div className="form login">
                <div className="form-content">
                    <header>Sign Up to OSCSA</header>

                    <form action="#">
                        <div className="field input-field">
                            <input type="text" placeholder="Full Name" className="input" />
                        </div>

                        <div className="field input-field">
                            <input type="email" placeholder="Email" className="input" />
                        </div>
                        <div className="field input-field">
                            <input type="password" placeholder="Password" className="password" />
                            <i className="bx bx-hide eye-icon" />
                        </div>

                        <div className="field button-field">
                            <button>Login</button>
                        </div>
                    </form>

                    <div className="line" />

                    <div className="media-options">
                        <a href="#" className="field google">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                                alt=""
                                className="google-img"
                            />
                            <span>Sign Up with Google</span>
                        </a>
                    </div>
                    <div className="form-link">
                        <span>
                            Already have an Account?
                            <Link to="/login" className="link signup-link">
                                &nbsp; Login
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Signup
