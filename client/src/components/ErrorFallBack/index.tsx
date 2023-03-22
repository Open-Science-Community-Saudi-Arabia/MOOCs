import "./style.scss";
interface ErrorFallback {
  message?: string;
  description?: string;
  reset?: () => void;
  buttonText?: string;
}

const index = (props: ErrorFallback) => {
  const { message, description, reset, buttonText = "Try again" } = props;
  return (
    <div className="errorfallback">
      {message && (
        <div className="errorfallback__top">
          {" "}
          <p className="errorfallback__top__message">{message}</p>
        </div>
      )}
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
};
export default index;
