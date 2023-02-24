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
import { useGoogleLogin } from "@react-oauth/google";

function Login() {
  const [toggleVisibility, setToggleVisibility] = useState(false);
  const [IsError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { handleGoogle, loading } = useFetch();

  const googlelogin = useGoogleLogin({
   
    onSuccess: (tokenResponse) => handleGoogle(tokenResponse),
    onError: () =>
      toast.error("login failed", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        theme: "colored",
      }),
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
      await login(formData);
      navigate("/dashboard");
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
        <Spinner loading={loading} />
      ) : (
        <div className="form-content">
          <h1>Login to MOOCs</h1>
          <div className="loginDiv">
            <div className="login-btn" onClick={() => googlelogin()}>
              Sign in with Google <FcGoogle />
            </div>
          </div>
          <div className="hr-line">
            {" "}
            <hr/>
            <span className="or">OR</span>
            <hr/>
          </div>

          <form onSubmit={loginHandler} method="POST">
            <div className="field input-field">
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className={`${IsError && "error-input"}`}
              />
            </div>

            <div className="field input-field">
              <input
                type={toggleVisibility ? "text" : "password"}
                placeholder="Password"
                required
                name="password"
                className={`${IsError && "error-input"}`}
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
              <button>{isLoading ? <Spinner /> : "Login"}</button>
            </div>
          </form>
          <div className="form-bottom">
            <Link to="/forgotpassword" className="forgotpassword-link ">
              {" "}
              forgot password?
            </Link>
            <div className="form-link">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
