import { useState } from "react";
import "../style.scss";
import { toast } from "react-toastify";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../utils/api/auth";
import Spinner from "../../../components/Spinner";
import { LoginInRequestPayload } from "../../../types";
import useFetch from "../../../hooks/useFetch";
import { useGoogleLogin } from "@react-oauth/google";
import { setToken } from "../../../utils";
import LanguageToggle from "../../../components/LanguageToggle";
import { Trans, t } from "@lingui/macro";

/**
 * @category Client App
 * @subcategory Pages
 * @module Login
 * @description Users login with email and password, including Google signup option.
 * @component
 * @example
   <Route path="/login" element={<Login />} />
 */

const Login = () => {
  const [toggleVisibility, setToggleVisibility] = useState(false);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { handleGoogle, loading } = useFetch();

  const googlelogin = useGoogleLogin({
    onSuccess: (codeResponse) => handleGoogle(codeResponse.code),
    flow: "auth-code",
  });

  const loginHandler = async (event: any) => {
    setError(false);
    event.preventDefault();
    try {
      const formData: LoginInRequestPayload = {
        email: event.target.email.value,
        password: event.target.password.value,
      };
      setLoading(true);
      let response = await login(formData);

      if (response.success) {
        setToken(response.data.access_token);

        if (response.data.user.role === "Admin") {
          navigate("/collaborator/dashboard");
        } else if (response.data.user.role === "EndUser") {
          navigate("/dashboard");
        }
      }
    } catch (error: any) {
      setError(true);
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
    <>
      {loading ? (
        <Spinner width="100px" height="100px" color="#009985" />
      ) : (
        <section className="login-signup">
          <div className="login-signup__languageToggle">
            {" "}
            <LanguageToggle />
          </div>

          <h1 className="login-signup__heading">
            <Trans>Login to MOOCs</Trans>
          </h1>
          <div className="login-signup__google">
            <button
              className="login-signup__google__login-btn"
              onClick={() => googlelogin()}
            >
              <FcGoogle />
              <Trans>Sign in with Google </Trans>
            </button>
          </div>
          <div className="login-signup__hr-line">
            {" "}
            <hr />
            <h2 className="login-signup__hr-line__or">
              {" "}
              <Trans>OR </Trans>
            </h2>
            <hr />
          </div>

          <form
            className="login-signup__form"
            onSubmit={loginHandler}
            method="POST"
          >
            <div className="field">
              <label className="sr-only" htmlFor="email">
                <Trans> Email</Trans>
              </label>
              <input
                type="email"
                name="email"
                placeholder={t`Email`}
                required
                className={`${isError && "error-input"}`}
              />
            </div>

            <div className="field">
              <label className="sr-only" htmlFor="password">
                Password
              </label>
              <input
                type={toggleVisibility ? "text" : "password"}
                placeholder={t`Password`}
                required
                name="password"
                className={`${isError && "error-input"}`}
              />
              <button
                type="button"
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
                  t`Login`
                )}
              </button>
            </div>
          </form>
          <div className="login-signup__bottom">
            <Link
              to="/forgotpassword"
              className="login-signup__bottom-forgotpassword-link "
            >
              {" "}
              <Trans>forgot password?</Trans>
            </Link>
            <div className="login-signup__bottom-content">
              <Trans>Don't have an account? </Trans>{" "}
              <Link to="/signup" className="login-signup__bottom-content__link">
                <Trans> Sign Up</Trans>
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
