import { Trans } from "@lingui/macro";
import {CircularProgressBar} from "../../../components/ProgressBar";
interface IProps {
  currentScore: number;
  selectedIndex: string;
  getexerciseData: (selectedIndex: string) => void;
}
const Result = ({ currentScore, getexerciseData, selectedIndex }: IProps) => {
  return (
    <div className="quizresult">
      <div className="quizresult__heading">
        <h1 className="quizresult__heading__title"><Trans>Quiz Result</Trans></h1>
      </div>
      <CircularProgressBar currentScore={currentScore} />
      <div className="quizresult__btns">
        <button
          onClick={() => {
            getexerciseData(selectedIndex);
          }}
          className="quizresult__btns__button"
        >
         <Trans> ReTake Quiz</Trans>
        </button>
      </div>
    </div>
  );
};
export default Result;
