import React, { useState } from "react";
import "../style.scss";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { setToken } from "../../../utils";
import Spinner from "../../../components/Spinner";
import { forgotpassword } from "../../../utils/api/auth";
import { ForgetPasswordReqPayload } from "../../../types";

export default function ForgotPassword() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const forgotPasswordHandler = async (event: any) => {
    event.preventDefault();
    try {
      const formData: ForgetPasswordReqPayload = {
        email: event.target.email.value,
      };
      setLoading(true);
      const response = await forgotpassword(formData);
      setToken(response.access_token);
      toast.success(<p> {response.message}!</p>, {
        // message should be " link sent to email not token"
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        theme: "colored",
        onClose: () => navigate("/resetpassword"),
      });
    } catch (error: any) {
      // error when not existing password used
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
      <h1 className="login-signup__heading">Forgot Password</h1>
      <p className="login-signup__text">
        Enter the email associated with your account.
      </p>
      <form className="login-signup__form" onSubmit={forgotPasswordHandler}>
        <div className="field">
          <label className="sr-only" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
          />
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
