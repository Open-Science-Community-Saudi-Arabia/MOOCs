import { useEffect } from "react";
import { Videocontent } from "../../data";
import Header from "./Header";
import "./style.scss";
import { Link } from "react-router-dom";
import { courses } from "../../utils/api/courses";
import { WiTime4 } from "react-icons/wi";

function Dashboard() {
  const getCourses = async () => {
    let allcourses = await courses();
    console.log(allcourses);
  };
  useEffect(() => {
    getCourses();
  }, []);

  return (
    <section className="dashboard">
      <div className="dashboard-container">
        <Header />
        <div className="dashboard-container__lesson">
          <h1 className="dashboard-container__lesson-heading">
            Available Courses
          </h1>
          <div className="dashboard-container__lesson-courses">
            {Videocontent.map((item) => {
              return (
                <Link
                  aria-label="course"
                  key={item.id}
                  to={`/dashboard/${item.id}`}
                >
                  <div className="dashboard-container__lesson-courses-content">
                    <img
                      className="dashboard-container__lesson-courses-content__img"
                      src={item.image}
                      alt="course video"
                    />
                    <p className="dashboard-container__lesson-courses-content__text">
                      {item.title}
                    </p>
                    <div className="dashboard-container__lesson-courses-content__duration">
                      {" "}
                      <WiTime4 />
                      {item.duration}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// handle error when video is not loading

export default Dashboard;
