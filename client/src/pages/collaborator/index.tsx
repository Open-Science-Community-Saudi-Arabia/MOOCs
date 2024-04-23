import { useEffect, useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { getContributorCourses } from "../../utils/api/courses";
import Spinner from "../../components/Spinner";
import { getUserId } from "../../utils";
import CourseCard from "../../components/Course/CourseCard";

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
            <h1 className="text-lg font-medium">Your Courses</h1>
            <Link to="/collaborator/add-course" className="add-btn">
              {" "}
              Add Course
            </Link>
          </div>
          <div className="flex items-center flex-wrap gap-x-3 justify-start mt-8">
            {courses.map((ele: any) => {
              return <CourseCard key={ele._id} course={ele} />;
            })}
          </div>
        </div>
      ) : (
        <div className="flex items-center flex-col h-[30rem] justify-center">
          <p className="py-3 text-gray-dark/50 mb-4"> No Course Added Yet!</p>
          <Link to="/collaborator/add-course" className="px-4 py-3 bg-primary text-white rounded-md w-64 text-center">
            {" "}
            Add Course
          </Link>
        </div>
      )}
    </section>
  );
}
