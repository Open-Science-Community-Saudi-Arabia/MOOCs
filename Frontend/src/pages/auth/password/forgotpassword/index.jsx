import React, { useState } from "react"
import "../style.scss"
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { setToken } from "../../../../utils";
import Spinner from '../../../../components/Spinner'
import { forgotpassword } from "../../../../utils/api/auth"

export default function ForgotPassword() {
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate()

    const forgotPasswordHandler = async (event) => {
        event.preventDefault();
        try {
            const formData = {
                email: event.target.email.value,
            }
            setLoading(true)
            const response = await forgotpassword(formData)
            setToken(response.access_token)
            toast.success(<p> {response.message}!</p>, {
                // message should be " link sent to email not token"
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
                theme: "colored",
                onClose: () => navigate('/resetpassword')
            });
          
        }
        // error when not existing password used
        catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 5000,
                theme: "colored"
            });
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="forgotpassword-container">
                <div className='content-left'>
                    <img src="/images/ring1.png" alt="backgroundimage" className="ring2" />
                    <img src="/images/ring2.png" className="ring1" alt="backgroundimage" />
                    <h1>
                        OSCSA
                    </h1>
                </div>

                <div className="content-right">
                    <div className="content-right__item">
                        <h1>Forgot Password</h1>
                        <p>Enter the email associated with your account and we will send a link to reset your password.</p>
                        <form onSubmit={forgotPasswordHandler}>
                        <div className="field input-field">
                        <input type="email" name="email" placeholder="Email" required />
                        </div>
                            <div className="field button-field">
                                <button>{isLoading ? <Spinner /> : "Submit"}</button>

                            </div>
                            <div className="form-link">
                            <span>
                                Don't have an account?{" "}
                                <Link to="/signup" className="link signup-link">
                                    Sign Up
                                </Link>
                            </span>
                        </div>
                        </form>
                       
                    </div>
                </div>
            </div>

    )
}
