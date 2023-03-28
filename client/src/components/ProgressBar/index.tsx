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
  coursebar?: boolean;
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
  bgcolor,
  coursebar,
  progress,
  height,
  width,
}: IProgressBarProps) => {
  const Parentdiv = {
    height: height,
    width: width,
    backgroundColor: "#333",
    borderRadius: 100,
  };

  const Childdiv = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: bgcolor,
    borderRadius: 100,
  };

  const progresstext = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#000",
    fontWeight: "bolder",
    height: "100%",
  };

  return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
     
          <span style={progresstext}>{!coursebar &&`${progress}%`}</span>
       
      </div>
    </div>
  );
};

export { CircularProgressBar, ProgressBar };
