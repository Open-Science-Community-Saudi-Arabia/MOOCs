export interface SignUpRequestPayload {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  passwordConfirm: string;
  role: string;
}
export interface LoginInRequestPayload {
  email: string;
  password: string;
}
export interface LoginResponse {
  token: string;
  first_name: string;
  last_name: string;
  account_type: string;
  email_address?: string;
  phone_number?: string;
  account_id: string;
  email_verified: boolean;
  date_of_birth?: Date | null;
  organization_name?: string;
  country?: string;
  profile_photo_url?: string;
}
export interface ForgetPasswordReqPayload {
  email: string;
}
export interface ResetPasswordReqPayload {
  password_reset_code: string;
  new_password: string;
}
export interface Courses {
  _id: string;
  author: string;
  title: string;
  title_tr: string;
  description: string;
  description_tr: string;
  enrolled_users: [];
  createdBy: {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    preferred_language: string;
  };
  createdAt: Date;
  updatedAt: Date;
  isAvailable: boolean;
  preview_image: string;
  status: string;
  course_sections: CourseSections[];
}

export interface CourseSections {
  _id: string;
  title: string;
  title_tr: string;
  description: string;
  description_tr: string;
  resources: Resources[];
}
export interface Resources {
  title: string;
  title_tr: string;
  description: string;
  description_tr: string;
  type: string;
  overall: number;
  quiz: Quiz[];
  link?: string;
  file?: string;
}
export interface Quiz {
  _id: string;
  title: string;
  title_tr: string;
  options:[]
  options_tr:[{name:string}]
  question_tr: string;
  question: string;
  order: number;
  best_percentage_passed: number;
}
// export interface Questions {
//   _id: string;
//   correct_option: string;
//   options: string[];
//   options_tr: string[];
//   question: string;
//   question_tr: string;
// }

export interface TextMaterial {
  _id: string;
  description: string;
  file_url: string;
  type: string;
  title: string;
  title_tr: string;
}

export interface Video {
  _id: string;
  description: string;
  link: string;
  duration: string;
  type: string;
  title: string;
  title_tr: string;
  order: number;
}

export interface AppContextState {
  isLoggedIn: boolean;
}
export interface AuthActionsContextState {
  logout: () => void;
}

export type Locale = string;
export type LocaleContextType = {
  locale: Locale;
  changeLocale: (locale: Locale) => void;
};




// import { Dispatch, SetStateAction, useState } from "react";
// import { Questions,Quiz } from "../../../types";
// import { exerciseScore } from "../../../utils/api/courses";
// import { toast } from "react-toastify";
// import Spinner from "../../../components/Spinner";
// import { t, Trans } from "@lingui/macro";

// interface IProps {
//   exerciseData?: Quiz;
//   quizIndex: number;
//   changeQuizIndex: (quizIndex: number) => void;
//   changedDisplayContent: (item: any) => void;
//   changeBestScoreHandler: (bestScore: number) => void;
//   changedCurrentScore: (currentScore: number) => void;
//   changedOverAllScore: (overAllScore: number) => void;
//   changedViewSubmit: (viewSubmit: boolean) => void;
//   setSubmission: Dispatch<SetStateAction<{}>>;
//   viewSubmit: boolean;
//   submission: object;
//   reset: () => void;
// }

// const ExerciseQuiz = ({
//   changedCurrentScore,
//   exerciseData,
//   quizIndex,
//   changeQuizIndex,
//   changedDisplayContent,
//   changeBestScoreHandler,
//   changedViewSubmit,
//   setSubmission,
//   viewSubmit,
//   submission,
//   changedOverAllScore,
//   reset,
// }: IProps) => {
//   const [isLoading, setLoading] = useState(false);
//   const locale = localStorage.getItem("language") || "en";
//   const onChangeValue = (id: string, event: any, index: number) => {
//     if (exerciseData) {
//       if (quizIndex + 1 === exerciseData?.questions.length) {
//         changedViewSubmit(true);
//       } else {
//         changeQuizIndex(quizIndex + 1);
//       }
//     }
//     setSubmission((prevState) => {
//       return { ...prevState, [id]: event.target.value };
//     });
//   };
//   const submitResult = async () => {
//     if (exerciseData) {
//       setLoading(true);
//       try {
//         let response = await exerciseScore(exerciseData?._id, { submission });
//         if (response) {
//           changedCurrentScore(response.data.report.percentage_passed);
//           changeBestScoreHandler(response.data.report.best_percentage_passed);
//           changedDisplayContent("result");
//           changedOverAllScore(response.data.report.course_progress);
//         }
//       } catch (error: any) {
//         setLoading(false);
//         toast.error(error.message, {
//           position: toast.POSITION.TOP_CENTER,
//           autoClose: 5000,
//           theme: "colored",
//         });
//       }
//     }
//   };
//   return (
//     <section className="quiz-section">
//       <div className="quiz-section__heading">
//         <h1 className="quiz-section__heading-title">
//           <Trans> Quiz:</Trans>
//           {locale === "en" ? exerciseData?.title : exerciseData?.title_tr}
//         </h1>
//         <p className="quiz-section__heading-subtitle">
//           {" "}
//           <Trans> Pick the right option.</Trans>
//         </p>
//       </div>
//       <div className="quiz-section__container">
//         {exerciseData?.questions?.map((content: Questions, index: number) => {
//           return (
//             quizIndex === index && (
//               <div key={content._id}>
//                 <div className="quiz-section__content">
//                   <div className="quiz-section__content-question">
//                     <p>
//                       {" "}
//                       <Trans> Question</Trans> {index + 1} of{" "}
//                       {exerciseData?.questions.length}:{" "}
//                     </p>
//                     {locale === "en"
//                       ?content.question
//                       : content.question_tr} ?
//                   </div>
//                   <div className="quiz-section__content-options">
                
//                     {(locale === "en"
//                       ? content.options
//                       : content.options_tr
//                     ).map((list: string, j: number) => {
//                       return (
//                         <label
//                           key={j}
//                           onChange={(e) => onChangeValue(content._id, e, j)}
//                           htmlFor={list}
//                           className="quiz-section__content-options__label"
//                         >
//                           <input
//                             type="radio"
//                             id={list}
//                             name="options"
//                             className="quiz-section__content-options__radio-btn"
//                             value={list}
//                           />
//                           {/* <p className="quiz-section__content-options__letter">
//                             {" "}
//                             {`${String.fromCharCode(j + 65)})`}
//                           </p>{" "} */}
//                           {list}
//                         </label>
//                       );
//                     })}
//                   </div>
//                 </div>
//                 {viewSubmit && (
//                   <button
//                     className="quiz-section__submit-btn"
//                     onClick={() => submitResult()}
//                   >
//                     {isLoading ? (
//                       <Spinner width="30px" height="30px" color="#fff" />
//                     ) : (
//                       t`Submit`
//                     )}
//                   </button>
//                 )}
//               </div>
//             )
//           );
//         })}
//       </div>
//     </section>
//   );
// };
// export default ExerciseQuiz;

// quiz heading should indication title e.g section one quiz exercise
// check for excessive network calls

// use Tool tip on the certificate to mention that 80%IS NEDDED
