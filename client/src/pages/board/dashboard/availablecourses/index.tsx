import { useState } from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../../components/Spinner";
import { Courses } from "../../../../types";
import { enrollUser } from "../../../../utils/api/courses";
import "./style.scss";

const AvailableCourses = ({ courses }: any) => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  const enrollUserHandler = async (id: string) => {
    setLoading(true)
    try {
      let response = await enrollUser(id);
      if (response) {
        navigate(`/course/${id}`);
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <div className="availablecourses">
      <h1 className="availablecourses__heading">Available Courses</h1>
      <div className="availablecourses__courses">
        {courses?.data.courses?.map((item: Courses, index:number) => {
          return (
            <button
              onClick={() => enrollUserHandler(item._id)}
              aria-label={item.title}
              key={item._id}
              className="availablecourses__courses-content"
            >
              <div className="availablecourses__courses-content__img-container">
                {" "}
                <div className={"img-container-overlay"}>
                 {isLoading? <Spinner width="50px" height="50px" color="#0a0a0a" />:<BsFillPlayCircleFill />}
                </div>
                <img
                  className="availablecourses__courses-content__img-container-img"
                  src={item.preview_image}
                  alt={item.title}
                />
              </div>

              <div className="availablecourses__courses-content__bottom">
                <p className="availablecourses__courses-content__bottom-text">
                  {item.title}
                </p>
                <p className="availablecourses__courses-content__bottom-author">
                  {" "}
                  {item.author}
                </p>
                <p className="availablecourses__courses-content__bottom-coursenumber">
                  {" "}
                  {item.course_sections.length} course sections
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AvailableCourses;

// keep track of enrolled user, users should not be enrolling everytime
