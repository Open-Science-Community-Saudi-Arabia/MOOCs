import { toast } from "react-toastify";
import ProgressBar from "../../../components/ProgressBar";
import { updateExercise } from "../../../utils/api/courses";
interface IProps {
  score: number | any;
  selectedIndex: string;
  getexerciseData: (selectedIndex: string) => void;
}
const Result = ({ score, getexerciseData, selectedIndex }: IProps) => {
  const updateHandler = async () => {
    try {
      const updatedItem = {
        isCompleted: true,
      };
      let response = await updateExercise(selectedIndex, updatedItem);
      if (response.success) {
        console.log(response);
      }
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        theme: "colored",
      });
    }
  };

  return (
    <div className="quizresult">
      <div className="quizresult__heading">
        <h1 className="quizresult__heading__title">Quiz Result</h1>
        <p className="quizresult__heading__subtitle">
          {" "}
          You need upto 80% result to complete quiz
        </p>
      </div>

      <ProgressBar score={score} />
      <div className="quizresult__btns">
        {score > 80 ? (
          <div className="quizresult__btns__completed">
            <p className="quizresult__btns__completed-text">Quiz completed</p>
            <button
              onClick={() => updateHandler()}
              className="quizresult__btns__button"
            >
              Continue
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              getexerciseData(selectedIndex);
            }}
            className="quizresult__btns__button"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};
export default Result;
