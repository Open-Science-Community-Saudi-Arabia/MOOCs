import { Dispatch, SetStateAction, useState } from "react";
import { Exercise, Questions } from "../../../types";
import { exerciseScore } from "../../../utils/api/courses";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner";
import { t, Trans } from "@lingui/macro";

interface IProps {
  exerciseData?: Exercise;
  quizIndex: number;
  changeQuizIndex: (quizIndex: number) => void;
  changedDisplayContent: (item: any) => void;
  changeBestScoreHandler: (bestScore: number) => void;
  changedCurrentScore: (currentScore: number) => void;
  changedOverAllScore: (overAllScore: number) => void;
  changedViewSubmit: (viewSubmit: boolean) => void;
  setSubmission: Dispatch<SetStateAction<{}>>;
  viewSubmit: boolean;
  submission: object;
  reset: () => void;
}

const Quiz = ({
  changedCurrentScore,
  exerciseData,
  quizIndex,
  changeQuizIndex,
  changedDisplayContent,
  changeBestScoreHandler,
  changedViewSubmit,
  setSubmission,
  viewSubmit,
  submission,
  changedOverAllScore,
  reset,
}: IProps) => {
  const [isLoading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>();

  const onChangeValue = (id: string, event: any, index: number) => {
    setSelectedIndex(index);
    if (exerciseData) {
      if (quizIndex + 1 === exerciseData?.questions.length) {
        changedViewSubmit(true);
      } else {
        changeQuizIndex(quizIndex + 1);
      }
    }
    setSubmission((prevState) => {
      return { ...prevState, [id]: event.target.value };
    });
  };
  const submitResult = async () => {
    if (exerciseData) {
      setLoading(true);
      try {
        let response = await exerciseScore(exerciseData?._id, { submission });
        if (response) {
          changedCurrentScore(response.data.report.percentage_passed);
          changeBestScoreHandler(response.data.report.best_percentage_passed);
          changedDisplayContent("result");
          changedOverAllScore(response.data.report.course_progress);
          // () => reset();
        }
      } catch (error: any) {
        setLoading(false);
        toast.error(error.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
          theme: "colored",
        });
      }
    }
  };
  return (
    <section className="quiz-section">
      <div className="quiz-section__heading">
        <h1 className="quiz-section__heading-title">
          <Trans> Quiz:</Trans>
          {exerciseData?.title}
        </h1>
        <p className="quiz-section__heading-subtitle">
          {" "}
          <Trans> Pick the right option.</Trans>
        </p>
      </div>
      <div className="quiz-section__container">
        {exerciseData?.questions?.map((content: Questions, index: number) => {
          return (
            quizIndex === index && (
              <>
                <div key={content._id} className="quiz-section__content">
                  <div className="quiz-section__content-question">
                    <p>
                      {" "}
                      <Trans> Question</Trans> {index + 1} of{" "}
                      {exerciseData?.questions.length}:{" "}
                    </p>
                    {content.question}?
                  </div>
                  <div className="quiz-section__content-options">
                    {content.options.map((list: string, j: number) => {
                      return (
                        <label
                          key={j}
                          onChange={(e) => onChangeValue(content._id, e, j)}
                          htmlFor={list}
                          className="quiz-section__content-options__label"
                        >
                          <input
                            type="radio"
                            id={list}
                            name="options"
                            className="quiz-section__content-options__radio-btn"
                            value={list}
                          />
                          <p className="quiz-section__content-options__letter">
                            {" "}
                            {`${String.fromCharCode(j + 65)})`}
                          </p>{" "}
                          {list}
                        </label>
                      );
                    })}
                  </div>
                </div>
                {viewSubmit && (
                  <button
                    className="quiz-section__submit-btn"
                    onClick={() => submitResult()}
                  >
                    {isLoading ? (
                      <Spinner width="30px" height="30px" color="#fff" />
                    ) : (
                      t`Submit`
                    )}
                  </button>
                )}
              </>
            )
          );
        })}
      </div>
    </section>
  );
};
export default Quiz;

// quiz heading should indication title e.g section one quiz exercise
// check for excessive network calls
