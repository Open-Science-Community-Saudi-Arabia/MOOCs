import { useEffect, useState } from "react";
import { Videocontent } from "../../data";
import Header from "./Header";
import "./style.scss";
import { Link } from "react-router-dom";
import { getCourses } from "../../utils/api/courses";
import { WiTime4 } from "react-icons/wi";
import { Courses } from "../../types";
import Spinner from "../../components/Spinner";

function Dashboard() {
  const [courses, setCourses] = useState<Courses[]>();
  const [isloadingCourses, setLoadingCourses] = useState<boolean>(false);
  useEffect(() => {
    getAllCourses();
  }, []);

  const getAllCourses = async () => {
    setLoadingCourses(true);
    try {
      let response = await getCourses();
      console.log(response);
      if (response.success) {
        setLoadingCourses(false);
        setCourses(response.data.courses);
      }
    } catch (error: any) {
      setLoadingCourses(false);
    }
  };

  return (
    <section className="dashboard">
      <div className="dashboard-container">
        <Header />
        <div className="dashboard-container__lesson">
          <h1 className="dashboard-container__lesson-heading">
            Available Courses
          </h1>
          <>
            {isloadingCourses ? (
              <div className="dashboard-container__lesson-spinner">
                <Spinner width="60px" height="60px" color />
              </div>
            ) : (
              <div className="dashboard-container__lesson-courses">
                {courses?.map((item) => {
                  return (
                    <Link
                      aria-label="course"
                      key={item._id}
                      to={`/dashboard/${item._id}`}
                    >
                      <div className="dashboard-container__lesson-courses-content">
                        {/* <img
                      className="dashboard-container__lesson-courses-content__img"
                      src={item.image}
                      alt="course video"
                    /> */}
                        <p className="dashboard-container__lesson-courses-content__text">
                          {item.title}
                        </p>
                        <div className="dashboard-container__lesson-courses-content__bottom">
                          <p className="dashboard-container__lesson-courses-content__bottom-author">
                            {" "}
                            Author:{item.author}
                          </p>
                          <p className="dashboard-container__lesson-courses-content__bottom-author">
                            {" "}
                            5 Users Enrolled
                          </p>
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
            )}
          </>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
