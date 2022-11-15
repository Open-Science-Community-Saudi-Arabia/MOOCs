import React from "react"
import "../style.css"
import { Link } from "react-router-dom"

function Login() {
    return (
        <div>
            <section className="container forms">
                <div className="form login">
                    <div className="form-content">
                        <header>Login to MOOCs</header>

                        <div className="media-options">
                            <a href="#" className="field google">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                                    alt=""
                                    className="google-img"
                                />
                                <span>Login with Google</span>
                            </a>
                        </div>
                        <div className="line" />

                        <form action="#">
                            <div className="field input-field">
                                <input type="email" placeholder="Email" className="input" />
                            </div>

                            <div className="field input-field">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="password"
                                />
                                <i className="bx bx-hide eye-icon" />
                            </div>

                            <div className="field button-field">
                                <button>Login</button>
                            </div>
                        </form>

                        <div className="form-link">
                            <span>
                                Don't have an account?{" "}
                                <Link to="/signup" className="link signup-link">
                                    Sign Up
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login
