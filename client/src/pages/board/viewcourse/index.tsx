import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Certificate from "./Certificate";
import "./style.scss";
import { IoMdClose } from "react-icons/io";
import { TiArrowBack } from "react-icons/ti";
import { RxDot } from "react-icons/rx";
import { MdOndemandVideo } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useCourse } from "../../../utils/api/courses";
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
  const [score, setScore] = useState<number>();
  const [isOpen, setIsOpen] = useState(false);
  const [viewSubmit, setViewSubmit] = useState(false);
  const [submission, setSubmission] = useState({});

  const {
    data: coursedata,
    isLoading,
    isError,
    refetch,
  } = useCourse(params.id);
  const isIpad = useMediaQuery("(min-width: 1024px)");
  const course = coursedata?.data.course;
  useEffect(() => {
    isIpad ? setCourseContent(true) : setCourseContent(false);
    getVideodata(course?.course_sections[0].videos[0]._id);
  }, [isIpad, course]);

  const changeQuizIndex = (quizIndex: number) => {
    setQuizIndex(quizIndex);
  };
  const changeScoreHandler = (score: number) => {
    setScore(score);
  };

  const changedDisplayContent = (displayContent: any) => {
    setDisplayContent(displayContent);
  };
  const changedViewSubmit = (viewSubmit: boolean) => {
    setViewSubmit(viewSubmit);
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

  return (
    <section className="viewcourse">
      {isLoading ? (
        <div className="viewcourse__spinner">
          <Spinner width="60px" height="60px" color="#009985" />
        </div>
      ) : isError ? (
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
            <h1 className="viewcourse-container__header__heading">
              <button
                aria-label="back-arrow"
                className=" icon-button"
                onClick={() => navigate("/dashboard")}
              >
                <TiArrowBack />
              </button>{" "}
              Title: {course?.title}
            </h1>
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
              {
                <button
                  onClick={() => {
                    changedDisplayContent("certificate");
                  }}
                  className="viewcourse-container__header__btn"
                >
                  {" "}
                  View Certificate
                </button>
              }
              {!isCourseContent && (
                <button
                  onClick={() => {
                    setCourseContent(true);
                    !isIpad ? setIsOpen(false) : null;
                  }}
                  className="viewcourse-container__header__btn"
                >
                  {" "}
                  Course Content
                </button>
              )}
           
              <LanguageToggle btncolor="#ffff"/>
           
              
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
              {displayContent === "video" ? (
                <iframe
                  title={videoData?.title}
                  width="100%"
                  height="550"
                  src={videoData?.video_url}
                  allowFullScreen
                  className="viewcourse-container__content-iframe"
                ></iframe>
              ) : displayContent === "exercise" ? (
                <Quiz
                  exerciseData={exerciseData}
                  changeQuizIndex={changeQuizIndex}
                  quizIndex={quizIndex}
                  changedDisplayContent={changedDisplayContent}
                  changeScoreHandler={changeScoreHandler}
                  changedViewSubmit={changedViewSubmit}
                  setSubmission={setSubmission}
                  viewSubmit={viewSubmit}
                  submission={submission}
                />
              ) : displayContent === "pdf" ? (
                <ViewPdf pdfData={pdfData} isCourseContent={isCourseContent} />
              ) : displayContent === "result" ? (
                <Result
                  score={score}
                  selectedIndex={selectedIndex}
                  getexerciseData={getexerciseData}
                />
              ) : (
                <Certificate />
              )}
            </div>
            {isCourseContent && (
              <div className="viewcourse-container__content-course">
                <div className="viewcourse-container__content-course-display">
                  {" "}
                  <p className="viewcourse-container__content-course-display-text">
                    Course content
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
                          Section {index + 1}: {content.title}
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
                                  <RxDot /> {videoitem?.title}
                                </p>
                                <div className="viewcourse-container__content-course-section__listitem-duration">
                                  {" "}
                                  <MdOndemandVideo />
                                  {videoitem?.duration} min
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
                                    <RxDot /> {textcontent.title}
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
                                    <RxDot /> Quiz Exercise:{index + 1}
                                  </p>
                                  <p className="viewcourse-container__content-course-section__listitem__status">
                                    {quizitem.isCompleted ? (
                                      <span className="completed">
                                        completed
                                      </span>
                                    ) : (
                                      <span className="not-completed">
                                        not completed
                                      </span>
                                    )}
                                  </p>
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
              {tabitem.map((item) => {
                return (
                  <p
                    key={item.id}
                    className={`${
                      activeTab === item.tab &&
                      "viewcourse-container__tab-container-tab__active-tab"
                    } 
                viewcourse-container__tab-container-tab__tabitem`}
                    onClick={() => {
                      setActiveTab(item.tab);
                    }}
                  >
                    {item.name}
                  </p>
                );
              })}
            </div>

            <div className="viewcourse-container__tab-container__tab-content">
              {activeTab === "tab1" ? (
                <div>
                  <p className="viewcourse-container__tab-container__tab-content-text">
                    Course description
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

// the header
// the responsiveness
// the assesibility
//  work on the types
