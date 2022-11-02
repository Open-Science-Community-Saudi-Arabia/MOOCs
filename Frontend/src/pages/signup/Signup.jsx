import React, { useState } from "react"
import "./signup.css"
import { Link } from "react-router-dom"
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"

function Signup() {
    const [ nameInput, setNameInput] = useState("");
    const [ emailInput, setEmailInput] = useState("");
    const [ passwordInput, setPasswordInput] = useState("");
    const [ passwordType, setPasswordType] = useState("password");
    const [ isPassword, setIsPassword] = useState(true);

    const handleToggle = () => {
        if (isPassword) {
            setPasswordType("text")
            setIsPassword(false);
        } else {
            setPasswordType("password");
            setIsPassword(true);
        }
        return setIsPassword(!isPassword);
    }
    return (
        <section className="container forms">
            <div className="form login">
                <div className="form-content">
                    <header>Sign Up to OSCSA</header>

                    <form action="#">
                        <div className="field input-field">
                            <input value={nameInput} type="text" placeholder="Full Name" className="input" onChange={(e) => setNameInput(e.target.value)} />
                        </div>

                        <div className="field input-field">
                            <input value={emailInput} type="email" placeholder="Email" className="input" onChange={(e) => setEmailInput(e.target.value)}/>
                        </div>
                        <div className="field input-field">
                            <input value={passwordInput} type={passwordType} placeholder="Password" className="password" onChange={(e) => setPasswordInput(e.target.value)}/>
                            
                            <div role="presentation" className="eye-icon" onClick={handleToggle}>
                                 {isPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                            </div>
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
