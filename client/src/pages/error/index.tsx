import { Link } from "react-router-dom";
import "./style.scss";

export default function index() {
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
