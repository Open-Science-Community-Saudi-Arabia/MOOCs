import { useState } from "react";
import Result from "./Result";

interface IProps {
  quizData: any;
  displayContent: boolean;
}

const Quiz= ({ quizData, displayContent }: IProps)=> {
  console.log(quizData.questions.length);

  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<[] | any>([]);
  const [displayResult, setDisplayResult] = useState(false);

  const onChangeValue = (index: number, event: string | any) => {
    console.log(event.target.parentNode.parentNode);
    // console.log(index);

    const isAnswer = quizData.questions.every(
      (option: any) => option.correct_option === event.target.value
    );
    if (isAnswer && quizAnswers[index] === undefined) {
      quizAnswers.push(event.target.value);

      event.target.parentNode.parentNode.style.backgroundColor = "green";
    }
    // console.log(quizAnswers);
  };

  const previousQuiz = () => {
    setQuizIndex(quizIndex - 1);
  };
  const nextQuiz = () => {
    setQuizIndex(quizIndex + 1);
  };
  const quizResult = () => {
    setDisplayResult(true);
  };

  return (
    <section
      style={{ width: displayContent ? "70%" : "90%" }}
      className="quiz-section"
    >
      <div className="quiz-section__heading">
        <h1 className="quiz-section__heading-title">Quiz</h1>
        <p className="quiz-section__heading-subtitle">
          {" "}
          Pick the right option.
        </p>
      </div>
      <div className="quiz-section__container">
        {displayResult ? (
          <Result />
        ) : (
          <>
            {quizData.questions.map((content: any, index: number) => {
              return (
                <div key={content.id}>
                  {quizIndex === index && (
                    <div className="quiz-section__content">
                      <p className="quiz-section__content-question">
                        Question {index + 1}: {content.question}?
                      </p>

                      {content.options.map((list: any, j: number) => {
                        return (
                          <>
                            <div className="quiz-section__content-options">
                              <label
                                onChange={(e) => onChangeValue(index, e)}
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
                                  {`${String.fromCharCode(j + 65)}.)`}
                                </p>{" "}
                                {list}
                              </label>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="quiz-section__btn">
              {quizIndex > 0 && (
                <button
                  className="quiz-section__btn-previous"
                  onClick={() => previousQuiz()}
                >
                  Previous
                </button>
              )}
              {quizIndex + 1 === quizData.questions.length ? (
                <button
                  className="quiz-section__btn-next"
                  onClick={() => quizResult()}
                >
                  Submit
                </button>
              ) : (
                <button
                  className="quiz-section__btn-next"
                  onClick={() => nextQuiz()}
                >
                  Next
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
export default Quiz