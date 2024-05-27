import { Link } from "react-router-dom";
import "./style.scss";
import { Trans } from "@lingui/macro";

/**
 * @category Client
 * @subcategory Pages
 * @module PageNotFound
 * @description A Custom error page for not existing routes.
 * @component
 * @example
 * <Route path="*" element={<ErrorPage />} />
 */

const Error = () => {
  return (
    <div className="error">
      <h1 className="error__heading">
        {" "}
        <Trans> Page not found</Trans>
      </h1>
      <Link to={"/"} className="error__link">
        {" "}
        <Trans>Return to home page</Trans>
      </Link>
    </div>
  );
};
export default Error;
