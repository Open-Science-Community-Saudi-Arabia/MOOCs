import { Link } from "react-router-dom";
import "./style.scss";

/**
 * @category Client
 * @subcategory Pages
 * @module PageNotFound
 * @description A Custom error page for not existing routes.
 * @component
 * @example
 * <Route path="*" element={<ErrorPage />} />
 */

 const Error=() =>{
  return (
    <div className="error">
      <h1 className="error__heading">Page not found</h1>
      <Link to={"/"} className="error__link">
        {" "}
        Return to home page
      </Link>
    </div>
  );
}
export default Error