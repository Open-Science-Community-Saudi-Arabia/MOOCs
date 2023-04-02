import { t, Trans } from "@lingui/macro";
import { useState } from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../../components/Spinner";
import { Courses } from "../../../../types";
import { enrollUser } from "../../../../utils/api/courses";
import { toast } from "react-toastify";
import "./style.scss";

const AvailableCourses = ({ courses }: any) => {
  const [isLoading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string>();
  const navigate = useNavigate();

  const enrollUserHandler = async (id: string) => {
    setLoading(true);
    setSelectedId(id);
    try {
      let response = await enrollUser(id);
      if (response) {
        navigate(`/course/${id}`);
      }
    } catch (error: any) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        theme: "colored",
      });
    }
  };
  return (
    <div className="availablecourses ">
      <h1 className="availablecourses__heading aligned">
        <Trans>Available Courses</Trans>
      </h1>
      <div className="availablecourses__courses">
        {courses?.data.courses?.map(({_id,title,preview_image,author,course_sections}:Courses, index: number) => {
          return (
            <button
              onClick={() => enrollUserHandler(_id)}
              aria-label={title}
              key={_id}
              className="availablecourses__courses-content"
            >
              <div className="availablecourses__courses-content__img-container">
                {" "}
                <div className={"img-container-overlay"}>
                  {isLoading && selectedId === _id ? (
                    <Spinner width="50px" height="50px" color="#0a0a0a" />
                  ) : (
                    <BsFillPlayCircleFill />
                  )}
                </div>
                <img
                  className="availablecourses__courses-content__img-container-img"
                  src={preview_image}
                  alt={title}
                />
              </div>

              <div className="availablecourses__courses-content__bottom">
                <p className="availablecourses__courses-content__bottom-text">
                  {t`${title}`}
                </p>
                <p className="availablecourses__courses-content__bottom-author">
                  {" "}
                  {t`${author}`}
                </p>
                <p className="availablecourses__courses-content__bottom-coursenumber">
                  {" "}
                  {t`${course_sections.length}`} course sections
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
