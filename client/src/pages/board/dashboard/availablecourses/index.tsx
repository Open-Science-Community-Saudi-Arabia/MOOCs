import { Trans, t } from "@lingui/macro";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../../components/Spinner";
import { Courses } from "../../../../types";
import { enrollUser } from "../../../../utils/api/courses";
import { toast } from "react-toastify";
import "./style.scss";

const AvailableCourses = ({ courses }: any) => {
  const [selectedId, setSelectedId] = useState<string>();
  const navigate = useNavigate();
  const locale = localStorage.getItem("language") || "en";
  const userId: string | any = localStorage.getItem("MOOCS_WEB_APP_USERID");

  const enrollUserHandler = async (courseId: string) => {
    setSelectedId(courseId);
    try {
      let response = await enrollUser(courseId);
      if (response.message) {
        setSelectedId("");
        navigate(`/course/${courseId}`);
      }
    } catch (error: any) {
      setSelectedId("");
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        theme: "colored",
      });
    }
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
                  onClick={() =>
                    content.enrolled_users.includes(userId)
                      ? navigate(`/course/${content._id}`)
                      : ""
                  }
                  aria-label={content.title}
                  key={content._id}
                  style={{ width: "350px", height: "auto" }}
                  className="p-6 hover:border-primary-light hover:bg-primary-light hover:text-primary overflow-hidden availablecourses__courses-content"
                >
                  <div className="availablecourses__courses-content__img-container">
                    <img
                      className="availablecourses__courses-content__img-container-img"
                      src={content.preview_image}
                      alt={content.title}
                    />
                  </div>

                  <div className="availablecourses__courses-content__bottom aligned pt-3">
                    <p className="line-clamp-1 availablecourses__courses-content__bottom-text">
                      {locale === "en" ? content.title : content.title_tr}
                    </p>
                    <div className="py-3">
                      <p className="line-clamp-3 text-[14px] text-gray-100">
                        {" "}
                        {locale === "en"
                          ? content.description
                          : content.description_tr}
                      </p>
                    </div>
                    <p className="text-[13px] text-gray-100 py-2">
                      {" "}
                      <Trans> By </Trans>
                      {content.author}
                    </p>
                    <div className="flex items-center justify-between relative pt-8 pb-4">
                      {!content.enrolled_users.includes(userId) && (
                        <button
                          type="button"
                          onClick={() => enrollUserHandler(content._id)}
                          className="py-1 md:py-2 text-xs md:text-sm rounded-full absolute h-12 w-30 md:w-36 font-semibold px-4 bg-primary text-white"
                        >
                          {selectedId === content._id ? (
                            <Spinner width="20px" height="20px" color="#fff" />
                          ) : (
                            t`Start Learning`
                          )}
                        </button>
                      )}
                      <p className="text-xs md:text-sm text-gray-100 absolute right-5">
                        1680+ {""} enrolled
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <p className="no-content">
          <Trans>No Courses Available</Trans>
        </p>
      )}
    </div>
  );
};

export default AvailableCourses;
