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
      const formData:ResetPasswordReqPayload = {
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
    <div className="form-content">
      <h1>Reset Password</h1>
      <p>Enter new password.</p>
      <form onSubmit={resetPasswordHandler}>
        <div className="field input-field">
          <input
            type="text"
            name="resetcode"
            placeholder="Reset Code"
            required
          />
        </div>
        <div className="field input-field">
          <input
            type={toggleVisibility ? "text" : "password"}
            placeholder="Password"
            minLength={8}
            name="password"
            required
          />
          <span
            className="eye-icon"
            onClick={() => setToggleVisibility(!toggleVisibility)}
          >
            {toggleVisibility ? (
              <MdOutlineVisibility />
            ) : (
              <MdOutlineVisibilityOff />
            )}
          </span>
        </div>

        <div className="field button-field">
          <button>{isLoading ? <Spinner /> : "Submit"}</button>
        </div>
      </form>
      <div className="form-bottom">
        <div className="form-link">
          Don't have an account?{" "}
          <Link to="/signup" className="link signup-link">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
