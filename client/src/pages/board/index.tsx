import Header from "../board/Header";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { enrollUser, useCourses } from "../../utils/api/courses";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { Courses } from "../../types";
import Spinner from "../../components/Spinner";
import ErrorFallBack from "../../components/ErrorFallBack";

const Board = () => {
  const { data: courses, isLoading, isError, refetch } = useCourses();
  const navigate = useNavigate();

  const enrollUserHandler = async (id: string) => {
    try {
      let response = await enrollUser(id);
      if (response) {
        navigate(`course/${id}`);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

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
            <div className="dashboard-container__lesson-error">
              <ErrorFallBack
                message="Something went wrong!"
                description="We encountered an error while fetching courses"
                reset={refetch}
              />
            </div>
          ) : (
            <>
              <h1 className="dashboard-container__lesson-heading">
                Available Courses
              </h1>
              <div className="dashboard-container__lesson-courses">
                {courses?.data.courses?.map((item: Courses) => {
                  return (
                    <button
                      onClick={() => enrollUserHandler(item._id)}
                      aria-label={item.title}
                      key={item._id}
                      className="dashboard-container__lesson-courses-content"
                    >
                      <div className="dashboard-container__lesson-courses-content__img-container">
                        {" "}
                        <div className="img-container-overlay">
                          <BsFillPlayCircleFill />
                        </div>
                        <img
                          className="dashboard-container__lesson-courses-content__img-container-img"
                          src={item.preview_image}
                          alt={item.title}
                        />
                      </div>

                      <div className="dashboard-container__lesson-courses-content__bottom">
                        <p className="dashboard-container__lesson-courses-content__bottom-text">
                          {item.title}
                        </p>
                        <p className="dashboard-container__lesson-courses-content__bottom-author">
                          {" "}
                          {item.author}
                        </p>
                        <p className="dashboard-container__lesson-courses-content__bottom-course-no">
                          {" "}
                          {item.course_sections.length} course sections
                        </p>
                      </div>
                    </button>
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

// Add a join button,
// you should be able to tell  if you are enrolled or not
