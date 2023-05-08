import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Certificate from "./Certificate";
import "./style.scss";
import { IoMdClose } from "react-icons/io";
import { TiArrowBack } from "react-icons/ti";
import { RxDot } from "react-icons/rx";
import { MdOndemandVideo } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";
import {
  getCertificate,
  getCourse,
  getCourses,
} from "../../../utils/api/courses";
import Spinner from "../../../components/Spinner";
import ErrorFallBack from "../../../components/ErrorFallBack";
import Quiz from "./Quiz";
import ViewPdf from "./ViewPdf";
import { CourseSections, Exercise, TextMaterial, Video } from "../../../types";
import Result from "./Result";
import { tabitem } from "../../../data";
import useMediaQuery from "../../../hooks/usemediaQuery";
import { useNavigate } from "react-router-dom";
import LanguageToggle from "../../../components/LanguageToggle";
import { ProgressBar } from "../../../components/ProgressBar";
import { t, Trans } from "@lingui/macro";
import { toast } from "react-toastify";
import { useQuery } from "react-query";

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
  const [displayContent, setDisplayContent] = useState<
    "video" | "exercise" | "pdf" | "result" | "certificate"
  >("video");
  const [isCourseContent, setCourseContent] = useState(true);
  const [videoData, setVideoData] = useState<Video>();
  const [exerciseData, setExerciseData] = useState<Exercise>();
  const [pdfData, setPdfData] = useState<TextMaterial>();
  const [selectedIndex, setSelectedIndex] = useState("");
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [viewSubmit, setViewSubmit] = useState(false);
  const [submission, setSubmission] = useState({});
  const [overAllScore, setOverAllScore] = useState(0);
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);
  const [isLoadingCertificate, setLoadingCertificate] = useState(false);

  const queryKey = "getCourse";
  const {
    data: coursedata,
    isFetching,
    error,
    refetch,
  }: any = useQuery([queryKey, params.id], () => getCourse(params.id), {
    refetchOnWindowFocus: false,
    staleTime: 0,
    cacheTime: 0,
    refetchInterval: 0,
  });
  const isIpad = useMediaQuery("(min-width: 1024px)");
  const course = coursedata?.data.course;
  const locale = localStorage.getItem("language") || "en";

  useEffect(() => {
    isIpad ? setCourseContent(true) : setCourseContent(false);
    getVideodata(course?.course_sections[0].videos[0]._id);
    setOverAllScore(course?.overall);
  }, [isIpad, course]);

  const changeQuizIndex = (quizIndex: number) => {
    setQuizIndex(quizIndex);
  };
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

  const getVideodata = (id: string) => {
    changedDisplayContent("video");
    if (selectedIndex === "") {
      setVideoData(course?.course_sections[0].videos[0]);
    } else {
      const dataitem = course?.course_sections
        .map((course: CourseSections) => course.videos)
        .flat()
        .find((data: Video) => data._id === id);
      setVideoData(dataitem);
    }
    setSelectedIndex(id);
  };

  const getexerciseData = (id: string) => {
    changeQuizIndex(0);
    const dataitem = course?.course_sections
      .map((course: CourseSections) => course.exercises)
      .flat()
      .find((data: Exercise) => data._id === id);
    setSelectedIndex(id);
    setExerciseData(dataitem);
    changedDisplayContent("exercise");
    setViewSubmit(false);
    setSubmission({});
  };

  const getPdfdata = (id: string) => {
    const dataitem = course?.course_sections
      .map((course: CourseSections) => course.textmaterials)
      .flat()
      .find((data: TextMaterial) => data._id === id);
    setPdfData(dataitem);
    setSelectedIndex(id);
    changedDisplayContent("pdf");
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
              <button
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
              </button>
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
              {displayContent === "exercise" ? (
                <Quiz
                  exerciseData={exerciseData}
                  changeQuizIndex={changeQuizIndex}
                  quizIndex={quizIndex}
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
              ) : displayContent === "pdf" ? (
                <ViewPdf pdfUrl={pdfData?.file_url} />
              ) : displayContent === "result" ? (
                <Result
                  currentScore={currentScore}
                  selectedIndex={selectedIndex}
                  getexerciseData={getexerciseData}
                />
              ) : displayContent === "certificate" ? (
                <Certificate pdfUrl={pdfData} />
              ) : (
                <iframe
                  title={videoData?.title}
                  width="100%"
                  height="550"
                  src={videoData?.video_url}
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
                    <IoMdClose />
                  </button>
                </div>

                <div className="viewcourse-container__content-course-container">
                  {course?.course_sections.map(
                    (content: CourseSections, index: number) => (
                      <div
                        className="viewcourse-container__content-course-section"
                        key={content._id}
                      >
                        {" "}
                        <p className="viewcourse-container__content-course-section__heading">
                          {" "}
                          <Trans> Section</Trans> {index + 1}:{" "}
                          {locale === "en" ? course?.title : course?.title_tr}
                        </p>
                        {content.videos.map((videoitem: Video, j: number) => {
                          return (
                            <button
                              key={videoitem._id}
                              aria-label="Watch video"
                              className={`viewcourse-container__content-course-section__listitem ${
                                selectedIndex === videoitem._id && "active-item"
                              }`}
                              onClick={() => {
                                getVideodata(videoitem._id),
                                  isIpad
                                    ? setCourseContent(true)
                                    : setCourseContent(false);
                              }}
                            >
                              <div className="viewcourse-container__content-course-section__listitem-title">
                                <p className="viewcourse-container__content-course-section__listitem-text">
                                  <RxDot />{" "}
                                  {locale === "en"
                                    ? videoitem?.title
                                    : videoitem?.title_tr}
                                </p>
                                <div className="viewcourse-container__content-course-section__listitem-duration">
                                  {" "}
                                  <MdOndemandVideo />
                                  {videoitem?.duration}
                                  <Trans> min</Trans>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                        {content.textmaterials.map(
                          (textcontent: TextMaterial) => {
                            return (
                              <button
                                key={textcontent._id}
                                aria-label="Take quiz"
                                onClick={() => {
                                  getPdfdata(textcontent._id);
                                  isIpad
                                    ? setCourseContent(true)
                                    : setCourseContent(false);
                                }}
                                className={`viewcourse-container__content-course-section__listitem ${
                                  selectedIndex === textcontent._id &&
                                  "active-item"
                                }`}
                              >
                                <div className="viewcourse-container__content-course-section__listitem-title">
                                  <p className="viewcourse-container__content-course-section__listitem-text">
                                    <RxDot />{" "}
                                    {locale === "en"
                                      ? textcontent.title
                                      : textcontent.title_tr}
                                  </p>
                                  <p className="viewcourse-container__content-course-section__listitem__status">
                                    {textcontent.type}
                                  </p>
                                </div>
                              </button>
                            );
                          }
                        )}
                        {content.exercises.map(
                          (quizitem: Exercise, index: number) => {
                            return (
                              <button
                                key={quizitem._id}
                                aria-label="Take quiz"
                                onClick={() => {
                                  getexerciseData(quizitem._id);
                                  isIpad
                                    ? setCourseContent(true)
                                    : setCourseContent(false);
                                }}
                                className={`viewcourse-container__content-course-section__listitem ${
                                  selectedIndex === quizitem._id &&
                                  "active-item"
                                }`}
                              >
                                <div className="viewcourse-container__content-course-section__listitem-title">
                                  <p className="viewcourse-container__content-course-section__listitem-text">
                                    <RxDot />
                                    <Trans> Quiz Exercise:</Trans>
                                    {index + 1}
                                  </p>

                                  <div className="viewcourse-container__content-course-section__listitem__score">
                                    <p
                                      style={{
                                        color:
                                          quizitem.best_percentage_passed > 0
                                            ? "#009985"
                                            : "#666",
                                      }}
                                    >
                                      {" "}
                                      {quizitem.best_percentage_passed > 0
                                        ? quizitem.best_percentage_passed ||
                                          bestScore
                                        : 0}
                                      %{" "}
                                    </p>
                                    <ProgressBar
                                      width={80}
                                      bgcolor="#009985"
                                      progress={Math.round(
                                        quizitem.best_percentage_passed
                                      )}
                                      height={18}
                                    />{" "}
                                  </div>
                                </div>
                              </button>
                            );
                          }
                        )}
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
                  {/* {viewcourse?.description} */}
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

// Work on course content, specially the quiz, the hover/active state covers the progress bar(find alternative)
