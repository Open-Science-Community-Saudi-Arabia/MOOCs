import { useState } from "react";
import "../style.scss";
import { toast } from "react-toastify";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { loginAdmin} from "../../../utils/api/auth";
import Spinner from "../../../components/Spinner";
import { LoginInRequestPayload } from "../../../types";
import { setToken } from "../../../utils";
import LanguageToggle from "../../../components/LanguageToggle";
import { Trans, t } from "@lingui/macro";

/**
 * @category Client
 * @subcategory Pages
 * @module Admin Login
 * @description Admin login with email and password.
 * @component
 * @example
   <Route path="admin/login" element={<AdminLogin />} />
 */

const Login = () => {
  const [toggleVisibility, setToggleVisibility] = useState(false);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginHandler = async (event: any) => {
    setError(false);
    event.preventDefault();
    try {
      const formData: LoginInRequestPayload = {
        email: event.target.email.value,
        password: event.target.password.value,
      };
      setLoading(true);
      let response = await loginAdmin(formData);
      if (response.success) {
        setToken(response.data.access_token);
        if (response.data.user.role === "SuperAdmin") {
          navigate("/admin/dashboard");
        } else {
          toast.error("Unauthorized", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
            theme: "colored",
          });
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
      <section className="login-signup">
        <div className="login-signup__languageToggle">
          {" "}
          <LanguageToggle />
        </div>

        <h1 className="login-signup__heading">
          <Trans>Login As Admin</Trans>
        </h1>

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
      </section>
    </>
  );
};

export default Login;
