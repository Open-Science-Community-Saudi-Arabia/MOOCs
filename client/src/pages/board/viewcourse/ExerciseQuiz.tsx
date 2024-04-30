import { Dispatch, SetStateAction, useState } from "react";
import { Quiz, Resources } from "../../../types";
import { exerciseScore } from "../../../utils/api/courses";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner";
import { t, Trans } from "@lingui/macro";

interface IProps {
  displayContent: Resources;
  // quizIndex: number;
  // changeQuizIndex: (quizIndex: number) => void;
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
  // changeQuizIndex,
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
  const locale = localStorage.getItem("language") || "en";

  const onChangeValue = (id: string, event: any, index: number) => {
    setQuizIndex(quizIndex + 1);
    if(quizIndex > displayContent.quiz.length){

    }
    // if (exerciseData) {
    //   if (quizIndex + 1 === exerciseData?.questions.length) {
    //     changedViewSubmit(true);
    //   } else {
    //     changeQuizIndex(quizIndex + 1);
    //   }
    // }
    // setSubmission((prevState) => {
    //   return { ...prevState, [id]: event.target.value };
    // });
  };

  // const submitResult = async () => {
  //   if (exerciseData) {
  //     setLoading(true);
  //     try {
  //       let response = await exerciseScore(exerciseData?._id, { submission });
  //       if (response) {
  //         changedCurrentScore(response.data.report.percentage_passed);
  //         changeBestScoreHandler(response.data.report.best_percentage_passed);
  //         changedDisplayContent("result");
  //         changedOverAllScore(response.data.report.course_progress);
  //       }
  //     } catch (error: any) {
  //       setLoading(false);
  //       toast.error(error.message, {
  //         position: toast.POSITION.TOP_CENTER,
  //         autoClose: 5000,
  //         theme: "colored",
  //       });
  //     }
  //   }
  // };
  // console.log(displayContent);
  return (
    <section className="quiz-section">
      <div className="quiz-section__heading">
        <h1 className="quiz-section__heading-title">
          <Trans> Quiz : </Trans>{" "}
          {locale === "en" ? displayContent?.title : displayContent?.title_tr}
        </h1>
        <p className="quiz-section__heading-subtitle">
          {" "}
          <Trans> Pick the right option.</Trans>
        </p>
      </div>
      <div className="quiz-section__container">
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
              ? displayContent?.quiz[quizIndex]?.options
              : displayContent?.quiz[quizIndex]?.options_tr
            ).map((list: { name: string }, j: number) => {
              return (
                <label
                  key={j}
                  onChange={(e) => onChangeValue(list.name, e, j)}
                  htmlFor={list.name}
                  className="bg-[#e7eef1] hover:bg-primary/40 hover:text-white quiz-section__content-options__label "
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
        {/* {viewSubmit && (
          <button
            className="quiz-section__submit-btn"
            // onClick={() => submitResult()}
          >
            {isLoading ? (
              <Spinner width="30px" height="30px" color="#fff" />
            ) : (
              t`Submit`
            )}
          </button>
        )} */}
      </div>
    </section>
  );
};
export default ExerciseQuiz;

// quiz heading should indication title e.g section one quiz exercise
// check for excessive network calls

// use Tool tip on the certificate to mention that 80%IS NEDDED
