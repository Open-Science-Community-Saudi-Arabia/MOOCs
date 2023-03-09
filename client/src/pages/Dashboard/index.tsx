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
    let response = await getCourses();
    console.log(response);
    if (response.success) {
      setLoadingCourses(false);
      setCourses(response.data.courses);
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
          <div>
            {isloadingCourses ? (
              <Spinner width="40px" height="40px" color />
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
                        {/* <div className="dashboard-container__lesson-courses-content__duration">
                      {" "}
                      <WiTime4 />
                      {item.duration}
                    </div> */}
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// handle error when video is not loading

export default Dashboard;
