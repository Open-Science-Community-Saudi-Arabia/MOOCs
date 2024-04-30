import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Certificate from "./Certificate";
import "./style.scss";
import { TiArrowBack } from "react-icons/ti";
import { RxDot } from "react-icons/rx";
import { MdOndemandVideo } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BiCollapseAlt } from "react-icons/bi";
import { MdOutlinePlayLesson } from "react-icons/md";
import {
  getCertificate,
  getCourse,
  getCourses,
} from "../../../utils/api/courses";
import Spinner from "../../../components/Spinner";
import ErrorFallBack from "../../../components/ErrorFallBack";
import ExerciseQuiz from "./ExerciseQuiz";
import ViewPdf from "./ViewPdf";
import {
  CourseSections,
  Quiz,
  Resources,
  TextMaterial,
  Video,
} from "../../../types";
import Result from "./Result";
import { tabitem } from "../../../data";
import useMediaQuery from "../../../hooks/usemediaQuery";
import { useNavigate } from "react-router-dom";
import LanguageToggle from "../../../components/LanguageToggle";
import { ProgressBar } from "../../../components/ProgressBar";
import { t, Trans } from "@lingui/macro";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import { FaRegFilePdf } from "react-icons/fa";

/**
 * @category Client App
 * @subcategory Pages
 * @module ViewCourse
 * @description To view individual course content.
 * @component
 * @example
<Route path="course/:id" element={<ViewCourse />} />
 */

const ViewCourse = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tab1");
  const [displayContent, setDisplayContent] = useState<Resources>();
  const [isCourseContent, setCourseContent] = useState(true);
  const [videoData, setVideoData] = useState<Video>();
  const [exerciseData, setExerciseData] = useState<Quiz>();
  const [pdfData, setPdfData] = useState<TextMaterial>();
  const [selectedIndex, setSelectedIndex] = useState("");
  // const [quizIndex, setQuizIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [viewSubmit, setViewSubmit] = useState(false);
  const [submission, setSubmission] = useState({});
  const [overAllScore, setOverAllScore] = useState(0);
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);
  const [isLoadingCertificate, setLoadingCertificate] = useState(false);

  const queryKey = "getCourse";
  const {
    data: course,
    isFetching,
    error,
    refetch,
  }: any = useQuery([queryKey, params.id], () => getCourse(params.id), {
    refetchOnWindowFocus: false,
    staleTime: 0,
    cacheTime: 0,
    refetchInterval: 0,
  });
  console.log(displayContent);
  const isIpad = useMediaQuery("(min-width: 1024px)");

  const locale = localStorage.getItem("language") || "en";

  useEffect(() => {
    course?._id
      ? setDisplayContent(course?.course_section[0]?.resources[0])
      : null;
  }, [course]);

  // const changeQuizIndex = (quizIndex: number) => {
  //   setQuizIndex(quizIndex);
  // };
  const changeBestScoreHandler = (bestScore: number) => {
    setBestScore(bestScore);
  };
  const changedDisplayContent = (displayContent: any) => {
    setDisplayContent(displayContent);
  };
  const changedViewSubmit = (viewSubmit: boolean) => {
    setViewSubmit(viewSubmit);
  };
  const changedOverAllScore = (overAllScore: number) => {
    setOverAllScore(overAllScore);
  };
  const changedCurrentScore = (currentScore: number) => {
    setCurrentScore(currentScore);
  };

  const getexerciseData = (id: string) => {
    // changeQuizIndex(0);
    const dataitem = course?.course_sections
      .map((course: CourseSections) => course)
      .flat()
      .find((data: Quiz) => data._id === id);
    setSelectedIndex(id);
    setExerciseData(dataitem);
    changedDisplayContent("exercise");
    setViewSubmit(false);
    setSubmission({});
  };

  const viewCertificate = async () => {
    setLoadingCertificate(true);
    try {
      let response = await getCertificate(params.id);
      if (response.success) {
        setPdfData(response.data.certificate.certificate_url);
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
  console.log(displayContent);
  return (
    <section className="viewcourse">
      {isFetching ? (
        <div className="viewcourse__spinner">
          <Spinner width="60px" height="60px" color="#009985" />
        </div>
      ) : error ? (
        <div className="viewcourse__error">
          <ErrorFallBack
            message="Something went wrong!"
            description="We encountered an error while fetching your courses"
            reset={refetch}
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
                <Trans>Title:</Trans>{" "}
                {locale === "en" ? course?.title : course?.title_tr}
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
              <Trans> Your Progress</Trans>{" "}
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
                    !isIpad ? setIsOpen(false) : null;
                  }}
                  className="viewcourse-container__header__btn"
                >
                  {" "}
                  <Trans> Course Content</Trans>
                </button>
              )}
              <LanguageToggle btncolor="#ffff" />
            </div>
            {!isIpad && (
              <button
                aria-label="dot-menu"
                className="viewcourse-container__header-doticon icon-button"
                onClick={() => setIsOpen(!isOpen)}
              >
                <BiDotsVerticalRounded />
              </button>
            )}
          </div>
          <div className="viewcourse-container__content">
            <div
              className={`viewcourse-container__content_left ${
                isCourseContent ? "open-leftcontent" : "closed-leftcontent"
              }`}
            >
              {displayContent?.type === "quiz" ? (
                <ExerciseQuiz
                  displayContent={displayContent}
                  // changeQuizIndex={changeQuizIndex}
                  // quizIndex={quizIndex}
                  changedDisplayContent={changedDisplayContent}
                  changeBestScoreHandler={changeBestScoreHandler}
                  changedViewSubmit={changedViewSubmit}
                  setSubmission={setSubmission}
                  viewSubmit={viewSubmit}
                  submission={submission}
                  reset={refetch}
                  changedCurrentScore={changedCurrentScore}
                  changedOverAllScore={changedOverAllScore}
                />
              ) : displayContent?.type === "pdf" ? (
                <ViewPdf pdfUrl={pdfData?.file_url} />
              ) : displayContent?.type === "result" ? (
                <Result
                  currentScore={currentScore}
                  selectedIndex={selectedIndex}
                  getexerciseData={getexerciseData}
                />
              ) : displayContent?.type === "certificate" ? (
                <Certificate pdfUrl={pdfData} />
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
                    <Trans> Course content</Trans>
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
                            <Trans> Section</Trans> {index + 1}:{" "}
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
                            <div key={j}>
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
                                      {/* {videoDuration(ele.link)} */}
                                      {/* <Trans> min</Trans> */}
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
                                      <Trans> Quiz Lesson</Trans> {index + 1}
                                    </p>

                                    <div className="viewcourse-container__content-course-section__listitem__score">
                                      <p
                                      // style={{
                                      //   color:
                                      //     quizitem.best_percentage_passed > 0
                                      //       ? "#009985"
                                      //       : "#666",
                                      // }}
                                      >
                                        {" "}
                                        {/* {quizitem.best_percentage_passed > 0
                                        ? quizitem.best_percentage_passed ||
                                          bestScore
                                        : 0}
                                      %{" "} */}
                                      </p>
                                      {/* <ProgressBar
                                      width={80}
                                      bgcolor="#009985"
                                      progress={Math.round(
                                        quizitem.best_percentage_passed
                                      )}
                                      height={18}
                                    />{" "} */}
                                    </div>
                                    <p className="viewcourse-container__content-course-section__listitem__status">
                                      <MdOutlinePlayLesson />
                                    </p>
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
                    <Trans> Course description</Trans>
                  </p>
                  <p>{displayContent?.description}</p>
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

// todo
// Work on course content, specially the quiz, the hover/active state covers the progress bar(find alternative)
// work on smooth language toggle
// and reloading always take back user to first item, rather save current item
