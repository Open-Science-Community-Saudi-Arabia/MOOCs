import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import CourseCard from "../../components/Course/CourseCard";
import { getAllCourses } from "../../utils/api/courses";

export default function index() {
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);

    const getAvailableCourses = async () => {
      try {
        const response = await getAllCourses();
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
  console.log(courses);
  return (
    <section className="h-screen admin-dashboard">
      {isLoading ? (
        <div className="h-screen flex items-center flex-col justify-center">
          <Spinner width="100px" height="100px" color="#009985" />
        </div>
      ) : courses?.length > 0 ? (
        <div className="">
          <h1 className="text-center text-2xl">Admin Board</h1>

          <div className="flex items-center justify-between mt-6">
            <h2 className="text-xl mt-6">All courses</h2>
            <Link to="/collaborator/add-course" className="bg-primary text-sm text-white rounded-md px-3 py-2">
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
        <div className="flex items-center flex-col h-96 justify-center">
          <p className="py-3 text-gray-dark/50"> No Course Added</p>
        </div>
      )}
    </section>
  );
}
