import React, { useState } from "react";
import "../style.scss";
import { ToastContainer, toast } from "react-toastify";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../utils/api/auth";
// import GoogleLogin from "../../../utils/api/google"
import Spinner from "../../../components/Spinner";

function Login() {
  const [toggleVisibility, setToggleVisibility] = useState(false);
  const [IsError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [loadingBoard, setLoadingBoard] = useState(false);

  const navigate = useNavigate();

  const loginHandler = async (event: any) => {
    setError(false);
    event.preventDefault();
    try {
      const formData = {
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
      {/* <div className="forms-container"> */}
      {loadingBoard ? (
        <Spinner loadingBoard={loadingBoard} />
      ) : (
        <div className="form-content">
          <h1>Login to MOOCs</h1>
          <div id="buttonDiv" />

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
      {/* </div> */}

      {/* <GoogleLogin setLoadingBoard={setLoadingBoard} /> */}
    </>
  );
}

export default Login;
