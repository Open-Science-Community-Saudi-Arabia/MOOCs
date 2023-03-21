import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./style.scss";

interface IProgressBarProps {
  score: number;
}
const ProgressBar = ({ score }: IProgressBarProps) => {
  
  return (
    <div className="progressbar">
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

export default ProgressBar;
