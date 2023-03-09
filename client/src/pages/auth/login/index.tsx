import { useState } from "react";
import "../style.scss";
import { ToastContainer, toast } from "react-toastify";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../utils/api/auth";
import Spinner from "../../../components/Spinner";
import { LoginInRequestPayload } from "../../../types";
import useFetch from "../../../hooks/useFetch";
import { useGoogleLogin,GoogleLogin } from "@react-oauth/google";
import { setToken } from "../../../utils";

function Login() {
  const [toggleVisibility, setToggleVisibility] = useState(false);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { handleGoogle, loading } = useFetch();

  const googlelogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
        handleGoogle(tokenResponse.code);
    },
    flow: 'auth-code',
  });

  // <GoogleLogin
  //     onSuccess={(credentialResponse) => {
  //       handleGoogle(credentialResponse.credential)
  //     }}
  //     onError={() => {
  //       console.log("Login Failed");
  //     }}
  //   />
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
        navigate("/dashboard");
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
        <Spinner width="100px" height="100px" color />
      ) : (
        <section className="login-signup">
          <h1 className="login-signup__heading">Login to MOOCs</h1>
          <div className="login-signup__google">
            <button
              className="login-signup__google__login-btn"
              onClick={() => googlelogin()}
            >
              Sign in with Google <FcGoogle />
            </button>
            {/* <GoogleLogin
              onSuccess={(credentialResponse: any) => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            /> */}
          </div>
          <div className="login-signup__hr-line">
            {" "}
            <hr />
            <h2 className="login-signup__hr-line__or">OR</h2>
            <hr />
          </div>

          <form
            className="login-signup__form"
            onSubmit={loginHandler}
            method="POST"
          >
            <div className="field">
              <label className="sr-only" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
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
                placeholder="Password"
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
                {isLoading ? <Spinner width="30px" height="30px" /> : "Login"}
              </button>
            </div>
          </form>
          <div className="login-signup__bottom">
            <Link
              to="/forgotpassword"
              className="login-signup__bottom-forgotpassword-link "
            >
              {" "}
              forgot password?
            </Link>
            <div className="login-signup__bottom-content">
              Don't have an account?{" "}
              <Link to="/signup" className="login-signup__bottom-content__link">
                Sign Up
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Login;

// https://github.com/MomenSherif/react-oauth/issues/6#issuecomment-1127385886
// https://github.com/MomenSherif/react-oauth/issues/12#issuecomment-1131408898
// https://stackoverflow.com/questions/72206576/login-with-google-how-to-programmatically-open-prompt-for-user-consent-and-get