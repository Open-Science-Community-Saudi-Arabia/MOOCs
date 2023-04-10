import { useEffect, useState } from "react";
import "./style.scss";
import { useParams, useNavigate } from "react-router-dom";
import { verifyEmail } from "../../../utils/api/auth";
import { GiCheckMark } from "react-icons/gi";
import { Trans } from "@lingui/macro";
import LanguageToggle from "../../../components/LanguageToggle";
import verificationImage from "../../../images/verification-email-sent.jpg";

/**
 * @category Frontend
 * @subcategory Pages
 * @module VerifyEmail
 * @description Verification link.
 * @component
 * @example
   <Route path="/api/v1/auth/verifyemail/:access_token" element={<EmailVerify />} />
 */

const EmailVerify = () => {
  const [isValidUrl, setValidUrl] = useState<boolean>();
  const [error, setError] = useState<boolean>();
  const params = useParams();

  useEffect(() => {
    emailVerifyHandler();
  }, []);

  const emailVerifyHandler = async () => {
    try {
      await verifyEmail(params.access_token);
      setValidUrl(true);
    } catch (error: any) {
      setValidUrl(false);
      setError(error.message);
    }
  };
  const navigate = useNavigate();
  return (
    <>
      <div className="login-signup__languageToggle">
        {" "}
        <LanguageToggle />
      </div>

      <div className="verifyEmail">
        {isValidUrl ? (
          <div className="verifyEmail__content">
            <div className="verifyEmail__content__icon">
              {" "}
              <GiCheckMark />
            </div>
            <h1 className="verifyEmail__content__header">
              <Trans> Email Verification Successful!</Trans>
            </h1>
            <button
              onClick={() => navigate("/login")}
              className="verifyEmail__content__btn"
            >
              <Trans> Login</Trans>
            </button>
          </div>
        ) : (
          <div>
            <h1 className="verifyEmail__invalid">
              {" "}
              <Trans>{error}</Trans>
            </h1>
            <p className="verifyEmail__subtitle">
              {" "}
              Go back to <a href="/signup">Signup</a> page
            </p>
          </div>
        )}
      </div>
    </>
  );
};
export default EmailVerify;
