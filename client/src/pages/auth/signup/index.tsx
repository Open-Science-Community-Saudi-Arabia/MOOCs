import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import { BiErrorCircle } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import { signUp } from "../../../utils/api/auth";
import Spinner from "../../../components/Spinner";
import { SignUpRequestPayload } from "../../../types";
import useFetch from "../../../hooks/useFetch";
import { GoogleLogin } from "@react-oauth/google";

function Signup() {
  const [checkpassword, setCheckPassword] = useState(false);
  const [toggleVisibility, setToggleVisibility] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { handleGoogle, loading } = useFetch();

  const signupHandler = async (event: any) => {
    setCheckPassword(false);
    event.preventDefault();

    if (event.target.password.value !== event.target.confirmpassword.value) {
      setCheckPassword(true);
    } else {
      try {
        const formData: SignUpRequestPayload = {
          firstname: event.target.firstname.value,
          lastname: event.target.lastname.value,
          email: event.target.email.value,
          password: event.target.password.value,
          passwordConfirm: event.target.confirmpassword.value,
        };
        setLoading(true);
        await signUp(formData);
        toast.success("Sucessful!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          theme: "colored",
        });
        navigate("/dashboard");
      } catch (error: any) {
        toast.error(error.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
          theme: "colored",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div className="form-content">
          <h1>Sign Up to MOOCs</h1>

          <div className="loginDiv">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                handleGoogle(credentialResponse);
              }}
              onError={() => {
                toast.error("login failed", {
                  position: toast.POSITION.TOP_CENTER,
                  autoClose: 5000,
                  theme: "colored",
                });
              }}
            />{" "}
          </div>
          <p className="or">OR</p>

          <form onSubmit={signupHandler} method="POST">
            <div className="name-input">
              <div className="field input-field">
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstname"
                  required
                />
              </div>
              <div className="field input-field">
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastname"
                  required
                />
              </div>
            </div>

            <div className="field input-field">
              <input type="email" placeholder="Email" name="email" required />
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
            <div className="field input-field">
              <input
                type={toggleVisibility ? "text" : "password"}
                placeholder="Confirm Password"
                minLength={8}
                className={`${checkpassword && "password-check"}`}
                required
                name="confirmpassword"
              />
              {checkpassword && (
                <p className="error">
                  {" "}
                  <BiErrorCircle /> password does not match!
                </p>
              )}
            </div>
            <div className="field button-field">
              <button>{isLoading ? <Spinner /> : "Sign Up"}</button>
            </div>
          </form>
          <div className="form-bottom">
            <div className="form-link">
              Already have an Account?
              <Link to="/login" className="link signup-link">
                &nbsp; Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Signup;
