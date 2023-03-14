import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Videocontent } from "../../../data";
import Certificate from "./Certificate";
import Quiz from "./Quiz";
import "./style.scss";
import { IoMdClose } from "react-icons/io";
import { WiTime4 } from "react-icons/wi";

export default function Lesson() {
  const [activeTab, setActiveTab] = useState("tab1");
  const params = useParams();
  const [lesson, setLesson] = useState<any>();
  const [displayVideo, setDisplayVideo] = useState(true);
  const [displaycontent, setDisplayContent] = useState(true);

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
  useEffect(() => {
    setLesson(Videocontent.find((item) => item.id === Number(params.id)));
  }, []);
console.log(lesson)
  return (
    <section className="lesson-container">
      <div className="lesson-container__header">
        <h1 className="lesson-container__header-heading">
          Title: {lesson?.title}
        </h1>
        {!displaycontent && (
          <button
            onClick={() => setDisplayContent(true)}
            className="lesson-container__header-heading__btn"
          >
            {" "}
            Course Content
          </button>
        )}
      </div>
      <div className="lesson-container__content">
        {displayVideo ? (
          <iframe
            title={lesson?.title}
            width="100%"
            height="450"
            src={lesson?.url}
            allowFullScreen
            style={{ width: displaycontent ? "80%" : "100%" }}
            className="lesson-container__content-iframe"
          ></iframe>
        ) : (
          <Quiz />
        )}
        {displaycontent && (
          <div className="lesson-container__content-course">
            <div className="lesson-container__content-course-display">
              {" "}
              <p className="lesson-container__content-course-display-text">
                Course content
              </p>
              <button
                aria-label="close"
                className="lesson-container__content-course-display-btn icon-button"
                onClick={() => setDisplayContent(false)}
              >
                <IoMdClose />
              </button>
            </div>

            <button
              aria-label="Watch video"
              className="lesson-container__content-course-video-btn"
              onClick={() => setDisplayVideo(true)}
            >
              <div className="lesson-container__content-course-video-btn__title">
                <p>1. </p>
                <p className="lesson-container__content-course-video-btn__text">
                  {lesson?.title}
                </p>
              </div>
              <div className="lesson-container__content-course-video-btn__duration">
                {" "}
                <WiTime4 />
                {lesson?.duration}
              </div>
            </button>

            <button
              aria-label="Take quiz"
              onClick={() => setDisplayVideo(false)}
              className="lesson-container__content-course-quiz-btn"
            >
              <p> 2. Take Quiz</p>
              <span className="lesson-container__content-course-quiz-btn__status">
                not completed
              </span>
            </button>
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
              {lesson?.description}
            </div>
          ) : (
            <Certificate
              handleOpenContent={() => {
                setDisplayContent(true), setDisplayVideo(false);
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
