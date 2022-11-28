import React, { useState } from "react"
import "./style.css"
import { Link } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import { BiErrorCircle } from "react-icons/bi";
import Spinner from '../../../components/Spinner'
import { resetpassword } from "../../../utils/api/auth"

export default function ResetPassword() {
    const [isLoading, setLoading] = useState(false);
    const [checkpassword, setCheckPassword] = useState(false);
    const [toggleVisibility, setToggleVisibility] = useState(false);
    // const {  reset_token } = useParams();
    // const navigate = useNavigate()


    const resetPasswordHandler = async (event) => {

        setCheckPassword(false)
        event.preventDefault();
        if (event.target.password.value !== event.target.confirmpassword.value) {
            setCheckPassword(true)
        } else {
            try {
                const formData = {
                    // reset_token,
                    password: event.target.password.value,
                }
                setLoading(true)
                await resetpassword(formData)
                // toast.success(<p>{response.status}! {response.message}</p>, {
                //     position: toast.POSITION.TOP_CENTER,
                //     autoClose: 3000,
                //     theme: "colored"
                // });
                // navigate('/login')
            }
            catch (error) {
                // toast.error(error.message, {
                //     position: toast.POSITION.TOP_CENTER,
                //     autoClose: 5000,
                //     theme: "colored"
                // });
            } finally {
                setLoading(false)
            }
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
                        <h1>Reset Password</h1>
                        <p>Enter new password.</p>
                        <form onSubmit={resetPasswordHandler}>
                            <div className="field input-field">
                                <input type={toggleVisibility ? "text" : "password"} placeholder="Password" minLength={8} name="password" required />
                                <span className="eye-icon" onClick={() => setToggleVisibility(!toggleVisibility)}>
                                    {toggleVisibility ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}</span>
                            </div>
                            <div className="field input-field">
                                <input type={toggleVisibility ? "text" : "password"} placeholder="Confirm Password" minLength={8} className={`${checkpassword && "password-check"}`} required name="confirmpassword" />
                                {checkpassword && <p className="error"> <BiErrorCircle /> password does not match!</p>}
                            </div>
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
            {/* <ToastContainer /> */}
        </>

    )
}
