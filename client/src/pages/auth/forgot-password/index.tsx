import { useState } from "react";
import "../style.scss";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { setToken } from "../../../utils";
import Spinner from "../../../components/Spinner";
import { forgotpassword } from "../../../utils/api/auth";
import { ForgetPasswordReqPayload } from "../../../types";
import LanguageToggle from "../../../components/LanguageToggle";
import { t, Trans } from "@lingui/macro";

/**
 * @category Client
 * @subcategory Pages
 * @module Forgot Password
 * @description Users can retrieve forgotten password using their email.
 * @component
 * @example
   <Route path="/forgotpassword" element={<ForgotPassword />} />
 */

const ForgotPassword = () => {
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
      if (response.data.message) {
        setToken(response.data.access_token);
        toast.success(<p> {response.data.message}!</p>, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          theme: "colored",
          onClose: () => navigate("/resetpassword"),
        });
      }
    } catch (error: any) {
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
      <div className="login-signup__languageToggle">
        {" "}
        <LanguageToggle />
      </div>

      <h1 className="login-signup__heading">
        <Trans>Forgot Password</Trans>
      </h1>
      <p className="login-signup__text">
        <Trans> Enter the email associated with your account.</Trans>
      </p>
      <form className="login-signup__form" onSubmit={forgotPasswordHandler}>
        <div className="field">
          <label className="sr-only" htmlFor="email">
            <Trans> Email</Trans>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder={t`Email`}
            required
          />
        </div>
        <div className="field button-field">
          <button>
            {isLoading ? (
              <Spinner width="30px" height="30px" color="#fff" />
            ) : (
              t`Submit`
            )}
          </button>
        </div>
      </form>
      <div className="login-signup__bottom">
        <div className="login-signup__bottom-content">
          <Trans> Don't have an account?</Trans>{" "}
          <Link to="/signup" className="login-signup__bottom-content__link">
            <Trans> Sign Up</Trans>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
