import { useEffect } from "react";
// import { Videocontent } from "../../data";
import Header from "../board/Header";
import "./style.scss";
import { Link } from "react-router-dom";
import { useCourses } from "../../utils/api/courses";
// import { WiTime4 } from "react-icons/wi";
import { Courses } from "../../types";
import Spinner from "../../components/Spinner";
import ErrorFallBack from "../../components/ErrorFallBack";
// import { ToastContainer, toast } from "react-toastify";

const Board = () => {
  const { data: courses, isLoading, isError, refetch } = useCourses();

  useEffect(() => {
    refetch();
  }, []);
  return (
    <section className="dashboard">
      <div className="dashboard-container">
        <Header />
        <div className="dashboard-container__lesson">
          {isLoading ? (
            <div className="dashboard-container__lesson-spinner">
              <Spinner width="60px" height="60px" color />
            </div>
          ) : isError ? (
            <ErrorFallBack
              message="Something went wrong!"
              description="We encountered an error while fetching your purchased assets"
              reset={refetch}
            />
          ) : (
            <>
              <h1 className="dashboard-container__lesson-heading">
                Available Courses
              </h1>
              <div className="dashboard-container__lesson-courses">
                {courses?.data.courses?.map((item: Courses) => {
                  return (
                    <Link
                      aria-label="course"
                      key={item._id}
                      to={`/${item._id}`}
                      className="dashboard-container__lesson-courses-link"
                    >
                      <div className="dashboard-container__lesson-courses-content">
                        <img
                          className="dashboard-container__lesson-courses-content__img"
                          src={item.preview_image}
                          alt="course"
                        />
                        <p className="dashboard-container__lesson-courses-content__text">
                          {item.title}
                        </p>
                        <div className="dashboard-container__lesson-courses-content__bottom">
                          <p className="dashboard-container__lesson-courses-content__bottom-author">
                            {" "}
                            {item.course_sections.length} course sections
                            {/* {item.course_sections.map((item.))} */}
                          </p>
                          {/* <p className="dashboard-container__lesson-courses-content__bottom-author">
                            {" "}
                            5 Users Enrolled
                          </p> */}
                          {/* <p className="dashboard-container__lesson-courses-content__bottom-author">
                            {" "}
                           5 Users Enrolled
                          </p> */}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Board;
