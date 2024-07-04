import { useState } from "react";
import { Resources } from "../../../types";
import { exerciseScore } from "../../../utils/api/courses";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner";
import { t, Trans } from "@lingui/macro";
import { CircularProgressBar } from "../../../components/ProgressBar";

interface IProps {

  displayContent: Resources;
  courseId: string;
  updateQuizScorehandler: (data: any) => void;
}

const ExerciseQuiz = ({
  displayContent,
  courseId,
  updateQuizScorehandler,
}: IProps) => {
  const [isLoading, setLoading] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [displayScore, setDisplayScore] = useState<Number | null>(null);
  const [isSubmit, setSubmit] = useState<boolean>(false);
  const locale = localStorage.getItem("language") || "en";
  const [quizAnswers, setQuizAnswers] = useState<
    {
      answer: string;
      _id: string;
    }[]
  >([]);

  const onChangeValue = (id: string, selectedAnswer: string) => {
    setQuizAnswers([...quizAnswers, { _id: id, answer: selectedAnswer }]);
    if (quizIndex === displayContent.quiz.length - 1) {
      setSubmit(true);
      return;
    } else {
      setQuizIndex(quizIndex + 1);
    }
  };

  const submitResult = async () => {
    setLoading(true);
    try {
      let response = await exerciseScore(courseId, {
        resourceId: displayContent._id,
        quizAnswers: quizAnswers,
      });

      setDisplayScore(response.score.currentScore);
      updateQuizScorehandler(response.score.quizScore);
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  const tryAgainhandler = () => {
    setQuizIndex(0),
      setDisplayScore(null),
      setSubmit(false),
      setQuizAnswers([]);
  };

  return (
    <section className="quiz-section">
      <div className="quiz-section__heading">
        <h1 className="quiz-section__heading-title">
          <Trans> Quiz : </Trans>{" "}
          {locale === "en" ? displayContent?.title : displayContent?.title_tr}
        </h1>
      </div>
      {displayScore === null ? (
        <div className="quiz-section__container">
          <p className="quiz-section__heading-subtitle">
            {" "}
            <Trans> Pick the right option.</Trans>
          </p>
          <div className="quiz-section__content">
            <div className="quiz-section__content-question">
              <p>
                {" "}
                <Trans> Question</Trans> {quizIndex + 1} of{" "}
                {displayContent?.quiz.length}
              </p>
              {locale === "en"
                ? displayContent?.quiz[quizIndex].question
                : displayContent?.quiz[quizIndex].question_tr}{" "}
              ?
            </div>
            <div className="quiz-section__content-options">
              {displayContent?.quiz[quizIndex].options.map(
                (list: { name: string; name_tr: string }, j: number) => {
                  return (
                    <label
                      key={list.name}
                      htmlFor={list.name}
                      className={`${
                        isSubmit
                          ? `${
                              quizAnswers[quizIndex]?.answer === list.name
                                ? "bg-primary/40"
                                : " bg-[#e7eef1]"
                            } cursor-not-allowed`
                          : "hover:bg-primary/40 hover:text-white"
                      } bg-[#e7eef1] quiz-section__content-options__label`}
                    >
                      <input
                        disabled={isSubmit}
                        type="radio"
                        id={list.name}
                        name="options"
                        checked={false}
                        onChange={(e) =>
                          onChangeValue(
                            displayContent?.quiz[quizIndex]._id,
                            e.target.value
                          )
                        }
                        className="quiz-section__content-options__radio-btn"
                        value={list.name}
                      />
                      {locale === "en" ? list.name : list.name_tr}
                    </label>
                  );
                }
              )}
            </div>
          </div>
          {isSubmit && (
            <button
              className="quiz-section__submit-btn h-12"
              onClick={() => submitResult()}
            >
              {isLoading ? (
                <Spinner width="30px" height="30px" color="#fff" />
              ) : (
                t`Submit`
              )}
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h2 className="font-medium">
            {" "}
            <Trans>Quiz Result</Trans>
          </h2>
          <CircularProgressBar currentScore={Number(displayScore)} />

          <div className="mt-6 text-sm">
            <button
              onClick={() => {
                tryAgainhandler();
              }}
              className="bg-primary py-2 px-4 rounded-md text-white font-medium"
            >
              <Trans> ReTake Quiz</Trans>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
export default ExerciseQuiz;
