import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Certificate from "./Certificate";
import "./style.scss";
import { IoMdClose } from "react-icons/io";
import { RxDotFilled } from "react-icons/rx";
import { RxDot } from "react-icons/rx";
import { MdOndemandVideo } from "react-icons/md";
import { useCourse } from "../../../utils/api/courses";
import Spinner from "../../../components/Spinner";
import ErrorFallBack from "../../../components/ErrorFallBack";
import Quiz from "./Quiz";
import ViewPdf from "./ViewPdf";
import { CourseSections, Exercise, TextMaterial, Video } from "../../../types";
import Result from "./Result";
import { Videocontent } from "../../../data";

const ViewCourse = () => {
  const params = useParams();
  let score: number;
  const [activeTab, setActiveTab] = useState("tab1");
  const [displayContent, setDisplayContent] = useState<
    "video" | "exercise" | "pdf" | "result" | "certificate"
  >("video");
  const [isCourseContent, setCourseContent] = useState(true);
  const [videoData, setVideoData] = useState<Video>();
  const [exerciseData, setExerciseData] = useState<Exercise>();
  const [pdfData, setPdfData] = useState<TextMaterial>();
  // const [course, setCourse] = useState<any>(Videocontent); //remove later
  const [selectedIndex, setSelectedIndex] = useState("");
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const {
    data: coursedata,
    isLoading,
    isError,
    refetch,
  } = useCourse(params.id);

  const course = coursedata?.data.course;
  useEffect(() => {
    // console.log(course);
    getVideodata(course?.course_sections[0].videos[0]._id);
  }, [course]);

  const tabitem = [
    {
      id: 0,
      tab: "tab1",
      name: "Overview",
    },

    {
      id: 1,
      tab: "tab2",
      name: "Certificate",
    },
  ];
  const changeQuizIndex = (quizIndex: number) => {
    setQuizIndex(quizIndex);
  };

  const changedDisplayContent = (displayContent: any) => {
    setDisplayContent(displayContent);
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
    setQuizAnswers([]);
    changeQuizIndex(0);
    const dataitem = course?.course_sections
      .map((course: CourseSections) => course.exercises)
      .flat()
      .find((data: Exercise) => data._id === id);
    setSelectedIndex(id);
    setExerciseData(dataitem);
    changedDisplayContent("exercise");
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
  if (exerciseData) {
    score = (quizAnswers.length / exerciseData?.questions.length) * 100;
  }

  return (
    <section className="lesson-container">
      {isLoading ? (
        <div className="dashboard-container__lesson-spinner">
          <Spinner width="60px" height="60px" color />
        </div>
      ) : isError ? (
        <ErrorFallBack
          message="Something went wrong!"
          description="We encountered an error while fetching your courses"
          reset={refetch}
        />
      ) : (
        <>
          <div className="lesson-container__header">
            <h1 className="lesson-container__header-heading">
              Title: {course?.title}
            </h1>
            <div className="lesson-container__header-heading__right">
              {
                <button
                  onClick={() => {
                    changedDisplayContent("certificate");
                  }}
                  className="lesson-container__header-heading__btn"
                >
                  {" "}
                  View Certificate
                </button>
              }
              {!isCourseContent && (
                <button
                  onClick={() => {
                    setCourseContent(true);
                  }}
                  className="lesson-container__header-heading__btn"
                >
                  {" "}
                  Course Content
                </button>
              )}
            </div>
          </div>
          <div className="lesson-container__content">
            <div style={{ width: isCourseContent ? "80%" : "100%" }}>
              {displayContent === "video" ? (
                <iframe
                  title={videoData?.title}
                  width="100%"
                  height="550"
                  src={videoData?.video_url}
                  allowFullScreen
                  className="lesson-container__content-iframe"
                ></iframe>
              ) : displayContent === "exercise" ? (
                <Quiz
                  exerciseData={exerciseData}
                  changeQuizIndex={changeQuizIndex}
                  isCourseContent={isCourseContent}
                  quizIndex={quizIndex}
                  changedDisplayContent={changedDisplayContent}
                  quizAnswers={quizAnswers}
                />
              ) : displayContent === "pdf" ? (
                <ViewPdf pdfData={pdfData} isCourseContent={isCourseContent} />
              ) : displayContent === "result" ? (
                <Result
                  score={
                    exerciseData
                      ? (quizAnswers.length / exerciseData?.questions.length) *
                        100
                      : null
                  }
                  selectedIndex={selectedIndex}
                  isCourseContent={isCourseContent}
                  getexerciseData={getexerciseData}
                />
              ) : (
                <Certificate />
              )}
            </div>
            {isCourseContent && (
              <div className="lesson-container__content-course">
                <div className="lesson-container__content-course-display">
                  {" "}
                  <p className="lesson-container__content-course-display-text">
                    Course content
                  </p>
                  <button
                    aria-label="close"
                    className="lesson-container__content-course-display-btn icon-button"
                    onClick={() => setCourseContent(false)}
                  >
                    <IoMdClose />
                  </button>
                </div>

                <div className="lesson-container__content-course-container">
                  {course?.course_sections.map(
                    (content: CourseSections, index: number) => (
                      <div
                        className="lesson-container__content-course-section"
                        key={content._id}
                      >
                        {" "}
                        <p className="lesson-container__content-course-section__heading">
                          {" "}
                          Section {index + 1}: {content.title}
                        </p>
                        {content.videos.map((videoitem: Video, j: number) => {
                          return (
                            <button
                              key={videoitem._id}
                              aria-label="Watch video"
                              className={`lesson-container__content-course-section__listitem ${
                                selectedIndex === videoitem._id && "active-item"
                              }`}
                              onClick={() => {
                                getVideodata(videoitem._id);
                              }}
                            >
                              <div className="lesson-container__content-course-section__listitem-title">
                                <p className="lesson-container__content-course-section__listitem-text">
                                  <RxDot /> {videoitem?.title}
                                </p>
                                <div className="lesson-container__content-course-section__listitem-duration">
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
                                }}
                                className={`lesson-container__content-course-section__listitem ${
                                  selectedIndex === textcontent._id &&
                                  "active-item"
                                }`}
                              >
                                <div className="lesson-container__content-course-section__listitem-title">
                                  <p className="lesson-container__content-course-section__listitem-text">
                                    <RxDot /> {textcontent.title}
                                  </p>
                                  <p className="lesson-container__content-course-section__listitem__status">
                                    {textcontent.type}
                                  </p>
                                </div>
                              </button>
                            );
                          }
                        )}
                        {content.exercises.map((quizitem: Exercise) => {
                          return (
                            <button
                              key={quizitem._id}
                              aria-label="Take quiz"
                              onClick={() => {
                                getexerciseData(quizitem._id);
                              }}
                              className={`lesson-container__content-course-section__listitem ${
                                selectedIndex === quizitem._id && "active-item"
                              }`}
                            >
                              <div className="lesson-container__content-course-section__listitem-title">
                                <p className="lesson-container__content-course-section__listitem-text">
                                  <RxDot /> Quiz Exercise: Section {index + 1}
                                </p>
                                <p className="lesson-container__content-course-section__listitem__status">
                                  {quizitem.isCompleted ? (
                                    <span className="completed">completed</span>
                                  ) : (
                                    <span className="not-completed">
                                      not completed
                                    </span>
                                  )}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="lesson-container__tab-container">
            <div className="lesson-container__tab-container-tab">
              {tabitem.map((item) => {
                return (
                  <p
                    key={item.id}
                    className={`${
                      activeTab === item.tab &&
                      "lesson-container__tab-container-tab__active-tab"
                    } 
                lesson-container__tab-container-tab__tabitem`}
                    onClick={() => {
                      setActiveTab(item.tab);
                    }}
                  >
                    {item.name}
                  </p>
                );
              })}
            </div>

            <div className="lesson-container__tab-container__tab-content">
              {activeTab === "tab1" ? (
                <div>
                  <p className="lesson-container__tab-container__tab-content-text">
                    Course description
                  </p>
                  {/* {lesson?.description} */}
                </div>
              ) : (
                <Certificate />
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
};
export default ViewCourse;

// the header
// the responsiveness
// the assesibility
//  work on the types
