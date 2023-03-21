import { Link } from "react-router-dom";
import "./style.scss";

 const Error=() =>{
  return (
    <div className="error">
      <h1 className="error__heading">Page not found</h1>
      <Link to={"/"} className="error__link">
        {" "}
        Return to home page
      </Link>
    </div>
  );
}
export default Error




// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import Certificate from "./Certificate";
// import "./style.scss";
// import { IoMdClose } from "react-icons/io";
// import { WiTime4 } from "react-icons/wi";
// import { useCourse } from "../../../utils/api/courses";
// import Spinner from "../../../components/Spinner";
// import ErrorFallBack from "../../../components/ErrorFallBack";
// import Quiz from "./Quiz";

// const ViewCourse = () => {
//   const [activeTab, setActiveTab] = useState("tab1");
//   const params = useParams();
//   const [displayVideo, setDisplayVideo] = useState(true);
//   const [displayContent, setDisplayContent] = useState(true);
//   const [videoData, setVideoData] = useState<any>(null);
//   const [quizData, setQuizData] = useState<any>(null);
//   const {
//     data: coursedata,
//     isLoading,
//     isError,
//     refetch,
//   } = useCourse(params.id);

//   const course = coursedata?.data.course;

//   const tabitem = [
//     {
//       id: 0,
//       tab: "tab1",
//       name: "Overview",
//     },

//     {
//       id: 1,
//       tab: "tab2",
//       name: "Certificate",
//     },
//   ];

//   console.log(course);
//   const getVideodata = (id: string) => {
//     setDisplayVideo(true);
//     const dataitem = course?.course_sections
//       .map((course: any) => course.videos)
//       .flat()
//       .find((data: any) => data.id === id);
//     setVideoData(dataitem);
//   };
//   const getQuizdata = (id: string) => {
//     setDisplayVideo(false);
//     const dataitem = course?.course_sections
//       .map((course: any) => course.exercises)
//       .flat()
//       .find((data: any) => data.id === id);
//     setQuizData(dataitem);
//   };

//   return (
//     <section className="lesson-container">
//       {isLoading ? (
//         <div className="dashboard-container__lesson-spinner">
//           <Spinner width="60px" height="60px" color />
//         </div>
//       ) : isError ? (
//         <ErrorFallBack
//           message="Something went wrong!"
//           description="We encountered an error while fetching your purchased assets"
//           reset={refetch}
//         />
//       ) : (
//         <>
//           <div className="lesson-container__header">
//             <h1 className="lesson-container__header-heading">
//               Title: {course?.title}
//             </h1>
//             {!displayContent && (
//               <button
//                 onClick={() => setDisplayContent(true)}
//                 className="lesson-container__header-heading__btn"
//               >
//                 {" "}
//                 Course Content
//               </button>
//             )}
//           </div>
//           <div className="lesson-container__content">
//             {displayVideo ? (
//               <iframe
//                 title={videoData?.title}
//                 width="100%"
//                 height="550"
//                 src={
//                   course?.course_sections[0]?.videos[0].video_url ||
//                   videoData?.video_url
//                 }
//                 allowFullScreen
//                 style={{ width: displayContent ? "80%" : "100%" }}
//                 className="lesson-container__content-iframe"
//               ></iframe>
//             ) : (
//               <Quiz quizData={quizData} displayContent={displayContent} />
//             )}
//             {displayContent && (
//               <div className="lesson-container__content-course">
//                 <div className="lesson-container__content-course-display">
//                   {" "}
//                   <p className="lesson-container__content-course-display-text">
//                     Course content
//                   </p>
//                   <button
//                     aria-label="close"
//                     className="lesson-container__content-course-display-btn icon-button"
//                     onClick={() => setDisplayContent(false)}
//                   >
//                     <IoMdClose />
//                   </button>
//                 </div>

//                 {course?.course_sections.map((content: any, index: number) => (
//                   <div
//                     className="lesson-container__content-course-section"
//                     key={content.id}
//                   >
//                     {" "}
//                     <p className="lesson-container__content-course-section__heading">
//                       {" "}
//                       Section {index + 1}: {content.title}
//                     </p>
//                     {content.contents.map((videoitem: any, j: number) => {
//                       return (
//                         <button
//                           key={videoitem.id}
//                           aria-label="Watch video"
//                           // style={{
//                           //   backgroundColor:
//                           //     videoData?.id || quizData?.id === videoitem.id
//                           //       ? "green"
//                           //       : "transparent",
//                           // }}
//                           className="lesson-container__content-course-section__video-btn"
//                           onClick={() => {
//                             getVideodata(videoitem.id);
//                           }}
//                         >
//                           <div className="lesson-container__content-course-section__video-btn-title">
//                             <p>{j + 1}. </p>
//                             <div>
//                               <p className="lesson-container__content-course-section__video-btn-text">
//                                 {videoitem?.type === "video"
//                                   ? videoitem?.title
//                                   : videoitem?.type === "exercise"
//                                   ? "Quiz Exercise"
//                                   : `${videoitem?.title}`}
//                               </p>
//                               {videoitem?.type === "video" && (
//                                 <div className="lesson-container__content-course-section__video-btn-duration">
//                                   {" "}
//                                   <WiTime4 />
//                                   {videoitem?.duration}
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         </button>
//                       );
//                     })}
//                     {content.exercises.map((quizitem: any) => {
//                       return (
//                         <button
//                           key={quizitem.id}
//                           aria-label="Take quiz"
//                           // onClick={() => setDisplayVideo(false)}
//                           onClick={() => {
//                             getQuizdata(quizitem.id);
//                           }}
//                           className="lesson-container__content-course-quiz-btn"
//                         >
//                           <p> Quiz {quizitem.type}</p>
//                           <span className="lesson-container__content-course-quiz-btn__status">
//                             not completed
//                           </span>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//           <div className="lesson-container__tab-container">
//             <div className="lesson-container__tab-container-tab">
//               {tabitem.map((item) => {
//                 return (
//                   <p
//                     key={item.id}
//                     className={`${
//                       activeTab === item.tab &&
//                       "lesson-container__tab-container-tab__active-tab"
//                     } 
//                 lesson-container__tab-container-tab__tabitem`}
//                     onClick={() => {
//                       setActiveTab(item.tab);
//                     }}
//                   >
//                     {item.name}
//                   </p>
//                 );
//               })}
//             </div>
//             <div className="lesson-container__tab-container__tab-content">
//               {activeTab === "tab1" ? (
//                 <div>
//                   <p className="lesson-container__tab-container__tab-content-text">
//                     Course description
//                   </p>
//                   {/* {lesson?.description} */}
//                 </div>
//               ) : (
//                 <Certificate
//                   handleOpenContent={() => {
//                     setDisplayContent(true), setDisplayVideo(false);
//                   }}
//                 />
//               )}
//             </div>
//           </div>
//         </>
//       )}
//     </section>
//   );
// };
// export default ViewCourse;
