import { t, Trans } from "@lingui/macro";
import "./style.scss";
import PropTypes from "prop-types";

interface ErrorFallbackProps {
  message: string;
  description: string;
  reset: () => void;
}

/**
 * @category Frontend
 * @subcategory Component
 * @module Error
 * @description The Error modal pops up when there is an error fetching courses.
 * @component
 * @example
 *  <ErrorFallBack message="Something went wrong!" description="We encountered an error while fetching courses" reset={reset} />
 */

const index = (props: ErrorFallbackProps) => {
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

index.propTypes = {
  message: PropTypes.string.isRequired,

  description: PropTypes.string.isRequired,

  reset: PropTypes.func.isRequired,
};

export default index;
