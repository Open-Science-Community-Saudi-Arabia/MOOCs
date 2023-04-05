import { t, Trans } from "@lingui/macro";
import "./style.scss";
interface ErrorFallback {
  message: string;
  description: string;
  reset: () => void;
}

const index = (props: ErrorFallback) => {
  const { message, description, reset } = props;
  
  return (
    <div className="errorfallback">
      <div className="errorfallback__top">
        {" "}
        <p className="errorfallback__top__message">{t`${message}`}</p>
      </div>

      <p className="errorfallback__description">{t`${description}`}</p>

      <button className="errorfallback__btn" onClick={reset}>
        <Trans>Try again</Trans>
      </button>
    </div>
  );
};
export default index;
