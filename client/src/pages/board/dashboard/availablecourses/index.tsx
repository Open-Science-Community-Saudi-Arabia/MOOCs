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
    navigate(`/course/${id}`);
    // setLoading(true);
    // setSelectedId(id);
    // try {
    //   let response = await enrollUser(id);
    //   if (response) {
    //     navigate(`/course/${id}`);
    //   }
    // } catch (error: any) {
    //   toast.error(error.message, {
    //     position: toast.POSITION.TOP_CENTER,
    //     autoClose: 5000,
    //     theme: "colored",
    //   });
    // }
  };

  return (
    <div className="availablecourses">
      {courses?.length ? (
        <>
          <h1 className="availablecourses__heading aligned">
            <Trans>Available Courses</Trans>
          </h1>
          <div className="availablecourses__courses">
            {courses?.map((content: Courses) => {
              return (
                <div
                  // disabled={!content.isAvailable}
                  onClick={() => enrollUserHandler(content._id)}
                  aria-label={content.title}
                  key={content._id}
                  style={{ width: "350px", height: "auto" }}
                  className="hover:border-primary hover:text-primary overflow-hidden availablecourses__courses-content"
                >
                  <div className="availablecourses__courses-content__img-container">
                    <img
                      className="availablecourses__courses-content__img-container-img"
                      src={content.preview_image}
                      alt={content.title}
                    />
                  </div>

                  <div className="availablecourses__courses-content__bottom aligned p-4">
                    <p className=" line-clamp-1 availablecourses__courses-content__bottom-text pb-4">
                      {locale === "en" ? content.title : content.title_tr}
                    </p>
                    <p className="line-clamp-3 text-[13px] text-gray-100">
                      {" "}
                      {locale === "en"
                        ? content.description
                        : content.description_tr}
                    </p>
                    <p className="text-[13px] text-gray-100 py-2">
                      {" "}
                      By {content.author}
                    </p>
                    <div className="flex items-center justify-between pt-3">
                      <p className="text-sm text-gray-dark">2 users enrolled</p>
                      <button className="py-2 text-sm rounded-full w-max font-semibold px-3 bg-primary text-white">
                        Start Learning
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <p className="no-content">No Courses Available</p>
      )}
    </div>
  );
};

export default AvailableCourses;
