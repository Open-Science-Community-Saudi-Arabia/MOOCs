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
    <div className="dashboard">
      <div className="container">
        <Header />
        <div className="lesson">
          <p>Available Courses</p>
          <div className="courses">
            {Videocontent.map((item) => {
              return (
                <Link key={item.id} to={`/dashboard/${item.id}`}>
                  <div className="content">
                  
                    <img src={item.image} alt="" />
                  
                    <p>{item.title}</p>
                    {/* <span>{item.language}</span> */}
                    <div className="__duration">
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
    </div>
  );
}


// handle error when video is not loading
// 

export default Dashboard;
