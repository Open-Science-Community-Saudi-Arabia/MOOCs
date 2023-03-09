import { useEffect, useState } from "react";
import "./style.scss";
import { useParams, useNavigate } from "react-router-dom";
import { verifyEmail } from "../../../utils/api/auth";
import { GiCheckMark } from "react-icons/gi";
import { setToken } from "../../../utils";

export default function index() {
  const [isValidUrl, setValidUrl] = useState(false);
  const [error, setError] = useState(false);
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
    <div className="verifyEmail">
      {isValidUrl ? (
        <div className="verifyEmail__content">
          <div className="verifyEmail__content__icon">
            {" "}
            <GiCheckMark />
          </div>
          <h1 className="verifyEmail__content__header">
            Email Verification Successful!
          </h1>
          <button
            onClick={() => navigate("/login")}
            className="verifyEmail__content__btn"
          >
            Login
          </button>
        </div>
      ) : (
        <div>
          <h1 className="verifyEmail__invalid"> {error}</h1>
        </div>
      )}
    </div>
  );
}
