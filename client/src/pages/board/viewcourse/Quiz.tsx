import { Exercise, Questions } from "../../../types";

interface IProps {
  exerciseData?: Exercise;
  isCourseContent: boolean;
  quizIndex: number;
  changeQuizIndex: (quizIndex: number) => void;
  changedDisplayContent: (item: any) => void;
  quizAnswers: string[];
}

const Quiz = ({
  exerciseData,
  isCourseContent,
  quizIndex,
  changeQuizIndex,
  changedDisplayContent,
  quizAnswers,
}: IProps) => {
  const onChangeValue = (id: string, index: number, event: any) => {
    // console.log(exerciseData);
    const isAnswer = exerciseData?.questions.some(
      (option: Questions) => option.correct_option === event.target.value
    );

    if (isAnswer && quizAnswers[index] === undefined) {
      quizAnswers.push(event.target.value);
    }

    // call endpoints to show result
    if (exerciseData) {
      if (quizIndex + 1 === exerciseData?.questions.length) {
        changedDisplayContent("result");
      } else {
        changeQuizIndex(quizIndex + 1);
      }
    }
  };

  console.log(quizAnswers);

  return (
    <section className="quiz-section">
      <div className="quiz-section__heading">
        <h1 className="quiz-section__heading-title">Quiz</h1>
        <p className="quiz-section__heading-subtitle">
          {" "}
          Pick the right option.
        </p>
      </div>
      <div className="quiz-section__container">
        {exerciseData?.questions?.map((content: Questions, index: number) => {
          return (
            quizIndex === index && (
              <div key={content._id} className="quiz-section__content">
                <p className="quiz-section__content-question">
                  <p>
                    {" "}
                    Question {index + 1} of {exerciseData?.questions.length}:{" "}
                  </p>
                  {content.question}?
                </p>
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
