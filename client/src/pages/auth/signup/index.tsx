import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import { BiErrorCircle } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import { signUp } from "../../../utils/api/auth";
import Spinner from "../../../components/Spinner";
import { SignUpRequestPayload } from "../../../types";
import useFetch from "../../../hooks/useFetch";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

function Signup() {
  const [checkpassword, setCheckPassword] = useState(false);
  const [toggleVisibility, setToggleVisibility] = useState(false);
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
        <Spinner width="30" height="30" />
      ) : (
        <section className="login-signup">
          <h1 className="login-signup__heading">Sign Up to MOOCs</h1>
          <div className="login-signup__google">
            <button
              className="login-signup__google__login-btn"
              onClick={() => googlelogin()}
            >
              Sign in with Google <FcGoogle />
            </button>
          </div>
          <div className="login-signup__hr-line">
            {" "}
            <hr />
            <h2 className="login-signup__hr-line__or">OR</h2>
            <hr />
          </div>

          <form
            className="login-signup__form"
            onSubmit={signupHandler}
            method="POST"
          >
            <div className="login-signup__form-namefield">
              <div className="field">
                <label className="sr-only" htmlFor="firstname">
                  Firstname
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstname"
                  id="firstname"
                  required
                />
              </div>
              <div className="field">
                <label className="sr-only" htmlFor="lastname">
                  lastname
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastname"
                  required
                  id="lastname"
                />
              </div>
            </div>

            <div className="field">
              <label className="sr-only" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                id="email"
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
            <div className="field">
              <label className="sr-only" htmlFor="confirmpassword">
                Confirm password
              </label>
              <input
                type={toggleVisibility ? "text" : "password"}
                placeholder="Confirm Password"
                minLength={8}
                className={`${checkpassword && "password-check"}`}
                required
                name="confirmpassword"
                id="confirmpassword"
              />
              {checkpassword && (
                <p className="error">
                  {" "}
                  <BiErrorCircle /> password does not match!
                </p>
              )}
            </div>
            <div className="field button-field">
              <button>
                {isLoading ? <Spinner width="30" height="30" /> : "Sign Up"}
              </button>
            </div>
          </form>
          <div className="login-signup__bottom">
            <div className="login-signup__bottom-content">
              Already have an Account?
              <Link to="/login" className="login-signup__bottom-content__link">
                &nbsp; Login
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Signup;
