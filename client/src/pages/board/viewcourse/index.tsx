import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Certificate from "./Certificate";
import "./style.scss";
import { TiArrowBack } from "react-icons/ti";
import { RxDot } from "react-icons/rx";
import { MdOndemandVideo } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BiCollapseAlt } from "react-icons/bi";
import {
  getCertificate,
  getOverallUserQuiz,
  getUserCourse,
} from "../../../utils/api/courses";
import Spinner from "../../../components/Spinner";
import ErrorFallBack from "../../../components/ErrorFallBack";
import ExerciseQuiz from "./ExerciseQuiz";
import ViewPdf from "./ViewPdf";
import { CourseSections, Courses, Resources } from "../../../types";

import { tabitem } from "../../../data";
import useMediaQuery from "../../../hooks/usemediaQuery";
import { useNavigate } from "react-router-dom";
import LanguageToggle from "../../../components/LanguageToggle";
import { ProgressBar } from "../../../components/ProgressBar";
import { t } from "@lingui/macro";
import { toast } from "react-toastify";

import { FaRegFilePdf } from "react-icons/fa";

/**
 * @category Client
 * @subcategory Pages
 * @module View Course
 * @description User can view individual course content.
 * @component
 * @example
<Route path="course/:id" element={<ViewCourse />} />
 */

const ViewCourse = () => {
  const params: string | any = useParams();
  const userId: string | any = localStorage.getItem("MOOCS_WEB_APP_USERID");
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tab1");
  const [displayContent, setDisplayContent] = useState<Resources>();
  const [isCourseContent, setCourseContent] = useState(true);
  const [quizScores, setQuizScores] = useState<any[]>([]);
  const [course, setCourse] = useState<Courses>();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setLoading] = useState<"loading"|"error"|"data">("loading");
  const [overAllScore, setOverAllScore] = useState(0);
  const [isLoadingCertificate, setLoadingCertificate] = useState(false);


  const isIpad = useMediaQuery("(min-width: 1024px)");
  const locale = localStorage.getItem("language") || "en";

  useEffect( () => {
    const getCourse = async () => {
      try {
        let res = await getUserCourse(params.id);
        setCourse(res);
        setDisplayContent(res?.course_section[0]?.resources[0]);
        setQuizScores(course?.quizScore);
        setLoading("data");
      } catch (e) {
        setLoading("error");
      }
    };
     getCourse()
  }, []);

  const getCourse = async () => {
    try {
      let res = await getUserCourse(params.id);
      setCourse(res);
      setDisplayContent(course?.course_section[0]?.resources[0]);
          getOverAllScore(params.id);
      setQuizScores(course?.quizScore);
      setLoading("data");
    } catch (e) {
      setLoading("error");
    }
  };

  const changedDisplayContent = (displayContent: any) => {
    setDisplayContent(displayContent);
  };

  const updateQuizScorehandler = (data: any) => {
    setQuizScores(data);
  };

  const getOverAllScore = async (courseId: string) => {
    try {
      const res = await getOverallUserQuiz(courseId);
      setOverAllScore(res.score);
    } catch (err) {
      console.log(err);
    }
  };
// console.log(overAllScore)
  const viewCertificate = async () => {
    setLoadingCertificate(true);
    try {
      let response = await getCertificate(params.id);
      if (response.success) {
        changedDisplayContent("certificate");
        setLoadingCertificate(false);
      }
    } catch (error: any) {
      setLoadingCertificate(false);
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        theme: "colored",
      });
    }
  };

  return (
    <section className="viewcourse">
      {isLoading ==="loading" ? (
        <div className="viewcourse__spinner">
          <Spinner width="60px" height="60px" color="#009985" />
        </div>
      ) : isLoading === "error" ? (
        <div className="viewcourse__error">
          <ErrorFallBack
            message="Something went wrong!"
            description="We encountered an error while fetching your courses"
            reset={getCourse}
          />
        </div>
      ) : (
        <div className="viewcourse-container">
          <div className="viewcourse-container__header">
            <div className="viewcourse-container__header__heading">
              <button
                aria-label="back-arrow"
                className=" icon-button"
                onClick={() => navigate("/dashboard")}
              >
                <TiArrowBack />
              </button>{" "}
              <h1 className="viewcourse-container__header__heading-title">
                {t`Title:`} {locale === "en" ? course?.title : course?.title_tr}
              </h1>
            </div>
            <div
              className={`${
                isIpad
                  ? "viewcourse-container__header__right"
                  : `${
                      isOpen
                        ? "viewcourse-container__header__ipad-right"
                        : "d-none"
                    }`
              }`}
            >
              {t` Your Progress`}{" "}
              <ProgressBar
                overallScore={overAllScore}
                width={150}
                bgcolor="#6abd41"
                progress={Math.round(overAllScore)}
                height={35}
              />
              {/* <button
                style={{
                  filter:
                    overAllScore <= 80 ? "brightness(0.5)" : "brightness(1)",
                }}
                disabled={overAllScore > 0 || overAllScore == undefined}
                onClick={() => {
                  viewCertificate();
                }}
                className="viewcourse-container__header__btn"
              >
                {isLoadingCertificate ? (
                  <Spinner width="30px" height="30px" color="#fff" />
                ) : (
                  t`View Certificate`
                )}
              </button> */}
              {!isCourseContent && (
                <button
                  onClick={() => {
                    setCourseContent(true);
                    setIsOpen(!isOpen);
                  }}
                  className="viewcourse-container__header__btn"
                >
                  {" "}
                  {t`Course Content`}
                </button>
              )}
              <LanguageToggle btncolor="#ffff" />
            </div>

            <button
              aria-label="dot-menu"
              className={`${
                isIpad ? "hidden" : "block"
              } viewcourse-container__header-doticon icon-button`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <BiDotsVerticalRounded />
            </button>
          </div>
          <div className="viewcourse-container__content">
            <div
              className={`viewcourse-container__content_left z-0 ${
                isCourseContent ? "open-leftcontent" : "closed-leftcontent"
              }`}
            >
              {displayContent?.type === "quiz" ? (
                <ExerciseQuiz
                  getOverAllScore={getOverAllScore}
                  displayContent={displayContent}
                  courseId={params.id}
                  updateQuizScorehandler={updateQuizScorehandler}
                />
              ) : displayContent?.type === "pdf" ? (
                <ViewPdf pdfUrl={displayContent?.file} />
              ) : displayContent?.type === "certificate" ? (
                <Certificate pdfUrl={displayContent?.file} />
              ) : (
                <iframe
                  title={displayContent?.title}
                  width="100%"
                  height="550"
                  src={displayContent?.link}
                  allowFullScreen
                  className="viewcourse-container__content-iframe"
                ></iframe>
              )}
            </div>

            {isCourseContent && (
              <div className="viewcourse-container__content-course">
                <div className="viewcourse-container__content-course-display">
                  {" "}
                  <p className="viewcourse-container__content-course-display-text">
                    {t`Course content`}
                  </p>
                  <button
                    aria-label="close"
                    className="viewcourse-container__content-course-display-btn icon-button"
                    onClick={() => setCourseContent(false)}
                  >
                    <BiCollapseAlt />
                  </button>
                </div>

                <div className="viewcourse-container__content-course-container">
                  {course?.course_section.map(
                    (content: CourseSections, index: number) => (
                      <div
                        className="viewcourse-container__content-course-section"
                        key={content._id}
                      >
                        {" "}
                        <p className="viewcourse-container__content-course-section__heading">
                          {" "}
                          <span className="w-[40%]">
                            {t`Section`} {index + 1}:{" "}
                          </span>
                          <span className="w-full line-clamp-1">
                            {" "}
                            {locale === "en"
                              ? content?.title
                              : content?.title_tr}
                          </span>
                        </p>
                        {content.resources.map((ele, j) => {
                          return (
                            <div key={ele._id}>
                              {ele.type === "video" ? (
                                <button
                                  aria-label="Watch video"
                                  className={`viewcourse-container__content-course-section__listitem ${
                                    displayContent?.title === ele.title
                                      ? "bg-primary !text-white"
                                      : "hover:bg-primary/30"
                                  } `}
                                  onClick={() => {
                                    setDisplayContent(ele),
                                      isIpad
                                        ? setCourseContent(true)
                                        : setCourseContent(false);
                                  }}
                                >
                                  <div className="viewcourse-container__content-course-section__listitem-title">
                                    <p className="flex items-center font-medium">
                                      <RxDot
                                        className={`${
                                          displayContent?.title === ele.title
                                            ? "text-white"
                                            : "text-primary"
                                        } `}
                                      />{" "}
                                      {locale === "en"
                                        ? ele?.title
                                        : ele?.title_tr}
                                    </p>
                                    <div className="viewcourse-container__content-course-section__listitem-duration ">
                                      {" "}
                                      <MdOndemandVideo />
                                    </div>
                                  </div>
                                </button>
                              ) : ele.type === "pdf" ? (
                                <button
                                  aria-label="Take quiz"
                                  onClick={() => {
                                    setDisplayContent(ele),
                                      isIpad
                                        ? setCourseContent(true)
                                        : setCourseContent(false);
                                  }}
                                  className={`viewcourse-container__content-course-section__listitem ${
                                    displayContent?.title === ele.title
                                      ? "bg-primary !text-white"
                                      : "hover:bg-primary/30"
                                  }`}
                                >
                                  <div className="viewcourse-container__content-course-section__listitem-title">
                                    <p className="flex items-center font-medium">
                                      <RxDot
                                        className={`${
                                          displayContent?.title === ele.title
                                            ? "text-white"
                                            : "text-primary"
                                        } `}
                                      />{" "}
                                      {locale === "en"
                                        ? ele?.title
                                        : ele?.title_tr}
                                    </p>
                                    <p className="viewcourse-container__content-course-section__listitem__status">
                                      <FaRegFilePdf />
                                    </p>
                                  </div>
                                </button>
                              ) : (
                                <button
                                  aria-label="Take quiz"
                                  onClick={() => {
                                    setDisplayContent(ele),
                                      isIpad
                                        ? setCourseContent(true)
                                        : setCourseContent(false);
                                  }}
                                  className={`viewcourse-container__content-course-section__listitem ${
                                    displayContent?.title === ele.title
                                      ? "bg-primary !text-white"
                                      : "hover:bg-primary/30"
                                  }`}
                                >
                                  <div className="viewcourse-container__content-course-section__listitem-title">
                                    <p className="flex items-center font-medium">
                                      <RxDot
                                        className={`${
                                          displayContent?.title === ele.title
                                            ? "text-white"
                                            : "text-primary"
                                        } `}
                                      />{" "}
                                      {t`Quiz:`} 
                                      {" "}
                                      {locale === "en"
                                        ? ele?.title
                                        : ele?.title_tr}{" "}
                                      {""}
                                      {index + 1}
                                    </p>

                                    <div className="viewcourse-container__content-course-section__listitem__score">
                                      <p
                                        style={{
                                          color:
                                            quizScores?.find(
                                              (quiz) => quiz.quizId == ele._id
                                            )?.score > 0
                                              ? "#009985"
                                              : "#666",
                                        }}
                                      ></p>
                                      <ProgressBar
                                        width={80}
                                        overallScore={
                                          quizScores?.find(
                                            (quiz) => quiz.quizId == ele._id
                                          )?.score || 0
                                        }
                                        bgcolor="#6abd41"
                                        progress={Math.round(
                                          quizScores?.find(
                                            (quiz) => quiz.quizId == ele._id
                                          )?.score || 0
                                        )}
                                        height={25}
                                      />{" "}
                                    </div>
                                  </div>
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="viewcourse-container__tab-container">
            <div className="viewcourse-container__tab-container-tab">
              {tabitem.map(({ name, id, tab }) => {
                return (
                  <p
                    key={id}
                    className={`${
                      activeTab === tab &&
                      "viewcourse-container__tab-container-tab__active-tab"
                    } 
                viewcourse-container__tab-container-tab__tabitem`}
                    onClick={() => {
                      setActiveTab(tab);
                    }}
                  >
                    {name()}
                  </p>
                );
              })}
            </div>

            <div className="viewcourse-container__tab-container__tab-content">
              {activeTab === "tab1" ? (
                <div>
                  <p className="viewcourse-container__tab-container__tab-content-text">
                    {t`Course description`}
                  </p>

                  <p>
                    {displayContent
                      ? locale === "en"
                        ? displayContent?.description
                        : displayContent?.description_tr
                      : locale === "en"
                      ? course?.description
                      : course?.description_tr}
                    {}
                  </p>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default ViewCourse;
