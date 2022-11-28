import React, { useState } from "react"
import "./style.scss"
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import Spinner from '../../../components/Spinner'
import { forgotpassword } from "../../../utils/api/auth"

export default function ForgotPassword() {
    const [isLoading, setLoading] = useState(false);


    const forgotPasswordHandler = async (event) => {

        event.preventDefault();
        try {
            const formData = {
                email: event.target.email.value,
            }
            setLoading(true)
            const response = await forgotpassword(formData)
            toast.success(<p>{response.status}! {response.message}</p>, {
                // message should be " link sent to email not token"
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
                theme: "colored"
            });
        }
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
        <>
            <div className="forgotpassword-container">
                <div className='item-left'>
                    <img src="/images/ring1.png" alt="backgroundimage" className="ring2" />
                    <img src="/images/ring2.png" className="ring1" alt="backgroundimage" />
                    <h1>
                        OSCSA
                    </h1>
                </div>

                <div className="field input-field item-right ">
                    <div className="item-right__content">
                        <h1>Forgot Password</h1>
                        <p>Enter the email associated with your account and we will send a link to reset your password.</p>
                        <form onSubmit={forgotPasswordHandler}>
                            <input type="email" name="email" placeholder="Email" required />
                            <div className="field button-field">
                                <button>{isLoading ? <Spinner /> : "Submit"}</button>

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
            </div>
            <ToastContainer /></>

    )
}
