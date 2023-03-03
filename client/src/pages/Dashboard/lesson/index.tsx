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

  return (
    <div className="lesson-container">
      <div className="header">
        <p>Title: {lesson?.title}</p>
        {!displaycontent && (
          <div
            onClick={() => setDisplayContent(true)}
            className="course-content-btn"
          >
            {" "}
            Course Content
          </div>
        )}
      </div>
      <div className="video-content">
        {displayVideo ? (
          <iframe
            width="100%"
            height="450"
            src={lesson?.url}
            allowFullScreen
            style={{ width: displaycontent ? "80%" : "100%" }}
          ></iframe>
        ) : (
          <Quiz />
        )}
        {displaycontent && (
          <div className="course-content">
            <div className="__heading">
              {" "}
              <p>Course content</p>
              <IoMdClose onClick={() => setDisplayContent(false)} />
            </div>
            <div onClick={() => setDisplayVideo(true)} className="__content">
              <div className="__title">
                <p>1. </p>
                <p className="__text">{lesson?.title}</p>
              </div>
              <div className="__duration">
                {" "}
                <WiTime4 />
                {lesson?.duration}
              </div>
            </div>

            <div onClick={() => setDisplayVideo(false)} className="__quiz">
            <p>  2. Take Quiz</p>
            <span >not completed</span>
            </div>
          </div>
        )}
      </div>
      <div className="note-content">
        <div className="tab-heading">
          {tabitem.map((item) => {
            return (
              <p
                key={item.id}
                className={`${activeTab === item.tab && "active-tab"} tab-item`}
                onClick={() => {
                  setActiveTab(item.tab);
                }}
              >
                {item.name}
              </p>
            );
          })}
        </div>
        <div className="tab-content">
          {activeTab === "tab1" ? (
            <div>
              <p>Course description</p>
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
    </div>
  );
}
