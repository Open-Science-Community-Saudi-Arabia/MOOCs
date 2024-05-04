import { Dispatch, SetStateAction, useState } from "react";
import { Quiz, Resources } from "../../../types";
import { exerciseScore } from "../../../utils/api/courses";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner";
import { t, Trans } from "@lingui/macro";

interface IProps {
  displayContent: Resources;
  courseId: string;
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

const ExerciseQuiz = ({
  changedCurrentScore,
  displayContent,
  courseId,
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
  const [quizIndex, setQuizIndex] = useState(0);
  const [displayScore, setDisplayScore] = useState("");
  const locale = localStorage.getItem("language") || "en";
  const userId: string | any = localStorage.getItem("MOOCS_WEB_APP_USERID");
  const [quizAnswers, setQuizAnswers] = useState<{}[]>([]);

  const onChangeValue = (id: string, selectedAnswer: string) => {
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
      setDisplayScore(response.score);
      // if (response) {
      //   changedCurrentScore(response.data.report.percentage_passed);
      //   changeBestScoreHandler(response.data.report.best_percentage_passed);
      //   changedDisplayContent("result");
      //   changedOverAllScore(response.data.report.course_progress);
      // }
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
  // console.log(displayContent);

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
                    onChange={(e) =>
                      onChangeValue(
                        displayContent?.quiz[quizIndex]._id,
                        list.name
                      )
                    }
                    htmlFor={list.name}
                    className="bg-[#e7eef1] hover:bg-primary/40 hover:text-white quiz-section__content-options__label"
                  >
                    <input
                      type="radio"
                      id={list.name}
                      name="options"
                      className="quiz-section__content-options__radio-btn"
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
        <div className="flex flex-col mt-12  items-center">
          <p className="text-2xl font-medium"> Score:{displayScore}%</p>
          <div className="mt-12 text-sm">
            <button
              onClick={() => {
                tryAgainhandler();
              }}
              className="bg-primary py-2 px-4 rounded-md text-white font-medium"
            >
              Try Again
            </button>
            <button
              onClick={() => acceptAndContinue()}
              className="bg-primary py-2 px-4 rounded-md ml-6 text-white font-medium"
            >
              Accept and Continue
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
