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
  const locale = localStorage.getItem("language") || "en";

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
        {courses?.data.courses?.map((content: Courses) => {
          return (
            <button
              onClick={() => enrollUserHandler(content._id)}
              aria-label={content.title}
              key={content._id}
              style={{width:"400px", height:"280px"}}
              className="availablecourses__courses-content"
            >
              <div className="availablecourses__courses-content__img-container">
                {" "}
                <div className={"img-container-overlay"}>
                  {isLoading && selectedId === content._id ? (
                    <Spinner width="50px" height="50px" color="#0a0a0a" />
                  ) : (
                    <BsFillPlayCircleFill />
                  )}
                </div>
                <img
                  className="availablecourses__courses-content__img-container-img"
                  src={content.preview_image}
                  alt={content.title}
                />
              </div>

              <div className="availablecourses__courses-content__bottom aligned">
                <p className="availablecourses__courses-content__bottom-text">
                  {locale === "en" ? content.title : content.title_tr}
                </p>
                <p className="availablecourses__courses-content__bottom-author">
                  {" "}
                  {locale === "en" ? content.description : content.description_tr}
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
