import { useState } from "react";
import { toast } from "react-toastify";
import { Exercise, Questions } from "../../../types";
import { exerciseScore } from "../../../utils/api/courses";

interface IProps {
  exerciseData?: Exercise;
  quizIndex: number;
  changeQuizIndex: (quizIndex: number) => void;
  changedDisplayContent: (item: any) => void;
  changeScoreHandler: (item: number) => void;
}

const Quiz = ({
  exerciseData,
  quizIndex,
  changeQuizIndex,
  changedDisplayContent,
  changeScoreHandler,
}: IProps) => {
  const [submission, setSubmission] = useState({});
  let viewSubmit = true;
  const onChangeValue = (id: string, index: number, event: any) => {
    if (exerciseData) {
      if (quizIndex + 1 === exerciseData?.questions.length) {
        viewSubmit = false;
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
      try {
        let response = await exerciseScore(exerciseData?._id, { submission });
        if (response) {
          console.log(response);
          changeScoreHandler(response.data.report.score);
          changedDisplayContent("result");
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  };
  return (
    <section className="quiz-section">
      <div className="quiz-section__heading">
        <h1 className="quiz-section__heading-title">Quiz:{exerciseData?.title}</h1>
        <p className="quiz-section__heading-subtitle">
          {" "}
          Pick the right option.
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
                      Question {index + 1} of {exerciseData?.questions.length}:{" "}
                    </p>
                    {content.question}?
                  </div>
                  <div className="quiz-section__content-options">
                    {content.options.map((list: string, j: number) => {
                      return (
                        <label
                          key={j}
                          onChange={(e) => onChangeValue(content._id, index, e)}
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
                {index + 1 == exerciseData?.questions.length && (
                  <button
                    className="quiz-section__submit-btn"
                    onClick={() => submitResult()}
                  >
                    Submit
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
