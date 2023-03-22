import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useMediaQuery from "../../hooks/usemediaQuery";
import "./style.scss";

interface IProgressBarProps {
  score: number;
}
const ProgressBar = ({ score }: IProgressBarProps) => {
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

export default ProgressBar;
