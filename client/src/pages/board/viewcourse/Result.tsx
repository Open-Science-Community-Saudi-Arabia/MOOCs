import ProgressBar from "../../../components/ProgressBar";
interface IProps {
  score: number | any;
  selectedIndex: string;
  getexerciseData: (selectedIndex: string) => void;
}
const Result = ({ score, getexerciseData, selectedIndex }: IProps) => {
  return (
    <div className="quizresult">
      <div className="quizresult__heading">
        <h1 className="quizresult__heading__title">Quiz Result</h1>
      </div>
      <ProgressBar score={score} />
      <div className="quizresult__btns">
        <button
          onClick={() => {
            getexerciseData(selectedIndex);
          }}
          className="quizresult__btns__button"
        >
          ReTake Quiz
        </button>
      </div>
    </div>
  );
};
export default Result;
