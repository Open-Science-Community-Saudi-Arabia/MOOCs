import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useMediaQuery from "../../hooks/usemediaQuery";
import "./style.scss";
import PropTypes from "prop-types";

interface ICircularBarProps {
  currentScore: number;
}
interface IProgressBarProps {
  bgcolor: string;
  progress: number;
  height: number;
  width: number;
  overallScore?: number;
}

/**
 * @category Client
 * @subcategory Component
 * @module Progress
 * @description The component handles circular and horizontal progress bar display,
 */

/**
 *
 * @component
 * @example
 *  <CircularProgressBar currentScore={currentScore} />
 * @description CircularProgressBar
 */
const CircularProgressBar = ({ currentScore }: ICircularBarProps) => {
  const isIpad = useMediaQuery("(min-width: 1024px)");
  return (
    <div className="progressbar" style={{ width: isIpad ? "200px" : "150px" }}>
      <CircularProgressbar
        value={Math.round(currentScore)}
        text={`${Math.round(currentScore)}%`}
        className="progressbar__circularbar"
        styles={buildStyles({
          rotation: 0,
          strokeLinecap: "round",
          textColor: "rgb(116, 205, 192)",
          textSize: "16px",
          pathColor:
            currentScore > 50 ? `hsl(171deg 47% 63% )` : "hsl(171deg 47% 63% )",
          trailColor: "hsl(0deg 0% 84% /50%)",
        })}
      />
    </div>
  );
};

/**
 *
 * Horizontal ProgressBar
 * @component
 * @example
 * <ProgressBar overallScore={true} width={150}  bgcolor="#6abd41" progress={Math.round(overAllScore)} height={35} />
 */
const ProgressBar = ({
  width,
  bgcolor,
  overallScore,
  progress,
  height,
}: IProgressBarProps) => {
  const Parentdiv = {
    height: height,
    width: width,
    backgroundColor: overallScore ? "#42414126" : "#56525233",
    borderRadius: 60,
  };

  const Childdiv = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: progress > 0 ? bgcolor : "",
    borderRadius: 30,
    padding: "0.5em",
  };

  const progresstext = {
    display: "flex",
    alignItems: "center",
    color: "#fff",
    fontWeight: 500,
    height: "100%",
    fontSize: "12px",
  };

  return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>{`${progress}%`}</span>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  bgcolor: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  overallScore: PropTypes.number,
};

CircularProgressBar.propTypes = {
  currentScore: PropTypes.number.isRequired,
};

export { CircularProgressBar, ProgressBar };
