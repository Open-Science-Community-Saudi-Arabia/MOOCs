import { useEffect, useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { getContributorCourses } from "../../utils/api/courses";
import Spinner from "../../components/Spinner";
import { getUserId } from "../../utils";
import dayjs from "dayjs";

import advancedFormat from "dayjs/plugin/advancedFormat.js";
dayjs.extend(advancedFormat);
dayjs().format();

export default function index() {
  const [courses, setCourses] = useState<any[]>([]);

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const userId: any = getUserId();
    const getAvailableCourses = async () => {
      try {
        const response = await getContributorCourses(userId);
        if (response.success) {
          setLoading(false);
          setCourses(response.data);
        }
      } catch (error) {
        setError(true);
      } finally {
        setError(false);
      }
    };
    getAvailableCourses();
  }, []);

  return (
    <section className="collaborator-dashboard h-screen overflow-auto">
      {isLoading ? (
        <div className="h-screen flex items-center flex-col justify-center">
          <Spinner width="100px" height="100px" color="#009985" />
        </div>
      ) : courses?.length > 0 ? (
        <div className="border border-b-gray border-[0px] border-x-0 border-t-0 pb-2">
          <div className="flex items-center justify-between mt-6">
            <h1 className="text-2xl font-medium">Your Courses</h1>
            <Link to="/collaborator/add-course" className="add-btn">
              {" "}
              Add Course
            </Link>
          </div>
          <div className="flex items-center flex-wrap gap-x-3 justify-start mt-8">
            {courses.map((ele: any) => {
              return (
                <button
                  key={ele._id}
                  className="hover:shadow-xl rounded-md text-left w-72 h-40 pt-3 pb-3 px-4 border-gray border bg-white"
                >
                  <div className="flex items-center justify-center gap-x-6 mb-8">
                    <img
                      className="rounded-full w-10 h-10"
                      src={ele.preview_image}
                      alt="preview image"
                    />
                    <h3 className="text-base w-64 text-left font-semibold">
                      {ele.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className={`text-gray-dark font-medium w-20 text-xs`}>
                      Review{" "}
                      <span
                        className={`${ele.status === "Pending"
                            ? "text-error"
                            : "text-success"
                          }`}
                      >
                        {ele.status}
                      </span>
                    </p>
                    <p className="text-gray-dark/80 w-24 text-xs">
                      created on
                      <span>
                        {" "}
                        {dayjs(ele.createdAt).format("MMMM Do, YYYY")}
                      </span>
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex items-center flex-col h-96 justify-center">
          <div className="py-3"> No Course Added</div>
          <Link to="/collaborator/add-course" className="add-btn">
            {" "}
            Add Course
          </Link>
        </div>
      )}
    </section>
  );
}
