import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { signUp } from "../../../utils/api/auth";
import Spinner from "../../../components/Spinner";
import { SignUpRequestPayload } from "../../../types";
import useFetch from "../../../hooks/useFetch";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import LanguageToggle from "../../../components/LanguageToggle";
import { t, Trans } from "@lingui/macro";
import VerificationLink from "../verification-link";


/**
 * @category Client App
 * @subcategory Pages
 * @module Signup
 * @description Users sign up with name,email and password, including Google signup option.
 * @component
 * @example
 <Route path="/signup" element={<Signup />} />
 */


const Signup = () => {
  const [checkpassword, setCheckPassword] = useState(false);
  const [isSendVerifyLink, setVerifyLink] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [toggleVisibility, setToggleVisibility] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { handleGoogle, loading } = useFetch();

  const googlelogin = useGoogleLogin({
    onSuccess: (codeResponse) => handleGoogle(codeResponse.code),
    flow: "auth-code",
  });

  const signupHandler = async (event: any) => {
    setCheckPassword(false);
    event.preventDefault();
    if (event.target.password.value !== event.target.confirmpassword.value) {
      setCheckPassword(true);
      toast.error("password does not match", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        theme: "colored",
      });
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
        const response = await signUp(formData);
        if (response.success) {
          setVerifyLink(true);
          setEmail(event.target.email.value);
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
    }
  };

  return (
    <>
      {isSendVerifyLink ? (
        <VerificationLink emailLink={email} />
      ) : loading ? (
        <Spinner width="100px" height="100px" color="#009985" />
      ) : (
        <section className="login-signup">
          <div className="login-signup__languageToggle">
            {" "}
            <LanguageToggle />
          </div>

          <h1 className="login-signup__heading">
            <Trans>Sign Up to MOOCs</Trans>
          </h1>
          {/* <div className="login-signup__google">
            <button
              className="login-signup__google__login-btn"
              onClick={() => googlelogin()}
            >
              <Trans> Sign in with Google</Trans> <FcGoogle />
            </button>
          </div> */}
          {/* <div className="login-signup__hr-line">
            {" "}
            <hr />
            <h2 className="login-signup__hr-line__or">
              <Trans>OR</Trans>
            </h2>
            <hr />
          </div> */}

          <form
            className="login-signup__form"
            onSubmit={signupHandler}
            method="POST"
          >
            <div className="login-signup__form-namefield">
              <div className="field">
                <label className="sr-only" htmlFor="firstname">
                  <Trans> Firstname</Trans>
                </label>
                <input
                  type="text"
                  placeholder={t`First Name`}
                  name="firstname"
                  id="firstname"
                  required
                />
              </div>
              <div className="field">
                <label className="sr-only" htmlFor="lastname">
                  <Trans> Lastname</Trans>
                </label>
                <input
                  type="text"
                  placeholder={t`Last Name`}
                  name="lastname"
                  required
                  id="lastname"
                />
              </div>
            </div>

            <div className="field">
              <label className="sr-only" htmlFor="email">
                <Trans>Email</Trans>
              </label>
              <input
                type="email"
                placeholder={t`Email`}
                name="email"
                id="email"
                required
              />
            </div>
            <div className="field">
              <label className="sr-only" htmlFor="password">
                <Trans> Password</Trans>
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
            <div className="field">
              <label className="sr-only" htmlFor="confirmpassword">
                <Trans> Confirm password</Trans>
              </label>
              <input
                type={toggleVisibility ? "text" : "password"}
                placeholder={t`Confirm Password`}
                minLength={8}
                className={`${checkpassword && "password-check"}`}
                required
                name="confirmpassword"
                id="confirmpassword"
              />
            </div>
            <div className="field button-field">
              <button>
                {isLoading ? (
                  <Spinner width="30px" height="30px" color="#fff" />
                ) : (
                  t`Sign Up`
                )}
              </button>
            </div>
          </form>
          <div className="login-signup__bottom">
            <div className="login-signup__bottom-content">
              <Trans> Already have an Account?</Trans>
              <Link to="/login" className="login-signup__bottom-content__link">
                &nbsp; <Trans>Login</Trans>
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Signup;
