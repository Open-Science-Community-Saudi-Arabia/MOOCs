import { useEffect, useState } from "react";
import "./style.scss";
import { useParams, useNavigate } from "react-router-dom";
import { verifyEmail } from "../../../utils/api/auth";
import { GiCheckMark } from "react-icons/gi";
import { Trans } from "@lingui/macro";
import LanguageToggle from "../../../components/LanguageToggle";
import Spinner from "../../../components/Spinner";

/**
 * @category Client
 * @subcategory Pages
 * @module Verify Email
 * @description Email Verification link from email is successful or fails.
 * @component
 * @example
   <Route path="/api/v1/auth/verifyemail/:access_token" element={<EmailVerify />} />
 */

const EmailVerify = () => {
  const [isValidUrl, setValidUrl] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<boolean>();
  const params = useParams();

  useEffect(() => {
    const emailVerifyHandler = async () => {
      setLoading(true);
      try {
        const res = await verifyEmail(params.access_token);
        if (res.message) {
          setLoading(false);
          setValidUrl(true);
        }
      } catch (error: any) {
        setLoading(false);
        setValidUrl(false);
        setError(error.message);
      }
    };
    emailVerifyHandler();
  }, []);

  const navigate = useNavigate();
  return (
    <>
      <div className="login-signup__languageToggle">
        {" "}
        <LanguageToggle />
      </div>
      {loading ? (
        <Spinner width="30px" height="30px" color="green" />
      ) : (
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
                <Trans>Go back to </Trans>{" "}
                <a href="/signup">
                  {" "}
                  <Trans>Signup </Trans>
                </a>{" "}
                <Trans>page</Trans>
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default EmailVerify;
