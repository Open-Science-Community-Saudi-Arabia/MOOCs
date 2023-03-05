import React, { useState } from "react";
import "../style.scss";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import Spinner from "../../../components/Spinner";
import { resetpassword } from "../../../utils/api/auth";
import { ResetPasswordReqPayload } from "../../../types";

export default function ResetPassword() {
  const [isLoading, setLoading] = useState(false);

  const [toggleVisibility, setToggleVisibility] = useState(false);
  const navigate = useNavigate();

  const resetPasswordHandler = async (event: any) => {
    event.preventDefault();
    try {
      const formData: ResetPasswordReqPayload = {
        password_reset_code: event.target.resetcode.value,
        new_password: event.target.password.value,
      };
      setLoading(true);
      const response = await resetpassword(formData);
      toast.success(<p> {response.message}!</p>, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        theme: "colored",
        onClose: () => navigate("/login"),
      });
    } catch (error: any) {
      //    return error status too

      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="login-signup">
      <h1 className="login-signup__heading">Reset Password</h1>
      <p className="login-signup__text">Enter new password.</p>
      <form className="login-signup__form" onSubmit={resetPasswordHandler}>
        <div className="field">
          <label className="sr-only" htmlFor="resetcode">
            Reset Code
          </label>
          <input
            type="text"
            name="resetcode"
            id="resetcode"
            placeholder="Reset Code"
            required
          />
        </div>
        <div className="field">
          <label className="sr-only" htmlFor="password">
            Password
          </label>
          <input
            type={toggleVisibility ? "text" : "password"}
            placeholder="Password"
            minLength={8}
            name="password"
            id="password"
            required
          />
          <button
            aria-label="toggle password"
            className="icon-button eye-icon"
            onClick={() => setToggleVisibility(!toggleVisibility)}
          >
            {toggleVisibility ? (
              <MdOutlineVisibility />
            ) : (
              <MdOutlineVisibilityOff />
            )}
          </button>
        </div>

        <div className="field button-field">
          <button>
            {isLoading ? <Spinner width="30px" height="30px" /> : "Submit"}
          </button>
        </div>
      </form>
      <div className="login-signup__bottom">
        <div className="login-signup__bottom-content">
          Don't have an account?{" "}
          <Link to="/signup" className="login-signup__bottom-content__link">
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
}
