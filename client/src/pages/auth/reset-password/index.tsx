import  { useState } from "react";
import "../style.scss";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import Spinner from "../../../components/Spinner";
import { resetpassword } from "../../../utils/api/auth";
import { ResetPasswordReqPayload } from "../../../types";
import { Trans, t } from "@lingui/macro";
import LanguageToggle from "../../../components/LanguageToggle";

const ResetPassword = () => {
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
      toast.success(<p> {response.data.message}!</p>, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        theme: "colored",
        onClose: () => navigate("/login"),
      });
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
        <Trans>Reset Password</Trans>
      </h1>
      <p className="login-signup__text">
        <Trans>Enter new password.</Trans>
      </p>
      <form className="login-signup__form" onSubmit={resetPasswordHandler}>
        <div className="field">
          <label className="sr-only" htmlFor="resetcode">
            <Trans> Reset Code</Trans>
          </label>
          <input
            type="text"
            name="resetcode"
            id="resetcode"
            placeholder={t`Reset Code`}
            required
          />
        </div>
        <div className="field">
          <label className="sr-only" htmlFor="password">
            <Trans>Password</Trans>
          </label>
          <input
            type={toggleVisibility ? "text" : "password"}
            placeholder={t`Password`}
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
          <Trans>Don't have an account? </Trans>
          <Link to="/signup" className="login-signup__bottom-content__link">
            <Trans> Sign Up</Trans>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default ResetPassword;
