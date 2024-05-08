import { useState } from "react";
import { Quiz, Resources } from "../../../types";
import { exerciseScore } from "../../../utils/api/courses";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner";
import { t, Trans } from "@lingui/macro";
import { CircularProgressBar } from "../../../components/ProgressBar";

interface IProps {
  getOverAllScore: (courseId: string) => void;
  displayContent: Resources;
  courseId: string;
  updateQuizScorehandler: (data: any) => void;
}

const ExerciseQuiz = ({
  displayContent,
  courseId,
  getOverAllScore,
  updateQuizScorehandler,
}: IProps) => {
  const [isLoading, setLoading] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [displayScore, setDisplayScore] = useState("");
  const locale = localStorage.getItem("language") || "en";
  const userId: string | any = localStorage.getItem("MOOCS_WEB_APP_USERID");
  const [quizAnswers, setQuizAnswers] = useState<{}[]>([]);

  const onChangeValue = (id: string, selectedAnswer: string) => {
    console.log(selectedAnswer);
    setQuizIndex(quizIndex + 1);
    setQuizAnswers([...quizAnswers, { _id: id, answer: selectedAnswer }]);
  };

  const submitResult = async () => {
    setLoading(true);
    try {
      let response = await exerciseScore(courseId, userId, {
        resourceId: displayContent._id,
        quizAnswers: quizAnswers,
      });

      setDisplayScore(response.score.currentScore);
      getOverAllScore(courseId);
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
    setQuizIndex(0), setDisplayScore(""), setQuizAnswers([]);
  };

  const acceptAndContinue = () => {
    setLoading(true);

    try {
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

  return (
    <section className="quiz-section">
      <div className="quiz-section__heading">
        <h1 className="quiz-section__heading-title">
          <Trans> Quiz : </Trans>{" "}
          {locale === "en" ? displayContent?.title : displayContent?.title_tr}
        </h1>
      </div>
      {quizIndex < displayContent.quiz.length ? (
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
              {(locale === "en"
                ? displayContent?.quiz[quizIndex].options
                : displayContent?.quiz[quizIndex].options_tr
              ).map((list: { name: string }, j: number) => {
                return (
                  <label
                    key={list.name}
                    htmlFor={list.name}
                    className="bg-[#e7eef1] hover:bg-primary/40 hover:text-white quiz-section__content-options__label"
                  >
                    <input
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
                      // className="quiz-section__content-options__radio-btn"
                      value={list.name}
                    />
                    {list.name}
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      ) : displayScore !== "" ? (
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
            <button
              onClick={() => acceptAndContinue()}
              className="bg-primary py-2 px-4 rounded-md ml-6 text-white font-medium"
            >
              Continue
            </button>
          </div>
        </div>
      ) : (
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
    </section>
  );
};
export default ExerciseQuiz;
