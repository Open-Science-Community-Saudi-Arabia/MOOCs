import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useMediaQuery from "../../hooks/usemediaQuery";
import "./style.scss";

interface ICircularBarProps {
  score: number;
}
interface IProgressBarProps {
  bgcolor: string;
  progress: number;
  height: number;
  width: number;
  overallScore?: boolean;
}
const CircularProgressBar = ({ score }: ICircularBarProps) => {
  const isIpad = useMediaQuery("(min-width: 1024px)");
  return (
    <div className="progressbar" style={{ width: isIpad ? "250px" : "200px" }}>
      <CircularProgressbar
        value={Math.round(score)}
        text={`${Math.round(score)}%`}
        className="progressbar__circularbar"
        styles={buildStyles({
          rotation: 0,
          strokeLinecap: "round",
          textColor: "rgb(116, 205, 192)",
          textSize: "16px",
          pathColor:
            score > 50 ? `hsl(171deg 47% 63% )` : "hsl(171deg 47% 63% )",
          trailColor: "hsl(0deg 0% 84% /50%)",
        })}
      />
    </div>
  );
};

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
    backgroundColor: overallScore ? "#333" : "#80808033",
    borderRadius: 100,
  };

  const Childdiv = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: progress > 0 ? bgcolor : "",
    borderRadius: 40,
    padding: "0.5em",
  };

  const progresstext = {
    display: "flex",
    alignItems: "center",
    color: "#000",
    fontWeight: "bolder",
    height: "100%",
    fontSize: "14px",
  };

  return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>{overallScore && `${progress}%`}</span>
      </div>
    </div>
  );
};

export { CircularProgressBar, ProgressBar };
