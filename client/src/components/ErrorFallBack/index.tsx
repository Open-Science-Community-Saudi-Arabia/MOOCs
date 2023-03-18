import "./style.scss";
import { IoMdClose } from "react-icons/io";
interface ErrorFallback {
  message?: string;
  description?: string;
  reset?: () => void;
  buttonText?: string;
}

const index=(props: ErrorFallback)=> {
  const { message, description, reset, buttonText = "Try again" } = props;
  return (
    <div className="errorfallback">
      <IoMdClose className="errorfallback__icon" />
      {message && <p className="errorfallback__message">{message}</p>}
      {description && (
        <p className="errorfallback__description">{description}</p>
      )}
      {reset && (
        <button className="errorfallback__btn" onClick={reset}>
          {buttonText}
        </button>
      )}
    </div>
  );
}
export default index